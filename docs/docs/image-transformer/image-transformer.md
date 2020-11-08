---
title: Setup
slug: image-transformer
category: Image Transformer
categoryPosition: 1
position: 1
---

[Demo site](/demo)

Automatic image handling by Gridsome is great, but sometimes we need a bit more. For example: having them uploaded to and optimized by Cloudinary when querying them from Gridsome's data layer.

The workflow stays the same: add images to your side, have `@gridsome/source-filesystem` read them, and then query them to use in your components.

Image transformer tool give you that freedom out of the box, by folloing the below steps:

## Installation

1. Add `@gridsome/source-filesystem` to handling your local files.

  ```bash
  yarn add @gridsome/source-filesystem

  #OR
  npm i @gridsome/source-filesystem
  ```

2. Add `gridsome-transformer-img` dependency to your Gridsome project.

  ```bash
  yarn add gridsome-transformer-img

  #OR
  npm i gridsome-transformer-img
  ```

3. Add `@gridsome/source-filesystem` as plugins to `plugins` section of `gridsome.config.js` and request for the desired images:

  ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: '@gridsome/source-filesystem',
        options: {
          path: 'path-to-local-images',
        }
      },
    ]
  }
  ```

3. *Optional* - Set up your upload options and choose a `loader` to optimize your images in `img` section of `transformer` in `gridsome.config.js`.

  ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: '@gridsome/source-filesystem',
        options: {
          path: 'path-to-local-images',
        }
      },
    ],
    transformers: {
      img: {
        uploadOptions: {
          folder: 'examples', //directory path in cloudinary where asset should be uploaded to
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
  ```

See [Loader](/image-transformer-loader) for more details on the available loader services, and [Options](/image-transfomer-options) for other configuration options.

And that's it 🎉! You can start querying your images in the Data Layer.
