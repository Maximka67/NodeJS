const mysql = require("mysql2");
const csvjson = require("csvjson");
const fs = require("fs");
  
const paramsDB = {
  host: "pgsha.ru",
  port: "35006",
  user: "soft0062",
  database: "soft0062_labrab04",
  password: "NYeI0gd9"
};

function csv_to_json(nameFile, del = ',') {
    let textCSV = fs.readFileSync(nameFile, 'utf-8');
    return csvjson.toObject(textCSV, { delimiter: del });
}

let array = csv_to_json('dataset.csv');

let rows = array.map(item => Object.values(item));
console.log(rows);

let query = "INSERT INTO data_set \
(day, city , name, count) VALUES ? ";

function get_connection() {
	return mysql.createConnection(paramsDB);
}

const conn =  get_connection();
conn.promise()
    .query(query, [rows])
    .then(() => console.log('rows inserted'))
    .catch((err) => console.error(err))
    .then(conn.end());
