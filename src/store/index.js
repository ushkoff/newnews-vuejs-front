import Vue from 'vue'
import Vuex from 'vuex'

// News
import globalNews from './modules/news/global'
import localNews from './modules/news/local'
import newsBlocks from './modules/news/news-blocks'
import globalCategoryNews from './modules/news/categories/global'
import localCategoryNews from './modules/news/categories/local'
// Auth
import auth from './modules/auth/auth'
import passwordReset from './modules/auth/password-reset'
import location from './modules/auth/location'
// User
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globalNews,
    localNews,
    newsBlocks,
    globalCategoryNews,
    localCategoryNews,
    auth,
    passwordReset,
    user,
    location
  }
})