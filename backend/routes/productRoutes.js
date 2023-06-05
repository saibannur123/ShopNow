const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Items");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    
    try{
        const data = await Item.find({});
        res.json({status: "success", data: data})
    }catch(err){
        res.json({status: "error", message: "Could not fetch items"})
    }

})

module.exports = productRouter;