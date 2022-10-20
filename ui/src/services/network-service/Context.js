/**
 * Abstract Class Context.
 *
 * @class Context
 */
class Context
{
    getHeaders() {
        return {};
    }

    switchMethod(method, params) {
        if ('SET' === method) {
            return ('id' in params) ? 'PUT' : 'POST';
        }

        return method;
    }

    getUrl(type, method, params, sort) {
        let url = `${type}/`;

        if ('id' in params) {
            url += `${params.id}/`;
        }

        if (
            method === 'GET' && 
            !('id' in params) && 
            Object.keys(sort).length > 0
        ) {
            url += '?' + new URLSearchParams(sort).toString();
        }

        return url;
    }

    getParams(entity = {}) {
        const params = {};

        if (typeof entity.id !== 'undefined') {
            params.id = entity.id;
    
            delete entity.id;
        }

        return params;
    }

    getSort(sort = {}) {
        return sort;
    }

    getResponse(json) {
        return json;
    }
}

export default Context;
