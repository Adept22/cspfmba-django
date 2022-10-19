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
            url += `${params.id}`;
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

    getSort(entity = {}) {
        const sortProps = ['_start', '_limit', '_order', '_sort'];

        return Object.keys(entity)
            .filter(key => sortProps.includes(key))
            .reduce((obj, key) => {
                obj[key] = entity[key];

                delete entity[key]

                return obj;
            }, {});
    }

    getResponse(json) {
        return json;
    }
}

export default Context;
