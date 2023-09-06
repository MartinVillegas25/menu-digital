const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

// const { socketController } = require('../sockets/controller');

class Server {

    constructor(){
        this.app = express();
        
        this.paths={
            main: '/',
            dashboardLocal: '/dashboard-local',  
        }
        this.middelewares();
        this.router();
        // this.io     = require('socket.io')( this.server );
        
        this.port = process.env.PORT ;
    }

    middelewares(){

        //para obtener datos del front en json
        this.app.use(express.json());
        
        //directorio static
        this.app.use(express.static('public'));
        this.app.use(cors());

        //subida de imagenes
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : './uploads',
            createParentPath: true,
        }));
    }

    router(){
        this.app.use(this.paths.main, require('../routes/routes'))
        
    }
    // sockets() {

    //     this.io.on('connection', socketController );

    // }
    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port', this.port);
        });

    }
  

    

}

module.exports = Server;