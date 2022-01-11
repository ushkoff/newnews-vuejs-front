export default {
  state: {
    globalNews: null,
    globalNewsFetchedNumber: null
  },
  getters: {
    globalNews (state) {
      return state.globalNews
    },
    globalNewsFetchedNumber (state) {
      return state.globalNewsFetchedNumber
    }
  },
  actions: {
    // [global news] ALL
    async fetchAllGlobalNews (ctx, { quantity, page, isNext, userID}) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        quantity,
        ...(userID != null) && {user_id: userID}
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateGlobalNews', { articles, isNext })
        ctx.commit('updateGlobalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    },
    // [global news] CONFIRMED
    async fetchConfirmedGlobalNews (ctx, { quantity, page, isNext, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        quantity,
        ...(userID != null) && {user_id: userID}
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news/confirmed?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateGlobalNews', { articles, isNext })
        ctx.commit('updateGlobalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    },
    // [global news] SEARCH
    async searchGlobalNews (ctx, { quantity, searchQuery, page, isNext, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        quantity,
        searchQuery,
        ...(userID != null) && {user_id: userID}
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news/search?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateGlobalNews', { articles, isNext })
        ctx.commit('updateGlobalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    }
  },
  mutations: {
    updateGlobalNews (state, { articles, isNext }) {
      if (!isNext)
        state.globalNews = articles
      else
        state.globalNews = state.globalNews.concat(articles)
    },
    clearGlobalNews (state) {
      state.globalNews = null
    },
    updateGlobalNewsFetchedNumber (state, number) {
      state.globalNewsFetchedNumber = number
    }
  }
}