---
title: Setup
slug: source-plugin
category: Cloudinary Source Plugin
categoryPosition: 2
description: Cloudinary Source Plugin is a simple way to get existing Cloudinary assets to use in Gridsome apps with optimization.
position: 1
---

[Demo site](/demo)

To use the plugin, you need a Cloudinary account first. [Register for a free account](https://cloudinary.com/users/register/free) if you haven't got one yet.

You can set up the source plugin easily in two following steps:

## Installation

1. Add `gridsome-source-cloudinary` dependency to your Gridsome project.

  ```bash
  yarn add gridsome-source-cloudinary

  #OR
  npm i gridsome-source-cloudinary
  ```

2. Add `gridsome-source-cloudinary` as a plugin to `plugins` section of `gridsome.config.js`:

  ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: 'gridsome-source-cloudinary',
        options: {
          /* Cloudinary configuration options */
        },
      },
    ]
  }
  ```

See [Options](/source-plugin-options) for all available options to initialize Cloudinary source plugin.

And that's it 🎉!
