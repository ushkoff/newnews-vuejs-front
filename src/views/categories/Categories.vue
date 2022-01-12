<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/categories/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") Categories
    .popular-cat-gallery(class="mt-3 mt-lg-4 mb-3")
      .container(class="pt-0 pt-lg-5")
        span.main-section-title Explore categories

        .row.no-gutters(class="mt-4 mt-lg-5")
          .col-lg-6.col-12(class="row mx-auto")
            .col-md-6.col-12
              .popular-cats-list-1
                .popular-cat-block(v-for="cat in categories.slice(0,2)")
                  router-link(
                    :key="cat.id"
                    :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                    class="text-decoration-none"
                  )
                    .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                      .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                        span.link-bg-pic-black-title {{ cat.title }}
            .col-md-6.col-12
              .popular-cats-list-2
                .popular-cat-block(v-for="cat in categories.slice(2,3)")
                  router-link(
                    :key="cat.id"
                    :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                    class="text-decoration-none"
                  )
                    .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                      .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                        span.link-bg-pic-black-title {{ cat.title }}
            .popular-cats-list-5.col-12
              .popular-cat-block(v-for="cat in categories.slice(3,4)")
                router-link(
                  :key="cat.id"
                  :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                  class="text-decoration-none"
                )
                  .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                    .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                      span.link-bg-pic-black-title {{ cat.title }}
          .col-lg-2.col-12
            .popular-cats-list-3
              .popular-cat-block(v-for="cat in categories.slice(4,5)")
                router-link(
                  :key="cat.id"
                  :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                  class="text-decoration-none"
                )
                  .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                    .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                      span.link-bg-pic-black-title {{ cat.title }}
          .col-lg-4.col-12
            .popular-cats-list-4
              .popular-cat-block(v-for="cat in categories.slice(5,6)")
                router-link(
                  :key="cat.id"
                  :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                  class="text-decoration-none"
                )
                  .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                    .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                      span.link-bg-pic-black-title {{ cat.title }}
            .popular-cats-list-6.row.no-gutters
              .col-md-6.col-12
                .popular-cat-block(v-for="cat in categories.slice(6,7)")
                  router-link(
                    :key="cat.id"
                    :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                    class="text-decoration-none"
                  )
                    .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                      .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                        span.link-bg-pic-black-title {{ cat.title }}
              .col-md-6.col-12
                .popular-cats-list-7
                  .col-12
                    .popular-cat-block(v-for="cat in categories.slice(7,8)")
                      router-link(
                        :key="cat.id"
                        :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                        class="text-decoration-none"
                      )
                        .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                          .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                            span.link-bg-pic-black-title {{ cat.title }}
                  .col-12
                    .popular-cat-block(v-for="cat in categories.slice(8,9)")
                      router-link(
                        :key="cat.id"
                        :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
                        class="text-decoration-none"
                      )
                        .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                          .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                            span.link-bg-pic-black-title {{ cat.title }}

    //- .other-cat-gallery
    //-   .container(class="pt-3 pt-lg-5 mt-3 mt-xl-5")
    //-     span.main-section-title Other categories
    //-     .row.no-gutters(class="pt-2 pt-lg-0 mt-4 mt-lg-5")
    //-       .col-xl-2.col-lg-3.col-md-6.col-12(v-for="cat in categories.slice(9)")
    //-         router-link(
    //-           :key="cat.url"
    //-           :to="cat.url"
    //-           :exact="cat.exact"
    //-           class="text-decoration-none"
    //-         )
    //-           .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
    //-             .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
    //-               span.link-bg-pic-black-title {{ cat.title }}

</template>

<script>
import catList from '@/config/links/categories'

export default {
  name: 'categories-page',
  metaInfo () {
    return { title: this.$title('Categories') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    categories: catList.categories
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.nn-loader { margin-top: 66px }

.popular-cat-gallery {
  .container {
    position: relative;
    min-height: 500px;
    // changing each picture in "popular categories gallery"
    @mixin popularCatBlock($column, $row, $height: 175px) {
      .popular-cats-list-#{$column} {
        .popular-cat-block:nth-child(#{$row}) {
          .link-bg-pic-black { height: #{$height} }
          .link-bg-pic-black-title { font-size: rem(24px); }
          @media screen and (max-width: $desktopWidth) {
            .link-bg-pic-black { height: #{$height / 1.5} }
            .link-bg-pic-black-title { font-size: rem(18px); }
          }
          @media screen and (max-width: $smDesktopWidth) {
            .link-bg-pic-black {
              @if $column == 3 { height: #{$height / 4} }
              @else { height: #{$height / 2} }
            }
            .link-bg-pic-black-title { font-size: rem(16px); }
          }
          @media screen and (max-width: $tableWidth) {
            .link-bg-pic-black {
              @if $height == 175px { height: 175px !important }
            }
          }
        }
      }
    }

    @include popularCatBlock(1, 1);
    @include popularCatBlock(1, 2);
    @include popularCatBlock(2, 1, 350px);
    @include popularCatBlock(3, 1, 700px);
    @include popularCatBlock(4, 1, 350px);
    @include popularCatBlock(5, 1, 350px);
    @include popularCatBlock(6, 1, 350px);
    @include popularCatBlock(7, 1);
    @include popularCatBlock(7, 2);
  }
}

.main-section-title {
  @include mainSectionTitle;
}
.other-cat-gallery {
  .link-bg-pic-black {
    height: 175px;
    .link-bg-pic-black-title {
      font-size: rem(18px);
      @media screen and (max-width: $smDesktopWidth) {
        font-size: rem(16px);
      }
    }
  }
}
</style>
