import './ClientSideMenu.css';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';

import { VscSignOut } from 'react-icons/vsc';
import CEO from '../../../assets/CEO.jpg';
import logo from '../../../assets/logos/Logo1.png';
import { useState } from 'react';
export default function ClientSideMenu() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div>
			<aside className="client-side-menu-web">
				<img src={logo} alt="" className="client-side-menu-logo" />
				<div className="client-side-container">
					<div className="client-side-link">
						<IoRestaurantOutline />
						<a href="/client/salon">Salon</a>
					</div>
					<div className="client-side-link">
						<MdMenuBook />
						<a href="/client/menu">Menu</a>
					</div>
					<div className="client-side-link">
						<BsFillPersonFill />
						<a href="/client/configuracion">Configuracion</a>
					</div>
					<div className="client-side-link">
						<VscSignOut />
						<a href="">Salir</a>
					</div>
					<div className="client-side-img">
						<img src={CEO} alt="" />
						<p>Cambiar foto</p>
					</div>
				</div>
			</aside>
			<nav className="client-menu-mobile">
				<div className="client-menu-mobile-top">
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
					<img src={logo} alt="" className="nav-menu-logo-mobile" />
				</div>
				<div className={`${menuOpen ? 'nav-block' : 'nav-hidden'} `}>
					<div className="client-side-container">
						<div className="client-side-link">
							<IoRestaurantOutline />
							<a href="/salon">Salon</a>
						</div>
						<div className="client-side-link">
							<MdMenuBook />
							<a href="/menu">Menu</a>
						</div>
						<div className="client-side-link">
							<BsFillPersonFill />
							<a href="/configuracion">Configuracion</a>
						</div>

						<div className="client-side-link">
							<VscSignOut />
							<a href="">Salir</a>
						</div>
						<div className="client-side-img">
							<img src={CEO} alt="" />
							<p>Cambiar foto</p>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
