
import { UrlOptions } from '../types/IUrlOptions'
import { CloudOptions } from '../types/CloudOptions'
import { Configuration } from '../types/Configuration'
import { ALLOWED_URL_CONFIG, ALLOWED_CLOUD_CONFIG } from './constants'

type Converter = (key:string) => string

export const pickKeys = (configuration: Configuration, fields: string[] = []): Object => {
  const config = {}

  fields.forEach(field => {
    const value = configuration[field]

    if (value) { 
      config[field] = configuration[field]
    }
  })

  return config
}

export const pickConfigKeys = (configuration: Configuration):UrlOptions => pickKeys(configuration, ALLOWED_URL_CONFIG) as UrlOptions

export const pickCloudKeys = (configuration: Configuration):CloudOptions => pickKeys(configuration, ALLOWED_CLOUD_CONFIG) as CloudOptions

export const convertKeys = (source:Object = {}, converter: Converter):Object => {
  if (!converter || typeof converter !== 'function') return source
 
  const result = {}
 
  for (let key in source) {
   const value = source[key]
 
   result[converter(key)] = value
  }
 
  return result
}
