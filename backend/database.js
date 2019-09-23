const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const password = require('./secret/donotread');
const fs = require('fs');

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

app.get("/allDB",(req,res)=>{
    const usersArr = []; 
    fs.readFile('./users', 'utf8', (err, data) => {
        usersArr = JSON.parse(data);
        console.log(usersArr);
         
    })
    res.send(usersArr);
})

app.listen("3001",()=>{
    console.log("listening to allDB 3001");
})