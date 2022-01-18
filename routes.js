
//dependencies
const {sampleHandler} = require('./handlers/routeHanders/sampleHandlers');
const {userHandler} = require('./handlers/routeHanders/userHandler');
const {tokenHandler} = require('./handlers/routeHanders/tokenHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler
}
 
module.exports = routes;