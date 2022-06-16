import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import api from './http';

// css
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';

// loading
import Vueloading from '@components/loading/loading.js';

Vue.use(Element);
Vue.use(api);

Vue.prototype.$ELEMENT = {size: 'medium', zIndex: 3000};
Vue.use(Vueloading, {
  // container: '' // 设置loading的挂载点
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
