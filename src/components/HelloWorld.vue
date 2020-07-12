<template>
  <div class="hello">
   <a href="#" @click.prevent="sigout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    sigout(){
          //  依據 API 文件指出 此api 址需傳入 api 不須傳入其他資料 即可登出
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => { // 然後 使用 post 傳入用戶資料  vm.user
        console.log(response.data);
        if (response.data.success){ // 這裡寫一個判別式 : 如果登出成功 就將路徑 轉到我們登入頁面
            vm.$router.push('/login') 
        }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
