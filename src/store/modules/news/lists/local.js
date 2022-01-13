export default {
  state: {
    localNews: null,
    localNewsFetchedNumber: null
  },
  getters: {
    localNews (state) {
      return state.localNews
    },
    localNewsFetchedNumber (state) {
      return state.localNewsFetchedNumber
    }
  },
  actions: {
    // [local news] ALL
    async fetchAllLocalNews (ctx, { quantity, page, isNext, userID, countryCode}) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      let data = {
        quantity,
        user_id: userID,
        country_code: countryCode
      }
      await this._vm.$http.post(this._vm.$api + 'news/local-news?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateLocalNews', { articles, isNext })
        ctx.commit('updateLocalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    },
    // [local news] CONFIRMED
    async fetchConfirmedLocalNews (ctx, { quantity, page, isNext, userID, countryCode }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        quantity,
        user_id: userID,
        country_code: countryCode
      }
      await this._vm.$http.post(this._vm.$api + 'news/local-news/confirmed?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateLocalNews', { articles, isNext })
        ctx.commit('updateLocalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    },
    // [local news] SEARCH
    async searchLocalNews (ctx, { quantity, searchQuery, page, isNext, userID, countryCode }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        quantity,
        searchQuery,
        user_id: userID,
        country_code: countryCode
      }
      await this._vm.$http.post(this._vm.$api + 'news/local-news/search?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateLocalNews', { articles, isNext })
        ctx.commit('updateLocalNewsFetchedNumber', articles.length)
      }).catch((e) => { throw e })
    },
  },
  mutations: {
    updateLocalNews (state, { articles, isNext }) {
      if (!isNext) state.localNews = articles
      else state.localNews = state.localNews.concat(articles)
    },
    clearLocalNews (state) {
      state.localNews = null
    },
    updateLocalNewsFetchedNumber (state, number) {
      state.localNewsFetchedNumber = number
    }
  }
}