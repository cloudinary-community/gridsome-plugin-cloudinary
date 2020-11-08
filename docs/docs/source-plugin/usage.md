---
title: Usage
slug: source-plugin-usage
category: Cloudinary Source Plugin
position: 3
---

To use the plugin, you need to have an account with [Cloudinary](https://cloudinary.com/users/register/free) and have your media files stored on Cloudinary. 

This plugin fetches the desired media files from your Cloudinary account to the Gridsome's Data layer, and expose them under the schema `CldMedia`. You can then query your media using GraphQL, and apply further transformations on them while building Gridsome site.

## `CldMedia` schema

The schema type contains basic information about the requested media provided by Cloudinary. The main fields are:

* `public_id` - this is the path to the media file stored in Cloudinary. It includes all the directories where the media file is nested.
* `url` - the deliver url (with or without HTTPS) of the asset. This will already have `f_auto` and `q_auto` enabled.
* `secure_url` - the HTTPS deliver url of the asset. It already contains `f_auto` and `q_auto` enabled for automatic format and quality serving.
* `format` - the original format of the stored media.
* `version` - the current version of the stored media. This field is used for controlling the cache.
* `resource_type` - type of the current media file : `image`, `video` or `raw`.
* `type` - storage type of the current media file. It will be identical with the `type` passed in `options.resourceOptions` field of the config in `gridsome.config.js`, or `all` if none presented.
* `bytes` - original size in bytes of the current media file.
* `width` and `height` - original width and height of the media file.

## Automatic format and quality serving

The plugin *automatically* apply the following optimization to all the media files fetched from [Cloudinary](https://cloudinary.com), which covers **more than 60% image optimization** use cases.

* `f_auto` - Auto detect and provide the most suitable media format for the request media on-the-fly. For example, with the same image URL, Cloudinary will return WEBP for Chrome or any browser supports it, or JPG, JP2, and even AVIF if this is the preferred media format by browser.

* `q_auto` - Auto detect the device resolution and provide the **most suitable quality** media accordingly. This is to save the bandwidth and ensure that users will enjoy the best quality media per device, while keeping the download size as optimal as possible.

## Example 1: Query images for a page

1. Add `.env` file contains the environment variables defined above `CLOUDNAME`, `API_KEY`, `API_SECRET`. Make sure you have this file added to `.gitignore` file to avoid committing and push it to the remote repo by accident.

  ```
  CLOUDNAME = your_cloud_name
  API_KEY = your_api_key
  API_SECRET = your_api_secret_key
  ```

  Learn how to get these keys [here](/source-plugin-options#apikey---required)

2. Config your `gridsome.config.js` to use the plugin `gridsome-source-cloudinary`.

  ```js
  /* gridsome.config.js */
  export default {
    plugins: [
      {
        use: 'gridsome-source-cloudinary',
        options: {
          cloudName: process.env.CLOUDNAME,
          apiKey: process.env.API_KEY,
          apiSecret: process.env.API_SECRET,
        },
      },
    ]
  }
  ```

3. Config `options.resourceOptions` field to give the plugin the basic information on the resources to fetch from Cloudinary.

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
            type: "upload", //Only fetch the uploaded items
            prefix: 'examples', //Folder to fetch media from: examples
            max_results: 50 //Return maximum 50 media items.
          },
        }
      }
    ]
  }
  ```

4. Then you can query the fetch images in a page using `page-query`

  ```html
  <page-query>
  query {
    images: allCldMedia {
      edges {
        node {
          secure_url
          public_id
        }
      }
    }
  }  
  </page-query>
  ```

5. And finally display them using in the page using `v-for` and `g-image`

  ```html
  <template>
    <Layout>
      <div>
        <ul>
          <li v-for="image in images" :key="image.public_id">
            <g-image :src="image.secure_url" loading="lazy"/>
          </li>
        </ul>
      </div>
    </Layout>
  </template>
  <script>
  export default {
    computed: {
      images() {
        return this.$page.images.edges.map(({ node }) => node)
      }
    }
  }
  </script>
  ```

## Example 2: Query an image for a specific component

1. Repeat the steps 1 - 3 in [Example 1](#example-1-query-images-for-a-page) to set up the plugin.
2. In component's file, use `static-query` to query the desired image according to 

  ```html
  <static-query>
  query CloudinaryMedia{
    cldMedia(public_id: { eq: "example" }) {
      secure_url
    }
  }
  </static-query>
  ```

3. And display the image with `g-image`

  ```html
  <template>
    <Layout>
      <div>
        <g-image :src="cloudinaryMedia.secure_url" loading="lazy"/>
      </div>
    </Layout>
  </template>
  ```

## Example 3: Pre-apply bulk transformations

1. Repeat the steps 1 - 3 in [Example 1](#example-1-query-images-for-a-page) to set up the plugin and config where and what media files to fetch from Cloudinary.
2. We can also define a bulk transformation to apply on the fetched media files before adding them to the data layer for querying using `options.transformations` field. For example, let's resize the fetched media files to 300x300, with automatic cropping focus (auto face or subject detection).

  ```html
  export default {
    plugins: [
      {
        use: 'gridsome-source-cloudinary',
        options: {
          cloudName: process.env.CLOUDNAME,
          apiKey: process.env.API_KEY,
          apiSecret: process.env.API_SECRET,
          resourceOptions: {
            type: "upload", //Only fetch the uploaded items
            prefix: 'examples', //Folder to fetch media from: examples
            max_results: 50 //Return maximum 50 media items.
          },
          transformations: {
            width: 300,
            height: 300,
            gravity: 'auto',
            crop: 'fill',
          }
        }
      }
    ]
  }
  ```

3. Then you can query the fetch images in a page using `page-query`

  ```html
  <page-query>
  query {
    images: allCldMedia {
      edges {
        node {
          secure_url
          public_id
        }
      }
    }
  }  
  </page-query>
  ```

4. And finally display them using in the page using `v-for` and `g-image`. The images now are served with size 300x300 and cropped around face/subject automatically.

  ```html
  <template>
    <Layout>
      <div>
        <ul>
          <li v-for="image in images" :key="image.public_id">
            <g-image :src="image.secure_url" loading="lazy"/>
          </li>
        </ul>
      </div>
    </Layout>
  </template>
  <script>
  export default {
    computed: {
      images() {
        return this.$page.images.edges.map(({ node }) => node)
      }
    }
  }
  </script>
  ```
