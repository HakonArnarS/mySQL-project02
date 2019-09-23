const mysql = require('mysql');  
const password = require('./secret/donotread.js');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : password,
    database : 'myData'
});

db.connect();
console.log("code in global scope of module");

const runSQL = query=>{
    db.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

db.query('USE myData');
db.query(`CREATE TABLE IF NOT EXISTS users (
    ID Int AUTO_INCREMENT NOT NULL,
    fName varchar(100),
    lName varchar(100),
    userName varchar(100),
    email varchar(100),
    password varchar(100),
    PRIMARY KEY (ID)
)`, (error, results)=> {
        if (error) throw error;
        console.log(results);
})



// db.query(`CREATE TABLE IF NOT EXISTS usersimg (
//     ID Int AUTO_INCREMENT NOT NULL,
//     usersID Int NOT NULL,
//     image varchar(255),
//     PRIMARY KEY (ID),
//     FOREIGN KEY (usersID) REFERENCES users(ID)
// )`, (error, results)=> {
//     if (error) throw error;
//     console.log(results);
// })

module.exports = runSQL;