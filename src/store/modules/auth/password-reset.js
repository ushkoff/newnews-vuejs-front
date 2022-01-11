export default {
  state: {},
  getters: {},
  actions: {
    async requestPasswordReset (ctx, { email, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      const data = {
        email,
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'auth/password-reset/create', data).catch((e) => {
        throw e.response.data.message // returns error message
      })
    },

    async resetPassword (ctx, { email, password, token, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      const data = {
        email,
        password,
        token,
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'auth/password-reset/reset', data).catch((e) => {
        throw e.response.data.message
      })
    }
  },
  mutations: {}
}