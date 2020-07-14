<template>
  <div>
    <div class="text-right mt-4" @click="openModal">
      <button class="btn btn-primary">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">數量</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="80">狀態</th>
        <th width="80">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.num}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
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
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [] // 所有新增的產品資料會放進這裡
    };
  },
  methods: {
    getProducts() {
      // 取得遠端產品資料 然後將 ajax取得的資料存進 data 的products
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`; // API 伺服器路近 + 遠端的自己申請的 api 路徑
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products; // 將取得的產品資訊塞進 products 給予template 做渲染
      });
    },
    openModal(){
      $('#productModal').modal('show')  // bs 提供給予控制 modal 的 methods
    }
  },
  created() {
    this.getProducts();   // 上方的 getProducts 需要在 created 裡呼叫執行
  }
};
</script>


