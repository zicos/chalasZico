'use strict';
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var path = require("path");
var APP = __dirname + '/app';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// multiple extract instances
let extractCSS = new ExtractTextPlugin('vendor.css');
let extractSASS = new ExtractTextPlugin('app.css');

module.exports = {
    context: APP,
    entry: './core/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jade$/,
                loader: 'raw!jade-html'
            },
            {
                test: /\.scss$/,
                loader: extractSASS.extract(['css','sass'])
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract("style-loader", "css-loader")
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate!babel!eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                loader: 'file'
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
            // ,
            // {
            //     test: /.*\.(gif|png|jpe?g|svg)$/i,
            //     loaders: [
            //       'file?hash=sha512&digest=hex&name=[hash].[ext]',
            //       'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            //     ]
            // }
        ]
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    plugins: [
        extractCSS,
        extractSASS,
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};
