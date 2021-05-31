const lod = require('lodash');
const users = require('./users.json');

console.log(lod(users)
            .map(item => item)
            .filter(item => item.address.geo.lat < 0)
            .map(item => {return{'username': item.username,'city': item.address.city}})
            .orderBy(item => item.city,['desc'])
            .value());