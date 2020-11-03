type DeliveryType = 'upload' | 'private' | 'authenticated' | 'fetch' | 'multi'

export interface Asset {
  publicId: string,
  assetId: string,
  format: string,
  secureUrl: string,
  type: DeliveryType,
  version: string | number,
  height: number,
  width: number,
  eager: Object[],
  placeholder: boolean,
  tags: string[],
  originalFilename: string,
  overwritten: boolean
}