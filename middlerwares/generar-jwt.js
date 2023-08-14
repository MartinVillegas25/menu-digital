const jwt = require('jsonwebtoken');

const generarJWT = (storeName)=>{
    return new Promise((resolve, reject)=>{
        const payload = {storeName};

    jwt.sign(payload, process.env.SECRETORPUBLIC_KEY, 
        {
            expiresIn: '1h'
        },
        (err, token)=>{
            if (err){
                console.error(err);
                reject('Error signing');
            }
            else{
                resolve(token);
            }
        }
    );

    })
}

module.exports = generarJWT;

