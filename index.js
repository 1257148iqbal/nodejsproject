//dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment=require('./helpers/environments');
const data= require('./lib/data')

// app object - module scaffolding
const app = {};

//testing file  system
// data.create('test', 'newFile', {'name': 'Bangladehe', 'language': 'Bangla'}, (err)=>{
//   console.log('Errow was', err);
// });

// data.read('test', 'newFile', (err, result)=>{
//   console.log(err, result);
// });

// data.update('test', 'newFile', {'name': 'England', 'language':'English'}, (err)=>{
//   console.log(err);
// })

// data.delete('test', 'newFile', (err)=>{
//   console.log(err); 
// })

// create server 
app.createServer = () => {
  const server = http.createServer(app.handleReqRes); 
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

//handle request response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();
