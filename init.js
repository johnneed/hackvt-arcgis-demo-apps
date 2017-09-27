/* global module:true */
/* eslint no-console: 0 , no-magic-numbers: 0,  strict: 2 */


const server = require("./dev_server");
const build = require("./build");
const port = "8080";
const opn = require("opn");
const watch = require("node-watch");
const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8082});

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("received: %s", message);
    });
    ws.send("something");
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
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

    watch("src", {recursive: true}, async (evt, name) => {
        console.log(`${name} changed : re-buliding`);
        await build();
        wss.broadcast("reload");
    });
}
start();
