const fs = require('fs');
const csvjson = require('csvjson');
const lod = require('lodash');

let file_csv = './csv/students.csv';
function csv_to_json(nameFile, del = ',') {
	let textCSV = fs.readFileSync(nameFile, 'utf-8');
	return csvjson.toObject(textCSV, { delimiter: del });
}

let array = csv_to_json(file_csv);
var res_avg = lod.meanBy(array, (p) => parseInt(p.age));
console.log(Math.round(res_avg));



