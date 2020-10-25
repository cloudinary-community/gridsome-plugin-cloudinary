const sdk = require('cloudinary').v2
const snakeCase = require('lodash.snakecase')
const options = require('./utils/constants')

/** istanbul ignore file */
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

const convertKeys = (source = {}, converter) => {
 if (!converter || typeof converter !== 'function') return source

 const result = {}

 for (let key in source) {
  const value = source[key]

  result[converter(key)] = value
 }

 return result
}

/**
 * Delivery types - https://cloudinary.com/documentation/image_transformations#delivery_types
 * @enum {DeliveryType}
 */
const DELIVERY_TYPES = {
  UPLOAD: 'upload',
  PRIVATE: 'private',
  AUTHENTICATED: 'authenticated',
  FETCH: 'fetch',
  MULTI: 'multi'  
}

class CloudinaryApi {
  constructor(configurations) {
    this._configurations = convertKeys(configurations, snakeCase)

    sdk.config(this._configurations)

    this.image = {
      /**
       * Generate URL for an image based on the transformation
       * @param {String} publicId - public id (Cloudinary path) of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
      */    
      url: (publicId, options = {}) => {
        return sdk.url(publicId, getTransformationOptions(options))
      },
      /**
       * Generate HTML Element tag for an image with transformation
       * @param {String} publicId - public id (Cloudinary path) of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {Object}
       */
      element: (publicId, options = {}) => {
        return sdk.imageTag(publicId, getTransformationOptions(options))
      },
      /**
       * 
       * @param {String} url - the original URL of the target image
       * @param {Object} options - optional, transformation options to apply to the target image
       * @returns {string} Returns the optimized delivery URL for the target image
       */
      fetchRemote: (url, options = {}) => {
        return sdk.url(url, getTransformationOptions({ ...options, type: 'fetch' }))
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
       * Generate HTML Element tag for an video with transformation
       * @param {String} publicId - public id (Cloudinary path) of the target video
       * @param {Object} options - optional, transformation options to apply to the target video
       * @returns {Object}
       */
      element(publicId, options) {
        return sdk.videoTag(publicId, getTransformationOptions(options))
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
  /**
   * Returns a new instance of cloudinary module for chaining
   * @param {Object} configurations - New configurations for cloudinary sdk
   * @returns {CloudinaryApi} new instance of cloudinary module 
   */
  config(options = {}) {
    return sdk.config(options)
  }
  /**
   * Returns a Promise from the upload process for an asset on Server side
   * @param {String} file - path to the asset you wish to upload 
   * @param {Options} options - upload options (optional): https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
   * @param {Function} callback - callback handler (optional)
   * @returns {Promise<Asset> | Promise<{ msg: {String} }>}
   */
  upload(file, options = {}, callback) {
    const $options = convertKeys(options, snakeCase)

    if (!$options.api_key && !this._configurations.api_key
      && !$options.api_secret && !this._configurations.api_secret) {
      throw new Error('API Key and Secret Key are needed for upload API')
    }

    sdk.config(this._configurations)

    const uploader = sdk.uploader

    return uploader.upload(file, $options, callback)
  }
  /**
   * 
   * @param {String} publicId - the public id of the target asset
   * @param {{ type: {DeliveryType} }} options - options to apply on the asset : https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters-6
   * @returns {Asset | null} 
   */
  async explicit(publicId, options = {}) {
    const $options = convertKeys(options, snakeCase)

    if (!$options.api_key && !this._configurations.api_key
      && !$options.api_secret && !this._configurations.api_secret) {
      throw new Error('API Key and Secret Key are needed for explicit API')
    }

    // sdk.config(this._configurations)

    const uploader = sdk.uploader

    try {
      const asset = await uploader.explicit(publicId, $options)

      return asset
    } catch (error) {
      return null
    }
  }
  async resources(options = {}) {
   const $options = convertKeys(options, snakeCase)

   if (!$options.api_key && !this._configurations.api_key
     && !$options.api_secret && !this._configurations.api_secret) {
     throw new Error('API Key and Secret Key are needed for resources API')
   }

   return sdk.api.resources($options)
  }
}

module.exports = CloudinaryApi

module.exports.DELIVERY_TYPES = DELIVERY_TYPES

module.exports.uploadToCloudinary = async (file, publicId, options = {}) => {};

module.exports.CONSTANTS = options
