// App de express
import express from 'express';
const app = express();
// Importar dotenv
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config();
//importar __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// DB Config
import { dbConnection } from './database/config.js';
dbConnection();

// Lectura y parseo del Body
app.use(express.json);

// Node Server
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {});

//Socket
io.on('connection', client => {
  console.log('Cliente conectado');
  client.on('disconnect', () => console.log('Cliente desconectado'));
});



// Path público
const publicPath = resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis rutas
import authRoute from './routes/auth.js'
app.use('/api/login', authRoute)




httpServer.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log('Servidor corriendo en puerto', process.env.PORT);
});

