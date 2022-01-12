export default {
    state: {
      localCategoryNews: null,
      localCategoryNewsFetchedNumber: null
    },
    getters: {
      localCategoryNews (state) {
        return state.localCategoryNews
      },
      localCategoryNewsFetchedNumber (state) {
        return state.localCategoryNewsFetchedNumber
      }
    },
    actions: {
      async fetchLocalNewsByCategory (ctx, { categoryID, quantity, page, isNext, userID, countryCode }) {
        this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
        this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken
  
        const data = {
          quantity,
          user_id: userID,
          country_code: countryCode
        }
        await this._vm.$http.post(this._vm.$api + 'news/local-news/category/' + categoryID + '?page=' + page, data).then((response) => {
          let articles = response.data.data
          ctx.commit('updateLocalCategoryNews', { articles, isNext })
          ctx.commit('updateLocalCategoryNewsFetchedNumber', articles.length)
        }).catch((e) => { throw e })
      }
    },
    mutations: {
      updateLocalCategoryNews (state, { articles, isNext }) {
        if (!isNext)
          state.localCategoryNews = articles
        else
          state.localCategoryNews = state.localCategoryNews.concat(articles)
      },
      clearLocalCategoryNews (state) {
        state.localCategoryNews = null
      },
      updateLocalCategoryNewsFetchedNumber (state, number) {
        state.localCategoryNewsFetchedNumber = number
      }
    }
  }