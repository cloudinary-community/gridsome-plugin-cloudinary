<template>
  <div class="alert border-l-4 p-4 m-4 mt-4" :class="classes">
    <div class="flex flex-start">
      <component :is="icon" />
      <slot class="markdown" />
    </div>
  </div>
</template>
<script>
import { AlertOctagonIcon, InfoIcon } from 'vue-feather-icons'

const icons = {
  info: InfoIcon,
  warning: AlertOctagonIcon
}

export default {
  components: [ AlertOctagonIcon, InfoIcon ],
  props: {
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    icon() {
      return icons[this.type]
    },
    classes() {
      switch (this.type) {
        case 'warning':
          return 'bg-orange-500 text-orange-700'
        case 'info':
        default:
          return 'bg-blue-300 text-blue-700'
      }
    }
  }
}
</script>