const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.secretOrKey;
const { Customer } = require('../models/Customer');
const adminModels = require("../models/Admin")
const UserType = require('../models/User_type');

module.exports.verify_token = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        // console.log(token)
        if (!token) {
            return res.json({ status: 403, message: "A token is required for authentication" })
        }
        token = token.split(" ")[1]
        let decode_token = jwt.verify(token, JWT_KEY)
        let current_user = await Customer.findById(decode_token.id), usertype;
        if (!current_user) {
            current_user = await adminModels.findById(decode_token.id)
            usertype = await UserType.findById(current_user?.usertype?.toString());
        }
        req.user = current_user;
        req.usertype = usertype;
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ status: 401, message: "Sesssion Expired" })
        } else {
            return res.status(401).json({ status: 401, message: "Invalid Token" })
        }
    }
    return next();
}



