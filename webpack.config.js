var path = require('path')
var nodeExternals = require('webpack-node-externals')
var TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty',
        net: 'empty',
        __dirname: true,
    },
    target: 'node',
    externals: [nodeExternals()],
    mode: process.env.NODE_ENV || 'development',
    devtool: 'inline-source-map',
    entry: './bin/www',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.graphql', '.jsx', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ['@babel/preset-env'],
                    // targets: {
                    //     node: true,
                    // },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: process.env.NODE_ENV==='production' ? false : true,
                        source_map: true,
                    }
                }
            }),
        ],
    },
}