import FetchException from "./FetchException";

const ACTIONS = { "GET": "get", "POST": "get", "PUT": "set", "DELETE": "delete" };

class EntityFetchException extends FetchException
{
    constructor(
        method, 
        type, 
        entity, 
        reason, 
        message = `Fail ${ACTIONS[method]} entity '${type}'.`
    ) {
        super(ACTIONS[method], type, entity, reason, message);

        this.action = ACTIONS[method];
        this.type = type;
        this.entity = entity;
        this.reason = reason;
    }

    log() {
        // TODO: Сделать вариант для прода
        console.error(
            'Fail %s entity %s with body %o. Reason %o.', 
            this.action, 
            this.type, 
            this.entity, 
            this.reason
        );
    }
}

export default EntityFetchException;