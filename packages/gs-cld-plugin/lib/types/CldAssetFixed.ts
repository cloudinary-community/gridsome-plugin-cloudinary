import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'gridsome/graphql'

export const CldAssetFixed = new GraphQLObjectType({
  name: 'CldAssetFixed',
  fields: {
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
    src: { type: GraphQLString },
    srcSet: { type: GraphQLList(GraphQLString)}
  }
})

export default CldAssetFixed