const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {

mode : "production",

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

optimization : {
    minimize : true,
    usedExports : true,
    concatenateModules : true,
},

plugins: [

new webpack.DefinePlugin({
"process.env.NODE_ENV" : "production"
}),
        new VueLoaderPlugin()

],
devtool : 'source-map'

});