<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Index from './components/index'
  import Login from './components/pages/Login'

  export default {
    name: "App",
    // created() {
    //   console.log(process.env.APIPATH, process.env.CUSTOMPATH); // 這裡是抓取 dev.env.js 裡的環境變數
    
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; // API 伺服器路近 + 遠端的自己申請的 api 路徑
    //   this.$http.get(api).then(response => {
    //     console.log(response.data);
    //   });
    // }
  };
</script> 

<style lang="scss">
  @import "./assets/all"; // 引入 all.scss 這裡 .scss 可省略不寫
</style>

