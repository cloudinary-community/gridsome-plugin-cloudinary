<template>
  <div class="layout">
    <header class="header px-5 lg:px-56">
      <g-link to="/" class="md:text-3xl font-semibold capitalize">{{ $static.metadata.siteName }}</g-link>
    </header>
    <slot/>
    <footer class="mx-auto font-sm w-full text-center p-3">
      <span>Built by <a href="https://mayashavin.com" target="_blank" rel="noopener noreferrer" class="underline text-indigo-700">Maya Shavin</a></span>
      <span> © {{(new Date()).getFullYear()}}</span>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  @apply font-livvic;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  @apply mx-auto;
}

.header {
  @apply flex justify-between items-center mb-8 h-20 text-white bg-indigo-600;
}

.nav__link {
  margin-left: 20px;
}
</style>
