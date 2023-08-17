const jwt = require('jsonwebtoken');

const { response } = require('express');


const validarJWT = async ( req, res=response, next ) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).redirect('/');
    }


    
    try {
        const {email} = jwt.verify(token, process.env.SECRETORPUBLIC_KEY);
        console.log(email);
        req.email = email



        next();
    } catch (error) {
        console.error(error);
        res.status(401).redirect('/');
        console.error('token no valido');
    }

    console.log(token);


}

module.exports = validarJWT;