export type CloudinaryAssetData = {
  cloudinaryAsset?: boolean,
  publicId: string,
  version?: string  
}

export interface AssetInfo extends CloudinaryAssetData {
  fieldName: string,
}

export const getAssetInfo = (node = {}):AssetInfo[] => {
  const infos = []
  for (let key in node) {
    const field = node[key] || {}

    if (!meetMinimumRequired(field || {})) continue

    infos.push({
      fieldName: key,
      ...field
    })
  }

  return infos
}

export const meetMinimumRequired = (data: CloudinaryAssetData):boolean => !!(data.cloudinaryAsset && data.publicId)