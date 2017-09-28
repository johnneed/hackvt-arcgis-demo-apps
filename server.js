const http = require("http");
const port = 80;
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");
const distPath = "dist";


http.createServer((request, response) => {

    var uri = `${distPath}/${url.parse(request.url).pathname}`;
    var filename = path.join(process.cwd(), uri);

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

            response.setHeader("content-type", mime.lookup(filename));
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));
