class ExpressError extends Error {
    constructor (message = 'Error Occured', status = 500) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;