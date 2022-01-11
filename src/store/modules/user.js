export default {
  state: {
    userData: null
  },
  getters: {
    userData (state) {
      return state.userData
    },
    username (state) {
      return state.userData.username
    }
  },
  actions: {
    async fetchUserData(ctx) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      await this._vm.$http.get(this._vm.$api + 'user/current').then((response) => {
        ctx.commit('updateUserData', response.data.data)
      }).catch(e => { throw e })
    }
  },
  mutations: {
    updateUserData (state, data) {
      state.userData = data
    },
    clearUserData (state) {
      state.userData = null
    }
  }
}