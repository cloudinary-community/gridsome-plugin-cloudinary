const {
  GraphQLInt,
  GraphQLString,
} = require('gridsome/graphql')


const CldImage = {
  name: 'CldImage',
  fields: {
    publicId: { type: GraphQLString },
    assetId: { type: GraphQLString },
    format: { type: GraphQLString },
    secureUrl: { type: GraphQLString },
    type:{ type: GraphQLString },
    version:{ type: GraphQLString },
    width: {type: GraphQLInt},
    height: {type: GraphQLInt},
    tags: {type: GraphQLString},
  }
}

module.exports = CldImage