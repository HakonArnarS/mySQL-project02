const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const password = require('./secret/donotread');
const fs = require('fs');
const fetch = require('isomorphic-fetch');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'myData'
})

db.connect();

app.get("/",(req,res)=>{
    res.send("Hello World!");
    
    
})

//Setja allan DB inná localhost
app.get("/allDB",(req,res)=>{
    let usersArr = []; 
    fs.readFile('./users', 'utf8', (err, data) => {
        usersArr = JSON.parse(data);
        res.send(usersArr);
    })
    
    
})

// fetch('http://localhost:3001/allDB')
// .then(res=>res.json())
// .then(json=>{
//     json.forEach(
//         db.query(`INSERT INTO users(ID, fName, lName, userName, email, password)
//         VALUES ("${users.ID}","${users.fName}","${users.lName}","${users.userName}","${users.email}","${users.password}",)`
//     ))
// })


app.get("/users",(req,res)=>{

    db.query('SELECT * FROM users',(error, results)=> {
        if (error) throw error;
        console.log(results);
        res.send(results)
    });
})

app.listen("3001",()=>{
    console.log("blah 3001");
})