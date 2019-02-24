import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/Register.vue')
    },
    {
      path: '/secretlyCreateAdmin',
      name: 'registerAdmin',
      component: () => import('./pages/RegisterAdmin.vue')
    },
    {
      path: '/products',
      component: () => import('./pages/products/Products.vue'),
      children: [
        {
          path: 'detail/:id',
          name: 'detail-products',
          component: () => import('./pages/products/DetailProducts.vue')
        },
        {
          path: 'create',
          name: 'create-products',
          component: () => import('./pages/products/CreateProducts.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit-products',
          component: () => import('./pages/products/EditProducts.vue')
        },
        {
          path: 'remove/:id',
          name: 'remove-products',
          component: () => import('./pages/products/RemoveProducts.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/carts/Cart.vue')
    },
    // {
    //   path: '/transaction',
    //   name: 'transaction',
    //   component: () => import('./pages/transaction.vue')
    // },
    {
      path: '*',
      name: 'not found',
      component: () => import('./pages/NotFound.vue')
    }]
})
