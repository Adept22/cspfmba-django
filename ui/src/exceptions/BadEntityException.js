import BaseException from "./BaseException";

class BadEntityException extends BaseException
{
    constructor(type, entity, message = `Bad entity '${type}' with content ${entity}.`) {
        super(message);

        this.type = type;
        this.entity = entity;
    }

    log() {
        // TODO: Сделать вариант для прода
        console.error(
            'Bad entity \'%s\' with content %o.',
            this.type, 
            this.entity
        );
    }
}

export default BadEntityException;