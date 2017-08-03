const path = require('path');


const config = {
    // Common Configuration
    devtool: "source-map",
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [
                path.resolve(__dirname, 'app')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map'
};

const mainConfig = Object.assign({}, config, {
    entry: {
        main: './src/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "./js/[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
});
const simple_map_config = Object.assign({}, config, {
    entry: {
        simple_map: './src/examples/simple-map/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "./examples/simple-map//js/[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
});
const rendering_layers_config = Object.assign({}, config, {
    entry: {
        rendering_layers: './src/examples/rendering-layers/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "./examples/rendering-layers//js/[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
});

// Return Array of Configurations
module.exports = [
    mainConfig, rendering_layers_config, simple_map_config
];