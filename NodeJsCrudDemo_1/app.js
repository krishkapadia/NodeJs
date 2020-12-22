const express = require('express');
const app = express();
var port = 80;
// Require for mongodb operation
const mongoose = require('mongoose');

// Connection string for mongodb database
mongoose.connect('mongodb://localhost/Practice1', { useNewUrlParser: true });

// For checking connection is done or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected");
});

// Creating Schema meaning creting table design
const tblUserSchema = new mongoose.Schema({
    username: String,
    surname: String
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




// Compiling schema into model
const tblUser = mongoose.model('tblUser', tblUserSchema);
const tblStory = mongoose.model('tblStory', storySchema);
const tblPerson = mongoose.model('tblPerson', personSchema);

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
    var obj = new tblUser({
        username: req.body.username,
        surname: req.body.surname
    })
    obj.save((err, result) => {
        if (err)
            console.log("Error");
        else
            console.log("Inserted");
    })
    res.send(req.body.username + " " + req.body.surname);
});

// Get the all records from mongodb in jsonform
app.get("/data", (req, res) => {

    console.log("Id:", req.query.id);
    global.mydata = null;
    db.model('tblUser').find((err, data) => {
        console.log(data)
        res.end(JSON.stringify(data));
    })

});

// Forchecking purpose on postman
app.post("/check", (req, res) => {
    console.log("Name : ", req.body.myname)
    res.end();
})

// below code is run when url : localhost/about fired
app.get("/about", (req, res) => {
    res.send("This Is About page")
})

// Add Author url : localhost/addAuthor
app.post("/addAuthor",(req,res)=>{
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
}) ;

// for starting a webserver on specific port number
app.listen(port, () => {
    console.log(`Server is running on port no : ${port}`)
});