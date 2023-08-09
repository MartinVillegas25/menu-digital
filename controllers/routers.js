    const { response } = require('express');
    const bcrypt = require('bcryptjs');
const pool = require('../database');
const { validationResult } = require('express-validator');

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
            
        if (validPassword) {
            switch (user.email) {
                case 'example@example.com':
                    return res.json({ message: 'Inicio de sesión exitoso admin' });
                //redireccion al dashboard del admin
                    break;
            
                default:
                    return res.json({ message: 'Inicio de sesión exitoso local' });
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
             console.log(resultResult);
             const planElegido = resultResult[0][0].plan
             console.log(planElegido);

             switch (planElegido) {
                case "basic":
                    res.send('usuario creado, pagar plan basic')
                    break;
                case "standard":
                     res.send('usuario creado, pagar plan standard')
                    break;
                case "premium":
                    res.send('usuario creado, pagar plan premium')
                    break;   
             
                default:
                    break;
             }
            
             
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
    let storeName = req.params.storeName

    const query =  'SELECT * FROM usuarios WHERE storeName = storeName';
    try {
        const result = await pool.query(query);
        if (result.length === 0){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            res.send(`dashboard de ${storeName}`);
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

module.exports = {
homeGet,
loginUsuario,
dashboardLocal,
postUsuario,
mostrar,
suspenderCuenta,
activarCuenta,
newPassword

}