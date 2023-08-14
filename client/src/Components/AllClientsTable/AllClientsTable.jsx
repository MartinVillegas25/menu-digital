import './AllClientsTable.css';
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { VscMail } from 'react-icons/vsc';
import grafico from '../../assets/grTorta.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllClients } from '../../redux/actions';

export default function AllClientsTable() {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.allUsers);
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
