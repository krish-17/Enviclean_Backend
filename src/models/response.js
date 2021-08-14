/* Author Vishal Dipak Parmar */
class Response {
    constructor(message, success, payload, code) {
        this.message = message;
        this.success = success;
        this.payload = payload;
        this.code = code;
    }
}

module.exports = Response;