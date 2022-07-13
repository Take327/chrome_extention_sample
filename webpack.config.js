const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    // srcディレクトリ配下のbackground.tsをdist/js配下へ移送する
    mode: process.env.NODE_ENV || "development",
    entry: {
        'dist/background': path.join(__dirname, "src/background/background.ts"),
        'dist/contents':path.join(__dirname, "src/contents/contents.ts"),
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
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    // publicディレクトリに配置する静的リソースやmanifest.json等を移送する
    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: "public", to: "../" }] })
    ],
};