export default {
    state: {
      globalCategoryNews: null,
      globalCategoryNewsFetchedNumber: null
    },
    getters: {
      globalCategoryNews (state) {
        return state.globalCategoryNews
      },
      globalCategoryNewsFetchedNumber (state) {
        return state.globalCategoryNewsFetchedNumber
      }
    },
    actions: {
      async fetchGlobalNewsByCategory (ctx, { categoryID, quantity, page, isNext, userID }) {
        this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
        this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  
        let data = {
          quantity,
          ...(userID != null) && {user_id: userID}
        }
        await this._vm.$http.post(this._vm.$api + 'news/global-news/category/' + categoryID + '?page=' + page, data).then((response) => {
          let articles = response.data.data
          ctx.commit('updateGlobalCategoryNews', { articles, isNext })
          ctx.commit('updateGlobalCategoryNewsFetchedNumber', articles.length)
        }).catch((e) => { throw e })
      }
    },
    mutations: {
      updateGlobalCategoryNews (state, { articles, isNext }) {
        if (!isNext)
          state.globalCategoryNews = articles
        else
          state.globalCategoryNews = state.globalCategoryNews.concat(articles)
      },
      clearGlobalCategoryNews (state) {
        state.globalCategoryNews = null
      },
      updateGlobalCategoryNewsFetchedNumber (state, number) {
        state.globalCategoryNewsFetchedNumber = number
      }
    }
  }