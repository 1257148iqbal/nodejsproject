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

module.exports = utilities;
