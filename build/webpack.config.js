const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production'

const env = getClientEnvironment();

const getStyleLoaders = (prevLoader) => {
  return [
    // 生产环境将css单独抽取成文件，开发环境直接只用 style-loader
    'style-loader',
    // 开发环境缓存css文件
    !isEnvProduction && 'cache-loader',
    'css-loader',
    {
      // 处理css兼容问题
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    prevLoader
  ].filter(Boolean)
}




module.exports =  {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction ? false : 'cheap-module-source-map',
  entry: {
    index: path.join(paths.appSrc, 'index.tsx'),
  },
  output: {
    path: paths.appBuild,
    filename: isEnvProduction
    ? 'static/js/[name].[contenthash:8].js'
    : 'static/js/bundle.js',
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
    alias: {
      '@': paths.appSrc
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(css|less)$/, // 匹配 css和less 文件
        use: getStyleLoaders('less-loader'),
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename:'images/[name].[hash][ext]', // 文件输出目录和命名
        }
      },
      // ...
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'font/[name].[hash][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'media/[name].[hash][ext]', // 文件输出目录和命名
        },
      },

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.appPublic, 'index.html')
    }),
    new webpack.DefinePlugin(env.stringified),
    !isEnvProduction && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),

  cache: {
    type: 'filesystem', // 使用文件缓存
  },

  devServer: {
    host: 'localhost',
    port: 8088,
    open: true,
    hot: true,
    // 使用 index.html 代替所有404页面，解决使用H5的history API刷新页面导致404的问题
    historyApiFallback: true,
  },
}
