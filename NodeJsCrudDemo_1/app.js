const express = require('express');
const app = express();
var port = 80;

app.get("/",(req,res)=>{
    res.send("Hello Wolrd");
});

app.get("/about",(req,res)=>{
    res.send("This Is About page")
})

app.listen(port,()=>{
    console.log(`Server is running on port no : ${port}`)
});