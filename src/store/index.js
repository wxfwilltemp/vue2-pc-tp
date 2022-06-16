import Vue from 'vue';
import Vuex from 'vuex';
import createVuexAlong from 'vuex-along';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: 'home',
    keepAlive: [], // 缓存的路由
    source: null // 渠道来源
  },
  mutations: {
    setHome: (state, data) => {
      state.home = data;
    },
    setSource: (state, data) => {
      state.source = data;
    },
    setKeepAlive: (state, data) => {
      state.keepAlive = data;
      console.log(state.keepAlive);
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createVuexAlong({
      name: 'foodSafety',
      session: {
        list: ['source', 'keepAlive']
      },
      justSession: true
    })
  ]
});
