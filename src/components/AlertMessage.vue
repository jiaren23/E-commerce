<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [
        // message :'訊息內容', 
        // status :'danger', // bs 樣式
        // timestamp :123,
      ],
    };
  },
  // 每當送訊息到 上方 data 的 mes 裡面時 就會觸發函式 將 自己移除的函式
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    // 手動移除 (按X)
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 移除自己的函式 (5秒後)
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: BS 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => { // 這裡是直接呼叫 Vue 實體下的 bus , 並使用 on 註冊一個 mes : push 的方法
      vm.updateMessage(message, status);  // 最後在觸發 更新 mes
    });
    // vm.$bus.$emit('message:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>