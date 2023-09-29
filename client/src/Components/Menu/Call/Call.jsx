import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Call() {
	const [mensaje, setMensaje] = useState('');
	const [mensajes, setMensajes] = useState([]);

	const socket = io('/');

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('mensaje', mensaje);
	};

	useEffect(() => {
		socket.on('mensaje', (mensaje) => {
			console.log(mensaje);
			setMensajes([...mensajes, mensaje]);
		});
	}, []);

	return (
		<div>
			<form action="" onSubmit={handleSubmit}>
				<input type="text" onChange={(e) => setMensaje(e.target.value)} />
				<button>enviar</button>
			</form>
			<ul>
				{mensajes?.map((m, i) => (
					<li key={i}>{m}</li>
				))}
			</ul>
		</div>
	);
}
