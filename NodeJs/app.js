//Express Js
//console.log("Hello how are you");
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;

// Required File For Mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DemoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("staticFolder"));//For Serving Static File
app.use(express.urlencoded());

// EJS SPECIFIC STUFF
app.set('view engine', 'ejs');//Set The Template engine as pug
app.set('views', './views');//set the views directory

// Database Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected..");
});

// Creating Schema
const tblRegistartionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    surname: String,
    age: String,
    email: String
});
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});


// Local Schema
const tblRegistartion = mongoose.model("tblRegistartion", tblRegistartionSchema);
const tblStory = mongoose.model('tblStory', storySchema);
const tblPerson = mongoose.model('tblPerson', personSchema);


// Endpoint
app.get("/demo", (req, res) => {
    res.render("demo", { title: "Krish Pug", message: "This Is my 1st pug Demo file" });
});

app.get("/", (req, res) => {
    tblRegistartion.find((err, data) => {
        if (!err) {
            //console.log(data);        
            res.render("index", { data: data });
        }
    })
})

app.post("/submit", (req, res) => {
    //console.log(req.body);
    name = req.body.name;
    surname = req.body.surname;
    age = req.body.age;

    var data = new tblRegistartion(req.body);
    //console.log(data);
    data.save((err, data) => {
        if (!err) {
            //console.log("Data Inserted..");
        }
        res.redirect("/");
    });
    
});

app.post("/delete", (req, res) => {
    var id = req.query.id;
    var del = tblRegistartion.findByIdAndDelete(id);
    del.exec((err, data) => {
        res.redirect("/");
           // console.log(data);
    })
    
})

app.post("/updateData", (req, res) => {
    var id = req.query.id;
    tblRegistartion.find({ _id: id }, (err, data1) => {
        if (!err) {
            tblRegistartion.find((err, data) => {
                if (!err) {
                    res.render("updateView.ejs", { data: data, params: data1 });
                }
            })
        }
    });
});

app.post("/update", (req, res) => {
    var id = req.query.id;
    tblRegistartion.findByIdAndUpdate(id, { name: req.body.name, surname: req.body.surname, age: req.body.age, email: req.body.email }, (err, data1) => {
        if (!err) {
            res.redirect("/");
        }
    });
})

app.use("/search",(req,res)=>{
    var NAME = req.query.val;
    //console.log(NAME.length);
    tblRegistartion.find({ name : NAME.trim()},(err,data)=>{
        //console.log(data);
        if(err) throw err;
        //var htmlData = 
        //res.writeHead(200,{'Content-Type': 'text/html'})
        console.log(data)
        //res.header("text/html")
        //res.sendFile(path.join(__dirname,'/views/data.ejs'),{data1:data});
        data.push({length : data.length})
        res.send(data);
    });
    
})

// Add Author url : localhost/addAuthor
app.post("/addAuthor", (req, res) => {
    const author = new tblPerson({
        _id: new mongoose.Types.ObjectId(),
        name: 'Tim Cook',
        age: 50
    });
    author.save(function (err) {
        if (err) return handleError(err);

        const story1 = new tblStory({
            title: 'CEO of Apple',
            author: author._id    // assign the _id from the person
        });

        story1.save(function (err) {
            if (err) return handleError(err);
        });
    });
    res.end();
});

// Start Server
app.listen(port, () => {
    console.log(`Running App On ${port} Port`);
})