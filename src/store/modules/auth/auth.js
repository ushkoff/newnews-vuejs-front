export default {
  state: {
    authToken: localStorage.getItem('access_token') || null
  },
  getters: {
    authToken (state) {
      return state.authToken
    },
    userLoggedIn(state) {
      return state.authToken !== null
    }
  },
  actions: {
    // Login
    async login (ctx, { email, password, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        email,
        password,
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'auth/login', data).then((response) => {
        ctx.commit('updateAuthToken', response.data.access_token)
      }).catch((e) => {
        throw e.response.data.message // returns error message
      })
    },
    // Logout
    async logout (ctx) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken
      await this._vm.$http.post(this._vm.$api + 'auth/logout').then(() => {
        ctx.commit('destroyAuthToken')
        ctx.commit('clearUserData')
      }).catch((e) => { throw e })
    },

    // Resend email confirmation letter
    async resendEmailConfirmation (ctx, email) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      await this._vm.$http.get(this._vm.$api + 'auth/email/resend/' + email).catch((e) => {
        throw e.response.data.message
      })
    },

    // Register
    async register (ctx, { username, email, password, country, countryCode, timezone, recaptchaToken }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      let data = {
        username,
        email,
        password,
        country,
        countryCode,
        timezone,
        recaptchaToken
      }
      await this._vm.$http.post(this._vm.$api + 'auth/register', data).catch((e) => {
        throw e.response.data.message // returns error message
      })
    }
  },
  mutations: {
    updateAuthToken (state, token) {
      localStorage.setItem('access_token', token)
      state.authToken = localStorage.getItem('access_token')
    },
    destroyAuthToken (state) {
      state.authToken = null
      localStorage.removeItem('access_token')
    }
  }
}