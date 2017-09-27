/* global module:true */
/* eslint no-console: 0 , no-magic-numbers: 0,  strict */


const defaultPort = 8080;
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const distPath = "dist";
const port = process.argv[2] || defaultPort;
const refreshScript = "<script>const ws=new WebSocket(\"ws://localhost:8082\");ws.onopen=function(){ws.send(\"foo\")},ws.onmessage=function(o){\"reload\"===o.data&&location.reload()};</script>";
module.exports = async function start(port) {
    port = port || defaultPort;
    http.createServer((request, response) => {

        const uri = `${distPath}/${url.parse(request.url).pathname}`;
        let filename = path.join(process.cwd(), uri);

        fs.exists(filename, (exists) => {
            if (!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }

            if (fs.statSync(filename).isDirectory()) {
                filename += "/index.html";
            }

            fs.readFile(filename, "binary", (err, file) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(`${err}\n`);
                    response.end();
                    return;
                }
                // insert script for autorefreshing page
                if (filename.endsWith(".html")) {
                    file = file.replace("</body>", `${refreshScript}</body>`);
                }
                response.setHeader("content-type", mime.lookup(filename));
                response.writeHead(200);
                response.write(file, "binary");
                response.end();
            });
        });
    }).listen(parseInt(port, 10));

    console.log(`Static file server running at\n  => http://localhost:${port} /\nCTRL + C to shutdown`);
};
