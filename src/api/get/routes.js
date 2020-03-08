const Joi = require( '@hapi/joi' );
const controller = require( './controller' );

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: controller.getKey,
        config: {
            validate: {
                query: Joi.object( {
                    key: Joi.string().required().min( 3 ).max( 50 ),
                } ),
            },
        },
    },
];
