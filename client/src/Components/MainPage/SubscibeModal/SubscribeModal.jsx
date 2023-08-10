/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './SubscribeModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/actions';
import img from '../../../assets/restaurant.jpg';

// eslint-disable-next-line react/prop-types
export default function SubsbribeModal({ handleCloseSuscribe }) {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		img: '',
		name: '',
		storeName: '',
		email: '',
		password: '',
		address: '',
		cp: 0,
		plan: ''
	});

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// Regular expression for email validation
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		// Check if any of the required fields are empty or null
		if (
			input.name.trim() === '' ||
			input.address.trim() === '' ||
			input.storeName.trim() === '' ||
			input.email.trim() === '' ||
			!emailRegex.test(input.email) || // Check if email is valid
			input.cp === 0 ||
			input.password.trim() === '' ||
			input.plan.trim() === '' ||
			input.img.trim() === ''
		) {
			// Display an error message or perform any other action
			alert(
				'Please complete all required fields with valid information before submitting.'
			);
			return; // Exit the function if validation fails
		}

		// If all validation checks pass, dispatch the user creation action
		dispatch(createUser(input));
		console.log(input, 'input');

		// Clear the input fields after submission
		setInput({
			img: '',
			name: '',
			storeName: '',
			email: '',
			password: '',
			address: '',
			cp: 0,
			plan: ''
		});
	};

	return (
		<div className="subscribe">
			<button className="subscribe-close-btn" onClick={handleCloseSuscribe}>
				X
			</button>
			<div className="subscribe-container">
				<div className="subscribe-input">
					<h1>
						Bienvenido a <span>Nombre compañia</span>
					</h1>
					<p>
						Si ya tenes una cuenta <a href="">Inicia Sesion</a>
					</p>

					<div>
						<p>Ingresá tu email para formar parte:</p>

						<input
							type="text"
							name="email"
							id=""
							value={input.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p>Ingresa una contraseña para iniciar tu suscripcion:</p>
						<input
							type="password"
							name="password"
							id=""
							value={input.password}
							onChange={handleChange}
						/>
						<p>Repeti la contraseña:</p>
						<input type="password" id="" />
					</div>
					<p>Complete los siguientes datos:</p>
					<div className="subs-data">
						<div className="subs-data-container">
							<input
								type="text"
								placeholder="Nombre completo"
								name="name"
								className="subs-input"
								value={input.name}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Nombre del local"
								name="storeName"
								className="subs-input"
								value={input.storeName}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Direccion"
								name="address"
								className="subs-input"
								value={input.address}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Codigo Postal"
								name="cp"
								className="subs-input"
								value={input.cp}
								onChange={handleChange}
							/>

							<input
								type="url"
								placeholder="Foto perfil"
								name="img"
								className="subs-input"
								value={input.img}
								onChange={handleChange}
							/>
						</div>
					</div>
					<p>Selecciona el plan ideal para ti:</p>
					<div className="subs-plans">
						<select name="plan" id="" onClick={handleChange}>
							<option value="basic">Basico</option>
							<option value="standard">Estandar</option>
							<option value="premium">Premium</option>
						</select>
					</div>
					<div className="subs-btn-container">
						<button className="subs-btn" onClick={handleSubmit}>
							Finalizar
						</button>
					</div>
				</div>
				<div>
					<img src={img} alt="" className="subs-img" />
				</div>
			</div>
		</div>
	);
}
