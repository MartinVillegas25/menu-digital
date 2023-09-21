
// Referencias HTML
const lblMesa = document.querySelector('h1');
const btnAtender    = document.querySelector('#llamarCamareraButton');
const pedirCuentaForm = document.querySelector('form');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');






const searchParams = new URLSearchParams( window.location.search );

// if ( !searchParams.has('mesa') && !searchParams.has('email') ) {
//     // window.location = 'index.html';
//     throw new Error('El mesa y email es obligatorio');
// }

const usuario = {
    mesa : searchParams.get('mesa'),
    email : searchParams.get('email')

}

lblMesa.innerText = usuario.mesa;




const socket = io();


socket.on('connect', () => {
    console.log('conenctado menu');

});

socket.on('disconnect', () => {
    console.log('disconnect');
});





btnAtender.addEventListener( 'click', () => {
  
    socket.emit( 'llamar-camarera', usuario, ( payload ) => {       

        lblTicket.innerText = 'Mesa' + payload;
        
    });
    
});



const nombre = document.querySelector('#nombre');
const total = document.querySelector('#total');
const pago = document.querySelector('#pago');
const personas = document.querySelector('#personas');

pedirCuentaForm.addEventListener( 'submit', (e) => {
    e.preventDefault();
    
    const nombreValor = nombre.value;
    const totalValor = total.value;
    const pagoValor = pago.value;
    const personasValor = personas.value;

    socket.emit('pedir-cuenta', usuario, { nombre: nombreValor, total: totalValor, pago: pagoValor, personas: personasValor }, (response) => {      
        console.log(response);
    });
    
});