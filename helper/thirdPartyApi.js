const axios = require("axios");
let token = process.env.QUATARTOKEN
let companyModels = require("../models/Company")
let makeModels = require("../models/Make_motor")
let yearModels = require("../models/Year_Code")
let vehicleModels = require("../models/Motor_model");
const { default: mongoose } = require("mongoose");
// let katarToke = "Basic a2hhbGVkOmtoYWxlZDEyMw=="
let cookie =
  "BIGipServeruat_qic_8082=!tIP/95US05VZlmf5V8AGSUoVe+1VALj53ztjhYYbmSVyNpLRimK9Aup1X2PmW5YNmLL82q4eF439v2A=; TS0140665d=01f00338fe9b41db83c5868dd527abd8139771c7cab53a326e071d33a07fed700dcb493bfbcfdc5894b41a2372f5ca48b7a62853d7; TS0192ab24=01f00338fe5eece61a3a85af737262c740949bdb33e149d4932a138e8945e94f63c382b509d6eefddb154d3c7b162f60f17312cc7d112b3b7b8dd1c784c8ac430ed4920b0e6db4524351279297f29dfde6d79a9633; TS013cbdd4=01f00338fee8f98670fc007f85001c93f2069fdce0c7f269d01abee74d64cbe9a94f93c22d3a77c850540faca00d226461ad92d9ab";
let getModelYears = async (cookie) => {
  try {
    let data = "";
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/autoDataYear",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };
    let modelYearArray = await axios.request(config);
    modelYearArray = modelYearArray?.data?.modelyearArray;
    console.log({ modelYearArray })
    return modelYearArray;
  } catch (err) {
    console.log(`model year error: ${err}`);
  }
};
// getModelYears(cookie)
let getVehMakedeatils = async (cookie) => {
  try {
    const axios = require("axios");
    let data = "";

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/autoDataMake",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };

    let vehMakeArray = await axios.request(config);
    vehMakeArray = vehMakeArray?.data?.vehMakeArray;
    console.log({ vehMakeArray })
    return vehMakeArray;
  } catch (err) {
    console.log("Veh MAke Error Occured: " + err);
  }
};
// getVehMakedeatils(cookie)
let getModelDetails = async (cookie, makeCode) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      vehMake: makeCode,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/autoDataModel",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };

    let modelDetailsArray = await axios.request(config);
    modelDetailsArray = modelDetailsArray?.data?.vehModelArray;
    console.log({ modelDetailsArray })
    return modelDetailsArray;
  } catch (err) {
    console.log(`Error Occured in Car Model: ${err}`);
  }
};
// getModelDetails(cookie, 76);

let getCarVariantWithOutChassis = async (cookie, vehMake, vehModelYear, vehModel, chassisNo, flag) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      chassisNo: chassisNo,
      withoutChassisNoFlag: flag,
      vehMake: vehMake,
      vehModelYear: vehModelYear,
      vehModel: vehModel,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/admeSpecification",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie

      },
      data: data,
    };

    let varintDeatils = await axios.request(config);
    varintDeatils = varintDeatils?.data?.specification;
    console.log({ varintDeatils })
    return varintDeatils;
  } catch (err) {
    console.log(`Error Occured in Car Variant ${err}`);
  }
};

// getCarVariantWithOutChassis(cookie,67,73,559)

let carValues = async (cookie, vehMake, vehModelYear, vehModel, admeId, chassisNo, flag) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      chassisNo: chassisNo,
      withoutChassisNoFlag: flag,
      vehMake: vehMake,
      vehModelYear: vehModelYear,
      vehModel: vehModel,
      admeId: admeId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/admeQuoteInfo",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };

    let carValue = await axios.request(config);
    carValue = carValue.data;
    console.log({ carValue });
    return carValue;
  } catch (err) {
    console.log(`Error`);
  }
};
// carValues(cookie,67,73,559,29116)

let getAllPlans = async (cookie) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      insuredName: "KARTHICK",
      makeCode: "0775",
      modelCode: "100301",
      modelYear: "2022",
      sumInsured: "128500",
      admeId: "29373",
      vehicleType: "1004",
      vehicleUsage: "1001",
      noOfCylinder: "1004",
      nationality: "008",
      seatingCapacity: "4",
      firstRegDate: "24/08/2021",
      gccSpec: "1",
      previousInsuranceValid: "1",
      totalLoss: "0",
      driverDOB: "11/08/1998",
      noClaimYear: "0",
      selfDeclarationYear: "0",
      chassisNo: "",
      driverExp: "",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/motor/tariff",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };

    let allMotorPlan = await axios.request(config);
    allMotorPlan = allMotorPlan?.data;
    return allMotorPlan;
  } catch (err) {
    console.log(`Error getting In getAllPlan: ${err}`);
  }
};

let getMotorPlanNetPremium = async (cookie) => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      quoteNo: 2320427656,
      schemes: [
        {
          schemeCode: "2150",
          productCode: "0110",
          optionalCovers: [
            {
              code: "01000",
            },
          ],
        },
      ],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/motor/netPremium",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: cookie,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(`Error getting In getAllPlan: ${err}`);
  }
};
let getCardeatilsWithChaisissNumner = async (Cookie, chasissNumber) => {
  try {
    let data = JSON.stringify({
      chassisNo: chasissNumber,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/admeVehicleInfo",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: Cookie,
      },
      data: data,
    };

    let carDetailsWithChasisNumber = await axios.request(config);
    carDetailsWithChasisNumber = carDetailsWithChasisNumber.data
    return carDetailsWithChasisNumber
  } catch (error) {
    console.log(error);
  }
};
// getCardeatilsWithChaisissNumner(cookie,"RKLBL9HE8K5269618")
let getQatarMotorPlans = async (cookie, ManufacturingYear, CarMaker, carModel, carVariant, flag, chassisNo) => {
  try {
    let yearCode
    let planArray = []
    let yearDetails
    let MakeDatails
    let makeCode
    let modelDeatils
    let modelCode
    let variantDetails
    let carValue
    let allMotorPlan
    let netPremium
    let admeId
    let companies = await companyModels.findById("64a293606e3da4ba74c4a696");
    yearDetails = await getModelYears(cookie)
    if (yearDetails.length) {
      for (let i = 0; i < yearDetails.length; i++) {
        if (yearDetails[i]?.yearDesc == ManufacturingYear) {
          yearCode = yearDetails[i]?.yearCode
        }
      }
    }
    console.log({ yearDetails })
    MakeDatails = await getVehMakedeatils(cookie)
    if (yearDetails?.length) {
      for (let i = 0; i < MakeDatails.length; i++) {
        if (MakeDatails[i]?.makeDesc?.toLowerCase() == CarMaker?.toLowerCase()) {
          makeCode = MakeDatails[i]?.makeCode
        }
      }
    }
    else {
      return []
    }
    console.log({ MakeDatails })

    modelDeatils = await getModelDetails(cookie, makeCode)
    if (modelDeatils?.length) {
      for (let i = 0; i < modelDeatils.length; i++) {
        if (modelDeatils[i]?.modelDesc?.toLowerCase() == carModel?.toLowerCase()) {
          modelCode = modelDeatils[i]?.modelCode
        }
      }
    }
    else {
      return []
    }
    console.log({ modelDeatils })
    variantDetails = await getCarVariantWithOutChassis(cookie, makeCode, yearCode, modelCode, chassisNo, flag)
    if (variantDetails?.length) {
      for (let i = 0; i < variantDetails.length; i++) {
        if ((variantDetails[i]?.description?.toLowerCase()).includes(carVariant.toLowerCase())) {
          admeId = variantDetails[i]?.admeId
        }
      }
    } else {
      return []
    }
    console.log({ variantDetails })
    carValue = await carValues(cookie, makeCode, yearCode, modelCode, admeId, "", true)
    console.log({ carValue })
    allMotorPlan = await getAllPlans(cookie)
    console.log({ allMotorPlan })
    if (!allMotorPlan?.length) {
      return []
    }
    let planData = allMotorPlan?.schemes;
    if (!planData?.length) {
      return []
    }
    for (let i = 0; i < planData.length; i++) {
      let standard_cover_arr = [];
      let additional_cover_arr = [];
      let inclusiveCovers = planData[i]?.inclusiveCovers;
      let basicCovers = planData[i]?.basicCovers;
      for (let j = 0; j < basicCovers.length; j++) {
        standard_cover_arr.push({
          standard_cover_label: basicCovers[j]?.name,
          standard_cover_value: basicCovers[j]?.premium,
          standard_cover_desc: basicCovers[j]?.help,
          code: basicCovers[j]?.code,
        });
      }
      for (let j = 0; j < inclusiveCovers.length; j++) {
        additional_cover_arr.push({
          additional_cover_label: inclusiveCovers[j]?.name,
          additional_cover_value: inclusiveCovers[j]?.premium,
          standard_cover_desc: inclusiveCovers[j]?.help,
          code: inclusiveCovers[j]?.code,
        });
      }
      planArray.push({
        quoteNo: allMotorPlan.quoteNo,
        plan_name: planData[i]?.schemeName,
        standard_cover_arr: standard_cover_arr,
        additional_cover_arr: additional_cover_arr,
        finallBasePremium: planData[i]?.netPremium,
        companies: companies
      });
    }
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", { planArray })

    return planArray
    console.log({ planArray })
    // console.log("data................", {yearCode},{makeCode},{modelCode},{variantDetails},{carValue},{allMotorPlan},{netPremium},{admeId},{carValue});
  } catch (err) {
    console.log(err);
  }
};
module.exports = getQatarMotorPlans
let katarPlansWithChassisNumber = async (cookie, chasissNumber) => {
  let makeCode
  let yearCode
  let modelCode
  let vehAdmeId
  let carDetailsWithChasisNumbers = await getCardeatilsWithChaisissNumner(cookie, chasissNumber)
  makeCode = carDetailsWithChasisNumbers?.vehMake
  modelCode = carDetailsWithChasisNumbers?.vehModel
  yearCode = carDetailsWithChasisNumbers?.vehModelYear
  vehAdmeId = carDetailsWithChasisNumbers?.vehAdmeId
  console.log({ carDetailsWithChasisNumbers, makeCode, yearCode, modelCode, vehAdmeId })
  let carVariantDetailsWithChasisNumbers = await getCarVariantWithOutChassis(cookie, makeCode, +yearCode, modelCode, chasissNumber, false)
  console.log({ carVariantDetailsWithChasisNumbers })
  let carValueWithChasisNumbers = await carValues(cookie, makeCode, +yearCode, modelCode, vehAdmeId, chasissNumber, false)
  console.log({ carValueWithChasisNumbers })
}
// katarPlansWithChassisNumber(cookie,"JTNBZ4HK8L3018935")
// getQatarMotorPlans(cookie,"2022","Toyota","Avalon","XLE 3.5",true,"");
// getQatarMotorPlans(cookie,"2022","ABARTH","COMPETIZIONE","XLE 3.5",true,"");



let dataFunction = async (req, res) => {
  try {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk");
    let companies = await companyModels.findById("64a293606e3da4ba74c4a696");
    let planRespone;
    let planArray = [];
    const axios = require("axios");
    let data = JSON.stringify({
      insuredName: "KARTHICK",
      makeCode: "0775",
      modelCode: "100301",
      modelYear: "2022",
      sumInsured: "128500",
      admeId: "29373",
      vehicleType: "1004",
      vehicleUsage: "1001",
      noOfCylinder: "1004",
      nationality: "008",
      seatingCapacity: "4",
      firstRegDate: "24/08/2021",
      gccSpec: "1",
      previousInsuranceValid: "1",
      totalLoss: "0",
      driverDOB: "11/08/1998",
      noClaimYear: "0",
      selfDeclarationYear: "0",
      chassisNo: "",
      driverExp: "",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.devapi.anoudapps.com/qicservices/aggregator/motor/tariff",
      headers: {
        company: "002",
        "Content-Type": "application/json",
        Authorization: token,
        Cookie:
          "TS0140665d=01f00338febf320065d4ac1de2d65809d52717ab5452bed5dec5e1672984a802591ab196c334f2444c7f8818d59bdc7c6a1441dded; TS01d3ba52=01f00338fe5e7b9902d72fc90de90c6eae6e42c26a3dc6844bffb987d69cef9a46ee190b7f7d3da9fcbb7f21766794b972f9e9846eeec275ff6a56a30f36a4ba045bc82e99; BIGipServeruat_qic_8082=!h/RpS+RRNxuMHPr5V8AGSUoVe+1VAJKq9wQUMzma8eatqkH48JxfEXs0oiz4nSNuA8v6YMUj7AIEh8c=; TS0140665d=01f00338fee09074dc121dd6138d78636c07da4927c2e6f76254458cd077f5f88a84e6e7e893ce497cfa4ef049c566bf3b8c175ddd; TS0192ab24=01f00338fe014326cc43c9d76b9949a1b8554a0757bb5888401650c9a328b3c464a4b5e341080af98c579ec410b66f9b6c0e731864e77e141b0e3b6b89de58af3cc771de33484c22816d7ba602da8f0cc173938b88; TS013cbdd4=01f00338feb37e880f98235227f3796465aed37996af6c65151a90a9b91beed62b1804199c84308d4051ac77206d7936d4f4975c98",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        planRespone = response.data;
        // return planRespone
      })
      .catch((error) => {
        console.log(error);
      });
    console.log({ planRespone })
    let planData = planRespone.schemes;
    for (let i = 0; i < planData.length; i++) {
      let standard_cover_arr = [];
      let additional_cover_arr = [];
      let inclusiveCovers = planData[i]?.inclusiveCovers;
      let basicCovers = planData[i]?.basicCovers;
      for (let j = 0; j < basicCovers.length; j++) {
        standard_cover_arr.push({
          standard_cover_label: basicCovers[j]?.name,
          standard_cover_value: basicCovers[j]?.premium,
          standard_cover_desc: basicCovers[j]?.help,
          code: basicCovers[j]?.code,
        });
      }
      for (let j = 0; j < inclusiveCovers.length; j++) {
        additional_cover_arr.push({
          additional_cover_label: inclusiveCovers[j]?.name,
          additional_cover_value: inclusiveCovers[j]?.premium,
          standard_cover_desc: inclusiveCovers[j]?.help,
          code: inclusiveCovers[j]?.code,
        });
      }
      planArray.push({
        quoteNo: planRespone.quoteNo,
        plan_name: planData[i]?.schemeName,
        standard_cover_arr: standard_cover_arr,
        additional_cover_arr: additional_cover_arr,
        finallBasePremium: planData[i]?.netPremium,
        companies: companies
      });
    }
    console.log("lllllllllllllllllllllllllllllllllllllllllllllll", {
      planArray,
    });
    return planArray;
  } catch (error) {
    console.log(error);
  }
};

//  module.exports = dataFunction
// dataFunction()

let getkatarDetails = async (katarYear, KatarMake, katarModel) => {
  try {
    let yearData
    let MakeData
    let yearCode
    let makeQicCode
    let makeAutoDataCode
    let modelData
    let modelQicCode
    let modelAutoDataCode
    let variantData
    yearData = await yearModels.findOne({ yearDesc: +katarYear })
    yearCode = yearData?.qic_Code
    MakeData = await makeModels.findOne({
      make_motor_name: {
        $regex: KatarMake,
        $options: "i"
      }
    })
    makeQicCode = MakeData?.katarQicCode
    makeAutoDataCode = MakeData?.katarAutodataCode
    modelData = await vehicleModels.findOne({
      motor_model_name: {
        $regex: katarModel,
        $options: "i"
      },
      motor_model_make_id: mongoose.Types.ObjectId(MakeData?._id)
    })

    modelQicCode = modelData?.qicModelCode
    modelAutoDataCode = modelData?.aoutoDataMedelCode
    variantData = await getCarVariantWithOutChassis(cookie, makeAutoDataCode, yearCode, modelAutoDataCode, "", true)
    console.log("..................", variantData)
    let modelmak = modelData?.qicMakeCode
    console.log("mmmmmmmmmmmmmmmmmmmmmmmm", { yearCode, makeQicCode, makeAutoDataCode, modelQicCode, modelAutoDataCode, modelmak })

  } catch (err) {
    console.log(err);
  }
}

// getkatarDetails(2020,"Toyota","4Runner")