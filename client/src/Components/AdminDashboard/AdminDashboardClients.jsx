import AdminMenu from './AdminMenu/AdminMenu';
import AllClientsTable from './AllClientsTable/AllClientsTable';
import SideMenu from './SideMenu/SideMenu';

export default function AdminDashboardHome() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">CLIENTES</h3>
			<AdminMenu />
			<SideMenu />
			<AllClientsTable />
			{/* <FunctionPanel /> */}
		</div>
	);
}
