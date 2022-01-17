// dependencies

const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHanders/notFoundHandler');
const {parseJSON}=require('../helpers/utilities')

//modue scaffolding
const handler ={};

handler.handleReqRes = (req, res) => {
    // request hanling
    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath, 
        method,
        queryStringObject,
        headersObject
    }
  
    const decoder = new StringDecoder("utf-8");
    let realData = "";

    const chosenHanlder = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  
    req.on("data", (buffer) => {
      realData += decoder.write(buffer);
    });
  
    req.on("end", () => {
      realData += decoder.end();
      requestProperties.body= parseJSON(realData);
      chosenHanlder(requestProperties, (statusCode, payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload: {};

        const payloadString = JSON.stringify(payload);

        //return the final Response

        res.writeHead(statusCode);
        res.end(payloadString);
    });
  
      res.end("Hello World!!");
    });
  };

module.exports = handler;