import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Call.css';
import { PiCallBellDuotone } from 'react-icons/pi';
import swal from 'sweetalert';
const socket = io();
//const socket = io('https://menu-didactico.up.railway.app/');

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

	const usuario = {
		email: userEmail,
		mesa: mesa
	};
	// Funcion para enviar la alerta de llamar camarera

	const handleSubmit = (e) => {
		e.preventDefault();
		swal({
			title: 'Llamar',
			text: 'Desea llamar a la camarera?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				socket.emit('llamar-camarera', usuario, payload);
				swal({
					text: `La camarera vendra en un momento`,
					icon: 'success'
				});
			} else {
				swal({ text: 'no se ha llamado a la camarera', icon: 'info' });
			}
		});
	};

	return (
		<div className="call-container">
			<div>
				<h2 className="call-text">
					Desea llamar al camarero/a? presione el siguiente boton
				</h2>
			</div>
			<p>Llamar camarero/a</p>
			<button onClick={handleSubmit} className="call-btn">
				<PiCallBellDuotone className="call-logo" />
			</button>
		</div>
	);
}
