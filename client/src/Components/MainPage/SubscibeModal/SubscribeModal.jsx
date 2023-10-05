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
		cp: '',
		plan: '',
		telefono: '',
		pais: '',
		localidad: '',
		tipo: '',
		comentario: ''
	});

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};
	const [nameError, setNameError] = useState('');
	const [addressError, setAddressError] = useState('');
	const [storeNameError, setStoreNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [cpError, setCpError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// Regular expression for email validation
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		//Check if any of the required fields are empty or null
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

		// if (input.name.trim() === '') {
		// 	setNameError('por favor complete su nombre');
		// 	return;
		// } else if (input.address.trim() === '') {
		// 	setAddressError('Por favor complete su direccion');
		// 	return;
		// } else if (input.storeName.trim() === '') {
		// 	setStoreNameError('Por favor indique el nombre de su local');
		// 	return;
		// } else if (input.email.trim() === '') {
		// 	setEmailError('Por favor ingrese su email');
		// 	return;
		// } else if (!emailRegex.test(input.email)) {
		// 	setEmailError('email no valido');
		// 	return;
		// } else if (input.cp.trim() === '') {
		// 	setCpError('Ingrese su codigo postal');
		// 	return;
		// } else if (input.password.trim() === '') {
		// 	setPasswordError('ingrese una contraseña');
		// 	return;
		// }

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
			plan: '',
			telefono: 0,
			pais: '',
			localidad: '',
			tipo: '',
			comentario: ''
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
						Bienvenido a <span>SiMesero</span>
					</h1>
					<p>
						Si ya tenes una cuenta <a href="">Inicia Sesió n</a>
					</p>

					<div>
						<p>Ingresá tu email para formar parte:</p>

						<input
							type="text"
							name="email"
							value={input.email}
							onChange={handleChange}
						/>
						{/* {emailError ? <h1>{emailError}</h1> : <br></br>} */}
					</div>
					<div>
						<p>Ingresa una contraseña:</p>
						<input
							type="password"
							name="password"
							value={input.password}
							onChange={handleChange}
						/>
						{/* {passwordError ? <h1>{passwordError}</h1> : <br></br>} */}
						<p>Repetí la contraseña:</p>
						<input type="password" />
					</div>
					<p>Complete los siguientes datos:</p>
					<div className="subs-data">
						<div className="subs-data-container">
							<input
								type="text"
								placeholder="Nombre completo"
								name="name"
								className="subs-input"
								key="pass2"
								value={input.name}
								onChange={handleChange}
							/>
							{/* {nameError ? <h1>{nameError}</h1> : <br></br>} */}
							<input
								type="text"
								placeholder="Nombre del local"
								name="storeName"
								className="subs-input"
								value={input.storeName}
								onChange={handleChange}
							/>
							{/* {storeNameError ? <h1>{storeNameError}</h1> : <br></br>} */}
							<input
								type="text"
								placeholder="Dirección"
								name="address"
								className="subs-input"
								value={input.address}
								onChange={handleChange}
							/>
							<input
								type="number"
								placeholder="Código Postal"
								name="cp"
								className="subs-input"
								value={input.cp}
								onChange={handleChange}
							/>
							{/* {cpError ? <h1>{cpError}</h1> : <br></br>} */}

							<input
								type="url"
								placeholder="Foto perfil"
								name="img"
								className="subs-input"
								value={input.img}
								onChange={handleChange}
							/>
							<input
								type="number"
								placeholder="telefono"
								name="telefono"
								className="subs-input"
								value={input.telefono}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="pais"
								name="pais"
								className="subs-input"
								value={input.pais}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="localidad"
								name="localidad"
								className="subs-input"
								value={input.localidad}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="comentario"
								name="comentario"
								className="subs-input"
								value={input.comentario}
								onChange={handleChange}
							/>
							<p>Que tipo de comercio es?:</p>
							<div className="subs-plan">
								<select name="tipo" id="" onClick={handleChange}>
									<option value="">-</option>
									<option value="cafe">Cafe</option>
									<option value="restaurant">Restaurant</option>
									<option value="bar">Bar</option>
								</select>
							</div>
						</div>
					</div>
					<p>Selecciona el plan ideal para ti:</p>
					<div className="plan-data">
						<div className="subs-plans">
							<select name="plan" id="" onClick={handleChange}>
								<option value="">-</option>
								<option value="basic">Básico</option>
								<option value="standard">Estandar</option>
								<option value="premium">Premium</option>
							</select>
						</div>
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
