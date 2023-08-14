import './AdminConfig.css';

export default function AdminConfig() {
	return (
		<main className="admin-config-container">
			<div>
				<div className="admin-config-info">
					<div>
						<h3>Nombre:</h3> <h4>Pablo Ramirez</h4>
					</div>
					<div>
						<h3>Direccion:</h3> <h4>Colon 1234, Mar del Plata, Buenos Aires</h4>
					</div>
					<div>
						<h3>Teléfono: </h3>
						<h4>+542235468756</h4>
					</div>
					<div>
						<h3>Mail: </h3>
						<h4>maildeprueba@gmail.com</h4>
					</div>
				</div>
				<div className="manage-user">
					<h1>Activar o suspender usuario</h1>
					<div className="manage-input">
						<input type="text" placeholder="Indique nombre del local" />
						<p>A para activar | S para suspender</p>
					</div>
					<div>
						<button className="activate-btn">A</button>
						<button className="suspend-btn">S</button>
					</div>
				</div>
			</div>
			<div className="admin-functions-panel">
				<div className="admin-functions-panel-container">
					<div className="admin-changedata">
						<h2>Modificar datos</h2>
						<input type="text" placeholder="Nombre" />
						<input type="text" placeholder="Direccion" />
						<input type="text" placeholder="Telefono" />
						<input type="text" placeholder="Mail" />
						<input type="text" placeholder="Contraseña" />
					</div>
					<div className="admin-changedata">
						<h2>Modificar precio de planes</h2>
						<input type="text" placeholder="Estandar" />
						<input type="text" placeholder="Premium" />
					</div>
				</div>
			</div>
		</main>
	);
}
