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
    },

    async storeArticle (ctx, { categoryID, userID, title, contentHtml, country, countryCode, refs, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        category_id: categoryID,
        user_id: userID,
        title,
        content_html: contentHtml,
        country,
        country_code: countryCode,
        ...(refs != '') && { refs },
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news/store', data).catch(e => {
        throw e.response.data.message // returns error message
      })
    },

    async editArticle (ctx, { articleID, categoryID, userID, title, contentHtml, refs, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        category_id: categoryID,
        user_id: userID,
        title,
        content_html: contentHtml,
        ...(refs != '') && { refs },
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news/' + articleID + '/update', data).catch(e => {
        throw e.response.data.message // returns error message
      })
    },

    async deleteArticle (ctx, { articleID, userID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID
      }
      await this._vm.$http.post(this._vm.$api + 'news/global-news/' + articleID + '/delete', data).catch(e => { throw e })
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