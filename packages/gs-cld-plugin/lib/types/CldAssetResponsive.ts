const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = require('gridsome/graphql')


export const CldAssetResponsive = new GraphQLObjectType({
  name: 'CldAssetResponsive',
  fields: {
    viewHeight: { type: GraphQLInt },
    viewWidth: { type: GraphQLInt },
    sizes: { type: GraphQLString },
    src: { type: GraphQLString },
    srcSet: { type: GraphQLList(GraphQLString)}
  }
})

export default CldAssetResponsive