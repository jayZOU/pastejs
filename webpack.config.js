var path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: "pastejs.js"
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js/, loaders: ['babel'] }
        ]
    }
}