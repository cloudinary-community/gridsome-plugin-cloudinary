---
title: Options
slug: image-transfomer-options
category: Image Transformer
position: 2
---

For adding extra configurations for the transformer plugin, we add `img` field to the `transformers` section of `gridsome.config.js`.

```js
/* gridsome.config.js */
  export default {
    transformers: {
      img: {
        /* Extra configurations */
      }
    }
  }
```

The list of available options are shown as below:

### `uploadOptions`

* Type: `Object`

Contains the upload configurations for uploading and processing the images by a loader. 

```js
/* gridsome.config.js */
export default {
  transformers: {
    img: {
      uploadOptions: {
        folder: 'examples',
      },
    }
  }
}
```

It currently accept the following properties:

Property | Type | Default | Required | Description
--- | --- | --- | --- | ---
`folder` | string | `` | no | The directory where the images should be uploaded to.

### `loader`

* Type: `Object`
* **Required** when `img.uploadOptions` is used.

Indicate which image optimizing loader should be used through `loader.type` and other required configurations for that specific loader.

```js
export default {
  transformers: {
    img: {
      loader: {
        type: 'cloudinary',
        /* Cloudinary configurations */
      }
    }
  }
}
```

View [Loader](/image-transformer-loader) for types and required configurations per loader supported.