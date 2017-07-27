var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var path = require('path');

var plugins = [];

plugins.push(new ExtractTextPlugin('[name]-[hash:8].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        }));

module.exports = {

    watch: true,

    entry: path.join(__dirname, './app/Router.js'),

    output: {
        filename : '[name]-[hash:8].js',
        path : path.join('./build') ,
        sourceMapFilename : 'bundle.map.js',
    },
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
        }, {
            test: /\.less/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        }, {
            test: /\.(js|jsx)$/,
            exclude: /^node_modules$/,
            loader:"jsx!babel"
        }]
    },

    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [['import', {
            libraryName: 'antd',
            style: 'css'
        }]]
    },

    plugins,
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
};