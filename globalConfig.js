const globalConfig = {};

console.log('当前运行模式' + process.env.VUE_APP_ENVIRONMENT);

if (process.env.VUE_APP_ENVIRONMENT === 'development') {
  globalConfig.isProd = false; // 开发环境配置
  // globalConfig.localUrl = 'http://172.20.6.237'; // 前端地址
  // globalConfig.baseUrl = 'http://172.16.119.238/fdsc'; // 后台接口  测试 http://172.16.119.238/fdsc
  globalConfig.localUrl = ''; // 前端地址
  globalConfig.baseUrl = '/fdsc';
} else if (process.env.VUE_APP_ENVIRONMENT === 'test') {
  globalConfig.isProd = true; // 测试环境走线上配置
  globalConfig.localUrl = 'https://test8.hua-cloud.net:5483'; // 前端地址
  globalConfig.baseUrl = 'https://test8.hua-cloud.net:5483/fdsc'; // 后台 172.16.119.238/fdsc  https://test8.hua-cloud.net:5483/fdsc
} else if (process.env.VUE_APP_ENVIRONMENT === 'production') {
  globalConfig.isProd = true; // 部署环境
  // globalConfig.localUrl = 'http://172.16.119.238/'; // 前端地址
  // globalConfig.baseUrl = 'http://172.16.119.238:8889/fdsc'; // 后台
}

module.exports = globalConfig;
