/* eslint-disable react/prop-types */
import './LoginModal.css';
import img from '../../assets/CAMARERA.jpg';
export default function LoginModal({ handleCloseLogin }) {
	return (
		<div className="login">
			<button className="login-close-btn" onClick={handleCloseLogin}>
				X
			</button>
			<div className="login-container">
				<div className="login-input">
					<h1>
						Nombre <span>compañia</span>
					</h1>
					<h2>Bienvenido/a de vuelta</h2>
					<p>Ingresá con tu email y contraseña</p>
					<div>
						<p>Correo electronico</p>
						<input type="text" name="name" id="" />
					</div>
					<div>
						<p>Contraseña</p>
						<input type="password" name="password" id="" />
					</div>
					<div className="remember">
						<div>
							<input type="checkbox" /> <h3>Recordarme</h3>
						</div>
						<a href="">Olvidaste la contraseña?</a>
					</div>
					<button className="login-btn">Iniciar sesión</button>
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
