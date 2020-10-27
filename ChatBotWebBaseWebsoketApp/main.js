const WebSocket = require('ws')
var http = require('http');
var url = require('url');
var port = 8080
var st = require('node-static');

var mysql = require('mysql'); //npm i

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbotdb"
});

var fileServer = new st.Server('./public');

var httpserver = http.createServer(function (request, response) {
    request.on('end', function () {
        var get = url.parse(request.url, true).query;
        //var get = url.parse(request.url, true).query;
        fileServer.serve(request, response);
    }).resume();
    //response.end("hello");
}).listen(port, function () {
    console.log((new Date()) +
        ` Server is listening on port ${port}`);
});

const wss = new WebSocket.Server({ server: httpserver });
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

wss.on('connection', function (ws) {
    ws.send('Welcome To Our WebBase ChatBot')

    ws.on('message', message => {
        console.log(`Received message => ${message} length : ${message.length}`)
        
        if(message!=null)
            var sql = "select * from tblchat where Question like '%" + message + "%' ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            try {
                //doAthing();
                console.log("1 record Found");
                console.log(result);
                if (result != null)
                    ws.send(result[0].Answer);
            } catch (e) {
                console.log(e);
                ws.send("No Anser Found By ChatBot Sry About That !");
                // [Error: Uh oh!]
            }
            
        });

    })

})