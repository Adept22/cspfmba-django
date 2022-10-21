import cleanDeep from 'clean-deep';

import MethodNotAllowedException from '../exceptions/MethodNotAllowedException';
import BadEntityException from '../exceptions/BadEntityException';
import FetchException from '../exceptions/FetchException';
import JsonParseException from '../exceptions/JsonParseException';

class NetworkService {
    baseUrl = `http://${process.env.REACT_APP_API_HOST}/api/v1`;

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

    /**
     * Вызов api бэкенда для операции
     *
     * @param {string} method
     * @param {object} entity
     */
    fetch(method, type, entity = {}, sort = {}) {
        return new Promise((resolve, reject) => {
            if (!['GET', 'SET', 'DELETE'].includes(method)) {
                reject(new MethodNotAllowedException(method));
            }

            if (typeof entity !== 'object') {
                reject(new BadEntityException(type, entity));
            }

            const clone = cleanDeep(JSON.parse(JSON.stringify(entity)));

            const params = this.getParams(clone);

            const url = this.getUrl(type, method, params, sort);

            method = this.switchMethod(method, params);

            this._fetch(method, url, undefined, clone)
                .then(resolve)
                .catch(reject);
        });
    }

    _fetch(method, url, headers, body) {
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + '/' + url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    ...headers
                },
                method,
                body: method !== 'GET' ? JSON.stringify(body) : undefined,
                cache: 'no-cache'
            }).then(response => {
                if (response.ok) {
                    if (response.status !== 204) {
                        response.json()
                            .then(resolve)
                            .catch(ex => reject(new JsonParseException(ex.message)));
                    } else {
                        resolve();
                    }
                } else {
                    response.json()
                        .then(json => reject(new FetchException(method, url, body, json)))
                        .catch(ex => reject(new JsonParseException(ex.message)));
                }
            })
                .catch(ex => reject(new FetchException(method, url, body, ex.message)));
        });
    }
}

export default new NetworkService();
