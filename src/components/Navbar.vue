<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a 
            class="nav-link" 
            href="#"
            @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
    signout(){
          //  依據 API 文件指出 此api 址需傳入 api 不須傳入其他資料 即可登出
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => { // 然後 使用 post 傳入用戶資料  vm.user
        console.log(response.data);
        if (response.data.success){ // 這裡寫一個判別式 : 如果登出成功 就將路徑 轉到我們登入頁面
            vm.$router.push('/login')  // 確定登出就將頁面 導回 signin
        }
        });
    }
  }
}
</script>
