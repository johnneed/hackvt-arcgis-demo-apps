/* global module:true */
/* eslint no-console: 0 , no-magic-numbers: 0,  strict: [2, "functional"] */

"use strict";


const server = require('./server');
const build = require("./build");
const port = "8081";
const opn = require('opn');
const watch = require('node-watch');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:8082 });

let sendReloadMessage;
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// const launcher = require('simple-autoreload-server');
async function start() {
    await build();
    await server(port);
    opn(`http://localhost:${port}`);

    watch('src', { recursive: true }, async function (evt, name) {
        console.log(`${name} changed : re-buliding`);
        await build();
     wss.broadcast('reload');
    });
}
start();
