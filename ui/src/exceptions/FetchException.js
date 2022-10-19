import BaseException from "./BaseException";

class FetchException extends BaseException
{
    constructor(
        method, 
        url, 
        body, 
        reason, 
        message = `Fail ${method} ${url}.`
    ) {
        super(message);

        this.action = method;
        this.url = url;
        this.body = body;
        this.reason = reason;
    }

    log() {
        console.error(
            'Fail %s %s with body %o. Reason %o.', 
            this.action, 
            this.url, 
            this.body, 
            this.reason
        );
    }
}

export default FetchException;