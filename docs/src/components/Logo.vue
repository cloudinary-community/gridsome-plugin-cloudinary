<template>
  <g-link to="/" class="logo" title="Back to home">
    <transition name="theme">
      <div v-if="color == 'dark'">
        <g-image :src="logo" alt="logo" />
      </div>
    </transition>
    <transition name="theme">
      <div v-if="color == 'bright'">
        <g-image :src="logo" alt="logo" />
      </div>
    </transition>
  </g-link>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    logo() {
      const themes = {
        dark: 'bright',
        bright: 'dark'
      }

      return `https://res.cloudinary.com/mayashavin/image/upload/v1604572595/gridinary/logo_${themes[this.color]}.svg`
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 40px;
  display: block;
  transition: color .15s ease-in-out;
  color: $textBright;
  position: relative;
  perspective: 200px;
  width: 200px;

  div {
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    height: 100%;
    width: auto;
  }
}

.theme-enter-active, .theme-leave-active {
  transition: opacity .15s ease-in-out;
}
.theme-enter, .theme-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


