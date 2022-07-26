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
        contents: path.join(__dirname, 'src/contents/contents.ts'),
        'action/js/index': path.join(__dirname, 'src/action/action.ts'),
        'style.css': path.join(__dirname, 'src/action/scss/style.scss'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
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
        new CopyWebpackPlugin({ patterns: [{ from: 'public/manifest.json', to: '' }] }),
        new CopyWebpackPlugin({ patterns: [{ from: 'public/icons', to: 'icons' }] }),
        new HtmlWebpackPlugin({
            filename: 'action/index.html',
            template: 'public/index.html',
            chunks: ['action/js/index', 'style.css'],
        }),
        new MiniCssExtractPlugin({
            filename: 'action/css/style.css',
        }),
        new FixStyleOnlyEntriesPlugin(),
    ],
};
