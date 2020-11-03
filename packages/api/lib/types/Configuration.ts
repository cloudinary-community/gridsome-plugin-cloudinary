import { UrlOptions } from './IUrlOptions'

export interface AssetOptions {
  features: string[],
  default?: string[],
}

export interface UseOptions {
  image?: string[],
  video?: string[]
}

export interface Components {
}

export interface Configuration {
  use?: UseOptions,
  cloudName?: string,
  apiKey?: string,
  apiSecret?: string,
  url?: UrlOptions,
  components?: Components,
}