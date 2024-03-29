/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author:  Iqbal Hossain
 * Date: 03/01/2022
 *
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const {sendTwiliosms} = require('./helpers/notification')

// app object - module scaffolding
const app = {};

//Removed Letter
sendTwiliosms('01836420972','Hello World', (err)=>{
    console.log('this is the error', err)
} )

// configuration
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

// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
