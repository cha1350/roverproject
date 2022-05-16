export const ValidationError = class ValidationError {
    constructor({
        field,
        msg
    }) {
        this.field = field;
        this.msg = msg;
    }
}
export const ResponseError = class ResponseError {
    constructor({
        status,
        msg,
        reason,
        url,
        ip,
        validationErrors = []
    }) {
        this.status = status;
        this.msg = msg;
        this.reason = reason;
        this.url = url;
        this.ip = ip;
        this.validationErrors = validationErrors;
    }
}