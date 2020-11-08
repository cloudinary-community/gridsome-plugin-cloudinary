<template>
  <Layout>
    <div>
      <h1 class="font-semibold px-1 text-2xl mb-5 text-indigo-500">Cloudinary Plugins Demos</h1>
      <p class="text-lg mb-5 px-1">
        Demo <a href="https://gridsome.org" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700">Gridsome</a> site, 
        with optimized and transformed images served from <a href="https://cloudinary.com" target="_blank" class="underline text-indigo-700" rel="noopener noreferrer">Cloudinary</a>.
      </p>
      <div class="flex flex-col px-1">
        <g-link to="/demo/cloudinary-source" title="Cloudinary source plugin demo" class="my-2">Demo - Cloudinary Source Plugin</g-link>
        <g-link to="/demo/cloudinary-transformer" title="Cloudinary source plugin demo" class="my-2">Demo - Cloudinary Image Transformer</g-link>
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  metaInfo: {
    title: 'Demos - Cloudinary plugins for Gridsome'
  }
}
</script>