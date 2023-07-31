/* eslint-disable react/prop-types */
import './SubscribeModal.css';

// eslint-disable-next-line react/prop-types
export default function SubsbribeModal({ handleCloseSuscribe }) {
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

						<input type="text" name="email" id="" />
					</div>
					<div>
						<p>Ingresa una contraseña para iniciar tu suscripcion:</p>
						<input type="password" name="password" id="" />
						<p>Repeti la contraseña:</p>
						<input type="password" id="" />
					</div>
					<p>Complete los siguientes datos:</p>
					<div className="subs-data">
						<div className="subs-data-container">
							<div>
								<input
									type="text"
									placeholder="Nombre completo"
									name="name"
									className="subs-input"
								/>
								<input
									type="text"
									placeholder="Nombre del local"
									name="storeName"
									className="subs-input"
								/>
								<input
									type="text"
									placeholder="Direccion"
									name="adress"
									className="subs-input"
								/>
								<input
									type="text"
									placeholder="Codigo Postal"
									name="postal"
									className="subs-input"
								/>
							</div>
							<div>
								<input
									type="text"
									placeholder="Apellido"
									name="surname"
									className="subs-input"
								/>
								<input
									type="url"
									placeholder="Foto perfil"
									name="img"
									className="subs-img-input"
								/>
							</div>
						</div>
					</div>
					<p>Selecciona el plan ideal para ti:</p>
					<div className="subs-plans">
						<div className="subs-plan">
							<p>Basico</p>
							<ul>
								<li>Info 1</li>
								<li>Info 2</li>
								<li>Info 3</li>
								<li>Info 4</li>
								<li>Info 5</li>
								<input type="checkbox" name="basic" />
							</ul>
						</div>
						<div className="subs-plan">
							<p>Estandar</p>
							<ul>
								<li>Info 1</li>
								<li>Info 2</li>
								<li>Info 3</li>
								<li>Info 4</li>
								<li>Info 5</li>
								<input type="checkbox" name="standard" />
							</ul>
						</div>
						<div className="subs-plan">
							<p>Premium</p>
							<ul>
								<li>Info 1</li>
								<li>Info 2</li>
								<li>Info 3</li>
								<li>Info 4</li>
								<li>Info 5</li>
								<input type="checkbox" name="premium" />
							</ul>
						</div>
					</div>
					<div className="subs-btn-container">
						<button className="subs-btn">Finalizar</button>
					</div>
				</div>
				<div>
					<img src="" alt="" />
				</div>
			</div>
		</div>
	);
}
