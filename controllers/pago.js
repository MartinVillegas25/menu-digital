const axios = require('axios');



// Ruta para iniciar el proceso de suscripción
const suscribirse =  async (req, res) => {
    try {
      const { email, plan_id } = req.body;
  
      // Paso 1: Obtener el access token de Mercado Pago
      const auth = Buffer.from(`${process.env.MP_CLIENT_SECRET}:${process.env.MP_CLIENT_SECRET}`).toString('base64');
      const authResponse = await axios.post('https://api.mercadopago.com/oauth/token', 'grant_type=client_credentials', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        }
      });
  
      const accessToken = authResponse.data.access_token;
  
      // Paso 2: Crear la suscripción
      const subscriptionResponse = await axios.post('https://api.mercadopago.com/preapproval', {
        payer_email: email,
        back_url: 'http://tu_sitio_web.com/pago_exitoso', // URL a la que se redirige después del pago exitoso
        reason: 'Suscripción mensual', // Razón de la suscripción
        external_reference: 'ID_DE_USUARIO', // Puedes usar un identificador interno de tu usuario aquí
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 100, // Monto de la suscripción mensual
          currency_id: 'ARS' // Moneda (ARS para pesos argentinos, por ejemplo)
        }
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      // Paso 3: Redirigir al usuario a la página de pago de Mercado Pago
      const { init_point } = subscriptionResponse.data;
      res.redirect(init_point);
    } catch (error) {
      console.error('Error en el proceso de suscripción:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  module.exports = suscribirse;