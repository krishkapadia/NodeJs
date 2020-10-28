const express = require('express');
const app = express();
var port = 80;

// For getting get the data from the post method we use urlencoded
app.use(express.urlencoded());

// give the name of all view file where its placed
app.set('views', './views');
app.set('view-engine', 'ejs');

// get method url : localhost/
app.get("/", (req, res) => {

    //res.send("Hello Wolrd"); // res.send is use for send the message to view
    res.render("index.ejs"); // its use for rendering html file
});

// post method when form was sumitted
app.post("/", (req, res) => {

    // req.body.fieldname for get the value from the field
    res.send(req.body.username + " " + req.body.surname);
})

// below code is run when url : localhost/about fired
app.get("/about", (req, res) => {
    res.send("This Is About page")
})

// for starting a webserver on specific port number
app.listen(port, () => {
    console.log(`Server is running on port no : ${port}`)
});