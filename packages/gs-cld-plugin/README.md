# `gridsome-plugin-cloudinary`

> Cloudinary image transformer plugin for Gridsome

* [📖&nbsp; Documentation](https://gridsome-cloudinary.netlify.app/cloudinary-transformer)
* [🎮&nbsp; Demo site](https://gridsome-cloudinary.netlify.app/demo)

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
          cloudName: process.env.CLOUDNAME,
          apiKey: process.env.API_KEY,
          apiSecret: process.env.API_SECRET,
        }
      },
    ]
  }
  ```

See [Options](https://gridsome-cloudinary.netlify.app/cloudinary-transformer-option) for all available options to initialize Cloudinary source plugin.

And that's it 🎉!

## Usage

WIP

## License

[MIT License](https://github.com/mayashavin/gridsome-plugin-cloudinary/blob/master/LICENSE)

Copyright(c)

Created and maintained by [Maya Shavin](https://twitter.com/MayaShavin)