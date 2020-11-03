<template>
  <Layout>
    <div class="px-5 lg:px-56 mx-auto">
      <h1 class="font-semibold px-1 text-2xl mb-5 text-pink-700">Images Gallery Demo</h1>
      <p class="text-lg mb-5 px-1">
        A demo <a href="https://gridsome.com" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700">Gridsome</a> site, 
        with optimized and transformed images served from <a href="https://cloudinary.com" target="_blank" class="underline text-indigo-700" rel="noopener noreferrer">Cloudinary</a>.
      </p>
      <div>
        <div class="my-5">
          <div class="text-2xl mb-5 mx-3">Rotation</div>
          <div>
            <label class="mx-3" v-for="rotation in rotations" :key="rotation.value">
              <input type="radio" v-model="angle" :value="rotation.value" :key="rotation.value" :id="`${rotation.name}_degree`">
              Rotate {{rotation.name}} Degree
            </label>
            <label class="mx-3">
              <input type="radio" v-model="angle" value=0 key="0" :id="`0_degree`">
              Default
            </label>
          </div>
        </div>
        <div class="my-5">
          <div class="text-2xl mb-5 mx-3">Make it round</div>
          <div>
            <label class="mx-3" v-for="corner in corners" :key="corner">
              <input type="radio" v-model="radius" :value="corner" :key="corner" :id="`${corner}_px`">
              {{corner}}
            </label>
            <label class="mx-3">
              <input type="radio" v-model="radius" value="max" key="max" :id="`rounded`">
              Maximum
            </label>
            <label class="mx-3">
              <input type="radio" v-model="radius" value=0 key="0" :id="`0_px`">
              Default
            </label>
          </div>
        </div>
        <div class="my-5">
          <div class="text-2xl mb-5 mx-3">Add effect</div>
          <div>
            <label class="mx-3 capitalize" v-for="opt in effects" :key="opt">
              <input type="radio" v-model="effect" :value="opt" :key="opt" :id="`${opt}_effect`">
              {{opt}}
            </label>
            <label class="mx-3">
              <input type="radio" v-model="effect" value='' key="0" :id="`0_effect`">
              Default
            </label>
          </div>
        </div>
      </div>
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
import Resize from '@cloudinary/base/actions/resize';
import Rotate from '@cloudinary/base/actions/rotate'
import RoundCorners from '@cloudinary/base/actions/roundCorners';
import Effect from '@cloudinary/base/actions/effect';

export default {
  metaInfo: {
    title: 'Gridsome - Cloudinary'
  },
  data() {
    return {
      angle: 0,
      radius: 0,
      rotations: [{
        value: 30,
        name: '30'
      }, {
        value: 45,
        name: '45'
      }, {
        value: 90,
        name: '90'
      }, {
        value: 120,
        name: '120'
      }],
      corners: [10, 20, 30, 100],
      effect: '',
      effects: ['grayscale', 'negate', 'assistColorBlind', 'vectorize', 'pixelate']
    }
  },
  computed: {
    images() {
      return this.$page.images.edges.map(({ node }) => {
        const url = this.$cld.image(node.public_id)
          .resize(Resize.scale().width(300).height(300))
          .roundCorners(this.radius === 'max' ? RoundCorners.max() : RoundCorners.byRadius(this.radius))
          .rotate(Rotate.byAngle(this.angle))
          .effect(this.effect ? Effect[this.effect](): '')
          .toURL()
        return {
          url,
          public_id: node.public_id
        }
      })
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
