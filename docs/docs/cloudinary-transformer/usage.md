---
title: Usage
slug: cloudinary-transformer-usage
category: Cloudinary Image Transformer
position: 3
---

To use the plugin, you need to have an account with [Cloudinary](https://cloudinary.com/users/register/free) and have your media files stored on Cloudinary.

This plugin fetches the desired media files from your Cloudinary account to the Gridsome's Data layer, and transforms them into two set of images - fixed and responsive. The approach is based on `srcset` of `img` tag, as indicated in [Responsive image documentation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

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

The `fixed` field of `CldAsset` receives the following agruments:

* `width`
  * Type: `Integer`
  * Indicate the desired width for the querying image. If not presented, the width will be calculated by the aspect ratio between the original width and the passed `height` (if any).
* `height`
  * Type: `Integer`
  * Indicate the desired height for the querying image.
* `baseTrans`
  * Type: `CldTransformation` (`Object`)
  * The base transformations to apply on the image on-the-fly. Check [Transformations](/transformations) for acceptable properties.
* `chainedTrans`
  * Type: `CldTransformation[]`
  * The chaining group of advanced transformation to apply on the image. Check [Transformations](/transformations) for acceptable properties.

It returns a nested node which contains the following fields:

* `height` - the desired height (or calculated height based on the width) of image.
* `width` - the desired width of image
* `src` - the main delivery URL of the image with all the base and chained transformation. `f_auto` and `q_auto` are added by default.
* `srcSet` - the set of delivery URLs for the same image, in different resolutions (1x, 1.5x, 2x and 3x)

Upon querying the images successfully, you can use `g-image` and `srcSet` to display the fixed-width images:

```html
<template>
  <Layout>
    <section>
      <g-image
        v-for="image in images"
        :key="image.publicId"
        :src="image.fixed.src"
        :srcSet="image.fixed.srcSet"
      />
    </section>
  </Layout>
</template>
<script>
export default {
  computed: {
    images() {
      return this.$page.allCldAsset.edges.map(({ node }) => node)
    }
  },
}
</script>
```

For more examples, see the [Demo](/demo/cloudinary-transformer).

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

The `fixed` field of `CldAsset` receives the following agruments:

* `maxWidth`
  * Type: `Integer`
  * The maximum width for responsive images. If not presented, the original width will be used.
* `baseTrans`
  * Type: `CldTransformation` (`Object`)
  * The base transformations to apply on the image on-the-fly. Check [Transformations](/transformations) for acceptable properties.
* `chainedTrans`
  * Type: `CldTransformation[]`
  * The chaining group of advanced transformation to apply on the image. Check [Transformations](/transformations) for acceptable properties.

It returns a nested node which contains the following fields:

* `viewHeight` - the desired height (or calculated height based on the width) of image.
* `viewWidth` - the desired width of image
* `src` - the main delivery URL of the image with all the base and chained transformation. `f_auto` and `q_auto` are added by default.
* `srcSet` - the set of delivery URLs for the same image, with indicating of size per image, separating by comma. Browser will choose the right image url to serve from this set.
* `sizes` - the set of screen widths indicating to the browser which image size to choose best if the width considition is met.

Upon querying the images successfully, you can use `g-image`, `srcSet`, and `sizes` to display the fixed-width images:

```html
<template>
  <Layout>
    <section>
      <g-image
        v-for="image in images"
        :key="image.publicId"
        :src="image.responsive.src"
        :srcSet="image.responsive.srcSet"
        :sizes="image.responsive.sizes"
      />
    </section>
  </Layout>
</template>
<script>
export default {
  computed: {
    images() {
      return this.$page.allCldAsset.edges.map(({ node }) => node)
    }
  },
}
</script>
```

## Manual creating Cloudinary data for Gridsome image

In addition, the transformer exposes two functionalities which you can import and use them to create fixed and responsive images accordingly.

### `async createFixedImage()`

* `publicId`
  * Type: `string`
  * `required`
  * The path/to/the/image stored in Cloudinary.
* `baseTrans`
  * Type: `Object`
  * The base transformations to apply on the image on-the-fly. Check [Transformations](/transformations) for acceptable properties.
* `width`
  * Type: `Integer`
  * Indicate the desired width for the querying image. If not presented, the width will be calculated by the aspect ratio between the original width and the passed `height` (if any).
* `height`
  * Type: `Integer`
  * Indicate the desired height for the querying image.
* `chainedTrans`
  * Type: `Object[]`
  * The chaining group of advanced transformation to apply on the image. Check [Transformations](/transformations) for acceptable properties.

Others parameters for further configuring Cloudinary, such as:

Property | Type | Default | Required | Description
--- | --- | --- | --- | ---
`type` | string | `upload` | no | Delivery (storage) type of the asset: <br>`upload` <br> `private`<br>`authenticated`<br>`facebook`, `twitter`<br>`gravatar`, `youtube`, `hulu`<br>`vimeo`, `animoto`
`resourceType` | string | `image` | no | Type of the asset:<br>`image` (*also for gif*)<br>`raw`<br>`video` (*includes audio like .mp3*)
`cloudName` | string | n/a | no | The cloud where the queried image is stored. <br>Not needed if provided in the `gridsome.config.js` file.

Returns an Object which contains the following information for a fixed-width image:

* `height` - the desired height (or calculated height based on the width) of image.
* `width` - the desired width of image
* `src` - the main delivery URL of the image with all the base and chained transformation. `f_auto` and `q_auto` are added by default.
* `srcSet` - the set of delivery URLs for the same image, in different resolutions (1x, 1.5x, 2x and 3x)

```js
createFixedImage({
  publicId: "sample",
  width:500,
  height:500,
  baseTrans: {
    gravity: "auto"
    crop: "fill"
  },
  chainedTrans: [{
    effect: "grayscale"
  }],
  cloudName: "demo",
})
```

### `async createResponsiveImage()`

* `publicId`
  * Type: `string`
  * `required`
  * The path/to/the/image stored in Cloudinary.
* `breakpoints`
  * Type: `Integer[]`
  * Default: `[200, 400, 600]`
  * Define the breakpoints for calculating the sizes of responsive image accordingly.
* `maxWidth`
  * Type: `Integer`
  * The maximum width for responsive images. If not presented, the original width will be used.
* `baseTrans`
  * Type: `CldTransformation` (`Object`)
  * The base transformations to apply on the image on-the-fly. Check [Transformations](/transformations) for acceptable properties.
* `chainedTrans`
  * Type: `CldTransformation[]`
  * The chaining group of advanced transformation to apply on the image. Check [Transformations](/transformations) for acceptable properties.
* Others parameters for further configuring Cloudinary, such as:

  Property | Type | Default | Required | Description
  --- | --- | --- | --- | ---
  `type` | string | `upload` | no | Delivery (storage) type of the asset: <br>`upload` <br> `private`<br>`authenticated`<br>`facebook`, `twitter`<br>`gravatar`, `youtube`, `hulu`<br>`vimeo`, `animoto`
  `resourceType` | string | `image` | no | Type of the asset:<br>`image` (*also for gif*)<br>`raw`<br>`video` (*includes audio like .mp3*)
  `cloudName` | string | n/a | no | The cloud where the queried image is stored. <br>Not needed if provided in the `gridsome.config.js` file.

It returns an `Object` which contains the following fields for a responsive image:

* `viewHeight` - the desired height (or calculated height based on the width) of image.
* `viewWidth` - the desired width of image
* `src` - the main delivery URL of the image with all the base and chained transformation. `f_auto` and `q_auto` are added by default.
* `srcSet` - the set of delivery URLs for the same image, with indicating of size per image, separating by comma. Browser will choose the right image url to serve from this set.
* `sizes` - the set of screen widths indicating to the browser which image size to choose best if the width considition is met.

```js
createFixedImage({
  publicId: "sample",
  maxWidth: 1000,
  baseTrans: {
    gravity: "auto"
    crop: "fill"
  },
  chainedTrans: [{
    effect: "grayscale"
  }],
  cloudName: "demo",
})
```