<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div 
      class="row mt-4">
      <div 
        class="col-md-4 mb-4"
        v-for="item in products" 
        :key="item.id">
        <div class="card border-0 shadow-sm">
          <div 
            style="height: 500px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
              <del class="h6" v-if="item.price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button 
              type="button" 
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)">            
              <i 
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id" ></i>  <!-- 如果 目前的 loading Id 和 item id 相符 才顯示此讀取效果  ( 解決原本全頁面都有 loading icon 的問題 ) -->
                查看更多
            </button>
            <button 
              type="button" 
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)">
              <i 
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"></i> <!-- 如果 目前的 loading Id 和 item id 相符 才顯示此讀取效果  ( 解決原本全頁面都有 loading icon 的問題 ) -->
                加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button 
              type="button" 
              class="btn btn-primary"
              @click="addToCart(product.id , product.num)">
              加到購物車
            </button>
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
        products: [],
        product : {},      // 這裡是用 來存 modal 的資料
        status:{           // 新增一狀態 判斷目前畫面是哪個  查看更多按鈕 正在讀取中 ( 解決原本全頁面都有 loading icon 的問題 )
          loadingItem : '' // 將會存放 點擊的產品 ID 
        },
        isLoading: false,
      }
  },
  methods : {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {                              // 取得單一筆 資料 , 並且依照 API 需求要帶上 參數 id 
      const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;   // 多加 參數 id 
        vm.status.loadingItem = id;               // 將原本的 vm.isLoading = true;   ** 改為由 id 決定是哪個 查看更多被觸發
        this.$http.get(url).then((response) => {
          vm.product = response.data.product;
          vm.product.num = 1 ;
          $('#productModal').modal('show');       // 啟用 modal
          console.log(response);
          vm.status.loadingItem = '';             // 將原本的 vm.isLoading = false;   ** 改成 如果讀取完要改成 空的
      });
    } ,
    addToCart(id , qty=1){ // 這裡將傳入裡參數 產品id、 數量(數量要給預設值 至少要 1 件)
      const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.status.loadingItem = id;               // 將原本的 vm.isLoading = true;   ** 改為由 id 決定是哪個 查看更多被觸發
        const cart = {                            // 定義資料結構 , 將在下方的 post 做傳送到後端 (這裡便是要傳入的兩個參數)  
              product_id : id ,
              qty : qty,
        }  
        this.$http.post(url , {data : cart}).then((response) => {
         console.log(response);
         vm.status.loadingItem = '';             // 將原本的 vm.isLoading = false;   ** 改成 如果讀取完要改成 空的
         vm.getCart();
         $('#productModal').modal('hide');
      });
    },
    getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // vm.products = response.data.products;
        console.log("取得購物車",response);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
}
</script>  