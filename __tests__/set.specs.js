const Lab = require( '@hapi/lab' );
const { expect } = require( '@hapi/code' );
const Server = require( '../src' );
const Utils = require( './utils' );

const lab = Lab.script();
let server = null;

lab.experiment( 'GET /set', () => {

    lab.before( async () => {

        Server.createServerInstance();
        server = await Server.init();

    } );

    lab.test( 'sets the key-value pair correctly', async () => {

        const [ key, value ] = [ Utils.generateRandomString(), Utils.generateRandomString() ];
        const _response = await server.inject( {

            url: `/set?${ key }=${ value }`,

        } );

        expect( _response.statusCode ).to.equal( 204 );

    } );

    lab.test( 'returns a 409 if the key already exists', async () => {

        const [ key, value ] = [ Utils.generateRandomString(), Utils.generateRandomString() ];
        await server.inject( {

            url: `/set?${ key }=${ value }`,

        } );

        const _response = await server.inject( {

            url: `/set?${ key }=${ value }`,

        } );

        expect( _response.statusCode ).to.equal( 409 );

    } );

} );

exports.lab = lab;
