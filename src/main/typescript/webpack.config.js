const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  optimization: {
    minimize: false // 关闭代码压缩，可选
  },

  entry: "./app/index.ts",

  devtool: "inline-source-map",

  devServer: {
    contentBase: './dist'
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    environment: {
      arrowFunction: false // 关闭webpack的箭头函数，可选
    }
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".html"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname,'public'),
          to: path.resolve(__dirname,'dist')
        }
      ],
    })
  ]

}
