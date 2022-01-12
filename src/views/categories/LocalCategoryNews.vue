<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}${catBgImage}')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") {{ catTitle }}
    .container(class="mt-4 mt-md-5")
      .row
        div(class="news-container col-12 col-xl-8")

          NewnewsLoader(v-if="firstNewsLoading")

          .main-news-side(v-else class="pt-2 pb-2 pl-2 pr-2")
            router-link(
              :to="{ name: 'global-news-by-category', params: { slug: this.categorySlugString } }"
              class="go-to-local-cat-link ml-2 mt-4 mb-2"
            ) Go to "{{ catTitle }}" category in Global News <i class="fas fa-angle-double-right"></i>
            div(class="d-flex align-items-center justify-content-start mb-2")
              RefreshBtn(addClass="ml-2" @click="refreshNews")

            div(v-if="localCategoryNews.length > 0")
              ShortNewsBlock(
                v-for="article in localCategoryNews"
                :key="article.id"
                :id="article.id"
                :rating="article.rating"
                :isConfirmed="article.isConfirmed"
                :title="article.title"
                :humanDate="article.humanDate"
                :category="article.category"
                :categorySlug="article.categorySlug"
                :country="article.country"
              )
            div(v-else)
              span.search-results(
                class="text-break pl-2 d-block mb-2 mt-4"
              ) Sorry, there is no local news in such category.
            
            div(v-if="!nextPageIsEmpty && !firstNewsLoading")
              DefaultLoader(v-if="nextNewsLoading")
              LoadMoreBtn(
                v-else
                @click="loadNextNews"
                add-class="style-for-large-content"
              )

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import cfg from '@/config/news'
import catList from '@/config/links/categories'
import RefreshBtn from '@/components/app/common/RefreshBtn'
import ShortNewsBlock from '@/components/news/ShortNewsBlock'
import Sidebar from '@/components/app/Sidebar'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'local-news-by-category',
  metaInfo () {
    return { title: this.$title(this.catTitle + ' | Local News') }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    articlesPerPage: cfg.articlesPerPage,

    categories: catList.categories,
    catID: null,
    catTitle: '',
    catBgImage: null,

    firstNewsLoading: true,
    nextNewsLoading: false,
    nextPageNum: 2,
    nextPageIsEmpty: false,
    userID: null,
    userCountry: '',
    userCountryCode: null
  }),
  components: {
    RefreshBtn,
    ShortNewsBlock,
    Sidebar
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'userData', 'localCategoryNews', 'localCategoryNewsFetchedNumber']),
    categorySlugString: {
      get () { return this.$route.params.slug },
      set (newSlug) { return newSlug }
    }
  },
  methods: {
    ...mapActions(['fetchUserData', 'fetchLocalNewsByCategory']),
    ...mapMutations(['clearLocalCategoryNews']),

    loadCategoryFromPath () {
      const category = this.categories.filter(cat => cat.slug == this.categorySlugString)[0]

      if (typeof category == 'undefined') this.$router.replace({ name: 'page-404' })

      this.catID = category.id
      this.catTitle = category.title
      this.catBgImage = category.imgPath
    },

    async loadFirstNews () {
      this.clearVariables()

      const data = {
        categoryID: this.catID,
        quantity: this.articlesPerPage,
        page: 1,
        isNext: false,
        userID: this.userID,
        countryCode: this.userCountryCode
      }
      await this.fetchLocalNewsByCategory(data).then(() => {
        this.firstNewsLoading = false
        if (this.localCategoryNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
      })
    },
    
    async loadNextNews () {
      this.nextNewsLoading = true

      let data = {
        categoryID: this.catID,
        quantity: this.articlesPerPage,
        page: this.nextPageNum,
        isNext: true,
        userID: this.userID,
        countryCode: this.userCountryCode
      }

      await this.fetchLocalNewsByCategory(data).then(() => {
        this.nextNewsLoading = false
        this.nextPageNum += 1
        if (this.localCategoryNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
      })
    },
    refreshNews () {
      this.clearVariables()
      this.loadFirstNews()
    },
    clearVariables () {
      this.clearLocalCategoryNews()
      this.firstNewsLoading = true
      this.nextNewsLoading = false
      this.nextPageNum = 2
      this.nextPageIsEmpty = false
    },
    clearCategory (params) {
      this.categorySlugString = params.slug
      this.catID = null
      this.catTitle = ''
      this.catBgImage = null
    },
    async getUserData() {
      if (this.userLoggedIn) {
        await this.fetchUserData().then(() => {
          this.userID = this.userData.id
          this.userCountry = this.userData.country
          this.userCountryCode = this.userData.countryCode
        })
      }
    }
  },
  async mounted () {
    await this.getUserData()

    this.loadCategoryFromPath()
    this.loadFirstNews()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'local-news-by-category') {
      next()
      this.clearCategory(to.params)
      this.loadCategoryFromPath()
      this.loadFirstNews()
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

// for NN loader
.news-container { min-height: 250px }
.def-loader {
  position: relative;
  top: 0;
  transform: translate(-50%, 0);
  margin-top: 100px;
  margin-bottom: 100px;
}
.main-news-side {
  background-color: $grey-bg-light;
  .search-results {
    color: $purple-font-base;
    span { font-style: italic }
  }
  .go-to-local-cat-link {
    display: block;
    @include readMoreBtn;
    svg {
      font-size: 12px;
      height: rem(16px);;
    }
  }
}
</style>
