// const groupMedicalModels = require("../models/groupMedicalLeads")

// module.exports = {
//     pluginAdd: async (Schema,options) => {
//         // console.log("pluginAddkkkkkkkkkkkkkkkkkkkk",Schema)
//         Schema.pre("save",async function (next){
//            if(!this.serialNumber){
//             let data = await options.aggregate([
//                 {
//                     $sort:{
//                         createdAt:-1
//                     }
//                 },
//                 {
//                     $limit:1
//                 }
//             ])
//             this.serialNumber = (+data[0].serialNumber?+data[0]?.serialNumber :100) + 1
//            }
//            console.log("plugin(pluginAdd),,,,,,,,,,,,,,",this)
//             next();
//         })
//     }
//     }