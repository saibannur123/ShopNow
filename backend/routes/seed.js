const express = require("express");
const seedRouter = express.Router();
const Item = require("../models/Items");
const Data = require('../ProductData');

seedRouter.get('/', async (req, res) => {
    try{
   await Item.deleteMany({})
    console.log("Success, deleted all products");
    }catch(err){
        console.log("Failed to delete all products");
    }
    
     const num = await Item.insertMany(Data.products)
})

module.exports = seedRouter;