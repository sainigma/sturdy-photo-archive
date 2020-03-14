const path = require('path')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs')

let dotenv = fs.readFileSync('./.env').toString()
dotenv = dotenv.split('\n')
dotenv = dotenv.map( item => {
  const vars = item.split('=')
  return {
    type:vars[0],
    param:vars[1]
  }
})
const dotenvGet = (type) => {
  return dotenv.find( item => item.type === type ).param
}

const config = {
  entry: ['@babel/polyfill','./src/index.js',],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',],
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'http://localhost:3001',
          replace: dotenvGet('URI'),
          flags: 'i'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      {from:'./public/icons',to:'icons'},
      {from:'./public/backgrounds',to:'backgrounds'},
    ])
    //new UglifyJSPlugin()
  ],
  stats: {
    children:false
  }
}

module.exports = config