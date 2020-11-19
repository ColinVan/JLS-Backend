const path = require("path");
module.exports = {
    mode : 'development',
    entry: path.join(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'outputindex.js'
    },
    target: 'node'
}