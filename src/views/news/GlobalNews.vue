<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/global/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4") All news
    .container(class="mt-4 mt-md-5")
      .row
        div(class="news-container col-12 col-xl-8")

          //- SEARCH field
          .news-search-filed(v-if="!firstNewsLoading" class="mb-2 mt-3 mt-md-0")
            form(@submit.prevent="searchSubmit" class="d-flex flex-nowrap")
                input(
                type="text"
                placeholder="Search..."
                v-model.trim="searchQuery"
                :maxlength="maxTitleNews"
                class="pl-3 pl-lg-4"
                )
                button(type="sumbit" class="pr-3") <i class="fas fa-search"></i>

          NewnewsLoader(v-if="firstNewsLoading")
          .main-news-side(v-else class="pt-2 pb-2 pl-2 pr-2 mb-5")

            //- TOOLS buttons
            div(class="d-flex align-items-center justify-content-start mb-2")
              RefreshBtn(addClass="ml-2" @click="refreshNews")
              Checkbox(
                title="only confirmed"
                addClass="ml-4"
                v-if="!searchQueryString"
                @change="loadFirstNews('', onlyConfirmedChecked)" v-model="onlyConfirmedChecked"
              )

            //- SEARCH messages
            span.search-results(
              v-if="searchQueryString && !noSearchResults"
              class="text-break pl-2 d-block mb-2"
            ) Results for the query "<span><b>{{ searchQueryString }}</b></span>"
            span.search-results(
              v-if="searchQueryString && noSearchResults"
              class="text-break pl-2 d-block mb-2"
            ) No results were found for "<span><b>{{ searchQueryString }}</b></span>"

            //- GLOBAL NEWS list
            div(v-if="globalNews.length > 0")
              ShortNewsBlock(
                v-for="article in globalNews"
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
              //- GLOBAL NEWS messages
              span.search-results(
                v-if="!searchQueryString && noResults"
                class="text-break pl-2 d-block mb-2"
              ) Sorry, there is no global news.
              span.search-results(
                v-if="!searchQueryString && noConfirmedResults"
                class="text-break pl-2 d-block mb-2"
              ) No confirmed news were found.
          
          //- NEXT news loading...
          div(v-if="!nextPageIsEmpty && !firstNewsLoading && !noSearchResults && !noResults")
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
import RefreshBtn from '@/components/app/common/RefreshBtn'
import Checkbox from '@/components/app/common/Checkbox'
import ShortNewsBlock from '@/components/news/ShortNewsBlock'
import Sidebar from '@/components/app/Sidebar'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'global-news',
  metaInfo () {
    return { title: this.$title('Global News') }
  },
  data: () => ({
    firstNewsLoading: true,
    nextNewsLoading: false,
    publicPath: process.env.BASE_URL,
    articlesPerPage: cfg.articlesPerPage,
    maxTitleNews: cfg.maxArticleTitle,
    searchQuery: '',
    onlyConfirmedChecked: false,

    nextPageNum: 2,
    nextPageIsEmpty: false,
    noResults: false,
    noSearchResults: false,
    noConfirmedResults: false,
    userID: null
  }),
  components: {
    RefreshBtn,
    Checkbox,
    ShortNewsBlock,
    Sidebar
  },
  watch: {
    searchQueryString () { this.searchQuery = this.searchQueryString }
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'userData', 'globalNews', 'globalNewsFetchedNumber']),
    searchQueryString () { return this.$route.query.search }
  },
  methods: {
    ...mapActions(['fetchUserData', 'fetchAllGlobalNews', 'fetchConfirmedGlobalNews', 'searchGlobalNews']),
    ...mapMutations(['clearGlobalNews']),

    //
    // FIRST news loading...
    //
    async loadFirstNews (query = '', confirmed = false) {
      this.clearVariables()
      
      let data = {
        quantity: this.articlesPerPage,
        page: 1,
        isNext: false,
        userID: this.userID
      }

      // NOT search
      if (query === '') {
        // NOT confirmed
        if (!confirmed) {
          await this.fetchAllGlobalNews(data).then(() => {
            this.firstNewsLoading = false
            if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
            if (this.globalNewsFetchedNumber === 0) this.noResults = true
          })

        // CONFIRMED
        } else {
          await this.fetchConfirmedGlobalNews(data).then(() => {
            this.firstNewsLoading = false
            if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
            if (this.globalNewsFetchedNumber === 0) this.noConfirmedResults = true
          })
        }

      // SEARCH
      } else {
        data = {
          quantity: this.articlesPerPage,
          searchQuery: query,
          page: 1,
          isNext: false,
          userID: this.userID
        }
        await this.searchGlobalNews(data).then(() => {
          this.firstNewsLoading = false
          if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
          if (this.globalNewsFetchedNumber === 0) this.noSearchResults = true
        })
      }
    },
    
    //
    // NEXT news loading...
    //
    async loadNextNews () {
      this.nextNewsLoading = true

      let data = {
        quantity: this.articlesPerPage,
        page: this.nextPageNum,
        isNext: true,
        userID: this.userID
      }

      // NOT search
      if (!this.searchQueryString) {
        // NOT confirmed
        if (!this.onlyConfirmedChecked) {
          await this.fetchAllGlobalNews(data).then(() => {
            this.nextNewsLoading = false
            this.nextPageNum += 1
            if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
          })
        
        // CONFIRMED
        } else {
          await this.fetchConfirmedGlobalNews(data).then(() => {
            this.nextNewsLoading = false
            this.nextPageNum += 1
            if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
          })
        }

      // SEARCH
      } else {
        data = {
          quantity: this.articlesPerPage,
          searchQuery: this.searchQueryString,
          page: this.nextPageNum,
          isNext: true,
          userID: this.userID
        }
        await this.searchGlobalNews(data).then(() => {
            this.nextNewsLoading = false
            this.nextPageNum += 1
            if (this.globalNewsFetchedNumber < this.articlesPerPage) this.nextPageIsEmpty = true
        })
      }
    },

    async searchSubmit () {
      // Validation
      if ((this.searchQuery === this.searchQueryString) || (this.searchQuery.length > this.maxTitleNews)) return false
      if (this.searchQuery === '') {
        this.$router.push({ name: 'global-news' })
        return false
      }
      this.$router.push({ name: 'global-news', query: { search: this.searchQuery } })

      // actual submit
      this.loadFirstNews(this.searchQuery)
    },
    refreshNews () {
      this.clearVariables()
      this.loadFirstNews(this.$route.query.search, this.onlyConfirmedChecked)
    },
    clearVariables () {
      this.clearGlobalNews()
      this.firstNewsLoading = true
      this.nextNewsLoading = false
      this.nextPageNum = 2
      this.nextPageIsEmpty = false
      this.noSearchResults = false
      this.noConfirmedResults = false
    }
  },
  async mounted () {
    if (this.userLoggedIn) {
      await this.fetchUserData().then(() => {
        this.userID = this.userData.id
      })
    }

    if (this.searchQueryString) this.searchQuery = this.searchQueryString
    this.loadFirstNews(this.searchQuery)
  },
  beforeRouteUpdate (to, from, next) {
    if (from.name === 'global-news') {
      next()
      this.clearVariables()
      this.loadFirstNews(to.query.search)
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
.news-search-filed {
  border: 1px solid $grey-line-light;
  border-radius: 22px;
  form {
    font-size: rem(16px);
    height: 44px;
    @include roundBorder(44px);
    @media screen and (max-width: $tableWidth) {
      height: 34px;
      @include roundBorder(17px);
    }
    input[type="text"] {
      width: 100%;
      height: 44px;
      color: $grey-font-base;
      @include roundLeftBorder(44px);
      @media screen and (max-width: $tableWidth) {
        height: 34px;
        @include roundLeftBorder(34px);
      }
    }
    button {
      height: 44px;
      padding-left: 12px;
      padding-right: 15px;
      @include roundRightBorder(44px);
      .fa-search {
        font-size: 16px;
        @media screen and (max-width: $tableWidth) {
          font-size: 14px;
        }
        color: $grey-icon-light;
        @include trans01s;
      }
      &:hover { .fa-search { color: $grey-font-light } }
      @media screen and (max-width: $tableWidth) {
        height: 34px;
        @include roundRightBorder(34px);
      }
    }
  }
}
.main-news-side {
  background-color: $grey-bg-light;
  .search-results {
    color: $purple-font-base;
    span { font-style: italic }
  }
}
</style>
