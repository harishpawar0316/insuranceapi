const { default: mongoose } = require("mongoose");
const businessEntitiesModels = require("../models/Locations");
const bankModel = require("../models/Business_entity_bank");

module.exports = {
    add_business_entities: async(req,res)=>
    {
      try 
      {
        let businessEntities;
        let technical_person = [];
        let account_or_admin = [];
        let supervisor_or_manager = [];
        let payload = req.body;
        
        if(payload.technical_person_name != "")
        {
          let technical_person_dt = {};
          technical_person_dt["technical_person_name"] = payload.technical_person_name;
          technical_person_dt["technical_person_email"] = payload.technical_person_email;
          technical_person_dt["technical_person_contact"] = payload.technical_person_contact;
          technical_person.push(technical_person_dt);
          payload["technical_person"] = technical_person;
        }

        if(payload.account_or_admin_name != "")
        {
          let account_or_admin_dt = {};
          account_or_admin_dt["account_or_admin_name"] = payload.account_or_admin_name;
          account_or_admin_dt["account_or_admin_email"] = payload.account_or_admin_email;
          account_or_admin_dt["account_or_admin_contact"] = payload.account_or_admin_contact;
          account_or_admin.push(account_or_admin_dt);
          payload["account_or_admin"] = account_or_admin;
        }

        if(payload.supervisor_or_manager_name != "")
        {
          let supervisor_or_manager_dt = {};
          supervisor_or_manager_dt["supervisor_or_manager_name"] = payload.supervisor_or_manager_name;
          supervisor_or_manager_dt["supervisor_or_manager_email"] = payload.supervisor_or_manager_email;
          supervisor_or_manager_dt["supervisor_or_manager_contact"] = payload.supervisor_or_manager_contact;
          supervisor_or_manager.push(supervisor_or_manager_dt);
          payload["supervisor_or_manager"] = supervisor_or_manager;
        }
        businessEntities = await businessEntitiesModels.create(payload);
        if(!businessEntities)
        {
          return res.status(400).json({status:400, message:"Business Entities Not Created successfully",data:{}})
        }
        else
        {
          return res.status(200).json({status:200, message:"Business Entities Created successfully !",data:businessEntities})
        }
      } 
      catch (err) 
      {
        console.log(err)
      }
    },

    get_all_business_entities: async(req,res)=>
    {
      try 
      {
        let businessEntities;
        let limit;
        let skip;
        if(req.query.limit && req.query.page)
        {
          limit = +(req.query.limit);
          skip = (+req.query.page -1)*limit;
        }
        let matchObj = {};
        if(req.query?.id)
        {
          matchObj["_id"] = mongoose.Types.ObjectId(req.query?.id)
          limit = 1;
          skip = 0;
        }
        businessEntities = await businessEntitiesModels.aggregate([
          {
            $match : matchObj
          },
          {
            $lookup:
            {
              from:"nationalities",
              localField:"country",
              foreignField:"_id",
              as:"country"
            }
          },
          {
            $sort:
            {
              createdAt:-1
            }
          },
          {
            $skip:skip
          },
          {
            $limit:limit
          }
        ])
        if(!businessEntities.length)
        {
          return res.status(404).json({status:404, message:"Data Not found",data:[],total:businessEntities.length})
        }
        else
        {
          return res.status(200).json({status:200, message:"Data Find successfully !",data:businessEntities,total:businessEntities.length})
        }
      }
      catch (err) 
      {
        console.log(err)
      }
    },

    delete_business_entities: async(req,res)=>
    {
      try 
      {
        let businessEntities;
        let id = req.query.id;
        if(!id)
        {
          return res.status(404).json({status:404, message:"ID is Required",})   
        }
        businessEntities = await businessEntitiesModels.findByIdAndUpdate(id,{location_status:req.query.status == 0 ? 0 : 1},{new:true})
        if(!businessEntities)
        {
          return res.status(404).json({status:404, message:"Business Entities Status Not Updated Successfully"})
        }
        return res.status(200).json({status:200, message:"Business Entities Status Updated Successfully !!"})
      } 
      catch (err) 
      {
        console.log(err)
      }
    },

    update_business_entities: async(req,res)=>
    {
      try 
      {
        let businessEntities;
        let id = req.query.id;
        let technical_person = [];
        let account_or_admin = [];
        let supervisor_or_manager = [];
        let payload = req.body;
        if(payload.technical_person_name != "")
        {
          let technical_person_dt = {};
          technical_person_dt["technical_person_name"] = payload.technical_person_name;
          technical_person_dt["technical_person_email"] = payload.technical_person_email;
          technical_person_dt["technical_person_contact"] = payload.technical_person_contact;
          technical_person.push(technical_person_dt);
          payload["technical_person"] = technical_person;
        }

        if(payload.account_or_admin_name != "")
        {
          let account_or_admin_dt = {};
          account_or_admin_dt["account_or_admin_name"] = payload.account_or_admin_name;
          account_or_admin_dt["account_or_admin_email"] = payload.account_or_admin_email;
          account_or_admin_dt["account_or_admin_contact"] = payload.account_or_admin_contact;
          account_or_admin.push(account_or_admin_dt);
          payload["account_or_admin"] = account_or_admin;
        }

        if(payload.supervisor_or_manager_name != "")
        {
          let supervisor_or_manager_dt = {};
          supervisor_or_manager_dt["supervisor_or_manager_name"] = payload.supervisor_or_manager_name;
          supervisor_or_manager_dt["supervisor_or_manager_email"] = payload.supervisor_or_manager_email;
          supervisor_or_manager_dt["supervisor_or_manager_contact"] = payload.supervisor_or_manager_contact;
          supervisor_or_manager.push(supervisor_or_manager_dt);
          payload["supervisor_or_manager"] = supervisor_or_manager;
        }
        if(!id)
        {
          return res.status(404).json({status:404, message:"ID is Required",})   
        }
        businessEntities = await businessEntitiesModels.findByIdAndUpdate(id,payload,{new:true})
        if(!businessEntities)
        {
          return res.status(404).json({status:404, message:"Business Entities Not Updated Successfully"})
        }
        return res.status(200).json({status:200, message:"Business Entities Updated Successfully !!"})
      } 
      catch (err) 
      {
        console.log(err)
      }
    },

    add_business_entity_bank : async (req, res) => {
      let banks = new bankModel({
        businessentityid: req.body.business_entity_id,
        bankname: req.body.bank_name,
        accountnumber: req.body.bank_account_number,
        ibannumber: req.body.iban_number,
        line_of_business_id: req.body.line_of_business,
      });
      let result = await banks.save();
      if (result != null) {
          res.json({ status: 200, message: "Bank Added Successfully!", data: result });
      }
      else {
          res.json({ status: 400, message: "Bank Not Added Successfully!" });
      }
    },

    get_business_entity_bank: async (req, res) => {
        const id = req.body.business_entity_id;
        const page = req.params.page;
        const limit = req.params.limit;
        try {
            const result = await bankModel.aggregate([
                {
                    $match: {
                      businessentityid: id
                    }
                },
                {
                    $lookup: {
                        from: "line_of_businesses",
                        localField: "line_of_business_id",
                        foreignField: "_id",
                        as: "line_of_business"
                    }
                },
            ]).limit(limit * 1).skip((page - 1) * limit).exec();
            const count = await bankModel.find({businessentityid: id}).countDocuments();
            res.json({ status: 200, message: "Data Found", data: result, total: count });
        }
        catch (err) {
            res.send(err)
        }
    },

    get_business_entity_bank_details : async (req, res) => {
        const id = req.body.id;
        const bank_data = await bankModel.findById(id);
        if(bank_data != null)
        {
            res.json({ status: 200, message: "Data Found", data: bank_data });
        }
        else
        {
            res.json({ status: 400, message: "Data Not Found" });
        }
    },

    update_business_entity_bank : async (req, res) => {
        const id = req.body.bank_id;
        const bank_data = await bankModel.findByIdAndUpdate(id, {
            bankname: req.body.bank_name,
            accountnumber: req.body.bank_account_number,
            ibannumber: req.body.iban_number,
            line_of_business_id: req.body.line_of_business
        });
        if (bank_data != null) {
            res.json({ status: 200, message: "Bank Updated Successfully" });
        }
        else {
            res.json({ status: 400, message: "Bank Not Updated Successfully" });
        }
    },

    update_business_entity_bank_status : async (req, res) => {
        const id = req.params.id;
        const bank_status = req.body.status;
        const bank_data = await bankModel.findByIdAndUpdate(id, {
            bankstatus: bank_status,
        });
        if (bank_data != null) 
        {
            if (bank_status == 0) 
            {
                res.json({ status: 200, message: "Bank Deactivated Successfully" });
            }
            else 
            {
                res.json({ status: 200, message: "Bank Activated Successfully" });
            }
        }
        else 
        {
            res.json({ status: 400, message: "Bank Not Deactivated Successfully" });
        }
    },
}