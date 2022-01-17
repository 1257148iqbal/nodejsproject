/*
   Title: Not Found Handler
   Description: Not Found Handler
   Author: Iqbal Hossain
   Date: 08-January-2022
   Modified: 08-January-2022
*/
// mudule scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(404, {
    message: "Your requested URL was not found",
  });
};

module.exports = handler;
