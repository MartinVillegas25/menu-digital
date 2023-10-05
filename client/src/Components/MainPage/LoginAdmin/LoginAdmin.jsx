/* eslint-disable react/no-unescaped-entities */
import { useDispatch } from 'react-redux';
import './LoginAdmin.css';
import { useState } from 'react';
import { createAdmin } from '../../../redux/actions';
//Vista de testimonios de clientes
export default function LoginAdmin() {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
		img: ''
	});

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createAdmin(input));
	};

	return (
		<div className="loginAdmin">
			<div className="login-img-container">
				{/* <img src={LogoRecortado} alt="" className="login-img" /> */}
			</div>
			<div className="form-loginadmin">
				<form action="">
					<h2 className="h2-login">Crea un Administrador</h2>
					<label htmlFor="">Nombre</label>
					<input
						type="text"
						name="name"
						id=""
						value={input.name}
						onChange={handleChange}
					/>
					<label htmlFor="">Email</label>
					<input
						type="email"
						name="email"
						id=""
						value={input.email}
						onChange={handleChange}
					/>
					<label htmlFor="">Password</label>
					<input
						type="password"
						name="password"
						id=""
						value={input.password}
						onChange={handleChange}
					/>
					<label htmlFor="">Confirmar Password</label>
					<input type="password" name="" id="" />
					<button className="submit-login" onClick={handleSubmit}>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
