export const ValidationError = class ValidationError {
    constructor({
        field,
        msg
    }) {
        this.field = field;
        this.msg = msg;
    }
}