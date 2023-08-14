
const { Router} = require('express');
const { homeGet, 
    loginUsuario, 
    postSubcripcion, 
    postUsuario, 
    mostrar, 
    dashboardLocal, 
    suspenderCuenta, 
    activarCuenta, 
    newPassword,
    actualizarDatos,
    sesionEnd} = require('../controllers/routers');

const { check } = require('express-validator');
const recuperarClave = require('../controllers/nodemailer');
const validarJWT = require('../middlerwares/validar-jwt');






const router = Router();


//rutas get
router.get('/', homeGet);
router.get('/dashboard/:storeName',[
    validarJWT
], dashboardLocal);



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


//rutas de pago

// router.post("/subscription", function (req, res, next) {
//     PaymentInstance.getSubscriptionLink(req, res);
//   });

module.exports = router;



