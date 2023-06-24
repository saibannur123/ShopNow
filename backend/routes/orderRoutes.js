const express = require("express");
const orderRouter = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const verifyJWT = require("../utils.js");
const dotenv = require("dotenv")
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const axios = require("axios")

orderRouter.get("/history", verifyJWT, async (req, res) => {
    
    const result = await Order.find({user: req.query.user})
    if(result){
        res.status(200).json({message: "All orders found", orders: result})
    }else{
        res.status(400).json({message: "Orders were not found"})
    }
})

orderRouter.post("/", verifyJWT,  async (req, res) => {
    let orderItem = req.body.orderItems.map((x) => ({...x.value}));
    orderItem.forEach((element,index) => {
        element.quantity = req.body.orderItems[index].quantity;
      });
   orderItem.quantity = req.body.orderItems.quantity;
    const newOrder = new Order({
        orderItems: orderItem.map((x) => ({ ...x, product: x._id })),
        shippingInfo: req.body.shippingInfo,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.user.user_id,

    });
   const order = await newOrder.save();
   if(order){
    res.status(200).send({ message: 'New Order Created', order });
   }else{
    res.status(400).send({ message: 'There has been a problem creating your order'});
   }
})

orderRouter.post("/:orderId/payment", verifyJWT, async (req, res) => {
    const orderId = req.params.orderId; // the order id 

    // find all items in order (price and quantity)
    const allItemsWhole = await axios.get(`http://localhost:3019/api/orders/${orderId}`, { headers: {authorization: req.headers.authorization}})
    const allItems = allItemsWhole.data.order[0].orderItems
    console.log("AllItems", allItems)


    // start stripe payment
    
    try{
       const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: allItems.map(item => {
            return{
                price_data:{
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                unit_amount: (item.price * 100)
                },
                quantity: item.quantity
            }
        }),
        success_url: `${process.env.SERVER_URL}`,
        cancel_url: `${process.env.SERVER_URL}`,

       })
       res.status(200).json({url: session.url})
    }catch(err){
        res.status(500).json({error: err.message});
    }


})


orderRouter.get("/:id", verifyJWT, async (req, res) => {

    
    const result = await Order.find({_id: req.params.id})
    
    if(result){
        res.status(200).send({message: "Found order", order: result})
    }else{
        res.status(400).send({message: "Error finding the object", error: "Error finding the order info"})
    }
    
})






module.exports = orderRouter;