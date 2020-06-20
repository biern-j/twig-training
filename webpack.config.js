// 'use strict';

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    context: path.resolve(__dirname, "src"),
    entry: ["./js/main.js", "./sass/main.scss"],
    output: {
        path: path.resolve(__dirname, "public/js/"),
        filename: "scripts.min.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(lit-element|lit-html))/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    ie: 11,
                                },
                            },
                        ],
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-syntax-dynamic-import",
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                absoluteRuntime: false,
                                corejs: false,
                                helpers: false,
                                regenerator: true,
                                useESModules: true,
                                version: "^7.4.4",
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/styles.min.css",
        }),
    ],
};

module.exports = config;
