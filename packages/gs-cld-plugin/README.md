# `gridsome-plugin-cloudinary`

> Cloudinary image transformer plugin for Gridsome

* [📖&nbsp; Documentation](https://gridsome-cloudinary.netlify.app/cloudinary-transformer)
* [🎮&nbsp; Demo site](https://gridsome-cloudinary.netlify.app/demo/cloudinary-transformer)

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

## Automatic format and quality serving

The plugin *automatically* apply the following optimization to all the media files fetched from [Cloudinary](https://cloudinary.com), which covers **more than 60% image optimization** use cases.

* `f_auto` - Auto detect and provide the most suitable media format for the request media on-the-fly. For example, with the same image URL, Cloudinary will return WEBP for Chrome or any browser supports it, or JPG, JP2, and even AVIF if this is the preferred media format by browser.

* `q_auto` - Auto detect the device resolution and provide the **most suitable quality** media accordingly. This is to save the bandwidth and ensure that users will enjoy the best quality media per device, while keeping the download size as optimal as possible.

## `cloudinaryAsset` - Use images ready on Cloudinary

To create GraphQL nodes for images that are already stored in Cloudinary, you need to have the nodes containing those images' stored information. To indicate the image is from Cloudinary, we use the flag `cloudinaryAsset`.

For example, to use a Cloudinary image as cover photo for a blog post written using markdown, we have the Front matter block inside the post similar to the following:

```yaml
---
title: Example blog post
description: It's just another hello world with cover photo
coverPhoto:
  cloudinaryAsset: true
  publicId: 'example'
---
```

By setting `cloudinaryAsset` to true, it indicates that this property field `coverPhoto` is a Cloudinary asset. Upon creating the GraphQL node, it will fetch the image from Cloudinary and replace the original property with a new node - `CldAsset` node that can be used with `g-image`.

You can then query your media using GraphQL, and apply further transformations for a fixed-width image, or responsive image.

## Fixed-width images with `fixed()`

To have your image served in **same size** for different resolutions, use the fixed-width image query - `fixed(width, height, baseTrans, chainedTrans)`.

```html
<page-query>
  query {
    allCldAsset {
      edges {
        node {
          fixed(
            width:500
            height:500
            baseTrans: {
              gravity: "auto"
              crop: "fill"
            }
            chainedTrans: [{
             effect: "grayscale" 
            }]
          ){
            src
            srcSet
          }
        }
      }
    }
  }
</page-query>
```

## Responsive images with `responsive()`

To have your image served in **different sizes** for different resolutions, use the responsize image query - `responsize( maxWidth, baseTrans, chainedTrans)`.

```html
<page-query>
  query {
    allCldAsset {
      edges {
        node {
          responsive(
            maxWidth: 1000
            baseTrans: {
              gravity: "auto"
              crop: "fill"
            }
            chainedTrans: [{
             effect: "grayscale"
            }]
          ){
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
</page-query>
```

## License

[MIT License](https://github.com/mayashavin/gridsome-plugin-cloudinary/blob/master/LICENSE)

Copyright(c)

Created and maintained by [Maya Shavin](https://twitter.com/MayaShavin)