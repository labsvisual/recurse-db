const Hapi = require( '@hapi/hapi' );
const hapiPino = require( 'hapi-pino' );

const config = require( '../config' );
const { Router, Logger, SharedObjects: { KVStore } } = require( '../lib' );

let server = null;

exports.createServerInstance = () => {

    server = new Hapi.Server( config.get( '/server' ) );

};

exports.init = async function init() {

    try {

        Logger.info( 'server initialization started' );

        Logger.trace( 'attaching routes' );
        Router.attachRoutes( server );
        Logger.trace( 'route attachment successful' );

        Logger.trace( 'bootstrapping plugins' );
        await server.register( {
            plugin: hapiPino,
            options: {
                instance: Logger,
                logEvents: null,
                logRequestStart: false,
                logRequestComplete: false,
                getChildBindings: ( { method, url } ) => {

                    return {
                        req: {
                            method, url,
                        },
                    };

                },
            },
        } );
        Logger.trace( 'plugins bootstrapped' );

        await server.initialize();
        Logger.info( 'server initialization successful' );

        Logger.trace( 'flushing KV store' );
        KVStore.flush();
        Logger.trace( 'KV store flushed' );

        return server;

    } catch ( error ) {

        Logger.fatal( { err: error }, 'Error while initializing the application' );

    }

};
