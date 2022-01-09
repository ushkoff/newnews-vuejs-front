<template lang="pug">
  footer
    //- .container(class="mt-5 pt-3 pb-3")
    //-   .row
    //-     div(class="col-xl-8 col-12 mx-auto")
    //-       span.extra-quote NewNews — the first decentralized media for universe! Imagine the platform where all users are anonym and produce news from each part of space. These news are spreaded in decentralised multi-layer net and available for everyone in form of quick access as tweet or stories. NewNews is the new step of mankind's development which change the imagination of news and information.
    //-       .line(class="mt-3")
    //-       .menu(class="mb-4 d-flex flex-wrap")
    //-         .list(class="mr-lg-5 mr-4 mt-3")
    //-           span Explore NewNews
    //-           ul
    //-             router-link(
    //-               v-for="link in navLinks"
    //-               :key="link.url"
    //-               tag="li"
    //-               :to="link.url"
    //-               :exact="link.exact"
    //-             )
    //-               a(href="#") {{ link.title }}
    //-         .list(class="mr-lg-5 mr-4 mt-3")
    //-           span Categories
    //-           ul
    //-             router-link(
    //-               v-for="cat in categories"
    //-               :key="cat.id"
    //-               :to="{ name: 'global-category', params: { slug: cat.slug } }"
    //-               tag="li"
    //-             )
    //-               a(href="#") {{ cat.title }}
    //-         .list(class="mr-lg-5 mr-4 mt-3")
    //-           span Explore NewNews
    //-           ul
    //-             router-link(
    //-               v-for="link in navLinks"
    //-               :key="link.url"
    //-               tag="li"
    //-               :to="link.url"
    //-               :exact="link.exact"
    //-             )
    //-               a(href="#") {{ link.title }}
    //-         .list(class="mr-lg-5 mr-4 mt-3")
    //-           span Categories
    //-           ul
    //-             router-link(
    //-               v-for="cat in categories"
    //-               :key="cat.id"
    //-               :to="{ name: 'global-category', params: { slug: cat.slug } }"
    //-               tag="li"
    //-             )
    //-               a(href="#") {{ cat.title }}

    //-       span.get-help Get help: connect with our tech support <span class="support-email">{{ newNewsSupportEmail }}</span>

    //-       .line(class="mt-2")
    //-       div(class="d-flex justify-content-between flex-wrap")
    //-         div(class="d-flex flex-wrap")
    //-           span.copyright(class="pr-4") Copyright © {{ getYearNow }} NewNews. All rights reserved.
    //-           .policy-list
    //-             ul(class="d-flex flex-wrap")
    //-               router-link(
    //-                 v-for="link in docsLinks"
    //-                 :key="link.url"
    //-                 tag="li"
    //-                 :to="link.url"
    //-                 :exact="link.exact"
    //-               )
    //-                 a(href="#") {{ link.title }}
    //-         .user-country(v-if="userLoggedIn")
    //-           i(class="fas fa-map-marker-alt mr-2")
    //-           span {{ userCountry }}
</template>

<script>
// import navList from '@/NN config/link-lists/nav'
// import catList from '@/NN config/link-lists/categories'
// import docsList from '@/NN config/link-lists/documents'

// export default {
//   name: 'footer-custom',
//   data: () => ({
//     newNewsSupportEmail: process.env.VUE_APP_SUPPORT_EMAIL,
//     navLinks: navList.navLinks,
//     categories: catList.categories,
//     docsLinks: docsList.docsLinks,
//     userCountry: ''
//   }),
//   computed: {
//     getYearNow () { return new Date().getFullYear() },
//     userLoggedIn () { return this.$store.getters.loggedIn }
//   },
//   methods: {
//     async getUserCountry () {
//       await this.$store.dispatch('getUserData')
//       this.userCountry = this.userLoggedIn ? this.$store.getters.getUserData.country : ''
//     }
//   },
//   async mounted () {
//     await this.getUserCountry()
//   }
// }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

footer {
  font-size: rem(12px);
  line-height: 14px;
  background-color: $grey-bg-light;
  .extra-quote {
    display: block;
    color: $grey-font-light;
  }
  .line {
    background-color: $grey-line-light;
    height: 1px;
  }
  .menu {
    .list {
      span {
        font-weight: 600;
        color: $grey-font-dark;
        line-height: 27px;
      }
      li {
        line-height: 27px;
        a { color: $grey-font-base }
      }
    }
  }
  .get-help {
    color: $grey-font-light;
    .support-email {
      color: $link-blue-light;
    }
  }
  .copyright {
    line-height: 27px;
    color: $grey-font-light;
  }
  .policy-list {
    line-height: 27px;
    color: $grey-font-light;
    li {
      a { color: $grey-font-base }
      &:after {
        content: '|';
        margin: 0 4px;
      }
      &:last-child {
        &:after {
          content: ''
        }
      }
    }
  }
  .user-country {
    line-height: 27px;
    .fa-map-marker-alt {
      font-size: rem(10px);
      position: relative;
      top: -1px;
      right: -3px;
      color: $grey-font-base;
    }
    span {
      font-style: italic;
      color: $grey-font-base;
    }
  }
}
</style>
