---
title: Setup
slug: image-transformer
category: Image Transformer
categoryPosition: 1
description: A simple way to get existing Cloudinary assets to use in Gridsome apps with optimization
position: 1
---

[Demo site](/demo)

You can set up the source plugin easily by:

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

3. Add `@gridsome/source-filesystem` as plugins to `plugins` section of `nuxt.config.js` and request for the desired images:

  ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: '@gridsome/source-filesystem',
        options: {
          path: 'content/images',
        }
      },
    ]
  }
  ```

3. Choose a loader to optimizer your images.

And that's it 🎉! You can start querying your images in the Data Layer
