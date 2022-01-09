import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
