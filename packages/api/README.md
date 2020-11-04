# @mayas/cld-api

> More friendly API Wrapper for [Cloudinary](https://cloudinary.com) SDK

## 🧰&nbsp; Setup

1. Add `@mayas/cld-api` dependency to your project

```bash
npm i @mayas/cld-api

#Or by YARN
yarn add @mayas/cld-api
```

2. Create an `.env` file in the root directory with the following details

```
CLOUDNAME=replace_this_with_your_cloudname
API_KEY=replace_this_with_your_api_key
API_SECRET=replace_this_with_your_api_secret_key
// Any other field
```

🛑&nbsp; _**Remember** to add `.env` to `.gitignore` to avoid committing and pushing this file to remote repo by accident._

3. Start using 😃

### `CldApi`

```js
const { CldApi } = require('@mayas/cld-api');

const instance = new CldApi({
  cloudName: process.env.CLOUDNAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,  
  /* other Cloudinary options */
})
```

This is the class wrapper for basic [Cloudinary](https://cloudinary.com) APIs, which provides the following methods or fields:

#### `CldApi.image`

Instance that contains the functionalities for **images**

* `CldApi.image.url(publicId, options?)`
  
  - `publicId` : `String` - **required** The path to stored asset in Cloudinary. See [here](https://cloudinary.nuxtjs.org/examples/basic#display-a-cloudinary-stored-image-as-avatar) to know how to get `publicId`.
  - `options` : `Object` - Optional transformations or configurations to apply to the target asset.
  
  Returns a delivery url `String` for an asset from Cloudinary based on `publicId` and with transformations passed to `options`.

  ```js
  // get delivery url for an asset "sample" on scaled size 500x500
  const url = instance.image
                .url('sample', {
                  crop: 'scale',
                  width: '500',
                  height: '500'
                })
  ```

* `CldApi.image.fetchRemote(url, options?)`
  - `url` : `String` - **required** - Valid URL path to an image.
  - `options` : `Object` - Additional effects/transformations to apply to the original image on delivery.
  
  Returns a Cloudinary delivery url `String` for the requested image.

  ```js
  const url = instance.image
                .fetchRemote(
                  'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                  { crop: 'scale', width: 200 })
  ```

#### `CldApi.video`

Instance that contains the functionalities for **images**

* `CldApi.video.url(publicId, options?)`

  - `publicId`
    - Type: `String`
    - `required`
    - Path to original video stored in Cloudinary. See [here](https://cloudinary.nuxtjs.org/examples/basic#display-a-cloudinary-stored-image-as-avatar) to know how to get `publicId`.
  
  Returns the delivery URL of an video based on its `publicId` and `options` for additional effects/transformations to apply to the original version stored in Cloudinary.

  ```js
  // get delivery url for an asset "sample" on scaled size 500x500
  const url = instance.image
                .url('sample', {
                  crop: 'scale',
                  width: '500',
                  height: '500'
                })
  ```

* `CldApi.video.thumbnail(publicId, options?)`

  - `publicId`
    - Type: `String`
    - `required`
    - Path to original video stored in Cloudinary
  - `options`
    - Type: `Object`
    - Additional effects/transformations to apply to the thumbnail image generated from the original video.
  
  Returns Object which contains:

  - `url`
    - Type: `String`
    - Delivery URL generated for the requested video as a video thumbnail.

#### `CldApi.upload(file, options?)`

* `file`
  * Type: `String`
  * `required`
  * Path to the target asset file for uploading
* `options`
  * Type: `Object`
  * Configuration options to apply to the target asset during uploading to Cloudinary.
* Returns a `Promise<Asset | Error>`

> **Tip**: Check out [Asset API](https://cloudinary.nuxtjs.org/usage/upload#asset) to understand the structure of the uploaded asset returned from Cloudinary.

```js
const instance = this.$cloudinary
                .upload('my-target-file-path', {
                  public_id: 'Example'
                })
```

#### `CldApi.resources(options)`

* `options`
  * Type: `Object`

Find and returns the assets stored in Cloudinary based on the options sent. Some options are presented below:

Option | Type | Required | Default | Description
--- | --- | --- | --- | ---
`resourceType` | string | Required if use `prefix` | `image` | Type of the stored asset. Can be `image`, `raw` and `video` (including audio).
`type` | string | Required if use `prefix` | `all` | Storage type of the asset on Cloudinary.
`maxResults` | number | No | 10 | Max number of resources to query
`tags` | boolean | No | `false` | Whether to include the list of tags for each resource
`prefix` | string | No | N/A | the folder to find the match resources.
`context` | boolean | No | `false` | Specify if the context data per resource should be returned. It is useful for `alt` text, or custo metadata in `key:value` pairs for a resource in Cloudinary.

```js
const instance = this.$cloudinary
                .resources({
                  type: "upload",
                  prefix: 'examples',
                  max_results: 50
                })
```

#### `CldApi.resource(publicId, options?)`

* `publicId`
  * Type: `String`
  * `required`
  * Path to the original asset stored in Cloudinary.
* `options`
  * Type: `Object`
  * `options.type` is `required`.

> **Tip**: See [Cloudinary delivery types](#constants.delivery_types) for full list of available values.

```js
const instance = this.$cloudinary
                .resource('my-target-public-id', {
                  type: 'upload'
                })
```

#### `CldApi.config(options?)`

* `options`
  * Type: `Object`
  * Configuration options for Cloudinary.

Returns the current Cloudinary config after updated.

```js
const updatedConfig = this.$cloudinary
                .config({
                  cloudName: 'your-new-cloud-name'
                })

console.log(updateConfig) //{ cloud_name: 'your-new-cloud-name' }
```

### `CONSTANTS`

```js
const { CONSTANTS } = require('@mayas/cld-api')

```

The available constants for usage:

#### `CONSTANTS.DELIVERY_TYPES`

Map of acceptable delivery types for passing to `upload` call. Including:

 Variable | Value 
--- | ---
UPLOAD | 'upload'
PRIVATE | 'private'
AUTHENTICATED | 'authenticated'
FETCH | 'fetch'
MULTI | 'multi'

#### `CONSTANTS.DEFAULT_TRANS`

Map of default basic optimization applied to any asset upon the call `url()`

 Field | Value 
--- | ---
fetchFormat | 'auto'
quality | 'auto'

#### `CONSTANTS.RESOURCE_TYPES`

Map of basic asset types accepted by Cloudinary instance.

 Type | Value 
--- | ---
IMAGE | 'image'
VIDEO | 'video'

## Development

1. Clone [this repository](https://github.com/mayashavin/gridsome-plugin-cloudinary)
2. Run `yarn build:api` to compile the current code from TypeScript to JavaScript.
3. Run `yarn test:api` to test the api.

## License

[MIT License](https://github.com/mayashavin/gridsome-plugin-cloudinary/blob/master/LICENSE)

Copyright(c)

Created and maintained by [Maya Shavin](https://twitter.com/MayaShavin)