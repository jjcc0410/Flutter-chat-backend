import Mensaje from '../models/mensaje.js';
import Usuario from '../models/usuario.js'

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async (payload) => {
try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();

    return true;
} catch (error) {
    return false;
}
}



export {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
};