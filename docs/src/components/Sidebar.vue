<template>
    <aside class="sidebar" :class="{'sidebar--open' : $store.state.sidebarOpen}">
      <nav>
        <ul>
          <li v-for="doc in uncategorizedDocs" :key="doc.id">
            <g-link class="topic" :to="'/' + doc.slug">{{doc.title}}</g-link>
            <ul class="sub-topic-container">
              <li v-for="heading in doc.headings" :key="heading.value">
                <a class="sub-topic" :href="'/' + doc.slug + heading.anchor">{{heading.value}}</a>
              </li>
            </ul>
          </li>
          <li key="demos">
            <g-link class="topic" to="/demo">Demos</g-link>
            <ul class="sub-topic-container">
              <li v-for="heading in demos" :key="heading.value">
                <g-link class="sub-topic" :to="heading.url">{{heading.value}}</g-link>
              </li>              
            </ul>
          </li>
          <li class="section" v-for="node in menu" :key="node.id">
            <h3 class="section-title mt-4 mb-2 text-md">{{node.title}}</h3>
            <ul>
              <li v-for="section in node.sections" :key="section.slug">
                <g-link class="topic" :to="'/' + section.slug">{{section.title}}</g-link>
                <ul class="sub-topic-container">
                  <li v-for="heading in section.headings" :key="heading.value">
                    <a class="sub-topic" :href="'/' + section.slug + heading.anchor">{{heading.value}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <GitLink class="git" />
      </nav>
    </aside>
</template>

<static-query>
query Menu {
  menu: allMenu {
    edges {
      node {        
        id
        position
        title
      }
    }
  }
  docs: allDoc {
    edges {
      node {
        slug
        title
        position
        headings {
          value
          anchor
        }
        category {
          title
        }
      }
    }
  }
}
</static-query>

<script>
import GitLink from '~/components/GitLink.vue'
import throttle from 'lodash/throttle'

export default {
  components: {
    GitLink
  },
  watch: {
    '$route' () {
      this.$store.commit('closeSidebar')
    }
  },
  data() {
    return {
      demos: [{
        value: "Cloudinary Source Plugin",
        url: "/demo/cloudinary-source"
      },{
        value: "Cloudinary Image Transformer",
        url: "/demo/cloudinary-transformer"
      }]
    }
  },
  computed: {
    menu() {
      return this.$static.menu.edges.map(({ node }) => {
        const title = node.title

        const sections = this.docs.filter(doc => doc.category && doc.category.title === title).sort((a, b) => a.position - b.position)

        return {
          ...node,
          sections,
        }
      }).sort((a, b) => a.position - b.position)
    },
    docs() {
      return this.$static.docs.edges.map(({ node }) => node)
    },
    uncategorizedDocs() {
      return this.docs.filter(doc => !doc.category)
    },
  },
  methods: {
    filterDocs(slug) {
      return this.docs.filter(doc => doc.slug === slug)
    },
    stateFromSize: function() {
      const action = window.getComputedStyle(document.body, ':before').content == '"small"' ? 'close' : 'open'

      this.$store.commit(`${action}Sidebar`)
    },
    sidebarScroll: function() {
      const mainNavLinks = document.querySelectorAll('.topic.active + ul .sub-topic')
      const fromTop = window.scrollY

      mainNavLinks.forEach(link => {
        const section = document.querySelector(link.hash)
        const classSelector = 'current'
        const allCurrent = document.querySelectorAll(`.${classSelector}`)

        if (section.offsetTop > fromTop) {
          link.classList.remove(classSelector)
          return
        }

        allCurrent.forEach(curr => curr.classList.remove(classSelector))
        link.classList.add(classSelector)
      })
    }
  },
  beforeMount () {
    this.stateFromSize()
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.sidebarScroll, 50))
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  transition: background .15s ease-in-out, transform .15s ease-in-out, border-color .15s linear;
  padding: 100px 30px 30px;
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  will-change: transform;
  transform: translateX(-300px);
  border-right: 1px solid transparent;
  overflow: auto;

  @include respond-above(sm) {
    transform: translateX(0);
  }

  &--open {
    transform: translateX(0);
  }
  
  .bright & {
    background: $sidebarBright;
    border-color: shade($sidebarBright, 10%);
  }

  .dark & {
    background: $sidebarDark;
    border-color: shade($sidebarDark, 40%);
  }
}

nav {
  position: relative;
  min-height: 100%;
  border: 1px solid transparent;
  padding-bottom: 40px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
    padding: 5px 0;
    display: block;

    &.active {
      color: $brandPrimary;
    }
  }
}

.section {
  margin-bottom: 30px;
}

.section-title {
  text-transform: uppercase;
  opacity: .3;
  letter-spacing: .15em;
  font-weight: 700;
}

.topic {
  font-weight: 700;
}

.sub-topic-container {
  padding-left: 1rem;
}

.sub-topic {
  font-size: .875rem;
  position: relative;
  opacity: .8;

  &::after {
    content: '';
    transition: opacity .15s ease-in-out;
    width: 6px;
    height: 6px;
    background: $brandPrimary;
    border-radius: 100%;
    display: block;
    opacity: 0;
    position: absolute;
    top: 13px;
    left: -15px;
  }

  &.current {
    &::after {
      opacity: 1;
    }
  }
}

.git {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>


