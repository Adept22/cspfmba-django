import BaseException from "./BaseException";

class MethodNotAllowedException extends BaseException
{
    constructor(method, message = `Method '${method}' not allowed.`) {
        super(message);

        this.method = method;
    }

    log() {
        console.error(
            'Method \'%s\' not allowed.',
            this.method
        );
    }
}

export default MethodNotAllowedException;