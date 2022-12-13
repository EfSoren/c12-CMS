const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const {startUp} = require('./index')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'management_db'
    },
    console.log('Connecting to the management database.')
);

db.connect((err) => {
    if( err ) {
        console.error(err);
    }
    console.log('Connected');
    startUp()
    
})

        
