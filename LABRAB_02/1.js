const lod = require('lodash');
const colors = require('./colors.json')

console.log(lod(colors).map(item => Object.keys(item)[0])
            .filter(item => item.length < 6)
            .orderBy()
            .value());