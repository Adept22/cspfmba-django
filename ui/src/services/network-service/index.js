import cleanDeep from 'clean-deep';

import MethodNotAllowedException from '../../exceptions/MethodNotAllowedException';
import BadEntityException from '../../exceptions/BadEntityException';
import FetchException from '../../exceptions/FetchException';
import JsonParseException from '../../exceptions/JsonParseException';

class NetworkService {
    context = null;

    setContext(context) {
        this.context = context;

        return this;
    }

    /**
     * Вызов api бэкенда для операции
     *
     * @param {string} method
     * @param {object} entity
     */
    fetch(method, type, entity = {}, sort = {}) {
        if (!this.context) throw new Error('Unknown context');

        return new Promise((resolve, reject) => {
            if (!['GET', 'SET', 'DELETE'].includes(method)) {
                reject(new MethodNotAllowedException(method));
            }

            if (typeof entity !== 'object') {
                reject(new BadEntityException(type, entity));
            }

            const clone = cleanDeep(JSON.parse(JSON.stringify(entity)));

            const params = this.context.getParams(clone);

            sort = this.context.getSort(cleanDeep(JSON.parse(JSON.stringify(sort))));

            const url = this.context.getUrl(type, method, params, sort);

            method = this.context.switchMethod(method, params);

            this._fetch(method, url, undefined, clone)
                .then(resolve)
                .catch(reject);
        });
    }

    _fetch(method, url, headers, body) {
        if (!this.context) throw new Error('Unknown context');

        return new Promise((resolve, reject) => {
            const contextHeaders = this.context.getHeaders();

            fetch(this.context.baseUrl + '/' + url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    ...contextHeaders,
                    ...headers
                },
                method,
                body: method !== 'GET' ? JSON.stringify(body) : undefined,
                cache: 'no-cache'
            }).then(response => {
                if (response.ok) {
                    if (response.status !== 204) {
                        response.json()
                            .then(json => {
                                try {
                                    const data = this.context.getResponse(json);

                                    resolve(data);
                                } catch (ex) {
                                    reject(new FetchException(method, url, body, ex));
                                }
                            })
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
