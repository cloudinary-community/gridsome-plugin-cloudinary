---
title: Usage
slug: cloudinary-transformer-usage
category: Cloudinary Image Transformer
position: 3
---

To use the plugin, you need to have an account with [Cloudinary](https://cloudinary.com/users/register/free) and have your media files stored on Cloudinary. 

This plugin fetches the desired media files from your Cloudinary account to the Gridsome's Data layer, and transforms them into two set of images - fixed and responsive. The approach is based on `srcset` of `img` tag, as indicated in [Responsive image documentation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

Upon querying, the transformer expose the media file under the schema `CldAsset`. You can then query your media using GraphQL, and apply further transformations for a fixed-width image, or responsive image.

## Fixed-width images

## Responsive images

## GIF images

## Manual creating Cloudinary data for Gridsome image
