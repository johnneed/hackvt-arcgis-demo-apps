const webpack = require("webpack");
const webpackconfig = require("./webpack.config");
const copy = require('recursive-copy');
const fs = require('fs');
const path = require("path");

const distPath = "dist";
const srcPath = 'src';
const copyOptions = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    filter: [
        '**/*.html',
        '**/*.json',
        '**/*.png',
        '**/*.gif',
        '**/*.jpg',
        '**/*.svg',
        '**/*.ico',
        '**/*.woff',
        '**/*.ttf',
        '**/*.woff2',
        '**/*.eot',
        '**/*.manifest',
        '**/*.css',
        '**/*.js',
        '!**/app/*.js',
        '!.htpasswd'
    ],
    rename: function(filePath) {
        return filePath;
    },
    transform: function(src, dest, stats) {
        if (path.extname(src) !== '.txt') { return null; }
        return through(function(chunk, enc, done) {
            var output = chunk.toString().toUpperCase();
            done(null, output);
        });
    }
};

async function buildMe() {

    //Remove old code
    console.log('removing dist folder');

    function deleteFolderRecursive(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }(distPath);

    // Build our apps
    console.log("Building Apps");
    await webpack(webpackconfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            const statErrs = stats && stats.stats && stats.stats.map(stat => stat.compilation.errors.join("\n")).join("\n");
            console.log("the following errors occured while building the project");
            console.error(err || statErrs);
        }
    });


    // Copy our assets
    console.log("Copying assets");
    await copy(srcPath, distPath, copyOptions)
        .on(copy.events.COPY_FILE_START, function(copyOperation) {
            console.info('Copying file ' + copyOperation.src + '...');
        })
        .on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
            console.info('Copied to ' + copyOperation.dest);
        })
        .on(copy.events.ERROR, function(error, copyOperation) {
            console.error('Unable to copy ' + copyOperation.dest);
        })
        .then(function(results) {
            console.info(results.length + ' file(s) copied');
        })
        .catch(function(error) {
            return console.error('Copy failed: ' + error);
        });

    console.log("Project build completed");
};

module.exports = buildMe;