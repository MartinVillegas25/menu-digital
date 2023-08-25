import './ClientConfig.css';
export default function ClientConfig() {
	return (
		<main className="client-config">
			<div>
				<div className="client-config-container">
					<div className="client-config-personal">
						<h3>Datos Personales</h3>
						<h4>
							Nombre del local: <span></span>
						</h4>
						<h4>
							Direccion: <span></span>
						</h4>
						<h4>
							Telefono: <span></span>
						</h4>
						<h4>
							Mail: <span></span>
						</h4>
						<button className="client-config-btn">Modificar datos</button>
					</div>
					<div className="client-config-plan">
						<h3>Plan adquirido</h3>
						<h4>Plan</h4>
						<button className="client-config-btn">Actualizar plan</button>
					</div>
				</div>
				<div className="client-config-qr-container">
					<h2 className="qr">ACA VA EL QR</h2>
					<div>
						<div className="client-config-qr-tables">
							<label htmlFor="" className="client-config-qr-label">
								Cantidad de mesas:{' '}
							</label>
							<input type="number" className="client-config-qr-input" />
						</div>
						<div>
							<label htmlFor="" className="client-config-qr-label">
								Empezar en:{' '}
							</label>
							<input type="number" className="client-config-qr-input" />
						</div>
					</div>
					<button className="client-config-btn">Generar QR</button>
				</div>
			</div>
		</main>
	);
}
