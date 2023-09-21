const path = require('path');
const fs   = require('fs');

class Ticket {
    constructor( mesa, email ) {
        this.mesa = mesa;
        this.email = email;
    }
}


class TicketControl {


    constructor() {
        this.ultimaMesa   = 0;
        this.hoy      = new Date().getDate(); // 11
        this.mesas  = [];
        this.ultimos4 = [];

        this.init();
    }


    get toJson() {
        return {
            ultimaMesa: this.ultimaMesa,
            hoy: this.hoy,
            mesas: this.mesas,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { hoy, mesas, ultimaMesa, ultimos4 } = require('../db/data.json');
        if ( hoy === this.hoy ) {
            this.mesas  = mesas;
            this.ultimaMesa   = ultimaMesa;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

    }

    siguiente(mesa, email) {
        this.ultimo = mesa ;
        const ticket = new Ticket( this.ultimo, email );
        this.mesas.push( ticket );

        this.guardarDB();
        return 'Mesa ' + ticket.mesa;
    }


    // Nuevo método para solicitar atención de la camarera
    llamarCamerera(mesa, email) {
        
        const ticket = this.mesas.shift(); // this.tickets[0];
        ticket.mesa = 'Camarera Mesa ' + mesa;
        
            

        this.ultimos4.unshift( ticket.mesa);

        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        console.log(ticket.mesa)
        return ticket;
    }

    // Nuevo método para enviar la cuenta
    guardarPedirCuenta(email, mesa, nombre, total, pago, personas) {
        const ticket = new Ticket(mesa, email);
        ticket.nombre = nombre;
        ticket.total = total;
        ticket.metodoPago = pago;
        ticket.cantidadPersonas = personas;
        this.mesas.push(ticket);
        this.guardarDB();
        return ticket;
    }


    // Nuevo método para pedir cuenta
    pedirCuenta(mesa, nombre, total, pago, personas) {
        
        const ticket = this.mesas.shift(); // this.tickets[0];
        ticket.mesa = `Cuenta en mesa ${mesa}, ${nombre}, Total: ${total}, Metodo de Pago : ${pago}, personas: ${personas}`; 

        this.ultimos4.unshift( ticket.mesa);

        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        console.log(ticket.mesa)
        return ticket;
    }


}



module.exports = TicketControl;