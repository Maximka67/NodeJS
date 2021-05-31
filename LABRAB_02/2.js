const lod = require('lodash');
const colors = require('./colors.json');

var colors_res = lod(colors).map(item => {return {'colors': Object.keys(item)[0], rgb: Object.values(item)[0].slice(0,3)}});

console.table(colors_res.orderBy([item => item.colors, ['asc']]).value());