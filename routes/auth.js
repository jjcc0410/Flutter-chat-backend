/* 
    path: /api/login
*/
import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, loginUsuario, renewToken } from "../controllers/auth.js";
import { validarCampos } from "../middleware/validar-campos.js"
import { validarJWT } from "../middleware/validar-jwt.js";

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], loginUsuario)

router.get('/renew', validarJWT, renewToken)

export default router