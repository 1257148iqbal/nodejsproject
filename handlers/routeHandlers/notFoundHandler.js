/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author:  Iqbal Hossain
 * Date: 03/01/2022
 *
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested URL was not found!',
    });
};

module.exports = handler;
