import Vue from 'vue'
import Vuex from 'vuex'

import newsBlocks from './modules/news/news-blocks'
import auth from './modules/auth/auth'
import passwordReset from './modules/auth/password-reset'
import user from './modules/user'
import location from './modules/location'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    newsBlocks,
    auth,
    passwordReset,
    user,
    location
  }
})