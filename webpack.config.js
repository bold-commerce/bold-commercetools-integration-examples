const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        'bold-hosted-checkout-integration': './src/apps/bold-hosted-checkout-integration/index.js',
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new Dotenv(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};