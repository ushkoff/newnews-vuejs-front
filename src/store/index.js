import Vue from 'vue'
import Vuex from 'vuex'

// News
import article from './modules/news/article'
import globalNews from './modules/news/lists/global'
import localNews from './modules/news/lists/local'
import newsBlocks from './modules/news/lists//news-blocks'
import globalCategoryNews from './modules/news/categories/global'
import localCategoryNews from './modules/news/categories/local'
import yourNews from './modules/news/lists/your'
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

// Blockchain & Nodes
import keyPair from './modules/blockchain/keyPair'
import fullNodeNews from './modules/news/node/full'
import nodesCommon from './modules/blockchain/nodes/common'
import nodes from './modules/blockchain/nodes/types'
// Transactions
import transactionsCommon from './modules/blockchain/transactions/common'
import transactionNodes from './modules/blockchain/transactions/types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    article,
    globalNews,
    localNews,
    newsBlocks,
    globalCategoryNews,
    localCategoryNews,
    yourNews,
    rating,
    fullNodeNews,
    auth,
    passwordReset,
    location,
    user,
    blocklist,
    settings,
    keyPair,
    nodesCommon,
    nodes,
    transactionsCommon,
    transactionNodes
  }
})