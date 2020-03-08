const pino = require( 'pino' );
const config = require( '../config' );

module.exports = pino( config.get( '/logging' ) );
