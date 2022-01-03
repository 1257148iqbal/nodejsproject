//dependencies
const http = require("http");
const url = require("url");

// app object - module scaffolding
const app = {};

// condiguration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};

//handle request response
app.handleReqRes = (req, res) => {
  // request hanling
  // get the url and parse it
  const parseUrl = url.parse(req.url, true);
  const path=parseUrl.pathname;
  const trimmedPath=path.replace();
  console.log(path);
  res.end("Hello World!!"); 
};

//start the server
app.createServer();
