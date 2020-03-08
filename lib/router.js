const path = require( 'path' );
const glob = require( 'glob' );

const Logger = require( './logger' );

exports.attachRoutes = function attachRoutes( server ) {

    const routes = glob.sync( path.join( __dirname, '..', 'src', 'api', '**', 'routes.js' ) );
    if ( routes.length === 0 ) {

        Logger.warn( 'no routes were found' );
        return undefined;

    }

    Logger.debug( 'found %d routes', routes.length );
    routes.forEach( route => {

        const _endpointDefinitions = require( route );
        const _endpointName = path.parse( route ).dir.split( '/' ).pop();

        if ( _endpointDefinitions.length === 0 ) {

            Logger.warn( 'no paths were found for controller "%s"', _endpointName );
            return undefined;

        }

        Logger.debug( 'found %d path(s) for controller "%s"', _endpointDefinitions.length, _endpointName );

        _endpointDefinitions.forEach( ( { path: endpointPath, ...endpointConfig } ) => {

            server.route( {

                ...endpointConfig,
                path: `/${ _endpointName }${ endpointPath.slice( 1 ) }`

            } );

        } );

        Logger.debug( 'configured all paths for the endpoint "%s"', _endpointName );

    } );

};
