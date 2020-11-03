const { CldServerApi } = require('@mayas/cld-api')

const DEFAULT_FIXED_WIDTH = 400;
const DEFAULT_BREAKPOINTS = [200, 400, 600]

const instance = new CldServerApi({
  secure: true
})

const getAspectRatio = ({ aspectRatio }: { aspectRatio?: string}, originalRatio) => {
  if (!aspectRatio) return originalRatio

  const [width, height] = aspectRatio.split(":").map(Number)

  return Math.round(width / height)
}

type Size = {
  width?: number,
  height?: number
}

const getDisplayWidth = (size: Size = { width: 0 }, originalWidth: number, aspectRatio: number):number => {
  if (size.width) return Math.min(size.width, originalWidth)

  if (size.height) return Math.min(size.height * aspectRatio, originalWidth)

  return Math.min(DEFAULT_FIXED_WIDTH, originalWidth)
}

const getSizes = (displayWidth: number, originalWidth: number, publicId: string, options: Object) => {
  const sizes = []
  const resolutions = [1, 1.5, 2, 3]

  resolutions.forEach(resolution => {
    const width = Math.round(displayWidth * resolution)

    if (width > originalWidth) return

    sizes.push(`${instance.image.url(publicId, {
        crop: 'scale',
        ...options,
        width,
      })} ${resolution}x`
    )
  })

  return sizes
}

exports.getOptions = () => instance._options

exports.setOptions = (options) => instance.config(options)

exports.fixedAssetResolver = async ({
  publicId,
  baseTrans = {},
  width,
  height,
  chainedTrans = [],
  ...baseOptions
} : {
  publicId: string,
  baseTrans?: Object,
  width: number,
  height: number,
  chainedTrans?: Object[]
}) => {
  const image = await instance.resource(publicId, {
    type: 'upload',
    ...baseOptions
  })

  if (!image) return

  const aspectRatio = getAspectRatio(baseTrans, Math.round(image.width / image.height))

  const displayWidth = getDisplayWidth({ width, height }, image.width, aspectRatio)

  const options = {
    width: width || image.width,
    height: width || image.height,
    ...baseOptions,
    ...baseTrans,
    transformation: chainedTrans
  }

  const srcSet = getSizes(displayWidth, image.width, publicId, options)

  return {
    srcSet,
    src: instance.image.url(publicId, options),
    height: Math.round(displayWidth / aspectRatio),
    width: displayWidth
  }
}

exports.responsiveAssetResolver = async ({
  publicId,
  breakpoints = DEFAULT_BREAKPOINTS,
  baseTrans = {},
  maxWidth,
  chainedTrans = [],
  ...baseOptions
}: {
  publicId: string,
  breakpoints: number[],
  baseTrans: Object,
  maxWidth: number,
  chainedTrans: Object[]
}) => {
  const image = await instance.resource(publicId, {
    type: 'upload',
    ...baseOptions
  })

  if (!image) return

  const viewWidth = Math.min(maxWidth, image.width)

  if (breakpoints.length && breakpoints[breakpoints.length - 1] < viewWidth) {
    breakpoints.push(viewWidth)
  }

  const options = {
    width: viewWidth || image.width,
    ...baseOptions,
    ...baseTrans,
    transformation: chainedTrans
  }

  const srcSet = breakpoints
    .filter((bp, index, arr) => bp <= viewWidth && arr.indexOf(bp) === index)
    .sort((a, b) => a - b)
    .map(bp => {
      const url = instance.image.url(publicId, {
        crop: 'scale',
        ...options,
        width: bp,      
      })

      return `${url} ${bp}w`
    })

  return {
    srcSet,
    viewHeight: Math.round((viewWidth * image.height) / image.height),
    viewWidth,
    src: instance.image.url(publicId, options),
    sizes: `(max-width: ${viewWidth}px) 100vw, ${viewWidth}px`
  }
}

exports.createImageNode = (asset) => {
  const imageNode = {
    publicId: asset.public_id,
    // version: asset.version,
    id: `CldAsset-${asset.asset_id}`,
    internal: {
      typeName: 'CldAsset',
    }
  }

  return imageNode
}

exports.upload = async (node) => {
  console.log(node)
  const coverPhotoFileName = node.coverPhoto.substring(node.coverPhoto.lastIndexOf('/'))
  const publicId = node.fileInfo ? `${node.fileInfo.name}-coverPhoto` : coverPhotoFileName.replace(/\.[^.]*$/,'')
  const overwrite = instance._options.overwriteExisting || true;
  const folder = instance._options.uploadFolder
  const result = await instance.upload(node.coverPhoto, {
    publicId,
    overwrite,
    folder,
    resource_type: 'upload'
  })
  // const result = {
  //   public_id: "examples/94002",
  //   asset_id: "examples/94002"
  // }
  return result;
}