const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

    entry: {
        app: './src/main.js',

        vendor: [

            'lodash'
        ]
    }, //确定入口文件

    output: {

        path: path.resolve(__dirname, "dist"),

        filename: '[name].[hash].js'//输出文件夹目录

    },

    module: {

        rules: [

            {
                test: /\.less$/i,

                use: ["style-loader", "css-loader", "less-loader"]

            },
            {
                test: /\.css$/i,

                use: ["style-loader", "css-loader"]

            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[path][name].[ext]',
                            outputPath : './img'
                        }
                    }
                ],
            },
            {
                test: /\.(js|jsx)$/,

                use: {

                    loader: 'babel-loader',

                    options: {

                        presets: ['@babel/preset-env', '@babel/preset-react'],

                    }
                },
                exclude: /node_modules/

            },
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { test:/\.vue$/, loader: 'vue-loader' } 
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({

            template: './src/template.html'

        }),
        new webpack.HashedModuleIdsPlugin(),//利用哈希值使浏览器每次都读取新的文件，防止浏览器读缓存的文件
        // new webpack.ProvidePlugin(),//用来把某需要暴露到全局的变量以包的方式引入到对应模块，避免污染windows，实现更好的模块化
        new CleanWebpackPlugin(),//清除编译后的文件
        new VueLoaderPlugin()

    ],
    optimization: {

        splitChunks: {

            cacheGroups: {

                commons: {

                    name: "commons",

                    chunks: "initial",

                    minChunks: 2

                }
            }
        }
    }
}