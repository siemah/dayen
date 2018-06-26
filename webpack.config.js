const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')


var browserConfidg = {
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        })
    ]
};

var serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname),
        filename: 'server.js',
        publicPath: '/'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false'
        })
    ]
}


module.exports = [ browserConfidg, serverConfig ];
