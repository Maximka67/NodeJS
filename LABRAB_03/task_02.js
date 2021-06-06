const fs = require('fs');
const csvjson = require('csvjson');
const lod = require('lodash');

const file_csv_students = './csv/students.csv';
const file_csv_groups = './csv/groups.csv';
function csv_to_json(nameFile, del = ',') {
	let textCSV = fs.readFileSync(nameFile, 'utf-8');
	return csvjson.toObject(textCSV, { delimiter: del });
}

let students = csv_to_json(file_csv_students);
let groups = csv_to_json(file_csv_groups);

let name_group = 'ПИнб-3';

var res = lod(groups).filter(item => item.nameGr == name_group).map(i => i.id).value();
var res_ageAVG = lod(students).filter(i => i.idGr == res).meanBy(i => parseInt(i.age));
console.log(res_ageAVG);