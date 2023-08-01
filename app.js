const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const itemRoute = require('./routes/item.route');
const cartRoute = require('./routes/cart.route');
const optionRoute = require('./routes/option.route');
const orderRoute = require('./routes/order.route');

class SimpleServer {
  constructor(port) {
    this.port = port;
  }

  start() {
    app.use(express.json());
    app.use(cookieParser());
    app.use('/', [cartRoute, itemRoute, optionRoute, orderRoute]);
    app.listen(this.port, () => {
      console.log(this.port, '포트로 서버가 열렸어요!');
    });
  }
}

const server = new SimpleServer(port);
server.start();
