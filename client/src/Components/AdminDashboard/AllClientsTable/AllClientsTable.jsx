import './AllClientsTable.css';
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { VscMail } from 'react-icons/vsc';
import grafico from '../../../assets/grTorta.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
	activateUser,
	getAllClients,
	suspendUser
} from '../../../redux/actions';
import swal from 'sweetalert';

export default function AllClientsTable() {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.allUsers);

	const handleSubmitSuspend = (e) => {
		e.preventDefault();
		swal({
			title: 'Suspender',
			text: 'Esta seguro que desea suspender el usuario?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(suspendUser({ storeName: e.target.value }));
				swal({
					text: `Se ha suspendido el usuario ${e.target.value}`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha suspendido el usuario', icon: 'info' });
			}
		});
	};

	const handleSubmitActivate = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: 'Esta seguro que desea activar el usuario?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(activateUser({ storeName: e.target.value }));
				swal({
					text: `Se ha activado el usuario ${e.target.value}`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha activado el usuario', icon: 'info' });
			}
		});
	};
	useEffect(() => {
		dispatch(getAllClients());
	}, []);

	return (
		<main className="act-container">
			<div className="act-page">
				<div className="act-total-clients">
					<div className="act-graf">
						<img src={grafico} alt="" className="graf" />
					</div>
					<div>
						<h1>{allUsers?.length}</h1>
						<h2>Total Clientes</h2>
					</div>
				</div>
			</div>

			<div className="act-table-container">
				<div className="act-title">
					<h3>Total clientes</h3>
				</div>
				<table className="act-table">
					<thead className="">
						<tr>
							<th>Nombre</th>
							<th>Fecha de alta</th>
							<th>Plan</th>
							<th>Estado</th>
							<th>Mensaje</th>
							<th>Activar</th>
							<th>Suspender</th>
						</tr>
					</thead>
					<tbody className="act-table-body">
						{allUsers?.map((c) => {
							return (
								<tr key={c.id}>
									<td>{c.storeName}</td>
									<td>{c.date}</td>
									<td>{c.plan}</td>
									{c.status === 1 ? (
										<td>
											<BsCheckCircle className="check-icon" />
										</td>
									) : (
										<td>
											<BsXCircle className="X-icon" />
										</td>
									)}
									<td>
										<VscMail className="mail-icon" />
									</td>
									<td>
										<button value={c.storeName} onClick={handleSubmitActivate}>
											Activar
										</button>
									</td>
									<td>
										<button value={c.storeName} onClick={handleSubmitSuspend}>
											Suspender
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="state-reference">
					<div>
						<BsCheckCircle className="check-icon" />
						<p>Al dia</p>
					</div>
					<div>
						<BsXCircle className="X-icon" />
						<p>Deuda</p>
					</div>
				</div>
			</div>
		</main>
	);
}
