const groupMedicalModels = require("../models/groupMedicalLeads")

module.exports = {
    groupSerialNumber: async ()=>{
        let groupLeads 
        let serialNumber
         groupLeads = await groupMedicalModels.aggregate([
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $limit:1
            }
        ])
        serialNumber= (+groupLeads[0]?.serialNumber?+groupLeads[0]?.serialNumber :100) + 1
        return +serialNumber
    }
}