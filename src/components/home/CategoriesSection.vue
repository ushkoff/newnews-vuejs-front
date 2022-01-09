<template lang="pug">
  .cat-main-list(class="col-12 col-lg-6 pb-4 pb-lg-3 pl-3 pr-3")
    div(class="ml-xl-4 d-flex justify-content-center align-items-center flex-wrap")
      //- can't do a foreach cycle because for each category exists special margin-top
      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[0].slug } }"
        class="cat-main mt-3 mt-fhd-0 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[0].faIcon"></i>
        span.cat-main-title {{ categories[0].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[1].slug } }"
        class="cat-main mt-3 mt-fhd-0 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[1].faIcon"></i>
        span.cat-main-title {{ categories[1].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[2].slug } }"
        class="cat-main mt-3 mt-fhd-0 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[2].faIcon"></i>
        span.cat-main-title {{ categories[2].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[3].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[3].faIcon"></i>
        span.cat-main-title {{ categories[3].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[4].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[4].faIcon"></i>
        span.cat-main-title {{ categories[4].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[5].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[5].faIcon"></i>
        span.cat-main-title {{ categories[5].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[6].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[6].faIcon"></i>
        span.cat-main-title {{ categories[6].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[7].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[7].faIcon"></i>
        span.cat-main-title {{ categories[7].title }}

      router-link(
        :to="{ name: 'global-news-by-category', params: { slug: categories[8].slug } }"
        class="cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        <i :class="categories[8].faIcon"></i>
        span.cat-main-title {{ categories[8].title }}

      router-link(
        :to="{ name: 'categories' }"
        class="cat-other-btn cat-main mt-3 ml-3 d-flex flex-column justify-content-center align-items-center"
      )
        span.cat-main-title MORE

</template>

<script>
import catList from '@/config/links/categories'

export default {
  name: 'categories-section',
  data: () => ({
    publicPath: process.env.BASE_URL,
    categories: catList.categories
  }),
  methods: {
    changeBackground () {
      window.innerWidth <= 1024 ? this.setBackground(true) : this.setBackground(false)
    },
    setBackground (isImage) {
      let val = 'none'
      if (isImage) val = `url('${this.publicPath + 'assets/img/pages/home/sections/categories/list-bg.jpg'}')`
      document.querySelector('.cat-main-list').style.backgroundImage = val
    }
  },
  mounted () {
    window.addEventListener('resize', this.changeBackground)
    if (window.innerWidth <= 1024) this.setBackground(true)
  },
  destroyed () {
    window.removeEventListener('resize', this.changeBackground)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.cat-main-list {
  @media screen and (max-width: $smDesktopWidth) {
    @include bgImage;
    padding-top: 25px;
    margin-top: 0;
  }
  .cat-main {
    display: block;
    background-color: $grey-bg-base-trans;
    @include size(180px);
    @media (min-width: $smDesktopWidth) and (max-width: $desktopWidth) {
      @include size(150px);
    }
    @media screen and (max-width: $tableWidth) {
      @include size(150px);
    }
    @media screen and (max-width: 381px) {
      @include size(120px);
    }
    .fa-balance-scale,
    .fa-volleyball-ball,
    .fa-business-time,
    .fa-memory,
    .fa-atom,
    .fa-user-astronaut,
    .fa-meteor,
    .fa-globe-americas,
    .fa-tree,
    .fa-comment-dots {
      color: $grey-font-for-bg;
      font-size: rem(90px);
      @media (min-width: $smDesktopWidth) and (max-width: $desktopWidth) {
        font-size: rem(60px);
      }
      @media screen and (max-width: $tableWidth) {
        font-size: rem(60px);
      }
    }
    .cat-main-title {
      color: $grey-font-for-bg;
      font-size: rem(20px);
      font-weight: 600;
      margin-top: 20px;
      @media (min-width: $smDesktopWidth) and (max-width: $desktopWidth) {
        margin-top: 15px;
      }
      @media screen and (max-width: $tableWidth) {
        margin-top: 15px;
      }
    }
    @include trans02s;
    &:hover {
      text-decoration: none !important;
      background-color: $grey-bg-base-hover;
    }
  }
  .cat-other-btn {
    .cat-main-title {
      margin-top: 0;
    }
  }
}
</style>
