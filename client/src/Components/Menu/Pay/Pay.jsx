import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { BsDashCircle } from 'react-icons/bs';
import './Pay.css';

export default function Pay() {
	const [number, setNumber] = useState(0);
	const handleAdd = () => {
		setNumber(number + 1);
	};
	const handleQuit = () => {
		setNumber(number - 1);
	};
	return (
		<div className="pay-container">
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
				<select name="payment-type" id="">
					<option value="">Efectivo</option>
					<option value="">Debito</option>
					<option value="">Credito</option>
					<option value="">Otro</option>
				</select>
			</div>
			<div className="payment-total-container">
				<h3>Total:</h3>
				<h4>$0000</h4>
			</div>
			<button className="payment-btn">Pagar</button>
			<a href="">Volver al menu</a>
		</div>
	);
}
