import jwt from 'jsonwebtoken'

const generarJWT = (uid) => new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token) => {

        if (err) {
            // No se pudo crear el token
            reject('No se pudo generar el JWT');
        } else {
            // TOKEN!!!
            resolve(token);
        }
    }
    );
})


const comprobarJWT = (token = '') => {
    try {
        // Verificar el uid
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];


    } catch (error) {
        return [false, null]
    }
}

export { generarJWT,comprobarJWT };