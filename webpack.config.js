const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || "development",
  //起点となるファイル
  entry: {
    "dist/background": path.join(__dirname, "src/background/background.ts"),
    "dist/contents": path.join(__dirname, "src/contents/contents.ts"),
    "dist/action/js/index":path.join(__dirname, "src/action/action.ts"),
  },
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // publicディレクトリに配置する静的リソースやmanifest.json等を移送する
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "public", to: "dist" }] }),
    new HtmlWebpackPlugin({
      filename: "dist/action/index.html",
      template: "src/action/index.html",
      chunks:["dist/action/js/index"]
    }),
  ],
};
