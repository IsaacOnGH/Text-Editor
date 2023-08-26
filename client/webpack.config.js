const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor App',
        short_name: 'EditorApp',
        description: 'A text editor app with offline functionality',
        start_url: '/',
        display: 'standalone',
        icons: [{ src: 'src/images/logo.png', sizes: [96, 128, 192, 256, 384, 512] }],
      }),
      new InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker file
      }),
    ],

    module: {
      rules: [
        // Add CSS loader rule
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Add Babel loader rule
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
