const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack')

module.exports = merge(common, {

mode : "production",

optimization : {
    minimize : true,
    usedExports : true,
    concatenateModules : true,
},

plugins: [

new webpack.DefinePlugin({
"process.env.NODE_ENV" : "production"
})
],
devtool : 'source-map'

});