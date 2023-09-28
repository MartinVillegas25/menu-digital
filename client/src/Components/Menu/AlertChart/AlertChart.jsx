// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// export default function AlertChart() {
// 	const [ticket, setTicket] = useState('');

// 	useEffect(() => {
// 		const socket = io('http://localhost:5173');
// 		console.log(socket);
// 		socket.on('connect', () => {
// 			console.log('Conectado a la sala');
// 		});

// 		socket.on('disconnect', () => {
// 			console.log('Desconectado');
// 		});

// 		// Escuchar el evento 'ticket' y actualizar el estado del ticket
// 		socket.on('ticket', (payload) => {
// 			setTicket('Mesa ' + payload);
// 		});

// 		return () => {
// 			socket.disconnect();
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<h1>Pantalla del Público</h1>
// 			<p>{ticket}</p>
// 			{/* Otro contenido de la pantalla del público */}
// 		</div>
// 	);
// }
