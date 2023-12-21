"use strict";

class ApiError extends Error {
    constructor (
        statusCode,
        message = 'An error occurred processing your request.',
        type = 'INTERNAL_SERVER_ERROR',
        errors = [],
        stack = '',
        data = null
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.type = type;
        this.errors = errors;
        this.data = data;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
