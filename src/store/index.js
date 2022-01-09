import Vue from 'vue'
import Vuex from 'vuex'

import newsBlocks from './modules/news/news-blocks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    newsBlocks
  }
})