
//dependencies
const {sampleHandler} = require('./handlers/routeHanders/sampleHandlers');
const {userHandler} = require('./handlers/routeHanders/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
}
 
module.exports = routes;