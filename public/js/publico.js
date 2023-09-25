
// Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');



const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('email') ) {
    window.location = 'index.html';
    throw new Error('El email es obligatorio');
}



const usuario ={
    email:searchParams.get('email')
}

const socket = io();

socket.on('connect', () => {
    console.log('conectado a la sala' + usuario.email);  
    // Unirse a la sala de llamar a la camarera
    socket.emit('join-room', { room: usuario.email + '-llamar-camarera' });

    // Unirse a la sala de pedir la cuenta
    socket.emit('join-room', { room: usuario.email + '-pedir-cuenta' });
});

socket.on('disconnect', () => {
   console.log('desconectado');
});
socket.emit('join-room', { room: usuario.email });


socket.on('estado-actual', (payload) => {
    console.log('payload', payload);
    // const audio = new Audio('./audio/new-ticket.mp3');
    // audio.play();

    const email = searchParams.get('email');
    console.log(payload[email][0])

    if (payload[email][0]) {
        lblTicket1.innerText = payload[email][0];
    }

    if (payload[email][1]) {
        lblTicket2.innerText = payload[email][1];
    }

    if (payload[email][2]) {
        lblTicket3.innerText = payload[email][2];
    }

    if (payload[email][3]) {
        lblTicket4.innerText = payload[email][3];
    }
});
