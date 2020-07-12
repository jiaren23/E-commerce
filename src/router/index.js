import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { requiresAuth: true } // 導航守衛的 路由訊息
    },
    {
      path: '/login',  // 虛擬 path  一般建議打小寫
      name: 'Login',
      component : () => import ('@/components/pages/login'),  // 載入元件
    }
  ]
})



