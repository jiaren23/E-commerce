import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';  // Import component
import 'vue-loading-overlay/dist/vue-loading.css';  // Import stylesheet


import App from './App';
import router from './router';
import "./bus";
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.component('Loading' , Loading); // 使用全域方式啟用 (這樣在每個不同地方就就不需要依依載入)
Vue.filter('currency',currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {          // 加入導航守衛 beforeEach 判別我們在那些頁面是需要登入 那些頁面是不需要登入的
  console.log('to',to,'from',from,'next',next);
  if(to.meta.requiresAuth){                      // 如果要到的頁面 meta 具有 requiresAuth 就要再進階驗證 , 反之 則放行
      console.log('這裡需要驗證')
      const api = `${process.env.APIPATH}/api/user/check`;  // 需要驗證就走此 驗證 api
      // 原先是 this.$http.post 是在 Vue 元件內 的環境下 , 但在此是在 router 環境下 , 因此直接使用 axios.post  
      axios.post(api).then(response => { // 然後 使用 post 帶資料到 server 判斷是否是在登入狀態下
      console.log(response.data);
      if (response.data.success){               // 這裡再寫一個判別式 : 如果等入成功 就放行
        next();
      }else{                                    // 但如果不是登入狀態時就 導到登入頁面
        next({
          path: '/login'
        })
      }
      });
  }else{
    next();
  }
})













