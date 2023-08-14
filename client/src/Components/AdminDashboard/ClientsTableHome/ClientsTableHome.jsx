import './ClientsTableHome.css';
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { VscMail } from 'react-icons/vsc';
import vector from '../../../assets/vector-tabla.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllClients } from '../../../redux/actions';

export default function ClientsTableHome() {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.allUsers);
	useEffect(() => {
		dispatch(getAllClients());
	}, []);

	return (
		<main className="admin-clients-table">
			<div className="admin-clients-table-clients">
				<div>
					<h1>{allUsers?.length}</h1>
					<h2>Total Clientes</h2>
				</div>
				<div>
					<img src={vector} alt="" className="table-vector" />
				</div>
			</div>
			<p>
				<span>+12% </span>que el mes pasado
			</p>

			<div className="clients-table-container">
				<div className="table-top">
					<h3>Ultimos clientes</h3>
					<a href="/admin/clientes">Ver todos</a>
				</div>
				<div>
					<table className="clients-table">
						<thead className="clients-table-head">
							<tr>
								<th>Nombre</th>
								<th>Fecha de alta</th>
								<th>Plan</th>
								<th>Estado</th>
								<th>Mensaje</th>
							</tr>
						</thead>
						<tbody className="clients-table-body">
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
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
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
		</main>
	);
}
