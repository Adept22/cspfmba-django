import NetworkService from './network-service';
import DjangoContext from './network-service/DjangoContext';
import BaseException from '../exceptions/BaseException';
import BadEntityException from '../exceptions/BadEntityException';
import EntityFetchException from '../exceptions/EntityFetchException';

class EntityService {
    /**
     * Запрашивает одну или несколько сущностей/моделей с ожиданием аутентификации
     * 
     * @param {string} type Тип сущности/модели
     * @param {object|undefined} entity Параметры сущности/модели
     * 
     * @returns {Promise} Промис запроса
     */
    get(type, entity = {}, sort = {}, context = DjangoContext) {
        if (typeof entity !== 'object') {
            Promise.reject(new BadEntityException(type, entity));
        }

        return this.send('GET', type, entity, sort, context);
    }

    /**
     * Создает или изменяет одну или несколько сущностей/моделей
     * 
     * @param {string} type Тип сущности/модели
     * @param {object|array} entity Тело сущности/модели
     * 
     * @returns {Promise} Промис запроса
     */
    set(type, entity = {}, context = DjangoContext) {
        const entities = [].concat(entity).filter(Object);

        const requests = entities.map(item => {
            if (typeof item !== 'object') {
                Promise.reject(new BadEntityException(type, entity));
            }

            return this.send("SET", type, item, undefined, context);
        });

        if (requests.length > 0) {
            return Promise.resolve(entities.length > 1 ? Promise.all(requests) : requests[0]);
        }

        return Promise.resolve(Array.isArray(entity) ? [] : null);
    }

    /**
     * Удаляет одну или несколько сущностей/моделей
     * 
     * @param {string} type Тип сущности/модели
     * @param {object|array} entity Тело сущности/модели
     * 
     * @returns {Promise} Промис запроса
     */
    delete(type, entity = {}, context = DjangoContext) {
        const entities = [].concat(entity).filter(Object);

        const requests = entities.map(item => {
            if (typeof item !== 'object' && typeof item.id === 'undefined') {
                Promise.reject(new BadEntityException(type, entity));
            }

            return this.send("DELETE", type, item, undefined, context);
        });

        if (requests.length > 0) {
            return Promise.resolve(entities.length > 1 ? Promise.all(requests) : requests[0]);
        }

        return Promise.resolve(Array.isArray(entity) ? [] : null);
    }

    send(method, type, entity, sort, context) {
        return new Promise((resolve, reject) => {
            NetworkService.setContext(context)
                .fetch(method, type, entity, sort)
                .then(resolve)
                .catch(ex => {
                    if (ex instanceof BaseException) {
                        reject(new EntityFetchException(method, type, entity, ex.reason));
                    }

                    reject(ex);
                });
        });
    }
}

export default new EntityService();
