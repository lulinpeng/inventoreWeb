import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from '@/store';
import api from '@/api'
// import Bubbles from 'vue-canvas-effect'
// Vue.component(Bubbles);
// import Login from './views/Login'

// 将api 挂载到vue 原型上
Vue.prototype.$api = api;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
