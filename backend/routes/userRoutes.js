const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User');
const bcrypt = require('bcrypt');

userRouter.post("/change-password", async (req, res) => {

    const user = await User.findOne({email:req.body.email});

    const passCompare = await bcrypt.compare(req.body.currentPass, user.password);
    
    if(!passCompare){
        console.log("Password is not associated with such user email");
        res.send({status: "error", message: "The provided password does not match the user"})
        return;
    }
    const newPassword = await bcrypt.hash(req.body.newPass, 10);
    try{
        await User.findOneAndUpdate({name: user.email}, {password: newPassword});
        res.send({status: "success", message: "Successfully updated password"}).status(200);
    }catch(error){
        res.send({status: "error", message: "Error in updating password"}).status(400);
    }
});


module.exports = userRouter;