const express = require('express');
const cors = require('cors');



class Server {

    constructor(){
        this.app = express();
        this.middelewares();
        this.router();
        this.port = process.env.PORT ;
    }

    router(){
        this.app.use('/', require('../routes/routes'))
        // this.app.use('/dashboard', require('../routes/router-local'))
        
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port', this.port);
        });

    }
    middelewares(){

        //para obtener datos del front en json
        this.app.use(express.json());
        
        //directorio static
        this.app.use(express.static('public'));
        this.app.use(cors());

    }

    

}

module.exports = Server;