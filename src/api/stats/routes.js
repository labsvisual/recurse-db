const controller = require( './controller' );

module.exports = [

    {
        method: 'GET',
        path: '/',
        handler: controller.generateStats,
    },

];
