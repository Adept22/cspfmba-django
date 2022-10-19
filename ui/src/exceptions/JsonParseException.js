import BaseException from "./BaseException";

class JsonParseException extends BaseException
{
    constructor(reason) {
        super(`Fail parse JSON response. Reason ${reason}`);

        this.reason = reason;
    }

    log() {
        console.error(
            `Fail parse JSON response. Reason '%s'`, 
            this.reason
        );
    }
}

export default JsonParseException;