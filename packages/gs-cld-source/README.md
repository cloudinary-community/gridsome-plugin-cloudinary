# `@mayas/gridsome-source-cld`

> Cloudinary Source plugin for Gridsome

## Installation

```bash
yarn add @mayas/gridsome-source-cld
```

## Usage

```js
export default {
  plugins: [
    {
      use: '@mayas/gridsome-source-cld',
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
