import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入mint-ui相关的内容
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

//引入miu的样式
import './assets/mui/css/mui.css'
import './assets/mui/css/icons-extra.css'

//引入缩略图的vue-preview插件
import VuePreview from "vue-preview"
//使用
Vue.use(VuePreview);

import store from "./store"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
