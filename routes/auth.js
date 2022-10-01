/* 
    path: api/login
*/
import { Router, response } from "express";
const router = Router();

router.post('/new', (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Crear usuario'
    })
})


export default router