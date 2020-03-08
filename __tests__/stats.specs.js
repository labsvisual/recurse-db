const Lab = require( '@hapi/lab' );
const { expect } = require( '@hapi/code' );
const Server = require( '../src' );
const Utils = require( './utils' );

const lab = Lab.script();
let server = null;

lab.experiment( 'GET /stats', () => {

    lab.before( async () => {

        Server.createServerInstance();
        server = await Server.init();

    } );

    lab.test( 'gets the stats correctly', async () => {

        let totalLength = 0;

        await Promise.all( new Array( 100 ).fill( 0 ).map( () => {

            const [ key, value ] = [ Utils.generateRandomString(), Utils.generateRandomString() ];

            totalLength += ( value.length + key.length ) * 2;

            return server.inject( {

                url: `/set?${ key }=${ value }`,

            } );

        } ) );

        const _response = await server.inject( {

            url: '/stats',

        } );

        const _responsePayload = JSON.parse( _response.payload );

        expect( _response.statusCode ).to.equal( 200 );
        expect( _responsePayload.data.storeSize ).to.equal( `${ totalLength } bytes` );
        expect( _responsePayload.data.totalKeys ).to.equal( 100 );

    } );

} );

exports.lab = lab;
