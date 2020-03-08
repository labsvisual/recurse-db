exports.DuplicateKeyError = class DuplicateKeyError extends Error {

    constructor( keyName ) {

        super(
            `The key "${ keyName }" already exists in the key store.`
        );
        this.statusCode = 409;

    }

};
