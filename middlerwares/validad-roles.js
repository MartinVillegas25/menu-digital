const { response } = require("express");


const adminRol = (req, res=response, next)=>{
    const email = req.email;
    if(!req.email){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin generar el token'
        })
    }

    if(email !== 'example@example.com'){
        return res.status(400).redirect('/')
    }
    
    next();

}


module.exports = adminRol;