<template>
  <Doc>
    <template name="doc-content">{{node.content}}</template>
  </Doc>
</template>
<page-query>
{
  doc(path: "/content/docs/source-plugin/setup") {
    title
    description
    category
    content
  }
}
</page-query>
<script>
export default {
  data() {
    return {
      item: {
        demo: 'demo',
        options: 'options',
        setup: 'setup',
        usage: 'usage'
      }
    }
  },
  computed: {
    node() {
      return this.$page.doc
    }
  }
}
</script>