const { Router} = require('express');
const validarJWT = require('../middlerwares/validar-jwt');
const { mostrarMenu, actualizarMenu, agregarProducto, borrarProducto } = require('../controllers/router-menu');
const upload = require('../middlerwares/cloudinary');




const router = Router();


router.get('/items',[
    validarJWT
], mostrarMenu)

router.put('/items/:id',[
    validarJWT,
    upload.single('img')
], actualizarMenu)

router.post('/items',[
    validarJWT,
    upload.single('img')
], agregarProducto);

router.delete('/items/:id', borrarProducto);


module.exports = router;

