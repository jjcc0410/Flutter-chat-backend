/*
    Path: /api/mensajes
*/
import { Router } from "express";
import { validarJWT } from "../middleware/validar-jwt.js";
import { obtenerChat } from "../controllers/mensajes.js";

const router = Router();

router.get('/:de', validarJWT,obtenerChat )

export default router