---
title: Setup
slug: image-optimizer
category: Image Optimizer Plugin
description: A simple way to get existing Cloudinary assets to use in Gridsome apps with optimization
categoryPosition: 3
position: 1
---

[Demo site](/demo)

To use the plugin, you need a Cloudinary account first. [Register for a free account](https://cloudinary.com/users/register/free) if you haven't got one yet.

You can set up the source plugin easily in two following steps:

## Installation

1. Add `gridsome-plugin-cloudinary` dependency to your Gridsome project.

  ```bash
  yarn add gridsome-plugin-cloudinary

  #OR
  npm i gridsome-plugin-cloudinary
  ```

2. Add `gridsome-plugin-cloudinary` as a plugin to `plugins` section of `nuxt.config.js`:

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

See [Options](#configure-options) for all available options to initialize Cloudinary source plugin.

And that's it 🎉!
