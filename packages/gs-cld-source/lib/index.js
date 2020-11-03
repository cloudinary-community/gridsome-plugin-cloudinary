const { CldApi } = require('@mayas/cld-api')
const { DEFAULT_TRANS, RESOURCE_TYPES } = require('@mayas/cld-api').CONSTANTS

/** TODO
 * 1. Export some functionalities for manual usage.
 * 2. Documentation
 * 3. Tests
 */

class CldImagesSource {
  static defaultOptions () {
    return {
      privateCdn: false,
      secure: true
    }
  }

  constructor(api, options = {}){
    const $cloudinary = new CldApi({
      ...CldImagesSource.defaultOptions,
      ...options
    })

    this._cld = $cloudinary
    this._options = options.resourceOptions || {}
    this._transformations = {
      ...DEFAULT_TRANS,
      ...(options.transformations || {})
    }

    api.loadSource(args => this.createNodes(args))
  }
  
  async createNodes(store) {
    const { addCollection } = store

    const collection = addCollection({
      typeName: 'CldMedia'
    })

    try {
      const { resources } = await this._cld.resources(this._options)
      const resourceType = this._options.resourceType  === RESOURCE_TYPES.VIDEO ? RESOURCE_TYPES.VIDEO : RESOURCE_TYPES.IMAGE

      if (!resources || !resources.length) {
        console.warn('\n ~Yikes! No nodes created because no Cloudinary resources found. Try a different query?');
        return;
      }
      
      resources.forEach(asset => {
        const optimizedUrl = this._cld[resourceType].url(asset.public_id, this._transformations)
        const node = {
          ...asset,
          url: optimizedUrl,
          secure_url: optimizedUrl,
        }
  
        collection.addNode(node)
      })
    } catch (e) {
      console.error(e)
      return
    }    
  }
}

module.exports = CldImagesSource;

