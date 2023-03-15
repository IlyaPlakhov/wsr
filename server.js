var express = require("express")
var app = express()
var server = require("http").createServer(app)
var io = require("socket.io")(server)

app.use(express.static(__dirname))
server.listen(1337)

app.get ("/", function(Server, Client){
    server.redirect(__dirname + "/index.html")
})

app.get ("/secondpage", function(req, res){
    res.sendFile(__dirname + "/second page.html")
})

var connections = []

io.sockets.on("connection", function(socket){
    connections.push(socket)
        console.log("Юзер зашел на сайт")

    socket.on("disconnect", function(data){
        connections.splice(connections.indexOf(socket), 1)
            console.log("Юзер вышел с сайта")
    })
    socket.on("login", function(login, password){
        var bd = {
            "users": [
                {
                    "login": "Ilya",
                    "password": 1337
                },
                {
                    "login": "Dmitry",
                    "password": 1488
                },
                {
                    "login": "albert",
                    "password": 228
                }
            ]
        }
        for (let i = 0; i < bd.users.length; i++) {
            if(bd.users[i].login==login){
                if(bd.users[i].password==password){
                    socket.emit("loginreq", login)
                } else{socket.emit("loginfailed")}
            } else{socket.emit("loginfailed")}
        }
    })
})