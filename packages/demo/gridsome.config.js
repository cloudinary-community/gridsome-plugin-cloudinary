require('dotenv').config();

module.exports = {
  siteName: 'Gridsome - Cloudinary Source',
  plugins: [
    {
      use: '@mayas/gridsome-source-cld',
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        resourceOptions: {
          type: "upload",
          prefix: 'examples',
          max_results: 50
        },
        // transformations: {
        //   width: 200,
        //   height: 200,
        //   gravity: 'auto:subject',
        //   crop: 'fill',
        // }
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        route: '/blog/:slug'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/images',
      }
    },
    {
      use: "@mayas/gridsome-plugin-cld",
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
      }
    },
    {
      use: "gridsome-plugin-tailwindcss",
    }
  ],
  transformers: {
    image: {      
      uploadOptions: {
        folder: 'examples',
      },
      loader: {
        type: 'cloudinary',
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
      }
    }
  }
}
