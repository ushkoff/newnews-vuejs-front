<template lang="pug">
  aside

    //-
    //- CATEGORIES
    //-
    .sidebar-categories(class="sidebar-block mt-5 mt-xl-0")
      .sidebar-title(:style="{'background-image': `url('${publicPath}assets/img/sidebar/section-header.jpg')`}")
        span Categories
      .sidebar-content
        .row.no-gutters
          .col-4(
            v-for="cat in categories.slice(0, 9)"
          )
            router-link(
              :key="cat.id"
              :to="{ name: 'global-news-by-category', params: { slug: cat.slug } }"
              class="text-decoration-none"
            )
              .link-bg-pic-black(:style="{'background-image': `url('${publicPath}${cat.imgPath}')`}")
                .black-trans-display(class="p-3 text-center d-flex align-items-center justify-content-center")
                  span.link-bg-pic-black-title {{ cat.title }}

    .sidebar-most-popular(class="sidebar-block mt-4")
      .sidebar-title(:style="{'background-image': `url('${publicPath}assets/img/sidebar/section-header.jpg')`}")
        span May be interesting
      .sidebar-content(class="p-0" :class="{ 'pt-3 pb-4 pl-3 pr-3 pl-lg-5 pr-lg-5': !randomCategoryNewsLoading }")
        DefaultLoader(v-if="randomCategoryNewsLoading" add-class="pos-relative-def-loader")
        ul.popular-list(v-else)
          li
            router-link(
              v-for="article of randomCategoryArticles"
              :key="article.id"
              :to="{ name: 'article', params: { id: article.id } }"
              class="text-truncate d-block"
            )
              <i class="fas fa-caret-right"></i> {{ article.title }}

    .sidebar-our-soft(class="sidebar-block mt-4")
      .sidebar-title(:style="{'background-image': `url('${publicPath}assets/img/sidebar/section-header.jpg')`}")
        span About our NWC token
      .sidebar-content(class="pt-3 pb-4 pl-3 pr-3 pl-lg-5 pr-lg-5")
        div(class="mr-3 float-left")
          img(:src="`${publicPath}assets/img/newnews/nwc-logo.png`" alt="NWC")
        p You can check the NewNews Token Whitepaper and take a look at our achievements!
        router-link(
          :to="{ name: 'nwc' }"
          class="read-more-soft"
        ) Read more <i class="fas fa-angle-double-right"></i>

</template>

<script>
import cfg from '@/config/news'
import catList from '@/config/links/categories'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sidebar',
  data: () => ({
    publicPath: process.env.BASE_URL,
    categories: catList.categories,
    randomCategoryNewsNumber: cfg.randomCategoryNewsNumberInSidebar,
    randomCategoryNewsLoading: true,
    userID: null
  }),
  computed: mapGetters(['userLoggedIn', 'userData', 'randomCategoryArticles']),
  methods: {
    ...mapActions(['fetchRandomCategoryArticles', 'fetchUserData']),

    async loadRandomCategoryNews () {
      const data = {
        quantity: this.randomCategoryNewsNumber,
        userID: this.userID
      }
      await this.fetchRandomCategoryArticles(data).then(() => {
        this.randomCategoryNewsLoading = false
      })
    }
  },
  async mounted () {
    if (this.userLoggedIn) {
      await this.fetchUserData().then(() => {
        this.userID = this.userData.id
      })
    }

    this.loadRandomCategoryNews()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

aside {
  position: sticky !important;
  top: 75px;

  .sidebar-block {
    background-color: $grey-bg-light;
    .sidebar-title {
      font-family: 'Montserrat';
      color: $grey-font-for-bg;
      font-size: rem(16px);
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      line-height: 54px;
      @include bgImage;
    }
  }

  .sidebar-most-popular {
    .popular-list a {
      color: $grey-font-for-bg;
      line-height: rem(35px);
      width: 100%;
    }
  }
  .sidebar-our-soft {
    img {
      @include size(100px);
      width: 100px !important;
    }
    p {
      color: $grey-font-for-bg;
      font-size: rem(14px);
    }
    .read-more-soft {
      @include readMoreBtn;
    }
  }
  .sidebar-categories {
    .link-bg-pic-black {
      height: 100px;
    }
  }
}
</style>
