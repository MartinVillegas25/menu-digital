import { useEffect } from 'react';
import './AdminConfig.css';
import { useDispatch } from 'react-redux';
import { getAllClients } from '../../../redux/actions';

export default function AdminConfig() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllClients());
	}, []);

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
						<button>Modificar</button>
					</div>
					<div className="admin-changedata">
						<h2>Modificar precio de planes</h2>
						<input type="text" placeholder="Estandar" />
						<input type="text" placeholder="Premium" />
						<button>Modificar</button>
					</div>
				</div>
			</div>
		</main>
	);
}
