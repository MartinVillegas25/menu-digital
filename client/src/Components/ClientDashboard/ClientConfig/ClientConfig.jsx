/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getLocalData } from '../../../redux/actions';
import './ClientConfig.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import QrGenerator from './QrGenerator';

export default function ClientConfig() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		storeName: '',
		address: '',
		telefono: ''
	});

	const [popUpOpen, setPopUpOpen] = useState(false);
	const handlepopUp = () => {
		setPopUpOpen(!popUpOpen);
	};

	useEffect(() => {
		dispatch(getLocalData(userEmail));
	}, []);

	const user = useSelector((state) => state.localData.usuario);

	return (
		<main className="client-config">
			<div className={popUpOpen === true ? ' backdrop' : ''}>
				<div
					className={popUpOpen === true ? 'client-data-popup' : 'popup-hidden'}
				>
					<div className="client-data-popup-container">
						<label htmlFor="">Nombre del local:</label>
						<input type="text" />
						<label htmlFor="">Direccion:</label>
						<input type="text" />
						<label htmlFor="">Telefono</label>
						<input type="text" />
					</div>
				</div>
			</div>
			<div>
				<div className="client-config-container">
					<div className="client-config-personal">
						<h3>Datos Personales</h3>
						<h4>
							Nombre del local: <span>{user?.storeName}</span>
						</h4>
						<h4>
							Direccion: <span>{user?.address}</span>
						</h4>
						<h4>
							Telefono: <span>{user?.telefono}</span>
						</h4>
						<h4>
							Mail: <span>{user?.email}</span>
						</h4>
						<button className="client-config-btn" onClick={handlepopUp}>
							Modificar datos
						</button>
					</div>

					<div className="client-config-plan">
						<h3>Plan adquirido</h3>
						<h4>{user?.plan}</h4>
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
					<button className="client-config-btn">Generar codigos Qr</button>
				</div>
			</div>
		</main>
	);
}
