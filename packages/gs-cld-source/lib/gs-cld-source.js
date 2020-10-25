import CloudinaryApi from '@mayashavin/cld-api'

class CldImagesSource {
  constructor(api, options){
    const $cloudinary = CloudinaryApi(options)
console.log('fahfdkjhfkdjhalfjhdjskhdfl')
    this._cld = $cloudinary
    this._options = options

    api.loadSource(args => this.createNodes(args))
  }
  
  async createNodes(store) {
    const { addCollection, getCollection } = store

    const collection = addCollection({
      typeName: 'CldImages'
    })
console.log('fdfad')
    const { resources } = await this._cld.resources(this._options)

    if (!resources || !resources.length) {
      console.warn('\n ~Yikes! No nodes created because no Cloudinary resources found. Try a different query?');
      return;
    }
    
    resources.forEach(asset => {
      asset.url = this._cld.image.url(asset.public_id, {
        fetchFormat: 'auto',
        quality: 'auto'
      })

      collection.addNode(asset)
    })
  }

}

module.exports = CldImagesSource;

