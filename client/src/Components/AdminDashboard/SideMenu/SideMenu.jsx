import './SideMenu.css';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';
import CEO from '../../../assets/CEO.jpg';
export default function SideMenu() {
	return (
		<aside className="admin-side-menu">
			<h1>Nombre Compañia</h1>
			<div className="admin-side-container">
				<div className="admin-side-link">
					<BsFillHouseFill />
					<a href="/admin/panel">Panel de control</a>
				</div>
				<div className="admin-side-link">
					<FaMoneyBillWave />
					<a href="">Ganancias</a>
				</div>
				<div className="admin-side-link">
					<BsFillPersonFill />
					<a href="">Clientes</a>
				</div>
				<div className="admin-side-link">
					<IoMdSettings />
					<a href="">Configuracion</a>
				</div>
				<div className="admin-side-link">
					<VscSignOut />
					<button>Salir</button>
				</div>
				<div className="admin-side-img">
					<img src={CEO} alt="" />
					<button>Cambiar foto</button>
				</div>
			</div>
		</aside>
	);
}
