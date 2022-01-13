export default {
  state: {
    blocklist: null,
    blocklistFetchedRecordsNumber: null
  },
  getters: {
    blocklist (state) {
      return state.blocklist
    },
    blocklistFetchedRecordsNumber (state) {
      return state.blocklistFetchedRecordsNumber
    }
  },
  actions: {
    async fetchBlocklist (ctx, { userID, quantity, isNext, page }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID,
        quantity
      }
      await this._vm.$http.post(this._vm.$api + 'user/blocklist?page=' + page, data).then((response) => {
        let records = response.data.data
        ctx.commit('updateBlocklist', { records, isNext })
        ctx.commit('updateBlocklistFetchedRecordsNumber', records.length)
      }).catch(e => { throw e })
    },

    async blockUser (ctx, { userID, blockedUserID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID,
        blocked_user_id: blockedUserID
      }
      await this._vm.$http.post(this._vm.$api + 'user/blocklist/add', data).catch(e => { throw e })
    },
    async unblockUser (ctx, { userID, blockedUserID }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + ctx.getters.authToken

      const data = {
        user_id: userID,
        blocked_user_id: blockedUserID
      }
      await this._vm.$http.post(this._vm.$api + 'user/blocklist/remove', data).catch(e => { throw e })
    }
  },
  mutations: {
    updateBlocklist (state, { records, isNext }) {
      if (!isNext) state.blocklist = records
      else state.blocklist = state.blocklist.concat(records)
    },
    updateBlocklistFetchedRecordsNumber (state, number) {
      state.blocklistFetchedRecordsNumber = number
    }
  }
}