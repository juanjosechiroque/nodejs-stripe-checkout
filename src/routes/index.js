const { Router }  = require("express");
const router = Router();
const stripe = require("stripe")("sk_test_51HRq0FHAnt7rv02lnKIMZDLMkZEKhWvqTvFcWIgII8rGgWx1h35wPJTxEcnjf3w27ImoJpAoBMOYliAucEDQeI1m00fxsvRnBA");

router.get("/", (req,res) => {
  res.render("checkout");  
});

router.post("/checkout", async (req,res) => {
  
  const customer =  await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  });
  
  console.log(customer);
  
  const charge = await stripe.charges.create({
    amount: 3000,
    currency: "usd",    
    customer: customer.id,
    description: "Video editing software"    
  }); 
    
  console.log(charge);
  
  res.render("download");
  
});

module.exports = router;
