<template lang="pug">
  div(class="home")
    //- //- section Main Slider
    //- AdvantagesSlider

    //- //- section Latest News
    //- section.latest-news(class="mt-5 mb-0")
    //-   .container(class="pt-2 pt-lg-4 pb-lg-3")
    //-     span.main-section-title Latest News
    //-     LatestNewsSlider

    //- //- section Popular Now & Categories
    //- section.popular-news-cat(class="mt-5 mb-5 pt-1")
    //-   .popular-news-cat-bg(
    //-     class="mt-5 container-fluid pl-0 pr-0 pb-3"
    //-     :style="{'background-image': `url('${publicPath}assets/img/pages/home/backgrounds-sections/popular-and-categories.jpg')`}"
    //-   )
    //-     .container
    //-       span.main-section-title May be interesting & Category List
    //-       .row(class="mt-3 mt-sm-4 mt-lg-0 mt-3")
    //-         //- "popular news" half of section
    //-         PopularNewsSection
    //-         //- "categories" half of section
    //-         CategoriesListSection

    //- //- section What is NWC
    //- section.main-nwc(class="mt-3 mt-lg-5 pt-lg-5 pb-0 pb-lg-5")
    //-   .container(class="position-relative pt-0 pt-lg-5 pb-5")
    //-     span.main-section-title What is NewsCoin (NWC)?
    //-     NwcHomeSection

</template>

<script>
// import AdvantagesSlider from '@/components/home/AdvantagesSlider'
// import LatestNewsSlider from '@/components/home/LatestNewsSlider'
// import PopularNewsSection from '@/components/home/PopularNewsSection'
// import CategoriesListSection from '@/components/home/CategoriesListSection'
// import NwcHomeSection from '@/components/home/NwcHomeSection'

// export default {
//   name: 'home',
//   metaInfo () {
//     return { title: this.$title('NewNews') }
//   },
//   data: () => ({
//     publicPath: process.env.BASE_URL
//   }),
//   components: {
//     AdvantagesSlider,
//     LatestNewsSlider,
//     PopularNewsSection,
//     CategoriesListSection,
//     NwcHomeSection
//   }
// }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.main-section-title {
  @include mainSectionTitle;
}
// Popular Now & Categories
.popular-news-cat {
  .popular-news-cat-bg {
    @include bgImage;
    @media screen and (max-width: $smDesktopWidth) {
      background-image: none !important;
    }
  }
  .main-section-title {
    @include mainSectionTitle;
    margin-left: 225px;
    position: relative;
    top: -25px;
    @media screen and (max-width: $desktopWidth) {
      margin-left: 100px;
    }
    @media screen and (max-width: $smDesktopWidth) {
      margin-left: 0 !important;
    }
  }
}
// section What is NWC
.main-nwc {
  .main-section-title {
    position: absolute;
    right: 1rem;
    top: 0;
    @media screen and (max-width: $smDesktopWidth) {
      position: static;
    }
  }
}
</style>
