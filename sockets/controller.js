const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();



const socketController = (socket, io) => {

    socket.on('connect', ({ room }) => {
        socket.to(room).emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.mesas.length);
        socket.to(room).emit( 'tickets-pendientes', ticketControl.mesas.length);
    });

    socket.on('join-room', ({ room }) => {
        socket.join(room); // Unir el socket a la sala especificada
        console.log( "sala" , room);
    });


    socket.on('llamar-camarera', (usuario, callback) => {
        const salaLlamarCamarera = usuario.email + '-llamar-camarera';

        // Unir el socket a la sala correspondiente
        socket.join(salaLlamarCamarera);
        
        console.log('Usuario llamar camarera', usuario)
         const siguiente = ticketControl.siguiente(usuario.mesa, usuario.email);
        callback( siguiente );


             if ( !usuario.mesa ) {
            return callback({
                ok: false,
                msg: 'La mesa es obligatoria'
            });
        }
        

        const ticket = ticketControl.llamarCamerera( usuario.email, usuario.mesa );
        console.log('ticket de ticket control', ticket)
        
        socket.to(salaLlamarCamarera).emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.mesas.length);
        socket.to(salaLlamarCamarera).emit( 'tickets-pendientes', ticketControl.mesas.length);

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'No hay Alertas pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });

    socket.on('pedir-cuenta', (usuario, data, callback) => {
        
        const salaPedirCuenta = usuario.email + '-pedir-cuenta';

        // Unir el socket a la sala correspondiente
        socket.join(salaPedirCuenta);

        const { nombre, metodo } = data;
        console.log({ nombre, metodo });
    
    
        const respuesta = ticketControl.guardarPedirCuenta(usuario.email, usuario.mesa, nombre, metodo );
        callback(respuesta);

        const ticket = ticketControl.pedirCuenta( usuario.mesa, nombre, usuario.email, metodo );
        console.log('ticket de ticket control', ticket)

        socket.to(salaPedirCuenta).emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.mesas.length);
        socket.to(salaPedirCuenta).emit( 'tickets-pendientes', ticketControl.mesas.length);
    });

    socket.on('atender-ticket', (comensal, callback) => {
        if (!comensal.mesa) {
            return callback({
                ok: false,
                msg: 'El mesa es obligatoria'
            });
        }
        console.log('hola');
    
    });
   

        

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const mesa = payload.mesa
        const siguiente = ticketControl.siguiente(mesa);
        callback( siguiente );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.mesas.length);

    });

    
}



module.exports = {
    socketController
}



