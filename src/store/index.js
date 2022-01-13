import Vue from 'vue'
import Vuex from 'vuex'

// News
import article from './modules/news/article'
import globalNews from './modules/news/lists/global'
import localNews from './modules/news/lists/local'
import newsBlocks from './modules/news/lists//news-blocks'
import globalCategoryNews from './modules/news/categories/global'
import localCategoryNews from './modules/news/categories/local'
// News Rating
import rating from './modules/news/rating'
// Auth
import auth from './modules/auth/auth'
import passwordReset from './modules/auth/password-reset'
import location from './modules/auth/location'
// Users
import user from './modules/users/user'
import blocklist from './modules/users/blocklist'
// Settings
import settings from './modules/settings/forms'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article,
    globalNews,
    localNews,
    newsBlocks,
    globalCategoryNews,
    localCategoryNews,
    rating,
    auth,
    passwordReset,
    location,
    user,
    blocklist,
    settings
  }
})