// mudule scaffolding

//dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { createRendomString } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const { has } = require("lodash");
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._token = {};

handler._token.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    data.read("token", id, (err, tokenData) => {
      const token = { ...parseJSON(tokenData) };
      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, {
          error: "There have a no token info",
        });
      }
    });
  } else {
    callback(404, {
      error: "There have a no user info",
    });
  }
};
handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err, userData) => {
      let hashedpassword = hash(password);
      if (hashedpassword === parseJSON(userData).password) {
        let tokenId = createRendomString(20);
        let expires = Date.now() + 60 * 60 * 1000;
        let tokenObject = {
          phone,
          id: tokenId,
          expires,
        };

        //store to db
        data.create("token", tokenId, tokenObject, (err) => {
          if (!err) {
            callback(200, tokenObject);
          } else {
            callback(500, {
              error: "There was problem server site!",
            });
          }
        });
      } else {
        callback(400, {
          error: "Password is not valid!",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

handler._token.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;

  const extend =
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true
      ? true
      : false;

      if(id && extend){
        data.read('token', id, (err, tokenData)=>{
            let tokenObject= parseJSON(tokenData);
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() * 60 * 60 * 1000;
                data.update('token', id, tokenObject,  (err)=>{
                    if(!err){
                        callback(200)
                    } else{
                        callback(500, {
                            error: "There was a server side!!"
                        })
                    }
                })
            } else{
                callback(400, {
                    error: "There was a problem in token"
                })
            }
        })
      } else{
          callback(404, {
              error: "There was a problem in your request"
          })
      }
};

handler._token.delete = (requestProperties, callback) => {
    const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;
  
      if(id){
        data.read('token', id, (err, tokenData)=>{
          if(!err && tokenData){
            data.delete('token', id, (err)=>{
                if(!err){ 
                  callback(200, {
                    message: "Token deleted successfully!!"
                  })
                } else{
                  callback(400, {
                    error: "There was a mistake!"
                  }) 
                }
              })
          } else{
            callback(500, {
              error: "There was a server side error!"
            })
          }
        })
      } else{
        callback(400, {
          error: "There was a problem in your request!"
        })
      }
};

handler._token.verify= (id, phone, callback)=>{
    data.read('token', id, (err, tokenData)=>{
        if(!err && tokenData){
            if(parseJSON(tokenData).phone===phone && parseJSON(tokenData).expires > Date.now()){
                callback(true);
            } else{
                callback(false)
            }
        } else{
            callback(false);
        }
    })
}

module.exports = handler;
