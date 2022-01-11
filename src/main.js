import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueCookie from 'vue-cookie'
import Vuelidate from 'vuelidate'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueSweetalert2 from 'vue-sweetalert2'

// Libs
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

// Plugins
import tabTitlePlugin from '@/utils/tab-title.plugin'

Vue.use(VueCookie)
Vue.use(Vuelidate)
Vue.use(VueAwesomeSwiper)
Vue.use(VueSweetalert2)
Vue.use(tabTitlePlugin)

// Components
import VueRecaptcha from 'vue-recaptcha'
import NewnewsLoader from '@/components/app/loaders/NewnewsLoader'
import DefaultLoader from '@/components/app/loaders/DefaultLoader'
import LoadMoreBtn from '@/components/app/common/LoadMoreBtn'

Vue.component('vue-recaptcha', VueRecaptcha)
Vue.component('NewnewsLoader', NewnewsLoader)
Vue.component('DefaultLoader', DefaultLoader)
Vue.component('LoadMoreBtn', LoadMoreBtn)

Vue.prototype.$http = axios
Vue.prototype.$api = process.env.VUE_APP_API

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
