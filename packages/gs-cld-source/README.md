# `gridsome-source-cloudinary`

> Cloudinary Source plugin for Gridsome

* [📖&nbsp; Documentation](https://gridsome-cloudinary.netlify.app/source-plugin)
* [🎮&nbsp; Demo site](https://gridsome-cloudinary.netlify.app/demo)

To use the plugin, you need a Cloudinary account first. [Register for a free account](https://cloudinary.com/users/register/free) if you haven't got one yet.

## Automatic format and quality serving

The plugin *automatically* apply the following optimization to all the media files fetched from [Cloudinary](https://cloudinary.com), which covers **more than 60% image optimization** use cases.

* `f_auto` - Auto detect and provide the most suitable media format for the request media on-the-fly. For example, with the same image URL, Cloudinary will return WEBP for Chrome or any browser supports it, or JPG, JP2, and even AVIF if this is the preferred media format by browser.

* `q_auto` - Auto detect the device resolution and provide the **most suitable quality** media accordingly. This is to save the bandwidth and ensure that users will enjoy the best quality media per device, while keeping the download size as optimal as possible.

You can set up the source plugin easily in two following steps:

## Setup

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

See [Examples](https://gridsome-cloudinary.netlify.app/source-plugin-usage) for use case examplesin working with Cloudinary source plugin.

And that's it 🎉!

## License

[MIT License](https://github.com/mayashavin/gridsome-plugin-cloudinary/blob/master/LICENSE)

Copyright(c)

Created and maintained by [Maya Shavin](https://twitter.com/MayaShavin)