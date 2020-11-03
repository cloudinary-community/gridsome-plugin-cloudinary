# `@mayas/gridsome-plugin-cld`

> Cloudinary plugin for Gridsome

## Usage

```js
/*gridsome.config.js*/
export default {
  plugins: [
    {
      use: "@mayas/gridsome-plugin-cld",
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
      }
    },
  ]
}
```
