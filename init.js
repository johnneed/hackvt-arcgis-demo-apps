/* global module:true */
/* eslint no-console: 0 , no-magic-numbers: 0,  strict: [2, "functional"] */

"use strict";


const server = require('./server');
const build = require("./build");
const port = "8081";
const opn = require('opn');
const watch = require('node-watch');
// const launcher = require('simple-autoreload-server');
async function start() {
    await build();
    await server(port);
    //     const server = launcher({
    //   port: port,
    //   path: './dist',
    //   listDirectory: false,
    //   watch:  "*/*.{png,js,html,json,jpg,gif,svg,ico,xml}",
    //   reload: "**/**.html",
    //   inject: [
    //     {
    //       "content": "before-body.html",
    //       "which":   "**/**.html",
    //       "where":   "</body>",
    //       "prepend": true
    //     }
    //   ]
    // });
    opn(`http://localhost:${port}`);

    watch('src', { recursive: true }, async function (evt, name) {
        console.log(`${name} changed : re-buliding`);
        await build();
    });
}

start();
