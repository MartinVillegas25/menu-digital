const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const mailClave = require('../templateEmail/recuperarClave');


// const createTrans = ()=>{
//   // const transport = nodemailer.createTransport({
//   //   host: "sandbox.smtp.mailtrap.io",
//   //     port: 2525,
//   //     auth: {
//   //       user: "f7df9a1b3863b3",
//   //       pass: "e1f8a83e3b91c1"
//   //     }
//   // })
//   const transport = nodemailer.createTransport(
//     nodemailerSendgrid({
//       apikey: process.env.API_KEY,
//     })
//   )

//   return transport;
// }

// const sendMail = async (user) =>{
//   const transporter = createTrans();
//   const info = await transporter.sendMail({
//     from : 'test@test.com',
//     to:user,
//     subject: "Restaura tu contraseña",
//     html :mailClave,
//   })

//   console.log("mensaje enviado", info.messageId);
//   return

// }

let transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
  }
})
function sendEmail (correo){
  
      transporter.sendMail({
        from: "martinvillegas90@hotmail.com", // verified sender email
        to: correo, // recipient email
        subject: "Recupera tu password", // Subject line
        text: "Equipo de Si Mesero", // plain text body
        html: mailClave, // html body
      }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          
          console.log('Email sent: ' + info.response);
        }
      });

}


module.exports = sendEmail




  // exports.sendMail = (user) => sendMail(user);


  





