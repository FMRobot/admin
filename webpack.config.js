var webpack = require('webpack')
    path = require('path');

module.exports = {
    debug: true,
    watch: false,
    devtool: 'inline-source-map',
    entry: [
        path.join(__dirname, 'source/js/app.js'),
        'file?name=index.html!jade-html!./source/index.jade'
    ],
    output: {
        path: path.join(__dirname, 'build/'),
        filename: "js/bundle.js"
    },
    resolve: {
        moduleDirectories: ['node_modules', 'source', 'source/js', 'source/css'],
        extensions: ['', '.js', '.css']
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //             drop_console: true,
    //             unsafe: true
    //         }
    //     })
    // ],
    module: {
        loaders: [{
            test: /\.jade$/,
            loader  : "jade-html-loader"
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};
