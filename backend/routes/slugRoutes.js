const express = require("express");
const slugRouter = express.Router();
const Item = require("../models/Items");
const mongoose = require("mongoose");

slugRouter.get("/:id", async (req, res) => {
    const param = req.params.id;
    try{
        const product = await Item.findOne({"slug": param});
        res.json({status: "sucess", data: product})
    }catch(err){
        res.json({status: "error", data: err})
    }
});

module.exports = slugRouter;