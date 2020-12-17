import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    errors: ValidationError[] = [];
    constructor(errors: ValidationError[]) {
        super('Invalid request parameters');
        this.errors = errors;

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}
