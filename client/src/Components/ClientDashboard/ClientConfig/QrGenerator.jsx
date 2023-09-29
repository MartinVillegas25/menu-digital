import { useState } from 'react';
import QRcode from 'react-qr-code';
//import './QrGenerator.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function QrGenerator() {
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
		const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document

		// Capture the HTML content that contains the QR codes
		const qrCodeContainer = document.getElementById('qrCodeContainer');

		html2canvas(qrCodeContainer).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');

			// Adjust the width and height values to make the QR codes larger
			// The values here are in millimeters (mm)
			pdf.addImage(imgData, 'PNG', 10, 10, 100, 100); // Adjust the width and height as needed

			pdf.save('codigos_qr.pdf'); // Download the PDF with the specified name
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
			<div id="qrCodeContainer" className="qr-code-container">
				{generate && (
					<div>
						{numbers.map((mesa) => (
							<div key={mesa} className="qrCode">
								<p>{`Mesa: ${mesa}`}</p>
								<QRcode
									value={`http://127.0.0.1:5173/menulocal?email=ejemplo@gmail.com&mesa=${mesa}`}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
