# `gridsome-transformer-image`

> Image transformer for Gridsome

## Usage

```js
export default {
  transformers: {
    image: {
      uploadOptions: {
        folder: 'examples',
      },
      loader: {
        type: 'cloudinary',
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
      }
    }
  }
}
```
