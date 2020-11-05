<template>
  <Layout>
    <div class="grid doc-container grid-column">
      <div class="sidebar flex flex-col w-1/6 border-r border-indigo-300">
        <g-link :exact="currentPath.indexOf('demo') >= 0" :to="item.demo" class="py-2 pl-10 text-lg hover:bg-indigo-100">Demo</g-link>
        <g-link :exact="currentPath.indexOf('setup') >= 0" :to="item.setup" class="py-2 pl-10 text-lg hover:bg-indigo-100">Set up</g-link>
        <g-link :exact="currentPath.indexOf('options') >= 0" :to="item.options" class="py-2 pl-10 text-lg hover:bg-indigo-100">Options</g-link>
        <g-link :exact="currentPath.indexOf('use') >= 0" :to="item.usage" class="py-2 text-lg pl-10 hover:bg-indigo-100">Usage</g-link>
      </div>
      <div class="doc-content px-4">
        <slot />
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    currentPath () {
      return this.$route.matched[0].path
    },
  }
}
</script>
<style>
.doc-container {
  grid-template-columns: auto 1fr;
}

.sidebar {
  width: 200px;
}
</style>