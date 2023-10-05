import { useState } from 'react';
import QRcode from 'react-qr-code';
import './QrGenerator.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

export default function QrGenerator() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const email = searchParams.get('email');
	const [totalCodes, setTotalCodes] = useState(0);
	const [firstCode, setFirstCode] = useState(0);
	const [generate, setGenerate] = useState(false);
	const numbers = [];
	for (
		let i = parseInt(firstCode, 10);
		i <= parseInt(firstCode, 10) + parseInt(totalCodes, 10);
		i++
	) {
		numbers.push(i);
	}
	console.log(numbers);

	const handleChangeTotalCodes = (e) => {
		setTotalCodes(e.target.value);
	};

	const handleChangeFirstCode = (e) => {
		setFirstCode(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setGenerate(!generate);
	};

	const handleDownloadPDF = () => {
		// Capture the HTML content that contains the QR codes
		const qrCodeContainer = document.getElementById('qrCodeContainer');

		html2canvas(qrCodeContainer).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('landscape', 'mm', 'a4'); // Cambia la orientación a horizontal

			// Calculate the size and position of the QR codes in the PDF
			const qrCodeWidth = 100; // Ancho para dos códigos QR en una fila
			const qrCodeHeight = 100; // Ajusta la altura según sea necesario
			const xPosition = 10; // Ajusta la posición X según sea necesario
			const yPosition = 10; // Ajusta la posición Y según sea necesario

			// Variables para rastrear la posición actual
			let currentX = xPosition;
			let currentY = yPosition;

			// Agrega las imágenes de los códigos QR al PDF
			numbers.forEach((mesa, index) => {
				if (index % 2 === 0 && index !== 0) {
					// Cambia a la siguiente fila
					currentX = xPosition;
					currentY += qrCodeHeight + 10; // Añade un espacio vertical entre filas
				}

				pdf.addImage(
					imgData,
					'PNG',
					currentX,
					currentY,
					qrCodeWidth,
					qrCodeHeight
				);

				// Añade un espacio horizontal entre códigos QR
			});

			pdf.save('codigos_qr.pdf'); // Descarga el PDF con el nombre especificado
		});
	};
	return (
		<div>
			<div className="qr-amount-container">
				<form action="" onSubmit={handleSubmit} className="qr-amount-form">
					<div>
						<input
							type="number"
							placeholder="Cantidad de codigos a imprimir"
							onChange={handleChangeTotalCodes}
							max={15}
						/>
						<input
							type="number"
							placeholder="Numero de inicio "
							onChange={handleChangeFirstCode}
							max={15}
						/>
					</div>
					<button className="generate-qr-btn">Generar códigos</button>
					{generate && (
						<button onClick={handleDownloadPDF} className="generate-qr-btn">
							Descargar PDF
						</button>
					)}
				</form>
			</div>
			<div id="qrCodeContainer">
				{generate && (
					<div className="qr-code-container">
						{numbers.map((mesa, index) => (
							<div key={mesa} className="qrCode">
								<QRcode
									value={`http://127.0.0.1:5173/menulocal?email=${email}&mesa=${mesa}`}
									className="qr"
								/>
								{index % 2 !== 0 && <div className="clear-float"></div>}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
