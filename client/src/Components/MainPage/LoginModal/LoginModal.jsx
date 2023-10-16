/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './LoginModal.css';
import img from '../../../assets/CAMARERA.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logUser, validateAdmin, validateUser } from '../../../redux/actions';

export default function LoginModal({ handleCloseLogin }) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const userType = useSelector((state) => state.userType);
	console.log(userType);

	const [input, setInput] = useState({
		email: '',
		password: ''
	});
	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		// Regular expression for email validation
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		// Check if any of the required fields are empty or null
		if (
			input.email.trim() === '' ||
			!emailRegex.test(input.email) || // Check if email is valid
			input.password.trim() === ''
		) {
			// Display an error message or perform any other action
			alert('Por favor complete ambos campos');
			return; // Exit the function if validation fails
		}

		// If all validation checks pass, dispatch the user creation action
		await dispatch(logUser(input));
		dispatch(handleCloseLogin());
	};
	useEffect(() => {
		// Check if the token has been updated in the Redux store
		if (token) {
			// Store the updated token in local storage
			if (userType === 'admin') {
				localStorage.setItem('token', token);
				dispatch(validateAdmin());
			} else if (userType === 'local') {
				localStorage.setItem('token', token);
				dispatch(validateUser());
			}
		}
	}, [token]);

	return (
		<div className="login">
			<button className="login-close-btn" onClick={handleCloseLogin}>
				X
			</button>
			<div className="login-container">
				<div className="login-input">
					<h1>
						Si <span>Mesero</span>
					</h1>
					<h2>Bienvenido/a de vuelta</h2>

					<p>Ingresá con tu email y contraseña</p>
					<div>
						<p>Correo electrónico</p>
						<input
							type="text"
							name="email"
							value={input.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p>Contraseña</p>
						<input
							type="password"
							name="password"
							value={input.password}
							onChange={handleChange}
						/>
					</div>
					<div className="remember">
						<div>
							<input type="checkbox" /> <h3>Recordarme</h3>
						</div>
						<a href="">Olvidaste la contraseña?</a>
					</div>
					<button className="login-btn" onClick={handleSubmit}>
						Iniciar sesión
					</button>
					<div className="login-to-register">
						<h4>No tienes una cuenta?</h4>
						<a href="">Registrate</a>
					</div>
				</div>

				<div>
					<img src={img} alt="" className="login-img" />
				</div>
			</div>
		</div>
	);
}
