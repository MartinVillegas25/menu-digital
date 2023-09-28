// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

export default function Call() {
	// const [ticket, setTicket] = useState('');

	// const socket = io('http://localhost:5173');
	// console.log(socket);

	// const handleLlamarCamarera = () => {
	// 	socket.emit('llamar-camarera', {
	// 		mesa: 'Mesa 1',
	// 		email: 'correo@example.com'
	// 	});
	// };

	// useEffect(() => {
	// 	socket.on('connect', () => {
	// 		console.log('Conectado al servidor Node.js');
	// 	});

	// 	socket.on('respuesta', (data) => {
	// 		console.log('Respuesta del servidor:', data);
	// 	});

	// 	socket.on('ticket', (payload) => {
	// 		setTicket('Mesa ' + payload);
	// 	});

	// 	socket.emit('mensaje', 'Hola desde el cliente React');

	// 	return () => {
	// 		socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
	// 	};
	// }, []);

	return (
		// <div>
		// 	<h1>Escritorio</h1>
		// 	<small>{ticket}</small>
		// 	<h2>Menu Restaurante</h2>
		// 	<button onClick={handleLlamarCamarera} className="btn btn-primary">
		// 		Llamar a la camarera
		// 	</button>
		// 	<hr />
		// </div>
		<div>Llamar camarera</div>
	);
}
