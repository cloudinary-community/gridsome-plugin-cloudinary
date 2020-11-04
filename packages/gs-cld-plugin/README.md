# `gridsome-plugin-cloudinary`

> Cloudinary general plugin for Gridsome

[Demo site](https://gridsome-cloudinary.netlify.app/)

## Installation

```
yarn add gridsome-plugin-cloudinary
```

## Usage

```js
/*gridsome.config.js*/
export default {
  plugins: [
    {
      use: "gridsome-plugin-cloudinary",
      options: {
        cloudName: process.env.CLOUDNAME,
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
      }
    },
  ]
}
```
