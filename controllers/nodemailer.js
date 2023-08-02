const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'tu_servicio_de_correo',
    auth: {
      user: process.env.TUMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const recuperarClave = async (req, res) => {
    const { email } = req.body;
    const urlReset = "https://google.com"
    // Verificar si el correo está en la base de datos
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.log('Error al buscar el correo en la base de datos:', err);
        return res.status(500).json({ message: 'Error al buscar el correo en la base de datos.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Correo electrónico no encontrado.' });
      }
  
      // Generar y enviar el enlace de cambio de contraseña
      const resetLink = `${urlReset}`; // Reemplaza esto con la URL correcta para cambiar la contraseña
      const mailOptions = {
        from: process.env.MAIL, // Reemplaza esto con tu correo electrónico
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Para cambiar tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
      };
  
      mailTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log('Error al enviar el correo electrónico:', err);
          return res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
        }
  
        return res.status(200).json({ message: 'Correo electrónico enviado correctamente.' });
      });
    });
  }

  module.exports = recuperarClave;