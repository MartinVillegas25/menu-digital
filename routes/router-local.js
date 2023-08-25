const { Router} = require('express');
const validarJWT = require('../middlerwares/validar-jwt');
const { mostrarMenu, actualizarMenu, agregarProducto, borrarProducto, mostrarCategorias, mostrarPedidos, realizarPedidos, liberarMesa } = require('../controllers/router-menu');
const upload = require('../middlerwares/cloudinary');




const router = Router();
//items menu dashboard local

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


//mostar categorias por local

router.get('/categorias',mostrarCategorias);

//manejos de pedidos local

router.get('/pedidos', mostrarPedidos);
router.delete('/:mesa/liberar-mesa', liberarMesa);



//rutas del menu
router.post('/:mesa/:email/pedido', realizarPedidos);


module.exports = router;

