import './ClientSideMenu.css';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';

import logo from '../../../assets/logos/Logo1.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocalImg } from '../../../redux/actions';
import swal from 'sweetalert';

export default function ClientSideMenu() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	const dataLocal = useSelector((state) => state.localData.usuario);

	console.log(dataLocal);
	const dispatch = useDispatch();

	const [menuOpen, setMenuOpen] = useState(false);
	const [imgInput, setImgInput] = useState(false);
	const [newImg, setNewImg] = useState('');

	const handleOpenInput = () => {
		setImgInput(true);
	};

	const handleImg = (e) => {
		setNewImg(e.target.files[0]); // Use e.target.files[0] to get the selected file
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append('newImagen', newImg); // Use the correct field name expected by the backend
	// 	dispatch(changeLocalImg(formData));
	// };
	const handleSubmit = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: 'Esta seguro que desea  cambiar la imagen de perfil?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				const formData = new FormData();
				formData.append('newImagen', newImg); // Use the correct field name expected by the backend
				dispatch(changeLocalImg(formData));
				swal({
					text: `Se ha modificado la imagen de perfil`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha modificado la imagen', icon: 'info' });
			}
		});
	};

	return (
		<div>
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className={menuOpen === true ? `openSideBtn` : `closedSideBtn`}
			>
				{' '}
				<BsArrowRightCircle className="menuBtn" />
			</button>
			{menuOpen ? (
				<aside className="client-side-menu-web">
					<img src={logo} alt="" className="client-side-menu-logo" />
					<div className="client-side-container">
						<div className="client-side-link">
							<IoRestaurantOutline />
							<a href={`/dashboard?email=${userEmail}`}>Salon</a>
						</div>
						<div className="client-side-link">
							<MdMenuBook />
							<a href={`/dashboard/menu?email=${userEmail}`}>Menu</a>
						</div>
						<div className="client-side-link">
							<BsFillPersonFill />
							<a href={`/dashboard/configuracion?email=${userEmail}`}>
								Configuracion
							</a>
						</div>
						<div className="client-side-link">
							<BsFillPersonFill />
							<a href={`/dashboard/chat?email=${userEmail}`}>Chat</a>
						</div>
						<div className="client-side-link">
							<VscSignOut />
							<a href="/">Salir</a>
						</div>
						<div className="client-side-img">
							<img src={dataLocal?.img} alt="" />
							<button onClick={handleOpenInput}>Cambiar imagen</button>
							{imgInput ? (
								<div className="admin-side-img-change">
									<input
										type="file"
										id="newImg"
										accept="image/*"
										onChange={handleImg}
									/>
									<button onClick={handleSubmit}>Cambiar</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</aside>
			) : (
				<div className="sideMenuClosed"></div>
			)}
			{/* <nav className="client-menu-mobile">
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
							<a href="/salon">Salonnnnn</a>
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
							<img src={dataLocal?.img} alt="" />
							<button onClick={handleOpenInput}>Cambiar imagen</button>
							{imgInput ? (
								<div className="admin-side-img-change">
									<input
										type="file"
										id="newImg"
										accept="image/*"
										onChange={handleImg}
									/>
									<button onClick={handleSubmit}>Cambiar</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</div>
			</nav> */}
		</div>
	);
}
