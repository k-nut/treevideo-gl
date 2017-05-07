const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const path = require("path");

module.exports = {
    entry: {
        main: "./main.js",
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    devtool: process.env.DEV ? "cheap-module-eval-source-map" : "hidden-source-map",
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "buble-loader",
        },
        {
            test: /\.json$/,
            loader: "file-loader"
        }
        ],
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'index.ejs', // Load a custom template (ejs by default see the FAQ for details)
        })
    ]
};
