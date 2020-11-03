export const REQUIRED_FIELDS = ['apiKey', 'apiSecret', 'cloudName']

export const DEFAULT_TRANS = {
 fetchFormat: 'auto',
 quality: 'auto'
}

export const DEFAULT_RESOURCES_FIELDS = ["resourceType", "prefix", "tags", "maxResults", "context"];

export const RESOURCE_TYPES = {
 IMAGE: 'image',
 VIDEO: 'video'
}

export const ALLOWED_URL_CONFIG = [
  'cdnSubdomain',
  'secureCdnSubdomain',
  'cname',
  'secureDistribution',
  'privateCdn',
  'signUrl',
  'longUrlSignature',
  'shorten',
  'useRootPath',
  'secure',
  'forceVersion'
];

export const ALLOWED_CLOUD_CONFIG = [
  'cloudName',
  'apiKey',
  'apiSecret',
  'authToken'
];

/**
 * Delivery types - https://cloudinary.com/documentation/image_transformations#delivery_types
 * @enum {DeliveryType}
 */
export const DELIVERY_TYPES = {
  UPLOAD: 'upload',
  PRIVATE: 'private',
  AUTHENTICATED: 'authenticated',
  FETCH: 'fetch',
  MULTI: 'multi'  
}
