
// Referencias HTML
const lblMesa = document.querySelector('h1');
const btnAtender    = document.querySelector('#llamarCamareraButton');
const pedirCuentaForm = document.querySelector('form');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');






const searchParams = new URLSearchParams( window.location.search );


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
const metodo = document.querySelector('#metodo');


pedirCuentaForm.addEventListener( 'submit', (e) => {
    e.preventDefault();
    
    const nombreValor = nombre.value;
    const metodoValor = metodo.value;

    socket.emit('pedir-cuenta', usuario, { nombre: nombreValor, metodo: metodoValor }, (response) => {      
        console.log(response);
    });
    
});