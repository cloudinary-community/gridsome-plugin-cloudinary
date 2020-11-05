<template>
  <Layout>
    <h1 class="mb-3 text-5xl">
      {{ $page.doc.title }}
    </h1>
    <p class="mt-5 mb-3" v-if="$page.doc.description">{{$page.doc.description}}</p>
     <div class="markdown" v-html="$page.doc.content" />
  </Layout>
</template>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    content
    description
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        { key: 'description', name: 'description', content: this.$page.doc.description }
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
/deep/ > p {
  opacity: .8;
  @apply mb-1;
}

/deep/ > h2 {
  @apply border-b border-gray-700 pb-2 pt-8 mb-3;

  @include respond-above(md) {
    font-size: 2rem;
  }
}

/deep/ > h3 {
  @apply text-3xl mb-5 mt-6 pb-3 border-b border-gray-700 border-b
}

/deep/ > p > img {
    @apply max-w-full my-5;
  }

/deep/ > ul > li {
  @apply py-1 list-disc ml-5 mb-2
}

/deep/ > ol > li {
  @apply list-decimal ml-4 pl-2
}

/deep/ > table {
  @apply text-center w-full my-4
}

/deep/ > table th,
/deep/ > table td  {
  @apply border-gray-700 border py-1
}

/deep/ > table th {
  @apply bg-indigo-400
}

/deep/ > table td  {
  @apply py-2
}

.markdown {
  padding-bottom: 50vh;
}
</style>
