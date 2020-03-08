const Boom = require( '@hapi/boom' );
const { SharedObjects: { KVStore } } = require( '../../../lib' );

exports.getKey = function getKey( request ) {

    const { key } = request.query;
    const value = KVStore.get( key );

    if ( typeof value === 'undefined' ) {

        return Boom.notFound( `The key "${ key }" was no found in the store.` );

    }

    return {

        data: { key, value },

    };

};
