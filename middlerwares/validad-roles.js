const { response } = require("express");


const adminRol = (req, res=response, next)=>{

    if(!req.email){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin generar el token'
        })
    }

    const email = req.email;

    if(email !== 'example@example.com'){
        return res.status(400).json({
            msg:`el usuario con el mail: ${email} no esta autorizado a ingresar a este dashboard`
        })
    }
    



    next();

}


module.exports = adminRol;