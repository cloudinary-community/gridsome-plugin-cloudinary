const {
  GraphQLString,
} = require('gridsome/graphql')
const { CldApi } = require('@mayas/cld-api')

const $cloudinary = new CldApi({
  secure: true,
  privateCdn: false
})

class ImageTransformer {
  static mimeTypes() {
    return ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
  }

  constructor(options) {
    this._options = options

    if (options.loader && options.loader.type === 'cloudinary') {
      $cloudinary.config(options.loader)
    }
  }

  parse(source) {
    return {
      content: source
    }
  }
  extendNodeType({ graphql }) {
    const node = {
      content: { type: GraphQLString },
      name: {
        type: GraphQLString,
        resolve: (node) => {
          return node.fileInfo.name
        }
      },
      extension: {
        type: GraphQLString,
        resolve: (node) => {
          return `.${node.fileInfo.extension}`
        }
      }
    }

    if (this._options.loader.type === 'cloudinary') {
      const CldImage = require('./types/CldImage')
      node.image = {
        type: new graphql.GraphQLObjectType(CldImage),
        args: {
          cloudName: { type: GraphQLString },
        },
        resolve: async (node, { cloudName }) => {
          const uploadOptions = this._options.uploadOptions || {}
          const folder = uploadOptions.folder || ''
          const publicId = node.fileInfo.name

          let asset =  await $cloudinary.resource(`${folder ? `${folder}/`: ''}${publicId}`, {
            type: 'upload'
          })

          if (!asset) {
            asset = await $cloudinary.upload(node.fileInfo.path, {
              publicId,
              cloudName: cloudName || $cloudinary._options.cloudName,
              folder,
              resourceType: 'image',
              overwrite: uploadOptions.overwrite || false,
            })
          }

          return {
            publicId: asset.public_id,
            assetId: asset.asset_id,
            format: asset.format,
            secureUrl: asset.secure_url,
            type: asset.type,
            version: asset.version,
            width: asset.width,
            height: asset.height,
            tags: asset.tags,
          }
        }
      }
    }

    return node
  }
}

module.exports = ImageTransformer