import Context from './Context.js';

class DjangoContext extends Context
{
    baseUrl = "http://ubuntu.local:8082/api/v1";
}

export default new DjangoContext();