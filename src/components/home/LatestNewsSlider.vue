<template lang="pug">
  .latest-news-slider(class="row row-eq-height justify-content-center")

    NewnewsLoader(v-if="loading")

    swiper(
      v-else
      :options="swiperOption" ref="mySwiper"
    )
      swiper-slide.latest-slider-item(
        v-for="article of latestArticles" :key="article.id"
        class="mt-5 pl-4 pr-4"
      )
        router-link(
          :to="{ name: 'news-post', params: { id: article.id } }"
          class="latest-title"
        ) {{ article.title }}
        p.latest-content(v-text="article.content")
        div(class="d-flex justify-content-between align-items-center flex-wrap")
          router-link(
            :to="{ name: 'article', params: { id: article.id } }"
            class="latest-link"
          ) more <i class="fas fa-angle-double-right"></i>
          .latest-date-cat(class="d-flex")
            .latest-date {{ article.humanDate }}
            span(class="ml-1 mr-1") /
            router-link(
              :to="{ name: 'global-news-by-category', params: { slug: article.categorySlug } }"
              class="news-link-cat"
            ) {{ article.category }}

</template>

<script>
import cfg from '@/config/news'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'latest-news-section',
  data: () => ({
    loading: true,
    quantity: cfg.latestNewsNumberOnHomePage,
    userID: null,

    // settings for slider
    swiperOption: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      speed: 500,
      loop: true,
      autoplay: {
        delay: 7500,
        stopOnLastSlide: true
      },
      breakpoints: {
        768: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 2
        },
        1700: {
          slidesPerView: 3
        }
      },
      navigation: {
        nextEl: '.arrow-next',
        prevEl: '.arrow-prev'
      }
    }
  }),
  computed: mapGetters(['latestArticles']),
  methods: {
    ...mapActions(['fetchLatestArticles']),
    // async getUserID () {
    //   await this.$store.dispatch('getUserData')
    //   this.userID = this.userLoggedIn ? this.$store.getters.getUserData.id : ''
    //   this.requestData = this.userLoggedIn ? { user_id: parseInt(this.userID) } : ''
    // },

    async loadLatestNews() {
        const data = {
            quantity: this.quantity,
            userID: this.userID
        }
        await this.fetchLatestArticles(data).then(() => {
            this.loading = false
        }).catch((e) => { throw e })
    }
  },
  async mounted () {
    // await this.getUserID()
    
    await this.loadLatestNews()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.latest-news-slider {
  position: relative;
  min-height: 250px;
  .latest-slider-item {
    background-color: $grey-bg-light;
    .latest-title {
      @include newsTitle;
      display: block;
      overflow: hidden;
      height: 48px;
      @media screen and (max-width: $tableWidth) {
        height: 43px;
      }
      @media screen and (max-width: $phoneWidth) {
        height: 40px;
      }
    }
    .latest-content {
      @include newsContent;
      height: 400px;
      @media screen and (max-width: $tableWidth) {
        height: 354px;
      }
      @media screen and (max-width: $phoneWidth) {
        height: 319px;
      }
    }
    .latest-date-cat {
      @include newsDateCat;
      @include newsFixCat;
    }
    .latest-link {
      @include newsLink;
    }
  }
}
</style>
