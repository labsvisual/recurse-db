const Boom = require( '@hapi/boom' );
const { SharedObjects: { KVStore }, KVStore: { StoreErrors } } = require( '../../../lib' );

exports.setKey = function setKey( request, h ) {

    const { ...kvPair } = request.query;
    const key = Object.keys( kvPair ).pop();
    const value = kvPair[ key ];

    try {

        KVStore.set( key, value );
        return h.response().code( 204 );

    } catch ( error ) {

        if ( error instanceof StoreErrors.DuplicateKeyError ) {

            return Boom.conflict( error.message );

        }

        request.logger.error( { err: error }, 'there was an error while putting a kv pair' );

        return {

            errors: [
                {
                    code: 'EINTSRVERROR',
                    title: 'Internal Server Error',
                    source: '/api/set',
                    message: 'An internal server error was encountered while completing the operation.',
                },
            ],

        };

    }

};
