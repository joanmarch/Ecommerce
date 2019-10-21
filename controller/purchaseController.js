if (process.env.NODE_ENV !== 'production'){
    // we can access our environment variables by: We load our env variables in "process.env" and make them accessibles.
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const uuid = require('uuid/v4');
const stripe = require('stripe')(stripeSecretKey)

class purchaseController{
    async order(req, res){
        let error;
        let status;
        let total = 0;
        let items = ""
        try{
            // const {product, token} = req.body;
            const {purchasedProducts, token} = req.body;
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            });
            for (var i = 0; i<purchasedProducts.length;i++){
                total = total + purchasedProducts[i].price*purchasedProducts[i].quantity;
                items = items + " " + purchasedProducts[i].id;
            }
            const idempotency_key = uuid();
            const charge = await stripe.charges.create({
                amount : total*100,
                currency : "eur",
                customer : customer.id,
                receipt_email: token.email,
                description: `Purchased the ${items}`,
                shipping: {
                    name : token.card.name,
                    address : {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city : token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },{idempotency_key}  
            );
            console.log("Charge:", {charge});
            status = "success";
            
        }catch (error){
            console.error("Error:", error);
            status="failure";
        }
        res.send({error, status}) ;      
        
    }
 
}

module.exports = new purchaseController();


