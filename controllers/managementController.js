const { Motor_permission } = require("../models/managements/moter");
const { Travel_permission } = require("../models/managements/travel");
const { Home_permission } = require("../models/managements/home");
const { Medical_permission } = require("../models/managements/medical");
const { Yacht_permission } = require("../models/managements/yacht");
const { Common_master_permission } = require("../models/managements/common_master");
const { Dashboard_permission } = require("../models/managements/dashboard");
const { Group_Medical_permission } = require("../models/managements/groupmedical");
const { Module } = require("../models/managements/module");
const mongoose = require("mongoose");

module.exports = 
{
  get_all_permission: async (req, res) => 
  {
    try 
    {
      console.log("Medical_permission",Medical_permission);
      console.log("Group_medical_permissions",Group_Medical_permission);
      const user_id = req.params.id;
      console.log(user_id,"user_id");
      const user_type_id = mongoose.Types.ObjectId(req.params.id);

      console.log(user_type_id,"user_type_id");  

     
      let motor_permission = await Motor_permission.find({user_type_id:user_type_id});
      let travel_permission = await Travel_permission.find({user_type_id:user_type_id});
      let home_permission = await Home_permission.find({user_type_id:user_type_id});
      let medical_permission = await Medical_permission.find({user_type_id:user_type_id});
      let yacht_permission = await Yacht_permission.find({user_type_id:user_type_id});
      let common_permission = await Common_master_permission.find({user_type_id:user_type_id});
      let dashboard_permission = await Dashboard_permission.find({user_type_id:user_type_id});
      let group_medical_permission = await Group_Medical_permission.find({user_type_id:user_type_id});
      let array  = []
      array.push({module_name:"Motor",permission:motor_permission})
      array.push({module_name:"Travel",permission:travel_permission})
      array.push({module_name:"Home",permission:home_permission})
      array.push({module_name:"Medical",permission:medical_permission})
      array.push({module_name:"Yacht",permission:yacht_permission})
      array.push({module_name:"Master",permission:common_permission})
      array.push({module_name:"Dashboard",permission:dashboard_permission})
      array.push({module_name:"Group",permission:group_medical_permission})
      
      return res.json({status: 200, message: "Data Find Succesfully", data: array});
    } 
    catch (err) 
    {
      console.log(err);
    }
  },

  update_permission: async (req, res) => 
  {
    try 
    {
      let result = 0;
      let payload = req.body;

      if(payload?.Motor?.length>0)
      {
        let bakendPayload = {};
        let motorPayload = payload.Motor;
        let motorData = await Motor_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        motorData = motorData[0];
        if(motorData)
        {
          let id = motorData?._id;
          for(let obj of motorPayload)
          {
            if(obj["Make Motor"]?.length>0)
            {
              let make_motor = motorData?.make_motor;
              if(!make_motor)
              {
                make_motor = [];
              }
              for(let obj1 of obj["Make Motor"])
              {
                if(obj1.value)
                {
                  if(make_motor.indexOf(obj1.key) == -1)
                  {
                    make_motor.push(obj1.key);
                  }
                }
                else
                {
                  make_motor.splice(make_motor.indexOf(obj1.key),1);
                }
              }
              bakendPayload["make_motor"] = make_motor;
            }
            if(obj["Model Motor"]?.length>0)
            {
              let model_motor = motorData?.model_motor;
              if(!model_motor)
              {
                model_motor = [];
              }
              for(let obj1 of obj["Model Motor"])
              {
                if(obj1.value)
                {
                  if(model_motor.indexOf(obj1.key) == -1)
                  {
                    model_motor.push(obj1.key);
                  }
                }
                else
                {
                  model_motor.splice(model_motor.indexOf(obj1.key),1);
                }
              }
              bakendPayload["model_motor"] = model_motor;
            }
            if(obj["Motor Model details"]?.length>0)
            {
              let motor_model_details = motorData?.motor_model_details;
              if(!motor_model_details)
              {
                motor_model_details = [];
              }
              for(let obj1 of obj["Motor Model details"])
              {
                if(obj1.value)
                {
                  if(motor_model_details.indexOf(obj1.key) == -1)
                  {
                    motor_model_details.push(obj1.key);
                  }
                }
                else
                {
                  motor_model_details.splice(motor_model_details.indexOf(obj1.key),1);
                }
              }
              bakendPayload["motor_model_details"] = motor_model_details;
            }
            if(obj["Body Type"]?.length>0)
            {
              let body_type = motorData?.body_type;
              if(!body_type)
              {
                body_type = [];
              }
              for(let obj1 of obj["Body Type"])
              {
                if(obj1.value)
                {
                  if(body_type.indexOf(obj1.key) == -1)
                  {
                    body_type.push(obj1.key);
                  }
                }
                else
                {
                  body_type.splice(body_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["body_type"] = body_type;
            }
            if(obj["Area Of Registration"]?.length>0)
            {
              let area_of_registration = motorData?.area_of_registration;
              if(!area_of_registration)
              {
                area_of_registration = [];
              }
              for(let obj1 of obj["Area Of Registration"])
              {
                if(obj1.value)
                {
                  if(area_of_registration.indexOf(obj1.key) == -1)
                  {
                    area_of_registration.push(obj1.key);
                  }
                }
                else
                {
                  area_of_registration.splice(area_of_registration.indexOf(obj1.key),1);
                }
              }
              bakendPayload["area_of_registration"] = area_of_registration;
            }
            if(obj[ "Repair Type"]?.length>0)
            {
              let repair_type = motorData?.repair_type;
              if(!repair_type)
              {
                repair_type = [];
              }
              for(let obj1 of obj[ "Repair Type"])
              {
                if(obj1.value)
                {
                  if(repair_type.indexOf(obj1.key) == -1)
                  {
                    repair_type.push(obj1.key);
                  }
                }
                else
                {
                  repair_type.splice(repair_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["repair_type"] = repair_type;
            }
            if(obj["Business Type"]?.length>0)
            {
              let business_type = motorData?.business_type;
              if(!business_type)
              {
                business_type = [];
              }
              for(let obj1 of obj["Business Type"])
              {
                if(obj1.value)
                {
                  if(business_type.indexOf(obj1.key) == -1)
                  {
                    business_type.push(obj1.key);
                  }
                }
                else
                {
                  business_type.splice(business_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["business_type"] = business_type;
            }
            if(obj["Motor Plan"]?.length>0)
            {
              let motor_plan = motorData?.motor_plan;
              if(!motor_plan)
              {
                motor_plan = [];
              }
              for(let obj1 of obj["Motor Plan"])
              {
                if(obj1.value)
                {
                  if(motor_plan.indexOf(obj1.key) == -1)
                  {
                    motor_plan.push(obj1.key);
                  }
                }
                else
                {
                  motor_plan.splice(motor_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["motor_plan"] = motor_plan;
            }
            if(obj["Motor claim years"]?.length>0)
            {

              let motor_claim_years = motorData?.motor_claim_years;
              console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",motor_claim_years)
              if(!motor_claim_years)
              {
                motor_claim_years = [];
              }
              for(let obj1 of obj["Motor claim years"])
              {
                if(obj1.value)
                {
                  if(motor_claim_years.indexOf(obj1.key) == -1)
                  {
                    motor_claim_years.push(obj1.key);
                  }
                }
                else
                {
                  motor_claim_years.splice(motor_claim_years.indexOf(obj1.key),1);
                }
              }
              bakendPayload["motor_claim_years"] = motor_claim_years;
            }
          }
          let updatedDaccument = await Motor_permission.updateOne({_id:id},{$set:bakendPayload},{new:true});
          result = 1;
        }
        else
        {
          for(let obj of motorPayload)
          {
            if(obj["Make Motor"]?.length>0)
            {
              let make_motor = [];
              for(let obj1 of obj["Make Motor"])
              {
                if(obj1.value)
                {
                  make_motor.push(obj1.key);
                }
              }
              bakendPayload["make_motor"] = make_motor;
            }
            if(obj["Model Motor"]?.length>0)
            {
              let model_motor = [];
              for(let obj1 of obj["Model Motor"])
              {
                if(obj1.value)
                {
                  model_motor.push(obj1.key);
                }
              }
              bakendPayload["model_motor"] = model_motor;
            }
            if(obj["Motor Model details"]?.length>0)
            {
              let motor_model_details = [];
              for(let obj1 of obj["Motor Model details"])
              {
                if(obj1.value)
                {
                  motor_model_details.push(obj1.key);
                }
              }
              bakendPayload["motor_model_details"] = motor_model_details;
            }
            if(obj["Body Type"]?.length>0)
            {
              let body_type = [];
              for(let obj1 of obj["Body Type"])
              {
                if(obj1.value)
                {
                  body_type.push(obj1.key);
                }
              }
              bakendPayload["body_type"] = body_type;
            }
            if(obj["Area Of Registration"]?.length>0)
            {
              let area_of_registration = [];
              for(let obj1 of obj["Area Of Registration"])
              {
                if(obj1.value)
                {
                  area_of_registration.push(obj1.key);
                }
              }
              bakendPayload["area_of_registration"] = area_of_registration;
            }
            if(obj["Repair Type"]?.length>0)
            {
              let repair_type = []
              for(let obj1 of obj["Repair Type"])
              {
                if(obj1.value)
                {
                  repair_type.push(obj1.key);
                }
              }
              bakendPayload["repair_type"] = repair_type;
            }
            if(obj["Business Type"]?.length>0)
            {
              let business_type = [];
              for(let obj1 of obj["Business Type"])
              {
                if(obj1.value)
                {
                  business_type.push(obj1.key);
                }
              }
              bakendPayload["business_type"]= business_type
            }
            if(obj["Motor Plan"]?.length>0)
            {
              let motor_plan = [];
              for(let obj1 of obj["Motor Plan"])
              {
                if(obj1.value)
                {
                  motor_plan.push(obj1.key);
                }
              }
              bakendPayload["motor_plan"] = motor_plan
            }
            if(obj["Motor claim years"]?.length>0)
            {
              let motor_claim_years = [];
              for(let obj1 of obj["Motor claim years"])
              {
                if(obj1.value)
                {
                  motor_claim_years.push(obj1.key);
                }
              }
              bakendPayload["motor_claim_years"] = motor_claim_years
            }
          }
          let newdaccument = await Motor_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Travel?.length>0)
      {
        let bakendPayload = {};
        let travelPayload = payload.Travel;
        let travelData = await Travel_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        travelData = travelData[0];
        if(travelData)
        {
          let id = travelData?._id;
          for(let obj of travelPayload)
          {
            if(obj["Travel Insurance For"]?.length>0)
            {
              let travel_insurance_for = travelData?.travel_insurance_for;
              if(!travel_insurance_for)
              {
                travel_insurance_for = [];
              }
              for(let obj1 of obj["Travel Insurance For"])
              {
                if(obj1.value)
                {
                  if(travel_insurance_for.indexOf(obj1.key) == -1)
                  {
                    travel_insurance_for.push(obj1.key);
                  }
                }
                else
                {
                  travel_insurance_for.splice(travel_insurance_for.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_insurance_for"] = travel_insurance_for;
            }
            if(obj["Travel Type"]?.length>0)
            {
              let travel_type = travelData?.travel_type;
              if(!travel_type)
              {
                travel_type = [];
              }
              for(let obj1 of obj["Travel Type"])
              {
                if(obj1.value)
                {
                  if(travel_type.indexOf(obj1.key) == -1)
                  {
                    travel_type.push(obj1.key);
                  }
                }
                else
                {
                  travel_type.splice(travel_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_type"] = travel_type;
            }
            if(obj["Travel Plan Type"]?.length>0)
            {
              let travel_plan_type = travelData?.travel_plan_type;
              if(!travel_plan_type)
              {
                travel_plan_type = [];
              }
              for(let obj1 of obj["Travel Plan Type"])
              {
                if(obj1.value)
                {
                  if(travel_plan_type.indexOf(obj1.key) == -1)
                  {
                    travel_plan_type.push(obj1.key);
                  }
                }
                else
                {
                  travel_plan_type.splice(travel_plan_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_plan_type"] = travel_plan_type
            }
            if(obj["Travel Region List"]?.length>0)
            {
              let travel_region_list = travelData?.travel_region_list;
              if(!travel_region_list)
              {
                travel_region_list = [];
              }
              for(let obj1 of obj["Travel Region List"])
              {
                if(obj1.value)
                {
                  if(travel_region_list.indexOf(obj1.key) == -1)
                  {
                    travel_region_list.push(obj1.key);
                  }
                }
                else
                {
                  travel_region_list.splice(travel_region_list.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_region_list"] = travel_region_list;
            }
            if(obj["Travel Cover Type"]?.length>0)
            {
              let travel_cover_type = travelData?.travel_cover_type;
              if(!travel_cover_type)
              {
                travel_cover_type = [];
              }
              for(let obj1 of obj["Travel Cover Type"])
              {
                if(obj1.value)
                {
                  if(travel_cover_type.indexOf(obj1.key) == -1)
                  {
                    travel_cover_type.push(obj1.key);
                  }
                }
                else
                {
                  travel_cover_type.splice(travel_cover_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_cover_type"] = travel_cover_type
            }
            if(obj["Travel Plan"]?.length>0)
            {
              let travel_plan = travelData?.travel_plan;
              if(!travel_plan)
              {
                travel_plan = [];
              }
              for(let obj1 of obj["Travel Plan"])
              {
                if(obj1.value)
                {
                  if(travel_plan.indexOf(obj1.key) == -1)
                  {
                    travel_plan.push(obj1.key);
                  }
                }
                else
                {
                  travel_plan.splice(travel_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["travel_plan"] = travel_plan
            }
          }
          let updatedTravel = await Travel_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of travelPayload)
          {
            if(obj["Travel Insurance For"]?.length>0)
            {
              let travel_insurance_for = [];
              for(let obj1 of obj["Travel Insurance For"])
              {
                if(obj1.value)
                {
                  travel_insurance_for.push(obj1.key);
                }
              }
              bakendPayload["travel_insurance_for"] = travel_insurance_for;
            }
            if(obj["Travel Type"]?.length>0)
            {
              let travel_type = [];
              for(let obj1 of obj["Travel Type"])
              {
                if(obj1.value)
                {
                  travel_type.push(obj1.key);
                }
              }
              bakendPayload["travel_type"] = travel_type;
            }
            if(obj[ "Travel Plan Type"]?.length>0)
            {
              let travel_plan_type = [];
              for(let obj1 of obj[ "Travel Plan Type"])
              {
                if(obj1.value)
                {
                  travel_plan_type.push(obj1.key);
                }
              }
              bakendPayload["travel_plan_type"] = travel_plan_type
            }
            if(obj["Travel Region List"]?.length>0)
            {
              let travel_region_list = []
              for(let obj1 of obj["Travel Region List"])
              {
                if(obj1.value)
                {
                  travel_region_list.push(obj1.key);
                }
              }
              bakendPayload["travel_region_list"]=travel_region_list
            }
            if(obj["Travel Cover Type"]?.length>0)
            {
              let travel_cover_type = []
              for(let obj1 of obj["Travel Cover Type"])
              {
                if(obj1.value)
                {
                  travel_cover_type.push(obj1.key);
                }
              }
              bakendPayload["travel_cover_type"] = travel_cover_type;
            }
            if(obj["Travel Plan"]?.length>0)
            {
              let travel_plan = []
              for(let obj1 of obj["Travel Plan"])
              {
                if(obj1.value)
                {
                  travel_plan.push(obj1.key);
                }
              }
              bakendPayload["travel_plan"] = travel_plan;
            }
          }
          let newTravel = await Travel_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Home?.length>0)
      {
        let bakendPayload = {};
        let homePayload = payload.Home;
        let homeData = await Home_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        homeData = homeData[0];
        if(homeData)
        {
          let id = homeData?._id;
          for(let obj of homePayload)
          {
            if(obj["Property Type"]?.length>0)
            {
              let property_type = homeData?.property_type;
              if(!property_type)
              {
                property_type = [];
              }
              for(let obj1 of obj["Property Type"])
              {
                if(obj1.value)
                {
                  if(property_type.indexOf(obj1.key) == -1)
                  {
                    property_type.push(obj1.key);
                  }
                }
                else
                {
                  property_type.splice(property_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["property_type"] = property_type
            }
            if(obj["Home Plan Type"]?.length>0)
            {
              let home_plan_type = homeData?.home_plan_type;
              if(!home_plan_type)
              {
                home_plan_type = [];
              }
              for(let obj1 of obj["Home Plan Type"])
              {
                if(obj1.value)
                {
                  if(home_plan_type.indexOf(obj1.key) == -1)
                  {
                    home_plan_type.push(obj1.key);
                  }
                }
                else
                {
                  home_plan_type.splice(home_plan_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["home_plan_type"] = home_plan_type
            }
            if(obj["Home Ownership Type"]?.length>0)
            {
              let home_ownership_type = homeData?.home_ownership_type;
              if(!home_ownership_type)
              {
                home_ownership_type = [];
              }
              for(let obj1 of obj["Home Ownership Type"])
              {
                if(obj1.value)
                {
                  if(home_ownership_type.indexOf(obj1.key) == -1)
                  {
                    home_ownership_type.push(obj1.key);
                  }
                }
                else
                {
                  home_ownership_type.splice(home_ownership_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["home_ownership_type"] = home_ownership_type
            }
            if(obj["Home Condition"]?.length>0)
            {
              let home_condition = homeData?.home_condition;
              if(!home_condition)
              {
                home_condition = [];
              }
              for(let obj1 of obj["Home Condition"])
              {
                if(obj1.value)
                {
                  if(home_condition.indexOf(obj1.key) == -1)
                  {
                    home_condition.push(obj1.key);
                  }
                }
                else
                {
                  home_condition.splice(home_condition.indexOf(obj1.key),1);
                }
              }
              bakendPayload["home_condition"] = home_condition
            }
            if(obj["Additional Home Condition"]?.length>0)
            {
              let additional_home_condition = homeData?.additional_home_condition;
              if(!additional_home_condition)
              {
                additional_home_condition = [];
              }
              for(let obj1 of obj["Additional Home Condition"])
              {
                if(obj1.value)
                {
                  if(additional_home_condition.indexOf(obj1.key) == -1)
                  {
                    additional_home_condition.push(obj1.key);
                  }
                }
                else
                {
                  additional_home_condition.splice(additional_home_condition.indexOf(obj1.key),1);
                }
              }
              bakendPayload["additional_home_condition"] = additional_home_condition
            }
            if(obj["Home Plan"]?.length>0)
            {
              let home_plan = homeData?.home_plan;
              if(!home_plan)
              {
                home_plan = [];
              }
              for(let obj1 of obj["Home Plan"])
              {
                if(obj1.value)
                {
                  if(home_plan.indexOf(obj1.key) == -1)
                  {
                    home_plan.push(obj1.key);
                  }
                }
                else
                {
                  home_plan.splice(home_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["home_plan"] = home_plan
            }
          }
          let updatedHome = await Home_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of homePayload)
          {
            if(obj["Property Type"]?.length>0)
            {
              let property_type = []
              for(let obj1 of obj["Property Type"])
              {
                if(obj1.value)
                {
                  property_type.push(obj1.key);
                }
              }
              bakendPayload["property_type"] = property_type;
            }
            if(obj["Home Plan Type"]?.length>0)
            {
              let home_plan_type = [];
              for(let obj1 of obj["Home Plan Type"])
              {
                if(obj1.value)
                {
                  home_plan_type.push(obj1.key);
                }
              }
              bakendPayload["home_plan_type"] = home_plan_type;
            }
            if(obj["Home Ownership Type"]?.length>0)
            {
              let home_ownership_type = [];
              for(let obj1 of obj["Home Ownership Type"])
              {
                if(obj1.value)
                {
                  home_ownership_type.push(obj1.key);
                }
              }
              bakendPayload["home_ownership_type"] = home_ownership_type;
            }
            if(obj["Home Condition"]?.length>0)
            {
              let home_condition = [];
              for(let obj1 of obj["Home Condition"])
              {
                if(obj1.value)
                {
                  home_condition.push(obj1.key);
                }
              }
              bakendPayload["home_condition"] = home_condition;
            }
            if(obj["Additional Home Condition"]?.length>0)
            {
              let additional_home_condition = [];
              for(let obj1 of obj["Additional Home Condition"])
              {
                if(obj1.value)
                {
                  additional_home_condition.push(obj1.key);
                }
              }
              bakendPayload["additional_home_condition"] = additional_home_condition;
            }
            if(obj["Home Plan"]?.length>0)
            {
              let home_plan = [];
              for(let obj1 of obj["Home Plan"])
              {
                if(obj1.value)
                {
                  home_plan.push(obj1.key);
                }
              }
              bakendPayload["home_plan"] = home_plan;
            }
          }
          let newHome = await Home_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Yacht?.length>0)
      {
        let bakendPayload = {};
        let yatchPayload = payload.Yacht;
        let yatchData = await Yacht_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        yatchData = yatchData[0];
        if(yatchData)
        {
          let id = yatchData?._id;
          for(let obj of yatchPayload)
          {
            if(obj["Year Code"]?.length>0)
            {
              let year_code = yatchData?.year_code;
              if(!year_code)
              {
                year_code = [];
              }
              for(let obj1 of obj["Year Code"])
              {
                if(obj1.value)
                {
                  if(year_code.indexOf(obj1.key) == -1)
                  {
                    year_code.push(obj1.key);
                  }
                }
                else
                {
                  year_code.splice(year_code.indexOf(obj1.key),1);
                }
              }
              bakendPayload["year_code"] = year_code;
            }
            if(obj["Yacht Make"]?.length>0)
            {
              let yacht_make = yatchData?.yacht_make;
              if(!yacht_make)
              {
                yacht_make = [];
              }
              for(let obj1 of obj["Yacht Make"])
              {
                if(obj1.value)
                {
                  if(yacht_make.indexOf(obj1.key) == -1)
                  {
                    yacht_make.push(obj1.key);
                  }
                }
                else
                {
                  yacht_make.splice(yacht_make.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_make"] = yacht_make;
            }
            if(obj["Yacht Model"]?.length>0)
            {
              let yacht_model = yatchData?.yacht_model;
              if(!yacht_model)
              {
                yacht_model = [];
              }
              for(let obj1 of obj["Yacht Model"])
              {
                if(obj1.value)
                {
                  if(yacht_model.indexOf(obj1.key) == -1)
                  {
                    yacht_model.push(obj1.key);
                  }
                }
                else
                {
                  yacht_model.splice(yacht_model.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_model"] = yacht_model;
            }
            if(obj["Yacht Engine"]?.length>0)
            {
              let yacht_engine = yatchData?.yacht_engine;
              if(!yacht_engine)
              {
                yacht_engine = [];
              }
              for(let obj1 of obj["Yacht Engine"])
              {
                if(obj1.value)
                {
                  if(yacht_engine.indexOf(obj1.key) == -1)
                  {
                    yacht_engine.push(obj1.key);
                  }
                }
                else
                {
                  yacht_engine.splice(yacht_engine.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_engine"] = yacht_engine;
            }
            if(obj["Yacht Body Type"]?.length>0)
            {
              let yacht_body_type = yatchData?.yacht_body_type;
              if(!yacht_body_type)
              {
                yacht_body_type = [];
              }
              for(let obj1 of obj["Yacht Body Type"])
              {
                if(obj1.value)
                {
                  if(yacht_body_type.indexOf(obj1.key) == -1)
                  {
                    yacht_body_type.push(obj1.key);
                  }
                }
                else
                {
                  yacht_body_type.splice(yacht_body_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_body_type"] = yacht_body_type;
            }
            if(obj["Hull Material"]?.length>0)
            {
              let hull_material = yatchData?.hull_material;
              if(!hull_material)
              {
                hull_material = [];
              }
              for(let obj1 of obj["Hull Material"])
              {
                if(obj1.value)
                {
                  if(hull_material.indexOf(obj1.key) == -1)
                  {
                    hull_material.push(obj1.key);
                  }
                }
                else
                {
                  hull_material.splice(hull_material.indexOf(obj1.key),1);
                }
              }
              bakendPayload["hull_material"] = hull_material;
            }
            if(obj["Horse Power List"]?.length>0)
            {
              let horse_power_list = yatchData?.horse_power_list;
              if(!horse_power_list)
              {
                horse_power_list = [];
              }
              for(let obj1 of obj["Horse Power List"])
              {
                if(obj1.value)
                {
                  if(horse_power_list.indexOf(obj1.key) == -1)
                  {
                    horse_power_list.push(obj1.key);
                  }
                }
                else
                {
                  horse_power_list.splice(horse_power_list.indexOf(obj1.key),1);
                }
              }
              bakendPayload["horse_power_list"] = horse_power_list;
            }
            if(obj["Engine List"]?.length>0)
            {
              let engine_list = yatchData?.engine_list;
              if(!engine_list)
              {
                engine_list = [];
              }
              for(let obj1 of obj["Engine List"])
              {
                if(obj1.value)
                {
                  if(engine_list.indexOf(obj1.key) == -1)
                  {
                    engine_list.push(obj1.key);
                  }
                }
                else
                {
                  engine_list.splice(engine_list.indexOf(obj1.key),1);
                }
              }
              bakendPayload["engine_list"] = engine_list;
            }
            if(obj["Speed knots List"]?.length>0)
            {
              let speed_knots_list = yatchData?.speed_knots_list;
              if(!speed_knots_list)
              {
                speed_knots_list = [];
              }
              for(let obj1 of obj["Speed knots List"])
              {
                if(obj1.value)
                {
                  if(speed_knots_list.indexOf(obj1.key) == -1)
                  {
                    speed_knots_list.push(obj1.key);
                  }
                }
                else
                {
                  speed_knots_list.splice(speed_knots_list.indexOf(obj1.key),1);
                }
              }
              bakendPayload["speed_knots_list"] = speed_knots_list;
            }
            if(obj["Yacht Condition"]?.length>0)
            {
              let yacht_condition = yatchData?.yacht_condition;
              if(!yacht_condition)
              {
                yacht_condition = [];
              }
              for(let obj1 of obj["Yacht Condition"])
              {
                if(obj1.value)
                {
                  if(yacht_condition.indexOf(obj1.key) == -1)
                  {
                    yacht_condition.push(obj1.key);
                  }
                }
                else
                {
                  yacht_condition.splice(yacht_condition.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_condition"] = yacht_condition;
            }
            if(obj["Yacht Experience"]?.length>0)
            {
              let yacht_experience = yatchData?.yacht_experience;
              if(!yacht_experience)
              {
                yacht_experience = [];
              }
              for(let obj1 of obj["Yacht Experience"])
              {
                if(obj1.value)
                {
                  if(yacht_experience.indexOf(obj1.key) == -1)
                  {
                    yacht_experience.push(obj1.key);
                  }
                }
                else
                {
                  yacht_experience.splice(yacht_experience.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_experience"] = yacht_experience;
            }
            if(obj["Yacht Questionnaire"]?.length>0)
            {
              let yacht_questionnaire = yatchData?.yacht_questionnaire;
              if(!yacht_questionnaire)
              {
                yacht_questionnaire = [];
              }
              for(let obj1 of obj["Yacht Questionnaire"])
              {
                if(obj1.value)
                {
                  if(yacht_questionnaire.indexOf(obj1.key) == -1)
                  {
                    yacht_questionnaire.push(obj1.key);
                  }
                }
                else
                {
                  yacht_questionnaire.splice(yacht_questionnaire.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_questionnaire"] = yacht_questionnaire;
            }
            if(obj["Yacht Plan"]?.length>0)
            {
              let yacht_plan = yatchData?.yacht_plan;
              if(!yacht_plan)
              {
                yacht_plan = [];
              }
              for(let obj1 of obj["Yacht Plan"])
              {
                if(obj1.value)
                {
                  if(yacht_plan.indexOf(obj1.key) == -1)
                  {
                    yacht_plan.push(obj1.key);
                  }
                }
                else
                {
                  yacht_plan.splice(yacht_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["yacht_plan"] = yacht_plan;
            }
            if(obj["Boat Breadth"]?.length>0)
            {
              let boat_breadth = yatchData?.boat_breadth;
              if(!boat_breadth)
              {
                boat_breadth = [];
              }
              for(let obj1 of obj["Boat Breadth"])
              {
                if(obj1.value)
                {
                  if(boat_breadth.indexOf(obj1.key) == -1)
                  {
                    boat_breadth.push(obj1.key);
                  }
                }
                else
                {
                  boat_breadth.splice(boat_breadth.indexOf(obj1.key),1);
                }
              }
              bakendPayload["boat_breadth"] = boat_breadth;
            }
          }
          let updatedYatch = await Yacht_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of yatchPayload)
          {
            if(obj["Year Code"]?.length>0)
            {
              let year_code = [];
              for(let obj1 of obj["Year Code"])
              {
                if(obj1.value)
                {
                  year_code.push(obj1.key);
                }
              }
              bakendPayload["year_code"] = year_code;
            }
            if(obj["Yacht Make"]?.length>0)
            {
              let yacht_make = [];
              for(let obj1 of obj["Yacht Make"])
              {
                if(obj1.value)
                {
                  yacht_make.push(obj1.key);
                }
              }
              bakendPayload["yacht_make"] = yacht_make;
            }
            if(obj["Yacht Model"]?.length>0)
            {
              let yacht_model = [];
              for(let obj1 of obj["Yacht Model"])
              {
                if(obj1.value)
                {
                  yacht_model.push(obj1.key);
                }
              }
              bakendPayload["yacht_model"] = yacht_model;
            }
            if(obj["Yacht Engine"]?.length>0)
            {
              let yacht_engine = [];
              for(let obj1 of obj["Yacht Engine"])
              {
                if(obj1.value)
                {
                  yacht_engine.push(obj1.key);
                }
              }
              bakendPayload["yacht_engine"] = yacht_engine;
            }
            if(obj["Yacht Body Type"]?.length>0)
            {
              let yacht_body_type = [];
              for(let obj1 of obj["Yacht Body Type"])
              {
                if(obj1.value)
                {
                  yacht_body_type.push(obj1.key);
                }
              }
              bakendPayload["yacht_body_type"] = yacht_body_type;
            }
            if(obj["Hull Material"]?.length>0)
            {
              let hull_material = [];
              for(let obj1 of obj["Hull Material"])
              {
                if(obj1.value)
                {
                  hull_material.push(obj1.key);
                }
              }
              bakendPayload["hull_material"] = hull_material;
            }
            if(obj["Horse Power List"]?.length>0)
            {
              let horse_power_list = [];
              for(let obj1 of obj["Horse Power List"])
              {
                if(obj1.value)
                {
                  horse_power_list.push(obj1.key);
                }
              }
              bakendPayload["horse_power_list"] = horse_power_list;
            }
            if(obj["Engine List"]?.length>0)
            {
              let engine_list = [];
              for(let obj1 of obj["Engine List"])
              {
                if(obj1.value)
                {
                  engine_list.push(obj1.key);
                }
              }
              bakendPayload["engine_list"] = engine_list;
            }
            if(obj["Speed knots List"]?.length>0)
            {
              let speed_knots_list = [];
              for(let obj1 of obj["Speed knots List"])
              {
                if(obj1.value)
                {
                  speed_knots_list.push(obj1.key);
                }
              }
              bakendPayload["speed_knots_list"] = speed_knots_list;
            }
            if(obj["Yacht Condition"]?.length>0)
            {
              let yacht_condition = [];
              for(let obj1 of obj["Yacht Condition"])
              {
                if(obj1.value)
                {
                  yacht_condition.push(obj1.key);
                }
              }
              bakendPayload["yacht_condition"] = yacht_condition;
            }
            if(obj["Yacht Experience"]?.length>0)
            {
              let yacht_experience = [];
              for(let obj1 of obj["Yacht Experience"])
              {
                if(obj1.value)
                {
                  yacht_experience.push(obj1.key);
                }
              }
              bakendPayload["yacht_experience"] = yacht_experience;
            }
            if(obj["Yacht Questionnaire"]?.length>0)
            {
              let yacht_questionnaire = [];
              for(let obj1 of obj["Yacht Questionnaire"])
              {
                if(obj1.value)
                {
                  yacht_questionnaire.push(obj1.key);
                }
              }
              bakendPayload["yacht_questionnaire"] = yacht_questionnaire;
            }
            if(obj["Yacht Plan"]?.length>0)
            {
              let yacht_plan = [];
              for(let obj1 of obj["Yacht Plan"])
              {
                if(obj1.value)
                {
                  yacht_plan.push(obj1.key);
                }
              }
              bakendPayload["yacht_plan"] = yacht_plan;
            }
            if(obj["Boat Breadth"]?.length>0)
            {
              let boat_breadth = [];
              for(let obj1 of obj["Boat Breadth"])
              {
                if(obj1.value)
                {
                  boat_breadth.push(obj1.key);
                }
              }
              bakendPayload["boat_breadth"] = boat_breadth;
            }
          }
          let newYatch = await Yacht_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Medical?.length>0)
      {
        let bakendPayload = {};
        let medicalPayload = payload.Medical;
        let medicalData = await Medical_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        medicalData = medicalData[0];
        if(medicalData)
        {
          let id = medicalData?._id;
          for(let obj of medicalPayload)
          {
            if(obj["Plan Type"]?.length>0)
            {
              let plan_type = medicalData?.plan_type;
              if(!plan_type)
              {
                plan_type = [];
              }
              for(let obj1 of obj["Plan Type"])
              {
                if(obj1.value)
                {
                  if(plan_type.indexOf(obj1.key) == -1)
                  {
                    plan_type.push(obj1.key);
                  }
                }
                else
                {
                  plan_type.splice(plan_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["plan_type"] = plan_type;
            }
            if(obj["Visa Countries"]?.length>0)
            {
              let visa_countries = medicalData?.visa_countries;
              if(!visa_countries)
              {
                visa_countries = [];
              }
              for(let obj1 of obj["Visa Countries"])
              {
                if(obj1.value)
                {
                  if(visa_countries.indexOf(obj1.key) == -1)
                  {
                    visa_countries.push(obj1.key);
                  }
                }
                else
                {
                  visa_countries.splice(visa_countries.indexOf(obj1.key),1);
                }
              }
              bakendPayload["visa_countries"] = visa_countries;
            }
            if(obj["Visa Type"]?.length>0)
            {
              let visa_type = medicalData?.visa_type;
              if(!visa_type)
              {
                visa_type = [];
              }
              for(let obj1 of obj["Visa Type"])
              {
                if(obj1.value)
                {
                  if(visa_type.indexOf(obj1.key) == -1)
                  {
                    visa_type.push(obj1.key);
                  }
                }
                else
                {
                  visa_type.splice(visa_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["visa_type"] = visa_type;
            }
            if(obj["Salary Range"]?.length>0)
            {
              let salary_range = medicalData?.salary_range;
              if(!salary_range)
              {
                salary_range = [];
              }
              for(let obj1 of obj["Salary Range"])
              {
                if(obj1.value)
                {
                  if(salary_range.indexOf(obj1.key) == -1)
                  {
                    salary_range.push(obj1.key);
                  }
                }
                else
                {
                  salary_range.splice(salary_range.indexOf(obj1.key),1);
                }
              }
              bakendPayload["salary_range"] = salary_range
            }
            if(obj["Weight Type"]?.length>0)
            {
              let weight_type = medicalData?.weight_type;
              if(!weight_type)
              {
                weight_type = [];
              }
              for(let obj1 of obj["Weight Type"])
              {
                if(obj1.value)
                {
                  if(weight_type.indexOf(obj1.key) == -1)
                  {
                    weight_type.push(obj1.key);
                  }
                }
                else
                {
                  weight_type.splice(weight_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["weight_type"] = weight_type;
            }
            if(obj["Medical Plan"]?.length>0)
            {
              let medical_plan = medicalData?.medical_plan;
              if(!medical_plan)
              {
                medical_plan = [];
              }
              for(let obj1 of obj["Medical Plan"])
              {
                if(obj1.value)
                {
                  if(medical_plan.indexOf(obj1.key) == -1)
                  {
                    medical_plan.push(obj1.key);
                  }
                }
                else
                {
                  medical_plan.splice(medical_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["medical_plan"] = medical_plan;
            }
            if(obj["Health Questionnaire"]?.length>0)
            {
              let health_questionnaire = medicalData?.health_questionnaire;
              if(!health_questionnaire)
              {
                health_questionnaire = [];
              }
              for(let obj1 of obj["Health Questionnaire"])
              {
                if(obj1.value)
                {
                  if(health_questionnaire.indexOf(obj1.key) == -1)
                  {
                    health_questionnaire.push(obj1.key);
                  }
                }
                else
                {
                  health_questionnaire.splice(health_questionnaire.indexOf(obj1.key),1);
                }
              }
              bakendPayload["health_questionnaire"] = health_questionnaire;
            }
            if(obj["Additional Conditions"]?.length>0)
            {
              let additional_conditions = medicalData?.additional_conditions;
              if(!additional_conditions)
              {
                additional_conditions = [];
              }
              for(let obj1 of obj["Additional Conditions"])
              {
                if(obj1.value)
                {
                  if(additional_conditions.indexOf(obj1.key) == -1)
                  {
                    additional_conditions.push(obj1.key);
                  }
                }
                else
                {
                  additional_conditions.splice(additional_conditions.indexOf(obj1.key),1);
                }
              }
              bakendPayload["additional_conditions"] = additional_conditions;
            }
            if(obj["Co Payments"]?.length>0)
            {
              let co_payments = medicalData?.co_payments;
              if(!co_payments)
              {
                co_payments = [];
              }
              for(let obj1 of obj["Co Payments"])
              {
                if(obj1.value)
                {
                  if(co_payments.indexOf(obj1.key) == -1)
                  {
                    co_payments.push(obj1.key);
                  }
                }
                else
                {
                  co_payments.splice(co_payments.indexOf(obj1.key),1);
                }
              }
              bakendPayload["co_payments"] = co_payments;
            }
            if(obj["Underwriting Conditions"]?.length>0)
            {
              let underwriting_conditions = medicalData?.underwriting_conditions;
              if(!underwriting_conditions)
              {
                underwriting_conditions = [];
              }
              for(let obj1 of obj["Underwriting Conditions"])
              {
                if(obj1.value)
                {
                  if(underwriting_conditions.indexOf(obj1.key) == -1)
                  {
                    underwriting_conditions.push(obj1.key);
                  }
                }
                else
                {
                  underwriting_conditions.splice(underwriting_conditions.indexOf(obj1.key),1);
                }
              }
              bakendPayload["underwriting_conditions"] = underwriting_conditions;
            }
            if(obj["Maternity Conditions"]?.length>0)
            {
              let maternity_conditions = medicalData?.maternity_conditions;
              if(!maternity_conditions)
              {
                maternity_conditions = [];
              }
              for(let obj1 of obj["Maternity Conditions"])
              {
                if(obj1.value)
                {
                  if(maternity_conditions.indexOf(obj1.key) == -1)
                  {
                    maternity_conditions.push(obj1.key);
                  }
                }
                else
                {
                  maternity_conditions.splice(maternity_conditions.indexOf(obj1.key),1);
                }
              }
              bakendPayload["maternity_conditions"] = maternity_conditions;
            }
            if(obj["Declaration"]?.length>0)
            {
              let declaration = medicalData?.declaration;
              if(!declaration)
              {
                declaration = [];
              }
              for(let obj1 of obj["Declaration"])
              {
                if(obj1.value)
                {
                  if(declaration.indexOf(obj1.key) == -1)
                  {
                    declaration.push(obj1.key);
                  }
                }
                else
                {
                  declaration.splice(declaration.indexOf(obj1.key),1);
                }
              }
              bakendPayload["declaration"] = declaration;
            }
            if(obj["TPA"]?.length>0)
            {
              let tpa = medicalData?.tpa;
              if(!tpa)
              {
                tpa = [];
              }
              for(let obj1 of obj["TPA"])
              {
                if(obj1.value)
                {
                  if(tpa.indexOf(obj1.key) == -1)
                  {
                    tpa.push(obj1.key);
                  }
                }
                else
                {
                  tpa.splice(tpa.indexOf(obj1.key),1);
                }
              }
              bakendPayload["tpa"] = tpa;
            }
            if(obj["Network"]?.length>0)
            {
              let network = medicalData?.network;
              if(!network)
              {
                network = [];
              }
              for(let obj1 of obj["Network"])
              {
                if(obj1.value)
                {
                  if(network.indexOf(obj1.key) == -1)
                  {
                    network.push(obj1.key);
                  }
                }
                else
                {
                  network.splice(network.indexOf(obj1.key),1);
                }
              }
              bakendPayload["network"] = network;
            }
            if(obj["Networklist"]?.length>0)
            {
              let networklist = medicalData?.networklist;
              if(!networklist)
              {
                networklist = [];
              }
              for(let obj1 of obj["Networklist"])
              {
                if(obj1.value)
                {
                  if(networklist.indexOf(obj1.key) == -1)
                  {
                    networklist.push(obj1.key);
                  }
                }
                else
                {
                  networklist.splice(networklist.indexOf(obj1.key),1);
                }
              }
              bakendPayload["networklist"] = networklist;
            }
            if(obj["Medical Labels"]?.length>0)
            {
              let medical_labels = medicalData?.medical_labels;
              if(!medical_labels)
              {
                medical_labels = [];
              }
              for(let obj1 of obj["Medical Labels"])
              {
                if(obj1.value)
                {
                  if(medical_labels.indexOf(obj1.key) == -1)
                  {
                    medical_labels.push(obj1.key);
                  }
                }
                else
                {
                  medical_labels.splice(medical_labels.indexOf(obj1.key),1);
                }
              }
              bakendPayload["medical_labels"] = medical_labels;
            }
          }
          let updatedMedical = await Medical_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of medicalPayload)
          {
            if(obj["Plan Type"]?.length>0)
            {
              let plan_type = [];
              for(let obj1 of obj["Plan Type"])
              {
                if(obj1.value)
                {
                  plan_type.push(obj1.key);
                }
              }
              bakendPayload["plan_type"] = plan_type;
            }
            if(obj["Visa Countries"]?.length>0)
            {
              let visa_countries = [];
              for(let obj1 of obj["Visa Countries"])
              {
                if(obj1.value)
                {
                  visa_countries.push(obj1.key);
                }
              }
              bakendPayload["visa_countries"] = visa_countries;
            }
            if(obj["Visa Type"]?.length>0)
            {
              let visa_type = [];
              for(let obj1 of obj["Visa Type"])
              {
                if(obj1.value)
                {
                  visa_type.push(obj1.key);
                }
              }
              bakendPayload["visa_type"] = visa_type;
            }
            if(obj["Salary Range"]?.length>0)
            {
              let salary_range = [];
              for(let obj1 of obj["Salary Range"])
              {
                if(obj1.value)
                {
                  salary_range.push(obj1.key);
                }
              }
              bakendPayload["salary_range"] = salary_range;
            }
            if(obj["Weight Type"]?.length>0)
            {
              let weight_type = [];
              for(let obj1 of obj["Weight Type"])
              {
                if(obj1.value)
                {
                  weight_type.push(obj1.key);
                }
              }
              bakendPayload["weight_type"] = weight_type;
            }
            if(obj["Medical Plan"]?.length>0)
            {
              let medical_plan = [];
              for(let obj1 of obj["Medical Plan"])
              {
                if(obj1.value)
                {
                  medical_plan.push(obj1.key);
                }
              }
              bakendPayload["medical_plan"] = medical_plan;
            }
            if(obj["Health Questionnaire"]?.length>0)
            {
              let health_questionnaire = [];
              for(let obj1 of obj["Health Questionnaire"])
              {
                if(obj1.value)
                {
                  health_questionnaire.push(obj1.key);
                }
              }
              bakendPayload["health_questionnaire"] = health_questionnaire;
            }
            if(obj["Additional Conditions"]?.length>0)
            {
              let additional_conditions = [];
              for(let obj1 of obj["Additional Conditions"])
              {
                if(obj1.value)
                {
                  additional_conditions.push(obj1.key);
                }
              }
              bakendPayload["additional_conditions"] = additional_conditions;
            }
            if(obj["Co Payments"]?.length>0)
            {
              let co_payments = [];
              for(let obj1 of obj["Co Payments"])
              {
                if(obj1.value)
                {
                  co_payments.push(obj1.key);
                }
              }
              bakendPayload["co_payments"] = co_payments;
            }
            if(obj["Underwriting Conditions"]?.length>0)
            {
              let underwriting_conditions = [];
              for(let obj1 of obj["Underwriting Conditions"])
              {
                if(obj1.value)
                {
                  underwriting_conditions.push(obj1.key);
                }
              }
              bakendPayload["underwriting_conditions"] = underwriting_conditions;
            }
            if(obj["Maternity Conditions"]?.length>0)
            {
              let maternity_conditions = [];
              for(let obj1 of obj["Maternity Conditions"])
              {
                if(obj1.value)
                {
                  maternity_conditions.push(obj1.key);
                }
              }
              bakendPayload["maternity_conditions"] = maternity_conditions;
            }
            if(obj["Declaration"]?.length>0)
            {
              let declaration = [];
              for(let obj1 of obj["Declaration"])
              {
                if(obj1.value)
                {
                  declaration.push(obj1.key);
                }
              }
              bakendPayload["declaration"] = declaration;
            }
            if(obj["TPA"]?.length>0)
            {
              let tpa = [];
              for(let obj1 of obj["TPA"])
              {
                if(obj1.value)
                {
                  tpa.push(obj1.key);
                }
              }
              bakendPayload["tpa"] = tpa;
            }
            if(obj["Network"]?.length>0)
            {
              let network = [];
              for(let obj1 of obj["Network"])
              {
                if(obj1.value)
                {
                  network.push(obj1.key);
                }
              }
              bakendPayload["network"] = network;
            }
            if(obj["Networklist"]?.length>0)
            {
              let networklist = [];
              for(let obj1 of obj["Networklist"])
              {
                if(obj1.value)
                {
                  networklist.push(obj1.key);
                }
              }
              bakendPayload["networklist"] = networklist;
            }
            if(obj["Medical Labels"]?.length>0)
            {
              let medical_labels = [];
              for(let obj1 of obj["Medical Labels"])
              {
                if(obj1.value)
                {
                  medical_labels.push(obj1.key);
                }
              }
              bakendPayload["medical_labels"] = medical_labels;
            }
          }
          let newMedical = await Medical_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload['Group']?.length>0)
      {
        let bakendPayload = {};
        let groupmedicalPayload = payload['Group'];
        let medicalData = await Group_Medical_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        medicalData = medicalData[0];
        if(medicalData)
        {
          let id = medicalData?._id;
          for(let obj of groupmedicalPayload)
          {
            if(obj["Group Medical Plan"]?.length>0)
            {
              let group_medical_plan = medicalData?.group_medical_plan;
              if(!group_medical_plan)
              {
                group_medical_plan = [];
              }
              for(let obj1 of obj["Group Medical Plan"])
              {
                if(obj1.value)
                {
                  if(group_medical_plan.indexOf(obj1.key) == -1)
                  {
                    group_medical_plan.push(obj1.key);
                  }
                }
                else
                {
                  group_medical_plan.splice(group_medical_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["group_medical_plan"] = group_medical_plan;
            }
            // if(obj["Member Requests"]?.length>0)
            // {
            //   let member_requests = medicalData?.member_requests;
            //   if(!member_requests)
            //   {
            //     member_requests = [];
            //   }
            //   for(let obj1 of obj["Member Requests"])
            //   {
            //     if(obj1.value)
            //     {
            //       if(member_requests.indexOf(obj1.key) == -1)
            //       {
            //         member_requests.push(obj1.key);
            //       }
            //     }
            //     else
            //     {
            //       member_requests.splice(member_requests.indexOf(obj1.key),1);
            //     }
            //   }
            //   bakendPayload["member_requests"] = member_requests;
            // }
            // if(obj["Active Member"]?.length>0)
            // {
            //   let active_member = medicalData?.active_member;
            //   if(!active_member)
            //   {
            //     active_member = [];
            //   }
            //   for(let obj1 of obj["Active Member"])
            //   {
            //     if(obj1.value)
            //     {
            //       if(active_member.indexOf(obj1.key) == -1)
            //       {
            //         active_member.push(obj1.key);
            //       }
            //     }
            //     else
            //     {
            //       active_member.splice(active_member.indexOf(obj1.key),1);
            //     }
            //   }
            //   bakendPayload["active_member"] = active_member;
            // }
            // if(obj["Deleted Member"]?.length>0)
            // {
            //   let deleted_member = medicalData?.deleted_member;
            //   if(!deleted_member)
            //   {
            //     deleted_member = [];
            //   }
            //   for(let obj1 of obj["Deleted Member"])
            //   {
            //     if(obj1.value)
            //     {
            //       if(deleted_member.indexOf(obj1.key) == -1)
            //       {
            //         deleted_member.push(obj1.key);
            //       }
            //     }
            //     else
            //     {
            //       deleted_member.splice(deleted_member.indexOf(obj1.key),1);
            //     }
            //   }
            //   bakendPayload["deleted_member"] = deleted_member;
            // }
            if(obj["Category"]?.length>0)
            {
              let category = medicalData?.category;
              if(!category)
              {
                category = [];
              }
              for(let obj1 of obj["Category"])
              {
                if(obj1.value)
                {
                  if(category.indexOf(obj1.key) == -1)
                  {
                    category.push(obj1.key);
                  }
                }
                else
                {
                  category.splice(category.indexOf(obj1.key),1);
                }
              }
              bakendPayload["category"] = category;
            }
            if(obj["Claim Type"]?.length>0)
            {
              let claim_type = medicalData?.claim_type;
              if(!claim_type)
              {
                claim_type = [];
              }
              for(let obj1 of obj["Claim Type"])
              {
                if(obj1.value)
                {
                  if(claim_type.indexOf(obj1.key) == -1)
                  {
                    claim_type.push(obj1.key);
                  }
                }
                else
                {
                  claim_type.splice(claim_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claim_type"] = claim_type;
            }
            if(obj["Claim Status"]?.length>0)
            {
              let claim_status = medicalData?.claim_status;
              if(!claim_status)
              {
                claim_status = [];
              }
              for(let obj1 of obj["Claim Status"])
              {
                if(obj1.value)
                {
                  if(claim_status.indexOf(obj1.key) == -1)
                  {
                    claim_status.push(obj1.key);
                  }
                }
                else
                {
                  claim_status.splice(claim_status.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claim_status"] = claim_status;
            }
            if(obj["Claim Descriptions"]?.length>0)
            {
              let claim_descriptions = medicalData?.claim_descriptions;
              if(!claim_descriptions)
              {
                claim_descriptions = [];
              }
              for(let obj1 of obj["Claim Descriptions"])
              {
                if(obj1.value)
                {
                  if(claim_descriptions.indexOf(obj1.key) == -1)
                  {
                    claim_descriptions.push(obj1.key);
                  }
                }
                else
                {
                  claim_descriptions.splice(claim_descriptions.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claim_descriptions"] = claim_descriptions;
            }
            if(obj["Claim Request"]?.length>0)
            {
              let claim_request = medicalData?.claim_request;
              if(!claim_request)
              {
                claim_request = [];
              }
              for(let obj1 of obj["Claim Request"])
              {
                if(obj1.value)
                {
                  if(claim_request.indexOf(obj1.key) == -1)
                  {
                    claim_request.push(obj1.key);
                  }
                }
                else
                {
                  claim_request.splice(claim_request.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claim_request"] = claim_request;
            }
            if(obj["Claim Procedure"]?.length>0)
            {
              let claim_procedure = medicalData?.claim_procedure;
              if(!claim_procedure)
              {
                claim_procedure = [];
              }
              for(let obj1 of obj["Claim Procedure"])
              {
                if(obj1.value)
                {
                  if(claim_procedure.indexOf(obj1.key) == -1)
                  {
                    claim_procedure.push(obj1.key);
                  }
                }
                else
                {
                  claim_procedure.splice(claim_procedure.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claim_procedure"] = claim_procedure;
            }
            if(obj["Useful Links"]?.length>0)
            {
              let useful_links = medicalData?.useful_links;
              if(!useful_links)
              {
                useful_links = [];
              }
              for(let obj1 of obj["Useful Links"])
              {
                if(obj1.value)
                {
                  if(useful_links.indexOf(obj1.key) == -1)
                  {
                    useful_links.push(obj1.key);
                  }
                }
                else
                {
                  useful_links.splice(useful_links.indexOf(obj1.key),1);
                }
              }
              bakendPayload["useful_links"] = useful_links;
            }
            if(obj["Tat Days"]?.length>0)
            {
              let tat_days = medicalData?.tat_days;
              if(!tat_days)
              {
                tat_days = [];
              }
              for(let obj1 of obj["Tat Days"])
              {
                if(obj1.value)
                {
                  if(tat_days.indexOf(obj1.key) == -1)
                  {
                    tat_days.push(obj1.key);
                  }
                }
                else
                {
                  tat_days.splice(tat_days.indexOf(obj1.key),1);
                }
              }
              bakendPayload["tat_days"] = tat_days;
            }
            if(obj["Marital Status"]?.length>0)
            {
              let marital_status = medicalData?.marital_status;
              if(!marital_status)
              {
                marital_status = [];
              }
              for(let obj1 of obj["Marital Status"])
              {
                if(obj1.value)
                {
                  if(marital_status.indexOf(obj1.key) == -1)
                  {
                    marital_status.push(obj1.key);
                  }
                }
                else
                {
                  marital_status.splice(marital_status.indexOf(obj1.key),1);
                }
              }
              bakendPayload["marital_status"] = marital_status;
            }
            if(obj["Gender"]?.length>0)
            {
              let gender = medicalData?.gender;
              if(!gender)
              {
                gender = [];
              }
              for(let obj1 of obj["Gender"])
              {
                if(obj1.value)
                {
                  if(gender.indexOf(obj1.key) == -1)
                  {
                    gender.push(obj1.key);
                  }
                }
                else
                {
                  gender.splice(gender.indexOf(obj1.key),1);
                }
              }
              bakendPayload["gender"] = gender;
            }
            if(obj["Relation"]?.length>0)
            {
              let relation = medicalData?.relation;
              if(!relation)
              {
                relation = [];
              }
              for(let obj1 of obj["Relation"])
              {
                if(obj1.value)
                {
                  if(relation.indexOf(obj1.key) == -1)
                  {
                    relation.push(obj1.key);
                  }
                }
                else
                {
                  relation.splice(relation.indexOf(obj1.key),1);
                }
              }
              bakendPayload["relation"] = relation;
            }
            if(obj["Sponsor Type"]?.length>0)
            {
              let sponsor_type = medicalData?.sponsor_type;
              if(!sponsor_type)
              {
                sponsor_type = [];
              }
              for(let obj1 of obj["Sponsor Type"])
              {
                if(obj1.value)
                {
                  if(sponsor_type.indexOf(obj1.key) == -1)
                  {
                    sponsor_type.push(obj1.key);
                  }
                }
                else
                {
                  sponsor_type.splice(sponsor_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["sponsor_type"] = sponsor_type;
            }
            if(obj["Work Location"]?.length>0)
            {
              let work_location = medicalData?.work_location;
              if(!work_location)
              {
                work_location = [];
              }
              for(let obj1 of obj["Work Location"])
              {
                if(obj1.value)
                {
                  if(work_location.indexOf(obj1.key) == -1)
                  {
                    work_location.push(obj1.key);
                  }
                }
                else
                {
                  work_location.splice(work_location.indexOf(obj1.key),1);
                }
              }
              bakendPayload["work_location"] = work_location;
            }
          }
          let updatedMedical = await Group_Medical_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of groupmedicalPayload)
          {
            if(obj["Group Medical Plan"]?.length>0)
            {
              let group_medical_plan = [];
              for(let obj1 of obj["Group Medical Plan"])
              {
                if(obj1.value)
                {
                  group_medical_plan.push(obj1.key);
                }
              }
              bakendPayload["group_medical_plan"] = group_medical_plan;
            }
            // if(obj["Member Requests"]?.length>0)
            // {
            //   let member_requests = [];
            //   for(let obj1 of obj["Member Requests"])
            //   {
            //     if(obj1.value)
            //     {
            //       member_requests.push(obj1.key);
            //     }
            //   }
            //   bakendPayload["member_requests"] = member_requests;
            // }
            // if(obj["Active Member"]?.length>0)
            // {
            //   let active_member = [];
            //   for(let obj1 of obj["Active Member"])
            //   {
            //     if(obj1.value)
            //     {
            //       active_member.push(obj1.key);
            //     }
            //   }
            //   bakendPayload["active_member"] = active_member;
            // }
            // if(obj["Deleted Member"]?.length>0)
            // {
            //   let deleted_member = [];
            //   for(let obj1 of obj["Deleted Member"])
            //   {
            //     if(obj1.value)
            //     {
            //       deleted_member.push(obj1.key);
            //     }
            //   }
            //   bakendPayload["deleted_member"] = deleted_member;
            // }
            if(obj["Category"]?.length>0)
            {
              let category = [];
              for(let obj1 of obj["Category"])
              {
                if(obj1.value)
                {
                  category.push(obj1.key);
                }
              }
              bakendPayload["category"] = category;
            }
            if(obj["Claim Type"]?.length>0)
            {
              let claim_type = [];
              for(let obj1 of obj["Claim Type"])
              {
                if(obj1.value)
                {
                  claim_type.push(obj1.key);
                }
              }
              bakendPayload["claim_type"] = claim_type;
            }
            if(obj["Claim Status"]?.length>0)
            {
              let claim_status = [];
              for(let obj1 of obj["Claim Status"])
              {
                if(obj1.value)
                {
                  claim_status.push(obj1.key);
                }
              }
              bakendPayload["claim_status"] = claim_status;
            }
            if(obj["Claim Descriptions"]?.length>0)
            {
              let claim_descriptions = [];
              for(let obj1 of obj["Claim Descriptions"])
              {
                if(obj1.value)
                {
                  claim_descriptions.push(obj1.key);
                }
              }
              bakendPayload["claim_descriptions"] = claim_descriptions;
            }
            if(obj["Claim Request"]?.length>0)
            {
              let claim_request = [];
              for(let obj1 of obj["Claim Request"])
              {
                if(obj1.value)
                {
                  claim_request.push(obj1.key);
                }
              }
              bakendPayload["claim_request"] = claim_request;
            }
            if(obj["Claim Procedure"]?.length>0)
            {
              let claim_procedure = [];
              for(let obj1 of obj["Claim Procedure"])
              {
                if(obj1.value)
                {
                  claim_procedure.push(obj1.key);
                }
              }
              bakendPayload["claim_procedure"] = claim_procedure;
            }
            if(obj["Useful Links"]?.length>0)
            {
              let useful_links = [];
              for(let obj1 of obj["Useful Links"])
              {
                if(obj1.value)
                {
                  useful_links.push(obj1.key);
                }
              }
              bakendPayload["useful_links"] = useful_links;
            }
            if(obj["Tat Days"]?.length>0)
            {
              let tat_days = [];
              for(let obj1 of obj["Tat Days"])
              {
                if(obj1.value)
                {
                  tat_days.push(obj1.key);
                }
              }
              bakendPayload["tat_days"] = tat_days;
            }
            if(obj["Marital Status"]?.length>0)
            {
              let marital_status = [];
              for(let obj1 of obj["Marital Status"])
              {
                if(obj1.value)
                {
                  marital_status.push(obj1.key);
                }
              }
              bakendPayload["marital_status"] = marital_status;
            }
            if(obj["Gender"]?.length>0)
            {
              let gender = [];
              for(let obj1 of obj["Gender"])
              {
                if(obj1.value)
                {
                  gender.push(obj1.key);
                }
              }
              bakendPayload["gender"] = gender;
            }
            if(obj["Relation"]?.length>0)
            {
              let relation = [];
              for(let obj1 of obj["Relation"])
              {
                if(obj1.value)
                {
                  relation.push(obj1.key);
                }
              }
              bakendPayload["relation"] = relation;
            }
            if(obj["Sponsor Type"]?.length>0)
            {
              let sponsor_type = [];
              for(let obj1 of obj["Sponsor Type"])
              {
                if(obj1.value)
                {
                  sponsor_type.push(obj1.key);
                }
              }
              bakendPayload["sponsor_type"] = sponsor_type;
            }
            if(obj["Work Location"]?.length>0)
            {
              let work_location = [];
              for(let obj1 of obj["Work Location"])
              {
                if(obj1.value)
                {
                  work_location.push(obj1.key);
                }
              }
              bakendPayload["work_location"] = work_location;
            }
          
          }
          let newMedical = await Group_Medical_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Master?.length>0)
      {
        let bakendPayload = {};
        let commonmasterPayload = payload.Master;
        let commonmasterData = await Common_master_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        commonmasterData = commonmasterData[0];
        if(commonmasterData)
        {
          let id = commonmasterData?._id;
          for(let obj of commonmasterPayload)
          {
            if(obj["Line Of Business"]?.length>0)
            {
              let line_of_business = commonmasterData?.line_of_business;
              if(!line_of_business)
              {
                line_of_business = [];
              }
              for(let obj1 of obj["Line Of Business"])
              {
                if(obj1.value)
                {
                  if(line_of_business.indexOf(obj1.key) == -1)
                  {
                    line_of_business.push(obj1.key);
                  }
                }
                else
                {
                  line_of_business.splice(line_of_business.indexOf(obj1.key),1);
                }
              }
              bakendPayload["line_of_business"] = line_of_business;
            }
            if(obj["Location"]?.length>0)
            {
              let location = commonmasterData?.location;
              if(!location)
              {
                location = [];
              }
              for(let obj1 of obj["Location"])
              {
                if(obj1.value)
                {
                  if(location.indexOf(obj1.key) == -1)
                  {
                    location.push(obj1.key);
                  }
                }
                else
                {
                  location.splice(location.indexOf(obj1.key),1);
                }
              }
              bakendPayload["location"] = location;
            }
            if(obj["Plan Category"]?.length>0)
            {
              let plan_category = commonmasterData?.plan_category;
              if(!plan_category)
              {
                plan_category = [];
              }
              for(let obj1 of obj["Plan Category"])
              {
                if(obj1.value)
                {
                  if(plan_category.indexOf(obj1.key) == -1)
                  {
                    plan_category.push(obj1.key);
                  }
                }
                else
                {
                  plan_category.splice(plan_category.indexOf(obj1.key),1);
                }
              }
              bakendPayload["plan_category"] = plan_category;
            }
            if(obj["Nature Of Plan"]?.length>0)
            {
              let nature_of_plan = commonmasterData?.nature_of_plan;
              if(!nature_of_plan)
              {
                nature_of_plan = [];
              }
              for(let obj1 of obj["Nature Of Plan"])
              {
                if(obj1.value)
                {
                  if(nature_of_plan.indexOf(obj1.key) == -1)
                  {
                    nature_of_plan.push(obj1.key);
                  }
                }
                else
                {
                  nature_of_plan.splice(nature_of_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["nature_of_plan"] = nature_of_plan
            }
            if(obj["Nationality"]?.length>0)
            {
              let nationality = commonmasterData?.nationality;
              if(!nationality)
              {
                nationality = [];
              }
              for(let obj1 of obj["Nationality"])
              {
                if(obj1.value)
                {
                  if(nationality.indexOf(obj1.key) == -1)
                  {
                    nationality.push(obj1.key);
                  }
                }
                else
                {
                  nationality.splice(nationality.indexOf(obj1.key),1);
                }
              }
              bakendPayload["nationality"] = nationality;
            }
            if(obj["Standard Cover"]?.length>0)
            {
              let standard_cover = commonmasterData?.standard_cover;
              if(!standard_cover)
              {
                standard_cover = [];
              }
              for(let obj1 of obj["Standard Cover"])
              {
                if(obj1.value)
                {
                  if(standard_cover.indexOf(obj1.key) == -1)
                  {
                    standard_cover.push(obj1.key);
                  }
                }
                else
                {
                  standard_cover.splice(standard_cover.indexOf(obj1.key),1);
                }
              }
              bakendPayload["standard_cover"] = standard_cover;
            }
            if(obj["Additional Cover"]?.length>0)
            {
              let additional_cover = commonmasterData?.additional_cover;
              if(!additional_cover)
              {
                additional_cover = [];
              }
              for(let obj1 of obj["Additional Cover"])
              {
                if(obj1.value)
                {
                  if(additional_cover.indexOf(obj1.key) == -1)
                  {
                    additional_cover.push(obj1.key);
                  }
                }
                else
                {
                  additional_cover.splice(additional_cover.indexOf(obj1.key),1);
                }
              }
              bakendPayload["additional_cover"] = additional_cover;
            }
            if(obj["Usertype"]?.length>0)
            {
              let usertype = commonmasterData?.usertype;
              if(!usertype)
              {
                usertype = [];
              }
              for(let obj1 of obj["Usertype"])
              {
                if(obj1.value)
                {
                  if(usertype.indexOf(obj1.key) == -1)
                  {
                    usertype.push(obj1.key);
                  }
                }
                else
                {
                  usertype.splice(usertype.indexOf(obj1.key),1);
                }
              }
              bakendPayload["usertype"] = usertype;
            }
            if(obj["Policy Type"]?.length>0)
            {
              let policy_type = commonmasterData?.policy_type;
              if(!policy_type)
              {
                policy_type = [];
              }
              for(let obj1 of obj["Policy Type"])
              {
                if(obj1.value)
                {
                  if(policy_type.indexOf(obj1.key) == -1)
                  {
                    policy_type.push(obj1.key);
                  }
                }
                else
                {
                  policy_type.splice(policy_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["policy_type"] = policy_type;
            }
            if(obj["Lead Status"]?.length>0)
            {
              let lead_status = commonmasterData?.lead_status;
              if(!lead_status)
              {
                lead_status = [];
              }
              for(let obj1 of obj["Lead Status"])
              {
                if(obj1.value)
                {
                  if(lead_status.indexOf(obj1.key) == -1)
                  {
                    lead_status.push(obj1.key);
                  }
                }
                else
                {
                  lead_status.splice(lead_status.indexOf(obj1.key),1);
                }
              }
              bakendPayload["lead_status"] = lead_status;
            }
            if(obj["Staff"]?.length>0)
            {
              let staff = commonmasterData?.staff;
              if(!staff)
              {
                staff = [];
              }
              for(let obj1 of obj["Staff"])
              {
                if(obj1.value)
                {
                  if(staff.indexOf(obj1.key) == -1)
                  {
                    staff.push(obj1.key);
                  }
                }
                else
                {
                  staff.splice(staff.indexOf(obj1.key),1);
                }
              }
              bakendPayload["staff"] = staff;
            }
            if(obj["Business Entity"]?.length>0)
            {
              let business_entity = commonmasterData?.business_entity;
              if(!business_entity)
              {
                business_entity = [];
              }
              for(let obj1 of obj["Business Entity"])
              {
                if(obj1.value)
                {
                  if(business_entity.indexOf(obj1.key) == -1)
                  {
                    business_entity.push(obj1.key);
                  }
                }
                else
                {
                  business_entity.splice(staff.indexOf(obj1.key),1);
                }
              }
              bakendPayload["business_entity"] = business_entity;
            }
            if(obj["Documents"]?.length>0)
            {
              let documents = commonmasterData?.documents;
              if(!documents)
              {
                documents = [];
              }
              for(let obj1 of obj["Documents"])
              {
                if(obj1.value)
                {
                  if(documents.indexOf(obj1.key) == -1)
                  {
                    documents.push(obj1.key);
                  }
                }
                else
                {
                  documents.splice(documents.indexOf(obj1.key),1);
                }
              }
              bakendPayload["documents"] = documents;
            }
            if(obj["Testimonials"]?.length>0)
            {
              let testimonials = commonmasterData?.testimonials
              ;
              if(!testimonials
                )
              {
                testimonials = [];
              }
              for(let obj1 of obj["Testimonials"])
              {
                if(obj1.value)
                {
                  if(testimonials.indexOf(obj1.key) == -1)
                  {
                    testimonials.push(obj1.key);
                  }
                }
                else
                {
                  testimonials.splice(testimonials.indexOf(obj1.key),1);
                }
              }
              bakendPayload["testimonials"] = testimonials;
            }
            if(obj["Compliance"]?.length>0)
            {
              let compliance = commonmasterData?.compliance
              ;
              if(!compliance
                )
              {
                compliance = [];
              }
              for(let obj1 of obj["Compliance"])
              {
                if(obj1.value)
                {
                  if(compliance.indexOf(obj1.key) == -1)
                  {
                    compliance.push(obj1.key);
                  }
                }
                else
                {
                  compliance.splice(compliance.indexOf(obj1.key),1);
                }
              }
              bakendPayload["compliance"] = compliance;
            }
            if(obj["Special Offers"]?.length>0)
            {
              let special_offers = commonmasterData?.special_offers
              ;
              if(!special_offers
                )
              {
                special_offers = [];
              }
              for(let obj1 of obj["Special Offers"])
              {
                if(obj1.value)
                {
                  if(special_offers.indexOf(obj1.key) == -1)
                  {
                    special_offers.push(obj1.key);
                  }
                }
                else
                {
                  special_offers.splice(special_offers.indexOf(obj1.key),1);
                }
              }
              bakendPayload["special_offers"] = special_offers;
            }
            if(obj["Claims"]?.length>0)
            {
              let claims = commonmasterData?.claims
              ;
              if(!claims
                )
              {
                claims = [];
              }
              for(let obj1 of obj["Claims"])
              {
                if(obj1.value)
                {
                  if(claims.indexOf(obj1.key) == -1)
                  {
                    claims.push(obj1.key);
                  }
                }
                else
                {
                  claims.splice(claims.indexOf(obj1.key),1);
                }
              }
              bakendPayload["claims"] = claims;
            }
            if(obj["Terms Conditions"]?.length>0)
            {
              let terms_conditions = commonmasterData?.terms_conditions;
              if(!terms_conditions
                )
              {
                terms_conditions = [];
              }
              for(let obj1 of obj["Terms Conditions"])
              {
                if(obj1.value)
                {
                  if(terms_conditions.indexOf(obj1.key) == -1)
                  {
                    terms_conditions.push(obj1.key);
                  }
                }
                else
                {
                  terms_conditions.splice(terms_conditions.indexOf(obj1.key),1);
                }
              }
              bakendPayload["terms_conditions"] = terms_conditions;
            }
            if(obj["Social Media Link"]?.length>0)
            {
              let social_media_link = commonmasterData?.social_media_link
              ;
              if(!social_media_link
                )
              {
                social_media_link = [];
              }
              for(let obj1 of obj["Social Media Link"])
              {
                if(obj1.value)
                {
                  if(social_media_link.indexOf(obj1.key) == -1)
                  {
                    social_media_link.push(obj1.key);
                  }
                }
                else
                {
                  social_media_link.splice(social_media_link.indexOf(obj1.key),1);
                }
              }
              bakendPayload["social_media_link"] = social_media_link;
            }
            if(obj["Motor Claim Question"]?.length>0)
            {
              let motor_claim_question = commonmasterData?.motor_claim_question
              ;
              if(!motor_claim_question
                )
              {
                motor_claim_question = [];
              }
              for(let obj1 of obj["Motor Claim Question"])
              {
                if(obj1.value)
                {
                  if(motor_claim_question.indexOf(obj1.key) == -1)
                  {
                    motor_claim_question.push(obj1.key);
                  }
                }
                else
                {
                  motor_claim_question.splice(motor_claim_question.indexOf(obj1.key),1);
                }
              }
              bakendPayload["motor_claim_question"] = motor_claim_question;
            }
            if(obj["Bank Details"]?.length>0)
            {
              let bank_details = commonmasterData?.bank_details
              ;
              if(!bank_details
                )
              {
                bank_details = [];
              }
              for(let obj1 of obj["Bank Details"])
              {
                if(obj1.value)
                {
                  if(bank_details.indexOf(obj1.key) == -1)
                  {
                    bank_details.push(obj1.key);
                  }
                }
                else
                {
                  bank_details.splice(bank_details.indexOf(obj1.key),1);
                }
              }
              bakendPayload["bank_details"] = bank_details;
            }
            if(obj["Emergency Departments"]?.length>0)
            {
              let emergency_departments = commonmasterData?.claims
              ;
              if(!emergency_departments
                )
              {
                emergency_departments = [];
              }
              for(let obj1 of obj["Emergency Departments"])
              {
                if(obj1.value)
                {
                  if(emergency_departments.indexOf(obj1.key) == -1)
                  {
                    emergency_departments.push(obj1.key);
                  }
                }
                else
                {
                  emergency_departments.splice(emergency_departments.indexOf(obj1.key),1);
                }
              }
              bakendPayload["emergency_departments"] = emergency_departments;
            }
            if(obj["Guidelines"]?.length>0)
            {
              let guidelines = commonmasterData?.guidelines
              ;
              if(!guidelines
                )
              {
                guidelines = [];
              }
              for(let obj1 of obj["Guidelines"])
              {
                if(obj1.value)
                {
                  if(guidelines.indexOf(obj1.key) == -1)
                  {
                    guidelines.push(obj1.key);
                  }
                }
                else
                {
                  guidelines.splice(guidelines.indexOf(obj1.key),1);
                }
              }
              bakendPayload["guidelines"] = guidelines;
            }
            if(obj["Banner Image"]?.length>0)
            {
              let banner_image = commonmasterData?.banner_image
              ;
              if(!banner_image
                )
              {
                banner_image = [];
              }
              for(let obj1 of obj["Banner Image"])
              {
                if(obj1.value)
                {
                  if(banner_image.indexOf(obj1.key) == -1)
                  {
                    banner_image.push(obj1.key);
                  }
                }
                else
                {
                  banner_image.splice(banner_image.indexOf(obj1.key),1);
                }
              }
              bakendPayload["banner_image"] = banner_image;
            }
            if(obj["BE Commission"]?.length>0)
            {
              let be_commission = commonmasterData?.be_commission
              ;
              if(!be_commission
                )
              {
                be_commission = [];
              }
              for(let obj1 of obj["BE Commission"])
              {
                if(obj1.value)
                {
                  if(be_commission.indexOf(obj1.key) == -1)
                  {
                    be_commission.push(obj1.key);
                  }
                }
                else
                {
                  be_commission.splice(be_commission.indexOf(obj1.key),1);
                }
              }
              bakendPayload["be_commission"] = be_commission;
            }
            if(obj["AM Rating"]?.length>0)
            {
              let am_rating = commonmasterData?.am_rating
              ;
              if(!am_rating
                )
              {
                am_rating = [];
              }
              for(let obj1 of obj["AM Rating"])
              {
                if(obj1.value)
                {
                  if(am_rating.indexOf(obj1.key) == -1)
                  {
                    am_rating.push(obj1.key);
                  }
                }
                else
                {
                  am_rating.splice(am_rating.indexOf(obj1.key),1);
                }
              }
              bakendPayload["am_rating"] = am_rating;
            }
            if(obj["SP Rating"]?.length>0)
            {
              let sp_rating = commonmasterData?.sp_rating
              ;
              if(!sp_rating
                )
              {
                sp_rating = [];
              }
              for(let obj1 of obj["SP Rating"])
              {
                if(obj1.value)
                {
                  if(sp_rating.indexOf(obj1.key) == -1)
                  {
                    sp_rating.push(obj1.key);
                  }
                }
                else
                {
                  sp_rating.splice(sp_rating.indexOf(obj1.key),1);
                }
              }
              bakendPayload["sp_rating"] = sp_rating;
            }
            if(obj["Vat"]?.length>0)
            {
              let vat = commonmasterData?.vat
              ;
              if(!vat
                )
              {
                vat = [];
              }
              for(let obj1 of obj["Vat"])
              {
                if(obj1.value)
                {
                  if(vat.indexOf(obj1.key) == -1)
                  {
                    vat.push(obj1.key);
                  }
                }
                else
                {
                  vat.splice(vat.indexOf(obj1.key),1);
                }
              }
              bakendPayload["vat"] = vat;
            }
            if(obj["BE Discount"]?.length>0)
            {
              let be_discount = commonmasterData?.be_discount
              ;
              if(!be_discount
                )
              {
                be_discount = [];
              }
              for(let obj1 of obj["BE Discount"])
              {
                if(obj1.value)
                {
                  if(be_discount.indexOf(obj1.key) == -1)
                  {
                    be_discount.push(obj1.key);
                  }
                }
                else
                {
                  be_discount.splice(be_discount.indexOf(obj1.key),1);
                }
              }
              bakendPayload["be_discount"] = be_discount;
            }
            if(obj["Discount Coupon"]?.length>0)
            {
              let discount_coupon = commonmasterData?.discount_coupon
              ;
              if(!discount_coupon
                )
              {
                discount_coupon = [];
              }
              for(let obj1 of obj["Discount Coupon"])
              {
                if(obj1.value)
                {
                  if(discount_coupon.indexOf(obj1.key) == -1)
                  {
                    discount_coupon.push(obj1.key);
                  }
                }
                else
                {
                  discount_coupon.splice(discount_coupon.indexOf(obj1.key),1);
                }
              }
              bakendPayload["discount_coupon"] = discount_coupon;
            }
            if(obj["Best Plan"]?.length>0)
            {
              let best_plan = commonmasterData?.best_plan
              ;
              if(!best_plan
                )
              {
                best_plan = [];
              }
              for(let obj1 of obj["Best Plan"])
              {
                if(obj1.value)
                {
                  if(best_plan.indexOf(obj1.key) == -1)
                  {
                    best_plan.push(obj1.key);
                  }
                }
                else
                {
                  best_plan.splice(best_plan.indexOf(obj1.key),1);
                }
              }
              bakendPayload["best_plan"] = best_plan;
            }
            if(obj["Reason Type"]?.length>0)
            {
              let reason_type = commonmasterData?.reason_type
              ;
              if(!reason_type
                )
              {
                reason_type = [];
              }
              for(let obj1 of obj["Reason Type"])
              {
                if(obj1.value)
                {
                  if(reason_type.indexOf(obj1.key) == -1)
                  {
                    reason_type.push(obj1.key);
                  }
                }
                else
                {
                  reason_type.splice(reason_type.indexOf(obj1.key),1);
                }
              }
              bakendPayload["reason_type"] = reason_type;
            }
          }
          let updatedCommon_master = await Common_master_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of commonmasterPayload)
          {
            if(obj["Line Of Business"]?.length>0)
            {
              let line_of_business = [];
              for(let obj1 of obj["Line Of Business"])
              {
                if(obj1.value)
                {
                  line_of_business.push(obj1.key);
                }
              }
              bakendPayload["line_of_business"] = line_of_business;
            }
            if(obj["Location"]?.length>0)
            {
              let location = [];
              for(let obj1 of obj["Location"])
              {
                if(obj1.value)
                {
                  location.push(obj1.key);
                }
              }
              bakendPayload["location"] = location;
            }
            if(obj["Plan Category"]?.length>0)
            {
              let plan_category = [];
              for(let obj1 of obj["Plan Category"])
              {
                if(obj1.value)
                {
                  plan_category.push(obj1.key);
                }
              }
              bakendPayload["plan_category"] = plan_category;
            }
            if(obj["Nature Of Plan"]?.length>0)
            {
              let nature_of_plan = [];
              for(let obj1 of obj["Nature Of Plan"])
              {
                if(obj1.value)
                {
                  nature_of_plan.push(obj1.key);
                }
              }
              bakendPayload["nature_of_plan"] = nature_of_plan;
            }
            if(obj["Nationality"]?.length>0)
            {
              let nationality = [];
              for(let obj1 of obj["Nationality"])
              {
                if(obj1.value)
                {
                  nationality.push(obj1.key);
                }
              }
              bakendPayload["nationality"] = nationality;
            }
            if(obj["Standard Cover"]?.length>0)
            {
              let standard_cover = [];
              for(let obj1 of obj["Standard Cover"])
              {
                if(obj1.value)
                {
                  standard_cover.push(obj1.key);
                }
              }
              bakendPayload["standard_cover"] = standard_cover;
            }
            if(obj["Additional Cover"]?.length>0)
            {
              let additional_cover = [];
              for(let obj1 of obj["Additional Cover"])
              {
                if(obj1.value)
                {
                  additional_cover.push(obj1.key);
                }
              }
              bakendPayload["additional_cover"] = additional_cover;
            }
            if(obj["Usertype"]?.length>0)
            {
              let usertype = [];
              for(let obj1 of obj["Usertype"])
              {
                if(obj1.value)
                {
                  usertype.push(obj1.key);
                }
              }
              bakendPayload["usertype"] = usertype;
            }
            if(obj["Policy Type"]?.length>0)
            {
              let policy_type = [];
              for(let obj1 of obj["Policy Type"])
              {
                if(obj1.value)
                {
                  policy_type.push(obj1.key);
                }
              }
              bakendPayload["policy_type"] = policy_type;
            }
            if(obj["Lead Status"]?.length>0)
            {
              let lead_status = [];
              for(let obj1 of obj["Lead Status"])
              {
                if(obj1.value)
                {
                  lead_status.push(obj1.key);
                }
              }
              bakendPayload["lead_status"] = lead_status;
            }
            if(obj["Staff"]?.length>0)
            {
              let staff = [];
              for(let obj1 of obj["Staff"])
              {
                if(obj1.value)
                {
                  staff.push(obj1.key);
                }
              }
              bakendPayload["staff"] = staff;
            }
            if(obj["Business Entity"]?.length>0)
            {
              let business_entity = [];
              for(let obj1 of obj["Business Entity"])
              {
                if(obj1.value)
                {
                  business_entity.push(obj1.key);
                }
              }
              bakendPayload["business_entity"] = business_entity;
            }
            if(obj["Documents"]?.length>0)
            {
              let documents = [];
              for(let obj1 of obj["Documents"])
              {
                if(obj1.value)
                {
                  documents.push(obj1.key);
                }
              }
              bakendPayload["documents"] = documents;
            }
            if(obj["Testimonials"]?.length>0)
            {
              let testimonials = [];
              for(let obj1 of obj["Testimonials"])
              {
                if(obj1.value)
                {
                  testimonials.push(obj1.key);
                }
              }
              bakendPayload["testimonials"] = testimonials;
            }
            if(obj["Compliance"]?.length>0)
            {
              let compliance = [];
              for(let obj1 of obj["Compliance"])
              {
                if(obj1.value)
                {
                  compliance.push(obj1.key);
                }
              }
              bakendPayload["compliance"] = compliance;
            }
            if(obj["Special Offers"]?.length>0)
            {
              let special_offers = [];
              for(let obj1 of obj["Special Offers"])
              {
                if(obj1.value)
                {
                  special_offers.push(obj1.key);
                }
              }
              bakendPayload["special_offerss"] = special_offers;
            }
            if(obj["Claims"]?.length>0)
            {
              let claims = [];
              for(let obj1 of obj["Claims"])
              {
                if(obj1.value)
                {
                  claims.push(obj1.key);
                }
              }
              bakendPayload["claims"] = claims;
            }
            if(obj["Terms Conditions"]?.length>0)
            {
              let terms_conditions = [];
              for(let obj1 of obj["Terms Conditions"])
              {
                if(obj1.value)
                {
                  terms_conditions.push(obj1.key);
                }
              }
              bakendPayload["terms_conditions"] = terms_conditions;
            }
            if(obj["Social Media Link"]?.length>0)
            {
              let social_media_link = [];
              for(let obj1 of obj["Social Media Link"])
              {
                if(obj1.value)
                {
                  social_media_link.push(obj1.key);
                }
              }
              bakendPayload["social_media_link"] = social_media_link;
            }
            if(obj["Motor Claim Question"]?.length>0)
            {
              let motor_claim_question = [];
              for(let obj1 of obj["Motor Claim Question"])
              {
                if(obj1.value)
                {
                  motor_claim_question.push(obj1.key);
                }
              }
              bakendPayload["motor_claim_question"] = motor_claim_question;
            }
            if(obj["Bank Details"]?.length>0)
            {
              let bank_details = [];
              for(let obj1 of obj["Bank Details"])
              {
                if(obj1.value)
                {
                  bank_details.push(obj1.key);
                }
              }
              bakendPayload["bank_details"] = bank_details;
            }
            if(obj["Emergency Departments"]?.length>0)
            {
              let emergency_departments = [];
              for(let obj1 of obj["Emergency Departments"])
              {
                if(obj1.value)
                {
                  emergency_departments.push(obj1.key);
                }
              }
              bakendPayload["emergency_departments"] = emergency_departments;
            }
            if(obj["Guidelines"]?.length>0)
            {
              let guidelines = [];
              for(let obj1 of obj["Guidelines"])
              {
                if(obj1.value)
                {
                  guidelines.push(obj1.key);
                }
              }
              bakendPayload["guidelines"] = guidelines;
            }
            if(obj["Banner Image"]?.length>0)
            {
              let banner_image = [];
              for(let obj1 of obj["Banner Image"])
              {
                if(obj1.value)
                {
                  banner_image.push(obj1.key);
                }
              }
              bakendPayload["banner_image"] = banner_image;
            }
            if(obj["BE Commission"]?.length>0)
            {
              let be_commission = [];
              for(let obj1 of obj["BE Commission"])
              {
                if(obj1.value)
                {
                  be_commission.push(obj1.key);
                }
              }
              bakendPayload["be_commission"] = be_commission;
            }
            if(obj["AM Rating"]?.length>0)
            {
              let am_rating = [];
              for(let obj1 of obj["AM Rating"])
              {
                if(obj1.value)
                {
                  am_rating.push(obj1.key);
                }
              }
              bakendPayload["am_rating"] = am_rating;
            }
            if(obj["SP Rating"]?.length>0)
            {
              let sp_rating = [];
              for(let obj1 of obj["SP Rating"])
              {
                if(obj1.value)
                {
                  sp_rating.push(obj1.key);
                }
              }
              bakendPayload["sp_rating"] = sp_rating;
            }
            if(obj["Vat"]?.length>0)
            {
              let vat = [];
              for(let obj1 of obj["Vat"])
              {
                if(obj1.value)
                {
                  vat.push(obj1.key);
                }
              }
              bakendPayload["vat"] = vat;
            }
            if(obj["BE Discount"]?.length>0)
            {
              let be_discount = [];
              for(let obj1 of obj["BE Discount"])
              {
                if(obj1.value)
                {
                  be_discount.push(obj1.key);
                }
              }
              bakendPayload["be_discount"] = be_discount;
            }
            if(obj["Discount Coupon"]?.length>0)
            {
              let discount_coupon = [];
              for(let obj1 of obj["Discount Coupon"])
              {
                if(obj1.value)
                {
                  discount_coupon.push(obj1.key);
                }
              }
              bakendPayload["discount_coupon"] = discount_coupon;
            }
            if(obj["Best Plan"]?.length>0)
            {
              let best_plan = [];
              for(let obj1 of obj["Best Plan"])
              {
                if(obj1.value)
                {
                  best_plan.push(obj1.key);
                }
              }
              bakendPayload["best_plan"] = best_plan;
            }
            if(obj["Reason Type"]?.length>0)
            {
              let reason_type = [];
              for(let obj1 of obj["Reason Type"])
              {
                if(obj1.value)
                {
                  reason_type.push(obj1.key);
                }
              }
              bakendPayload["reason_type"] = reason_type;
            }
          }
          let newCommon_master = await Common_master_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }

      if(payload?.Dashboard?.length>0)
      {
        let bakendPayload = {};
        let dashboardPayload = payload.Dashboard;
        let dashboardData = await Dashboard_permission.find({user_type_id:mongoose.Types.ObjectId(payload?.user_type_id)});
        dashboardData = dashboardData[0];
        if(dashboardData)
        {
          let id = dashboardData?._id;
          for(let obj of dashboardPayload)
          {
            if(obj["CEO Dashboard"]?.length>0)
          {
            let ceo_dashboard = dashboardData?.ceo_dashboard;
            if(!ceo_dashboard)
            {
              ceo_dashboard = [];
            }
            for(let obj1 of obj["CEO Dashboard"])
            {
              if(obj1.value)
              {
                if(ceo_dashboard.indexOf(obj1.key) == -1)
                {
                  ceo_dashboard.push(obj1.key);
                }
              }
              else
              {
                ceo_dashboard.splice(ceo_dashboard.indexOf(obj1.key),1);
              }
            }
            bakendPayload["ceo_dashboard"] = ceo_dashboard;
            }
            if(obj["Admin Dashboard"]?.length>0)
            {
              let admin_dashboard = dashboardData?.admin_dashboard;
              if(!admin_dashboard)
              {
                admin_dashboard = [];
              }
              for(let obj1 of obj["Admin Dashboard"])
              {
                if(obj1.value)
                {
                  if(admin_dashboard.indexOf(obj1.key) == -1)
                  {
                    admin_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  admin_dashboard.splice(admin_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["admin_dashboard"] = admin_dashboard;
            }
            if(obj["Supervisor Dashboard"]?.length>0)
            {
              let supervisor_dashboard = dashboardData?.supervisor_dashboard;
              if(!supervisor_dashboard)
              {
                supervisor_dashboard = [];
              }
              for(let obj1 of obj["Supervisor Dashboard"])
              {
                if(obj1.value)
                {
                  if(supervisor_dashboard.indexOf(obj1.key) == -1)
                  {
                    supervisor_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  supervisor_dashboard.splice(supervisor_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["supervisor_dashboard"] = supervisor_dashboard;
            }
            if(obj["Operations Dashboard"]?.length>0)
            {
              let operations_dashboard = dashboardData?.operations_dashboard;
              if(!operations_dashboard)
              {
                operations_dashboard = [];
              }
              for(let obj1 of obj["Operations Dashboard"])
              {
                if(obj1.value)
                {
                  if(operations_dashboard.indexOf(obj1.key) == -1)
                  {
                    operations_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  operations_dashboard.splice(operations_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["operations_dashboard"] = operations_dashboard;
            }
            if(obj["SA Dashboard"]?.length>0)
            {
              let sa_dashboard = dashboardData?.sa_dashboard;
              if(!sa_dashboard)
              {
                sa_dashboard = [];
              }
              for(let obj1 of obj["SA Dashboard"])
              {
                if(obj1.value)
                {
                  if(sa_dashboard.indexOf(obj1.key) == -1)
                  {
                    sa_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  sa_dashboard.splice(sa_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["sa_dashboard"] = sa_dashboard
            }
            if(obj["DC Dashboard"]?.length>0)
            {
              let dc_dashboard = dashboardData?.dc_dashboard;
              if(!dc_dashboard)
              {
                dc_dashboard = [];
              }
              for(let obj1 of obj["DC Dashboard"])
              {
                if(obj1.value)
                {
                  if(dc_dashboard.indexOf(obj1.key) == -1)
                  {
                    dc_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  dc_dashboard.splice(dc_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["dc_dashboard"] = dc_dashboard;
            }
            if(obj["Policy Issuer Dashboard"]?.length>0)
            {
              let policy_issuer_dashboard = dashboardData?.policy_issuer_dashboard;
              if(!policy_issuer_dashboard)
              {
                policy_issuer_dashboard = [];
              }
              for(let obj1 of obj["Policy Issuer Dashboard"])
              {
                if(obj1.value)
                {
                  if(policy_issuer_dashboard.indexOf(obj1.key) == -1)
                  {
                    policy_issuer_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  policy_issuer_dashboard.splice(policy_issuer_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["policy_issuer_dashboard"] = policy_issuer_dashboard;
            }
            if(obj["Insurance Company"]?.length>0)
            {
              let insurance_company = dashboardData?.insurance_company;
              if(!insurance_company)
              {
                insurance_company = [];
              }
              for(let obj1 of obj["Insurance Company"])
              {
                if(obj1.value)
                {
                  if(insurance_company.indexOf(obj1.key) == -1)
                  {
                    insurance_company.push(obj1.key);
                  }
                }
                else
                {
                  insurance_company.splice(insurance_company.indexOf(obj1.key),1);
                }
              }
              bakendPayload["insurance_company"] = insurance_company;
            }
            if(obj["Advertise With Us"]?.length>0)
            {
              let advertise_with_us = dashboardData?.advertise_with_us;
              if(!advertise_with_us)
              {
                advertise_with_us = [];
              }
              for(let obj1 of obj["Advertise With Us"])
              {
                if(obj1.value)
                {
                  if(advertise_with_us.indexOf(obj1.key) == -1)
                  {
                    advertise_with_us.push(obj1.key);
                  }
                }
                else
                {
                  advertise_with_us.splice(advertise_with_us.indexOf(obj1.key),1);
                }
              }
              bakendPayload["advertise_with_us"] = advertise_with_us;
            }
            if(obj["Newsletter"]?.length>0)
            {
              let newsletter = dashboardData?.newsletter;
              if(!newsletter)
              {
                newsletter = [];
              }
              for(let obj1 of obj["Newsletter"])
              {
                if(obj1.value)
                {
                  if(newsletter.indexOf(obj1.key) == -1)
                  {
                    newsletter.push(obj1.key);
                  }
                }
                else
                {
                  newsletter.splice(newsletter.indexOf(obj1.key),1);
                }
              }
              bakendPayload["newsletter"] = newsletter;
            }

            if(obj["Complaint"]?.length>0)
            {
              let complaint = dashboardData?.complaint;
              if(!complaint)
              {
                complaint = [];
              }
              for(let obj1 of obj["Complaint"])
              {
                if(obj1.value)
                {
                  if(complaint.indexOf(obj1.key) == -1)
                  {
                    complaint.push(obj1.key);
                  }
                }
                else
                {
                  complaint.splice(complaint.indexOf(obj1.key),1);
                }
              }
              bakendPayload["complaint"] = complaint;
            }

            if(obj["BE Dashboard"]?.length>0)
            {
              let be_dashboard = dashboardData?.be_dashboard;
              if(!be_dashboard)
              {
                be_dashboard = [];
              }
              for(let obj1 of obj["BE Dashboard"])
              {
                if(obj1.value)
                {
                  if(be_dashboard.indexOf(obj1.key) == -1)
                  {
                    be_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  be_dashboard.splice(be_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["be_dashboard"] = be_dashboard
            }

            if(obj["Leads"]?.length>0)
            {
              let leads = dashboardData?.leads;
              if(!leads)
              {
                leads = [];
              }
              for(let obj1 of obj["Leads"])
              {
                if(obj1.value)
                {
                  if(leads.indexOf(obj1.key) == -1)
                  {
                    leads.push(obj1.key);
                  }
                }
                else
                {
                  leads.splice(leads.indexOf(obj1.key),1);
                }
              }
              bakendPayload["leads"] = leads
            }

            if(obj["Chats"]?.length>0)
            {
              let chats = dashboardData?.chats;
              if(!chats)
              {
                chats = [];
              }
              for(let obj1 of obj["Chats"])
              {
                if(obj1.value)
                {
                  if(chats.indexOf(obj1.key) == -1)
                  {
                    chats.push(obj1.key);
                  }
                }
                else
                {
                  chats.splice(chats.indexOf(obj1.key),1);
                }
              }
              bakendPayload["chats"] = chats
            }

            if(obj["Insurance Company Dashboard"]?.length>0)
            {
              let insurance_company_dashboard = dashboardData?.insurance_company_dashboard;
              if(!insurance_company_dashboard)
              {
                insurance_company_dashboard = [];
              }
              for(let obj1 of obj["Insurance Company Dashboard"])
              {
                if(obj1.value)
                {
                  if(insurance_company_dashboard.indexOf(obj1.key) == -1)
                  {
                    insurance_company_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  insurance_company_dashboard.splice(insurance_company_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["insurance_company_dashboard"] = insurance_company_dashboard
            }

            if(obj["Producer Dashboard"]?.length>0)
            {
              let producer_dashboard = dashboardData?.producer_dashboard;
              if(!producer_dashboard)
              {
                producer_dashboard = [];
              }
              for(let obj1 of obj["Producer Dashboard"])
              {
                if(obj1.value)
                {
                  if(producer_dashboard.indexOf(obj1.key) == -1)
                  {
                    producer_dashboard.push(obj1.key);
                  }
                }
                else
                {
                  producer_dashboard.splice(producer_dashboard.indexOf(obj1.key),1);
                }
              }
              bakendPayload["producer_dashboard"] = producer_dashboard
            }

          }
          let updatedDashboard = await Dashboard_permission.findByIdAndUpdate(id,bakendPayload);
          result = 1;
        }
        else
        {
          for(let obj of dashboardPayload)
          {
            if(obj["CEO Dashboard"]?.length>0)
            {
            let ceo_dashboard = [];
            for(let obj1 of obj["CEO Dashboard"])
            {
              if(obj1.value)
              {
                ceo_dashboard.push(obj1.key);
              }
            }
            bakendPayload["ceo_dashboard"] = ceo_dashboard;
            }
            if(obj["Admin Dashboard"]?.length>0)
            {
              let admin_dashboard = [];
              for(let obj1 of obj["Admin Dashboard"])
              {
                if(obj1.value)
                {
                  admin_dashboard.push(obj1.key);
                }
              }
              bakendPayload["admin_dashboard"] = admin_dashboard;
            }
            if(obj["Supervisor Dashboard"]?.length>0)
            {
              let supervisor_dashboard = [];
              for(let obj1 of obj["Supervisor Dashboard"])
              {
                if(obj1.value)
                {
                  supervisor_dashboard.push(obj1.key);
                }
              }
              bakendPayload["supervisor_dashboard"] = supervisor_dashboard;
            }
            if(obj["Operations Dashboard"]?.length>0)
            {
              let operations_dashboard = [];
              for(let obj1 of obj["Operations Dashboard"])
              {
                if(obj1.value)
                {
                  operations_dashboard.push(obj1.key);
                }
              }
              bakendPayload["operations_dashboard"] = operations_dashboard;
            }
            if(obj["SA Dashboard"]?.length>0)
            {
              let sa_dashboard = [];
              for(let obj1 of obj["SA Dashboard"])
              {
                if(obj1.value)
                {
                  sa_dashboard.push(obj1.key);
                }
              }
              bakendPayload["sa_dashboard"] = sa_dashboard;
            }
            if(obj["DC Dashboard"]?.length>0)
            {
              let dc_dashboard = [];
              for(let obj1 of obj["DC Dashboard"])
              {
                if(obj1.value)
                {
                  dc_dashboard.push(obj1.key);
                }
              }
              bakendPayload["dc_dashboard"] = dc_dashboard;
            }
            if(obj["Policy Issuer Dashboard"]?.length>0)
            {
              let policy_issuer_dashboard = [];
              for(let obj1 of obj["Policy Issuer Dashboard"])
              {
                if(obj1.value)
                {
                  policy_issuer_dashboard.push(obj1.key);
                }
              }
              bakendPayload["policy_issuer_dashboard"] = policy_issuer_dashboard;
            }
            if(obj["Insurance Company"]?.length>0)
            {
              let insurance_company = [];
              for(let obj1 of obj["Insurance Company"])
              {
                if(obj1.value)
                {
                  insurance_company.push(obj1.key);
                }
              }
              bakendPayload["insurance_company"] = insurance_company;
            }
            if(obj["Advertise With Us"]?.length>0)
            {
              let advertise_with_us = [];
              for(let obj1 of obj["Advertise With Us"])
              {
                if(obj1.value)
                {
                  advertise_with_us.push(obj1.key);
                }
              }
              bakendPayload["advertise_with_us"] = advertise_with_us;
            }

            if(obj["Newsletter"]?.length>0)
            {
              let newsletter = [];
              for(let obj1 of obj["Newsletter"])
              {
                if(obj1.value)
                {
                  newsletter.push(obj1.key);
                }
              }
              bakendPayload["newsletter"] = newsletter;
            }

            if(obj["Complaint"]?.length>0)
            {
              let complaint = [];
              for(let obj1 of obj["Complaint"])
              {
                if(obj1.value)
                {
                  newsletter.push(obj1.key);
                }
              }
              bakendPayload["complaint"] = complaint;
            }

            if(obj["BE Dashboard"]?.length>0)
            {
              let be_dashboard = [];
              for(let obj1 of obj["BE Dashboard"])
              {
                if(obj1.value)
                {
                  newsletter.push(obj1.key);
                }
              }
              bakendPayload["be_dashboard"] = be_dashboard;
            }


            if(obj["Leads"]?.length>0)
            {
              let leads = [];
              for(let obj1 of obj["Leads"])
              {
                if(obj1.value)
                {
                  leads.push(obj1.key);
                }
              }
              bakendPayload["leads"] = leads;
            }

            if(obj["Chats"]?.length>0)
            {
              let chats = [];
              for(let obj1 of obj["Chats"])
              {
                if(obj1.value)
                {
                  chats.push(obj1.key);
                }
              }
              bakendPayload["chats"] = chats;
            }

            if(obj["Insurance Company Dashboard"]?.length>0)
            {
              let insurance_company_dashboard = [];
              for(let obj1 of obj["Insurance Company Dashboard"])
              {
                if(obj1.value)
                {
                  insurance_company_dashboard.push(obj1.key);
                }
              }
              bakendPayload["insurance_company_dashboard"] = insurance_company_dashboard;
            }

            if(obj["Producer Dashboard"]?.length>0)
            {
              let producer_dashboard = [];
              for(let obj1 of obj["Producer Dashboard"])
              {
                if(obj1.value)
                {
                  producer_dashboard.push(obj1.key);
                }
              }
              bakendPayload["producer_dashboard"] = producer_dashboard;
            }



          }
          let newDashboard = await Dashboard_permission.create({...bakendPayload,user_type_id:payload?.user_type_id});
          result = 1;
        }
      }
      
      if (result) 
      {
        res.json({status: 200, message: "Permission Update Successefully", data: result });
      } 
      else {
        res.json({status: 400, message: "Permission not Updated Successefully", data: {} });
      }
    }
    catch (err) 
    {
      console.log(err);
    }
  },

  getmodule : async (req,res) => 
  {
    try
    {
      let result = await Module.find()
      if(result)
      {
        res.json({status:200,message:"Data Found Successefully",data:result})
      }
      else
      {
        res.json({status:400,message:"Data not Found Successefully",data:{}})
      }
    }
    catch(err)
    {
      console.log(err)
    }
  },
};
