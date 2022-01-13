import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  //
  // Common
  //
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '*',
    name: 'page-404',
    meta: { layout: 'empty' },
    component: () => import('../views/404.vue')
  },

  //
  // News
  //
  {
    path: '/global-news',
    name: 'global-news',
    meta: { layout: 'main' },
    component: () => import('../views/news/GlobalNews.vue')
  },
  {
    path: '/local-news',
    name: 'local-news',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/news/LocalNews.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    meta: { layout: 'main' },
    component: () => import('../views/news/Article.vue')
  },
  // {
  //   path: '/add-news',
  //   name: 'add-news',
  //   meta: { layout: 'main', auth: true },
  //   component: () => import('../views/news/AddNews.vue')
  // },
  // {
  //   path: '/article/:id/edit',
  //   name: 'edit-news',
  //   meta: { layout: 'main', auth: true },
  //   component: () => import('../views/news/EditNews.vue')
  // },

  //
  // Categories
  // 
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('../views/categories/Categories.vue')
  },
  {
    path: '/global-news/category/:slug',
    name: 'global-news-by-category',
    meta: { layout: 'main' },
    component: () => import('../views/categories/GlobalCategoryNews.vue')
  },
  {
    path: '/local-news/category/:slug',
    name: 'local-news-by-category',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/categories/LocalCategoryNews.vue')
  },

  //
  // User
  //
  {
    path: '/settings',
    name: 'settings',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/user/Settings.vue')
  },

  //
  // Auth
  //
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/lost-password',
    name: 'lost-password',
    meta: { layout: 'empty' },
    component: () => import('../views/auth/LostPassword.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    meta: { layout: 'empty' },
    component: () => import('../views/auth/ResetPassword.vue')
  },

  //
  // Location
  //
  {
    path: '/select-location',
    name: 'select-location',
    meta: { layout: 'empty' },
    component: () => import('../views/auth/SelectLocation.vue')
  },

  //
  // Blockchain + NWC
  //
  {
    path: '/nwc',
    name: 'nwc',
    meta: { layout: 'main' },
    component: () => import('../views/blockchain/NWC.vue')
  },
  // {
  //   path: '/transactions',
  //   name: 'transactions',
  //   meta: { layout: 'main', auth: true },
  //   component: () => import('../views/blockchain/Transactions.vue')
  // },
  // {
  //   path: '/key-pair',
  //   name: 'key-pair',
  //   meta: { layout: 'main', auth: true },
  //   component: () => import('../views/blockchain/KeyPair.vue')
  // },
  // {
  //   path: '/add-node',
  //   name: 'add-node',
  //   meta: { layout: 'main', auth: true },
  //   component: () => import('../views/blockchain/AddNode.vue')
  // }

  //
  // Documents
  //
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    meta: { layout: 'main' },
    component: () => import('../views/documents/PrivacyPolicy.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView()
  }
})

// For routes that need auth middleware
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const userLoggedIn = store.getters.userLoggedIn

  if (requireAuth && !userLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
