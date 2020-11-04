const {
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType
} = require('gridsome/graphql')

export const CldResize = new GraphQLInputObjectType({
  name: 'CldResize',
  fields: {
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    rType: { type: GraphQLString }
  }
})

export const CldTransformation = new GraphQLInputObjectType({
  name: 'CldTransformation',
  fields: {
    angle: { type: GraphQLString },
    crop: { type: GraphQLString },
    responsiveWidth: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    overlay: { type: GraphQLString },
    underlay: { type: GraphQLString },
    aspectRatio: { type: GraphQLString },
    background: { type: GraphQLString },
    color: { type: GraphQLString },
    effect: { type: GraphQLString },
    border: { type: GraphQLString },
    flags: { type: GraphQLString },
    dpr: { type: GraphQLString },
    offset: { type: GraphQLString },
    radius: { type: GraphQLString },
    if: { type: GraphQLString },
    customFunction: { type: GraphQLString },
    customPreFunction: { type: GraphQLString },
    fps: { type: GraphQLString },
    keyframeInterval: { type: GraphQLString },
    opacity: { type: GraphQLString },
    quality: { type: GraphQLString },
    x: { type: GraphQLInt },
    y: { type: GraphQLInt },
    zoom: { type: GraphQLString },
    variables: { type: GraphQLString },
    rawTransformation: { type: GraphQLString },
    fetchFormat: { type: GraphQLString },
    endOffset: { type: GraphQLString },
    gravity: { type: GraphQLString },
    page: { type: GraphQLString },
    prefix: { type: GraphQLString },
    startOffset: { type: GraphQLString },
    colorSpace: { type: GraphQLString },
    defaultImage: { type: GraphQLString }
  }
})

export default CldTransformation