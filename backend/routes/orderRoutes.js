const express = require("express");
const orderRouter = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const verifyJWT = require("../utils.js");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const axios = require("axios");
const bodyParser = require("body-parser");

// Route handler for the endpoint "/history" to retrieve order history
orderRouter.get("/history", verifyJWT, async (req, res) => {
  try {
    // Attempt to find orders related to the user specified in the query parameter
    const result = await Order.find({
      user: req.query.user,
    });

    // If orders are found, respond with 200 status and the orders in JSON format
    res.status(200).json({
      message: "All orders found",
      orders: result,
    });
  } catch (err) {
    // If an error occurs during the database query, respond with 500 status and an error message
    res.status(500).send({
      message: "Internal server error",
      error: "Error finding the order history",
    });
  }
});

orderRouter.post("/", verifyJWT, async (req, res) => {
  let orderItem = req.body.orderItems.map((x) => ({
    ...x.value,
  }));
  orderItem.forEach((element, index) => {
    element.quantity = req.body.orderItems[index].quantity;
  });
  orderItem.quantity = req.body.orderItems.quantity;
  const newOrder = new Order({
    orderItems: orderItem.map((x) => ({
      ...x,
      product: x._id,
    })),
    shippingInfo: req.body.shippingInfo,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.body.user.user_id,
  });
  const order = await newOrder.save();
  if (order) {
    res.status(200).send({
      message: "New Order Created",
      order,
    });
  } else {
    res.status(400).send({
      message: "There has been a problem creating your order",
    });
  }
});

orderRouter.post("/:orderId/payment", verifyJWT, async (req, res) => {
  const orderId = req.params.orderId; // the order id

  // find all items in order (price and quantity)
  const allItemsWhole = await axios.get(
    `http://localhost:3019/api/orders/${orderId}`,
    {
      headers: {
        authorization: req.headers.authorization,
      },
    }
  );
  const allItems = allItemsWhole.data.order[0].orderItems;
  console.log("AllItems", allItems);

  // start stripe payment

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: allItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: (item.price + item.price * 0.13) * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/product/success`,
      cancel_url: `${process.env.SERVER_URL}/order/${orderId}/`,
      metadata: {
        orderId: orderId, // pass in the orderID for later retrieval
      },
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

orderRouter.post(
  "/stripe-webhook",
  bodyParser.raw({
    type: "application/json",
  }),
  async (req, res) => {


    const sig = req.headers["stripe-signature"];

    let event = req.body;

    switch (event.type) {
      case "checkout.session.completed":
        const orderId = event.data.object.metadata.orderId;
        try {
          await Order.findByIdAndUpdate(
            {
              _id: orderId,
            },
            {
              isPaid: true,
            }
          );
        } catch (err) {
          console.log("Error updating order isPaid", err);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.sendStatus(200);
  }
);

orderRouter.get("/:id", verifyJWT, async (req, res) => {
  try {
    const userID = req.id;
    const orderId = req.params.id;

    const result = await Order.find({ _id: orderId });
    if (!result) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    if (result[0].user != userID) {
      return res.status(403).send({
        message: "Access to this resource on the server is denied!",
      });
    }

    res.status(200).send({
      message: "Found order",
      order: result,
    });
  } catch (error) {
    console.error("Error while fetching order:", error);
    res.status(500).send({
      message: "Internal server error",
      error: "Error finding the order",
    });
  }
});

module.exports = orderRouter;
