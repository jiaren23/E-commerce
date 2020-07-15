<template>
  <div>
    <div class="text-right mt-4">
      <button 
        class="btn btn-primary"
        @click="openModal(true)">建立新產品</button> <!-- 這裡用 true 參數帶入 判定是 新增 -->
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
        <tr 
          v-for="item in products" 
          :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.num}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
            <span 
              v-if="item.is_enable" 
              class="text-success">啟用</span>
            <span 
              v-else>未啟用</span>
          </td>
          <td>
            <button 
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)">編輯</button> <!-- 這裡用 false 參數帶入 判定是 編輯 -->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"> <!---->
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input 
                    type="file" 
                    id="customFile" 
                    class="form-control"
                    ref="files"
                    @change="uploadFile"> <!-- 上傳圖片 -->
                </div>
                <img 
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" 
                  alt=""
                  :src="tempProduct.imageUrl"> <!---->
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"> <!---->
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"><!---->
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input 
                      type="unit" 
                      class="form-control" 
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"><!---->
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"><!---->
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"><!---->
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea 
                    type="text" 
                    class="form-control" 
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.desciption"></textarea><!---->
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea 
                    type="text" 
                    class="form-control" 
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"></textarea><!---->
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox"
                      id="is_enabled"
                      :true-value="1"
                      :false-value="1"
                      v-model="tempProduct.is_enabled"><!---->
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="updateProduct">確認</button>     <!---->
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              >確認刪除</button>
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
      products: [], // 所有新增的產品資料會放進這裡
      tempProduct:{}, // for modal  這裡會存放要送到資料庫 產品資料(透過 post 方法) 
      isNew : false,
    };
  },
  methods: {
    getProducts() {
      // 取得遠端產品資料 然後將 ajax取得的資料存進 data 的products
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`; // API 伺服器路近 + 遠端的自己申請的 api 路徑
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;       // 將取得的產品資訊塞進 products 給予template 做渲染
      });
    },
    openModal(isNew,item){                          // 新增 參數 ( 是否是新的 , item(原有的 item) )
      if(isNew){                                    // 如果是新增的時候 tempProduct就是一個空物件
        this.tempProduct = {};
        this.isNew = true;
      }else{                                        // 否則就是編輯
        this.tempProduct = Object.assign({},item);  // 避免編輯的tempProduct 與 item 有參考的特性 ( 物件傳址特性 ) 
        this.isNew = false;                         // 所以使用 assign 可以先將 item 傳到一個空物件 在賦予 到 tempProduct
      }
      $('#productModal').modal('show')              // bs 提供給予控制 modal 的 methods
    },
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; // API 伺服器路近 + 遠端的自己申請的 api 路徑
      let httpMethod = 'post'; // 先預設 ajax 方法是 post
      const vm = this;
      // 這裡的 isNew 是經由上方 openModal 所決定的結果 來判斷了
      if(!vm.isNew){  // 如果 不是新的 我們就更改 API 內容 、 http 方法使用 put
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, {data:vm.tempProduct}).then(response => {
        if(response.data.success){
          $('#productModal').modal('hide')  // bs 提供給予控制 modal 的 methods                    
          vm.getProducts();
        }else{
          $('#productModal').modal('hide')  // bs 提供給予控制 modal 的 methods                    
          vm.getProducts();
          console.log("產品建立失敗")
        }
      });
    },
    uploadFile(){
      console.log(this)
      const uploadedFile = this.$refs.files.files[0];    // 要傳入的圖片 
      const vm = this;
      const formData = new FormData(); // 透過 JS 先準備一個 Form 單
      formData.append( 'file-to-upload', uploadedFile )  // 再用 append 把欄位新增進去 form 裡面 , 後方參數就是要傳入的檔案
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;// 定義路徑
      // 以下 post 內容 ( 路徑 , 剛組好的 formData  , 調整好格式的 FormData 物件 )
      this.$http.post( url , formData , {
        headers:{                                        // 將表單形式改成 FormData
          'Content-Type' : 'multipart/data'              // multipart/data 屬性使用於 我們的表單 具有 檔案上傳控制的 需求
        }
      }).then((response)=>{
          console.log(response.data)
           if(response.data.success){
             // 以下 set 內容 ( 此欄位要塞進哪裡 , 此欄位名稱  , 要寫入的路徑 )
              vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); // 使用 set 強制寫入 才有 雙向綁定功能 
              console.log(vm.tempProduct)
          }
        })
    }
  },
  created() {
    this.getProducts();   // 上方的 getProducts 需要在 created 裡呼叫執行
  }
};
</script>


