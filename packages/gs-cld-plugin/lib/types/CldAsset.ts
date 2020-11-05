import { CldAssetFixed } from "./CldAssetFixed"
import { CldAssetResponsive } from "./CldAssetResponsive"
import { CLD_ASSET } from '../constants'

export const CldAsset = {
  name: CLD_ASSET,
  interfaces: ['Node'],
  fields: {
    id: 'ID!',
    publicId: 'String',
    fixed: { type: CldAssetFixed },
    responsive: { type: CldAssetResponsive }
  },
}