import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/resource/global.css'
import "@/utils/initialize"
import './resource/icon_store/iconfont.css'
import ElementUI from 'element-ui';
import request from './utils/request';
import 'element-ui/lib/theme-chalk/index.css';
import './resource/font3/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request=request;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
