<template>
  <Layout>
    <h1 class="px-1 text-2xl text-indigo-500 mb-10">Cloudinary Image Transfomer Demo</h1>
    <section>
      <div class="text-2xl border-b border-indigo-200 pb-2 mb-5">Fixed images</div>
      <div class="flex flex-wrap">
        <div v-for="(kitten, index) in fixedKittens" :key="index">
          <div class="text-lg">{{kitten.title}}</div>
          <g-image         
            :src="kitten.fixed.src" 
            :srcSet="kitten.fixed.srcSet" 
            :width="kitten.width"
            :height="kitten.height"
            class="p-2 pl-0"
          />
        </div>
      </div>
    </section>
    <section class="mt-10">
      <div class="text-2xl pb-2 mb-5 border-b border-indigo-200">Responsive images</div>
      <div class="flex flex-wrap">
        <div v-for="(kitten, index) in fixedKittens.filter(kit => kit.responsive)" :key="index">
          <div class="text-lg">{{kitten.title}}</div>
          <g-image         
            :src="kitten.responsive.src" 
            :srcSet="kitten.responsive.srcSet" 
            :sizes="kitten.responsive.sizes"
            class="p-2 pl-0"
          />
        </div>
        <div class="mt-4">
          <div class="text-lg pl-2">A bit purple chained transformation</div>
          <div class="flex flex-wrap">
            <g-image 
              v-for="image in images" 
              :key="image.publicId" 
              :src="image.responsive.src" 
              :srcSet="image.responsive.srcSet" 
              :sizes="image.responsive.sizes"
              class="p-2"
            />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  kitten: allCldAsset(filter: { publicId: { eq: "examples/kitten_2"}}) {
    edges {
      node {
        publicId
        fixed(
          width:300
          baseTrans: {
            crop: "scale"
          }
        ) {
          src
          srcSet
          width
          height
        }
        responsive(
          maxWidth:300
          baseTrans: {
            crop: "scale"
          }
        ) {
          src
          srcSet
          viewWidth
          sizes
        }
      }
    }
  }
  kitten2: allCldAsset(filter: { publicId: { eq: "examples/kitten_2"}}) {
    edges {
      node {
        publicId
        fixed(
          width:300 
          height:300 
          baseTrans: {
            gravity: "auto"
            crop: "fill"
          }
          chainedTrans: [{
            effect: "grayscale"
          }, {
            effect: "tint:100:blue:0p:white:100p"
          }]
        ) {
          src
          srcSet
          width
          height
        }
        responsive(
          maxWidth:300 
          baseTrans: {
            gravity: "auto"
            crop: "fill",
            height: 200,
          }
          chainedTrans: [{
            effect: "grayscale"
          }, {
            effect: "tint:100:blue:0p:white:100p"
          }]
        ) {
          src
          srcSet
          viewWidth
          sizes
        }
      }
    }
  }
  kitten1: allCldAsset(filter: { publicId: { eq: "examples/kitten_2"}}) {
    edges {
      node {
        publicId
        fixed(
          width:300 
          height:300 
          baseTrans: {
            gravity: "auto"
            crop: "fill"
          }
        ) {
          src
          srcSet
          width
          height
        }
      }
    }
  }
  kitten3: allCldAsset(filter: { publicId: { eq: "examples/kitten_2"}}) {
    edges {
      node {
        publicId
        fixed(
          width:200 
          height:200 
          baseTrans: {
            crop: "thumb"
            gravity: "auto:subject"
          }
        ) {
          src
          srcSet
          width
          height
        }
      }
    }
  }
  images: allCldAsset {
    edges {
      node {
        publicId
        fixed(
          width:500 
          height:500 
          baseTrans: {
            gravity: "auto"
            crop: "fill"
          }
          chainedTrans: [{
            effect: "grayscale"
          }]
        ) {
          src
          srcSet
        }
        responsive(
          baseTrans: {
            gravity: "auto"
            crop: "fill"
          }
          chainedTrans: [{
            effect: "grayscale"
          }, {
            effect: "tint:100:663399:0p:white:100p"
          }]
          maxWidth: 500) {
          src
          srcSet
          sizes
        }
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: 'Demo - Cloudinary image transformer for Gridsome'
  },
  computed: {
    images() {
      return this.$page.images.edges.map(({ node }) => node)
    },
    fixedKittens() {
      return [{
        title: "An image at width 300 with scaling",
        ...this.$page.kitten.edges[0].node
      }, {
        title: "With auto cropping focus",
        ...this.$page.kitten1.edges[0].node
      }, {
        title: "With chained blue effect",
        ...this.$page.kitten2.edges[0].node
      }, {
        title: "Create avatar in any size from image!",
        ...this.$page.kitten3.edges[0].node
      }]
    }
  },
}
</script>
