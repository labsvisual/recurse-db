const sizeof = require( 'object-sizeof' );
const Errors = require( './errors' );

class KVStore {

    constructor() {

        this._stateStore = {};

    }

    get( key ) {

        return this._stateStore[ key ];

    }

    set( key, value ) {

        if ( typeof this._stateStore[ key ] !== 'undefined' ) {

            throw new Errors.DuplicateKeyError( key );

        }

        this._stateStore[ key ] = value;

    }

    flush() {

        this._stateStore = {};

    }

    generateStats() {

        return {

            storeSize: `${ sizeof( this._stateStore ) } bytes`,
            totalKeys: Object.keys( this._stateStore ).length,

        };

    }

}

exports.KVStore = KVStore;
exports.StoreErrors = Errors;
