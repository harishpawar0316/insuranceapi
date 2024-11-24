const bussinesEntityTopupModel = require("../models/BusinessEntityTopup");
const {ObjectId} = require("./monogooseObjId")
const bussinesEntityTopup = async (locationId,companyId,lobId)=>{
    try {
        let totupDetails
        let topup
        let matchObj = {};
        if(locationId){
            matchObj["location"] = await ObjectId(locationId)
        }
        if(companyId){
            matchObj["company.company_id"] = await ObjectId(companyId)
        }
        if(lobId){
            matchObj["lob"] = await ObjectId(lobId)
        }
        totupDetails = await bussinesEntityTopupModel.aggregate([
            {
                $match: matchObj,
            }
        ])
        totupDetails = totupDetails[0]

        console.log("..................",totupDetails,{matchObj})
        let comaDetails = totupDetails?.company
        for(let i=0; i<comaDetails?.length; i++) {
            if(companyId?.toString() == comaDetails[i]?.company_id?.toString()){
                topup = comaDetails[i]?.rate
            }
        }
        console.log("....................topup",topup)
        return topup
    } catch (error) {
      console.log(error);  
    }
}
// bussinesEntityTopup("6414662cd4df155bc09b45b4","64f1d66f9a434f5bc41778e2","658bf04ed4c9b13ffb6ddb8a")
module.exports = {bussinesEntityTopup}