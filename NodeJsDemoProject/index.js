const express = require('express');
const db = require('./database');
const app = express();
const RecordController = require('./Controllers/RecordController');

app.all("/",(req,res)=>{
    res.send("Hello World");
    res.end();
});

app.use("/record",RecordController);

app.listen(1000,()=>{
    console.log("Server Running On Port Number : 1000");
})