const path = require('path');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'jsgui.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
};