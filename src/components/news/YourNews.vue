<template lang="pug">
  .your-news-container

    NewnewsLoader(v-if="firstNewsLoading")

    div(v-else)
      span.page-news-add-section-title(class="main-section-title mt-5 mt-lg-0") All your news
      .page-news-add-section(class="p-3 pt-3 pt-lg-5 mt-0 mt-lg-5")
        div(v-if="!noYourNewsResults")
            ShortNewsBlock(
                v-for="article in yourNews"
                :key="article.id"
                :id="article.id"
                :rating="article.rating"
                :isConfirmed="article.isConfirmed"
                :title="article.title"
                :humanDate="article.humanDate"
                :category="article.category"
                :categorySlug="article.categorySlug"
                :country="article.country"
                ref="newsList"
            )
                .your-news-operate
                    router-link(
                        v-if="article.isEditable"
                        :to="{ name: 'edit-news', params: { id: article.id } }"
                    ) Edit
                    span(v-if="article.isEditable" class="ml-1 mr-1") |
                    a(href="#" @click.prevent="deleteYourNews(article.id)") Delete
                    a(href="#" class="ml-1" @click="openEditInfoPrompt()")
                        <i class="far fa-question-circle"></i>
        div(v-else)
            span(class="d-block text-center mt-5 mb-5 def-empty-notification") You haven't posted the news yet.

        div(v-if="!nextPageIsEmpty && !firstNewsLoading && !noYourNewsResults")
          DefaultLoader(v-if="nextNewsLoading")
          LoadMoreBtn(
            v-else
            @click="loadNextNews"
            add-class="style-for-large-content"
          )

</template>

<script>
import cfg from '@/config/news'
import ShortNewsBlock from '@/components/news/ShortNewsBlock'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'your-news',
  data: () => ({
    publicPath: process.env.BASE_URL,
    maxNewsOnPage: cfg.yourNewsNumberOnAddNewsPage,
    firstNewsLoading: true,
    nextNewsLoading: false,
    nextPageNum: 2,
    nextPageIsEmpty: false,
    noYourNewsResults: false,
    userID: null
  }),
  components: {
    ShortNewsBlock
  },
  computed: mapGetters(['userLoggedIn', 'userData', 'yourNews', 'fetchedYourNewsNumber']),
  methods: {
    ...mapActions(['fetchUserData', 'fetchYourNews', 'deleteArticle']),
    ...mapMutations(['clearYourNews']),

    async loadFirstNews () {
      this.clearVariables()
      
      const data = {
        userID: this.userID,
        quantity: this.maxNewsOnPage,
        isNext: false,
        page: 1
      }
      await this.fetchYourNews(data).then(() => {
        this.firstNewsLoading = false
        if (this.fetchedYourNewsNumber < this.maxNewsOnPage) this.nextPageIsEmpty = true
        if (this.fetchedYourNewsNumber == 0) this.noYourNewsResults = true
      })
    },
    async loadNextNews () {
      this.nextNewsLoading = true

      const data = {
        userID: this.userID,
        quantity: this.maxNewsOnPage,
        isNext: true,
        page: this.nextPageNum
      }
      await this.fetchYourNews(data).then(() => {
        this.nextNewsLoading = false
        this.nextPageNum += 1
        if (this.fetchedYourNewsNumber < this.maxNewsOnPage) this.nextPageIsEmpty = true
      })
    },

    async deleteYourNews (articleID) {
      const data = {
        articleID,
        userID: this.userID
      }

      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.deleteArticle(data).then(() => {
            this.$swal.fire(
                'Deleted!',
                'Your news has been deleted.',
                'success'
            )
            this.firstNewsLoading = true
            this.loadFirstNews()
          })
        }
      })
    },
    openEditInfoPrompt () {
        this.$swal.fire({
            title: 'Info',
            text: 'You have only 4 hours to edit article',
            icon: 'info'
        })
    },
    clearVariables () {
      this.firstNewsLoading = true
      this.nextNewsLoading = false
      this.nextPageNum = 2
      this.nextPageIsEmpty = false
      this.noYourNewsResults = false
      this.clearYourNews()
    },
    async loadUserData () {
      if (this.userLoggedIn) {
        await this.fetchUserData().then(() => {
            this.userID = this.userData.id
        })
      } else {
        this.$router.push({ name: 'page-404' })
      }
    }
  },
  async mounted () {
    await this.loadUserData()
    await this.loadFirstNews()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.your-news-container { position: relative; min-height: 400px }
.def-loader {
  position: relative;
  top: 0;
  transform: translate(-50%, 0);
  margin-top: 100px;
  margin-bottom: 100px;
}
.your-news-operate {
  a, span {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 10px;
    color: $purple-bg-light;
  }
}
</style>
