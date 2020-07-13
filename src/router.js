import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/Index';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', 
      redirect: 'login'             // 避免用亂打進入不存在的頁面 , 就導回 登入頁
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: true } // 導航守衛的 路由訊息
    },
    {
      path: '/login',              // 虛擬 path  一般建議打小寫
      name: 'Login', 
      component: Login,            // 載入元件
      // component : () => import ('@/components/pages/login'), 
    },

    // 當進入 admin 時會進入另一個 router ( 巢狀 router )
    {
      path: '/admin',
      name: 'Admin',
      component : Dashboard,
      meta: { requiresAuth: true },
      children : [
        {
          path: 'products',              
          name: 'Products', 
          component: Products,   
          meta: { requiresAuth: true } , // 這裡一樣加上 確保進入此頁面前是需要被驗證的
        },
      ]
    }
  ]
})



