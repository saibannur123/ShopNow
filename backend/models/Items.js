const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        inStock: {type: Number, required: true},
        brand: {type: String, required: true},
        rating: {type: Number, required: true},
        numReviews: {type: Number, required: true},
        description: {type: String, required: true},
    
    }
);

const ItemModel = mongoose.model("items", ItemSchema);
module.exports = ItemModel;

