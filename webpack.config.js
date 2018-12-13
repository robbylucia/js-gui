const path = require('path');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    output: {
        filename: 'jsgui.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'jsgui'
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    }
};