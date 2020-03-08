const Lab = require( '@hapi/lab' );
const { expect } = require( '@hapi/code' );
const Server = require( '../src' );
const Utils = require( './utils' );

const lab = Lab.script();
let server = null;

lab.experiment( 'GET /get', () => {

    lab.before( async () => {

        Server.createServerInstance();
        server = await Server.init();

    } );

    lab.test( 'gets the key-value pair correctly', async () => {

        const [ key, value ] = [ Utils.generateRandomString(), Utils.generateRandomString() ];
        await server.inject( {

            url: `/set?${ key }=${ value }`,

        } );

        const _response = await server.inject( {

            url: `/get?key=${ key }`,

        } );

        const _responsePayload = JSON.parse( _response.payload );

        expect( _response.statusCode ).to.equal( 200 );
        expect( _responsePayload.data.key ).to.equal( key );
        expect( _responsePayload.data.value ).to.equal( value );

    } );

    lab.test( 'returns a 404 if the key does not exist', async () => {

        const key = Utils.generateRandomString();
        const _response = await server.inject( {

            url: `/get?key=${ key }`,

        } );

        expect( _response.statusCode ).to.equal( 404 );

    } );

} );

exports.lab = lab;
