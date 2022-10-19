class BaseException extends Error
{
    constructor(message = 'An error has occurred.') {
        super(message);

        this.message = message;
    }

    log() {
        console.error(this.message);
    }
}

export default BaseException;