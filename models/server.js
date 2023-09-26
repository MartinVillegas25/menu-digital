const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { socketController } = require('../sockets/controller');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );
        this.paths={
            main: '/'
        }
        //middlewares
        this.middelewares();

        //routers
        this.router();
        

        // Sockets
        this.sockets();
    }

    middelewares(){
        const corsOptions = {
            origin: 'http://127.0.0.1:5173', // Cambia esto por la URL real de tu cliente React en Vite
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          };

        //directorio static
        this.app.use(express.static('public'));
          
        this.app.use(cors(corsOptions));
       

        //para obtener datos del front en json
        this.app.use(express.json());
        

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
    sockets() {

        this.io.on('connection', socketController);

    }
    listen(){
        this.server.listen(this.port, () => {
            console.log('listening on port', this.port);
        });

    }
  

    

}

module.exports = Server;