import dotenv from 'dotenv';
dotenv.config();
import { dbConnection } from './database/config.js';
await dbConnection();



// Node Server
import express from 'express';
const app = express();
app.use(express.json());
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, {});



// Mensajes de Socket
import { connectToSocket } from './sockets/socket.js';
connectToSocket(io);



// Path público
import { publicPath } from './publicPath/publicPath.js';
app.use(express.static(publicPath));



// Mis rutas
import authRoute from './routes/auth.js'
import usuariosRoute from './routes/usuarios.js'
import mensajesRoute from "./routes/mensajes.js";
app.use('/api/login', authRoute)
app.use('/api/usuarios', usuariosRoute)
app.use('/api/mensajes',mensajesRoute)


httpServer.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});