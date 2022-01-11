<template lang="pug">
  .popular-news(class="col-lg-6 col-12 justify-content-center")
    NewnewsLoader(v-if="loading")
    .popular-news-block(
      v-else
      v-for="article of randomCategoryArticles" :key="article.id"
      class="p-3 mr-xl-4 mb-3"
    )
      router-link(
        :to="{ name: 'article', params: { id: article.id } }"
        class="popular-news-title"
      ) {{ article.title }}
      p.popular-news-content(v-text="article.content")
      div(class="d-flex justify-content-between align-items-center flex-wrap")
        router-link(
          :to="{ name: 'article', params: { id: article.id } }"
          class="popular-news-link"
        ) more <i class="fas fa-angle-double-right"></i>
        .popular-news-date-cat(class="d-flex")
          .popular-news-date {{ article.humanDate }}
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
  name: 'random-category-news-section',
  data: () => ({
    publicPath: process.env.BASE_URL,
    loading: true,
    quantity: cfg.randomCategoryNewsNumberOnHomePage,
    userID: null
  }),
  computed: mapGetters(['randomCategoryArticles', 'userLoggedIn', 'userData']),
  methods: {
    ...mapActions(['fetchRandomCategoryArticles', 'fetchUserData']),

    async loadRandomCategoryNews () {
      const data = {
        quantity: this.quantity,
        userID: this.userID
      }
      await this.fetchRandomCategoryArticles(data).then(() => {
          this.loading = false
      }).catch((e) => { throw e })
    },

    changeBackground () {
      window.innerWidth <= 1024 ? this.setBackground(true) : this.setBackground(false)
    },
    setBackground (isImage) {
      let val = 'none'
      if (isImage) val = `url('${this.publicPath + 'assets/img/pages/home/sections/categories/news-bg.jpg'}')`
      document.querySelector('.popular-news').style.backgroundImage = val
    }
  },
  async mounted () {
    if (this.userLoggedIn) {
      await this.fetchUserData().then(() => {
        this.userID = this.userData.id
      })
    }

    await this.loadRandomCategoryNews()

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

.popular-news {
  min-height: 300px;
  @media screen and (max-width: $smDesktopWidth) {
    @include bgImage;
    padding-top: 25px;
    margin-top: 0;
  }
  .popular-news-block {
    background-color: $grey-bg-base-trans;
    .popular-news-title {
      @include newsTitle;
    }
    .popular-news-content {
      @include newsContent;
      max-height: 48px;
      margin-bottom: 0px;
      margin-top: 0px;
      max-height: 46px;
    }
    .popular-news-date-cat {
      @include newsDateCat;
    }
    .popular-news-link {
      @include newsLink;
    }
    .popular-news-date-cat {
      @include newsFixCat;
    }
  }
}
</style>
