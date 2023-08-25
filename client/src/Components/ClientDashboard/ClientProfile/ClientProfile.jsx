import { IoNotifications } from 'react-icons/io5';
import { RxTriangleDown } from 'react-icons/rx';
import './ClientProfile.css';
import CEO from '../../../assets/CEO.jpg';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function ClientProfile() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<nav className="client-menu">
			<div className="client-menu-container">
				<div className="client-menu-panel">
					<IoNotifications className="client-menu-notification" />
					<img src={CEO} alt="" className="client-menu-img" />
					<div>
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
			</div>
		</nav>
	);
}
