import './Footer.css';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
//Pie de pagina
export default function Footer() {
	return (
		<div>
			<div className="line"></div>
			<div className="footer">
				<div className="footer-container">
					<div className="footer-links">
						<div>
							<a href="">Aviso legal</a>|<a href="">Privacidad</a>
						</div>
						<h3>2023 Todos los derechos reservados. Duwoh Developers</h3>
					</div>
					<div className="footer-socials">
						<a href="">
							<BsInstagram />
						</a>
						<a href="">
							<FaFacebook />
						</a>
						<a href="">
							<FaLinkedin />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
