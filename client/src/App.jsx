import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import AdminDashboardHome from './Components/AdminDashboard/AdminDashboardHome';
import AdminDashboardClients from './Components/AdminDashboard/AdminDashboardClients';
import AdminDashboardConfig from './Components/AdminDashboard/AdminDashboardConfig';
import ClientDashboardHome from './Components/ClientDashboard/ClientDashboardHome';
import ClientDashboardMenu from './Components/ClientDashboard/ClientDashboardMenu';
import ClientDashboardConfig from './Components/ClientDashboard/ClientDashboardConfig';
import Menu from './Components/Menu/Menu';
// import AlertChart from './Components/Menu/AlertChart/AlertChart';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					{/* Ruta de pagina principal  */}
					<Route path="/" element={<MainPage />} />
					{/* Rutas del panel de administrador */}
					<Route path="/admin" element={<AdminDashboardHome />} />
					<Route path="/admin/clientes" element={<AdminDashboardClients />} />
					<Route
						path="/admin/configuracion"
						element={<AdminDashboardConfig />}
					/>
					{/* Rutas del panel de cada cliente */}
					<Route path="/dashboard" element={<ClientDashboardHome />} />
					<Route path="/dashboard/menu" element={<ClientDashboardMenu />} />
					<Route
						path="/dashboard/configuracion"
						element={<ClientDashboardConfig />}
					/>
					{/* Ruta del menu */}
					<Route path="/menulocal" element={<Menu />} />
					{/* <Route path="/pruebas" element={<AlertChart />} /> */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
