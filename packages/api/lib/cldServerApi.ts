const sdk = require('cloudinary').v2
const snakeCase = require('lodash.snakecase')
import { convertKeys } from './utils/utils'
import * as CONSTANTS from './utils/constants'

const basicOptimizations = {
  quality: 'auto',
  fetch_format: 'auto'
}

const getTransformationOptions = (options = {}) => {
  return {
    ...basicOptimizations,
    ...options
  }
}

class CldServerApi {
  _options: Object
  image: Object
  video: Object
  constructor(options = {}) {
    this._options = options
    sdk.config(convertKeys(options, snakeCase))
    this.image = {
      /**
       * Generate URL for an image based on the transformation
       * @param {String} publicId - public id (Cloudinary path) of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
      */    
      url: (publicId, options = {}) => {
        const $options = convertKeys(options, snakeCase)

        return sdk.url(publicId, getTransformationOptions($options))
      },
      /**
       * 
       * @param {String} url - the original URL of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
       */
      fetchRemote: (url, options = {}) => {
        const $options = convertKeys(options, snakeCase)
        return sdk.url(url, getTransformationOptions({ ...$options, type: 'fetch' }))
      }
    } 
    
    this.video = {
      /**
       * Generate URL for a video based on the transformation
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video
       * @returns {string} Returns the optimized delivery URL for the target video
      */  
      url(publicId, options) {
        return sdk.video_url(publicId, getTransformationOptions(options))
      },
      /**
       * Generate thumbnail image of a video based on transformations
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video's thumbnail
       * @returns {Object} - { url } contains the delivery url of the generated thumbnail
       */
      thumbnail(publicId, options) {
        const transformations = getTransformationOptions(options)

        return {
          url: sdk.video_thumbnail_url(publicId, transformations),
        }
      } 
    }
  }
  config(options = {}) {
    this._options = {
      ...this._options,
      ...options
    }
    
    return sdk.config(convertKeys(options, snakeCase))
  }
  upload(file: string, options: Object = {}) {
    const $options = convertKeys(options, snakeCase)
    
    return sdk.uploader.upload(file, $options)    
  }
  resources(options: Object = {}) {
    const $options = convertKeys(options, snakeCase)
    
    return sdk.api.resources($options)
  }
  async resource(publicId: string, options: Object = {}) {
    const $options = convertKeys(options, snakeCase)

    const uploader = sdk.uploader

    try {
      const asset = await uploader.explicit(publicId, $options)
      return asset
    } catch (error) {
      return null
    }
  }
}

export default CldServerApi

export { CONSTANTS }