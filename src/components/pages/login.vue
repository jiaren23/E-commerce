<template>
  <div>
    <form class="form-signin" @submit.prevent="sigin">  <!-- 做登入事件 -->   
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
        v-model = "user.username" /> <!-- 綁上 username -->
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
        v-model="user.password" /> <!-- 綁上 passward -->
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      user :{
          username : '',
          password : '',
      }
    };
  },
  methods : {
      sigin(){

        //  依據 API 文件指出 以下只要傳入 /signin 即可  :  伺服器path +  signin
        const api = `${process.env.APIPATH}/admin/signin`;
        const vm = this;
        this.$http.post(api , vm.user).then(response => { // 然後 使用 post 傳入用戶資料  vm.user
        console.log(response.data);
        if (response.data.success){ // 這裡寫一個判別式 : 如果等入成功 就將路徑 轉到我們的首頁
            vm.$router.push('/') 
        }
        });
      }
  }
};
</script>

<!-- Add "scoped" 讓此 css 只在此檔案下有作用  -->
<style scoped>   
    html,
    body {
    height: 100%;
    }

    body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }

    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
    .form-signin .checkbox {
    font-weight: 400;
    }
    .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }
</style>
