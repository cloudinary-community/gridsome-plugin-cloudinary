# Manage your images with Cloudinary in Gridsome apps

[![Netlify Status](https://api.netlify.com/api/v1/badges/26ef3048-66c3-46a7-b719-49dcfd1dcd85/deploy-status)](https://app.netlify.com/sites/gridsome-cloudinary/deploys)

> [Cloudinary](https://cloudinary.com) integration for [Gridsome](https://gridsome.org)

[Demo site](https://gridsome-cloudinary.netlify.app/demo)

Optimize and manage your images and videos in your Gridsome application with the available Cloudinary plugins.

## Available plugins

[Image transformer plugin](https://github.com/mayashavin/gridsome-plugin-cloudinay/packages/gs-cld-transformer) · [Source plugin](https://github.com/mayashavin/gridsome-plugin-cloudinay/packages/gs-cld-source) · [Cloudinary image plugin](https://github.com/mayashavin/gridsome-plugin-cloudinay/packages/gs-cld-plugin)

## What is Cloudinary?

[Cloudinary](https://cloudinary.com) is a cloud-based SaaS that provides an end-to-end image and video management solution including uploads, storage, manipulations, optimizations and delivery. All your media resources are optimized and delivered through a fast CDN using industry best practices.

Some of the features the plugins offer are listed below:

* On-the-fly url generation for images and videos with optimization
* Built-in optimization per browser and device
* Built-in auto-detect optimized format per browser for images and videos
* Responsive and reactive transformations on images and videos
* Minimum configuration required to set up Cloudinary and running
* Upload and manage images and videos through Cloudinary API.

## Development & Contribution

1. Clone [this repository](https://github.com/mayashavin/gridsome-plugin-cloudinary)
2. Make the changes in the related package project, and run any of the following commands to debug/check your status.

  * `yarn build:demo` - build the demo site
  * `yarn dev:demo` - start the local dev environment for the `demo` site
  * `yarn build:api` - compile `@mayas/cld-api` project from TypeScript.
  * `yarn build:plugin` - compile the general plugin project `mayas/gridsome-plugin-cloudinary` from TypeScript.
  * `yarn plugin` - run local dev environment for `demo` project for the general plugin.
  * `yarn source` - run local dev environment for `demo` project to debug source plugin.

3. Run `yarn test:api` to test the api.

## License

[MIT License](https://github.com/mayashavin/gridsome-plugin-cloudinary/blob/master/LICENSE)

Copyright(c)

Created and maintained by [Maya Shavin](https://twitter.com/MayaShavin)