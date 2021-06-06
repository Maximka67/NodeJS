const fs = require('fs');
const csvjson = require('csvjson');
const lod = require('lodash');

const file_csv_students = './csv/students.csv';
const file_csv_groups = './csv/groups.csv';
const file_csv_curators = './csv/curators.csv';


function csv_to_json(nameFile, del = ',') {
	let textCSV = fs.readFileSync(nameFile, 'utf-8');
	return csvjson.toObject(textCSV, { delimiter: del });
}

let students = csv_to_json(file_csv_students);
let groups = csv_to_json(file_csv_groups);
let curators = csv_to_json(file_csv_curators);


function task_05(name_cur, dest){
var res_curator = lod(curators)
                  .filter(item => item.nameCur == name_cur)
                  .map(i => i.id)
                  .value();

var res_group = lod(groups)
                .filter(i => i.idCur == res_curator)
                .map(i => i.id)
                .value();

var res_students = lod(students)
                   .filter(i => i.idGr == res_group)
                   .orderBy(i => i.nameSt, dest)
                   .value();
console.log(res_students);
}

task_05('Ляскин', 'asc');