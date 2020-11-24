const webpack = require('webpack')

const common = require('./webpack.common.js');

const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = merge(common, {

    mode: "development",

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
    resolve: {

        extensions: [".js", ".jsx",'.ts', '.tsx']

    },
    devtool: 'inline-source-map',

    devServer: {

        contentBase: './dist', //服务开启的文件夹位置

        host: 'localhost',

        port: '8080',

        open: true, //是否自动打开页面

        hot: true,
        historyApiFallback: true

    },
    plugins: [

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({

            "process.env": { NODE_ENV: '"development"' }

        }),
        new VueLoaderPlugin()
    ],
})