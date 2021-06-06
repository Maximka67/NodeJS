const fs = require('fs');
const csvjson = require('csvjson');
const lod = require('lodash');

const file_csv_students = './csv/students.csv';
function csv_to_json(nameFile, del = ',') {
	let textCSV = fs.readFileSync(nameFile, 'utf-8');
	return csvjson.toObject(textCSV, { delimiter: del });
}

let students = csv_to_json(file_csv_students);
var res = lod(students).filter(i => i.age > 17).value();
console.log(res);