
const { Router} = require('express');
const { homeGet, 
    loginUsuario,  
    postUsuario, 
    mostrar, 
    dashboardLocal, 
    suspenderCuenta, 
    activarCuenta, 
    newPassword,
    actualizarDatos,
    mostrarUsuarioPorEstado,
    nuevosValores,
    recuperarClave,
    mostrarPlanes,
    adminGet} = require('../controllers/routers');

const { check } = require('express-validator');

const {validarJWT, logout} = require('../middlerwares/validar-jwt');
const adminRol = require('../middlerwares/validad-roles');






const router = Router();


//rutas get
router.get('/', homeGet);
router.get('/dashboard',[
    validarJWT,
], dashboardLocal);
router.get('/admin',[ 
    validarJWT,
    adminRol,
], adminGet);
//mostrar planes get
router.get('/planes', mostrarPlanes);


//logout 

router.get('/logout', logout);

//mostrar usuarios por estado 
router.post('/status', mostrarUsuarioPorEstado);

//rutas post
router.post('/login',[
    check('email', 'correo no valido').isEmail(),
    check('password', 'la clave es obligatoria').not().isEmpty(),
] ,loginUsuario); //inicion de sesion
router.post('/subscription',[
    check('email', 'correo no valido').isEmail(),
    check('password', 'la clave es obligatoria').not().isEmpty(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('storeName', 'el nombre de la tienda es obligatorio').not().isEmpty(),
] ,postUsuario)
router.post('/save-password', recuperarClave); 

//ruta actualizacion clave
router.put('/new-password', newPassword);
//actualizacion de datos
router.put('/actualizar',[
    validarJWT
], actualizarDatos)



//rotas dashboard adminstrador

router.put('/suspender', suspenderCuenta);
router.put('/activar', activarCuenta)
router.get('/mostrar', mostrar); //Mostrar usuarios formato Json


//actualizar valores de planes

router.put('/valores', nuevosValores);



module.exports = router;


