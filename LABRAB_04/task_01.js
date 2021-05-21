const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "pgsha.ru",
  port: "35006",
  user: "soft0062",
  database: "soft0062_labrab04",
  password: "NYeI0gd9"
});

connection.connect();

connection.query ("CREATE TABLE `data_set` \
                 (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, \
                 day DATE, \
                 city VARCHAR(50) NOT NULL, \
                 name VARCHAR(50), \
                 count INT)");

connection.end();