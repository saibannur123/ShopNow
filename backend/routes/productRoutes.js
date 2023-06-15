const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Items");
const productRouter = express.Router();
const app = express();
var cors = require('cors');
app.use(express.json());

app.use(cors({origin: true, credentials: true}));

productRouter.get("/", async (req, res) => {
    
    try {
        const data = await Item.find({});
        res.json({
            status: "success",
            data: data
        })
    } catch (err) {
        res.json({
            status: "error",
            message: "Could not fetch items"
        })
    }
})


productRouter.get("/category", async (req, res) => {

    try {
        const result = await Item.distinct("category");

        if (!result) {
            res.status(404).send({
                status: "error",
                message: "No categories were found"
            });
        } else {
            res.status(200).send({
                status: "success",
                data: result
            });
        }
    } catch (err) {
        console.log("Error fetching categories");
        res.send({
            status: "error",
            message: "Error fetching categories"
        })
    }
})



productRouter.get("/search", async (req, res) => {
    const { category, query, price, rating, option, page} = req.query;
    const pageC = page ? page : 1;
    const andArray = {};
    const sort = {};


    if(category && category !== 'all' ){
        andArray.category = category;
    }

    // TODO: Website can break if user changes the URL, so its -50, or 50-, or something that doesnt follow this syntax: #-# or #
    if(price && price !== 'all' && price.includes('-')){
        andArray.price = {$gte : Number(price.split('-')[0]), $lte : Number(price.split('-')[1])}
    }else if(price && price !== 'all' && !price.includes('-')){
        andArray.price = {$gte : Number(price)}
    }

    if(query && query  !== 'all'){
        andArray.name = query; //  double check this?
    }

    if(rating && rating != 0 && rating !== 'all'){
        andArray.rating = {$gt: Number(rating)}; 
    }

    if(option && option === 'increase'){
        sort.price = 1;
    }else if(option && option === 'decrease'){
        sort.price = -1;
    }
    try{
        const result = await Item.find(andArray).
        skip(4 * (pageC - 1)).
        limit(4).
        sort(sort).
        exec();

        const itemCount = await Item.countDocuments(andArray);

        if(!result){
            console.log("No products found with given filter");
            res.status(404).send({status: "error", message: "No product found with filter"})
        }else{
            res.status(200).send({status: "success", data: result, page: pageC, pages: (Math.ceil(itemCount / 4)), numItems: itemCount})
        }
    }catch(error){
        res.status(400).send({status: "error", message: "Error filtering data"})
    }

})

productRouter.get("/:id", async (req, res) => {
    // console.log(req.params)
     const data = await Item.findById({_id: req.params.id})
     res.send(data);
 })

module.exports = productRouter;