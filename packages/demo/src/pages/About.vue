<template>
  <Layout>
    <section class="posts">
      <PostList v-for="edge in $page.allPost.edges" :key="edge.node.id" :post="edge.node" />
      <g-image v-for="image in images" :key="image.publicId" :src="image.responsive.src" :srcSet="image.responsive.srcSet" :sizes="image.responsive.sizes" />
    </section>
  </Layout>
</template>

<page-query>
query {
  allPost {
    edges {
      node {
        author
        description
        tags
        dateCreated
        coverPhoto {
          publicId
          responsive(maxWidth:300 baseTrans: {
            effect: "grayscale"
          }){
            src
          }
        }
      }
    }
  }
  allCldAsset {
    totalCount
    edges {
      node {
        publicId
        fixed(width:500 height:500 baseTrans: {
          color: "blue"
        }) {
          src
          srcSet
        }
        responsive(baseTrans: {
          effect: "grayscale"
        } maxWidth: 1000) {
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
import PostList from '../components/PostList'

export default {
  metaInfo: {
    title: 'About us'
  },
  computed: {
    images() {
      return this.$page.allCldAsset.edges.map(({ node }) => node)
    }
  },
  
  components: {PostList}
}
</script>
