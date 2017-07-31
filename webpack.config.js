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
const demo_app_1Config = Object.assign({}, config, {
  entry: {
    demo_app_1: './src/examples/demo-app-1/app/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: "./examples/demo-app-1//js/[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
});

// Return Array of Configurations
module.exports = [
  mainConfig, demo_app_1Config
];