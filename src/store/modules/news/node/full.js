export default {
  state: {},
  getters: {},
  actions: {
    async storeFullNodeNews (ctx, { hash, contentJson, userID, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        hash,
        content_json: contentJson,
        user_id: userID,
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'news/node/full/store', data).catch(e => {
        throw e.response.data.message // returns error message
      })
    }
  },
  mutations: {}
}