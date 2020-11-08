---
title: Image Loader
slug: image-transformer-loader
category: Image Transformer
position: 3
---

The transformer supports using external media optimizer such as [Cloudinary](https://cloudinary/com) to process and manage local images on build time, instead of relying on the default mechanism from Gridsome.

To configure your desired media loader solution, use `img.loader` field inside `transformers` section of `gridsome.config.js`

## `type` - Required

* Type: `String`
* Accepted value: `cloudinary`

Specify the target media loader solution to use.

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

At the momemt, there is only Cloudinary loader supported. Feel free to open PR and add more loaders :).

## Loader - Cloudinary

To use Cloudinary as your image loader, you need to have an account with [Cloudinary](https://cloudinary.com/users/register/free).

Then, provide the following configurations:

### `cloudName` - Required

* Type: `String`
* `required`

The cloud name associated with your Cloudinary account. It is used to indicate which Cloudinary cloud to upload the images to. 

```js
/* gridsome.config.js */

export default {
  transformers: {
    img: {
      loader: {
        type: 'cloudinary',
        cloudName: 'your-cloud-name'
      }
    }
  }
}
```

Cloud name presents in every delivered URL from Cloudinary, hence it's important to have it configured correctly.

You can find your cloud name details in **Dashboard** page, or in **Account Settings** page in [Cloudinary console](https://cloudinary.com/console)

### `apiKey` - Required

* Type: `String`
* `required`

The API Key associated with your Cloudinary account. It is used together with `apiSecret` to securely upload images and videos to your Cloudinary.

```js
/* gridsome.config.js */

export default {
  transformers: {
    img: {
      loader: {
        type: 'cloudinary',
        apiKey: 'your-api-key'
      }
    }
  }
}
```

You can find your API Key in your **Cloudinary Dashboard** page, or in **Settings/Security** page in [Cloudinary console](https://cloudinary.com/console)

![How to find apiKey in Cloudinary Console](https://res.cloudinary.com/mayashavin/image/upload/f_auto,q_auto,w_730/v1601805482/nuxt-cld/apikey)

**Warning** These private keys should be kept as environment variables in `.env`.

### `apiSecret` - Required

* Type: `String`
* `required`

The API Secret Key associated with your Cloudinary account. It is used together with `apiKey` to securely upload images and videos to your Cloudinary.

```js
/* gridsome.config.js */

transformers: {
    img: {
      loader: {
        type: 'cloudinary',
        apiSecret: 'your-api-secret-key'
      }
    }
  }
```

You can find your API Secret Key in your **Cloudinary Dashboard** page, or in **Settings/Security** page in [Cloudinary console](https://cloudinary.com/console).

![How to find apiSecret in Cloudinary Console](https://res.cloudinary.com/mayashavin/image/upload/f_auto,q_auto,w_730/v1601805482/nuxt-cld/apikey_2)

**Warning** These private keys should be kept as environment variables in `.env`.
