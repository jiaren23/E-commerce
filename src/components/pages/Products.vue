<template>
  <div>
      <div class="text-right mt-4">
        <button class="btn btn-primary">建立新產品</button>
      </div>
      <table class="table mt-4">
        <thead>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120"> 數量</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="80">狀態</th>
          <th width="80">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key='item.id'>
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <!-- <td>{{item.image}}</td> -->
            <td>{{item.num}}</td>
            <td class="text-right">{{item.origin_price}}</td>
            <td class="text-right">{{item.price}}</td>
            <!-- <td>{{item.}}</td> -->
            <td>
              <span v-if="item.is_enable" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      products: [] // 所有新增的產品資料會放進這裡
    }
  },
  methods:{
    getProducts(){
      // 取得遠端產品資料 然後將 ajax取得的資料存進 data 的products 
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`; // API 伺服器路近 + 遠端的自己申請的 api 路徑
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;  // 將取得的產品資訊塞進 products 給予template 做渲染
      });
    }
  },
  created(){ // 上方的 getProducts 需要在 created 裡呼叫執行
    this.getProducts();
  }
};
</script>


