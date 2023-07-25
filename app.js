const express = require("express");
const app = express();
const port = 3000;

class SimpleServer {
  constructor(port) {
    this.port = port;
  }

  start() {
    app.use("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(this.port, () => {
      console.log(port, "포트로 서버가 열렸어요!");
    });
  }
}

const server = new SimpleServer(port);
server.start();
