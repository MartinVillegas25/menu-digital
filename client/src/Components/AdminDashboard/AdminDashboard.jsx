import AdminMenu from './AdminMenu/AdminMenu';
import ClientsTable from './ClientsTable/ClientsTable';
import FunctionPanel from './FunctionsPanel/FunctionsPanel';
import SideMenu from './SideMenu/SideMenu';

export default function AdminDashboard() {
	return (
		<div className="admin-dashboard">
			<SideMenu />
			<ClientsTable />
			<FunctionPanel />
			<AdminMenu />
		</div>
	);
}
