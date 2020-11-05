const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} = require('gridsome/graphql')

export const CldAssetFixed = new GraphQLObjectType({
  name: 'CldAssetFixed',
  fields: {
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
    src: { type: GraphQLString },
    srcSet: { type: GraphQLList(GraphQLString)}
  }
})
