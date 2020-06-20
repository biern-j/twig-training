// 'use strict';

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    context: path.resolve(__dirname, "src"),
    entry: ["./js/main.js", "./sass/main.scss"],
    output: {
        path: path.resolve(__dirname, "public/"),
        filename: "./js/scripts.min.js",
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
            {
                test: /\.twig$/,
                use: [
                    "raw-loader",
                    {
                        loader: "twig-html-loader",
                        options: {
                            data: (context) => {
                                const data = path.join(
                                    __dirname,
                                    "src/templates/globals.json"
                                );
                                context.addDependency(data); // Force webpack to watch file
                                return (
                                    context.fs.readJsonSync(data, {
                                        throws: false,
                                    }) || {}
                                );
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/styles.min.css",
        }),
        new HtmlWebpackPlugin({
            template: "./templates/index.twig",
        }),
    ],
};

module.exports = config;
