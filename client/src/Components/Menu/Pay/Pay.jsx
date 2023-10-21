import { useState } from 'react';
import './Pay.css';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io();

export default function Pay() {
	const [nombre, setNombre] = useState('');
	const [payMethod, setPayMethod] = useState('');

	const handleSetName = (e) => {
		setNombre(e.target.value);
	};

	const handleSetMethod = (e) => {
		setPayMethod(e.target.value);
	};

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
	// Enviar el pedido de cuenta al dashboard del cliente
	const handleSubmit = () => {
		socket.emit(
			'pedir-cuenta',
			usuario,
			{ nombre: nombre, metodo: payMethod },
			payload
		);
	};

	return (
		<div className="pay-container">
			<div className="pay-username">
				<label htmlFor="">Indique su nombre para continuar</label>
				<input type="text" value={nombre} onChange={handleSetName} />
			</div>

			<div className="payment-type-container">
				<h2>Seleccione el metodo de pago</h2>
				<select name="payment-type" id="" onClick={handleSetMethod}>
					<option value="-">-</option>
					<option value="efectivo">Efectivo</option>
					<option value="debito">Debito</option>
					<option value="credito">Credito</option>
					<option value="otro">Otro</option>
				</select>
			</div>

			{nombre === '' || payMethod === '' || payMethod === '-' ? (
				<div>Ingrese su nombre y el metodo de pago</div>
			) : (
				<button className="payment-btn" onClick={handleSubmit}>
					Pedir la cuenta
				</button>
			)}
			<a href="">Volver al menú</a>
		</div>
	);
}
