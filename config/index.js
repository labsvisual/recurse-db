const confidence = require( 'confidence' );
const store = new confidence.Store();

store.load( require( './config.json' ) );

module.exports = store;
