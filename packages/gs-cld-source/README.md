# `gridsome-source-cloudinary`

> Cloudinary Source plugin for Gridsome

[Demo site](https://gridsome-cloudinary.netlify.app/)

## Installation

```bash
yarn add gridsome-source-cloudinary
```

## Usage

```js
export default {
  plugins: [
    {
      use: 'gridsome-source-cloudinary',
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        resourceOptions: {
          type: "upload",
          prefix: 'examples',
          max_results: 50
        },
        // transformations: {
        //   width: 200,
        //   height: 200,
        //   gravity: 'auto:subject',
        //   crop: 'fill',
        // }
      },
    },
  ]
}
```
