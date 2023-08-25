import { useEffect } from 'react';
import './AdminConfig.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients, validateAdmin } from '../../../redux/actions';

export default function AdminConfig() {
	const dispatch = useDispatch();
	const validation = useSelector((state) => state.validation.msg);
	const dataAdmin = useSelector((state) => state.validation.usuario);
	console.log(dataAdmin);
	useEffect(() => {
		dispatch(getAllClients());
		dispatch(validateAdmin());
	}, []);

	return (
		<div>
			{validation !== 'admin' ? (
				<h1>Usted no tiene acceso</h1>
			) : (
				<main className="admin-config-container">
					<div>
						<div className="admin-config-info">
							<div>
								<h3>Nombre:</h3> <h4>{dataAdmin.name}</h4>
							</div>
							<div>
								<h3>Direccion:</h3> <h4>{dataAdmin.address}</h4>
							</div>
							<div>
								<h3>Teléfono: </h3>
								<h4>{dataAdmin.telefono}</h4>
							</div>
							<div>
								<h3>Mail: </h3>
								<h4>{dataAdmin.email}</h4>
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
			)}
		</div>
	);
}
