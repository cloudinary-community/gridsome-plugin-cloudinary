<template>
  <Layout>
    <div class="px-5 lg:px-56 mx-auto">
      <h1 class="font-semibold px-1 text-2xl mb-5 text-pink-700">Images Gallery Demo</h1>
      <p class="text-lg mb-5 px-1">
        A demo <a href="https://gridsome.com" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700">Gridsome</a> site, 
        with optimized and transformed images served from <a href="https://cloudinary.com" target="_blank" class="underline text-indigo-700" rel="noopener noreferrer">Cloudinary</a>.
      </p>
      <ul class="flex flex-wrap">
        <li v-for="image in images" :key="image.public_id" class="p-1">
          <g-image :src="image.url" loading="lazy"/>
        </li>
      </ul>
    </div>
  </Layout>
</template>
<page-query>
query {
  images: allCldMedia {
    edges {
      node {
        format
        url
        public_id
      }
    }
  }
}  
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Gridsome - Cloudinary'
  },
  computed: {
    images() {
      return this.$page.images.edges.map(({ node }) => node
      )
    }
  }
}
</script>

