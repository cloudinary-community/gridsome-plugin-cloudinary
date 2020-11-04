# `gridsome-transformer-img`

> Images transformer for Gridsome with options for optimization loader.

## Installation

```bash
yarn add gridsome-transformer-img
```

## Usage

```js
export default {
  transformers: {
    img: {
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
