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

	const [input, setInput] = useState({
		email: '',
		password: '',
		rememberMe: false // Initialize rememberMe as false
	});

	// Load saved credentials from local storage when the component mounts
	useEffect(() => {
		const savedCredentials = localStorage.getItem('savedCredentials');
		if (savedCredentials) {
			const { email, password } = JSON.parse(savedCredentials);
			setInput({
				...input,
				email,
				password,
				rememberMe: true // Set rememberMe to true if saved credentials exist
			});
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		setInput({
			...input,
			[name]: newValue
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		if (
			input.email.trim() === '' ||
			!emailRegex.test(input.email) ||
			input.password.trim() === ''
		) {
			alert('Por favor complete ambos campos');
			return;
		}

		// If rememberMe is enabled, save credentials to local storage
		if (input.rememberMe) {
			const savedCredentials = JSON.stringify({
				email: input.email,
				password: input.password
			});
			localStorage.setItem('savedCredentials', savedCredentials);
		} else {
			localStorage.removeItem('savedCredentials'); // Remove saved credentials if rememberMe is not enabled
		}

		await dispatch(logUser(input));
		dispatch(handleCloseLogin());
	};

	useEffect(() => {
		if (token) {
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
							<input
								type="checkbox"
								name="rememberMe"
								checked={input.rememberMe}
								onChange={handleChange}
							/>{' '}
							<h3>Recordarme</h3>
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
