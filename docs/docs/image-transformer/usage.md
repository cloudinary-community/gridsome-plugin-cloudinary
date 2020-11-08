---
title: Usage
slug: image-transformer-usage
category: Image Transformer
position: 4
---

This transformer is automatically enabled and used once it is installed in your project. Extra configuration options can be set globally under `transformers` field of `gridsome.config.js`.

 ```js
  /* gridsome.config.js */

  export default {
    plugins: [
      {
        use: '@gridsome/source-filesystem',
        options: {
          path: 'path-to-local-images',
        }
      },
    ]
  }
  ```

## Query for local images

1. Config `@gridsome/source-filesystem` plugin to fetch local images and map them in GraphQL Data layer under `typeName: ImageNode`.

  ```js
    /* gridsome.config.js */

    export default {
      plugins: [
        {
          use: '@gridsome/source-filesystem',
          options: {
            path: 'content/images',
            typeName: 'ImageNode'
          }
        },
      ]
    }
    ```

  **Warning** Don't use `Image` fo `typeName` because it is reserved by Gridsome.

2. Then you can query the image details on page component:

  ```html
  <page-query>
  query {
    images: allImageNode {
      edges {
        node {
          path
          name
          extension
        }
      }
    }
  }
  </page-query>  
  ```

## Manage images with Cloudinary

1. Add `.env` file contains the environment variables defined above `CLOUDNAME`, `API_KEY`, `API_SECRET`. Make sure you have this file added to `.gitignore` file to avoid committing and push it to the remote repo by accident.

  ```
  CLOUDNAME = your_cloud_name
  API_KEY = your_api_key
  API_SECRET = your_api_secret_key
  ```

  Learn how to get these keys [here](/image-transformer-loader#apikey---required)

2. Config `@gridsome/source-filesystem` plugin to fetch local images and map them in GraphQL Data layer under `typeName: ImageNode`.

  ```js
    /* gridsome.config.js */

    export default {
      plugins: [
        {
          use: '@gridsome/source-filesystem',
          options: {
            path: 'content/images',
            typeName: 'ImageNode'
          }
        },
      ]
    }
    ```

  **Warning** Don't use `Image` fo `typeName` because it is reserved by Gridsome.

3. Add Cloudinary as the loader using `transformers.img.loader` in `gridsome.config.js` with required configurations:

  ```js
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
  ```

4. Each of the `ImageNode` node will now have additional field `image`. The queried image's info will be fetched directly from Cloudinary if it was uploaded previously. Otherwise it will be uploaded to Cloudinary and returns the info accordingly.

```html
  <page-query>
  query {
    images: allImageNode {
      edges {
        node {
          image {
            secureUrl
            publicId
          }
        }
      }
    }
  }
  </page-query>  
  ```

5. Then you can use `g-image` to display the queried images according to their `securedUrl`.

```html
  <template>
    <Layout>
      <div>
        <ul>
          <li v-for="image in images" :key="image.publicId">
            <g-image :src="image.secureUrl" loading="lazy"/>
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
