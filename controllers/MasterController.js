const mongoose = require("mongoose");
var md5 = require("md5");
const line_of_business_model = require("../models/Line_of_business");
const location_model = require("../models/Locations");
const make_motor_model = require("../models/Make_motor");
const motor_model = require("../models/Motor_model");
const Travel = require("../models/Travel_type");
const Travel_insurance = require("../models/Travel_insurance_for");
const Travel_plan_type = require("../models/Travel_plan_type");
const Travel_region_list = require("../models/Travel_region_list");
const Travel_cover_type_list = require("../models/Travel_cover_type_list");
const home_property_type = require("../models/Home_property_type_list");
const home_plan_type = require("../models/Home_plan_type_list");
const home_owner_type = require("../models/Home_ownership_status_list");
const home_condition = require("../models/Home_condition");
const home_plan_model = require("../models/HomePlan");
const Medical_plan_type = require("../models/Medical_plan_typelist");
const Medical_visa_country = require("../models/Medical_visa_country_list");
const Medical_plan_condition = require("../models/Medical_plan_condition_list");
const Medical_salary_range = require("../models/Medical_salary_range_list");
const Medical_weight_type = require("../models/Medical_weight_type_list");
const Yacht_Body_type = require("../models/Yacht_body_type_list");
const Yacht_hull_material = require("../models/Yacht_hull_material_list");
const Yacht_horsepower_type = require("../models/Yacht_horsepower_list");
const Yacht_Engine_type = require("../models/Yacht_engine_type_list");
const Yacht_Speed_knots_type = require("../models/Yacht_speed_knots_list");
const body_type_model = require("../models/Body_type");
const year_code_model = require("../models/Year_Code");
const plan_category_model = require("../models/Plan_category");
const nature_of_plan_model = require("../models/Nature_of_plan");
const Nationality = require("../models/Nationality");
const area_of_registration_model = require("../models/Area_of_registration");
const UserType = require("../models/User_type");
const RepairType = require("../models/Repair_type");
const PolicyType = require("../models/Policy_type");
const BusinessType = require("../models/Business_type");
const MotorModelDetails = require("../models/Motor_model_details");
const LeadStatus = require("../models/Lead_status");
const PlanFor = require("../models/Plan_for");
const PlanForGCCSpec = require("../models/Plan_for_gcc_spec");
const Admin_model = require("../models/Admin");
const Standard_cover = require("../models/Standard_cover");
const Additional_cover = require("../models/Additional_cover");
const motor_plan_model = require("../models/Motor_plan");
const Black_list_vehicle = require("../models/Black_list_vehicle");
const Country = require("../models/Country");
const travel_plan_model = require("../models/Travel_plan");
const Reason = require("../models/Reasons");
const Documents = require("../models/Documents_type");
const motorCliamsYearsModels = require("../models/motorClamsYears");
const bodyTypeModels = require("../models/Body_type");
const XLSX = require("xlsx");
const fs = require("fs-extra");
const excelToJson = require("convert-excel-to-json");
const yacht_plan = require("../models/YachtPlan");
const Yacht_engine_type_list = require("../models/Yacht_engine_type_list");
const Yacht_speed_knots_list = require("../models/Yacht_speed_knots_list");
const Yacht_Conditions = require("../models/Yacht_Conditions");
const Medical_visa_country_list = require("../models/Medical_visa_country_list");
const TableBenefits = require("../models/TableBenefits");
const HomePlan = require("../models/HomePlan");
const yachtPlan = require("../models/YachtPlan");
const yachtExperience = require("../models/Yacht_Experience");
const yachtQuestions = require("../models/Yacht_Questions");
const medicalPlan = require("../models/MedicalPlan");
const StandardUnderwritingCond = require("../models/StandardUnderwritingCond");
const AdditionalUnderwritingCond = require("../models/AdditionalUnderwritingCond");
const UnderwritingConditions = require("../models/UnderwritingConditions");
const Locations = require("../models/Locations");
const { termsConditionsModels } = require("../models/terms_conditions");
const { ComplaintModels } = require("../models/complaint");
const SpecialOffers = require("../models/SpecialOffers");
const testimonialsModels = require("../models/Testimonials");
const ortherInsuranceModels = require("../models/otherInsurance");
const MaternityQuestionnaireModels = require("../models/maternity_questionnaire");
const MedicalSymptomsConditions = require("../models/medical_symptoms_indicating");
const Admin = require("../models/Admin");
const userTypeModel = require("../models/User_type");
const { Customer } = require("../models/Customer");
const moterClamYears = require("../models/motorClamsYears");
const businessEntityComissionModels = require("../models/businessEntityComission");
const businessEntityDiscount = require("../models/BusinessEntityDiscount");
const utils = require("../utils");
const Motor_plan = require("../models/Motor_plan");
const vatModel = require("../models/Vat");
const companyModel = require("../models/Company");
const New_Lead = require("../models/New_Lead");
const axios = require("axios");
const yachtYearModels = require("../models/yachtYear");
const yachtMake = require("../models/yachtMake");
const yachtModel = require("../models/yachtModels");
const yachtEngine = require("../models/yachtEngine");
const homeAdditionalConditionModels = require("../models/homeAdditionalCondition")
const businessEntityDiscountModels = require("../models/BusinessEntityDiscount")
const generalWritingConditionModels = require("../models/genraleWrittingCondition")
const medicalCopaymentTypeModels = require("../models/medical_copayment_type")
const MedicalPlanBMI = require("../models/MedicalPlanBMI");
const medicalDeclarationModels = require("../models/medicalDeclaretion")
const medicalRateMaster = require("../models/RatesBasedOnAge")
const medicalTPAModels = require("../models/medicalTPA");
const medicalNetworkModels = require("../models/medicalNetwork");
const medicalNetworkListModels = require("../models/medicalNetworkList");
const bestplanmodel = require("../models/Best_Plan");
const preferredDay = require("../models/Preferred_day");
const boatBreadthModels = require("../models/boatBreadth")
const medicalLevelModels = require("../models/medical_level")
const producerDiscount = require("../models/ProducerDiscount");
const GroupMedicalPlan = require("../models/GroupMedicalPlan");
const GroupMedicalDocumentType = require("../models/Documents_type")
const MaritalStatus = require("../models/MaritalStatus")
const Gender = require("../models/Gender")
const Relation = require("../models/Relation")
const Sponsor_Type = require("../models/Sponsor_Type");
const Work_Location = require("../models/WorkLocation");
const BusinessEntityTopup = require("../models/BusinessEntityTopup");
const ActualSalaryBand = require("../models/ActualSalaryBand");
const { sendServerEmail } = require("../helper/sendEmail");
const Company = require("../models/Company");
const yachtModels = require("../models/yachtModels");

module.exports = {
  deleteMasterData: async (req, res) => {
    try {
      let query = req.query;
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "lineOfBusiness") {
        result = await line_of_business_model.findByIdAndDelete(query.id);
      } else if (query?.type === "location") {
        result = await Locations.findByIdAndDelete(query.id);
      } else if (query?.type === "planCategory") {
        result = await plan_category_model.findByIdAndDelete(query.id);
      } else if (query?.type === "natureOfPlan") {
        result = await nature_of_plan_model.findByIdAndDelete(query.id);
      } else if (query?.type === "nattionality") {
        result = await Nationality.findByIdAndDelete(query.id);
      } else if (query?.type === "standardCover") {
        result = await RepairType.findByIdAndDelete(query.id);
      } else if (query?.type === "businessType") {
        result = await Standard_cover.findByIdAndDelete(query.id);
      } else if (query?.type === "addinationalCover") {
        result = await Additional_cover.findByIdAndDelete(query.id);
      } else if (query?.type === "userType") {
        result = await userTypeModel.findByIdAndDelete(query.id);
      } else if (query?.type === "becommission") {
        result = await businessEntityComissionModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "bediscount") {
        result = await businessEntityDiscount.findByIdAndDelete(query.id);
      } else if (query?.type === "PolicyType") {
        result = await PolicyType.findByIdAndDelete(query.id);
      } else if (query?.type === "PlanCategory") {
        result = await plan_category_model.findByIdAndDelete(query.id);
      } else if (query?.type === "NatureOfPlan") {
        result = await nature_of_plan_model.findByIdAndDelete(query.id);
      }
      else if (query?.type === "best_plan") {
        result = await bestplanmodel.findByIdAndDelete(query.id);
      } else if (query?.type === "insurance_company") {
        result = await companyModel.findByIdAndDelete(query.id);
      } else if (query?.type === "reasons_type") {
        result = await Reason.findByIdAndDelete(query.id);
      }
      else if (query?.type === "documents_type") {
        result = await Documents.findByIdAndDelete(query.id);
      } else if (query?.type === "producerDiscount") {
        result = await producerDiscount.findByIdAndDelete(query.id);
      } else if (query?.type === "beTopup") {
        result = await BusinessEntityTopup.findByIdAndDelete(query.id)
      }

      if (!result) {
        UserType
        return res
          .status(404)
          .json({ sttaus: 404, message: "Data Not Deleteed", data: {} });
      }

      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  add_line_of_business: async (req, res) => {
    const locArr = req.body.line_of_business_location;
    let location_id = locArr.map((item) => mongoose.Types.ObjectId(item));
    let line_of_business = new line_of_business_model({
      line_of_business_name: req.body.line_of_business_name,
      line_of_business_location: location_id,
    });
    let result = await line_of_business.save();
    if (result != null) {
      res.json({
        status: 200,
        message: "Line Of Business Added Successfully!",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Line Of Business Not Added Successfully!",
      });
    }
  },

  read_line_of_business_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        let count = 0;
        for (let i = 0; i < cnt; i++) {
          let location_id = [];
          if (
            excelData["Sheet1"][i]["line_of_business_location"].includes(",")
          ) {
            let locations =
              excelData["Sheet1"][i]["line_of_business_location"].split(",");
            for (let j = 0; j < locations.length; j++) {
              let id = await Locations.findOne({
                location_name: locations[j].trim(),
              });
              location_id.push(id?._id?.toString());
            }
            location_id = location_id.join(",");
          } else {
            let id = await Locations.findOne({
              location_name:
                excelData["Sheet1"][i]["line_of_business_location"],
            });
            location_id.push(id?._id?.toString());
            location_id.join("");
          }
          const Locations_Ids = location_id;
          const line_of_business = new line_of_business_model({
            line_of_business_name:
              excelData["Sheet1"][i]["line_of_business_name"],
            line_of_business_location: Locations_Ids,
            line_of_business_status:
              excelData["Sheet1"][i]["line_of_business_status"],
          });
          await line_of_business.save();
          count++;
        }
        if (cnt === count) {
          res.status(200).json({
            success: true,
            message: "Line Of Business Added Successfully",
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Something Went Wrong" });
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  get_line_of_business: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId(obj?.loc_id))
      const mysort = { line_of_business_timestamp: -1 };
      if (page && limit) {
        const line_of_business = await line_of_business_model.aggregate([
          {
            $match: {
              line_of_business_location: {
                $in: userLocation
              }
            }
          },
          {
            '$lookup': {
              'from': 'locations',
              'localField': 'line_of_business_location',
              'foreignField': '_id',
              'as': 'line_of_business_location'
            }
          },
          {
            $project: {
              line_of_business_name: 1,
              line_of_business_status: 1,
              "line_of_business_location.location_name": 1
            }
          },
          {
            '$skip': (page - 1) * limit
          }, {
            '$limit': limit
          }
        ])
        const count = await line_of_business_model.countDocuments();
        res.json({
          status: 200,
          message: "Data Found",
          data: line_of_business,
          total: count,
        });
      } else {
        const line_of_business = await line_of_business_model.find().sort(mysort);
        res.json({ status: 200, message: "Data Found", data: line_of_business });
      }
    } catch (err) {
      console.log(err)
    }
  },
  get_line_of_business_by_id: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const line_of_business = await line_of_business_model.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "locations",
          localField: "line_of_business_location",
          foreignField: "_id",
          as: "lob_location",
        },
      },
    ]);
    res.json({ status: 200, message: "Data Found", data: line_of_business });
  },
  delete_line_of_business: async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    const line_of_business = await line_of_business_model.findByIdAndUpdate(
      id,
      {
        line_of_business_status: status,
      }
    );
    if (line_of_business != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Line Of Business Deactivated Successfully",
          data: line_of_business,
        });
      } else {
        res.json({
          status: 200,
          message: "Line Of Business Activated Successfully",
          data: line_of_business,
        });
      }
    }
  },
  get_location_by_id: async (req, res) => {
    const id = req.params.id;
    const location = await location_model.findById(id);
    res.json({ status: 200, message: "Data Found", data: location });
  },
  get_location: async (req, res) => {
    const location = await location_model.find({ location_status: 1 });
    res.json({ status: 200, message: "Data Found", data: location });
  },
  update_line_of_business: async (req, res) => {
    const id = req.body.line_of_business_id;
    const line_of_business_name = req.body.line_of_business_name;
    const line_of_business_location = req.body.line_of_business_location;
    let location_id = line_of_business_location.map((item) => mongoose.Types.ObjectId(item));
    const line_of_business = await line_of_business_model.findByIdAndUpdate(
      id,
      {
        line_of_business_name: line_of_business_name,
        line_of_business_location: location_id,
      }
    );
    if (line_of_business != null) {
      res.json({
        status: 200,
        message: "Line Of Business Updated Successfully",
        data: line_of_business,
      });
    } else {
      res.json({
        status: 400,
        message: "Line Of Business Not Updated Successfully",
      });
    }
  },
  get_locations: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const mysort = { location_name: 1 };
    const location = await location_model
      .find()
      .sort(mysort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await location_model.countDocuments();
    res.json({
      status: 200,
      message: "Data Found",
      data: location,
      total: count,
    });
  },
  delete_location: async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    const location = await location_model.findByIdAndUpdate(id, {
      location_status: status,
    });
    if (location != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Location Deactivated Successfully",
          data: location,
        });
      } else {
        res.json({
          status: 200,
          message: "Location Activated Successfully",
          data: location,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Location Not Deactivated Successfully",
      });
    }
  },
  add_location: async (req, res) => {
    let location = new location_model({
      location_name: req.body.location_name,
      location_status: req.body.location_status,
    });
    let result = await location.save();
    if (result != null) {
      res.json({
        status: 200,
        message: "Location Added Successfully!",
        data: result,
      });
    } else {
      res.json({ status: 400, message: "Location Not Added Successfully!" });
    }
  },

  read_location_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        for (let i = 0; i < cnt; i++) {
          const location = new location_model({
            location_name: excelData["Sheet1"][i]["location_name"],
            location_status: excelData["Sheet1"][i]["location_status"],
          });
          await location.save();
        }
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update_location: async (req, res) => {
    try {
      const id = req.body.location_id;
      const location_name = req.body.location_name;
      const location_status = req.body.location_status;
      const location = await location_model.findByIdAndUpdate(id, {
        location_name: location_name,
        location_status: location_status,
      });
      if (location != null) {
        res.json({
          status: 200,
          message: "Location Updated Successfully",
          data: location,
        });
      } else {
        res.json({ status: 400, message: "Location Not Updated Successfully" });
      }
    } catch (err) {
      console.log(err)
    }
  },
  get_make_motor: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let name = query.name
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let status = +query.status
      let mysort = { make_motor_name: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            make_motor_name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["make_motor_location"] = {
          $in: userLocation
        }
        if (status == 0 || status == 1) {
          match["make_motor_status"] = +status;
        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "make_motor_location",
              foreignField: "_id",
              as: "make_motor_location",
            },
          },
          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          },

        ]
        aggregate.push({
          $facet: facet
        })
        let make_motor = await make_motor_model.aggregate(aggregate);

        if (!make_motor[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: make_motor[0]?.data, total: make_motor[0]?.totalCount[0]?.total });


      } else {
        const make_motor = await make_motor_model.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "make_motor_location",
              foreignField: "_id",
              as: "make_motor_location",
            },
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: make_motor });
      }
    } catch (error) {
      console.log(error)
    }
  },
  update_make_motor_status: async (req, res) => {
    let id = req.params.id;
    let status = req.body.make_motor_status;
    const make_motor = await make_motor_model.findByIdAndUpdate(id, {
      make_motor_status: status,
    });
    if (make_motor != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Make Motor Deactivated Successfully",
          data: make_motor,
        });
      } else {
        res.json({
          status: 200,
          message: "Make Motor Activated Successfully",
          data: make_motor,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Make Motor Not Deactivated Successfully",
      });
    }
  },
  add_make_motor: async (req, res) => {
    try {
      const motorData = req.body;
      let existArray = [];
      let count = 0;
      const index = motorData.index
      let motorName = await utils.toUpperCase(motorData.make_motor_name);
      const make_motor_in_db = await make_motor_model.find({
        make_motor_name: motorName,
      });
      if (make_motor_in_db.length > 0) {
        existArray.push(make_motor_in_db);
        count++;
      } else {
        let location_id = motorData.location.includes(",") ? motorData.location.split(",") : [motorData.location];

        let locationArray = [];
        for (let j = 0; j < location_id.length; j++) {
          locationArray.push(mongoose.Types.ObjectId(location_id[j]));
        }
        let make_details = await make_motor_model.aggregate([
          {
            '$match': {
              'jdvCode': {
                '$exists': true
              }
            }
          }, {
            '$sort': {
              'jdvCode': -1
            }
          }

        ])
        let JdvCode = make_details[0]?.jdvCode ? +make_details[0]?.jdvCode + 1 + (+index) : 1 + (+index)
        let make_motor = new make_motor_model({
          make_motor_name: motorName,
          make_motor_location: locationArray,
          make_motor_logo: req.file?.filename,
          jdvCode: JdvCode
        });
        let result = await make_motor.save();
        count++
        if (result && motorData.last == 'last') {
          return res.json({
            status: 200,
            message: `Make Motor Added Successfully`,
            count: count
          });
        }
        else {
          return;
        }

      }
      // if (resultArray.length > 0) {
      //   return  res.json({
      //     status: 400,
      //     message: "Make Motor Not Added Successfully!",
      //   });
      // } 



    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something Went Wrong!" });
    }
  },

  read_make_motor_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let makeDtails;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.make_motor_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        makeDtails = await make_motor_model.findOneAndUpdate(
          { make_motor_name: await typeConversion(xlData[i]?.make_motor_name) },
          {
            make_motor_name: await typeConversion(xlData[i]?.make_motor_name),
            make_motor_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err)
      res.status(500).json("Somthing Went Rong");
    }
  },

  get_make_motor_details: async (req, res) => {
    const id = req.params.id;
    const make_motor_data = await make_motor_model.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "locations",
          localField: "make_motor_location",
          foreignField: "_id",
          as: "make_motor_location",
        },
      },
    ]);
    res.json({ status: 200, message: "Data Found", data: make_motor_data });
  },

  update_make_motor: async (req, res) => {
    const id = req.query.id;
    const reqdata = req.body;
    let payloadObj = {}
    if (reqdata?.make_motor_name) {
      const make_motor_name = await utils.toUpperCase(reqdata?.make_motor_name);
      payloadObj["make_motor_name"] = make_motor_name
    }
    if (reqdata?.make_motor_location) {
      let location_id = reqdata?.make_motor_location.includes(",") ? reqdata?.make_motor_location.split(",") : [reqdata?.make_motor_location];
      let locationArray = location_id.map((item) => { return mongoose.Types.ObjectId(item) })
      payloadObj["make_motor_location"] = locationArray
    }
    if (req.file) {
      payloadObj["make_motor_logo"] = req.file?.filename
    }
    const make_motor = await make_motor_model.findByIdAndUpdate(id, payloadObj);
    if (make_motor) {
      res.json({
        status: 200,
        message: "Make Motor Updated Successfully",
        data: make_motor,
      });
    } else {
      res.json({ status: 400, message: "Make Motor Not Updated Successfully" });
    }
  },

  getlistMakeMotor: async (req, res) => {
    const mysort = { make_motor_name: 1 };
    const make_motor = await make_motor_model
      .find({
        make_motor_status: 1,
      })
      .sort(mysort);
    res.json({ status: 200, message: "Data Found", data: make_motor });
  },

  get_model_motor: async (req, res) => {
    let query = req.query;
    let page = query.page;
    let limit = query.limit
    let name = query.name
    let userData = req.user
    let userLocation = userData?.location
    userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
    let status = +query.status
    const mysort = { motor_model_name: 1 };
    if (page && limit) {

      let match = {}
      if (name) {
        match = {
          motor_model_name: {
            $regex: name,
            $options: "i"
          }
        }
      }
      match["motor_model_location"] = {
        $in: userLocation
      }
      if (status == 0 || status == 1) {
        match["motor_model_status"] = status;
      }
      let aggregate = [
        {
          $match: match
        },
      ];
      let facet = {};
      facet["totalCount"] = [
        {
          $count: "total",
        },
      ];
      facet["data"] = [
        {
          $lookup: {
            from: "make_motors",
            localField: "motor_model_make_id",
            foreignField: "_id",
            as: "make_motor",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "motor_model_location",
            foreignField: "_id",
            as: "motor_model_location",
          },
        },
        {
          $sort: mysort
        },
        {
          $skip: +((+page - 1) * +limit)
        },
        {
          $limit: +limit,
        },
      ]
      aggregate.push({
        $facet: facet
      })
      let motorMoedelData = await motor_model.aggregate(aggregate);

      if (!motorMoedelData[0]?.data?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
      }
      return res.status(200).json({ status: 200, message: "Data Found", data: motorMoedelData[0]?.data, total: motorMoedelData[0]?.totalCount[0]?.total });

    } else {
      const model_motor = await motor_model
        .aggregate([
          {
            $lookup: {
              from: "make_motors",
              localField: "motor_model_make_id",
              foreignField: "_id",
              as: "make_motor",
            },
          },
          {
            $unwind: {
              path: "$make_motor",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "motor_model_location",
              foreignField: "_id",
              as: "motor_model_location",
            },
          },
        ])
        .sort(mysort);

      res.json({ status: 200, message: "Data Found", data: model_motor });
    }
  },

  update_model_motor_status: async (req, res) => {
    let id = req.params.id;
    let status = req.body.motor_model_status;
    const model_motor = await motor_model.findByIdAndUpdate(id, {
      motor_model_status: status,
    });
    if (model_motor != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Model Motor Deactivated Successfully",
          data: model_motor,
        });
      } else {
        res.json({
          status: 200,
          message: "Model Motor Activated Successfully",
          data: model_motor,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Model Motor Not Deactivated Successfully",
      });
    }
  },

  addModelMotor: async (req, res) => {
    try {
      const motorData = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < motorData.length; i++) {
        let details = await motor_model.aggregate([
          {
            '$match': {
              'jdvDataMedelCode': {
                '$exists': true
              }
            }
          }, {
            '$sort': {
              'jdvDataMedelCode': -1
            }
          }, {
            '$limit': 1
          }
        ])
        let qicMakeCode = details[0]?.jdvDataMedelCode ? +details[0]?.jdvDataMedelCode + 1 : 101
        let motorName = await utils.toUpperCase(motorData[i].motor_model_name);
        const make_motor_in_db = await motor_model.find({
          motor_model_name: motorName,
        });
        if (make_motor_in_db.length > 0) {
          existArray.push(make_motor_in_db);
          count++;
        } else {
          let location_id = motorData[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          let make_motor = new motor_model({
            motor_model_name: motorName,
            motor_model_make_id: motorData[i].make_motor,
            motor_model_location: locationArray,
            jdvDataMedelCode: qicMakeCode
          });
          let result = await make_motor.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Model Motor Added ${resultArray.length} already exist ${count}`,
        });
      }
      else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Model MOtor already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Model Motor Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_model_motor_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let makeDtails;
        let modelDetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.motor_model_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        makeDtails = await make_motor_model.findOneAndUpdate(
          { make_motor_name: await typeConversion(xlData[i]?.make_motor_model) },
          {
            make_motor_name: await typeConversion(xlData[i]?.make_motor_model),
            make_motor_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        modelDetails = await motor_model.findOneAndUpdate(
          {
            motor_model_name: await typeConversion(
              xlData[i]?.motor_model_name
            ),
          },
          {
            motor_model_name: await typeConversion(
              xlData[i]?.motor_model_name
            ),
            motor_model_location: locationArray,
            motor_model_make_id: makeDtails?._id?.toString(),
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("ASome Thing Went Worng");
    }
  },

  getModelMotorDetails: async (req, res) => {
    const id = req.params.id;
    const result = await motor_model.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "locations",
          localField: "motor_model_location",
          foreignField: "_id",
          as: "motor_model_location",
        },
      },
    ]);
    res.json({ status: 200, message: "Data Found", data: result });
  },

  updateModelMotor: async (req, res) => {

    const id = req.body.model_motor_id;
    const motor_model_name = await utils.toUpperCase(req.body.model_motor_name);
    const motor_model_make_id = req.body.make_motor;
    const motor_model_location = req.body.model_motor_location?.map((val) =>
      mongoose.Types.ObjectId(val)
    );


    const payload = {};
    if (motor_model_name) {
      payload["motor_model_name"] = motor_model_name;
    }
    if (motor_model_make_id) {
      payload["motor_model_make_id"] = motor_model_make_id;
    }
    if (motor_model_location?.length > 0) {
      payload["motor_model_location"] = motor_model_location;
    }

    console.log("payload", payload)
    const result = await motor_model.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true }
    );
    if (result != null) {
      res.json({
        status: 200,
        message: "Updated Successfully!",
        data: result,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  travelinsurancefor: async (req, res) => {
    try {
      const traveldata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < traveldata.length; i++) {
        let travelName = await utils.toUpperCase(traveldata[i].travel_insurance_for);
        const travel_insurances_in_db = await Travel_insurance.find({
          travel_insurance_for: travelName,
        });

        if (travel_insurances_in_db.length > 0) {
          existArray.push(travel_insurances_in_db);
          count++;

        } else {
          let location_id = traveldata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let travel_insurance = new Travel_insurance({
            travel_insurance_for: travelName,
            travel_insurance_location: locationArray,
          });

          console.log("travel_insurance", travel_insurance)

          let result = await travel_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Travel Insurance Type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Travel Insurance Type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Travel Insurance Type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_travel_insurance_for_excel: async (req, res) => {

    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let traveldetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.travel_insurance_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        traveldetails = await Travel_insurance.findOneAndUpdate(
          {
            travel_insurance_for: await typeConversion(
              xlData[i]?.travel_insurance_for
            ),
          },
          {
            travel_insurance_for: await typeConversion(
              xlData[i]?.travel_insurance_for
            ),
            travel_insurance_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_travel_insurance_for: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { travel_insurance_for: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["travel_insurance_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Travel_insurance.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "travel_insurance_location",
                foreignField: "_id",
                as: "travel_insurance_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Travel_insurance.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Travel_insurance.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "travel_insurance_location",
                foreignField: "_id",
                as: "travel_insurance_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_travel_insurance_for_detailsbyid: async (req, res) => {
    try {
      const result = await Travel_insurance.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_insurance_location",
              foreignField: "_id",
              as: "travel_insurance_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_insurance_for_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const travelinsurancefor = await utils.toUpperCase(req.body.travel_insurance_for);
      const travellocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.travel_insurance_for) {
        payload["travel_insurance_for"] = travelinsurancefor;
      }
      if (req.body.location) {
        payload["travel_insurance_location"] = travellocation;
      }
      console.log("payload", payload)

      let newdetails = await Travel_insurance.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Insurance For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Insurance For Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_insurance_for_status: async (req, res) => {
    try {
      let newdetails = await Travel_insurance.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            travel_insurance_for_status: req.body.travel_insurance_for_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Insurance For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Insurance For Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_travel_type: async (req, res) => {
    try {
      const traveldata = req.body;

      console.log("traveldata", traveldata)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < traveldata.length; i++) {
        let travelName = await utils.toUpperCase(traveldata[i].travel_type);
        const travel_types_in_db = await Travel.find({
          travel_type: travelName,
        });

        if (travel_types_in_db.length > 0) {
          existArray.push(travel_types_in_db);
          count++;

        } else {
          let location_id = traveldata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let travel_type_data = new Travel({
            travel_type: travelName,
            travel_type_location: locationArray,
          });

          console.log("travel_insurance", travel_type_data)

          let result = await travel_type_data.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Travel Type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Travel Type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Travel Type Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_travel_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let traveldetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.travel_type_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          console.log("allLocations", allLocations)
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", locationArray)

        traveldetails = await Travel.findOneAndUpdate(
          {
            travel_type: await typeConversion(
              xlData[i]?.travel_type
            ),
          },
          {
            travel_type: await typeConversion(
              xlData[i]?.travel_type
            ),
            travel_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  get_travel_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { travel_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["travel_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Travel.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_type_location",
              foreignField: "_id",
              as: "travel_type_location",
            },
          },
        ])
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Travel.countDocuments();
        if (result != null) {
          return res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          return res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Travel.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "travel_type_location",
              foreignField: "_id",
              as: "travel_type_location",
            },
          },
        ]).sort(mysort);
        if (result != null) {
          return res.json({ status: 200, message: "Data Found", data: result });
        } else {
          return res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_travel_type_id: async (req, res) => {
    try {
      const result = await Travel.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_type_location",
              foreignField: "_id",
              as: "travel_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_travel_type_status: async (req, res) => {
    try {
      let newdetails = await Travel.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { travel_type_status: req.body.travel_type_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Successfully",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Failed"
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_type_details: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const traveltype = await utils.toUpperCase(req.body.travel_type);
      const travellocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.travel_type) {
        payload["travel_type"] = traveltype;
      }
      if (req.body.location) {
        payload["travel_type_location"] = travellocation;
      }
      console.log("payload", payload)

      let newdetails = await Travel.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Type Updated Successfully",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_travel_plan_type: async (req, res) => {
    try {
      const traveldata = req.body;

      console.log("traveldata", traveldata)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < traveldata.length; i++) {
        let travelName = await utils.toUpperCase(traveldata[i].travel_plan_type);
        const travel_plan_types_in_db = await Travel_plan_type.find({
          travel_plan_type: travelName,
        });

        if (travel_plan_types_in_db.length > 0) {
          existArray.push(travel_plan_types_in_db);
          count++;

        } else {
          let location_id = traveldata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let travel_plan_type_data = new Travel_plan_type({
            travel_plan_type: travelName,
            travel_plan_type_location: locationArray,
          });

          console.log("travel_insurance", travel_plan_type_data)

          let result = await travel_plan_type_data.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Travel Plan Type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Travel Plan Type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Travel Insurance Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_travel_plan_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let traveldetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.travel_plan_type_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          console.log("allLocations", allLocations)
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", locationArray)

        traveldetails = await Travel_plan_type.findOneAndUpdate(
          {
            travel_plan_type: await typeConversion(
              xlData[i]?.travel_plan_type
            ),
          },
          {
            travel_plan_type: await typeConversion(
              xlData[i]?.travel_plan_type
            ),
            travel_plan_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err.message);
      res.send(err);
    }
  },

  get_travel_plan_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { travel_plan_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["travel_plan_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Travel_plan_type.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_plan_type_location",
              foreignField: "_id",
              as: "travel_plan_type_location",
            },
          },
        ])
          .sort(mysort)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const count = await Travel_plan_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Travel_plan_type.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "travel_plan_type_location",
              foreignField: "_id",
              as: "travel_plan_type_location",
            },
          },
        ]).sort(mysort);
        if (result != null) {
          return res.json({ status: 200, message: "Data Found", data: result });
        } else {
          return res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_travel_plan_type_id: async (req, res) => {
    try {
      const result = await Travel_plan_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_plan_type_location",
              foreignField: "_id",
              as: "travel_plan_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_plan_type_status: async (req, res) => {
    try {
      let newdetails = await Travel_plan_type.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { travel_plan_type_status: req.body.travel_plan_type_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_plan_type_details: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const travelplantype = await utils.toUpperCase(req.body.travel_plan_type);
      const travellocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.travel_plan_type) {
        payload["travel_plan_type"] = travelplantype;
      }
      if (req.body.location) {
        payload["travel_plan_type_location"] = travellocation;
      }
      console.log("payload", payload)

      let newdetails = await Travel_plan_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Plan Type Updated Successfully",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Plan Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_travel_region_list: async (req, res) => {
    try {
      const traveldata = req.body;

      console.log("traveldata", traveldata)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < traveldata.length; i++) {
        let travelName = await utils.toUpperCase(traveldata[i].travel_region);
        const travel_region_in_db = await Travel_region_list.find({
          travel_region: travelName,
        });

        if (travel_region_in_db.length > 0) {
          existArray.push(travel_region_in_db);
          count++;

        }

        else {
          let location_id = traveldata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }
          let country_id = traveldata[i].country;
          let countryArray = country_id.map((val) => mongoose.Types.ObjectId(val._id));


          let travel_region_data = new Travel_region_list({
            travel_region: travelName,
            travel_region_location: locationArray,
            travel_region_country: countryArray,
          });

          console.log("travel_insurance", travel_region_data)

          let result = await travel_region_data.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Travel Region List Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Travel Region already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Travel Region List Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_travel_region_list_excel: async (req, res) => {
    try {
      console.log("hiii")
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let traveldetails;
        let locationArray = [];
        let locationInexcel = xlData[i]?.travel_region_location;
        let nationalityArray = [];
        let nationalityInexcel = xlData[i]?.Country;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel?.includes(",") ? locationInexcel.split(",") : [locationInexcel];
        nationalityInexcel = nationalityInexcel?.includes(",") ? nationalityInexcel.split(",") : [nationalityInexcel];

        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: {
              $regex: locationInexcel[i]?.trim(),
              $options: "i"
            },

            location_status: 1,
          });
          console.log("allLocations", allLocations)
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        for (let i = 0; i < nationalityInexcel.length; i++) {
          let nationalitysData = await Nationality.findOne({
            nationality_name: nationalityInexcel[i]?.trim(),

            location_status: 1,
          });
          nationalityArray.push(
            mongoose.Types.ObjectId(nationalitysData?._id?.toString())
          );
        }
        console.log("nationalityArraykkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", nationalityArray)

        traveldetails = await Travel_region_list.findOneAndUpdate(
          {
            travel_region: await typeConversion(
              xlData[i]?.travel_region
            ),
          },
          {
            travel_region: await typeConversion(
              xlData[i]?.travel_region
            ),
            travel_region_location: locationArray,
            travel_region_country: nationalityArray
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  get_travel_region_list: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { travel_region: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["travel_region_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Travel_region_list.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "nationalities",
              localField: "travel_region_country",
              foreignField: "_id",
              as: "travel_region_country",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_region_location",
              foreignField: "_id",
              as: "travel_region_location",
            },
          },

        ])
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Travel_region_list.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Travel_region_list.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "travel_region_location",
              foreignField: "_id",
              as: "travel_region_location",
            },
          },
          {
            $lookup: {
              from: "nationalities",
              localField: "travel_region_country",
              foreignField: "_id",
              as: "travel_region_country",
            },
          },
        ]);

        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_travel_region_list_id: async (req, res) => {
    try {
      const result = await Travel_region_list.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_region_location",
              foreignField: "_id",
              as: "travel_region_location",
            },
          },
          {
            $lookup: {
              from: "nationalities",
              localField: "travel_region_country",
              foreignField: "_id",
              as: "travel_region_country",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_region_list_status: async (req, res) => {
    let newdetails = await Travel_region_list.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { travel_region_status: req.body.travel_region_status } },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  update_travel_region_list_details: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const travelregion = await utils.toUpperCase(req.body.travel_region);
      const travellocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );
      const travelcountry = req.body.country?.map((val) => mongoose.Types.ObjectId(val));

      let payload = {};
      if (req.body.travel_region) {
        payload["travel_type"] = travelregion;
      }
      if (req.body.location) {
        payload["travel_region_location"] = travellocation;
      }
      if (req.body.country) {
        payload["travel_region_country"] = travelcountry;
      }
      console.log("payload", payload)

      let newdetails = await Travel_region_list.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Type Updated Successfully",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Type Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.send(err);
    }
  },

  add_travel_cover_type_list: async (req, res) => {
    try {
      const traveldata = req.body;

      console.log("traveldata", traveldata)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < traveldata.length; i++) {
        let travelName = await utils.toUpperCase(traveldata[i].travel_cover_type);
        const travel_types_in_db = await Travel_cover_type_list.find({
          travel_cover_type: travelName,
        });

        if (travel_types_in_db.length > 0) {
          existArray.push(travel_types_in_db);
          count++;

        } else {
          let location_id = traveldata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let travel_type_data = new Travel_cover_type_list({
            travel_cover_type: travelName,
            travel_cover_type_location: locationArray,
          });

          console.log("travel_insurance", travel_type_data)

          let result = await travel_type_data.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Travel Insurance Added ${resultArray.length} already exist ${count}`,
        });
      }
      else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Travel Insurance already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Travel Insurance Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_travel_cover_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let traveldetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.travel_cover_type_location
        console.log("..........................................", { locationInexcel }, xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          console.log("allLocations", allLocations)
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", locationArray)

        traveldetails = await Travel_cover_type_list.findOneAndUpdate(
          {
            travel_cover_type: await typeConversion(
              xlData[i]?.travel_cover_type
            ),
          },
          {
            travel_cover_type: await typeConversion(
              xlData[i]?.travel_cover_type
            ),
            travel_cover_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  },

  get_travel_cover_type_list: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { travel_cover_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["travel_cover_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Travel_cover_type_list.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_cover_type_location",
              foreignField: "_id",
              as: "travel_cover_type_location",
            },
          },
        ])
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Travel_cover_type_list.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Travel_cover_type_list.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "travel_cover_type_location",
              foreignField: "_id",
              as: "travel_cover_type_location",
            },
          },
        ]).sort(mysort);

        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_travel_cover_type_list_id: async (req, res) => {
    try {
      const result = await Travel_cover_type_list.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "travel_cover_type_location",
              foreignField: "_id",
              as: "travel_cover_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_cover_type_list_status: async (req, res) => {
    try {
      let newdetails = await Travel_cover_type_list.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: { travel_cover_type_status: req.body.travel_cover_type_status },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_travel_cover_type_list_details: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const traveltype = await utils.toUpperCase(req.body.travel_cover_type);
      const travellocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.travel_cover_type) {
        payload["travel_cover_type"] = traveltype;
      }
      if (req.body.location) {
        payload["travel_cover_type_location"] = travellocation;
      }
      console.log("payload", payload)

      let newdetails = await Travel_cover_type_list.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Travel Type Updated Successfully",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Travel Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_home_property_type: async (req, res) => {
    try {
      const homedata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < homedata.length; i++) {
        let homeName = await utils.toUpperCase(homedata[i].home_property_type);
        const home_insurances_in_db = await home_property_type.find({
          home_property_type: homeName,
        });

        if (home_insurances_in_db.length > 0) {
          existArray.push(home_insurances_in_db);
          count++;

        } else {
          let location_id = homedata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let home_insurance = new home_property_type({
            home_property_type: homeName,
            home_property_type_location: locationArray,
          });

          console.log("home_insurance", home_insurance)

          let result = await home_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Property type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Property type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Home Property type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_home_property_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let homedetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.home_property_type_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        homedetails = await home_property_type.findOneAndUpdate(
          {
            home_property_type: await typeConversion(
              xlData[i]?.home_property_type
            ),
          },
          {
            home_property_type: await typeConversion(
              xlData[i]?.home_property_type
            ),
            home_property_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_home_property_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_property_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["home_property_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await home_property_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "home_property_type_location",
                foreignField: "_id",
                as: "home_property_type_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await home_property_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await home_property_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "home_property_type_location",
                foreignField: "_id",
                as: "home_property_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  gethomePropertyTypeList: async (req, res) => {
    try {
      const result = await home_property_type.find();

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_home_property_type_detailsbyid: async (req, res) => {
    try {
      const result = await home_property_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "home_property_type_location",
              foreignField: "_id",
              as: "home_property_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_home_property_type_status: async (req, res) => {
    let newdetails = await home_property_type.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: { home_property_type_status: req.body.home_property_type_status },
      },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  update_home_property_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const homepropertytype = await utils.toUpperCase(req.body.home_property_type);
      const homelocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.home_property_type) {
        payload["home_property_type"] = homepropertytype;
      }
      if (req.body.location) {
        payload["home_property_type_location"] = homelocation;
      }
      console.log("payload", payload)

      let newdetails = await home_property_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Home Property Type For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Home Property Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_home_plan_type: async (req, res) => {
    try {
      const homedata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < homedata.length; i++) {
        let homeName = await utils.toUpperCase(homedata[i].home_plan_type);
        const home_insurances_in_db = await home_plan_type.find({
          home_plan_type: homeName,
        });

        if (home_insurances_in_db.length > 0) {
          existArray.push(home_insurances_in_db);
          count++;

        } else {
          let location_id = homedata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let home_insurance = new home_plan_type({
            home_plan_type: homeName,
            home_plan_type_location: locationArray,
          });

          console.log("home_insurance", home_insurance)

          let result = await home_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Plan type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Plan type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Home Plan type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }

  },
  getHome_Plan_Type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_plan_type: 1 };
      if (page && limit) {
        const result = await home_plan_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "home_plan_type_location",
                foreignField: "_id",
                as: "home_plan_type_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await home_plan_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await home_plan_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "home_plan_type_location",
                foreignField: "_id",
                as: "home_plan_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_home_plan_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let homedetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.home_plan_type_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        homedetails = await home_plan_type.findOneAndUpdate(
          {
            home_plan_type: await typeConversion(
              xlData[i]?.home_plan_type
            ),
          },
          {
            home_plan_type: await typeConversion(
              xlData[i]?.home_plan_type
            ),
            home_plan_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_home_plan_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_plan_type: 1 };
      console.log("hiiiiiiiiiiiiiiiiii")
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["home_plan_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {

        const result = await home_plan_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "home_plan_type_location",
                foreignField: "_id",
                as: "home_plan_type_location",
              },
            },

          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();

        const count = await home_plan_type.countDocuments();
        console.log("count", count)
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const matchq = req.query.match
        let match = {}
        if (matchq === true) {
          match["home_plan_type_status"] = 1
        }

        const result = await home_plan_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "home_plan_type_location",
                foreignField: "_id",
                as: "home_plan_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_all_home_plan_type: async (req, res) => {
    try {

      const mysort = { home_plan_type: 1 };

      const result = await home_plan_type.aggregate(
        [
          {
            $lookup: {
              from: "locations",
              localField: "home_plan_type_location",
              foreignField: "_id",
              as: "home_plan_type_location",
            },
          },
        ]
      ).sort(mysort);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }

    } catch (err) {
      res.send(err);
    }
  },
  get_home_plan_type_detailsbyid: async (req, res) => {
    try {
      const result = await home_plan_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "home_plan_type_location",
              foreignField: "_id",
              as: "home_plan_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }


  },

  update_home_plan_type_status: async (req, res) => {
    let newdetails = await home_plan_type.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { home_plan_type_status: req.body.home_plan_type_status } },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  update_home_plan_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const homeplantype = await utils.toUpperCase(req.body.home_plan_type);
      const homelocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.home_plan_type) {
        payload["home_plan_type"] = homeplantype;
      }
      if (req.body.location) {
        payload["home_plan_type_location"] = homelocation;
      }
      console.log("payload", payload)

      let newdetails = await home_plan_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Home Plan Type For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Home Plan Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_home_owner_type: async (req, res) => {
    try {
      const homedata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < homedata.length; i++) {
        let homeName = await utils.toUpperCase(homedata[i].home_owner_type);
        const home_insurances_in_db = await home_owner_type.find({
          home_owner_type: homeName,
        });

        if (home_insurances_in_db.length > 0) {
          existArray.push(home_insurances_in_db);
          count++;

        } else {
          let location_id = homedata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let home_insurance = new home_owner_type({
            home_owner_type: homeName,
            home_ownership_location: locationArray,
          });

          console.log("home_insurance", home_insurance)

          let result = await home_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Ownership type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Ownership type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Home Ownership type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_home_owner_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let homedetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.home_ownership_location
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        homedetails = await home_owner_type.findOneAndUpdate(
          {
            home_owner_type: await typeConversion(
              xlData[i]?.home_owner_type
            ),
          },
          {
            home_owner_type: await typeConversion(
              xlData[i]?.home_owner_type
            ),
            home_ownership_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_home_owner_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_owner_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["home_ownership_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await home_owner_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "home_ownership_location",
                foreignField: "_id",
                as: "home_ownership_location",
              },
            },

          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();

        const count = await home_owner_type.countDocuments();
        console.log("count", count)
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await home_owner_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "home_ownership_location",
                foreignField: "_id",
                as: "home_ownership_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_home_ownership_list: async (req, res) => {
    try {
      const result = await home_owner_type.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_home_owner_type_detailsbyid: async (req, res) => {
    try {
      const result = await home_owner_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "home_ownership_location",
              foreignField: "_id",
              as: "home_ownership_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_home_owner_type_status: async (req, res) => {
    let newdetails = await home_owner_type.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { home_ownership_status: req.body.home_ownership_status } },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  update_home_owner_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const homeownertype = await utils.toUpperCase(req.body.home_owner_type);
      const homelocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.home_owner_type) {
        payload["home_owner_type"] = homeownertype;
      }
      if (req.body.location) {
        payload["home_ownership_location"] = homelocation;
      }
      console.log("payload", payload)

      let newdetails = await home_owner_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Home Ownership Type For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Home Ownership Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_home_condition: async (req, res) => {
    try {
      const homedata = req.body;
      console.log("homedata", homedata)
      // return false;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < homedata.length; i++) {
        let homeName = await utils.toUpperCase(homedata[i].condition_label);
        const home_insurances_in_db = await home_condition.find({
          home_condition_label: homeName,
        });
        if (home_insurances_in_db.length > 0) {
          existArray.push(home_insurances_in_db);
          count++;
        } else {
          let location_id = homedata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          // const conditionDescription = homedata[0].condition_description;
          console.log("locationArray", locationArray)
          console.log("homeName", homeName)
          // console.log("req.body.condition_description", conditionDescription)


          let home_insurance = new home_condition({
            home_condition_label: homeName,
            home_condition_location: locationArray,
          });
          let result = await home_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Condition already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Home Condition Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  get_home_condition: async (req, res) => {

    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_condition_label: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["home_condition_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await home_condition.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "home_condition_location",
                foreignField: "_id",
                as: "home_condition_location",
              },
            },

          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();

        const count = await home_condition.countDocuments();
        console.log("count", count)
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await home_condition.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "home_condition_location",
                foreignField: "_id",
                as: "home_condition_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_home_condition_status: async (req, res) => {
    try {
      const result = await home_condition.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { home_condition_status: req.body.home_condition_status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_home_conditionbyid: async (req, res) => {
    try {
      const result = await home_condition.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "home_condition_location",
              foreignField: "_id",
              as: "home_condition_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_home_condition: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const homeownertype = await utils.toUpperCase(req.body.home_condition_label);
      const homelocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );
      const homeconditiondescription = req.body.home_condition_description;

      let payload = {};
      if (req.body.home_condition_label) {
        payload["home_condition_label"] = homeownertype;
      }
      if (req.body.home_condition_description) {
        payload["home_condition_description"] = homeconditiondescription;
      }
      if (req.body.location) {
        payload["home_condition_location"] = homelocation;
      }
      console.log("payload", payload)

      let newdetails = await home_condition.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Home Condition Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Home Condition Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_home_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let homedetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.home_condition_location

        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        let description = xlData[i]?.home_condition_description;

        if (description.toLowerCase() === "yes") {
          description = "1";
        } else if (description.toLowerCase() === "no") {
          description = "0";
        }


        homedetails = await home_condition.findOneAndUpdate(
          {
            home_condition_label: await typeConversion(
              xlData[i]?.home_condition_label
            ),
          },
          {
            home_condition_label: await typeConversion(
              xlData[i]?.home_condition_label
            ),
            home_condition_description: await typeConversion(description),

            home_condition_location: locationArray,

          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  gethomecondition: async (req, res) => {
    try {
      const result = await home_condition.find().sort({ createdAt: 1 });

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  add_yacht_conditions: async (req, res) => {
    try {

      const Yachtdata = req.body;
      console.log("Yachtdata", Yachtdata)
      // return false;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < Yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(Yachtdata[i].condition_label);
        const yacht_insurances_in_db = await Yacht_Conditions.find({
          yacht_condition_label: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = Yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          const conditionDescription = Yachtdata[0].condition_description;
          console.log("locationArray", locationArray)
          console.log("yachtName", yachtName)
          console.log("req.body.condition_description", conditionDescription)


          let yacht_insurance = new Yacht_Conditions({
            yacht_condition_label: yachtName,
            yacht_condition_description: conditionDescription,
            yacht_condition_location: locationArray,
          });


          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Yacht Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Yatch Condition already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Yacht Condition Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },
  get_yacht_condition: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { home_condition_label: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["yacht_condition_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_Conditions.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "yacht_condition_location",
                foreignField: "_id",
                as: "yacht_condition_location",
              },
            },

          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();

        const count = await Yacht_Conditions.countDocuments();
        console.log("count", count)
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_Conditions.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_condition_location",
                foreignField: "_id",
                as: "yacht_condition_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_yacht_condition_status: async (req, res) => {
    try {
      const result = await Yacht_Conditions.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { yacht_condition_status: req.body.yacht_condition_status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_yacht_conditionbyid: async (req, res) => {
    try {
      const result = await Yacht_Conditions.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_condition_location",
              foreignField: "_id",
              as: "yacht_condition_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_yacht_condition: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const yachtcondition = await utils.toUpperCase(req.body.yacht_condition_label);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );
      const yachtconditiondescription = req.body.yacht_condition_description;

      console.log("yachtcondition", yachtcondition)
      console.log("yachtlocation", yachtlocation)
      console.log("yachtconditiondescription", yachtconditiondescription)


      let payload = {};
      if (req.body.yacht_condition_label) {
        payload["yacht_condition_label"] = yachtcondition;
      }
      if (req.body.yacht_condition_description) {
        payload["yacht_condition_description"] = yachtconditiondescription;
      }
      if (req.body.location) {
        payload["yacht_condition_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_Conditions.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Conditions Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Conditions Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_yacht_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_condition_location

        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        let description = xlData[i]?.yacht_condition_description;

        if (description.toLowerCase() === "yes") {
          description = "1";
        } else if (description.toLowerCase() === "no") {
          description = "0";
        }


        yachtdetails = await Yacht_Conditions.findOneAndUpdate(
          {
            yacht_condition_label: await typeConversion(
              xlData[i]?.yacht_condition_label
            ),
          },
          {
            yacht_condition_label: await typeConversion(
              xlData[i]?.yacht_condition_label
            ),
            yacht_condition_description: await typeConversion(description),

            yacht_condition_location: locationArray,

          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  getyachtcondition: async (req, res) => {
    try {
      const result = await Yacht_Conditions.find().sort({ createdAt: 1 });

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  add_medical_plan_type: async (req, res) => {
    try {
      const plantypeData = req.body;
      console.log(plantypeData, ">>>>>>>>>>>>>>>>> this is plan type data")
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < plantypeData.length; i++) {
        console.log(i, " <<<<<")
        let medicalPlanType = await utils.toUpperCase(plantypeData[i].plan_type);
        const plantype_in_db = await Medical_plan_type.find({
          medical_plan_type: medicalPlanType,
        });
        if (plantype_in_db.length > 0) {
          existArray.push(plantype_in_db);
          count++;
        } else {
          let location_id = plantypeData[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          const medical_plan = new Medical_plan_type({
            medical_plan_type: medicalPlanType,
            medical_plan_type_location: locationArray,
          });
          let result = await medical_plan.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Plan Type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Plan  type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Plan Type Not Added Successfully!",
        });
      }
      //
    } catch (err) {
      res.send(err);
    }
  },

  read_medical_plan_type_excel: async (req, res) => {
    try {
      // console.log(">>>>>>>>>>>>>>>>>>>")
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log(xlData, ">>>>>>>>>>>>>>>>> workbookdata")

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.medical_plan_type_location

        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : locationInexcel;
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log(locationArray, ">>>>><<<<<")
        data = await Medical_plan_type.findOneAndUpdate(
          {
            medical_plan_type: await typeConversion(
              xlData[i]?.medical_plan_type
            ),
          },
          {
            medical_plan_type: await typeConversion(
              xlData[i]?.medical_plan_type
            ),
            medical_plan_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch (err) {
      res.json(err.message);
    }
  },

  get_medical_plan_type: async (req, res) => {

    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["medical_plan_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Medical_plan_type.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "medical_plan_type_location",
              foreignField: "_id",
              as: "medical_plan_type_location",
            },
          },
        ]).skip((page - 1) * limit).limit(limit * 1).exec();
        const count = await Medical_plan_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Medical_plan_type.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_plan_type_location",
              foreignField: "_id",
              as: "medical_plan_type_location",
            },
          },
        ])
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_plan_type_detailsbyid: async (req, res) => {
    try {
      const id = req.body?.ParamValue
      const result = await Medical_plan_type.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "medical_plan_type_location",
            foreignField: "_id",
            as: "plan_type_location",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_plan_type_status: async (req, res) => {
    let newdetails = await Medical_plan_type.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { medical_plan_type_status: req.body.medical_plan_type_status } },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  update_medical_plan_type_details: async (req, res) => {
    const reqdata = req.body
    console.log(reqdata)
    let location_id = reqdata?.medical_plan_type_location;
    let locationArray = location_id.map((item) => { return mongoose.Types.ObjectId(item._id) })

    let newdetails = await Medical_plan_type.findOneAndUpdate(
      { _id: req.body.ParamValue },
      {
        $set: {
          medical_plan_type: req.body.medical_plan_type,
          medical_plan_type_location: locationArray,
        },
      },
      { new: true }
    );
    if (newdetails != null) {
      res.json({
        status: 200,
        message: "Updated Succesfully",
        data: newdetails,
      });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },
  getMedicalPlanTypeList: async (req, res) => {
    try {
      const result = await Medical_plan_type.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_medical_visa_country: async (req, res) => {
    try {
      const emirates_visa = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < emirates_visa.length; i++) {
        let visaCountry = await utils.toUpperCase(emirates_visa[i].visa_country);
        const visa_in_db = await Medical_visa_country.find({
          medical_visa_country: visaCountry,
        });
        if (visa_in_db.length > 0) {
          existArray.push(visa_in_db);
          count++;
        } else {
          let location_id = emirates_visa[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          const medical_visa = new Medical_visa_country({
            medical_visa_country: visaCountry,
            medical_visa_country_location: locationArray,
          });
          let result = await medical_visa.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Emirates Issuing Visa Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Emirates Issuing Visa already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Emirates Issuing Visa Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_medical_visa_country_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log(xlData, ">>>>>>>>>>>>>>>>> workbookdata")

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.medical_visa_country_location

        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : locationInexcel;
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log(locationArray, ">>>>><<<<<")
        data = await Medical_visa_country.findOneAndUpdate(
          {
            medical_visa_country: await typeConversion(
              xlData[i]?.medical_visa_country
            ),
          },
          {
            medical_visa_country: await typeConversion(
              xlData[i]?.medical_visa_country
            ),
            medical_visa_country_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_visa_country: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["medical_visa_country_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Medical_visa_country.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "medical_visa_country_location",
              foreignField: "_id",
              as: "visa_country_location",
            },
          },
        ])
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Medical_visa_country.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Medical_visa_country.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_visa_country_location",
              foreignField: "_id",
              as: "visa_country_location",
            },
          },
        ])
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_visa_country_detailsbyid: async (req, res) => {
    try {
      const id = req.body?.ParamValue
      const result = await Medical_visa_country.aggregate([{
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "locations",
          localField: "medical_visa_country_location",
          foreignField: "_id",
          as: "visa_country_location",
        },
      },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_visa_country_status: async (req, res) => {
    try {
      let newdetails = await Medical_visa_country.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            medical_visa_country_status: req.body.medical_visa_country_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_visa_country_details: async (req, res) => {
    try {
      const locations = req.body?.medical_visa_country_location
      const LocArray = locations.map((val) => mongoose.Types.ObjectId(val))
      let newdetails = await Medical_visa_country.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            medical_visa_country: req.body.medical_visa_country,
            medical_visa_country_location: LocArray,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getMedicalVisaCountry: async (req, res) => {
    try {
      const result = await Medical_visa_country_list.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_medical_plan_condition: async (req, res) => {
    try {
      const plan_condition = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < plan_condition.length; i++) {
        let planCondition = await utils.toUpperCase(plan_condition[i].plan_condition);
        const condition_in_db = await Medical_plan_condition.find({
          medical_plan_condition: planCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          let location_id = plan_condition[i]?.location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          const medical_condition = new Medical_plan_condition({
            medical_plan_condition: planCondition,
            medical_plan_condition_location: locationArray,
          });

          const result = await medical_condition.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Plan Condition Added ${resultArray.length} already exist ${count}`,
        });
      }
      else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Plan Condition type already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Plan Condition Not Added Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_medical_plan_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.medical_plan_condition_location

        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : locationInexcel;
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log(locationArray, ">>>>><<<<<")
        data = await Medical_plan_condition.findOneAndUpdate(
          {
            medical_plan_condition: await typeConversion(
              xlData[i]?.medical_plan_condition
            ),
          },
          {
            medical_plan_condition: await typeConversion(
              xlData[i]?.medical_plan_condition
            ),
            medical_plan_condition_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
      ///////////////////////
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  },

  get_medical_plan_condition: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["medical_plan_condition_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Medical_plan_condition.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_plan_condition_location",
              foreignField: "_id",
              as: "medical_plan_condition_locations",
            },
          },
        ]).skip((page - 1) * limit).limit(limit * 1).exec();
        const count = await Medical_plan_condition.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Medical_plan_condition.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_plan_condition_location",
              foreignField: "_id",
              as: "medical_plan_condition_locations",
            },
          },
        ])
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_plan_condition_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue
      const result = await Medical_plan_condition.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "medical_plan_condition_location",
            foreignField: "_id",
            as: "plan_condition_location",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_plan_condition_status: async (req, res) => {
    try {
      let newdetails = await Medical_plan_condition.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            medical_plan_condition_status:
              req.body.medical_plan_condition_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_plan_condition_details: async (req, res) => {
    try {
      const locations = req.body.medical_plan_condition_location
      const condtion = await utils.toUpperCase(req.body.medical_plan_condition);
      const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
      let newdetails = await Medical_plan_condition.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            medical_plan_condition: condtion,
            medical_plan_condition_location: locArr,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getMedicalPlanCondition: async (req, res) => {
    try {
      const result = await Medical_plan_condition.find({
        medical_plan_condition_status: 1,
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_medical_salary_range: async (req, res) => {
    try {
      const salaryRange = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < salaryRange.length; i++) {
        let salary_range = await utils.toUpperCase(salaryRange[i].salary_range);
        const salary_in_db = await Medical_salary_range.find({
          medical_salary_range: salary_range,
        });
        if (salary_in_db.length > 0) {
          existArray.push(salary_in_db);
          count++;
        } else {
          let location_id = salaryRange[i]?.location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          let visa_country_arr = salaryRange[i]?.medical_visa_country
          let visaArray = [];
          for (let k = 0; k < visa_country_arr.length; k++) {
            visaArray.push(mongoose.Types.ObjectId(visa_country_arr[k]._id))
          }
          const medical_salary = new Medical_salary_range({
            medical_salary_range: salary_range,
            visa_country: visaArray,
            medical_salary_range_location: locationArray,
          });

          const result = await medical_salary.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Salary Range Added ${resultArray.length} already exist ${count}`,
        });
      }
      else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Salary Range type already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Salary Range Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      res.send(err);
    }
  },

  read_medical_salary_range_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.medical_salary_range_location

        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : locationInexcel;
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log(locationArray, ">>>>><<<<<")
        data = await Medical_salary_range.findOneAndUpdate(
          {
            medical_salary_range: await typeConversion(
              xlData[i]?.medical_salary_range
            ),
          },
          {
            medical_salary_range: await typeConversion(
              xlData[i]?.medical_salary_range
            ),
            medical_salary_range_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
      ///////////////////////
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  },

  get_medical_salary_range: async (req, res) => {

    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["medical_salary_range_location"] = {
        $in: userLocation
      }

      if (page && limit) {
        const result = await Medical_salary_range.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "medical_salary_range_location",
              foreignField: "_id",
              as: "salary_range_location",
            },
          },
          {
            $lookup: {
              from: "area_of_registrations",
              localField: "visa_country",
              foreignField: "_id",
              as: "visa_countries"
            }
          }
        ]).skip((page - 1) * limit).limit(limit * 1).exec();
        const count = await Medical_salary_range.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Medical_salary_range.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_salary_range_location",
              foreignField: "_id",
              as: "salary_range_location",
            },
          },
        ])
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_salary_range_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue
      const result = await Medical_salary_range.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "medical_salary_range_location",
            foreignField: "_id",
            as: "salary_range_location",
          },
        },
        {
          $lookup: {
            from: "area_of_registrations",
            localField: "visa_country",
            foreignField: "_id",
            as: "visa_countries"
          }
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_salary_range_status: async (req, res) => {
    try {
      let newdetails = await Medical_salary_range.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            medical_salary_range_status: req.body.medical_salary_range_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_salary_range_details: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      }
      const typeData = await typeConversion(req.body?.medical_salary_range)
      const locations = req.body?.medical_salary_range_location
      const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
      const visa_country_arr = req.body?.medical_visa_country
      const visaArray = visa_country_arr?.map((val) => mongoose.Types.ObjectId(val._id))
      let newdetails = await Medical_salary_range.findOneAndUpdate(
        { _id: req.body?.ParamValue },
        {
          $set: {
            medical_salary_range: typeData,
            visa_country: visaArray,
            medical_salary_range_location: locArr,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getMedicalSalaryRange: async (req, res) => {
    try {
      const result = await Medical_salary_range.find({
        medical_salary_range_status: 1,
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  add_medical_weight_type: async (req, res) => {
    try {
      const medWeight = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < medWeight.length; i++) {
        let medicalWeight = await utils.toUpperCase(medWeight[i].medical_weight);
        const weight_in_db = await Medical_weight_type.find({
          medical_weight_type: medicalWeight,
        });
        if (weight_in_db.length > 0) {
          existArray.push(weight_in_db);
          count++;
        } else {
          let location_id = medWeight[i]?.location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
          }
          const medical_weight = new Medical_weight_type({
            medical_weight_type: medicalWeight,
            medical_weight_type_location: locationArray,
          });

          const result = await medical_weight.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Medical Weight Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Medical Weight already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Medical Weight Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      res.send(err);
    }
  },

  read_medical_weight_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.medical_weight_type_location

        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : locationInexcel;
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        console.log(locationArray, ">>>>><<<<<")
        data = await Medical_weight_type.findOneAndUpdate(
          {
            medical_weight_type: await typeConversion(
              xlData[i]?.medical_weight_type
            ),
          },
          {
            medical_weight_type: await typeConversion(
              xlData[i]?.medical_salary_range
            ),
            medical_weight_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
      ///////////////////////
    } catch (err) {
      console.log(err.message);
      res.send(err);
    }
  },

  get_medical_weight_type: async (req, res) => {

    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["medical_weight_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Medical_weight_type.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "medical_weight_type_location",
              foreignField: "_id",
              as: "weight_type_location",
            },
          },
        ]).skip((page - 1) * limit).limit(limit * 1).exec();
        const count = await Medical_weight_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Medical_weight_type.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "medical_weight_type_location",
              foreignField: "_id",
              as: "weight_type_location",
            },
          },
        ])
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_medical_weight_type_list: async (req, res) => {
    try {
      const result = await Medical_weight_type.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_medical_weight_type_detailsbyid: async (req, res) => {
    try {
      const id = req.body?.ParamValue
      const result = await Medical_weight_type.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "medical_weight_type_location",
            foreignField: "_id",
            as: "weight_type_location",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_weight_type_status: async (req, res) => {
    try {
      let newdetails = await Medical_weight_type.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            medical_weight_type_status: req.body.medical_weight_type_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_medical_weight_type_details: async (req, res) => {
    try {
      const locations = req.body?.medical_weight_type_location
      const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
      let newdetails = await Medical_weight_type.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            medical_weight_type: req.body.medical_weight_type,
            medical_weight_type_location: locArr,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_Yacht_Body_type: async (req, res) => {
    try {
      const yachtdata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(yachtdata[i].yacht_body_type);
        const yacht_insurances_in_db = await Yacht_Body_type.find({
          yacht_body_type: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_insurance = new Yacht_Body_type({
            yacht_body_type: yachtName,
            yacht_body_type_location: locationArray,
          });

          console.log("yacht_insurance", yacht_insurance)

          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Yacht Body type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Yacht Body type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Yacht Body type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_Yacht_Body_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_body_type_location;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        yachtdetails = await Yacht_Body_type.findOneAndUpdate(
          {
            yacht_body_type: await typeConversion(
              xlData[i]?.yacht_body_type
            ),
          },
          {
            yacht_body_type: await typeConversion(
              xlData[i]?.yacht_body_type
            ),
            yacht_body_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_Yacht_Body_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { yacht_body_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["yacht_body_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_Body_type.aggregate(
          [{
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_body_type_location",
              foreignField: "_id",
              as: "yacht_body_type_location",
            },
          },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Yacht_Body_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_Body_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_body_type_location",
                foreignField: "_id",
                as: "yacht_body_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Yacht_Body_type_detailsbyid: async (req, res) => {
    try {
      const result = await Yacht_Body_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_body_type_location",
              foreignField: "_id",
              as: "yacht_body_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_Body_type_status: async (req, res) => {
    try {
      let newdetails = await Yacht_Body_type.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { yacht_body_type_status: req.body.yacht_body_type_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_Body_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const yachtbodytype = await utils.toUpperCase(req.body.yacht_body_type);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.yacht_body_type) {
        payload["yacht_body_type"] = yachtbodytype;
      }
      if (req.body.location) {
        payload["yacht_body_type_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_Body_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Body Type For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Body Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getyachtbodytype: async (req, res) => {
    try {
      const result = await Yacht_Body_type.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  add_Yacht_hull_material: async (req, res) => {
    try {
      const yachtdata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(yachtdata[i].yacht_hull_material);
        const yacht_insurances_in_db = await Yacht_hull_material.find({
          yacht_hull_material: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_insurance = new Yacht_hull_material({
            yacht_hull_material: yachtName,
            yacht_hull_material_location: locationArray,
          });

          console.log("yacht_insurance", yacht_insurance)

          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Property type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Property type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Home Property type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },
  gethullMaterial: async (req, res) => {
    try {
      const result = await Yacht_hull_material.find({ yacht_hull_material_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_Yacht_hull_material_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_hull_material_location;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        yachtdetails = await Yacht_hull_material.findOneAndUpdate(
          {
            yacht_hull_material: await typeConversion(
              xlData[i]?.yacht_hull_material
            ),
          },
          {
            yacht_hull_material: await typeConversion(
              xlData[i]?.yacht_hull_material
            ),
            yacht_hull_material_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_Yacht_hull_material: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { yacht_hull_material: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["yacht_hull_material_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_hull_material.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "yacht_hull_material_location",
                foreignField: "_id",
                as: "yacht_hull_material_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Yacht_hull_material.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_hull_material.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_hull_material_location",
                foreignField: "_id",
                as: "yacht_hull_material_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Yacht_hull_material_detailsbyid: async (req, res) => {
    try {
      const result = await Yacht_hull_material.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_hull_material_location",
              foreignField: "_id",
              as: "yacht_hull_material_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_hull_material_status: async (req, res) => {
    try {
      let newdetails = await Yacht_hull_material.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            yacht_hull_material_status: req.body.yacht_hull_material_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_hull_material_details: async (req, res) => {
    try {
      console.log("req.body", req.body)

      const id = req.body.ParamValue;
      const yachthullmaterial = await utils.toUpperCase(req.body.yacht_hull_material);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.yacht_hull_material) {
        payload["yacht_hull_material"] = yachthullmaterial;
      }
      if (req.body.location) {
        payload["yacht_hull_material_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_hull_material.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Hull Material For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Hull Material Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_Yacht_horespower_type: async (req, res) => {
    try {
      const yachtdata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(yachtdata[i].yacht_horsepower_type);
        const yacht_insurances_in_db = await Yacht_horsepower_type.find({
          yacht_horsepower_type: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_insurance = new Yacht_horsepower_type({
            yacht_horsepower_type: yachtName,
            yacht_horsepower_type_location: locationArray,
          });

          console.log("yacht_insurance", yacht_insurance)

          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Home Ownership Added ${resultArray.length} already exist ${count}`,
        });
      }
      else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Home Ownership already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Home Ownership Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_Yacht_horespower_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_horsepower_type_location;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        yachtdetails = await Yacht_horsepower_type.findOneAndUpdate(
          {
            yacht_horsepower_type: await typeConversion(
              xlData[i]?.yacht_horsepower_type
            ),
          },
          {
            yacht_horsepower_type: await typeConversion(
              xlData[i]?.yacht_horsepower_type
            ),
            yacht_horsepower_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_Yacht_horespower_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { yacht_body_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["yacht_horsepower_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_horsepower_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "yacht_horsepower_type_location",
                foreignField: "_id",
                as: "yacht_horsepower_type_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Yacht_horsepower_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_horsepower_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_horsepower_type_location",
                foreignField: "_id",
                as: "yacht_horsepower_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  getYachtHorsePowerTypeList: async (req, res) => {
    try {
      const result = await Yacht_horsepower_type.find();

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_Yacht_horespower_type_detailsbyid: async (req, res) => {
    try {
      const result = await Yacht_horsepower_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_horsepower_type_location",
              foreignField: "_id",
              as: "yacht_horsepower_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_horespower_type_status: async (req, res) => {
    try {
      let newdetails = await Yacht_horsepower_type.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            yacht_horsepower_type_status: req.body.yacht_horsepower_type_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_horespower_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const yachthorsepower = await utils.toUpperCase(req.body.yacht_horsepower_type);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.yacht_horsepower_type) {
        payload["yacht_horsepower_type"] = yachthorsepower;
      }
      if (req.body.location) {
        payload["yacht_horsepower_type_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_horsepower_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Horse Power For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Horse Power Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_Yacht_engine_type: async (req, res) => {
    try {
      const yachtdata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(yachtdata[i].yacht_engine_type);
        const yacht_insurances_in_db = await Yacht_Engine_type.find({
          yacht_engine_type: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_insurance = new Yacht_Engine_type({
            yacht_engine_type: yachtName,
            yacht_engine_type_location: locationArray,
          });

          console.log("yacht_insurance", yacht_insurance)

          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Yacht Engine type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Yacht Engine type already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Yacht Engine type Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  read_Yacht_engine_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_engine_type_location;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        yachtdetails = await Yacht_Engine_type.findOneAndUpdate(
          {
            yacht_engine_type: await typeConversion(
              xlData[i]?.yacht_engine_type
            ),
          },
          {
            yacht_engine_type: await typeConversion(
              xlData[i]?.yacht_engine_type
            ),
            yacht_engine_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_Yacht_engine_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { yacht_engine_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))

      let match = {}
      match["yacht_engine_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_Engine_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "yacht_engine_type_location",
                foreignField: "_id",
                as: "yacht_engine_type_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Yacht_Engine_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_Engine_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_engine_type_location",
                foreignField: "_id",
                as: "yacht_engine_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Yacht_engine_type_detailsbyid: async (req, res) => {

    try {
      const result = await Yacht_Engine_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_engine_type_location",
              foreignField: "_id",
              as: "yacht_engine_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_engine_type_status: async (req, res) => {
    try {
      let newdetails = await Yacht_Engine_type.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: { yacht_engine_type_status: req.body.yacht_engine_type_status },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getYachtEngineTypeList: async (req, res) => {
    try {
      const result = await Yacht_engine_type_list.find({ yacht_engine_type_status: 1 });

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_Yacht_engine_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const yachtbodytype = await utils.toUpperCase(req.body.yacht_engine_type);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.yacht_engine_type) {
        payload["yacht_engine_type"] = yachtbodytype;
      }
      if (req.body.location) {
        payload["yacht_engine_type_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_Engine_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Engine Type For Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Engine Type Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_Yacht_speed_knot_type: async (req, res) => {
    try {
      const yachtdata = req.body;

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < yachtdata.length; i++) {
        let yachtName = await utils.toUpperCase(yachtdata[i].yacht_speed_knot_type);
        const yacht_insurances_in_db = await Yacht_Speed_knots_type.find({
          yacht_speed_knot_type: yachtName,
        });

        if (yacht_insurances_in_db.length > 0) {
          existArray.push(yacht_insurances_in_db);
          count++;

        } else {
          let location_id = yachtdata[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_insurance = new Yacht_Speed_knots_type({
            yacht_speed_knot_type: yachtName,
            yacht_speed_knot_type_location: locationArray,
          });

          console.log("yacht_insurance", yacht_insurance)

          let result = await yacht_insurance.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Yacht Speed knots Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Yacht Speed Knot already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Yacht Speed knots Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something went wrong" });
    }
  },

  getSpeedKnotTypeList: async (req, res) => {
    try {
      const result = await Yacht_speed_knots_list.find();

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_Yacht_speed_knot_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData)

      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {

        let yachtdetails
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_speed_knot_type_location;
        // console.log("..........................................",{locationInexcel},xlData[i])

        locationInexcel = locationInexcel.split(",");
        console.log("locationInexcel", locationInexcel)
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        yachtdetails = await Yacht_Speed_knots_type.findOneAndUpdate(
          {
            yacht_speed_knot_type: await typeConversion(
              xlData[i]?.yacht_speed_knot_type
            ),
          },
          {
            yacht_speed_knot_type: await typeConversion(
              xlData[i]?.yacht_speed_knot_type
            ),
            yacht_speed_knot_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  get_Yacht_speed_knot_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { yacht_body_type: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["yacht_speed_knot_type_location"] = {
        $in: userLocation
      }
      if (page && limit) {
        const result = await Yacht_Speed_knots_type.aggregate(
          [
            {
              $match: match
            },
            {
              $lookup: {
                from: "locations",
                localField: "yacht_speed_knot_type_location",
                foreignField: "_id",
                as: "yacht_speed_knot_type_location",
              },
            },
          ]
        )
          .sort(mysort)
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Yacht_Speed_knots_type.countDocuments();
        if (result != null) {
          res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      } else {
        const result = await Yacht_Speed_knots_type.aggregate(
          [
            {
              $lookup: {
                from: "locations",
                localField: "yacht_speed_knot_type_location",
                foreignField: "_id",
                as: "yacht_speed_knot_type_location",
              },
            },
          ]
        ).sort(mysort);
        if (result != null) {
          res.json({ status: 200, message: "Data Found", data: result });
        } else {
          res.json({ status: 400, message: "Data Not Found" });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Yacht_speed_knot_type_detailsbyid: async (req, res) => {
    try {
      const result = await Yacht_Speed_knots_type.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.body.ParamValue),
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "yacht_speed_knot_type_location",
              foreignField: "_id",
              as: "yacht_speed_knot_type_location",
            },
          },
        ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_speed_knot_type_status: async (req, res) => {
    try {
      let newdetails = await Yacht_Speed_knots_type.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            yacht_speed_knot_type_status: req.body.yacht_speed_knot_type_status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Yacht_speed_knot_type_details: async (req, res) => {
    try {

      const id = req.body.ParamValue;
      const yachtbodytype = await utils.toUpperCase(req.body.yacht_speed_knot_type);
      const yachtlocation = req.body.location?.map((val) =>
        mongoose.Types.ObjectId(val)
      );

      let payload = {};
      if (req.body.yacht_speed_knot_type) {
        payload["yacht_speed_knot_type"] = yachtbodytype;
      }
      if (req.body.location) {
        payload["yacht_speed_knot_type_location"] = yachtlocation;
      }
      console.log("payload", payload)

      let newdetails = await Yacht_Speed_knots_type.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Yacht Speed Knots Updated Successfully!",
          data: newdetails,
        });
      } else {
        res.json({
          status: 400,
          message: "Yacht Speed Knots Not Updated Successfully!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_body_type: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let name = query.name
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let status = +query.status
      const mysort = { body_type_name: 1 };
      if (limit && page) {
        let match = {}
        if (name) {
          match = {
            body_type_name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["body_type_location"] = {
          $in: userLocation
        }
        if (status == 0 || status == 1) {
          match["body_type_status"] = status;
        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "body_type_location",
              foreignField: "_id",
              as: "body_type_location",
            },
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          },
          {
            $sort: mysort
          }
        ]
        aggregate.push({
          $facet: facet
        })
        let bodyTypeData = await body_type_model.aggregate(aggregate);

        if (!bodyTypeData[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: bodyTypeData[0]?.data, total: bodyTypeData[0]?.totalCount[0]?.total });
      } else {
        const body_type = await body_type_model
          .aggregate([
            {
              $lookup: {
                from: "locations",
                localField: "body_type_location",
                foreignField: "_id",
                as: "body_type_location",
              },
            },
          ])
          .sort(mysort);
        res.json({ status: 200, message: "Data Found", data: body_type });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },
  get_all_body_type: async (req, res) => {
    try {
      const mysort = { body_type_name: 1 };
      const body_type = await body_type_model.aggregate([
        {
          $lookup: {
            from: "locations",
            localField: "body_type_location",
            foreignField: "_id",
            as: "body_type_location",
          },
        },
      ])
        .sort(mysort);
      res.json({ status: 200, message: "Data Found", data: body_type });
    }
    catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },
  update_body_type_status: async (req, res) => {
    let id = req.params.id;
    const body_type_status = req.body.body_type_status;
    const body_type = await body_type_model.findByIdAndUpdate(id, {
      body_type_status: body_type_status,
    });
    if (body_type != null) {
      if (body_type_status == 0) {
        res.json({
          status: 200,
          message: "Body Type Deactivated Successfully",
        });
      } else {
        res.json({ status: 200, message: "Body Type Activated Successfully" });
      }
    } else {
      res.json({
        status: 400,
        message: "Body Type Not Deactivated Successfully",
      });
    }
  },

  // add_body_type: async (req, res) => {
  //     try {
  //         let payload = req.body
  //         const bodyTypeName = payload?.body_type_name;
  //         let body_type
  //         body_type = await body_type_model.findOne({
  //             body_type_name: { $regex: new RegExp(`^${payload?.body_type_name}$`, 'i') }
  //         });
  //         if (body_type) {
  //             return res.status(404).json({ status: 404, message: `Body Type ${bodyTypeName} Already Exists`, data: {} })
  //         }
  //         body_type = new body_type_model(payload);
  //         let result = await body_type.save();
  //         if (result != null) {
  //             res.json({ status: 200, message: "Body Type Added Successfully!", data: result });
  //         }
  //         else {
  //             res.json({ status: 400, message: "Body Type Not Added Successfully!" });
  //         }
  //     } catch (error) {
  //         res.json({ status: 500, message: error.message });
  //     }
  // },

  add_body_type: async (req, res) => {
    try {
      const bodytypeData = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < bodytypeData.length; i++) {
        const BodytypeName = await utils.toUpperCase(bodytypeData[i].body_type_name);
        const body_type_in_db = await body_type_model.find({
          body_type_name: BodytypeName,
        });
        if (body_type_in_db.length > 0) {
          existArray.push(body_type_in_db);
          count++;
        } else {
          let location_id = bodytypeData[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }
          let body_type = new body_type_model({
            body_type_name: BodytypeName,
            body_type_location: locationArray,
          });
          let result = await body_type.save();
          if (result != null) {
            resultArray.push(result);
          }

        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Body Type  Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Body type  already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Body Type  Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something Went Wrong!" });
    }
  },
  read_body_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let bodyTypeId;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.body_type_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        bodyTypeId = await bodyTypeModels.findOneAndUpdate(
          {
            body_type_name: await typeConversion(
              xlData[i]?.body_type_name
            ),
          },
          {
            body_type_name: await typeConversion(
              xlData[i]?.body_type_name
            ),
            body_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      res.status(500).json("Something Went Wrong");
    }
  },

  get_body_type_details: async (req, res) => {
    try {
      const id = req.params.id;
      const body_type_data = await body_type_model.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "body_type_location",
            foreignField: "_id",
            as: "body_type_location",
          },
        },
      ]);
      res.json({ status: 200, message: "Data Found", data: body_type_data });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_body_type: async (req, res) => {
    try {
      const id = req.body.body_type_id;
      const body_type_name = await utils.toUpperCase(req.body.body_type_name);
      const body_type_location = req.body.body_type_location;
      const body_type_status = req.body.body_type_status;

      // console.log(body_type_location)
      // return false;

      const body_type = await body_type_model.findByIdAndUpdate(id, {
        body_type_name: body_type_name,
        body_type_location: body_type_location.map((item) =>
          mongoose.Types.ObjectId(item)
        ),
      });
      if (body_type != null) {
        res.json({ status: 200, message: "Body Type Updated Successfully!" });
      } else {
        res.json({
          status: 400,
          message: "Body Type Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  get_plan_category: async (req, res) => {
    try {
      const page = +req.params.page;
      const limit = +req.params.limit;
      const mysort = { plan_category_timestamp: -1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId(obj?.loc_id))
      const plan_category = await plan_category_model.aggregate([
        {
          $match: {
            plan_category_location: {
              $in: userLocation
            }
          }
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'plan_category_location',
            'foreignField': '_id',
            'as': 'plan_category_location'
          }
        },
        {
          $project: {
            plan_category_name: 1,
            plan_category_status: 1,
            "plan_category_location.location_name": 1
          }
        },
        {
          '$skip': (page - 1) * limit
        }, {
          '$limit': limit
        }
      ])
      const count = await plan_category_model.countDocuments();
      res.json({
        status: 200,
        message: "Data Found",
        data: plan_category,
        total: count,
      });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_plan_category_status: async (req, res) => {
    try {
      let id = req.params.id;
      const plan_category_status = req.body.plan_category_status;
      const plan_category = await plan_category_model.findByIdAndUpdate(id, {
        plan_category_status: plan_category_status,
      });
      if (plan_category != null) {
        if (plan_category_status == 0) {
          res.json({
            status: 200,
            message: "Plan Category Deactivated Successfully",
          });
        } else {
          res.json({
            status: 200,
            message: "Plan Category Activated Successfully",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Plan Category Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_plan_category: async (req, res) => {
    try {
      const planCatloc = req.body.plan_category_location
      let planCatID = planCatloc.map((val) => mongoose.Types.ObjectId(val))
      let plan_category = new plan_category_model({
        plan_category_name: req.body.plan_category_name,
        plan_category_location: planCatID,
      });
      let result = await plan_category.save();
      if (result != null) {
        res.json({
          status: 200,
          message: "Plan Category Added Successfully!",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          message: "Plan Category Not Added Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  read_plan_category_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        let count = 0;
        for (let i = 0; i < cnt; i++) {
          let location_id = [];
          if (excelData["Sheet1"][i]["plan_category_location"].includes(",")) {
            let locations =
              excelData["Sheet1"][i]["plan_category_location"].split(",");
            for (let j = 0; j < locations.length; j++) {
              let id = await Locations.findOne({ location_name: locations[j] });
              location_id.push(id?._id?.toString());
            }
            location_id = location_id.join(",");
          } else {
            let id = await Locations.findOne({
              location_name: excelData["Sheet1"][i]["plan_category_location"],
            });
            location_id.push(id?._id?.toString());
            location_id.join("");
          }
          const Locations_Ids = location_id;
          const plan_category = new plan_category_model({
            plan_category_name: excelData["Sheet1"][i]["plan_category_name"],
            plan_category_location: Locations_Ids,
            plan_category_status:
              excelData["Sheet1"][i]["plan_category_status"],
          });
          await plan_category.save();
          count++;
        }
        if (count === cnt) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  get_plan_category_details: async (req, res) => {
    try {
      const id = req.params.id;

      const plan_category_data = await plan_category_model.aggregate(
        [
          {
            $match: { _id: mongoose.Types.ObjectId(id) },
          },

          //   {
          //     $addFields: {
          //       plan_category_location_array: { $split: ["$plan_category_location", ","] }
          //     }
          //   },
          //   {
          //     $addFields: {
          //       plan_category_location_ids: { $map: { input: "$plan_category_location_array", as: "locationId", in: { $toObjectId: "$$locationId" } }
          //     }
          //   }
          // },
          {
            $lookup: {
              from: "locations",
              localField: "plan_category_location",
              foreignField: "_id",
              as: "plan_category_location"
            }
          }
        ]
      );
      res.json({
        status: 200,
        message: "Data Found",
        data: plan_category_data,
      });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_plan_category: async (req, res) => {
    try {
      const id = req.body.plan_category_id;
      const plan_category_name = req.body.plan_category_name;
      const plan_category_location = req.body.plan_category_location;
      let planCatID = plan_category_location.map((val) => mongoose.Types.ObjectId(val))
      const plan_category_status = req.body.plan_category_status;
      const plan_category = await plan_category_model.findByIdAndUpdate(id, {
        plan_category_name: plan_category_name,
        plan_category_location: planCatID,
        plan_category_status: plan_category_status,
      });
      if (plan_category != null) {
        res.json({
          status: 200,
          message: "Plan Category Updated Successfully!",
        });
      } else {
        res.json({
          status: 400,
          message: "Plan Category Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  get_nature_of_plan: async (req, res) => {
    try {
      const page = +req.params.page;
      const limit = +req.params.limit;
      const mysort = { nature_of_plan_timestamp: -1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId(obj?.loc_id))
      const nature_of_plan = await nature_of_plan_model.aggregate([
        // {$match:{
        //   nature_of_plan_location:{
        //     $in:userLocation
        //   }
        // }},
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'nature_of_plan_location',
            'foreignField': '_id',
            'as': 'nature_of_plan_location'
          }
        },
        {
          $project: {
            nature_of_plan_name: 1,
            nature_of_plan_status: 1,
            "nature_of_plan_location.location_name": 1
          }
        },
        {
          '$skip': (page - 1) * limit
        }, {
          '$limit': limit
        }
      ])
      const count = await nature_of_plan_model.countDocuments();
      res.json({
        status: 200,
        message: "Data Found",
        data: nature_of_plan,
        total: count,
      });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_nature_of_plan_status: async (req, res) => {
    try {
      const id = req.params.id;
      const nature_of_plan_status = req.body.nature_of_plan_status;
      const nature_of_plan = await nature_of_plan_model.findByIdAndUpdate(id, {
        nature_of_plan_status: nature_of_plan_status,
      });
      if (nature_of_plan != null) {
        if (nature_of_plan_status == 0) {
          res.json({
            status: 200,
            message: "Nature Of Plan Deactivated Successfully",
          });
        } else {
          res.json({
            status: 200,
            message: "Nature Of Plan Activated Successfully",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Nature Of Plan Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_nature_of_plan: async (req, res) => {
    try {
      const noploc = req.body.nature_of_plan_location
      let nopID = noploc.map((val) => mongoose.Types.ObjectId(val))
      let nature_of_plan = new nature_of_plan_model({
        nature_of_plan_name: req.body.nature_of_plan_name,
        nature_of_plan_location: nopID,
      });
      let result = await nature_of_plan.save();
      if (result != null) {
        res.json({
          status: 200,
          message: "Nature Of Plan Added Successfully!",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          message: "Nature Of Plan Not Added Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  read_nature_of_plan_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        let count = 0;
        for (let i = 0; i < cnt; i++) {
          let location_id = [];
          if (excelData["Sheet1"][i]["nature_of_plan_location"].includes(",")) {
            let locations =
              excelData["Sheet1"][i]["nature_of_plan_location"].split(",");
            for (let j = 0; j < locations.length; j++) {
              let id = await Locations.findOne({ location_name: locations[j] });
              location_id.push(id?._id?.toString());
            }
            location_id = location_id.join(",");
          } else {
            let id = await Locations.findOne({
              location_name: excelData["Sheet1"][i]["nature_of_plan_location"],
            });
            location_id.push(id?._id?.toString());
            location_id.join("");
          }
          const Locations_Ids = location_id;
          const nature_of_plan = new nature_of_plan_model({
            nature_of_plan_name: excelData["Sheet1"][i]["nature_of_plan_name"],
            nature_of_plan_location: Locations_Ids,
            nature_of_plan_status:
              excelData["Sheet1"][i]["nature_of_plan_status"],
          });
          await nature_of_plan.save();
          count++;
        }
        if (count === cnt) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false });
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  get_nature_of_plan_details: async (req, res) => {
    try {
      const id = req.params.id;
      const nature_of_plan_data = await nature_of_plan_model.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "nature_of_plan_location",
            foreignField: "_id",
            as: "nature_of_plan_location",
          },
        },
      ]);
      res.json({
        status: 200,
        message: "Data Found",
        data: nature_of_plan_data,
      });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_nature_of_plan: async (req, res) => {
    try {
      const id = req.body.nature_of_plan_id;
      const nature_of_plan_name = req.body.nature_of_plan_name;
      const nature_of_plan_location = req.body.nature_of_plan_location;
      let natureOfPlanID = nature_of_plan_location.map((val) => mongoose.Types.ObjectId(val))
      const nature_of_plan = await nature_of_plan_model.findByIdAndUpdate(id, {
        nature_of_plan_name: nature_of_plan_name,
        nature_of_plan_location: natureOfPlanID,
      });
      if (nature_of_plan != null) {
        res.json({
          status: 200,
          message: "Nature Of Plan Updated Successfully!",
        });
      } else {
        res.json({
          status: 400,
          message: "Nature Of Plan Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_nationality_list: async (req, res) => {
    try {
      let payload = req.body
      let location = payload.nationality_location.map((val) => mongoose.Types.ObjectId(val))
      let result = await Nationality.findOneAndUpdate(
        {
          nationality_name: payload.nationality_name?.toUpperCase()
        },
        {
          nationality_name: payload?.nationality_name?.toUpperCase(),
          nationality_location: location,
        },
        { upsert: true, returnOriginal: false }
      );
      if (result != null) {
        return res.json({ status: 200, message: "Added Successfully!", data: result });
      }
      return res.json({ status: 400, message: "Failed" });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  read_nationality_list_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let locationArray = [];
        let locationInexcel = await typeConversion(
          xlData[i]?.location
        );
        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        let result = await Nationality.findOneAndUpdate(
          {
            nationality_name: await typeConversion(xlData[i]?.nationality_name)

          },
          {
            nationality_name: await typeConversion(xlData[i]?.nationality_name),
            nationality_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  get_nationality_list: async (req, res) => {
    try {
      let query = req.query;

      let page = query.page;
      let limit = query.limit
      let name = query.name
      let status = +query.status
      let userData = req.user
      let userLocation = userData?.location
      console.log(query, ">>>>>>>>>>")
      // console.log("page: ",page,"limit: ",limit)
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let mysort = { nationality_name: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            nationality_name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["nationality_location"] = {
          $in: userLocation
        }
        if (status == 0 || status == 1) {
          match["nationality_status"] = +status;
        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "nationality_location",
              foreignField: "_id",
              as: "nationality_location",
            },
          },
          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          },
          {
            $sort: mysort
          },
          {
            '$project': {
              'nationality_name': 1,
              "nationality_location.location_name": 1,
              "nationality_status": 1
            }
          }

        ]
        aggregate.push({
          $facet: facet
        })
        let nationalityData = await Nationality.aggregate(aggregate);
        console.log("::::::::::::", nationalityData)
        if (!nationalityData[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: nationalityData[0]?.data, total: nationalityData[0]?.totalCount[0]?.total });


      }
      let nationalityData = await Nationality.aggregate([{
        $lookup: {
          from: "locations",
          localField: "nationality_location",
          foreignField: "_id",
          as: "nationality_location",
        },
      },
      {
        $sort: mysort
      },
      {
        '$project': {
          'nationality_name': 1,
          "nationality_location.location_name": 1
        }
      }
      ]);
      if (nationalityData?.length) {
        return res.status(200).json({ status: 200, message: "Data Not Found", data: nationalityData });
      }
      return res.status(404).json({ status: 404, message: "Data Not Found", data: [] });



    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  get_nationality_list_id: async (req, res) => {
    try {
      const result = await Nationality.findById({ _id: req.body.ParamValue });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_nationality_list_status: async (req, res) => {
    try {
      let newdetails = await Nationality.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { nationality_status: req.body.nationality_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_nationality_list_details: async (req, res) => {
    try {
      let payload = req.body
      let location = payload.nationality_location
      let locationArray = []
      location = payload.nationality_location.split(",")
      for (let i = 0; i < location.length; i++) {
        locationArray.push(mongoose.Types.ObjectId(location[i]))
      }
      let newdetails = await Nationality.findOneAndUpdate(
        { _id: payload?.ParamValue },
        {
          $set: {
            nationality_name: payload?.nationality_name?.toUpperCase(),
            nationality_location: locationArray,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  // add_area_of_registeration: async (req, res) => {
  //     try {
  //         const areaName = req.body.area_of_registration_name;
  //         const find_result = await area_of_registration_model.find({ area_of_registration_name: { $regex: new RegExp(`^${areaName}$`, 'i') } });
  //         if (find_result.length > 0) {
  //              res.status(404).json({ status: 404, message: `Area Of Registration ${areaName} Already Exists`, data: {} })
  //         }else{
  //         let area_of_registration = new area_of_registration_model({
  //             area_of_registration_name: req.body.area_of_registration_name,
  //             area_of_registration_location: req.body.area_of_registration_location,
  //         });
  //         let result = await area_of_registration.save();
  //         if (result != null) {
  //             res.json({ status: 200, message: "Area Of Registration Added Successfully!", data: result });
  //         }
  //         else {
  //             res.json({ status: 400, message: "Area Of Registration Not Added Successfully!" });
  //         }
  //     }
  //     } catch (error) {
  //         res.json({status:500,message:error.message})
  //     }
  // },

  add_area_of_registeration: async (req, res) => {
    try {
      const aorData = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < aorData.length; i++) {
        const aorName = aorData[i].area_of_registration_name.toUpperCase();
        const aor_in_db = await area_of_registration_model.find({
          area_of_registration_name: aorName,
        });
        if (aor_in_db.length > 0) {
          existArray.push(aor_in_db);
          count++;
        } else {
          let location_id = aorData[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }
          let aor = new area_of_registration_model({
            area_of_registration_name: aorName,
            area_of_registration_location: locationArray,
          });
          let result = await aor.save();
          if (result != null) {
            resultArray.push(result);
          } else {
            res.json({
              status: 400,
              message: "Area of Registration Not Added Successfully!",
            });
          }
        }
      }
      if (resultArray.length > 0) {
        res.json({
          status: 200,
          message: `Area of Registration Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Area of Registration already exist`,
        });
      } else {
        res.json({
          status: 400,
          message: "Area of Registration Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something Went Wrong!" });
    }
  },
  read_area_of_registeration_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.area_of_registration_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        data = await area_of_registration_model.findOneAndUpdate(
          {
            area_of_registration_name: await typeConversion(
              xlData[i]?.area_of_registration_name
            ),
          },
          {
            area_of_registration_name: await typeConversion(
              xlData[i]?.area_of_registration_name
            ),
            area_of_registration_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Something Went Wrong!");
    }
  },

  get_area_of_registration: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { area_of_registration_name: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      if (
        page != null ||
        page != undefined ||
        limit != null ||
        limit != undefined
      ) {
        const result = await area_of_registration_model
          .aggregate([
            {
              $match: {
                area_of_registration_location: {
                  $in: userLocation
                }
              }
            },
            {
              $lookup: {
                from: "locations",
                localField: "area_of_registration_location",
                foreignField: "_id",
                as: "area_of_registration_location",
              },
            },
          ])
          .sort(mysort)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const count = await area_of_registration_model.countDocuments();
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        const result = await area_of_registration_model.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "area_of_registration_location",
              foreignField: "_id",
              as: "area_of_registration_location",
            },
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: result });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_area_of_registration_details: async (req, res) => {
    const id = req.params.id;
    const area_of_registration_data = await area_of_registration_model.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: "locations",
          localField: "area_of_registration_location",
          foreignField: "_id",
          as: "area_of_registration_location",
        },
      },
    ]);
    res.json({
      status: 200,
      message: "Data Found",
      data: area_of_registration_data,
    });
  },

  update_area_of_registration_status: async (req, res) => {
    try {
      const id = req.params.id;
      const area_of_registration_status = req.body.area_of_registration_status;
      const area_of_registration =
        await area_of_registration_model.findByIdAndUpdate(id, {
          area_of_registration_status: area_of_registration_status,
        });
      if (area_of_registration != null) {
        if (area_of_registration_status == 0) {
          res.json({
            status: 200,
            message: "Nature Of Plan Deactivated Successfully",
          });
        } else {
          res.json({
            status: 200,
            message: "Nature Of Plan Activated Successfully",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Nature Of Plan Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_area_of_registration: async (req, res) => {
    try {
      const id = req.body.area_of_registration_id;
      const area_of_registration_name = req.body.area_of_registration_name?.toUpperCase();
      const area_of_registration_location = req.body.area_of_registration_location.map((val) => mongoose.Types.ObjectId(val));
      payload = {}
      if (area_of_registration_name) {
        payload["area_of_registration_name"] = area_of_registration_name
      }
      if (area_of_registration_location.length > 0) {
        payload["area_of_registration_location"] = area_of_registration_location
      }

      const area_of_registration =
        await area_of_registration_model.findByIdAndUpdate(id, {
          area_of_registration_name: area_of_registration_name,
          area_of_registration_location: area_of_registration_location,
        });
      if (area_of_registration != null) {
        res.json({
          status: 200,
          message: "Area Of Registration Updated Successfully!",
        });
      } else {
        res.json({
          status: 400,
          message: "Area Of Registration Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_usertype: async (req, res) => {
    const usertype = new UserType({
      usertype: req.body.usertype,
    });
    try {
      const result = await usertype.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_usertype_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        for (let i = 0; i < cnt; i++) {
          const usertype = new UserType({
            usertype: excelData["Sheet1"][i]["usertype"],
            usertype_status: excelData["Sheet1"][i]["usertype_status"],
          });
          await usertype.save();
          if (result != null) {
            res.json({
              status: 200,
              message: "Added Successfully!",
              data: result,
            });
          } else {
            res.json({ status: 400, message: "Failed" });
          }
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_usertype: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const mysort = { usertype_timestamp: -1 };
    try {
      const result = await UserType.find()
        .sort(mysort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await UserType.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_user_type_detailsbyid: async (req, res) => {
    try {
      const result = await UserType.findById({ _id: req.body.ParamValue });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_usertype_status: async (req, res) => {
    try {
      let newdetails = await UserType.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { usertype_status: req.body.usertype_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_usertype_details: async (req, res) => {
    try {
      let newdetails = await UserType.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            usertype: req.body.usertype,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  // add_repair_type: async (req, res) => {
  //     try {
  //         const repairTypeName = req.body.repair_type_name;
  //         const find_result = await RepairType.find({ repair_type_name: { $regex: new RegExp(`^${repairTypeName}$`, 'i') } });
  //         if (find_result.length > 0) {
  //                 res.status(404).json({ status: 404, message: `Repair Type ${repairTypeName} Already Exists`, data: {} })
  //         }else{
  //         const repairtype = new RepairType({
  //             repair_type_name: req.body.repair_type_name,
  //             repair_type_location: req.body.repair_type_location,

  //         });
  //         let result = await repairtype.save();
  //         if (result != null) {
  //             res.json({ status: 200, message: "Repair Type Added Successfully!", data: result });
  //         }
  //         else {
  //             res.json({ status: 400, message: "Repair Type Not Added Successfully!" });
  //         }
  //     }
  //     } catch (error) {
  //         res.json({status:500,message:error.message})
  //     }
  // },

  add_repair_type: async (req, res) => {
    try {
      const repairData = req.body
      let existArray = [];
      let resultArray = 0;
      let count = 0;
      for (let i = 0; i < repairData?.length; i++) {
        const repairtypeName = repairData[i].repair_type_name.toUpperCase();
        const repair_type_in_db = await RepairType.find({ repair_type_name: repairtypeName });
        if (!repair_type_in_db.length) {

          const location_id = repairData[i]?.location;

          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value))
          }
          let repair_type = new RepairType({
            repair_type_name: repairtypeName,
            repair_type_location: locationArray,
          });
          let result = await repair_type.save();
          if (result) {
            resultArray = resultArray + 1
          }
        }
        else {
          existArray.push(repair_type_in_db)
          count++
        }
      }
      if (resultArray > 0) {
        res.json({ status: 200, message: `Repair Type Added ${resultArray} already exist ${count}` });
      }
      else {
        res.json({ status: 400, message: "Repair Type Not Added Successfully!" });
      }
    }
    catch (error) {
      console.log(error)
      res.json({ status: 500, message: "Something Went Wrong" })
    }
  },

  read_repair_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.repair_type_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        data = await RepairType.findOneAndUpdate(
          {
            repair_type_name: await typeConversion(
              xlData[i]?.repair_type_name
            ),
          },
          {
            repair_type_name: await typeConversion(
              xlData[i]?.repair_type_name
            ),
            repair_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Something Went Wrong!");
    }
  },

  get_repair_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { repair_type_name: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      if (limit && page) {
        const result = await RepairType.aggregate(
          [
            {
              $match: {
                repair_type_location: {
                  $in: userLocation
                }
              }
            },
            {
              $lookup: {
                from: 'locations',
                localField: 'repair_type_location',
                foreignField: '_id',
                as: 'repair_type_location'
              }
            }
          ]
        ).sort(mysort).limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await RepairType.countDocuments();
        res.json({ status: 200, message: "Data Found", data: result, total: count });
      } else {
        const result = await RepairType.aggregate(
          [{
            $lookup: {
              from: 'locations',
              localField: 'repair_type_location',
              foreignField: '_id',
              as: 'repair_type_location'
            }
          }
          ]
        ).sort(mysort);
        res.json({ status: 200, message: "Data Found", data: result });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_repair_type_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const repair_type_data = await RepairType.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "repair_type_location",
            foreignField: "_id",
            as: "repair_type_location",
          },
        },
      ]);
      res.json({
        status: 200,
        message: "Data Found",
        data: repair_type_data,
      });
    } catch (err) {
      res.send(err);
    }
  },

  update_repair_type_status: async (req, res) => {
    try {
      const id = req.body.id;
      const repair_type_status = req.body.repair_type_status;
      const repair_type = await RepairType.findByIdAndUpdate(id, {
        repair_type_status: repair_type_status,
      });
      if (repair_type != null) {
        if (repair_type_status == 0) {
          res.json({
            status: 200,
            message: "Repair Type Deactivated Successfully",
          });
        } else {
          res.json({
            status: 200,
            message: "Repair Type Activated Successfully",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Repair Type Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ sttaus: 500, message: error.message });
    }
  },

  update_repair_type_details: async (req, res) => {
    try {
      console.log(req.body, ">>>>>");
      const id = req.body.repair_type_id;
      const repair_type_name = req.body.repair_type_name.toUpperCase();
      const repair_type_location = req.body.repair_type_location;
      const locationArray = repair_type_location.map((val) => mongoose.Types.ObjectId(val));

      let payload = {}
      if (repair_type_name) {
        payload["repair_type_name"] = repair_type_name
      }
      if (locationArray.length > 0) {
        payload["repair_type_location"] = locationArray
      }
      const repair_type = await RepairType.findByIdAndUpdate(id, payload);
      if (repair_type != null) {
        res.json({ status: 200, message: "Repair Type Updated Successfully!" });
      } else {
        res.json({
          status: 400,
          message: "Repair Type Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ sttaus: 500, message: error.message });
    }
  },

  add_policy_type: async (req, res) => {
    const policyloc = req.body.policy_type_location
    let policyId = policyloc.map((val) => mongoose.Types.ObjectId(val))
    const policytype = new PolicyType({
      policy_type_name: req.body.policy_type_name,
      policy_type_location: policyId,
    });
    try {
      const result = await policytype.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_policy_type_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        let count = 0;
        for (let i = 0; i < cnt; i++) {
          let location_id = [];
          if (excelData["Sheet1"][i]["policy_type_location"].includes(",")) {
            let locations =
              excelData["Sheet1"][i]["policy_type_location"].split(",");
            for (let j = 0; j < locations.length; j++) {
              let id = await Locations.findOne({ location_name: locations[j] });
              location_id.push(id?._id?.toString());
            }
            location_id = location_id.join(",");
          } else {
            let id = await Locations.findOne({
              location_name: excelData["Sheet1"][i]["policy_type_location"],
            });
            location_id.push(id?._id?.toString());
            location_id.join("");
          }
          const Locations_Ids = location_id;
          const policytype = new PolicyType({
            policy_type_name: excelData["Sheet1"][i]["policy_type_name"],
            policy_type_location: Locations_Ids,
          });
          await policytype.save();
          count++;
        }
        if (count === cnt) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false });
        }
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_policy_type: async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;
    let userData = req.user
    let userLocation = userData?.location
    userLocation = userLocation.map((obj) => mongoose.Types.ObjectId(obj?.loc_id))
    const mysort = { policy_type_timestamp: -1 };
    try {
      const result = await PolicyType.aggregate([
        // {$match:{
        //   policy_type_location:{
        //     $in:userLocation
        //   }
        // }},
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'policy_type_location',
            'foreignField': '_id',
            'as': 'policy_type_location'
          }
        },
        {
          $project: {
            policy_type_name: 1,
            policy_type_status: 1,
            "policy_type_location.location_name": 1
          }
        },
        {
          '$skip': (page - 1) * limit
        }, {
          '$limit': limit
        }
      ])
      const count = await PolicyType.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_all_policy_type: async (req, res) => {

    const mysort = { policy_type_timestamp: -1 };
    try {
      const result = await PolicyType.aggregate([
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'policy_type_location',
            'foreignField': '_id',
            'as': 'policy_type_location'
          }
        },
        {
          $project: {
            policy_type_name: 1,
            policy_type_status: 1,
            "policy_type_location.location_name": 1
          }
        },]).sort(mysort)
      const count = await PolicyType.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_policy_type_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue
      const result = await PolicyType.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'policy_type_location',
            'foreignField': '_id',
            'as': 'policy_type_location'
          }
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_policy_type_status: async (req, res) => {
    try {
      let newdetails = await PolicyType.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policy_type_status: req.body.policy_type_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_policy_type_details: async (req, res) => {
    try {
      const id = req.body.ParamValue
      const loc = req.body.policy_type_location
      let locId = loc.map((val) => mongoose.Types.ObjectId(val))
      let newdetails = await PolicyType.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          $set: {
            policy_type_name: req.body.policy_type_name,
            policy_type_location: locId,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_business_type: async (req, res) => {
    try {
      const businessData = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < businessData.length; i++) {
        const businesstypeName = businessData[i].business_type_name.toUpperCase();
        const business_type_in_db = await BusinessType.find({
          business_type_name: businesstypeName,
        });
        if (business_type_in_db.length > 0) {
          existArray.push(business_type_in_db);
          count++;
        } else {
          let location_id = businessData[i].location;
          let business_type = new BusinessType({
            business_type_name: businesstypeName,
            business_type_location: location_id.map((val) => mongoose.Types.ObjectId(val.value)),
          });
          let result = await business_type.save();
          if (result != null) {
            resultArray.push(result);
          } else {
            res.json({
              status: 400,
              message: "Business Type Not Added Successfully!",
            });
          }
        }
      }
      if (resultArray.length > 0) {
        res.json({
          status: 200,
          message: `Business Type Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Business Type  already exist`,
        });
      } else {
        res.json({
          status: 400,
          message: "Make Motor Not Added Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },
  read_business_type_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.business_type_location

        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        data = await BusinessType.findOneAndUpdate(
          {
            business_type_name: await typeConversion(
              xlData[i]?.business_type_name
            ),
          },
          {
            business_type_name: await typeConversion(
              xlData[i]?.business_type_name
            ),
            business_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Something Went Wrong!");
    }
  },

  get_business_type: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { business_type_name: 1 };
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      if (page && limit) {
        const result = await BusinessType.aggregate(
          [
            {
              $match: {
                business_type_location: {
                  $in: userLocation
                }
              }
            },
            {
              $lookup: {
                from: 'locations',
                localField: 'business_type_location',
                foreignField: '_id',
                as: 'business_type_location'
              }
            }
          ]
        ).sort(mysort).limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await BusinessType.countDocuments();
        res.json({ status: 200, message: "Data Found", data: result, total: count });
      } else {
        const result = await BusinessType.aggregate(
          [{
            $lookup: {
              from: 'locations',
              localField: 'business_type_location',
              foreignField: '_id',
              as: 'business_type_location'
            }
          }
          ]).sort(mysort);
        res.json({ status: 200, message: "Data Found", data: result });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_business_type_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue;
      const result = await BusinessType.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "business_type_location",
            foreignField: "_id",
            as: "business_type_location",
          },
        },
      ]);
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
      });
    } catch (err) {
      res.send(err);
    }
  },

  update_business_type_status: async (req, res) => {
    try {
      const id = req.body.id;
      const business_type_status = req.body.business_type_status;
      const business_type = await BusinessType.findByIdAndUpdate(id, {
        business_type_status: business_type_status,
      });
      if (business_type != null) {
        if (business_type_status == 0) {
          res.json({
            status: 200,
            message: "Business Type Deactivated Successfully",
          });
        } else {
          res.json({
            status: 200,
            message: "Business Type Activated Successfully",
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Business Type Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_business_type_details: async (req, res) => {
    try {
      const id = req.body.business_type_id;
      const locations = req.body.business_type_location;
      const locationArray = locations.map((val) => mongoose.Types.ObjectId(val));
      let payload = {}
      if (req.body.business_type_name) {
        payload["business_type_name"] = req.body.business_type_name.toUpperCase()
      }
      if (locationArray.length > 0) {
        payload["business_type_location"] = locationArray
      }

      const business_type = await BusinessType.findByIdAndUpdate(id, payload);
      if (business_type != null) {
        res.json({
          status: 200,
          message: "Business Type Updated Successfully!",
        });
      } else {
        res.json({
          status: 400,
          message: "Business Type Not Updated Successfully!",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_Motor_model_details: async (req, res) => {
    try {
      const motorData = req.body;
      console.log(motorData, ">>>>>>>>>>>>>>>>>payload");
      let existArray = [];
      let result;
      let count = 0;
      for (let i = 0; i < motorData.length; i++) {
        let motor_model_details;
        const motorName = motorData[i]?.motor_model_detail_name;
        const startyear = motorData[i]?.start_year;
        const motormodel = motorData[i]?.motor_model_detail_id;
        const make_motor_in_db = await MotorModelDetails.find({
          motor_model_detail_name: motorName,
          motor_model_detail_start_year: startyear,
          motor_model_detail_model_id: motormodel,
        });
        console.log(make_motor_in_db, ">>>>>>>>>>>> already present");
        if (!make_motor_in_db.length) {
          let location_id = motorData[i].location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }
          if (motorData[i].discontinution_year == "") {
            motor_model_details = {
              motor_model_detail_name: motorData[i].motor_model_detail_name,
              motor_model_detail_model_id: mongoose.Types.ObjectId(
                motorData[i].motor_model_detail_id
              ),
              motor_model_make_id: mongoose.Types.ObjectId(
                motorData[i].motor_model_make_id
              ),
              motor_model_detail_start_year: motorData[i].start_year,
              motor_model_detail_body_type: mongoose.Types.ObjectId(
                motorData[i].body_type
              ),
              motor_model_detail_cylinder: motorData[i].cylinder,
              motor_model_detail_min: motorData[i].min,
              motor_model_detail_max: motorData[i].max,
              motor_model_detail_dep: motorData[i].dep,
              motor_model_detail_min_dep: motorData[i].min_dep,
              motor_model_detail_max_dep: motorData[i].max_dep,
              motor_model_detail_location: locationArray,
            };
          } else {
            motor_model_details = {
              motor_model_detail_name: motorData[i].motor_model_detail_name,
              motor_model_detail_model_id: mongoose.Types.ObjectId(
                motorData[i].motor_model_detail_id
              ),
              motor_model_make_id: mongoose.Types.ObjectId(
                motorData[i].motor_model_make_id
              ),
              motor_model_detail_start_year: motorData[i].start_year,
              motor_model_detail_body_type: mongoose.Types.ObjectId(
                motorData[i].body_type
              ),
              motor_model_detail_cylinder: motorData[i].cylinder,
              motor_model_detail_min: motorData[i].min,
              motor_model_detail_max: motorData[i].max,
              motor_model_detail_dep: motorData[i].dep,
              motor_model_detail_min_dep: motorData[i].min_dep,
              motor_model_detail_max_dep: motorData[i].max_dep,
              motor_model_detail_discontinuation_year:
                motorData[i].discontinution_year,
              motor_model_detail_location: locationArray,
            };
          }
          console.log(motor_model_details);
          let motor_details = new MotorModelDetails(motor_model_details);
          result = await motor_details.save();
          count++;
        } else {
          console.log("inside else");
          existArray.push(make_motor_in_db);
        }
      }
      if (count > 0) {
        return res.json({
          status: 200,
          message: `${count} Model Motor Added  Successfully ${existArray.length}  already present`,
        });
      } else {
        return res.json({ status: 400, message: "Motor Model already exist!" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error.message });
    }
  },
  get_model_motor_name: async (req, res) => {
    try {
      const mysort = { motor_model_name: 1 };
      const model_motor = await motor_model
        .aggregate([
          {
            $match: {
              motor_model_status: 1,
            },
          },
          {
            $lookup: {
              from: "make_motors",
              localField: "motor_model_make_id",
              foreignField: "_id",
              as: "make_motor",
            },
          },
        ])
        .sort(mysort);
      const count = await motor_model.countDocuments();
      res.json({
        status: 200,
        message: "Data Found",
        data: model_motor,
        total: count,
      });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  read_Motor_model_details_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let bodyTypeId;
        let makeDtails;
        let modelDetails;
        let motorModelDetails;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.motor_model_detail_location
        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        makeDtails = await make_motor_model.findOneAndUpdate(
          { make_motor_name: await typeConversion(xlData[i]?.make_motor) },
          {
            make_motor_name: await typeConversion(xlData[i]?.make_motor),
            make_motor_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        bodyTypeId = await bodyTypeModels.findOneAndUpdate(
          {
            body_type_name: await typeConversion(
              xlData[i]?.motor_model_detail_body_type
            ),
          },
          {
            body_type_name: await typeConversion(
              xlData[i]?.motor_model_detail_body_type
            ),
            body_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        modelDetails = await motor_model.findOneAndUpdate(
          {
            motor_model_name: await typeConversion(
              xlData[i]?.motor_model_detail_model_id
            ),
          },
          {
            motor_model_name: await typeConversion(
              xlData[i]?.motor_model_detail_model_id
            ),
            motor_model_location: locationArray,
            motor_model_make_id: makeDtails?._id?.toString(),
          },
          { upsert: true, returnOriginal: false }
        );
        let motorDetailsObj = {}
        motorDetailsObj["motor_model_detail_name"] = await typeConversion(
          xlData[i]?.motor_model_detail_name
        ),
          motorDetailsObj["motor_model_make_id"] = makeDtails?._id?.toString()
        motorDetailsObj["motor_model_detail_model_id"] = modelDetails?._id?.toString()
        motorDetailsObj["motor_model_detail_start_year"] = +xlData[i]?.motor_model_detail_start_year
        motorDetailsObj["motor_model_detail_body_type"] = bodyTypeId?._id?.toString()
        motorDetailsObj["motor_model_detail_cylinder"] = xlData[i]?.motor_model_detail_cylinder
        motorDetailsObj["motor_model_detail_min"] = xlData[i]?.motor_model_detail_min
        motorDetailsObj["motor_model_detail_max"] = xlData[i]?.motor_model_detail_max
        motorDetailsObj["motor_model_detail_dep"] = +xlData[i]?.motor_model_detail_dep
        motorDetailsObj["motor_model_detail_min_dep"] = +(await typeConversion(
          xlData[i]?.motor_model_detail_min_dep
        )),
          motorDetailsObj["motor_model_detail_max_dep"] = xlData[i]?.motor_model_detail_max_dep
        if (xlData[i]?.motor_model_detail_discontinuation_year) {
          motorDetailsObj["motor_model_detail_discontinuation_year"] =
            +xlData[i]?.motor_model_detail_discontinuation_year
        }

        motorDetailsObj["motor_model_detail_location"] = locationArray

        motorModelDetails = await MotorModelDetails.findOneAndUpdate(
          {
            motor_model_detail_name: await typeConversion(
              xlData[i]?.motor_model_detail_name
            ),
            motor_model_detail_start_year:
              +xlData[i]?.motor_model_detail_start_year,
            motor_model_detail_model_id: modelDetails?._id,
          },
          motorDetailsObj,
          { upsert: true, returnOriginal: false }
        );
        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  get_Motor_model_details: async (req, res) => {
    try {
      let query = req.query
      const page = +query.page;
      const limit = +query.limit;
      let payload = req.body;
      let name = query?.name
      let status = +query?.status
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      if (page && limit) {
        let match = {};
        if (name) {
          match = {
            motor_model_detail_name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["motor_model_detail_location"] = {
          $in: userLocation
        }
        if (status == 1 || status == 0) {
          match["motor_model_detail_status"] = status
        }
        if (payload?.makeId) {
          match["motor_model_make_id"] = mongoose.Types.ObjectId(
            payload?.makeId
          );
        }
        if (payload?.modelId) {
          match["motor_model_detail_model_id"] = mongoose.Types.ObjectId(
            payload?.modelId
          );
        }
        const mysort = { "makeMotor.make_motor_name": 1, "motor_model.motor_model_name": 1, motor_model_detail_name: 1, };
        let aggregate = [
          {
            $match: match,
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "motor_models",
              localField: "motor_model_detail_model_id",
              foreignField: "_id",
              as: "motor_model",
            },
          },
          {
            $lookup: {
              from: "body_types",
              localField: "motor_model_detail_body_type",
              foreignField: "_id",
              as: "body_type",
            },
          },
          {
            $unwind: {
              path: "$body_type",
            },
          },
          {
            $lookup: {
              from: "make_motors",
              localField: "motor_model_make_id",
              foreignField: "_id",
              as: "makeMotor",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "motor_model_detail_location",
              foreignField: "_id",
              as: "motor_model_detail_location",
            },
          },
          {
            $unwind: {
              path: "$makeMotor",
            },
          },
          {
            $sort: mysort,
          },
          {
            $skip: (page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ];
        aggregate.push({
          $facet: facet,
        });
        let model_motor = await MotorModelDetails.aggregate(aggregate);

        if (!model_motor[0]?.data?.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found",
          data: model_motor[0]?.data,
          total: model_motor[0]?.totalCount[0]?.total,
        });
      } else {
        const mysort = { "makeMotor.make_motor_name": 1 };
        const model_motor = await MotorModelDetails.aggregate([
          {
            $lookup: {
              from: "motor_models",
              localField: "motor_model_detail_model_id",
              foreignField: "_id",
              as: "motor_model",
            },
          },
          {
            $lookup: {
              from: "body_types",
              localField: "motor_model_detail_body_type",
              foreignField: "_id",
              as: "body_type",
            },
          },

          {
            $unwind: {
              path: "$body_type",
            },
          },
          {
            $lookup: {
              from: "make_motors",
              localField: "motor_model_make_id",
              foreignField: "_id",
              as: "makeMotor",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "motor_model_detail_location",
              foreignField: "_id",
              as: "motor_model_detail_location",
            },
          },
          {
            $unwind: {
              path: "$makeMotor",
            },
          },

          {
            $sort: mysort,
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: model_motor });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },
  get_Motor_model_details_excel: async (req, res) => {
    try {
      let query = req.query
      let payload = req.body;
      let name = query?.name
      let status = +query?.status
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {};
      if (name) {
        match = {
          motor_model_detail_name: {
            $regex: name,
            $options: "i"
          }
        }
      }
      match["motor_model_detail_location"] = {
        $in: userLocation
      }
      if (status == 1 || status == 0) {
        match["motor_model_detail_status"] = status
      }
      if (payload?.makeId) {
        match["motor_model_make_id"] = mongoose.Types.ObjectId(
          payload?.makeId
        );
      }
      if (payload?.modelId) {
        match["motor_model_detail_model_id"] = mongoose.Types.ObjectId(
          payload?.modelId
        );
      }
      const mysort = { "makeMotor.make_motor_name": 1, "motor_model.motor_model_name": 1, motor_model_detail_name: 1, };
      let aggregate = [
        {
          $match: match,
        },
      ];
      let facet = {};
      facet["totalCount"] = [
        {
          $count: "total",
        },
      ];
      facet["data"] = [
        {
          $lookup: {
            from: "motor_models",
            localField: "motor_model_detail_model_id",
            foreignField: "_id",
            as: "motor_model",
          },
        },
        {
          $lookup: {
            from: "body_types",
            localField: "motor_model_detail_body_type",
            foreignField: "_id",
            as: "body_type",
          },
        },
        {
          $unwind: {
            path: "$body_type",
          },
        },
        {
          $lookup: {
            from: "make_motors",
            localField: "motor_model_make_id",
            foreignField: "_id",
            as: "makeMotor",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "motor_model_detail_location",
            foreignField: "_id",
            as: "motor_model_detail_location",
          },
        },
        {
          $unwind: {
            path: "$makeMotor",
          },
        },
        {
          $sort: mysort,
        },
      ];
      aggregate.push({
        $facet: facet,
      });
      let model_motor = await MotorModelDetails.aggregate(aggregate);

      if (!model_motor[0]?.data?.length) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Found",
          data: [],
          total: 0,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found",
        data: model_motor[0]?.data,
        total: model_motor[0]?.totalCount[0]?.total,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },

  get_Motor_model_detailsbyid: async (req, res) => {
    try {
      const result = await MotorModelDetails.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.body.ParamValue) } },
        {
          $lookup: {
            from: "locations",
            localField: "motor_model_detail_location",
            foreignField: "_id",
            as: "motor_model_detail_location",
          },
        },
        {
          '$lookup': {
            'from': 'body_types',
            'localField': 'motor_model_detail_body_type',
            'foreignField': '_id',
            'as': 'bodTypes'
          }
        }
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.send(err);
    }
  },

  update_Motor_model_details_status: async (req, res) => {
    try {
      let id = req.params.id;
      let status = req.body.motor_model_deatil_status;
      const model_motor_detail = await MotorModelDetails.findByIdAndUpdate(id, {
        motor_model_detail_status: status,
      });
      if (model_motor_detail != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Model Motor Detail Deactivated Successfully",
            data: model_motor_detail,
          });
        } else {
          res.json({
            status: 200,
            message: "Model Motor Detail Activated Successfully",
            data: model_motor_detail,
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Model Motor Detail Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_Motor_model_details: async (req, res) => {
    try {
      let payloadObj = {}
      let payload = req.body;
      let yearObj = {}
      yearObj["start_year"] = payload?.start_year
      yearObj["car_value_min"] = payload?.min
      yearObj["car_value_max"] = payload?.max
      yearObj["depriciation_min"] = payload?.min_dep
      yearObj["depriciation_max"] = payload?.max_dep
      const id = req.body.motor_model_detail_id;
      const motor_model_detail_location =
        payload?.motor_model_detail_location?.map((val) =>
          mongoose.Types.ObjectId(val)
        );
      payloadObj["motor_model_detail_name"] = payload?.model_motor_detail_name?.toUpperCase()
      payloadObj["motor_model_detail_model_id"] = payload?.motor_model_detail_model_id
      payloadObj["motor_model_detail_start_year"] = +payload?.start_year
      payloadObj["motor_model_make_id"] = payload?.motor_model_make_id
      payloadObj["motor_model_detail_body_type"] = payload?.body_type
      payloadObj["motor_model_detail_cylinder"] = payload?.cylinder
      payloadObj["motor_model_detail_min"] = payload?.min
      payloadObj["motor_model_detail_max"] = payload?.max
      payloadObj["motor_model_detail_dep"] = +payload?.dep
      payloadObj["motor_model_detail_min_dep"] = payload?.min_dep
      payloadObj["motor_model_detail_max_dep"] = payload?.max_dep
      if (payload?.discontinution_year) {
        payloadObj["motor_model_detail_discontinuation_year"] = +payload?.discontinution_year

      }
      payloadObj["motor_model_detail_location"] = motor_model_detail_location
      console.log(payloadObj, ">>>>>>>>>>>>>>>motor model details object")
      const model_motor_detail = await MotorModelDetails.findByIdAndUpdate(id, payloadObj);
      if (model_motor_detail != null) {
        res.json({
          status: 200,
          message: "Model Motor Detail Updated Successfully",
          data: model_motor_detail,
        });
      } else {
        res.json({
          status: 400,
          message: "Model Motor Detail Not Updated Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },

  // get_line_of_business_list: async (req, res) => {
  //   try {

  //     const line_of_business = await line_of_business_model.find({ line_of_business_status: 1 });
  //     res.json({ status: 200, message: "Data Found", data: line_of_business });
  //   } catch (error) {
  //     res.json({ status: 500, message: error.message });
  //   }
  // },

  get_line_of_business_list: async (req, res) => {
    try {

      const BE = req.query.location;
      let match = {}

      if (BE) {
        const locations = Array.isArray(BE) ? BE : [BE];
        const locationObjectIds = locations.map(location => mongoose.Types.ObjectId(location));
        console.log(locationObjectIds, "locationObjectIds")
        const locationDocs = await location_model.find({ _id: { $in: locationObjectIds } });
        console.log(locationDocs, "locationDocs")
        const valuesToMatch = locationDocs.flatMap(doc => doc.lob.map(lob => mongoose.Types.ObjectId(lob.value)));
        console.log(valuesToMatch, "valuesToMatch")
        const lobDocs = await line_of_business_model.find({ _id: { $in: valuesToMatch.flat() } });
        console.log(lobDocs, "lobDocs")

        match = {
          line_of_business_status: 1,
          _id: {
            $in: lobDocs.map(doc => doc._id)
          }
        };
      }

      console.log(match, "match")

      // else {
      //     match = {
      //         line_of_business_status: 1
      //     };

      //   }
      const line_of_business = await line_of_business_model.aggregate([
        {
          $match: match
        }
      ]);
      res.json({ status: 200, message: "Data Found", data: line_of_business });

    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  add_lead_status: async (req, res) => {
    try {
      const lead_status = new LeadStatus({
        lead_status: req.body.lead_status,
      });
      let result = await lead_status.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Error Occured!" });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  get_lead_status: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    try {
      const result = await LeadStatus.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await LeadStatus.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_lead_status_name: async (req, res) => {
    try {
      let payload = req.body;
      let query = req.query;
      const usertype = payload.usertype;
      let result = await LeadStatus.find();
      console.log(usertype);
      console.log(query);
      if (
        usertype === "646224eab201a6f07b2dff36" ||
        usertype === "650029b2df69a40334089041" ||
        (usertype === "64622470b201a6f07b2dff22" &&
          query?.type === "salesAdvisor")
      ) {
        result = result.filter((status) => {
          return [
            "Hot",
            "Warm",
            "Cold",
            "Forward",
            "Lost & Dropped",
            "New",
          ].includes(status.lead_status);
        });
      } else if (
        usertype === "6462250eb201a6f07b2dff3a" ||
        (usertype === "64622470b201a6f07b2dff22" &&
          query?.type === "documentchaser")
      ) {
        result = result.filter((status) => {
          return ["Missing", "Rejected", "Verified"].includes(
            status.lead_status
          );
        });
      }
      if (result.length > 0) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_lead_statusbyid: async (req, res) => {
    try {
      const result = await LeadStatus.findById({ _id: req.body.ParamValue });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_lead_status: async (req, res) => {
    try {
      let newdetails = await LeadStatus.findOneAndUpdate(
        { _id: req.body.ParamValue },
        { $set: { lead_status: req.body.lead_status } },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getPolicyType: async (req, res) => {
    try {
      const result = await PolicyType.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getPlanCategory: async (req, res) => {
    try {
      const result = await plan_category_model.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getNatureOfPlan: async (req, res) => {
    try {
      const result = await nature_of_plan_model.find({
        nature_of_plan_status: 1,
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getBodyType: async (req, res) => {
    try {
      const result = await body_type_model
        .find({ body_type_status: 1 })
        .sort({ body_type_name: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getRepairCondition: async (req, res) => {
    try {
      const result = await RepairType.find({ repair_type_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getPlanFor: async (req, res) => {
    try {
      const result = await PlanFor.find({});
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getBusinessType: async (req, res) => {
    try {
      const result = await BusinessType.find({ business_type_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getGccSpecs: async (req, res) => {
    try {
      const result = await PlanForGCCSpec.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getNationality: async (req, res) => {
    try {
      const result = await Nationality.find({ nationality_status: 1 }, { nationality_name: 1 }).sort({ nationality_name: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getModelMotor: async (req, res) => {
    try {
      const result = await make_motor_model.find({ make_motor_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getPolicyTypes: async (req, res) => {
    try {
      const result = await PolicyType.find({ policy_type_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getStaff: async (req, res) => {
    try {
      let query = req.query;
      const page = +query.page;
      const limit = +query.limit;
      let name = query?.name
      let email = query?.email
      let phone = query?.phone
      let userType = query?.userType
      // console.log("name:", name, "email:", email, "phone:", phone, "usertype:", userType)
      let match = {};
      if (userType == "all") {
        if (name) {
          match["name"] = {
            $regex: name,
            $options: "i"
          }

        } if (email) {
          match["email"] = {
            $regex: email,
            $options: "i"
          }
        } if (phone) {
          match["mobile"] = {
            $regex: phone,
            $options: "i"
          }
        }
      } else {
        if (userType) {
          let UserTypeId = await userTypeModel.findOne({
            usertype: userType,
          });
          match["usertype"] = UserTypeId._id;
        }
        if (name) {
          match["name"] = {
            $regex: name,
            $options: "i"
          }

        }
        if (email) {
          match["email"] = {
            $regex: email,
            $options: "i"
          }
        }
        if (phone) {
          match["mobile"] = {
            $regex: phone,
            $options: "i"
          }
        }
      }
      let userDetails;
      let aggregate = []
      aggregate.push([
        {
          $facet: {
            total: [{
              $match: match
            },
            {
              $count: "total"
            }
            ],
            data: [{
              $match: match
            },
            {
              $lookup: {
                from: 'usertypes',
                localField: 'usertype',
                foreignField: '_id',
                as: 'usertype'
              }
            },
            {
              $skip: (page - 1) * +limit
            },
            {
              $limit: limit
            }
            ]
          }
        }
      ])
      userDetails = await Admin.aggregate(aggregate)

      if (!userDetails.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: [] });
      }

      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !",
        data: userDetails[0]?.data,
        total: userDetails[0]?.total[0]?.total,
      });

    } catch (err) {
      console.log(err);
    }
  },
  updatestatusStaff: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.params.status;
      const usertype = req.query.usertype;
      if (usertype == "Customer") {
        let result = await Customer.findByIdAndUpdate(id, { status: status });
        if (result != null) {
          if (status == 0) {
            return res.json({
              status: 200,
              message: "Customer Deactivated Successfully!",
            });
          } else {
            return res.json({
              status: 200,
              message: "Customer Activated Successfully!",
            });
          }
        } else {
          return res.json({
            status: 400,
            message: "Customer Not Deactivated Successfully!",
          });
        }
      } else {
        let result = await Admin_model.findByIdAndUpdate(id, {
          status: status,
        });
        if (result != null) {
          if (status == 0) {
            return res.json({
              status: 200,
              message: "Staff Deactivated Successfully!",
            });
          } else {
            return res.json({
              status: 200,
              message: "Staff Activated Successfully!",
            });
          }
        } else {
          res.json({
            status: 400,
            message: "Staff Not Deactivated Successfully!",
          });
        }
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },
  getStaffDetailsbyid: async (req, res) => {
    try {
      const id = req.params.id;
      // const ObjectId = require('mongodb').ObjectId;
      const staff_data = await Admin_model.aggregate([
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "admins",
              localField: "assignPolicyIssuer",
              foreignField: "_id",
              as: "assignPolicyIssuer",
            },
          },
          {
            $lookup: {
              from: "admins",
              localField: "assignSalesAdvisor",
              foreignField: "_id",
              as: "assignSalesAdvisor",
            },
          },
          {
            $lookup: {
              from: "admins",
              localField: "assignDacumentChaser",
              foreignField: "_id",
              as: "assignDacumentChaser",
            },
          },
          // {
          //     '$project': {
          //         'assignPolicyIssuer._id': 1,
          //         'assignPolicyIssuer.name': 1,
          //         'assignSalesAdvisor.name': 1,
          //         'assignSalesAdvisor._id': 1,
          //         'assignDacumentChaser.name': 1,
          //         'assignDacumentChaser._id': 1
          //     }
          // }
        ],
      ]);

      res.json({ status: 200, message: "Data Found", data: staff_data });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  updateStaff: async (req, res) => {
    try {
      const id = req.body.staff_id;
      const name = req.body.staff_name;
      const email = req.body.staff_email;
      const phone = req.body.staff_mobile;
      const usertype = req.body.staff_usertype;

      const lob_arr = [];
      const lob = req.body.staff_lob;

      for (let j = 0; j < lob.length; j++) {
        lob_arr.push({ lob_id: lob[j]["value"], lob_name: lob[j]["label"] });
      }

      const loc_arr = [];
      const loc = req.body.staff_location;

      for (let j = 0; j < loc.length; j++) {
        loc_arr.push({ loc_id: loc[j]["value"], loc_name: loc[j]["label"] });
      }

      const business_type_arr = [];
      const business_type = req.body.staff_business;
      for (let j = 0; j < business_type.length; j++) {
        business_type_arr.push({ type: business_type[j]["value"] });
      }

      const password = req.body.staff_password;

      let staff_data;
      if (password != "") {
        if (req.body.company) {
          staff_data = await Admin_model.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: phone,
            usertype: usertype,
            line_of_business: lob_arr,
            location: loc_arr,
            insurance_company: req.body?.company,
            password: md5(password),
            admin_business_type: business_type_arr,
          });
        } else {
          staff_data = await Admin_model.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: phone,
            usertype: usertype,
            line_of_business: lob_arr,
            location: loc_arr,
            password: md5(password),
            admin_business_type: business_type_arr,
          });

        }
      } else {
        if (req.body?.company) {
          staff_data = await Admin_model.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: phone,
            usertype: usertype,
            line_of_business: lob_arr,
            location: loc_arr,
            insurance_company: req.body?.company,
            admin_business_type: business_type_arr,
          });
        } else {
          staff_data = await Admin_model.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: phone,
            usertype: usertype,
            line_of_business: lob_arr,
            location: loc_arr,
            admin_business_type: business_type_arr,
          });
        }
      }

      if (staff_data != null) {
        res.json({ status: 200, message: "Staff Updated Successfully!" });
      } else {
        res.json({ status: 400, message: "Staff Not Updated Successfully!" });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  updatestaffpassword: async (req, res) => {
    try {
      const id = req.body.staff_id;
      const password = req.body.staff_password;

      const staff_data = await Admin_model.findByIdAndUpdate(id, {
        password: md5(password),
      });
      if (staff_data != null) {
        res.json({ status: 200, message: "Staff Updated Successfully!" });
      } else {
        res.json({ status: 400, message: "Staff Not Updated Successfully!" });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  get_user_type: async (req, res) => {
    try {
      const result = await UserType.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_standard_cover: async (req, res) => {
    try {
      let payload = req.body;
      let payloadObj = {}
      console.log(">>>>>>>>>>>>Standard cover payload", payload);
      if (payload?.standard_cover_label) {
        payloadObj["standard_cover_label"] = payload?.standard_cover_label
      }
      if (payload?.standard_cover_description) {
        payloadObj["standard_cover_description"] = payload?.standard_cover_description
      }
      if (payload?.standard_cover_lob) {
        payloadObj["standard_cover_lob"] = payload?.standard_cover_lob.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.standard_cover_company) {
        payloadObj["standard_cover_company"] = payload?.standard_cover_company.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.standard_cover_plan) {
        payloadObj["standard_cover_plan"] = payload?.standard_cover_plan.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (payload?.location) {
        payloadObj["location"] = payload?.location.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.plan_category_id) {
        payloadObj["plan_category_id"] = payload?.plan_category_id.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.travel_insurance_for) {

        payloadObj["travel_insurance_for"] = payload?.travel_insurance_for.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.cover_type) {
        payloadObj["cover_type"] = payload?.cover_type.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.home_plan_type) {
        payloadObj["home_plan_type"] = payload?.home_plan_type.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.medical_plan_type) {
        payloadObj["medical_plan_type"] = payload?.medical_plan_type.map((val) => mongoose.Types.ObjectId(val.value))
      }
      console.log(payloadObj, "payloadObj")
      const standard_cover = new Standard_cover(payloadObj);
      console.log(standard_cover);
      const result = await standard_cover.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_standard_cover_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        for (let i = 0; i < cnt; i++) {
          const line_of_business_name =
            excelData["Sheet1"][i]["standard_cover_lob"];
          const lob = line_of_business_name.split(",");
          const lob_arr = [];
          for (let j = 0; j < lob.length; j++) {
            const line_of_business = await line_of_business_model.findOne({
              line_of_business_name: lob[j],
            });
            lob_arr.push(line_of_business._id);
          }

          const lob_ids = lob_arr.map((obj) => mongoose.Types.ObjectId(obj));

          const standard_cover = new Standard_cover({
            standard_cover_label:
              excelData["Sheet1"][i]["standard_cover_label"],
            standard_cover_lob: lob_ids,
            standard_cover_description:
              excelData["Sheet1"][i]["standard_cover_description"],
            standard_cover_status:
              excelData["Sheet1"][i]["standard_cover_status"],
          });
          await standard_cover.save();
        }
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  get_standard_covers: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let name = query.name
      let status = +query.status
      let lob = query.lob
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      console.log(lob)

      let mysort = { standard_cover_label: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            standard_cover_label: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["location"] = {
          $in: userLocation
        }
        if (lob) {
          match["standard_cover_lob"] = mongoose.Types.ObjectId(lob)
        }
        if (status == 0 || status == 1) {
          match["standard_cover_status"] = +status;
        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "companies",
              localField: "standard_cover_company",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locations",
            },
          },
          {
            $lookup:
            {
              from: "line_of_businesses",
              localField: "standard_cover_lob",
              foreignField: "_id",
              as: "lob_result"
            }
          },
          {
            $lookup:
            {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_category"
            }
          },
          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          }

        ]
        aggregate.push({
          $facet: facet
        })
        let data = await Standard_cover.aggregate(aggregate);

        if (!data[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: data[0]?.data, total: data[0]?.totalCount[0]?.total });


      } else {
        const data = await Standard_cover.aggregate([
          {
            $lookup: {
              from: "companies",
              localField: "standard_cover_company",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locations",
            },
          },
          {
            $lookup:
            {
              from: "line_of_businesses",
              localField: "standard_cover_lob",
              foreignField: "_id",
              as: "lob_result"
            }
          }
        ]);
        res.json({ status: 200, message: "Data Found", data: data });
      }

    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },
  //
  get_standard_cover: async (req, res) => {
    try {
      const id = req.params.id;
      // const standardCoverCompany = planResult?.company_id;
      // const policy_type = planResult?.policy_type_id;
      // const lob_id = planResult?.line_of_business_id
      const type = req.params.type;
      let planResult
      let result
      if (type == "motor") {
        planResult = await Motor_plan.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_plan: planResult?.policy_type_id,
          standard_cover_status: 1
        });
      }
      if (type == "travel") {
        planResult = await travel_plan_model.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_status: 1
        });

      }
      if (type == "home") {
        planResult = await home_plan_model.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_status: 1
        });

      }
      if (type == "medical") {
        planResult = await medicalPlan.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_status: 1
        });

      }
      if (type == "yacht") {
        planResult = await yachtPlan.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_status: 1
        });
      }
      if (type == "home") {
        planResult = await HomePlan.findById({ _id: id })
        result = await Standard_cover.find({
          standard_cover_lob: planResult?.line_of_business_id,
          standard_cover_company: planResult?.company_id,
          standard_cover_status: 1
        });
      }

      console.log(result, "matched standard covers")
      if (result != null) {
        const count = await Standard_cover.countDocuments();
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_standard_coverbyid: async (req, res) => {
    try {
      let id = mongoose.Types.ObjectId(req.body?.ParamValue)
      const result = await Standard_cover.aggregate([
        {
          $match: { _id: id }
        },
        {
          $lookup:
          {
            from: "line_of_businesses",
            localField: "standard_cover_lob",
            foreignField: "_id",
            as: "lob_result"
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "standard_cover_company",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "locations",
          },
        },
        {
          $lookup:
          {
            from: "travel_insurance_fors",
            localField: "travel_insurance_for",
            foreignField: "_id",
            as: "travel_insurance_for"
          }
        },
        {
          $lookup:
          {
            from: "travel_cover_type_lists",
            localField: "cover_type",
            foreignField: "_id",
            as: "cover_type"
          }
        },
        {
          $lookup: {
            from: "home_plan_type_lists",
            localField: "home_plan_type",
            foreignField: "_id",
            as: "home_plan_type"
          }
        },
        {
          $lookup: {
            from: "policy_types",
            localField: "standard_cover_plan",
            foreignField: "_id",
            as: "policy_types",
          },
        },
        {
          $lookup:
          {
            from: "plan_categories",
            localField: "plan_category_id",
            foreignField: "_id",
            as: "plan_category"
          }
        },
        {
          $lookup:
          {
            from: "medical_plan_type_lists",
            localField: "medical_plan_type",
            foreignField: "_id",
            as: "medical_plan_type"
          }
        },
      ]
      );
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_standard_cover: async (req, res) => {
    try {
      const coverdata = req.body
      console.log("coverdata", coverdata)
      let payload = {}
      if (coverdata?.standard_cover_label) {
        payload["standard_cover_label"] = coverdata?.standard_cover_label
      }
      if (coverdata?.standard_cover_description) {
        payload["standard_cover_description"] = coverdata?.standard_cover_description
      }
      if (coverdata?.standard_cover_lob?.length) {

        payload["standard_cover_lob"] = coverdata?.standard_cover_lob.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (coverdata?.standard_cover_company?.length) {
        const company = coverdata?.standard_cover_company.map((val) => mongoose.Types.ObjectId(val.value));
        payload["standard_cover_company"] = company
      }
      if (coverdata?.standard_cover_plan?.length) {
        const plan = coverdata?.standard_cover_plan.map((val) => mongoose.Types.ObjectId(val.value));
        payload["standard_cover_plan"] = plan
      }
      if (coverdata?.location?.length) {

        payload["location"] = coverdata?.location.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (coverdata?.plan_category_id) {
        const plan_category_id = coverdata?.plan_category_id.map((val) => mongoose.Types.ObjectId(val.value));
        payload["plan_category_id"] = plan_category_id
      }
      if (coverdata?.travel_insurance_for) {
        payload["travel_insurance_for"] = coverdata?.travel_insurance_for.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (coverdata?.cover_type) {
        payload["cover_type"] = coverdata?.cover_type.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (coverdata?.home_plan_type) {
        payload["home_plan_type"] = coverdata?.home_plan_type.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (coverdata?.medical_plan_type) {
        payload["medical_plan_type"] = coverdata?.medical_plan_type.map((val) => mongoose.Types.ObjectId(val.value));
      }
      console.log(payload, "payload")
      // const companyId = coverdata?.companies.map((val) => mongoose.Types.ObjectId(val.value));
      // const policy_typeid = coverdata?.policy_type.map((val) => mongoose.Types.ObjectId(val.value));
      // const lobids = coverdata?.standard_cover_lob.map((val) => mongoose.Types.ObjectId(val.value));
      // const locationsId = coverdata?.locations.map((val) => mongoose.Types.ObjectId(val.value));

      // console.log(lobids,"lobids")
      // console.log(policy_typeid,"policy_typeid")
      // console.log(companyId,"companyId")
      // console.log(locationsId,"locationsId")

      // return false;
      const result = await Standard_cover.findOneAndUpdate(
        { _id: coverdata?.ParamValue },
        payload,
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_standard_cover_status: async (req, res) => {
    try {
      const result = await Standard_cover.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { standard_cover_status: req.body.standard_cover_status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_additional_cover: async (req, res) => {
    try {
      console.log(req.body);
      let lob;
      let loc;
      const lobs = req.body.additional_cover_lob;
      const locs = req.body.additional_cover_location;
      lob = lobs.map((val) => mongoose.Types.ObjectId(val));
      loc = locs.map((val) => mongoose.Types.ObjectId(val));
      // console.log(lob);

      const additional_cover = new Additional_cover({
        additional_cover_label: req.body.additional_cover_label,
        additional_cover_description: req.body.additional_cover_description,
        location: loc,
        additional_cover_lob: lob,
      });
      const result = await additional_cover.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  read_additional_cover_excel: async (req, res) => {
    try {
      if (req.file?.filename == null || req.file?.filename == "undefined") {
        res.status(400).json("No File");
      } else {
        let file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });
        fs.remove("./publicfiles/" + file);
        const cnt = excelData["Sheet1"].length;
        for (let i = 0; i < cnt; i++) {
          const line_of_business_name =
            excelData["Sheet1"][i]["additional_cover_lob"];
          const lob = line_of_business_name.split(",");
          const lob_arr = [];
          for (let j = 0; j < lob.length; j++) {
            const line_of_business = await line_of_business_model.findOne({
              line_of_business_name: lob[j],
            });
            lob_arr.push(line_of_business._id);
          }

          const lob_ids = lob_arr.map((obj) => mongoose.Types.ObjectId(obj));

          const additional_cover = new Additional_cover({
            additional_cover_label:
              excelData["Sheet1"][i]["additional_cover_label"],
            additional_cover_lob: lob_ids,
            additional_cover_description:
              excelData["Sheet1"][i]["additional_cover_description"],
            additional_cover_status:
              excelData["Sheet1"][i]["additional_cover_status"],
          });
          await additional_cover.save();
        }
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  get_additional_covers: async (req, res) => {
    try {
      let query = req.query;
      let page = +query.page;
      let limit = +query.limit
      let name = query.name
      let status = +query.status
      let lob = query.lob
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      const mysort = { additional_cover_label: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            additional_cover_label: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["location"] = {
          $in: userLocation
        }
        if (lob) {
          match["additional_cover_lob"] = mongoose.Types.ObjectId(lob)
        }
        if (status == 0 || status == 1) {
          match["additional_cover_status"] = +status;
        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locations",
            },
          },
          {
            $lookup:
            {
              from: "line_of_businesses",
              localField: "additional_cover_lob",
              foreignField: "_id",
              as: "lob_result"
            }
          },

          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          }

        ]
        aggregate.push({
          $facet: facet
        })
        let data = await Additional_cover.aggregate(aggregate);
        if (!data[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: data[0]?.data, total: data[0]?.totalCount[0]?.total });


      } else {
        const data = await Additional_cover.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locations",
            },
          },
          {
            $lookup:
            {
              from: "line_of_businesses",
              localField: "additional_cover_lob",
              foreignField: "_id",
              as: "lob_result"
            }
          }
        ]);
        res.json({ status: 200, message: "Data Found", data: data });
      }

    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },

  get_additional_cover: async (req, res) => {
    try {
      const id = req.params.id;
      const type = req.params.type;
      if (type == "motor") {
        lob_id = "6418643bf42eaf5ba1c9e0ef";
      }
      if (type == "travel") {
        lob_id = "6418645df42eaf5ba1c9e0f6";
      }
      if (type == "yacht") {
        lob_id = "641bf0bbcbfce023c8c76739";
      }
      if (type == "home") {
        lob_id = "641bf0a2cbfce023c8c76724";
      }
      if (type == "medical") {
        lob_id = "641bf214cbfce023c8c76762";
      }

      const result = await Additional_cover.find({
        additional_cover_lob: mongoose.Types.ObjectId(lob_id),
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_additional_coverbyid: async (req, res) => {
    try {

      const result = await Additional_cover.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.ParamValue),
          }
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "additional_cover_lob",
            foreignField: "_id",
            as: "lob_result"

          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "locations",
          },
        },

      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_additional_cover: async (req, res) => {
    try {
      const lobs = req.body.additional_cover_lob;
      const locations = req.body.additional_cover_loc;
      const lobids = lobs.map((val) => mongoose.Types.ObjectId(val));
      const locids = locations.map((val) => mongoose.Types.ObjectId(val));
      const result = await Additional_cover.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            additional_cover_label: req.body.additional_cover_label,
            additional_cover_description: req.body.additional_cover_description,
            location: locids,
            additional_cover_lob: lobids,
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_additional_cover_status: async (req, res) => {
    try {
      const result = await Additional_cover.findOneAndUpdate(
        { _id: req.body.ParamValue },
        { $set: { additional_cover_status: req.body.additional_cover_status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_body_type_list: async (req, res) => {
    try {
      const body_type = await body_type_model.find({ body_type_status: 1 });
      res.json({ status: 200, message: "Data Found", data: body_type });
    } catch (error) {
      res.send(error);
    }
  },

  get_nationality: async (req, res) => {
    try {
      const result = await Nationality.find().sort({ nationality_name: 1 });
      const count = await Nationality.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  // getbodytype: async (req, res) =>
  // {
  //     try
  //     {

  //         const result = await body_type_model.find({body_type_status:1});
  //         if (result != null)
  //         {
  //             console.log(result)
  //             res.json({ status: 200, message: "Data Found", data: result});
  //         }
  //         else
  //         {
  //             res.json({ status: 400, message: "Data Not Found" });
  //         }
  //     }
  //     catch (err)
  //     {
  //         res.send(err)
  //     }
  // },

  modelmotor: async (req, res) => {
    try {
      const make_motor_id = req.params.id;
      const result = await motor_model.find({
        motor_model_make_id: mongoose.Types.ObjectId(make_motor_id),
        motor_model_status: 1,
      });
      res.json({ status: 200, message: "Data Found", data: result });
    } catch (error) {
      res.send(error);
    }
  },

  motormodel: async (req, res) => {
    try {
      const model_motor_id = req.params.id;
      const result = await MotorModelDetails.find({
        motor_model_detail_model_id: mongoose.Types.ObjectId(model_motor_id),
        motor_model_detail_status: 1,
      });
      res.json({ status: 200, message: "Data Found", data: result });
    } catch (error) {
      res.send(error);
    }
  },

  addblacklistedvehicle: async (req, res) => {
    const blacklisted_vehicle = new Black_list_vehicle({
      companyid: req.body.companyid,
      make_motor_id: req.body.make_motor,
      model_motor_id: req.body.model_motor,
      motor_model_detail_id: req.body.motor_model_details_id,
    });
    try {
      const result = await blacklisted_vehicle.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getblacklistedvehicle: async (req, res) => {
    try {
      const page = req.params.page;
      const limit = req.params.limit;
      const company_id = mongoose.Types.ObjectId(req.params.company_id);

      console.log(company_id, "company_id")
      console.log(page, "page")
      console.log(limit, "limit")


      const result = await Black_list_vehicle.aggregate([
        {
          $match: {
            companyid: company_id,
          },
        },
        {
          $lookup: {
            from: "make_motors",
            localField: "make_motor_id",
            foreignField: "_id",
            as: "make_motor",
          },
        },
        {
          $lookup: {
            from: "motor_models",
            localField: "model_motor_id",
            foreignField: "_id",
            as: "model_motor",
          },
        },
        {
          $lookup: {
            from: "motor_model_details",
            localField: "motor_model_detail_id",
            foreignField: "_id",
            as: "motor_model_detail",
          },
        },
        {
          $lookup: {
            from: "body_types",
            localField: "bodyTypeId",
            foreignField: "_id",
            as: "body_type",
          },
        },
        // {
        //   $project: {
        //     "make_motor.make_motor_name": 1,
        //     "model_motor.motor_model_name": 1,
        //     "motor_model_detail.motor_model_detail_name": 1,
        //     "body_type.body_type_name": 1,
        //   },
        // },
      ])
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
      const count = await Black_list_vehicle.find({
        companyid: company_id,
      }).countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  deleteblacklistedvehicle: async (req, res) => {
    try {
      const result = await Black_list_vehicle.findByIdAndDelete(req.params.id);
      if (result != null) {
        res.json({ status: 200, message: "Deleted Successfully!" });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  stafflist: async (req, res) => {
    try {
      const notEqualId = "64622470b201a6f07b2dff22";
      const notEqualId1 = "646224deb201a6f07b2dff32";
      const result = await Admin_model.find({
        usertype: { $nin: [notEqualId, notEqualId1] },
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  assignStaff: async (req, res) => {
    try {
      const staff_id = req.params.id;
      let payload = req.body;
      if (payload?.assignSalesAdvisor?.length) {
        payload["assignSalesAdvisor"] = payload?.assignSalesAdvisor?.map(
          (Data) => mongoose.Types.ObjectId(Data)
        );
      }
      if (payload?.assignPolicyIssuer?.length) {
        payload["assignPolicyIssuer"] = payload?.assignPolicyIssuer?.map(
          (Data) => mongoose.Types.ObjectId(Data)
        );
      }
      if (payload?.assignDacumentChaser?.length) {
        payload["assignDacumentChaser"] = payload?.assignDacumentChaser?.map(
          (Data) => mongoose.Types.ObjectId(Data)
        );
      }
      const staff_data = await Admin_model.findByIdAndUpdate(staff_id, payload);
      console.log({ payload });
      if (!staff_data) {
        return res
          .status(404)
          .json({ status: 400, message: "Staff Not Assigned Successfully!" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Staff Assigned Successfully!" });
    } catch (error) {
      console.log(error);
    }
  },

  getTravelType: async (req, res) => {
    try {
      const result = await Travel.find({ travel_type_status: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getTravelInsuranceFor: async (req, res) => {
    try {
      const result = await Travel_insurance.find({
        travel_insurance_for_status: 1,
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getCountryList: async (req, res) => {
    try {
      const result = await Country.find().sort({ country_name: 1 });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  travelplantype: async (req, res) => {
    try {
      const result = await Travel_plan_type.find();
      res.json({ status: 200, message: "Data Found", data: result });
    } catch (error) {
      res.send(error);
    }
  },

  travelregion: async (req, res) => {
    try {
      const result = await Travel_region_list.find({
        travel_region_status: 1,
      });
      res.json({ status: 200, message: "Data Found", data: result });
    } catch (error) {
      res.send(error);
    }
  },

  travelcovertype: async (req, res) => {
    try {
      const result = await Travel_cover_type_list.find({
        travel_cover_type_status: 1,
      });
      return res.json({ status: 200, message: "Data Found", data: result });
    } catch (error) {
      return res.send(error);
    }
  },

  add_Documents_Type: async (req, res) => {
    try {
      console.log(req.body, "req.body");
      let payload = req.body;
      let payloadObj = {}
      if (payload?.vehicle_specification) {
        payload["vehicle_specification"] = payload.vehicle_specification.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.policy_type) {
        payload["policy_type"] = payload.policy_type.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.document_lob) {
        payload["document_lob"] = [mongoose.Types.ObjectId(payload?.document_lob)]
      }
      if (payload?.document_location) {
        payload["document_location"] = payload.document_location.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.visaType) {
        payload["visaType"] = payload.visaType.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.document_category.length) {
        payload["group_medical_document_category"] = payload.document_category.map((val) => mongoose.Types.ObjectId(val.value))
      }

      const documenttype = await Documents.create(payload);

      if (!documenttype) {
        res.json({
          status: 400,
          message: "data not Added ",
          data: {},
        });
      }
      res.json({
        status: 200,
        message: "Added Successfully!",
        data: documenttype,
      });
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  get_Documents_Type: async (req, res) => {
    const page = +req.query.page ? +req.query.page : 1;
    const limit = +req.query.limit ? +req.query.limit : 10;
    const lobtype = req.query.lob;
    let mysort = { document_timestamp: -1 };
    let match = {}
    if (lobtype) {
      match["document_lob"] = mongoose.Types.ObjectId(lobtype)
    }
    try {
      const result = await Documents.aggregate([{
        $facet: {
          data: [
            {
              $match: match,
            },
            {
              $lookup: {
                from: "line_of_businesses",
                localField: "document_lob",
                foreignField: "_id",
                as: "document_lob",
              },
            },
            {
              $lookup: {
                from: "locations",
                localField: "document_location",
                foreignField: "_id",
                as: "document_location",
              },
            },
            {
              $skip: (page - 1) * limit
            },
            {
              $limit: limit
            },
            {
              $sort: mysort
            }
          ],
          count: [
            {
              $match: match,
            },
            { $count: "total" }
          ]
        }
      }])

      // const count = await Documents.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result[0]?.data,
          total: result[0]?.count[0]?.total,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  get_Documents_list: async (req, res) => {
    try {
      const result = await Documents.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Documents_Type_byid: async (req, res) => {
    try {
      // const result = await Documents.findOne({ _id: req.body.ParamValue });
      const result = await Documents.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.ParamValue),
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "document_lob",
            foreignField: "_id",
            as: "document_lob",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "document_location",
            foreignField: "_id",
            as: "document_location",
          },
        },
        {
          $lookup: {
            from: "policy_types",
            localField: "policy_type",
            foreignField: "_id",
            as: "policy_type",
          },
        },
        {
          $lookup: {
            from: "plan_for_gcc_specs",
            localField: "vehicle_specification",
            foreignField: "_id",
            as: "vehicle_specification",
          },
        },
        {
          $lookup: {
            from: "medical_plan_condition_lists",
            localField: "visaType",
            foreignField: "_id",
            as: "visaType",
          },
        }, {
          $lookup: {
            from: "group_medical_categories",
            localField: 'group_medical_document_category',
            foreignField: "_id",
            as: 'document_category'
          }
        }

      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Documents_Type: async (req, res) => {
    try {
      let payload = req.body;
      let id = payload?.ParamValue
      if (payload?.vehicle_specification) {
        payload["vehicle_specification"] = payload.vehicle_specification.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.policy_type) {
        payload["policy_type"] = payload.policy_type.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.document_lob) {
        payload["document_lob"] = [mongoose.Types.ObjectId(payload?.document_lob)]
      }
      if (payload?.document_location) {
        payload["document_location"] = payload.document_location.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.visaType) {
        payload["visaType"] = payload?.visaType.map((val) => mongoose.Types.ObjectId(val))
      }
      if (payload?.document_category.length) {
        payload["group_medical_document_category"] = payload.document_category.map((val) => mongoose.Types.ObjectId(val.value))
      }
      const result = await Documents.findByIdAndUpdate(
        id,
        {
          $set: payload
        },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  update_document_status: async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    const document = await Documents.findByIdAndUpdate(
      id,
      {
        status: status,
      }
    );
    if (document != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Line Of Business Deactivated Successfully",
          data: document,
        });
      } else {
        res.json({
          status: 200,
          message: "Line Of Business Activated Successfully",
          data: document,
        });
      }
    }
  },

  get_Documents_listbyid: async (req, res) => {
    try {
      console.log(req.body.ParamValue);
      const result = await Documents.find({
        document_lob: mongoose.Types.ObjectId(req.body.ParamValue),
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  add_Reason_Type: async (req, res) => {
    try {
      let loc = req.body?.location?.map((val) => mongoose.Types.ObjectId(val.value));
      const reasontype = new Reason({
        reason_type: req.body?.reason_type,
        location: loc
      });
      await reasontype.save();
      res.json({
        status: 200,
        message: "Added Successfully!",
        data: reasontype,
      });
    } catch (err) {
      res.send(err);
    }
  },

  get_Reason_Type: async (req, res) => {
    const page = +req.params.page;
    const limit = +req.params.limit;
    try {
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      console.log('kkkkkkkkkkkkkkkkkkk', userLocation)
      let match = {}
      match["location"] = {
        $in: userLocation
      }
      let aggregate = [

      ];

      let facet = {};
      facet["total"] = [
        {
          $match: match,
        },
        {
          $count: "total",
        },
      ];
      facet["data"] = [
        {
          $match: match,
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: +limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });
      console.log("kkkkkkkkkkkkkkkkkkdfdfdf", aggregate)
      // let aggregate = {
      //   $facet: {
      //     count: [
      //       {
      //         $count: "total",
      //       },
      //     ],getAllDocumentByLob
      //     data: [getAllDocumentByLob
      //       {getAllDocumentByLob
      //         $lookup: {getAllDocumentByLob
      //           from: "locations",getAllDocumentByLob
      //           localField: "location",
      //           foreignField: "_id",
      //           as: "location",
      //         },
      //       },
      //       {
      //         $skip: (page - 1) * limit,
      //       },
      //       {
      //         $limit: limit,
      //       },
      //     ],
      //   },
      // };
      const result = await Reason.aggregate(aggregate);
      console.log("lllllllllllllllllll", result)
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result[0]?.data,
          total: result[0]?.total[0]?.total
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err)
    }
  },

  get_Reason_Type_list: async (req, res) => {
    try {
      const result = await Reason.aggregate([
        {
          $match: {
            status: 1
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_Reason_Type_byid: async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.body.ParamValue)
      const result = await Reason.aggregate([
        {
          $match: {
            _id: id
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  update_Reason_Type: async (req, res) => {
    try {
      const payload = req.body
      // console.log(payload,">>>>>>>>>>>>>>>>>paylpad")
      let objpayload = {}
      if (payload?.reason_status == 1 || payload?.reason_status == 0) {
        let status = +payload?.reason_status == 1 ? 1 : 0
        objpayload["status"] = status
      }
      if (payload?.location) {
        objpayload["location"] = payload?.location?.map((val) => mongoose.Types.ObjectId(val.value));
      }
      if (payload?.reason_type) {
        objpayload["reason_type"] = payload?.reason_type
      }
      const result = await Reason.findOneAndUpdate(
        { _id: req.body?.ParamValue },
        {
          $set: objpayload,
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getDocumentChaser: async (req, res) => {
    try {
      const ObjectId = require("mongodb").ObjectId;

      const EqualId = "6462250eb201a6f07b2dff3a";

      const result = await Admin_model.aggregate([
        {
          $match: {
            usertype: { $eq: ObjectId(EqualId) },
          },
        },
        {
          $lookup: {
            from: "usertypes",
            localField: "usertype",
            foreignField: "_id",
            as: "usertype",
          },
        },
      ]).exec();

      const count = await Admin_model.find({
        usertype: { $eq: ObjectId(EqualId) },
      }).countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getPolicyIssuer: async (req, res) => {
    try {
      const ObjectId = require("mongodb").ObjectId;

      const EqualId = "64622526b201a6f07b2dff3e";

      const result = await Admin_model.aggregate([
        {
          $match: {
            usertype: { $eq: ObjectId(EqualId) },
          },
        },
        {
          $lookup: {
            from: "usertypes",
            localField: "usertype",
            foreignField: "_id",
            as: "usertype",
          },
        },
      ]).exec();

      const count = await Admin_model.find({
        usertype: { $eq: ObjectId(EqualId) },
      }).countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getMultiStaff: async (req, res) => {
    try {
      const ObjectId = require("mongodb").ObjectId;

      const notEqualId = "6413027bafc5c401dfc92f18";

      const result = await Admin_model.aggregate([
        {
          $match: {
            _id: { $ne: ObjectId(notEqualId) },
          },
        },
        {
          $lookup: {
            from: "usertypes",
            localField: "usertype",
            foreignField: "_id",
            as: "usertype",
          },
        },
      ]).exec();

      const count = await Admin_model.find({
        _id: { $ne: ObjectId(notEqualId) },
      }).countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  get_staff_base_usertype: async (req, res) => {
    try {
      const usertype = req.body.user_type;
      const result = await Admin_model.aggregate([
        {
          $match: {
            usertype: mongoose.Types.ObjectId(usertype),
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        },
      ]).exec();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getSupervisorMultiStaff: async (req, res) => {
    try {
      const result = await Admin_model.aggregate([
        {
          $lookup: {
            from: "usertypes",
            localField: "usertype",
            foreignField: "_id",
            as: "usertype",
          },
        },
      ]).exec();

      const count = await Admin_model.find().countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getHome_Plan_Type: async (req, res) => {
    try {
      const result = await home_plan_type.find();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_all_additional_cover: async (req, res) => {
    try {
      let allCovers;
      allCovers = await Additional_cover.aggregate([
        {
          $match: {},
        },

        {
          $project: {
            additional_cover_label: 1,
          },
        },
      ]);
      if (!allCovers.length) {
        return res
          .status(404)
          .json({ status: "404", message: "Data not found", data: [] });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Find Successfully !",
        data: allCovers,
      });
    } catch (err) {
      console.log(err);
    }
  },
  get_not_covered: async (req, res) => {
    try {
      let coveredArray = req.body.coveredId;
      let newCoveredArray = [];
      for (let i = 0; i < coveredArray.length; i++) {
        newCoveredArray.push(mongoose.Types.ObjectId(coveredArray[i]));
      }
      let notCoveredData = await Standard_cover.aggregate([
        {
          $match: {
            _id: {
              $not: {
                $in: newCoveredArray,
              },
            },
            standard_cover_lob: "6418643bf42eaf5ba1c9e0ef",
          },
        },
        {
          $project: {
            standard_cover_label: 1,
            _id: 0,
          },
        },
      ]);
      if (!notCoveredData.length) {
        return res
          .status(404)
          .json({ status: "404", message: "Data not found", data: [] });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Find Successfully !",
        data: notCoveredData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  add_table_benefis: async (req, res) => {

    try {
      const MedBenefit = req.body;
      console.log(MedBenefit, ">>>>>>>>>>>>>>>>data")
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < MedBenefit.length; i++) {
        let medicalBenefit = await utils.toUpperCase(MedBenefit[i]?.feature);
        const benefit_in_db = await TableBenefits.find({
          table_benefit: medicalBenefit,
        });
        if (benefit_in_db.length > 0) {
          existArray.push(benefit_in_db);
          count++;
        } else {
          const table_benefis_dt = new TableBenefits({
            table_benefit: medicalBenefit,
            table_benefit_description: MedBenefit[i]?.description,
          });

          const result = await table_benefis_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Medical Benefit Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Medical Benefit already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Medical Benefit Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  getTableBenefits: async (req, res) => {
    try {
      const page = +req.params.page;
      const limit = +req.params.limit;
      if (page && limit) {
        const result = await TableBenefits.find()
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const count = await TableBenefits.countDocuments();
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        const result = await TableBenefits.find()
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  get_table_benefit_byId: async (req, res) => {
    try {
      const result = await TableBenefits.findOne({ _id: req.body.ParamValue });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_benefits: async (req, res) => {
    try {
      const result = await TableBenefits.findOneAndUpdate(
        { _id: req.body.tableBenefitsId },
        {
          $set: {
            table_benefit: req.body.benefits_label,
            table_benefit_description: req.body.benefits_description,
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_benefits_table_status: async (req, res) => {
    try {
      const result = await TableBenefits.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { table_benefit_status: req.body.table_benefit_status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_benefits_table_excel: async (req, res) => {
    try {
      if (!req.file || !req.file.filename) {
        res.status(400).json("No File");
      } else {
        const file = req.file.filename;
        const excelData = excelToJson({
          sourceFile: `publicfiles/${file}`,
          header: {
            rows: 1,
          },
          columnToKey: {
            "*": "{{columnHeader}}",
          },
        });

        fs.unlinkSync(`publicfiles/${file}`);

        const sheetName = Object.keys(excelData)[0];
        const rows = excelData[sheetName];

        for (let i = 0; i < rows.length; i++) {
          const table_benefits_dt = new TableBenefits({
            table_benefit: rows[i]["Feature"],
            table_benefit_description: rows[i]["Description"],
            table_benefit_status: rows[i]["Status"],
          });
          await table_benefits_dt.save();
        }
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //
  get_medical_benefits: async (req, res) => {
    try {
      // const id = req.params.id;
      let plan_dt;

      plan_dt = await TableBenefits.find();

      if (plan_dt != null) {
        // const benefits = plan_dt.medical_benefits;

        res.json({ status: 200, message: "Data Found", data: plan_dt });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  add_standard_Underwriting_condition: async (req, res) => {

    try {
      const stdCondition = req.body;
      console.log(stdCondition, ">>>>>>>>>>>>>>>>data")
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < stdCondition.length; i++) {
        let StandardCondition = await utils.toUpperCase(stdCondition[i]?.feature);
        const condition_in_db = await StandardUnderwritingCond.find({
          feature: StandardCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          const locationarr = stdCondition[i]?.location?.map((val) => mongoose.Types.ObjectId(val.value));
          const standard_condition_dt = new StandardUnderwritingCond({
            feature: StandardCondition,
            description: stdCondition[i]?.description,
            location: locationarr
          });
          const result = await standard_condition_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Standard Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Standard Condition  already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Standard Condition Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  get_standard_Underwriting_condition: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      if (page && limit) {
        const result = await StandardUnderwritingCond.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ]);
        const count = await StandardUnderwritingCond.countDocuments();
        return res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        const result = await StandardUnderwritingCond.find()
        return res.json({
          status: 200,
          message: "Data Found",
          data: result,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  get_standard_Underwriting_condition_byId: async (req, res) => {
    console.log(req.body.ParamValue)
    try {
      const result = await StandardUnderwritingCond.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.ParamValue),
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_standard_Underwriting_condition: async (req, res) => {
    try {
      const locationarr = req.body?.location?.map((val) => mongoose.Types.ObjectId(val.value));
      const result = await StandardUnderwritingCond.findOneAndUpdate(
        { _id: req.body.standardConditionId },
        {
          $set: {
            feature: req.body.standard_label,
            description: req.body.description,
            location: locationarr
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_standard_condition_status: async (req, res) => {
    try {
      const result = await StandardUnderwritingCond.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { status: req.body.status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_standard_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        data = await StandardUnderwritingCond.findOneAndUpdate(
          {
            feature: await typeConversion(
              xlData[i]?.Feature
            ),
          },
          {
            description: await typeConversion(
              xlData[i]?.Description
            ),
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
      ///////////////////////
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get_standard_conditions: async (req, res) => {
    try {
      let plan_dt;

      plan_dt = await StandardUnderwritingCond.aggregate([
        {
          $match: {
            status: 1,
          },
        }
      ]);

      if (plan_dt != null) {
        res.json({ status: 200, message: "Data Found", data: plan_dt });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  //
  add_Additional_Underwriting_condition: async (req, res) => {
    try {
      const stdCondition = req.body;
      console.log(stdCondition, ">>>>>>>>>>>>>>>>data")
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < stdCondition.length; i++) {
        let StandardCondition = await utils.toUpperCase(stdCondition[i]?.feature);
        const condition_in_db = await AdditionalUnderwritingCond.find({
          feature: StandardCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          const standard_condition_dt = new AdditionalUnderwritingCond({
            feature: StandardCondition,
            description: stdCondition[i]?.description,
          });
          const result = await standard_condition_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Additional Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Additional Condition  already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Additional Condition Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  get_Additional_Underwriting_condition: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      console.log("page", +req.query.page)
      console.log("limit", +req.query.limit)
      if (page && limit) {
        const result = await AdditionalUnderwritingCond.find()
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await AdditionalUnderwritingCond.countDocuments();
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: result.length,
        });
      } else {
        const result = await AdditionalUnderwritingCond.find()
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  get_Additional_Underwriting_condition_byId: async (req, res) => {
    try {
      const result = await AdditionalUnderwritingCond.findOne({
        _id: req.body.ParamValue,
      });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_Additional_Underwriting_condition: async (req, res) => {
    try {
      const result = await AdditionalUnderwritingCond.findOneAndUpdate(
        { _id: req.body.additionalConditionId },
        {
          $set: {
            feature: req.body.additional_label,
            description: req.body.description,
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_Additional_condition_status: async (req, res) => {
    try {
      const result = await AdditionalUnderwritingCond.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { status: req.body.status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_Additional_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        data = await AdditionalUnderwritingCond.findOneAndUpdate(
          {
            feature: await typeConversion(
              xlData[i]?.Feature
            ),
          },
          {
            description: await typeConversion(
              xlData[i]?.Description
            ),
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
      ////////

    } catch (err) {
      res.status(500).json(err);
    }
  },
  get_Additional_conditions: async (req, res) => {
    try {
      let plan_dt;

      plan_dt = await AdditionalUnderwritingCond.find();

      if (plan_dt != null) {
        res.json({ status: 200, message: "Data Found", data: plan_dt });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },

  //

  add_Underwriting_condition: async (req, res) => {
    try {
      const stdCondition = req.body;
      console.log(stdCondition, ">>>>>>>>>>>>>>>>data")
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < stdCondition.length; i++) {
        let StandardCondition = stdCondition[i]?.condition;
        const condition_in_db = await UnderwritingConditions.find({
          condition: StandardCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          const LocationArr = stdCondition[i].location?.map((val) => mongoose.Types.ObjectId(val.value))
          const standard_condition_dt = new UnderwritingConditions({
            condition: StandardCondition,
            location: LocationArr
          });
          const result = await standard_condition_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Underwriting Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Underwriting Condition  already exist`,
        });
      } else {

        return res.json({
          status: 400,
          message: "Underwriting Condition Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  get_Underwriting_condition: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      console.log(page, limit, "page and limitttt")
      if (page && limit) {
        const result = await UnderwritingConditions.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location"
            }
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ]);

        if (result) {
          const count = await UnderwritingConditions.countDocuments();
          return res.json({
            status: 200,
            message: "Data Found",
            data: result,
            total: count,
          });
        } else {
          return res.json({
            status: 400,
            message: "Data Not Found",
          });

        }
      } else {
        const result = await UnderwritingConditions.find()
        return res.json({
          status: 200,
          message: "Data Found",
          data: result,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  get_Underwriting_condition_byId: async (req, res) => {
    try {
      const result = await UnderwritingConditions.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.ParamValue)
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location"
          }
        }]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_Underwriting_condition: async (req, res) => {
    try {
      const locationarr = req.body?.location?.map((val) => mongoose.Types.ObjectId(val.value));
      const result = await UnderwritingConditions.findOneAndUpdate(
        { _id: req.body.UnderwringConditionId },
        {
          $set: {
            condition: req.body.underwriting_label,
            location: locationarr
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_Underwriting_condition_status: async (req, res) => {
    try {
      const result = await UnderwritingConditions.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { status: req.body.status } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  read_underwriting_condition_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        data = await UnderwritingConditions.findOneAndUpdate(
          {
            condition: await typeConversion(
              xlData[i]?.Condition
            ),
          },
          {
            condition: await typeConversion(
              xlData[i]?.Condition
            ),
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get_underwriting_conditions: async (req, res) => {
    try {
      let plan_dt;

      plan_dt = await UnderwritingConditions.find();

      if (plan_dt != null) {
        res.json({ status: 200, message: "Data Found", data: plan_dt });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getCountrybyid: async (req, res) => {
    try {
      const result = await Country.findById({ _id: req.body.ParamValue });
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  addTermsCondition: async (req, res) => {
    try {
      let payload = req.body;
      let termsConditionDetails = await termsConditionsModels.create(payload);
      if (!termsConditionDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Saved ", data: {} });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Saved Successfully !!",
        data: termsConditionDetails,
      });
    } catch (err) {
      console.log(`Error Occured in adding Terms And Conditons: ${err}`);
    }
  },
  getTermsCondition: async (req, res) => {
    try {
      let insurancType = req.query.insuranceType;
      console.log("kkkkkkkkkkkkkkkkkkk", insurancType)
      let lob;
      if (
        ("Motor" !== insurancType) &&
        ("Travel" !== insurancType) &&
        ("Home" !== insurancType) &&
        ("Medical" !== insurancType) &&
        ("Yatch" !== insurancType)
      ) {
        console.log("jjjjjjjjjjjjjjjjjjjjjjj", insurancType)
        return res.status(404).json({
          status: 404,
          message: "Insurance Type is Required ",
          data: {},
        });
      }
      if (insurancType == "Motor") {
        lob = "6418643bf42eaf5ba1c9e0ef";
      } else if (insurancType == "Home") {
        lob = "641bf0a2cbfce023c8c76724";
      } else if (insurancType == "Travel") {
        lob = "6418645df42eaf5ba1c9e0f6";
      } else if (insurancType == "Yatch") {
        lob = "641bf0bbcbfce023c8c76739";
      } else if (insurancType == "Medical") {
        lob = "641bf214cbfce023c8c76762";
      }
      console.log("lob", lob);
      let termsConditionDetails = await termsConditionsModels.findOne({
        lob: mongoose.Types.ObjectId(lob),
      });
      if (!termsConditionDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Found ", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: termsConditionDetails,
      });
    } catch (err) {
      console.log(`Error Occured in Get Terms And Conditons: ${err}`);
    }
  },
  updateTermsCondition: async (req, res) => {
    try {
      let id = req.query.id;
      let payload = req.body;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required ", data: {} });
      }
      let termsConditionDetails = await termsConditionsModels.findByIdAndUpdate(
        id,
        payload
      );
      if (!termsConditionDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Updated  ", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Update Successfully !!",
        data: termsConditionDetails,
      });
    } catch (err) {
      console.log(`Error Occured in Update Terms And Conditons: ${err}`);
    }
  },
  addComplaint: async (req, res) => {
    try {
      let payloadobj = req.body;
      let payload = {
        phone_number: payloadobj.phone_number,
        whatsApp_number: payloadobj.phone_number,
        email: payloadobj.email,
        name: payloadobj.name,
        query: payloadobj.query,
      }
      let userexist = await Admin.findOne({ email: payload.email })
      if (userexist) {
        if (payload.lob) {
          payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
        }
        let complaintDetails;
        complaintDetails = await ComplaintModels.create(payload);
        complaintDetails = await complaintDetails.save();
        if (!complaintDetails) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Saved", data: {} });
        }
        let emaildata = {}
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'recieve query exists'}`, requestOptions)
          .then(data => {
            if (data.message == 'Email template fetched') {
              emaildata = data.data
            } else {
              emaildata.subject = 'Query Recieved'
              emaildata.template_id = '6662a9c532b26165203cce1b'
              emaildata.body = `<p>'Dear Client_Name,\n\nYour Query has been received.\n\nWe will Update you soon.\n\nThank you for reaching out to us'</p>`
            }
          })
        let repw = 'Client_Name'
        let neww = payload.name
        let newtext = emaildata?.body?.replace(new RegExp(repw, 'g'), neww)
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: [payload.email],
          cc: [],
          bcc: [],
          text: newtext,
          subject: emaildata.subject,
          attachments: [],
          template_id: emaildata.template_id
        };

        sendServerEmail(emailPayload);
        return res
          .status(201)
          .json({
            status: 201,
            message: "Query Sent Successfully !!",
            data: complaintDetails,
          });
      } else {
        const num = (Math.floor(Math.random() * 900000) + 100000).toString();
        customer_data = new Admin(
          {
            name: payload.name,
            mobile: payload.phone_number,
            email: payload.email,
            password: await md5(num),
          }
        );
        console.log(customer_data, num, ">>>>>>>>>>>>>>>>>>>>>>>")
        customer_data = await customer_data.save();
        if (customer_data) {
          let complaintDetails = new ComplaintModels(payload);
          complaintDetails = await complaintDetails.save();

          let emaildata = {}
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'recieve query new'}`, requestOptions)
            .then(data => {
              if (data.message == 'Email template fetched') {
                emaildata = data.data
              } else {
                emaildata.subject = 'Query Recieved'
                emaildata.template_id = '6662a9c532b26165203cce1b'
                emaildata.body = `<p>Dear ${payload.name},
                        \n\nYour Query has been received.
                        \n\n An account has been created for you with the following credentials:
                        \nEmail: ${payload.email}\nPassword: ${num} 
                        \n\nThank you for reaching out to us.</p>`
              }
            })
          let repw = 'Client_Name'
          let client_pass = "client_password"
          let client_email = "client_email"
          let neww = payload.name
          let newtext = emaildata?.body?.replace(new RegExp(repw, 'g'), neww)
          newtext = emaildata?.body?.replace(new RegExp(client_pass, 'g'), num)
          newtext = emaildata?.body?.replace(new RegExp(client_email, 'g'), payload.email)
          let emailPayload = {
            sender: 'dev@handsintechnology.com',
            receivers: [payload.email],
            cc: [],
            bcc: [],
            text: newtext,
            subject: emaildata.subject,
            attachments: [],
            template_id: emaildata.template_id
          };
          sendServerEmail(emailPayload);
          return res.status(201).json({
            status: 201,
            message: "Query Sent successfully",
            data: {},
            type: 'success'
          });
        } else {
          return res.status(500).json({
            status: 500, message: 'Something Went Wrong', data: {}, type: 'error'
          })
        }
      }
    } catch (err) {
      console.log(`Error Occured in Adding Complaint Details: ${err}`);
    }
  },
  getComplaints: async (req, res) => {
    const page = +req.params.page;
    const limit = +req.params.limit;
    try {
      let aggregate = {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {},
            },
            {
              $sort: {
                createdAt: -1
              },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      };
      let complaintDetails = await ComplaintModels.aggregate([aggregate])

      if (!complaintDetails.length) {
        return res.status(404).json({
          status: 404,
          message: "Data not Found ",
          data: [],
          totalCount: 0,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: complaintDetails,
        total: complaintDetails?.length,
      });
    } catch (err) {
      console.log(`Error Occured in Adding Complaint Details: ${err}`);
    }
  },
  updateComplaints: async (req, res) => {
    try {
      const result = await ComplaintModels.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      console.log(`Error Occured in Adding Complaint Details: ${err}`);
    }
  },

  addSpecialOffer: async (req, res) => {
    try {
      const OfferData_dt = new SpecialOffers(req.body);
      const result = await OfferData_dt.save();
      if (result != null) {
        res.json({
          status: 200,
          message: "Offer Added Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      console.log(error.messge);
      res.json({ status: 500, message: "something went wrong" });
    }
  },
  GetAllSpecialOffers: async (req, res) => {
    try {
      let userId = req.user?._id?.toString();
      let offer_dt;

      offer_dt = await SpecialOffers.aggregate([
        {
          $match: {
            $or: [
              {
                userId: userId,
              },
              {
                userId: [],
              },
            ],
          },
        },
      ]);

      if (offer_dt != null) {
        res.json({ status: 200, message: "Data Found", data: offer_dt });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (error) {
      console.log(error.messge);
      res.json({ status: 500, message: "something went wrong" });
    }
  },
  UpdateSpecialOffer: async (req, res) => {
    try {
      const result = await SpecialOffers.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            userId: req.body.userId,
            policy_type: req.body.policy_type,
            discount_amount: req.body.discount_amount,
            discount_code: req.body.discount_code,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
          },
        },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      console.log(error.messge);
      res.json({ status: 500, message: "something went wrong" });
    }
  },
  DeleteOffer: async (req, res) => {
    try {
      const result = await SpecialOffers.findByIdAndDelete(req.params.offerId);
      if (result != null) {
        res.json({ status: 200, message: "Deleted Successfully!" });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) { }
  },
  addTestimonials: async (req, res) => {
    try {
      let testimonials;
      let paylod = req.body;
      paylod["image"] = [req.file];
      testimonials = await testimonialsModels.create(paylod);
      if (!testimonials) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: testimonials });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Saved successfully !!",
        data: testimonials,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTestimonials: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    console.log(page, limit);
    try {
      const testimonials = await testimonialsModels
        .find()
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
      const count = await testimonialsModels.countDocuments();
      if (!testimonials.length) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Found",
          data: testimonials,
          total: 0,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found successfully !!",
        data: testimonials,
        total: count,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAllTestimonials: async (req, res) => {
    try {
      testimonials = await testimonialsModels.aggregate([
        {
          $match: {
            status: true,
          },
        },
      ]);
      if (!testimonials.length) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Found",
          data: testimonials,
          count: 0,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found successfully !!",
        data: testimonials,
        count: testimonials.length,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTestimonialsById: async (req, res) => {
    try {
      let id = req.body.ParamValue;
      console.log("kkkkkkkkkkkkkkkkk", id)
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      testimonials = await testimonialsModels.findById(id);
      if (!testimonials) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: testimonials });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found successfully !!",
        data: testimonials,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateTestimonials: async (req, res) => {
    try {
      const id = req.body.id;
      const payload = req.body;
      if (req.file) {
        payload["image"] = [req.file];
      } else {
        delete payload["image"];
      }
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      testimonials = await testimonialsModels.findByIdAndUpdate(id, payload);
      if (!testimonials) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Updated",
          data: testimonials,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated successfully !!",
        data: testimonials,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addotherInsurance: async (req, res) => {
    try {
      let insuranceDetials;
      insuranceDetials = await ortherInsuranceModels.create(req.body);
      if (!insuranceDetials) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Saved successfully !!",
        data: insuranceDetials,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getotherInsurance: async (req, res) => {
    try {
      let insuranceDetials;
      let limit = +req.query.limit || 100;
      let page = +req.query.page || 1;
      insuranceDetials = await ortherInsuranceModels.aggregate([
        {
          $match: {},
        },
        {
          $project: {
            insurance_name: 1,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]);
      if (!insuranceDetials.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {}, total: 0 });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found successfully !!",
        data: insuranceDetials,
        total: insuranceDetials.length,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateotherInsurance: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      insuranceDetials = await ortherInsuranceModels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!insuranceDetials) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data updated successfully !!",
        data: insuranceDetials,
      });
    } catch (err) {
      console.log(err);
    }
  },
  GetSpecialOffers: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    console.log(page, limit);
    try {
      let offer_dt;
      // offer_dt = await SpecialOffers.find().skip((page - 1) * limit).limit(limit * 1).exec();
      offer_dt = await SpecialOffers.aggregate([
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "policy_type",
            foreignField: "_id",
            as: "policy_type",
          },
        },
      ])
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
      console.log(offer_dt);
      const total = await SpecialOffers.countDocuments();
      if (offer_dt != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: offer_dt,
          total: total,
        });
      } else {
        res.json({
          status: 400,
          message: "Data Not Found",
          data: [],
          total: 0,
        });
      }
    } catch (error) {
      console.log(error.messge);
      res.json({ status: 500, message: "something went wrong" });
    }
  },
  GetSpecialOffersById: async (req, res) => {
    try {
      const result = await SpecialOffers.findById(req.body.ParamValue);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (error) { }
  },
  addMaternityQuestionnaire: async (req, res) => {
    try {
      // let result = await MaternityQuestionnaireModels.create(req.body);
      const stdCondition = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < stdCondition.length; i++) {
        let StandardCondition = stdCondition[i]?.condition;
        const condition_in_db = await MaternityQuestionnaireModels.find({
          condition: StandardCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          const locationarr = stdCondition[i]?.location?.map((val) => mongoose.Types.ObjectId(val.value))
          const standard_condition_dt = new MaternityQuestionnaireModels({
            condition: StandardCondition,
            location: locationarr
          });
          const result = await standard_condition_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `Maternity Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `Maternity Condition  already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "Maternity Condition Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMaternityQuestionnaire: async (req, res) => {
    try {
      let id = req.query?.id;
      console.log("id", id);
      console.log("req.body", req.body);
      let reqbody = req.body;
      reqbody.location = reqbody.location?.map((val) => mongoose.Types.ObjectId(val))
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await MaternityQuestionnaireModels.findByIdAndUpdate(
        id,
        reqbody,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  read_maternity_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let data;
        data = await MaternityQuestionnaireModels.findOneAndUpdate(
          {
            condition: await typeConversion(
              xlData[i]?.Condition
            ),
          },
          {
            condition: await typeConversion(
              xlData[i]?.Condition
            ),
          },
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch (error) {

    }
  },
  getBuIdMaternityQuestionnaire: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await MaternityQuestionnaireModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        }, {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location"
          }
        }]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMaternityQuestionnaire: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {},
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location"
                }
              },
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        };
        result = await MaternityQuestionnaireModels.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          count: result[0]?.count[0]?.total,
        });
      } else {
        result = await MaternityQuestionnaireModels.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  addMedicalSymptoms: async (req, res) => {
    try {
      let result = await MedicalSymptomsConditions.create(req.body);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Saved Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMedicalSymptoms: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await MedicalSymptomsConditions.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getBYIdMedicalSymptoms: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await MedicalSymptomsConditions.findById(id);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getAllMedicalSymptoms: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      console.log({ page, limit });
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {},
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        };
        result = await MedicalSymptomsConditions.aggregate([aggregate]);
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          count: result[0]?.count[0]?.total,
        });
      }
      result = await MedicalSymptomsConditions.aggregate([
        {
          $match: {
            status: true,
          },
        },
        {
          $project: {
            condition: 1,
          },
        },
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  get_underwriting_conditions: async (req, res) => {
    try {
      let plan_dt;

      plan_dt = await UnderwritingConditions.find();

      if (plan_dt != null) {
        return res.json({ status: 200, message: "Data Found", data: plan_dt });
      } else {
        return res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  getAllUnderwritingConditions: async (req, res) => {
    try {
      let result;
      result = await UnderwritingConditions.aggregate([
        {
          $match: {
            status: 1,
          },
        },
        {
          $project: {
            condition: 1,
          },
        },
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addMotorClaimsYears: async (req, res) => {
    try {
      console.log("req.body", req.body.questions);
      console.log("req.body.year", req.body.year);
      let claimsYearsDetails;
      claimsYearsDetails = new motorCliamsYearsModels(req.body);
      claimsYearsDetails = await claimsYearsDetails.save();
      console.log({ claimsYearsDetails });
      if (!claimsYearsDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Saved Successfully !!",
        data: claimsYearsDetails,
      });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateMotorClaimsYears: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await motorCliamsYearsModels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMotorClaimsYears: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {},
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
              {
                $sort: {
                  questions: 1
                }
              }
            ],
          },
        };
        result = await motorCliamsYearsModels.aggregate([aggregate]);
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          count: result[0]?.count[0]?.total,
        });
      }
      result = await motorCliamsYearsModels.aggregate([
        {
          $match: {
            status: true,
          },
        },
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMotorClaimsYearsById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await motorCliamsYearsModels.findById(id);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getAllClaims: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    try {
      let claimsDtails;
      claimsDtails = await Claims.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "new_leads",
            localField: "new_lead_id",
            foreignField: "_id",
            as: "leadsDetails",
          },
        },
      ])
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
      if (!claimsDtails.length) {
        return res.status(404).json({
          status: 404,
          message: "Claim Not found",
          data: [],
          totalCount: 0,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Claims Find Successfully !!",
        data: claimsDtails,
        totalCount: claimsDtails.length,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAllTermsCondition: async (req, res) => {
    try {
      const page = +req.params.page;
      const limit = +req.params.limit;
      let aggregate = {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {},
            },
            {
              $lookup: {
                from: "line_of_businesses",
                localField: "lob",
                foreignField: "_id",
                as: "lobdetails",
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },

            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      }
      let termsConditionDetails = await termsConditionsModels
        .aggregate([aggregate])
      // .skip((page - 1) * limit)
      // .limit(limit * 1)
      // .exec();
      const count = await termsConditionsModels.countDocuments();
      if (!termsConditionDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Found ", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: termsConditionDetails,
        total: count,
      });
    } catch (err) {
      console.log(`Error Occured in Get Terms And Conditons: ${err}`);
    }
  },
  gettermsconditionbyid: async (req, res) => {
    try {
      let termsConditionDetails = await termsConditionsModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.body.ParamValue),
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lobdetails",
          },
        },
      ]);
      if (!termsConditionDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Found ", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: termsConditionDetails,
      });
    } catch (err) {
      console.log(`Error Occured in Get Terms And Conditons: ${err}`);
    }
  },
  getAllDocumentByLob: async (req, res) => {
    try {
      let query = req.query
      let lob = query?.lob;
      let lobId;
      let match = { status: 1 }
      if (lob === "Motor") {
        match["document_lob"] = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      } else if (lob === "Travel") {
        match["document_lob"] = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
      } else if (lob === "Home") {
        match["document_lob"] = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");

      } else if (lob === "Yacht") {
        match["document_lob"] = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
      } else if (lob === "Medical") {
        match["document_lob"] = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
        if (query?.visTypeId) {
          match["visaType"] = mongoose.Types.ObjectId(query?.visTypeId)
        }
        if (query?.documentFor == "insuer") {
          match["insurrerFor"] = true;
        }
        else if (query?.documentFor == "sponser") {
          match["insurrerFor"] = false;
        }
        // match["documentExpiryDate"] = {
        //   $gte: new Date()
        // }

      }
      else if (lob === "groupMedical") {
        match["document_lob"] = mongoose.Types.ObjectId("658bf04ed4c9b13ffb6ddb8a");
      }
      let motorDocuments = await Documents.aggregate([
        {
          $match: match
        },
      ]);
      if (!motorDocuments.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not Found ", data: [] });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: motorDocuments,
      });
    } catch (err) {
      console.log(`Error Occured in Get Terms And Conditons: ${err}`);
    }
  },
  getActiveBusinessType: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const mysort = { business_type_name: 1 };
      let data = await BusinessType.aggregate([
        {
          $match: {
            business_type_status: 1,
          },
        },
        {
          $project: {
            business_type_name: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: [] });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not Found", data: data });
    } catch (err) {
      res.send(err);
    }
  },
  deleteMotorMaster: async (req, res) => {
    try {
      let query = req.query;
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "motor") {
        result = await make_motor_model.findByIdAndDelete(query.id);
      } else if (query?.type === "model") {
        result = await motor_model.findByIdAndDelete(query.id);
      } else if (query?.type === "modelDetails") {
        result = await MotorModelDetails.findByIdAndDelete(query.id);
      } else if (query?.type === "BodyType") {
        result = await bodyTypeModels.findByIdAndDelete(query.id);
      } else if (query?.type === "areaOfResitration") {
        result = await area_of_registration_model.findByIdAndDelete(query.id);
      } else if (query?.type === "repairType") {
        result = await RepairType.findByIdAndDelete(query.id);
      } else if (query?.type === "businessType") {
        result = await BusinessType.findByIdAndDelete(query.id);
      } else if (query?.type === "plan") {
        result = await motor_plan_model.findByIdAndDelete(query.id);
      } else if (query?.type === "year") {
        result = await moterClamYears.findByIdAndDelete(query.id);
      } else if (query?.type === "standardCover") {
        result = await Standard_cover.findByIdAndDelete(query.id);
      } else if (query?.type === "additionalCover") {
        result = await Additional_cover.findByIdAndDelete(query.id);
      } else if (query?.type === "vat") {
        result = await vatModel.findByIdAndDelete(query.id);
      }
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleteed", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteTravelMaster: async (req, res) => {
    try {
      let query = req.query;
      console.log(query);
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "travelinsurance") {
        result = await Travel_insurance.findByIdAndDelete(query.id);
      } else if (query?.type === "traveltype") {
        result = await Travel.findByIdAndDelete(query.id);
      } else if (query?.type === "travelplantype") {
        result = await Travel_plan_type.findByIdAndDelete(query.id);
      } else if (query?.type === "travelregion") {
        result = await Travel_region_list.findByIdAndDelete(query.id);
      } else if (query?.type === "travelcover") {
        result = await Travel_cover_type_list.findByIdAndDelete(query.id);
      } else if (query?.type === "deleteTravelPlan") {
        result = await travel_plan_model.findByIdAndDelete(query.id);
      }
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleteed", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  add_vat: async (req, res) => {
    const locations = req.body?.vat_location;
    const lobs = req.body?.vat_lob;
    // const lobArr = lobs.map((val)=>mongoose.Types.ObjectId(val))
    const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
    const vat = new vatModel({
      vat_percentage: req.body?.vat_percentage,
      vat_lob: mongoose.Types.ObjectId(lobs),
      vat_location: locArr,
    });
    try {
      const result = await vat.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_vat: async (req, res) => {
    const page = req.query?.page;
    const limit = req.query?.limit;
    let userData = req.user
    let userLocation = userData?.location
    userLocation = userLocation.map((obj) => mongoose.Types.ObjectId(obj?.loc_id))
    // console.log(page,"  ...",limit)
    const mysort = { vat_timestamp: -1 };
    try {
      let result = await vatModel.aggregate([
        {
          $match: {
            vat_location: {
              $in: userLocation
            }
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "vat_location",
            foreignField: "_id",
            as: "locations",
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "vat_lob",
            foreignField: "_id",
            as: "vat_lobs",
          },
        },
      ]).skip((page - 1) * limit).sort(mysort).limit(limit * 1).exec();
      const count = await vatModel.countDocuments();
      if (result != null) {
        res.json({
          status: 200,
          message: "Data Found",
          data: result,
          total: count,
        });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_vat_status: async (req, res) => {
    try {
      const status = req.body?.vat_status
      let id = req.body?.id
      let newdetails = await vatModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            vat_status: status
          }
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_vat_detailsbyid: async (req, res) => {
    try {
      const result = await vatModel.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(req.body.ParamValue) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "vat_location",
            foreignField: "_id",
            as: "vat_location",
          },
        },
        // {
        //   $lookup: {
        //     from: "line_of_businesses",
        //     localField: "vat_lob",
        //     foreignField: "_id",
        //     as: "vat_lobs",
        //   },
        // },
      ])

      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  update_vat_details: async (req, res) => {
    try {
      const locations = req.body?.vat_location;
      const lobs = req.body?.vat_lob;
      // const lobArr = lobs.map((val)=>mongoose.Types.ObjectId(val))
      const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
      let newdetails = await vatModel.findOneAndUpdate(
        { _id: req.body.ParamValue },
        {
          $set: {
            vat_percentage: req.body?.vat_percentage,
            vat_location: locArr,
            vat_lob: mongoose.Types.ObjectId(lobs),

          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  deleteHomeMaster: async (req, res) => {
    try {
      let query = req.query;
      console.log(query);
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "homepropertytype") {
        result = await home_property_type.findByIdAndDelete(query.id);
      } else if (query?.type === "homeplantype") {
        result = await home_plan_type.findByIdAndDelete(query.id);
      } else if (query?.type === "homeownershiptype") {
        result = await home_owner_type.findByIdAndDelete(query.id);
      } else if (query?.type === "homecondition") {
        result = await home_condition.findByIdAndDelete(query.id);
      } else if (query?.type === "homeplan") {
        result = await home_plan_model.findByIdAndDelete(query.id);
      } else if (query?.type === "HomeAdditionalCondition") {
        result = await homeAdditionalConditionModels.findByIdAndDelete(query.id);
      }
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleteed", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteYachtMaster: async (req, res) => {
    try {
      let query = req.query;
      console.log(query);
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "yachtbodytype") {
        result = await Yacht_Body_type.findByIdAndDelete(query.id);
      } else if (query?.type === "yachthullmaterial") {
        result = await Yacht_hull_material.findByIdAndDelete(query.id);
      } else if (query?.type === "yachthorsepower") {
        result = await Yacht_horsepower_type.findByIdAndDelete(query.id);
      } else if (query?.type === "yachtenginetype") {
        result = await Yacht_Engine_type.findByIdAndDelete(query.id);
      } else if (query?.type === "yachtspeedknots") {
        result = await Yacht_Speed_knots_type.findByIdAndDelete(query.id);
      } else if (query?.type === "yachtconditions") {
        result = await Yacht_Conditions.findByIdAndDelete(query.id);
      } else if (query?.type === "yachtplan") {
        result = await yacht_plan.findByIdAndDelete(query.id);
      }
      else if (query?.type === "yachtYearCode") {
        result = await yachtYearModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "YachtMake") {
        result = await yachtMake.findByIdAndDelete(query.id);
      }
      else if (query?.type === "YatchModel") {
        result = await yachtModel.findByIdAndDelete(query.id);
      }
      else if (query?.type === "YachtEngine") {
        result = await yachtEngine.findByIdAndDelete(query.id);
      } else if (query?.type === "YachtQuestions") {
        result = await yachtQuestions.findByIdAndDelete(query.id);
      }
      else if (query?.type === "boatBreadth") {
        result = await boatBreadthModels.findByIdAndDelete(query.id);
      }
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleteed", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteMedicalMaster: async (req, res) => {
    try {
      let query = req.query;
      console.log(query);
      let result;
      if (!query?.id) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "ID is required", data: {} });
      }
      if (!query?.type) {
        return res
          .status(404)
          .json({ sttaus: 404, message: "Type is required", data: {} });
      }
      if (query?.type === "medicalplan") {
        result = await medicalPlan.findByIdAndDelete(query.id);
      } else if (query?.type === "medicalPlanType") {
        result = await Medical_plan_type.findByIdAndDelete(query.id);
      } else if (query?.type === "emiratesVisa") {
        result = await Medical_visa_country.findByIdAndDelete(query.id);
      } else if (query?.type === "planCondition") {
        result = await Medical_plan_condition.findByIdAndDelete(query.id);
      } else if (query?.type === "salaryRange") {
        result = await Medical_salary_range.findByIdAndDelete(query.id);
      } else if (query?.type === "weightType") {
        result = await Medical_weight_type.findByIdAndDelete(query.id);
      } else if (query?.type === "tableBenefits") {
        result = await TableBenefits.findByIdAndDelete(query.id);
      } else if (query?.type === "standardConditions") {
        result = await StandardUnderwritingCond.findByIdAndDelete(query.id);
      } else if (query?.type === "additionalConditions") {
        result = await AdditionalUnderwritingCond.findByIdAndDelete(query.id);
      } else if (query?.type === "underwritingConditions") {
        result = await UnderwritingConditions.findByIdAndDelete(query.id);
      } else if (query?.type === "maternityConditions") {
        result = await MaternityQuestionnaireModels.findByIdAndDelete(query.id);
      } else if (query?.type === "generalWritingCondition") {
        result = await generalWritingConditionModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "copaymentType") {
        result = await medicalCopaymentTypeModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "medicalbmi") {
        result = await MedicalPlanBMI.findByIdAndDelete(query.id);
      }
      else if (query?.type === "rateCondition") {
        result = await medicalRateMaster.findByIdAndDelete(query.id);
      }
      else if (query?.type === "TPA") {
        result = await medicalTPAModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "Network") {
        result = await medicalNetworkModels.findByIdAndDelete(query.id);
      }
      else if (query?.type === "NetworkList") {
        result = await medicalNetworkListModels.findByIdAndDelete(query.id);
      } else if (query?.type === "medicalLabel") {
        result = await medicalLevelModels.findByIdAndDelete(query.id);
      } else if (query?.type === "actualsalaryBand") {
        result = await ActualSalaryBand.findByIdAndDelete(query.id);
      }
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleteed", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data delete Successfully !",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getBlacklistVehicalData: async (req, res) => {

    try {
      let data = []
      let payload = req.body
      if (payload.make == "Make") {
        data = await make_motor_model.aggregate([
          {
            $match: { make_motor_status: 1 }
          },
          {
            $project: {
              make_motor_name: 1
            }
          }
        ])
      }
      else if (payload?.makeId?.length) {
        makeId = payload?.makeId.map((id) => mongoose.Types.ObjectId(id))
        console.log("lllllllllllllllllllllllll", makeId)
        data = await motor_model.aggregate([
          {
            $match: { motor_model_status: 1, motor_model_make_id: { $in: makeId } }
          },
          {
            $project: {
              motor_model_name: 1
            }
          }
        ])
      }
      else if (payload?.modelId?.length) {
        modelId = payload?.modelId.map((id) => mongoose.Types.ObjectId(id))

        data = await MotorModelDetails.aggregate([
          {
            $match: { motor_model_detail_status: 1, motor_model_detail_model_id: { $in: modelId } }
          },
          {
            $project: {
              motor_model_detail_name: 1
            }
          }
        ])
      }
      if (data.length) {
        return res.status(200).json({ status: 200, message: "data found successfully", data: data })
      }
      return res.status(404).json({ status: 404, message: "data found Found", data: data })
    } catch (err) {
      console.log(err)
    }
  },
  addBlacklistedvehicleData: async (req, res) => {

    try {
      let variantData = []
      let PaylodData = []
      let payload = req.body
      let companyId = payload?.companyid
      let variantId = payload?.variantId
      variantId = variantId?.map((id) => mongoose.Types.ObjectId(id))
      variantData = await MotorModelDetails.aggregate([
        { $match: { _id: { $in: variantId } } }
      ])
      for (let i = 0; i < variantData.length; i++) {
        PaylodData.push({
          make_motor_id: variantData[i]?.motor_model_make_id,
          companyid: companyId,
          model_motor_id: variantData[i]?.motor_model_detail_model_id,
          motor_model_detail_id: variantData[i]?._id,
          bodyTypeId: variantData[i]?.motor_model_detail_body_type,
        })
      }
      let blackListData = await Black_list_vehicle.insertMany(PaylodData)
      if (blackListData.length) {
        return res.status(201).json({ status: 201, message: "data add successfully", data: blackListData })
      }
      return res.status(400).json({ status: 400, message: "data add not", data: [] })
    } catch (err) {
      console.log(err)
    }
  },
  addCompanyBlackList: async (req, res) => {
    try {
      let payload = req.body
      console.log("<><><><>>>>><<<<><><><>", payload)
      // return false;
      // let allreadyBlackList = []
      let companyId = req.query?.companyId
      // let companyData = await companyModel.findById(companyId)
      // allreadyBlackList = companyData?.toObject()?.blackListVehicle
      // allreadyBlackList = allreadyBlackList.map((id) => id?.toString())
      // for (let i = 0; i < payload.length; i++) {
      //   if (allreadyBlackList.includes(payload[i]?.variantId)) {
      //     allreadyBlackList.splice(allreadyBlackList.indexOf(payload[i]?.variantId), 1)
      //   } else {
      //     allreadyBlackList.push(payload[i]?.variantId)
      //   }
      // }
      allreadyBlackList = payload.map((id) => mongoose.Types.ObjectId(id))
      let companydata
      companydata = await companyModel.findByIdAndUpdate(companyId, { blackListVehicle: allreadyBlackList }, { new: true })
      if (companydata) {
        return res.status(200).json({ status: 200, message: "Black List Add Successfully !", data: companydata })
      }
      return res.status(400).json({ status: 400, message: "Black List not Added ", data: {} })

    } catch (err) {
      console.log(err)
    }
  },
  addKatarMakeData: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      let locationArray = []
      let locationData = await location_model.find()
      for (let j = 0; j < locationData.length; j++) {
        locationArray.push(locationData[j]?._id)
      }
      for (let i = 0; i < xlData.length; i++) {
        let makeDtails;

        makeDtails = await make_motor_model.findOneAndUpdate(
          { make_motor_name: await typeConversion(xlData[i]["DESCRIPTION"]) },
          {
            make_motor_name: await typeConversion(xlData[i]["DESCRIPTION"]),
            katarQicCode: xlData[i]["QIC MAKE CODE"],
            katarAutodataCode: xlData[i]["AUTODATA MAKE CODE"],
            make_motor_location: locationArray
          },
          { upsert: true, returnOriginal: false }
        );
        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err)
      res.status(500).json("Somthing Went Rong");
    }
  },
  addKatarMotorModelsData: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[1]]
      );
      let Data33 = []
      // console.log("'''''''''''",xlData);
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      let locationArray = []
      let locationData = await location_model.find()
      for (let j = 0; j < locationData.length; j++) {
        locationArray.push(locationData[j]?._id)
      }
      for (let i = 0; i < xlData.length; i++) {
        let modelPayload = {}
        let makeDtails;
        let modelDetails
        let modelName = await typeConversion(xlData[i]["DESCRIPTION"])
        makeDtails = await make_motor_model.findOne({ katarQicCode: xlData[i]["QIC MAKE CODE"] })
        // if(makeDtails.length){
        //   console.log("///////////////////////////",makeDtails[0]?.katarQicCode,xlData[i]["QIC MAKE CODE"])
        //   if(makeDtails[0]?.katarQicCode == xlData[i]["QIC MAKE CODE"]){
        //     Data33.push(true)
        //   }else{
        //     Data33.push(false)
        //   }
        // }
        modelPayload["motor_model_make_id"] = makeDtails?._id
        modelPayload["motor_model_location"] = locationArray
        modelPayload["qicMakeCode"] = xlData[i]["QIC MAKE CODE"]
        modelPayload["qicModelCode"] = xlData[i]["QIC MODEL CODE"]
        modelPayload["aoutoDataMedelCode"] = xlData[i]["AUTODATA MODEL CODE"]
        modelPayload["motor_model_name"] = modelName


        console.log("................................", modelPayload)

        modelDetails = await motor_model.findOneAndUpdate(
          {
            motor_model_name: modelName
          },

          modelPayload,
          { upsert: true, returnOriginal: false }
        );
        console.log("..............", modelPayload)
        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !", Data33: Data33 });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully ", Data33: Data33 });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("ASome Thing Went Worng");
    }
  },
  addThiredPartyComission: async (req, res) => {
    try {
      let payload = req.body
      let leadId = payload?.leadId
      let lobType = payload?.lobType
      let companyId
      let planId = payload?.planId
      let planDetails
      let businessEntityDiscountRate = 0
      let producerComissionRate = 0
      let businessEntityComissionsRate = 0
      let jdvComissionRate = 0
      let businessEntityDiscountAmount = 0
      let jdvComission = 0
      let producerComission = 0
      let businessEntityComission = 0
      if (!leadId || !lobType) {
        return res
          .status(400)
          .json({ status: 400, message: "Bad Request " });
      }
      let matchObj = { status: true }
      let discountMatch = { status: true }
      let producerComissionMatch = { status: true }
      let leadDetails = await New_Lead.findById(leadId)
      companyId = leadDetails?.plan_company_id
      let locationId = leadDetails?.lead_location
      planId = leadDetails?.plan_id
      let leadLobId = leadDetails?.type_of_policy
      let policyTypeId = leadDetails?.type_of_policy
      let finallBasePremium = +leadDetails?.toObject()?.final_price ? +leadDetails?.toObject()?.final_price : 0
      if (finallBasePremium) {
        if (policyTypeId) {
          matchObj["lob"] = mongoose.Types.ObjectId(policyTypeId)
          discountMatch["lob"] = mongoose.Types.ObjectId(policyTypeId)
          producerComissionMatch["lob.lob_id"] = mongoose.Types.ObjectId(policyTypeId)
        }

        if (locationId) {
          matchObj["location_rate.location_id"] = mongoose.Types.ObjectId(locationId)
          discountMatch["location"] = mongoose.Types.ObjectId(locationId)
          producerComissionMatch["location"] = mongoose.Types.ObjectId(locationId)
        }

        if (companyId) {
          discountMatch["company.company_id"] = mongoose.Types.ObjectId(companyId)
        }

        let businessEntityComissionsData = await businessEntityComissionModels.aggregate([
          { $match: matchObj }
        ])

        let producerComissionsData = await producerDiscount.aggregate([
          { $match: producerComissionMatch }
        ])

        let businessEntityDiscountData = await businessEntityDiscountModels.aggregate([
          { $match: discountMatch }
        ])
        businessEntityDiscountData = businessEntityDiscountData[0]?.company
        businessEntityComissionsData = businessEntityComissionsData[0]?.location_rate
        producerComissionsData = producerComissionsData[0]?.lob

        for (let i = 0; i < businessEntityComissionsData?.length; i++) {
          if (businessEntityComissionsData[i]?.location_id?.toString() == locationId?.toString()) {
            businessEntityComissionsRate = businessEntityComissionsData[i]?.rate
            businessEntityComissionsRate = businessEntityComissionsRate.toString()
          }
        }

        for (let i = 0; i < businessEntityDiscountData?.length; i++) {
          if (businessEntityDiscountData[i]?.company_id?.toString() == companyId?.toString()) {
            businessEntityDiscountRate = businessEntityDiscountData[i]?.rate?.toString()
            businessEntityDiscountRate = businessEntityDiscountRate.toString()
          }
        }

        for (let i = 0; i < producerComissionsData?.length; i++) {
          if (producerComissionsData[i]?.lob_id?.toString() == policyTypeId?.toString()) {
            producerComissionRate = producerComissionsData[i]?.rate?.toString()
            producerComissionRate = producerComissionRate.toString()
          }
        }

        if (lobType == "Motor") {
          planDetails = await motor_plan_model.findById(planId)
          planDetails = planDetails?.toObject()
          jdvComissionRate = planDetails?.jdv_comm
        } else if (lobType == "Home") {
          planDetails = await home_plan_model.findById(planId)
          planDetails = planDetails?.toObject()
          jdvComissionRate = planDetails?.jdv_comm
        } else if (lobType == "Medical") {
          planDetails = await medicalPlan.findById(planId)
          planDetails = planDetails?.toObject()
          jdvComissionRate = planDetails?.jdv_comm
        } else if (lobType == "Travel") {
          planDetails = await travel_plan_model.findById(planId)
          planDetails = planDetails?.toObject()
          jdvComissionRate = planDetails?.jdv_comm
        } else if (lobType == "Yacht") {
          planDetails = await yacht_plan.findById(planId)
          planDetails = planDetails?.toObject()
          jdvComissionRate = planDetails?.jdv_commission
        }

        jdvComissionRate = jdvComissionRate?.toString()
        businessEntityDiscountRate = businessEntityDiscountRate?.toString()

        if (jdvComissionRate) {
          if (jdvComissionRate?.includes("%")) {
            jdvComissionRate = +jdvComissionRate.split("%")[0]
            jdvComission = (finallBasePremium * jdvComissionRate / 100)
          } else {
            jdvComission = +jdvComissionRate
          }
        } else {
          jdvComissionRate = 0
        }

        if (producerComissionRate) {
          if (producerComissionRate?.includes("%")) {
            producerComissionRate = +producerComissionRate.split("%")[0]
            producerComission = (jdvComission * producerComissionRate / 100)
          } else {
            producerComission = +producerComissionRate
          }
        } else {
          producerComissionRate = 0
        }

        if (businessEntityComissionsRate) {
          if (businessEntityComissionsRate?.includes("%")) {
            businessEntityComissionsRate = +businessEntityComissionsRate?.split("%")[0]
            businessEntityComission = (jdvComission * businessEntityComissionsRate) / 100
          } else {
            businessEntityComission = +businessEntityComissionsRate
          }
        } else {
          businessEntityComissionsRate = 0
        }

        if (businessEntityDiscountRate) {
          if (businessEntityDiscountRate?.includes("%")) {
            businessEntityDiscountRate = +businessEntityDiscountRate?.split("%")[0]
            businessEntityDiscountAmount = (businessEntityComission * businessEntityDiscountRate) / 100
          } else {
            businessEntityDiscountAmount = +businessEntityDiscountRate
          }
        } else {
          businessEntityDiscountRate = 0
        }
      }

      console.log({ businessEntityComission, jdvComission, finallBasePremium, producerComission })
      leadDetails = await New_Lead.findByIdAndUpdate(leadId,
        {
          businessEntityComission: businessEntityComission ? businessEntityComission : 0,
          jdvComission: jdvComission ? jdvComission : 0,
          businessEntityDiscount: businessEntityDiscountAmount ? businessEntityDiscountAmount : 0,
          producerComission: producerComission ? producerComission : 0
        }
      )

      if (leadDetails) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Update Successfully!" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Bad Request" });
    } catch (error) {
      console.log(error)
    }
  },
  addKatarMotorYearData: async (req, res) => {
    try {
      let count = 0
      let data = '';
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.devapi.anoudapps.com/qicservices/aggregator/autoDataYear',
        headers: {
          'company': '002',
          'Content-Type': 'application/json',
          'Authorization': 'Basic a2hhbGVkOlRlc3RAMTIzNA==',
          'Cookie': 'BIGipServeruat_qic_8082=!etHSXu8omIgbzW/NPNGf0On2sVo0zgh3RV0Jf1PzkJyKs1JVEDXl9O3W0VTEqvTsVfW5KJ03PRRFpHo=; TS0140665d=01f00338fe42de1650de7e55c391f48824b3d9a8ae27861a1f998902bb54b4b806762d32c6291ed2bfce150b69720c913ad6c9182b9b88080cc83aeb3f6ac368014c207309; TS0192ab24=01f00338fe2ba5291a8a0ef54de695d9980a08d2966da2e9fc4a44526eacd286dab271793014ea60f6ee16c3325651e5850ce6d7ffaf66bd1550679cf3d2b75c1b48867a589cf0f3507d5a8ab364634f4d3430bafe; TS013cbdd4=01f00338feb366f58231d779e6be975117a62ac6d26da2e9fc4a44526eacd286dab27179305931a40282a5bebe06b26cad18e92555'
        },
        data: data
      };
      let locationArray = []
      let locationData = await location_model.find()
      for (let j = 0; j < locationData.length; j++) {
        locationArray.push(locationData[j]?._id)
      }
      await axios.request(config)
        .then(async (response) => {
          // console.log(JSON.stringify(response.data));
          let yearData = response.data?.modelyearArray
          for (let i = 0; i < yearData.length; i++) {
            let yearDetails
            yearDetails = await year_code_model.findOneAndUpdate(
              { yearDesc: +yearData[i]?.yearDesc },
              {
                yearDesc: +yearData[i]?.yearDesc,
                qic_Code: +yearData[i]?.yearCode,
                location: locationArray,
              },
              { upsert: true, returnOriginal: false }
            );
            console.log("..................", yearDetails)
            count++;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data Not  Saved Successfully " });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("ASome Thing Went Worng");
    }
  },
  getYearData: async (req, res) => {
    try {
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let yearDetails
      let matchObj = {}
      matchObj["location"] = {
        $in: userLocation
      }
      let limit = +req.query?.limit
      let page = +req.query?.page
      let facet = {};
      facet["totalCount"] = [
        {
          $count: "total",
        },
      ]
      facet["data"] = [
        {
          $match: matchObj
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'location',
            'foreignField': '_id',
            'as': 'locations'
          }
        },

      ]
      yearDetails = await year_code_model.aggregate([
        {
          $facet: facet
        }
      ])
      if (yearDetails[0]?.data?.length) {

        return res
          .status(200)
          .json({ status: 200, message: "Data Found Successfully ", data: yearDetails[0].data, total: yearDetails[0]?.totalCount[0]?.total });
      }
      return res
        .status(400)
        .json({ status: 400, message: "Data not Found  ", data: [] });
    } catch (error) {
      console.log(error);
    }
  },
  getallagentslist: async (req, res) => {
    try {
      let payload = req.body
      let lobId = payload?.lobId
      let locationId = payload?.locationId
      const excludedAgentId = '6413027bafc5c401dfc92f18';
      const agent = await Admin_model.aggregate(
        [
          {
            $match: {
              _id: { $ne: mongoose.Types.ObjectId(excludedAgentId) },
              "line_of_business.lob_id": { $in: lobId },
              "location.loc_id": { $in: locationId },
              status: 1

            },

          },

          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ]
      );
      if (agent.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: agent,
        });
      }
      return res.status(404).json({
        status: 404,
        message: "Data Not Found !!",
        data: [],
      });

    } catch (error) {
      console.log(error);
    }
  },
  getTravelCoverTpe: async (req, res) => {
    try {
      const result = await Travel_cover_type_list.find({
        travel_cover_type_status: 1,
      }).select({ travel_cover_type: 1 });
      if (result?.length) {
        return res.status(200).json({ status: 200, message: "Data Found", data: result });

      }
      res.status(404).json({ status: 404, message: "Data not Found", data: result });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  },
  get_Yacht_Make: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let name = query.name
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let status = query.status
      console.log(typeof (status))
      let mysort = { name: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["location"] = {
          $in: userLocation
        }
        if (status == "false" || status == "true") {
          if (status == "false") {
            match["status"] = false;
          } else {
            match["status"] = true
          }

        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          },

        ]
        aggregate.push({
          $facet: facet
        })
        let yacht_make = await yachtMake.aggregate(aggregate);

        if (!yacht_make[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: yacht_make[0]?.data, total: yacht_make[0]?.totalCount[0]?.total });


      } else {
        const yacht_make = await yachtMake.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: yacht_make });
      }
    } catch (error) {
      console.log(error)
    }
  },
  update_Yacht_Make_status: async (req, res) => {
    let id = req.query.id;
    let status = req.query.status;
    const make = await yachtMake.findByIdAndUpdate(id, {
      status: status,
    });
    if (make != null) {
      if (status == false) {
        res.json({
          status: 200,
          message: "Make  Deactivated Successfully",
          data: make,
        });
      } else {
        res.json({
          status: 200,
          message: "Make  Activated Successfully",
          data: make,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Make  Not Deactivated Successfully",
      });
    }
  },
  add_yacht_make: async (req, res) => {
    try {
      const yachtMakeData = req.body;
      console.log(yachtMakeData, ">>>>>>>> in data")
      let existArray = [];
      let count = 0;
      const index = yachtMakeData.index
      let MakeName = await utils.toUpperCase(yachtMakeData.make_name);
      const make_in_db = await yachtMake.find({
        name: MakeName,
      });
      if (make_in_db.length > 0) {
        existArray.push(make_in_db);
        count++;
      } else {
        let location_id = yachtMakeData.location.includes(",") ? yachtMakeData.location.split(",") : [yachtMakeData.location];

        let locationArray = [];
        for (let j = 0; j < location_id.length; j++) {
          locationArray.push(mongoose.Types.ObjectId(location_id[j]));
        }
        //  let make_details = await yachtMake.aggregate([
        //    {
        //      '$match': {
        //          'jdvCode': {
        //              '$exists': true
        //          }
        //      }
        //  },
        //   {
        //      '$sort': {
        //          'jdvCode': -1
        //      }
        //  }

        //  ])
        //  let JdvCode = make_details[0]?.jdvCode?+make_details[0]?.jdvCode+1+(+index):1+(+index)
        let yacht = new yachtMake({
          name: MakeName,
          location: locationArray,
          logo: req.file?.filename,
        });
        let result = await yacht.save();
        count++
        if (result && yachtMakeData.last == 'last') {
          return res.json({
            status: 200,
            message: `Make Added Successfully`,
            count: count
          });
        }
        else {
          return;
        }

      }
      // if (resultArray.length > 0) {
      //   return  res.json({
      //     status: 400,
      //     message: "Make Motor Not Added Successfully!",
      //   });
      // } 



    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something Went Wrong!" });
    }
  },
  get_yacht_details_by_id: async (req, res) => {
    const id = req.query.id;
    const make_data = await yachtMake.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
    ]);
    res.json({ status: 200, message: "Data Found", data: make_data });
  },

  update_Yacht_Make: async (req, res) => {
    const id = req.query.id;
    const reqdata = req.body;
    let payloadObj = {}
    if (reqdata?.make_name) {
      const make_name = await utils.toUpperCase(reqdata?.make_name);
      payloadObj["name"] = make_name
    }
    if (reqdata?.location) {
      let location_id = reqdata?.location.includes(",") ? reqdata?.location.split(",") : [reqdata?.location];
      let locationArray = location_id.map((item) => { return mongoose.Types.ObjectId(item) })
      payloadObj["location"] = locationArray
    }
    if (req.file) {
      payloadObj["logo"] = req.file?.filename
    }
    const yacht_Make = await yachtMake.findByIdAndUpdate(id, payloadObj);
    if (yacht_Make) {
      res.json({
        status: 200,
        message: "Make  Updated Successfully",
        data: yacht_Make,
      });
    } else {
      res.json({ status: 400, message: "Make Not Updated Successfully" });
    }
  },
  add_Yacht_model: async (req, res) => {
    try {
      const yachtData = req.body;
      console.log(yachtData, ">>>>>>>>>>>>>>>>>payload");
      let existArray = [];
      let result;
      let count = 0;
      for (let i = 0; i < yachtData.length; i++) {
        const yachtName = yachtData[i]?.name;
        const startyear = yachtData[i]?.start_year;
        const make_yacht_in_db = await yachtModel.find({
          name: yachtName,
          start_year: startyear,
        });
        console.log(make_yacht_in_db, ">>>>>>>>>>>> already present");
        if (!make_yacht_in_db.length) {
          let location_id = yachtData[i]?.location;
          let locationArray = [];
          for (let j = 0; j < location_id.length; j++) {
            locationArray.push(mongoose.Types.ObjectId(location_id[j].value));
          }

          let yacht_details = new yachtModel({
            name: yachtName,
            MakeId: mongoose.Types.ObjectId(yachtData[i]?.MakeId),
            start_year: +yachtData[i]?.start_year,
            body_type: mongoose.Types.ObjectId(yachtData[i]?.body_type),
            engine: +yachtData[i]?.engine,
            minValue: +yachtData[i]?.minValue,
            maxValue: +yachtData[i]?.maxValue,
            Mindep: +yachtData[i]?.Mindep,
            maxDep: +yachtData[i]?.maxDep,
            noOfDep: +yachtData[i]?.noOfDep,
            location: locationArray,
          });
          result = await yacht_details.save();
          count++;
        } else {
          console.log("inside else");
          existArray.push(make_yacht_in_db);
        }
      }
      if (count > 0) {
        return res.json({
          status: 200,
          message: `${count} Yacht Model Added  Successfully ${existArray.length}  already present`,
        });
      } else {
        return res.json({ status: 400, message: "yacht Model already exist!" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error.message });
    }
  },

  get_all_Yacht_Model: async (req, res) => {
    try {
      let query = req.query
      const page = query.page;
      const limit = query.limit;
      let payload = req.body;
      let name = query?.name
      let status = query?.status
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      if (page && limit) {
        let match = {};
        if (name) {
          match = {
            name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["location"] = {
          $in: userLocation
        }
        if (status == "true" || status == "false") {
          if (status == "true") {
            match["status"] = true
          } else {
            match["status"] = false
          }
        }
        if (payload?.MakeId) {
          match["MakeId"] = mongoose.Types.ObjectId(
            payload?.MakeId
          );
        }
        const mysort = { name: 1 };
        let aggregate = [
          {
            $match: match,
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "yatch_body_type_lists",
              localField: "bodyTypeId",
              foreignField: "_id",
              as: "Yacht_body_type",
            },
          },

          {
            $lookup: {
              from: "yachtmakes",
              localField: "MakeId",
              foreignField: "_id",
              as: "yachtmakes",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $sort: mysort,
          },
          {
            $skip: (page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ];
        aggregate.push({
          $facet: facet,
        });
        let yacht_model = await yachtModel.aggregate(aggregate);
        console.log(yacht_model[0]?.totalCount[0]?.total)
        if (!yacht_model[0]?.data) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found",
          data: yacht_model[0]?.data,
          total: yacht_model[0]?.totalCount[0]?.total,
        });
      } else {
        let match = {}
        match["location"] = {
          $in: userLocation
        }
        if (status == "true" || status == "false") {
          if (status == "true") {
            match["status"] = true
          } else {
            match["status"] = false
          }
        }
        if (payload?.MakeId) {
          match["MakeId"] = mongoose.Types.ObjectId(
            payload?.MakeId
          );
        }
        const mysort = { "yacht_model.name": 1 };
        const yacht_model = await yachtModels.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "yatch_body_type_lists",
              localField: "bodyTypeId",
              foreignField: "_id",
              as: "body_type",
            },
          },
          {
            $unwind: {
              path: "$body_type",
            },
          },
          {
            $lookup: {
              from: "yachtmakes",
              localField: "MakeId",
              foreignField: "_id",
              as: "yachtmakes",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $unwind: {
              path: "$yachtmakes",
            },
          },

          {
            $sort: mysort,
          },
        ]);
        if (!yacht_model) {
          return res.json({ status: 400, message: "Data not found", data: [] })
        }
        return res.json({ status: 200, message: "Data Found", data: yacht_model });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },

  get_Yacht_model_detailsbyid: async (req, res) => {
    try {
      const result = await yachtModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.body.ParamValue) } },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.send(err);
    }
  },

  update_yatch_model_details_status: async (req, res) => {
    try {
      let id = req.query?.id;
      let status = req.query?.status;
      if (status == "true") {
        status = true
      } else {
        status = false
      }
      const yatch_detail = await yachtModel.findByIdAndUpdate(id, {
        status: status,
      });
      if (yatch_detail != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Yacht Model Detail Deactivated Successfully",
            data: yatch_detail,
          });
        } else {
          res.json({
            status: 200,
            message: "Yacht Model Detail Activated Successfully",
            data: yatch_detail,
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Yacht Model Detail Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  update_Yacht_model_details: async (req, res) => {
    try {
      let payloadObj = {}
      let payload = req.body;

      const id = payload?.id;
      const detail_location =
        payload?.location?.map((val) =>
          mongoose.Types.ObjectId(val)
        );
      payloadObj["name"] = payload?.name?.toUpperCase()
      payloadObj["MakeId"] = payload?.MakeId
      payloadObj["start_year"] = payload?.start_year
      payloadObj["bodyTypeId"] = payload?.body_type
      payloadObj["engine"] = payload?.engine
      payloadObj["minValue"] = payload?.minValue
      payloadObj["maxValue"] = payload?.maxValue
      payloadObj["Mindep"] = payload?.Mindep
      payloadObj["maxDep"] = payload?.maxDep
      payloadObj["noOfDep"] = +payload?.noOfDep
      payloadObj["location"] = detail_location
      console.log(payloadObj, ">>>>>>>>>>>>>>Yacht model details object")
      const model_motor_detail = await yachtModel.findByIdAndUpdate(id, payloadObj);
      if (model_motor_detail != null) {
        res.json({
          status: 200,
          message: "Model Motor Detail Updated Successfully",
          data: model_motor_detail,
        });
      } else {
        res.json({
          status: 400,
          message: "Model Motor Detail Not Updated Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  },
  get_Yacht_Engine: async (req, res) => {
    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let name = query.name
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let status = query.status
      console.log(typeof (status))
      let mysort = { name: 1 };
      if (page && limit) {
        let match = {}
        if (name) {
          match = {
            name: {
              $regex: name,
              $options: "i"
            }
          }
        }
        match["location"] = {
          $in: userLocation
        }
        if (status == "false" || status == "true") {
          if (status == "false") {
            match["status"] = false;
          } else {
            match["status"] = true
          }

        }
        let aggregate = [
          {
            $match: match
          },
        ];
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $sort: mysort
          },
          {
            $skip: +((+page - 1) * +limit)
          },
          {
            $limit: +limit,
          },

        ]
        aggregate.push({
          $facet: facet
        })
        let yacht_Engine = await yachtEngine.aggregate(aggregate);

        if (!yacht_Engine[0]?.data?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [], total: 0 });
        }
        return res.status(200).json({ status: 200, message: "Data Found", data: yacht_Engine[0]?.data, total: yacht_Engine[0]?.totalCount[0]?.total });


      } else {
        const yacht_Engine = await yachtEngine.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: yacht_Engine });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getActiveYachtEngine: async (req, res) => {
    try {
      let yacht_Engine = await yachtEngine.aggregate([
        {
          $match: {
            status: true,
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ]);

      if (!yacht_Engine.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: [] });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Found", data: yacht_Engine });
    } catch (error) {
      console.log(error);
    }
  },
  update_Yacht_Engine_status: async (req, res) => {
    let id = req.query.id;
    let status = req.query.status;
    const Engine = await yachtEngine.findByIdAndUpdate(id, {
      status: status,
    });
    if (Engine != null) {
      if (status == false) {
        res.json({
          status: 200,
          message: "Engine  Deactivated Successfully",
          data: Engine,
        });
      } else {
        res.json({
          status: 200,
          message: "Engine  Activated Successfully",
          data: Engine,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Engine  Not Deactivated Successfully",
      });
    }
  },
  add_yacht_Engine: async (req, res) => {
    try {
      const yachtEngineData = req.body;
      console.log(yachtEngineData, ">>>>>>>> in data")
      let existArray = [];
      let count = 0;
      const index = yachtEngineData.index
      let EngineName = await utils.toUpperCase(yachtEngineData.engine_name);
      const Engine_in_db = await yachtEngine.find({
        name: EngineName,
      });
      if (Engine_in_db.length > 0) {
        existArray.push(Engine_in_db);
        count++;
      } else {
        let location_id = yachtEngineData.location.includes(",") ? yachtEngineData.location.split(",") : [yachtEngineData.location];

        let locationArray = [];
        for (let j = 0; j < location_id.length; j++) {
          locationArray.push(mongoose.Types.ObjectId(location_id[j]));
        }
        //  let Engine_details = await yachtEngine.aggregate([
        //    {
        //      '$match': {
        //          'jdvCode': {
        //              '$exists': true
        //          }
        //      }
        //  },
        //   {
        //      '$sort': {
        //          'jdvCode': -1
        //      }
        //  }

        //  ])
        //  let JdvCode = Engine_details[0]?.jdvCode?+Engine_details[0]?.jdvCode+1+(+index):1+(+index)
        let yacht = new yachtEngine({
          name: EngineName,
          location: locationArray,
          logo: req.file?.filename,
        });
        let result = await yacht.save();
        count++
        if (result && yachtEngineData.last == 'last') {
          return res.json({
            status: 200,
            message: `Engine Added Successfully`,
            count: count
          });
        }
        else {
          return;
        }

      }
      // if (resultArray.length > 0) {
      //   return  res.json({
      //     status: 400,
      //     message: "Engine Motor Not Added Successfully!",
      //   });
      // } 



    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: "Something Went Wrong!" });
    }
  },
  get_yacht_engine_details_by_id: async (req, res) => {
    const id = req.query.id;
    const Engine_data = await yachtEngine.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
    ]);
    res.json({ status: 200, message: "Data Found", data: Engine_data });
  },

  update_Yacht_Engine: async (req, res) => {
    const id = req.query.id;
    const reqdata = req.body;
    let payloadObj = {}
    if (reqdata?.Engine_name) {
      const Engine_name = await utils.toUpperCase(reqdata?.Engine_name);
      payloadObj["name"] = Engine_name
    }
    if (reqdata?.location) {
      let location_id = reqdata?.location.includes(",") ? reqdata?.location.split(",") : [reqdata?.location];
      let locationArray = location_id.map((item) => { return mongoose.Types.ObjectId(item) })
      payloadObj["location"] = locationArray
    }
    if (req.file) {
      payloadObj["logo"] = req.file?.filename
    }
    const yacht_Engine = await yachtEngine.findByIdAndUpdate(id, payloadObj);
    if (yacht_Engine) {
      res.json({
        status: 200,
        message: "Engine  Updated Successfully",
        data: yacht_Engine,
      });
    } else {
      res.json({ status: 400, message: "Engine Not Updated Successfully" });
    }
  },
  addGeneralWrittingCondition: async (req, res) => {
    try {
      // let result = await MaternityQuestionnaireModels.create(req.body);
      const stdCondition = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < stdCondition.length; i++) {
        let StandardCondition = stdCondition[i]?.condition;

        const condition_in_db = await generalWritingConditionModels.find({
          condition: StandardCondition,
        });
        if (condition_in_db.length > 0) {
          existArray.push(condition_in_db);
          count++;
        } else {
          let locations = stdCondition[i]?.location.map((item) => { return mongoose.Types.ObjectId(item.value) });
          const standard_condition_dt = new generalWritingConditionModels({
            condition: StandardCondition,
            location: locations
          });
          const result = await standard_condition_dt.save();
          if (result != null) {
            resultArray.push(result);
          }
        }
      }
      if (resultArray.length > 0) {
        return res.json({
          status: 200,
          message: `General Condition Added ${resultArray.length} already exist ${count}`,
        });
      } else if (resultArray.length == 0) {
        return res.json({
          status: 400,
          message: `General Condition  already exist`,
        });
      } else {
        return res.json({
          status: 400,
          message: "General Condition Not Added Successfully!",
        });
      }
      ///////////////////////////////
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateGeneralWrittingCondition: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      if (payload?.location) {
        const locations = payload?.location.map((item) => { return mongoose.Types.ObjectId(item.value) });
        payload["location"] = locations
      }
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await generalWritingConditionModels.findByIdAndUpdate(
        id,
        payload,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getGeneralWrittingCondition: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await generalWritingConditionModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  activeGeneralWrittingConditions: async (req, res) => {
    try {

      let result = await generalWritingConditionModels.aggregate([
        {
          $match: {
            status: 1
          },
        },
        {
          $project: {
            condition: 1
          }
        }
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getGeneralWrittingConditions: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {},
              },
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit * 1,
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              }
            ],
          },
        };
        result = await generalWritingConditionModels.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          total: result[0]?.count[0]?.total,
        });
      } else {
        result = await generalWritingConditionModels.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            }
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  addHomeAdditionalCondition: async (req, res) => {
    try {
      let result
      const payload = req.body;
      if (payload?.company?.length) {
        payload['company'] = payload.company?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.planType?.length) {
        payload['planType'] = payload.planType?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.planCategory?.length) {
        payload['planCategory'] = payload.planCategory?.map((id) => mongoose.Types.ObjectId(id))
      }
      result = await homeAdditionalConditionModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },
  updateHomeAdditionalCondition: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let result
      if (payload?.company?.length) {
        payload['company'] = payload.company?.map((id) => mongoose.Types.ObjectId(id))
      }
      // if(payload?.location?.length){
      //   payload['location'] = payload.location?.map((id)=> mongoose.Types.ObjectId(id))
      // }
      if (payload?.planType?.length) {
        payload['planType'] = payload.planType?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.planCategory?.length) {
        payload['planCategory'] = payload.planCategory?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await homeAdditionalConditionModels.findByIdAndUpdate(
        id,
        payload,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getHomeAdditionalCondition: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await homeAdditionalConditionModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'location',
            'foreignField': '_id',
            'as': 'locations'
          }
        }, {
          '$lookup': {
            'from': 'plan_categories',
            'localField': 'planCategory',
            'foreignField': '_id',
            'as': 'planCategories'
          }
        }, {
          '$lookup': {
            'from': 'home_plan_type_lists',
            'localField': 'planType',
            'foreignField': '_id',
            'as': 'planTypes'
          }
        }, {
          '$lookup': {
            'from': 'companies',
            'localField': 'company',
            'foreignField': '_id',
            'as': 'companies'
          }
        }, {
          '$project': {
            'condition': 1,
            'status': 1,
            'locations.location_name': 1,
            'locations._id': 1,
            'planCategories._id': 1,
            'planCategories.plan_category_name': 1,
            'planTypes._id': 1,
            'planTypes.home_plan_type': 1,
            'companies._id': 1,
            'companies.company_name': 1
          }
        }

      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getHomeAdditionalConditions: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                '$match': {}
              }, {
                '$lookup': {
                  'from': 'locations',
                  'localField': 'location',
                  'foreignField': '_id',
                  'as': 'locations'
                }
              }, {
                '$lookup': {
                  'from': 'plan_categories',
                  'localField': 'planCategory',
                  'foreignField': '_id',
                  'as': 'planCategories'
                }
              }, {
                '$lookup': {
                  'from': 'home_plan_type_lists',
                  'localField': 'planType',
                  'foreignField': '_id',
                  'as': 'planTypes'
                }
              }, {
                '$lookup': {
                  'from': 'companies',
                  'localField': 'company',
                  'foreignField': '_id',
                  'as': 'companies'
                }
              }, {
                '$project': {
                  'condition': 1,
                  'status': 1,
                  'locations.location_name': 1,
                  'locations._id': 1,
                  'planCategories._id': 1,
                  'planCategories.plan_category_name': 1,
                  'planTypes._id': 1,
                  'planTypes.home_plan_type': 1,
                  'companies._id': 1,
                  'companies.company_name': 1
                }
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit * 1,
              },
            ],
          },
        };
        result = await homeAdditionalConditionModels.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          total: result[0]?.count[0]?.total,
        });
      } else {
        result = await homeAdditionalConditionModels.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMatchHomeAdditionalCondition: async (req, res) => {
    try {
      let result
      let payload = req.body
      let matchObj = { status: 1 }
      if (payload?.companyId) {
        matchObj['company'] = mongoose.Types.ObjectId(payload?.companyId)
      }
      if (payload?.planTypeId) {
        matchObj['planType'] = mongoose.Types.ObjectId(payload?.planTypeId)
      }
      if (payload?.planCategoryId) {
        matchObj['planCategory'] = mongoose.Types.ObjectId(payload?.planCategoryId)
      }
      result = await homeAdditionalConditionModels.aggregate([
        {
          $match: matchObj
        },
        {
          '$project': {
            'condition': 1,
          }
        }

      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });

    } catch (err) {
      console.log(err)
    }
  },
  addMedicalCopaymentType: async (req, res) => {
    try {
      let result
      const payload = req.body;
      if (payload?.company?.length) {
        payload['company'] = payload.company?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.medicalPlanType?.length) {
        payload['medicalPlanType'] = payload.medicalPlanType?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.planCategory?.length) {
        payload['planCategory'] = payload.planCategory?.map((id) => mongoose.Types.ObjectId(id))
      }
      result = await medicalCopaymentTypeModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMedicalCopaymentType: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let result
      if (payload?.company?.length) {
        payload['company'] = payload.company?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.medicalPlanType?.length) {
        payload['medicalPlanType'] = payload.medicalPlanType?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.planCategory?.length) {
        payload['planCategory'] = payload.planCategory?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await medicalCopaymentTypeModels.findByIdAndUpdate(
        id,
        payload,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMedicalCopaymentType: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalCopaymentTypeModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'location',
            'foreignField': '_id',
            'as': 'locations'
          }
        }, {
          '$lookup': {
            'from': 'plan_categories',
            'localField': 'planCategory',
            'foreignField': '_id',
            'as': 'planCategories'
          }
        }, {
          '$lookup': {
            'from': 'medical_plan_type_lists',
            'localField': 'medicalPlanType',
            'foreignField': '_id',
            'as': 'planTypes'
          }
        }, {
          '$lookup': {
            'from': 'companies',
            'localField': 'company',
            'foreignField': '_id',
            'as': 'companies'
          }
        }, {
          '$project': {
            'condition': 1,
            'status': 1,
            'locations.location_name': 1,
            'locations._id': 1,
            'planCategories._id': 1,
            'planCategories.plan_category_name': 1,
            'planTypes._id': 1,
            'planTypes.medical_plan_type': 1,
            'companies._id': 1,
            'companies.company_name': 1
          }
        }

      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMedicalCopaymentTypes: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                '$match': {}
              }, {
                '$lookup': {
                  'from': 'locations',
                  'localField': 'location',
                  'foreignField': '_id',
                  'as': 'locations'
                }
              }, {
                '$lookup': {
                  'from': 'plan_categories',
                  'localField': 'planCategory',
                  'foreignField': '_id',
                  'as': 'planCategories'
                }
              }, {
                '$lookup': {
                  'from': 'medical_plan_type_lists',
                  'localField': 'medicalPlanType',
                  'foreignField': '_id',
                  'as': 'planTypes'
                }
              }, {
                '$lookup': {
                  'from': 'companies',
                  'localField': 'company',
                  'foreignField': '_id',
                  'as': 'companies'
                }
              }, {
                '$project': {
                  'name': 1,
                  'status': 1,
                  description: 1,
                  'locations.location_name': 1,
                  'locations._id': 1,
                  'planCategories._id': 1,
                  'planCategories.plan_category_name': 1,
                  'planTypes._id': 1,
                  'planTypes.medical_plan_type': 1,
                  'companies._id': 1,
                  'companies.company_name': 1
                }
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        };
        result = await medicalCopaymentTypeModels.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          count: result[0]?.count[0]?.total,
        });
      } else {
        result = await medicalCopaymentTypeModels.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  addMedicalDeclaration: async (req, res) => {
    try {
      let result
      const payload = req.body;
      console.log(payload, "payload")
      let payloadarr = []
      for (let i = 0; i < payload.length; i++) {
        payloadarr.push({
          name: payload[i]?.name,
          location: payload[i]?.location?.map((id) => mongoose.Types.ObjectId(id._id)),
        })
      }


      console.log(payloadarr, "new payload")
      // return false;

      result = await medicalDeclarationModels.create(payloadarr);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMedicalDeclaration: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let result

      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id))
      }

      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await medicalDeclarationModels.findByIdAndUpdate(
        id,
        payload,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Updated Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMedicalDeclaration: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalDeclarationModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          '$lookup': {
            'from': 'locations',
            'localField': 'location',
            'foreignField': '_id',
            'as': 'locations'
          }
        },
        {
          '$project': {
            'name': 1,
            'status': 1,
            'locations.location_name': 1,
            'locations._id': 1,
          }
        }

      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getMedicalDeclarations: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      console.log('kkkkkkkkkkkkkkkkkk', { page, limit })
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                '$match': {}
              },
              {
                '$lookup': {
                  'from': 'locations',
                  'localField': 'location',
                  'foreignField': '_id',
                  'as': 'locations'
                }
              },
              {
                '$project': {
                  'name': 1,
                  'status': 1,
                  'locations.location_name': 1,
                  'locations._id': 1,
                }
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        };
        result = await medicalDeclarationModels.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0]?.data,
          count: result[0]?.count[0]?.total,
        });
      } else {
        result = await medicalDeclarationModels.aggregate([
          {
            $match: {
              status: true,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },

          }

        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  getActiveMedicalDeclaration: async (req, res) => {
    try {

      let result = await medicalDeclarationModels.aggregate([
        {
          $match: {
            status: true,
          },
        },
        {
          '$project': {
            'name': 1,
          }
        },


      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getActiveYachtCondition: async (req, res) => {
    try {
      let data
      data = await Yacht_Conditions.aggregate([
        {
          $match: { yacht_condition_status: 1 }
        },
        {
          $project: {
            yacht_condition_label: 1
          }
        }
      ])
      if (data.length) {
        return res.status(200).json({ status: 200, message: "data Found Successfully", data: data })
      }
      return res.status(401).json({ status: 401, message: "data not Found ", data: [] })
    } catch (error) {
      console.log("Error", error);
    }
  },
  getActiveYachtExperience: async (req, res) => {
    try {
      let data = await yachtExperience.aggregate([
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      if (data.length) {
        return res.status(200).json({ status: 200, message: "data Found Successfully", data: data })
      }
      return res.status(401).json({ status: 401, message: "data not Found ", data: [] })
    } catch (error) {
      console.log("Error", error);
    }
  },
  getYachtExperiencebyId: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await yachtExperience.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  UpdateYachtExperience: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let payloadObj = {}
      if (payload?.status) {
        payloadObj["status"] = payload?.status == 1 ? true : false
      }
      if (payload?.number) {
        payloadObj["number"] = +payload?.number
      }
      if (payload?.location?.length) {
        payloadObj["location"] = payload?.location.map((item) => { return mongoose.Types.ObjectId(item.value) })
      }
      let claimsYearsDetails = await yachtExperience.findByIdAndUpdate(id, payloadObj, { new: true });

      if (!claimsYearsDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Updated Successfully !!",
        data: claimsYearsDetails,
      });
    } catch (err) {
      console.log("Error", err);
    }
  },
  AddYachtQuestion: async (req, res) => {
    try {
      let reqbody = req.body;
      let payloadObj = {}
      if (reqbody?.question) {
        payloadObj["name"] = reqbody?.question;
      }
      if (reqbody?.location?.length) {
        payloadObj["location"] = reqbody?.location.map((item) => { return mongoose.Types.ObjectId(item.value) })
      }
      if (reqbody?.experience_type) {
        payloadObj["claim_experience"] = reqbody?.experience_type == "1" ? true : false
      }
      let result = await yachtQuestions.create(payloadObj);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });
    } catch (error) {
      console.log("Error", error);
    }
  },
  UpdateYachtQuestion: async (req, res) => {
    try {
      let id = req.query?.id;
      const payload = req.body
      let payloadObj = {}
      if (payload?.status === 0 || payload?.status === 1) {
        payloadObj["status"] = payload?.status === 1 ? true : false
      }
      if (payload?.name) {
        payloadObj["name"] = payload?.name;
      }
      if (payload?.location?.length) {
        payloadObj["location"] = payload?.location.map((item) => { return mongoose.Types.ObjectId(item.value) })
      }
      if (payload?.claim_experience) {
        payloadObj["claim_experience"] = payload?.claim_experience == "1" ? true : false
      }

      console.log(payloadObj, "payloadObj")
      let claimsYearsDetails = await yachtQuestions.findByIdAndUpdate(id, payloadObj, { new: true });
      if (!claimsYearsDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Updated Successfully !!",
        data: claimsYearsDetails,
      });
    } catch (err) {
      console.log("Error", err);
    }
  },
  getYachtQuestionbyId: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await yachtQuestions.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result,
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getAllYachtQuestions: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                '$match': {}
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              },
              {
                '$project': {
                  'name': 1,
                  'status': 1,
                  'claim_experience': 1,
                  'location.location_name': 1,
                  'count': 1,

                }
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        }
        result = await yachtQuestions.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
        }
      } else {
        result = await yachtQuestions.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Found", data: {} });
        }
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });

      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  getYachtExpQuestion: async (req, res) => {
    try {
      let type = req.query?.type;
      let id
      let match = { status: true }
      let result;
      let Experience
      let question

      if (type == "claim") {
        id = "65c7156d8886a5820e5a9ca7"
        match["claim_experience"] = true
      } else {
        id = "65c7160debc5726f1891f040"
        match["claim_experience"] = false
      }
      console.log("match..................", { match, type })
      question = await yachtQuestions.aggregate([
        {
          $match: match
        },
        {
          $project: {
            "name": 1

          }
        }
      ])
      Experience = await yachtExperience.findById(id).select("number")
      return res.status(200).json({
        status: 200,
        message: "Data not Found",
        Experience: Experience,
        question: question
      })
    } catch (error) {
      console.log("Error", error);
    }
  },
  read_medical_network_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log("xlData", xlData);
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      for (let i = 0; i < xlData.length; i++) {
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.Location
        locationInexcel = locationInexcel.split(",");
        for (let j = 0; j < locationInexcel.length; j++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[j]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        let tpaid = await medicalNetworkModels.findOne({
          name: xlData[i]?.TPA,
          status: 1,
        });
        let data;
        console.log("data", {
          name: await typeConversion(xlData[i]?.Name),
          TPAID: mongoose.Types.ObjectId(tpaid?._id?.toString()),
          location: locationArray,
          status: 1,
        },)
        data = await medicalNetworkModels.findOneAndUpdate(
          {
            name: await typeConversion(xlData[i]?.Name),
          },
          {
            name: await typeConversion(xlData[i]?.Name),
            TPAID: mongoose.Types.ObjectId(tpaid?._id?.toString()),
            location: locationArray,
            status: 1,
          },
          { upsert: true, returnOriginal: false }
        );

        count++
      }

      if (count > 0) {
        console.log(count, "execution ended successfully")

        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  add_preferred_Days: async (req, res) => {
    try {
      let result
      const payload = req.body;
      let objpayload = {}
      if (payload?.name) {
        objpayload['name'] = payload.name
      }
      if (payload?.start_time) {
        objpayload['start_time'] = payload.start_time
      }
      if (payload?.end_time) {
        objpayload['end_time'] = payload.end_time
      }
      if (payload?.location?.length) {
        objpayload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id._id))
      }
      result = await preferredDay.create(objpayload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !" });
      } else {
        return res.status(404).json({ status: 404, message: "Data not saved  " });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  get_preferred_Days: async (req, res) => {
    try {
      let usertype = req.query.type
      let match = {}
      if (usertype == "user") {
        match = {
          '$match': {
            status: 1,
          },
        }
      } else {
        match = {
          '$match': {},
        }
      }
      let result = await preferredDay.aggregate([
        match,
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "data Found Successfully", data: result })
      }
      return res.status(401).json({ status: 401, message: "data not Found ", data: [] })
    } catch (error) {
      console.log("Error", error);
    }
  },
  get_preferred_Days_byId: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await preferredDay.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "data Found Successfully", data: result })
      }
      return res.status(401).json({ status: 401, message: "data not Found ", data: [] })
    } catch (error) {
      console.log("Error", error);
    }
  },
  update_preferred_Days: async (req, res) => {
    try {
      const id = req.query.id;
      const payload = req.body;
      let objpayload = {}
      if (payload?.name) {
        objpayload['name'] = payload.name
      }
      if (payload?.start_time) {
        objpayload['start_time'] = payload.start_time
      }
      if (payload?.end_time) {
        objpayload['end_time'] = payload.end_time
      }
      if (payload?.location?.length) {
        objpayload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id.value))
      }
      if (payload?.status == 0 || payload?.status == 1) {
        objpayload['status'] = payload.status
      }
      const result = await preferredDay.findByIdAndUpdate(id, objpayload, { new: true });
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data not Updated  " });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  AddProducerDiscount: async (req, res) => {
    try {
      const reqbody = req.body
      let payload = {}
      if (reqbody?.location) {
        payload['location'] = reqbody.location
      }
      if (reqbody?.description) {
        payload['description'] = reqbody.description
      }
      if (reqbody.discount_type) {
        payload['discount_type'] = reqbody.discount_type
      }
      if (reqbody?.lob) {
        const rates = reqbody.rate?.split(",")
        payload['lob'] = reqbody.lob?.map((Val, index) => ({ lob_id: mongoose.Types.ObjectId(Val.value), rate: rates[index] }))
      }
      if (reqbody?.rate) {
        payload['rate'] = reqbody.rate
      }
      if (reqbody?.effective_date) {
        payload['effective_date'] = reqbody.effective_date
      }
      const result = await producerDiscount.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },
  getProducerDiscount: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                '$match': {}
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              },
              {
                $lookup: {
                  from: "line_of_businesses",
                  localField: "lob.lob_id",
                  foreignField: "_id",
                  as: "line_of_business",
                }
              },
              {
                '$project': {
                  'description': 1,
                  'rate': 1,
                  'discount_type': 1,
                  'location.location_name': 1,
                  'location._id': 1,
                  'line_of_business._id': 1,
                  'line_of_business.line_of_business_name': 1,
                  'status': 1
                }
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        }
        result = await producerDiscount.aggregate([aggregate]);
        // console.log("data.....",result)
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
        }
      } else {
        result = await producerDiscount.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              condition: 1,
            },
          },
        ]);
        if (!result.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
        } else {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
        }
      }

    } catch (error) {
      console.log("Error", error);
    }
  },
  getProducerDiscountbyId: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await producerDiscount.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob.lob_id",
            foreignField: "_id",
            as: "line_of_business",
          }
        }
      ]);
      if (!result.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
      } else {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateProducerDiscount: async (req, res) => {
    try {
      const id = req.query.id;
      const payload = req.body;
      console.log(payload, "payload")
      let objpayload = {}
      if (payload?.location) {
        objpayload['location'] = payload.location
      }
      if (payload?.description) {
        objpayload['description'] = payload.description
      }
      if (payload.discount_type) {
        objpayload['discount_type'] = payload.discount_type
      }
      if (payload?.lob) {
        const rates = payload?.rate?.split(",")
        objpayload['lob'] = payload?.lob?.map((Val, index) => ({ lob_id: mongoose.Types.ObjectId(Val.value), rate: rates[index] }))
      }
      if (payload?.rate) {
        objpayload['rate'] = payload.rate
      }
      if (payload?.effective_date) {
        objpayload['effective_date'] = payload?.effective_date
      }
      if (payload?.status == 0 || payload?.status == 1) {
        objpayload['status'] = payload.status
      }
      const result = await producerDiscount.findByIdAndUpdate(id, objpayload, { new: true });
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data not Updated  " });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  GetPlanAndCompanyName: async (req, res) => {
    try {
      const id = req.query?.id
      console.log(id, "hiiiiiiiii")
      const result = await GroupMedicalPlan.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        }, {
          $lookup: {
            from: 'companies',
            localField: 'company_id',
            foreignField: '_id',
            as: 'companyData'
          }
        },
        {
          $unwind: {
            path: '$companyData'
          }
        },
        {
          $project: {
            'companyData.company_name': 1,
            plan_name: 1

          }
        }
      ])
      if (result) {
        return res.status(201).json({ status: 201, message: 'Data Found', data: result })
      } else {
        return res.status(400).json({ status: 400, message: 'Data not Found', data: {} })
      }

    } catch (error) {
      console.log(error)
    }
  },
  GetGroupMedicalDocuments: async (req, res) => {
    try {
      const lob = req.query.lob
      const category = req.query.category
      console.log(lob, " :lob: ", category, " category")
      // return false;
      let matchObj = {}
      if (category) {
        matchObj['group_medical_document_type'] = category
      }
      matchObj['document_lob'] = mongoose.Types.ObjectId("658bf04ed4c9b13ffb6ddb8a")
      const result = await GroupMedicalDocumentType.aggregate([
        {
          $match: matchObj
        }
      ])
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found", data: result })
      } else {
        return res.status(404).json({ status: 404, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  Update_All_GroupMedical_documents: async (req, res) => {
    try {
      let payload = req.body;
      let id = payload?.id;
      let files = req.files;
      payload = JSON.parse(payload?.payload)

      let newLeads;
      let documents = [];
      let newPayload = [];
      let planDetails = await GroupMedicalPlan.findById(id)
      planDetails = planDetails?.toObject();
      planDetails = planDetails?.documents
      for (let i = 0; i < payload.length; i++) {
        let objPayload = {
          name: payload[i]?.name
        }
        let allReadyExist = false;
        for (let j = 0; j < planDetails.length; j++) {
          if (payload[i]?.name == planDetails[j]?.name) {
            allReadyExist = true
            if (payload[i]?.file == "") {
              objPayload["file"] = ""
            }
            else if (typeof payload[i]?.file == "string" && payload[i]?.file.length) {
              objPayload["file"] = payload[i]?.file
            }
            else if (typeof payload[i]?.file == "object" && !Object.keys(payload[i]?.file).length) {
              objPayload["file"] = files[0]?.filename
              files.splice(0, 1)
            }

            planDetails.splice(j, 1)

          }
        }
        if (!allReadyExist) {

          if (payload[i]?.file == "") {
            objPayload["file"] = ""
          }
          else if (typeof payload[i]?.file == "string" && payload[i]?.file.length) {
            objPayload["file"] = payload[i]?.file
          }
          else if (typeof payload[i]?.file == "object" && !Object.keys(payload[i]?.file).length) {
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
            objPayload["file"] = files[0]?.filename
            files.splice(0, 1)
          }

        }
        newPayload.push(objPayload)
      }
      documents = [...newPayload, ...planDetails]

      console.log("documentskkkkkkkkkkkkkkk", documents);

      newLeads = await GroupMedicalPlan.findByIdAndUpdate(id, {
        documents: documents,
      });
      if (newLeads) {
        res.json({
          status: 200,
          message: "Documents Updated Successfully",
          data: newLeads,
        });
      } else {
        res.json({
          status: 400,
          message: "something went wrong",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  AddMaritalStatus: async (req, res) => {
    try {
      let reqBody = req.body
      if (reqBody?.location.length) {
        reqBody['location'] = reqBody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      const result = await MaritalStatus.create(reqBody)
      if (result) {
        return res.status(201).json({ status: 201, message: "Marital Status Added Successfully", data: result })
      } else {
        return res.status(400).json({ status: 400, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  GetMaritalStatus: async (req, res) => {
    try {
      let page = +req.query.page
      let limit = +req.query.limit
      let result;
      if (page && limit) {
        let aggragate = {
          $facet: {
            count: [
              {
                $count: 'total'
              }
            ],
            data: [
              {
                $match: {}
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              },
              {
                $project: {
                  name: 1,
                  location: 1,
                  status: 1
                }
              }

            ]
          }
        }
        result = await MaritalStatus.aggregate([aggragate])
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
        }
      } else {
        result = await MaritalStatus.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              name: 1,
              location: 1,
              status: 1
            }
          },
        ]);
        if (!result.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
        } else {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  getMaritalStatusbyId: async (req, res) => {
    try {
      const id = req.query.id
      const result = await MaritalStatus.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ])
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found ", data: result })
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found", result: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateMaritalStatus: async (req, res) => {
    try {
      const id = req.query.id;
      const reqbody = req.body
      let payload = {}
      if (reqbody.name) {
        payload['name'] = reqbody.name
      }
      if (reqbody?.location?.length) {
        payload['location'] = reqbody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (reqbody.status == 1 || reqbody.status == 0) {
        payload['status'] = reqbody.status == 1 ? 1 : 0
      }
      const result = await MaritalStatus.findByIdAndUpdate(id, payload)
      if (result) {
        return res.status(200).json({ status: 200, message: "Updated Successfully", data: result })
      } else {
        return res.status(401).json({ status: 401, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  AddGender: async (req, res) => {
    try {
      let reqBody = req.body
      if (reqBody?.location.length) {
        reqBody['location'] = reqBody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      const result = await Gender.create(reqBody)
      if (result) {
        return res.status(201).json({ status: 201, message: "Marital Status Added Successfully", data: result })
      } else {
        return res.status(400).json({ status: 400, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  GetGender: async (req, res) => {
    try {
      let page = +req.query.page
      let limit = +req.query.limit
      let result;
      if (page && limit) {
        let aggragate = {
          $facet: {
            count: [
              {
                $count: 'total'
              }
            ],
            data: [
              {
                $match: {}
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              },
              {
                $project: {
                  name: 1,
                  location: 1,
                  status: 1
                }
              }

            ]
          }
        }
        result = await Gender.aggregate([aggragate])
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
        }
      } else {
        result = await Gender.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              name: 1,
              location: 1,
              status: 1
            }
          },
        ]);
        if (!result.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
        } else {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  getGenderbyId: async (req, res) => {
    try {
      const id = req.query.id
      const result = await Gender.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ])
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found ", data: result })
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found", result: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateGender: async (req, res) => {
    try {
      const id = req.query.id;
      const reqbody = req.body
      let payload = {}
      if (reqbody.name) {
        payload['name'] = reqbody.name
      }
      if (reqbody?.location?.length) {
        payload['location'] = reqbody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (reqbody.status == 1 || reqbody.status == 0) {
        payload['status'] = reqbody.status == 1 ? 1 : 0
      }
      const result = await Gender.findByIdAndUpdate(id, payload)
      if (result) {
        return res.status(200).json({ status: 200, message: "Updated Successfully", data: result })
      } else {
        return res.status(401).json({ status: 401, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  AddRelation: async (req, res) => {
    try {
      let reqBody = req.body
      if (reqBody?.location.length) {
        reqBody['location'] = reqBody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      const result = await Relation.create(reqBody)
      if (result) {
        return res.status(201).json({ status: 201, message: "Marital Status Added Successfully", data: result })
      } else {
        return res.status(400).json({ status: 400, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  GetRelation: async (req, res) => {
    try {
      let page = +req.query.page
      let limit = +req.query.limit
      let result;
      if (page && limit) {
        let aggragate = {
          $facet: {
            count: [
              {
                $count: 'total'
              }
            ],
            data: [
              {
                $match: {}
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "location",
                },
              },
              {
                $project: {
                  name: 1,
                  location: 1,
                  status: 1
                }
              }

            ]
          }
        }
        result = await Relation.aggregate([aggragate])
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            count: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
        }
      } else {
        result = await Relation.aggregate([
          {
            $match: {
              status: 1,
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
          {
            $project: {
              name: 1,
              location: 1,
              status: 1
            }
          },
        ]);
        if (!result.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
        } else {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  getRelationbyId: async (req, res) => {
    try {
      const id = req.query.id
      const result = await Relation.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        }
      ])
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found ", data: result })
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found", result: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateRelation: async (req, res) => {
    try {
      const id = req.query.id;
      const reqbody = req.body
      let payload = {}
      if (reqbody.name) {
        payload['name'] = reqbody.name
      }
      if (reqbody?.location?.length) {
        payload['location'] = reqbody.location?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (reqbody.status == 1 || reqbody.status == 0) {
        payload['status'] = reqbody.status == 1 ? 1 : 0
      }
      const result = await Relation.findByIdAndUpdate(id, payload)
      if (result) {
        return res.status(200).json({ status: 200, message: "Updated Successfully", data: result })
      } else {
        return res.status(401).json({ status: 401, message: "Something Went Wrong", data: {} })
      }
    } catch (error) {
      console.log(error)
    }
  },
  addSponsorType: async (req, res) => {
    try {
      let payload = req.body;
      console.log(payload)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < payload.length; i++) {
        let location = payload[i].location?.map((id) => mongoose.Types.ObjectId(id.value))
        let sponsortype = payload[i].sponsortype
        let payloadObj = {
          location: location,
          sponsortype: sponsortype,
          status: 1,
        };
        let existData = await Sponsor_Type.findOne({
          sponsortype: sponsortype
        });
        console.log(payloadObj)
        if (!existData) {
          let result = await Sponsor_Type.create(payloadObj);
          resultArray.push(result);
          count++;
        } else {
          existArray.push(existData);
        }
      }
      if (count) {
        return res.status(200).json({ status: 200, message: "Data Added Successfully !", data: resultArray });
      }
      else if (existArray.length) {
        return res.status(403).json({ status: 403, message: "Data Already Exist ", data: existArray });
      }
      else {
        return res.status(404).json({ status: 404, message: "Data Not Added ", data: existArray });
      }

    } catch (error) {
      console.log(error)
    }
  },
  getsponsortype: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;

      if (page || limit) {
        let result = await Sponsor_Type.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ])
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Sponsor_Type.countDocuments();

        if (result) {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result, total: count });
        } else {
          return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
        }
      } else {
        let result = await Sponsor_Type.aggregate([
          {
            $match: { status: 1 },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ])
        if (result) {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
        } else {
          return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
        }
      }

    } catch (error) {
      console.log(error)
    }
  },
  getSponsortypeId: async (req, res) => {
    try {
      let id = req.query.id
      let result = await Sponsor_Type.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  updatesponsortype: async (req, res) => {
    try {
      let id = req.query.id
      let location = req.body.location?.map((id) => mongoose.Types.ObjectId(id))

      let payload = {}
      if (req.body?.sponsortype) {
        payload['sponsortype'] = req.body?.sponsortype
      }
      if (req.body?.location) {
        payload['location'] = location
      }


      let result = await Sponsor_Type.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true, updatedAt: new Date() }
      );
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  updatesponsortypestatus: async (req, res) => {
    try {
      let id = req.query.id
      let status = req.body.status
      let result = await Sponsor_Type.findByIdAndUpdate(
        { _id: id },
        { status: status },
        { new: true, updatedAt: new Date() }
      );
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  deletesponsortype: async (req, res) => {
    try {
      let id = req.query.id
      let result = await Sponsor_Type.findByIdAndDelete(id)
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Deleted Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Deleted ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  addWorkLocation: async (req, res) => {
    try {
      let payload = req.body;
      console.log(payload)

      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < payload.length; i++) {
        let location = payload[i].location?.map((id) => mongoose.Types.ObjectId(id.value))
        let worklocation = payload[i].worklocation
        let payloadObj = {
          location: location,
          worklocation: worklocation,
          status: 1,
        };
        let existData = await Work_Location.findOne({
          worklocation: worklocation
        });
        console.log(payloadObj)
        if (!existData) {
          let result = await Work_Location.create(payloadObj);
          resultArray.push(result);
          count++;
        } else {
          existArray.push(existData);
        }
      }
      if (count) {
        return res.status(200).json({ status: 200, message: "Data Added Successfully !", data: resultArray });
      }
      else if (existArray.length) {
        return res.status(403).json({ status: 403, message: "Data Already Exist ", data: existArray });
      }
      else {
        return res.status(404).json({ status: 404, message: "Data Not Added ", data: existArray });
      }

    } catch (error) {
      console.log(error)
    }
  },
  getWorkLocation: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;

      if (page || limit) {
        let result = await Work_Location.aggregate([
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ])
          .skip((page - 1) * limit)
          .limit(limit * 1)
          .exec();
        const count = await Work_Location.countDocuments();

        if (result) {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result, total: count });
        } else {
          return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
        }
      } else {
        let result = await Work_Location.aggregate([
          {
            $match: { status: 1 },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "location",
            },
          },
        ])
        if (result) {
          return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
        } else {
          return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
        }
      }

    } catch (error) {
      console.log(error)
    }
  },
  getWorkLocationId: async (req, res) => {
    try {
      let id = req.query.id
      let result = await Work_Location.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateWorkLocation: async (req, res) => {
    try {
      let id = req.query.id
      let location = req.body.location?.map((id) => mongoose.Types.ObjectId(id))

      let payload = {}
      if (req.body?.worklocation) {
        payload['worklocation'] = req.body?.worklocation
      }
      if (req.body?.location) {
        payload['location'] = location
      }


      let result = await Work_Location.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true, updatedAt: new Date() }
      );
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateWorkLocationstatus: async (req, res) => {
    try {
      let id = req.query.id
      let status = req.body.status
      let result = await Work_Location.findByIdAndUpdate(
        { _id: id },
        { status: status },
        { new: true, updatedAt: new Date() }
      );
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  deleteWorkLocation: async (req, res) => {
    try {
      let id = req.query.id
      let result = await Work_Location.findByIdAndDelete(id)
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Deleted Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Deleted ", data: {} });
      }
    } catch (error) {
      console.log(error)
    }
  },
  addBusinessEntityTopup: async (req, res) => {
    try {
      let payload = req.body;
      if (payload.location) {
        payload.location = mongoose.Types.ObjectId(payload.location);
      }
      if (payload.lob) {
        payload.lob = mongoose.Types.ObjectId(payload.lob);
      }
      if (payload?.company) {
        const compArr = payload.company;
        const rates = payload.rate;
        const PayloadArr = [];
        const rateArr = rates.includes(",") ? rates.split(",") : [rates];
        for (let i = 0; i < compArr.length; i++) {
          const obj = {
            company_id: mongoose.Types.ObjectId(compArr[i].id),
            company_name: compArr[i].company_name,
            rate: rateArr[i],
          };
          PayloadArr.push(obj);
        }
        payload.company = PayloadArr;
      }
      if (payload?.rate) {
        payload.rate = payload.rate;
      }

      console.log(payload);
      let result;
      result = new BusinessEntityTopup(payload);
      result = await result.save();
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: result,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateBusinessEntityTopup: async (req, res) => {
    try {
      let payload = req.body;
      if (payload.location) {
        payload.location = mongoose.Types.ObjectId(payload.location);
      }
      if (payload.lob) {
        payload.lob = mongoose.Types.ObjectId(payload.lob);
      }
      if (payload.company) {
        const compArr = payload.company;
        const rates = payload.rate;
        const PayloadArr = [];
        const rateArr = rates.includes(",") ? rates.split(",") : [rates];
        for (let i = 0; i < compArr.length; i++) {
          const obj = {
            company_id: mongoose.Types.ObjectId(compArr[i].id),
            company_name: compArr[i].company_name,
            rate: rateArr[i],
          };
          PayloadArr.push(obj);
        }
        payload.company = PayloadArr;
      }
      if (payload?.rate) {
        payload.rate = payload.rate;
      }
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await BusinessEntityTopup.findByIdAndUpdate(
        id,
        payload,
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getBusinessEntityTopup: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {},
              },
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locatins",
                },
              },
              {
                $lookup: {
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
                },
              },
              {
                $lookup: {
                  from: "companies",
                  localField: "company",
                  foreignField: "_id",
                  as: "companyDetails",
                },
              },
              {
                $project: {
                  desciption: 1,
                  "locatins.location_name": 1,
                  "lobDetails.line_of_business_name": 1,
                  // "companyDetails.company_name":1,
                  // lob:1,
                  company: 1,
                  rate: 1,
                  status: 1,
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },

              {
                $limit: limit,
              },
              {
                $skip: (page - 1) * limit,
              },
            ],
          },
        };
        result = await BusinessEntityTopup.aggregate([aggregate]);
        if (!result.length) {
          return res
            .status(404)
            .json({
              status: 404,
              message: "Data Not Found",
              data: [],
              count: 0,
            });
        }
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
      }
      result = await BusinessEntityTopup.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lobDetails",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "locatins",
          },
        },

        {
          $project: {
            desciption: 1,
            "lobDetails.line_of_business_name": 1,
            "locatins.location_name": 1,
            rate: 1,
            status: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getBusinessEntityTopupById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await BusinessEntityTopup.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        // {
        //     $lookup:{
        //         from: "companies",
        //         localField: "company",
        //         foreignField: "_id",
        //         as: "companyDetails"
        //       }
        // },

        {
          $project: {
            company: 1,
            desciption: 1,
            location: 1,
            lob: 1,
            rate: 1,
            status: 1,
          },
        },
      ]);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result[0],
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  update_business_entity_Topup_status: async (req, res) => {
    try {
      const status = req.body?.be_status;
      let id = req.body?.id;
      console.log(status);
      let newdetails = await BusinessEntityTopup.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
          },
        },
        { new: true }
      );
      if (newdetails != null) {
        res.json({
          status: 200,
          message: "Status Updated Succesfully",
          data: newdetails,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err);
    }
  },
  get_Make_Model_and_Variant: async (req, res) => {
    try {
      const limit = +req.query.limit
      const page = +req.query.page
      let payload = req.body;
      let query = req.query
      let name = query?.name
      let status = +query?.status
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {};
      // let matchMake = {}
      // let matchModel = {}
      if (name) {
        match = {
          'variants.motor_model_detail_name': {
            $regex: name,
            $options: "i"
          }
        }
      }

      match["variants.motor_model_detail_location"] = {
        $in: userLocation
      }
      if (status == 1 || status == 0) {
        match["variants.motor_model_detail_status"] = status
      }
      if (payload?.makeId) {
        match["variants.motor_model_make_id"] = mongoose.Types.ObjectId(
          payload?.makeId
        );
      }
      if (payload?.modelId) {
        match["variants.motor_model_detail_model_id"] = mongoose.Types.ObjectId(
          payload?.modelId
        );
      }
      let facet = {};
      let aggregate = [];
      facet["totalCount"] = [
        {
          $count: "total",
        },
      ];
      facet["data"] = [
        {
          $lookup: {
            from: "motor_models",
            localField: "_id",
            foreignField: "motor_model_make_id",
            as: "motor_models"
          }
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
          $unwind: {
            path: "$motor_models",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "motor_model_details",
            localField: "motor_models._id",
            foreignField: "motor_model_detail_model_id",
            as: "variants"
          }
        },
        {
          $project: {
            make_motor_name: 1,
            motor_models: 1,
            variants: 1
          }
        },

        // {
        //   $group: {
        //     _id: "$_id",
        //     make_motor_name: {
        //       $first: "$make_motor_name"
        //     },
        //     motor_models: {
        //       $push: "$motor_models"
        //     }
        //   }
        // },
        {
          $unwind: {
            path: "$variants",
            preserveNullAndEmptyArrays: true
          }
        },

        {
          $lookup: {
            from: "body_types",
            localField: "variants.motor_model_detail_body_type",
            foreignField: "_id",
            as: "variants.motor_model_detail_body_type"
          }
        },
        {
          $unwind: {
            path: "$variants.motor_model_detail_body_type",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $match: match,
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              make_motor_name: "$make_motor_name",
              motor_models: "$motor_models.motor_model_name",
            },

            make_motor_name: { $first: "$make_motor_name" },
            motor_models: { $first: "$motor_models" },
            value: {
              $push: "$variants"
            }
          }
        },

        {
          $addFields: {
            "motor_models.variants": "$value",
            "_id": "$_id._id"
          }
        },
        {
          $project: {
            make_motor_name: 1,
            motor_models: 1
          }
        },

        {
          $group: {
            _id: "$_id",
            make_motor_name: { $first: "$make_motor_name" },
            motor_models: { $push: "$motor_models" },
          }
        },
        {
          $sort: {
            "make_motor_name": 1,
            // "motor_models.motor_model_name": 1
          }
        },
      ];
      aggregate.push({
        $facet: facet,
      });
      const result = await make_motor_model.aggregate(aggregate)
      if (!result) {
        return res.status(404).json({
          status: 404, message: "Data Not Found", data: result[0]?.data,
          total: result[0]?.totalCount[0]?.total,
        });
      } else {
        return res.status(200).json({
          status: 200, message: "Data Not Found",
          data: result[0]?.data,
          total: result[0]?.totalCount[0]?.total,
        });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getCompaniesPlans: async (req, res) => {
    try {
      let query = req.query
      let name = query?.name
      let status = +query.status
      let body_type = query?.body_type
      let plan_for = query?.plan_for
      let plan_category = query?.plan_category
      let electric_vehicle = +query?.electric_vehicle
      let repair_type = query?.repair_type
      let policy_type = query?.policy_type

      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => (obj?.loc_id))
      let match = {}
      match["plans.location.value"] = {
        $in: userLocation
      }
      if (name) {
        if (name) {
          match = {
            'plans.plan_name': {
              $regex: name,
              $options: 'i'
            }
          }
        }
      }
      if (query?.companyId) {
        match["plans.company_id"] = mongoose.Types.ObjectId(
          query.companyId
        );
      }
      if (query?.policy_typeId) {
        match["plans.policy_type_id"] = mongoose.Types.ObjectId(
          query.policy_typeId
        );
      }
      if (status == 0 || status == 1) {
        match["plans.status"] = status;
      }
      if (body_type) {
        match["plans.body_type._id"] = body_type;
      }
      if (plan_for) {
        match["plans.plan_for._id"] = plan_for;
      }
      if (plan_category) {
        match["plans.plan_category_id"] = mongoose.Types.ObjectId(
          plan_category
        );
      }
      if (electric_vehicle == 0 || electric_vehicle == 1) {
        match["plans.electric_vehicle"] = electric_vehicle;
      }
      if (repair_type) {
        match["plans.repair_type_id._id"] = repair_type;
      }

      const result = await Company.aggregate(
        [
          {
            $lookup: {
              from: "motor_plans",
              localField: "_id",
              foreignField: "company_id",
              as: "plans"
            }
          },
          {
            $unwind: {
              path: "$plans",
              includeArrayIndex: 'string'
            }
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "plans.policy_type_id",
              foreignField: "_id",
              as: "plans.policy_type"
            }
          },
          {
            $match: match
          },
          {
            $unwind: {
              path: "$plans.policy_type",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: {
                _id: "$_id",
                company_name: "$company_name"
              },
              comprehensive_plans: {
                $push: {
                  $cond: [
                    { $eq: ["$plans.policy_type.policy_type_name", "Comprehensive"] },
                    "$plans",
                    "$$REMOVE"
                  ]
                }
              },
              tpl_plans: {
                $push: {
                  $cond: [
                    { $eq: ["$plans.policy_type.policy_type_name", "Third Party Liability (TPL)"] },
                    "$plans",
                    "$$REMOVE"
                  ]
                }
              }
            }
          },
          {
            $sort: {
              "_id.company_name": 1,
            }
          },
          {
            $project: {
              _id: "$_id._id",
              company_name: "$_id.company_name",
              comprehensive_plans: 1,
              tpl_plans: 1
            }
          }
        ]

      )
      if (!result) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] });
      } else {
        return res.status(200).json({ status: 200, message: "Data Not Found", data: result });
      }
    } catch (error) {
      console.log(error)
    }
  },
  read_yacht_model_details_excel: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      };
      let count = 0;
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (!xlData.length) {
        return res
          .status(400)
          .json({ status: 400, message: "Excel Sheet is Blank " });
      }
      console.log("excel data >>>>>>>>>>>>>>>>>>>>>>>", xlData)
      for (let i = 0; i < xlData.length; i++) {
        let bodyTypeId;
        let makeDtails;
        let modelDetails;
        let YachtModelDetails;
        let locationArray = [];
        let locationInexcel =
          xlData[i]?.yacht_model_detail_location
        locationInexcel = locationInexcel.split(",");
        for (let i = 0; i < locationInexcel.length; i++) {
          let allLocations = await location_model.findOne({
            location_name: locationInexcel[i]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        makeDtails = await yachtMake.findOneAndUpdate(
          { name: await typeConversion(xlData[i]?.yacht_make) },
          {
            name: await typeConversion(xlData[i]?.yacht_make),
            location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );
        bodyTypeId = await Yacht_Body_type.findOneAndUpdate(
          {
            yacht_body_type: await typeConversion(
              xlData[i]?.yacht_body_type
            ),
          },
          {
            yacht_body_type: await typeConversion(
              xlData[i]?.yacht_body_type
            ),
            yacht_body_type_location: locationArray,
          },
          { upsert: true, returnOriginal: false }
        );

        let YachtDetailsObj = {}
        YachtDetailsObj["name"] = await typeConversion(
          xlData[i]?.yacht_model_name
        ),
          YachtDetailsObj["MakeId"] = makeDtails?._id?.toString()
        YachtDetailsObj["start_year"] = +xlData[i]?.yacht_model_start_year
        YachtDetailsObj["bodyTypeId"] = bodyTypeId?._id?.toString()
        YachtDetailsObj["engine"] = xlData[i]?.yacht_engine
        YachtDetailsObj["minValue"] = xlData[i]?.yacht_model_detail_min
        YachtDetailsObj["maxValue"] = xlData[i]?.yacht_model_detail_max
        YachtDetailsObj["noOfDep"] = +xlData[i]?.number_of_dep
        YachtDetailsObj["Mindep"] = +(await typeConversion(
          xlData[i]?.yacht_model_detail_min_dep
        )),
          YachtDetailsObj["maxDep"] = xlData[i]?.yacht_model_detail_max_dep
        if (xlData[i]?.yacht_model_detail_discontinuation_year) {
          YachtDetailsObj["yacht_model_detail_discontinuation_year"] =
            +xlData[i]?.yacht_model_detail_discontinuation_year
        }
        YachtDetailsObj['location'] = locationArray
        modelDetails = await yachtModel.findOneAndUpdate(
          {
            name: await typeConversion(
              xlData[i]?.yacht_model_name
            ),
            MakeId: makeDtails?._id,
            bodyTypeId: bodyTypeId?._id,
            start_year:
              +xlData[i]?.yacht_model_start_year,
          },
          YachtDetailsObj,
          { upsert: true, returnOriginal: false }
        );

        count++;
      }

      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Data Saved Successfully !" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Not  Saved Successfully " });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  getYachtCompaniesPlans: async (req, res) => {
    try {
      let query = req.query
      let name = query?.name
      let status = +query.status
      let match = {}
      if (name) {
        if (name) {
          match = {
            'plans.plan_name': {
              $regex: name,
              $options: 'i'
            }
          }
        }
      }
      if (query?.companyId) {
        match["plans.company_id"] = mongoose.Types.ObjectId(
          query.companyId
        );
      }
      if (query?.policy_typeId) {
        match["plans.policy_type_id"] = mongoose.Types.ObjectId(
          query.policy_typeId
        );
      }
      if (status == 0 || status == 1) {
        match["plans.status"] = status;
      }
      // if (body_type) {
      //   match["plans.body_type._id"] = body_type;
      // }
      // if (plan_for) {
      //   match["plans.plan_for._id"] = plan_for;
      // }
      // if (plan_category) {
      //   match["plans.plan_category_id"] = mongoose.Types.ObjectId(
      //     plan_category
      //   );
      // }
      // if (electric_vehicle == 0 || electric_vehicle == 1) {
      //   match["plans.electric_vehicle"] = electric_vehicle;
      // }
      // if (repair_type) {
      //   match["plans.repair_type_id._id"] = repair_type;
      // }

      const result = await Company.aggregate(
        [
          {
            $lookup: {
              from: "yacht_plans",
              localField: "_id",
              foreignField: "company_id",
              as: "plans"
            }
          },
          {
            $unwind: {
              path: "$plans",
              includeArrayIndex: 'string'
            }
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "plans.policy_type_id",
              foreignField: "_id",
              as: "plans.policy_type"
            }
          },
          {
            $match: match
          },
          {
            $unwind: {
              path: "$plans.policy_type",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: {
                _id: "$_id",
                company_name: "$company_name"
              },
              comprehensive_plans: {
                $push: {
                  $cond: [
                    { $eq: ["$plans.policy_type.policy_type_name", "Comprehensive"] },
                    "$plans",
                    "$$REMOVE"
                  ]
                }
              },
              tpl_plans: {
                $push: {
                  $cond: [
                    { $eq: ["$plans.policy_type.policy_type_name", "Third Party Liability (TPL)"] },
                    "$plans",
                    "$$REMOVE"
                  ]
                }
              }
            }
          },
          {
            $sort: {
              "_id.company_name": 1,
            }
          },
          {
            $project: {
              _id: "$_id._id",
              company_name: "$_id.company_name",
              comprehensive_plans: 1,
              tpl_plans: 1
            }
          }
        ]

      )
      if (!result) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] });
      } else {
        return res.status(200).json({ status: 200, message: "Data Not Found", data: result });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getTravelHomeMedicalCompaniesPlans: async (req, res) => {
    try {
      let query = req.query
      let name = query?.name
      let status = +query.status
      let lob = query.lob
      let collection = ''
      if (lob == 'travel') {
        collection = 'travel_plans'
      } else if (lob == 'home') {
        collection = 'home_plans'
      } else if (lob == 'medical') {
        collection = 'medical_plans'
      }
      let match = {}
      if (name) {
        if (name) {
          match = {
            'plans.plan_name': {
              $regex: name,
              $options: 'i'
            }
          }
        }
      }
      if (query?.companyId) {
        match["plans.company_id"] = mongoose.Types.ObjectId(
          query.companyId
        );
      }

      if (status == 0 || status == 1) {
        match["plans.status"] = status;
      }

      const result = await Company.aggregate(
        [
          {
            $lookup: {
              from: collection,
              localField: "_id",
              foreignField: "company_id",
              as: "plans"
            }
          },
          {
            $unwind: {
              path: "$plans",
              includeArrayIndex: 'string',
            }
          },
          {
            $match: match
          },
          {
            $group: {
              _id: {
                _id: "$_id",
                company_name: "$company_name"
              },
              plans: { $push: "$plans" }
            }
          },
          {
            $sort: {
              "_id.company_name": 1,
            }
          },
        ]
      )
      if (!result) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] });
      } else {
        return res.status(200).json({ status: 200, message: "Data Found", data: result });
      }
    } catch (error) {
      console.log(error)
    }
  },
};

