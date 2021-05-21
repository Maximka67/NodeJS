const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "pgsha.ru",
  port: "35006",
  user: "soft0062",
  database: "soft0062_labrab04",
  password: "NYeI0gd9"
});

connection.connect();

connection.query("DELETE FROM data_set");

connection.end();