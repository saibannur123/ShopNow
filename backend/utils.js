
const jwt = require("jsonwebtoken")


const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth){
        res.send("WE need a token");
    }else{
        const token = auth.slice(7, auth.length);
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err){
                res.json({auth: false, message: "You failed to authenticate"});
            }else{
                req.email = decoded.email;
                next();
            }
        })
    }
}

module.exports = verifyJWT;
