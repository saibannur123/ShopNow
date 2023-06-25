const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require('./models/User');
const ItemModel = require('./models/Items');
const seedRouter = require('./routes/seed.js');
const productRouter = require('./routes/productRoutes.js');
const slugRouter = require('./routes/slugRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
dotenv.config();
app.use(express.json());
app.use(cors());

try{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
}catch(err){
    console.log("MongoDB error");
}

app.use("/api/user", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/slug", slugRouter);



//  const verifyJWT = (req, res, next) => {
//     const auth = req.headers.authentication;
//     if(!auth){
//         res.send("WE need a token");
//     }else{
//         const token = auth.slice(7, auth.length);
//         jwt.verify(token, process.env.SECRET, (err, decoded) => {
//             if(err){
//                 res.json({auth: false, message: "You failed to authenticate"});
//             }else{
//                 req.email = decoded.email;
//                 next();
//             }
//         })
//     }
// }


// app.get('/isAuth', verifyJWT, (req, res) =>{
//     res.send("You are authorized");
// })

app.post('/register', async (req, res) => {

    const newPassword = await bcrypt.hash(req.body.password, 10);
    
    try{
        const newUser = await User.create({name: req.body.name, email: req.body.email, password: newPassword})
        res.json({status: "ok"});
    }catch(err){
        res.json({status: 'error', message: 'Duplicate email'})
    }   
})

app.post('/login-user', async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  
    if(passwordMatch){
        const token = jwt.sign({email: user.email}, process.env.SECRET);
        res.json({auth: true, token: token, email: user.email, name:user.name, user_id: user._id});
    }else{
        res.json({auth: false, message: "No user exists"});
    }
    
});


app.listen(3019, () =>{
    console.log("server running at port 3019");
})

