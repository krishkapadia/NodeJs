const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Record = require('../Models/tblRecord');
const db = require("../database");
const app = express();

//app.use(express.urlencoded());

app.use("/", (req, res) => {
    res.send("Controller Hello World");
    res.end();
})

app.post("/",(req,res)=>{
    
})

//app.use("/insert")


module.exports = app;