/*
     Title: Utilities
     Description:Handle all Utilities related things
     Author: Iqbal Hossain
     Date: 08-January-2022
     Modified: 08-January-2022
*/

//dependencies

//module scaffolding
const crypto = require("crypto");
const utilities = {};
const environments = require("./environments");

//Parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }
  return output;
};

//hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// create rendom string
utilities.createRendomString = (strlength) => {
  let length= strlength;
  length=typeof(strlength)==='number' && strlength > 0 ? strlength: false;

  if(length){
    let possiblecharecters= 'abcdefghijklmnopqrstuvwxyz1234567890';
    let output= '';
    for(let i=1; i<= length; i+=1){
      const rendomcharectoer= possiblecharecters.charAt(Math.floor(Math.random() * possiblecharecters.length));
      output += rendomcharectoer;
    }
    return output;
  }
    return false;
  
};

module.exports = utilities;
