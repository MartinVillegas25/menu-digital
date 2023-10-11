import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { BsDashCircle } from 'react-icons/bs';
import './Pay.css';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io();
export default function Pay() {
	const [number, setNumber] = useState(0);
	const [nombre, setNombre] = useState('');
	const [payMethod, setPayMethod] = useState('');

	console.log(nombre, payMethod);
	const handleAdd = () => {
		setNumber(number + 1);
	};
	const handleQuit = () => {
		setNumber(number - 1);
	};

	const handleSetName = (e) => {
		setNombre(e.target.value);
	};

	const handleSetMethod = (e) => {
		setPayMethod(e.target.value);
	};

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	console.log('location:', location);
	console.log('searchParams:', searchParams.toString()); // Verifica qué parámetros de consulta se están pasando

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

	const handleSubmit = () => {
		console.log('user', usuario);
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
			<div className="pay-square">
				<p>Seleccione el numero de comensales para dividir</p>
			</div>
			<div className="amount-dinners">
				<button onClick={handleQuit}>
					<BsDashCircle className="dinner-btn" />
				</button>
				<h1>{number}</h1>
				<button onClick={handleAdd}>
					<BsPlusCircle className="dinner-btn" />
				</button>
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
			<div className="payment-total-container">
				<h3>Total:</h3>
				<h4>$0000</h4>
			</div>
			{nombre === '' || payMethod === '' || payMethod === '-' ? (
				<div>Ingrese su nombre y el metodo de pago</div>
			) : (
				<button className="payment-btn" onClick={handleSubmit}>
					Pedir la cuenta
				</button>
			)}

			<a href="">Volver al menu</a>
		</div>
	);
}
