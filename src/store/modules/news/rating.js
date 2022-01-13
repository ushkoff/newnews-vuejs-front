export default {
  state: {
    articleRating: null,
    isLiked: null,
    isDisliked: null
  },
  getters: {
    articleRating (state) {
      return state.articleRating
    },
    isLiked (state) {
      return state.isLiked
    },
    isDisliked (state) {
      return state.isDisliked
    }
  },
  actions: {
    async fetchArticleRating (ctx, { articleID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      await this._vm.$http.get(this._vm.$api + 'news/' + articleID + '/rating').then((response) => {
        ctx.commit('updateArticleRating', response.data.rating)
      }).catch((e) => { throw e })
    },
    async fetchIsLiked (ctx, { articleID, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID
      }
      await this._vm.$http.post(this._vm.$api + 'news/' + articleID + '/is-liked', data).then((response) => {
        ctx.commit('updateIsLiked', response.data.message)
      }).catch((e) => { throw e })
    },
    async fetchIsDisliked (ctx, { articleID, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID
      }
      await this._vm.$http.post(this._vm.$api + 'news/' + articleID + '/is-disliked', data).then((response) => {
        ctx.commit('updateIsDisliked', response.data.message)
      }).catch((e) => { throw e })
    },

    async putMarkOnArticle(ctx, { articleID, userID, markType }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID
      }
      await this._vm.$http.post(this._vm.$api + 'news/' + articleID + '/' + markType, data).catch((e) => { throw e })
    }
  },
  mutations: {
    updateArticleRating (state, rating) {
      state.articleRating = rating
    },
    updateIsLiked (state, isLiked) {
      state.isLiked = isLiked
    },
    updateIsDisliked (state, isDisliked) {
      state.isDisliked = isDisliked
    },
    clearRatingData (state) {
      state.articleRating = null
      state.isLiked = null
      state.isDisliked = null
    }
  }
}