import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io();

export default function Call() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	const mesa = searchParams.get('mesa');
	const payload = () => {
		console.log('emitiendo');
	};

	socket.on('connect', () => {
		console.log('conectado');
	});

	const usuario = { email: userEmail, mesa: mesa };
	console.log(usuario);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('llamar');
		socket.emit('llamar-camarera', usuario, payload);
	};

	return (
		<div>
			<h1>Pantalla del Público</h1>

			<button onClick={handleSubmit}>Llamar camarera</button>
		</div>
	);
}
