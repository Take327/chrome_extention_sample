const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  //起点となるファイル
  entry: {
    "dist/background": path.join(__dirname, "src/background/background.ts"),
    "dist/contents": path.join(__dirname, "src/contents/contents.ts"),
    "dist/action/js/index": path.join(__dirname, "src/action/action.ts"),
    "dist/action/css/style":path.join(__dirname, "src/action/scss/style.scss"),
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // publicディレクトリに配置する静的リソースやmanifest.json等を移送する
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "public/manifest.json", to: "dist" }] }),
    new HtmlWebpackPlugin({
      filename: "dist/action/index.html",
      template: "public/index.html",
      chunks: ["dist/action/js/index"]
    }),
    new MiniCssExtractPlugin({
			filename: 'dist/action/css/style.css'
		}),
    new FixStyleOnlyEntriesPlugin(),
  ],
};
