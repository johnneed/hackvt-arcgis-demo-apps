const webpack = require("webpack");
const webpackconfig = require("./webpack.config");
webpack(webpackconfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log("the following errors occured while building the project");
    console.log(errs);
  }
        console.log("rroject build completed");
});