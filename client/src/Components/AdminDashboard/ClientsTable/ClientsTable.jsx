import './ClientsTable.css';
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { VscMail } from 'react-icons/vsc';
import { clientes } from '../../../assets/clientes.js';

export default function ClientsTable() {
	return (
		<main className="admin-clients-table">
			<div className="admin-clients-table-clients">
				<h1>{clientes.length}</h1>
				<h2>Total Clientes</h2>
			</div>

			<div className="table-top">
				<h3>Ultimos clientes</h3>
				<p>Ver todos</p>
			</div>
			<div className="clients-table-container">
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
							{clientes?.map((c) => {
								return (
									<tr key={c.id}>
										<td>{c.nombre}</td>
										<td>{c.fecha_alta}</td>
										<td>{c.tipo_plan}</td>
										{c.estado === true ? (
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
