export default {
  state: {
    userBalance: null
  },
  getters: {
    userBalance (state) {
      return state.userBalance
    }
  },
  actions: {
    async fetchUserBalance (ctx, { publicKey }) { // eslint-disable-line
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      ctx.commit('updateUserBalance', 110)

      // await this._vm.$http.get(this._vm.$nodeApi + 'balance/' + publicKey).then((response) => {
      //   ctx.commit('updateUserBalance', response.data)
      // }).catch((e) => {
      //   console.log('No connection to NewNews node API') // eslint-disable-line
      //   throw e
      // })
    },

    async sendDefaultNodeTransaction (ctx, { pickedNodeDomain, msg, withSignature }) { // eslint-disable-line
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      await this.$http.post(pickedNodeDomain + '/tx', msg).then((response) => {
        if ((response.data === 1) || (response.data === '1')) {
          // if (withSignature) {
          //   this.$decrementTempPrvNonce(this.pickedNodesData.anyNodeType, pickedNodeDomain)
          //   this.$incrementNonce()
          // } else {
          //   this.$decrementTempPrvNonce('DELEGAT', pickedNodeDomain)
          // }
        } else console.log('Wrong answer from ' + pickedNodeDomain)
      }).catch((e) => {
        console.log('No connection to ' + pickedNodeDomain) // eslint-disable-line
        throw e
      })
    }
  },
  mutations: {
    updateUserBalance (state, balance) {
      state.userBalance = balance
    }
  }
}