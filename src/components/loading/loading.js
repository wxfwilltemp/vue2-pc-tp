/** @format */

import Loading from './loading.vue';

export default {
  install(Vue, pluginOptions = {}) {
    const VueLoading = Vue.extend(Loading);
    let loading = null;

    function $loading() {
      return new Promise((resolve) => {
        // 首次调用
        if (!loading) {
          loading = new VueLoading();
          loading.$mount();
          document.querySelector(pluginOptions.container || 'body').appendChild(loading.$el);
        }
        // 显示loading
        loading.show();
        resolve();
      });
    }

    // 关闭loading
    $loading.end = () => {
      return new Promise((resolve) => {
        if (!loading || !loading.isShow) {
          resolve();
          return;
        }
        loading.hide();
      });
    };
    Vue.loading = Vue.prototype.$loading = $loading;
  }
};
