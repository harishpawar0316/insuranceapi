const mongoose = require("mongoose");
const axios = require("axios");
const line_of_business_model = require("../models/Line_of_business");
const motor_plan_model = require("../models/Motor_plan");
const PolicyType = require("../models/Policy_type");
const Standard_cover = require("../models/Standard_cover");
const Additional_cover = require("../models/Additional_cover");
const Nationality = require("../models/Nationality");
const Black_list_vehicle = require("../models/Black_list_vehicle");
const CompanyModel = require("../models/Company");
const PlaneCategoryModel = require("../models/Plan_category");
const Nature_of_plan_model = require("../models/Nature_of_plan");
const bodyTypeModel = require("../models/Body_type");
const repairTypeModel = require("../models/Repair_type");
const planForModel = require("../models/Plan_for");
const businessTypeModel = require("../models/Business_type");
const nationalityModel = require("../models/Nationality");
const MoterModel = require("../models/Make_motor");
const GccModel = require("../models/Plan_for_gcc_spec");
const travel_plan_model = require("../models/Travel_plan");
const TravelTypeModel = require("../models/Travel_type");
const CountryModels = require("../models/Country");
const TravelInsuranceModel = require("../models/Travel_insurance_for");
const TravelPlanPriceModel = require("../models/Travel_plan_price");
const NewLeadsModels = require("../models/New_Lead");
const moterDetailsModels = require("../models/Motor_model_details");
const home_plan_model = require("../models/HomePlan");
const yacht_plan = require("../models/YachtPlan");
const XLSX = require("xlsx");
const Home_property_type_list = require("../models/Home_property_type_list");
const Home_plan_type_list = require("../models/Home_plan_type_list");
const Home_ownership_status_list = require("../models/Home_ownership_status_list");
const ComprehensiveYachtPlan = require("../models/YachtPlan");
const Plan_for = require("../models/Plan_for");
const Yacht_body_type_list = require("../models/Yacht_body_type_list");
const Business_type = require("../models/Business_type");
const Yacht_hull_material_list = require("../models/Yacht_hull_material_list");
const Yacht_horsepower_list = require("../models/Yacht_horsepower_list");
const Yacht_engine_type_list = require("../models/Yacht_engine_type_list");
const Yacht_speed_knots_list = require("../models/Yacht_speed_knots_list");
const Policy_type = require("../models/Policy_type");
const planNatureModels = require("../models/Nature_of_plan");
const companiesModels = require("../models/Company");
const home_condition = require("../models/Home_condition");
const travel_types_models = require("../models/Travel_type");
const travel_insurance_fors_models = require("../models/Travel_insurance_for");
const travel_plan_types_models = require("../models/Travel_plan_type");
const Countries_models = require("../models/Country");
const travelRegionModels = require("../models/Travel_region_list");
const { Customer } = require("../models/Customer");
const { sendEmail } = require("../helper/sendEmail");
const { sendServerEmail } = require("../helper/sendEmail")
const planCategoriesModels = require("../models/Plan_category");
const TravelPlanCoverTypeModel = require("../models/Travel_cover_type_list");
const Yacht_Conditions = require("../models/Yacht_Conditions");
const MedicalPlan = require("../models/MedicalPlan");
const Medical_visa_country_list = require("../models/Medical_visa_country_list");
const Medical_plan_condition_list = require("../models/Medical_plan_condition_list");
const Medical_plan_typelist = require("../models/Medical_plan_typelist");
const Medical_salary_range_list = require("../models/Medical_salary_range_list");
const Nature_of_plan = require("../models/Nature_of_plan");
const TableBenefits = require("../models/TableBenefits");
const YachtPlan = require("../models/YachtPlan");
const MedicalPlanBMI = require("../models/MedicalPlanBMI");
const homePropertyTypeModels = require("../models/Home_property_type_list");
const homeOwnerShipStatusModels = require("../models/Home_ownership_status_list");
const homePlanTypeModels = require("../models/Home_plan_type_list");
const homeConditionModels = require("../models/Home_condition");
const StandardUnderwritingCond = require("../models/StandardUnderwritingCond");
const AdditionalUnderwritingCond = require("../models/AdditionalUnderwritingCond");
const UnderwritingConditions = require("../models/UnderwritingConditions");
const RatesBasedOnAge = require("../models/RatesBasedOnAge");
const Area_of_registrationModel = require("../models/Area_of_registration");
const additionalCoverModels = require("../models/Additional_cover");
const YatchPlanModels = require("../models/YachtPlan")
const EmirateModels = require("../models/Medical_visa_country_list")
const visaTypeModels = require("../models/Medical_plan_condition_list")
const medicalSalaryModels = require("../models/Medical_salary_range_list")
const MedicalPlansModels = require("../models/MedicalPlan")
const Admin = require("../models/Admin")
const makeMoterModels = require("../models/Motor_model")
const getQatarMotorPlans = require("../helper/thirdPartyApi")
const standardCoverModels = require("../models/Standard_cover")
const nationalityModels = require("../models/Nationality")
const repairTypeModels = require("../models/Repair_type")
const gccModels = require("../models/Plan_for_gcc_spec")
const policyTypeModels = require("../models/Policy_type")
const locationsModels = require("../models/Locations")
const vatModels = require('../models/Vat')
const yachtYearModels = require("../models/yachtYear")
const yachtMakeModels = require("../models/yachtMake")
const yachtModelsDetailsModels = require("../models/yachtModels")
const discountMoidels = require("../models/DiscountCoupon")
const company_models = require("../models/Company")
const YachtVarientModels = require("../models/yachtModels")
const md5 = require("md5");
const GroupMedicalPlan = require("../models/GroupMedicalPlan");
const { bussinesEntityTopup } = require("../helper/bussineseEntityTopup")
const userType = require("../helper/userType.json")
const util = require('util')

let cookie = "BIGipServeruat_qic_8082=!tIP/95US05VZlmf5V8AGSUoVe+1VALj53ztjhYYbmSVyNpLRimK9Aup1X2PmW5YNmLL82q4eF439v2A=; TS0140665d=01f00338fe9b41db83c5868dd527abd8139771c7cab53a326e071d33a07fed700dcb493bfbcfdc5894b41a2372f5ca48b7a62853d7; TS0192ab24=01f00338fe5eece61a3a85af737262c740949bdb33e149d4932a138e8945e94f63c382b509d6eefddb154d3c7b162f60f17312cc7d112b3b7b8dd1c784c8ac430ed4920b0e6db4524351279297f29dfde6d79a9633; TS013cbdd4=01f00338fee8f98670fc007f85001c93f2069fdce0c7f269d01abee74d64cbe9a94f93c22d3a77c850540faca00d226461ad92d9ab";

module.exports = {
  addMotorPlan: async (req, res) => {
    try {
      let count = 0;
      let present = 0;
      let user = req?.user
      let createdby
      let userlocation = user?.location
      createdby = userlocation[0]
      const line_of_business_name = "Motor";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });

      const datalen = req.body?.rowsData?.length;

      for (let i = 0; i < datalen; i++) {

        let payloadObj = {}
        const rowsData = req.body.rowsData || [];

        for (let i = 0; i < rowsData.length; i++) {
          const rowData = rowsData[i];
          console.log(rowData)
          const policy_type_name = rowData["policy_type"];
          const policy_type = await PolicyType.findOne({
            policy_type_name: policy_type_name,
          });
          let planfound = await motor_plan_model.find({ plan_name: rowData?.plan_name })
          if (planfound.length < 1) {

            if (rowData?.age) {
              const age = rowData.age.includes(",") ? rowData.age.split(",") : [rowData.age];
              const agetopup = rowData.agetopup?.includes(",") ? rowData.agetopup?.split(",") : [rowData.agetopup];
              let age_arr = []

              for (let j = 0; j < age.length; j++) {

                const ageRange = age[j].split("-");
                const ageMin =
                  ageRange.length > 0 ? parseInt(ageRange[0].trim()) : 0;
                const ageMax =
                  ageRange.length > 1 ? parseInt(ageRange[1].trim()) : ageMin;

                age_arr.push({
                  ageMin,
                  ageMax,
                  agetopup: agetopup[j] ? agetopup[j].trim() : 0,
                });
                payloadObj["age_or_topup"] = age_arr
              }
            }
            if (rowData?.drivingexp) {
              let drivingex_parr = [];
              const drivingexp = rowData.drivingexp.includes(",") ? rowData.drivingexp.split(",") : [rowData.drivingexp];
              const drivingexptopup = rowData.drivingexptopup?.includes(",") ? rowData.drivingexptopup?.split(",") : [rowData.drivingexptopup];

              if (drivingexp.length) {
                for (let j = 0; j < drivingexp.length; j++) {
                  const drivingExpRange = drivingexp[j].split("-");
                  const drivingExpMin =
                    drivingExpRange.length > 0
                      ? parseInt(drivingExpRange[0].trim())
                      : 0;
                  const drivingExpMax =
                    drivingExpRange.length > 1
                      ? parseInt(drivingExpRange[1].trim())
                      : drivingExpMin;

                  drivingex_parr.push({
                    drivingExpMin,
                    drivingExpMax,
                    drivingexptopup: drivingexptopup[j]
                      ? drivingexptopup[j].trim()
                      : 0,
                  });
                }
                payloadObj["drivingexp_or_topup"] = drivingex_parr

              }
            }
            if (rowData?.homedrivingexp) {
              let homedrivingexp_arr = [];
              const homedrivingexp = rowData.homedrivingexp.includes(",") ? rowData.homedrivingexp.split(",") : [rowData.homedrivingexp];
              const homedrivingexptopup = rowData.homedrivingexptopup?.includes(",") ? rowData.homedrivingexptopup?.split(",") : [rowData.homedrivingexptopup];

              if (homedrivingexp.length) {
                for (let j = 0; j < homedrivingexp.length; j++) {
                  const homeDrivingExpRange = homedrivingexp[j].split("-");
                  const homeDrivingExpMin =
                    homeDrivingExpRange.length > 0
                      ? parseInt(homeDrivingExpRange[0].trim())
                      : 0;
                  const homeDrivingExpMax =
                    homeDrivingExpRange.length > 1
                      ? parseInt(homeDrivingExpRange[1].trim())
                      : homeDrivingExpMin;

                  homedrivingexp_arr.push({
                    homeDrivingExpMin,
                    homeDrivingExpMax,
                    homedrivingexptopup: homedrivingexptopup[j]
                      ? homedrivingexptopup[j].trim()
                      : 0,
                  });
                }
                payloadObj["homedrivingexp_or_topup"] = homedrivingexp_arr

              }
            }
            if (rowData?.claimyears) {
              const claimyearsarr = [];
              const claimyears = rowData?.claimyears.includes(",") ? rowData.claimyears.split(",") : [rowData.claimyears];
              const claimyeardisc = rowData?.claimyeardisc?.includes(",") ? rowData.claimyeardisc?.split(",") : [rowData.claimyeardisc];

              for (let j = 0; j < claimyears.length; j++) {
                claimyearsarr.push({
                  claimyears: claimyears[j].trim().replace(/\s+/g, ""),
                  claimyeardisc: claimyeardisc[j].trim().replace(/\s+/g, ""),
                });
              }
              payloadObj["claimyears_or_topup"] = claimyearsarr
            }
            if (rowData?.policy_type == 'Third Party Liability (TPL)') {
              const body_type_arr = [];
              const cyldr = rowData?.cylinders
              const body_type = rowData?.body_type_name;//
              const minprimarray = rowData?.min_premium?.includes(",") ?
                rowData?.min_premium?.split(",")
                : [rowData?.min_premium];
              const primArray = rowData?.premium?.includes(",") ?
                rowData?.premium?.split(",")
                : [rowData?.premium];
              for (let j = 0; j < body_type.length; j++) {
                for (let k = 0; k < cyldr.length; k++) {
                  body_type_arr.push({
                    _id: body_type[j]["_id"],
                    body_type_name: body_type[j]["body_type_name"],
                    cylinder: cyldr[k]["id"],
                    min_premium: minprimarray[k] ? minprimarray[k] : 0,
                    premium: primArray[k] ? primArray[k] : 0,

                  });

                }
              }
              payloadObj["body_type"] = body_type_arr
            } else {
              const body_type_arr = [];
              const body_type = rowData?.body_type_name;

              for (let j = 0; j < body_type.length; j++) {
                body_type_arr.push({
                  _id: body_type[j]["_id"],
                  body_type_name: body_type[j]["body_type_name"],
                });
              }
              payloadObj["body_type"] = body_type_arr
            }
            if (rowData?.repair_condition_id) {
              const repair_type_arr = [];
              const repair_type = rowData?.repair_condition_id;
              for (let j = 0; j < repair_type.length; j++) {
                repair_type_arr.push({
                  _id: repair_type[j]["_id"],
                  repair_type_name: repair_type[j]["repair_type_name"],
                });
              }
              payloadObj["repair_type_id"] = repair_type_arr

            }

            if (rowData?.gcc_spec) {

              const plan_for_gcc_spec_arr = [];

              const plan_for_gcc_spec_name = rowData?.gcc_spec;
              const gccspecstopup = rowData?.gccspecstopup.split(",");

              for (let j = 0; j < plan_for_gcc_spec_name.length; j++) {
                plan_for_gcc_spec_arr.push({
                  _id: plan_for_gcc_spec_name[j]["_id"],
                  plan_for_gcc_spec_name:
                    plan_for_gcc_spec_name[j]["plan_for_gcc_spec_name"],
                  gccspecstopup: gccspecstopup[j] ? gccspecstopup[j].trim().replace(/\s+/g, "") : 0,
                });
              }
              payloadObj["plan_for_gcc_spec_name_or_topup"] = plan_for_gcc_spec_arr

            }

            if (rowData?.nationality) {
              const nationalityarr = [];
              const nationality_name = rowData?.nationality;
              const nationalitytopup = rowData?.NationalTopup?.includes(",") ? rowData?.NationalTopup?.split(",") : [rowData?.NationalTopup];
              for (let j = 0; j < nationality_name.length; j++) {
                nationalityarr.push({
                  _id: nationality_name[j]["_id"],
                  nationality_name: nationality_name[j]["nationality_name"],
                  nationalitytopup: nationalitytopup[j] ? nationalitytopup[j]?.trim().replace(/\s+/g, "") : 0,
                });
              }
              payloadObj["nationality_or_topup"] = nationalityarr

            }
            if (rowData?.make_motor) {
              const make_motor_arr = [];
              const make_motor_topup = rowData?.car_model_topup?.includes(",") ? rowData?.car_model_topup.split(",") : [rowData?.car_model_topup];
              const make_motor = rowData?.make_motor;
              for (let j = 0; j < make_motor.length; j++) {
                make_motor_arr.push({
                  _id: make_motor[j]["_id"],
                  make_motor_name: make_motor[j]["make_motor_name"],
                  make_motor_topup: make_motor_topup[j]
                });
              }
              payloadObj["make_motor"] = make_motor_arr

            }

            if (rowData?.age_of_the_car) {
              const age_of_the_car_or_arr = [];
              const age_of_the_car = rowData.age_of_the_car.includes(",") ? rowData.age_of_the_car.split(",") : [rowData.age_of_the_car];
              const age_of_the_car_topup =
                rowData.age_of_the_car_topup?.includes(",") ? rowData.age_of_the_car_topup?.split(",") : [rowData.age_of_the_car_topup];

              if (age_of_the_car.length) {
                for (let j = 0; j < age_of_the_car_topup.length; j++) {
                  const age_of_the_car_range = age_of_the_car[j].split("-");
                  const age_of_the_car_min =
                    age_of_the_car_range.length > 0
                      ? parseInt(age_of_the_car_range[0].trim())
                      : 0;
                  const age_of_the_car_max =
                    age_of_the_car_range.length > 1
                      ? parseInt(age_of_the_car_range[1].trim())
                      : age_of_the_car_min;

                  age_of_the_car_or_arr.push({
                    age_of_the_car_min,
                    age_of_the_car_max,
                    age_of_the_car_or_topup: age_of_the_car_topup[j]
                      ? age_of_the_car_topup[j].trim()
                      : 0,
                  });
                }
              }
              payloadObj["age_of_the_car_or_topup"] = age_of_the_car_or_arr
            }
            if (rowData?.add_op_con_desc) {
              const add_op_con_desc_arr = [];
              const add_op_con_desc = rowData?.add_op_con_desc.includes(",") ? rowData.add_op_con_desc.split(",") : [rowData?.add_op_con_desc];
              const add_op_con_desc_topup =
                rowData?.add_op_con_desc_topup?.includes(",") ? rowData?.add_op_con_desc_topup?.split(",") : [rowData?.add_op_con_desc_topup];
              const vat = rowData?.vat?.includes(",") ? rowData.vat?.split(",") : [rowData?.vat];
              for (let j = 0; j < add_op_con_desc.length; j++) {
                add_op_con_desc_arr.push({
                  add_op_con_desc: add_op_con_desc[j]?.trim().replace(/\s+/g, ""),
                  add_op_con_desc_topup: add_op_con_desc_topup[j] ? add_op_con_desc_topup[j]?.trim().replace(/\s+/g, "") : 0,
                  vat: vat[j] ? vat[j]?.trim().replace(/\s+/g, "") : 0,
                });
              }
              payloadObj["add_op_con_desc"] = add_op_con_desc_arr
            }
            // if(payload.policy_type == "Third Party Liability (TPL)"){

            if (rowData?.policy_type_name) {
              let last_year_policy_type_or_arr = [];
              const last_year_policy_type = rowData?.policy_type_name;
              const last_year_policy_type_topup =
                rowData?.last_year_policy_type_topup?.includes(",") ?
                  rowData?.last_year_policy_type_topup.split(",") : [rowData?.last_year_policy_type_topup];

              for (let j = 0; j < last_year_policy_type.length; j++) {
                last_year_policy_type_or_arr.push({
                  _id: last_year_policy_type[j]["_id"],
                  last_year_policy_type:
                    last_year_policy_type[j]["policy_type_name"],
                  last_year_policy_type_topup: last_year_policy_type_topup[j] ?
                    last_year_policy_type_topup[j]?.trim().replace(/\s+/g, "") : 0,
                });
              }
              payloadObj["last_year_policy_type_or_topup"] = last_year_policy_type_or_arr

            }
            if (rowData?.plan_for) {
              const plan_for_name_or_arr = [];
              const plan_for_name = rowData?.plan_for;
              const plan_for_topup = rowData?.plan_for_topup?.includes(",") ?
                rowData?.plan_for_topup.split(",") : [rowData?.plan_for_topup]

              for (let j = 0; j < plan_for_name.length; j++) {
                plan_for_name_or_arr.push({
                  _id: plan_for_name[j]["_id"],
                  plan_for_name: plan_for_name[j]["plan_for_name"],
                  plan_for_topup: plan_for_topup[j] ? plan_for_topup[j] : 0
                });
              }
              payloadObj["plan_for"] = plan_for_name_or_arr
            }
            if (rowData?.business_type_id) {
              const business_type_arr = [];
              const business_type = rowData?.business_type_id;

              for (let j = 0; j < business_type.length; j++) {
                business_type_arr.push({
                  _id: business_type[j]["_id"],
                  business_type_name: business_type[j]["business_type_name"],
                });
              }
              payloadObj["business_type_id"] = business_type_arr

            }
            if (rowData?.business_type_name) {
              const business_type_arr = [];
              const business_type = rowData?.business_type_name;

              for (let j = 0; j < business_type.length; j++) {
                business_type_arr.push({
                  _id: business_type[j]["_id"],
                  business_type_name: business_type[j]["business_type_name"],
                });
              }
              payloadObj["business_type_id"] = business_type_arr

            }
            payloadObj["line_of_business_id"] = line_of_business?._id
            payloadObj["company_id"] = rowData?.company_id
            payloadObj["plan_name"] = rowData?.plan_name
            payloadObj["policy_type_id"] = policy_type?._id
            if (rowData?.plan_category_id) {
              payloadObj["plan_category_id"] = rowData?.plan_category_id
            }
            if (rowData?.plan_label) {
              payloadObj["plan_label"] = rowData?.plan_label
            }
            if (rowData?.nature_of_plan_id) {
              payloadObj["nature_of_plan_id"] = rowData?.nature_of_plan_id
            }
            if (rowData?.electric_vehicle) {
              payloadObj["electric_vehicle"] = rowData?.electric_vehicle
            }
            if (rowData?.location) {
              payloadObj["location"] = rowData?.location
            }

            if (rowData?.excess) {

              let excessval = rowData?.excess
              const excessdata = typeof excessval == "string" ? excessval.split(",") : [excessval]
              if (rowData?.car_value) {
                const car_value = rowData.car_value.includes(",") ? rowData.car_value.split(",") : [rowData.car_value];
                const car_value_topup = rowData.car_value_topup.includes(",") ? rowData.car_value_topup.split(",")
                  : [rowData.car_value_topup];
                const car_rate = rowData?.rate.includes(",") ? rowData?.rate.split(",") : [rowData?.rate]
                const car_min_primium = rowData?.min_premium.includes(",") ? rowData?.min_premium.split(",") : [rowData?.min_premium]

                let car_value_arr = []
                for (let j = 0; j < car_value.length; j++) {
                  const car_valueRange = car_value[j].split("-");
                  const car_valueMin =
                    car_valueRange.length > 0
                      ? parseInt(car_valueRange[0].trim())
                      : 0;
                  const car_valueMax =
                    car_valueRange.length > 1
                      ? parseInt(car_valueRange[1].trim())
                      : parseInt(car_valueMin);

                  car_value_arr.push({
                    excess: excessdata[j],
                    car_valueMin,
                    car_valueMax,
                    car_value_topup: car_value_topup[j]
                      ? car_value_topup[j].trim()
                      : 0,
                    rate: car_rate[j] ? car_rate[j] : 0,
                    min_premium: car_min_primium[j] ? car_min_primium[j] : 0,
                  });
                }
                payloadObj["car_value"] = car_value_arr
              }
            } else {

              const car_value = rowData.car_value.includes(",") ? rowData.car_value.split(",") : [rowData.car_value];
              const car_value_topup = rowData.car_value_topup.includes(",") ? rowData.car_value_topup.split(",")
                : [rowData.car_value_topup];
              // const car_rate = rowData?.rate.includes(",")?rowData?.rate.split(","):[rowData?.rate]


              let car_value_arr = []
              for (let j = 0; j < car_value.length; j++) {
                const car_valueRange = car_value[j].split("-");
                const car_valueMin =
                  car_valueRange.length > 0
                    ? parseInt(car_valueRange[0].trim())
                    : 0;
                const car_valueMax =
                  car_valueRange.length > 1
                    ? parseInt(car_valueRange[1].trim())
                    : parseInt(car_valueMin);

                car_value_arr.push({
                  car_valueMin,
                  car_valueMax,
                  car_value_topup: car_value_topup[j]
                    ? car_value_topup[j].trim()
                    : 0,
                  // rate:car_rate[j]?car_rate[j]:0,

                });
              }
              payloadObj["car_value"] = car_value_arr
            }
            if (rowData?.jdv_comm) {
              payloadObj["jdv_comm"] = rowData?.jdv_comm
            }

            let data
            let match = { standard_cover_status: 1 }
            if (line_of_business?._id) {
              match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
            }
            if (policy_type?._id) {
              match["standard_cover_plan"] = mongoose.Types.ObjectId(policy_type?._id)

            }
            if (rowData?.company_id) {
              match["standard_cover_company"] = mongoose.Types.ObjectId(rowData?.company_id)

            }
            if (rowData?.plan_category_id) {
              match["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)

            }
            data = await standardCoverModels.aggregate([
              { $match: match }
            ])
            console.log(">>>>>>>>>>>>>>>>>>>>>covers", data)
            console.log(">>>>>>>>>>>>>>>>>>>lenght", data.length)
            const standardCoverArray = [];
            for (let i = 0; i < data.length; i++) {
              standardCoverArray.push({
                standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
                standard_cover_label: data[i].standard_cover_label,
                standard_cover_desc: data[i].standard_cover_description,
                standard_cover_value: ''
              })
            }
            payloadObj["standard_cover_arr"] = standardCoverArray
            payloadObj["plan_created_by"] = mongoose.Types.ObjectId(createdby?.loc_id)
            console.log(payloadObj, ">>>>>>>>>> this is payload")
            let motor_plan = new motor_plan_model(payloadObj);
            let result = await motor_plan.save();
            if (result) {
              count = count + 1;
            }
          } else {
            present = present + 1;
          }
        }
      }
      if (count > 0) {
        return res.json({
          status: 200,
          message: `Motor Plan Added Successfully!`,
          totalEntry: datalen,
          present: present
        });
      } else if (count == 0 && present > 0) {
        return res.json({
          status: 400,
          message: `plan already exists`
        })
      } else {
        res.json({
          status: 400,
          message: "Motor Plan Not Added Successfully!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getMotorPlan: async (req, res) => {
    try {
      let query = req.query
      const page = query.page;
      const limit = query.limit;
      let payload = req.body;
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



      if (page && limit) {
        if (name) {
          match = {
            plan_name: {
              $regex: name,
              $options: 'i'
            }
          }
        }
        match["location.value"] = {
          $in: userLocation
        }
        if (payload?.companyId) {
          match["company_id"] = mongoose.Types.ObjectId(
            payload.companyId
          );
        }
        if (payload?.policy_typeId) {
          match["policy_type_id"] = mongoose.Types.ObjectId(
            payload.policy_typeId
          );
        }
        if (status == 0 || status == 1) {
          match["status"] = status;
        }
        if (body_type) {
          match["body_type._id"] = body_type;
        }
        if (plan_for) {
          match["plan_for._id"] = plan_for;
        }
        if (plan_category) {
          match["plan_category_id"] = mongoose.Types.ObjectId(
            plan_category
          );
        }
        if (electric_vehicle == 0 || electric_vehicle == 1) {
          match["electric_vehicle"] = electric_vehicle;
        }
        if (repair_type) {
          match["repair_type_id._id"] = repair_type;
        }


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
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $sort: {
              "company.company_name": 1,
              plan_name: 1
            }
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: +limit,
          },
        ];
        aggregate.push({
          $facet: facet,
        });

        console.log(util.inspect(aggregate, false, null, true), "===============motorplans")

        let motor_plan = await motor_plan_model.aggregate(aggregate);
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk",motor_plan)
        // console.log("data length",motor_plan[0]?.data.length)
        // console.log("data",motor_plan[0]?.data)
        // console.log("total",motor_plan[0]?.totalCount[0]?.total)

        if (!motor_plan[0]?.data?.length) {
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
          data: motor_plan[0]?.data,
          total: motor_plan[0]?.totalCount[0]?.total,
        });

      } else {
        if (policy_type == "Comprehensive") {
          match['policy_type_id'] = mongoose.Types.ObjectId("641161a4591c2f02bcddf51c")
        }
        if (policy_type == "TPL") {
          match['policy_type_id'] = mongoose.Types.ObjectId("64365a4f12211cef85f5b102")

        }
        const motor_plan = await motor_plan_model.aggregate([
          {
            $match: match,
          },
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_category_id",
            },
          },
          {
            $lookup: {
              from: "nature_of_plans",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plan_id",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
          },
        ]);
        res.json({ status: 200, message: "Data Found", data: motor_plan });
      }
    } catch (err) {
      res.send(err);
    }
  },

  motor_plan_details: async (req, res) => {
    const id = req.params.id;
    const motor_plan_data = await motor_plan_model.findById(id);
    res.json({ status: 200, message: "Data Found", data: motor_plan_data });
  },

  updateMotorPlan: async (req, res) => {
    try {
      const id = req.params.id;
      const rowData = req.body
      const line_of_business_name = "Motor";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>> this is row data Start >>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(rowData)
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>> this is row data End >>>>>>>>>>>>>>>>>>>>>>>>")
      // return false;
      let payloadObj = {}
      if (rowData?.age) {
        const age = rowData.age.includes(",") ? rowData.age.split(",") : [rowData.age];
        const agetopup = rowData.age_topup?.includes(",") ? rowData.age_topup?.split(",") : [rowData.age_topup];
        let age_arr = []

        for (let j = 0; j < age.length; j++) {

          const ageRange = age[j].split("-");
          const ageMin =
            ageRange.length > 0 ? parseInt(ageRange[0].trim()) : 0;
          const ageMax =
            ageRange.length > 1 ? parseInt(ageRange[1].trim()) : ageMin;

          age_arr.push({
            ageMin,
            ageMax,
            agetopup: agetopup[j] ? agetopup[j]?.trim() : 0,
          });
          payloadObj["age_or_topup"] = age_arr
        }
      }
      if (rowData?.drivingexp) {
        let drivingex_parr = [];
        const drivingexp = rowData?.drivingexp.includes(",") ? rowData.drivingexp.split(",") : [rowData.drivingexp];
        const drivingexptopup = rowData?.drivingexptopup?.includes(",") ? rowData.drivingexptopup?.split(",") : [rowData.drivingexptopup];

        if (drivingexp.length) {
          for (let j = 0; j < drivingexp.length; j++) {
            const drivingExpRange = drivingexp[j].split("-");
            const drivingExpMin =
              drivingExpRange.length > 0
                ? parseInt(drivingExpRange[0]?.trim())
                : 0;
            const drivingExpMax =
              drivingExpRange.length > 1
                ? parseInt(drivingExpRange[1]?.trim())
                : drivingExpMin;

            drivingex_parr.push({
              drivingExpMin,
              drivingExpMax,
              drivingexptopup: drivingexptopup[j]
                ? drivingexptopup[j].trim()
                : 0,
            });
          }
          payloadObj["drivingexp_or_topup"] = drivingex_parr

        }
      }

      if (rowData?.homedrivingexp) {
        let homedrivingexp_arr = [];
        const homedrivingexp = rowData.homedrivingexp.includes(",") ? rowData.homedrivingexp.split(",") : [rowData.homedrivingexp];
        const homedrivingexptopup = rowData.homedrivingexptopup?.includes(",") ? rowData.homedrivingexptopup?.split(",") : [rowData.homedrivingexptopup];

        if (homedrivingexp.length) {
          for (let j = 0; j < homedrivingexp.length; j++) {
            const homeDrivingExpRange = homedrivingexp[j]?.split("-");
            const homeDrivingExpMin =
              homeDrivingExpRange.length > 0
                ? parseInt(homeDrivingExpRange[0].trim())
                : 0;
            const homeDrivingExpMax =
              homeDrivingExpRange.length > 1
                ? parseInt(homeDrivingExpRange[1]?.trim())
                : homeDrivingExpMin;

            homedrivingexp_arr.push({
              homeDrivingExpMin,
              homeDrivingExpMax,
              homedrivingexptopup: homedrivingexptopup[j]
                ? homedrivingexptopup[j].trim()
                : 0,
            });
          }
          payloadObj["homedrivingexp_or_topup"] = homedrivingexp_arr

        }
      }

      if (rowData?.claimyears) {
        const claimyearsarr = [];
        const claimyears = rowData.claimyears?.includes(",") ? rowData.claimyears?.split(",") : [rowData.claimyears];
        const claimyeardisc = rowData.claimyeardisc?.includes(",") ? rowData.claimyeardisc?.split(",") : [rowData.claimyeardisc];

        for (let j = 0; j < claimyears.length; j++) {
          claimyearsarr.push({
            claimyears: claimyears[j]?.trim().replace(/\s+/g, ""),
            claimyeardisc: claimyeardisc[j] ? claimyeardisc[j]?.trim().replace(/\s+/g, "") : 0,
          });
        }
        payloadObj["claimyears_or_topup"] = claimyearsarr
      } else {
        payloadObj["claimyears_or_topup"] = '';

      }
      if (rowData?.form_type == "TPL") {
        const body_type_arr = [];
        const minprimarray = rowData?.min_premium?.includes(",") ?
          rowData?.min_premium.split(",")
          : [rowData?.min_premium];

        const cyldr = rowData?.cylinders

        const primium = rowData?.premium?.includes(",") ?
          rowData?.premium.split(",")
          : [rowData?.premium]
        const body_type = rowData?.body_types;
        for (let j = 0; j < body_type.length; j++) {
          for (let k = 0; k < cyldr.length; k++) {

            body_type_arr.push({
              _id: body_type[j]["_id"],
              body_type_name: body_type[j]["body_type_name"],
              cylinder: cyldr[k]["id"],
              min_premium: minprimarray[k] ? minprimarray[k] : 0,
              premium: primium[k] ? primium[k] : 0
            });

          }
        }
        payloadObj["body_type"] = body_type_arr
      } else if (rowData?.form_type == 'Comprehensive') {
        const body_type_arr = [];
        const body_type = rowData?.body_types;
        // const minprimarray = rowData?.min_premium?.includes(",")?
        // rowData?.min_premium.split(",")
        // :[rowData?.min_premium];
        for (let j = 0; j < body_type.length; j++) {
          body_type_arr.push({
            _id: body_type[j]["_id"],
            body_type_name: body_type[j]["body_type_name"],
            // min_premium:minprimarray[j]?minprimarray[j]:0
          });
        }
        payloadObj["body_type"] = body_type_arr
      }
      if (rowData?.repair_condition_id) {
        const repair_type_arr = [];
        const repair_type = rowData.repair_condition_id;
        for (let j = 0; j < repair_type.length; j++) {
          repair_type_arr.push({
            _id: repair_type[j]["_id"],
            repair_type_name: repair_type[j]["repair_type_name"],
          });
        }
        payloadObj["repair_type_id"] = repair_type_arr

      }

      if (rowData?.gcc_spec) {

        const plan_for_gcc_spec_arr = [];

        const plan_for_gcc_spec_name = rowData?.gcc_spec;
        const gccspecstopup = rowData?.gccspecstopup?.split(",");

        for (let j = 0; j < plan_for_gcc_spec_name.length; j++) {
          plan_for_gcc_spec_arr.push({
            _id: plan_for_gcc_spec_name[j]["_id"],
            plan_for_gcc_spec_name:
              plan_for_gcc_spec_name[j]["plan_for_gcc_spec_name"],
            gccspecstopup: gccspecstopup[j] ? gccspecstopup[j]?.trim().replace(/\s+/g, "") : 0,
          });
        }
        payloadObj["plan_for_gcc_spec_name_or_topup"] = plan_for_gcc_spec_arr

      }

      if (rowData?.nationality) {
        const nationalityarr = [];
        const nationality_name = rowData?.nationality;
        const nationalitytopup = rowData?.NationalTopup?.includes(",") ? rowData?.NationalTopup?.split(",") : [rowData?.NationalTopup];
        for (let j = 0; j < nationality_name.length; j++) {
          nationalityarr.push({
            _id: nationality_name[j]["_id"],
            nationality_name: nationality_name[j]["nationality_name"],
            nationalitytopup: nationalitytopup[j] ? nationalitytopup[j]?.trim().replace(/\s+/g, "") : 0,
          });
        }
        payloadObj["nationality_or_topup"] = nationalityarr

      }
      if (rowData?.make_motor) {
        const make_motor_arr = [];
        const make_motor_topup = rowData?.car_model_topup?.includes(",") ? rowData?.car_model_topup.split(",") : [rowData?.car_model_topup];

        const make_motor = rowData?.make_motor;
        for (let j = 0; j < make_motor.length; j++) {
          make_motor_arr.push({
            _id: make_motor[j]["_id"],
            make_motor_name: make_motor[j]["make_motor_name"],
            make_motor_topup: make_motor_topup[j] ? make_motor_topup[j] : 0
          });
        }
        payloadObj["make_motor"] = make_motor_arr

      }


      if (rowData?.age_of_the_car) {
        const age_of_the_car_or_arr = [];
        const age_of_the_car = rowData.age_of_the_car.includes(",") ? rowData.age_of_the_car.split(",") : [rowData.age_of_the_car];
        const age_of_the_car_topup =
          rowData.age_of_the_car_topup?.includes(",") ? rowData.age_of_the_car_topup?.split(",") : [rowData.age_of_the_car_topup];

        if (age_of_the_car.length) {
          for (let j = 0; j < age_of_the_car.length; j++) {
            const age_of_the_car_range = age_of_the_car[j]?.split("-");
            const age_of_the_car_min =
              age_of_the_car_range.length > 0
                ? parseInt(age_of_the_car_range[0]?.trim())
                : 0;
            const age_of_the_car_max =
              age_of_the_car_range.length > 1
                ? parseInt(age_of_the_car_range[1]?.trim())
                : age_of_the_car_min;

            age_of_the_car_or_arr.push({
              age_of_the_car_min,
              age_of_the_car_max,
              age_of_the_car_or_topup: age_of_the_car_topup[j]
                ? age_of_the_car_topup[j]?.trim()
                : 0,
            });
          }
        }
        payloadObj["age_of_the_car_or_topup"] = age_of_the_car_or_arr
      }
      if (rowData?.add_op_con_desc) {
        const add_op_con_desc_arr = [];
        const add_op_con_desc = rowData?.add_op_con_desc.includes(",") ? rowData.add_op_con_desc.split(",") : [rowData?.add_op_con_desc];
        const add_op_con_desc_topup =
          rowData?.add_op_con_desc_topup?.includes(",") ? rowData?.add_op_con_desc_topup?.split(",") : [rowData?.add_op_con_desc_topup];
        const vat = rowData?.vat.includes(",") ? rowData.vat?.split(",") : [rowData?.vat];
        for (let j = 0; j < add_op_con_desc.length; j++) {
          add_op_con_desc_arr.push({
            add_op_con_desc: add_op_con_desc[j]?.trim().replace(/\s+/g, ""),
            add_op_con_desc_topup: add_op_con_desc_topup[j] ?
              add_op_con_desc_topup[j]?.trim().replace(/\s+/g, "") : 0,
            vat: vat[j]?.trim().replace(/\s+/g, ""),
          });
        }
        payloadObj["add_op_con_desc"] = add_op_con_desc_arr
      } else {
        payloadObj["add_op_con_desc"] = []
      }

      if (rowData?.last_year_policy_type) {
        let last_year_policy_type_or_arr = [];
        const last_year_policy_type = rowData?.last_year_policy_type;
        const last_year_policy_type_topup =
          rowData?.last_year_policy_type_topup?.includes(",") ? rowData?.last_year_policy_type_topup?.split(",") : [rowData?.last_year_policy_type_topup];

        for (let j = 0; j < last_year_policy_type.length; j++) {
          last_year_policy_type_or_arr.push({
            last_year_policy_type_id: last_year_policy_type[j]["_id"],
            last_year_policy_type:
              last_year_policy_type[j]["policy_type_name"],
            last_year_policy_type_topup: last_year_policy_type_topup[j] ?
              last_year_policy_type_topup[j]?.trim()
                .replace(/\s+/g, "") : 0,
          });
        }
        payloadObj["last_year_policy_type_or_topup"] = last_year_policy_type_or_arr

      }
      if (rowData?.plan_for) {
        const plan_for_name_or_arr = [];
        const plan_for_name = rowData?.plan_for;
        const plan_for_topup = rowData?.plan_for_topup.includes(",") ?
          rowData?.plan_for_topup.split(",") : [rowData?.plan_for_topup]

        for (let j = 0; j < plan_for_name.length; j++) {
          plan_for_name_or_arr.push({
            _id: plan_for_name[j]["_id"],
            plan_for_name: plan_for_name[j]["plan_for_name"],
            plan_for_topup: plan_for_topup[j] ? plan_for_topup[j] : 0
          });
        }
        payloadObj["plan_for"] = plan_for_name_or_arr
      }
      if (rowData?.business_type_id) {
        const business_type_arr = [];
        const business_type = rowData?.business_type_id;

        for (let j = 0; j < business_type.length; j++) {
          business_type_arr.push({
            _id: business_type[j]["_id"],
            business_type_name: business_type[j]["business_type_name"],
          });
        }
        payloadObj["business_type_id"] = business_type_arr

      }
      payloadObj["company_id"] = rowData?.company_id
      payloadObj["plan_name"] = rowData?.plan_name
      if (rowData?.plan_category_id) {
        payloadObj["plan_category_id"] = rowData?.plan_category_id
      }
      if (rowData?.plan_label) {
        payloadObj["plan_label"] = rowData?.plan_label
      }
      if (rowData?.nature_of_plan_id) {
        payloadObj["nature_of_plan_id"] = rowData?.nature_of_plan_id
      }
      payloadObj["electric_vehicle"] = rowData?.electric_vehicle
      payloadObj["age"] = rowData?.age
      payloadObj["location"] = rowData?.location

      if (rowData?.excess) {
        let car_value_arr = []
        let excessval = rowData?.excess
        let carValue = rowData?.car_value
        let carValueTopup = rowData?.car_value_topup
        let min_premium = rowData?.min_premium
        let rate = rowData?.rate
        excessval = typeof excessval == "string" ? excessval?.split(",") : [excessval]
        carValue = typeof carValue == "string" ? carValue?.split(",") : [carValue]
        carValueTopup = typeof carValueTopup == "string" ? carValueTopup.split(",") : carValueTopup ? +carValueTopup : 0
        min_premium = typeof min_premium == "string" ? min_premium.split(",") : [min_premium]
        rate = typeof rate == "string" ? rate.split(",") : [rate]
        // const excessdata = rowData?.excess.includes(",")?
        for (let i = 0; i < carValue.length; i++) {
          car_value_arr.push({
            excess: excessval[i],
            car_valueMin: parseInt(carValue[i]?.split("-")[0]),
            car_valueMax: parseInt(carValue[i]?.split("-")[1]),
            car_value_topup: carValueTopup[i] ? carValueTopup[i] : 0,
            rate: rate[i],
            min_premium: min_premium[i]
          })
        }
        payloadObj["car_value"] = car_value_arr
      } else {
        if (rowData?.car_value && !rowData?.excess) {
          const car_value = rowData.car_value.includes(",") ? rowData.car_value.split(",") : [rowData.car_value];
          const car_value_topup = rowData.car_value_topup?.includes(",") ? rowData.car_value_topup?.split(",")
            : [rowData.car_value_topup];
          const car_rate = rowData?.rate?.includes(",") ? rowData?.rate?.split(",") : [rowData?.rate]


          let car_value_arr = []
          for (let j = 0; j < car_value.length; j++) {
            const car_valueRange = car_value[j]?.split("-");
            const car_valueMin =
              car_valueRange.length > 0
                ? parseInt(car_valueRange[0]?.trim())
                : 0;
            const car_valueMax =
              car_valueRange.length > 1
                ? parseInt(car_valueRange[1]?.trim())
                : parseInt(car_valueMin);

            car_value_arr.push({
              car_valueMin,
              car_valueMax,
              car_value_topup: car_value_topup[j]
                ? car_value_topup[j]?.trim()
                : 0,
              rate: car_rate[j] ? car_rate[j] : 0,

            });
          }
          payloadObj["car_value"] = car_value_arr
        }
      }
      if (rowData?.excess) {
        payloadObj["country_or_topup"] = rowData.excess
      }
      payloadObj["jdv_comm"] = rowData?.jdv_comm

      let data
      let match = { standard_cover_status: 1 }
      if (line_of_business?._id) {
        match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
      }
      if (rowData?.policy_type_id) {
        match["standard_cover_plan"] = mongoose.Types.ObjectId(rowData?.policy_type_id)

      }
      if (rowData?.company_id) {
        match["standard_cover_company"] = mongoose.Types.ObjectId(rowData?.company_id)

      }
      if (rowData?.plan_category_id) {
        match["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)

      }
      data = await standardCoverModels.aggregate([
        { $match: match }
      ])
      const standardCoverArray = [];
      for (let i = 0; i < data.length; i++) {
        standardCoverArray.push({
          standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
          standard_cover_label: data[i].standard_cover_label,
          standard_cover_desc: data[i].standard_cover_description,
          standard_cover_value: ''
        })
      }
      // console.log(">>>>>>>>>>>>>>>> this is payload Start <<<<<<<<<<<<<<<<<<<<")
      console.log(payloadObj)
      // console.log(">>>>>>>>>>>>>>>> this is payload End <<<<<<<<<<<<<<<<<<<<")

      payloadObj["standard_cover_arr"] = standardCoverArray
      // console.log(payloadObj,">>>>>>>>>> this is payload")
      let result = await motor_plan_model.findByIdAndUpdate(id, payloadObj);
      if (result != null) {
        res.json({
          status: 200,
          message: "Motor Plan Updated Successfully!",
          data: result,
        });
      } else {
        res.json({
          status: 400,
          message: "Motor Plan Not Updated Successfully!",
        });
      }
    } catch (error) {
      console.log(error)
      res.json({ status: 500, message: error.message })
    }
  },

  updatestatusMotorPlan: async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    let result = await motor_plan_model.findByIdAndUpdate(id, {
      status: status,
    });
    if (result != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Motor Plan Deactivated Successfully!",
        });
      } else {
        res.json({
          status: 200,
          message: "Motor Plan Activated Successfully!",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Motor Plan Not Deactivated Successfully!",
      });
    }
  },

  upload_policywordings_file: async (req, res) => {
    try {
      let newdetails = await motor_plan_model.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policywordings_file: req.file.filename } },
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

  add_plan_standard_cover: async (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    const data = req.body.formData;
    const standard_cover_arr = [];
    for (let i = 0; i < data.length; i++) {

      standard_cover_arr.push({
        standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
        standard_cover_label: data[i].standard_cover_label,
        standard_cover_desc: data[i].standard_cover_description,
        standard_cover_value: data[i].value,
      });
    }
    let result;
    if (type == "motor") {
      result = await motor_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { standard_cover_arr: standard_cover_arr } },
        { new: true }
      );
    }

    if (type == "travel") {
      result = await travel_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { standard_cover_arr: standard_cover_arr } },
        { new: true }
      );
    }
    if (type == "home") {
      result = await home_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { standard_cover_arr: standard_cover_arr } },
        { new: true }
      );
    }
    if (type == "yacht") {
      result = await yacht_plan.findOneAndUpdate(
        { _id: id },
        { $set: { standard_cover_arr: standard_cover_arr } },
        { new: true }
      );
    }
    if (type == "medical") {
      console.log(">>>>>>>medical")
      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { standard_cover_arr: standard_cover_arr } },
        { new: true }
      );
    }

    if (result != null) {
      res.json({ status: 200, message: "Updated Successfully!", data: result });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  add_plan_additional_cover: async (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    const data = req.body.formData;

    const additional_cover_arr = [];
    for (let i = 0; i < data.length; i++) {
      additional_cover_arr.push({
        additional_cover_id: mongoose.Types.ObjectId(data[i]._id),
        additional_cover_label: data[i].additional_cover_label,
        additional_cover_desc: data[i].additional_cover_description,
        additional_cover_value: data[i].value,
      });
    }

    let result;
    if (type == "motor") {
      result = await motor_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { additional_cover_arr: additional_cover_arr } },
        { new: true }
      );
    }

    if (type == "travel") {
      result = await travel_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { additional_cover_arr: additional_cover_arr } },
        { new: true }
      );
    }
    if (type == "home") {
      result = await home_plan_model.findOneAndUpdate(
        { _id: id },
        { $set: { additional_cover_arr: additional_cover_arr } },
        { new: true }
      );
    }
    if (type == "yacht") {
      result = await yacht_plan.findOneAndUpdate(
        { _id: id },
        { $set: { additional_cover_arr: additional_cover_arr } },
        { new: true }
      );
    }
    if (type == "medical") {
      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { additional_cover_arr: additional_cover_arr } },
        { new: true }
      );
    }

    if (result != null) {
      res.json({ status: 200, message: "Updated Successfully!", data: result });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  add_non_applicable_nationality: async (req, res) => {
    const id = req.body.id;
    const data = req.body.formData;

    const non_applicable_nationality_arr = [];

    for (let i = 0; i < data.length; i++) {
      non_applicable_nationality_arr.push({
        non_applicable_nationality_id: mongoose.Types.ObjectId(data[i].non_applicable_nationality_id),
        non_applicable_nationality_label: data[i].non_applicable_nationality_label
      })

    }

    const result = await motor_plan_model.findByIdAndUpdate(
      id,
      { non_applicable_nationality: non_applicable_nationality_arr },
      { new: true }
    );

    if (result != null) {
      res.json({ status: 200, message: "Updated Successfully!", data: result });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  getlistBlackListedVehicle: async (req, res) => {
    try {
      const company_id = mongoose.Types.ObjectId(req.params.id);
      const result = await companiesModels.aggregate([
        {
          $match: {
            _id: company_id,
          },
        },

        {
          $lookup: {
            from: "motor_model_details",
            localField: "blackListVehicle",
            foreignField: "_id",
            as: "motor_model_detail",
          },
        },
        {
          $unwind: "$motor_model_detail"
        },
        {
          $lookup: {
            from: "make_motors",
            localField: "motor_model_detail.motor_model_make_id",
            foreignField: "_id",
            as: "make_motor",
          },
        },
        {
          $unwind: "$make_motor"
        },
        {
          $lookup: {
            from: "motor_models",
            localField: "motor_model_detail.motor_model_detail_model_id",
            foreignField: "_id",
            as: "model_motor",
          },
        },
        {
          $unwind: "$model_motor"
        },
        {
          $lookup: {
            from: "body_types",
            localField: "motor_model_detail.motor_model_detail_body_type",
            foreignField: "_id",
            as: "body_type",
          },
        },
        {
          $unwind: "$body_type"
        },
        {
          $project: {
            "motor_model_detail.motor_model_detail_name": 1,
            "motor_model_detail.motor_model_detail_start_year": 1,
            "motor_model_detail._id": 1,
            "motor_model_detail.motor_model_detail_cylinder": 1,
            "make_motor.make_motor_name": 1,
            "model_motor.motor_model_name": 1,
            "body_type.body_type_name": 1,
            "_id": 0
          },
        },
      ]);
      res.json({ status: 200, message: "Data Found", data: result });
    } catch (err) {
      res.send(err);
    }
  },



  add_black_listed_Vehicle: async (req, res) => {
    try {
      let payload = req.body
      let planId = payload?.id
      let blackListArr = payload?.blackListArr
      let payloadData = []

      for (let i = 0; i < blackListArr.length; i++) {
        payloadData.push({ variantId: mongoose.Types.ObjectId(blackListArr[i]?.variantId), topup: blackListArr[i]?.topup ? blackListArr[i]?.topup : 0 })
      }

      const result = await motor_plan_model.findByIdAndUpdate(
        planId,
        { $set: { black_listed_vehicle: payloadData } },
        { new: true }
      );

      if (result != null) {
        res.json({ status: 200, message: "Updated Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  add_bulk_motor_plane: async (req, res) => {
    let totalEntry = 0;
    try {
      let caseInsensitive = async (name) => {
        return { $regex: new RegExp(name.trim(), 'i') }
      }
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
      let allPlanData = [];

      await Promise.all(
        xlData.map(async (data) => {
          let payload = {};
          let plan_category_id;
          let nature_of_plan_id;
          let body_type_id;
          let repair_type_id;
          let plan_for = [];
          let business_type_id = [];
          let age_or_topup = [];
          let drivingexp_or_topup = [];
          let homedrivingexp_or_topup = [];
          let claimyears_or_topup = [];
          let last_year_policy_type_or_topup = [];
          let add_op_con_desc = [];
          let age_of_the_car_or_topup = [];
          let nationality_or_topup = [];
          let make_motor = [];
          let body_type_or_car_value_or_premium = [];
          let plan_for_gcc_spec_name_or_topup = [];

          const checkname = data["Plan Name"];
          let presentResult = await motor_plan_model.find({ plan_name: await caseInsensitive(checkname) })
          if (!presentResult.length) {
            payload["plan_name"] = data["Plan Name"]?.trim();
            let company_id = await CompanyModel.findOne({
              company_name: await caseInsensitive(data["Company Name"]),
            });
            if (company_id) {
              company_id = company_id?._id?.toString();
              payload["company_id"] = company_id;
            }
            let planeCategory = data["Plan Category"];
            if (planeCategory) {
              plan_category_id = await PlaneCategoryModel.findOne({
                plan_category_name: await caseInsensitive(planeCategory),
              });
              if (plan_category_id) {
                plan_category_id = plan_category_id._id.toString();
                payload["plan_category_id"] = plan_category_id;
              }
              payload["plan_label"] = data["Plan Label"];
            }
            let nutureOfPlan = data["Nature Of Plan"];
            if (nutureOfPlan) {
              nature_of_plan_id = await Nature_of_plan_model.findOne({
                nature_of_plan_name: await caseInsensitive(nutureOfPlan),
              });
              if (nature_of_plan_id) {
                nature_of_plan_id = nature_of_plan_id._id.toString();
                payload["nature_of_plan_id"] = nature_of_plan_id;
              }
            }
            if (data["Body Type"] && !data["Cylinder"]) {
              let bodyTypeArr = []
              let bodyType = data["Body Type"]?.split(",");
              for (let i = 0; i < bodyType.length; i++) {
                body_type_id = await bodyTypeModel.findOne({
                  body_type_name: await caseInsensitive(bodyType[i]),
                });
                bodyTypeArr.push({ body_type_id: body_type_id?.toObject()?._id?.toString(), body_type_name: body_type_id?.toObject()?.body_type_name })
              }

              payload["body_type"] = bodyTypeArr;

            }
            let repaiCondition = data["Repair Condition"];
            if (repaiCondition) {
              repair_type_id = await repairTypeModel.findOne({
                repair_type_name: await caseInsensitive(repaiCondition),
              });
              if (repair_type_id) {
                repair_type_id = repair_type_id?._id?.toString();
                payload["repair_type_id"] = repair_type_id;
              }
            }
            if (data["Electriv Vehicle"]) {
              payload["electric_vehicle"] = +data["Electriv Vehicle"];
            }
            let planFor = data["Plan For"];
            if (planFor) {
              let planForArr = []
              planFor = planFor?.split(",");
              for (let i = 0; i < planFor.length; i++) {
                let planData = await planForModel.findOne({
                  plan_for_name: await caseInsensitive(planFor[i]),
                });
                if (planData) {
                  planForArr.push({
                    plan_for_name_id: planData?.toObject()?._id,
                    plan_for_name: planData?.toObject()?.plan_for_name,
                  });
                }

              }
              payload["plan_for"] = planForArr;
            }
            let businessType = data["Business Type"];
            if (businessType) {
              let array = []
              businessType = businessType?.split(",");
              for (let i = 0; i < businessType.length; i++) {
                let planData = await businessTypeModel.findOne({
                  plan_for_name: await caseInsensitive(businessType[i]),
                });
                if (planData) {
                  array.push({
                    business_type_id: planData?.toObject()?._id,
                    business_type_name: planData?.toObject()?.business_type_name,
                  });
                }

              }
              payload["plan_for"] = array;
            }


            if (data["Car Value"] && data["Excess"]) {
              let Array = []
              let value = data["Driving Experience"];
              let excess = data["Excess"];
              let topup = data["Topup (Driving Experience)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                excess = excess.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    car_valueMin: parseInt(value[i]?.split("-")[0]),
                    car_valueMax: parseInt(value[i]?.split("-")[1]),
                    car_value_topup: topup[i],
                    excess: excess[i],
                  });

                }
                payload["car_value"] = Array;
              } else {
                Array.push({
                  car_valueMin: parseInt(value?.split("-")[0]),
                  car_valueMax: parseInt(value?.split("-")[1]),
                  car_value_topup: topup ? topup : 0,
                  excess: excess
                });
                payload["car_value"] = Array;
              }

            }
            if (data["Rate"]) {
              payload["rate"] = data["Rate"];
            }
            if (data["Min Premium"] && !data["Cylinder"]) {
              payload["min_premium"] = +data["Min Premium"];
            }

            // payload["line_of_business_id"] = "6418643bf42eaf5ba1c9e0ef";


            if (data["Driving Experience"]) {
              let Array = []
              let value = data["Driving Experience"];
              let topup = data["Topup (Driving Experience)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    drivingExpMin: value[i]?.split("-")[0],
                    drivingExpMax: value[i]?.split("-")[1],
                    drivingexptopup: topup[i],
                  });

                }
                payload["drivingexp_or_topup"] = Array;
              } else {
                Array.push({
                  drivingExpMin: value?.split("-")[0],
                  drivingExpMax: value?.split("-")[1],
                  drivingexptopup: topup ? topup : "",
                });
                payload["drivingexp_or_topup"] = Array;
              }

            }

            if (data["Age"]) {
              let Array = []
              let value = data["Age"];
              let topup = data["Topup (Age)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    ageMin: value[i]?.split("-")[0],
                    ageMax: value[i]?.split("-")[1],
                    agetopup: topup[i],
                  });

                }
                payload["age_or_topup"] = Array;
              } else {
                Array.push({
                  ageMin: value?.split("-")[0],
                  ageMax: value?.split("-")[1],
                  agetopup: topup ? topup : "",
                });
                payload["age_or_topup"] = Array;
              }

            }
            if (data["Home Country Driving Experience"]) {
              let Array = []
              let value = data["Home Country Driving Experience"];
              let topup = data["Topup (Home Country Driving Experience)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    homeDrivingExpMin: value[i]?.split("-")[0],
                    homeDrivingExpMax: value[i]?.split("-")[1],
                    homedrivingexptopup: topup[i],
                  });

                }
                payload["homedrivingexp_or_topup"] = Array;
              } else {
                Array.push({
                  homeDrivingExpMin: value?.split("-")[0],
                  homeDrivingExpMax: value?.split("-")[1],
                  homedrivingexptopup: topup ? topup : "",
                });
                payload["homedrivingexp_or_topup"] = Array;
              }

            }
            if (data["No Claim Year"]) {
              let Array = [];
              let value = data["No Claim Year"];
              let topup = data["No Claim Discount"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    claimyears: value[i],
                    claimyeardisc: topup[i],
                  });
                }
                payload["claimyears_or_topup"] = Array;
              } else {
                Array.push({
                  claimyears: value,
                  claimyeardisc: topup ? topup : "",
                });
                payload["claimyears_or_topup"] = Array;
              }
            }
            if (data["Last Year Policy Type"]) {
              let Array = [];
              let value = data["Last Year Policy Type"];
              let topup = data["Topup (Last Year Policy Type)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  let name = value[i];
                  let data = await policyTypeModels.findOne({ policy_type_name: await caseInsensitive(value[i]) })
                  if (data) {
                    Array.push({
                      last_year_policy_type_id: data?.toObject()?._id,
                      last_year_policy_type: data?.toObject()?.policy_type_name,
                      last_year_policy_type_topup: topup[i] ? topup[i] : "",
                    });
                  }
                }
                payload["last_year_policy_type_or_topup"] = Array;
              } else {
                let data = await policyTypeModels.findOne({ policy_type_name: await caseInsensitive(value) })
                if (data) {
                  Array.push({
                    last_year_policy_type_id: data?.toObject()?._id,
                    last_year_policy_type: data?.toObject()?.policy_type_name,
                    last_year_policy_type_topup: topup ? topup : "",
                  });
                }
                payload["last_year_policy_type_or_topup"] = Array;
              }
            }
            if (data["Nationality"]) {
              let Array = [];
              let value = data["Nationality"];
              let topup = data["(Topup) Nationality"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  let data = await nationalityModels.findOne({ nationality_name: await caseInsensitive(value[i]) })
                  if (data) {
                    Array.push({
                      nationality_id: data?.toObject()?._id,
                      nationality_name: data?.toObject()?.nationality_name,
                      nationalitytopup: topup[i] ? topup[i] : "",
                    });
                  }
                }
                payload["nationality_or_topup"] = Array;
              } else {
                let data = await nationalityModels.findOne({ nationality_name: await caseInsensitive(value) })
                if (data) {
                  Array.push({
                    nationality_id: data?.toObject()?._id,
                    nationality_name: data?.toObject()?.nationality_name,
                    nationalitytopup: topup ? topup : "",
                  });
                }
                payload["nationality_or_topup"] = Array;
              }
            }
            if (data["GCC / NON-GCC"]) {
              let Array = [];
              let value = data["GCC / NON-GCC"];
              let topup = data["Topup (GCC / NON-GCC)"];
              if (value.includes(",") && topup.includes(",")) {
                value = value.split(",");
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  let data = await repairTypeModels.findOne({ plan_for_gcc_spec_name: await caseInsensitive(value[i]) })
                  if (data) {
                    Array.push({
                      plan_for_gcc_spec_id: data?.toObject()?._id,
                      plan_for_gcc_spec_name: data?.toObject()?.plan_for_gcc_spec_name,
                      gccspecstopup: topup[i] ? topup[i] : "",
                    });
                  }
                }
                payload["plan_for_gcc_spec_name_or_topup"] = Array;
              } else {
                let data = await repairTypeModels.findOne({ plan_for_gcc_spec_name: await caseInsensitive(value) })
                if (data) {
                  Array.push({
                    plan_for_gcc_spec_id: data?.toObject()?._id,
                    plan_for_gcc_spec_name: data?.toObject()?.plan_for_gcc_spec_name,
                    gccspecstopup: topup ? topup : "",
                  });
                }
                payload["plan_for_gcc_spec_name_or_topup"] = Array;
              }
            }

            if (data["Age Of The Car"]) {
              let Array = []
              let value = data["Age Of The Car"];
              let topup = data["Topup (Age Of The Car)"];
              if (value.includes(",")) {
                value = value.split(",");
                console.log("kkkkkkkkkkkkkkkkkkkkkkkklllllllllllskdcmksk", topup)
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    age_of_the_car_min: value[i]?.split("-")[0],
                    age_of_the_car_max: value[i]?.split("-")[1],
                    age_of_the_car_or_topup: topup[i],
                  });

                }
                payload["age_of_the_car_or_topup"] = Array;
              } else {
                Array.push({
                  age_of_the_car_min: value?.split("-")[0],
                  age_of_the_car_max: value?.split("-")[1],
                  age_of_the_car_or_topup: topup ? topup : "",
                });
                payload["age_of_the_car_or_topup"] = Array;
              }

            }
            if (data["Add Option Condition Description"]) {
              let Array = []
              let value = data["Add Option Condition Description"];
              let topup = data["Topup (Add Option Condition Description)"];
              let vat = data["Vat Able"];
              if (value.includes(",")) {
                value = value.split(",");
                vat = vat.split(",");
                console.log("kkkkkkkkkkkkkkkkkkkkkkkklllllllllllskdcmksk", topup)
                topup = topup.split(",");
                for (let i = 0; i < value.length; i++) {
                  Array.push({
                    add_op_con_desc: value[i],
                    vat: vat[i],
                    age_of_the_car_or_topup: topup[i],
                  });

                }
                payload["add_op_con_desc"] = Array;
              } else {
                Array.push({
                  add_op_con_desc: value,
                  vat: vat,
                  age_of_the_car_or_topup: topup ? topup : "",
                });
                payload["add_op_con_desc"] = Array;
              }

            }
            if (data["JDV Commision"]) {
              payload["jdv_comm"] = data["JDV Commision"];
            }
            if (data["Sales Person Commision"]) {
              payload["sale_person_comm"] = data["Sales Person Commision"];
            }
            console.log("lllllllllllllllllllllllllllllljshdkfjjdji", data["location"])
            if (data["location"]) {
              let location = data["location"];
              let locationArr = []
              if (location.includes(",")) {
                location = location.split(",");
                for (let i = 0; i < location.length; i++) {
                  let data = await locationsModels.findOne({ nationality_name: await caseInsensitive(location[i]) })
                  locationArr.push({ label: data?.toObject()?.location_name, value: data?.toObject()?._id?.toString() })
                }
                payload["location"] = locationArr

              } else {
                let data = await locationsModels.findOne({ location_name: await caseInsensitive(location) })
                locationArr.push({ label: data?.toObject()?.location_name, value: data?.toObject()?._id?.toString() })
              }
              payload["location"] = locationArr
            }
            console.log("kkkkkkkkkkkkkkkkkkkk", payload)
            // return false;



            // let addOptionArray = data["Add Option Condition Description"];
            // let addOptionTopupArray =
            //   data["Topup (Add Option Condition Description)"];
            // let vatArray = data["Vat Able"];
            // if (
            //   addOptionArray.includes(",") &&
            //   addOptionTopupArray.includes(",") &&
            //   vatArray.includes(",")
            // ) {
            //   addOptionArray = addOptionArray.split(",");
            //   addOptionTopupArray = addOptionTopupArray.split(",");
            //   vatArray = vatArray.split(",");
            //   for (let i = 0; i < addOptionArray.length; i++) {
            //     add_op_con_desc.push({
            //       add_op_con_desc: addOptionArray[i],
            //       add_op_con_desc_topup: addOptionTopupArray[i],
            //       vat: vatArray[i],
            //     });
            //   }
            // } else {
            //   add_op_con_desc.push({
            //     add_op_con_desc: addOptionArray,
            //     add_op_con_desc_topup: addOptionTopupArray,
            //     vat: vatArray,
            //   });
            // }
            // payload["add_op_con_desc"] = add_op_con_desc;
            // let age_of_car = data["Age Of The Car"];
            // let topup_of_car = data["Topup (Age Of The Car)"].toString();
            // if (age_of_car.includes(",") && topup_of_car.includes(",")) {
            //   age_of_car = age_of_car.split(",");
            //   topup_of_car = topup_of_car.split(",");
            //   for (let i = 0; i < age_of_car.length; i++) {
            //     age_of_the_car_or_topup.push({
            //       age_of_car: age_of_car[i],
            //       topup_of_car: topup_of_car[i],
            //     });
            //   }
            // } else {
            //   age_of_the_car_or_topup.push({ age_of_car, topup_of_car });
            // }
            // let nationalityArray = data["Nationality"];
            // let nationalitytopup = data["(Topup) Nationality"];
            // if (
            //   nationalityArray.includes(",") &&
            //   nationalitytopup.includes(",")
            // ) {
            //   nationalityArray = nationalityArray.split(",");
            //   nationalitytopup = nationalitytopup.split(",");
            //   let count = 0;
            //   await Promise.all(async (id) => {
            //     let idData = await nationalityModel.findOne({
            //       nationality_name: id,
            //     });

            //     nationality_or_topup.push({
            //       nationality_id: idData._id.toString(),
            //       nationality_name: id,
            //       nationalitytopup: nationalitytopup[count],
            //     });
            //     count = count + 1;
            //   });
            // } else {
            //   let idData = await nationalityModel.findOne({
            //     nationality_name: nationalityArray,
            //   });

            //   nationality_or_topup.push({
            //     nationality_id: idData._id.toString(),
            //     nationality_name: nationalityArray,
            //     nationalitytopup: nationalitytopup,
            //   });
            // }
            // let carModel = data["Car Model"];
            // if (carModel.includes(",")) {
            //   carModel = carModel.split(",");
            //   await Promise.all(async (model) => {
            //     let modeldata = await MoterModel.findOne({
            //       make_motor_name: model,
            //     });
            //     make_motor.push({
            //       make_motor_name: model,
            //       make_motor_id: modeldata._id.toString(),
            //     });
            //   });
            // } else {
            //   let modeldata = await MoterModel.findOne({
            //     make_motor_name: carModel,
            //   });
            //   make_motor.push({
            //     make_motor_name: carModel,
            //     make_motor_id: modeldata._id.toString(),
            //   });
            // }
            // payload["make_motor"] = make_motor;
            // let gccPlane = data["GCC / NON-GCC"];
            // let gccTopup = data["Topup (GCC / NON-GCC)"];
            // if (gccPlane.includes(",") && gccTopup.includes(",")) {
            //   gccPlane = gccPlane.split(",");
            //   gccTopup = gccTopup.split(",");
            //   for (let i = 0; i < gccTopup.length; i++) {
            //     let gccData = await GccModel.findOne({
            //       plan_for_gcc_spec_name: gccPlane[i],
            //     });
            //     plan_for_gcc_spec_name_or_topup.push({
            //       plan_for_gcc_spec_id: gccData._id.toString(),
            //       plan_for_gcc_spec_name: gccPlane[i],
            //       gccspecstopup: gccTopup[i],
            //     });
            //   }
            // } else {
            //   let gccData = await GccModel.findOne({
            //     plan_for_gcc_spec_name: gccPlane,
            //   });
            //   plan_for_gcc_spec_name_or_topup.push({
            //     plan_for_gcc_spec_id: gccData._id.toString(),
            //     plan_for_gcc_spec_name: gccPlane,
            //     gccspecstopup: gccTopup,
            //   });
            // }
            // payload["plan_for_gcc_spec_name_or_topup"] =
            //   plan_for_gcc_spec_name_or_topup;
            // let polcyType = data["Policy Type"].trim();
            // polcyType = await PolicyType.findOne({ policy_type_name: polcyType });
            // polcyType = polcyType._id.toString();
            // payload["policy_type_id"] = polcyType;
            // payload["nationality_or_topup"] = nationality_or_topup;
            // payload["age_of_the_car_or_topup"] = age_of_the_car_or_topup;
            // payload["jdv_comm"] = data["JDV Commision"].toString();
            // payload["sale_person_comm"] = data["Sales Person Commision"];
            // if (
            //   data["Body Type"] &&
            //   data["Cylinder"] &&
            //   data["Car Value"] &&
            //   data["Min Premium"]
            // ) {
            //   let bodyType = data["Body Type"];
            //   let cylinder = data["Cylinder"];
            //   let carValue = data["Car Value"];
            //   let minPremium = data["Min Premium"];
            //   if (
            //     bodyType.includes(",") &&
            //     cylinder.includes(",") &&
            //     minPremium.includes(",")
            //   ) {
            //     bodyType = bodyType.split(",");
            //     cylinder = cylinder.split(",");
            //     carValue = carValue.split(",");
            //     minPremium = minPremium.split(",");
            //     for (let i = 0; i < bodyType.length; i++) {
            //       let bodyTypeData = await bodyTypeModel.findOne({
            //         body_type_name: bodyType[i],
            //       });
            //       body_type_or_car_value_or_premium.push({
            //         body_type_id: bodyTypeData?._id.toString(),
            //         body_type_name: bodyType[i],
            //         cylinder: cylinder[i],
            //         car_value: +carValue[i],
            //         min_premium: +minPremium[i],
            //         id: cylinder[i],
            //       });
            //       payload["body_type_or_car_value_or_premium"] =
            //         body_type_or_car_value_or_premium;
            //     }
            //   } else {
            //     let bodyTypeData = await bodyTypeModel.findOne({
            //       body_type_name: bodyType,
            //     });
            //     body_type_or_car_value_or_premium.push({
            //       body_type_id: bodyTypeData._id.toString(),
            //       body_type_name: bodyType,
            //       cylinder: cylinder,
            //       car_value: +carValue,
            //       min_premium: +minPremium,
            //       id: cylinder,
            //     });
            //     payload["body_type_or_car_value_or_premium"] =
            //       body_type_or_car_value_or_premium;
            //   }
            // }
            let moterPlanData = new motor_plan_model(payload);
            moterPlanData = await moterPlanData.save();
            if (moterPlanData) {
              allPlanData.push(moterPlanData);
              totalEntry++;
            }
          }
        })
      );

      if (allPlanData.length > 0) {
        return res.status(200).json({
          status: 200,
          message: "File Upload Successfully !!",
          totalEntry: totalEntry,
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "File not Uploaded" });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        status: 400,
        message: "Something Happend Worng ",
        totalEntry: totalEntry,
      });
    }
  },

  addTravelPlan: async (req, res) => {
    try {
      let user = req?.user
      let createdby
      let userlocation = user?.location
      createdby = userlocation[0]
      const line_of_business_name = "Travel";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });

      const travelFormdata = req.body?.rowsData
      console.log(">>>>>>>>>>>>>data", travelFormdata)
      let count = 0;
      for (let i = 0; i < travelFormdata.length; i++) {
        const formData = travelFormdata[i];
        const countryarr = [];
        let payload = {};
        if (formData?.country_name) {
          const country_name = formData?.country_name;
          const countrytopup = formData?.country_topup.includes(",") ? formData?.country_topup.split(",") : [formData?.country_topup];
          for (let j = 0; j < country_name.length; j++) {
            countryarr.push({
              country_id: country_name[j]["_id"],
              country_name: country_name[j]["country_name"],
              countrytopup: countrytopup[j].trim().replace(/\s+/g, 0),
            });
          }
          payload["country_or_topup"] = countryarr;
        }

        const add_op_con_desc_arr = [];
        if (formData?.add_op_con_desc) {
          const add_op_con_desc = formData?.add_op_con_desc.includes(",") ?
            formData?.add_op_con_desc.split(",") : [formData?.add_op_con_desc];
          const add_op_con_desc_topup =
            formData?.add_op_con_desc_topup.includes(",") ?
              formData?.add_op_con_desc_topup.split(",") : [formData?.add_op_con_desc_topup];
          const vat = formData.vat.includes(",") ? formData.vat.split(",") : [formData.vat];

          for (let j = 0; j < add_op_con_desc.length; j++) {
            add_op_con_desc_arr.push({
              add_op_con_desc: add_op_con_desc[j].trim().replace(/\s+/g, ""),
              add_op_con_desc_topup: add_op_con_desc_topup[j]
                .trim()
                .replace(/\s+/g, ""),
              vat: vat[j].trim().replace(/\s+/g, ""),
            });
          }
          payload["add_op_con_desc"] = add_op_con_desc_arr;
        }
        payload["line_of_business_id"] = line_of_business?._id;
        if (formData?.company_id) {
          payload["company_id"] = formData?.company_id;
        }
        if (formData?.plan_name) {
          payload["plan_name"] = formData?.plan_name;
        }
        if (formData?.plan_type) {
          payload["travel_insurance_for_id"] = formData?.plan_type;
        }
        if (formData?.plan_category_id) {
          payload["plan_category_id"] = formData?.plan_category_id;
        }
        if (formData?.nature_of_plan_id) {
          payload["nature_of_plan_id"] = formData?.nature_of_plan_id;
        }
        if (formData?.travel_type_id) {
          payload["travel_type_id"] = formData?.travel_type_id;
        }
        if (formData?.jdv_comm) {
          payload["jdv_comm"] = formData?.jdv_comm;
        }
        if (formData?.location) {
          payload["location"] = formData?.location;
        }
        let data
        let match = { standard_cover_status: 1 }
        if (line_of_business?._id) {
          match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
        }
        if (formData?.company_id) {
          match["standard_cover_company"] = mongoose.Types.ObjectId(formData?.company_id)

        }
        if (formData?.plan_type) {
          match["travel_insurance_for"] = mongoose.Types.ObjectId(formData?.plan_type)

        }
        if (formData?.plan_category_id) {
          match["cover_type"] = mongoose.Types.ObjectId(formData?.plan_category_id)
        }
        data = await standardCoverModels.aggregate([
          { $match: match }
        ])
        const standardCoverArray = [];
        for (let i = 0; i < data.length; i++) {
          standardCoverArray.push({
            standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
            standard_cover_label: data[i].standard_cover_label,
            standard_cover_desc: data[i].standard_cover_description,
            standard_cover_value: ''
          })
        }
        payload["standard_cover_arr"] = standardCoverArray;
        payload["plan_created_by"] = mongoose.Types.ObjectId(createdby?.loc_id)
        let travel_plan = new travel_plan_model(payload);
        let result = await travel_plan.save();
        if (result) {
          count++;
        }
      }
      if (count > 0) {
        return res.json({
          status: 200,
          message: "Travel Plan Added Successfully!",
          totalEntry: count,
        });
      } else {
        return res.json({
          status: 400,
          message: "Travel Plan Not Added Successfully!",
          totalEntry: count,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getTravelPlan: async (req, res) => {
    try {
      let query = req.query
      const page = query.page;
      const limit = query.limit;
      let name = query?.name;
      let company = query?.companyid;
      let status = +query.status
      // let policy_type = query?.policy_type
      console.log("name", name)
      console.log("company", company)
      console.log("status", status)
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => (obj?.loc_id))
      if (page && limit) {
        let match = {}
        match["location.value"] = {
          $in: userLocation
        }
        if (name) {
          match["plan_name"] = { $regex: new RegExp(name.trim(), 'i') }
        }
        if (company) {
          match["company_id"] = mongoose.Types.ObjectId(company)
        }
        if (status == 1 || status == 0) {
          match["status"] = +status
        }

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
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "travel_insurance_fors",
              localField: "travel_insurance_for_id",
              foreignField: "_id",
              as: "travel_insurance_for",
            },
          },
          {
            $lookup: {
              from: "travel_types",
              localField: "travel_type_id",
              foreignField: "_id",
              as: "travel_type",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
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
        let travel_data = await travel_plan_model.aggregate(aggregate);
        if (!travel_data[0]?.data.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found",
            data: travel_data[0]?.data,
            total: travel_data[0]?.totalCount[0]?.total,
          });
        }
      } else {
        let result = await travel_plan_model.aggregate([
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "travel_insurance_fors",
              localField: "travel_insurance_for_id",
              foreignField: "_id",
              as: "travel_insurance_for",
            },
          },
          {
            $lookup: {
              from: "travel_types",
              localField: "travel_type_id",
              foreignField: "_id",
              as: "travel_type",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_category",
            },
          },
          {
            $lookup: {
              from: "nature_of_plans",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plan",
            },
          },
          {
            $lookup: {
              from: "countries",
              localField: "country_or_topup.country_id",
              foreignField: "_id",
              as: "country",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
          },
        ]);

        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found",
            data: result,
            total: result.length,
          });

        }
      }
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  updatestatusTravelPlan: async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    let result = await travel_plan_model.findByIdAndUpdate(id, {
      status: status,
    });
    if (result != null) {
      if (status == 0) {
        res.json({
          status: 200,
          message: "Travel Plan Deactivated Successfully!",
        });
      } else {
        res.json({
          status: 200,
          message: "Travel Plan Activated Successfully!",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Travel Plan Not Deactivated Successfully!",
      });
    }
  },

  travel_plan_details: async (req, res) => {
    const id = req.params.id;
    const travel_plan_data = await travel_plan_model.findById(id);
    if (!travel_plan_data) {
      return res.json({ status: 400, message: "Data Not Found" });
    }
    else {
      const company_id = travel_plan_data?.company_id;
      const company_data = await company_models.findById(company_id);
      return res.json({ status: 200, message: "Data Found", data: travel_plan_data, company_name: company_data.company_name });
    }
  },

  updateTravelPlan: async (req, res) => {
    const id = req.params.id;
    const line_of_business_name = "Travel";
    const line_of_business = await line_of_business_model.findOne({
      line_of_business_name: line_of_business_name,
    });
    let payload = {};
    const updateTravaldata = req.body;
    const countryarr = [];
    if (updateTravaldata?.country) {
      const country_name = updateTravaldata?.country;
      const countrytopup = updateTravaldata?.countrytopup.includes(",") ?
        updateTravaldata?.countrytopup.split(",") : [updateTravaldata?.countrytopup];
      for (let j = 0; j < country_name.length; j++) {
        countryarr.push({
          country_id: country_name[j]["_id"],
          country_name: country_name[j]["country_name"],
          countrytopup: countrytopup[j].trim().replace(/\s+/g, ""),
        });
      }
      payload["country_or_topup"] = countryarr;
    }

    const add_op_con_desc_arr = [];
    if (updateTravaldata?.add_op_con_desc) {
      const add_op_con_desc = updateTravaldata?.add_op_con_desc.includes(",") ?
        updateTravaldata?.add_op_con_desc.split(",") : [updateTravaldata?.add_op_con_desc]
      const add_op_con_desc_topup = updateTravaldata?.add_op_con_desc_topup.includes(",") ?
        updateTravaldata?.add_op_con_desc_topup.split(",") : [updateTravaldata?.add_op_con_desc_topup];
      const vat = updateTravaldata?.vat.includes(",") ? updateTravaldata?.vat.split(",") : [updateTravaldata?.vat];

      for (let j = 0; j < add_op_con_desc.length; j++) {
        add_op_con_desc_arr.push({
          add_op_con_desc: add_op_con_desc[j],
          add_op_con_desc_topup: add_op_con_desc_topup[j]
            .trim()
            .replace(/\s+/g, 0),
          vat: vat[j].trim().replace(/\s+/g, ""),
        });
      }
      payload["add_op_con_desc"] = add_op_con_desc_arr;
    }
    let data
    let match = { standard_cover_status: 1 }
    if (line_of_business?._id) {
      match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
    }
    if (updateTravaldata?.company_id) {
      match["standard_cover_company"] = mongoose.Types.ObjectId(updateTravaldata?.company_id)

    }
    if (updateTravaldata?.plan_type) {
      match["travel_insurance_for"] = mongoose.Types.ObjectId(updateTravaldata?.plan_type)

    }
    if (updateTravaldata?.plan_category_id) {
      match["cover_type"] = mongoose.Types.ObjectId(updateTravaldata?.plan_category_id)
    }
    data = await standardCoverModels.aggregate([
      { $match: match }
    ])
    const standardCoverArray = [];
    for (let i = 0; i < data.length; i++) {
      standardCoverArray.push({
        standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
        standard_cover_label: data[i].standard_cover_label,
        standard_cover_desc: data[i].standard_cover_description,
        standard_cover_value: ''
      })
    }
    payload["standard_cover_arr"] = standardCoverArray;
    payload["line_of_business_id"] = line_of_business?._id;
    if (updateTravaldata?.company_id) {
      payload["company_id"] = updateTravaldata?.company_id;
    }
    if (updateTravaldata?.plan_name) {
      payload["plan_name"] = updateTravaldata?.plan_name;
    }
    if (updateTravaldata?.plan_type) {
      payload["travel_insurance_for_id"] = updateTravaldata?.plan_type;
    }
    if (updateTravaldata?.plan_category_id) {
      payload["plan_category_id"] = updateTravaldata?.plan_category_id;
    }
    if (updateTravaldata?.nature_of_plan_id) {
      payload["nature_of_plan_id"] = updateTravaldata?.nature_of_plan_id;
    }
    if (updateTravaldata?.travel_type_id) {
      payload["travel_type_id"] = updateTravaldata?.travel_type_id;
    }
    if (updateTravaldata?.jdv_comm) {
      payload["jdv_comm"] = updateTravaldata?.jdv_comm;
    }
    if (updateTravaldata?.location) {
      payload["location"] = updateTravaldata?.location;
    }

    const result = await travel_plan_model.findOneAndUpdate(
      { _id: id },
      {
        $set: payload,
      },
      { new: true }
    );

    if (result != null) {
      res.json({ status: 200, message: "Updated Successfully!", data: result });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },

  upload_travel_plan_policywordings_file: async (req, res) => {
    try {
      let newdetails = await travel_plan_model.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policywordings_file: req.file.filename } },
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

  add_bulk_travel_plane: async (req, res) => {
    try {
      let totalEntry = 0;
      let caseInsensitive = async (name) => {
        return { $regex: new RegExp(name.trim(), 'i') }
      }
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
      let allPlanData = [];

      await Promise.all(
        xlData.map(async (data) => {
          let payload = {};
          let companyId;
          let travelTypeId;
          let planCategoryId;
          let nature_of_plan_id;
          let travel_insurance_for_id;
          let country_or_topupArray = [];
          let add_op_con_desc = [];
          let countryNameArray = data["Country"];
          let countryTopupArar = data["Country (Topup)"];
          if (
            data["Add Option Condition Description"].includes(",") &&
            data["Vat Able"].includes(",") &&
            data["Topup (Add Option Condition Description)"].includes(",")
          ) {
            let description = data["Add Option Condition Description"]
              .trim()
              .split(",");
            let topup = data["Topup (Add Option Condition Description)"]
              .trim()
              .split(",");
            let vatAble = data["Vat Able"].trim().split(",");
            for (let i = 0; i < description.length; i++) {
              add_op_con_desc.push({
                add_op_con_desc: description[i],
                add_op_con_desc_topup: topup[i],
                vat: vatAble[i],
              });
            }
          } else {
            add_op_con_desc.push({
              add_op_con_desc: data["Add Option Condition Description"],
              add_op_con_desc_topup:
                data["Topup (Add Option Condition Description)"],
              vat: data["Vat Able"],
            });
          }
          if (countryNameArray.includes(",")) {
            countryNameArray = countryNameArray.trim().split(",");
            countryTopupArar = countryTopupArar.trim().split(",");
            for (let i = 0; i < countryNameArray.length; i++) {
              let countryDetails = await CountryModels.findOne({
                country_name: countryNameArray[i],
              });
              country_or_topupArray.push({
                country_id: countryDetails?._id?.toString(),
                country_name: countryNameArray[i],
                countrytopup: countryTopupArar[i],
              });
            }
          } else {
            let countryDetails = await CountryModels.findOne({
              country_name: countryNameArray,
            });
            country_or_topupArray.push({
              country_id: countryDetails?._id?.toString(),
              country_name: countryNameArray,
              countrytopup: countryTopupArar,
            });
          }
          travel_insurance_for_id = await TravelInsuranceModel.findOne({
            travel_insurance_for: await caseInsensitive(data["Travel Insurance For"]),
          });
          travel_insurance_for_id = travel_insurance_for_id?._id?.toString();
          nature_of_plan_id = await Nature_of_plan.findOne({
            nature_of_plan_name: await caseInsensitive(data["Nature Of Plan"]),
          });
          nature_of_plan_id = nature_of_plan_id?._id?.toString();
          planCategoryId = await PlaneCategoryModel.findOne({
            plan_category_name: await caseInsensitive(data["Plan Category"]),
          });
          planCategoryId = planCategoryId?._id?.toString();
          travelTypeId = await TravelTypeModel.findOne({
            travel_type: await caseInsensitive(data["Travel Type"]),
          });
          travelTypeId = travelTypeId?._id?.toString();
          companyId = await CompanyModel.findOne({
            company_name: await caseInsensitive(data["Company Name"]),
          });
          companyId = companyId?._id?.toString();
          payload["location"] = data?.location
          payload["country_or_topup"] = country_or_topupArray;
          payload["add_op_con_desc"] = add_op_con_desc;
          payload["travel_insurance_for_id"] = travel_insurance_for_id;
          payload["nature_of_plan_id"] = nature_of_plan_id;
          payload["plan_category_id"] = planCategoryId;
          payload["travel_type_id"] = travelTypeId;
          payload["company_id"] = companyId;
          payload["plan_name"] = data["Plan Name"];
          payload["jdv_comm"] = data["JDV Commision"];
          payload["sale_person_comm"] = data["Sales Person Commision"];
          payload["line_of_business_id"] = "6418645df42eaf5ba1c9e0f6";

          totalEntry++;
          let travel_plan = new travel_plan_model(payload);
          let result = await travel_plan.save();
          if (result != null) {
            allPlanData.push(result);
          }
        })
      );

      console.log("allPlanData", allPlanData);


      if (allPlanData.length > 0) {
        return res.status(200).json({
          status: 200,
          message: "File Upload Successfully !!",
          totalEntry: totalEntry,
        });
      }
      return res
        .status(400)
        .json({ status: 400, message: "File not Uploaded" });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: 400, message: "Something Happend Worng" });
    }
  },

  travelplanprice: async (req, res) => {
    try {
      let payload = req.body
      const page = +payload?.page;
      const limit = +payload?.perPage;
      const id = payload?.travel_plan_id;
      console.log("payload..............", payload)
      let result

      result = await TravelPlanPriceModel.aggregate([
        {
          $facet: {
            conut: [
              {
                $match: {
                  plan_id: mongoose.Types.ObjectId(id),
                }
              },
              {
                $count: "tottal"
              }
            ],
            data: [
              {
                $match: {
                  plan_id: mongoose.Types.ObjectId(id),
                },
              },
              {
                $lookup: {
                  from: "travel_plan_types",
                  localField: "plan_type_id",
                  foreignField: "_id",
                  as: "plan_type",
                },
              },
              {
                $lookup: {
                  from: "travel_region_lists",
                  localField: "region_id.value",
                  foreignField: "_id",
                  as: "regions",
                },
              },
              {
                $lookup: {
                  from: "travel_cover_type_lists",
                  localField: "cover_type_id",
                  foreignField: "_id",
                  as: "cover_type",
                },
              },
              {
                $skip: +(page - 1) * limit
              },
              {
                $limit: limit
              }
            ]
          }
        }
      ])
      console.log("hhhhhhhhhhhhhhhhhhhhh", result[0]?.conut[0]?.tottal)
      res.json({
        status: 200,
        message: "Data Found",
        data: result[0]?.data,
        total: result[0]?.conut[0]?.tottal,
      });
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  },

  addtravelplanprice: async (req, res) => {
    try {
      let count = 0;
      const id = req.query.id;
      const data = req.body;
      console.log("data>>>>>>>>>>>>", data, ">>>>>id", id);

      for (let i = 0; i < data.length; i++) {
        let payload = {};
        const age_or_topup_arr = [];


        if (data[i]?.age) {
          const age = data[i]?.age.includes(",") ? data[i]?.age.split(",") : [data[i]?.age];
          const agetopup = data[i]?.age_topup.includes(",") ? data[i]?.age_topup.split(",") : [data[i]?.age_topup];
          for (let i = 0; i < age.length; i++) {
            const ageRange = age[i]?.split("-");
            const ageMin = ageRange.length > 0 ? parseInt(ageRange[0].trim()) : 0;
            const ageMax =
              ageRange.length > 1 ? parseInt(ageRange[1].trim()) : ageMin;

            age_or_topup_arr.push({
              ageMin,
              ageMax,
              agetopup: agetopup[i] ? agetopup[i].trim() : 0,
            });
          }
          payload["age_or_topup"] = age_or_topup_arr;
        }


        if (data[i]?.no_of_days) {
          payload["no_of_days_strings"] = data[i]?.no_of_days
          const number_of_days_topup_arr = [];
          const number_of_days = data[i]?.no_of_days.includes(",") ? data[i]?.no_of_days.split(",")
            : [data[i]?.no_of_days];
          const number_of_days_topup = data[i]?.travel_premium.includes(",")
            ? data[i]?.travel_premium.split(",")
            : [data[i]?.travel_premium];
          for (let i = 0; i < number_of_days.length; i++) {
            const number_of_daysRange = number_of_days[i]?.split("-");
            const number_of_daysMin =
              number_of_daysRange.length > 0
                ? parseInt(number_of_daysRange[0].trim())
                : 0;
            const number_of_daysMax =
              number_of_daysRange.length > 1
                ? parseInt(number_of_daysRange[1].trim())
                : number_of_daysMin;

            number_of_days_topup_arr.push({
              number_of_daysMin,
              number_of_daysMax,
              travel_premium: number_of_days_topup[i]
                ? number_of_days_topup[i].trim()
                : 0,
            });
          }
          payload["no_of_days_or_topup"] = number_of_days_topup_arr;
        }
        if (data[i]?.region_id) {
          const regionIds = data[i]?.region_id.map((region) => ({
            label: region.label,
            value: mongoose.Types.ObjectId(region.value)
          }))
          payload["region_id"] = regionIds;
        }
        if (data[i]?.price_name) {
          payload["price_name"] = data[i]?.price_name;
        }
        if (data[i]?.cover_type_id) {
          payload["cover_type_id"] = data[i]?.cover_type_id;
        }
        if (data[i]?.no_of_child) {
          const no_of_child = data[i]?.no_of_child.includes(",") ?
            data[i]?.no_of_child.split(",") : [data[i]?.no_of_child];
          const no_of_child_topup = data[i]?.no_of_children_topup.includes(",") ?
            data[i]?.no_of_children_topup.split(",") : [data[i]?.no_of_children_topup];
          const no_of_child_or_topup_arr = [];
          for (let i = 0; i < no_of_child.length; i++) {
            const no_of_childRange = no_of_child[i]?.split("-");
            const no_of_childMin = no_of_childRange.length > 0 ? parseInt(no_of_childRange[0].trim()) : 0;
            const no_of_childMax = no_of_childRange.length > 1 ? parseInt(no_of_childRange[1].trim()) : no_of_childMin;
            no_of_child_or_topup_arr.push({
              no_of_childMin,
              no_of_childMax,
              no_of_child_topup: no_of_child_topup[i] ? no_of_child_topup[i]?.trim() : 0,
            });
          }
          payload["no_of_child"] = no_of_child_or_topup_arr;
        }
        if (data[i]?.no_of_spouse) {
          const no_of_spouse = data[i]?.no_of_spouse.includes(",") ?
            data[i]?.no_of_spouse.split(",") : [data[i]?.no_of_spouse];
          const no_of_spouse_topup = data[i]?.no_of_spouse_topup.includes(",") ?
            data[i]?.no_of_spouse_topup.split(",") : [data[i]?.no_of_spouse_topup];
          const no_of_spouse_or_topup_arr = [];
          for (let i = 0; i < no_of_spouse.length; i++) {
            const no_of_spouseRange = no_of_spouse[i]?.split("-");
            const no_of_spouseMin = no_of_spouseRange.length > 0 ? parseInt(no_of_spouseRange[0].trim()) : 0;
            const no_of_spouseMax = no_of_spouseRange.length > 1 ? parseInt(no_of_spouseRange[1].trim()) : no_of_spouseMin;
            no_of_spouse_or_topup_arr.push({
              no_of_spouseMin,
              no_of_spouseMax,
              no_of_spouse_topup: no_of_spouse_topup[i] ? no_of_spouse_topup[i]?.trim() : 0,
            });
          }
          payload["no_of_spouse"] = no_of_spouse_or_topup_arr;
        }
        if (data[i]?.plan_type_id) {
          payload["plan_type_id"] = data[i]?.plan_type_id;
        }
        payload["plan_id"] = id;

        const addplanprice = new TravelPlanPriceModel(payload);

        const result = await addplanprice.save();

        if (result) {
          count++;

        } else {

        }
      }
      if (count > 0) {
        return res.json({
          status: 200,
          message: "Travel Plan Price Added Successfully!",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Something Went Wrong!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: "Something Happend Worng",
      });
    }
  },

  planpricedetails: async (req, res) => {
    const id = req.params.id;
    const travel_plan_price_data = await TravelPlanPriceModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "travel_region_lists",
          localField: "region_id.value",
          foreignField: "_id",
          as: "regions",
        },
      },
      {
        $project: {
          _id: 1,
          plan_id: 1,
          price_name: 1,
          plan_type_id: 1,
          cover_type_id: 1,
          no_of_days_or_topup: 1,
          age_or_topup: 1,
          no_of_child: 1,
          no_of_spouse: 1,
          "regions._id": 1,
          "regions.travel_region": 1,
        },
      },
    ]);
    res.json({
      status: 200,
      message: "Data Found",
      data: travel_plan_price_data,
    });
  },

  updateplanprice: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      console.log("data>>>>>>>>>>>>", data);
      let payload = {};
      const age_or_topup_arr = [];
      if (data?.age) {
        const age = data?.age.includes(",") ? data?.age.split(",") : [data?.age];
        const agetopup = data?.age_topup.includes(",") ? data?.age_topup.split(",") : [data?.age_topup];
        for (let i = 0; i < age.length; i++) {
          const ageRange = age[i]?.split("-");
          const ageMin = ageRange.length > 0 ? parseInt(ageRange[0].trim()) : 0;
          const ageMax =
            ageRange.length > 1 ? parseInt(ageRange[1].trim()) : ageMin;

          age_or_topup_arr.push({
            ageMin,
            ageMax,
            agetopup: agetopup[i] ? agetopup[i].trim() : 0,
          });
        }
        payload["age_or_topup"] = age_or_topup_arr;
      }



      if (data?.no_of_days) {
        payload["no_of_days_strings"] = data?.no_of_days

        const number_of_days_topup_arr = [];
        const number_of_days = data?.no_of_days.includes(",") ? data?.no_of_days.split(",")
          : [data?.no_of_days];
        const number_of_days_topup = data?.travel_premium.includes(",")
          ? data?.travel_premium.split(",")
          : [data?.travel_premium];
        for (let i = 0; i < number_of_days.length; i++) {
          const number_of_daysRange = number_of_days[i]?.split("-");
          const number_of_daysMin =
            number_of_daysRange.length > 0
              ? parseInt(number_of_daysRange[0].trim())
              : 0;
          const number_of_daysMax =
            number_of_daysRange.length > 1
              ? parseInt(number_of_daysRange[1].trim())
              : number_of_daysMin;

          number_of_days_topup_arr.push({
            number_of_daysMin,
            number_of_daysMax,
            travel_premium: number_of_days_topup[i]
              ? number_of_days_topup[i].trim()
              : 0,
          });
        }
        payload["no_of_days_or_topup"] = number_of_days_topup_arr;
      }
      if (data?.region_id) {
        const regionIds = data?.region_id.map((region) => ({
          label: region.label,
          value: mongoose.Types.ObjectId(region.value)
        }))
        payload["region_id"] = regionIds;
      }
      if (data?.price_name) {
        payload["price_name"] = data?.price_name;
      }
      if (data?.cover_type_id) {
        payload["cover_type_id"] = data?.cover_type_id;
      }
      if (data?.no_of_child) {
        const no_of_child = data?.no_of_child.includes(",") ?
          data?.no_of_child.split(",") : [data?.no_of_child];
        const no_of_child_topup = data?.no_of_children_topup.includes(",") ?
          data?.no_of_children_topup.split(",") : [data?.no_of_children_topup];
        const no_of_child_or_topup_arr = [];
        for (let i = 0; i < no_of_child.length; i++) {
          const no_of_childRange = no_of_child[i]?.split("-");
          const no_of_childMin = no_of_childRange.length > 0 ? parseInt(no_of_childRange[0].trim()) : 0;
          const no_of_childMax = no_of_childRange.length > 1 ? parseInt(no_of_childRange[1].trim()) : no_of_childMin;
          no_of_child_or_topup_arr.push({
            no_of_childMin,
            no_of_childMax,
            no_of_child_topup: no_of_child_topup[i] ? no_of_child_topup[i]?.trim() : 0,
          });
        }
        payload["no_of_child"] = no_of_child_or_topup_arr;
      }
      if (data?.no_of_spouse) {
        const no_of_spouse = data?.no_of_spouse.includes(",") ?
          data?.no_of_spouse.split(",") : [data?.no_of_spouse];
        const no_of_spouse_topup = data?.no_of_spouse_topup.includes(",") ?
          data?.no_of_spouse_topup.split(",") : [data?.no_of_spouse_topup];
        const no_of_spouse_or_topup_arr = [];
        for (let i = 0; i < no_of_spouse.length; i++) {
          const no_of_spouseRange = no_of_spouse[i]?.split("-");
          const no_of_spouseMin = no_of_spouseRange.length > 0 ? parseInt(no_of_spouseRange[0].trim()) : 0;
          const no_of_spouseMax = no_of_spouseRange.length > 1 ? parseInt(no_of_spouseRange[1].trim()) : no_of_spouseMin;
          no_of_spouse_or_topup_arr.push({
            no_of_spouseMin,
            no_of_spouseMax,
            no_of_spouse_topup: no_of_spouse_topup[i] ? no_of_spouse_topup[i]?.trim() : 0,
          });
        }
        payload["no_of_spouse"] = no_of_spouse_or_topup_arr;
      }
      if (data?.plan_type_id) {
        payload["plan_type_id"] = data?.plan_type_id;
      }
      if (data?.plan_id) {
        payload["plan_id"] = data?.plan_id;
      }
      const result = await TravelPlanPriceModel.findOneAndUpdate(
        { _id: id },
        {
          $set: payload,
        },
        { new: true }
      );

      if (result != null) {
        res.json({ status: 200, message: "Updated Successfully!", data: result });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: "Something Went Worng",
      });
    }
  },
  DeleteTravelPlanPrice: async (req, res) => {
    const id = req.query.id;
    const result = await TravelPlanPriceModel.findByIdAndDelete(id);
    if (result != null) {
      res.json({ status: 200, message: "Deleted Successfully!" });
    } else {
      res.json({ status: 400, message: "Failed" });
    }
  },
  UpdateTravelPlanPriceStatus: async (req, res) => {
    try {
      let id = req.query.id;
      let status = req.query.status;
      const result = await TravelPlanPriceModel.findByIdAndUpdate(id, {
        status: status,
      });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Plan Price Deactivated Successfully",
            data: result,
          });
        } else {
          res.json({
            status: 200,
            message: "Plan Price Activated Successfully",
            data: result,
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Plan Price Not Deactivated Successfully",
        });
      }
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  },

  getMotorPlans: async (req, res) => {
    try {
      const company_id = req.body.companyId;
      const page = req.body.page;
      const limit = req.body.perPage;

      const result = await motor_plan_model
        .aggregate([
          {
            $match: {
              company_id: mongoose.Types.ObjectId(company_id),
            },
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $project: {
              plan_name: 1,
              "policy_type.policy_type_name": 1,
              policywordings_file: 1,
              status: 1,
            },
          },
          {
            $facet: {
              data: [
                { $skip: (page - 1) * limit },
                { $limit: +limit },
              ],
              totalCount: [{ $count: "total" }]
            }
          }
        ])
      res.json({
        status: 200,
        message: "Data Found",
        data: result[0]?.data || [],
        total: result[0]?.totalcount[0]?.total || 0,
      });
    } catch (err) {
      res.send(err);
    }
  },

  getTravelPlans: async (req, res) => {


    try {

      const company_id = req.body.companyId;
      console.log(company_id, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ")
      const page = req.body.page;
      const limit = req.body.perPage;
      const result = await travel_plan_model
        .aggregate([
          {
            $match: {
              company_id: mongoose.Types.ObjectId(company_id),
            },
          },
          {
            $lookup: {
              from: "travel_insurance_fors",
              localField: "travel_insurance_for_id",
              foreignField: "_id",
              as: "travel_insurance_for",
            },
          },
          {
            $lookup: {
              from: "travel_types",
              localField: "travel_type_id",
              foreignField: "_id",
              as: "travel_type",
            },
          },
          {
            $project: {
              plan_name: 1,
              "travel_insurance_for.travel_insurance_for": 1,
              "travel_type.travel_type": 1,
              policywordings_file: 1,
              status: 1,
            },
          },
          {
            $facet: {
              data: [
                { $skip: (page - 1) * limit },
                { $limit: +limit }
              ],
              totalCount: [{ $count: "count" }],
            }
          },
        ])

      res.json({
        status: 200,
        message: "Data Found",
        data: result[0]?.data || [],
        count: result[0]?.totalCount[0]?.count || 0,
      });
    } catch (err) {
      res.send(err);
    }
  },
  getHomePlansInsurance: async (req, res) => {
    try {
      const company_id = req.body.companyId;
      const page = req.body.page;
      const limit = req.body.perPage;
      const result = await home_plan_model
        .aggregate([
          {
            $match: {
              company_id: mongoose.Types.ObjectId(company_id),
            },
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $lookup: {
              from: "home_plan_type_lists",
              localField: "plan_type_id",
              foreignField: "_id",
              as: "plan_type",
            },
          },
          {
            $project: {
              plan_name: 1,
              property_type_id: 1,
              "plan_type.home_plan_type": 1,
              "policy_type.policy_type_name": 1,
              policywordings_file: 1,
              status: 1,
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: +limit,
          },
        ])
      const count = await home_plan_model.aggregate([
        {
          $match: {
            company_id: mongoose.Types.ObjectId(company_id),
          },
        },

        {
          $count: 'total'
        }
      ]);
      let totalcount = count.length > 0 ? count[0].total : 0
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: totalcount,
      });
    } catch (err) {
      res.send(err);
    }
  },
  getHomePlansInsurance: async (req, res) => {
    try {
      const company_id = req.body.companyId;
      const page = req.body.page;
      const limit = req.body.perPage;
      const result = await home_plan_model
        .aggregate([
          {
            $match: {
              company_id: mongoose.Types.ObjectId(company_id),
            },
          },
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $lookup: {
              from: "home_plan_type_lists",
              localField: "plan_type_id",
              foreignField: "_id",
              as: "plan_type",
            },
          },
          {
            $project: {
              plan_name: 1,
              property_type_id: 1,
              "plan_type.home_plan_type": 1,
              "policy_type.policy_type_name": 1,
              policywordings_file: 1,
              status: 1,
            },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: +limit,
          },
        ])
      const count = await home_plan_model.aggregate([
        {
          $match: {
            company_id: mongoose.Types.ObjectId(company_id),
          },
        },

        {
          $count: 'total'
        }
      ]);
      let totalcount = count.length > 0 ? count[0].total : 0
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: totalcount,
      });
    } catch (err) {
      res.send(err);
    }
  },
  getMotorDetails: async (req, res) => {
    try {
      let data = [];
      let mostPurchaseData = [];
      let payload = req.body
      // let aggregate = [];
      let name = req.query.name
      let totalYear = new Date().getFullYear() - (+payload?.years)
      if (payload.length) {
        res
          .status(400)
          .json({ status: 400, message: "Please Select Year", data: data });
      }


      if (payload.years && !payload.carMaker && !payload.carModel) {
        console.log("here1")
        // // let match = { make_motor_status:1,motor_model_detail_start_year:+payload.years}
        // let match = {motor_model_detail_start_year:+payload.years}

        // let makeNameObj = {}
        // if(name){
        //   makeNameObj["_id"] ={
        //     $regex:name,
        //     $options:"i"
        //   }
        // }
        // data = await moterDetailsModels.aggregate([
        //   {
        //     $match:match
        //   },
        //   {
        //     $lookup:{
        //       from: "make_motors",
        //       localField: "motor_model_make_id",
        //       foreignField: "_id",
        //       as: "makedata"
        //     }
        //   },
        //   {
        //     $match:{"makedata.make_motor_status":1}
        //   },
        //   {
        //     $project:{"makedata.make_motor_name":1,"makedata.make_motor_logo":1}
        //   },
        //   {
        //     $unwind:"$makedata"
        //   },
        //   {
        //     $group: {
        //       _id: "$makedata.make_motor_name",
        //       uniqueDocuments: { $addToSet: "$$ROOT" }
        //     }
        //   },
        //   {
        //     $replaceRoot: { newRoot: { $arrayElemAt: ["$uniqueDocuments", 0] } }
        //   }
        //       // {
        //       //   $group: {
        //       //     _id: "$makedata.make_motor_name",
        //       //   }
        //       // },
        //       // {
        //       //   $match:makeNameObj
        //       // },
        //       // {
        //       //       $sort:{_id:1}
        //       //     }
        // ])
        let match = { make_motor_status: 1 }
        if (name) {
          match["make_motor_name"] = {
            $regex: name,
            $options: "i"
          }
        }
        data = await MoterModel.aggregate([
          { $match: match },

          {
            $lookup: {
              from: "motor_model_details",
              localField: "_id",
              foreignField: "motor_model_make_id",
              as: "result"
            }
          },
          {
            $match: { "result.motor_model_detail_start_year": +payload.years }
          },
          {
            $addFields: {
              _id: "$make_motor_name"
            }
          },

          {
            $sort: { _id: 1 }
          },
          {
            $project: {
              "make_motor_name": 1,
              make_motor_logo: 1,
              // _id:0
            }
          },
        ])

        console.log("data", data)
        // data = await MoterModel.aggregate([
        //  { $match:match},
        //   {
        //     $project:{
        //       "make_motor_name":1,
        //       make_motor_logo:1,
        //       _id:0
        //     }
        //   },
        //   // {
        //   //   $addFields:{
        //   //     _id:"$make_motor_name"
        //   //   }
        //   // },

        //   // {
        //   //   $sort:{_id:1}
        //   // }
        // ])
        mostPurchaseData = await NewLeadsModels.aggregate([
          {
            '$group': {
              '_id': '$car_maker',
              'total': {
                '$sum': 1
              }
            }
          }, {
            '$sort': {
              'total': -1
            }
          }, {
            '$match': {
              '_id': {
                '$ne': null
              }
            }
          }, {
            '$limit': 9
          }, {
            '$project': {
              '_id': {
                $toUpper: "$_id"
              }
            }
          }
        ])
      }
      else if (payload.years && payload.carMaker && !payload.carModel) {

        data = await MoterModel.aggregate([
          {
            $match: {
              make_motor_name: payload?.carMaker,
              make_motor_status: 1,
            }
          },
          {
            $lookup: {
              from: "motor_models",
              localField: "_id",
              foreignField: "motor_model_make_id",
              as: "models"
            }
          },
          {
            $unwind: "$models"
          },
          {
            $lookup: {
              from: "motor_model_details",
              localField: "models._id",
              foreignField: "motor_model_detail_model_id",
              as: "motorModelsDetails"
            }
          },
          {
            $match: { "models.motor_model_status": 1, "motorModelsDetails.motor_model_detail_start_year": +payload.years }
          },
          {
            $group: {
              _id: "$models.motor_model_name"
            }
          },
          {
            $sort: { _id: 1 }
          }
        ])
      }
      else if (payload.years && payload.carMaker && payload.carModel) {

        let match = {
          motor_model_detail_status: 1,
          motor_model_detail_start_year: +payload.years
        }
        data = await moterDetailsModels.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "make_motors",
              localField: "motor_model_make_id",
              foreignField: "_id",
              as: "makedata"
            }
          },
          {
            $lookup: {
              from: "motor_models",
              localField: "motor_model_detail_model_id",
              foreignField: "_id",
              as: "modelesData"
            }
          },
          {
            $match: {
              "makedata.make_motor_name": payload.carMaker,
              "modelesData.motor_model_name": payload.carModel
            }
          },
          {
            $project: {
              "motor_model_detail_name": 1
            }
          }
          // {
          //         $group:{
          //           _id:"$motor_model_detail_name"
          //         }
          //       },
        ])
        // let currentDtae = +new Date().getFullYear()
        //  data = await MoterModel.aggregate([
        //   { $match:{
        //     make_motor_name:payload?.carMaker,
        //     make_motor_status:1,
        //     }},
        //     {
        //       $lookup:{
        //         from: "motor_models",
        //         localField: "_id",
        //         foreignField: "motor_model_make_id",
        //         as: "models"
        //       }
        //     },
        //     {
        //       $unwind:"$models"
        //     },
        //     {
        //       $lookup:{
        //         from: "motor_model_details",
        //         localField: "models._id",
        //         foreignField: "motor_model_detail_model_id",
        //         as: "modelDetails"
        //       }
        //     },
        //     {
        //       $unwind:"$modelDetails"
        //     },
        //     {
        //       $match:{
        //         "models.motor_model_status": 1,
        //         "models.motor_model_name": payload.carModel,
        //         "$or": [
        //           {
        //             $and: [
        //               { "modelDetails.motor_model_detail_discontinuation_year": { $exists: false } },
        //               { "modelDetails.motor_model_detail_start_year": {$lte:+payload?.years }}
        //             ]
        //           },
        //           {
        //             $and: [
        //               { "modelDetails.motor_model_detail_discontinuation_year": { $gte: currentDtae } },
        //               { "modelDetails.motor_model_detail_start_year": {$lte:+payload?.years }}
        //             ]
        //           }
        //         ],
        //         "modelDetails.motor_model_detail_dep": {
        //           $gte: totalYear
        //         },
        //         "modelDetails.motor_model_detail_status": 1
        //       }
        //     },
        //     {
        //       $group:{
        //         _id:"$modelDetails.motor_model_detail_name"
        //       }
        //     },
        //     {
        //       $sort:{_id:1}
        //     }
        //  ]);

      }



      console.log("data222", data)


      if (data.length == 0) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Data Not Found",
            data: data,
            mostPurchaseData: mostPurchaseData
          });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Data Find1 Successfully", data, value: [undefined, "sdasd"], mostPurchaseData });
    } catch (err) {
      console.log(err);
    }
  },
  getMatchMotorPlane: async (req, res) => {
    console.log("payload", req.body)
    try {
      let referredCheck = async (str) => {
        // console.log("str>...........................................",str)
        if (typeof str === 'string') {
          str = str?.toLowerCase()
          if (str?.includes("r")) {
            return "REFERRED"
          } else if (str?.includes("%")) {
            return true
          }
          else {
            return false
          }

        }
        return false
      }
      let vatData = await vatModels.findOne({ vat_lob: mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef'), vat_status: 1 })
      vatData = +vatData?.vat_percentage?.split("%")[0]
      let blackListMatch = {}
      let payload = req.body
      let minCarValue = +payload.minCarValue
      let maxCarValue = +payload.maxCarValue
      let additionalId = payload?.additional_id
      let matchObj = { status: 1 }
      let comprObj = {}
      let motorMatchPlane
      let nationality = payload?.nationality

      let [
        policyTypeName,
        electricVehicle,
        polcy_type,
        drivingExpMin,
        drivingExpMax,
        car_maker,
        model_year,
        car_model,
        car_variant,
        vehicle_specification,
        last_year_policy_type,
        drivingexpinuaeMin,
        drivingexpinuaeMax,
        claimYearTopup,
        ageOfCar,
        ageOfUser,
      ] = [
          payload?.polcy_type,
          payload?.electric_vehicle,
          payload?.polcy_type,
          payload?.drivingexp?.min,
          payload?.drivingexp?.max,
          payload?.car_maker,
          payload?.model_year,
          payload?.car_model,
          payload?.car_variant,
          payload?.vehicle_specification,
          payload?.last_year_policy_type,
          payload?.drivingexpinuae?.min,
          payload?.drivingexpinuae?.max,
          payload?.claims_certificate_from_issurer,
          payload?.registration_year,
          payload?.date_of_birth,
        ];
      vehicleDetails = await moterDetailsModels.findById(payload.car_variant_id)
      ageOfUser = +new Date()?.getFullYear() - new Date(payload?.date_of_birth)?.getFullYear()
      console.log("hbjfnjhnjg", vehicleDetails)
      if (minCarValue == 0) {
        return res.status(404).json({ status: 404, message: "Plan Not Found ", data: [] })
      }
      if (vehicleDetails) {
        matchObj["body_type._id"] = {

          '$in': [vehicleDetails?.motor_model_detail_body_type?.toString()]

        }
      }
      if ((drivingExpMin == 0 || drivingExpMin) && drivingExpMax) {
        matchObj["drivingexp_or_topup.drivingExpMin"] = {
          $lte: drivingExpMin
        }
        matchObj["drivingexp_or_topup.drivingExpMax"] = {
          $gte: drivingExpMax
        }
      }
      if (ageOfUser) {
        matchObj["age_or_topup.ageMin"] = {
          $lte: ageOfUser
        }
        matchObj["age_or_topup.ageMax"] = {
          $gte: ageOfUser
        }
      }
      if (payload?.policy_type) {
        matchObj["plan_for.plan_for_name"] =
          payload?.policy_type?.trim();
      }
      if (payload?.model_year) {
        ageOfCar = new Date().getFullYear() - + payload?.model_year;
        console.log("?????????????????????????/", { ageOfCar, matchObj })
        matchObj["age_of_the_car_or_topup.age_of_the_car_min"] = {
          $lte: ageOfCar
        }
        matchObj["age_of_the_car_or_topup.age_of_the_car_max"] = {
          $gte: ageOfCar
        }

      }
      if (nationality) {
        matchObj["non_applicable_nationality.non_applicable_nationality_label"] = { $ne: nationality }

      }
      // if(payload?.planId){
      //   matchObj["_id"] = mongoose.Types.ObjectId(payload?.planId)
      // }
      if (minCarValue) {
        comprObj["car_value.car_valueMin"] = {
          $lte: +minCarValue
        }
        comprObj["car_value.car_valueMax"] = {
          $gte: +minCarValue
        }
      }
      if (last_year_policy_type) {
        comprObj["last_year_policy_type_or_topup.last_year_policy_type"] = last_year_policy_type
      }
      if (vehicle_specification) {
        comprObj["plan_for_gcc_spec_name_or_topup.plan_for_gcc_spec_name"] = vehicle_specification
      }
      if (payload?.repaire_type_name) {
        matchObj["repair_type_id._id"] =
          payload?.repaire_type_name;
      }
      if (payload?.nature_of_plan_id) {
        matchObj["nature_of_plan_id"] = mongoose.Types.ObjectId(
          payload.nature_of_plan_id
        );
      }
      if (payload?.company_id) {
        matchObj["company_id"] = mongoose.Types.ObjectId(
          payload?.company_id.trim()
        );
      }
      if (electricVehicle == 0 || electricVehicle == 1) {
        matchObj["electric_vehicle"] = electricVehicle
      }
      if (additionalId?.length) {
        additionalId = additionalId.map((id) => mongoose.Types.ObjectId(id))
        matchObj["additional_cover_arr.additional_cover_id"] = {
          $in: additionalId,
        };

      }
      if (payload?.insurerdCompanyId) {
        matchObj["company_id"] = {
          $not: {
            $eq: mongoose.Types.ObjectId(payload?.insurerdCompanyId)
          }
        }
      }
      if (payload.car_variant_id) {
        blackListMatch["$or"] = [{
          "black_listed_vehicle.variantId": mongoose.Types.ObjectId(payload.car_variant_id)
        },
        {
          "companies.blackListVehicle": {
            $not: {
              $in: [mongoose.Types.ObjectId(payload.car_variant_id)]
            }
          }
        },

        ]
      }
      let leadLocation
      if (payload?.newLeadId) {
        let leadDetails = await NewLeadsModels.findById(payload?.newLeadId)
        leadLocation = leadDetails?.lead_location
        matchObj["location.value"] = leadLocation?.toString()

      }
      console.log('matchObj////////////////////////////', matchObj,)
      motorMatchPlane = await motor_plan_model.aggregate([
        {
          '$facet': {
            'comper': [
              {
                '$match': {
                  'policy_type_id': mongoose.Types.ObjectId('641161a4591c2f02bcddf51c'),
                  ...comprObj,
                  ...matchObj
                }
              }
            ],
            'tpl': [
              {
                '$match': {
                  'policy_type_id': mongoose.Types.ObjectId('64365a4f12211cef85f5b102'),
                  ...matchObj
                }
              }
            ]
          }
        }, {
          '$project': {
            'data': {
              '$concatArrays': [
                '$comper', '$tpl'
              ]
            }
          }
        }, {
          '$unwind': {
            'path': '$data'
          }
        },
        {
          '$replaceRoot': {
            'newRoot': '$data'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "companies",
          },
        },
        {
          $unwind: "$companies",
        },
        {
          $match: blackListMatch
        },
        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$standard_cover_arr", companyId: "$companies._id", policTypeId: "$policy_type_id", planCategoryId: "$plan_category_id" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                  $expr: {
                    $and: [
                      { $not: { $in: ["$_id", "$$standardId.standard_cover_id"], } },
                      { $in: ["$$companyId", "$standard_cover_company"] },
                      { $in: ["$$policTypeId", "$standard_cover_plan"] },
                      // { $in: ["$$planCategoryId", "$plan_category_id"] },
                      // { $eq: ["$$planTypeIdCom", "$standard_cover_plan"] },
                    ]
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
      ])
      for (let i = 0; i < motorMatchPlane.length; i++) {
        let basePremium;
        let finallBasePremium;
        let planBasePremium;
        let referred = false;
        let excessAmount = "NA"
        let finalRate = 0

        if (motorMatchPlane[i].policy_type_id?.toString() === "641161a4591c2f02bcddf51c") {
          let carValurArray = motorMatchPlane[i]?.car_value
          for (let j = 0; j < carValurArray.length; j++) {
            let carValueMin = +carValurArray[j]?.car_valueMin
            let carValueMax = +carValurArray[j]?.car_valueMax

            if ((carValueMin <= +minCarValue) && (carValueMax >= +minCarValue)) {
              excessAmount = carValurArray[j]?.excess
              let rate = carValurArray[j]?.rate
              if (typeof rate == "string") {
                rate = +rate.split("%")[0]
              } else {
                rate = + rate
              }
              finalRate = rate
              basePremium = (minCarValue * rate) / 100;
              planBasePremium = +carValurArray[j]?.min_premium
              if (+carValurArray[j]?.min_premium > basePremium) {

                finallBasePremium = +carValurArray[j]?.min_premium;
                basePremium = finallBasePremium
              } else {

                finallBasePremium = basePremium;
              }
              break;
            }
          }

        } else {
          let bodyTypeArra = motorMatchPlane[i]?.body_type
          console.log()

          for (let j = 0; j < bodyTypeArra?.length; j++) {

            if ((bodyTypeArra[j]?._id === vehicleDetails?.motor_model_detail_body_type?.toString()) && (bodyTypeArra[j]?.cylinder == vehicleDetails?.motor_model_detail_cylinder)) {
              finallBasePremium = +bodyTypeArra[j]?.min_premium
              planBasePremium = +bodyTypeArra[j]?.premium
              // planBasePremium = +bodyTypeArra[j]?.min_premium
              basePremium = finallBasePremium
              break;

            }
          }
        }
        let bussineEntityTopup = await bussinesEntityTopup(leadLocation, motorMatchPlane[i]?.company_id, "6418643bf42eaf5ba1c9e0ef")

        if (motorMatchPlane[i]?.plan_for_gcc_spec_name_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.plan_for_gcc_spec_name_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.plan_for_gcc_spec_name?.toLowerCase() === vehicle_specification?.toLowerCase()) {
              if ("REFERRED" == await referredCheck(array[j]?.gccspecstopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.gccspecstopup)) {
                if (array[j]?.gccspecstopup.includes("-")) {
                  let gccspecstopup = array[j]?.gccspecstopup
                  gccspecstopup = gccspecstopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +gccspecstopup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.gccspecstopup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.gccspecstopup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.nationality_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.nationality_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.nationality_name?.toLowerCase() === nationality?.toLowerCase()) {

              if ("REFERRED" == await referredCheck(array[j]?.nationalitytopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.nationalitytopup)) {
                if (array[j]?.nationalitytopup.includes("-")) {
                  let nationalitytopup = array[j]?.nationalitytopup
                  nationalitytopup = nationalitytopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +nationalitytopup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.nationalitytopup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.nationalitytopup;
              }
              break;
            }
          }
        }

        if (motorMatchPlane[i]?.make_motor?.length > 0) {
          let array = motorMatchPlane[i]?.make_motor;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.make_motor_name?.toLowerCase() === car_maker?.toLowerCase()) {

              if ("REFERRED" == await referredCheck(array[j]?.make_motor_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.make_motor_topup)) {
                if (array[j]?.make_motor_topup.includes("-")) {
                  let make_motor_topup = array[j]?.make_motor_topup
                  make_motor_topup = make_motor_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +make_motor_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.make_motor_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.make_motor_topup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.car_value?.length > 0) {
          let array = motorMatchPlane[i]?.car_value;
          for (let j = 0; j < array.length; j++) {
            if (
              +minCarValue >= +array[j]?.car_valueMin &&
              +maxCarValue <= +array[j]?.car_valueMax
            ) {
              console.log("carValue>>>>>>>>>>>>>>>>>", minCarValue, +array[j]?.car_valueMin, array[j]?.car_valueMax)
              if ("REFERRED" == await referredCheck(array[j]?.car_value_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.car_value_topup)) {
                if (array[j]?.car_value_topup.includes("-")) {

                  let car_value_topup = array[j]?.car_value_topup
                  car_value_topup = car_value_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +car_value_topup.split("%")[0]) /
                    100;
                } else {

                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.car_value_topup.split("%")[0]) /
                    100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.car_value_topup;
              }
              break;
            }
          }
        }

        if (motorMatchPlane[i]?.standard_cover_arr?.length > 0) {
          let array = motorMatchPlane[i]?.standard_cover_arr;
          for (let j = 0; j < array.length; j++) {
            if ("REFERRED" == await referredCheck(array[j]?.standard_cover_value)) {
              referred = true;
            } else if (await referredCheck(array[j]?.standard_cover_value)) {
              if (array[j]?.standard_cover_value.includes("-")) {
                let standard_cover_value = array[j]?.standard_cover_value
                standard_cover_value = standard_cover_value.split("-")[1]
                finallBasePremium =
                  finallBasePremium -
                  (basePremium * +standard_cover_value.split("%")[0]) /
                  100;
              } else {
                finallBasePremium =
                  finallBasePremium +
                  (basePremium * +array[j]?.standard_cover_value.split("%")[0]) / 100;
              }
            } else {
              finallBasePremium = finallBasePremium + +array[j]?.standard_cover_value;
            }
          }
        }
        if (motorMatchPlane[i]?.plan_for?.length > 0) {
          let array = motorMatchPlane[i]?.plan_for;
          for (let j = 0; j < array.length; j++) {
            if (
              array[j]?.plan_for_name?.toLowerCase() === payload?.policy_type?.toLowerCase()
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.plan_for_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.plan_for_topup)) {
                if (array[j]?.plan_for_topup.includes("-")) {

                  let plan_for_topup = array[j]?.plan_for_topup
                  plan_for_topup = plan_for_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +plan_for_topup.split("%")[0]) /
                    100;
                } else {

                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.plan_for_topup.split("%")[0]) /
                    100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.plan_for_topup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.age_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.age_or_topup;
          ageOfUser = +new Date()?.getFullYear() - new Date(payload?.date_of_birth)?.getFullYear()
          for (let j = 0; j < array.length; j++) {
            if (
              +ageOfUser >= +array[j]?.ageMin &&
              +ageOfUser <= +array[j]?.ageMax
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.agetopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.agetopup)) {
                if (array[j]?.agetopup.includes("-")) {
                  let agetopup = array[j]?.agetopup
                  agetopup = agetopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +agetopup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.agetopup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium = finallBasePremium + +array[j]?.agetopup;
              }
              break;

            }
          }
        }
        if (motorMatchPlane[i]?.drivingexp_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.drivingexp_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +drivingExpMin >= +array[j]?.drivingExpMin &&
              +drivingExpMax <= +array[j]?.drivingExpMax
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.drivingexptopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.drivingexptopup)) {

                if (array[j]?.drivingexptopup.includes("-")) {
                  let drivingTopup = array[j]?.drivingexptopup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.drivingexptopup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.drivingexptopup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.homedrivingexp_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.homedrivingexp_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +drivingexpinuaeMin >= +array[j]?.homeDrivingExpMin &&
              +drivingexpinuaeMax <= +array[j]?.homeDrivingExpMax
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.homedrivingexptopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.homedrivingexptopup)) {
                if (array[j]?.homedrivingexptopup.includes("-")) {
                  let homedrivingexptopup = array[j]?.homedrivingexptopup
                  homedrivingexptopup = homedrivingexptopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +homedrivingexptopup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.homedrivingexptopup.split("%")[0]) /
                    100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.homedrivingexptopup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.claimyears_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.claimyears_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+array[j]?.claimyears === +claimYearTopup) {
              if ("REFERRED" == await referredCheck(array[j]?.claimyeardisc)) {
                referred = true;
              } else if (await referredCheck(array[j]?.claimyeardisc)) {
                if (array[j]?.claimyeardisc.includes("-")) {
                  let claimyeardisc = array[j]?.claimyeardisc
                  claimyeardisc = claimyeardisc.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +claimyeardisc.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.claimyeardisc.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.claimyeardisc;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.last_year_policy_type_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.last_year_policy_type_or_topup;
          for (let j = 0; j < array.length; j++) {

            if (array[j]?.last_year_policy_type?.toLowerCase() === last_year_policy_type?.toLowerCase()) {
              if ("REFERRED" == await referredCheck(array[j]?.last_year_policy_type_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.last_year_policy_type_topup)) {
                if (array[j]?.last_year_policy_type_topup.includes("-")) {
                  let last_year_policy_type_topup = array[j]?.last_year_policy_type_topup
                  last_year_policy_type_topup = last_year_policy_type_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +last_year_policy_type_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium *
                      +array[j]?.last_year_policy_type_topup.split("%")[0]) /
                    100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.last_year_policy_type_topup;
              }
              break;
            }

          }
        }
        if (motorMatchPlane[i]?.age_of_the_car_or_topup?.length > 0) {
          let array = motorMatchPlane[i]?.age_of_the_car_or_topup;
          for (let j = 0; j < array.length; j++) {
            ageOfCar = new Date().getFullYear() - +payload?.model_year;
            // ageOfCar = 5
            if (
              +ageOfCar >= +array[j]?.age_of_the_car_min &&
              +ageOfCar <= +array[j]?.age_of_the_car_max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.age_of_the_car_or_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.age_of_the_car_or_topup)) {
                if (array[j]?.age_of_the_car_or_topup.includes("-")) {
                  let age_of_the_car_or_topup = array[j]?.age_of_the_car_or_topup
                  age_of_the_car_or_topup = age_of_the_car_or_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +age_of_the_car_or_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium *
                      +array[j]?.age_of_the_car_or_topup.split("%")[0]) /
                    100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.age_of_the_car_or_topup;
              }
              break;
            }
          }
        }
        if (motorMatchPlane[i]?.black_listed_vehicle?.length > 0) {
          let array = motorMatchPlane[i]?.black_listed_vehicle;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.variantId?.toString() === payload?.car_variant_id) {
              if ("REFERRED" == await referredCheck(array[j]?.topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.topup)) {
                if (array[j]?.topup.includes("-")) {
                  let topup = array[j]?.topup
                  topup = topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.topup;
              }
              break;
            }
          }
        }
        let BECommission = 0
        console.log("bussineEntityTopupfirst......................", bussineEntityTopup, finallBasePremium, BECommission)
        if (bussineEntityTopup) {
          if ("REFERRED" == await referredCheck(bussineEntityTopup)) {
            referred = true;
          } else if (await referredCheck(bussineEntityTopup)) {
            if (bussineEntityTopup.includes("-")) {
              let topup = bussineEntityTopup
              topup = topup.split("-")[1]
              BECommission =

                (finallBasePremium * +topup.split("%")[0]) /
                100;
            } else {
              BECommission =

                (finallBasePremium * +bussineEntityTopup.split("%")[0]) / 100;
            }
          } else {
            // BECommission =
            //   finallBasePremium + +bussineEntityTopup;
            BECommission = +bussineEntityTopup
          }
          finallBasePremium = finallBasePremium + BECommission
        }
        console.log("bussineEntityTopup......................", bussineEntityTopup, finallBasePremium, BECommission)

        finallBasePremium = finallBasePremium >= planBasePremium ? finallBasePremium : planBasePremium
        let addOptionalCondition = 0;
        // addOptionalCondition = finallBasePremium*5/100
        // if (motorMatchPlane[i]?.add_op_con_desc?.length > 0) {
        //   //done
        //   let array = motorMatchPlane[i]?.add_op_con_desc;
        //   for (let j = 0; j < array.length; j++) {
        //     if(array[j]?.vat?.toLowerCase() == "yes"){
        //       if (array[j]?.add_op_con_desc_topup?.includes("%")) {
        //         addOptionalCondition =
        //           addOptionalCondition +
        //           (finallBasePremium *
        //             (+array[j]?.add_op_con_desc_topup.split("%")[0]) /
        //             100);
        //       } else {
        //         addOptionalCondition =
        //           addOptionalCondition + (+array[j]?.add_op_con_desc_topup);
        //       }
        //     }
        //   }
        //   addOptionalCondition = Math.round(addOptionalCondition)
        // }
        // let jdvSalePersionCom = 0;
        // let finallBasePremiumForVat = finallBasePremium + addOptionalCondition
        // if(vatData){
        //   if(vatData?.includes("%")){
        //     vatData = (finallBasePremiumForVat*(+vatData.split("%")[0]))/100
        //     jdvSalePersionCom = Math.round(vatData)
        //   }else{
        //     jdvSalePersionCom = vatData
        //   }
        // }   
        if (referred) {
          finallBasePremium = "Referred";
        } else {
          finallBasePremium = Math.round(finallBasePremium);
        }
        // console.log("kkkkkkkdnjcjkdj,,,,,,,,,,,,,,,,,,,,,,",{finallBasePremium},{basePremium})finalRate
        motorMatchPlane[i]["finallBasePremium"] = finallBasePremium
        motorMatchPlane[i]["addOptionalCondition"] = addOptionalCondition
        motorMatchPlane[i]["vatComissionPercentage"] = vatData
        motorMatchPlane[i]["excessAmount"] = excessAmount,
          motorMatchPlane[i]["BECommission"] = bussineEntityTopup ? BECommission : 0
        motorMatchPlane[i]["planRate"] = finalRate


      }
      for (let i = 0; i < motorMatchPlane.length; i++) {
        for (let j = i + 1; j < motorMatchPlane.length; j++) {
          if (req.body?.price == "Highest Price") {
            if (
              motorMatchPlane[i].finallBasePremium <=
              motorMatchPlane[j].finallBasePremium
            ) {
              let min = motorMatchPlane[j];
              motorMatchPlane[j] = motorMatchPlane[i];
              motorMatchPlane[i] = min;
            }
          } else {
            if (
              motorMatchPlane[i].finallBasePremium >=
              motorMatchPlane[j].finallBasePremium
            ) {
              let min = motorMatchPlane[j];
              motorMatchPlane[j] = motorMatchPlane[i];
              motorMatchPlane[i] = min;
            }
          }
        }
      }
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",motorMatchPlane)
      if (!motorMatchPlane.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Plane not Matched",
            data: motorMatchPlane,
            totalPlan: motorMatchPlane.length,
            minCarValue: minCarValue,
            maxCarValue: maxCarValue,
          });
      }
      return res
        .status(200)
        .json({
          message: "Plane Matched Successfully",
          // data: [...newMotorMatchPlane ,...katarMotorPlan],
          data: motorMatchPlane,
          // totalPlan: newMotorMatchPlane.length + katarMotorPlan.length,
          totalPlan: motorMatchPlane.length,
          minCarValue: minCarValue,
          maxCarValue: maxCarValue,
          // katarMotorPlan:katarMotorPland
        });
    }


    catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  addHomePlan: async (req, res) => {
    try {
      // const line_of_business_name = "Home";
      // const line_of_business = await line_of_business_model.findOne({
      //   line_of_business_name: line_of_business_name,
      // });
      let user = req?.user
      let createdby
      let userlocation = user?.location
      createdby = userlocation[0]
      const rowsData = req.body?.rowsData ? req.body?.rowsData : [];
      let count = 0;
      for (let i = 0; i < rowsData.length; i++) {
        const conarr = [];
        const pbvarr = [];
        const bvarr = [];
        const domarr = [];
        let payloadObj = {};
        const rowData = rowsData[i];
        if (rowData?.content_value) {
          const content_value = rowData?.content_value?.includes(",") ? rowData.content_value.split(",")
            : [rowData?.content_value];
          const content_topup = rowData?.content_topup?.includes(",") ? rowData.content_topup.split(",")
            : [rowData?.content_topup];
          const content_rate = rowData?.cv_rate?.includes(",") ? rowData.cv_rate.split(",")
            : [rowData?.cv_rate];
          const content_minmuprimium = rowData?.contentMinmuprimium?.includes(",") ? rowData.contentMinmuprimium.split(",")
            : [rowData?.contentMinmuprimium];

          for (let j = 0; j < content_value.length; j++) {
            const conRange = content_value[j].split("-");
            const conMin =
              conRange.length > 0 ? parseInt(conRange[0].trim()) : 0;
            const conMax =
              conRange.length > 1 ? parseInt(conRange[1].trim()) : conMin;

            conarr.push({
              conMin,
              conMax,
              content_topup: content_topup[j] ? content_topup[j].trim() : 0,
              rate: content_rate[j] ? content_rate[j].trim() : 0,
              minmumPrimium: content_minmuprimium[j] ? content_minmuprimium[j].trim() : 0,
            });
          }
          payloadObj["content_value_or_topup"] = conarr;
        }
        if (rowData?.pbvalue) {
          const pb_value = rowData?.pbvalue.includes(",") ? rowData?.pbvalue.split(",")
            : [rowData?.pbvalue];
          const pbv_topup = rowData?.pbvalue_topup.includes(",") ? rowData?.pbvalue_topup.split(",")
            : [rowData?.pbvalue_topup];
          const rate = rowData?.pbv_rate.includes(",") ? rowData?.pbv_rate.split(",")
            : [rowData?.pbv_rate];
          const minmumPrimium = rowData?.pvminmumPrimium.includes(",") ? rowData?.pvminmumPrimium.split(",")
            : [rowData?.pvminmumPrimium];


          for (let j = 0; j < pb_value.length; j++) {
            const pb_value_Range = pb_value[j].split("-");
            const pbvMin =
              pb_value_Range.length > 0
                ? parseInt(pb_value_Range[0]?.trim())
                : 0;
            const pbvMax =
              pb_value_Range.length > 1
                ? parseInt(pb_value_Range[1]?.trim())
                : pbvMin;

            pbvarr.push({
              pbvMin,
              pbvMax,
              pbv_topup: pbv_topup[j] ? pbv_topup[j]?.trim() : 0,
              rate: rate[j] ? rate[j]?.trim() : 0,
              minmumPrimium: minmumPrimium[j] ? minmumPrimium[j].trim() : 0,

            });
          }
          payloadObj["pbvalue_or_topup"] = pbvarr;
        }

        if (rowData?.building_value) {
          const building_value = rowData?.building_value.includes(",") ? rowData?.building_value.split(",") :
            [rowData?.building_value];
          const buildingvalue_topup = rowData?.building_value_topup.includes(",") ? rowData?.building_value_topup.split(",") :
            [rowData?.building_value_topup];
          const rate = rowData?.bv_rate.includes(",") ? rowData?.bv_rate.split(",")
            : [rowData?.bv_rate];
          const minmumPrimium = rowData?.bvminmumPrimium.includes(",") ? rowData?.bvminmumPrimium.split(",")
            : [rowData?.bvminmumPrimium];


          for (let j = 0; j < building_value.length; j++) {
            const bvRange = building_value[j].split("-");
            const bvMin =
              bvRange.length > 0 ? parseInt(bvRange[0]?.trim()) : 0;
            const bvMax =
              bvRange.length > 1 ? parseInt(bvRange[1]?.trim()) : bvMin;

            bvarr.push({
              bvMin,
              bvMax,
              bv_topup: buildingvalue_topup[j]
                ? buildingvalue_topup[j]?.trim()
                : 0,
              rate: rate[j] ? rate[j]?.trim() : 0,
              minmumPrimium: minmumPrimium[j] ? minmumPrimium[j].trim() : 0,
            });
          }
          payloadObj["building_value_or_topup"] = bvarr;
        }

        if (rowData?.domestic_helper) {
          const dom_value = rowData?.domestic_helper.includes(",") ? rowData?.domestic_helper.split(",")
            : [rowData?.domestic_helper];
          const dom_topup = rowData?.domestic_helper_topup.includes(",") ? rowData?.domestic_helper_topup.split(",")
            : [rowData?.domestic_helper_topup];

          for (let j = 0; j < dom_value.length; j++) {
            const domRange = dom_value[j].split("-");
            const domMin =
              domRange.length > 0 ? parseInt(domRange[0]?.trim()) : 0;
            const domMax =
              domRange.length > 1 ? parseInt(domRange[1]?.trim()) : domMin;

            domarr.push({
              domMin,
              domMax,
              dom_topup: dom_topup[j] ? dom_topup[j]?.trim() : 0,
            });
          }
          payloadObj["domestic_helper_or_topup"] = domarr;
        }

        const claimyearsarr = [];
        if (rowData?.no_claim_year) {
          const claimyears = rowData?.no_claim_year.includes(",") ? rowData?.no_claim_year.split(",")
            : [rowData?.no_claim_year];
          const claimyeardisc = rowData?.no_claim_discount.includes(",") ? rowData?.no_claim_discount.split(",")
            : [rowData?.no_claim_discount];

          for (let j = 0; j < claimyears.length; j++) {
            claimyearsarr.push({
              claimyears: claimyears[j].trim().replace(/\s+/g, ""),
              claimyeardisc: claimyeardisc[j].trim().replace(/\s+/g, ""),
            });
          }
          payloadObj["claimyears_or_topup"] = claimyearsarr;
        }
        const add_op_con_desc_arr = [];
        if (rowData?.add_op_con_desc) {
          const add_op_con_desc = rowData.add_op_con_desc.includes(",") ? rowData.add_op_con_desc.split(",")
            : [rowData?.add_op_con_desc];
          const add_op_con_desc_topup =
            rowData?.add_op_con_desc_topup.includes(",") ? rowData?.add_op_con_desc_topup.split(",")
              : [rowData?.add_op_con_desc_topup];
          const vat = rowData?.vat_able.includes(",") ? rowData?.vat_able.split(",")
            : [rowData?.vat_able];

          for (let j = 0; j < add_op_con_desc_topup.length; j++) {
            add_op_con_desc_arr.push({
              add_op_con_desc: add_op_con_desc[j].trim().replace(/\s+/g, ""),
              add_op_con_desc_topup: add_op_con_desc_topup[j]
                .trim()
                .replace(/\s+/g, ""),
              vat: vat[j].trim().replace(/\s+/g, ""),
            });
          }
          payloadObj["add_op_con_desc_or_topup"] = add_op_con_desc_arr;
        }
        // if(line_of_business?._id){
        //   payloadObj["line_of_business_id"] = line_of_business?._id;
        // }
        if (rowData?.company_id) {
          payloadObj["company_id"] = mongoose.Types.ObjectId(rowData?.company_id)
        }
        if (rowData?.plan_name) {
          payloadObj["plan_name"] = rowData?.plan_name
        }
        if (rowData?.plan_category_id) {
          payloadObj["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)
        }
        if (rowData?.nature_of_plan_id) {
          payloadObj["nature_of_plan_id"] = mongoose.Types.ObjectId(rowData?.nature_of_plan_id)
        }
        if (rowData?.property_type_id) {
          payloadObj["property_type_id"] = rowData?.property_type_id
        }
        if (rowData?.ownership_status_id) {
          payloadObj["ownership_status_id"] = mongoose.Types.ObjectId(rowData?.ownership_status_id)
        }
        if (rowData?.plan_type_id) {
          payloadObj["plan_type_id"] = mongoose.Types.ObjectId(rowData?.plan_type_id)
        }
        // if(rowData?.initial_rate){
        //   payloadObj["initial_rate"] = rowData?.initial_rate
        // }
        if (rowData?.rate) {
          payloadObj["rate"] = rowData?.rate
        }
        // if(rowData?.discount_rate){
        //   payloadObj["discount_rate"] = rowData?.discount_rate
        // }
        if (rowData?.excess) {
          payloadObj["excess"] = rowData?.excess
        }
        if (rowData?.jdv_commision) {
          payloadObj["jdv_comm"] = rowData?.jdv_commision
        }
        if (rowData?.location) {
          payloadObj["location"] = rowData?.location
        }
        payloadObj["plan_created_by"] = mongoose.Types.ObjectId(createdby?.loc_id)
        let home_plan = new home_plan_model(payloadObj);
        // let home_plan = new home_plan_model({
        //   line_of_business_id: line_of_business._id,
        //   company_id: req.body.rowsData[i]?.company_id,
        //   plan_name: req.body.rowsData[i]?.plan_name,
        //   plan_category_id: req.body.rowsData[i]?.plan_category_id,
        //   nature_of_plan_id: req.body.rowsData[i]?.nature_of_plan_id,
        //   property_type_id: req.body.rowsData[i]?.property_type_id,
        //   ownership_status_id: req.body.rowsData[i]?.ownership_status_id,
        //   plan_type_id: req.body.rowsData[i]?.plan_type_id,
        //   initial_rate: req.body.rowsData[i]?.initial_rate,
        //   rate: req.body.rowsData[i]?.rate,
        //   discount_rate: req.body.rowsData[i]?.discount_rate,
        //   excess: req.body.rowsData[i]?.excess,
        //   content_value_or_topup: conarr,
        //   pbvalue_or_topup: pbvarr,
        //   building_value_or_topup: bvarr,
        //   claimyears_or_topup: claimyearsarr,
        //   domestic_helper_or_topup: domarr,
        //   add_op_con_desc_or_topup: add_op_con_desc_arr,
        //   jdv_comm: req.body.rowsData[i]?.jdv_commision,
        // });

        let result = await home_plan.save();
        if (result != null) {
          count++;
        } else {

        }
      }
      if (count > 0) {
        res.json({ status: 200, message: `${count} Travel Plans Added  Successfully!` });
      } else {
        res.json({
          status: 400,
          message: "Travel Plan Not Added Successfully!",
        });
      }

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  getHomePlan: async (req, res) => {
    try {
      let query = req.query
      const page = query.page;
      const limit = query.limit;
      let name = query?.name;
      let company = query?.companyid;
      let status = +query?.status;
      console.log("name", name)
      console.log("company", company)
      console.log("status", status)

      if (page && limit) {
        let match = {}
        if (name) {
          match["plan_name"] = { $regex: new RegExp(name.trim(), 'i') }
        }
        if (company) {
          match["company_id"] = mongoose.Types.ObjectId(company)
        }
        if (status == 1 || status == 0) {
          match["status"] = +status
        }
        let aggregate = [
          {
            $match: match,
          },
        ]
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
              localField: "company_id",
              foreignField: "_id",
              as: "companies",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_categories",
            },
          },
          {
            $lookup: {
              from: "nature_of_plans",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plans",
            },
          },
          {
            $lookup: {
              from: "home_property_type_lists",
              localField: "property_type_id",
              foreignField: "_id",
              as: "property_type",
            },
          },
          {
            $lookup: {
              from: "home_plan_type_lists",
              localField: "plan_type_id",
              foreignField: "_id",
              as: "plan_type",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
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
        let homePlan = await home_plan_model.aggregate(aggregate);
        if (homePlan.length > 0) {
          res.json({
            status: 200,
            message: "Data Found",
            data: homePlan[0].data,
            totalCount: homePlan[0].totalCount[0]?.total || 0,
          });
        }
        else {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
      } else {
        let result = await home_plan_model.aggregate([
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "companies",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_categories",
            },
          },
          {
            $lookup: {
              from: "nature_of_plans",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plans",
            },
          },
          {
            $lookup: {
              from: "home_property_type_lists",
              localField: "property_type_id",
              foreignField: "_id",
              as: "property_type",
            },
          },
          {
            $lookup: {
              from: "home_plan_type_lists",
              localField: "plan_type_id",
              foreignField: "_id",
              as: "plan_type",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
          },
        ]);
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found",
            data: result,
            total: result.length,
          });

        }
      }
    } catch (err) {
      res.send(err);
    }
  },
  home_plan_details: async (req, res) => {
    try {
      const id = req.params.id;
      const home_plan_data = await home_plan_model.findById(id);
      res.json({ status: 200, message: "Data Found", data: home_plan_data });
    } catch (error) {
      res.send(error);
    }
  },
  updatestatusHOmePlan: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.params.status;
      let result = await home_plan_model.findByIdAndUpdate(id, {
        status: status,
      });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Home Plan Deactivated Successfully!",
          });
        } else {
          res.json({
            status: 200,
            message: "Home Plan Activated Successfully!",
          });
        }
      } else {
        res.json({ status: 400, message: "Home Plan Not Deactivated!" });
      }
    } catch (error) {
      res.send(error);
    }
  },

  UpdteHomePlan: async (req, res) => {
    try {
      const id = req.params.id;
      const conarr = [];
      const pbvarr = [];
      const bvarr = [];
      const domarr = [];

      const rowData = req.body;
      console.log(">>>>>>>>>>>>>>> rowdata ", rowData)
      let payloadObj = {};
      if (rowData.content_value) {
        const content_value = rowData.content_value.includes(",")
          ? rowData.content_value.split(",")
          : [rowData.content_value];
        const content_topup = rowData.content_value_topup.includes(",")
          ? rowData.content_value_topup.split(",")
          : [rowData.content_value_topup];
        const content_rate = rowData?.cv_rate.includes(",")
          ? rowData?.cv_rate.split(",")
          : [rowData?.cv_rate];
        const content_value_premium = rowData?.cv_premium.includes(",")
          ? rowData?.cv_premium.split(",")
          : [rowData?.cv_premium];
        for (let j = 0; j < content_value.length; j++) {
          const conRange = content_value[j]?.split("-");
          const conMin = conRange.length > 0 ? parseInt(conRange[0].trim()) : 0;
          const conMax =
            conRange.length > 1 ? parseInt(conRange[1].trim()) : conMin;

          conarr.push({
            conMin,
            conMax,
            rate: content_rate[j] ? content_rate[j].trim() : 0,
            content_topup: content_topup[j] ? content_topup[j].trim() : 0,
            minmumPrimium: content_value_premium[j] ? content_value_premium[j].trim() : 0,
          });
        }
        payloadObj["content_value_or_topup"] = conarr;
      } else {
        payloadObj["content_value_or_topup"] = []
      }

      if (rowData?.personal_belonging_value) {
        const pb_value = rowData?.personal_belonging_value.includes(",") ?
          rowData?.personal_belonging_value.split(",") : [rowData?.personal_belonging_value];
        const pbv_topup = rowData?.personal_belonging_value_topup.includes(",") ?
          rowData.personal_belonging_value_topup.split(",") : [rowData?.personal_belonging_value_topup];
        const pbv_rate = rowData?.pbv_rate?.includes(",") ?
          rowData?.pbv_rate.split(",") : [rowData?.pbv_rate];
        const pbv_premium = rowData?.pbv_premium?.includes(",") ?
          rowData?.pbv_premium.split(",") : [rowData?.pbv_premium];
        for (let j = 0; j < pb_value.length; j++) {
          const pb_value_Range = pb_value[j]?.split("-");
          const pbvMin =
            pb_value_Range.length > 0 ? parseInt(pb_value_Range[0].trim()) : 0;
          const pbvMax =
            pb_value_Range.length > 1
              ? parseInt(pb_value_Range[1].trim())
              : pbvMin;

          pbvarr.push({
            pbvMin,
            pbvMax,
            rate: pbv_rate[j] ? pbv_rate[j].trim() : 0,
            pbv_topup: pbv_topup[j] ? pbv_topup[j].trim() : 0,
            minmumPrimium: pbv_premium[j] ? pbv_premium[j].trim() : 0,
          });
        }
        payloadObj["pbvalue_or_topup"] = pbvarr;
      } else {
        payloadObj["pbvalue_or_topup"] = []
      }


      if (rowData?.building_value) {
        const building_value = rowData?.building_value.includes(",") ?
          rowData?.building_value.split(",") : [rowData?.building_value];
        const buildingvalue_topup = rowData?.building_value_topup.includes(",") ?
          rowData?.building_value_topup.split(",") : [rowData?.building_value_topup];
        const buildingvalue_rate = rowData?.bv_rate.includes(",") ?
          rowData?.bv_rate.split(",") : [rowData?.bv_rate];
        const buildingvalue_premium = rowData?.bv_premium.includes(",") ?
          rowData?.bv_premium.split(",") : [rowData?.bv_premium];

        for (let j = 0; j < building_value.length; j++) {
          const bvRange = building_value[j]?.split("-");
          const bvMin = bvRange.length > 0 ? parseInt(bvRange[0].trim()) : 0;
          const bvMax =
            bvRange.length > 1 ? parseInt(bvRange[1].trim()) : bvMin;

          bvarr.push({
            bvMin,
            bvMax,
            rate: buildingvalue_rate[j] ? buildingvalue_rate[j].trim() : 0,
            bv_topup: buildingvalue_topup[j]
              ? buildingvalue_topup[j].trim()
              : 0,
            minmumPrimium: buildingvalue_premium[j] ? buildingvalue_premium[j].trim() : 0,
          });
        }
        payloadObj["building_value_or_topup"] = bvarr;
      } else {
        payloadObj["building_value_or_topup"] = []
      }


      if (rowData?.domestic_helper) {
        const dom_value = rowData?.domestic_helper.includes(",") ?
          rowData?.domestic_helper.split(",") : [rowData?.domestic_helper];
        const dom_topup = rowData?.dom_topup.includes(",") ?
          rowData?.dom_topup.split(",") : [rowData?.dom_topup];
        for (let j = 0; j < dom_value.length; j++) {
          const domRange = dom_value[j]?.split("-");
          const domMin = domRange.length > 0 ? parseInt(domRange[0].trim()) : 0;
          const domMax =
            domRange.length > 1 ? parseInt(domRange[1].trim()) : domMin;

          domarr.push({
            domMin,
            domMax,
            dom_topup: dom_topup[j] ? dom_topup[j].trim() : 0,
          });
        }
        payloadObj["domestic_helper_or_topup"] = domarr;
      } else {
        payloadObj["domestic_helper_or_topup"] = [];
      }

      const claimyearsarr = [];
      if (rowData?.no_claim_year) {
        const claimyears = rowData?.no_claim_year.includes(",") ?
          rowData?.no_claim_year.split(",") : [rowData?.no_claim_year];
        const claimyeardisc = rowData?.no_claim_discount.includes(",") ?
          rowData?.no_claim_discount.split(",") : [rowData?.no_claim_discount];
        for (let i = 0; i < claimyears.length; i++) {
          claimyearsarr.push({
            claimyears: claimyears[i].trim().replace(/\s+/g, ""),
            claimyeardisc: claimyeardisc[i].trim().replace(/\s+/g, ""),
          });
        }
        payloadObj["claimyears_or_topup"] = claimyearsarr;
      } else {
        payloadObj["claimyears_or_topup"] = [];
      }
      if (rowData?.add_op_con_desc) {
        const add_op_con_desc_arr = [];
        const add_op_con_desc = rowData?.add_op_con_desc.includes(",") ?
          rowData?.add_op_con_desc.split(",") : [rowData?.add_op_con_desc];
        const add_op_con_desc_topup = rowData?.add_op_con_desc_topup.includes(",") ?
          rowData?.add_op_con_desc_topup.split(",") : [rowData?.add_op_con_desc_topup];
        const vat = rowData?.vat.includes(",") ?
          rowData?.vat.split(",") : [rowData?.vat];
        for (let j = 0; j < add_op_con_desc.length; j++) {
          add_op_con_desc_arr.push({
            add_op_con_desc: add_op_con_desc[j].trim().replace(/\s+/g, ""),
            add_op_con_desc_topup: add_op_con_desc_topup[j]
              .trim()
              .replace(/\s+/g, ""),
            vat: vat[j].trim().replace(/\s+/g, ""),
          });
        }
        payloadObj["add_op_con_desc_or_topup"] = add_op_con_desc_arr;
      } else {
        payloadObj["add_op_con_desc_or_topup"] = [];
      }
      if (rowData?.company_id) {
        payloadObj["company_id"] = mongoose.Types.ObjectId(rowData?.company_id)
      }
      if (rowData?.plan_name) {
        payloadObj["plan_name"] = rowData?.plan_name
      }
      if (rowData?.plan_category_id) {
        payloadObj["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)
      }
      if (rowData?.nature_of_plan_id) {
        payloadObj["nature_of_plan_id"] = mongoose.Types.ObjectId(rowData?.nature_of_plan_id)
      }
      if (rowData?.property_type) {
        payloadObj["property_type_id"] = rowData?.property_type
      }
      if (rowData?.ownership_status) {
        payloadObj["ownership_status_id"] = mongoose.Types.ObjectId(rowData?.ownership_status)
      }
      if (rowData?.plan_type) {
        payloadObj["plan_type_id"] = mongoose.Types.ObjectId(rowData?.plan_type)
      }
      // if(rowData?.initial_rate){
      //   payloadObj["initial_rate"] = rowData?.initial_rate
      // }
      // if(rowData?.rate){
      //   payloadObj["rate"] = rowData?.rate
      // }
      // if(rowData?.discount_rate){
      //   payloadObj["discount_rate"] = rowData?.discount_rate
      // }
      if (rowData?.excess) {
        payloadObj["excess"] = rowData?.excess
      }
      if (rowData?.jdv_comm) {
        payloadObj["jdv_comm"] = rowData?.jdv_comm
      }
      if (rowData?.location) {
        payloadObj["location"] = rowData?.location
      }
      console.log("payloadObj>>>>>>>>>>>>>> ", payloadObj)
      const result = await home_plan_model.findOneAndUpdate(
        { _id: id },
        {
          $set: payloadObj,
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
      console.log(error);
      return res.send(error.message);

    }
  },
  add_bulk_home_plan: async (req, res) => {
    try {
      let count = 0;
      let caseInsensitive = async (name) => {
        return { $regex: new RegExp(name.trim(), 'i') }
      }

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

      for (let row of xlData) {
        let payload = {};
        let planCategoryId;
        let nature_of_plan_id;
        let property_type_id;
        let home_plan_type_id;
        let ownership_Status_id;

        let content_value_or_topup_arr = [];
        let content_value = row["Content value"];
        let topup_content_value = row["Topup (Content value)"].toString();
        if (content_value.includes(",") && topup_content_value.includes(",")) {
          content_value = content_value.split(",");
          topup_content_value = topup_content_value.split(",");
          for (let i = 0; i < content_value.length; i++) {
            let content_values = content_value[i].split("-");
            const conMin =
              content_values.length > 0
                ? parseInt(content_values[0].trim())
                : 0;
            const conMax =
              content_values.length > 1
                ? parseInt(content_values[1].trim())
                : conMin;
            content_value_or_topup_arr.push({
              conMin,
              conMax,
              content_topup: topup_content_value[i]
                ? topup_content_value[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < content_value.length; i++) {
            let content_values = content_value[i].split("-");
            const conMin =
              content_values.length > 0
                ? parseInt(content_values[0].trim())
                : 0;
            const conMax =
              content_values.length > 1
                ? parseInt(content_values[1].trim())
                : conMin;
            content_value_or_topup_arr.push({
              conMin,
              conMax,
              content_topup: topup_content_value[i]
                ? topup_content_value[i].trim()
                : "",
            });
          }
        }

        let pb_value_or_topup_arr = [];
        let pb_value = row["Personal Belongings Value"];
        let pb_value_topup =
          row["Topup (Personal Belongings Value)"].toString();
        if (pb_value.includes(",") && pb_value_topup.includes(",")) {
          pb_value = pb_value.split(",");
          pb_value_topup = pb_value_topup.split(",");
          for (let i = 0; i < pb_value.length; i++) {
            let pb_values = pb_value[i].split("-");
            const pbvMin =
              pb_values.length > 0 ? parseInt(pb_values[0].trim()) : 0;
            const pbvMax =
              pb_values.length > 1 ? parseInt(pb_values[1].trim()) : pbvMin;
            pb_value_or_topup_arr.push({
              pbvMin,
              pbvMax,
              pbv_topup: pb_value_topup[i] ? pb_value_topup[i].trim() : "",
            });
          }
        } else {
          for (let i = 0; i < pb_value.length; i++) {
            let pb_values = pb_value[i].split("-");
            const pbvMin =
              pb_values.length > 0 ? parseInt(pb_values[0].trim()) : 0;
            const pbvMax =
              pb_values.length > 1 ? parseInt(pb_values[1].trim()) : pbvMin;
            pb_value_or_topup_arr.push({
              pbvMin,
              pbvMax,
              pbv_topup: pb_value_topup[i] ? pb_value_topup[i].trim() : "",
            });
          }
        }

        let b_value_or_topup_arr = [];
        let b_value = row["Building Value"];
        let b_value_topup = row["Topup (Building Value)"].toString();
        if (b_value.includes(",") && b_value_topup.includes(",")) {
          b_value = b_value.split(",");
          b_value_topup = b_value_topup.split(",");
          for (let i = 0; i < b_value.length; i++) {
            let b_values = b_value[i].split("-");
            const bvMin =
              b_values.length > 0 ? parseInt(b_values[0].trim()) : 0;
            const bvMax =
              b_values.length > 1 ? parseInt(b_values[1].trim()) : bvMin;
            b_value_or_topup_arr.push({
              bvMin,
              bvMax,
              bv_topup: b_value_topup[i] ? b_value_topup[i].trim() : "",
            });
          }
        } else {
          for (let i = 0; i < b_value.length; i++) {
            let b_values = b_value[i].split("-");
            const bvMin =
              b_values.length > 0 ? parseInt(b_values[0].trim()) : 0;
            const bvMax =
              b_values.length > 1 ? parseInt(b_values[1].trim()) : bvMin;
            b_value_or_topup_arr.push({
              bvMin,
              bvMax,
              bv_topup: b_value_topup[i] ? b_value_topup[i].trim() : "",
            });
          }
        }

        let dom_or_topup_arr = [];
        let dom_value = row["Domestic Helper"];
        let dom_topup = row["Topup (Domestic Helper)"].toString();
        if (dom_value.includes(",") && dom_topup.includes(",")) {
          dom_value = dom_value.split(",");
          dom_topup = dom_topup.split(",");
          for (let i = 0; i < dom_value.length; i++) {
            let dom_values = dom_value[i].split("-");
            const domMin =
              dom_values.length > 0 ? parseInt(dom_values[0].trim()) : 0;
            const domMax =
              dom_values.length > 1 ? parseInt(dom_values[1].trim()) : domMin;
            dom_or_topup_arr.push({
              domMin,
              domMax,
              dom_topup: dom_topup[i] ? dom_topup[i].trim() : "",
            });
          }
        } else {
          for (let i = 0; i < dom_value.length; i++) {
            let dom_values = dom_value[i].split("-");
            const domMin =
              dom_values.length > 0 ? parseInt(dom_values[0].trim()) : 0;
            const domMax =
              dom_values.length > 1 ? parseInt(dom_values[1].trim()) : domMin;
            dom_or_topup_arr.push({
              domMin,
              domMax,
              dom_topup: dom_topup[i] ? dom_topup[i].trim() : "",
            });
          }
        }

        let add_op_con_desc = [];
        if (
          row["Add Option Condition Description"].includes(",") &&
          row["Vat Able"].includes(",") &&
          row["Topup (Add Option Condition Description)"].includes(",")
        ) {
          let description = row["Add Option Condition Description"]
            .trim()
            .split(",");
          let topup = row["Topup (Add Option Condition Description)"]
            .trim()
            .split(",");
          let vatAble = row["Vat Able"].trim().split(",");
          for (let i = 0; i < description.length; i++) {
            add_op_con_desc.push({
              add_op_con_desc: description[i],
              add_op_con_desc_topup: topup[i],
              vat: vatAble[i],
            });
          }
        } else {
          add_op_con_desc.push({
            add_op_con_desc: row["Add Option Condition Description"],
            add_op_con_desc_topup:
              row["Topup (Add Option Condition Description)"],
            vat: row["Vat Able"],
          });
        }
        let company_id = await CompanyModel.findOne({
          company_name: await caseInsensitive(row["Company Name"]),
        });
        company_id = company_id._id.toString();
        nature_of_plan_id = await Nature_of_plan.findOne({
          nature_of_plan_name: await caseInsensitive(row["Nature Of Plan"]),
        });
        nature_of_plan_id = nature_of_plan_id?._id?.toString();
        planCategoryId = await PlaneCategoryModel.findOne({
          plan_category_name: await caseInsensitive(row["Plan Category"]),
        });
        planCategoryId = planCategoryId?._id?.toString();
        property_type_id = await Home_property_type_list.findOne({
          home_property_type: await caseInsensitive(row["Property Type"]),
        });

        property_type_id = property_type_id?._id?.toString();
        home_plan_type_id = await Home_plan_type_list.findOne({
          home_plan_type: await caseInsensitive(row["Plan Type"]),
        });
        home_plan_type_id = home_plan_type_id?._id?.toString();
        ownership_Status_id = await Home_ownership_status_list.findOne({
          home_owner_type: await caseInsensitive(row["Ownership status"]),
        });
        ownership_Status_id = ownership_Status_id?._id?.toString();

        payload["nature_of_plan_id"] = nature_of_plan_id;
        payload["company_id"] = company_id;
        payload["plan_category_id"] = planCategoryId;
        payload["property_type_id"] = property_type_id;
        payload["plan_type_id"] = home_plan_type_id;
        payload["ownership_status_id"] = ownership_Status_id;
        payload["plan_name"] = row["Plan Name"];
        payload["initial_rate"] = row["Initial Rate"];
        payload["discount_rate"] = row["Discounted rate"];
        payload["rate"] = row["rate %"];
        payload["rate"] = row["rate %"];
        payload["excess"] = row["Excess"];
        payload["no_claim_year"] = row["No Claim Year"];
        payload["no_claim_discount"] = row["No Claim Discount"];
        payload["content_value_or_topup"] = content_value_or_topup_arr;
        payload["pbvalue_or_topup"] = pb_value_or_topup_arr;
        payload["building_value_or_topup"] = b_value_or_topup_arr;
        payload["domestic_helper_or_topup"] = dom_or_topup_arr;
        payload["add_op_con_desc"] = add_op_con_desc;
        payload["sale_person_comm"] = row["Sales Person Commision"];
        payload["JDV_commission"] = row["JDV Commisoin"];
        // payload["standard_cover_arr"] = '';
        // payload["additional_cover_arr"] = '';

        // await home_plan_model.create(payload);
        // count++;
        let home_plan = new home_plan_model(payload);
        let result = await home_plan.save();
        if (result != null) {
          count++;
        }
      }



      if (count === xlData.length) {
        return res.status(200).json({
          status: 200,
          message: "File Upload Successfully !!",
          totalEntry: count,
        });
      } else {
        return res
          .status(400)
          .json({
            status: 200,
            message: "File not Uploaded",
            totalEntry: count,
          });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: 400, message: "Something Went Worng" });
    }
  },
  upload_home_plan_policywordings_file: async (req, res) => {
    try {

      let newdetails = await home_plan_model.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policywordings_file: req.file.filename } },
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

  add_plan_home_condition: async (req, res) => {
    try {
      let payload = req.body
      let planId = payload?.id
      let conditionPayload = payload?.formData
      let result;

      console.log('payload................', conditionPayload)
      let questionArray = []
      for (let j = 0; j < conditionPayload?.length; j++) {
        if (conditionPayload[j]?.checked == true) {
          if (conditionPayload[j]?.condition_desc.length > 0) {
            let descLen = conditionPayload[j]?.condition_desc?.length
            let conditionValues = conditionPayload[j]?.condition_value?.includes(",") ? conditionPayload[j]?.condition_value?.split(",") : [conditionPayload[j]?.condition_value]
            if (descLen == 2 && conditionValues.length == 1) {
              conditionValues.push("0")
            }
            if (descLen == 1 && conditionValues[0] == null) {
              conditionValues.push("0")
            }


            questionArray.push({
              condition_id: conditionPayload[j]?.condition_id ? mongoose.Types.ObjectId(conditionPayload[j]?.condition_id) : "",
              condition_label: conditionPayload[j]?.condition_label,
              condition_desc: conditionPayload[j]?.condition_desc?.map((val) => val.value),
              condition_value: conditionValues?.length > 1 ? conditionValues?.join(",") : (conditionValues[0] != "" ? conditionValues[0] : "0"),
            })
          }
        }
      }
      // console.log("asdfsdf asdfsff>>>>>>>>>", questionArray)
      // return false;
      result = await home_plan_model.findByIdAndUpdate(
        planId,
        { condition_arr: questionArray },
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
      console.log(error);
      res.send(error);
    }
  },
  getAreaOfRegistrations: async (req, res) => {
    try {
      let data = [];
      data = await Area_of_registrationModel.aggregate([
        {
          $match: { area_of_registration_status: 1 },
        },
        {
          $project: {
            area_of_registration_name: 1,
          },
        },
      ]);
      if (data.length == 0) {
        res
          .status(400)
          .json({
            status: 400,
            message: "Data not Find Successfully",
            data: data,
          });
      }
      res
        .status(200)
        .json({ status: 200, message: "Data Find Successfully", data: data });
    } catch (err) {
      console.log(err);
    }
  },
  getRepairTypes: async (req, res) => {
    try {
      let data = [];
      data = await repairTypeModel.aggregate([
        {
          $match: {
            repair_type_status: 1
          },
        },
        {
          $project: {
            repair_type_name: 1,
          },
        },
      ]);
      if (data.length == 0) {
        res
          .status(400)
          .json({
            status: 400,
            message: "Data not Find Successfully",
            data: data,
          });
      }
      res
        .status(200)
        .json({ status: 200, message: "Data Find Successfully", data: data });
    } catch (err) {
      console.log(err);
    }
  },
  fillMotorPlan: async (req, res) => {
    try {
      let payload = req.body;
      console.log("location>>>>>>", payload.location)
      let planDetails;
      let plicyType;
      let businessentityToken = payload.businessentitytoken;
      let locationRoutes = payload.location
      console.log("location", locationRoutes)
      let locationArray
      if (!payload?.businessTypeId) {
        delete payload['businessTypeId']
      }
      if (payload)
        if (payload.insuranceType === "Motor") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Chasisno", "Carbasicinfo", "Carpolicyinfo", "Carmodelyear", "Carmaker", "Carmodel", "Carvariant", "SelectCarvalue", "Carregisterlocation", "Carspecification", "Personaldetails", "Nationality", "Uaedrivingexp", "Lastclaim", "Getquote", "Quotes", "Selectedquotes", "Payments"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1

          } else {
            delete payload.businessentitytoken
            locationArray = ["Chasisno", "Carbasicinfo", "Carpolicyinfo", "Carmodelyear", "Carmaker", "Carmodel", "Carvariant", "SelectCarvalue", "Carregisterlocation", "Carspecification", "Personaldetails", "Nationality", "Uaedrivingexp", "Lastclaim", "Getquote", "Quotes", "Selectedquotes", "Payments"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1

          }
        }
        else if (payload.insuranceType === "Travel") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Traveldetails", "Traveldetailsform", "Travelplantype", "Travelpersonalform", 'Familydetails', 'Beneficarydetails', 'Travelquotes', 'TravelSelectedquotes', 'TravelPayments']
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          } else {
            delete payload.businessentitytoken
            locationArray = ["Traveldetails", "Traveldetailsform", "Travelplantype", "Travelpersonalform", 'Familydetails', 'Beneficarydetails', 'Travelquotes', 'TravelSelectedquotes', 'TravelPayments']
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          }
        }
        else if (payload.insuranceType === "Medical") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Individualpolicy", "Individualinsurancepersonaldetails", "Individualcountry", "Individualinsuranceids", "Individualmetrics", "Individualinsurancequotes", "Individualinsurancepersonaldetails3", "Individualinsurancepersonaldetails2", "Individualinsurancematernity", "Individualinsuranceunderwriting", "Individualinsurancequote"]

            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          } else {
            delete payload.businessentitytoken
            locationArray = ["Individualpolicy", "Individualinsurancepersonaldetails", "Individualcountry", "Individualinsuranceids", "Individualmetrics", "Individualinsurancequotes", "Individualinsurancepersonaldetails3", "Individualinsurancepersonaldetails2", "Individualinsurancematernity", "Individualinsuranceunderwriting", "Individualinsurancequote"]

            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          }
        }
        else if (payload.insuranceType === "Home") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Homeinsurance", "Homeplan", "Homevalue", "Homehelper", "Individualmetrics", "Homepersonaldetails", "Homecondition", "Homecondition2", "Homequotes"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          } else {
            delete payload.businessentitytoken
            locationArray = ["Homeinsurance", "Homeplan", "Homevalue", "Homehelper", "Individualmetrics", "Homepersonaldetails", "Homecondition", "Homecondition2", "Homequotes"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          }
        }
        else if (payload.insuranceType === "Yatch") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Yachtdetails", "YachtlYear", "YachtMaker", "YachtVarient", "Enginedetails", "Suminsured", "yachtpersonaldetails", "Territorycoverage", "Claimsexperience", "Yachtquotes"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          } else {
            delete payload.businessentitytoken
            locationArray = ["Yachtdetails", "YachtlYear", "YachtMaker", "YachtVarient", "Enginedetails", "Suminsured", "yachtpersonaldetails", "Territorycoverage", "Claimsexperience", "Yachtquotes"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          }
        }
        else if (payload.insuranceType === "Other") {
          if (locationRoutes && businessentityToken) {
            locationArray = ["Otherinsurance"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          } else {
            delete payload.businessentitytoken
            locationArray = ["Otherinsurance"]
            for (let i = 0; i < locationArray.length; i++) {
              locationArray[i] = locationArray[i]
            }
            console.log("array ", locationArray.indexOf(locationRoutes))
            payload["location"] = locationArray.indexOf(locationRoutes) ? locationArray.indexOf(locationRoutes) : 1
          }
        }
      if (businessentityToken) {
        let userDetails = await Admin.findById(businessentityToken)
        payload["lead_location"] = userDetails.location[0].loc_id
        payload["businessEntityId"] = businessentityToken;
        payload["filByBusinessEntityCustomer"] = true
        payload["assigned_agent"] = businessentityToken;
        payload["assign_salesadvisor_timestamp"] = new Date()
      }

      let matchObj = { email: payload.email };
      if (!payload.insuranceType) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Insurance Type is required ",
            data: {},
          });
      }
      let customerData;
      customerData = await Admin.find({ email: payload.email });
      if (!customerData.length) {
        let password = Math.round(Math.random() * 1000000);
        password = password?.toString()
        customerData = await Admin.create({
          name: payload.name,
          mobile: payload.phoneno,
          email: payload.email,
          password: md5(password),
          usertype: "65eeb6c21d866055f9331460"
        });
        // let emailPayload = {
        //   email: payload.email,
        //   text: `Dear ${payload.name},
        //             Your password for LMP has been created as per your request. Here are your login details:
        //             Email: ${payload.email}
        //             Password: ${password}
        //             Please remember to keep your password confidential. We recommend changing it upon login for better security`,
        //   subject: "Your Password for LMP",
        // };
        // sendEmail(emailPayload);
        //
        let emaildata = {}
        let emailType = 'Update Password'
        await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${emailType}`)
          .then(data => {
            if (data.message == 'Email template fetched') {
              emaildata = data.data
              emaildata.body = `<p>Dear ${payload.name},
                                Your password for LMP has been created as per your request.Here are your login details:
                                Email: ${payload.email}
                                Password: ${password}
                  Please remember to keep your password confidential. We recommend changing it upon login for better security</p>`
            } else {
              emaildata.subject = 'Update Password'
              emaildata.template_id = '6662a9c532b26165203cce1b'
              emaildata.body = `<p>Dear ${payload.name},
                                Your password for LMP has been created as per your request.Here are your login details:
                                Email: ${payload.email}
                                Password: ${password}
                  Please remember to keep your password confidential. We recommend changing it upon login for better security</p>`
            }
          })
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: [payload.email],
          cc: [],
          bcc: [],
          text: emaildata.body,
          subject: 'Your Password for LMP',
          attachments: [],
          template_id: emaildata.template_id
        };
        sendServerEmail(emailPayload);
      }
      if (!payload.lead_location) {
        payload["lead_location"] = ["64116415591c2f02bcddf51e"];
      }
      payload["supervisor_id"] = ["647850ee3c8261854147eff6"];
      if (payload.insuranceType === "Travel") {
        payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
        plicyType = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Yatch") {
        payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
        plicyType = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Other") {
        payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
        plicyType = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Medical") {
        payload["type_of_policy"] = "641bf214cbfce023c8c76762";
        plicyType = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Motor") {
        payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
        if (!payload?.current_renewal) {
          delete payload.current_renewal;
        }
        if (!payload?.current_insurance_company_id) {
          delete payload.current_insurance_company_id;
        }
        plicyType = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
        matchObj["type_of_policy"] = plicyType;
        if (payload?.model_year) {
          matchObj["model_year"] = payload?.model_year;
        }
        if (payload?.car_maker) {
          matchObj["car_maker"] = payload?.car_maker;
        }
        if (payload?.car_model) {
          matchObj["car_model"] = payload?.car_model;
        }
        if (payload?.car_variant) {
          matchObj["car_variant"] = payload?.car_variant;
        }
      }
      if (payload.insuranceType === "Home") {
        payload["type_of_policy"] = "641bf0a2cbfce023c8c76724";
        plicyType = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "GroupMedical") {
        payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
        plicyType = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
        matchObj["type_of_policy"] = plicyType;
      }
      matchObj["paymentStatus"] = {
        $ne: "Completed"
      }
      planDetails = await NewLeadsModels.findOne(matchObj);
      if (planDetails) {
        if (payload.location && businessentityToken) {
          let newLocationNumber = locationArray.indexOf(locationRoutes)
          console.log("newLocationNumber", newLocationNumber)
          // let planDetails = await NewLeadsModels.findById(id)
          let oldLink = planDetails?.buisnessEntityCostomerLink
          planDetails = planDetails.toObject()
          oldLink = planDetails?.buisnessEntityCostomerLink
          let oldLocatonNumber = planDetails.location
          console.log({ newLocationNumber, oldLocatonNumber })
          if (oldLocatonNumber && (newLocationNumber > oldLocatonNumber)) {
            if (oldLink) {
              oldLink = oldLink.split("y.in")
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
            } else {
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
            }

            payload["location"] = +newLocationNumber
          }
          else if (!oldLocatonNumber) {
            if (oldLink) {
              oldLink = oldLink.split("y.in")
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
            } else {
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
            }
            payload["location"] = +newLocationNumber
          } else {
            payload["location"] = +oldLocatonNumber
          }
        } else if (payload.location && !businessentityToken) {
          let newLocationNumber = locationArray.indexOf(locationRoutes)
          console.log("newLocationNumber", newLocationNumber)
          // let planDetails = await NewLeadsModels.findById(id)
          let oldLink = planDetails?.buisnessEntityCostomerLink
          planDetails = planDetails.toObject()
          oldLink = planDetails?.buisnessEntityCostomerLink
          let oldLocatonNumber = planDetails.location
          console.log({ newLocationNumber, oldLocatonNumber })
          if (oldLocatonNumber && (newLocationNumber > oldLocatonNumber)) {
            if (oldLink) {
              oldLink = oldLink.split("y.in")
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
            } else {
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
            }

            payload["location"] = +newLocationNumber
          }
          else if (!oldLocatonNumber) {
            if (oldLink) {
              oldLink = oldLink.split("y.in")
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
            } else {
              payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
            }
            payload["location"] = +newLocationNumber
          } else {
            payload["location"] = +oldLocatonNumber
          }
        }
        planDetails = await NewLeadsModels.findOneAndUpdate(matchObj, payload, { new: true });
      } else {
        let newLeads = await NewLeadsModels.aggregate([
          {
            $sort: {
              new_lead_timestamp: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
        if (!newLeads.length) {
          newLeads = 1000;
          payload["lead_id"] = newLeads;
        } else {
          newLeads = +newLeads[0]?.lead_id + 1;
          payload["lead_id"] = newLeads;
        }
        planDetails = await NewLeadsModels.create(payload);
        if (locationRoutes && businessentityToken) {
          let newLeadId = planDetails?.toObject()?._id
          if (locationRoutes) {
            planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId, { buisnessEntityCostomerLink: `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${newLeadId?.toString()}` }, { new: true })
          } else {
            planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId, { buisnessEntityCostomerLink: `https://lmpfrontend.handsintechnology.in/?leadid=${newLeadId?.toString()}` }, { new: true })
          }

        }
        if (locationRoutes && !businessentityToken) {
          let newLeadId = planDetails?.toObject()?._id
          if (locationRoutes) {
            planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId, { buisnessEntityCostomerLink: `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${newLeadId?.toString()}` }, { new: true })
          } else {
            planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId, { buisnessEntityCostomerLink: `https://lmpfrontend.handsintechnology.in/?leadid=${newLeadId?.toString()}` }, { new: true })
          }

        }

      }
      if (!planDetails) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Data not Saved Successfully",
            data: {},
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Saved Successfully",
          data: planDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  // fillMotorPlan: async (req, res) => {
  //   try {
  //     let payload = req.body;
  //     let planDetails;
  //     let plicyType;
  //     let businessentityToken = payload.businessentitytoken;
  //     let locationRoutes = payload.location
  //     let locationArray
  //     if(locationRoutes && businessentityToken){
  //       locationArray = ["Chasisno","Carbasicinfo","Carpolicyinfo","Carmodelyear","Carmaker","Carmodel","Carvariant","SelectCarvalue","Carregisterlocation","Carspecification","Personaldetails","Nationality","Uaedrivingexp","Lastclaim","Getquote","Quotes","Selectedquotes","Payments"]
  //       for(let i =0;i<locationArray.length;i++){
  //         locationArray[i] = locationArray[i]

  //      }
  //     payload["location"] = locationArray.indexOf(locationRoutes)?locationArray.indexOf(locationRoutes):1

  //     }else{
  //       delete payload.location
  //     }
  //     if (businessentityToken) {
  //       let userDetails = await Admin.findById(businessentityToken)
  //       payload["lead_location"] = userDetails.location[0].loc_id
  //       payload["businessEntityId"] = businessentityToken;
  //       payload["filByBusinessEntityCustomer"] = true
  //       payload["assigned_agent"] = businessentityToken;
  //       payload["assign_salesadvisor_timestamp"] = new Date()
  //     }

  //     let matchObj = { email: payload.email };
  //     if (!payload.insuranceType) {
  //       return res
  //         .status(400)
  //         .json({
  //           status: 400,
  //           message: "Insurance Type is required ",
  //           data: {},
  //         });
  //     }
  //     let customerData;
  //     customerData = await Customer.find({ email: payload.email });
  //     if (!customerData.length) {
  //       let password = Math.round(Math.random() * 1000000);
  //       customerData = await Customer.create({
  //         full_name: payload.name,
  //         mobile_number: payload.phoneno,
  //         email: payload.email,
  //         password: password,
  //       });
  //       let emailPayload = {
  //         email: payload.email,
  //         text: `Dear ${payload.name},
  //                   Your password for LMP has been created as per your request. Here are your login details:
  //                   Email: ${payload.email}
  //                   Password: ${password}
  //                   Please remember to keep your password confidential. We recommend changing it upon login for better security`,
  //         subject: "Your Password for LMP",
  //       };
  //       await sendEmail(emailPayload);
  //     }
  //    if(!payload.lead_location){
  //     payload["lead_location"] = ["64116415591c2f02bcddf51e"];
  //    }
  //     payload["supervisor_id"] = ["647850ee3c8261854147eff6"];
  //     if (payload.insuranceType === "Travel") {
  //       payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
  //       plicyType = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
  //       matchObj["type_of_policy"] = plicyType;
  //     }
  //     if (payload.insuranceType === "Yatch") {
  //       payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
  //       plicyType = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
  //       matchObj["type_of_policy"] = plicyType;
  //     }
  //     if (payload.insuranceType === "Other") {
  //       payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
  //       plicyType = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
  //       matchObj["type_of_policy"] = plicyType;
  //     }
  //     if (payload.insuranceType === "Medical") {
  //       payload["type_of_policy"] = "641bf214cbfce023c8c76762";
  //       plicyType = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
  //       matchObj["type_of_policy"] = plicyType;
  //     }
  //     if (payload.insuranceType === "Motor") {
  //       payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
  //       if(!payload?.current_renewal){
  //         delete payload.current_renewal;
  //       }
  //       if(!payload?.current_insurance_company_id){
  //         delete payload.current_insurance_company_id;
  //       }
  //       plicyType = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
  //       matchObj["type_of_policy"] = plicyType;
  //       if (payload?.model_year) {
  //         matchObj["model_year"] = payload?.model_year;
  //       }
  //       if (payload?.car_maker) {
  //         matchObj["car_maker"] = payload?.car_maker;
  //       }
  //       if (payload?.car_model) {
  //         matchObj["car_model"] = payload?.car_model;
  //       }
  //       if (payload?.car_variant) {
  //         matchObj["car_variant"] = payload?.car_variant;
  //       }
  //     }
  //     if (payload.insuranceType === "Home") {
  //       payload["type_of_policy"] = "641bf0a2cbfce023c8c76724";
  //       plicyType = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
  //       matchObj["type_of_policy"] = plicyType;
  //     }
  //     planDetails = await NewLeadsModels.findOne(matchObj);
  //     if (planDetails) {
  //      if(payload.location && businessentityToken){
  //       let newLocationNumber = locationArray.indexOf(locationRoutes)
  //       // let planDetails = await NewLeadsModels.findById(id)
  //       let oldLink = planDetails?.buisnessEntityCostomerLink
  //       planDetails = planDetails.toObject()
  //       oldLink = planDetails?.buisnessEntityCostomerLink
  //       let oldLocatonNumber = planDetails.location
  //       console.log({newLocationNumber,oldLocatonNumber})
  //       if(oldLocatonNumber && (newLocationNumber>oldLocatonNumber)){
  //        if(oldLink){
  //          oldLink = oldLink.split("y.in")
  //          payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
  //        }else{
  //          payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
  //        }

  //       payload["location"] = +newLocationNumber
  //       }
  //       else if(!oldLocatonNumber){
  //       if(oldLink){
  //        oldLink = oldLink.split("y.in")
  //        payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?${oldLink[1].split("?")[1]}`
  //       }else{
  //        payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${planDetails?._id?.toString()}`
  //       }
  //        payload["location"] = +newLocationNumber
  //       }else{
  //        payload["location"] = +oldLocatonNumber
  //       }
  //      }
  //       planDetails = await NewLeadsModels.findOneAndUpdate(matchObj, payload,{new:true});
  //     } else {
  //       let newLeads = await NewLeadsModels.aggregate([
  //         {
  //           $sort: {
  //             new_lead_timestamp: -1,
  //           },
  //         },
  //         {
  //           $limit: 1,
  //         },
  //       ]);
  //       if (!newLeads.length) {
  //         newLeads = 1000;
  //         payload["lead_id"] = newLeads;
  //       } else {
  //         newLeads = +newLeads[0]?.lead_id + 1;
  //         payload["lead_id"] = newLeads;
  //       }
  //       planDetails = await NewLeadsModels.create(payload);
  //       if(locationRoutes && businessentityToken){
  //         let newLeadId = planDetails?.toObject()?._id
  //         if(locationRoutes){
  //           planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId,{buisnessEntityCostomerLink:`https://lmpfrontend.handsintechnology.in/${locationRoutes}?leadid=${newLeadId?.toString()}`},{new:true})
  //         }else{
  //           planDetails = await NewLeadsModels.findByIdAndUpdate(newLeadId,{buisnessEntityCostomerLink:`https://lmpfrontend.handsintechnology.in/?leadid=${newLeadId?.toString()}`},{new:true})
  //         }

  //       }

  //     }
  //     if (!planDetails) {
  //       return res
  //         .status(400)
  //         .json({
  //           status: 400,
  //           message: "Data not Saved Successfully",
  //           data: {},
  //         });
  //     }
  //     return res
  //       .status(200)
  //       .json({
  //         status: 200,
  //         message: "Data Saved Successfully",
  //         data: planDetails,
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  findMotorDetails: async (req, res) => {
    try {
      let newLeadId = req.query.newLeadId
      if (!newLeadId) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Please Provide ID",
            data: {},
          });
      }
      let motorPlan = await NewLeadsModels.findById(newLeadId);
      if (motorPlan) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: motorPlan,
          });
      } else {
        return res.status(404).json({ status: 404, message: "Data not found", data: {} });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getMotorPlanDataByEmail: async (req, res) => {
    try {
      let motorDetails;
      let email = req.query.email;
      if (!email) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Please Provide Email ID",
            data: motorDetails,
          });
      }
      motorDetails = await NewLeadsModels.findOne({ email: email });
      if (!motorDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: motorDetails });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully",
          data: motorDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getNaturePlan: async (req, res) => {
    try {
      let planNatures;
      planNatures = await planNatureModels.aggregate([
        {
          $match: {
            nature_of_plan_status: 1
          },
        },
        {
          $project: {
            nature_of_plan_name: 1,
          },
        },
      ]);
      if (planNatures.length < 1) {
        return res
          .status(404)
          .json({ status: 400, message: "Data Not Found", data: planNatures });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully",
          data: planNatures,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllCompanies: async (req, res) => {
    try {
      let companiesData;
      companiesData = await companiesModels.aggregate([
        {
          $match: {
            company_status: 1
          },
        },
        {
          $project: {
            company_name: 1,
          },
        },
      ]);
      if (!companiesData.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Companies not found",
            data: companiesData,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Companies find Successfully !",
          data: companiesData,
        });
    } catch (err) {
      console.log(err);
    }
  },
  addYachtPlan: async (req, res) => {
    try {
      let user = req?.user
      let createdby
      let userlocation = user?.location
      createdby = userlocation[0]
      const line_of_business_name = "Yacht";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });

      const policy_type_name = req.body.rowsData[0]["policy_type"];
      const policy_type = await PolicyType.findOne({
        policy_type_name: policy_type_name,
      });


      let count = 0;
      const rowsData = req.body?.rowsData || [];
      for (let i = 0; i < rowsData.length; i++) {
        const rowData = rowsData[i];
        console.log("rowData?>>>>>>>>>", rowData)
        const planforArr = [];
        const businesstypeArr = [];
        const bodyArr = [];
        const hullArr = [];
        const horsepowerArr = [];
        const engineArr = [];
        const measureValueArr = []; //
        const speedknotArr = [];
        const driveExpeArr = [];
        const homeCDepxArr = [];
        const hullEqpArr = [];
        const dingthTenderpArr = [];
        const outBoardArr = [];
        const personalEffCashArr = [];
        const trailerArr = [];
        const noclaimyearArr = [];
        const passcapacityArr = [];
        const crewCapacityArr = [];
        const adOpConArr = [];
        const breadthArr = [];
        let payload = {};

        if (rowData?.plan_for_name) {
          const plan_for = rowData?.plan_for_name;
          for (let j = 0; j < plan_for.length; j++) {
            planforArr.push({
              _id: plan_for[j]["_id"],
              plan_for_name: plan_for[j]["plan_for_name"],
            });
          }
          payload["plan_for"] = planforArr;
        }

        if (rowData?.business_type_name) {
          const business_type = rowData.business_type_name;

          for (let j = 0; j < business_type.length; j++) {
            businesstypeArr.push({
              _id: business_type[j]["_id"],
              business_type_name: business_type[j]["business_type_name"],
            });
          }
          payload["business_type"] = businesstypeArr;
        }




        if (rowData?.yacht_hull_material) {
          const issuing_visa = rowData?.yacht_hull_material;
          const hull_material_topup = rowData.hull_material_topup?.includes(",") ? rowData?.hull_material_topup.split(",") : [rowData?.hull_material_topup];
          for (let j = 0; j < issuing_visa.length; j++) {
            hullArr.push({
              _id: issuing_visa[j]["_id"],
              yacht_hull_material: issuing_visa[j]["yacht_hull_material"],
              hull_material_topup: hull_material_topup[j]
                ? hull_material_topup[j].trim()
                : 0,
            });
          }
          payload["yacht_hull_material_or_topup"] = hullArr;
        }
        if (rowData?.boat_horsepower) {
          const horse_power = rowData?.boat_horsepower?.includes(",") ? rowData?.boat_horsepower.split(",") : [rowData?.boat_horsepower];
          const h_p_topup = rowData?.horsepower_topup?.includes(",") ? rowData?.horsepower_topup?.split(",") : [rowData?.horsepower_topup];
          for (let j = 0; j < horse_power.length; j++) {
            const horsepower_range = horse_power[j]?.split("-")
            horsepowerArr.push({
              min: +horsepower_range[0],
              max: +horsepower_range[1],
              horsepower_topup: h_p_topup[j] ? h_p_topup[j].trim() : 0,
            });
          }
          payload["yacht_horsepower_type_or_topup"] = horsepowerArr;
        }
        if (rowData?.breadth_value) {
          const breadth_value = rowData?.breadth_value
          const breadth_topup = rowData?.breadth_topup?.includes(",") ? rowData?.breadth_topup?.split(",") : [rowData?.breadth_topup];
          for (let j = 0; j < breadth_value.length; j++) {

            breadthArr.push({
              _id: breadth_value[j]["_id"],
              name: breadth_value[j]["name"],
              breadth_topup: breadth_topup[j] ? breadth_topup[j].trim() : 0,
            });
          }
          payload["yacht_breadth_value_or_topup"] = breadthArr;
        }

        if (rowData?.yacht_horsepower_type) {
          const horse_power = rowData?.yacht_horsepower_type;
          const h_p_topup = rowData.horsepower_topup?.includes(",") ? rowData?.horsepower_topup?.split(",") : [rowData?.horsepower_topup];
          for (let j = 0; j < horse_power.length; j++) {
            horsepowerArr.push({
              _id: horse_power[j]["_id"],
              yacht_horsepower_type: horse_power[j]["yacht_horsepower_type"],
              horse_power_topup: h_p_topup[j] ? h_p_topup[j].trim() : 0,
            });
          }
          payload["yacht_horsepower_type_or_topup"] = horsepowerArr;
        }

        if (rowData?.yacht_engine_type) {
          const engine_type = rowData.yacht_engine_type;
          const engine_type_topup = rowData.engine_type_topup?.includes(",") ? rowData?.engine_type_topup?.split(",") : [rowData?.engine_type_topup];
          for (let j = 0; j < engine_type.length; j++) {
            engineArr.push({
              _id: engine_type[j]["_id"],
              yacht_engine_type: engine_type[j]["yacht_engine_type"],
              engine_type_topup: engine_type_topup[j]
                ? engine_type_topup[j].trim()
                : 0,
            });
          }
          payload["yacht_engine_type_or_topup"] = engineArr;
        }


        if (rowData?.yacht_speed_knot_type) {
          const speed_knot = rowData?.yacht_speed_knot_type?.includes(",") ? rowData?.yacht_speed_knot_type.split(",") : [rowData?.yacht_speed_knot_type];
          const speed_knot_topup = rowData?.s_k_topup.includes(",") ? rowData?.s_k_topup.split(",") : [rowData?.s_k_topup];
          for (let j = 0; j < speed_knot.length; j++) {
            const speedknotRange = speed_knot[j]?.split("-")
            speedknotArr.push({
              min: speedknotRange[0],
              max: speedknotRange[1],
              speed_knot_type_topup: speed_knot_topup[j] ? speed_knot_topup[j].trim()
                : 0,
            });
          }
          payload["yacht_speed_knot_type_or_topup"] = speedknotArr;
        }

        if (rowData?.driving_experience) {
          const drive_exp = rowData.driving_experience.includes(",") ? rowData?.driving_experience.split(",") : [rowData?.driving_experience];
          const drive_exp_topup = rowData.driving_exp_topup?.includes(",") ? rowData?.driving_exp_topup?.split(",") : [rowData?.driving_exp_topup];
          for (let j = 0; j < drive_exp.length; j++) {
            const drive_exp_Range = drive_exp[j].split("-");
            const drive_expMin =
              drive_exp_Range.length > 0
                ? parseInt(drive_exp_Range[0].trim())
                : 0;
            const drive_expMax =
              drive_exp_Range.length > 1
                ? parseInt(drive_exp_Range[1].trim())
                : drive_expMin;

            driveExpeArr.push({
              drive_expMin,
              drive_expMax,
              drive_experience_topup: drive_exp_topup[j]
                ? drive_exp_topup[j].trim()
                : 0,
            });
          }
          payload["driving_experience_or_topup"] = driveExpeArr;
        }

        // if (rowData?.home_country_driving_experience) {
        //   const country_drive_exp =
        //     rowData?.home_country_driving_experience.includes(",") ? rowData?.home_country_driving_experience.split(",") : [rowData?.home_country_driving_experience];
        //   const country_drive_exp_topup =
        //     rowData.h_c_driving_exp_topup.includes(",") ? rowData?.h_c_driving_exp_topup.split(",") : [rowData?.h_c_driving_exp_topup];
        //   for (let j = 0; j < country_drive_exp.length; j++) {
        //     const country_drive_exp_Range = country_drive_exp[j].split("-");
        //     const country_drive_expMin =
        //       country_drive_exp_Range.length > 0
        //         ? parseInt(country_drive_exp_Range[0].trim())
        //         : 0;
        //     const country_drive_expMax =
        //       country_drive_exp_Range.length > 1
        //         ? parseInt(country_drive_exp_Range[1].trim())
        //         : country_drive_expMin;

        //     homeCDepxArr.push({
        //       country_drive_expMin,
        //       country_drive_expMax,
        //       country_drive_experience_topup: country_drive_exp_topup[j]
        //         ? country_drive_exp_topup[j].trim()
        //         : 0,
        //     });
        //   }
        //   payload["home_country_driving_experience_or_topup"] = homeCDepxArr;
        // }

        if (rowData?.policy_type == "Third Party Liability (TPL)") {
          ////
          if (rowData?.yacht_body_type) {
            const measurement_value = rowData?.measurement_value.includes(",") ? rowData?.measurement_value.split(",") : [rowData?.measurement_value];
            // const measurement_topup = rowData.m_v_topup.includes(",") ? rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];

            const y_b_type = rowData?.yacht_body_type;
            // const y_b_topup = rowData.yb_topup?.includes(",") ? rowData?.yb_topup.split(",") : [rowData?.yb_topup];
            const minPremiumArr = rowData?.minimum_premium?.includes(",") ? rowData?.minimum_premium?.split(",") : [rowData?.minimum_premium];
            const primiumArr = rowData?.premium?.includes(",") ? rowData?.premium?.split(",") : [rowData?.premium];
            console.log("primiumArr?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", primiumArr)
            for (let j = 0; j < y_b_type.length; j++) {
              for (let k = 0; k < measurement_value.length; k++) {
                const measurement_value_Range = measurement_value[k].split("-");
                const Min = measurement_value_Range.length > 0 ? parseInt(measurement_value_Range[0].trim()) : 0;
                const Max = measurement_value_Range.length > 1 ? parseInt(measurement_value_Range[1].trim()) : Min;
                bodyArr.push({
                  _id: y_b_type[j]["_id"],
                  yacht_body_type: y_b_type[j]["yacht_body_type"],
                  // y_b_topup: y_b_topup[j] ? y_b_topup[j].trim() : 0,
                  measurement_value_min: Min,
                  measurement_value_max: Max,
                  // measurement_topup: measurement_topup[k] ? measurement_topup[k].trim() : 0,
                  minimum_premium: minPremiumArr[j] ? minPremiumArr[j].trim() : 0,
                  primium: primiumArr[j] ? primiumArr[j].trim() : 0,

                });
              }
            }
            payload["yacht_body_type_or_topup"] = bodyArr;
          }
          if (rowData?.hull_and_eq_value_range) {
            const hull_eqp = rowData?.hull_and_eq_value_range?.includes(",") ? rowData?.hull_and_eq_value_range?.split(",") : [rowData?.hull_and_eq_value_range];
            const hull_eqp_topup = rowData.hull_and_eqvr_topup?.includes(",") ? rowData?.hull_and_eqvr_topup?.split(",") : [rowData?.hull_and_eqvr_topup];
            for (let j = 0; j < hull_eqp.length; j++) {
              const hull_eqp_Range = hull_eqp[j].split("-");
              const hull_equipment_Min =
                hull_eqp_Range.length > 0
                  ? parseInt(hull_eqp_Range[0].trim())
                  : 0;
              const hull_equipment_Max = hull_eqp_Range.length > 1
                ? parseInt(hull_eqp_Range[1].trim())
                : hull_equipment_Min;
              hullEqpArr.push({
                hull_equipment_Min,
                hull_equipment_Max,
                hull_equipment_value_range_topup: hull_eqp_topup[j]
                  ? hull_eqp_topup[j].trim()
                  : 0,
              });

            }
            payload["hull_and_equipment_value_range_or_topup"] = hullEqpArr;
            ///////
          }
          if (rowData?.measurement_value) {
            // const measurement = rowData?.measurement.includes(",") ? rowData?.measurement.split(",") : [rowData?.measurement];
            const measurement_value = rowData?.measurement_value?.includes(",") ? rowData?.measurement_value?.split(",") : [rowData?.measurement_value];
            // const measurement_topup = rowData.m_v_topup.includes(",") ? rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];
            for (let j = 0; j < measurement_value.length; j++) {
              // const measurement_type = measurement[j];
              const measurement_value_Range = measurement_value[j].split("-");
              const Min =
                measurement_value_Range.length > 0
                  ? parseInt(measurement_value_Range[0].trim())
                  : 0;
              const Max =
                measurement_value_Range.length > 1
                  ? parseInt(measurement_value_Range[1].trim())
                  : Min;

              measureValueArr.push({
                // measurement_type,
                Min,
                Max,
              });
            }
            payload["measurement_value_or_topup"] = measureValueArr;
          }
        }
        else {
          if (rowData?.hull_and_eq_value_range) {
            const hull_eqp = rowData?.hull_and_eq_value_range?.includes(",") ? rowData?.hull_and_eq_value_range?.split(",") : [rowData?.hull_and_eq_value_range];
            const hull_eqp_topup = rowData.hull_and_eqvr_topup?.includes(",") ? rowData?.hull_and_eqvr_topup?.split(",") : [rowData?.hull_and_eqvr_topup];
            const rateArr = rowData?.rate?.includes(",") ? rowData?.rate?.split(",") : [rowData?.rate];
            const excessArr = rowData?.excess?.includes(",") ? rowData?.excess?.split(",") : [rowData?.excess];
            const minPremiumArr = rowData?.minimum_premium?.includes(",") ? rowData?.minimum_premium?.split(",") : [rowData?.minimum_premium];
            for (let j = 0; j < hull_eqp.length; j++) {
              const hull_eqp_Range = hull_eqp[j].split("-");
              const hull_equipment_Min =
                hull_eqp_Range.length > 0
                  ? parseInt(hull_eqp_Range[0].trim())
                  : 0;
              const hull_equipment_Max =
                hull_eqp_Range.length > 1
                  ? parseInt(hull_eqp_Range[1].trim())
                  : hull_equipment_Min;

              hullEqpArr.push({
                hull_equipment_Min,
                hull_equipment_Max,
                rate: rateArr[j] ? parseInt(rateArr[j].trim()) : 0,
                excess: excessArr[j] ? parseInt(excessArr[j].trim()) : 0,
                minimum_premium: minPremiumArr[j] ? parseInt(minPremiumArr[j].trim()) : 0,
                hull_equipment_value_range_topup: hull_eqp_topup[j]
                  ? hull_eqp_topup[j].trim()
                  : 0,
              });
            }
            payload["hull_and_equipment_value_range_or_topup"] = hullEqpArr;

          }

          ////
          if (rowData?.yacht_body_type) {
            const y_b_type = rowData?.yacht_body_type;
            const y_b_topup = rowData.yb_topup?.includes(",") ? rowData?.yb_topup.split(",") : [rowData?.yb_topup];
            for (let j = 0; j < y_b_type.length; j++) {
              bodyArr.push({
                _id: y_b_type[j]["_id"],
                yacht_body_type: y_b_type[j]["yacht_body_type"],
                y_b_topup: y_b_topup[j] ? y_b_topup[j].trim() : 0,
              });
            }
            payload["yacht_body_type_or_topup"] = bodyArr;
          }
          if (rowData?.policy_type_name) {
            let last_year_policy_type_or_arr = [];
            const last_year_policy_type = rowData?.policy_type_name;
            const last_year_policy_type_topup =
              rowData?.last_year_policy_type_topup?.includes(",") ?
                rowData?.last_year_policy_type_topup?.split(",") : [rowData?.last_year_policy_type_topup];

            for (let j = 0; j < last_year_policy_type.length; j++) {
              last_year_policy_type_or_arr.push({
                _id: last_year_policy_type[j]["_id"],
                last_year_policy_type:
                  last_year_policy_type[j]["policy_type_name"],
                last_year_policy_type_topup: last_year_policy_type_topup[j] ?
                  last_year_policy_type_topup[j]?.trim().replace(/\s+/g, "") : 0,
              });
            }
            payload["last_year_policy_type_or_topup"] = last_year_policy_type_or_arr

          }

          if (rowData?.measurement_value) {
            // const measurement = rowData?.measurement.includes(",") ? rowData?.measurement.split(",") : [rowData?.measurement];
            const measurement_value = rowData?.measurement_value?.includes(",") ? rowData?.measurement_value.split(",") : [rowData?.measurement_value];
            const measurement_topup = rowData?.m_v_topup?.includes(",") ? rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];
            for (let j = 0; j < measurement_value.length; j++) {
              // const measurement_type = measurement[j];
              const measurement_value_Range = measurement_value[j].split("-");
              const Min =
                measurement_value_Range.length > 0
                  ? parseInt(measurement_value_Range[0].trim())
                  : 0;
              const Max =
                measurement_value_Range.length > 1
                  ? parseInt(measurement_value_Range[1].trim())
                  : Min;

              measureValueArr.push({
                // measurement_type,
                Min,
                Max,
                measurement_topup: measurement_topup[j]
                  ? measurement_topup[j].trim()
                  : 0,
              });
            }
            payload["measurement_value_or_topup"] = measureValueArr;
          }
          ///////
        }

        if (rowData?.den_ten_value_range) {
          const den_ten_value = rowData?.den_ten_value_range?.includes(",") ? rowData?.den_ten_value_range?.split(",") : [rowData?.den_ten_value_range];
          const den_ten_value_topup = rowData?.den_tender_topup?.includes(",") ? rowData?.den_tender_topup?.split(",") : [rowData?.den_tender_topup];
          const den_ten_rate = rowData?.din_ten_val_rate?.includes(",") ? rowData?.din_ten_val_rate?.split(",") : [rowData?.din_ten_val_rate];
          for (let j = 0; j < den_ten_value.length; j++) {
            const den_ten_value_Range = den_ten_value[j].split("-");
            const dinghy_tender_Min =
              den_ten_value_Range.length > 0
                ? parseInt(den_ten_value_Range[0].trim())
                : 0;
            const dinghy_tender_Max =
              den_ten_value_Range.length > 1
                ? parseInt(den_ten_value_Range[1].trim())
                : dinghy_tender_Min;

            dingthTenderpArr.push({
              dinghy_tender_Min,
              dinghy_tender_Max,
              dinghy_or_tender_value_topup: den_ten_value_topup[j]
                ? den_ten_value_topup[j].trim()
                : 0,
              rate: den_ten_rate[j] ? den_ten_rate[j].trim() : 0,
            });
          }
          payload["dinghy_ten_value_range_or_topup"] = dingthTenderpArr;
        }

        if (rowData?.outboard_value_range) {
          const outboard_value = rowData?.outboard_value_range?.includes(",") ? rowData?.outboard_value_range?.split(",") : [rowData?.outboard_value_range];
          const outboard_value_topup =
            rowData.outboard_value_range_topup?.includes(",") ? rowData?.outboard_value_range_topup?.split(",") : [rowData?.outboard_value_range_topup];
          const outBoard_rate = rowData?.outboard_range_rate?.includes(",") ? rowData?.outboard_range_rate?.split(",") : [rowData?.outboard_range_rate];
          for (let j = 0; j < outboard_value.length; j++) {
            const outboard_value_Range = outboard_value[j].split("-");
            const outboard_value_range_Min =
              outboard_value_Range.length > 0
                ? parseInt(outboard_value_Range[0].trim())
                : 0;
            const outboard_value_range_Max =
              outboard_value_Range.length > 1
                ? parseInt(outboard_value_Range[1].trim())
                : outboard_value_range_Min;

            outBoardArr.push({
              outboard_value_range_Min,
              outboard_value_range_Max,
              outboard_value_range_topup: outboard_value_topup[j]
                ? outboard_value_topup[j].trim()
                : 0,
              rate: outBoard_rate[j] ? outBoard_rate[j].trim() : 0,
            });
          }
          payload["outboard_value_range_or_topup"] = outBoardArr;
        }

        if (rowData?.personal_eff_cash) {
          const personal_effect_cash = rowData?.personal_eff_cash?.includes(",") ? rowData?.personal_eff_cash?.split(",") : [rowData?.personal_eff_cash];
          const personal_effect_cash_topup =
            rowData?.personal_eff_cash_topup?.includes(",") ? rowData?.personal_eff_cash_topup?.split(",") : [rowData?.personal_eff_cash_topup];
          const personal_rate = rowData?.personal_eff_rate?.includes(",") ? rowData?.personal_eff_rate?.split(",") : [rowData?.personal_eff_rate];
          for (let j = 0; j < personal_effect_cash.length; j++) {
            const personal_effect_cash_Range =
              personal_effect_cash[j].split("-");
            const personal_effect_cash_range_Min =
              personal_effect_cash_Range.length > 0
                ? parseInt(personal_effect_cash_Range[0].trim())
                : 0;
            const personal_effect_cash_range_Max =
              personal_effect_cash_Range.length > 1
                ? parseInt(personal_effect_cash_Range[1].trim())
                : personal_effect_cash_range_Min;

            personalEffCashArr.push({
              personal_effect_cash_range_Min,
              personal_effect_cash_range_Max,
              personal_effect_cash_range_topup: personal_effect_cash_topup[j]
                ? personal_effect_cash_topup[j].trim()
                : 0,
              rate: personal_rate[j] ? personal_rate[j].trim() : 0,
            });
          }
          payload["personal_eff_cash_or_topup"] = personalEffCashArr;
        }

        if (rowData?.trailer) {
          const trailer = rowData?.trailer?.includes(",") ? rowData?.trailer?.split(",") : [rowData?.trailer];
          const trailer_topup = rowData?.trailer_topup?.includes(",") ? rowData?.trailer_topup?.split(",") : [rowData?.trailer_topup];
          const trailerRate = rowData?.trailer_rate?.includes(",") ? rowData?.trailer_rate?.split(",") : [rowData?.trailer_rate];
          for (let j = 0; j < trailer.length; j++) {
            const trailer_Range = trailer[j].split("-");
            const trailer_Min =
              trailer_Range.length > 0
                ? parseInt(trailer_Range[0].trim())
                : 0;
            const trailer_Max =
              trailer_Range.length > 1
                ? parseInt(trailer_Range[1].trim())
                : trailer_Min;

            trailerArr.push({
              trailer_Min,
              trailer_Max,
              trailer_topup: trailer_topup[j] ? trailer_topup[j].trim() : 0,
              rate: trailerRate[j] ? trailerRate[j].trim() : 0,
            });
          }
          payload["trailer_or_topup"] = trailerArr;
        }

        if (rowData?.claim_years) {
          const no_claim_years = rowData?.claim_years?.includes(",") ? rowData?.claim_years?.split(",") : [rowData?.claim_years];
          const no_claim_years_discount = rowData?.claim_years_disc?.includes(",") ? rowData?.claim_years_disc?.split(",") : [rowData?.claim_years_disc];
          for (let j = 0; j < no_claim_years.length; j++) {
            noclaimyearArr.push({
              claimyears: no_claim_years[j] ? no_claim_years[j].trim() : "",
              claimyeardisc: no_claim_years_discount[j]
                ? no_claim_years_discount[j].trim()
                : 0,
            });
          }
          payload["no_claim_years"] = noclaimyearArr;
        }

        if (rowData?.pass_capacity) {
          const pass_capacity = rowData?.pass_capacity?.includes(",") ? rowData?.pass_capacity?.split(",") : [rowData?.pass_capacity];
          const pass_capacity_topup = rowData?.pass_capacity_topup?.includes(",") ? rowData?.pass_capacity_topup?.split(",") : [rowData?.pass_capacity_topup];
          for (let j = 0; j < pass_capacity.length; j++) {
            const pass_capacity_Range = pass_capacity[j].split("-");
            const passenger_capacity_Min =
              pass_capacity_Range.length > 0
                ? parseInt(pass_capacity_Range[0].trim())
                : 0;
            const passenger_capacity_Max =
              pass_capacity_Range.length > 1
                ? parseInt(pass_capacity_Range[1].trim())
                : passenger_capacity_Min;

            passcapacityArr.push({
              passenger_capacity_Min,
              passenger_capacity_Max,
              passenger_capacity_topup: pass_capacity_topup[j]
                ? pass_capacity_topup[j].trim()
                : 0,
            });
          }
          payload["passenger_capacity_or_topup"] = passcapacityArr;
        }

        if (rowData?.crew_capacity) {
          const crew_capacity = rowData?.crew_capacity?.includes(",") ? rowData?.crew_capacity?.split(",") : [rowData?.crew_capacity];
          const crew_capacity_topup = rowData?.crew_capacity_topup?.includes(",") ? rowData?.crew_capacity_topup.split(",") : [rowData?.crew_capacity_topup];
          for (let j = 0; j < crew_capacity.length; j++) {
            const crew_capacity_Range = crew_capacity[j].split("-");
            const crew_capacity_Min =
              crew_capacity_Range.length > 0
                ? parseInt(crew_capacity_Range[0].trim())
                : 0;
            const crew_capacity_Max =
              crew_capacity_Range.length > 1
                ? parseInt(crew_capacity_Range[1].trim())
                : crew_capacity_Min;

            crewCapacityArr.push({
              crew_capacity_Min,
              crew_capacity_Max,
              crew_capacity_topup: crew_capacity_topup[j]
                ? crew_capacity_topup[j].trim()
                : 0,
            });
          }
          payload["crew_capacity_or_topup"] = crewCapacityArr;
        }

        if (rowData?.add_op_con_desc) {
          const add_op_con_desc = rowData?.add_op_con_desc?.includes(",") ? rowData?.add_op_con_desc?.split(",") : [rowData?.add_op_con_desc];
          const add_op_con_desc_topup =
            rowData?.add_op_con_desc_topup?.includes(",") ? rowData?.add_op_con_desc_topup?.split(",") : [rowData?.add_op_con_desc_topup];
          const vat = rowData.vat_able?.includes(",") ? rowData?.vat_able?.split(",") : [rowData?.vat_able];
          for (let j = 0; j < add_op_con_desc.length; j++) {
            adOpConArr.push({
              add_op_con_desc: add_op_con_desc[j]
                ? add_op_con_desc[j].trim()
                : "",
              add_op_con_desc_topup: add_op_con_desc_topup[j]
                ? add_op_con_desc_topup[j].trim()
                : 0,
              vat: vat[j] ? vat[j] : "",
            });
          }
          payload["add_op_con_desc_or_topup"] = adOpConArr;
        }

        // age_of_the_car_topup: "",
        if (rowData?.age_of_the_car) {
          const ageOfCarArr = [];
          const age_of_the_car = rowData?.age_of_the_car?.includes(",") ? rowData?.age_of_the_car?.split(",") : [rowData?.age_of_the_car];
          const age_of_the_car_topup = rowData?.age_of_the_car_topup?.includes(",") ? rowData?.age_of_the_car_topup?.split(",") : [rowData?.age_of_the_car_topup];
          for (let j = 0; j < age_of_the_car.length; j++) {
            const carRange = age_of_the_car[j]?.split("-");
            const carMin =
              carRange.length > 0
                ? parseInt(carRange[0].trim())
                : 0;
            const carMax =
              carRange.length > 1
                ? parseInt(carRange[1].trim())
                : carMin;

            ageOfCarArr.push({
              age_of_the_boat_min: carMin,
              age_of_the_boat_max: carMax,
              age_of_the_boat_topup: age_of_the_car_topup[j]
                ? age_of_the_car_topup[j].trim()
                : 0,
            });
          }
          payload["age_of_the_car_or_topup"] = ageOfCarArr;
        }
        payload["line_of_business_id"] = line_of_business?._id;
        payload["plan_name"] = rowData?.plan_name;
        payload["company_id"] = rowData?.company_id;
        payload["plan_category_id"] = rowData?.plan_category_id;
        payload["nature_of_plan_id"] = rowData?.nature_of_plan_id;
        payload["policy_type_id"] = policy_type?._id;
        payload["initial_rate"] = rowData?.initial_rate;
        payload["discount_rate"] = rowData?.discount_rate;
        payload["rate"] = rowData?.rate;
        payload["excess"] = rowData?.excess;
        payload["jdv_commission"] = rowData?.jdv_commision;
        payload["location"] = rowData?.location;
        payload["plan_created_by"] = mongoose.Types.ObjectId(createdby?.loc_id)
        console.log("PayloadObject>>>>>>", payload)
        let yacht_plan = new ComprehensiveYachtPlan(payload);

        let result = await yacht_plan.save();
        if (result) {
          count++;
        }
      }
      if (count > 0) {
        res.json({ status: 200, message: "Yacht Plan Added Successfully!" });
      } else {
        res.json({
          status: 400,
          message: "Yacht Plan Not Added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  getYachtPlans: async (req, res) => {
    try {
      let query = req.query
      const page = query.page;
      const limit = query.limit;

      let name = query?.name;
      let company = query?.companyid;
      let status = +query?.status;
      let policy_typeId = query?.policy_type
      console.log("name", name)
      console.log("company", company)
      console.log("status", status)
      console.log("policy_typeId", policy_typeId)


      if (page && limit) {
        let match = {}
        if (name) {
          match["plan_name"] = { $regex: new RegExp(name.trim(), 'i') }
        }
        if (company) {
          match["company_id"] = mongoose.Types.ObjectId(company)
        }
        if (policy_typeId) {
          match["policy_type_id"] = mongoose.Types.ObjectId(policy_typeId);
        }
        if (status == 1 || status == 0) {
          match["status"] = +status
        }
        let aggregate = [
          {
            $match: match,
          },
        ]
        let facet = {};
        facet["totalCount"] = [
          {
            $count: "total",
          },
        ];
        facet["data"] = [
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "nature_of_plans",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plans",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_category",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
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
        let yachtplan = await yacht_plan.aggregate(aggregate);
        if (yachtplan.length > 0) {
          res.json({
            status: 200,
            message: "Data Found",
            data: yachtplan[0].data,
            totalCount: yachtplan[0].totalCount[0]?.total || 0,
          });
        }
        else {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
      } else {
        let result = await yacht_plan.aggregate([
          {
            $lookup: {
              from: "policy_types",
              localField: "policy_type_id",
              foreignField: "_id",
              as: "policy_type",
            },
          },
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "company",
            },
          },
          {
            $lookup: {
              from: "plan_natures",
              localField: "nature_of_plan_id",
              foreignField: "_id",
              as: "nature_of_plan",
            },
          },
          {
            $lookup: {
              from: "plan_categories",
              localField: "plan_category_id",
              foreignField: "_id",
              as: "plan_category",
            },
          },
          {
            $sort: {
              "company.company_name": 1
            }
          },
        ]);
        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found",
            data: result,
            total: result.length,
          });
        }
      }
    } catch (err) {
      res.send(err);
    }

  },
  UpdateYachtPlan: async (req, res) => {
    try {
      const id = req.params.id;
      const planforArr = [];
      const businesstypeArr = [];
      const bodyArr = [];
      const hullArr = [];
      const horsepowerArr = [];
      const engineArr = [];
      const measureValueArr = []; //
      const breadthArr = [];
      const speedknotArr = [];
      const driveExpeArr = [];
      const homeCDepxArr = [];
      const hullEqpArr = [];
      const dingthTenderpArr = [];
      const outBoardArr = [];
      const personalEffCashArr = [];
      const trailerArr = [];
      const noclaimyearArr = [];
      const passcapacityArr = [];
      const crewCapacityArr = [];
      const adOpConArr = [];
      const rowData = req.body || [];
      let payload = {};
      console.log("rowData><><><><>", rowData)
      // return false;
      if (rowData?.plan_for_name) {
        const plan_for = rowData?.plan_for_name;
        for (let j = 0; j < plan_for.length; j++) {
          planforArr.push({
            _id: plan_for[j]["_id"],
            plan_for_name: plan_for[j]["plan_for_name"],
          });
        }
        payload["plan_for"] = planforArr;
      }

      if (rowData?.business_type_name) {
        const business_type = rowData?.business_type_name;
        for (let j = 0; j < business_type.length; j++) {
          businesstypeArr.push({
            _id: business_type[j]["_id"],
            business_type_name: business_type[j]["business_type_name"],
          });
        }
        payload["business_type"] = businesstypeArr;
      }

      if (rowData?.yacht_hull_material) {
        const hull_material = rowData?.yacht_hull_material;

        const hull_material_topup = rowData?.hull_material_topup.includes(",") ? rowData?.hull_material_topup.split(",") : [rowData?.hull_material_topup];
        for (let j = 0; j < hull_material.length; j++) {
          hullArr.push({
            _id: hull_material[j]["_id"],
            yacht_hull_material: hull_material[j]["yacht_hull_material"],
            hull_material_topup: hull_material_topup[j]
              ? hull_material_topup[j].trim()
              : 0,
          });
        }
        payload["yacht_hull_material_or_topup"] = hullArr;
      }



      if (rowData?.boat_horsepower) {
        const horse_power = rowData?.boat_horsepower?.includes(",") ? rowData?.boat_horsepower.split(",") : [rowData?.boat_horsepower];
        const h_p_topup = rowData?.horsepower_topup.includes(",") ? rowData?.horsepower_topup.split(",") : [rowData?.horsepower_topup];
        for (let j = 0; j < horse_power.length; j++) {
          const horsepower_range = horse_power[j]?.split("-")
          horsepowerArr.push({
            min: +horsepower_range[0],
            max: +horsepower_range[1],
            horsepower_topup: h_p_topup[j] ? h_p_topup[j].trim() : 0,
          });
        }
        payload["yacht_horsepower_type_or_topup"] = horsepowerArr;
      } else {
        payload["yacht_horsepower_type_or_topup"] = [];
      }
      if (rowData?.breadth_value) {
        const breadth_value = rowData?.breadth_value
        const breadth_topup = rowData?.breadth_topup.includes(",") ? rowData?.breadth_topup.split(",") : [rowData?.breadth_topup];
        for (let j = 0; j < breadth_value.length; j++) {
          breadthArr.push({
            _id: breadth_value[j]["_id"],
            name: breadth_value[j]["name"],
            breadth_topup: breadth_topup[j] ? breadth_topup[j].trim() : 0,
          });
        }
        payload["yacht_breadth_value_or_topup"] = breadthArr;
      }
      else {
        payload["yacht_breadth_value_or_topup"] = [];
      }


      if (rowData?.yacht_engine_type) {
        const engine_type = rowData?.yacht_engine_type;
        const engine_type_topup = rowData?.engine_type_topup.includes(",") ? rowData?.engine_type_topup.split(",") : [rowData?.engine_type_topup];
        for (let j = 0; j < engine_type.length; j++) {
          engineArr.push({
            _id: engine_type[j]["_id"],
            yacht_engine_type: engine_type[j]["yacht_engine_type"],
            engine_type_topup: engine_type_topup[j]
              ? engine_type_topup[j].trim()
              : 0,
          });
        }
        payload["yacht_engine_type_or_topup"] = engineArr;
      }






      if (rowData?.yacht_speed_knot_type) {
        const speed_knot = rowData?.yacht_speed_knot_type?.includes(",") ? rowData?.yacht_speed_knot_type.split(",") : [rowData?.yacht_speed_knot_type];
        const speed_knot_topup = rowData?.s_k_topup.includes(",") ? rowData?.s_k_topup.split(",") : [rowData?.s_k_topup];
        for (let j = 0; j < speed_knot.length; j++) {
          const speedknotRange = speed_knot[j]?.split("-")
          speedknotArr.push({
            min: +speedknotRange[0],
            max: +speedknotRange[1],
            speed_knot_type_topup: speed_knot_topup[j] ? speed_knot_topup[j].trim()
              : 0,
          });
        }
        payload["yacht_speed_knot_type_or_topup"] = speedknotArr;
      }



      if (rowData?.driving_experience) {
        const drive_exp = rowData.driving_experience.includes(",") ?
          rowData?.driving_experience.split(",") : [rowData?.driving_experience];
        const drive_exp_topup = rowData.driving_exp_topup.includes(",") ?
          rowData?.driving_exp_topup.split(",") : [rowData?.driving_exp_topup];
        for (let j = 0; j < drive_exp.length; j++) {
          const drive_exp_Range = drive_exp[j]?.split("-");
          const drive_expMin =
            drive_exp_Range.length > 0
              ? parseInt(drive_exp_Range[0].trim())
              : 0;
          const drive_expMax =
            drive_exp_Range.length > 1
              ? parseInt(drive_exp_Range[1].trim())
              : drive_expMin;

          driveExpeArr.push({
            drive_expMin,
            drive_expMax,
            drive_experience_topup: drive_exp_topup[j]
              ? drive_exp_topup[j].trim()
              : 0,
          });
        }
        payload["driving_experience_or_topup"] = driveExpeArr;
      }



      if (rowData?.home_country_driving_experience) {
        const country_drive_exp = rowData?.home_country_driving_experience.includes(",") ?
          rowData?.home_country_driving_experience.split(",") : [rowData?.home_country_driving_experience];
        const country_drive_exp_topup = rowData?.h_c_driving_exp_topup.includes(",") ?
          rowData?.h_c_driving_exp_topup.split(",") : [rowData?.h_c_driving_exp_topup];
        for (let j = 0; j < country_drive_exp.length; j++) {
          const country_drive_exp_Range = country_drive_exp[j]?.split("-");
          const country_drive_expMin =
            country_drive_exp_Range.length > 0
              ? parseInt(country_drive_exp_Range[0].trim())
              : 0;
          const country_drive_expMax =
            country_drive_exp_Range.length > 1
              ? parseInt(country_drive_exp_Range[1].trim())
              : country_drive_expMin;

          homeCDepxArr.push({
            country_drive_expMin,
            country_drive_expMax,
            country_drive_experience_topup: country_drive_exp_topup[j]
              ? country_drive_exp_topup[j].trim()
              : 0,
          });
        }
        payload["home_country_driving_experience_or_topup"] = homeCDepxArr;
      }
      if (rowData?.age_of_the_car) {
        const ageOfCarArr = [];
        const age_of_the_car = rowData?.age_of_the_car.includes(",") ? rowData?.age_of_the_car.split(",") : [rowData?.age_of_the_car];
        const age_of_the_car_topup = rowData?.age_of_the_car_topup.includes(",") ? rowData?.age_of_the_car_topup.split(",") : [rowData?.age_of_the_car_topup];
        for (let j = 0; j < age_of_the_car.length; j++) {
          const carRange = age_of_the_car[j]?.split("-");
          const carMin =
            carRange.length > 0
              ? parseInt(carRange[0].trim())
              : 0;
          const carMax =
            carRange.length > 1
              ? parseInt(carRange[1].trim())
              : carMin;

          ageOfCarArr.push({
            age_of_the_boat_min: carMin,
            age_of_the_boat_max: carMax,
            age_of_the_boat_topup: age_of_the_car_topup[j]
              ? age_of_the_car_topup[j].trim()
              : 0,
          });
        }
        payload["age_of_the_car_or_topup"] = ageOfCarArr;
      }
      if (rowData?.rate) {
        payload["rate"] = rowData?.rate;
      }
      if (rowData?.excess) {
        payload["excess"] = rowData?.excess;
      }


      if (rowData?.policy_type == "TPL") {
        if (rowData?.yacht_body_type) {
          const measurement_value = rowData?.measurement_value.includes(",") ? rowData?.measurement_value.split(",") : [rowData?.measurement_value];
          // const measurement_topup = rowData.m_v_topup.includes(",") ? rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];

          const y_b_type = rowData?.yacht_body_type;
          // const y_b_topup = rowData.yb_topup?.includes(",") ? rowData?.yb_topup.split(",") : [rowData?.yb_topup];
          const minPremiumArr = rowData?.minimum_premium?.includes(",") ? rowData?.minimum_premium?.split(",") : [rowData?.minimum_premium];
          const primiumArr = rowData?.premium?.includes(",") ? rowData?.premium?.split(",") : [rowData?.premium];
          console.log("premium >>>arr>>>", primiumArr)
          for (let j = 0; j < y_b_type.length; j++) {
            for (let k = 0; k < measurement_value.length; k++) {
              const measurement_value_Range = measurement_value[k].split("-");
              const Min = measurement_value_Range.length > 0 ? parseInt(measurement_value_Range[0].trim()) : 0;
              const Max = measurement_value_Range.length > 1 ? parseInt(measurement_value_Range[1].trim()) : Min;
              const premium = primiumArr[k] ? primiumArr[k] : 0;
              const minPremium = minPremiumArr[k] ? minPremiumArr[k] : 0;
              console.log("asdfsfsf>>>", premium, "asfsf min", minPremium)
              bodyArr.push({
                _id: y_b_type[j]["_id"],
                yacht_body_type: y_b_type[j]["yacht_body_type"],
                // y_b_topup: y_b_topup[j] ? y_b_topup[j].trim() : 0,
                measurement_value_min: Min,
                measurement_value_max: Max,
                // measurement_topup: measurement_topup[k] ? measurement_topup[k].trim() : 0,
                minimum_premium: +minPremium,
                primium: +premium,

              });
            }
          }
          payload["yacht_body_type_or_topup"] = bodyArr;
        }
        if (rowData?.hull_and_eq_value_range) {
          const hull_eqp = rowData?.hull_and_eq_value_range.includes(",") ? rowData?.hull_and_eq_value_range.split(",") : [rowData?.hull_and_eq_value_range];
          const hull_eqp_topup = rowData.hull_and_eqvr_topup.includes(",") ? rowData?.hull_and_eqvr_topup.split(",") : [rowData?.hull_and_eqvr_topup];
          for (let j = 0; j < hull_eqp.length; j++) {
            const hull_eqp_Range = hull_eqp[j].split("-");
            const hull_equipment_Min =
              hull_eqp_Range.length > 0
                ? parseInt(hull_eqp_Range[0].trim())
                : 0;
            const hull_equipment_Max = hull_eqp_Range.length > 1
              ? parseInt(hull_eqp_Range[1].trim())
              : hull_equipment_Min;
            hullEqpArr.push({
              hull_equipment_Min,
              hull_equipment_Max,
              hull_equipment_value_range_topup: hull_eqp_topup[j]
                ? hull_eqp_topup[j].trim()
                : 0,
            });

          }
          payload["hull_and_equipment_value_range_or_topup"] = hullEqpArr;
          ///////
        }
        if (rowData?.measurement_value) {
          // const measurement = rowData?.measurement.includes(",") ? rowData?.measurement.split(",") : [rowData?.measurement];
          const measurement_value = rowData?.measurement_value.includes(",") ? rowData?.measurement_value.split(",") : [rowData?.measurement_value];
          // const measurement_topup = rowData.m_v_topup.includes(",") ? rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];
          for (let j = 0; j < measurement_value.length; j++) {
            // const measurement_type = measurement[j];
            const measurement_value_Range = measurement_value[j].split("-");
            const Min =
              measurement_value_Range.length > 0
                ? parseInt(measurement_value_Range[0].trim())
                : 0;
            const Max =
              measurement_value_Range.length > 1
                ? parseInt(measurement_value_Range[1].trim())
                : Min;

            measureValueArr.push({
              // measurement_type,
              Min,
              Max,
            });
          }
          payload["measurement_value_or_topup"] = measureValueArr;
        }
      } else {
        if (rowData?.hull_and_eq_value_range) {
          const hull_eqp = rowData?.hull_and_eq_value_range.includes(",") ?
            rowData?.hull_and_eq_value_range.split(",") : [rowData?.hull_and_eq_value_range];
          const hull_eqp_topup = rowData?.hull_and_eqvr_topup.includes(",") ?
            rowData?.hull_and_eqvr_topup.split(",") : [rowData?.hull_and_eqvr_topup];

          const rateArr = rowData?.rate.includes(",") ? rowData?.rate.split(",") : [rowData?.rate];
          const excessArr = rowData?.excess.includes(",") ? rowData?.excess.split(",") : [rowData?.excess];
          const minPremiumArr = rowData?.minimum_premium.includes(",") ? rowData?.minimum_premium.split(",") : [rowData?.minimum_premium];
          for (let j = 0; j < hull_eqp.length; j++) {
            const hull_eqp_Range = hull_eqp[j]?.split("-");
            const hull_equipment_Min =
              hull_eqp_Range.length > 0 ? parseInt(hull_eqp_Range[0].trim()) : 0;
            const hull_equipment_Max =
              hull_eqp_Range.length > 1
                ? parseInt(hull_eqp_Range[1].trim())
                : hull_equipment_Min;
            hullEqpArr.push({
              hull_equipment_Min,
              hull_equipment_Max,
              rate: rateArr[j] ? parseInt(rateArr[j].trim()) : 0,
              excess: excessArr[j] ? parseInt(excessArr[j].trim()) : 0,
              minimum_premium: minPremiumArr[j] ? parseInt(minPremiumArr[j].trim()) : 0,
              hull_equipment_value_range_topup: hull_eqp_topup[j]
                ? hull_eqp_topup[j].trim()
                : 0,
            });
          }
          payload["hull_and_equipment_value_range_or_topup"] = hullEqpArr;

        }
        if (rowData?.yacht_body_type) {
          const y_b_type = rowData?.yacht_body_type;
          const y_b_topup = rowData?.yb_topup.includes(",") ? rowData?.yb_topup.split(",") : [rowData?.yb_topup];
          for (let j = 0; j < y_b_type.length; j++) {
            bodyArr.push({
              _id: y_b_type[j]["_id"],
              yacht_body_type: y_b_type[j]["yacht_body_type"],
              y_b_topup: y_b_topup[j] ? y_b_topup[j].trim() : 0,
            });
          }
          payload["yacht_body_type_or_topup"] = bodyArr;
        }
        if (rowData?.last_year_policy_type) {
          let last_year_policy_type_or_arr = [];
          const last_year_policy_type = rowData?.last_year_policy_type;
          const last_year_policy_type_topup =
            rowData?.last_year_policy_type_topup?.includes(",") ?
              rowData?.last_year_policy_type_topup.split(",") : [rowData?.last_year_policy_type_topup];

          for (let j = 0; j < last_year_policy_type.length; j++) {
            last_year_policy_type_or_arr.push({
              _id: last_year_policy_type[j]["_id"],
              last_year_policy_type:
                last_year_policy_type[j]["policy_type_name"],
              last_year_policy_type_topup: last_year_policy_type_topup[j] ?
                last_year_policy_type_topup[j]?.trim().replace(/\s+/g, "") : 0,
            });
          }
          payload["last_year_policy_type_or_topup"] = last_year_policy_type_or_arr

        }
        if (rowData?.measurement_value) {
          // const measurement = rowData?.measurement.includes(",") ?
          //   rowData?.measurement.split(",") : [rowData?.measurement];
          const measurement_value = rowData?.measurement_value.includes(",") ?
            rowData?.measurement_value.split(",") : [rowData?.measurement_value];
          const measurement_topup = rowData?.m_v_topup.includes(",") ?
            rowData?.m_v_topup.split(",") : [rowData?.m_v_topup];
          for (let j = 0; j < measurement_value.length; j++) {
            // const measurement_type = measurement[j];
            const measurement_value_Range = measurement_value[j].split("-");
            const Min =
              measurement_value_Range.length > 0
                ? parseInt(measurement_value_Range[0].trim())
                : 0;
            const Max =
              measurement_value_Range.length > 1
                ? parseInt(measurement_value_Range[1].trim())
                : Min;

            measureValueArr.push({
              // measurement_type,
              Min,
              Max,
              measurement_topup: measurement_topup[j]
                ? measurement_topup[j].trim()
                : 0,
            });
          }
          payload["measurement_value_or_topup"] = measureValueArr;
        }
      }



      if (rowData?.den_ten_value_range && rowData?.policy_type == "TPL") {
        const den_ten_value = rowData?.den_ten_value_range?.includes(",") ?
          rowData?.den_ten_value_range.split(",") : [rowData?.den_ten_value_range];
        const den_ten_value_topup = rowData?.den_tender_topup?.includes(",") ?
          rowData?.den_tender_topup.split(",") : [rowData?.den_tender_topup];
        for (let j = 0; j < den_ten_value.length; j++) {
          const den_ten_value_Range = den_ten_value[j]?.split("-");
          const dinghy_tender_Min =
            den_ten_value_Range.length > 0
              ? parseInt(den_ten_value_Range[0].trim())
              : 0;
          const dinghy_tender_Max =
            den_ten_value_Range.length > 1
              ? parseInt(den_ten_value_Range[1].trim())
              : dinghy_tender_Min;

          dingthTenderpArr.push({
            dinghy_tender_Min,
            dinghy_tender_Max,
            dinghy_or_tender_value_topup: den_ten_value_topup[j]
              ? den_ten_value_topup[j].trim()
              : 0,
          });
        }
        payload["dinghy_ten_value_range_or_topup"] = dingthTenderpArr;
      } else {
        const den_ten_value = rowData?.den_ten_value_range?.includes(",") ?
          rowData?.den_ten_value_range.split(",") : [rowData?.den_ten_value_range];
        const den_ten_value_topup = rowData?.den_tender_topup?.includes(",") ?
          rowData?.den_tender_topup.split(",") : [rowData?.den_tender_topup];
        const den_ten_value_rate = rowData?.din_ten_val_rate?.includes(",") ?
          rowData?.din_ten_val_rate.split(",") : [rowData?.din_ten_val_rate];
        for (let j = 0; j < den_ten_value.length; j++) {
          const den_ten_value_Range = den_ten_value[j]?.split("-");
          const dinghy_tender_Min =
            den_ten_value_Range.length > 0
              ? parseInt(den_ten_value_Range[0].trim())
              : 0;
          const dinghy_tender_Max =
            den_ten_value_Range.length > 1
              ? parseInt(den_ten_value_Range[1].trim())
              : dinghy_tender_Min;

          dingthTenderpArr.push({
            dinghy_tender_Min,
            dinghy_tender_Max,
            dinghy_or_tender_value_topup: den_ten_value_topup[j]
              ? den_ten_value_topup[j].trim()
              : 0,
            rate: den_ten_value_rate[j] ? den_ten_value_rate[j] : 0
          });
        }
        payload["dinghy_ten_value_range_or_topup"] = dingthTenderpArr;
      }



      if (rowData?.outboard_value_range && rowData?.policy_type == "TPL") {

        const outboard_value = rowData?.outboard_value_range.includes(",") ?
          rowData?.outboard_value_range.split(",") : [rowData?.outboard_value_range];
        const outboard_value_topup = rowData?.outboard_value_range_topup.includes(",") ?
          rowData?.outboard_value_range_topup.split(",") : [rowData?.outboard_value_range_topup];
        for (let j = 0; j < outboard_value.length; j++) {
          const outboard_value_Range = outboard_value[j]?.split("-");
          const outboard_value_range_Min =
            outboard_value_Range.length > 0
              ? parseInt(outboard_value_Range[0].trim())
              : 0;
          const outboard_value_range_Max =
            outboard_value_Range.length > 1
              ? parseInt(outboard_value_Range[1].trim())
              : outboard_value_range_Min;

          outBoardArr.push({
            outboard_value_range_Min,
            outboard_value_range_Max,
            outboard_value_range_topup: outboard_value_topup[j]
              ? outboard_value_topup[j].trim()
              : 0,
          });
        }
        payload["outboard_value_range_or_topup"] = outBoardArr;
      } else {
        const outboard_value = rowData?.outboard_value_range.includes(",") ?
          rowData?.outboard_value_range.split(",") : [rowData?.outboard_value_range];
        const outboard_value_topup = rowData?.outboard_value_range_topup.includes(",") ?
          rowData?.outboard_value_range_topup.split(",") : [rowData?.outboard_value_range_topup];
        const outboard_range_rate = rowData?.outboard_range_rate.includes(",") ?
          rowData?.outboard_range_rate.split(",") : [rowData?.outboard_range_rate];
        for (let j = 0; j < outboard_value.length; j++) {
          const outboard_value_Range = outboard_value[j]?.split("-");
          const outboard_value_range_Min =
            outboard_value_Range.length > 0
              ? parseInt(outboard_value_Range[0].trim())
              : 0;
          const outboard_value_range_Max =
            outboard_value_Range.length > 1
              ? parseInt(outboard_value_Range[1].trim())
              : outboard_value_range_Min;

          outBoardArr.push({
            outboard_value_range_Min,
            outboard_value_range_Max,
            outboard_value_range_topup: outboard_value_topup[j]
              ? outboard_value_topup[j].trim()
              : 0,
            rate: outboard_range_rate[j] ? outboard_range_rate[j] : 0
          });
        }
        payload["outboard_value_range_or_topup"] = outBoardArr;
      }



      if (rowData?.personal_eff_cash && rowData?.policy_type == "TPL") {
        const personal_effect_cash = rowData?.personal_eff_cash.includes(",") ?
          rowData?.personal_eff_cash.split(",") : [rowData?.personal_eff_cash];
        const personal_effect_cash_topup = rowData?.personal_eff_cash_topup.includes(",") ?
          rowData?.personal_eff_cash_topup.split(",") : [rowData?.personal_eff_cash_topup];

        for (let j = 0; j < personal_effect_cash.length; j++) {
          const personal_effect_cash_Range = personal_effect_cash[j]?.split("-");
          const personal_effect_cash_range_Min =
            personal_effect_cash_Range.length > 0
              ? parseInt(personal_effect_cash_Range[0].trim())
              : 0;
          const personal_effect_cash_range_Max =
            personal_effect_cash_Range.length > 1
              ? parseInt(personal_effect_cash_Range[1].trim())
              : personal_effect_cash_range_Min;

          personalEffCashArr.push({
            personal_effect_cash_range_Min,
            personal_effect_cash_range_Max,
            personal_effect_cash_range_topup: personal_effect_cash_topup[j]
              ? personal_effect_cash_topup[j].trim()
              : 0
          });
        }
        payload["personal_eff_cash_or_topup"] = personalEffCashArr;

      } else {
        const personal_effect_cash = rowData?.personal_eff_cash.includes(",") ?
          rowData?.personal_eff_cash.split(",") : [rowData?.personal_eff_cash];
        const personal_effect_cash_topup = rowData?.personal_eff_cash_topup.includes(",") ?
          rowData?.personal_eff_cash_topup.split(",") : [rowData?.personal_eff_cash_topup];
        const personal_effect_rate = rowData?.personal_eff_rate.includes(",") ?
          rowData?.personal_eff_rate.split(",") : [rowData?.personal_eff_rate];
        for (let j = 0; j < personal_effect_cash.length; j++) {
          const personal_effect_cash_Range = personal_effect_cash[j]?.split("-");
          const personal_effect_cash_range_Min =
            personal_effect_cash_Range.length > 0
              ? parseInt(personal_effect_cash_Range[0].trim())
              : 0;
          const personal_effect_cash_range_Max =
            personal_effect_cash_Range.length > 1
              ? parseInt(personal_effect_cash_Range[1].trim())
              : personal_effect_cash_range_Min;

          personalEffCashArr.push({
            personal_effect_cash_range_Min,
            personal_effect_cash_range_Max,
            personal_effect_cash_range_topup: personal_effect_cash_topup[j]
              ? personal_effect_cash_topup[j].trim()
              : 0,
            rate: personal_effect_rate[j] ? personal_effect_rate[j] : 0
          });
        }
        payload["personal_eff_cash_or_topup"] = personalEffCashArr;
      }

      if (rowData?.trailer && rowData?.policy_type == "TPL") {

        const trailer = rowData?.trailer.includes(",") ?
          rowData?.trailer.split(",") : [rowData?.trailer];
        const trailer_topup = rowData?.trailer_topup.includes(",") ?
          rowData?.trailer_topup.split(",") : [rowData?.trailer_topup];
        for (let j = 0; j < trailer.length; j++) {
          const trailer_Range = trailer[j]?.split("-");
          const trailer_Min =
            trailer_Range.length > 0 ? parseInt(trailer_Range[0].trim()) : 0;
          const trailer_Max =
            trailer_Range.length > 1
              ? parseInt(trailer_Range[1].trim())
              : trailer_Min;

          trailerArr.push({
            trailer_Min,
            trailer_Max,
            trailer_topup: trailer_topup[j] ? trailer_topup[j].trim() : 0,
          });
        }
        payload["trailer_or_topup"] = trailerArr;
      } else {
        const trailer = rowData?.trailer.includes(",") ?
          rowData?.trailer.split(",") : [rowData?.trailer];
        const trailer_topup = rowData?.trailer_topup.includes(",") ?
          rowData?.trailer_topup.split(",") : [rowData?.trailer_topup];
        const trailer_rate = rowData?.trailer_rate.includes(",") ?
          rowData?.trailer_rate.split(",") : [rowData?.trailer_rate];
        for (let j = 0; j < trailer.length; j++) {
          const trailer_Range = trailer[j]?.split("-");
          const trailer_Min =
            trailer_Range.length > 0 ? parseInt(trailer_Range[0].trim()) : 0;
          const trailer_Max =
            trailer_Range.length > 1
              ? parseInt(trailer_Range[1].trim())
              : trailer_Min;

          trailerArr.push({
            trailer_Min,
            trailer_Max,
            trailer_topup: trailer_topup[j] ? trailer_topup[j].trim() : 0,
            rate: trailer_rate[j] ? trailer_rate[j].trim() : 0,
          });
        }
        payload["trailer_or_topup"] = trailerArr;
      }



      if (rowData?.claim_years) {
        const no_claim_years = rowData?.claim_years.includes(",") ?
          rowData?.claim_years.split(",") : [rowData?.claim_years];
        const no_claim_years_discount = rowData?.claim_years_disc.includes(",") ?
          rowData?.claim_years_disc.split(",") : [rowData?.claim_years_disc];
        for (let j = 0; j < no_claim_years.length; j++) {
          noclaimyearArr.push({
            claimyears: no_claim_years[j] ? no_claim_years[j].trim() : "",
            claimyeardisc: no_claim_years_discount[j]
              ? no_claim_years_discount[j].trim()
              : 0,
          });
        }
        payload["no_claim_years"] = noclaimyearArr;
      }



      if (rowData?.pass_capacity) {
        const pass_capacity = rowData?.pass_capacity.includes(",") ?
          rowData?.pass_capacity.split(",") : [rowData?.pass_capacity];
        const pass_capacity_topup = rowData?.pass_capacity_topup.includes(",") ?
          rowData?.pass_capacity_topup.split(",") : [rowData?.pass_capacity_topup];
        for (let j = 0; j < pass_capacity.length; j++) {
          const pass_capacity_Range = pass_capacity[j]?.split("-");
          const passenger_capacity_Min =
            pass_capacity_Range.length > 0
              ? parseInt(pass_capacity_Range[0].trim())
              : 0;
          const passenger_capacity_Max =
            pass_capacity_Range.length > 1
              ? parseInt(pass_capacity_Range[1].trim())
              : passenger_capacity_Min;

          passcapacityArr.push({
            passenger_capacity_Min,
            passenger_capacity_Max,
            passenger_capacity_topup: pass_capacity_topup[j]
              ? pass_capacity_topup[j].trim()
              : 0,
          });
        }
        payload["passenger_capacity_or_topup"] = passcapacityArr;
      }



      if (rowData?.crew_capacity) {
        const crew_capacity = rowData?.crew_capacity.includes(",") ?
          rowData?.crew_capacity.split(",") : [rowData?.crew_capacity];
        const crew_capacity_topup = rowData?.crew_capacity_topup.includes(",") ?
          rowData?.crew_capacity_topup.split(",") : [rowData?.crew_capacity_topup];
        for (let j = 0; j < crew_capacity.length; j++) {
          const crew_capacity_Range = crew_capacity[j]?.split("-");
          const crew_capacity_Min =
            crew_capacity_Range.length > 0
              ? parseInt(crew_capacity_Range[0].trim())
              : 0;
          const crew_capacity_Max =
            crew_capacity_Range.length > 1
              ? parseInt(crew_capacity_Range[1].trim())
              : crew_capacity_Min;

          crewCapacityArr.push({
            crew_capacity_Min,
            crew_capacity_Max,
            crew_capacity_topup: crew_capacity_topup[j]
              ? crew_capacity_topup[j].trim()
              : 0,
          });
        }
        payload["crew_capacity_or_topup"] = crewCapacityArr;
      }


      if (rowData?.add_op_con_desc) {
        const add_op_con_desc = rowData?.add_op_con_desc.includes(",") ?
          rowData?.add_op_con_desc.split(",") : [rowData?.add_op_con_desc];
        const add_op_con_desc_topup = rowData?.add_op_con_desc_topup.includes(",") ?
          rowData?.add_op_con_desc_topup.split(",") : [rowData?.add_op_con_desc_topup];
        const vat = rowData?.vat_able.includes(",") ?
          rowData?.vat_able.split(",") : [rowData?.vat_able];
        for (let j = 0; j < add_op_con_desc.length; j++) {
          adOpConArr.push({
            add_op_con_desc: add_op_con_desc[j] ? add_op_con_desc[j].trim() : "",
            add_op_con_desc_topup: add_op_con_desc_topup[j]
              ? add_op_con_desc_topup[j].trim()
              : 0,
            vat: vat[j] ? vat[j] : "",
          });
        }
        payload["add_op_con_desc_or_topup"] = adOpConArr;
      }
      if (rowData?.jdv_commission) {
        payload["jdv_commission"] = rowData?.jdv_commission;
      }
      if (rowData?.plan_name) {
        payload["plan_name"] = rowData?.plan_name;
      }
      if (rowData?.company_id) {
        payload["company_id"] = rowData?.company_id;
      }
      if (rowData?.plan_category_id) {
        payload["plan_category_id"] = rowData?.plan_category_id;
      }
      if (rowData?.nature_of_plan_id) {
        payload["nature_of_plan_id"] = rowData?.nature_of_plan_id;
      }
      if (rowData?.initial_rate) {
        payload["initial_rate"] = rowData?.initial_rate;
      }
      if (rowData?.discount_rate) {
        payload["discount_rate"] = rowData?.discount_rate;
      }

      if (rowData?.location) {
        payload["location"] = rowData?.location;
      }
      // console.log("payload object", payload)
      const result = await yacht_plan.findOneAndUpdate(
        { _id: id },
        {
          $set: payload,
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
      console.log(error)
      res.send(error);
    }
  },
  updateStatusYachtPlan: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.params.status;
      let result = await yacht_plan.findByIdAndUpdate(id, { status: status });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Yacht Plan Deactivated Successfully!",
          });
        } else {
          res.json({
            status: 200,
            message: "Yacht Plan Activated Successfully!",
          });
        }
      } else {
        res.json({ status: 400, message: "Yacht Plan Not Deactivated!" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  yacht_plan_details: async (req, res) => {
    try {
      const id = req.params.id;
      const yacht_plan_data = await yacht_plan.findById(id);
      res.json({ status: 200, message: "Data Found", data: yacht_plan_data });
    } catch (error) {
      res.send(error);
    }
  },
  add_bulk_Yacht_plan: async (req, res) => {
    try {
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

      for (let row of xlData) {
        let payload = {};
        let planCategoryId;
        let nature_of_plan_id;
        let policy_type_id;
        let company_id;
        let planforArr = [];
        let planfor_value = row["Plan For"];
        if (planfor_value.includes(",")) {
          let planfor_name = planfor_value.split(",");
          for (let i = 0; i < planfor_name.length; i++) {
            let planfor_id = await Plan_for.findOne({
              plan_for_name: planfor_name[i],
            });
            let planforid = planfor_id?._id?.toString();

            planforArr.push({
              _id: planforid,
              plan_for_name: planfor_name[i],
            });
          }
        } else {
          let planfor_id = await Plan_for.findOne({
            plan_for_name: planfor_value,
          });
          let planforid = planfor_id?._id?.toString();

          planforArr.push({
            _id: planforid,
            plan_for_name: planfor_value,
          });
        }

        let business_typeArr = [];
        let business_type_value = row["Business Type"];
        if (business_type_value.includes(",")) {
          let business_type_name = business_type_value.split(",");
          for (let i = 0; i < business_type_name.length; i++) {
            let business_type_id = await Business_type.findOne({
              business_type_name: business_type_name[i],
            });
            let business_typeid = business_type_id?._id?.toString();

            business_typeArr.push({
              _id: business_typeid,
              business_type_name: business_type_name[i],
            });
          }
        } else {
          let business_type_id = await Business_type.findOne({
            business_type_name: business_type_value,
          });
          let business_typeid = business_type_id?._id?.toString();

          business_typeArr.push({
            _id: business_typeid,
            business_type_name: business_type_value,
          });
        }

        let yacht_body_type_or_topup_arr = [];
        let yachtbT_value = row["Yacht Body Type"];
        let yachbT_value_topup = row["Topup (Yacht Body Type)"].toString();
        if (yachtbT_value.includes(",") && yachbT_value_topup.includes(",")) {
          yachtbT_value = yachtbT_value.split(",");
          yachbT_value_topup = yachbT_value_topup.split(",");
          for (let i = 0; i < yachtbT_value.length; i++) {
            let yb_type_id = await Yacht_body_type_list.findOne({
              yacht_body_type: yachtbT_value[i],
            });
            let yb_typeid = yb_type_id?._id?.toString();
            yacht_body_type_or_topup_arr.push({
              _id: yb_typeid,
              yacht_body_type: yachtbT_value[i],
              y_b_topup: yachbT_value_topup[i]
                ? yachbT_value_topup[i].trim()
                : "",
            });
          }
        } else {
          let yb_type_id = await Yacht_body_type_list.findOne({
            yacht_body_type: yachtbT_value,
          });
          let yb_typeid = yb_type_id?._id?.toString();
          yacht_body_type_or_topup_arr.push({
            _id: yb_typeid,
            yacht_body_type: yachtbT_value,
            y_b_topup: yachbT_value_topup ? yachbT_value_topup.trim() : "",
          });
        }

        let yacht_hull_material_or_topup_arr = [];
        let hull_material_value = row["Hull Material"];
        let hull_material_value_topup = row["Topup (Hull Material)"].toString();
        if (
          hull_material_value.includes(",") &&
          hull_material_value_topup.includes(",")
        ) {
          hull_material_value = hull_material_value.split(",");
          hull_material_value_topup = hull_material_value_topup.split(",");
          for (let i = 0; i < hull_material_value.length; i++) {
            let hull_material_id = await Yacht_hull_material_list.findOne({
              yacht_hull_material: hull_material_value[i],
            });
            let hull_material_typeid = hull_material_id?._id?.toString();
            yacht_hull_material_or_topup_arr.push({
              _id: hull_material_typeid,
              yacht_hull_material: hull_material_value[i],
              hull_material_topup: hull_material_value_topup[i]
                ? hull_material_value_topup[i].trim()
                : "",
            });
          }
        } else {
          let hull_material_id = await Body_type.findOne({
            yacht_hull_material: hull_material_value,
          });
          let hull_materialid = hull_material_id?._id?.toString();
          yacht_hull_material_or_topup_arr.push({
            _id: hull_materialid,
            yacht_hull_material: hull_material_value,
            hull_material_topup: hull_material_value_topup
              ? hull_material_value_topup.trim()
              : "",
          });
        }

        let yacht_horsePower_or_topup_arr = [];
        let horsePower_value = row["HORSEPOWER"];
        let horsePower_value_topup = row["Topup (HORSEPOWER)"].toString();
        if (
          horsePower_value.includes(",") &&
          horsePower_value_topup.includes(",")
        ) {
          horsePower_value = horsePower_value.split(",");
          horsePower_value_topup = horsePower_value_topup.split(",");
          for (let i = 0; i < horsePower_value.length; i++) {
            let horsePower_id = await Yacht_horsepower_list.findOne({
              yacht_horsepower_type: horsePower_value[i],
            });
            let horsePowerid = horsePower_id?._id?.toString();
            yacht_horsePower_or_topup_arr.push({
              _id: horsePowerid,
              yacht_horsepower_type: horsePower_value[i],
              horse_power_topup: horsePower_value_topup[i]
                ? horsePower_value_topup[i].trim()
                : "",
            });
          }
        } else {
          let horsePower_id = await Yacht_horsepower_list.findOne({
            yacht_horsepower_type: horsePower_value,
          });
          let horsePowerid = horsePower_id?._id?.toString();
          yacht_horsePower_or_topup_arr.push({
            _id: horsePowerid,
            yacht_horsepower_type: horsePower_value,
            horse_power_topup: horsePower_value_topup
              ? horsePower_value_topup.trim()
              : "",
          });
        }

        let yacht_engine_type_or_topup_arr = [];
        let engine_type_value = row["ENGINE TYPE"];
        let engine_type_value_topup = row["Topup (ENGINE TYPE)"].toString();
        if (
          engine_type_value.includes(",") &&
          engine_type_value_topup.includes(",")
        ) {
          engine_type_value = engine_type_value.split(",");
          engine_type_value_topup = engine_type_value_topup.split(",");
          for (let i = 0; i < engine_type_value.length; i++) {
            let engine_type_id = await Yacht_engine_type_list.findOne({
              yacht_engine_type: engine_type_value[i],
            });
            let engine_typeid = engine_type_id?._id?.toString();
            yacht_engine_type_or_topup_arr.push({
              _id: engine_typeid,
              yacht_engine_type: engine_type_value[i],
              engine_type_topup: engine_type_value_topup[i]
                ? engine_type_value_topup[i].trim()
                : "",
            });
          }
        } else {
          let engine_type_id = await Yacht_engine_type_list.findOne({
            yacht_engine_type: engine_type_value,
          });
          let engine_typeid = engine_type_id?._id?.toString();
          yacht_engine_type_or_topup_arr.push({
            _id: engine_typeid,
            yacht_engine_type: engine_type_value,
            engine_type_topup: engine_type_value_topup
              ? engine_type_value_topup.trim()
              : "",
          });
        }

        let measureValueArr = [];
        let measurement = row["MEASUREMENT"];
        let measurement_value = row["VALUE"].toString();
        let measurement_topup = row["Topup (MEASUREMENT)"].toString();

        if (
          measurement.includes(",") &&
          measurement_value.includes(",") &&
          measurement_topup.includes(",")
        ) {
          measurement = measurement.split(",");
          measurement_topup = measurement_topup.split(",");
          for (let j = 0; j < measurement.length; j++) {
            const measurement_value_Range = measurement_value[j].split("-");
            const Min =
              measurement_value_Range.length > 0
                ? parseInt(measurement_value_Range[0].trim())
                : 0;
            const Max =
              measurement_value_Range.length > 1
                ? parseInt(measurement_value_Range[1].trim())
                : Min;

            measureValueArr.push({
              measurement_type: measurement[j],
              Min,
              Max,
              measurement_topup: measurement_topup[j]
                ? measurement_topup[j].trim()
                : "",
            });
          }
        }

        let yacht_speed_knots_or_topup_arr = [];
        let speed_knots_value = row["Speed Knots"];
        let speed_knots_value_topup = row["Topup (Speed Knots)"].toString();
        if (
          speed_knots_value.includes(",") &&
          speed_knots_value_topup.includes(",")
        ) {
          speed_knots_value = speed_knots_value.split(",");
          speed_knots_value_topup = speed_knots_value_topup.split(",");
          for (let i = 0; i < speed_knots_value.length; i++) {
            let speed_knots_id = await Yacht_speed_knots_list.findOne({
              yacht_speed_knot_type: speed_knots_value[i],
            });
            let speed_knotsid = speed_knots_id?._id?.toString();
            yacht_speed_knots_or_topup_arr.push({
              _id: speed_knotsid,
              yacht_speed_knot_type: speed_knots_value[i],
              speed_knot_type_topup: speed_knots_value_topup[i]
                ? speed_knots_value_topup[i].trim()
                : "",
            });
          }
        } else {
          let speed_knots_id = await Yacht_speed_knots_list.findOne({
            yacht_speed_knot_type: speed_knots_value,
          });
          let speed_knotsid = speed_knots_id?._id?.toString();
          yacht_speed_knots_or_topup_arr.push({
            _id: speed_knotsid,
            yacht_speed_knot_type: speed_knots_value,
            speed_knot_type_topup: speed_knots_value_topup
              ? speed_knots_value_topup.trim()
              : "",
          });
        }

        let driveExp_or_topup_arr = [];
        let driveExp = row["Driving Experience"];
        let driveExp_topup = row["Topup (Driving Experience)"].toString();
        if (driveExp.includes(",") && driveExp_topup.includes(",")) {
          driveExp = driveExp.split(",");
          driveExp_topup = driveExp_topup.split(",");
          for (let i = 0; i < driveExp.length; i++) {
            let driveExps = driveExp[i].split("-");
            const drive_expMin =
              driveExps.length > 0 ? parseInt(driveExps[0].trim()) : 0;
            const drive_expMax =
              driveExps.length > 1
                ? parseInt(driveExps[1].trim())
                : drive_expMin;
            driveExp_or_topup_arr.push({
              drive_expMin,
              drive_expMax,
              drive_experience_topup: driveExp_topup[i]
                ? driveExp_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < driveExp.length; i++) {
            let driveExps = driveExp[i].split("-");
            const drive_expMin =
              driveExps.length > 0 ? parseInt(driveExps[0].trim()) : 0;
            const drive_expMax =
              driveExps.length > 1
                ? parseInt(driveExps[1].trim())
                : drive_expMin;
            driveExp_or_topup_arr.push({
              drive_expMin,
              drive_expMax,
              drive_experience_topup: driveExp_topup[i]
                ? driveExp_topup[i].trim()
                : "",
            });
          }
        }

        let homeDriveExp_or_topup_arr = [];
        let homeDriveExp_value = row["Home Country Driving Experience"];
        let homeDriveExp_topup =
          row["Topup (Home Country Driving Experience)"].toString();
        if (
          homeDriveExp_value.includes(",") &&
          homeDriveExp_topup.includes(",")
        ) {
          homeDriveExp_value = homeDriveExp_value.split(",");
          homeDriveExp_topup = homeDriveExp_topup.split(",");
          for (let i = 0; i < homeDriveExp_value.length; i++) {
            let homeDriveExp_values = homeDriveExp_value[i].split("-");
            const country_drive_expMin =
              homeDriveExp_values.length > 0
                ? parseInt(homeDriveExp_values[0].trim())
                : 0;
            const country_drive_expMax =
              homeDriveExp_values.length > 1
                ? parseInt(homeDriveExp_values[1].trim())
                : country_drive_expMin;
            homeDriveExp_or_topup_arr.push({
              country_drive_expMin,
              country_drive_expMax,
              country_drive_experience_topup: homeDriveExp_topup[i]
                ? homeDriveExp_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < homeDriveExp_value.length; i++) {
            let homeDriveExp_values = homeDriveExp_value[i].split("-");
            const country_drive_expMin =
              homeDriveExp_values.length > 0
                ? parseInt(homeDriveExp_values[0].trim())
                : 0;
            const country_drive_expMax =
              homeDriveExp_values.length > 1
                ? parseInt(homeDriveExp_values[1].trim())
                : country_drive_expMin;
            homeDriveExp_or_topup_arr.push({
              country_drive_expMin,
              country_drive_expMax,
              country_drive_experience_topup: homeDriveExp_topup[i]
                ? homeDriveExp_topup[i].trim()
                : "",
            });
          }
        }
        let hullEqpValue_or_topup_arr = [];
        let hullEqpValue_value = row["HULL AND EQUIPMENT VALUE RANGE"];
        let hullEqpValue_topup =
          row["Topup (HULL AND EQUIPMENT VALUE RANGE)"].toString();
        if (
          hullEqpValue_value.includes(",") &&
          hullEqpValue_topup.includes(",")
        ) {
          hullEqpValue_value = hullEqpValue_value.split(",");
          hullEqpValue_topup = hullEqpValue_topup.split(",");
          for (let i = 0; i < hullEqpValue_value.length; i++) {
            let hullEqpValue_values = hullEqpValue_value[i].split("-");
            const hull_equipment_Min =
              hullEqpValue_values.length > 0
                ? parseInt(hullEqpValue_values[0].trim())
                : 0;
            const hull_equipment_Max =
              hullEqpValue_values.length > 1
                ? parseInt(hullEqpValue_values[1].trim())
                : hull_equipment_Min;
            hullEqpValue_or_topup_arr.push({
              hull_equipment_Min,
              hull_equipment_Max,
              hull_equipment_value_range_topup: hullEqpValue_topup[i]
                ? hullEqpValue_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < hullEqpValue_value.length; i++) {
            let hullEqpValue_values = hullEqpValue_value[i].split("-");
            const hull_equipment_Min =
              hullEqpValue_values.length > 0
                ? parseInt(hullEqpValue_values[0].trim())
                : 0;
            const hull_equipment_Max =
              hullEqpValue_values.length > 1
                ? parseInt(hullEqpValue_values[1].trim())
                : hull_equipment_Min;
            hullEqpValue_or_topup_arr.push({
              hull_equipment_Min,
              hull_equipment_Max,
              hull_equipment_value_range_topup: hullEqpValue_topup[i]
                ? hullEqpValue_topup[i].trim()
                : "",
            });
          }
        }

        let dinghyTender_or_topup_arr = [];
        let dinghyTender_value = row["DINGHY/TENDER VALUE RANGE"];
        let dinghyTender_topup =
          row["Topup (DINGHY/TENDER VALUE RANGE)"].toString();
        if (
          dinghyTender_value.includes(",") &&
          dinghyTender_topup.includes(",")
        ) {
          dinghyTender_value = dinghyTender_value.split(",");
          dinghyTender_topup = dinghyTender_topup.split(",");
          for (let i = 0; i < dinghyTender_value.length; i++) {
            let dinghyTender_values = dinghyTender_value[i].split("-");
            const dinghy_tender_Min =
              dinghyTender_values.length > 0
                ? parseInt(dinghyTender_values[0].trim())
                : 0;
            const dinghy_tender_Max =
              dinghyTender_values.length > 1
                ? parseInt(dinghyTender_values[1].trim())
                : dinghy_tender_Min;
            dinghyTender_or_topup_arr.push({
              dinghy_tender_Min,
              dinghy_tender_Max,
              dinghy_or_tender_value_topup: dinghyTender_topup[i]
                ? dinghyTender_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < dinghyTender_value.length; i++) {
            let dinghyTender_values = dinghyTender_value[i].split("-");
            const dinghy_tender_Min =
              dinghyTender_values.length > 0
                ? parseInt(dinghyTender_values[0].trim())
                : 0;
            const dinghy_tender_Max =
              dinghyTender_values.length > 1
                ? parseInt(dinghyTender_values[1].trim())
                : dinghy_tender_Min;
            dinghyTender_or_topup_arr.push({
              dinghy_tender_Min,
              dinghy_tender_Max,
              dinghy_or_tender_value_topup: dinghyTender_topup[i]
                ? dinghyTender_topup[i].trim()
                : "",
            });
          }
        }

        let outboard_or_topup_arr = [];
        let outboard_value = row["Outboard value range"];
        let outboard_topup = row["Topup (Outboard value range)"].toString();
        if (outboard_value.includes(",") && outboard_topup.includes(",")) {
          outboard_value = outboard_value.split(",");
          outboard_topup = outboard_topup.split(",");
          for (let i = 0; i < outboard_value.length; i++) {
            let outboard_values = outboard_value[i].split("-");
            const outboard_value_range_Min =
              outboard_values.length > 0
                ? parseInt(outboard_values[0].trim())
                : 0;
            const outboard_value_range_Max =
              outboard_values.length > 1
                ? parseInt(outboard_values[1].trim())
                : outboard_value_range_Min;
            outboard_or_topup_arr.push({
              outboard_value_range_Min,
              outboard_value_range_Max,
              outboard_value_range_topup: outboard_topup[i]
                ? outboard_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < outboard_value.length; i++) {
            let outboard_values = outboard_value[i].split("-");
            const outboard_value_range_Min =
              outboard_values.length > 0
                ? parseInt(outboard_values[0].trim())
                : 0;
            const outboard_value_range_Max =
              outboard_values.length > 1
                ? parseInt(outboard_values[1].trim())
                : outboard_value_range_Min;
            outboard_or_topup_arr.push({
              outboard_value_range_Min,
              outboard_value_range_Max,
              outboard_value_range_topup: outboard_topup[i]
                ? outboard_topup[i].trim()
                : "",
            });
          }
        }

        let personalEff_or_topup_arr = [];
        let personalEff_value = row["Personal Effects including Cash"];
        let personalEff_topup =
          row["Topup (Personal Effects including Cash)"].toString();
        if (
          personalEff_value.includes(",") &&
          personalEff_topup.includes(",")
        ) {
          personalEff_value = personalEff_value.split(",");
          personalEff_topup = personalEff_topup.split(",");
          for (let i = 0; i < personalEff_value.length; i++) {
            let personalEff_values = personalEff_value[i].split("-");
            const personal_effect_cash_range_Min =
              personalEff_values.length > 0
                ? parseInt(personalEff_values[0].trim())
                : 0;
            const personal_effect_cash_range_Max =
              personalEff_values.length > 1
                ? parseInt(personalEff_values[1].trim())
                : personal_effect_cash_range_Min;
            personalEff_or_topup_arr.push({
              personal_effect_cash_range_Min,
              personal_effect_cash_range_Max,
              personal_effect_cash_range_topup: personalEff_topup[i]
                ? personalEff_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < personalEff_value.length; i++) {
            let personalEff_values = personalEff_value[i].split("-");
            const personal_effect_cash_range_Min =
              personalEff_values.length > 0
                ? parseInt(personalEff_values[0].trim())
                : 0;
            const personal_effect_cash_range_Max =
              personalEff_values.length > 1
                ? parseInt(personalEff_values[1].trim())
                : personal_effect_cash_range_Min;
            personalEff_or_topup_arr.push({
              personal_effect_cash_range_Min,
              personal_effect_cash_range_Max,
              personal_effect_cash_range_topup: personalEff_topup[i]
                ? personalEff_topup[i].trim()
                : "",
            });
          }
        }

        let trailer_or_topup_arr = [];
        let trailer_value = row["Trailer"];
        let trailer_topup = row["Topup (Trailer)"].toString();
        if (trailer_value.includes(",") && trailer_topup.includes(",")) {
          trailer_value = trailer_value.split(",");
          trailer_topup = trailer_topup.split(",");
          for (let i = 0; i < trailer_value.length; i++) {
            let trailer_values = trailer_value[i].split("-");
            const trailer_Min =
              trailer_values.length > 0
                ? parseInt(trailer_values[0].trim())
                : 0;
            const trailer_Max =
              trailer_values.length > 1
                ? parseInt(trailer_values[1].trim())
                : trailer_Min;
            trailer_or_topup_arr.push({
              trailer_Min,
              trailer_Max,
              trailer_topup: trailer_topup[i] ? trailer_topup[i].trim() : "",
            });
          }
        } else {
          for (let i = 0; i < trailer_value.length; i++) {
            let trailer_values = trailer_value[i].split("-");
            const trailer_Min =
              trailer_values.length > 0
                ? parseInt(trailer_values[0].trim())
                : 0;
            const trailer_Max =
              trailer_values.length > 1
                ? parseInt(trailer_values[1].trim())
                : trailer_Min;
            trailer_or_topup_arr.push({
              trailer_Min,
              trailer_Max,
              trailer_topup: trailer_topup[i] ? trailer_topup[i].trim() : "",
            });
          }
        }
        let claimyears_or_topup = [];
        let claimArray = row["No Claim Year"];
        let claimDiscountArray = row["No Claim Discount"].toString();
        if (claimArray.includes(",") && claimDiscountArray.includes(",")) {
          claimArray = claimArray.split(",");
          claimDiscountArray = claimDiscountArray.split(",");
          for (let i = 0; i < claimArray.length; i++) {
            claimyears_or_topup.push({
              claimyears: claimArray[i],
              claimyeardisc: claimDiscountArray[i],
            });
          }
        } else {
          claimyears_or_topup.push({
            claimyears: claimArray,
            claimyeardisc: claimDiscountArray,
          });
        }

        let passCap_or_topup_arr = [];
        let passCap_value = row["PASSENGER CAPACITY"];
        let passCap_topup = row["Topup (PASSENGER CAPACITY)"].toString();
        if (passCap_value.includes(",") && passCap_topup.includes(",")) {
          passCap_value = passCap_value.split(",");
          passCap_topup = passCap_topup.split(",");
          for (let i = 0; i < passCap_value.length; i++) {
            let passCap_values = passCap_value[i].split("-");
            const passenger_capacity_Min =
              passCap_values.length > 0
                ? parseInt(passCap_values[0].trim())
                : 0;
            const passenger_capacity_Max =
              passCap_values.length > 1
                ? parseInt(passCap_values[1].trim())
                : passenger_capacity_Min;
            passCap_or_topup_arr.push({
              passenger_capacity_Min,
              passenger_capacity_Max,
              passenger_capacity_topup: passCap_topup[i]
                ? passCap_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < passCap_value.length; i++) {
            let passCap_values = passCap_value[i].split("-");
            const passenger_capacity_Min =
              passCap_values.length > 0
                ? parseInt(passCap_values[0].trim())
                : 0;
            const passenger_capacity_Max =
              passCap_values.length > 1
                ? parseInt(passCap_values[1].trim())
                : passenger_capacity_Min;
            passCap_or_topup_arr.push({
              passenger_capacity_Min,
              passenger_capacity_Max,
              passenger_capacity_topup: passCap_topup[i]
                ? passCap_topup[i].trim()
                : "",
            });
          }
        }

        let crewCap_or_topup_arr = [];
        let crewCap_value = row["CREW CAPACITY"];
        let crewCap_topup = row["Topup (CREW CAPACITY)"].toString();
        if (crewCap_value.includes(",") && crewCap_topup.includes(",")) {
          crewCap_value = crewCap_value.split(",");
          crewCap_topup = crewCap_topup.split(",");
          for (let i = 0; i < crewCap_value.length; i++) {
            let crewCap_values = crewCap_value[i].split("-");
            const crew_capacity_Min =
              crewCap_values.length > 0
                ? parseInt(crewCap_values[0].trim())
                : 0;
            const crew_capacity_Max =
              crewCap_values.length > 1
                ? parseInt(crewCap_values[1].trim())
                : crew_capacity_Min;
            crewCap_or_topup_arr.push({
              crew_capacity_Min,
              crew_capacity_Max,
              crew_capacity_topup: crewCap_topup[i]
                ? crewCap_topup[i].trim()
                : "",
            });
          }
        } else {
          for (let i = 0; i < crewCap_value.length; i++) {
            let crewCap_values = crewCap_value[i].split("-");
            const crew_capacity_Min =
              crewCap_values.length > 0
                ? parseInt(crewCap_values[0].trim())
                : 0;
            const crew_capacity_Max =
              crewCap_values.length > 1
                ? parseInt(crewCap_values[1].trim())
                : crew_capacity_Min;
            crewCap_or_topup_arr.push({
              crew_capacity_Min,
              crew_capacity_Max,
              crew_capacity_topup: crewCap_topup[i]
                ? crewCap_topup[i].trim()
                : "",
            });
          }
        }

        let add_op_con_desc = [];
        if (
          row["Add Option Condition Description"].includes(",") &&
          row["Vat Able"].includes(",") &&
          row["Topup (Add Option Condition Description)"].includes(",")
        ) {
          let description = row["Add Option Condition Description"]
            .trim()
            .split(",");
          let topup = row["Topup (Add Option Condition Description)"]
            .trim()
            .split(",");
          let vatAble = row["Vat Able"].trim().split(",");
          for (let i = 0; i < description.length; i++) {
            add_op_con_desc.push({
              add_op_con_desc: description[i],
              add_op_con_desc_topup: topup[i],
              vat: vatAble[i],
            });
          }
        } else {
          add_op_con_desc.push({
            add_op_con_desc: row["Add Option Condition Description"],
            add_op_con_desc_topup:
              row["Topup (Add Option Condition Description)"],
            vat: row["Vat Able"],
          });
        }

        nature_of_plan_id = await Nature_of_plan.findOne({
          nature_of_plan_name: row["Nature Of Plan"],
        });
        nature_of_plan_id = nature_of_plan_id?._id?.toString();
        planCategoryId = await PlaneCategoryModel.findOne({
          plan_category_name: row["Plan Category"],
        });
        planCategoryId = planCategoryId?._id?.toString();

        policy_type_id = await Policy_type.findOne({
          policy_type_name: row["Policy Type"],
        });
        policy_type_id = policy_type_id?._id?.toString();
        company_id = await CompanyModel.findOne({
          company_name: row["Company Name"],
        });
        company_id = company_id._id.toString();

        company_id = await CompanyModel.findOne({
          company_name: row["Company Name"],
        });
        company_id = company_id._id.toString();


        const line_of_business_name = "Yacht";
        const line_of_business = await line_of_business_model.findOne({
          line_of_business_name: line_of_business_name,
        });

        payload["line_of_business_id"] = line_of_business;
        payload["nature_of_plan_id"] = nature_of_plan_id;
        payload["plan_category_id"] = planCategoryId;
        payload["policy_type_id"] = policy_type_id;
        payload["plan_name"] = row["Plan Name"];
        payload["company_id"] = company_id;
        payload["plan_for"] = planforArr;
        payload["business_type"] = business_typeArr;
        payload["initial_rate"] = row["Initial Rate"];
        payload["discount_rate"] = row["Discounted Rate"];
        payload["company_id"] = company_id;
        payload["rate"] = row["Rate"];
        payload["excess"] = row["Excess"];
        payload["yacht_body_type_or_topup"] = yacht_body_type_or_topup_arr;
        payload["yacht_hull_material_or_topup"] =
          yacht_hull_material_or_topup_arr;
        payload["yacht_horsepower_type_or_topup"] =
          yacht_horsePower_or_topup_arr;
        payload["yacht_engine_type_or_topup"] = yacht_engine_type_or_topup_arr;
        payload["measurement_value_or_topup"] = measureValueArr;
        payload["yacht_speed_knot_type_or_topup"] =
          yacht_speed_knots_or_topup_arr;
        payload["driving_experience_or_topup"] = driveExp_or_topup_arr;
        payload["home_country_driving_experience_or_topup"] =
          homeDriveExp_or_topup_arr;
        payload["hull_and_equipment_value_range_or_topup"] =
          hullEqpValue_or_topup_arr;
        payload["dinghy_ten_value_range_or_topup"] = dinghyTender_or_topup_arr;
        payload["outboard_value_range_or_topup"] = outboard_or_topup_arr;
        payload["personal_eff_cash_or_topup"] = personalEff_or_topup_arr;
        payload["trailer_or_topup"] = trailer_or_topup_arr;
        payload["passenger_capacity_or_topup"] = passCap_or_topup_arr;
        payload["crew_capacity_or_topup"] = crewCap_or_topup_arr;
        payload["no_claim_years"] = claimyears_or_topup;
        payload["add_op_con_desc_or_topup"] = add_op_con_desc;
        payload["JDV_commission"] = row["JDV Commisoin"];
        count++;
        await yacht_plan.create(payload);
      }

      if (count === xlData.length) {
        return res.status(200).json({
          status: 200,
          message: "File Upload Successfully !!",
          totalEntry: count,
        });
      } else {
        return res
          .status(400)
          .json({ status: 200, message: "File not Uploaded" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: 400, message: "Something Happend Worng" });
    }
  },

  upload_Yacht_plan_policywordings_file: async (req, res) => {
    try {
      let newdetails = await yacht_plan.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policywordings_file: req.file.filename } },
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
  add_yacht_condition: async (req, res) => {
    try {
      let payload = req.body
      let planId = payload?.id
      let conditionPayload = payload?.formData
      console.log('payload................', conditionPayload)
      let questionArray = []
      for (let j = 0; j < conditionPayload?.length; j++) {
        if (conditionPayload[j]?.checked == true) {
          if (conditionPayload[j]?.condition_desc.length > 0) {
            let descLen = conditionPayload[j]?.condition_desc?.length
            let conditionValues = conditionPayload[j]?.condition_value?.includes(",") ? conditionPayload[j]?.condition_value?.split(",") : [conditionPayload[j]?.condition_value]
            if (descLen == 2 && conditionValues.length == 1) {
              conditionValues.push("0")
            }
            if (descLen == 1 && conditionValues[0] == null) {
              conditionValues.push("0")
            }


            questionArray.push({
              condition_id: conditionPayload[j]?.condition_id ? mongoose.Types.ObjectId(conditionPayload[j]?.condition_id) : "",
              condition_label: conditionPayload[j]?.condition_label,
              condition_desc: conditionPayload[j]?.condition_desc?.map((val) => val.value),
              condition_value: conditionValues?.length > 1 ? conditionValues?.join(",") : (conditionValues[0] != "" ? conditionValues[0] : "0"),
            })
          }
        }
      }
      let result;
      result = await yacht_plan.findOneAndUpdate(
        { _id: planId },
        { condition_arr: questionArray },
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
      console.log(err);
    }
  },
  addMedicalPlan: async (req, res) => {
    try {
      let user = req?.user
      let createdby
      let userlocation = user?.location
      createdby = userlocation[0]
      const line_of_business_name = "Medical";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });
      const datalen = req.body?.rowsData.length;
      let payload = req.body.rowsData
      for (let i = 0; i < datalen; i++) {
        let payloadObj = {}
        const visaArr = [];
        const planConditionArr = [];
        const nationalityarr = [];
        const salaryRangeArr = [];
        const add_op_con_desc_arr = [];
        const rowsData = req.body.rowsData || [];

        for (let i = 0; i < rowsData.length; i++) {
          const rowData = rowsData[i];
          console.log(rowData, ">>>>>>>>>>>>> body data")


          if (rowData.medical_visa_country) {
            const issuing_visa = rowData.medical_visa_country;
            const issuing_visa_topup =
              rowData.medical_visa_country_topup?.includes(",") ?
                rowData.medical_visa_country_topup?.split(",")
                : [rowData.medical_visa_country_topup];
            for (let j = 0; j < issuing_visa.length; j++) {
              visaArr.push({
                _id: issuing_visa[j]["_id"],
                medical_visa_country: issuing_visa[j]["medical_visa_country"],
                issuing_visa_topup: issuing_visa_topup[j]
                  ? issuing_visa_topup[j].trim()
                  : "",
              });
            }
            payloadObj["medical_visa_country_or_topup"] = visaArr
          }


          if (rowData.medical_plan_condition) {
            const plan_condition = rowData.medical_plan_condition;
            const plan_condition_topup = rowData.medical_plan_condition_topup?.includes(",") ?
              rowData.medical_plan_condition_topup?.split(",") : [rowData.medical_plan_condition_topup];
            for (let j = 0; j < plan_condition.length; j++) {
              planConditionArr.push({
                _id: plan_condition[j]["_id"],
                medical_plan_condition:
                  plan_condition[j]["medical_plan_condition"],
                plan_condition_topup: plan_condition_topup[j]
                  ? plan_condition_topup[j].trim()
                  : "",
              });
            }
            payloadObj["plan_condition_or_topup"] = planConditionArr

          }

          if (rowData.nationality_name) {
            const nationality_name = rowData.nationality_name;
            const nationalitytopup = rowData.nationality_topup?.includes(",") ?
              rowData.nationality_topup?.split(",") : [rowData.nationality_topup];

            for (let j = 0; j < nationalitytopup.length; j++) {
              nationalityarr.push({
                _id: nationality_name[j]["_id"],
                nationality_name: nationality_name[j]["nationality_name"],
                nationalitytopup: nationalitytopup[j]
                  .trim()
                  .replace(/\s+/g, ""),
              });
            }
            payloadObj["nationality_or_topup"] = nationalityarr

          }



          if (rowData.medical_salary_range) {
            const salary_range = rowData.medical_salary_range;
            const salary_range_topup = rowData.salary_range_topup?.includes(",") ?
              rowData.salary_range_topup?.split(",") : [rowData.salary_range_topup];
            for (let j = 0; j < salary_range.length; j++) {
              salaryRangeArr.push({
                _id: salary_range[j]["_id"],
                medical_salary_range: salary_range[j]["medical_salary_range"],
                salary_range_topup: salary_range_topup[j]
                  ? salary_range_topup[j].trim()
                  : "",
              });
            }
            payloadObj["salary_range_or_topup"] = salaryRangeArr

          }
          if (rowData.add_op_con_desc) {
            const add_op_con_desc = rowData.add_op_con_desc?.includes(",") ?
              rowData.add_op_con_desc?.split(",") : [rowData.add_op_con_desc];
            const add_op_con_desc_topup =
              rowData.add_op_con_desc_topup?.includes(",") ?
                rowData.add_op_con_desc_topup.split(",") :
                [rowData.add_op_con_desc_topup];
            const vat = rowData.vat_able?.includes(",") ? rowData.vat_able?.split(",") : [rowData.vat_able];

            for (let j = 0; j < add_op_con_desc_topup.length; j++) {
              add_op_con_desc_arr.push({
                add_op_con_desc: add_op_con_desc[j].trim().replace(/\s+/g, ""),
                add_op_con_desc_topup: add_op_con_desc_topup[j]
                  .trim()
                  .replace(/\s+/g, ""),
                vat: vat[j].trim().replace(/\s+/g, ""),
              });
            }
            payloadObj["add_op_con_desc"] = add_op_con_desc_arr

          }
          let data
          let match = { standard_cover_status: 1 }
          if (line_of_business?._id) {
            match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
          }
          if (rowData?.company_id) {
            match["standard_cover_company"] = mongoose.Types.ObjectId(rowData?.company_id)

          }
          if (rowData?.excess) {
            match["excess"] = rowData?.excess

          }
          if (rowData?.plan_category_id) {
            match["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)

          }
          data = await standardCoverModels.aggregate([
            { $match: match }
          ])
          const standardCoverArray = [];
          for (let i = 0; i < data.length; i++) {
            standardCoverArray.push({
              standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
              standard_cover_label: data[i].standard_cover_label,
              standard_cover_desc: data[i].standard_cover_description,
              standard_cover_value: ''
            })
          }
          payloadObj["standard_cover_arr"] = standardCoverArray

          payloadObj["line_of_business_id"] = line_of_business._id
          payloadObj["plan_category_id"] = rowData?.plan_category_id
          payloadObj["nature_of_plan_id"] = rowData?.nature_of_plan_id
          payloadObj["medical_plan_type_id"] = rowData?.medical_plan_type
          payloadObj["company_id"] = rowData?.company_id
          payloadObj["plan_name"] = rowData?.plan_name
          payloadObj["jdv_comm"] = rowData?.jdv_comm
          payloadObj["location"] = rowData?.location
          console.log(payloadObj, ">>>>>>>>>>>>>>>payload object")
          payloadObj["plan_created_by"] = mongoose.Types.ObjectId(createdby?.loc_id)
          let medical_plan = new MedicalPlan(payloadObj);
          let result = await medical_plan.save();
          if (result != null) {
            res.json({
              status: 200,
              message: "Medical Plan Added Successfully!",
            });
          } else {
            res.json({
              status: 400,
              message: "Medical Plan Not Added Successfully!",
            });
          }
        }
      }
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },
  getMedicalPlans: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      let name = req.query?.name
      let status = +req.query.status
      let company = req.query?.company
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => (obj?.loc_id))
      let match = {}
      if (page && limit) {
        if (name) {
          match = {
            plan_name: {
              $regex: name,
              $options: 'i'
            }
          }
        }
        match["location.value"] = {
          $in: userLocation
        }
        if (status == 0 || status == 1) {
          match["status"] = status;
        }
        if (company) {
          match["company_id"] = mongoose.Types.ObjectId(company)
        }

      }
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
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: +limit,
        },

      ];
      aggregate.push({
        $facet: facet,
      });

      const result = await MedicalPlan.aggregate(aggregate)
      res.json({
        status: 200,
        message: "Data Found",
        data: result[0]?.data || [],
        total: result[0]?.totalCount[0]?.total || 0,
      });
    } catch (err) {
      res.send(err);
    }
  },
  single_medical_plan_details: async (req, res) => {
    try {
      const id = req.params.id;
      const medical_plan_data = await MedicalPlan.findById(id);
      res.json({ status: 200, message: "Data Found", data: medical_plan_data });
    } catch (error) {
      res.send(error);
    }
  },
  update_medical_plan: async (req, res) => {
    try {
      const id = req.params.id;
      let payloadObj = {}
      const visaArr = [];
      const planConditionArr = [];
      const nationalityarr = [];
      const salaryRangeArr = [];
      const add_op_con_desc_arr = [];
      const rowData = req.body || [];
      // console.log(rowData,">>>>>>>>>>>>>>>>>> req body")

      const line_of_business_name = "Medical";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });

      if (rowData?.medical_visa_country) {
        const issuing_visa = rowData?.medical_visa_country;
        const issuing_visa_topup = rowData?.medical_visa_country_topup?.includes(",") ?
          rowData?.medical_visa_country_topup.split(",") :
          [rowData?.medical_visa_country_topup];
        for (let j = 0; j < issuing_visa.length; j++) {
          visaArr.push({
            _id: issuing_visa[j]["_id"],
            medical_visa_country: issuing_visa[j]["medical_visa_country"],
            issuing_visa_topup: issuing_visa_topup[j]
              ? issuing_visa_topup[j].trim()
              : 0,
          });
        }
        payloadObj["medical_visa_country_or_topup"] = visaArr
      }
      //

      if (rowData?.medical_plan_condition) {
        const plan_condition = rowData.medical_plan_condition;
        const plan_condition_topup =
          rowData.medical_plan_condition_topup.includes(",") ?
            rowData.medical_plan_condition_topup.split(",") : [rowData?.medical_plan_condition_topup];
        for (let j = 0; j < plan_condition.length; j++) {
          planConditionArr.push({
            _id: plan_condition[j]["_id"],
            medical_plan_condition: plan_condition[j]["medical_plan_condition"],
            plan_condition_topup: plan_condition_topup[j]
              ? plan_condition_topup[j].trim()
              : 0,
          });
        }
        payloadObj["plan_condition_or_topup"] = planConditionArr
      }
      //


      if (rowData?.nationality_name) {
        const nationality_name = rowData?.nationality_name;
        const nationalitytopup = rowData?.nationality_topup?.includes(",") ?
          rowData?.nationality_topup?.split(",") :
          [rowData?.nationality_topup];

        for (let j = 0; j < nationality_name.length; j++) {
          nationalityarr.push({
            _id: nationality_name[j]["_id"],
            nationality_name: nationality_name[j]["nationality_name"],
            nationalitytopup: nationalitytopup[j] ? nationalitytopup[j].trim() : 0,
          });
        }
        payloadObj["nationality_or_topup"] = nationalityarr

      }
      //


      if (rowData?.medical_salary_range) {
        const salary_range = rowData?.medical_salary_range;
        const salary_range_topup = rowData?.salary_range_topup?.includes(",") ?
          rowData?.salary_range_topup?.split(",") : [rowData?.salary_range_topup];
        for (let j = 0; j < salary_range.length; j++) {
          salaryRangeArr.push({
            _id: salary_range[j]["_id"],
            medical_salary_range: salary_range[j]["medical_salary_range"],
            salary_range_topup: salary_range_topup[j]
              ? salary_range_topup[j].trim()
              : 0,
          });
        }
        payloadObj["salary_range_or_topup"] = salaryRangeArr

      }
      //
      // console.log(rowData.add_op_con_desc,">>>>>>>>>>>>>>>opcondesc")
      // console.log(rowData.add_op_con_desc_topup,">>>>>>>>>>>>>>>topup")
      // console.log(rowData.vat,">>>>>>>>>>>>>>>vat")
      if (rowData.add_op_con_desc) {
        const add_op_con_desc = rowData?.add_op_con_desc?.includes(",") ?
          rowData.add_op_con_desc?.split(",") : [rowData.add_op_con_desc];
        const add_op_con_desc_topup =
          rowData.add_op_con_desc_topup?.includes(",") ?
            rowData.add_op_con_desc_topup.split(",") :
            [rowData.add_op_con_desc_topup];
        const vat = rowData.vat?.includes(",") ? rowData.vat?.split(",") : [rowData.vat];

        for (let j = 0; j < add_op_con_desc.length; j++) {
          add_op_con_desc_arr.push({
            add_op_con_desc: add_op_con_desc[j].trim().replace(/\s+/g, ""),
            add_op_con_desc_topup: add_op_con_desc_topup[j] ?
              add_op_con_desc_topup[j].trim() : 0,
            vat: vat[j].trim().replace(/\s+/g, ""),
          });
        }
        payloadObj["add_op_con_desc"] = add_op_con_desc_arr

      }

      payloadObj["plan_category_id"] = rowData?.plan_category_id
      payloadObj["nature_of_plan_id"] = rowData?.nature_of_plan_id
      payloadObj["medical_plan_type_id"] = rowData?.medical_plan_type
      payloadObj["company_id"] = rowData?.company_id
      payloadObj["plan_name"] = rowData?.plan_name
      payloadObj["jdv_comm"] = rowData?.jdv_comm
      payloadObj["location"] = rowData?.location

      let data;
      let match = { standard_cover_status: 1 }
      if (line_of_business?._id) {
        match["standard_cover_lob"] = mongoose.Types.ObjectId(line_of_business?._id)
      }
      if (rowData?.company_id) {
        console.log("hiii")
        match["standard_cover_company"] = mongoose.Types.ObjectId(rowData?.company_id)

      }
      if (rowData?.plan_category_id) {
        match["plan_category_id"] = mongoose.Types.ObjectId(rowData?.plan_category_id)

      }
      console.log(payloadObj, ">>>>>>>>>>>>>>>payload object 1")

      data = await standardCoverModels.aggregate([
        { $match: match }
      ])
      const standardCoverArray = [];
      for (let i = 0; i < data.length; i++) {
        standardCoverArray.push({
          standard_cover_id: mongoose.Types.ObjectId(data[i]._id),
          standard_cover_label: data[i].standard_cover_label,
          standard_cover_desc: data[i].standard_cover_description,
          standard_cover_value: ''
        })
      }
      payloadObj["standard_cover_arr"] = standardCoverArray
      console.log(payloadObj, ">>>>>>>????> obj")

      const result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        {
          $set: payloadObj,
        },
        { new: true }
      );

      if (result) {
        res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  updatestatusMedicalPlan: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.params.status;
      let result = await MedicalPlan.findByIdAndUpdate(id, { status: status });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Medical Plan Deactivated Successfully!",
          });
        } else {
          res.json({
            status: 200,
            message: "Medical Plan Activated Successfully!",
          });
        }
      } else {
        res.json({ status: 400, message: "Medical Plan Not Deactivated!" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  add_bulk_Medical_plan: async (req, res) => {
    try {
      let count = 0;
      let caseInsensitive = async (name) => {
        return { $regex: new RegExp(name.trim(), 'i') }
      }
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
      let allPlanData = [];
      await Promise.all(
        xlData.map(async (row) => {
          let payload = {};
          let planCategoryId;
          let nature_of_plan_id;
          let medical_plan_type_id;
          let company_id
          let VisaOrTopupArr = [];
          let visa_value = row["Emirates Issuing Visa"];
          let visa_topup = row["Topup (Emirates Issuing Visa)"].toString();

          if (visa_value.includes(",") && visa_topup.includes(",")) {
            let visa_name = visa_value.split(",");
            let visa_topup_Value = visa_topup.split(",");
            for (let i = 0; i < visa_name.length; i++) {
              let planfor_id = await Medical_visa_country_list.findOne({
                medical_visa_country: visa_name[i],
              });
              let planforid = planfor_id?._id?.toString();

              VisaOrTopupArr.push({
                _id: planforid,
                medical_visa_country: visa_name[i],
                issuing_visa_topup: visa_topup_Value[i]
                  ? visa_topup_Value[i].trim()
                  : "",
              });
            }
          } else {
            let visa_id = await Medical_visa_country_list.findOne({
              medical_visa_country: visa_value,
            });
            let visaid = visa_id?._id?.toString();

            VisaOrTopupArr.push({
              _id: visaid,
              medical_visa_country: visa_value,
              issuing_visa_topup: visa_topup,
            });
          }

          let plan_condition_or_topup_arr = [];
          let planCondition_value = row["Plan Condition"];
          let plan_condition_topup = row["Topup (Plan Condition)"].toString();
          if (
            planCondition_value.includes(",") &&
            plan_condition_topup.includes(",")
          ) {
            planCondition_value = planCondition_value.split(",");
            plan_condition_topup = plan_condition_topup.split(",");
            for (let i = 0; i < planCondition_value.length; i++) {
              let plan_condition__id = await Medical_plan_condition_list.findOne({
                medical_plan_condition: planCondition_value[i],
              });
              let plan_condition_id = plan_condition__id?._id?.toString();
              plan_condition_or_topup_arr.push({
                _id: plan_condition_id,
                medical_plan_condition: planCondition_value[i],
                plan_condition_topup: plan_condition_topup[i]
                  ? plan_condition_topup[i].trim()
                  : "",
              });
            }
          } else {
            let plan_condition_id = await Medical_plan_condition_list.findOne({
              medical_plan_condition: planCondition_value,
            });
            let plan_conditionid = plan_condition_id?._id?.toString();
            plan_condition_or_topup_arr.push({
              _id: plan_conditionid,
              medical_plan_condition: planCondition_value,
              plan_condition_topup: plan_condition_topup
                ? plan_condition_topup.trim()
                : "",
            });
          }

          let nationality_or_topup_arr = [];
          let nationality_value = row["Nationality"];
          let nationality_value_topup = row["Topup (Nationality)"].toString();
          if (
            nationality_value.includes(",") &&
            nationality_value_topup.includes(",")
          ) {
            nationality_value = nationality_value.split(",");
            nationality_value_topup = nationality_value_topup.split(",");
            for (let i = 0; i < nationality_value.length; i++) {
              let nationality_id = await nationalityModel.findOne({
                nationality_name: nationality_value[i],
              });
              let nationality_typeid = nationality_id?._id?.toString();
              nationality_or_topup_arr.push({
                _id: nationality_typeid,
                nationality_name: nationality_value[i],
                nationalitytopup: nationality_value_topup[i]
                  ? nationality_value_topup[i].trim()
                  : "",
              });
            }
          } else {
            let nationality_id = await nationalityModel.findOne({
              nationality_name: nationality_value,
            });
            let nationalityid = nationality_id?._id?.toString();
            nationality_or_topup_arr.push({
              _id: nationalityid,
              nationality_name: nationality_value,
              nationalitytopup: nationality_value_topup
                ? nationality_value_topup.trim()
                : "",
            });
          }

          let salary_Range_or_topup_arr = [];
          let salaryRange_value = row["Medical Salary Range"];
          let salaryRange_value_topup =
            row["Topup (Medical Salary Range)"].toString();
          if (
            salaryRange_value.includes(",") &&
            salaryRange_value_topup.includes(",")
          ) {
            salaryRange_value = salaryRange_value.split(",");
            salaryRange_value_topup = salaryRange_value_topup.split(",");
            for (let i = 0; i < salaryRange_value.length; i++) {
              let salaryRange_id = await Medical_salary_range_list.findOne({
                medical_salary_range: salaryRange_value[i],
              });
              let salaryRangeid = salaryRange_id?._id?.toString();
              salary_Range_or_topup_arr.push({
                _id: salaryRangeid,
                medical_salary_range: salaryRange_value[i],
                salary_range_topup: salaryRange_value_topup[i]
                  ? salaryRange_value_topup[i].trim()
                  : "",
              });
            }
          } else {
            let salaryRange_id = await Medical_salary_range_list.findOne({
              medical_salary_range: salaryRange_value,
            });
            let salaryRangeid = salaryRange_id?._id?.toString();
            salary_Range_or_topup_arr.push({
              _id: salaryRangeid,
              medical_salary_range: salaryRange_value,
              salary_range_topup: salaryRange_value_topup
                ? salaryRange_value_topup.trim()
                : "",
            });
          }

          let add_op_con_desc = [];
          if (
            row["Add option Cond. Descripction"].includes(",") &&
            row["Vat Able"].includes(",") &&
            row["Topup (Add option Cond. Descripction)"].includes(",")
          ) {
            let description = row["Add option Cond. Descripction"]
              .trim()
              .split(",");
            let topup = row["Topup (Add option Cond. Descripction)"]
              .trim()
              .split(",");
            let vatAble = row["Vat Able"].trim().split(",");
            for (let i = 0; i < description.length; i++) {
              add_op_con_desc.push({
                add_op_con_desc: description[i],
                add_op_con_desc_topup: topup[i],
                vat: vatAble[i],
              });
            }
          } else {
            add_op_con_desc.push({
              add_op_con_desc: row["Add Option Condition Description"],
              add_op_con_desc_topup:
                row["Topup (Add Option Condition Description)"],
              vat: row["Vat Able"],
            });
          }

          nature_of_plan_id = await Nature_of_plan.findOne({
            nature_of_plan_name: row["Nature Of Plan"],
          });
          nature_of_plan_id = nature_of_plan_id?._id?.toString();

          planCategoryId = await PlaneCategoryModel.findOne({
            plan_category_name: row["Plan Category"],
          });
          planCategoryId = planCategoryId?._id?.toString();

          medical_plan_type_id = await Medical_plan_typelist.findOne({
            medical_plan_type: row["Medical Plan type"],
          });
          medical_plan_type_id = medical_plan_type_id?._id?.toString();
          company_id = await CompanyModel.findOne({
            company_name: row["Company Name"],
          });
          company_id = company_id._id.toString();

          const line_of_business_name = "Medical";
          const line_of_business = await line_of_business_model.findOne({
            line_of_business_name: line_of_business_name,
          });

          payload["line_of_business_id"] = line_of_business;
          payload["nature_of_plan_id"] = nature_of_plan_id;
          payload["plan_category_id"] = planCategoryId;
          payload["medical_plan_type_id"] = medical_plan_type_id;
          payload["company_id"] = company_id;
          payload["plan_name"] = row["Plan Name"];
          payload["medical_visa_country_or_topup"] = VisaOrTopupArr;
          payload["plan_condition_or_topup"] = plan_condition_or_topup_arr;
          payload["nationality_or_topup"] = nationality_or_topup_arr;
          payload["salary_range_or_topup"] = salary_Range_or_topup_arr;

          payload["add_op_con_desc"] = add_op_con_desc;
          payload["jdv_comm"] = row["JDV Commisoin"];
          count++;
          let medical_plan = new MedicalPlan(payload);
          let result = await medical_plan.save();
          // await MedicalPlan.create(payload);
          if (result != null) {
            allPlanData.push(result);
          }
        })
      );
      if (allPlanData.length > 0) {
        return res.status(200).json({
          status: 200,
          message: "File Upload Successfully !!",
          totalEntry: count,
        });
      }
      return res
        .status(400)
        .json({ status: 200, message: "File not Uploaded" });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ status: 400, message: "Something Happend Worng" });
    }
  },
  upload_medical_plan_policywordings_file: async (req, res) => {
    try {
      let newdetails = await MedicalPlan.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { policywordings_file: req.file.filename } },
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
  getAllStandardCovered: async (req, res) => {
    try {
      let AllStandardCovered;
      let lob;
      if (!req.query?.lob) {
        return res
          .status(400)
          .json({ status: 400, message: "Lob is Required", data: [] });
      }
      if (req.query.lob == "Home") {
        lob = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
      }
      if (req.query?.lob == "Travel") {
        lob = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
      }
      if (req.query?.lob == "Motor") {
        lob = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      }
      if (req.query?.lob == "Medical") {
        lob = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
      }
      AllStandardCovered = await Standard_cover.aggregate([
        {
          $match: {
            standard_cover_lob: lob,
            standard_cover_status: 1
          },
        },
      ]);
      if (!AllStandardCovered?.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data not Found Successfully",
            data: [],
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: AllStandardCovered,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getMatchTravelPlan: async (req, res) => {
    try {
      let referredCheck = async (str) => {
        if (typeof str === 'string') {
          str = str?.toLowerCase()
          if (str?.includes("r")) {
            return "REFERRED"
          } else if (str?.includes("%")) {
            return true
          }
          else {
            return false
          }

        }
        return false
      }
      let vatData = await vatModels.findOne({ vat_lob: mongoose.Types.ObjectId('6418645df42eaf5ba1c9e0f6'), vat_status: 1 })
      vatData = +vatData?.vat_percentage?.split("%")[0]
      let matchTravelPlan;
      let payload = req.body;
      let noOfDaysTravel;
      let ageOfCustomer;
      let noOfDays = +payload?.noOfDays
      let noOfChild = +payload?.noOfChild
      let noOfSpouse = +payload?.noOfSpouse
      let country = payload?.travel_region_country
      let dateOfBirth = payload?.date_of_birth
      let newLeadId = payload?.newLeadId
      let leadLocation
      let matchobj = { status: 1 };
      if (newLeadId) {
        let leadDetails = await NewLeadsModels.findById(newLeadId)
        leadLocation = leadDetails?.lead_location
        matchobj["location.value"] = leadLocation?.toString()
      }
      let age = (new Date().getFullYear()) - (+dateOfBirth?.split("-")[0])
      if (payload?.date_of_birth) {
        ageOfCustomer =
          new Date().getFullYear() -
          new Date(payload?.date_of_birth).getFullYear();
        let monthDiff =
          new Date().getMonth() - new Date(payload?.date_of_birth).getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 &&
            new Date().getDate() < new Date(payload?.date_of_birth).getDate())
        ) {
          ageOfCustomer--;
        }
      }
      console.log("age.......................", ageOfCustomer)
      if (payload.travel_start_date && payload.travel_end_date) {
        noOfDaysTravel =
          Math.abs(
            new Date(payload.travel_start_date).getTime() -
            new Date(payload.travel_end_date).getTime()
          ) / (1000 * 60 * 60 * 24).toFixed(1);
      }

      if (payload?.additionalCoverId?.length) {
        let additionalArray = [];
        for (let i = 0; i < payload?.additionalCoverId.length; i++) {
          additionalArray.push(
            mongoose.Types.ObjectId(payload?.additionalCoverId[i])
          );
        }
        matchobj["additional_cover_arr.additional_cover_id"] = {
          $in: additionalArray,
        };
      }
      if (payload?.planNaturId) {
        matchobj["nature_of_plan_id"] = mongoose.Types.ObjectId(
          payload?.planNaturId
        );
      }
      if (payload?.companyId) {
        matchobj["company_id"] = mongoose.Types.ObjectId(
          payload?.companyId
        );
      }
      if (payload?.coverTypeId) {
        matchobj["plan_category_id"] = mongoose.Types.ObjectId(
          payload?.coverTypeId
        );
      }
      if (payload?.travel_insurance_for) {
        matchobj["travel_insurance_for_id"] = mongoose.Types.ObjectId(
          payload?.travel_insurance_for
        );
      }
      if (payload?.travel_plan_type) {
        matchobj["travel_type_id"] = mongoose.Types.ObjectId(
          payload?.travel_plan_type
        );
      }

      if (payload?.id) {
        let objId = [];
        for (let i = 0; i < payload.id.length; i++) {
          objId.push(mongoose.Types.ObjectId(payload.id[i]));
        }
        matchobj["planData._id"] = {
          $in: objId,
        };
      }
      let priceMatchObj = { "travelPrices.status": true }
      if (payload?.travel_trip_type) {
        priceMatchObj["travelPrices.plan_type_id"] = mongoose.Types.ObjectId(
          payload?.travel_trip_type
        );
      }
      if (payload?.travelCoverTypeId) {
        priceMatchObj["travelPrices.cover_type_id"] = mongoose.Types.ObjectId(
          payload?.travelCoverTypeId
        );
      }
      if (payload?.nationalityId) {
        priceMatchObj["countries._id"] = mongoose.Types.ObjectId(payload?.nationalityId)
      }
      if (noOfDays) {
        priceMatchObj['$and'] = [
          {
            'travelPrices.no_of_days_or_topup.number_of_daysMin': {
              '$lte': noOfDays
            }
          }, {
            'travelPrices.no_of_days_or_topup.number_of_daysMax': {
              '$gte': noOfDays
            }
          }]
      }
      if (ageOfCustomer) {
        priceMatchObj['$and'] = [
          {
            'travelPrices.age_or_topup.ageMin': {
              '$lte': ageOfCustomer
            }
          }, {
            'travelPrices.age_or_topup.ageMax': {
              '$gte': ageOfCustomer
            }
          }]
      }
      if (payload?.travel_trip_type == "641d700e2e8acf350eaab204") {
        if (payload.noOfSpouse) {
          priceMatchObj['travelPrices.no_of_spouse.no_of_spouseMin'] = { '$lte': noOfSpouse }
          priceMatchObj['travelPrices.no_of_spouse.no_of_spouseMax'] = { '$gte': noOfSpouse }

        }
        if (payload.noOfChild) {
          priceMatchObj['travelPrices.no_of_child.no_of_childMin'] = { '$lte': noOfChild }
          priceMatchObj['travelPrices.no_of_child.no_of_childMax'] = { '$gte': noOfChild }

        }
      }
      matchTravelPlan = await travel_plan_model.aggregate([
        {
          $match: matchobj
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "companyData"
          }
        },
        {
          '$lookup': {
            'from': 'travel_plan_prices',
            'localField': '_id',
            'foreignField': 'plan_id',
            'as': 'travelPrices'
          }
        },
        {
          '$unwind': {
            'path': '$travelPrices'
          }
        },

        {
          '$lookup': {
            'from': 'travel_region_lists',
            'localField': 'travelPrices.region_id.value',
            'foreignField': '_id',
            'as': 'regiondata'
          }
        }, {
          '$lookup': {
            'from': 'nationalities',
            'localField': 'regiondata.travel_region_country',
            'foreignField': '_id',
            'as': 'countries'
          }
        },
        {
          '$match': priceMatchObj
        },

        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$standard_cover_arr", companyId: "$company_id", insuranceForId: "$travel_insurance_for_id", travelPrice: "$travelPrices" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                  $expr: {
                    $and: [
                      { $not: { $in: ["$_id", "$$standardId.standard_cover_id"], } },
                      { $in: ["$$companyId", "$standard_cover_company"] },
                      // { $in: ["$$insuranceForId", "$travel_insurance_for"] },
                      // { $in: ["$$travelPrice.cover_type_id", "$cover_type"] },
                      // { $eq: ["$$planTypeIdCom", "$standard_cover_plan"] },
                    ]
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
        {
          '$addFields': {
            'travelPriceId': '$travelPrices._id'
          }
        },
        {
          $project: {
            location: 0,
            regiondata: 0,
            countries: 0

          }
        }
      ])
      for (let i = 0; i < matchTravelPlan.length; i++) {
        let travelDaysRange
        let travelBasePremium = 0;
        let basePremium = 0;
        let referred = false;
        if (matchTravelPlan[i]?.travelPrices) {
          let travelPriceArray = matchTravelPlan[i]?.travelPrices?.no_of_days_or_topup
          if (travelPriceArray?.length) {
            for (let i = 0; i < travelPriceArray.length; i++) {
              if ((+travelPriceArray[i]?.number_of_daysMin <= noOfDays && +travelPriceArray[i]?.number_of_daysMax >= noOfDays)) {
                travelDaysRange = travelPriceArray[i]?.number_of_daysMin?.toString() + "-" + travelPriceArray[i]?.number_of_daysMax?.toString()
                travelBasePremium = +travelPriceArray[i]?.travel_premium
                basePremium = travelBasePremium
                break;
              }
            }
          }
        }

        if (matchTravelPlan[i]?.country_or_topup?.length > 0) {
          let array = matchTravelPlan[i]?.country_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.country_id?.toString() === payload?.nationalityId) {
              if ("REFERRED" == await referredCheck(array[j]?.countrytopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.countrytopup)) {
                if (array[j]?.countrytopup.includes("-")) {
                  let countrytopup = array[j]?.countrytopup
                  countrytopup = countrytopup.split("-")[1]
                  travelBasePremium =
                    travelBasePremium -
                    (basePremium * +countrytopup.split("%")[0]) /
                    100;
                } else {
                  travelBasePremium =
                    travelBasePremium +
                    (basePremium * +array[j]?.countrytopup.split("%")[0]) / 100;
                }
              } else {
                travelBasePremium =
                  travelBasePremium + (+array[j]?.countrytopup);
              }
              break;
            }
          }
        }
        if (matchTravelPlan[i]?.country_or_topup?.length > 0) {
          let array = matchTravelPlan[i]?.country_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.country_id?.toString() === payload?.nationalityId) {
              if ("REFERRED" == await referredCheck(array[j]?.countrytopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.countrytopup)) {
                if (array[j]?.countrytopup.includes("-")) {
                  let countrytopup = array[j]?.countrytopup
                  countrytopup = countrytopup.split("-")[1]
                  travelBasePremium =
                    travelBasePremium -
                    (basePremium * +countrytopup.split("%")[0]) /
                    100;
                } else {
                  travelBasePremium =
                    travelBasePremium +
                    (basePremium * +array[j]?.countrytopup.split("%")[0]) / 100;
                }
              } else {
                travelBasePremium =
                  travelBasePremium + (+array[j]?.countrytopup);
              }
              break;
            }
          }
        }
        if (matchTravelPlan[i]?.travelPrices?.age_or_topup?.length > 0) {
          let array = matchTravelPlan[i]?.travelPrices?.age_or_topup;
          for (let j = 0; j < array.length; j++) {
            if ((array[j]?.ageMin <= ageOfCustomer && array[j]?.ageMax >= ageOfCustomer)) {
              if ("REFERRED" == await referredCheck(array[j]?.agetopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.agetopup)) {
                if (array[j]?.agetopup.includes("-")) {
                  let agetopup = array[j]?.agetopup
                  agetopup = agetopup.split("-")[1]
                  travelBasePremium =
                    travelBasePremium -
                    (basePremium * +agetopup.split("%")[0]) /
                    100;
                } else {
                  travelBasePremium =
                    travelBasePremium +
                    (basePremium * +array[j]?.agetopup.split("%")[0]) / 100;
                }
              } else {
                travelBasePremium =
                  travelBasePremium + (+array[j]?.agetopup);
              }
              // break;
            }
          }
        }
        if (matchTravelPlan[i]?.travelPrices?.no_of_child?.length > 0) {
          let array = matchTravelPlan[i]?.travelPrices?.no_of_child;
          for (let j = 0; j < array.length; j++) {
            if ((+array[j]?.no_of_childMin <= noOfChild && +array[j]?.no_of_childMax >= noOfChild)) {
              if ("REFERRED" == await referredCheck(array[j]?.no_of_child_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.no_of_child_topup)) {
                if (array[j]?.no_of_child_topup.includes("-")) {
                  let no_of_child_topup = array[j]?.no_of_child_topup
                  no_of_child_topup = no_of_child_topup.split("-")[1]
                  travelBasePremium =
                    travelBasePremium -
                    (basePremium * +no_of_child_topup.split("%")[0]) /
                    100;
                } else {
                  travelBasePremium =
                    travelBasePremium +
                    (basePremium * +array[j]?.no_of_child_topup.split("%")[0]) / 100;
                }
              } else {
                travelBasePremium =
                  travelBasePremium + (+array[j]?.no_of_child_topup);
              }
              break;
            }
          }
        }
        if (matchTravelPlan[i]?.travelPrices?.no_of_spouse?.length > 0) {
          let array = matchTravelPlan[i]?.travelPrices?.no_of_spouse;
          for (let j = 0; j < array.length; j++) {
            if ((+array[j]?.no_of_spouseMin <= noOfSpouse && +array[j]?.no_of_spouseMax >= noOfSpouse)) {
              if ("REFERRED" == await referredCheck(array[j]?.no_of_spouse_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.no_of_spouse_topup)) {
                if (array[j]?.no_of_spouse_topup.includes("-")) {
                  let no_of_spouse_topup = array[j]?.no_of_spouse_topup
                  no_of_spouse_topup = no_of_spouse_topup.split("-")[1]
                  travelBasePremium =
                    travelBasePremium -
                    (basePremium * +no_of_spouse_topup.split("%")[0]) /
                    100;
                } else {
                  travelBasePremium =
                    travelBasePremium +
                    (basePremium * +array[j]?.no_of_spouse_topup.split("%")[0]) / 100;
                }
              } else {
                travelBasePremium =
                  travelBasePremium + (+array[j]?.no_of_spouse_topup);
              }
              break;
            }
          }
        }
        if (matchTravelPlan[i]?.standard_cover_arr?.length > 0) {
          let array = matchTravelPlan[i]?.standard_cover_arr;
          for (let j = 0; j < array.length; j++) {
            if ("REFERRED" == await referredCheck(array[j]?.standard_cover_value)) {
              referred = true;
            } else if (await referredCheck(array[j]?.standard_cover_value)) {
              if (array[j]?.standard_cover_value.includes("-")) {
                let standard_cover_value = array[j]?.standard_cover_value
                standard_cover_value = standard_cover_value.split("-")[1]
                travelBasePremium =
                  travelBasePremium -
                  (basePremium * +standard_cover_value.split("%")[0]) /
                  100;
              } else {
                travelBasePremium =
                  travelBasePremium +
                  (basePremium * +array[j]?.standard_cover_value.split("%")[0]) / 100;
              }
            } else {
              travelBasePremium = travelBasePremium + +array[j]?.standard_cover_value;
            }
          }
        }
        let bussineEntityTopup = await bussinesEntityTopup(leadLocation, matchTravelPlan[i]?.company_id, "6418645df42eaf5ba1c9e0f6")
        let BECommission = 0
        if (bussineEntityTopup) {
          if ("REFERRED" == await referredCheck(bussineEntityTopup)) {
            referred = true;
          } else if (await referredCheck(bussineEntityTopup)) {
            if (bussineEntityTopup.includes("-")) {
              let topup = bussineEntityTopup
              topup = topup.split("-")[1]
              BECommission =

                (finallBasePremium * +topup.split("%")[0]) /
                100;
            } else {
              BECommission =

                (finallBasePremium * +bussineEntityTopup.split("%")[0]) / 100;
            }
          } else {
            // BECommission =
            //   finallBasePremium + +bussineEntityTopup;
            BECommission = +bussineEntityTopup
          }
          finallBasePremium = finallBasePremium + BECommission
        }
        if (referred) {
          matchTravelPlan[i]["travelBasePremium"] = "Referred";
        } else {
          matchTravelPlan[i]["travelBasePremium"] = travelBasePremium; travelDaysRange
        }
        matchTravelPlan[i]["vatComissionPercentage"] = vatData
        matchTravelPlan[i]["BECommission"] = BECommission
        matchTravelPlan[i]["BECommission"] = BECommission ? BECommission : 0
        matchTravelPlan[i]["travelDaysRange"] = travelDaysRange
      }
      for (let i = 0; i < matchTravelPlan.length; i++) {
        for (let j = i + 1; j < matchTravelPlan.length; j++) {
          if (req.body?.price == "Highest Price") {
            if (
              matchTravelPlan[i].travelBasePremium <=
              matchTravelPlan[j].travelBasePremium
            ) {
              let min = matchTravelPlan[j];
              matchTravelPlan[j] = matchTravelPlan[i];
              matchTravelPlan[i] = min;
            }
          } else {
            if (
              matchTravelPlan[i].travelBasePremium >=
              matchTravelPlan[j].travelBasePremium
            ) {
              let min = matchTravelPlan[j];
              matchTravelPlan[j] = matchTravelPlan[i];
              matchTravelPlan[i] = min;
            }
          }
        }
      }
      if (!matchTravelPlan.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data not found",
            data: [],
            totalCount: 0,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: matchTravelPlan,
          totalCount: matchTravelPlan.length,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getTravelPlanByEmail: async (req, res) => {
    try {
      let matchTravelPlan;
      let email = req.body.email;
      if (!email) {
        return res
          .status(400)
          .json({ status: 400, message: "Email Id is Required", data: [] });
      }
      matchTravelPlan = await NewLeadsModels.aggregate([
        {
          $match: {
            email: email,
            type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
          },
        },
      ]);
      if (!matchTravelPlan.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: matchTravelPlan,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getTravelTypes: async (req, res) => {
    try {
      let data;
      data = await travel_types_models.aggregate([
        {
          $match: {
            travel_type_status: 1
          },
        },
        {
          $project: {
            travel_type: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getTravelsInsuranceFor: async (req, res) => {
    try {
      let data;
      data = await travel_insurance_fors_models.aggregate([
        {
          $match: {
            travel_insurance_for_status: 1
          },
        },
        {
          $project: {
            travel_insurance_for: 1,
          },
        },
      ]);

      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getTravelPlanTypes: async (req, res) => {
    try {
      let data;
      data = await travel_plan_types_models.aggregate([
        {
          $match: {
            travel_plan_type_status: 1
          },
        },
        {
          $project: {
            travel_plan_type: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllCountries: async (req, res) => {
    try {
      let data;
      let matchObj = {};
      if (req.query?.countryName) {
        matchObj["country_name"] = {
          $regex: req.query?.countryName,
          $options: "i",
        };
      }
      data = await Countries_models.aggregate([
        {
          $match: matchObj,
        },
        {
          $project: {
            country_name: 1,
          },
        },
        {
          $sort: {
            country_name: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllPlanCategories: async (req, res) => {
    try {
      let data;
      data = await planCategoriesModels.aggregate([
        {
          $match: { plan_category_status: 1 },
        },
        {
          $project: {
            plan_category_name: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAlltravelPlanCoverType: async (req, res) => {
    try {
      let data;
      data = await TravelPlanCoverTypeModel.aggregate([
        {
          $match: {},
        },
        {
          $project: {
            travel_cover_type: 1,
          },
        },
      ]);
      if (!data.length) {
        return res
          .status(404)
          .json({ status: 404, message: "data not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successefully !",
          data: data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  add_medical_benefits: async (req, res) => {
    try {
      const id = req.body.id;
      const data = req.body.formData;
      let medicalBenefit;
      const medicalBenefitArr = [];
      const medical_Benefit = await TableBenefits.find({
        _id: data.map((item) => item.itemId),
      });
      const medical_benefit_id = medical_Benefit.map((item) => item._id);
      const medical_benefit_label = medical_Benefit.map(
        (item) => item.table_benefit
      );
      const medical_benefit_description = medical_Benefit.map(
        (item) => item.table_benefit_description
      );
      const medical_benefit_desc = data.map((item) => item.itemdesc);
      const medical_benefit_value = data.map((item) => item.value);

      medicalBenefit = await MedicalPlan.findById(id);
      medicalBenefit = medicalBenefit?.toObject()?.medical_benefits;

      for (let i = 0; i < medical_benefit_label.length; i++) {
        let plan_data;
        let medical_Benefit_dt;
        plan_data = await MedicalPlan.findById(id);
        medical_Benefit_dt = plan_data.medical_benefits;
        medicalBenefitArr.push({
          itemId: medical_benefit_id[i],
          benefit: medical_benefit_label[i],
          itemdesc:
            medical_benefit_desc[i] == null
              ? medical_Benefit_dt[i]
                ? medical_Benefit_dt[i].itemdesc
                : medical_benefit_description[i]
              : medical_benefit_desc[i],
          value:
            medical_benefit_value[i] == null
              ? medical_Benefit_dt[i]
                ? medical_Benefit_dt[i].value
                : medical_benefit_value[i]
              : medical_benefit_value[i],
        });
      }
      if (medicalBenefit?.length == 0 || !medicalBenefit?.length) {
        medicalBenefit = medicalBenefitArr;
      } else {
        for (let i = 0; i < medicalBenefitArr.length; i++) {
          let count = 0;
          for (let j = 0; j < medicalBenefit.length; j++) {
            if (
              medicalBenefitArr[i]?.itemId?.toString() ==
              medicalBenefit[j]?.itemId?.toString()
            ) {
              count = 1;
              if (!medicalBenefitArr[i]?.value) {
                medicalBenefit.splice(j, 1);
              }
              break;
            }
          }
          if (count == 0) {
            medicalBenefit.push(medicalBenefitArr[i]);
          }
        }
      }
      let result;

      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { medical_benefits: medicalBenefit } },
        { new: true }
      );
      if (result != null) {
        res.json({
          status: 200,
          message: "Medical Benefits Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  add_Standard_underwriting_conditions: async (req, res) => {
    try {
      const id = req.body?.id;
      const data = req.body?.formData;
      console.log(data, "satndard data")
      // return false;
      const standardConditions_arr = [];
      for (let i = 0; i < data.length; i++) {
        standardConditions_arr.push({
          itemId: mongoose.Types.ObjectId(data[i]._id),
          benefit: data[i].feature,
          itemdesc: data[i].description,
          status: data[i].status,
          value: data[i].value,
        });
      }

      console.log(standardConditions_arr, "standardConditions_arr")
      // return false;


      let result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { standard_conditions_arr: standardConditions_arr } },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "Standard Underwriting Conditions Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  add_Additional_underwriting_conditions: async (req, res) => {
    try {
      const id = req.body.id;
      const data = req.body?.formData;
      const additionalConditions_arr = [];
      console.log(data, "additional data")
      for (let i = 0; i < data.length; i++) {
        additionalConditions_arr.push({
          itemId: mongoose.Types.ObjectId(data[i]._id),
          benefit: data[i].feature,
          itemdesc: data[i].description,
          status: data[i].status,
          value: data[i].value,
        });
      }
      let result;

      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { additional_conditions_arr: additionalConditions_arr } },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "additional Underwriting Conditions Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  add_underwriting_conditions: async (req, res) => {
    try {
      const id = req.body.id;
      const data = req.body?.formData;
      console.log(data, "additional data")
      const underwritingConditions_arr = [];
      for (let i = 0; i < data.length; i++) {
        underwritingConditions_arr.push({
          itemId: mongoose.Types.ObjectId(data[i]._id),
          status: data[i].status,
          value: data[i].value,
        });
      }
      let result;

      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { underwriting_conditions_arr: underwritingConditions_arr } },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "Underwriting Conditions Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  add_medicalplan_bmi: async (req, res) => {
    try {
      let data = req.body
      console.log("data>>>>>>>>>>>>>>>>>>>>", data)
      let planId = req.query.plan_id
      let count = 0
      for (let i = 0; i < data.length; i++) {
        let payload = data[i]
        let BMIArray = []
        let ageRange = payload?.age_range?.includes(",") ? payload?.age_range?.split(",") : [payload?.age_range]
        let bmi_range = payload?.bmi_range?.includes(",") ? payload?.bmi_range?.split(",") : [payload?.bmi_range]
        let Malevalue = payload?.Malevalue?.includes(",") ? payload?.Malevalue?.split(",") : [payload?.Malevalue]
        let Femalevalue = payload?.Femalevalue?.includes(",") ? payload?.Femalevalue?.split(",") : [payload?.Femalevalue]
        let FemaleMarridvalue = payload?.FemaleMarridvalue?.includes(",") ? payload?.FemaleMarridvalue?.split(",") : [payload?.FemaleMarridvalue]

        for (let i = 0; i < ageRange.length; i++) {
          BMIArray.push({
            minAge: +ageRange[i]?.split("-")[0],
            maxAge: +ageRange[i]?.split("-")[1],
            minBmi: +bmi_range[i]?.split("-")[0],
            maxBmi: +bmi_range[i]?.split("-")[1],
            Malevalue: +Malevalue[i],
            fmalevalue: +Femalevalue[i],
            fmaleMarridevalue: +FemaleMarridvalue[i]

          })
        }
        console.log("BMIArray>>>>>>>>>>>>>>>>>>>>", BMIArray)
        const result = await MedicalPlanBMI.create({
          medical_plan_id: planId,
          weight_type: payload?.weight_type,
          BMIArray: BMIArray
        });
        count++;
      }
      if (count) {
        return res.json({
          status: 200,
          message: "BMI Added Successfully!",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "BMI Not Added!",
        });
      }
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },
  get_medicalplan_bmi: async (req, res) => {
    try {
      const page = req.body.page;
      const limit = req.body.perPage;
      const id = req.body.medical_plan_id;
      const result = await MedicalPlanBMI.aggregate([
        {
          $match: {
            medical_plan_id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "medical_weight_type_lists",
            localField: "weight_type",
            foreignField: "_id",
            as: "weight_type",
          },
        },
      ])
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await MedicalPlanBMI.countDocuments();
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: count,
      });
    } catch (err) {
      res.send(err);
    }
  },
  medicalplan_bmi_details: async (req, res) => {
    try {
      const id = req.params.id;
      const MedicalPlanBMI_data = await MedicalPlanBMI.findById(id);
      res.json({
        status: 200,
        message: "Data Found",
        data: MedicalPlanBMI_data,
      });
    } catch (error) {
      res.send(error);
    }
  },
  update_medicalplan_bmi: async (req, res) => {
    try {
      const id = req.query.id;
      let payload = req.body
      console.log(payload, ">>>>>>>>payload")
      let BMIArray = []
      let ageRange = payload?.age_range?.includes(",") ? payload?.age_range?.split(",") : [payload?.age_range]
      let bmi_range = payload?.bmi_range?.includes(",") ? payload?.bmi_range?.split(",") : [payload?.bmi_range]
      let Malevalue = payload?.Malevalue?.includes(",") ? payload?.Malevalue?.split(",") : [payload?.Malevalue]
      let fmalevalue = payload?.fmalevalue?.includes(",") ? payload?.fmalevalue?.split(",") : [payload?.fmalevalue]
      let fmaleMarridevalue = payload?.fmaleMarridevalue?.includes(",") ? payload?.fmaleMarridevalue?.split(",") : [payload?.fmaleMarridevalue]

      for (let i = 0; i < ageRange.length; i++) {
        BMIArray.push({
          minAge: +ageRange[i]?.split("-")[0],
          maxAge: +ageRange[i]?.split("-")[1],
          minBmi: +bmi_range[i]?.split("-")[0],
          maxBmi: +bmi_range[i]?.split("-")[1],
          Malevalue: Malevalue[i],
          fmalevalue: fmalevalue[i],
          fmaleMarridevalue: fmaleMarridevalue[i]

        })
      }

      result = await MedicalPlanBMI.findOneAndUpdate(
        { _id: id },
        {
          weight_type: payload?.weight_type,
          BMIArray: BMIArray
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
      res.send(error);
    }
  },
  getAllCompletePolicy: async (req, res) => {
    try {
      let email = req.user?.email;
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email ID is Required ",
            data: [],
            totalCount: 0,
          });
      }
      let policyDtails;
      policyDtails = await NewLeadsModels.aggregate([
        {
          $match: {
            email: email,
            policy_issued_status: 1
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "comapnydetails",
          },
        },
        // {
        //   $unwind: "$comapnydetails",
        // },
        {
          $lookup: {
            from: "motor_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        // {
        //   $unwind: "$planDetails",
        // },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "lobdetails",
          },
        },
        {
          $project: {
            comapnydetails: 1,
            policy_expiry_date: 1,
            final_price: 1,
            documents: 1,
            "planDetails.plan_name": 1,
            "planDetails.excess": 1,
            "planDetails.additional_cover_arr": 1,
            "lead_id": 1,
            "email": 1,
            "phoneno": 1,
            "name": 1,
            "lobdetails.line_of_business_name": 1,
            "lobdetails._id": 1,
          },
        },
      ]);
      if (!policyDtails.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Policy Not found",
            data: [],
            totalCount: 0,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Policy Find Successfully !!",
          data: policyDtails,
          totalCount: policyDtails.length,
        });
    } catch (err) {
      console.log(err);
    }
  },

  getAllPendingPolicy: async (req, res) => {
    try {
      let email = req.user.email;
      console.log(email, "ehhhhhhhhhhhhhhhhmail")
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email ID is Required ",
            data: [],
            totalCount: 0,
          });
      }
      let policyDtails;
      policyDtails = await NewLeadsModels.aggregate([
        {
          $match: {
            email: email,
            policy_issued_status: 0,
            camcelPolicyStatus: false,
            'plan_company_id': {
              '$exists': true
            },
            'plan_id': {
              '$exists': true
            }
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "comapnydetails",
          },
        },
        // {
        //   $unwind: "$comapnydetails",
        // },
        {
          $lookup: {
            from: "motor_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        // {
        //   $unwind: "$planDetails",
        // },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "lobdetails",
          },
        },
        {
          $lookup: {

            from: "documents",
            localField: "type_of_policy",
            foreignField: "document_lob",
            as: "result"
          }

        },
      ]);
      if (!policyDtails.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Policy Not found",
            data: [],
            totalCount: 0,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Policy Find Successfully !!",
          data: policyDtails,
          totalCount: policyDtails.length,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllRenewalPolicy: async (req, res) => {
    try {
      let email = req.user?.email;
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email ID is Required ",
            data: [],
            totalCount: 0,
          });
      }
      let policyDtails;
      policyDtails = await NewLeadsModels.aggregate([
        {
          $match: {
            email: email,
            business_type: "Renewal",
            policy_issued_status: 1,
          },
        },
      ]);
      if (!policyDtails.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Policy Not found",
            data: [],
            totalCount: 0,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Policy Find Successfully !!",
          data: policyDtails,
          totalCount: policyDtails.length,
        });
    } catch (err) {
      console.log(err);
    }
  },
  updatePolicyDetails: async (req, res) => {
    try {
      let payload = req.body;
      let query = req.query
      let id = query.id;
      if (!payload?.businessTypeId) {
        delete payload['businessTypeId']
      }
      if (payload?.additionalCoverArr?.length) {
        payload["additionalCoverArr"] = payload?.additionalCoverArr.map((id) => mongoose.Types.ObjectId(id))
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "Id is Requred ", data: {} })
      }
      if (payload?.current_insurance_company_id === "") {
        delete payload.current_insurance_company_id
      }
      let locationArray, oldLink, oldLocatonNumber;
      if (payload.location) {
        if (payload.insuranceType === "Motor") {
          locationArray = ["Chasisno", "Carbasicinfo", "Carpolicyinfo", "Carmodelyear", "Carmaker", "Carmodel", "Carvariant", "SelectCarvalue", "Carregisterlocation", "Carspecification", "Personaldetails", "Nationality", "Uaedrivingexp", "Lastclaim", "Getquote", "Quotes", "thankyou"]
        }
        else if (payload.insuranceType === "Medical") {
          locationArray = ["Individualpolicy", "Individualinsurancepersonaldetails", "Individualcountry", "Individualinsuranceids", "Individualmetrics", "Individualinsurancequotes", "Individualinsurancepersonaldetails3", "Individualinsurancepersonaldetails2", "Individualinsurancematernity", "Individualinsuranceunderwriting", "Individualinsurancequote"]
        }
        else if (payload.insuranceType === "Travel") {
          locationArray = ["Traveldetails", "Traveldetailsform", "Travelplantype", "Travelpersonalform", 'Familydetails', 'Beneficarydetails', 'Travelquotes', 'TravelSelectedquotes', 'TravelPayments']
        }
        else if (payload.insuranceType === "Home") {
          locationArray = ["Homeinsurance", "Homeplan", "Homevalue", "Homehelper", "Individualmetrics", "Homepersonaldetails", "Homecondition", "Homecondition2", "Homequotes"]
        }
        else if (payload.insuranceType === "Yatch") {
          locationArray = ["Yachtdetails", "YachtlYear", "YachtMaker", "YachtVarient", "Enginedetails", "Suminsured", "yachtpersonaldetails", "Territorycoverage", "Claimsexperience", "OpearatorExperience", "Yachtquotes"]

        }

        for (let i = 0; i < locationArray?.length; i++) {
          locationArray[i] = locationArray[i]
        }
        let newLocationNumber = locationArray?.indexOf(payload.location)
        let oldLead = await NewLeadsModels.findById(id)
        console.log("oldLead", oldLead)
        if (oldLead) {
          oldLead = oldLead.toObject()
          oldLink = oldLead?.buisnessEntityCostomerLink
          oldLocatonNumber = oldLead.location
        }


        if (oldLocatonNumber && (newLocationNumber > oldLocatonNumber)) {
          if (oldLink) {
            oldLink = oldLink.split("y.in")
            payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?${oldLink[1].split("?")[1]}`
          } else {
            payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?leadid=${id}`
          }
          payload["location"] = +newLocationNumber
        }
        else if (!oldLocatonNumber) {
          if (oldLink) {
            oldLink = oldLink.split("y.in")
            payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload.location}?${oldLink[1].split("?")[1]}`
          } else {
            payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?leadid=${id}`
          }
          payload["location"] = +newLocationNumber
        } else {
          payload["location"] = +oldLocatonNumber
        }
      }
      else if (payload?.locationurl) {
        payload["buisnessEntityCostomerLink"] = payload?.locationurl
      }
      if (!id) {
        return res
          .status(400)
          .json({ status: 400, message: "ID is Required " });
      }
      if (payload.insuranceType === "Travel") {
        payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
      }
      if (payload.insuranceType === "Yatch") {
        payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
      }
      if (payload.insuranceType === "Other") {
        payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
      }
      if (payload.insuranceType === "Medical") {
        payload["type_of_policy"] = "641bf214cbfce023c8c76762";
      }
      if (payload.insuranceType === "Motor") {
        payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
      }
      let policyDtails;
      policyDtails = await NewLeadsModels.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (!policyDtails) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data not Updated Successfully",
            data: [],
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: policyDtails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  // updatePolicyDetails: async (req, res) => {
  //   try {
  //     let payload = req.body;
  //     let query =  req.query
  //     let id = query.id;
  //     if(!id){
  //       return res.status(404).json({status:404,message:"Id is Requred ",data:{}})
  //     }
  //     if(payload?.current_insurance_company_id === ""){
  //       delete payload.current_insurance_company_id
  //     }
  //     let locationArray
  //     if(payload.location){
  //       locationArray = ["Chasisno","Carbasicinfo","Carpolicyinfo","Carmodelyear","Carmaker","Carmodel","Carvariant","SelectCarvalue","Carregisterlocation","Carspecification","Personaldetails","Nationality","Uaedrivingexp","Lastclaim","Getquote","Quotes","Selectedquotes","Payments"]
  //       for(let i =0;i<locationArray.length;i++){
  //         locationArray[i] = locationArray[i]
  //       }
  //      let newLocationNumber = locationArray.indexOf(payload.location)
  //      let oldLead = await NewLeadsModels.findById(id)
  //      let oldLink = oldLead?.buisnessEntityCostomerLink
  //      oldLead = oldLead.toObject()
  //      oldLink = oldLead?.buisnessEntityCostomerLink
  //      let oldLocatonNumber = oldLead.location
  //      console.log({newLocationNumber,oldLocatonNumber})
  //      if(oldLocatonNumber && (newLocationNumber>oldLocatonNumber)){
  //       if(oldLink){
  //         oldLink = oldLink.split("y.in")
  //         payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?${oldLink[1].split("?")[1]}`
  //       }else{
  //         payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?leadid=${id}`
  //       }

  //      payload["location"] = +newLocationNumber
  //      }
  //      else if(!oldLocatonNumber){
  //      if(oldLink){
  //       oldLink = oldLink.split("y.in")
  //       payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload.location}?${oldLink[1].split("?")[1]}`
  //      }else{
  //       payload["buisnessEntityCostomerLink"] = `https://lmpfrontend.handsintechnology.in/${payload?.location}?leadid=${id}`
  //      }
  //       payload["location"] = +newLocationNumber
  //      }else{
  //       payload["location"] = +oldLocatonNumber
  //      }
  //     }
  //     if (!id) {
  //       return res
  //         .status(400)
  //         .json({ status: 400, message: "ID is Required " });
  //     }
  //     if (payload.insuranceType === "Travel") {
  //       payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
  //     }
  //     if (payload.insuranceType === "Yatch") {
  //       payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
  //     }
  //     if (payload.insuranceType === "Other") {
  //       payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
  //     }
  //     if (payload.insuranceType === "Medical") {
  //       payload["type_of_policy"] = "641bf214cbfce023c8c76762";
  //     }
  //     if (payload.insuranceType === "Motor") {
  //       payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
  //     }
  //     let policyDtails;
  //     policyDtails = await NewLeadsModels.findByIdAndUpdate(id, payload, {
  //       new: true,
  //     });
  //     if (!policyDtails) {
  //       return res
  //         .status(404)
  //         .json({
  //           status: 404,
  //           message: "Data not Updated Successfully",
  //           data: [],
  //         });
  //     }
  //     return res
  //       .status(200)
  //       .json({
  //         status: 200,
  //         message: "Data Updated Successfully !!",
  //         data: policyDtails,
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  add_rates_based_on_age: async (req, res) => {
    try {
      let payload = req.body
      console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', payload)
      let conut = 0
      for (let i = 0; i < payload?.length; i++) {
        let payloadObj = {}
        let emirateId = payload[i]?.emirateId
        let locationArray = payload[i].locationArray
        let primiumArray = []
        let ageRange = payload[i]?.ageRagne
        ageRange = ageRange.split("-")
        let coPayments = payload[i]?.coPayments
        coPayments = coPayments?.includes("::") ? coPayments.split("::") : [coPayments]
        let malePrimium = payload[i]?.malePrimium
        malePrimium = malePrimium?.includes(",") ? malePrimium.split(",") : [malePrimium]
        let femalePrimium = payload[i]?.femalePrimium
        femalePrimium = femalePrimium?.includes(",") ? femalePrimium.split(",") : [femalePrimium]
        let femaleMarridePrimiumRagne = payload[i]?.femaleMarridePrimium
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk", femaleMarridePrimiumRagne)
        femaleMarridePrimiumRagne = femaleMarridePrimiumRagne?.includes(",") ? femaleMarridePrimiumRagne.split(",") : [femaleMarridePrimiumRagne]

        emirateId = emirateId?.map((obj) => mongoose.Types.ObjectId(obj?.value))
        payloadObj["emirateId"] = emirateId
        locationArray = locationArray?.map((obj) => mongoose.Types.ObjectId(obj?.value))
        payloadObj["locationArray"] = locationArray
        payloadObj["name"] = payload[i]?.name
        payloadObj["planCatagoryId"] = payload[i]?.planCatagoryId
        payloadObj["medical_plan_id"] = payload[i]?.medical_plan_id

        payloadObj["network"] = payload[i]?.network
        payloadObj["coPayments"] = payload[i]?.coPayments
        payloadObj["TPA"] = payload[i]?.TPA

        for (let i = 0; i < coPayments.length; i++) {
          primiumArray.push(
            {
              coPayments: coPayments[i],
              malePre: +femalePrimium[i],
              femalePer: +femalePrimium[i],
              marrideFemalePre: +femaleMarridePrimiumRagne[i]

            }
          )
        }
        if (payload[i]?.perioddayRange) {
          let periodData = payload[i]?.perioddayRange?.includes(",") ? payload[i]?.perioddayRange?.split(",") : [payload[i]?.perioddayRange]
          let periodtopup = payload[i]?.perioddayRange_topup?.includes(",") ? payload[i]?.perioddayRange_topup?.split(",") : [payload[i]?.perioddayRange_topup]
          let periodArr = []
          for (let i = 0; i < periodData.length; i++) {
            const pRange = periodData[i]?.split("-")
            periodArr.push({
              min: +pRange[0],
              max: +pRange[1],
              topup: periodtopup[i] ? periodtopup[i] : 0
            })
          }
          payloadObj["perioddays"] = periodArr
        }
        payloadObj["primiumArray"] = primiumArray
        payloadObj["ageRange"] = [{ minAge: +ageRange[0], maxAge: +ageRange[1] }]

        console.log("ppayloadObj...................", payloadObj)
        let data = await RatesBasedOnAge.create(payloadObj)
        console.log('jjjjjjjjjjjjjjjjjj', data)
        conut = conut + 1
      }


      if (conut) {
        return res.json({
          status: 201,
          message: "Rates Successfully!",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Rates Not Added!",
        });
      }
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },
  get_rates_based_on_age: async (req, res) => {


    try {
      let payload = req.body
      const page = payload.page;
      const limit = payload.perPage;
      const id = payload.medical_plan_id;
      let aggregate = {
        $facet: {
          count: [
            {
              $match: {
                medical_plan_id: mongoose.Types.ObjectId(id),
              },
            },
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {
                medical_plan_id: mongoose.Types.ObjectId(id),
              },
            },
            {
              $lookup: {
                from: "plan_categories",
                localField: "planCatagoryId",
                foreignField: "_id",
                as: "planCatagoryData"
              }
            },
            {
              $lookup: {
                from: "locations",
                localField: "locationArray",
                foreignField: "_id",
                as: "locationData"
              }
            },
            {
              '$lookup': {
                'from': 'medical_networks',
                'localField': 'network',
                'foreignField': '_id',
                'as': 'networks'
              }
            },
            {
              '$lookup': {
                'from': 'medical_tpas',
                'localField': 'TPA',
                'foreignField': '_id',
                'as': 'TPAs'
              }
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
      }
      const result = await RatesBasedOnAge.aggregate([aggregate])
      const count = await RatesBasedOnAge.find({
        medical_plan_id: mongoose.Types.ObjectId(id),
      });
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: count,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  rates_based_on_age_details: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkif", id)
      const MedicalPlanRates_data = await RatesBasedOnAge.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "plan_categories",
            localField: "planCatagoryId",
            foreignField: "_id",
            as: "planCatagoryData"
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "locationArray",
            foreignField: "_id",
            as: "locationData"
          }
        },
        {
          $lookup: {
            from: "area_of_registrations",
            localField: "emirateId",
            foreignField: "_id",
            as: "emirateData"
          }
        },
        {
          '$lookup': {
            'from': 'medical_networks',
            'localField': 'network',
            'foreignField': '_id',
            'as': 'networks'
          }
        }, {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'TPA',
            'foreignField': '_id',
            'as': 'TPAs'
          }
        },

        {
          '$lookup': {
            'from': 'locations',
            'localField': 'locationArray',
            'foreignField': '_id',
            'as': 'locationData'
          }
        }

      ]);
      if (MedicalPlanRates_data.length) {
        return res.json({
          status: 200,
          message: "Data Found",
          data: MedicalPlanRates_data,
        });
      }
      return res.json({
        status: 200,
        message: "Data not Found",
        data: MedicalPlanRates_data,
      });
    } catch (error) {
      res.send(error);
    }
  },
  update_medicalplan_rates: async (req, res) => {
    try {
      const id = req.params.id;
      let payload = req.body;
      console.log("payload,,,,,,,,,,,,,,,", payload)
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk", id)
      let payloadObj = {}
      let emirateId = payload?.region_id
      let locationArray = payload.locationArray
      let primiumArray = []
      let ageRange = payload?.ageRagne
      let coPayments = payload?.coPayments
      coPayments = coPayments?.includes("::") ? coPayments.split("::") : [coPayments]
      ageRange = ageRange.split("-")
      let malePrimium = payload?.malePrimium
      malePrimium = malePrimium?.includes(",") ? malePrimium.split(",") : [malePrimium]
      let femalePrimium = payload?.femalePrimium
      femalePrimium = femalePrimium?.includes(",") ? femalePrimium.split(",") : [femalePrimium]
      let femaleMarridePrimiumRagne = payload?.femaleMarridePrimium
      femaleMarridePrimiumRagne = femaleMarridePrimiumRagne?.includes(",") ? femaleMarridePrimiumRagne.split(",") : [femaleMarridePrimiumRagne]
      if (payload?.perioddayRange) {
        let periodData = payload?.perioddayRange?.includes(",") ? payload?.perioddayRange?.split(",") : [payload?.perioddayRange]
        let periodtopup = payload?.perioddayRange_topup?.includes(",") ? payload?.perioddayRange_topup?.split(",") : [payload?.perioddayRange_topup]
        let periodArr = []
        for (let i = 0; i < periodData.length; i++) {
          const pRange = periodData[i]?.split("-")
          periodArr.push({
            min: +pRange[0],
            max: +pRange[1],
            topup: periodtopup[i] ? periodtopup[i] : 0
          })
        }
        payloadObj["perioddays"] = periodArr
      }
      emirateId = emirateId?.map((obj) => mongoose.Types.ObjectId(obj?.value))
      payloadObj["emirateId"] = emirateId
      payloadObj["ageRange"] = [{ minAge: +ageRange[0], maxAge: +ageRange[1] }]

      locationArray = locationArray?.map((obj) => mongoose.Types.ObjectId(obj?.value))
      payloadObj["locationArray"] = locationArray
      payloadObj["name"] = payload?.name
      payloadObj["planCatagoryId"] = payload?.planCatagoryId

      payloadObj["network"] = payload?.network
      payloadObj["coPayments"] = payload?.coPayments
      payloadObj["TPA"] = payload?.TPA

      for (let i = 0; i < coPayments.length; i++) {
        primiumArray.push(
          {
            coPayments: coPayments[i],
            malePre: +femalePrimium[i],
            femalePer: +femalePrimium[i],
            marrideFemalePre: +femaleMarridePrimiumRagne[i]

          }
        )
      }
      payloadObj["primiumArray"] = primiumArray
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk", payloadObj)
      let result = await RatesBasedOnAge.findByIdAndUpdate(id, payloadObj, { new: true })
      // console.log("lllllllllllllll", result)

      if (result) {
        return res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        return res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  update_medicalplan_rates_status: async (req, res) => {
    try {
      const id = req.params.id;
      let payload = req.body;
      console.log("payload,,,,,,,,,,,,,,,", payload)
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk", id)

      let result = await RatesBasedOnAge.findByIdAndUpdate(id, { status: payload.status }, { new: true })
      console.log("lllllllllllllll", result)

      if (result) {
        return res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
      } else {
        return res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
  read_plan_rates_excel: async (req, res) => {
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
      const id = req.query.planid;
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
        data = await RatesBasedOnAge.findOneAndUpdate(
          {
            medical_plan_id: mongoose.Types.ObjectId(id),
            plan_admin: await typeConversion(
              xlData[i]?.Plan_Administrator
            ),
          },
          {
            sub_type: xlData[i]?.Subtype,
            sub_sub_type: xlData[i]?.Sub_Subtype,
            gender: xlData[i]?.Gender,
            age_range: xlData[i]?.Age_Range,
            value: xlData[i]?.Value
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
  getAllHomePropertyType: async (req, res) => {
    try {
      let propertyTypeDetails;
      propertyTypeDetails = await homePropertyTypeModels.aggregate([
        {
          $match: {
            home_property_type_status: 1
          }
        },
        {
          $project: {
            home_property_type: 1,
          },
        },
      ]);
      if (!propertyTypeDetails.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: propertyTypeDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllHomeOwnershipStatus: async (req, res) => {
    try {
      let ownerShipDetails;
      ownerShipDetails = await homeOwnerShipStatusModels.aggregate([
        {
          $match: {
            home_ownership_status: 1
          }
        },
        {
          $project: {
            home_owner_type: 1,
          },
        },
      ]);
      if (!ownerShipDetails.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: ownerShipDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllHomePlanType: async (req, res) => {
    try {
      let planTypeDetails;
      planTypeDetails = await homePlanTypeModels.aggregate([
        {
          $match: {
            home_plan_type_status: 1
          }
        },
        {
          $project: {
            home_plan_type: 1,
          },
        },
      ]);
      if (!planTypeDetails.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: planTypeDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllHomeConditions: async (req, res) => {
    try {
      let homeConditionDetails;
      homeConditionDetails = await homeConditionModels.aggregate([
        {
          $match: {
            home_condition_status: 1
          }
        },
        {
          $project: {
            home_condition_label: 1,
          },
        },
      ]);
      if (!homeConditionDetails.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not found", data: [] });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: homeConditionDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getMatchHomePlan: async (req, res) => {
    try {
      let referredCheck = async (str) => {
        if (typeof str === 'string') {
          str = str?.toLowerCase()
          if (str?.includes("r")) {
            return "REFERRED"
          } else if (str?.includes("%")) {
            return true
          }
          else {
            return false
          }

        }

        return false
      }
      let payload = req.body;
      // console.log(payload,"payload");
      let matchHomePlan;
      let building_value = +payload?.building_value
      let personal_belongings_value = +payload?.personal_belongings_value
      let content_value = +payload?.content_value
      let domestic_value = +payload?.domestic_value
      let noOfClaimYear = +payload?.noOfClaimYear
      let Homeconditions = payload?.home_condition

      // if(noOfClaimYear?.toLowerCase() === "never"){
      //   noOfClaimYear = 0
      // }else if(noOfClaimYear){
      //   noOfClaimYear = +noOfClaimYear.split(" ")[0]
      // }
      let newLeadId = payload?.newLeadId
      let leadLocation
      let machObj = { status: 1 };
      if (newLeadId) {
        let leadDetails = await NewLeadsModels.findById(newLeadId)
        leadLocation = leadDetails?.lead_location
        machObj["location.value"] = leadLocation?.toString()
      }
      let totalCount;
      let vatData = await vatModels.findOne({ vat_lob: mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724'), vat_status: 1 })
      vatData = +vatData?.vat_percentage?.split("%")[0]
      if (payload?.home_property_type) {
        machObj["property_type_id.value"] = payload.home_property_type
      }
      if (payload?.home_ownership_status) {
        machObj["ownership_status_id"] = mongoose.Types.ObjectId(
          payload.home_ownership_status
        );
      }
      if (payload?.company_id) {
        machObj["company_id"] = mongoose.Types.ObjectId(payload.company_id);
      }
      if (payload?.home_plan_type) {
        machObj["plan_type_id"] = mongoose.Types.ObjectId(
          payload.home_plan_type
        );
        if (payload?.home_plan_type == "642279d4fb67d39380fef82d") {
          machObj["building_value_or_topup.bvMin"] = {
            $lte: building_value
          }
          machObj["building_value_or_topup.bvMax"] = {
            $gte: building_value
          }
          content_value = 0
          personal_belongings_value = 0
        }
        else if (payload?.home_plan_type == "642279f2fb67d39380fef834") {
          machObj["content_value_or_topup.conMin"] = {
            $lte: content_value
          }
          machObj["content_value_or_topup.conMax"] = {
            $gte: content_value
          }
          machObj["pbvalue_or_topup.pbvMin"] = {
            $lte: personal_belongings_value
          }
          machObj["pbvalue_or_topup.pbvMax"] = {
            $gte: personal_belongings_value
          }
          building_value = 0
        }
        else if (payload?.home_plan_type == "64227a40fb67d39380fef83b" || payload?.home_plan_type == "64227a65fb67d39380fef842") {
          machObj["content_value_or_topup.conMin"] = {
            $lte: content_value
          }
          machObj["content_value_or_topup.conMax"] = {
            $gte: content_value
          }
          machObj["pbvalue_or_topup.pbvMin"] = {
            $lte: personal_belongings_value
          }
          machObj["pbvalue_or_topup.pbvMax"] = {
            $gte: personal_belongings_value
          }
          machObj["building_value_or_topup.bvMin"] = {
            $lte: building_value
          }
          machObj["building_value_or_topup.bvMax"] = {
            $gte: building_value
          }
        }

      }
      if (payload?.nature_id) {
        machObj["nature_of_plan_id"] = mongoose.Types.ObjectId(
          payload.nature_id
        );
      }
      if (payload?.plan_category_id) {
        machObj["plan_category_id"] = mongoose.Types.ObjectId(
          payload.plan_category_id
        );
      }
      if (payload?.additionalCoverId?.length) {
        let additionalarray = payload?.additionalCoverId?.map((val) => mongoose.Types.ObjectId(val))
        machObj["additional_cover_arr.additional_cover_id"] = {
          $in: additionalarray,
        };
      }
      matchHomePlan = await home_plan_model.aggregate([
        {
          $match: machObj,
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
        {
          $unwind: "$companyDetails",
        },
        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$standard_cover_arr", companyId: "$companyDetails._id", plan_type_id: "$plan_type_id", plan_category_id: "$plan_category_id" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                  $expr: {
                    $and: [
                      { $not: { $in: ["$_id", "$$standardId.standard_cover_id"], } },
                      { $in: ["$$companyId", "$standard_cover_company"] },
                      { $in: ["$$plan_type_id", "$home_plan_type"] },
                      { $in: ["$$plan_category_id", "$plan_category_id"] },
                    ]
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
      ]);
      for (let i = 0; i < matchHomePlan?.length; i++) {
        let basePremium = 0;
        let finallBasePremium = 0;
        let planBasePremium = 0;
        let referred = false;
        let homeRate
        let pbValueArray = matchHomePlan[i]?.pbvalue_or_topup
        let contentValueArray = matchHomePlan[i]?.content_value_or_topup
        let buildingValueArray = matchHomePlan[i]?.building_value_or_topup
        for (let j = 0; j < buildingValueArray?.length; j++) {
          let buildingMinmumPrimium = buildingValueArray[j]?.minmumPrimium ? +buildingValueArray[j]?.minmumPrimium : 0
          let buildingPrimium
          if (+buildingValueArray[j]?.bvMin <= building_value && +buildingValueArray[j]?.bvMax >= building_value) {
            let bRate = buildingValueArray[j]?.rate?.toString()
            if (bRate?.includes("%")) {
              bRate = +bRate.split("%")[0]
            } else {
              bRate = +bRate
            }
            homeRate = bRate
            buildingPrimium = (building_value * bRate) / 100
            if (buildingMinmumPrimium > buildingPrimium) {
              buildingPrimium = buildingMinmumPrimium
            }
            finallBasePremium = finallBasePremium + buildingPrimium
            planBasePremium = planBasePremium + buildingMinmumPrimium
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkk", finallBasePremium)
            break
          }
        }
        for (let j = 0; j < contentValueArray?.length; j++) {
          let contendMinmumPrimium = contentValueArray[j]?.minmumPrimium ? +contentValueArray[j]?.minmumPrimium : 0
          let contendPrimium
          if (+contentValueArray[j]?.conMin <= content_value && +contentValueArray[j]?.conMax >= content_value) {
            let cRate = contentValueArray[j]?.rate?.toString()
            if (cRate?.includes("%")) {
              cRate = +cRate.split("%")[0]
            } else {
              cRate = +cRate
            }
            if (!homeRate) {
              homeRate = cRate
            }
            contendPrimium = + (content_value * cRate) / 100
            if (contendMinmumPrimium > contendPrimium) {
              contendPrimium = contendMinmumPrimium
            }
            finallBasePremium = finallBasePremium + contendPrimium
            planBasePremium = planBasePremium + contendMinmumPrimium
            break
          }
        }
        for (let j = 0; j < pbValueArray?.length; j++) {
          let pvMinmumPrimium = pbValueArray[j]?.minmumPrimium ? +pbValueArray[j]?.minmumPrimium : 0
          let pvPrimium
          if (+pbValueArray[j]?.pbvMin <= personal_belongings_value && +pbValueArray[j]?.pbvMax >= personal_belongings_value) {
            let pRate = pbValueArray[j]?.rate?.toString()
            if (pRate?.includes("%")) {
              pRate = +pRate.split("%")[0]
            } else {
              pRate = +pRate
            }
            pvPrimium = +(personal_belongings_value * pRate) / 100
            if (pvMinmumPrimium > pvPrimium) {
              pvPrimium = pvMinmumPrimium
            }
            finallBasePremium = finallBasePremium + pvPrimium
            planBasePremium = planBasePremium + pvMinmumPrimium

            break
          }
        }
        console.log("planBasePremium......................", planBasePremium)
        basePremium = finallBasePremium
        // planBasePremium = finallBasePremium
        let homeAdditionalCondition = matchHomePlan[i]?.condition_arr
        for (let j = 0; j < Homeconditions?.length; j++) {
          for (let k = 0; k < homeAdditionalCondition?.length; k++) {
            if (Homeconditions[j]?._id?.toString() == homeAdditionalCondition[k]?.condition_id?.toString()) {
              let matchHomeCondition = homeAdditionalCondition[k]
              let status = matchHomeCondition?.condition_desc
              let topupAmount = 0
              let topup = matchHomeCondition?.condition_value?.includes(",") ? matchHomeCondition?.condition_value?.split(",") : [matchHomeCondition?.condition_value]
              if ((status[0]?.toLowerCase() == "yes") && (Homeconditions[j]?.value == true) || (status[0]?.toLowerCase() == "no") && (Homeconditions[j]?.value == false)) {
                topupAmount = topup[0]
              }
              else if ((status[1]?.toLowerCase() == "yes") && (Homeconditions[j]?.value == true) || (status[1]?.toLowerCase() == "no") && (Homeconditions[j]?.value == false)) {
                topupAmount = topup[1]

              }
              if ("REFERRED" == await referredCheck(topupAmount)) {
                referred = true;
              } else if (await referredCheck(topupAmount)) {
                if (topupAmount.includes("-")) {
                  let condition_value = topupAmount
                  condition_value = condition_value.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +condition_value.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +topupAmount.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +topupAmount;
              }

            }
          }
        }

        if (matchHomePlan[i]?.domestic_helper_or_topup?.length > 0) {
          let array = matchHomePlan[i]?.domestic_helper_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+array[j]?.domMin <= domestic_value && +array[j]?.domMax >= domestic_value) {
              console.log("lllllllllllllllllll", await referredCheck(array[j]?.dom_topup))
              if ("REFERRED" == await referredCheck(array[j]?.dom_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.dom_topup)) {
                if (array[j]?.dom_topup.includes("-")) {
                  let dom_topup = array[j]?.dom_topup
                  dom_topup = dom_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +dom_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.dom_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.dom_topup;
              }
              break;
            }
          }
        }
        if (matchHomePlan[i]?.building_value_or_topup?.length > 0) {
          let array = matchHomePlan[i]?.building_value_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+buildingValueArray[j]?.bvMin <= building_value && +buildingValueArray[j]?.bvMax >= building_value) {
              if ("REFERRED" == await referredCheck(array[j]?.bv_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.bv_topup)) {
                if (array[j]?.bv_topup.includes("-")) {
                  let bv_topup = array[j]?.bv_topup
                  bv_topup = bv_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +bv_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.bv_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.bv_topup;
              }
              break;
            }
          }
        }
        if (matchHomePlan[i]?.content_value_or_topup?.length > 0) {
          let array = matchHomePlan[i]?.content_value_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+contentValueArray[j]?.conMin <= content_value && +contentValueArray[j]?.conMax >= content_value) {
              if ("REFERRED" == await referredCheck(array[j]?.content_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.content_topup)) {
                if (array[j]?.content_topup.includes("-")) {
                  let content_topup = array[j]?.content_topup
                  content_topup = content_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +content_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.content_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.content_topup;
              }
              break;
            }
          }
        }
        if (matchHomePlan[i]?.pbvalue_or_topup?.length > 0) {
          let array = matchHomePlan[i]?.pbvalue_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+pbValueArray[j]?.pbvMin <= personal_belongings_value && +pbValueArray[j]?.pbvMax >= personal_belongings_value) {
              if ("REFERRED" == await referredCheck(array[j]?.pbv_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.pbv_topup)) {
                if (array[j]?.pbv_topup.includes("-")) {
                  let pbv_topup = array[j]?.pbv_topup
                  pbv_topup = pbv_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +pbv_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.pbv_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.pbv_topup;
              }
              break;
            }
          }
        }
        if (matchHomePlan[i]?.claimyears_or_topup?.length > 0) {
          let array = matchHomePlan[i]?.claimyears_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (+array[j]?.claimyears == noOfClaimYear) {
              if ("REFERRED" == await referredCheck(array[j]?.claimyeardisc)) {
                referred = true;
              } else if (await referredCheck(array[j]?.claimyeardisc)) {
                if (array[j]?.claimyeardisc.includes("-")) {
                  let claimyeardisc = array[j]?.claimyeardisc
                  claimyeardisc = claimyeardisc.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +claimyeardisc.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.claimyeardisc.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.claimyeardisc;
              }
              break;
            }
          }
        }
        if (matchHomePlan[i]?.standard_cover_arr?.length > 0) {
          let array = matchHomePlan[i]?.standard_cover_arr;
          for (let j = 0; j < array.length; j++) {
            if ("REFERRED" == await referredCheck(array[j]?.standard_cover_value)) {
              referred = true;
            } else if (await referredCheck(array[j]?.standard_cover_value)) {
              if (array[j]?.standard_cover_value.includes("-")) {
                let standard_cover_value = array[j]?.standard_cover_value
                standard_cover_value = standard_cover_value.split("-")[1]
                finallBasePremium =
                  finallBasePremium -
                  (basePremium * +standard_cover_value.split("%")[0]) /
                  100;
              } else {
                finallBasePremium =
                  finallBasePremium +
                  (basePremium * +array[j]?.standard_cover_value.split("%")[0]) / 100;
              }
            } else {
              finallBasePremium = finallBasePremium + +array[j]?.standard_cover_value;
            }
          }
        }
        let bussineEntityTopup = await bussinesEntityTopup(leadLocation, matchHomePlan[i]?.company_id, "641bf0a2cbfce023c8c76724")
        let BECommission = 0
        if (bussineEntityTopup) {
          if ("REFERRED" == await referredCheck(bussineEntityTopup)) {
            referred = true;
          } else if (await referredCheck(bussineEntityTopup)) {
            if (bussineEntityTopup.includes("-")) {
              let topup = bussineEntityTopup
              topup = topup.split("-")[1]
              BECommission =

                (finallBasePremium * +topup.split("%")[0]) /
                100;
            } else {
              BECommission =

                (finallBasePremium * +bussineEntityTopup.split("%")[0]) / 100;
            }
          } else {
            // BECommission =
            //   finallBasePremium + +bussineEntityTopup;
            BECommission = +bussineEntityTopup
          }
          finallBasePremium = finallBasePremium + BECommission
        }



        finallBasePremium = finallBasePremium >= planBasePremium ? finallBasePremium : planBasePremium

        if (referred) {
          finallBasePremium = "Referred";
        } else {
          finallBasePremium = finallBasePremium?.toFixed(2);
        }
        // console.log("kkkkkkkdnjcjkdj,,,,,,,,,,,,,,,,,,,,,,",{finallBasePremium},{basePremium})
        matchHomePlan[i]["finallBasePremium"] = finallBasePremium
        // matchHomePlan[i]["addOptionalCondition"] = addOptionalCondition bRate
        matchHomePlan[i]["vatComissionPercentage"] = vatData
        matchHomePlan[i]["BECommission"] = BECommission ? BECommission : 0
        matchHomePlan[i]["homeRate"] = homeRate
      }
      for (let i = 0; i < matchHomePlan.length; i++) {
        for (let j = i + 1; j < matchHomePlan.length; j++) {
          if (req.body?.price == "Highest Price") {
            if (
              matchHomePlan[i].finallBasePremium <=
              matchHomePlan[j].finallBasePremium
            ) {
              let min = matchHomePlan[j];
              matchHomePlan[j] = matchHomePlan[i];
              matchHomePlan[i] = min;
            }
          } else {
            if (
              matchHomePlan[i].finallBasePremium >=
              matchHomePlan[j].finallBasePremium
            ) {
              let min = matchHomePlan[j];
              matchHomePlan[j] = matchHomePlan[i];
              matchHomePlan[i] = min;
            }
          }
        }
      }
      totalCount = matchHomePlan.length;
      if (!totalCount) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data Not Found",
            data: [],
            totalCount: totalCount,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !",
          data: matchHomePlan,
          totalCount: totalCount,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllAdditionalCovered: async (req, res) => {
    try {
      let AllStandardCovered;
      let lob = req.query?.lob;

      if (!req.query?.lob) {
        return res
          .status(400)
          .json({ status: 400, message: "Lob is Required", data: [] });
      }
      if (req.query.lob == "Home") {
        lob = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
      }
      if (req.query?.lob == "Travel") {
        lob = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
      }
      if (req.query?.lob == "Motor") {
        lob = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      }
      if (req.query?.lob == "Medical") {
        lob = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
      }
      if (req.query?.lob == "Yacht") {
        lob = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
      }
      console.log(lob);
      AllStandardCovered = await additionalCoverModels.aggregate([
        {
          $match: {
            additional_cover_lob: lob,
            additional_cover_status: 1
          },
        },
      ]);
      if (!AllStandardCovered?.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data Not Found",
            data: [],
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Find Successfully !!",
          data: AllStandardCovered,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getSessionId: async (req, res) => {
    try {
      let config = req.body;
      console.log(req);
      const username = "merchant.TEST120810000062";
      const password = "e9c1b8c7254e8be8c7a41d71d898f43a";
      const response = await axios.post(
        "https://test-adcb.mtf.gateway.mastercard.com/api/rest/version/72/merchant/TEST120810000062/session",
        config,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${username}:${password}`
            ).toString("base64")}`,
          },
        }
      );
      res.status(201).json({
        message: "Session ID retrieved successfully",
        data: response.data,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
  getMatchYatchPlans: async (req, res) => {
    try {
      let referredCheck = async (str) => {
        if (typeof str === 'string') {
          str = str?.toLowerCase()
          if (str?.includes("r")) {
            return "REFERRED"
          } else if (str?.includes("%")) {
            return true
          }
          else {
            return false
          }

        }
        return false
      }
      let vatData = await vatModels.findOne({ vat_lob: mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739'), vat_status: 1 })
      vatData = +vatData?.vat_percentage?.split("%")[0]
      let machObj = { status: 1 };
      let payload = req.body
      let engineId = payload?.engineId
      let claimsExperience = payload?.claimsExperience
      let opraterMin = payload?.operatorExperience?.min
      let opraterMax = payload?.operatorExperience?.max
      let dinghyValue = payload?.dinghyValue ? +payload?.dinghyValue : 0
      let outBordValue = payload?.outBordValue ? +payload?.outBordValue : 0
      let personalBelogingValue = payload?.personalBelogingValue ? +payload?.personalBelogingValue : 0
      let trailerValue = payload?.trailerValue ? +payload?.trailerValue : 0
      let noOfpersion = payload?.noOfpersion ? +payload?.noOfpersion : 0
      let territoryCoverage = payload?.territoryCoverage
      let hullValue = +payload?.hullValue
      let boatLength = +payload?.boatLength ? +payload?.boatLength : 0
      let boatBreadth = payload?.boatBreadth
      let horsPower = +payload?.horsPower
      let knotsSpeed = +payload?.knotsSpeed ? +payload?.knotsSpeed : 0
      let hullId = payload?.hullId
      let typeOfUseId = payload?.typeOfUseId

      let policyTypeId = payload?.policyTypeId
      let compMachtObj = {}
      let tplObj = {}
      let modelId = payload?.modelId
      let yachtModelDetails = await YachtVarientModels.findById(modelId)
      let boatModels = +yachtModelDetails?.start_year
      let ageOfBoat = new Date()?.getFullYear() - boatModels
      let newLeadId = payload?.newLeadId
      let leadLocation
      if (newLeadId) {
        let leadDetails = await NewLeadsModels.findById(newLeadId)
        leadLocation = leadDetails?.lead_location
        machObj["location.value"] = leadLocation?.toString()
      }
      if (dinghyValue || dinghyValue == 0) {
        machObj["dinghy_ten_value_range_or_topup.dinghy_tender_Min"] = { $lte: dinghyValue }
        machObj["dinghy_ten_value_range_or_topup.dinghy_tender_Max"] = { $gte: dinghyValue }
      }
      if (outBordValue || outBordValue == 0) {
        machObj["outboard_value_range_or_topup.outboard_value_range_Min"] = { $lte: outBordValue }
        machObj["outboard_value_range_or_topup.outboard_value_range_Max"] = { $gte: outBordValue }
      }
      if (personalBelogingValue || personalBelogingValue == 0) {
        machObj["personal_eff_cash_or_topup.personal_effect_cash_range_Min"] = { $lte: personalBelogingValue }
        machObj["personal_eff_cash_or_topup.personal_effect_cash_range_Max"] = { $gte: personalBelogingValue }
      }
      if (trailerValue || trailerValue == 0) {
        machObj["trailer_or_topup.trailer_Min"] = { $lte: trailerValue }
        machObj["trailer_or_topup.trailer_Max"] = { $gte: trailerValue }
      }
      if (noOfpersion || noOfpersion == 0) {
        machObj["passenger_capacity_or_topup.passenger_capacity_Min"] = { $lte: noOfpersion }
        machObj["passenger_capacity_or_topup.passenger_capacity_Max"] = { $gte: noOfpersion }
      }

      if (knotsSpeed || knotsSpeed == 0) {
        machObj["yacht_speed_knot_type_or_topup.min"] = { $lte: knotsSpeed }
        machObj["yacht_speed_knot_type_or_topup.max"] = { $gte: knotsSpeed }
      }
      if (ageOfBoat || ageOfBoat == 0) {
        machObj["age_of_the_car_or_topup.age_of_the_boat_min"] = { $lte: ageOfBoat }
        machObj["age_of_the_car_or_topup.age_of_the_boat_max"] = { $gte: ageOfBoat }
      }
      if (opraterMin || opraterMax) {
        machObj["driving_experience_or_topup.drive_expMin"] = { $lte: opraterMin }
        machObj["driving_experience_or_topup.drive_expMax"] = { $gte: opraterMax }
      }
      if (hullId) {
        machObj["yacht_hull_material_or_topup._id"] = hullId
      }
      if (engineId) {
        machObj["yacht_engine_type_or_topup._id"] = engineId
      }
      if (typeOfUseId) {
        machObj["plan_for._id"] = typeOfUseId
      }
      if (policyTypeId) {
        machObj["last_year_policy_type_or_topup._id"] = policyTypeId
      }


      // if(yachtModelDetails?.bodyTypeId?.toString()){
      //   machObj["yacht_body_type_or_topup._id"] = yachtModelDetails?.bodyTypeId?.toString()
      // }
      if (hullValue) {
        compMachtObj["hull_and_equipment_value_range_or_topup.hull_equipment_Min"] = { $lte: hullValue }
        compMachtObj["hull_and_equipment_value_range_or_topup.hull_equipment_Max"] = { $gte: hullValue }

      }
      if (yachtModelDetails?.bodyTypeId) {
        tplObj["yacht_body_type_or_topup._id"] = yachtModelDetails?.bodyTypeId?.toString()
        compMachtObj["yacht_body_type_or_topup._id"] = yachtModelDetails?.bodyTypeId?.toString()
      }
      if (boatLength) {
        tplObj["yacht_body_type_or_topup.measurement_value_min"] = { $lte: boatLength }
        tplObj["yacht_body_type_or_topup.measurement_value_max"] = { $gte: boatLength }
        compMachtObj["measurement_value_or_topup.Min"] = { $lte: boatLength }
        compMachtObj["measurement_value_or_topup.Max"] = { $gte: boatLength }
      }
      if (payload?.company_id) {
        machObj["company_id"] = mongoose.Types.ObjectId(payload.company_id);
      }
      if (payload?.planNatureId) {
        machObj["nature_of_plan_id"] = mongoose.Types.ObjectId(
          payload.planNatureId
        );
      }

      if (payload?.plan_category_id) {
        machObj["plan_category_id"] = mongoose.Types.ObjectId(
          payload.plan_category_id
        );
      }
      if (payload?.additionalCoverId?.length) {


        machObj["additional_cover_arr.additional_cover_id"] = {
          $in: payload?.additionalCoverId,
        };
      }
      let blackListMatch = {}
      if (modelId) {
        blackListMatch["$or"] = [{
          "black_listed_Yacht.modelId": mongoose.Types.ObjectId(modelId)
        },
        {
          "companies.blackListYatch": {
            $not: {
              $in: [mongoose.Types.ObjectId(modelId)]
            }
          }
        },

        ]
      }
      let yatchPlans
      yatchPlans = await YatchPlanModels.aggregate([
        {
          '$facet': {
            'comper': [
              {
                '$match': {
                  'policy_type_id': mongoose.Types.ObjectId('641161a4591c2f02bcddf51c'),
                  ...compMachtObj,
                  ...machObj
                }
              }
            ],
            'tpl': [
              {
                '$match': {
                  'policy_type_id': mongoose.Types.ObjectId('64365a4f12211cef85f5b102'),
                  ...machObj,
                  ...tplObj
                }
              }
            ]
          }
        }, {
          '$project': {
            'data': {
              '$concatArrays': [
                '$comper', '$tpl'
              ]
            }
          }
        }, {
          '$unwind': {
            'path': '$data'
          }
        },
        {
          '$replaceRoot': {
            'newRoot': '$data'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "companies"
          }
        },
        {
          $match: blackListMatch
        },
        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$standard_cover_arr", companyId: "$companies._id", policTypeId: "$policy_type_id", planCategoryId: "$plan_category_id" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                  $expr: {
                    $and: [
                      // { $not: { $in: ["$_id", "$$standardId.standard_cover_id"], } },
                      // { $in: ["$$companyId", "$standard_cover_company"] },
                      // { $in: ["$$policTypeId", "$standard_cover_plan"] },
                      // { $in: ["$$planCategoryId", "$plan_category_id"] },
                      // { $eq: ["$$planTypeIdCom", "$standard_cover_plan"] },
                    ]
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
      ])
      for (let i = 0; i < yatchPlans.length; i++) {
        let basePremium = 0;
        let finallBasePremium = 0;
        let planBasePremium = finallBasePremium;
        let referred = false;
        let excessAmount
        let yatchRate = 0;

        if (
          yatchPlans[i].policy_type_id?.toString() ===
          "641161a4591c2f02bcddf51c"
        ) {
          console.log(
            "in if>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
          );
          let yachtValurArray =
            yatchPlans[i]?.hull_and_equipment_value_range_or_topup;
          for (let j = 0; j < yachtValurArray.length; j++) {
            excessAmount = yachtValurArray[j]?.excess;
            if (
              hullValue >= +yachtValurArray[j]?.hull_equipment_Min &&
              hullValue <= +yachtValurArray[j]?.hull_equipment_Max
            ) {
              let rate = yachtValurArray[j]?.rate;
              if (typeof rate == "string") {
                rate = +rate.split("%")[0];
              } else {
                rate = +rate;
              }
              yatchRate = rate
              basePremium = (hullValue * rate) / 100;
              planBasePremium = +yachtValurArray[j]?.minimum_premium;
              // if (+yachtValurArray[j]?.minimum_premium > basePremium) {

              //   finallBasePremium = +yachtValurArray[j]?.minimum_premium;
              //   basePremium = finallBasePremium
              // } else {

              //   finallBasePremium = basePremium;
              // }
              break;
            }
          }

          let dinghyArray = yatchPlans[i]?.dinghy_ten_value_range_or_topup;
          for (let j = 0; j < dinghyArray.length; j++) {
            if (
              dinghyValue >= +dinghyArray[j]?.dinghy_tender_Min &&
              dinghyValue <= +dinghyArray[j]?.dinghy_tender_Max
            ) {
              let rate = dinghyArray[j]?.rate ? dinghyArray[j]?.rate : "50%";
              if (typeof rate == "string") {
                rate = +rate.split("%")[0];
              } else {
                rate = +rate;
              }
              basePremium = basePremium + (dinghyValue * rate) / 100;

              break;
            }
          }

          let trailerArray = yatchPlans[i]?.trailer_or_topup;
          for (let j = 0; j < trailerArray.length; j++) {
            if (
              trailerValue >= +trailerArray[j]?.trailer_Min &&
              trailerValue <= +trailerArray[j]?.trailer_Max
            ) {
              let rate = trailerArray[j]?.rate ? trailerArray[j]?.rate : "50%";
              if (typeof rate == "string") {
                rate = +rate.split("%")[0];
              } else {
                rate = +rate;
              }
              basePremium = basePremium + (trailerValue * rate) / 100;

              break;
            }
          }

          let outBordArray = yatchPlans[i]?.outboard_value_range_or_topup;
          for (let j = 0; j < outBordArray.length; j++) {
            if (
              outBordValue >= +outBordArray[j]?.outboard_value_range_Min &&
              outBordValue <= +outBordArray[j]?.outboard_value_range_Max
            ) {
              let rate = outBordArray[j]?.rate ? outBordArray[j]?.rate : "50%";
              if (typeof rate == "string") {
                rate = +rate.split("%")[0];
              } else {
                rate = +rate;
              }
              basePremium = basePremium + (outBordValue * rate) / 100;

              break;
            }
          }
          let personal_eff_Array = yatchPlans[i]?.personal_eff_cash_or_topup;
          for (let j = 0; j < personal_eff_Array.length; j++) {
            if (
              personalBelogingValue >=
              +personal_eff_Array[j]?.personal_effect_cash_range_Min &&
              personalBelogingValue <=
              +personal_eff_Array[j]?.personal_effect_cash_range_Max
            ) {
              let rate = personal_eff_Array[j]?.rate
                ? personal_eff_Array[j]?.rate
                : "50%";
              if (typeof rate == "string") {
                rate = +rate.split("%")[0];
              } else {
                rate = +rate;
              }
              basePremium = basePremium + (personalBelogingValue * rate) / 100;

              break;
            }
          }
          if (+planBasePremium > basePremium) {
            finallBasePremium = +planBasePremium;
            basePremium = finallBasePremium;
          } else {
            finallBasePremium = basePremium;
          }
        } else {
          console.log("in ilse.................>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
          let bodyTypeArra = yatchPlans[i]?.yacht_body_type_or_topup;
          console.log(
            "kkkkkkkkkkkkkkkkkkk",
            bodyTypeArra,
            yachtModelDetails?.bodyTypeId?.toString()
          );

          for (let j = 0; j < bodyTypeArra?.length; j++) {
            if (
              bodyTypeArra[j]?._id?.toString() ===
              yachtModelDetails?.bodyTypeId?.toString() &&
              bodyTypeArra[j]?.cylinder ==
              yachtModelDetails?.motor_model_detail_cylinder
            ) {
              finallBasePremium = +bodyTypeArra[j]?.primium;
              planBasePremium = +bodyTypeArra[j]?.minimum_premium;
              // planBasePremium = +bodyTypeArra[j]?.min_premium
              basePremium = finallBasePremium;
              console.log("basePremium..............", {
                finallBasePremium,
                planBasePremium,
              });
              break;
            }
          }
        }
        if (yatchPlans[i]?.yacht_engine_type_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_engine_type_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?._id?.toString() === engineId?.toString()) {
              if ("REFERRED" == await referredCheck(array[j]?.engine_type_topup)) {

                referred = true;
              } else if (await referredCheck(array[j]?.engine_type_topup)) {
                if (array[j]?.engine_type_topup.includes("-")) {
                  let engine_type_topup = array[j]?.engine_type_topup
                  engine_type_topup = engine_type_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +engine_type_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.engine_type_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.engine_type_topup;
              }
              break;
            }
          }
        }
        if (yatchPlans[i]?.no_claim_years?.length > 0) {
          let array = yatchPlans[i]?.no_claim_years;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?.claimyears == claimsExperience) {
              if ("REFERRED" == await referredCheck(array[j]?.claimyeardisc)) {

                referred = true;
              } else if (await referredCheck(array[j]?.claimyeardisc)) {
                if (array[j]?.claimyeardisc.includes("-")) {
                  let claimyeardisc = array[j]?.claimyeardisc
                  claimyeardisc = claimyeardisc.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +claimyeardisc.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.claimyeardisc.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.claimyeardisc;
              }
              break;
            }
          }
        }
        if ([i]?.driving_experience_or_topup?.length > 0) {
          let array = yatchPlans[i]?.driving_experience_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +opraterMin >= +array[j]?.drive_expMin &&
              +opraterMax <= +array[j]?.drive_expMax
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.drive_experience_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.drive_experience_topup)) {

                if (array[j]?.drive_experience_topup.includes("-")) {
                  let drivingTopup = array[j]?.drive_experience_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.drive_experience_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.drive_experience_topup;
              }
              break;
            }
          }
        }
        if (dinghyValue && yatchPlans[i]?.dinghy_ten_value_range_or_topup?.length > 0) {
          let array = yatchPlans[i]?.dinghy_ten_value_range_or_topup;
          console.log("jjjjjjjj", { dinghyValue, })
          for (let j = 0; j < array.length; j++) {
            if (
              +dinghyValue >= +array[j]?.dinghy_tender_Min &&
              +dinghyValue <= +array[j]?.dinghy_tender_Max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.dinghy_or_tender_value_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.dinghy_or_tender_value_topup)) {

                if (array[j]?.dinghy_or_tender_value_topup.includes("-")) {
                  let drivingTopup = array[j]?.dinghy_or_tender_value_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.dinghy_or_tender_value_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.dinghy_or_tender_value_topup;
              }
              break;
            }
          }
        }

        if (outBordValue && yatchPlans[i]?.outboard_value_range_or_topup?.length > 0) {
          let array = yatchPlans[i]?.outboard_value_range_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +outBordValue >= +array[j]?.outboard_value_range_Min &&
              +outBordValue <= +array[j]?.outboard_value_range_Max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.outboard_value_range_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.outboard_value_range_topup)) {

                if (array[j]?.outboard_value_range_topup.includes("-")) {
                  let drivingTopup = array[j]?.outboard_value_range_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.outboard_value_range_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.outboard_value_range_topup;
              }
              break;
            }
          }
        }

        if (personalBelogingValue && yatchPlans[i]?.personal_eff_cash_or_topup?.length > 0) {
          let array = yatchPlans[i]?.personal_eff_cash_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +personalBelogingValue >= +array[j]?.personal_effect_cash_range_Min &&
              +personalBelogingValue <= +array[j]?.personal_effect_cash_range_Max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.personal_effect_cash_range_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.personal_effect_cash_range_topup)) {

                if (array[j]?.personal_effect_cash_range_topup.includes("-")) {
                  let drivingTopup = array[j]?.personal_effect_cash_range_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.personal_effect_cash_range_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.personal_effect_cash_range_topup;
              }
              break;
            }
          }
        }
        if (boatBreadth && yatchPlans[i]?.yacht_breadth_value_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_breadth_value_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              boatBreadth?.toString() == array[j]?._id?.toString()
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.breadth_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.breadth_topup)) {

                if (array[j]?.breadth_topup.includes("-")) {
                  let drivingTopup = array[j]?.breadth_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.breadth_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.breadth_topup;
              }
              break;
            }
          }
        }
        if (horsPower && yatchPlans[i]?.yacht_horsepower_type_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_horsepower_type_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +horsPower >= +array[j]?.min &&
              +horsPower <= +array[j]?.max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.horsepower_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.horsepower_topup)) {

                if (array[j]?.horsepower_topup.includes("-")) {
                  let drivingTopup = array[j]?.horsepower_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.horsepower_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.horsepower_topup;
              }
              break;
            }
          }
        }
        if (trailerValue && yatchPlans[i]?.trailer_or_topup?.length > 0) {
          let array = yatchPlans[i]?.trailer_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +trailerValue >= +array[j]?.trailer_Min &&
              +trailerValue <= +array[j]?.trailer_Max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.trailer_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.trailer_topup)) {

                if (array[j]?.trailer_topup.includes("-")) {
                  let drivingTopup = array[j]?.trailer_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.trailer_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.trailer_topup;
              }
              break;
            }
          }
        }

        if (yatchPlans[i]?.passenger_capacity_or_topup?.length > 0) {
          let array = yatchPlans[i]?.passenger_capacity_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +noOfpersion >= +array[j]?.passenger_capacity_Min &&
              +noOfpersion <= +array[j]?.passenger_capacity_Max
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.passenger_capacity_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.passenger_capacity_topup)) {

                if (array[j]?.passenger_capacity_topup.includes("-")) {
                  let drivingTopup = array[j]?.passenger_capacity_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.passenger_capacity_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.passenger_capacity_topup;
              }
              break;
            }
          }
        }

        if (yatchPlans[i]?.measurement_value_or_topup?.length > 0) {
          let array = yatchPlans[i]?.measurement_value_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +boatLength >= +array[j]?.Min &&
              +boatLength <= +array[j]?.Max
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.measurement_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.measurement_topup)) {

                if (array[j]?.measurement_topup.includes("-")) {
                  let drivingTopup = array[j]?.measurement_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.measurement_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.measurement_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.hull_and_equipment_value_range_or_topup?.length > 0) {
          let array = yatchPlans[i]?.hull_and_equipment_value_range_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              +hullValue >= +array[j]?.hull_equipment_Min &&
              +hullValue <= +array[j]?.hull_equipment_Max
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.hull_equipment_value_range_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.hull_equipment_value_range_topup)) {

                if (array[j]?.hull_equipment_value_range_topup.includes("-")) {
                  let drivingTopup = array[j]?.hull_equipment_value_range_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.hull_equipment_value_range_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.hull_equipment_value_range_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.yacht_body_type_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_body_type_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              yachtModelDetails?.bodyTypeId?.toString() == array[j]?._id?.toString()
            ) {
              if ("REFERRED" == await referredCheck(array[j]?.y_b_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.y_b_topup)) {

                if (array[j]?.y_b_topup.includes("-")) {
                  let drivingTopup = array[j]?.y_b_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.y_b_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.y_b_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.yacht_speed_knot_type_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_speed_knot_type_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              knotsSpeed >= array[j].min && knotsSpeed <= array[j].max
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.speed_knot_type_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.speed_knot_type_topup)) {

                if (array[j]?.speed_knot_type_topup.includes("-")) {
                  let drivingTopup = array[j]?.speed_knot_type_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.speed_knot_type_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.speed_knot_type_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.age_of_the_car_or_topup?.length > 0) {
          let array = yatchPlans[i]?.age_of_the_car_or_topup;

          for (let j = 0; j < array.length; j++) {
            if (
              ageOfBoat >= array[j]?.age_of_the_boat_min && ageOfBoat <= array[j]?.age_of_the_boat_max
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.age_of_the_boat_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.age_of_the_boat_topup)) {

                if (array[j]?.age_of_the_boat_topup.includes("-")) {
                  let drivingTopup = array[j]?.age_of_the_boat_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.age_of_the_boat_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.age_of_the_boat_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.yacht_hull_material_or_topup?.length > 0) {
          let array = yatchPlans[i]?.yacht_hull_material_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              hullId?.toString() == array[j]?._id?.toString()
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.hull_material_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.hull_material_topup)) {

                if (array[j]?.hull_material_topup.includes("-")) {
                  let drivingTopup = array[j]?.hull_material_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.hull_material_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.hull_material_topup;
              }

              break;
            }
          }
        }

        if (yatchPlans[i]?.last_year_policy_type_or_topup?.length > 0) {
          let array = yatchPlans[i]?.last_year_policy_type_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (
              policyTypeId?.toString() == array[j]?._id?.toString()
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.last_year_policy_type_topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.last_year_policy_type_topup)) {

                if (array[j]?.last_year_policy_type_topup.includes("-")) {
                  let drivingTopup = array[j]?.last_year_policy_type_topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.last_year_policy_type_topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.last_year_policy_type_topup;
              }

              break;
            }
          }
        }
        if (yatchPlans[i]?.black_listed_Yacht?.length > 0) {
          let array = yatchPlans[i]?.black_listed_Yacht;
          for (let j = 0; j < array.length; j++) {
            if (
              modelId?.toString() == array[j]?.modelId?.toString()
            ) {

              if ("REFERRED" == await referredCheck(array[j]?.topup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.topup)) {

                if (array[j]?.topup.includes("-")) {
                  let drivingTopup = array[j]?.topup
                  drivingTopup = drivingTopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +drivingTopup.split("%")[0]) /
                    100;
                }
                else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.topup.split("%")[0]) /
                    100;
                }

              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.topup;
              }

              break;
            }
          }
        }

        let yachtCondition = yatchPlans[i]?.condition_arr
        for (let j = 0; j < territoryCoverage?.length; j++) {
          for (let k = 0; k < yachtCondition?.length; k++) {
            if (territoryCoverage[j]?._id?.toString() == yachtCondition[k]?.condition_id?.toString()) {
              let matchHomeCondition = yachtCondition[k]
              let status = matchHomeCondition?.condition_desc
              let topupAmount = 0
              let topup = matchHomeCondition?.condition_value?.includes(",") ? matchHomeCondition?.condition_value?.split(",") : [matchHomeCondition?.condition_value]
              console.log("matchHomeCondition................", { matchHomeCondition, status, topup })
              if ((status[0]?.toLowerCase() == "yes") && (territoryCoverage[j]?.value == true) || (status[0]?.toLowerCase() == "no") && (territoryCoverage[j]?.value == false)) {
                console.log("in if...................................................")
                topupAmount = topup[0]
              }
              else if ((status[1]?.toLowerCase() == "yes") && (territoryCoverage[j]?.value == true) || (status[1]?.toLowerCase() == "no") && (territoryCoverage[j]?.value == false)) {
                console.log("in else>>>>>>>>>>>>>>>>>>>>>>>...................................................")
                topupAmount = topup[1]

              }
              if ("REFERRED" == await referredCheck(topupAmount)) {
                referred = true;
              } else if (await referredCheck(topupAmount)) {
                if (topupAmount.includes("-")) {
                  let condition_value = topupAmount
                  condition_value = condition_value.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +condition_value.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +topupAmount.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +topupAmount;
              }

            }
          }
        }


        if (yatchPlans[i]?.standard_cover_arr?.length > 0) {
          let array = yatchPlans[i]?.standard_cover_arr;
          for (let j = 0; j < array.length; j++) {
            if ("REFERRED" == await referredCheck(array[j]?.standard_cover_value)) {
              referred = true;
            } else if (await referredCheck(array[j]?.standard_cover_value)) {
              if (array[j]?.standard_cover_value.includes("-")) {
                let standard_cover_value = array[j]?.standard_cover_value
                standard_cover_value = standard_cover_value.split("-")[1]
                finallBasePremium =
                  finallBasePremium -
                  (basePremium * +standard_cover_value.split("%")[0]) /
                  100;
              } else {
                finallBasePremium =
                  finallBasePremium +
                  (basePremium * +array[j]?.standard_cover_value.split("%")[0]) / 100;
              }
            } else {
              finallBasePremium = finallBasePremium + +array[j]?.standard_cover_value;
            }
          }
        }
        let bussineEntityTopup = await bussinesEntityTopup(leadLocation, yatchPlans[i]?.company_id, "641bf0bbcbfce023c8c76739")
        let BECommission = 0
        if (bussineEntityTopup) {
          if ("REFERRED" == await referredCheck(bussineEntityTopup)) {
            referred = true;
          } else if (await referredCheck(bussineEntityTopup)) {
            if (bussineEntityTopup.includes("-")) {
              let topup = bussineEntityTopup
              topup = topup.split("-")[1]
              BECommission =

                (finallBasePremium * +topup.split("%")[0]) /
                100;
            } else {
              BECommission =

                (finallBasePremium * +bussineEntityTopup.split("%")[0]) / 100;
            }
          } else {
            // BECommission =
            //   finallBasePremium + +bussineEntityTopup;
            BECommission = +bussineEntityTopup
          }
          finallBasePremium = finallBasePremium + BECommission
        }
        if (referred) {
          finallBasePremium = "Referred";
        } else {
          finallBasePremium = finallBasePremium >= planBasePremium ? finallBasePremium : planBasePremium
          finallBasePremium = finallBasePremium?.toFixed(2);
        }
        // console.log("kkkkkkkdnjcjkdj,,,,,,,,,,,,,,,,,,,,,,",i,{finallBasePremium},{basePremium})excessAmount yatchRate
        yatchPlans[i]["finallBasePremium"] = finallBasePremium
        yatchPlans[i]["vatComissionPercentage"] = vatData
        yatchPlans[i]["excessAmount"] = excessAmount ? excessAmount : "NA"
        yatchPlans[i]["BECommission"] = BECommission ? BECommission : 0
        yatchPlans[i]["yatchRate"] = yatchRate ? yatchRate : 0


      }
      for (let i = 0; i < yatchPlans.length; i++) {
        for (let j = i + 1; j < yatchPlans.length; j++) {
          if (payload?.price == "Highest Price") {
            if (
              yatchPlans[i].finallBasePremium <=
              yatchPlans[j].finallBasePremium
            ) {
              let min = yatchPlans[j];
              yatchPlans[j] = yatchPlans[i];
              yatchPlans[i] = min;
            }
          } else {
            if (
              yatchPlans[i].finallBasePremium >=
              yatchPlans[j].finallBasePremium
            ) {
              let min = yatchPlans[j];
              yatchPlans[j] = yatchPlans[i];
              yatchPlans[i] = min;
            }
          }
        }
      }
      if (!yatchPlans.length) {
        return res.status(404).json({ status: 404, message: "Data not Found", data: [], totalCount: 0 })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !!", data: yatchPlans, totalCount: yatchPlans.length })
    } catch (err) {
      console.log(err)
    }
  },
  getAllEmirate: async (req, res) => {
    try {
      let matchObj = { medical_visa_country_status: 1 }
      let EmirateDetails
      EmirateDetails = await EmirateModels.aggregate([
        {
          $match: matchObj
        },
        {
          $project: {
            medical_visa_country: 1
          }
        }
      ])
      if (!EmirateDetails.length) {
        return res.status(404).json({ status: 404, message: "Data not Found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !!", data: EmirateDetails })
    } catch (err) {
      console.log(err)
    }
  },
  getAllVisaType: async (req, res) => {
    try {
      let matchObj = { medical_plan_condition_status: 1 }
      let visaTypesDetails
      visaTypesDetails = await visaTypeModels.aggregate([
        {
          $match: matchObj
        },
        {
          $project: {
            medical_plan_condition: 1
          }
        }
      ])
      if (!visaTypesDetails.length) {
        return res.status(404).json({ status: 404, message: "Data not Found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !!", data: visaTypesDetails })
    } catch (err) {
      console.log(err)
    }
  },
  getAllSalary: async (req, res) => {
    try {
      let emirateId = req.query.emirateId
      let matchObj = { medical_salary_range_status: 1 }
      if (emirateId) {
        matchObj["visa_country"] = mongoose.Types.ObjectId(emirateId)
      }
      let salaryDetails
      salaryDetails = await medicalSalaryModels.find(
        matchObj
      ).select("medical_salary_range")
      if (!salaryDetails.length) {
        return res.status(404).json({ status: 404, message: "Data not Found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !!", data: salaryDetails })
    } catch (err) {
      console.log(err)
    }
  },
  getMatchMedicalPlan: async (req, res) => {
    try {
      let referredCheck = async (str) => {
        if (typeof str === 'string') {
          str = str?.toLowerCase()
          if (str?.includes("r")) {
            return "REFERRED"
          } else if (str?.includes("%")) {
            return true
          }
          else {
            return false
          }

        }
        return false
      }
      let vatData = await vatModels.findOne({ vat_lob: mongoose.Types.ObjectId('641bf214cbfce023c8c76762'), vat_status: 1 })
      vatData = +vatData?.vat_percentage?.split("%")[0]
      let payload = req.body
      let nationalityId = payload?.nationalityId
      let salaryRangeId = payload?.salaryRangeId
      let visaTypeId = payload?.visaTypeId
      let emirateId = payload?.emirateId
      let matchObj = { status: 1 }
      let gender = payload?.gender
      let planId = payload?.planId
      let height = +payload?.height
      let weight = +payload?.weight
      let lastPeriodDate = payload?.lastPeriodDate
      let newLeadId = payload?.newLeadId
      let leadLocation
      if (newLeadId) {
        let leadDetails = await NewLeadsModels.findById(newLeadId)
        leadLocation = leadDetails?.lead_location
        matchObj["location.value"] = leadLocation?.toString()
      }
      let noOdPeriodDays = Math.abs(
        new Date().getTime() -
        new Date(lastPeriodDate).getTime()
      ) / (1000 * 60 * 60 * 24).toFixed(1);
      noOdPeriodDays = Math.round(noOdPeriodDays)
      console.log("noOdPeriodDays,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", noOdPeriodDays)
      let bmiCalculation = (weight / (height * height) * 10000)?.toFixed(2)
      let age
      let maternity_condition = payload?.maternity_condition
      let underwritting_condition = payload?.underwritting_condition
      let general_condition = payload?.general_condition
      let standard_conditions_arr = payload?.medical_additional_condition
      let coPayments = payload?.coPayments
      let currentDate = new Date()
      // console.log("2024-currentDate-01T18:30:00.000Z",currentDate?.toString()?.split("-"))
      // console.log("kkkkkkkkkkkkkkkkkkkkkksmckmsdkmc0", currentDate?.getFullYear(), payload?.DOB?.split("-")[0])
      age = (+currentDate?.getFullYear()) - (+payload?.DOB.split('-')[0])
      // console.log("agelllllllllllllllll", {age,bmiCalculation})
      let ratematchObj = { "medicalRates.status": 1 }
      if (emirateId) {
        ratematchObj["medicalRates.emirateId"] = mongoose.Types.ObjectId(emirateId)
      }
      if (age) {
        ratematchObj["medicalRates.ageRange.minAge"] = {
          $lte: age
        }
        ratematchObj["medicalRates.ageRange.maxAge"] = {
          $gte: age
        }
      }
      if (payload?.company_id) {
        matchObj["company_id"] = mongoose.Types.ObjectId(payload?.company_id)
      }
      if (planId) {
        ratematchObj["medicalRates._id"] = mongoose.Types.ObjectId(planId)
      }
      if (visaTypeId) {
        matchObj["plan_condition_or_topup._id"] = visaTypeId
      }

      if (salaryRangeId) {
        matchObj["salary_range_or_topup._id"] = salaryRangeId
      }
      if (payload?.plan_category_id) {
        matchObj["plan_category_id"] = mongoose.Types.ObjectId(payload?.plan_category_id)
      }
      if (payload?.additionalCoverId?.length) {
        let additionalarray = payload?.additionalCoverId?.map((val) => mongoose.Types.ObjectId(val))
        matchObj["additional_cover_arr.additional_cover_id"] = {
          $in: additionalarray,
        };
      }
      if (payload?.nature_id) {
        matchObj["nature_of_plan_id"] = mongoose.Types.ObjectId(
          payload?.nature_id
        );
      }
      // console.log("matcobj...................", matchObj)
      let planDeatals
      planDeatals = await MedicalPlansModels.aggregate([
        {
          $match: matchObj
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "companyDetails"
          }
        },

        {
          $unwind: "$companyDetails",
        },
        {
          '$lookup': {
            'from': 'rates_based_on_ages',
            'localField': '_id',
            'foreignField': 'medical_plan_id',
            'as': 'medicalRates'
          }
        },
        {
          $unwind: "$medicalRates"
        },
        {
          '$lookup': {
            'from': 'medical_plan_bmis',
            'localField': '_id',
            'foreignField': 'medical_plan_id',
            'as': 'bmiData'
          }
        },
        {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'medicalRates.TPA',
            'foreignField': '_id',
            'as': 'tpaData'
          }
        },
        {
          $match: ratematchObj
        },
        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$standard_cover_arr", companyId: "$company_id", plan_category_id: "$plan_category_id" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                  $expr: {
                    $and: [
                      { $not: { $in: ["$_id", "$$standardId.standard_cover_id"], } },
                      { $in: ["$$companyId", "$standard_cover_company"] },
                      // { $in: ["$$plan_type_id", "$home_plan_type"] },
                      // { $in: ["$$plan_category_id", "$plan_category_id"] },
                    ]
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
        //   {
        //     '$lookup': {
        //         'from': 'medical_networks', 
        //         'localField': 'medicalRates.network', 
        //         'foreignField': '_id', 
        //         'as': 'networks'
        //     }
        // }, {
        //     '$lookup': {
        //         'from': 'medical_network_lists', 
        //         'localField': 'networks._id', 
        //         'foreignField': 'networkId', 
        //         'as': 'networkLits'
        //     }
        // },
        {
          '$addFields': {
            'medicalPriceId': '$medicalRates._id'
          }
        },

      ])
      for (let i = 0; i < planDeatals?.length; i++) {
        let planRateArray
        let basePremium = 0;
        let finallBasePremium = 0;
        let planBasePremium = finallBasePremium;
        let referred = false;
        let rateArray = planDeatals[i]?.medicalRates
        let ageArray = rateArray?.ageRange
        planRateArray = rateArray?.primiumArray
        if (coPayments) {
          for (let k = 0; k < planRateArray.length; k++) {

            if (coPayments?.trim() == planRateArray[k]?.coPayments?.trim()) {
              if (gender == "Male") {
                basePremium = planRateArray[k]?.malePre;
              }
              if (gender == "Female (Single)") {
                basePremium = planRateArray[k]?.femalePer;
              }
              if (gender == "Female (Married)") {
                basePremium = planRateArray[k]?.marrideFemalePre;
              }
              break;
            }
          }

        } else {
          if (gender == "Male") {
            basePremium = planRateArray[planRateArray?.length - 1]?.malePre;
          }
          if (gender == "Female (Single)") {
            basePremium = planRateArray[planRateArray?.length - 1]?.femalePer;
          }
          if (gender == "Female (Married)") {
            basePremium = planRateArray[planRateArray?.length - 1]?.marrideFemalePre;
          }
          // console.log("basePremium..................................", basePremium)
        }

        finallBasePremium = basePremium
        planBasePremium = basePremium
        // console.log("basePremium................................",finallBasePremium)
        if (gender != "Male") {
          let maternity_condition_indb = planDeatals[i]?.maternity_condition_arr ? planDeatals[i]?.maternity_condition_arr : []
          for (let j = 0; j < maternity_condition?.length; j++) {
            for (let k = 0; k < maternity_condition_indb?.length; k++) {
              if (maternity_condition[j]?._id?.toString() == maternity_condition_indb[k]?.itemId?.toString()) {
                let matchCondition = maternity_condition_indb[k]
                let conditionStatus = matchCondition?.status
                let topup = matchCondition?.value?.includes(",") ? matchCondition?.value?.split(",") : [matchCondition?.value]
                for (let y = 0; y < conditionStatus.length; y++) {
                  if (maternity_condition[j]?.value?.toString() == conditionStatus[y]?.id?.toString()) {
                    if ("REFERRED" == await referredCheck(topup[y])) {
                      referred = true;
                    } else if (await referredCheck(topup[y])) {
                      if (topup[y].includes("-")) {
                        let condition_value = topup[y]
                        condition_value = condition_value.split("-")[1]
                        finallBasePremium =
                          finallBasePremium -
                          (basePremium * +condition_value.split("%")[0]) /
                          100;
                      } else {
                        finallBasePremium =
                          finallBasePremium +
                          (basePremium * +topup[y].split("%")[0]) / 100;
                      }
                    } else {
                      finallBasePremium =
                        finallBasePremium + +topup[y];
                    }
                  }
                }
              }
            }
          }
        }
        let underwriting_condition_indb = planDeatals[i]?.underwriting_conditions_arr ? planDeatals[i]?.underwriting_conditions_arr : []
        for (let j = 0; j < underwritting_condition?.length; j++) {
          for (let k = 0; k < underwriting_condition_indb?.length; k++) {
            if (underwritting_condition[j]?._id?.toString() == underwriting_condition_indb[k]?.itemId?.toString()) {
              let matchCondition = underwriting_condition_indb[k]
              console.log("matchCondition...............", matchCondition)
              let conditionStatus = matchCondition?.status
              let topup = matchCondition?.value?.includes(",") ? matchCondition?.value?.split(",") : [matchCondition?.value]
              console.log("topup>>>>>>>>>>>>>>>>>>>", topup[0])
              for (let y = 0; y < conditionStatus?.length; y++) {
                if (underwritting_condition[j]?.value?.toString() == conditionStatus[y]?.id?.toString()) {
                  if ("REFERRED" == await referredCheck(topup[y])) {
                    referred = true;
                  } else if (await referredCheck(topup[y])) {
                    if (topup[y].includes("-")) {
                      let condition_value = topup[y]
                      condition_value = condition_value.split("-")[1]
                      finallBasePremium =
                        finallBasePremium -
                        (basePremium * +condition_value.split("%")[0]) /
                        100;
                    } else {
                      finallBasePremium =
                        finallBasePremium +
                        (basePremium * +topup[y].split("%")[0]) / 100;
                    }
                  } else {
                    finallBasePremium =
                      finallBasePremium + +topup[y];
                  }
                }
              }
            }
          }
        }

        let general_condition_indb = planDeatals[i]?.general_condition_arr ? planDeatals[i]?.general_condition_arr : []
        for (let j = 0; j < general_condition?.length; j++) {
          // console.log("jjjjjjjjjjjjjjjj>>>>>>>>>>>>>>>>>>>>>",general_condition_indb)
          for (let k = 0; k < general_condition_indb?.length; k++) {
            if (general_condition[j]?._id?.toString() == general_condition_indb[k]?.itemId?.toString()) {
              let matchCondition = general_condition_indb[k]
              let conditionStatus = matchCondition?.status
              let topup = matchCondition?.value?.includes(",") ? matchCondition?.value?.split(",") : [matchCondition?.value]
              for (let y = 0; y < conditionStatus.length; y++) {
                if (general_condition[j]?.value?.toString() == conditionStatus[y]?.id?.toString()) {
                  if ("REFERRED" == await referredCheck(topup[y])) {
                    referred = true;
                  } else if (await referredCheck(topup[y])) {
                    if (topup[y].includes("-")) {
                      let condition_value = topup[y]
                      condition_value = condition_value.split("-")[1]
                      finallBasePremium =
                        finallBasePremium -
                        (basePremium * +condition_value.split("%")[0]) /
                        100;
                    } else {
                      finallBasePremium =
                        finallBasePremium +
                        (basePremium * +topup[y].split("%")[0]) / 100;
                    }
                  } else {
                    finallBasePremium =
                      finallBasePremium + +topup[y];
                  }
                }
              }
            }
          }
        }

        let standard_condition_indb = planDeatals[i]?.standard_conditions_arr ? planDeatals[i]?.standard_conditions_arr : []
        for (let j = 0; j < standard_conditions_arr?.length; j++) {
          for (let k = 0; k < standard_condition_indb?.length; k++) {
            if (standard_conditions_arr[j]?._id?.toString() == standard_condition_indb[k]?.itemId?.toString()) {
              let matchCondition = standard_condition_indb[k]
              let conditionStatus = matchCondition?.status
              let topup = matchCondition?.value?.includes(",") ? matchCondition?.value?.split(",") : [matchCondition?.value]
              for (let y = 0; y < conditionStatus.length; y++) {
                if (standard_conditions_arr[j]?.value?.toString() == conditionStatus[y]?.id?.toString()) {
                  if ("REFERRED" == await referredCheck(topup[y])) {
                    referred = true;
                  } else if (await referredCheck(topup[y])) {
                    if (topup[y].includes("-")) {
                      let condition_value = topup[y]
                      condition_value = condition_value.split("-")[1]
                      finallBasePremium =
                        finallBasePremium -
                        (basePremium * +condition_value.split("%")[0]) /
                        100;
                    } else {
                      finallBasePremium =
                        finallBasePremium +
                        (basePremium * +topup[y].split("%")[0]) / 100;
                    }
                  } else {
                    finallBasePremium =
                      finallBasePremium + +topup[y];
                  }
                }
              }
            }
          }
        }
        let medical_additional_condition_indb = planDeatals[i]?.standard_conditions_arr ? planDeatals[i]?.standard_conditions_arr : []
        for (let j = 0; j < standard_conditions_arr?.length; j++) {
          for (let k = 0; k < medical_additional_condition_indb?.length; k++) {
            if (standard_conditions_arr[j]?.itemId?.toString() == medical_additional_condition_indb[k]?.itemId?.toString()) {
              let matchCondition = medical_additional_condition_indb[k]
              let conditionStatus = matchCondition?.status
              let topup = matchCondition?.value?.includes(",") ? matchCondition?.value?.split(",") : [matchCondition?.value]
              for (let y = 0; y < conditionStatus?.length; y++) {
                if (standard_conditions_arr[j]?.value?.toString() == conditionStatus[y]?.id?.toString()) {
                  if ("REFERRED" == await referredCheck(topup[y])) {
                    referred = true;
                  } else if (await referredCheck(topup[y])) {
                    if (topup[y].includes("-")) {
                      let condition_value = topup[y]
                      condition_value = condition_value.split("-")[1]
                      finallBasePremium =
                        finallBasePremium -
                        (basePremium * +condition_value.split("%")[0])
                      100;
                    } else {
                      finallBasePremium =
                        finallBasePremium +
                        (basePremium * +topup[y].split("%")[0]) / 100;
                    }
                  } else {
                    finallBasePremium =
                      finallBasePremium + +topup[y];
                  }
                }
              }
            }
          }
        }

        if (planDeatals[i]?.nationality_or_topup?.length > 0) {
          let array = planDeatals[i]?.nationality_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?._id?.toString() === nationalityId?.toString()) {
              if ("REFERRED" == await referredCheck(array[j]?.nationalitytopup)) {
                referred = true;
              } else if (await referredCheck(array[j]?.nationalitytopup)) {
                if (array[j]?.nationalitytopup.includes("-")) {
                  let nationalitytopup = array[j]?.nationalitytopup
                  nationalitytopup = nationalitytopup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +nationalitytopup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.nationalitytopup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.nationalitytopup;
              }
              break;
            }
          }
        }
        if (planDeatals[i]?.bmiData?.length > 0) {
          let array = planDeatals[i]?.bmiData;
          for (let j = 0; j < array.length; j++) {
            let BMIArray = array[j]?.BMIArray[0]
            if ((age >= +BMIArray.minAge && age <= +BMIArray.maxAge) && (bmiCalculation >= +BMIArray.minBmi && bmiCalculation <= +BMIArray.maxBmi)) {
              let bmiTotup
              if (gender == "Male") {
                bmiTotup = BMIArray.Malevalue
              }
              else if (gender == "Female (Single)") {
                bmiTotup = BMIArray.fmalevalue
              }
              else if (gender == "Female (Married)") {
                bmiTotup = BMIArray.fmaleMarridevalue
              }
              if ("REFERRED" == await referredCheck(bmiTotup)) {

                referred = true;
              } else if (await referredCheck(bmiTotup)) {
                if (bmiTotup.includes("-")) {
                  let bmiTotup = bmiTotup
                  bmiTotup = bmiTotup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +bmiTotup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +bmiTotup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +bmiTotup;
              }
              break;
            }
          }
        }


        if (planDeatals[i]?.medicalRates?.perioddays?.length > 0) {
          let array = planDeatals[i]?.medicalRates?.perioddays
          for (let j = 0; j < array.length; j++) {
            if (+noOdPeriodDays >= +array[j]?.min && +noOdPeriodDays <= +array[j]?.max) {
              if ("REFERRED" == await referredCheck(array[j]?.topup)) {

                referred = true;
              } else if (await referredCheck(array[j]?.topup)) {
                if (array[j]?.topup.includes("-")) {
                  let topup = array[j]?.topup
                  topup = topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.topup;
              }
              break;
            }
          }
        }
        if (planDeatals[i]?.salary_range_or_topup?.length > 0) {
          let array = planDeatals[i]?.salary_range_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?._id?.toString() === salaryRangeId?.toString()) {
              if ("REFERRED" == await referredCheck(array[j]?.salary_range_topup)) {

                referred = true;
              } else if (await referredCheck(array[j]?.salary_range_topup)) {
                if (array[j]?.salary_range_topup.includes("-")) {
                  let salary_range_topup = array[j]?.salary_range_topup
                  salary_range_topup = salary_range_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +salary_range_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.salary_range_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.salary_range_topup;
              }
              break;
            }
          }
        }

        if (planDeatals[i]?.plan_condition_or_topup?.length > 0) {
          let array = planDeatals[i]?.plan_condition_or_topup;
          for (let j = 0; j < array.length; j++) {
            if (array[j]?._id?.toString() === visaTypeId?.toString()) {
              if ("REFERRED" == await referredCheck(array[j]?.plan_condition_topup)) {

                referred = true;
              } else if (await referredCheck(array[j]?.plan_condition_topup)) {
                if (array[j]?.plan_condition_topup.includes("-")) {
                  let plan_condition_topup = array[j]?.plan_condition_topup
                  plan_condition_topup = plan_condition_topup.split("-")[1]
                  finallBasePremium =
                    finallBasePremium -
                    (basePremium * +plan_condition_topup.split("%")[0]) /
                    100;
                } else {
                  finallBasePremium =
                    finallBasePremium +
                    (basePremium * +array[j]?.plan_condition_topup.split("%")[0]) / 100;
                }
              } else {
                finallBasePremium =
                  finallBasePremium + +array[j]?.plan_condition_topup;
              }
              break;
            }
          }
        }

        if (planDeatals[i]?.standard_cover_arr?.length > 0) {
          let array = planDeatals[i]?.standard_cover_arr;
          for (let j = 0; j < array.length; j++) {
            if ("REFERRED" == await referredCheck(array[j]?.standard_cover_value)) {
              referred = true;
            } else if (await referredCheck(array[j]?.standard_cover_value)) {
              if (array[j]?.standard_cover_value.includes("-")) {
                let standard_cover_value = array[j]?.standard_cover_value
                standard_cover_value = standard_cover_value.split("-")[1]
                finallBasePremium =
                  finallBasePremium -
                  (basePremium * +standard_cover_value.split("%")[0]) /
                  100;
              } else {
                finallBasePremium =
                  finallBasePremium +
                  (basePremium * +array[j]?.standard_cover_value.split("%")[0]) / 100;
              }
            } else {
              finallBasePremium = finallBasePremium + +array[j]?.standard_cover_value;
            }
          }
        }
        let bussineEntityTopup = await bussinesEntityTopup(leadLocation, planDeatals[i]?.company_id, "641bf214cbfce023c8c76762")
        let BECommission = 0
        if (bussineEntityTopup) {
          if ("REFERRED" == await referredCheck(bussineEntityTopup)) {
            referred = true;
          } else if (await referredCheck(bussineEntityTopup)) {
            if (bussineEntityTopup.includes("-")) {
              let topup = bussineEntityTopup
              topup = topup.split("-")[1]
              BECommission =

                (finallBasePremium * +topup.split("%")[0]) /
                100;
            } else {
              BECommission =

                (finallBasePremium * +bussineEntityTopup.split("%")[0]) / 100;
            }
          } else {
            // BECommission =
            //   finallBasePremium + +bussineEntityTopup;
            BECommission = +bussineEntityTopup
          }
          finallBasePremium = finallBasePremium + BECommission
        }

        if (referred) {
          finallBasePremium = "Referred";
        } else {
          finallBasePremium = finallBasePremium >= planBasePremium ? finallBasePremium : planBasePremium
          finallBasePremium = Math.round(finallBasePremium);
        }
        // console.log("kkkkkkkdnjcjkdj,,,,,,,,,,,,,,,,,,,,,,",i,{finallBasePremium},{basePremium})
        planDeatals[i]["finallBasePremium"] = finallBasePremium
        planDeatals[i]["vatComissionPercentage"] = vatData
        planDeatals[i]["planRateArray"] = planRateArray
        planDeatals[i]["BECommission"] = BECommission ? BECommission : 0


      }
      for (let i = 0; i < planDeatals.length; i++) {
        for (let j = i + 1; j < planDeatals.length; j++) {
          if (payload?.price == "Highest Price") {
            if (
              planDeatals[i].finallBasePremium <=
              planDeatals[j].finallBasePremium
            ) {
              let min = planDeatals[j];
              planDeatals[j] = planDeatals[i];
              planDeatals[i] = min;
            }
          } else {
            if (
              planDeatals[i].finallBasePremium >=
              planDeatals[j].finallBasePremium
            ) {
              let min = planDeatals[j];
              planDeatals[j] = planDeatals[i];
              planDeatals[i] = min;
            }
          }
        }
      }
      if (!planDeatals.length) {
        return res.status(404).json({ status: 404, message: "Data not Found", data: [], total: 0 })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !!", data: planDeatals, total: planDeatals.length })
    } catch (err) {
      console.log(err)
    }
  },
  getCarEstimatedValue: async (req, res) => {
    try {
      let payload = req.body
      let [
        car_maker,
        model_year,
        car_model,
        car_variant,
      ] = [
          payload?.car_maker,
          payload?.model_year,
          payload?.car_model,
          payload?.car_variant,
        ];
      let motordetails = await moterDetailsModels.aggregate([
        {
          '$match': {
            'motor_model_detail_start_year': +model_year,
            'motor_model_detail_name': car_variant
          }
        },
        {
          '$lookup': {
            'from': 'make_motors',
            'localField': 'motor_model_make_id',
            'foreignField': '_id',
            'as': 'makers'
          }
        }, {
          '$lookup': {
            'from': 'motor_models',
            'localField': 'motor_model_detail_model_id',
            'foreignField': '_id',
            'as': 'models'
          }
        },
        {
          '$match': {
            'makers.make_motor_name': car_maker,
            'models.motor_model_name': car_model
          }
        }
      ]);
      if (!motordetails.length) {
        return res.status(404).json({ status: 404, message: "Car Details Not Match", minCarValue: 0, maxCarValue: 0 })
      }
      motordetails = motordetails[0];
      minCarValue = +motordetails?.motor_model_detail_min;
      maxCarValue = +motordetails?.motor_model_detail_max;
      minDep = +motordetails?.motor_model_detail_min_dep;
      maxDep = +motordetails?.motor_model_detail_max_dep;
      model_year = +motordetails?.motor_model_detail_start_year
      if (minCarValue && maxCarValue) {
        let currentYear = +new Date().getFullYear(); maxDep
        for (let i = 0; i < (currentYear - +model_year); i++) {
          minCarValue = minCarValue - (minCarValue * maxDep) / 100;
          maxCarValue = maxCarValue - (maxCarValue * minDep) / 100;
          console.log({ minCarValue, maxCarValue })
        }
        minCarValue = Math.round(minCarValue);
        maxCarValue = Math.round(maxCarValue);
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !!", minCarValue: minCarValue, maxCarValue: maxCarValue, minDep: minDep, maxDep: maxDep })
    } catch (err) {
      console.log(err)
    }
  },
  getAllCancelledPolicy: async (req, res) => {
    try {
      let email = req.user.email;
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email ID is Required ",
            data: [],
            totalCount: 0,
          });
      }
      let policyDtails;
      policyDtails = await NewLeadsModels.aggregate([
        {
          $match: {
            email: email,
            policy_issued_status: 0,
            camcelPolicyStatus: true,
            'plan_company_id': {
              '$exists': true
            },
            'plan_id': {
              '$exists': true
            }
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "comapnydetails",
          },
        },
        // {
        //   $unwind: "$comapnydetails",
        // },
        {
          $lookup: {
            from: "motor_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "lobdetails",
          },
        },
        {
          $lookup: {
            from: "documents",
            localField: "type_of_policy",
            foreignField: "document_lob",
            as: "result"
          }
        },
        {
          $lookup: {
            from: "standard_covers",
            let: { standardId: "$planDetails.standard_cover_arr" },
            pipeline: [
              {
                $match: {
                  standard_cover_lob: "6418643bf42eaf5ba1c9e0ef",
                  $expr: {
                    $not: {
                      $in: ["$_id", "$$standardId.standard_cover_id"],
                    },
                  },
                },
              },
            ],
            as: "notCoveredData",
          },
        },
        // {
        //   $unwind: "$planDetails",
        // },
      ]);
      if (!policyDtails.length) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Policy Not found",
            data: [],
            totalCount: 0,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Policy Find Successfully !!",
          data: policyDtails,
          totalCount: policyDtails.length,
        });
    } catch (err) {
      console.log(err);
    }
  },
  renewalInsurancePlan: async (req, res) => {
    try {
      // let payload = req.body;
      let lead_id = req.query?.id
      let planDetails;
      let plicyType;
      let matchObj = { email: payload.email };
      if (!payload.insuranceType) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Insurance Type is required ",
            data: {},
          });
      }
      let customerData;
      customerData = await Customer.find({ email: payload.email });
      payload["lead_location"] = ["64116415591c2f02bcddf51e"];
      if (payload.insuranceType === "Travel") {
        payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
        plicyType = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Yatch") {
        payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
        plicyType = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Other") {
        payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
        plicyType = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Medical") {
        payload["type_of_policy"] = "641bf214cbfce023c8c76762";
        plicyType = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
        matchObj["type_of_policy"] = plicyType;
      }
      if (payload.insuranceType === "Motor") {
        payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
        if (!payload?.current_renewal) {
          delete payload.current_renewal;
        }
        if (!payload?.current_insurance_company_id) {
          delete payload.current_insurance_company_id;
        }
        plicyType = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
        matchObj["type_of_policy"] = plicyType;
        if (payload?.model_year) {
          matchObj["model_year"] = payload?.model_year;
        }
        if (payload?.car_maker) {
          matchObj["car_maker"] = payload?.car_maker;
        }
        if (payload?.car_model) {
          matchObj["car_model"] = payload?.car_model;
        }
        if (payload?.car_variant) {
          matchObj["car_variant"] = payload?.car_variant;
        }
      }
      if (payload.insuranceType === "Home") {
        payload["type_of_policy"] = "641bf0a2cbfce023c8c76724";
        plicyType = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
        matchObj["type_of_policy"] = plicyType;
      }
      // planDetails = await NewLeadsModels.findOne(matchObj);
      // if (planDetails) {
      //   planDetails = await NewLeadsModels.findOneAndUpdate(matchObj, payload,{new:true});
      // } else {
      //   let newLeads = await NewLeadsModels.aggregate([
      //     {
      //       $sort: {
      //         new_lead_timestamp: -1,
      //       },
      //     },
      //     {
      //       $limit: 1,
      //     },
      //   ]);
      //   if (!newLeads.length) {
      //     newLeads = 1000;
      //     payload["lead_id"] = newLeads;
      //   } else {
      //     newLeads = +newLeads[0]?.lead_id + 1;
      //     payload["lead_id"] = newLeads;
      //   }
      //   planDetails = await NewLeadsModels.create(payload);
      // }
      if (!planDetails) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Data not Saved Successfully",
            data: {},
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Saved Successfully",
          data: planDetails,
        });
    } catch (err) {
      console.log(err);
    }
  },
  addRenewalLead: async (req, res) => {
    try {
      let payload = req.body;
      let payloadObj = {}
      let newLeadId = req.query?.newLeadId
      let newLeadDetails
      let renewalLeadExist;
      let plicyType;
      let lob
      let matchObj = {}
      newLeadDetails = await NewLeadsModels.findById(newLeadId)
      if (!newLeadDetails) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Incorrect Newlead ID",
            data: {},
          });
      }
      newLeadDetails = newLeadDetails?.toObject()
      lob = newLeadDetails?.type_of_policy?.toString()
      payloadObj["type_of_policy"] = lob
      payloadObj["supervisor_id"] = ["647850ee3c8261854147eff6"];
      payloadObj["lead_location"] = ["64116415591c2f02bcddf51e"];
      payloadObj["lead_status"] = "Renewal"
      matchObj["email"] = newLeadDetails?.email
      matchObj["type_of_policy"] = mongoose.Types.ObjectId(lob);
      matchObj["lead_status"] = "Renewal"


      if (lob == "6418643bf42eaf5ba1c9e0ef") {
        matchObj["model_year"] = newLeadDetails?.model_year;
        matchObj["car_maker"] = newLeadDetails?.car_maker;
        matchObj["car_model"] = newLeadDetails?.car_model;
        matchObj["car_variant"] = newLeadDetails?.car_variant;
      }
      else if (lob == "6418645df42eaf5ba1c9e0f6") {

      }
      else if (lob == "641bf0bbcbfce023c8c76739") {

      }
      else if (lob == "64defed43635b4f7b55fcd4b") {

      }
      else if (lob == "641bf214cbfce023c8c76762") {

      }

      console.log("newLeadDetails.....................", newLeadDetails)
      // let matchObj = { email: payload.email, business_type: payload.business_type };
      // if (!payload.insuranceType) {
      //   return res
      //     .status(400)
      //     .json({
      //       status: 400,
      //       message: "Insurance Type is required ",
      //       data: {},
      //     });
      // }
      // payload["lead_location"] = ["64116415591c2f02bcddf51e"];
      // payload["supervisor_id"] = ["647850ee3c8261854147eff6"];
      // if (payload.insuranceType === "Travel") {
      //   payload["type_of_policy"] = "6418645df42eaf5ba1c9e0f6";
      //   plicyType = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
      //   matchObj["type_of_policy"] = plicyType;
      // }
      // if (payload.insuranceType === "Yatch") {
      //   payload["type_of_policy"] = "641bf0bbcbfce023c8c76739";
      //   plicyType = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
      //   matchObj["type_of_policy"] = plicyType;
      // }
      // if (payload.insuranceType === "Other") {
      //   payload["type_of_policy"] = "64defed43635b4f7b55fcd4b";
      //   plicyType = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
      //   matchObj["type_of_policy"] = plicyType;
      // }
      // if (payload.insuranceType === "Medical") {
      //   payload["type_of_policy"] = "641bf214cbfce023c8c76762";
      //   plicyType = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
      //   matchObj["type_of_policy"] = plicyType;
      // }
      // if (payload.insuranceType === "Motor") {
      //   payload["type_of_policy"] = "6418643bf42eaf5ba1c9e0ef";
      //   plicyType = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      //   matchObj["type_of_policy"] = plicyType;
      //   if (payload?.model_year) {
      //     matchObj["model_year"] = payload?.model_year;
      //   }
      //   if (payload?.car_maker) {
      //     matchObj["car_maker"] = payload?.car_maker;
      //   }
      //   if (payload?.car_model) {
      //     matchObj["car_model"] = payload?.car_model;
      //   }
      //   if (payload?.car_variant) {
      //     matchObj["car_variant"] = payload?.car_variant;
      //   }
      // }
      // if (payload.insuranceType === "Home") {
      //   payload["type_of_policy"] = "641bf0a2cbfce023c8c76724";
      //   plicyType = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");
      //   matchObj["type_of_policy"] = plicyType;
      // }
      console.log("matchObj.....................", matchObj)
      renewalLeadExist = await NewLeadsModels.findOne(matchObj);
      if (renewalLeadExist) {
        renewalLeadExist = await NewLeadsModels.findOneAndUpdate(matchObj, payload, { new: true });
        console.log("renewalLeadExist..................", renewalLeadExist)
      }
      else {
        let newLeads = await NewLeadsModels.aggregate([
          {
            $sort: {
              new_lead_timestamp: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
        if (!newLeads.length) {
          newLeads = 1000;
          payloadObj["lead_id"] = newLeads;
        } else {
          newLeads = +newLeads[0]?.lead_id + 1;
          payloadObj["lead_id"] = newLeads;
        }
        renewalLeadExist = await NewLeadsModels.create(payloadObj);
      }
      if (!renewalLeadExist) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Data not Saved Successfully",
            data: {},
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Saved Successfully",
          data: renewalLeadExist,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getAllNattionlity: async (req, res) => {
    try {
      let query = req.query
      let lob = query.lob
      let planFor = query?.planFor
      let data = [];
      let matchObj1 = { nationality_status: 1 }
      if (planFor == "641c25df29b5921dc20ff9eb") {
        matchObj1["_id"] = {
          $ne: mongoose.Types.ObjectId('652fa12c352b69d04cabe93c')
        }
      }
      else if (planFor == "641c25e929b5921dc20ff9ee") {
        matchObj1["_id"] = {
          $eq: mongoose.Types.ObjectId('652fa12c352b69d04cabe93c')
        }

      }
      data = await Nationality.aggregate([
        {
          $match: matchObj1,
        },
        {
          $project: {
            nationality_name: 1,
          },
        },
        {
          $sort: {
            nationality_name: 1,
          },
        },
      ]);
      let matchObj = {}
      if (lob == "Motor") {
        matchObj["type_of_policy"] = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef")
      }
      if (lob == "travel") {
        matchObj["type_of_policy"] = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6")
      }
      if (lob == "Home") {
        matchObj["type_of_policy"] = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724")
      }
      if (lob == "Yacht") {
        matchObj["type_of_policy"] = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739")
      }
      if (lob == "Medical") {
        matchObj["type_of_policy"] = mongoose.Types.ObjectId("641bf214cbfce023c8c76762")
      }
      let data2 = await NewLeadsModels.aggregate([{
        $match: matchObj
      },
      {
        '$group': {
          '_id': '$nationality',
          'total': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'total': -1
        }
      },
      {
        '$match': {
          '_id': {
            '$ne': null
          }
        }
      },
      {
        '$limit': 100
      },
        // {
        //     '$project': {
        //         '_id': {
        //           $toUpper:"$_id"
        //         }
        //     }
        // }
      ])
      let matchArr = []
      if (planFor !== "641c25e929b5921dc20ff9ee") {
        for (let i = 0; i < data2.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data2[i]?._id?.toLowerCase() == data[j]?.nationality_name?.toLowerCase()) {
              matchArr.push(data[j])
              data.splice(j, 1)
              break;
            }

          }

        }
      }
      console.log([])
      console.log('data', data2)
      if (data.length == 0) {
        res
          .status(400)
          .json({
            status: 400,
            message: "Data not Find Successfully",
            data: data,
          });
      }
      res
        .status(200)
        .json({ status: 200, message: "Data Find Successfully", data: [...matchArr, ...data] });
    } catch (err) {
      console.log(err);
    }
  },

  createLeadByCustumerLink: async (req, res) => {
    try {
      let payload = req.body;
      let lob = payload.lob
      let user = req.user
      // if (payload.salesAdvisorId) {
      //   user = await Admin.findById(payload.salesAdvisorId);
      //   delete payload.salesAdvisorId
      // }
      let result
      let newLeadArray = []
      let linkArray = []
      let payloadObj = { name: payload?.name }
      for (let i = 0; i < lob.length; i++) {
        payloadObj["businessEntityId"] = user._id;
        payloadObj["assigned_agent"] = payload?.salesAdvisorId ? payload?.salesAdvisorId : user._id;
        if (user?.location?.length > 1) {
          payloadObj["lead_location"] = "64116415591c2f02bcddf51e"
        } else {
          payloadObj["lead_location"] = user?.location[0]?.loc_id;
        }
        payloadObj["type_of_policy"] = lob[i]
        payloadObj["phoneno"] = payload.phoneno
        payloadObj["email"] = payload.email
        payloadObj["supervisor_id"] = "647850ee3c8261854147eff6";
        payloadObj["assign_salesadvisor_timestamp"] = new Date()
        let newLeads = await NewLeadsModels.aggregate([
          {
            $sort: {
              new_lead_timestamp: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
        if (!newLeads.length) {
          newLeads = 1000;
          payloadObj["lead_id"] = newLeads;
        } else {
          newLeads = +newLeads[0]?.lead_id + 1;
          payloadObj["lead_id"] = newLeads;
        }
        result = await NewLeadsModels.create(
          payloadObj
        );
        if (result) {
          newLeadArray.push(result);
        }
      }
      for (let i = 0; i < newLeadArray.length; i++) {
        let link
        if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "6418643bf42eaf5ba1c9e0ef"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Chasisno?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        } else if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "6418645df42eaf5ba1c9e0f6"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Traveldetails?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        } else if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "641bf0a2cbfce023c8c76724"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Homeinsurance?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        } else if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "641bf0bbcbfce023c8c76739"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Yachtdetails?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        } else if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "641bf214cbfce023c8c76762"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Individualpolicy?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        } else if (
          newLeadArray[i]?.type_of_policy?.toString() ==
          "64defed43635b4f7b55fcd4b"
        ) {
          link = `https://lmpfrontend.handsintechnology.in/Otherinsurance?businessLeadid=${newLeadArray[
            i
          ]?._id.toString()}`;
        }
        let data = await NewLeadsModels.findOneAndUpdate(newLeadArray[i]?._id, { buisnessEntityCostomerLink: link }, { new: true })
        if (data) {
          linkArray.push(data.buisnessEntityCostomerLink)
        }
      }
      if (!linkArray.length) {
        return res.status(400).json({
          status: 400,
          message: "Data not Saved Successfully",
          data: {},
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Saved Successfully",
        data: linkArray,
      });
    } catch (error) {
      console.log(error)
    }
  },
  quotesStanderedCovered: async (req, res) => {
    try {
      let payload = req.body
      let planName = []
      let travelPlanName = []
      let homePlanName = []
      let medicalPlanName = []
      let yatchPlanName = []
      let count = 0
      let coveredType = payload?.coveredType
      let standard_cover_id = payload?.standard_cover_id

      let standardCoveredData = await standardCoverModels.findById(standard_cover_id)
      standardCoveredData = standardCoveredData?.toObject()
      let matchObj = { status: 1 }
      let travelMatchObj = { status: 1 }
      let homeMatchObj = { status: 1 }
      let medicalMatchObj = { status: 1 }

      let companyid = standardCoveredData?.standard_cover_company
      let lobId = standardCoveredData?.standard_cover_lob
      let policyTypeId = standardCoveredData?.standard_cover_plan
      let planCategoriesId = standardCoveredData?.plan_category_id
      let newPayload = {
        standard_cover_id: mongoose.Types.ObjectId(payload?.standard_cover_id),
        standard_cover_label: standardCoveredData?.standard_cover_label,
        standard_cover_desc: standardCoveredData?.standard_cover_description,
        standard_cover_value: 0

      }

      if (companyid?.length) {
        matchObj["company_id"] = { $in: companyid }
        travelMatchObj["company_id"] = { $in: companyid }
        homeMatchObj["company_id"] = { $in: companyid }
        medicalMatchObj["company_id"] = { $in: companyid }
      }
      if (lobId?.length) {
        matchObj["line_of_business_id"] = { $in: lobId }
        travelMatchObj["line_of_business_id"] = { $in: lobId }
        homeMatchObj["line_of_business_id"] = { $in: lobId }
        medicalMatchObj["line_of_business_id"] = { $in: lobId }
      }
      if (policyTypeId?.length) {
        matchObj["policy_type_id"] = { $in: policyTypeId }
      }
      //   planCategoriesId = planCategoriesId?.map(id => mongoose.Types.ObjectId(id))
      //  if(planCategoriesId?.length){
      //   matchObj["plan_category_id"] = {$in:planCategoriesId}
      //  }
      console.log("kkkkkkkkkkkkk", homeMatchObj)
      let plandata = await motor_plan_model.aggregate([
        { $match: matchObj }
      ])
      let travelPlanData = await travel_plan_model.aggregate([
        { $match: travelMatchObj }
      ])
      let homePlanData = await home_plan_model.aggregate([
        { $match: homeMatchObj }
      ])
      let medicalPlanData = await MedicalPlansModels.aggregate([
        { $match: medicalMatchObj }
      ])
      let yatchPlanData = await YatchPlanModels.aggregate([
        { $match: matchObj }
      ])
      if (coveredType == "Add") {
        // Motor Plan
        for (let i = 0; i < plandata.length; i++) {
          let presentCovered = false
          let planStanderedCovered = plandata[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              presentCovered = true
            }
          }
          if (!presentCovered) {
            count++
            planStanderedCovered.push(newPayload)
            let updatedPlan = await motor_plan_model.findByIdAndUpdate(plandata[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
            planName.push(plandata[i]?.plan_name)
          }
        }
        // travel plan
        for (let i = 0; i < travelPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = travelPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              presentCovered = true
            }
          }
          if (!presentCovered) {
            count++
            planStanderedCovered.push(newPayload)
            let updatedPlan = await travel_plan_model.findByIdAndUpdate(travelPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
            travelPlanName.push(travelPlanData[i]?.plan_name)
          }
        }
        // home plan
        for (let i = 0; i < homePlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = homePlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              presentCovered = true
            }
          }
          if (!presentCovered) {
            count++
            planStanderedCovered.push(newPayload)
            let updatedPlan = await home_plan_model.findByIdAndUpdate(homePlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
            homePlanName.push(homePlanData[i]?.plan_name)
          }
        }
        // medical plan
        for (let i = 0; i < medicalPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = medicalPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              presentCovered = true
            }
          }
          if (!presentCovered) {
            count++
            planStanderedCovered.push(newPayload)
            let updatedPlan = await MedicalPlansModels.findByIdAndUpdate(medicalPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
            medicalPlanName.push(medicalPlanData[i]?.plan_name)
          }
        }
        // yatch plan
        for (let i = 0; i < yatchPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = yatchPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              presentCovered = true
            }
          }
          if (!presentCovered) {
            count++
            planStanderedCovered.push(newPayload)
            let updatedPlan = await YatchPlanModels.findByIdAndUpdate(yatchPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
            yatchPlanName.push(yatchPlanData[i]?.plan_name)
            console.log(">>>>>>>>>>>>>>>>plan name: ", yatchPlanData[i]?.plan_name)

          }
        }

      } else if (coveredType == "Remove") {
        // Motor Plan
        for (let i = 0; i < plandata.length; i++) {
          let presentCovered = false
          let planStanderedCovered = plandata[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            let standard_cover_id = payload?.standard_cover_id
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              planStanderedCovered.splice(j, 1)
              let updatedPlan = await motor_plan_model.findByIdAndUpdate(plandata[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
              planName.push(plandata[i]?.plan_name)
              count++
            }
          }

        }
        // travel plan
        for (let i = 0; i < travelPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = travelPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            let standard_cover_id = payload?.standard_cover_id
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              planStanderedCovered.splice(j, 1)
              let updatedPlan = await travel_plan_model.findByIdAndUpdate(travelPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
              travelPlanName.push(travelPlanData[i]?.plan_name)
              count++
            }
          }
        }
        // home plan
        for (let i = 0; i < homePlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = homePlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            let standard_cover_id = payload?.standard_cover_id
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              planStanderedCovered.splice(j, 1)
              let updatedPlan = await home_plan_model.findByIdAndUpdate(homePlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
              homePlanName.push(homePlanData[i]?.plan_name)
              count++
            }
          }
        }
        // medical plan
        for (let i = 0; i < medicalPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = medicalPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            let standard_cover_id = payload?.standard_cover_id
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              planStanderedCovered.splice(j, 1)
              let updatedPlan = await MedicalPlansModels.findByIdAndUpdate(medicalPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
              medicalPlanName.push(medicalPlanData[i]?.plan_name)
              count++
            }
          }
        }
        // yatch plan
        for (let i = 0; i < yatchPlanData.length; i++) {
          let presentCovered = false
          let planStanderedCovered = yatchPlanData[i].standard_cover_arr
          for (j = 0; j < planStanderedCovered.length; j++) {
            let standard_cover_id = payload?.standard_cover_id
            if (standard_cover_id == planStanderedCovered[j]?.standard_cover_id?.toString()) {
              planStanderedCovered.splice(j, 1)
              let updatedPlan = await YatchPlanModels.findByIdAndUpdate(yatchPlanData[i]?._id, { standard_cover_arr: planStanderedCovered }, { new: true })
              yatchPlanName.push(yatchPlanData[i]?.plan_name)
              console.log(">>>>>>>>>>>>>>>>plan name: ", yatchPlanData[i]?.plan_name)
              count++
            }
          }
        }
      }
      return res.status(200).json({
        status: 200, message: ` Standared Cover ${coveredType} Successfully `,
        Motor: planName, Travel: travelPlanName, Home: homePlanName, Medical: medicalPlanName, Yatch: yatchPlanName
      })
    } catch (err) {
      console.log(err)
    }
  },
  getYachtDetails: async (req, res) => {
    try {
      let payload = req.body;

      let matchObj = { status: true }
      let details
      if (!payload?.yachtMakeId && !payload?.year) {
        details = await yachtYearModels.aggregate([
          {
            $match: matchObj,
          },
          {
            $project: {
              yearDesc: 1
            }
          }
        ])
      }
      if (!payload?.yachtMakeId && payload?.year) {
        matchObj["start_year"] = +payload?.year
        let name = payload?.name
        if (name) {
          matchObj["name"] = {
            $regex: name,
            $options: "i"
          }
        }

        details = await yachtModelsDetailsModels.aggregate([
          {
            $match: matchObj,
          },
          {
            '$lookup': {
              'from': 'yachtmakes',
              'localField': 'MakeId',
              'foreignField': '_id',
              'as': 'makeData'
            }
          }, {
            '$unwind': {
              'path': '$makeData'
            }
          }, {
            '$group': {
              '_id': '$makeData.name',
              'uniqueDoc': {
                '$first': '$$ROOT'
              }
            }
          }, {
            '$addFields': {
              '_id': '$uniqueDoc.makeData._id',
              'name': '$uniqueDoc.makeData.name',
              'logo': '$uniqueDoc.makeData.logo'
            }
          },
          {
            $project: {
              uniqueDoc: 0
            }
          }
        ])
      }
      if (payload?.yachtMakeId && payload?.year) {
        matchObj["MakeId"] = mongoose.Types.ObjectId(payload?.yachtMakeId)
        matchObj["start_year"] = +payload?.year
        details = await yachtModelsDetailsModels.aggregate([
          {
            $match: matchObj,
          },

          {
            $project: {
              name: 1
            }
          }
        ])
      }
      if (details.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully", data: details })
      }
      return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })

    } catch (error) {
      console.log(error)
    }
  },
  add_Maternity_conditionarr: async (req, res) => {
    try {
      const id = req.body?.id;
      const data = req.body?.formData;

      const maternityconditions_arr = [];
      for (let i = 0; i < data.length; i++) {
        maternityconditions_arr.push({
          itemId: mongoose.Types.ObjectId(data[i]._id),
          // itemdesc: data[i].description,
          status: data[i].status,
          value: data[i].value,
        });
      }

      console.log("maternityconditions_arr", maternityconditions_arr);
      // return false;

      let result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { maternity_condition_arr: maternityconditions_arr } },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "Maternity Conditions Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }

    } catch (err) {
      console.log(err);
    }
  },
  add_general_underwriting_conditions: async (req, res) => {
    try {
      const id = req.body.id;
      const data = req.body?.formData;
      console.log(data, "additional data")
      const general_underwritingConditions_arr = [];
      for (let i = 0; i < data.length; i++) {
        general_underwritingConditions_arr.push({
          itemId: mongoose.Types.ObjectId(data[i]._id),
          status: data[i].status,
          value: data[i].value,
        });
      }
      let result;

      result = await MedicalPlan.findOneAndUpdate(
        { _id: id },
        { $set: { general_condition_arr: general_underwritingConditions_arr } },
        { new: true }
      );

      if (result != null) {
        res.json({
          status: 200,
          message: "Underwriting Conditions Updated Successfully!",
          data: result,
        });
      } else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  updateMedicalPlanBMIStatus: async (req, res) => {
    try {
      const id = req.query.id;
      const status = req.query.status;
      console.log(id, status, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      let result = await MedicalPlanBMI.findByIdAndUpdate(id, { status: status });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Medical Plan Deactivated Successfully!",
          });
        } else {
          res.json({
            status: 200,
            message: "Medical Plan Activated Successfully!",
          });
        }
      } else {
        res.json({ status: 400, message: "Medical Plan Not Deactivated!" });
      }
    } catch (error) {
    }
  },
  getDiscountCoupon: async (req, res) => {
    try {
      let payload = req.body
      let currentDate = new Date()
      let matchObj = {
        status: true,
        // startdate:{$lte:currentDate},
        // enddate:{$gte:currentDate}

      }
      console.log("currentDate.......................", currentDate)
      if (payload?.code) {
        matchObj["code"] = payload.code
      }
      if (payload?.lob === "Travel") {
        matchObj["lob"] = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");
      }
      if (payload?.lob === "Yatch") {
        matchObj["lob"] = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");
      }
      if (payload?.lob === "Other") {
        matchObj["lob"] = mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b");
      }
      if (payload?.lob === "Medical") {
        matchObj["lob"] = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");
      }
      if (payload?.lob === "Motor") {
        matchObj["lob"] = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      }
      let result
      result = await discountMoidels.aggregate([
        {
          $match: matchObj
        }
      ])
      console.log("result...................", result)

      if (!result.length) {
        return res.status(404).json({ status: 404, message: "Invalid Code ", data: 0 });
      }
      4
      let topup = result[0]?.discount
      return res.status(200).json({
        status: 200, message: "Coupon Aplly sucseefully !!", data: {
          _id: result[0]._id,
          topup,
        }
      });

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  updateLeadById: async (req, res) => {
    try {
      let payload = req.body
      let leadId = req.query.leadId
      if (!leadId) {
        return res.status(404).json({ status: 404, message: "ID is Required", data: {} });
      }
      let checkLead = NewLeadsModels.findById(leadId)
      if (!checkLead) {
        return res.status(400).json({ status: 400, message: "Lead not found provided id " + leadId })
      }

      if (payload.paymentStatus === "Completed") {
        if (checkLead.assigned_agent) {
          payload.directPaymentByUser = false
        } else {
          // find the document chaser who have chased most documents
          const documentChaser = await NewLeadsModels.aggregate([
            {
              $match: {
                lead_status: "Closed"
              }
            },
            {
              $project: {
                forward_to: 1,
                dcrecived_from: 1
              }
            },
            {
              $group: {
                _id: "$forward_to",
                count: { $count: {} }
              }
            },
            {
              $sort: {
                count: -1
              }
            }
          ])

          payload.directPaymentByUser = true;
          payload.assign_documentchaser_timestamp = new Date();
          payload.forward_to = documentChaser[0]._id;
          payload.recived_from = checkLead.supervisor_id;
        }
      }

      let result = await NewLeadsModels.findByIdAndUpdate(leadId, payload, { new: true });
      if (!result) {
        return res.status(404).json({ status: 404, message: "Data Not updated ", data: {} });
      }
      return res.status(200).json({ status: 200, message: "Data updated sucseefully !!", data: result });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  AddGroup_Medical_Plan: async (req, res) => {
    try {
      const reqdata = req.body;
      console.log(reqdata, "reqdata")
      const Plandata = reqdata?.rowsData;
      const line_of_business_name = "Group Medical";
      const line_of_business = await line_of_business_model.findOne({
        line_of_business_name: line_of_business_name,
      });
      let count = 0
      for (let i = 0; i < Plandata.length; i++) {
        let payload = {}
        payload["plan_name"] = Plandata[i]?.plan_name
        payload["line_of_business_id"] = line_of_business
        payload["company_id"] = Plandata[i]?.company_id
        // payload["tpa"] = Plandata[i]?.tpa
        // payload["network"] = Plandata[i]?.network
        // payload["network_list"] = Plandata[i]?.network_list?.map((val) => mongoose.Types.ObjectId(val._id))
        payload["from_date"] = Plandata[i]?.from_date
        payload["to_date"] = Plandata[i]?.to_date
        payload["location"] = Plandata[i]?.location?.map((val) => mongoose.Types.ObjectId(val.value))

        const result = await GroupMedicalPlan.create(payload);
        if (result) {
          count++
        }
      }
      if (count > 0) {
        return res.status(200).json({ status: 200, message: "Data Saved Successfully" });
      }

    } catch (error) {
      console.log(error);
    }
  },
  getGroupMedicalPlans: async (req, res) => {
    try {
      let query = req.query;
      const page = +query?.page;
      const limit = +query?.perPage;
      let matchObj = {};
      let data = [];
      let company_id = query?.company_id;
      let plan_name = query?.plan_name;
      let status = +query?.status;
      let startDate = query.startDate
      let endDate = query.endDate
      if (page && limit) {
        if (company_id) {
          matchObj["company_id"] = mongoose.Types.ObjectId(company_id);
        }
        if (plan_name) {
          matchObj["plan_name"] = {
            $regex: plan_name,
            $options: "i",
          };
        }
        if (startDate) {
          startDate = new Date(startDate)
          matchObj['from_date'] = {
            $gte: startDate
          }
        }
        if (endDate) {
          endDate = new Date(endDate)
          matchObj['to_date'] = {
            $lte: endDate
          }
        }
        if (status == 0 || status == 1) {
          matchObj["status"] = status;
        }
        let aggregate = [
          {
            $match: matchObj,
          },
        ]
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
              localField: "company_id",
              foreignField: "_id",
              as: "companyData",
            },
          },
          {
            $lookup: {
              from: "networks",
              localField: "network_list",
              foreignField: "_id",
              as: "networkData",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locationData",
            },
          },

          {
            '$lookup': {
              'from': 'group_medical_leads',
              'let': {
                planId: '$_id',
              },
              'pipeline': [
                {
                  '$match': {
                    'leadStatus': 'In Progress',
                    'userleadStatus': 'newJdv',
                    '$expr': {
                      "$eq": ["$planId", "$$planId"]
                    }
                  }
                },

              ],
              'as': 'newData'
            }
          },
          {
            '$lookup': {
              'from': 'group_medical_leads',
              'let': {
                planId: '$_id',
              },
              'pipeline': [
                {
                  '$match': {
                    'leadStatus': 'Approved',
                    'userleadStatus': 'deleteJdv',
                    '$expr': {
                      "$eq": ["$planId", "$$planId"]
                    }
                  }
                },

              ],
              'as': 'deleteRequesData'
            }
          },
          {
            $sort: {
              createdAt: -1
            }
          },
          {
            $project: {
              plan_name: 1,
              'companyData.company_name': 1,
              'companyData._id': 1,
              'tpa.name': 1,
              'network.name': 1,
              status: 1,
              networkData: 1,
              locationData: 1,
              from_date: 1,
              to_date: 1,
              newData: { $size: "$newData" },
              deleteRequesData: { $size: "$deleteRequesData" }
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

        let groupResult = await GroupMedicalPlan.aggregate(aggregate);
        if (groupResult.length > 0) {
          res.json({
            status: 200,
            message: "Data Found",
            data: groupResult[0].data,
            totalCount: groupResult[0].totalCount[0]?.total || 0,
          });
        }
        else {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        }
      } else {

        data = await GroupMedicalPlan.aggregate([
          {
            $lookup: {
              from: "companies",
              localField: "company_id",
              foreignField: "_id",
              as: "companyData",
            },
          },
          {
            $lookup: {
              from: "networks",
              localField: "network_list",
              foreignField: "_id",
              as: "networkData",
            },
          },
          {
            $lookup: {
              from: "locations",
              localField: "location",
              foreignField: "_id",
              as: "locationData",
            },
          },
          {
            $sort: {
              'companyData.company_name': -1
            }
          },
        ]);
        if (!data.length) {
          return res.status(404).json({
            status: 404,
            message: "Data Not Found",
            data: [],
            total: 0,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Data Found",
            data: data,
            total: data.length,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  updatestatusGroupMedicalPlan: async (req, res) => {
    try {
      const id = req.params.id;
      const status = req.params.status;
      let result = await GroupMedicalPlan.findByIdAndUpdate(id, { status: status });
      if (result != null) {
        if (status == 0) {
          res.json({
            status: 200,
            message: "Plan Deactivated Successfully!",
          });
        } else {
          res.json({
            status: 200,
            message: "Plan Activated Successfully!",
          });
        }
      } else {
        res.json({ status: 400, message: "Plan Not Deactivated!" });
      }
    } catch (error) {
      res.send(error);
    }
  },
  single_group_medical_plan_details: async (req, res) => {
    try {
      const id = req.query.id;
      console.log(id)
      const medical_plan_data = await GroupMedicalPlan.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
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
          $lookup: {
            from: "medical_network_lists",
            localField: "network_list",
            foreignField: "_id",
            as: "networkListData",
          },
        },
      ]);
      console.log(medical_plan_data)
      if (!medical_plan_data) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Found",
          data: {},
        });
      } else {
        return res.json({ status: 200, message: "Data Found", data: medical_plan_data });
      }
    } catch (error) {
      return res.send(error);
    }
  },

  getmedicalplansinsurance: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      let name = req.query?.name
      let status = +req.query.status
      let company = req.query?.company
      // let userData = req.user
      // let userLocation = userData?.location
      // userLocation = userLocation.map((obj) => (obj?.loc_id))
      let match = {}
      if (page && limit) {
        if (name) {
          match = {
            plan_name: {
              $regex: name,
              $options: 'i'
            }
          }
        }
        // match["location.value"] = {
        //   $in: userLocation
        // }
        if (status == 0 || status == 1) {
          match["status"] = status;
        }
        if (company) {
          match["company_id"] = mongoose.Types.ObjectId(company)
        }

      }
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
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: +limit,
        },

      ];
      aggregate.push({
        $facet: facet,
      });

      const result = await MedicalPlan.aggregate(aggregate)
      const count = await MedicalPlan.countDocuments();
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: count,
      });
    } catch (err) {
      res.send(err);
    }
  },
  getPlanPriceAndTravelPlan: async (req, res) => {
    try {
      const id = req.query.id;
      const travel_plan_data = await travel_plan_model.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'travel_insurance_fors',
            localField: 'travel_insurance_for_id',
            foreignField: '_id',
            as: 'travel_insurance_for'
          }
        },
        {
          $unwind: {
            path: '$travel_insurance_for',
          }
        },
        {
          $lookup: {
            from: 'travel_plan_prices',
            localField: '_id',
            foreignField: 'plan_id',
            as: 'travel_plan_price'
          }
        },
        {
          $unwind: {
            path: '$travel_plan_price',
          }
        },
        {
          $lookup: {
            from: 'travel_cover_type_lists',
            localField: 'travel_plan_price.cover_type_id',
            foreignField: '_id',
            as: 'cover_type_id'
          }
        },
        {
          $unwind: {
            path: '$cover_type_id',
          }
        },
        {
          $project: {
            'plan_name': 1,
            'travel_insurance_for.travel_insurance_for': 1,
            'travel_plan_price.price_name': 1,
            'travel_plan_price.region_id': 1,
            'travel_plan_price.no_of_days_strings': 1,
            'cover_type_id.travel_cover_type': 1
          }
        },
        {
          $group: {
            _id: '$_id', // Group by the _id field of the main document
            plan_name: { $first: '$plan_name' }, // Retain the plan name
            travel_insurance_for: { $first: '$travel_insurance_for.travel_insurance_for' }, // Retain the travel insurance for field
            travel_plan_prices: {
              $push: {
                price_name: '$travel_plan_price.price_name',
                region_id: '$travel_plan_price.region_id',
                no_of_days_strings: '$travel_plan_price.no_of_days_strings',
                travel_cover_type: '$cover_type_id.travel_cover_type'
              }
            } // Aggregate travel plan prices and cover types into an array
          }
        }
      ]
      );
      if (!travel_plan_data) {
        return res.status(404).json({ status: 404, message: 'Data not found', data: [] })
      } else {
        return res.status(200).json({ status: 200, message: 'Data Found', data: travel_plan_data })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getlimitedDataOfHomePlan: async (req, res) => {
    try {
      const id = req.query.id;
      const travel_plan_data = await home_plan_model.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(id)
            }
          },
          {
            $lookup: {
              from: 'plan_categories',
              localField: 'plan_category_id',
              foreignField: '_id',
              as: 'plancategories'
            }
          },
          {
            $unwind: {
              path: '$plancategories',
            }
          },
          {
            $lookup: {
              from: 'home_ownership_status_lists',
              localField: 'ownership_status_id',
              foreignField: '_id',
              as: 'ownershipstatus'
            }
          },
          {
            $unwind: {
              path: '$ownershipstatus',
            }
          },
          {
            $lookup: {
              from: 'nature_of_plans',
              localField: 'nature_of_plan_id',
              foreignField: '_id',
              as: 'natureofplan'
            }
          },
          {
            $unwind: {
              path: '$natureofplan',
            }
          },
          {
            $lookup: {
              from: 'home_plan_type_lists',
              localField: 'plan_type_id',
              foreignField: "_id",
              as: 'plantype'
            }
          },
          {
            $unwind: {
              path: '$plantype',
            }
          },
          {
            $project: {
              plan_name: 1,
              content_value_or_topup: 1,
              plancategories: 1,
              pbvalue_or_topup: 1,
              building_value_or_topup: 1,
              property_type_id: 1,
              ownershipstatus: 1,
              natureofplan: 1,
              plantype: 1
            }
          }
        ]
      );
      if (!travel_plan_data) {
        return res.status(404).json({ status: 404, message: 'Data not found', data: [] })
      } else {
        return res.status(200).json({ status: 200, message: 'Data Found', data: travel_plan_data })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getlimitedDataOfMedicalPlan: async (req, res) => {
    try {
      const id = req.query.id;
      const medical_plan_data = await MedicalPlan.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(id)
            }
          },
          {
            $lookup: {
              from: 'nature_of_plans',
              localField: 'nature_of_plan_id',
              foreignField: '_id',
              as: 'natureofplans'
            }
          },
          {
            $unwind: {
              path: '$natureofplans',
            }
          },
          {
            $lookup: {
              from: 'rates_based_on_ages',
              localField: '_id',
              foreignField: 'medical_plan_id',
              as: 'ratesBasedOnAge'
            }
          },
          {
            $unwind: {
              path: '$ratesBasedOnAge',
              preserveNullAndEmptyArrays: true

            }
          },
          {
            $lookup: {
              from: 'medical_tpas',
              localField: 'ratesBasedOnAge.TPA',
              foreignField: '_id',
              as: 'ratesBasedOnAge.tpa'
            }
          },
          {
            $lookup: {
              from: 'medical_networks',
              localField: 'ratesBasedOnAge.network',
              foreignField: '_id',
              as: 'ratesBasedOnAge.networks'
            }
          },
          {
            $lookup: {
              from: 'area_of_registrations',
              localField: 'ratesBasedOnAge.emirateId',
              foreignField: '_id',
              as: 'ratesBasedOnAge.emirates'
            }
          },
          {
            $group: {
              _id: '$_id',
              plan_name: { $first: '$plan_name' },
              natureofplans: { $first: '$natureofplans.nature_of_plan_name' },
              plan_condition: { $first: '$plan_condition_or_topup' },
              salary_range: { $first: '$salary_range_or_topup' },
              ratesBasedOnAge: {
                $push: {
                  rate_name: '$ratesBasedOnAge.name',
                  emirateId: '$ratesBasedOnAge.emirates',
                  ageRange: '$ratesBasedOnAge.ageRange',
                  primiumArray: '$ratesBasedOnAge.primiumArray',
                  tpa: '$ratesBasedOnAge.tpa',
                  networks: '$ratesBasedOnAge.networks'
                }
              }
            }
          }
        ]
      );
      if (!medical_plan_data) {
        return res.status(404).json({ status: 404, message: 'Data not found', data: ['dff'] })
      } else {
        return res.status(200).json({ status: 200, message: 'Data Found', data: medical_plan_data })
      }
    } catch (error) {
      console.log(error)
    }
  }

};

