/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './NavBar.css';
import LoginModal from '../LoginModal/LoginModal';

//barra de navegacion en la parte superior de la web
export default function NavBar() {
	//manejo de estado de la barra de navegacion
	const [navbar, setNavbar] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const handleOpenLogin = () => {
		setLoginOpen(true);
	};
	const handleCloseLogin = () => {
		setLoginOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<div>
					<div className="navbar-brand">
						<div className="navbar-title">
							<h2>
								Nombre <span>compañia</span>{' '}
							</h2>
						</div>

						<div className="navbar-toggle">
							{/* En caso de ser false, el navBar se encuentra oculto, cuando se presiona el boton se despliega */}
							<button onClick={() => setNavbar(!navbar)}>
								{navbar ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="navbar-icon"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="navbar-icon"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<div className="navbar-info">
					{/* Los clasname block y hidden determinan el comportamiento de la barra dependiendo si se esta viendo en una pc o un smartphone */}
					<div className={`   ${navbar ? 'block' : 'hidden'} `}>
						<ul className="navbar-list">
							<li className=" navbar-item">
								<a className="navbar-link" href="#nosotros">
									Sobre nosotros
								</a>
							</li>
							<li className=" navbar-item">
								<a className="navbar-link" href="#testimonios">
									Testimonios
								</a>
							</li>
							<li className="navbar-item">
								<a className="navbar-link" href="#suscripcion">
									Suscripción{' '}
								</a>
							</li>
						</ul>
						<div className="navbar-btns">
							<button className="navbar-btn" onClick={handleOpenLogin}>
								Iniciar sesión
							</button>
							<button className="navbar-btn">Registrarse</button>
						</div>
					</div>
				</div>
			</div>
			<article
				className={
					loginOpen === true ? `modal modal-is-open` : `modal modal-is-close`
				}
			>
				<div className="modal-container">
					<LoginModal handleCloseLogin={handleCloseLogin} />
				</div>
			</article>
		</nav>
	);
}
