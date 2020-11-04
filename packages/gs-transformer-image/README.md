# `gridsome-transformer-image`

> Image transformer for Gridsome with options for optimization loader.

## Installation

```bash
yarn add gridsome-transformer-image
```

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
