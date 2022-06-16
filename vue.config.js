// const { defineConfig } = require("@vue/cli-service");
const path = require('path');

const globalConfig = require('./globalConfig.js');
const projectName = 'dist' || process.env.npm_package_name;
const isProduction = globalConfig.isProd;

function resolve(dir) {
  return path.join(__dirname, dir);
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  transpileDependencies: false, // 默认情况下false babel-loader 会忽略所有 node_modules 中的文件, 你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  productionSourceMap: !isProduction, // 仅仅在dev环境使用SourceMap
  outputDir: projectName, // 打包输出目录 默认dist
  publicPath: '/', // + projectName + '/',
  chainWebpack: (config) => {
    // 配置入口( 兼容 es6 es7 )
    config.entry.app = ['./src/main.js'];
    // 起别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'));
    // if (isProduction) {
    //   //开启图片压缩处理
    //   config.module
    //     .rule('images')
    //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({bypassOnDebug: true});
    //   // 5.移除 prefetch 插件 减少http数量
    //   config.plugins.delete('prefetch');
    //   // 6.移除 preload 插件 减少http数量
    //   config.plugins.delete('preload');
    // }
  }
};
