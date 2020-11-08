<template>
  <Layout :sidebar="false">
    <div class="content">
      <h1>{{ $static.metadata.siteName }}</h1>
      <h2>{{ $static.metadata.siteDescription }}</h2>
      <nav>
        <Shortcut link="/source-plugin" text="Source Plugin" icon="cloud-icon" />
        <Shortcut link="/cloudinary-transformer" text="Cloudinary Image Transformer" icon="sliders-icon" />
        <Shortcut link="/image-transformer" text="Generic Image Transformer" icon="image-icon" />
      </nav>
      <GitLink class="git" size="large" />
    </div>
  </Layout>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import GitLink from '~/components/GitLink.vue'
import Shortcut from '~/components/Shortcut.vue'

export default {
  components: {
    GitLink,
    Shortcut
  },
  metaInfo() {
    return {
      title: "Homepage",
      meta: [
        { key: 'description', name: 'description', content: this.$static.metadata.siteName },
        { key: 'twitter:card', name: 'twitter:card', content: 'summary'},
        { key: 'twitter:creator', name: 'twitter:creator', content: '@mayashavin'},
        { property: 'og:url', content: 'https://gridsome-cloudinary.netlify.app'},
        { property: 'og:title', content: this.$static.metadata.siteName },
        { property: 'og:description', content: this.$static.metadata.siteDescription },
        { property: 'og:image', content: "https://res.cloudinary.com/mayashavin/image/upload/v1604572376/gridinary/Group_7.png" },        
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  max-width: 600px;
  margin: 1.5em auto 0.5em;

  @include respond-above(md) {
    max-width: 1000px;
  }
}

h2 {
  font-size: 1.4rem;
  margin: 1rem auto 1.5em;
}

nav {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @include respond-above(sm) {
    flex-direction: row;
  }
}

.git {
  margin: 3em 0 0;
  align-self: center;

  @include respond-above(md) {
    margin: 5em 0 0;
  }
}
</style>
