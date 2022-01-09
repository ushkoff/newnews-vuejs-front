import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookie from 'vue-cookie'
import Vuelidate from 'vuelidate'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'

// Libs
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

// Plugins
import tabTitlePlugin from '@/utils/tab-title.plugin'

Vue.use(VueCookie)
Vue.use(Vuelidate)
Vue.use(VueAwesomeSwiper)
Vue.use(tabTitlePlugin)

// Components
import NewnewsLoader from '@/components/app/loaders/NewnewsLoader'

Vue.component('NewnewsLoader', NewnewsLoader)

Vue.prototype.$http = axios
Vue.prototype.$api = process.env.VUE_APP_API

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
