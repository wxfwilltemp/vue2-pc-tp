import axios from 'axios';
import config from './config';
// import Qs from 'qs';
import Vue from 'vue';

import router from '../router';

// 数据解密
// eslint-disable-next-line
// import {decryptRAS, decodeAesString} from '@/utils/CryptoJS.js';

import store from '@/store';
const vm = new Vue();
// 请求次数
let repeatCount = 0;

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    });

    // request 拦截器
    instance.interceptors.request.use(
      (config) => {
        Vue.loading();
        // source_channel 渠道来源
        config.headers.source_channel = store.state.source ? store.state.source : null;
        if (!config.headers.source_channel) {
          // 身份不存在跳转到身份选择页面
          router.push('/enter');
        }
        // source_internet 是否需要 token 标识
        config.headers.source_internet = 'internet';
        if (config.method === 'post') {
          // config.data = Qs.stringify(config.data);
        }
        return config;
      },

      (error) => {
        // 请求错误时
        console.log(error);
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest);// 再重复请求一次
        }
        vm.$message.error(error.message);
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        // 返回数据先解密
        // data.k判断后端返回的数据是否加密;
        // if (data.k) {
        //   data = JSON.parse(decodeAesString(data.d, decryptRAS(data.k)));
        // }
        console.log(data);
        const headers = response.headers;
        // 文件下载响应的文件流
        if (headers['content-type'].indexOf('application/octet-stream') > -1) {
          Vue.loading.end();
          return response.data;
        }
        // 根据返回的code值来做不同的处理
        if (data.code === 200) {
          Vue.loading.end();
          console.log(data);
          return data;
        } else if (data.code === 403) {
          // 登录过期
          Vue.loading.end();
        } else {
          // 统一提示
          Vue.loading.end();
          vm.$message.error(data.msg);
        }
      },
      (err) => {
        const error = JSON.parse(JSON.stringify(err));
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest); // 再重复请求一次
          // 请求处理
          repeatCount++;
          if (repeatCount > config.retry) {
            console.log(repeatCount);
            repeatCount = 0;
            Vue.loading.end();
            return;
          }
          // 重新在请求一次
          return instance(options)
            .then((res) => {
              resolve(res);
              return false;
            })
            .catch((error) => {
              reject(error);
            });
        }
        Vue.loading.end();
        err.response && vm.$message.error(err.response.data.msg);
        return Promise.reject(err);
      }
    );

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
