const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'jsgui.js',
        path: path.resolve(__dirname, 'dist')
    }
};