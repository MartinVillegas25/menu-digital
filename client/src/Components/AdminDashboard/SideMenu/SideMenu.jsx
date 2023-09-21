import './SideMenu.css';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';
import CEO from '../../../assets/CEO.jpg';
import logo from '../../../assets/logos/Logo1.png';
import { useState } from 'react';
export default function SideMenu() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div>
			<aside className="admin-side-menu-web">
				<img src={logo} alt="" className="admin-side-menu-logo" />
				<div className="admin-side-container">
					<div className="admin-side-link">
						<BsFillHouseFill />
						<a href="/admin">Panel de control</a>
					</div>
					<div className="admin-side-link">
						<FaMoneyBillWave />
						<a href="">Ganancias</a>
					</div>
					<div className="admin-side-link">
						<BsFillPersonFill />
						<a href="/admin/clientes">Clientes</a>
					</div>
					<div className="admin-side-link">
						<IoMdSettings />
						<a href="/admin/configuracion">Configuracion</a>
					</div>
					<div className="admin-side-link">
						<VscSignOut />
						<a href="">Salir</a>
					</div>
					<div className="admin-side-img">
						<img src={CEO} alt="" />
						<p>Cambiar foto</p>
					</div>
				</div>
			</aside>
			<nav className="admin-menu-mobile">
				<div className="admin-menu-mobile-top">
					<div>
						<button onClick={() => setMenuOpen(!menuOpen)}>
							{menuOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="nav-icon"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="nav-icon"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
					<div>
						<img src={logo} alt="" className="nav-menu-logo-mobile" />
					</div>
				</div>
				<div className={`${menuOpen ? 'nav-block' : 'nav-hidden'} `}>
					<div className="admin-side-container">
						<div className="admin-side-link">
							<BsFillHouseFill />
							<a href="/admin">Panel de control</a>
						</div>
						<div className="admin-side-link">
							<FaMoneyBillWave />
							<a href="">Ganancias</a>
						</div>
						<div className="admin-side-link">
							<BsFillPersonFill />
							<a href="/admin/clientes">Clientes</a>
						</div>
						<div className="admin-side-link">
							<IoMdSettings />
							<a href="/admin/configuracion">Configuracion</a>
						</div>
						<div className="admin-side-link">
							<VscSignOut />
							<a href="">Salir</a>
						</div>
						<div className="admin-side-img">
							<img src={CEO} alt="" />
							<p>Cambiar foto</p>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}