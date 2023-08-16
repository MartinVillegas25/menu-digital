const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const mailClave = require('../templateEmail/recuperarClave');


const createTrans = ()=>{
  // const transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //     port: 2525,
  //     auth: {
  //       user: "f7df9a1b3863b3",
  //       pass: "e1f8a83e3b91c1"
  //     }
  // })
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apikey: process.env.API_KEY,
    })
  )

  return transport;
}

const sendMail = async (user) =>{
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from : 'test@test.com',
    to:user,
    subject: "Restaura tu contraseña",
    html :mailClave,
  })

  console.log("mensaje enviado", info.messageId);
  return

}




  exports.sendMail = (user) => sendMail(user);


  





