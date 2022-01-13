export default {
  state: {
    yourNews: null,
    fetchedYourNewsNumber: null
  },
  getters: {
    yourNews (state) {
      return state.yourNews
    },
    fetchedYourNewsNumber (state) {
      return state.fetchedYourNewsNumber
    }
  },
  actions: {
    // Your news
    async fetchYourNews(ctx, { userID, quantity, isNext, page }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID,
        quantity
      }
      await this._vm.$http.post(this._vm.$api + 'news/your-news?page=' + page, data).then((response) => {
        let articles = response.data.data
        ctx.commit('updateYourNews', { articles, isNext })
        ctx.commit('updateFetchedYourNewsNumber', articles.length)
      }).catch(e => { throw e })
    }
  },
  mutations: {
    updateYourNews (state, { articles, isNext }) {
      if (!isNext) state.yourNews = articles
      else state.yourNews = state.yourNews.concat(articles)
    },
    updateFetchedYourNewsNumber (state, number) {
      state.fetchedYourNewsNumber = number
    },
    clearYourNews (state) {
      state.yourNews = null
    }
  }
}