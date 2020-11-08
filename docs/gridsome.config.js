// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/globals.scss')
      ],
    })
}

const siteDescription = require('../package.json').description

module.exports = {
  siteDescription,
  siteName: 'Cloudinary plugins for Gridsome',
  siteUrl: 'https://gridsome-cloudinary.netlify.app',
  templates: {
    Doc: '/:slug',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'docs/**/*.md',
        typeName: 'Doc',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    },
    {
      use: 'gridsome-source-cloudinary',
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        resourceOptions: {
          type: "upload",
          prefix: 'examples',
          max_results: 50
        },
        transformations: {
          width: 300,
          height: 300,
          gravity: 'auto:subject',
          crop: 'fill',
        }
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'docs/images',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content-examples/',
        typeName: 'PostCld'
      }
    },
    {
      use: "gridsome-plugin-cloudinary",
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
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

