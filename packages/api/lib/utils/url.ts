export type ResourceType = 'upload' | 'private' | 'authenticated' | 'fetch' | 'multi'

const doesPathNeedVersion = (publicId: string) => !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//)

class Url {
  constructor() {}
  getPrefix({ cloudName, secure = true, assetType = 'image', resourceType = 'upload' }: { cloudName: string, secure?: boolean, assetType?: 'image' | 'video', resourceType: ResourceType}):string {
    const protocol = secure ? 'https://' : 'http://'
    const cdn = ''
    const subDomain = 'res'
    const host = '.cloudinary.com'
    
    return `${protocol}${cdn}${subDomain}${host}/${cloudName}/${assetType}/${resourceType}`
  }
  getPathToAsset({ publicId, forceVersion = false, version = 1 } : { publicId: string, forceVersion?: boolean, version?: number }) {
    const needVersion = doesPathNeedVersion(publicId) && forceVersion

    return needVersion ? `v${version}/${publicId}` : `${publicId}`
  }
}

export default new Url()