const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");
const csvjson = require("csvjson");

const pool = mysql.createPool({
    host: "pgsha.ru",
    port: "35006",
    user: "soft0062",
    password: "NYeI0gd9",
    database: "soft0062_labrab06"    
});

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.use('/css', express.static(__dirname + '/css'));
app.set("view engine", "hbs");


app.get("/", function(req, res) {   
    pool.query("SELECT * FROM Напитки", function (error, result, client){
        if (error) return console.log(error)
        var drinks = result;
        pool.query("SELECT * FROM Горячее", function (error, result, client){
            if (error) return console.log(error)
            var hot_food = result;
            res.render('index.hbs', {drinks:drinks, hot_food:hot_food});
        });
    });
});


app.get("/create", function(req, res) { 
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) { 
    if (!req.body) return res.sendStatus(400);
    const Name = req.body.name;
    const Description = req.body.description;
    const Category = req.body.category;
    const Price = req.body.price;
    let query = "INSERT INTO Menu (name, description, category, price) VALUES (?,?,?,?)";
    let params = [Name, Description, Category, Price];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});


app.get("/recover", urlencodedParser, function (req, res) { 

    function csv_to_json(nameFile, del = ',') {
        let textCSV = fs.readFileSync(nameFile, 'utf-8');
        return csvjson.toObject(textCSV, { delimiter: del });
    }
    let array = csv_to_json('Menu.csv');

    let rows = array.map(item => Object.values(item));

    pool.query("DELETE FROM Menu", function (error, result, client){
        if (error) return console.log(error)
        pool.query("INSERT INTO Menu (name, description , category, price) VALUES ? ",[rows], function (error, result, client){
            if (error) return console.log(error)
            res.redirect("/");
        });
    });

});



app.get("/edit/:id", function(req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM Menu WHERE id=?", [id], function(err, data) {
        if (err) return console.error(err);
        res.render("edit.hbs", {
            Menu: data[0]
        });
    });
});

app.post("/edit", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    let query = "UPDATE Menu SET name=?, description=?, category=?, price=? WHERE id=?";
    let params = [name, description, category, price, id];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});


app.post("/delete/:id", function(req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM Menu WHERE id=?", [id], function(err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});


app.get("/sort/:field.:direct", function(req, res) { 

    const field = req.params.field;
    const direct = req.params.direct;

    pool.query("SELECT * FROM Напитки", function (error, result, client){
        if (error) return console.log("Ошибка здесь - "+error)
        var drinks = result;
        pool.query("SELECT * FROM Горячее ORDER BY " + field + " " + direct, function (error, result, client){
            if (error) return console.log('нет, ошибка здесь -'+error)
            var hot_food = result;
            res.render('index.hbs', {drinks:drinks, hot_food:hot_food});
        });
    });
});

app.get("/sort1/:field.:direct", function(req, res) { 

    const field = req.params.field;
    const direct = req.params.direct;

    pool.query("SELECT * FROM Напитки ORDER BY " + field + " " + direct, function (error, result, client){
        if (error) return console.log("Ошибка здесь - "+error)
        var drinks = result;
        pool.query("SELECT * FROM Горячее", function (error, result, client){
            if (error) return console.log('нет, ошибка здесь -'+error)
            var hot_food = result;
            res.render('index.hbs', {drinks:drinks, hot_food:hot_food});
        });
    });
});


app.listen(3000, function() {
    console.log("Адрес - http://localhost:3000/");
    let isWin = process.platform === "win32";
    let hotKeys = isWin? "Ctrl+C": "Ctrl+D"; // Windows / Linux
    console.log(`остановить сервер - ${hotKeys}`);
});