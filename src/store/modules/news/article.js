export default {
  state: {
    article: {}
  },
  getters: {
    article (state) {
      return state.article
    }
  },
  actions: {
    // Get article by ID
    async fetchArticle (ctx, { articleID, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {}
      if (userID != null) data = { user_id: userID }

      await this._vm.$http.post(this._vm.$api + 'news/global-news/' + articleID, data).then((response) => {
        ctx.commit('updateArticle', response.data.data)
      }).catch((e) => { throw e })
    }
  },
  mutations: {
    updateArticle (state, articleData) {
      state.article = articleData
    },
    clearArticle (state) {
      state.article = {}
    }
  }
}