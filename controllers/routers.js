    const { response } = require('express');
    const bcrypt = require('bcryptjs');
const pool = require('../database');
const { validationResult } = require('express-validator');
const generarJWT = require('../middlerwares/generar-jwt');


//controllers y services payments
//rutas payments
const PaymentController = require("../controllers/payment");
const PaymentService = require("../services/paymentServices");

const PaymentInstance = new PaymentController(new PaymentService());

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
        const token = await generarJWT(user.storeName);
            
        if (validPassword) {
            switch (user.email) {
                case 'example@example.com':
                    res.redirect(`/dashboard/${user.email}`);
                    console.log({ 
                        message: 'Inicio de sesión exitoso admin',
                        token
                 });
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


//ruta para guardar un nuevo usuario

const postUsuario = async(req, res = response) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }


       let { img, name, storeName, email, password, address, cp, plan, date } = req.body
      

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

       const query = `INSERT INTO usuarios (img, name, storeName, email, password, address, cp, plan, date ) VALUES (?, ?, ?, ?, ? , ? , ? , ?, ?)`;
       const queryresult = 'SELECT * FROM usuarios WHERE email = ? AND storeName = ?';
       try {
             const result = await pool.query(query, [ img, name, storeName, email, password, address, cp, plan , date]);
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


//ruta get para el dashboard local
const dashboardLocal = async(req, res) => {
    let email = req.params.storeName


    const query =  'SELECT * FROM usuarios WHERE storeName = ?';
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




}