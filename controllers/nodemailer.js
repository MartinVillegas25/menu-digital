const nodemailer = require('nodemailer');
const { google } = require("googleapis");



const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

//YOU CAN PASS MORE ARGUMENTS TO THIS FUNCTION LIKE CC, TEMPLATES, ATTACHMENTS ETC. IM JUST KEEPING IT SIMPLE
const sendTestEmail = async (email) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  //EMAIL OPTIONS
  const from = process.env.MY_EMAIL;
  const subject = "Restaura tu contraseña";
  const html = `
    <p>Hey ${email},</p>
    <p>Para recuperar tu contraseña ingresa a el siguiente link</p>
    <a target="_black" href="google.com">Recuperar password</a>
    <p>Thank you</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, email, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};



  const recuperarClave = async (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.log('Error al buscar el correo en la base de datos:', err);
        return res.status(500).json({ message: 'Error al buscar el correo en la base de datos.' });
      }
  
      if (results.length === 0) {
       
        return res.status(404).json({ message: 'Correo electrónico no encontrado.' });
      }
      if(results.length > 0) {
        try {
          sendTestEmail(email);
        } catch (error) {
          console.log(error);
          res.sent('error al mandar mail')
        }
      }
    });
  }

  module.exports = recuperarClave;


  





