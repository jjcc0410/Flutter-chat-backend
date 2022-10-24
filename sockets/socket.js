import { comprobarJWT } from '../helpers/jwt.js';
import { grabarMensaje, usuarioConectado, usuarioDesconectado } from '../controllers/socket.js';

const connectToSocket = io => {
    io.on('connection', client => {
        console.log('Cliente conectado');
        const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
        // Verificar autenticación
        if (!valido) { return client.disconnect(); }

        // Cliente autenticado
        usuarioConectado(uid);

        // Ingresar al usuario a una sala en particular
        // sala global, client.id, 633b52d77544537dd955071a
        client.join(uid);

        // Escuchar del cliente el mensaje-personal
        client.on('mensaje-personal', async (payload) => {
            // TODO: Grabar mensaje
            await grabarMensaje(payload);
            io.to(payload.para).emit('mensaje-personal', payload);
        })

        client.to(uid).emit('');


        client.on('disconnect', () => usuarioDesconectado(uid));
    });
}

export { connectToSocket }