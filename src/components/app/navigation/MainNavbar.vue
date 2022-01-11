<template lang="pug">
  div
    nav(class="navigation")
      input.toggle(type="checkbox", id="more", aria-hidden="true", tabindex="-1")
      .navigation-inner
        ul.main-menu
          router-link(
            v-for="link in navLinks"
            :key="link.route"
            :to="{ path: link.route }"
            tag="li"
            active-class="active"
            class="text-nowrap"
            @click.native="autoCloseMenu()"
          )
            a(href="#") {{ link.title }}

        .navigation-toggle(class="mr-3")
          label(
            for="more", aria-hidden="true"
            @click="toggleMenu(activeStyle)"
          ) More <i class="ml-lg-2 ml-1 fas fa-sort-down"></i>
</template>

<script>
import cfg from '@/config/navigation/nav'

export default {
  name: 'main-navbar',
  data: () => ({
    navLinks: cfg.navLinks,
    isActive: false,
    // Colors
    activeStyle: 'light',
    bgLight: 'rgba(248, 249, 250, 0.95)',
    bgDark: 'rgba(30, 30, 30, 0.95)',
  }),
  methods: {
    toggleMenu(activeStyle) {
      if (! this.isActive) this.openMenu(activeStyle)
      else this.closeMenu(activeStyle)
    },
    openMenu(activeStyle) {
      //
      // There are 2 modes (depends on `scroll` EventListener):
      // 1) Default - when page only opened and navbar is light
      // 2) Scroll - when page was scrolled and navbar is dark
      //
      let color = 'bg' + activeStyle[0].toUpperCase() + activeStyle.slice(1)

      document.querySelector('.main-menu').style.backgroundColor = this[color]
      document.querySelector('.navigation-toggle svg').style.cssText = 'transform: rotate(180deg); top: 3px'

      this.isActive = true
    },
    closeMenu() {
      document.querySelector('.main-menu').style.backgroundColor = 'transparent'
      document.querySelector('.navigation-toggle svg').style.cssText = 'transform: rotate(0); top: -3px'

      this.isActive = false
    },
    autoCloseMenu() {
      if (this.isActive) {
        const closeBtn = document.querySelector('.navigation-toggle label')
        closeBtn.click()
      }
    },
    changeMenuStyle() {
      // If page was scrolled then change style to dark
      if (document.querySelector('html').scrollTop > document.querySelector('header').offsetHeight + 10) {
        this.activeStyle = 'dark'

        // If menu is opened
        if (document.querySelector('.navigation .toggle').checked) {
          document.querySelector('.main-menu').style.backgroundColor = this.bgDark
        } else {
          document.querySelector('.main-menu').style.backgroundColor = 'transparent'
        }
      // Similarly for light style
      } else {
        this.activeStyle = 'light'

        if (document.querySelector('.navigation .toggle').checked) {
          document.querySelector('.main-menu').style.backgroundColor = this.bgLight
        } else {
          document.querySelector('.main-menu').style.backgroundColor = 'transparent'
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.changeMenuStyle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.changeMenuStyle)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

//
// Dark styles defined in "header-scroll" class in Header.vue component
//

nav {
  height: 50px /* Collapsed navigation height */;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  /* Hide the checkbox */
  .toggle {
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:checked ~ .navigation-inner {
      height: auto /* Full height when more is toggled */;
    }
  }
  .navigation-inner {
    display: flex;
    height: 40px /* Collapsed navigation height */;
    margin: 0 auto;
    overflow: hidden;
    ul {
      height: auto;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      li {
        a {
          display: block;
          line-height: 50px /* Collapsed navigation height */;
          font-family: 'Montserrat';
          font-size: rem(15px);
          font-weight: 500;
          color: $grey-font-title;
          text-transform: uppercase;
          padding: 0 10px;
          @include trans01s;
          &:hover {
            text-decoration: none;
            color: $grey-font-dark-title;
          }
          @media screen and (min-width: $fullHdWidth) {
            padding: 0 15px;
          }
          @media screen and (max-width: $smDesktopWidth) {
            font-size: rem(14px);
          }
        }
        @media screen and (max-width: $fullHdWidth) {
          margin-right: 25px;
        }
        @media screen and (max-width: $desktopWidth) {
          font-size: rem(14px);
        }
        @media screen and (max-width: 400px) {
          flex-basis: 100% /* Stops uneven wrapping */;
        }
      }
      li.active {
        a { color: $red-font-base }
      }
    }
    .navigation-toggle {
      flex-shrink: 0 /* Stops more button collapsing */;
      font-family: 'Montserrat';
      font-size: rem(15px);
      font-weight: 600;
      line-height: 50px;
      text-transform: uppercase;
      color: $grey-font-title;
      padding: 0 3px;
      &:hover { color: $grey-font-dark-title }
      label { cursor:pointer }
      .fa-sort-down {
        position: relative;
        top: -3px;
      }
      @media screen and (min-width: $fullHdWidth) {
        padding: 0 15px;
      }
      @media screen and (max-width: $smDesktopWidth) {
        font-size: rem(14px);
      }
    }
  }
}
</style>
