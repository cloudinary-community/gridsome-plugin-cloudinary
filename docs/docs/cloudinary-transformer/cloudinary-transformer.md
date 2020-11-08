---
title: Setup
slug: cloudinary-transformer
category: Cloudinary Image Transformer
categoryPosition: 3
position: 1
---

[Demo site](/demo/cloudinary-transformer)

To use the plugin, you need a Cloudinary account first. [Register for a free account](https://cloudinary.com/users/register/free) if you haven't got one yet.

You can set up the source plugin easily in two following steps:

## Installation

1. Add `gridsome-plugin-cloudinary` dependency to your Gridsome project.

  ```bash
  yarn add gridsome-plugin-cloudinary

  #OR
  npm i gridsome-plugin-cloudinary
  ```

2. Add `gridsome-plugin-cloudinary` as a plugin to `plugins` section of `gridsome.config.js`:

  ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: 'gridsome-plugin-cloudinary',
        options: {
          /* Cloudinary configuration options */
        },
      },
    ]
  }
  ```

See [Options](/cloudinary-transformer-options) for all available options to initialize Cloudinary source plugin.

And that's it 🎉!
