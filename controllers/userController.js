const userModel = require("../models/User");
const multer = require("multer");
const path = require('path');




module.exports = {
    intro: (req, res) => {
        res.send("Hello World")
        
    },

    user: async(req,res) => {
        
        let user = new userModel({
        name:req.body.name,
        age:req.body.age,
        image:req.file.filename
        });
        let result = await user.save();
        res.send(result)
    },

    register: async(req,res) => {}
}