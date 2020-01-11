// ~/.vuerc or ./vue.config.js
const path = require('path')
// const QiniuPlugin = require('qiniu-webpack-plugin')
// const svgoConfig = require('./svgo-config.json')
// const qnConfig = require('./qn.private').hsq || {}
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

// https://cli.vuejs.org/zh/config/
// https://github.com/HaoChuan9421/vue-cli3-optimization/blob/master/vue.config.js
// webpack4.x 配置优化 https://segmentfault.com/a/1190000015724077

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

// 环境变量
process.env.VUE_APP_VERSION = require('./package.json').version

// path.join(__dirname, 'src') 等效 path.resolve('./src')
function resolve(dir) {
  return path.join(__dirname, dir)
  // return path.resolve(dir)
}

// vue.config.js
module.exports = {
  // vue-router history模式下 子路由需要 publicPath : '/' 为绝对路径
  // hash 模式下 publicPath : './' 没有问题
  publicPath: '/',
  assetsDir: __DEV__ ? './' : './static',
  configureWebpack: config => {
    // '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm',  '.css', '.styl', '.less', '.md'
    config.resolve.extensions.push('.css', '.styl', '.less', '.md')
    // console.log(config.resolve.extensions)


    // const plugins = []
    if (!__DEV__) {
      // 为生产环境修改配置...
      // plugins.push(new InlineManifestWebpackPlugin())

      // 使用七牛报错
      // if (qnConfig.domain) {
      //   plugins.push(
      //     // 七牛
      //     new QiniuPlugin({
      //       prefix: qnConfig.prefix,
      //       ACCESS_KEY: qnConfig.ak,
      //       SECRET_KEY: qnConfig.sk,
      //       bucket: qnConfig.bucket,
      //       path: qnConfig.path,
      //     })
      //   )
      // }
      // config.plugins = [{
      //   ...plugins,
      //   ...config.plugins,
      // }]
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    // const svgRule = config.module.rule('svg')

    // svgRule.exclude.add('src/icons').end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        c => c.devtool('cheap-source-map')
      )

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // svgRule.use
    // svgRule.uses.clear()

    // 添加要替换的 loader
    // http://tech.lede.com/2018/03/28/fe/svg-icon/
    // https://medium.com/@deeepakampolu/til-using-svg-icon-sprites-with-webpack-2fd4db7ead76
    // set svg-sprite-loader

    // 优化SVG大小
    // Error in parsing SVG: Non-whitespace before first tag.
    // https://github.com/kisenka/svg-sprite-loader/issues/236
    // It means that svg-sprite-loader should applies after svgo-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        // 不要提取成一个外部独立文件使用，这样与按需加载理念冲突
        // extract: true,
        // spriteFilename: 'svg-sprite.[hash:6].svg',
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    /**
      第三方库提取（分四层）
      - config.optimization.delete('splitChunks') // 删除默认的
      - 将 vue 项目通用模块打包为 vue-lib，跨项目共享 cdn
        - 包含 vue, vue-router, vuex, axios, register-service-worker
      - 其他第三方库打包为 chunk-vendors
      - 项目公共代码打包为 chunk-common
      - 其他代码
      */

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.optimization.splitChunks({
      // chunks: 'all', // 这些都使用默认
      // minSize: 60000, // byte, 30kb
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      cacheGroups: {
        // 抽取第三方模块, 使用 dll 替代: npm run dll, 如果要可视化分析, 可打开此配置查看输出
        // libs: {
        //   name: `chunk-lib`,
        //   test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
        //   priority: 0,
        //   chunks: 'initial',
        // },
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    })
  },
  // dll 方案, 使用 vue-cli-plugin-dll
  // pluginOptions: {
  //   dll: {
  //     // 单入口
  //     // entry: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui', 'nprogress'],
  //     // 多入口
  //     entry: {
  //       vue: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios', 'vue-lazyload', 'vue-i18n', 'core-js'], // core-js
  //       ui: ['element-ui', 'nprogress'],
  //       // xlsx: ['xlsx', 'jszip', 'file-saver'],
  //       // echarts: ['echarts'],
  //       // mockjs: ['mockjs'],
  //       // demo: ['driver.js', 'vuedraggable', 'vue-splitpane', 'vue-count-to', 'tui-editor'],
  //     },
  //     output: path.join(__dirname, './public/dll'),
  //     // 只在生产环境加入 webpack.DllReferencePlugin 插件
  //     open: true, // __PROD__,
  //     inject: true,
  //   },
  // },
  css: {
    loaderOptions: {
      stylus: {
        // 全局引入变量
        // import: path.resolve(__dirname, './src/style/var'),
        // data: `@import "~@/style/var";`, // 这样不行
      },
    },
    // modules: false,
    sourceMap: !__PROD__,
  },
  productionSourceMap: !__PROD__,
  lintOnSave: !__PROD__,
  runtimeCompiler: false,
  crossorigin: 'anonymous',
  // transpileDependencies: [],

  // 子资源完整性（SRI）
  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
  integrity: false,
  // 代理设置
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
