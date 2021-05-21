const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "pgsha.ru",
  port: "35006",
  user: "soft0062",
  database: "soft0062_labrab04",
  password: "NYeI0gd9"
});

connection.connect();

connection.query("INSERT INTO `data_set` \
 (day, city, name, count)  \
 VALUES ('2021-04-17', 'Александровск', 'elon musk', 202)");

connection.end();