export default {
  actions: {
    // Latest News
    async fetchLatestArticles(ctx, { quantity, userID }) {
      let data = {
        quantity,
        ...(userID != null) && {user_id: userID}
      }
      await this._vm.$http.post(this._vm.$api + 'news/latest', data).then((response) => {
        ctx.commit('updateLatestArticles', response.data.data)
      }).catch((e) => { throw e })
    },
    // Random Category news
    async fetchRandomCategoryArticles(ctx, { quantity, userID }) {
      let data = {
        quantity,
        ...(userID != null) && {user_id: userID}
      }
      await this._vm.$http.post(this._vm.$api + 'news/random-category', data).then((response) => {
        ctx.commit('updateRandomCategoryArticles', response.data.data)
      }).catch((e) => { throw e })
    }
  },
  mutations: {
    updateLatestArticles(state, articles) {
      state.latestArticles = articles
    },
    updateRandomCategoryArticles(state, articles) {
      state.randomCategoryArticles = articles
    }
  },
  state: {
    latestArticles: null,
    randomCategoryArticles: null
  },
  getters: {
    latestArticles(state) {
      return state.latestArticles
    },
    randomCategoryArticles(state) {
      return state.randomCategoryArticles
    }
  }
}