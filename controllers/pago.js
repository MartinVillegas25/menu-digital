const axios = require('axios');



//ruta de pago existiso 
// Paso 2: Crear la suscr ipción
const subscriptionResponse = async (valor, email, accessToken, res) => {
  try {
    const response = await axios.post('https://api.mercadopago.com/preapproval', {
      payer_email: email,
      back_url: 'http://tu_sitio_web.com/pago_exitoso', // URL a la que se redirige después del pago exitoso
      reason: 'Suscripción mensual', // Razón de la suscripción
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: valor, // Monto de la suscripción mensual
        currency_id: 'ARS' // Moneda (ARS para pesos argentinos, por ejemplo)
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Paso 3: Redirigir al usuario a la página de pago de Mercado Pago
    const { init_point } = response.data;
    res.redirect(init_point);
  } catch (error) {
    console.error('Error en la creación de la suscripción:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


// Ruta para iniciar el proceso de suscripción
const suscribirse =  async (req, res) => {
    try {
      const { email, plan } = req.body;
  
      // Paso 1: Obtener el access token de Mercado Pago
      console.log(process.env.MP_CLIENT_ID, process.env.MP_CLIENT_SECRET)
      const auth = Buffer.from(`${process.env.MP_CLIENT_ID}:${process.env.MP_CLIENT_SECRET}`).toString('base64');
      const authResponse = await axios.post('https://api.mercadopago.com/oauth/token', 'grant_type=client_credentials', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        }
      });
  
      const accessToken = authResponse.data.access_token;
  
      switch (plan) {
        case 'basic':
          res.status(200).json({
            message: 'Usuario Creado con exito'
          });
          break;
        case 'standard':
          console.log('solicitud standard');
          subscriptionResponse(100, email, accessToken, res);
          break;
        case 'premium':
          console.log('solicitud premium');
          subscriptionResponse(200, email, accessToken, res);
          break;
        default:
          console.log('mensaje de default');
          break;
      }
      
      
    } catch (error) {
      console.error('Error en el proceso de suscripción:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  module.exports = suscribirse;