const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.secretOrKey;
const adminModels = require("../models/Admin")

const verify_cookie =  async(req,res,next)=>{
    try {
        let cookie = req.headers.cookie;
        if(!cookie){
            res.send({
                status: 401,
                message: "please login"
            })
        }else{
            cookie = cookie.split(';')[1]?.split("=")[1];
        console.log("cookie.................",cookie)
        let data =  jwt.verify(cookie,JWT_KEY)
            current_user = await adminModels.findById(data.id)
        req.user = current_user
        console.log({data,current_user})
        next()
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({status:401,message:"Invalid Token"})

    }
}

module.exports = {
    verify_cookie
}