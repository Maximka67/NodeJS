const mysql = require("mysql2");
  
const paramsDB = {
  host: "pgsha.ru",
  port: "35006",
  user: "soft0062",
  database: "soft0062_labrab04",
  password: "NYeI0gd9"
};

function get_connection() {
	return mysql.createConnection(paramsDB);
}

const conn = get_connection();

let query = "SELECT  DATE_FORMAT(day, '%Y.%m.%d'), city, name, count  \
FROM data_set WHERE `count` = (SELECT `count` FROM  data_set ORDER BY `count`, `name`) ";

conn.promise()
    .query(query)
    .then(([rows]) => console.table(rows))
    .catch((err) => { console.error(err) })
    .then(conn.end());