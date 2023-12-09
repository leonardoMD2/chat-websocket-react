import express from "express";
import {createServer} from "node:http"
import { Server } from 'socket.io';

const port = process.env.PORT ?? 4000
//creación de servidor
const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static('public'));
//websocket conexión
io.on('connection', async (socket) => {
    console.log('a user has connected!')
    
    //escuchamos los tipos de conexiones del cliente
    socket.on('chat message', (msg) =>{
       const username =  socket.handshake.auth.username
        console.log(msg)
        console.log("username: ",username)
    })


    socket.on('chat message', (msg) => {
        io.emit('chat message', msg, socket.handshake.auth.username);
      });


    socket.on('disconnect', () => {
      console.log('an user has disconnected')
    })})


app.get('/', (req, res) =>{
    res.sendFile(process.cwd() + '/index.html')
})




server.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})

