    const { response } = require('express');
const pool = require('../database');

//ruta get del home
const homeGet = (req, res = response) => {
    res.json('home')
}

//ruta get del login
const loginGet = (req, res = response) => {
    res.json('login')
}

//ruta post del usuario, validad usuario antes de entrar al dashboard
const loginUsuario = async (req, res = response) => {
    
    const { nombre, password } = req.body;
    

    const query = 'SELECT * FROM usuarios WHERE nombre = nombre';
   
    try {
        const result = await pool.query(query);
            if (result.length === 0){
                return res.status(404).json({ message: 'Usuario no encontrado' });

            }
        const user = result[0][0];
        console.log(user)
            if (user.password === password) {
                return res.json({ message: 'Inicio de sesión exitoso' });
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

        
    } catch (error) {
        console.error('Error al ejecutar la consulta: ', error);
            return res.status(500).json({ message: 'Error en el servidor' });
    }      
   

}

const subcripcion = {

}

module.exports = {
    homeGet,
    loginGet,
    loginUsuario
    
}