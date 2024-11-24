const standardCoverModels = require("./models/Standard_cover")
const lineOfBusinessModels = require("./models/Line_of_business")
const mongoose = require("mongoose")
let toUpperCase = async (str)=>{
    if(typeof str === "string") return str.toUpperCase()
    return str
}
let getAllStandardCovered = async(lob,company,policyType)=>{
    try {
        let data
      let match = {standard_cover_status:1}  
      if(lob){
        match["standard_cover_lob"] = mongoose.Types.ObjectId(lob)
      }
      if(policyType){
        match["standard_cover_plan"] = mongoose.Types.ObjectId(policyType)
        
      }
      if(company){
        match["standard_cover_company"] = mongoose.Types.ObjectId(company)
        
      }
      data = await standardCoverModels.aggregate([
        {$match:match}
      ])
      return data

    } catch (error) {
       console.log(error) 
    }
}
let lineOfBusinessId = async (lobName)=>{
try {
  lobName = lobName?.trim()
let lobdetails
let lobId
lobdetails = await lineOfBusinessModels.aggregate([
  {
    $match:{line_of_business_name:{
      $regex:lobName,
      $options:'i'
    }}
  }

])
if(lobdetails.length){
  lobId =  lobdetails[0]?._id
  lobId = lobId?.toString()
}else{
  lobId = "642279d4fb67d39380fef82d"
}
return lobId
} catch (err) {
  console.log(err)
}
}
module.exports = {
    toUpperCase ,
    getAllStandardCovered,
    lineOfBusinessId
    

}