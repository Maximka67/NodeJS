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

const conn =  get_connection();
conn.promise()
    .query("SELECT COUNT(*) FROM data_set")
    .then(([rows]) => rows[0]['COUNT(*)'])
    .then((count) => { console.log('count =', count) })
    .catch((err) => { console.error(err) })
    .then(conn.end());
