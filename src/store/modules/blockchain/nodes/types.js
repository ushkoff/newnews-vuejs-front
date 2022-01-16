export default {
  state: {
    ordinaryNodes: {},
    IENodes: {},
    delegatNodes: {}
  },
  getters: {
    ordinaryAndIENodesExist (state) {
      if (Object.keys(state.ordinaryNodes).length !== 0 || Object.keys(state.IENodes).length !== 0) {
        return true
      } else return false
    },
    ordinaryNodes (state) {
      return state.ordinaryNodes
    },
    IENodes (state) {
      return state.IENodes
    },
    delegatNodesExist (state) {
      if (Object.keys(state.delegatNodes).length !== 0) {
        return true
      } else return false
    },
    delegatNodes (state) {
      return state.delegatNodes
    }
  },
  actions: {
    async retrieveOrdinaryAndIENodes (ctx) {
      const ordinaryNodes = JSON.parse(localStorage.getItem('ORDINARY')) || {}
      const IENodes = JSON.parse(localStorage.getItem('IE')) || {}

      ctx.commit('updateOrdinaryNodes', ordinaryNodes)
      ctx.commit('updateIENodes', IENodes)
    },
    async retrieveOrdinaryAndIEAndDelegatNodes (ctx) {
      const ordinaryNodes = JSON.parse(localStorage.getItem('ORDINARY')) || {}
      const IENodes = JSON.parse(localStorage.getItem('IE')) || {}
      const delegatNodes = JSON.parse(localStorage.getItem('DELEGAT')) || {}

      ctx.commit('updateOrdinaryNodes', ordinaryNodes)
      ctx.commit('updateIENodes', IENodes)
      ctx.commit('updateDelegatNodes', delegatNodes)
    },
    async sendNewsToIE (ctx, { link, msg, currentDomain }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      await this._vm.$http.post(link, msg).then((response) => {
        if (response.data == 1) {
          //
        }
      }).catch((e) => {
        console.log('No connection to ' + currentDomain) // eslint-disable-line
        throw e
      })
    },
    async sendNewsToOrdinaryNode (ctx, { currentDomain, msg }) {
      this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
      this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

      await this._vm.$http.post(currentDomain + '/anynews', msg).then((response) => {
        if (response.data == 1) {
          //
        }
      }).catch((e) => {
        console.log('No connection to ' + currentDomain) // eslint-disable-line
        throw e
      })
    }
  },
  mutations: {
    updateOrdinaryNodes (state, nodesData) {
      state.ordinaryNodes = nodesData
    },
    updateIENodes (state, nodesData) {
      state.IENodes = nodesData
    },
    updateDelegatNodes (state, nodesData) {
      state.delegatNodes = nodesData
    }
  }
}