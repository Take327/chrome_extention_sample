const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    //起点となるファイル
    entry: {
        background: path.join(__dirname, 'src/background/background.ts'),
        'contents/js/index': path.join(__dirname, 'src/contents/contents.ts'),
        'contents/css/style': path.join(__dirname, 'src/contents/scss/style.scss'),
        'action/js/index': path.join(__dirname, 'src/action/action.ts'),
        'action/css/style': path.join(__dirname, 'src/action/scss/style.scss'),
    },
    //出力の設定
    output: {
        path: path.join(__dirname, 'dist'), //出力左記のフォルダ名を設定する
        filename: '[name].js', //jsファイルのファイル名を指定する [name]とするとentryのキーでjsファイルを作成する
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    // publicディレクトリに配置する静的リソースやmanifest.json等を移送する
    plugins: [
        //CopyWebpackPlugin ビルド時にコピーするプラグイン
        new CopyWebpackPlugin({ patterns: [{ from: 'public/manifest.json', to: '' }] }),
        new CopyWebpackPlugin({ patterns: [{ from: 'public/icons', to: 'icons' }] }),
        //HTMLに<script> や <link>を追加し出力するプラグイン
        new HtmlWebpackPlugin({
            filename: 'action/index.html', //ビルド後のファイル名
            template: 'public/index.html', //対象とするファイル名
            chunks: ['action/js/index', 'action/css/style'], //読み込みたいentryのキー
        }),
        //scssをcssにビルドするプラグイン
        new MiniCssExtractPlugin({
            filename: '[name].css', //[name].cssとすることでentryのキーを使用してcssを作成する
        }),
        new FixStyleOnlyEntriesPlugin(),
    ],
};
