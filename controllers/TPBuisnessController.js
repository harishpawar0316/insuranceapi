const TPBuisness = require("../models/Third_Party_Buisness");


module.exports = {
    AddTPBuisness: async (req,res)=>{
        
        try {
            let  AddData = new TPBuisness({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    briefinfo:req.body.briefinfo,

            });
            let result  = await AddData.save();

            if(result != null){
                res.json({status:200,message:"Third Party Buisness Added Successfully",data:result});
            }
            else{
                res.json({status:400,message:"Something went wrong"})
            }
            
        } catch (error) {
            res.json({status:400, message:"Error",data:error.message})
        }
    },

    GetTPBuisness : async (req,res)=>{
        
        const page = req.params.page;
        const limit = req.params.perpage;
       
        try {
         
            const result = await TPBuisness.find({}).limit(limit * 1).skip((page - 1) * limit);
            const total = await TPBuisness.find({}).countDocuments();
            if(result && total){
                res.status(200).json({status:200,message:"Data found",data:result,total:total});
            }
            else{
                res.status(400).json({status:400,message:"Not Found",data:{}})
            }
        } catch (error) {
            res.status(500).json({status:500,message:"Error",data:error.message})
        }
    }
}