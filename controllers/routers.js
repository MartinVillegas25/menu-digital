    const { response } = require('express');
    const bcrypt = require('bcryptjs');
const pool = require('../database');
const { validationResult } = require('express-validator');
const generarJWT = require('../middlerwares/generar-jwt');
const emailer = require('./nodemailer')


//controllers y services payments
//rutas payments

const PaymentService = require("../services/paymentServices");
const sendMail = require('./nodemailer');



//ruta get del home
const homeGet = (req, res = response) => {
    res.json('home')
}




//ruta post del usuario, validad usuario antes de entrar al dashboard del local o administrador
const loginUsuario = async (req, res = response) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send(error)
    }
    
    const { email, password } = req.body;
    

    const query = 'SELECT * FROM usuarios WHERE email = ?';
   
    try {
        const result = await pool.query(query, [email]);
        console.log(result[0].length)
            if (result[0].length === 0){
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        const user = result[0][0];
        console.log(user)

         //validar el estado, si es falso, el usuario esta supendido y no puede ingresar
         if(user.status === 0){
            res.status(404).send({
                message: 'El usuario a sido suspendido por falta de pago, por favor regularice su situacion y contancte al administrador'
            })
        }

        //validad clave
        const validPassword = bcrypt.compareSync(password, user.password);

        //generar token
        const token = await generarJWT(user.email);
            
        if (validPassword) {
            switch (user.email) {
                case 'example@example.com':
                    console.log({ 
                        message: 'Inicio de sesión exitoso admin',
                        token
                 });
                    res.json({token});
                    break;
            
                default:
                    res.redirect(`/dashboard/${user.email}`);
                    console.log({ 
                        message: 'Inicio de sesión exitoso local',
                        token
                     });
                    //redireccion al dashboard del local
                    break;
            }
            
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
            

        
    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
            return res.status(500).json({ message: 'Error en el servidor' });
    }      
   

}

//payment de  mercado pago

class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getSubscriptionLink(req, res) {

      const {email, plan} = req.body;
      
      
      try {
        const query2 = 'SELECT * FROM planes'
        const planesActulizados = await pool.query(query2)

        console.log(planesActulizados)
        let valor = 0;
          if (plan === 'standard'){
            valor= planesActulizados[0][0].standard;
        }else if( plan==='premium'){
            valor= planesActulizados[0][0].premium;
        }else{
            valor=0;
        }

        const subscription = await this.subscriptionService.createSubscription(email, valor);
        
        console.log(subscription.init_point)
        return res.redirect(subscription.init_point);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }

  const PaymentInstance = new PaymentController(new PaymentService());

//ruta para guardar un nuevo usuario

const postUsuario = async(req, res = response) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }


       let { img, name, storeName, email, password, address, cp, plan, date, telefono, pais, localidad, tipo, comentario } = req.body
      

       //verificar si el correo existe 
       const searchEmail = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
       const result = await pool.query(searchEmail, [email]);
       
       if (result[0][0].count>0){
           return res.status(404).json({ message: `El usuario con el email: ${email} ya esta registrado`  });
       }

       //verificar si el nombre local existe
       const searchName = 'SELECT COUNT(*) AS count FROM usuarios WHERE storeName = ?';
       const result2 = await pool.query(searchName, [storeName]);
       
       if (result2[0][0].count>0){
           return res.status(404).json({ message: `El usuario con el email: ${storeName} ya esta registrado, eliga otro nombre`  });
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
       const queryresult = 'SELECT * FROM usuarios WHERE email = ? AND storeName = ?';
       try {
             const result = await pool.query(query, [ img, name, storeName, email, password, address, cp, plan , date, telefono, pais, localidad, tipo, comentario]);
             const resultResult = await pool.query(queryresult, [ email, storeName])

             PaymentInstance.getSubscriptionLink(req, res);
            
             
             return;
       } catch (error) {
            console.log(error);
            res.status(400).send('error en obtener datos')
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
    let email = req.params.email


    const query =  'SELECT * FROM usuarios WHERE email = ?';
    try {
        const result = await pool.query(query, [email]);
        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            res.status(200).send(`dashboard de ${email}`);
        }

        
    } catch (error) {
        console.log(error);
        res.status(400).send('error en la peticion')
    }
}

//ruta get admin dashboard 
const adminGet = (req, res = response) => {

    res.send('admin')
    
}



//ruta para suspender cuenta en dashboard del admin

const suspenderCuenta = async(req,res)=>{
    const {storeName} =  req.body;

    const query = 'UPDATE usuarios SET status = false WHERE storeName = ?';

    try {
        const result = await pool.query(query, [storeName]);

        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{

            
            res.send(`el cliente ${storeName} a sido suspendido`);
        }



    } catch (error) {
        console.log(error);
        res.status(500).send('error en la suspencion de cuenta')
    }
}

//ruta para activar cuenta en dashboard del admin

const activarCuenta = async(req,res)=>{
    const {storeName} =  req.body;

    const query = 'UPDATE usuarios SET status = true WHERE storeName = ?';

    try {
        const result = await pool.query(query, [storeName]);

        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{

            
            res.send(`el cliente ${storeName} a sido activado`);
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
    const usuarioActualizado = req.storeName 

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
        sql += ` WHERE storeName = ?`; 
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


//actualizar valores de planes 
const nuevosValores = async (req, res)=>{
    const {standard, premium} = req.body;

    const query = 'UPDATE planes SET standard = ?, premium = ?, basic = ? ';
    const query2 = 'SELECT * FROM planes'

    try {
        const result = await pool.query(query, [standard, premium, basic]);
        console.log(result);
        if (result.length === 0){
            return res.status(404).json({ message: 'planes no encontrados' });
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
        emailer.sendMail(correo)
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
PaymentController,
recuperarClave,
mostrarPlanes,
adminGet



}