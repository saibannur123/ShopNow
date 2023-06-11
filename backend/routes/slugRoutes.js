const express = require("express");
const slugRouter = express.Router();
const Item = require("../models/Items");
const mongoose = require("mongoose");

slugRouter.get("/:id", async (req, res) => {
    const param = req.params.id;
    
        const product = await Item.findOne({"slug": param});
        if(product){
            
            res.status(200).json({status: "Success", data: product})
        }else{
            res.status(404).json({ status: 'Error', message: "Product not found" });
        }
        
    

});

module.exports = slugRouter;