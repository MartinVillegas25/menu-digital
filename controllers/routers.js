    const { response } = require('express');
    const bcrypt = require('bcryptjs');
const pool = require('../database');
const { validationResult } = require('express-validator');
const generarJWT = require('../middlerwares/generar-jwt');
const emailer = require('./nodemailer')

const fs = require('fs-extra');

//controllers y services payments
//rutas payments

// const PaymentService = require("../services/paymentServices");
const sendEmail = require('./nodemailer');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );




//ruta get del home
const homeGet = (req, res = response) => {
    res.json('home')
}
//get de la pagina de agregar cuenta como administrador 
const loginAdminGet = (req, res = response) => {
    res.json('get admin login')
}
//ruta POST  crear cuenta administrador

const postCrearAdmin = async (req, res = response) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send(error)
    }


   let { img, name, email, password } = req.body
  

   //verificar si el correo existe 
   const searchEmail = 'SELECT COUNT(*) AS count FROM administradores WHERE email = ?';
   const result = await pool.query(searchEmail, [email]);
   
   if (result[0][0].count>0){
       return res.status(404).json({ message: `El usuario con el email: ${email} ya esta registrado`  });
   }

   if(req.files){
    const { tempFilePath } = req.files.img

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
    img_url = secure_url;
    
    } else{
        img_url = 'https://res.cloudinary.com/dj3akdhb9/image/upload/v1695818870/samples/placeholder_profile_jhvdpv.png';
        
    }

   //encriptar password
    const salt = bcrypt.genSaltSync()
    password = bcrypt.hashSync(password, salt)



   //guardar en base de datos

   const query = `INSERT INTO administradores (img, name, email, password ) VALUES (?, ?, ?, ? )`;
   try {
    const result = await pool.query(query, [img_url, name, email, password]);
        const response = {
            message: "Administrador creado correctamente",
            redirectTo: "/"
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al obtener datos');
    }

}



//ruta post del usuario, validad usuario antes de entrar al dashboard del local o administrador
const loginUsuario = async (req, res = response) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send(error)
    }
    
    const { email, password } = req.body;
    

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const queryAdmin = 'SELECT * FROM administradores WHERE email = ? '
   
    try {
        const resultGeneral = await pool.query(query, [email]);
        const resultAdmin = await pool.query(queryAdmin, [email]);

        const resultGeneralLength = resultGeneral[0].length;
        const resultAdminLength = resultAdmin[0].length;
        

        if(resultGeneralLength===0 & resultAdminLength===0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        //validad si es admin o usuario
        let user;

        if(resultGeneralLength != 0){
            user = resultGeneral[0][0];
            //validar el estado, si es falso, el usuario esta supendido y no puede ingresar
            if(user.status === 0){
               return res.status(404).redirect('/');
           }
        }else{
            user = resultAdmin[0][0];
        }
        
        
        console.log(user)
     


        //validad clave
        const validPassword = bcrypt.compareSync(password, user.password);

        //generar token
        const token = await generarJWT(user.email);
            
        if (validPassword) {
            const response = {
                token
            }
            res.status(200).json(response);
            
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
            

        
    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
            return res.status(500).json({ message: 'Error en el servidor' });
    }      
   

}

//payment de  mercado pago

// class PaymentController {
//     constructor(subscriptionService) {
//       this.subscriptionService = subscriptionService;
//     }
  
//     async getSubscriptionLink(req, res) {

//       const {email, plan} = req.body;
      
      
//       try {
//         const query2 = 'SELECT * FROM planes'
//         const planesActulizados = await pool.query(query2)

//         console.log("estado 1" , planesActulizados)
//         let valor = 0;
//           if (plan === 'standard'){
//             valor= planesActulizados[0][0].standard;
//         }else if( plan==='premium'){
//             valor= planesActulizados[0][0].premium;
//         }else{
//             valor=0;
//         }

//         const subscription = await this.subscriptionService.createSubscription(email, valor);
        
//         console.log("estado2 ", subscription.init_point)
//         return res.json(subscription.init_point);
//       } catch (error) {
//         console.log( "estado 3", error);
  
//         return res
//           .status(500)
//           .json({ error: true, msg: "Failed to create subscription" });
//       }
//     }
//   }

//   const PaymentInstance = new PaymentController(new PaymentService());



//ruta para guardar un nuevo usuario

const postUsuario = async(req, res = response) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }


       let { img, name, storeName, email, password, address, cp, plan, date, telefono, pais, localidad, tipo, comentario } = req.body
      

       //verificar si ya hizo la cuenta pero no realizo el pago
       const emailRegistrado = 'select * from usuarios where email = ?'
       const resultEmailRegistrado = await pool.query(emailRegistrado, [email]);

       if(resultEmailRegistrado[0].length > 0){
           
           const emailReg = resultEmailRegistrado[0][0];
           if(resultEmailRegistrado[0].length > 0 && emailReg.pagoConfirmado==0) {
                return res.status(404).json({
                    message: `el mail ${email} ya esta registrado, por favor realiza el pago de la suscripcion para poder acceder al dashboard`
                })
           }
       }
       
       
       

       //verificar si el correo existe 
       const searchEmail = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
       const result = await pool.query(searchEmail, [email]);
        

       if (result[0][0].count>0){
           return res.status(404).json({ message: `El usuario con el email: ${email} ya esta registrado`  });
       }


       //agregar imagen
       if(req.files){
        const { tempFilePath } = req.files.img
    
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        
        img_url = secure_url;
        
        } else{
            img_url = 'https://res.cloudinary.com/dj3akdhb9/image/upload/v1695818870/samples/placeholder_profile_jhvdpv.png';
            
        }

       //encriptar password
        const salt = bcrypt.genSaltSync()
        password = bcrypt.hashSync(password, salt)


        // determinar dia de alta
        let dia = new Date().getDate();
        let mes = new Date().getMonth();
        let year = new Date().getFullYear();
        date = `${dia}/ ${mes}/ ${year}`;
       //guardar en base de datos

       const query = `INSERT INTO usuarios (img, name, storeName, email, password, address, cp, plan, date, telefono, pais, localidad, tipo, comentario ) VALUES (?, ?, ?, ?, ? , ? , ? , ?, ?, ?, ? , ? , ? , ? )`;
      
       try {
             const result = await pool.query(query, [ img_url, name, storeName, email, password, address, cp, plan , date, telefono, pais, localidad, tipo, comentario]);
             
             res.status(200).json("usuario creado")

            //  PaymentInstance.getSubscriptionLink(req, res);
       } catch (error) {
            console.log(error);
            res.status(400).send('error en obtener datos')
       }
       

}

//ruta de agradecimiento despues del pago

const gracias = (req, res )=>{
    res.send('gracias por la compra');
}

//ruta de los webhook de mercado pago para guardar el estado a aprobado
// const receiveWebhook = async(req, res)=>{
//     try {
//         const payment = req.query;
//         console.log(payment);
//         if (payment.type === "payment") {
//           const data = await mercadopage.payment.findById(payment["data.id"]);
//           console.log(data);
//         }
    
//         res.sendStatus(204);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Something goes wrong" });
//       }
// };

// ruta confirmar pago
const confimarPago = async(req, res)=>{

    const email = req.email

    const {usuario} = req.query

    const query = 'UPDATE usuarios SET pagoConfirmado = true WHERE email = ?' 
    try {
        const result = await pool.query(query, usuario);
        res.status(200).json("confirmacion de pago realizada");


    } catch (error) {
        console.log(error, "error en obtener datos")
    }


}

//ruta para mostrar los usuarios

const mostrar = async(req, res) => {
    const query = 'SELECT * FROM usuarios';
    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        console.log(error, "error en obtener datos")
    }

}

//ruta para mostrar los usuarios a confirmar pago

const mostrarUsuarioConfirmar = async(req, res) => {
    const query = 'SELECT * FROM usuarios where pagoConfirmado = 0';
    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        console.log(error, "error en obtener datos")
    }

}


//ruta para mostrar usuario por estado 

const mostrarUsuarioPorEstado = async(req, res) => {
    let  {status} = req.body;
    if (status ==="activo"){
        status = 1
    }else {
        status = 0
    }
    const query = 'SELECT * FROM usuarios WHERE status =?';
    try {
        const result = await pool.query(query, [status]);
        res.json(result[0]);
    } catch (error) {
        console.log(error, "error en obtener datos")
    }

}

//ruta get para el dashboard local
const dashboardLocal = async(req, res) => {
    

    const email = req.email;
    const emailQuery = req.query.email
    const query =  'SELECT * FROM usuarios WHERE email = ?';
    

    try {
        const result = await pool.query(query, [email]);
        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            res.status(200).json({
                usuario: result[0][0],
                msg:'local',
                emailQuery
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).send('error en la peticion')
    }
}

//ruta get admin dashboard 
const adminGet = async (req, res = response) => {
    const email = req.email;
    const query =  'SELECT * FROM administradores WHERE email = ?';
    

    try {
        const result = await pool.query(query, [email]);
        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            res.status(200).json({
                usuario: result[0][0],
                msg:'admin'
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).send('error en la peticion')
    }
    
}

//ruta get configuracion

//ruta get admin dashboard 
const configGet = async (req, res = response) => {
    const email = req.email;
    const emailquery = req.query.email;

    const query =  'SELECT * FROM usuarios WHERE email = ?';
    

    try {
        const result = await pool.query(query, [emailquery]);
        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            res.status(200).json({
                usuario: result[0][0],
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).send('error en la peticion')
    }
    
}



//ruta para suspender cuenta en dashboard del admin

const suspenderCuenta = async(req,res)=>{
    const {email} =  req.body;

    const query = 'UPDATE usuarios SET status = false WHERE email = ?';

    try {
        const result = await pool.query(query, [email]);

        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{

            
            res.send(`el cliente ${email} a sido suspendido`);
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('error en la suspencion de cuenta')
    }
}

//ruta para activar cuenta en dashboard del admin

const activarCuenta = async(req,res)=>{
    const {email} =  req.body;

    const query = 'UPDATE usuarios SET status = true WHERE email = ?';

    try {
        const result = await pool.query(query, [email]);

        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{

            
            res.send(`el cliente ${email} a sido activado`);
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('error en la suspencion de cuenta')
    }
}

//actualizar clave

const newPassword = async (req, res)=>{
    const {email, password} = req.body;

    const query = 'UPDATE usuarios SET password = ? WHERE email = ?';

    try {
        const result = await pool.query(query, [email, password]);

        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{

            
            res.send(`la clave del usuario ${result[0][0].storeName} a sido actualizada`);
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('error en la suspencion de cuenta')
    }

}


const actualizarDatos =async (req, res)=>{
    const dataActualizada= req.body;
    const usuarioActualizado = req.email 

    try {
        let sql = `UPDATE usuarios SET`;
        let values = [];
        for (const key in dataActualizada) {
        if (key !== usuarioActualizado && dataActualizada.hasOwnProperty(key)) {
            sql += ` ${key} = ?, `;
            console.log(sql);
            values.push(dataActualizada[key]);
            console.log(values);
        }
        }
        sql = sql.slice(0, -2);
        sql += ` WHERE email = ?`; 
        values.push(usuarioActualizado); 

        const result= await pool.query(sql, values);
        console.log(result);
        res.status(200).json({message: 'usuario actualizado'});



    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'error en la actualizacion de usuario'
        })
        
    }

    

}

//ruta cambiar de plan usuario 

const mejorarPlan = async (req, res) => {
    const email = req.email;
    const {plan} = req.body;

    const query = 'UPDATE usuarios SET plan = ? WHERE email =?'

    try {
        const result = await pool.query(query, [plan, email]);
        const response = {
            message: "Plan actualizado, el administrador confirmara el pago para darle acceso a nuevas opciones",
            redirectTo: "/"
        };
        res.status(200).json(response);


    } catch (error) {
        console.error(error);
        res.status(500).json('error en actualizar plan');
    }

}


//ruta para confirmar pago por cambio de plan
// ruta confirmar pago
const confimarPagoPlan = async(req, res)=>{

    const email = req.email

    const {usuario} = req.query

    const query = 'UPDATE usuarios SET pagoCambioPlan = true WHERE email = ?' 
    try {
        const result = await pool.query(query, usuario);
        res.status(200).json("confirmacion de pago para cambio de plan confirmada");


    } catch (error) {
        console.log(error, "error en obtener datos")
    }


}
//actualizar valores de planes 
const nuevosValores = async (req, res)=>{
    const dataActualizada = req.body;
    const usuarioAdmin = req.email

    const query2 = 'SELECT * FROM planes'
    

    try {

        //actulizar solos los campos que se pusieron
        let sql = `UPDATE planes SET`;
        let values = [];
        for (const key in dataActualizada) {
        if (key !== usuarioAdmin && dataActualizada.hasOwnProperty(key)) {
            sql += ` ${key} = ?, `;
            console.log(sql);
            values.push(dataActualizada[key]);
            console.log(values);
        }
        }
        sql = sql.slice(0, -2);
       

        

        const result = await pool.query(sql, values);
        const planes = result[0].affectedRows;
        
        if (planes === 0){
                //actulizar solos los campos que se pusieron
            let sql2 = `INSERT INTO planes `;
            let values2 = [];
            for (const key in dataActualizada) {
            if (key !== usuarioAdmin && dataActualizada.hasOwnProperty(key)) {
                sql += ` ${key} = ?, `;
                console.log(sql);
                values.push(dataActualizada[key]);
                console.log(values);
            }
            }
            sql = sql.slice(0, -2);
         

            const nuevosPlanes = await pool.query(sql2, values2);
            res.status(201).json({
                nuevosPlanes
            })
        }
        else{
            const planesActulizados = await pool.query(query2)
            res.status(200).json(planesActulizados[0][0]);
            
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('error en la actualizacion de planes')
    }

}


//Get planes
const mostrarPlanes = async(req, res) => {
    const query = 'SELECT * FROM planes';
    try {
        const result = await pool.query(query);
        res.json(result[0][0]);
    } catch (error) {
        console.log(error, "error en obtener datos")
    }

}


//mandar mail para recuperar clave
const recuperarClave = async (req, res) => {

    const { email } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    
     try {
        const emailRecuperar = await pool.query(query, [email]);
        const mail = emailRecuperar[0][0];
        const correo = mail.email;
        console.log(correo) 
        if (emailRecuperar.length === 0) {    
            return res.status(404).json({ message: 'Correo electrónico no encontrado.' });
        }
        sendEmail(correo);
        res.status(200).json({ message: " Se ha enviado una emails con los pasos seguir para actualizar la clave"});
        } catch (error) {
          console.log(error);
              res.status(500).json('error al mandar mail')
        }      
    
}




module.exports = {
homeGet,
loginUsuario,
dashboardLocal,
postUsuario,
mostrar,
suspenderCuenta,
activarCuenta,
newPassword,
actualizarDatos,
mostrarUsuarioPorEstado,
nuevosValores,
// PaymentController,
recuperarClave,
mostrarPlanes,
adminGet,
configGet,
postCrearAdmin,
loginAdminGet,
// receiveWebhook,
gracias,
confimarPago,
mostrarUsuarioConfirmar,
mejorarPlan,
confimarPagoPlan



}