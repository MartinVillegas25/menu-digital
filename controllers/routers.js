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
    

    const query = 'SELECT * FROM usuarios WHERE email = email';
   
    try {
        const result = await pool.query(query);
            if (result.length === 0){
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        const user = result[0][0];

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


       let {   img, name, storeName, email, password, address, cp, basic, standard, premium, date } = req.body
      

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

       const query = `INSERT INTO usuarios (img, name, storeName, email, password, address, cp, basic, standard, premium, date ) VALUES (?, ?, ?, ?, ? , ? , ? , ?, ?, ?, ?)`;
       try {
             const result = await pool.query(query, [ img, name, storeName, email, password, address, cp, basic, standard, premium, date]);
             res.json('usuario creado');
             
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

module.exports = {
    homeGet,
    loginUsuario,
    dashboardLocal,
    postUsuario,
    mostrar
    
}