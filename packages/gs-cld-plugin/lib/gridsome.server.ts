import CldAssetFixed from './types/CldAssetFixed'
import CldAssetResponsive from './types/CldAssetResponsive'
import { CldTransformation } from './types/CldTransformation'
import CldAsset from './types/CldAsset'
const { GraphQLList } = require('gridsome/graphql')
import { CLD_ASSET } from './constants'
import { AssetInfo, getAssetInfo } from './helpers'
const { setOptions, fixedAssetResolver, responsiveAssetResolver, upload, createImageNode } = require('./resolvers')

class CloudinaryPlugin {
  static defaultOptions() { 
    return {
      secure: true
    }
  }

  constructor(api, options = {}) {
    setOptions({
      ...options,
      ...CloudinaryPlugin.defaultOptions()
    })

    api.loadSource(async ({ store, addCollection, getCollection }) => {
    })
    
    api.createSchema(({ addSchemaTypes, addSchemaResolvers, schema }) => {
      addSchemaTypes([schema.createObjectType(CldAsset)])

      addSchemaResolvers({
        CldAsset: {
          fixed: {
            type: CldAssetFixed,
            args: {
              baseTrans: { type: CldTransformation },
              width: 'Int',
              height: 'Int',
              chainedTrans: { type: GraphQLList(CldTransformation)}
            },
            resolve: (obj, args) => fixedAssetResolver({ ...obj, ...args })
          },
          responsive: {
            type: CldAssetResponsive,
            args: {
              baseTrans: { type: CldTransformation },
              maxWidth: 'Int',
              chainedTrans: { type: GraphQLList(CldTransformation)}
            },
            resolve: (obj, args) => responsiveAssetResolver({ ...obj, ...args })
          }
        }
      })
    })

    api.onCreateNode((parentNode, { _store }) => {
      const assetInfos = getAssetInfo(parentNode)

      const node = { ...parentNode }

      assetInfos.forEach((assetInfo: AssetInfo) => {
        const info = {
          public_id: assetInfo.publicId,
          asset_id: assetInfo.publicId,
          version: assetInfo.version || 1
        }

        const collection = _store.addCollection(CLD_ASSET)

        const assetNode = collection.addNode(createImageNode(info))

        node[assetInfo.fieldName] = _store.createReference(assetNode)
      })

      return node
    })
  }
}

module.exports = CloudinaryPlugin
module.exports.createFixedImage = fixedAssetResolver
module.exports.createResponsiveImage = responsiveAssetResolver
