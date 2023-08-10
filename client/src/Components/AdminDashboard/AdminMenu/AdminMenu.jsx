import { IoNotifications } from 'react-icons/io5';
import { RxTriangleDown } from 'react-icons/rx';
import './AdminMenu.css';
import CEO from '../../../assets/CEO.jpg';
import { useState } from 'react';

export default function AdminMenu() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<aside className="admin-menu">
			<div className="admin-menu-container">
				<IoNotifications className="admin-menu-notification" />
				<img src={CEO} alt="" className="admin-menu-img" />
				<div className="admin-menu-panel">
					<div>
						<h3>Mi cuenta</h3>
						<button onClick={handleClick}>
							<RxTriangleDown />
						</button>
					</div>
					<div className={`${open ? 'panel-open' : 'panel-closed'}`}>
						<a href="">Mi perfil</a>
						<button>Cerrar sesion</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
