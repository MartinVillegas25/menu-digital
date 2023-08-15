const axios = require("axios");
const validarJWT = require("../middlerwares/validar-jwt");

class PaymentService {
 
  async createSubscription(email, valor) {
    console.log(valor, email);
    const url = "https://api.mercadopago.com/preapproval";
  
    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: valor,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: email
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;