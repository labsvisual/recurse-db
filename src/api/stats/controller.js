const { SharedObjects: { KVStore } } = require( '../../../lib' );

exports.generateStats = async function generateStats() {

    return {
        data: KVStore.generateStats(),
    };

};
