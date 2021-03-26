const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', (socket) => {

    socket.on('msg', (msg) => {
        io.emit('msg',  msg.texto, msg.nome)
    })


    io.on('disconnect', () => {
        console.log(socket.id+ ' off');
    });
});

app.set('views', './Views')
app.set('view engine', 'ejs')
app.set(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) =>{
    res.render('index')
})

http.listen(3000)