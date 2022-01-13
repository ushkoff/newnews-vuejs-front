<template lang="pug">
  div
    .def-page-header(:style="{'background-image': `url('${publicPath}assets/img/pages/news/article/header.jpg')`}")
      .container(class="d-flex align-items-center justify-content-center justify-content-md-start pt-5")
        span.def-page-header-name(class="pl-4 pr-4 pt-3 pb-3") {{ article.title }}
        span.def-page-header-name(class="text-truncate pl-4 pr-4") {{ article.title }}
    .container(class="mt-4 mt-md-5")
      .row
        div(class="news-instance-shell col-12 col-xl-8")

          NewnewsLoader(v-if="loading")

          //- Article header
          .news-instance(v-else :class="stageOfTruthByRating(article.rating, article.isConfirmed)" class="p-3")
            .news-date-cat-views(class="d-flex justify-content-between align-items-center")
              .news-cat-date
                span.news-date {{ article.date }} <span v-if="userLoggedIn">: for you {{ userData.timezone }} </span> <span v-if="article.isEdited">(edited)</span>
                span(class="ml-1 mr-1") |
                router-link(
                  :to="{ name: 'global-news-by-category', params: { slug: article.categorySlug } }"
                  class="news-cat"
                ) {{ article.category }}
                .news-location(class="mt-1")
                  <i class="fas fa-map-marker-alt mr-1"></i>
                  span {{ article.country }} [{{ article.countryCode }}]
              
              //- Buttons to add this author to blocklist
              .news-author-block
                div(v-if="!userLoggedIn || (userID !== article.userID)" class="d-flex align-items-center")
                  .news-author-name(class="text-truncate ml-2") {{ article.username }}
                  button.news-author-btn(class="ml-3" @click="hideUsersNews(article.userID)") <i class="fas fa-flag"></i>
                div(v-else)
                  .news-author-name(class="text-truncate ml-2") You [{{ article.username }}]

            //- Article content
            .news-title(class="mt-3")
              <i class="fas fa-thumbs-up mr-2"></i><i class="fas fa-check mr-2"></i>
              span {{ article.title }}
            .news-refs(class="mt-1" v-if="article.refs" v-html="linkify(article.refs)")
            .news-content(v-html="article.content" class="mt-4")

            //- Article crypto data
            .news-crypto-info(class="mt-4")
              span.pubkey(class="d-block") Author's public key: <span class="hash">{{ article.author_pubkey }}</span>
              span.signature(class="d-block") Signature: <span class="hash">{{ article.signature }}</span>
            .news-reward-author(class="mt-4 mt-lg-5 d-flex justify-content-center")
              router-link(:to="{ name: 'transactions', query: { recipient: article.author_pubkey } }") <i class="fas fa-award"></i> Reward the author

            //- Article rating, Likes/Dislikes  
            .news-rating-line(class="mt-4 mt-lg-5")
              .rating-filled
            .news-vote-share(class="mt-3 d-block d-md-flex justify-content-between align-items-center")
              .news-truth-voting(class="d-flex justify-content-start align-items-center")
                span(class="d-block mr-3") Is the news true?

                DefaultLoader(v-if="voteButtonsLoading" add-class="relative m-0")

                form.news-vote-buttons(v-else class="d-flex justify-content-start align-items-center")
                  .news-like-btn(
                    @click="putMarkOnNews('like')"
                    :class="{ 'vote-news-active-btn': isLiked }"
                    class="mr-3"
                  )
                    <i class="fas fa-thumbs-up mr-1"></i>
                  .news-dislike-btn(
                    @click="putMarkOnNews('dislike')"
                    :class="{ 'vote-news-active-btn': isDisliked }"
                  )
                    <i class="fas fa-thumbs-up mr-1"></i>
                  .news-rating-counter(class="ml-3") {{ getNumberWithSymbol(article.rating) }}

              //- Share article buttons
              .news-share-btns(class="mt-3 mt-md-0")
                //- using "vue-social-sharing"
                SocialSharing(:url="appUrl.slice(0, -1) + this.$route.fullPath" :title="this.article.title" :description="this.article.title", inline-template)
                  div
                    network(network='telegram')
                      i.fab.fa-telegram-plane(class="ml-1 d-inline-block p-1" style="cursor: pointer; width: 30px; height: 30px; color: #fff; background-color: #0088CC; border-radius: 3px")
                    network(network='twitter')
                      i.fab.fa-twitter(class="ml-1 d-inline-block p-1" style="cursor: pointer; width: 30px; height: 30px; color: #fff; background-color: #1DA1F2; border-radius: 3px")
                    network(network='facebook')
                      i.fab.fa-facebook-f(class="ml-1 d-inline-block p-1" style="cursor: pointer; width: 30px; height: 30px; color: #fff; background-color: #3B5998; border-radius: 3px")
                    network(network='vk')
                      i.fab.fa-vk(class="ml-1 d-inline-block p-1" style="cursor: pointer; width: 30px; height: 30px; color: #fff; background-color: #6383A8; border-radius: 3px")
                    network(network='reddit')
                      i.fab.fa-reddit-alien(class="ml-1 d-inline-block p-1" style="cursor: pointer; width: 30px; height: 30px; color: #fff; background-color: #FF5106; border-radius: 3px")

        div(class="col-12 col-xl-4")
          Sidebar

</template>

<script>
import cfg from '@/config/news'
import SocialSharing from 'vue-social-sharing'
import Sidebar from '@/components/app/Sidebar'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'article-page',
  metaInfo () {
    return { title: this.$title(this.article.title) }
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    appUrl: process.env.VUE_APP_URL,
    loading: true,
    voteButtonsLoading: true,
    minConfirmedNewsRating: cfg.minConfirmedNewsRating, // more than that number
    minWrongNewsRatingAbsValue: cfg.minWrongNewsRatingAbsValue, // less than that number
    userID: null
  }),
  components: {
    SocialSharing,
    Sidebar
  },
  computed: {
    ...mapGetters(['userLoggedIn', 'userData', 'article', 'articleRating', 'isLiked', 'isDisliked']),
    articleID: {
      get () { return this.$route.params.id },
      set (newArticleID) { return newArticleID }
    }
  },
  methods: {
    ...mapActions(['fetchUserData', 'fetchArticle', 'fetchArticleRating', 'fetchIsLiked', 'fetchIsDisliked', 'putMarkOnArticle', 'blockUser']),
    ...mapMutations(['clearArticle', 'clearRatingData']),

    stageOfTruthByRating (rating, isConfirmed) {
      if (isConfirmed === 1) return 'confirmed-news'
      else {
        if (rating >= this.minConfirmedNewsRating) return 'true-news'
        else if (rating <= -this.minWrongNewsRatingAbsValue) return 'wrong-news'
        else return 'mid-news'
      }
    },
    getNumberWithSymbol (number) {
      if (number > 0) return '+' + number
      return number
    },

    // make links by article refs
    linkify (text) {
      let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig // eslint-disable-line
      return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>'
      })
    },

    async loadArticleData () {
      const data = {
        articleID: this.articleID,
        userID: this.userID
      }
      await this.fetchArticle(data).then(() => {
        this.loading = false
      }).catch(() => {
        this.$router.replace({ name: 'page-404' })
      })
    },

    async loadActiveMarks () {
      if (this.userLoggedIn) {
        // if user logged in, then show if liked or disliked post
        this.clearRatingData()

        const data = {
          articleID: this.article.id,
          userID: this.userID
        }

        await this.fetchIsLiked(data).then(() => {
          if (this.isLiked == false) {
            this.fetchIsDisliked(data)
          }
        })

        // Load new rating
        await this.fetchArticleRating({ articleID: this.article.id }).then(() => {
          this.article.rating = this.articleRating
        })
      }

      this.voteButtonsLoading = false
    },

    async putMarkOnNews (mark) {
      if (!this.userLoggedIn) {
        this.$router.push({ name: 'login' })
        return false
      } else {

        this.voteButtonsLoading = true
        const data = {
          articleID: this.article.id,
          userID: this.userID,
          markType: mark
        }
        await this.putMarkOnArticle(data).then(() => {
          this.loadActiveMarks()
          this.voteButtonsLoading = false
        })
      }
    },

    async hideUsersNews () {
      if (!this.userLoggedIn) {
        this.$router.push({ name: 'login' })
        return false
      } else {

        await this.$swal.fire({
          title: 'Hide user',
          text: 'Are you sure you want to hide news from this user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            const data = {
              userID: this.userID,
              blockedUserID: this.article.userID
            }
            this.blockUser(data).then(() => {
              this.$router.push({ name: 'global-news' })
              this.$swal.fire(
                'Success',
                'You will no longer see news from this user.',
                'success'
              )
            }).catch(() => {
              this.$swal.fire({
                title: 'Error 500',
                text: 'Something went wrong...',
                icon: 'warning'
              })
            })
          }
        })
      }
    },

    clearVariables (params = false) {
      if (!params) this.articleID = params.id
      this.loading = true
      this.voteButtonsLoading = false
      this.clearArticle()
    }
  },
  async mounted () {
    if (this.userLoggedIn) {
      await this.fetchUserData().then(() => {
        this.userID = this.userData.id
      })
    }

    await this.loadArticleData()
    await this.loadActiveMarks()
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.name === 'article') {
      next()
      this.clearVariables(to.params)
      await this.loadArticleData()
      await this.loadActiveMarks()
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/vars';
@import '@/assets/scss/utils/mixins';

.def-page-header {
  .def-page-header-name {
    font-size: rem(40px) !important;
    line-height: rem(50px) !important;
    letter-spacing: -2px !important;
    &:last-child { display: none }
  }
  @media screen and (max-width: $smDesktopWidth) {
    height: 200px !important;
    .def-page-header-name {
      &:first-child { display: none !important }
      &:last-child {
        display: block;
        font-size: rem(27px) !important;
      }
    }
  }
}

.news-instance-shell { min-height: 250px }

.news-instance {
  background-color: $grey-bg-light;
  .news-date-cat-views {
    font-weight: 600;
    font-size: rem(14px);
    font-style: italic;
    color: $grey-font-for-bg;
    a {
      color: $grey-font-for-bg;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .news-location {
      .fa-map-marker-alt {
        font-size: rem(10px);
        position: relative;
        top: -1px;
        color: $grey-font-base;
      }
      font-style: normal;
      font-size: rem(13px);
    }
    .news-author-name {
      max-width: 175px;
    }
    .news-author-btn {
      .fa-flag { color: $warning-color }
    }
  }
  .news-title {
    font-size: rem(16px);
    color: $blue-news-title;
    word-break: break-word;
  }
  .news-refs {
    font-size: rem(14px);
    word-break: break-word;
  }
  .news-crypto-info {
    font-weight: 600;
    font-size: rem(14px);
    font-style: italic;
    color: $grey-font-for-bg;
    .hash { @include hash }
  }
  .news-reward-author {
    a {
      font-size: rem(18px);
      font-style: italic;
      color: $red-font-base;
      &::before, &::after {
        @include trans01s;
        position: relative;
        content: '... '
      }
      &::before { left: 0 }
      &::after { right: 0 }
      &:hover {
        text-decoration: none;
        &::before { left: -5px }
        &::after { right: -5px }
      }
    }
  }

  // .news-content styles in "_common.scss"

  .news-rating-line {
    height: 3px;
    background-color: $grey-bg-dark;
    .rating-filled {
      height: 100%;
      background-color: $success-color;
      @include trans02s;
    }
  }
  .news-vote-share {
    .news-truth-voting {
      span {
        font-family: 'Montserrat';
        font-size: rem(14px);
        font-weight: 500;
        font-style: italic;
        color: $blue-title-base;
      }
      .news-like-btn, .news-dislike-btn {
        cursor: pointer;
        .fa-thumbs-up {
          display: block;
          color: $grey-icon-base;
        }
        span {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 600;
          color: $grey-icon-base;
          letter-spacing: -0.5px;
        }
      }
      .news-dislike-btn {
        .fa-thumbs-up { transform: rotate(180deg) }
      }
      .news-rating-counter {
        font-size: rem(16px);
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        color: $blue-font-light;
        letter-spacing: -0.5px;
      }
    }
  }
  .news-share-btns {
    i { color: red !important }
  }
}
.confirmed-news {
  .fa-thumbs-up { display: none }
  .fa-check { color: $success-color; }
}
.true-news {
  .fa-thumbs-up { color: $success-color }
  .rating-filled { background-color: $success-color !important }
  .fa-check { display: none  }
}
.mid-news {
  .fa-thumbs-up { color: $warning-color }
  .rating-filled { background-color: $warning-color !important }
  .fa-check { display: none  }
}
.wrong-news {
  .fa-thumbs-up {
    color: $error-color;
    transform: rotate(180deg);
  }
  .rating-filled { background-color: $error-color !important }
  .fa-check { display: none  }
  .news-like-btn {
    .fa-thumbs-up { transform: rotate(0) }
  }
}

.vote-news-active-btn {
  .fa-thumbs-up { color: $info-color !important }
  span { color: $info-color !important }
}
</style>
