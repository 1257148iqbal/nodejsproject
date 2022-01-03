//dependencies
const http = require("http");

// app object - module scaffolding
const app = {};

// condiguration
app.config = {
    port:3000
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, ()=>{
      console.log(`listening to port ${app.config.port}`)
  });
};

//handle request response
app.handleReqRes=(req, res)=>{
    res.end("Hello Word")
}

//start the server 
app.createServer();