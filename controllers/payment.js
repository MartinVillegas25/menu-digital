class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getSubscriptionLink(req, res) {

      const {email, plan} = req.body;
      let valor = 0;
        if (plan === 'standard'){
          valor= 100;
      }else if( plan==='premium'){
          valor= 200;
      }else{
          valor=0;
      }
      try {
        const subscription = await this.subscriptionService.createSubscription(email, valor);
        
        console.log(subscription.init_point)
        return res.redirect(subscription.init_point);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }
  }
  
  module.exports = PaymentController;