import express from "express";
import {createServer} from "node:http"
import { Server } from 'socket.io';
import { Msg } from "./db/db.js";

const port = process.env.PORT ?? 4000
//creación de servidor
const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static('public'));
//websocket conexión
io.on('connection', async (socket) => {
    console.log('a user has connected!')
    const ipAddr = socket.handshake.address.slice(7)
  
    
    //escuchamos los tipos de conexiones del cliente
    socket.on('chat message', (msgRecived, username) =>{
       const userName =  username
       
        console.log("username: ",userName)
        Msg.create({username:userName, msg:msgRecived, ip: ipAddr})
    })


    socket.on('chat message', (msg,username) => {
        io.emit('chat message', msg, username);
        
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

