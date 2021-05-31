const lod = require('lodash');
const clients = require('./clients.json');

console.log(lod(clients).map(item => item)
            .filter(item => item.address.city == 'Кунгур')
            .orderBy([item => item.gender, item => item.age, item =>item.name], ['asc', 'desc', 'asc'])
            .value());