const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const MasterController = require("../controllers/MasterController");
const CompanyController = require("../controllers/CompanyController");
const LeadController = require("../controllers/LeadController");
const PlanController = require("../controllers/PlanController");
const managementController = require("../controllers/managementController");
const customerController = require("../controllers/CustomerController");
const { verify_token } = require("../helper/auth");
const TPBuisnessController = require("../controllers/TPBuisnessController");
const businessEntitiesController = require("../controllers/businessEntitiesController");
const HelperController = require("../controllers/helperControllers");
const helperControllers = require("../controllers/helperControllers");
const chatController = require("../controllers/chatControler");
const Multer = multer();
const { generate_token } = require("../helper/genrate_token");
const { verify } = require("crypto");
const EmailController = require("../controllers/emailController");
const TooltipController = require("../controllers/tooltipController");
const MISController = require("../controllers/MISController");
const IncentiveController = require("../controllers/incentiveController");
const Cmscontroller = require("../controllers/Cmscontroller");
const PdfController = require("../controllers/PdfController");

// console.log("kkkkkkkkkkkkkkkgggg",generate_token({id:Date.now()}))
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  // fileFilter,
});

var ourPartner = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "partnerLogo");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

var user = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "user_profile");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

var uploadexcel = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "publicfiles");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

var uploaddocuments = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "documents");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

var uploademaildocuments = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "emaildocuments");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var uploadClaims = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "claims");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var uploadTestimonials = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "testimonials");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var UploadCancelPolicyDocuments = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Cancelled_Policies");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var formLogos = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "StepLogos");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var UploadMakeLogo = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "MakeMotorLogos");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
});
var UploadYachtMakeLogo = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "YachtMakeLogos");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
});
var UploadYachtEngineLogo = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "YachtEngineLogos");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
});
var UploadTPAfiles = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "TPAfiles");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
});
var RequestMemberFiles = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Member_files");
    },

    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  })
})
var UsefulLinks = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "UsefulLinks");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  })
})
var groupMedicalplanDocuments = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "GroupClaimDocuments");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
var emailAttatchment = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "attatchments");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "_" + Date.now() + '_' + file.originalname.split(".")[0] + path.extname(file.originalname)
      );
    },
  }),
});


var mainpagecmsuploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, "mainpagecms");
      if (file.fieldname == "banner") {
        cb(null, "Cmsuploads/banner");
      }
      if (file.fieldname == "insurance_detail_banner") {
        cb(null, "Cmsuploads/insurancedetail");
      }
      if (file.fieldname == "know_more_banner") {
        cb(null, "Cmsuploads/knowmore");
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  })
}).fields([
  { name: "banner", maxCount: 20 },
  { name: "insurance_detail_banner", maxCount: 20 },
  { name: "know_more_banner", maxCount: 20 },
]);




router.post("/login", AdminController.login);
router.post("/verify_otp_admin", AdminController.verify_otp_admin);


router.post("/add_line_of_business", MasterController.add_line_of_business);
router.post(
  "/read_line_of_business_excel",
  uploadexcel.single("file"),
  MasterController.read_line_of_business_excel
);
router.get(
  "/get_line_of_business", verify_token,
  MasterController.get_line_of_business
);
router.get(
  "/get_line_of_business_by_id/:id",
  MasterController.get_line_of_business_by_id
);
router.post(
  "/update_line_of_business",
  MasterController.update_line_of_business
);
router.post(
  "/delete_line_of_business/:id/:status",
  MasterController.delete_line_of_business
);
router.get(
  "/get_line_of_business_list",
  MasterController.get_line_of_business_list
);

router.get("/get_location_by_id/:id", MasterController.get_location_by_id);
router.get("/get_location", MasterController.get_location);
router.post("/add_location", MasterController.add_location);
router.post("/update_location", MasterController.update_location);
router.get("/get_locations/:page/:limit", MasterController.get_locations);
router.get("/delete_location/:id/:status", MasterController.delete_location);
router.post(
  "/read_location_excel",
  uploadexcel.single("file"),
  MasterController.read_location_excel
);

router.get("/get_make_motor", verify_token, MasterController.get_make_motor);
router.post(
  "/update_make_motor_status/:id",
  MasterController.update_make_motor_status
);
router.post("/add_make_motor", UploadMakeLogo.single("file"), MasterController.add_make_motor);
router.get(
  "/get_make_motor_details/:id",
  MasterController.get_make_motor_details
);
router.post("/update_make_motor", UploadMakeLogo.single("file"), MasterController.update_make_motor);
router.get("/getlistMakeMotor", MasterController.getlistMakeMotor);
router.post(
  "/read_make_motor_excel",
  Multer.single("file"),
  MasterController.read_make_motor_excel
);

router.get("/get_model_motor", verify_token, MasterController.get_model_motor);
router.post(
  "/update_model_motor_status/:id",
  MasterController.update_model_motor_status
);
router.post("/addModelMotor", MasterController.addModelMotor);
router.get("/getModelMotorDetails/:id", MasterController.getModelMotorDetails);
router.post("/updateModelMotor", MasterController.updateModelMotor);
router.post(
  "/read_model_motor_excel",
  Multer.single("file"),
  MasterController.read_model_motor_excel
);

router.post("/travelinsurancefor", MasterController.travelinsurancefor);
router.post(
  "/read_travel_insurance_for_excel",
  Multer.single("file"),
  MasterController.read_travel_insurance_for_excel
);
router.get(
  "/get_travel_insurance_for", verify_token,
  MasterController.get_travel_insurance_for
);
router.post(
  "/get_travel_insurance_for_detailsbyid",
  MasterController.get_travel_insurance_for_detailsbyid
);
router.post(
  "/update_travel_insurance_for_status",
  MasterController.update_travel_insurance_for_status
);
router.post(
  "/update_travel_insurance_for_details",
  MasterController.update_travel_insurance_for_details
);

router.post("/add_travel_type", MasterController.add_travel_type);
router.post(
  "/read_travel_type_excel",
  Multer.single("file"),
  MasterController.read_travel_type_excel
);
router.get("/get_travel_type", verify_token, MasterController.get_travel_type);
router.post("/get_travel_type_by_id", MasterController.get_travel_type_id);
router.post(
  "/update_travel_type_status",
  MasterController.update_travel_type_status
);
router.post(
  "/update_travel_type_details",
  MasterController.update_travel_type_details
);

router.post("/add_travel_plan_type", MasterController.add_travel_plan_type);
router.post(
  "/read_travel_plan_type_excel",
  Multer.single("file"),
  MasterController.read_travel_plan_type_excel
);
router.get(
  "/get_travel_plan_type", verify_token,
  MasterController.get_travel_plan_type
);
router.post(
  "/get_travel_plan_type_by_id",
  MasterController.get_travel_plan_type_id
);
router.post(
  "/update_travel_plan_type_details",
  MasterController.update_travel_plan_type_details
);
router.post(
  "/update_travel_plan_type_status",
  MasterController.update_travel_plan_type_status
);

router.post("/add_travel_region_list", MasterController.add_travel_region_list);
router.post(
  "/read_travel_region_list_excel",
  Multer.single("file"),
  MasterController.read_travel_region_list_excel
);
router.get(
  "/get_travel_region_list", verify_token,
  MasterController.get_travel_region_list
);
router.post(
  "/get_travel_region_list_id",
  MasterController.get_travel_region_list_id
);
router.post(
  "/update_travel_region_list_status",
  MasterController.update_travel_region_list_status
);
router.post(
  "/update_travel_region_list_details",
  MasterController.update_travel_region_list_details
);

router.post(
  "/add_travel_cover_type_list",
  MasterController.add_travel_cover_type_list
);
router.post(
  "/read_travel_cover_type_list_excel",
  Multer.single("file"),
  MasterController.read_travel_cover_type_excel
);
router.get(
  "/get_travel_cover_type_list", verify_token,
  MasterController.get_travel_cover_type_list
);
router.post(
  "/get_travel_cover_type_list_id",
  MasterController.get_travel_cover_type_list_id
);
router.post(
  "/update_travel_cover_type_list_status",
  MasterController.update_travel_cover_type_list_status
);
router.post(
  "/update_travel_cover_type_list_details",
  MasterController.update_travel_cover_type_list_details
);

router.post("/add_home_property_type", MasterController.add_home_property_type);
router.post(
  "/read_home_property_type_excel",
  Multer.single("file"),
  MasterController.read_home_property_type_excel
);
router.get(
  "/get_home_property_type", verify_token,
  MasterController.get_home_property_type
);
router.get(
  "/get_home_property_type_list",
  MasterController.gethomePropertyTypeList
);
router.post(
  "/get_home_property_type_detailsbyid",
  MasterController.get_home_property_type_detailsbyid
);
router.post(
  "/update_home_property_type_status",
  MasterController.update_home_property_type_status
);
router.post(
  "/update_home_property_type_details",
  MasterController.update_home_property_type_details
);

router.post("/add_home_plan_type", MasterController.add_home_plan_type);
router.post(
  "/read_home_plan_type_excel",
  Multer.single("file"),
  MasterController.read_home_plan_type_excel
);
router.get("/get_home_plan_type", verify_token, MasterController.get_home_plan_type);
router.get("/get_all_home_plan_type", MasterController.get_all_home_plan_type);
router.get("/get_homeplan_type", MasterController.getHome_Plan_Type);
router.post(
  "/get_home_plan_type_detailsbyid",
  MasterController.get_home_plan_type_detailsbyid
);
router.post(
  "/update_home_plan_type_status",
  MasterController.update_home_plan_type_status
);
router.post(
  "/update_home_plan_type_details",
  MasterController.update_home_plan_type_details
);
router.get("/get_home_plan_type", MasterController.getHome_Plan_Type);

router.post("/add_home_owner_type", MasterController.add_home_owner_type);
router.post(
  "/read_home_owner_type_excel",
  Multer.single("file"),
  MasterController.read_home_owner_type_excel
);
router.get(
  "/get_home_owner_type", verify_token,
  MasterController.get_home_owner_type
);
router.get(
  "/get_home_owner_type_list",
  MasterController.get_home_ownership_list
);
router.post(
  "/get_home_owner_type_detailsbyid",
  MasterController.get_home_owner_type_detailsbyid
);
router.post(
  "/update_home_owner_type_status",
  MasterController.update_home_owner_type_status
);
router.post(
  "/update_home_owner_type_details",
  MasterController.update_home_owner_type_details
);

router.post("/add_home_condition", MasterController.add_home_condition);
router.get(
  "/get_home_condition", verify_token,
  MasterController.get_home_condition
);
router.post(
  "/update_home_condition_status",
  MasterController.update_home_condition_status
);
router.post("/get_home_conditionbyid", MasterController.get_home_conditionbyid);
router.post("/update_home_condition", MasterController.update_home_condition);
router.post(
  "/read_home_condition_excel",
  Multer.single("file"),
  MasterController.read_home_condition_excel
);
router.get("/gethomecondition", MasterController.gethomecondition);
router.post("/add_plan_home_condition", PlanController.add_plan_home_condition);

router.post("/add_medical_plan_type", MasterController.add_medical_plan_type);
router.post(
  "/read_medical_plan_type_excel",
  uploadexcel.single("file"),
  MasterController.read_medical_plan_type_excel
);
router.get(
  "/get_medical_plan_type", verify_token,
  MasterController.get_medical_plan_type
);
router.post(
  "/get_medical_plan_type_detailsbyid",
  MasterController.get_medical_plan_type_detailsbyid
);
router.post(
  "/update_medical_plan_type_status",
  MasterController.update_medical_plan_type_status
);
router.post(
  "/update_medical_plan_type_details",
  MasterController.update_medical_plan_type_details
);
router.get("/getMedicalPlanTypeList", MasterController.getMedicalPlanTypeList);

router.post(
  "/add_medical_visa_country",
  MasterController.add_medical_visa_country
);
router.post(
  "/read_medical_visa_country_excel",
  uploadexcel.single("file"),
  MasterController.read_medical_visa_country_excel
);
router.get(
  "/get_medical_visa_country", verify_token,
  MasterController.get_medical_visa_country
);
router.post(
  "/get_medical_visa_country_detailsbyid",
  MasterController.get_medical_visa_country_detailsbyid
);
router.post(
  "/update_medical_visa_country_status",
  MasterController.update_medical_visa_country_status
);
router.post(
  "/update_medical_visa_country_details",
  MasterController.update_medical_visa_country_details
);
router.get("/getmedicalVisaCountry", MasterController.getMedicalVisaCountry);

router.post(
  "/add_medical_plan_condition",
  MasterController.add_medical_plan_condition
);
router.post(
  "/read_medical_plan_condition_excel",
  uploadexcel.single("file"),
  MasterController.read_medical_plan_condition_excel
);
router.get(
  "/get_medical_plan_condition", verify_token,
  MasterController.get_medical_plan_condition
);
router.post(
  "/get_medical_plan_condition_detailsbyid",
  MasterController.get_medical_plan_condition_detailsbyid
);
router.post(
  "/update_medical_plan_condition_status",
  MasterController.update_medical_plan_condition_status
);
router.post(
  "/update_medical_plan_condition_details",
  MasterController.update_medical_plan_condition_details
);
router.get(
  "/getMedicalPlanCondition",
  MasterController.getMedicalPlanCondition
);

router.post(
  "/add_medical_salary_range",
  MasterController.add_medical_salary_range
);
router.post(
  "/read_medical_salary_range_excel",
  Multer.single("file"),
  MasterController.read_medical_salary_range_excel
);
router.get(
  "/get_medical_salary_range", verify_token,
  MasterController.get_medical_salary_range
);
router.post(
  "/get_medical_salary_range_detailsbyid",
  MasterController.get_medical_salary_range_detailsbyid
);
router.post(
  "/update_medical_salary_range_status",
  MasterController.update_medical_salary_range_status
);
router.post(
  "/update_medical_salary_range_details",
  MasterController.update_medical_salary_range_details
);
router.get("/getMedicalSalaryRange", MasterController.getMedicalSalaryRange);

router.post(
  "/add_medical_weight_type",
  MasterController.add_medical_weight_type
);
router.post(
  "/read_medical_weight_type_excel",
  Multer.single("file"),
  MasterController.read_medical_weight_type_excel
);
router.get(
  "/get_medical_weight_type", verify_token,
  MasterController.get_medical_weight_type
);
router.post(
  "/get_medical_weight_type_detailsbyid",
  MasterController.get_medical_weight_type_detailsbyid
);
router.post(
  "/update_medical_weight_type_status",
  MasterController.update_medical_weight_type_status
);
router.post(
  "/update_medical_weight_type_details",
  MasterController.update_medical_weight_type_details
);
router.get(
  "/get_medical_weight_type_list",
  MasterController.get_medical_weight_type_list
);

router.post("/add_Yacht_Body_type", MasterController.add_Yacht_Body_type);
router.post(
  "/read_Yacht_Body_type_excel",
  Multer.single("file"),
  MasterController.read_Yacht_Body_type_excel
);
router.get(
  "/get_Yacht_Body_type", verify_token,
  MasterController.get_Yacht_Body_type
);
router.post(
  "/get_Yacht_Body_type_detailsbyid",
  MasterController.get_Yacht_Body_type_detailsbyid
);
router.post(
  "/update_Yacht_Body_type_status",
  MasterController.update_Yacht_Body_type_status
);
router.post(
  "/update_Yacht_Body_type_details",
  MasterController.update_Yacht_Body_type_details
);

router.post(
  "/add_Yacht_hull_material",
  MasterController.add_Yacht_hull_material
);
router.post(
  "/read_Yacht_hull_material_excel",
  Multer.single("file"),
  MasterController.read_Yacht_hull_material_excel
);
router.get(
  "/get_Yacht_hull_material", verify_token,
  MasterController.get_Yacht_hull_material
);
router.get("/get_Yacht_hull_materials", MasterController.gethullMaterial);
router.post(
  "/get_Yacht_hull_material_detailsbyid",
  MasterController.get_Yacht_hull_material_detailsbyid
);
router.post(
  "/update_Yacht_hull_material_status",
  MasterController.update_Yacht_hull_material_status
);
router.post(
  "/update_Yacht_hull_material_details",
  MasterController.update_Yacht_hull_material_details
);

router.post(
  "/add_Yacht_horespower_type",
  MasterController.add_Yacht_horespower_type
);
router.post(
  "/read_Yacht_horespower_type_excel",
  Multer.single("file"),
  MasterController.read_Yacht_horespower_type_excel
);
router.get(
  "/get_Yacht_horespower_type", verify_token,
  MasterController.get_Yacht_horespower_type
);
router.get(
  "/get_Yacht_horespower_typelist",
  MasterController.getYachtHorsePowerTypeList
);
router.post(
  "/get_Yacht_horespower_type_detailsbyid",
  MasterController.get_Yacht_horespower_type_detailsbyid
);
router.post(
  "/update_Yacht_horespower_type_status",
  MasterController.update_Yacht_horespower_type_status
);
router.post(
  "/update_Yacht_horespower_type_details",
  MasterController.update_Yacht_horespower_type_details
);

router.post("/add_Yacht_engine_type", MasterController.add_Yacht_engine_type);
router.post(
  "/read_Yacht_engine_type_excel",
  Multer.single("file"),
  MasterController.read_Yacht_engine_type_excel
);
router.get(
  "/get_Yacht_engine_type", verify_token,
  MasterController.get_Yacht_engine_type
);
router.get(
  "/get_Yacht_engine_type_list",
  MasterController.getYachtEngineTypeList
);
router.post(
  "/get_Yacht_engine_type_detailsbyid",
  MasterController.get_Yacht_engine_type_detailsbyid
);
router.post(
  "/update_Yacht_engine_type_status",
  MasterController.update_Yacht_engine_type_status
);
router.post(
  "/update_Yacht_engine_type_details",
  MasterController.update_Yacht_engine_type_details
);

router.post(
  "/add_Yacht_speed_knot_type",
  MasterController.add_Yacht_speed_knot_type
);
router.post(
  "/read_Yacht_speed_knot_type_excel",
  Multer.single("file"),
  MasterController.read_Yacht_speed_knot_type_excel
);
router.get(
  "/get_Yacht_speed_knot_type", verify_token,
  MasterController.get_Yacht_speed_knot_type
);
router.get(
  "/get_Yacht_speed_knot_typeList",
  MasterController.getSpeedKnotTypeList
);
router.post(
  "/get_Yacht_speed_knot_type_detailsbyid",
  MasterController.get_Yacht_speed_knot_type_detailsbyid
);
router.post(
  "/update_Yacht_speed_knot_type_status",
  MasterController.update_Yacht_speed_knot_type_status
);
router.post(
  "/update_Yacht_speed_knot_type_details",
  MasterController.update_Yacht_speed_knot_type_details
);
router.get("/getyachtbodytype", MasterController.getyachtbodytype);

router.get("/get_body_type", verify_token, MasterController.get_body_type);
router.get("/get_all_body_type", MasterController.get_all_body_type);
router.post(
  "/update_body_type_status/:id",
  MasterController.update_body_type_status
);
router.post("/add_body_type", MasterController.add_body_type);
router.get(
  "/get_body_type_details/:id",
  MasterController.get_body_type_details
);
router.post("/update_body_type", MasterController.update_body_type);
router.post(
  "/read_body_type_excel",
  Multer.single("file"),
  MasterController.read_body_type_excel
);
router.get("/get_body_type_list", MasterController.get_body_type_list);

router.get(
  "/get_plan_category/:page/:limit", verify_token,
  MasterController.get_plan_category
);
router.post(
  "/update_plan_category_status/:id",
  MasterController.update_plan_category_status
);
router.post("/add_plan_category", MasterController.add_plan_category);
router.get(
  "/get_plan_category_details/:id",
  MasterController.get_plan_category_details
);
router.post("/update_plan_category", MasterController.update_plan_category);
router.post(
  "/read_plan_category_excel",
  uploadexcel.single("file"),
  MasterController.read_plan_category_excel
);

router.get(
  "/get_nature_of_plan/:page/:limit", verify_token,
  MasterController.get_nature_of_plan
);
router.post(
  "/update_nature_of_plan_status/:id",
  MasterController.update_nature_of_plan_status
);
router.post("/add_nature_of_plan", MasterController.add_nature_of_plan);
router.get(
  "/get_nature_of_plan_details/:id",
  MasterController.get_nature_of_plan_details
);
router.post("/update_nature_of_plan", MasterController.update_nature_of_plan);
router.post(
  "/read_nature_of_plan_excel",
  uploadexcel.single("file"),
  MasterController.read_nature_of_plan_excel
);

router.post("/add_nationality_list", MasterController.add_nationality_list);
router.post(
  "/read_nationality_list_excel",
  Multer.single("file"),
  MasterController.read_nationality_list_excel
);
router.get(
  "/get_nationality_list", verify_token,
  MasterController.get_nationality_list
);
router.post(
  "/get_nationality_list_id",
  MasterController.get_nationality_list_id
);
router.post(
  "/update_nationality_list_status",
  MasterController.update_nationality_list_status
);
router.post(
  "/update_nationality_list_details",
  MasterController.update_nationality_list_details
);

router.post(
  "/add_area_of_registeration",
  MasterController.add_area_of_registeration
);
router.post(
  "/read_area_of_registeration_excel",
  Multer.single("file"),
  MasterController.read_area_of_registeration_excel
);
router.get(
  "/get_area_of_registration", verify_token,
  MasterController.get_area_of_registration
);
router.get(
  "/get_area_of_registration_details/:id",
  MasterController.get_area_of_registration_details
);
router.post(
  "/update_area_of_registration_status/:id",
  MasterController.update_area_of_registration_status
);
router.post(
  "/update_area_of_registration",
  MasterController.update_area_of_registration
);

router.post("/add_user_type", MasterController.add_usertype);
router.post(
  "/read_user_type_excel",
  uploadexcel.single("file"),
  MasterController.read_usertype_excel
);
router.get("/get_user_type/:page/:limit", MasterController.get_usertype);
router.post(
  "/get_user_type_detailsbyid",
  MasterController.get_user_type_detailsbyid
);
router.post(
  "/update_user_type_status",
  MasterController.update_usertype_status
);
router.post(
  "/update_user_type_details",
  MasterController.update_usertype_details
);
router.get("/get_user_type", MasterController.get_user_type);

router.post("/add_repair_type", MasterController.add_repair_type);
router.post(
  "/read_repair_type_excel",
  Multer.single("file"),
  MasterController.read_repair_type_excel
);
router.get("/get_repair_type", verify_token, MasterController.get_repair_type);
router.post(
  "/get_repair_type_detailsbyid",
  MasterController.get_repair_type_detailsbyid
);
router.post(
  "/update_repair_type_status",
  MasterController.update_repair_type_status
);
router.post(
  "/update_repair_type_details",
  MasterController.update_repair_type_details
);

router.post("/add_policiy_type", MasterController.add_policy_type);
router.post(
  "/read_policiy_type_excel",
  uploadexcel.single("file"),
  MasterController.read_policy_type_excel
);
router.get("/get_policiy_type", verify_token, MasterController.get_policy_type);
router.get("/get_all_policiy_type", MasterController.get_all_policy_type);
router.post(
  "/get_policiy_type_detailsbyid",
  MasterController.get_policy_type_detailsbyid
);
router.post(
  "/update_policiy_type_status",
  MasterController.update_policy_type_status
);
router.post(
  "/update_policiy_type_details",
  MasterController.update_policy_type_details
);

router.post("/add_business_type", MasterController.add_business_type);
router.post(
  "/read_business_type_excel",
  Multer.single("file"),
  MasterController.read_business_type_excel
);
router.get(
  "/get_business_type", verify_token,
  MasterController.get_business_type
);
router.post(
  "/get_business_type_detailsbyid",
  MasterController.get_business_type_detailsbyid
);
router.post(
  "/update_business_type_status",
  MasterController.update_business_type_status
);
router.post(
  "/update_business_type_details",
  MasterController.update_business_type_details
);

router.post(
  "/add_Motor_model_details",
  MasterController.add_Motor_model_details
);
router.get("/get_model_motor_name", MasterController.get_model_motor_name);
router.post(
  "/read_Motor_model_excel",
  Multer.single("file"),
  MasterController.read_Motor_model_details_excel
);
router.post(
  "/get_Motor_model_details", verify_token,
  MasterController.get_Motor_model_details
);
router.post(
  "/get_Motor_model_details_excel", verify_token,
  MasterController.get_Motor_model_details_excel
);
router.post(
  "/get_Motor_model_detailsbyid",
  MasterController.get_Motor_model_detailsbyid
);
router.post(
  "/update_model_motor_detail_status/:id",
  MasterController.update_Motor_model_details_status
);
router.post(
  "/update_Motor_model_details",
  MasterController.update_Motor_model_details
);

router.post(
  "/addCompany",
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "company_dha_format", maxCount: 1 },
    { name: "company_medical_application", maxCount: 1 },
    { name: "company_salary_declaration", maxCount: 1 },
    { name: "company_kyc_form", maxCount: 1 },
    { name: "company_terms_condition", maxCount: 1 },
  ]),
  CompanyController.addCompany
);
router.get("/getCompany", CompanyController.getCompany);
router.post(
  "/update_company_status/:id",
  CompanyController.update_company_status
);
router.get(
  "/getCompanyDetailsbyid/:id",
  CompanyController.getCompanyDetailsbyid
);
router.post(
  "/updateCompany",
  upload.fields([
    { name: "company_logo", maxCount: 1 },
    { name: "company_dha_format", maxCount: 1 },
    { name: "company_medical_application", maxCount: 1 },
    { name: "company_salary_declaration", maxCount: 1 },
    { name: "company_kyc_form", maxCount: 1 },
    { name: "company_terms_conditions", maxCount: 1 },
  ]),
  CompanyController.updateCompany
);

router.post("/addBank", CompanyController.addBank);
router.post("/getBank/:page/:limit", CompanyController.getBank);
router.post("/getBankDetailsbyid", CompanyController.getBankDetailsbyid);
router.post("/updateBank", CompanyController.updateBank);
router.post("/update_bank_status/:id", CompanyController.update_bank_status);

router.post("/add_lead_status", MasterController.add_lead_status);
router.get("/get_lead_status/:page/:limit", MasterController.get_lead_status);
router.post("/get_lead_status_name", MasterController.get_lead_status_name);
router.post("/get_lead_statusbyid", MasterController.get_lead_statusbyid);
router.post("/update_lead_status", MasterController.update_lead_status);

router.post("/get_dashboard_count", LeadController.get_dashboard_count);

router.post("/add_new_lead", LeadController.add_new_lead);
router.get("/get_new_leads/:page/:limit", LeadController.get_new_leads);
router.post(
  "/get_new_lead_detailsbyid",
  LeadController.get_new_lead_detailsbyid
);
router.post("/update_new_lead_details", LeadController.update_new_lead_details);
router.post("/get_daily_new_leads", LeadController.get_daily_new_leads);
router.post("/get_new_leads_count", LeadController.get_new_leads_count);

router.post("/get_hot_leads", LeadController.get_hot_leads);
router.post("/update_hot_lead_details", LeadController.update_hot_lead_details);

router.post("/get_cold_leads", LeadController.get_cold_leads);
router.post(
  "/update_cold_lead_details",
  LeadController.update_cold_lead_details
);

router.post("/get_warm_leads", LeadController.get_warm_leads);
router.post(
  "/update_warm_lead_details",
  LeadController.update_warm_lead_details
);

router.post("/get_lostdrop_leads", LeadController.get_lostdrop_leads);
router.post(
  "/update_lostdrop_lead_details",
  LeadController.update_lostdrop_lead_details
);

router.post("/get_close_leads", LeadController.get_close_leads);

router.post("/get_sales_pending_leads", LeadController.get_sales_pending_leads);

router.post("/assigndcagent", LeadController.assigndcagent);
router.post("/get_dcassigned_leads", LeadController.get_dcassigned_leads);
router.post(
  "/get_dcassigned_pending_leads",
  LeadController.get_dcassigned_pending_leads
);

router.post("/get_piassigned_leads", LeadController.get_piassigned_leads);
router.get("/getUserAccordingUserType", verify_token, LeadController.getUserAccordingUserType);
router.post("/topLeagentCount", verify_token, LeadController.topLeagentCount);
router.post("/getInsurancetopLeagentCount", verify_token, LeadController.getInsurancetopLeagentCount);

router.post("/getAllGraphCount", verify_token, LeadController.getAllGraphCount);
router.post("/getOprationsCount", verify_token, LeadController.getOprationsCount);

router.post(
  "/SuperAdmintopLeagentCount",
  verify_token,
  LeadController.SuperAdmintopLeagentCount
);
router.post(
  "/Send_Email",
  uploademaildocuments.array("file"),
  LeadController.Send_Email
);
router.post(
  "/get_pi_issued_policy_leads",
  LeadController.get_pi_issued_policy_leads
);

router.post("/updatedcverification", LeadController.updatedcverification);
router.post("/update_final_price", LeadController.update_final_price);

router.post("/add_Reason_Type", MasterController.add_Reason_Type);
router.get("/get_Reason_Type/:page/:limit", verify_token, MasterController.get_Reason_Type);
router.get("/get_Reason_Type_list", MasterController.get_Reason_Type_list);
router.post("/get_Reason_Type_byid", MasterController.get_Reason_Type_byid);
router.post("/update_Reason_Type", MasterController.update_Reason_Type);

router.post("/add_Documents_Type", MasterController.add_Documents_Type);
router.get(
  "/get_Documents_Type",
  MasterController.get_Documents_Type
);
router.get("/get_Documents_list", MasterController.get_Documents_list);
router.post(
  "/get_Documents_Type_byid",
  MasterController.get_Documents_Type_byid
);
router.post("/update_Documents_Type", MasterController.update_Documents_Type);
router.post("/get_Documents_listbyid", MasterController.get_Documents_listbyid);

router.post(
  "/update_all_documents",
  uploaddocuments.array("file"),
  LeadController.update_all_documents
);
router.post(
  "/update_single_documents",
  uploaddocuments.single("file"),
  LeadController.update_single_documents
);

router.post(
  "/update_single_group_documents",
  uploaddocuments.single("file"),
  LeadController.update_single_group_documents
);

router.post("/apiintegrate", CompanyController.apiintegrate);
router.post("/getapiintegrate", CompanyController.getapiintegrate);
router.post("/updateapistatus", CompanyController.updateapistatus);
router.post("/updatecreditlimit", CompanyController.updatecreditlimit);

router.get("/getPolicyType", MasterController.getPolicyType);
router.get("/getPlanCategory", MasterController.getPlanCategory);
router.get("/getNatureOfPlan", MasterController.getNatureOfPlan);
router.get("/getBodyType", MasterController.getBodyType);
router.get("/getRepairCondition", MasterController.getRepairCondition);
router.get("/getPlanFor", MasterController.getPlanFor);
router.get("/getBusinessType", MasterController.getBusinessType);
router.get("/getGccSpecs", MasterController.getGccSpecs);
router.get("/getNationality", MasterController.getNationality);
router.get("/getModelMotor", MasterController.getModelMotor);
router.get("/company_list", CompanyController.company_list);
router.get("/getPolicyTypes", MasterController.getPolicyTypes);

router.post("/addMotorPlan", verify_token, PlanController.addMotorPlan);
router.post("/getMotorPlan", verify_token, PlanController.getMotorPlan);
router.get("/motor_plan_details/:id", PlanController.motor_plan_details);
router.post("/updateMotorPlan/:id", PlanController.updateMotorPlan);
router.get(
  "/updatestatusMotorPlan/:id/:status",
  PlanController.updatestatusMotorPlan
);
router.post(
  "/upload_policywordings_file",
  upload.single("policywordings_file"),
  PlanController.upload_policywordings_file
);
router.post("/add_plan_standard_cover", PlanController.add_plan_standard_cover);
router.post(
  "/add_plan_additional_cover",
  PlanController.add_plan_additional_cover
);
router.post(
  "/add_non_applicable_nationality",
  PlanController.add_non_applicable_nationality
);
router.post(
  "/add_black_listed_Vehicle",
  PlanController.add_black_listed_Vehicle
);
router.post("/fillInsurancePlan", PlanController.fillMotorPlan);
router.post("/addRenewalLead", PlanController.addRenewalLead);
router.post("/getMotorDetails", PlanController.getMotorDetails);
router.get("/motorPlanDataByEmail", PlanController.getMotorPlanDataByEmail);
router.post("/getMatchMotorPlan", PlanController.getMatchMotorPlane);
router.post("/getCarEstimatedValue", PlanController.getCarEstimatedValue);
router.get("/getNaturePlan", PlanController.getNaturePlan);
router.get("/getAllCompanies", PlanController.getAllCompanies);
router.get("/getAllStandardCovered", PlanController.getAllStandardCovered);
router.get(
  "/getAllCompletePolicy",
  verify_token,
  PlanController.getAllCompletePolicy
);
router.get(
  "/getAllPendingPolicy",
  verify_token,
  PlanController.getAllPendingPolicy
);
router.put("/updatePolicyDetails", PlanController.updatePolicyDetails);
router.get(
  "/getAllRenewalPolicy",
  verify_token,
  PlanController.getAllRenewalPolicy
);

router.post("/addStaff", AdminController.addStaff);
router.post(
  "/getAssignAgentByUserType",
  AdminController.getAssignAgentByUserType
);
router.get("/getAllPolicyIssuer", AdminController.getAllPolicyIssuer);

router.get("/getStaff", MasterController.getStaff);
router.post("/getMultiStaff", MasterController.getMultiStaff);
router.post(
  "/get_staff_base_usertype",
  MasterController.get_staff_base_usertype
);
router.get(
  "/getSupervisorMultiStaff",
  MasterController.getSupervisorMultiStaff
);
router.get(
  "/updatestatusStaff/:id/:status",
  MasterController.updatestatusStaff
);
router.get("/getStaffDetailsbyid/:id", MasterController.getStaffDetailsbyid);
router.post("/updateStaff", MasterController.updateStaff);
router.post("/updatestaffpassword", MasterController.updatestaffpassword);
router.get("/getDocumentChaser", MasterController.getDocumentChaser);
router.get("/getPolicyIssuer", MasterController.getPolicyIssuer);
router.get("/stafflist/", MasterController.stafflist);
router.post("/assignStaff/:id", MasterController.assignStaff);
router.put(
  "/update_user_permission/:id",
  AdminController.update_user_permission
);
router.put(
  "/update_user_permission_manually/:id",
  AdminController.update_user_permission_manually
);
router.get("/get_staff_details/:id", AdminController.get_staff_details);

router.post(
  "/updateprofile",
  user.fields([{ name: "profile_image", maxCount: 1 }]),
  AdminController.updateprofile
);
router.post("/changepassword", AdminController.changepassword);

router.post("/add_standard_cover", MasterController.add_standard_cover);
router.post(
  "/read_standard_cover_excel",
  uploadexcel.single("file"),
  MasterController.read_standard_cover_excel
);
router.get(
  "/get_standard_covers", verify_token,
  MasterController.get_standard_covers
);
router.get(
  "/get_standard_cover/:id/:type",
  MasterController.get_standard_cover
);
router.post("/get_standard_coverbyid", MasterController.get_standard_coverbyid);
router.post("/update_standard_cover", MasterController.update_standard_cover);
router.post(
  "/update_standard_cover_status",
  MasterController.update_standard_cover_status
);

router.post("/add_additional_cover", MasterController.add_additional_cover);
router.post(
  "/read_additional_cover_excel",
  uploadexcel.single("file"),
  MasterController.read_additional_cover_excel
);
router.get(
  "/get_additional_covers", verify_token,
  MasterController.get_additional_covers
);
router.get(
  "/get_additional_cover/:id/:type",
  MasterController.get_additional_cover
);
router.post(
  "/get_additional_coverbyid",
  MasterController.get_additional_coverbyid
);
router.post(
  "/update_additional_cover",
  MasterController.update_additional_cover
);
router.post(
  "/update_additional_cover_status",
  MasterController.update_additional_cover_status
);

router.get("/get_nationality", MasterController.get_nationality);

router.get("/modelmotor/:id", MasterController.modelmotor);
router.get("/motormodel/:id", MasterController.motormodel);
router.post("/addblacklistedvehicle", MasterController.addblacklistedvehicle);
router.get(
  "/getblacklistedvehicles/:company_id/:page/:limit",
  MasterController.getblacklistedvehicle
);
router.delete(
  "/deleteblacklistedvehicle/:id",
  MasterController.deleteblacklistedvehicle
);
router.get(
  "/getlistBlackListedVehicle/:id",
  PlanController.getlistBlackListedVehicle
);

router.get("/getAllPermission/:id", managementController.get_all_permission);
router.put("/update_model_permission", managementController.update_permission);

router.get("/getmodule", managementController.getmodule);

router.post(
  "/addBulkMotterPlan",
  Multer.single("xlFile"),
  PlanController.add_bulk_motor_plane
);

router.get("/getTravelType", MasterController.getTravelType);
router.get("/getTravelInsuranceFor", MasterController.getTravelInsuranceFor);
router.get("/getCountryList", MasterController.getCountryList);
router.post("/getCountrybyid", MasterController.getCountrybyid);
router.post("/addTravelPlan", verify_token, PlanController.addTravelPlan);
router.get("/getTravelPlan", verify_token, PlanController.getTravelPlan);
router.get(
  "/updatestatusTravelPlan/:id/:status",
  PlanController.updatestatusTravelPlan
);
router.get("/travel_plan_details/:id", PlanController.travel_plan_details);
router.post("/updateTravelPlan/:id", PlanController.updateTravelPlan);
router.post(
  "/upload_travel_plan_policywordings_file",
  upload.single("policywordings_file"),
  PlanController.upload_travel_plan_policywordings_file
);
router.post(
  "/addBulkTravelPlan",
  Multer.single("xlFile"),
  PlanController.add_bulk_travel_plane
);
router.post("/travelplanprice", PlanController.travelplanprice);
router.get("/travelplantype", MasterController.travelplantype);
router.get("/travelregion", MasterController.travelregion);
router.get("/travelcovertype", MasterController.travelcovertype);
router.post("/addtravelplanprice", PlanController.addtravelplanprice);
router.get("/planpricedetails/:id", PlanController.planpricedetails);
router.post("/updateplanprice/:id", PlanController.updateplanprice);
router.post("/UpdateTravelPlanPriceStatus", PlanController.UpdateTravelPlanPriceStatus);
router.delete("/deleteplanprice", PlanController.DeleteTravelPlanPrice);
router.post("/getMatchTravelPlan", PlanController.getMatchTravelPlan);
router.post("/getTravelPlanByEmail", PlanController.getTravelPlanByEmail);

router.post("/addhomeplan", verify_token, PlanController.addHomePlan);
router.get("/gethomeplan", PlanController.getHomePlan);
router.get("/home_plan_details/:id", PlanController.home_plan_details);
router.get(
  "/updateStatusHomePlan/:id/:status",
  PlanController.updatestatusHOmePlan
);
router.post("/updateHomePlan/:id", PlanController.UpdteHomePlan);
router.post(
  "/addBulkHomePlan",
  Multer.single("xlFile"),
  PlanController.add_bulk_home_plan
);
router.post(
  "/upload_home_policywordings_file",
  upload.single("policywordings_file"),
  PlanController.upload_home_plan_policywordings_file
);

//customer#########################
router.post("/addCustomer", customerController.add_customer);
router.post("/customerLogin", customerController.login_customer);
router.post("/send_otp_email", customerController.send_otp_email);
router.post("/verify_otp", customerController.verify_otp);
router.post("/verifyEmail", customerController.send_email_forgot_password);
router.post(
  "/forgotPassword",
  verify_token,
  customerController.forgot_password
);
router.get("/emailVerification", customerController.email_verification);
router.post("/verifyuser", verify_token, customerController.verify_email);
router.put("/updateCustomerProfile", user.fields([{ name: "profile_image", maxCount: 1 }]), customerController.update_cutomer_profile);
router.post(
  "/addClaim",
  verify_token,
  uploadClaims.array("file"),
  customerController.addClaim
);
router.get("/getClaims", verify_token, customerController.getClaims);
router.get("/getAllClaims/:limit/:page", customerController.getAllClaims);
router.get(
  "/getCustomerProfile",
  verify_token,
  customerController.getCustomerProfile
);
router.get("/getCustomerlist", customerController.getCustomerlist);
router.get("/getMotorInsuranceDetails", PlanController.findMotorDetails);
router.get("/getAreaOfRegistrations", PlanController.getAreaOfRegistrations);
router.get("/getAllNattionlity", PlanController.getAllNattionlity);

router.get("/getrepairtypes", PlanController.getRepairTypes);

router.post("/ThirdPartyBuisness", TPBuisnessController.AddTPBuisness);
router.get(
  "/GetThirdPartyBuisness/:page/:perpage",
  TPBuisnessController.GetTPBuisness
);

router.post(
  "/get_supervisor_leads",
  verify_token,
  LeadController.get_supervisor_leads
);
router.post("/adminlist", LeadController.adminlist);
router.post('/get_assigned_staff', verify_token, LeadController.get_assigned_staff)
router.post("/reassigned_agent", verify_token, LeadController.reassigned_agent);
router.post(
  "/get_supervisor_api_pending_leads",
  LeadController.get_supervisor_api_pending_leads
);
router.post(
  "/get_supervisor_payment_pending_leads",
  LeadController.get_supervisor_payment_pending_leads
);
router.post(
  "/get_supervisor_Renewal_leads",
  LeadController.get_supervisor_Renewal_leads
);
router.post(
  "/get_supervisor_lostdropped_leads",
  LeadController.get_supervisor_lostdropped_leads
);
router.post(
  "/supervisor_closed_business",
  LeadController.supervisor_closed_business
);
router.post(
  "/supervisor_renewal_assigned_agent",
  LeadController.supervisor_renewal_assigned_agent
);

router.post("/getMotorPlans", PlanController.getMotorPlans);
router.post("/getTravelPlans", PlanController.getTravelPlans);
router.post("/getHomePlansInsurance", PlanController.getHomePlansInsurance);

router.post("/addyachtplan", verify_token, PlanController.addYachtPlan);
router.get("/getyachtplans", PlanController.getYachtPlans);
router.get("/yacht_plan_details/:id", PlanController.yacht_plan_details);
router.post("/updateYachtplan/:id", PlanController.UpdateYachtPlan);
router.get(
  "/updateStatusYachtPlan/:id/:status",
  PlanController.updateStatusYachtPlan
);
router.post(
  "/addBulkYachtPlan",
  Multer.single("xlFile"),
  PlanController.add_bulk_Yacht_plan
);
router.post(
  "/upload_Yacht_plan_policywordings_file",
  upload.single("policywordings_file"),
  PlanController.upload_Yacht_plan_policywordings_file
);

router.post("/add_yacht_condition", PlanController.add_yacht_condition);

router.post("/add_yacht_conditions", MasterController.add_yacht_conditions);
router.get(
  "/get_yacht_condition", verify_token,
  MasterController.get_yacht_condition
);
router.post(
  "/update_yacht_condition_status",
  MasterController.update_yacht_condition_status
);
router.post(
  "/get_yacht_conditionbyid",
  MasterController.get_yacht_conditionbyid
);
router.post("/update_yacht_condition", MasterController.update_yacht_condition);
router.post(
  "/read_yacht_condition_excel",
  Multer.single("file"),
  MasterController.read_yacht_condition_excel
);
router.get("/getyachtcondition", MasterController.getyachtcondition);

router.post(
  "/businessEntity",
  businessEntitiesController.add_business_entities
);
router.get(
  "/businessEntity",
  businessEntitiesController.get_all_business_entities
);
router.delete(
  "/businessEntity",
  businessEntitiesController.delete_business_entities
);
router.put(
  "/businessEntity",
  businessEntitiesController.update_business_entities
);

router.post(
  "/add_business_entity_bank",
  businessEntitiesController.add_business_entity_bank
);
router.post(
  "/get_business_entity_bank/:page/:limit",
  businessEntitiesController.get_business_entity_bank
);
router.post(
  "/get_business_entity_bank_details",
  businessEntitiesController.get_business_entity_bank_details
);
router.post(
  "/update_business_entity_bank",
  businessEntitiesController.update_business_entity_bank
);
router.post(
  "/update_business_entity_bank_status/:id",
  businessEntitiesController.update_business_entity_bank_status
);

router.post("/addmedicalplan", verify_token, PlanController.addMedicalPlan);
router.get("/getmedicalplans", verify_token, PlanController.getMedicalPlans);
router.get("/getmedicalplansinsurance", PlanController.getmedicalplansinsurance);
router.get(
  "/single_medical_plan_details/:id",
  PlanController.single_medical_plan_details
);
router.post("/update_medical_plan/:id", PlanController.update_medical_plan);
router.get(
  "/updatestatusMedicalPlan/:id/:status",
  PlanController.updatestatusMedicalPlan
);
router.post(
  "/add_bulk_Medical_plan",
  Multer.single("xlFile"),
  PlanController.add_bulk_Medical_plan
);
router.post(
  "/upload_medical_plan_policywordings_file",
  upload.single("policywordings_file"),
  PlanController.upload_medical_plan_policywordings_file
);

router.post("/add_table_benefits", MasterController.add_table_benefis);
router.get(
  "/get_table_benefits",
  MasterController.getTableBenefits
);
router.post("/get_table_benefitbyid", MasterController.get_table_benefit_byId);
router.post("/update_table_benefits", MasterController.update_benefits);
router.post(
  "/update_benefits_table_status",
  MasterController.update_benefits_table_status
);
router.post(
  "/read_benefits_table_excel",
  uploadexcel.single("file"),
  MasterController.read_benefits_table_excel
);
router.get("/travel_plan_details/:id", PlanController.travel_plan_details);
router.get("/get_medical_benefits", MasterController.get_medical_benefits);
router.post("/add_medical_benefits", PlanController.add_medical_benefits);

router.get("/getTravelTypes", PlanController.getTravelTypes);
router.get("/getTravelsInsuranceFor", PlanController.getTravelsInsuranceFor);
router.get("/getTravelPlanTypes", PlanController.getTravelPlanTypes);
router.get("/getAllCountries", PlanController.getAllCountries);
router.get("/getAllPlanCategories", PlanController.getAllPlanCategories);
router.get(
  "/getAlltravelPlanCoverType",
  PlanController.getAlltravelPlanCoverType
);
router.post("/payGateway", PlanController.getSessionId);

router.post(
  "/add_standard_Underwriting_condition",
  MasterController.add_standard_Underwriting_condition
);
router.get(
  "/get_standard_Underwriting_condition",
  MasterController.get_standard_Underwriting_condition
);
router.post(
  "/get_standard_Underwriting_conditionbyid",
  MasterController.get_standard_Underwriting_condition_byId
);
router.post(
  "/update_standard_Underwriting_condition",
  MasterController.update_standard_Underwriting_condition
);
router.post(
  "/update_standard_condition_status",
  MasterController.update_standard_condition_status
);
router.post(
  "/read_standard_condition_status_excel",
  Multer.single("file"),
  MasterController.read_standard_condition_excel
);
router.get(
  "/get_standard_conditions",
  MasterController.get_standard_conditions
);
router.post(
  "/add_Standard_underwriting_conditions",
  PlanController.add_Standard_underwriting_conditions
);

router.post(
  "/add_Additional_Underwriting_condition",
  MasterController.add_Additional_Underwriting_condition
);
router.get(
  "/get_additional_Underwriting_condition",
  MasterController.get_Additional_Underwriting_condition
);
router.post(
  "/get_additional_Underwriting_conditionbyid",
  MasterController.get_Additional_Underwriting_condition_byId
);
router.post(
  "/update_additional_Underwriting_condition",
  MasterController.update_Additional_Underwriting_condition
);
router.post(
  "/update_additional_condition_status",
  MasterController.update_Additional_condition_status
);
router.post(
  "/read_additional_condition_status_excel",
  Multer.single("file"),
  MasterController.read_Additional_condition_excel
);
router.get(
  "/get_additional_conditions",
  MasterController.get_Additional_conditions
);
router.post(
  "/add_Additional_underwriting_conditions",
  PlanController.add_Additional_underwriting_conditions
);

router.post("/add_medicalplan_bmi", PlanController.add_medicalplan_bmi);
router.post("/get_medicalplan_bmi", PlanController.get_medicalplan_bmi);
router.get(
  "/medicalplan_bmi_details/:id",
  PlanController.medicalplan_bmi_details
);
router.post(
  "/update_medicalplan_bmi",
  PlanController.update_medicalplan_bmi
);
router.post(
  "/update_medicalplan_bmi_status",
  PlanController.updateMedicalPlanBMIStatus
);
router.get("/getAllHomePropertyTypes", PlanController.getAllHomePropertyType);
router.get(
  "/getAllHomeOwnershipStatus",
  PlanController.getAllHomeOwnershipStatus
);
router.get("/getAllHomePlanTypes", PlanController.getAllHomePlanType);
router.get("/getAllHomeConditions", PlanController.getAllHomeConditions);
router.post("/getMatchHomePlan", PlanController.getMatchHomePlan);
router.get("/getAllAdditionalCovered", PlanController.getAllAdditionalCovered);
router.post("/getMatchYatchPlans", PlanController.getMatchYatchPlans);
router.post("/getCountrybyid", MasterController.getCountrybyid);

router.post(
  "/add_Underwriting_condition",
  MasterController.add_Underwriting_condition
);
router.get(
  "/get_Underwriting_condition",
  MasterController.get_Underwriting_condition
);
router.post(
  "/get_Underwriting_conditionbyid",
  MasterController.get_Underwriting_condition_byId
);
router.post(
  "/update_Underwriting_condition",
  MasterController.update_Underwriting_condition
);
router.post(
  "/update_Underwriting_condition_status",
  MasterController.update_Underwriting_condition_status
);
router.post(
  "/read_underwriting_condition_excel",
  Multer.single("file"),
  MasterController.read_underwriting_condition_excel
);
router.get(
  "/get_underwriting_conditions",
  MasterController.get_underwriting_conditions
);
router.post(
  "/add_underwriting_conditions",
  PlanController.add_underwriting_conditions
);
router.post("/add_rates_based_on_age", PlanController.add_rates_based_on_age);
router.get(
  "/rates_based_on_age_details/:id",
  PlanController.rates_based_on_age_details
);
router.post(
  "/update_medicalplan_rates/:id",
  PlanController.update_medicalplan_rates
);
router.post(
  "/update_medicalplan_rates_status/:id",
  PlanController.update_medicalplan_rates_status
);

// terms and conditions

router.post("/termsAndCondition", MasterController.addTermsCondition);
router.get("/termsAndCondition", MasterController.getTermsCondition);
router.put("/termsAndCondition", MasterController.updateTermsCondition);
router.get(
  "/getAllTermsCondition/:limit/:page",
  MasterController.getAllTermsCondition
);
router.post("/gettermsconditionbyid", MasterController.gettermsconditionbyid);
// Complaints done
router.post("/complaint", MasterController.addComplaint);
router.get("/complaint/:limit/:page", MasterController.getComplaints);
router.put("/updateComplaints", MasterController.updateComplaints);
//add_special_offer done
router.post("/add_special_offer", MasterController.addSpecialOffer);
router.get(
  "/get_all_special_offer",
  verify_token,
  MasterController.GetAllSpecialOffers
);
router.get(
  "/get_special_offer/:limit/:page",
  MasterController.GetSpecialOffers
);
router.post("/get_special_offer_by_id", MasterController.GetSpecialOffersById);
router.put("/update_special_offer", MasterController.UpdateSpecialOffer);

//Testimonials done
router.post(
  "/testimonials",
  uploadTestimonials.single("image"),
  MasterController.addTestimonials
);
router.get("/testimonials/:limit/:page", MasterController.getTestimonials);
router.get("/allTestimonials", MasterController.getAllTestimonials);
router.post("/testimonialsbyid", MasterController.getTestimonialsById);
router.put(
  "/testimonials",
  uploadTestimonials.single("image"),
  MasterController.updateTestimonials
);
// Orther Insurance

router.post("/otherInsurance", MasterController.addotherInsurance);
router.get("/otherInsurance", MasterController.getotherInsurance);
router.put("/otherInsurance", MasterController.updateotherInsurance);

// individual medical############
router.get("/getEmirate", PlanController.getAllEmirate);
router.get("/getVisaTypes", PlanController.getAllVisaType);
router.get("/getsalary", PlanController.getAllSalary);
router.post("/getMatchMedicalPlans", PlanController.getMatchMedicalPlan);

// Maternity Questionnaire#### updateMaternityQuestionnaire
router.post("/maternity", MasterController.addMaternityQuestionnaire);
router.get("/maternityById", MasterController.getBuIdMaternityQuestionnaire);
router.get("/get_maternity", MasterController.getMaternityQuestionnaire);
router.put("/maternity", MasterController.updateMaternityQuestionnaire);
router.post("/read_maternity_excel", Multer.single("file"), MasterController.read_maternity_excel
);

// Medical Symptoms #### updateMaternityQuestionnaire
router.post("/medicalSymptoms", MasterController.addMedicalSymptoms);
router.get("/medicalSymptomsById", MasterController.getBYIdMedicalSymptoms);
router.get("/medicalSymptoms", MasterController.getAllMedicalSymptoms);
router.put("/medicalSymptoms", MasterController.updateMedicalSymptoms);

router.get(
  "/getAllUnderwritingConditions",
  MasterController.getAllUnderwritingConditions
);
router.get("/getDocumentsLob", MasterController.getAllDocumentByLob);
// motor Cliams years ######## done
router.post("/motorClaimsYears", MasterController.addMotorClaimsYears);
router.get("/motorClaimsYearssById", MasterController.getMotorClaimsYearsById);
router.get("/motorClaimsYears", MasterController.getMotorClaimsYears);
router.put("/motorClaimsYears", MasterController.updateMotorClaimsYears);

// customer Complains ###############
router.post("/customerComplaints", HelperController.addcustomerComplaint);
router.get("/customerComplaints", HelperController.getCustomerComplaint);
router.get(
  "/customerComplaintsById",
  HelperController.getCustomerComplaintById
);
router.put("/customerComplaints", HelperController.updateCustomerComplaint);

// bank details ###############SocialMediaLink done
router.post("/lmpBankDetail", HelperController.addLmpBankDetails);
router.get("/lmpBankDetails", HelperController.getLmpBankDetails);
router.get("/lmpBankDetail", HelperController.getLmpBankDetailsById);
router.put("/lmpBankDetail", HelperController.updateLmpBankDetails);

// Social Media Link #### done
router.post("/socialMediaLink", HelperController.addSocialMediaLink);
router.get("/SocialMediaLinks", HelperController.getSocialMediaLink);
router.get("/socialMediaLink", HelperController.getSocialMediaLinkById);
router.put("/socialMediaLink", HelperController.updateSocialMediaLink);

//News Letter ###################NewsLetter done
router.post("/newsLetter", HelperController.addNewsLetter);
router.get("/newsLetters", HelperController.getNewsLetter);
router.get("/newsLetter", HelperController.getNewsLetterById);
router.put("/newsLetter", HelperController.updateNewsLetter);

//Baner Image ###################NewsLetter
router.post("/bannerImage", upload.single("image"), HelperController.addBanerImage);
router.get("/banerImages", HelperController.getBanerImage);
router.get("/banerImage", HelperController.getBanerImageById);
router.put(
  "/banerImage",
  upload.single("image"),
  HelperController.updateBanerImage
);
//EmergencyDepartment################# done
router.post("/emergencyDepartment", HelperController.addEmergencyDepartment);
router.get("/emergencyDepartments", HelperController.getEmergencyDepartment);
router.get("/emergencyDepartment", HelperController.getEmergencyDepartmentById);
router.put("/emergencyDepartment", HelperController.updateEmergencyDepartment);

//LpmPartner ##################
router.post(
  "/lpmPartner",
  ourPartner.single("logo"),
  HelperController.addLpmPartner
);
router.get("/lpmPartners", HelperController.getLpmPartner);
router.get("/lpmPartner", HelperController.getLpmPartnerById);
router.put("/lpmPartner", HelperController.updateLpmPartner);

//CancelPolicy
router.get("/cancelPolicys", HelperController.getCancelPolicy);
router.get("/cancelPolicy", HelperController.getCancelPolicyById);
router.put("/cancelPolicy", HelperController.updateCancelPolicy);
router.post(
  "/cancelPolicy",
  verify_token,
  UploadCancelPolicyDocuments.single("file"),
  HelperController.addCancelPolicy
);

//CanceledPolicies ##################
router.get(
  "/getAllCancelledPolicies",
  verify_token,
  PlanController.getAllCancelledPolicy
);

//FormStepsMaster ##################
router.get("/getFormStepsList", helperControllers.getFormSteps);
router.post(
  "/addFormSteps",
  formLogos.single("file"),
  helperControllers.addFormSteps
);
router.get("/getFormSingle/:id", helperControllers.getSingleStep);
router.post("/updateStepStatus", helperControllers.updateStepStatus);
router.post(
  "/updateStepDetails/:id",
  formLogos.single("file"),
  helperControllers.updateFormSteps
);

// AM rating ###############SocialMediaLink done
router.post("/amRating", HelperController.addAmRating);
router.get("/getAllamRatings", HelperController.getAmRatings);
router.get("/getsingleAmRating/:id", HelperController.getAmRatingBYId);
router.put("/UpdatAMRating", HelperController.updateAmRating);
router.post("/updateRatingStatus", helperControllers.updateRatingsStatus);

// SP Rating ###############SocialMediaLink done
router.post("/addspRating", HelperController.addSPrating);
router.get("/getAllspRatings", HelperController.getSPratings);
router.get("/getSingleSpRating/:id", HelperController.getSPratingById);
router.put("/UpdateSpRating", HelperController.updateSPrating);
router.post("/updatespRatingStatus", helperControllers.updateSPRatingsStatus);

// Business Entity Links  ###############SocialMediaLink done
router.post(
  "/businessEntityLink",
  verify_token,
  HelperController.addBusinessEntityLink
);
router.post(
  "/businessEntityLinks",
  verify_token,
  HelperController.getBusinessEntityLinks
);
router.get("/businessEntityLink", HelperController.getBusinessEntityLinkById);
router.put("/businessEntityLink", HelperController.updateBusinessEntityLink);

router.get(
  "/documentSubmitLoginCustomer",
  customerController.document_submit_login_customer
);
router.post("/addRenewalLead", PlanController.addRenewalLead);
router.post("/getallleads", LeadController.get_all_leads)
// Chats
router.post("/savemessage", chatController.savemessage);
router.post("/updateMessages", chatController.AddReadAndWrite);
router.post("/allunreadmessages", chatController.ListOfAllUnreadMessages);
router.post("/getrooms", chatController.addRoomToAdminChat);
router.get("/getallmessages", chatController.getallmessages);
router.get("/getchatuserprofile", chatController.getchatuserprofile);
router.get("/getallchatusers", chatController.getallchatusers);
router.post("/CreateFirebaseToken", chatController.CreateFirebaseToken);
router.post("/CreateWsUser", chatController.CreateWsUser);
router.post("/updatechatprofile", chatController.UpdateProfile);
router.post("/AddUserToChatAdmin", chatController.AddUserToChatAdmin);
router.get("/verifychatemail", chatController.VerifyChatEmail);
router.post("/addRenewalLead", PlanController.addRenewalLead);
router.get("/getActiveBusinessType", MasterController.getActiveBusinessType);
router.post(
  "/createLeadByCustumerLink",
  verify_token,
  PlanController.createLeadByCustumerLink
);
router.get(
  "/getUsertypeDetailsByid",
  verify_token,
  AdminController.getUsertypeDetailsByid
);
router.get("/getActiveBusinessType", MasterController.getActiveBusinessType)
router.post("/getsuperadmingraphcount", LeadController.getsuperadmingraphcount);

router.get("/getCustomerDetails", customerController.getSingleCustomer);
router.delete("/deleteMotorMaster", MasterController.deleteMotorMaster);
router.delete("/deleteMasterData", MasterController.deleteMasterData);
router.delete("/deleteTravelMaster", MasterController.deleteTravelMaster);
router.delete("/deleteHomeMaster", MasterController.deleteHomeMaster);
router.delete("/deleteYachtMaster", MasterController.deleteYachtMaster);
router.delete("/deleteMedicalMaster", MasterController.deleteMedicalMaster);
router.get("/getYachtExperience", MasterController.getActiveYachtExperience);
router.get("/getYachtExperiencebyid", MasterController.getYachtExperiencebyId);
router.put("/UpdateYachtExperience", MasterController.UpdateYachtExperience);
router.post("/addYachtQuestion", MasterController.AddYachtQuestion);
router.get("/getAllYachtQuestions", MasterController.getAllYachtQuestions);
router.get("/getYachtQuestionbyid", MasterController.getYachtQuestionbyId);
router.put("/UpdateYachtQuestion", MasterController.UpdateYachtQuestion);
router.get("/getYachtExpQuestion", MasterController.getYachtExpQuestion);


// business entity Comision ###############SocialMediaLink done
router.post("/addBusinessEntityComission", HelperController.addBusinessEntityComission);
router.get("/getAllBusinessEntityComissions", HelperController.getBusinessEntityComissions);
router.get("/getSingleBusinessEntityComission", HelperController.getBusinessEntityComissionById);
router.put("/UpdateBusinessEntityComission", HelperController.updateBusinessEntityComission);
router.post("/UpdateBusinessEntityComissionStatus", HelperController.update_business_entity_commission_status);

// business entity Discount
router.post("/addBusinessEntityDiscount", HelperController.addBusinessEntityDiscount);
router.get("/getAllBusinessEntityDiscounts", HelperController.getBusinessEntityDiscount);
router.get("/getSingleBusinessEntityDiscount", HelperController.getBusinessEntityDiscountById);
router.put("/UpdateBusinessEntityDiscount", HelperController.updateBusinessEntityDiscount);
router.post("/UpdateBusinessEntityDiscountStatus", HelperController.update_business_entity_Discount_status);
//vat
router.post("/add_vat", MasterController.add_vat);
router.get("/get_vat", verify_token, MasterController.get_vat);
router.post("/update_vat_status", MasterController.update_vat_status);
router.post("/get_vat_detailsbyid", MasterController.get_vat_detailsbyid);
router.post("/update_vat_details", MasterController.update_vat_details);
router.post('/getblacklistedvehicle', MasterController.getBlacklistVehicalData)
router.post('/addBlacklistedvehicleData', MasterController.addBlacklistedvehicleData)

router.post('/addCompanyBlackList', MasterController.addCompanyBlackList)
router.post('/addKatarMakeData', Multer.single('file'), MasterController.addKatarMakeData)
router.post('/addKatarMotorModelsData', Multer.single('file'), MasterController.addKatarMotorModelsData)
router.post('/quotesStanderedCovered', PlanController.quotesStanderedCovered)
router.post('/addThiredPartyComission', MasterController.addThiredPartyComission)
router.post('/addKatarMotorYearData', MasterController.addKatarMotorYearData)
router.get('/getYearData', verify_token, MasterController.getYearData)

router.post("/getallagentlist", MasterController.getallagentslist)
router.post("/addDiscountcoupon", helperControllers.addDiscountcoupon)
router.get("/getdiscountcoupons", helperControllers.getdiscountcoupons)
router.get("/getdiscountcoupon", helperControllers.getdiscountcouponById)
router.post("/updateDiscountcouponstatus", helperControllers.updateDiscountcouponstatus)
router.post("/updatediscountcoupon", helperControllers.updateDiscountcoupon)
router.delete("/deleteDiscountcoupon", helperControllers.deleteDiscountcoupon)
router.get("/getTravelCoverTpe", MasterController.getTravelCoverTpe)

// yacht year Code 

router.post("/addYatchYear", helperControllers.addYatchYear)
router.put("/updateYatchYear", helperControllers.updateYatchYear)
router.get("/getYatchYear", helperControllers.getYatchYear)
router.get("/getYatchYearById", helperControllers.getYatchYearById)

// yacht make
router.get("/getYachtMake", verify_token, MasterController.get_Yacht_Make);
router.post("/UpdateYachtMakeStatus", MasterController.update_Yacht_Make_status);
router.post("/AddYachtMake", UploadYachtMakeLogo.single("file"), MasterController.add_yacht_make);
router.get("/getYachtMake_details", MasterController.get_yacht_details_by_id);
router.post("/updateYachtMake", UploadYachtMakeLogo.single("file"), MasterController.update_Yacht_Make);
//yacht model
router.post("/add_Yacht_model", MasterController.add_Yacht_model);
router.post("/get_all_Yacht_Model", verify_token, MasterController.get_all_Yacht_Model);
router.post("/get_Yacht_model_detailsbyid", MasterController.get_Yacht_model_detailsbyid);
router.post("/update_Yacht_model_details", MasterController.update_Yacht_model_details);
router.post("/update_yatch_model_details_status", MasterController.update_yatch_model_details_status);

//yacht engine
router.get("/getYachtEngine", verify_token, MasterController.get_Yacht_Engine);
router.post("/UpdateYachtEngineStatus", MasterController.update_Yacht_Engine_status);
router.post("/AddYachtEngine", UploadYachtEngineLogo.single("file"), MasterController.add_yacht_Engine);
router.get("/getYachtEngine_details", MasterController.get_yacht_engine_details_by_id);
router.post("/updateYachtEngine", UploadYachtEngineLogo.single("file"), MasterController.update_Yacht_Engine);
router.get("/getActiveYachtEngine", MasterController.getActiveYachtEngine);

// general writting condition #### 
router.post("/generalWrittingCondition", MasterController.addGeneralWrittingCondition);
router.get("/generalWrittingCondition", MasterController.getGeneralWrittingCondition);
router.get("/generalWrittingConditions", MasterController.getGeneralWrittingConditions);
router.put("/generalWrittingCondition", MasterController.updateGeneralWrittingCondition);
router.get("/activeGeneralWrittingConditions", MasterController.activeGeneralWrittingConditions);


// home additional  condition #### 
router.post("/homeAdditionalCondition", MasterController.addHomeAdditionalCondition);
router.get("/homeAdditionalCondition", MasterController.getHomeAdditionalCondition);
router.get("/homeAdditionalConditions", MasterController.getHomeAdditionalConditions);
router.put("/homeAdditionalCondition", MasterController.updateHomeAdditionalCondition);
router.post("/getMatchHomeAdditionalCondition", MasterController.getMatchHomeAdditionalCondition)

// Medical Co-payments Type  #### 
router.post("/MedicalCopaymentType", MasterController.addMedicalCopaymentType);
router.get("/MedicalCopaymentType", MasterController.getMedicalCopaymentType);
router.get("/MedicalCopaymentTypes", MasterController.getMedicalCopaymentTypes);
router.put("/MedicalCopaymentType", MasterController.updateMedicalCopaymentType);

router.post("/getYachtDetails", PlanController.getYachtDetails)
// Medical Declaration  #### 
router.post("/medicalDeclaration", MasterController.addMedicalDeclaration);
router.put("/medicalDeclaration", MasterController.updateMedicalDeclaration);
router.get("/medicalDeclarations", MasterController.getMedicalDeclarations);
router.get("/medicalDeclaration", MasterController.getMedicalDeclaration);
router.get("/getActiveMedicalDeclaration", MasterController.getActiveMedicalDeclaration);


// Medical TPA  #### getMedicalTPAs
router.post("/medicalTPA", UploadTPAfiles.single('file'), helperControllers.addMedicalTPA);
router.put("/medicalTPA", UploadTPAfiles.single('file'), helperControllers.updateMedicalTPA);
router.get("/medicalTPABYId", helperControllers.getMedicalTPAById);
router.get("/medicalTPA", helperControllers.getMedicalTPAs);
router.get("/activeMedicalTPA", helperControllers.getActiveMedicalTPAs);

// Medical Network  #### getMedicalTPAs
router.post("/medicalNetwork", helperControllers.addMedicalNetwork);
router.put("/medicalNetwork", helperControllers.updateMedicalNetwork);
router.get("/medicalNetworkBYId", helperControllers.getMedicalNetworkById);
router.get("/medicalNetwork", helperControllers.getMedicalNetworks);
router.get("/activeMedicalNetwork", helperControllers.getActiveMedicalNetworks);
router.get("/getTpaLinkNetwork", helperControllers.getTpaLinkNetwork);


// Medical Network list #### getMedicalTPAs
router.post("/medicalNetworkList", helperControllers.addMedicalNetworkList);
router.put("/medicalNetworkList", helperControllers.updateMedicalNetworkList);
router.get("/medicalNetworkListBYId", helperControllers.getMedicalNetworkListById);
router.get("/medicalNetworkList", helperControllers.getMedicalNetworkLists);
router.get("/activeMedicalNetworkList", helperControllers.getActiveMedicalNetworkLists);
router.post("/read_medical_network_list_excel", Multer.single("file"), helperControllers.read_medical_network_list_excel
);

router.post("/getYachtDetails", PlanController.getYachtDetails)
router.get(
  "/getActiveYachtCondition",
  MasterController.getActiveYachtCondition
);

router.post("/add_Maternity_conditionarr", PlanController.add_Maternity_conditionarr);
router.post("/getDiscountCoupon", PlanController.getDiscountCoupon);

router.post("/add_general_underwriting_conditions", PlanController.add_general_underwriting_conditions);

// Best Plan
router.post("/addBestPlan", HelperController.add_Best_Plan);
router.get("/getAllBestPlans", HelperController.getAll_best_plans);
router.get("/getbestplanbyid", HelperController.getBest_plan_by_id);
router.post("/updateBestPlan", HelperController.Update_Best_plan);
router.post("/updateBestPlanStatus", HelperController.Update_Best_Plan_status);
router.post("/getTravelNewLeadDetails", LeadController.getTravelNewLeadDetails);
router.get("/getHomeNewLeadDetails", LeadController.getHomeNewLeadDetails);
router.get("/getYatchNewLeadDetails", LeadController.getYatchNewLeadDetails);
router.get("/getMedicalNewLeadDetails", LeadController.getMedicalNewLeadDetails);

router.post("/addBlacklistYatch", helperControllers.addBlacklistYatch);
router.get("/getBlacklistYatch", helperControllers.getBlacklistYatch);
router.post("/add_black_listed_Yacht", helperControllers.add_black_listed_Yacht);
router.get("/getOrtherLobLeaddetails", helperControllers.getOrtherLobLeaddetails);


router.post("/updateLeadById", PlanController.updateLeadById);

router.post("/updateTravelFamilydocuments", uploaddocuments.single("file"), LeadController.updateTravelFamilydocuments);

router.post("/update_document_status/:id/:status", MasterController.update_document_status);
router.post(
  "/read_medical_network_excel",
  Multer.single("file"),
  MasterController.read_medical_network_excel
);
router.post("/addPreferredDays", MasterController.add_preferred_Days);
router.get("/getPreferredDays", MasterController.get_preferred_Days);
router.put("/updatePreferredDay", MasterController.update_preferred_Days);
router.get("/getPreferredDaysById", MasterController.get_preferred_Days_byId);
router.get("/getOrtherLobLeaddetails", helperControllers.getOrtherLobLeaddetails);
// boat breadth #### getMedicalTPAs
router.post("/boaBreadth", helperControllers.addBoaBreadth);
router.put("/boaBreadth", helperControllers.updateBoaBreadth);
router.get("/boaBreadthBYId", helperControllers.getBoaBreadthById);
router.get("/boaBreadth", helperControllers.getBoaBreadths);
router.get("/activeboaBreadth", helperControllers.getActiveboaBreadths);

// medical level #### getMedicalTPAs
router.post("/medicalLevel", helperControllers.addMedicalLevel);
router.put("/medicalLevel", helperControllers.updatemedicalLevel);
router.get("/medicalLevelBYId", helperControllers.getMedicalLevelById);
router.get("/medicalLevel", helperControllers.getMedicalLevels);
router.get("/activemedicalLevel", helperControllers.getActiveMedicalLevels);
router.put("/updateMedicalQoutesPageStatus", helperControllers.updateMedicalQoutesPageStatus);
router.get("/getMedicalQoutesPageStatus", helperControllers.getMedicalQoutesPageStatus);



router.post("/read_TPA_excel", Multer.single("file"), helperControllers.read_medical_TPA_excel);

//group medical plan
router.post("/addgroupmedicalplan", PlanController.AddGroup_Medical_Plan);
router.get("/getgroupmedicalplan", PlanController.getGroupMedicalPlans);
router.put("/updatestatusGroupMedicalPlan/:id/:status", PlanController.updatestatusGroupMedicalPlan);
router.get("/group_medical_plan_by_id", PlanController.single_group_medical_plan_details);
router.put("/update_group_medical_plan", helperControllers.update_group_medical_plan);
router.get("/UpdateGroupMedicalMember", helperControllers.UpdateGroupMedicalMember);

//group medical new members
router.post("/addgroupmedicalnewmembers", verify_token, RequestMemberFiles.single('file'), helperControllers.addMemberRequest);
router.get("/getgroupmedicalMemberRequets", verify_token, helperControllers.GetMemberRequests);

// Group Medical leads

router.post("/addBulkGroupMedicalLeadsByHr", verify_token, Multer.single('file'), LeadController.addBulkGroupMedicalLeadsByHr);
router.post("/addBulkGroupMedicalLeadsByAdmin", verify_token, Multer.single('file'), LeadController.addBulkGroupMedicalLeadsByAdmin);

router.get("/getHrUserLeads", verify_token, LeadController.getHrUserLeads);
router.get("/getAdminHrUserLeads", verify_token, LeadController.getAdminHrUserLeads);
router.put("/deleteGroupMedicalLeads", verify_token, LeadController.deleteGroupMedicalLeads);
router.post("/createUsersBYHr", verify_token, LeadController.createUsersBYHr);
router.get("/getGroupMedicalLeadsById", LeadController.getGroupMedicalLeadsById);
router.get("/updateGroupMedicalLead", LeadController.updateGroupMedicalLead);
router.get("/GetSingleMemberRequest", helperControllers.getMemberById);
router.put("/UpdateGroupMedicalMember", helperControllers.UpdateGroupMedicalMember);
router.delete("/deleteGroupMedicalMaster", helperControllers.deleteMedicalPlanMasters);
router.post("/addManuallyGroupMedicalMember", verify_token, helperControllers.addManuallyGroupMedicalMember);
router.post("/addManuallyGroupMedicalMemberBYAdmin", verify_token, helperControllers.addManuallyGroupMedicalMemberBYAdmin);
router.get("/getHrNewlyAddedMember", verify_token, helperControllers.getHrNewlyAddedMember);

router.get("/getGroupMedicalPolicy", verify_token, helperControllers.getGroupMedicalPolicy);
router.delete("/deleteSingleLeadBYId", helperControllers.deleteSingleLeadBYId);
router.post("/tranceferGroupMedicalLaed", helperControllers.tranceferGroupMedicalLaed);

router.put("/approvedGroupMedicalMember", verify_token, helperControllers.approvedGroupMedicalMember);
router.get("/getActiveMedicalGroupPlan", helperControllers.getActiveMedicalGroupPlan);

router.post("/add_Group_Medical_Plan_rates", helperControllers.add_Group_Medical_Plan_rates);
router.get("/get_group_medical_rates", helperControllers.get_group_medical_rates);
router.put("/update_group_medicalplan_rates", helperControllers.update_group_medicalplan_rates);
router.get("/get_group_med_single_rate", helperControllers.get_group_med_single_rate);
router.post("/get_rates_based_on_age", PlanController.get_rates_based_on_age);
router.post("/update_group_medical_planRates_status/:id", helperControllers.update_medicalplan_rates_status)
router.post(
  "/updateGroupMedicalDoccument",
  uploaddocuments.single("file"),
  LeadController.updateGroupMedicalDoccument
);
router.put("/updateGroupMedicalStatus", helperControllers.UpdateMemberRequestatus);
router.get("/getRatesOfPlan", helperControllers.getRatesOfPlan);
router.get("/getNetworksOfPlanratebyTPA", helperControllers.getNetworksOfPlanratebyTPA);
router.get("/groupMedicalHrLeadToExcel", helperControllers.groupMedicalHrLeadToExcel);
// Group Medical Categories
router.post("/addGroupmedicalCategory", helperControllers.addGroupmedicalCategory);
router.get("/getGroupMedicalCategories", helperControllers.getGroupMedicalCategories);
router.get("/getGroupMedicalCategoryById", helperControllers.getGroupMedicalCategoryById);
router.put("/updateGroupMedicalCategory", helperControllers.updategroupmedicalCategory);
router.get("/getGroupMedicalCategory", helperControllers.getGroupMedicalcategory)

// Group medical Cliam Type
router.post("/addgroupmedicalClaimType", helperControllers.AddGroupMedicalClaimType);
router.get("/getGroupMedicalClaimType", helperControllers.getGroupMedicalClaimType);
router.get("/getGroupMedicalClaimTypeById", helperControllers.getGroupMedicalClaimTypeById);
router.put("/updateGroupMedicalClaimType", helperControllers.UpdateGroupMedicalCalimType);
router.get("/getActiveGroupMedicalClaimType", helperControllers.getActiveGroupMedicalClaimType);

//Group Medical Claim Status
router.post("/addgroupmedicalClaimStatus", helperControllers.AddGroupMedicalClaimStatus);
router.get("/getGroupMedicalClaimStatus", helperControllers.GetGroupMedicalClaimStatus);
router.get("/getGroupMedicalClaimStatusById", helperControllers.getClaimStatusbyId);
router.put("/updateGroupMedicalClaimStatus", helperControllers.updateClaimSatus);
router.post("/addGroupMedicalClaim", verify_token, helperControllers.addGroupMedicalClaim);
router.get("/getClaimgroupmedicalMemberRequets", verify_token, helperControllers.getClaimgroupmedicalMemberRequets);
router.get("/getAdminHrUserCliams", verify_token, helperControllers.getAdminHrUserCliams);
router.get("/getAllPrincepleOfHr", verify_token, helperControllers.getAllPrincepleOfHr);
router.get("/getAllmemberOfHr", verify_token, helperControllers.getAllmemberOfHr);
router.get("/getRelationOfUser", helperControllers.getRelationOfUser);
router.get("/getClaimUserInAdmin", helperControllers.getClaimuserInAdmin);
router.get("/getClaimStatusSummary", verify_token, helperControllers.getClaimStatusSummary);
router.get("/getPrincipleByEmpolyeeNymber", helperControllers.getPrincipleByEmpolyeeNymber)
router.get("/getMemberDetailsById", helperControllers.getMemberDetailsById)
router.get("/tatOnSettlement", verify_token, helperControllers.tatOnSettlement)
router.get("/getClaimGroupMedicalPlan", verify_token, LeadController.getClaimGroupMedicalPlan)


router.get("/getActiveClaimStatus", helperControllers.getActiveClaimStatus);

// Producer Dashboard
router.post(
  "/createProducerLeads",
  verify_token,
  helperControllers.createProducerLeads
);


//Group Medical Claim Descriptions
router.post("/addgroupmedicalClaimDescription", helperControllers.AddGroupMedicalClaimDescription);
router.get("/getGroupMedicalClaimDescription", helperControllers.getGroupMedicalClaimDescriptioins);
router.get("/getGroupMedicalClaimDescriptionById", helperControllers.getClaimDescriptionById);
router.put("/updateGroupMedicalClaimDescription", helperControllers.UpdateGroupMedicalClaimDescription);
router.post("/getProducerTopLeagentCount", verify_token, LeadController.getProducerTopLeagentCount);


// Producer Discount
router.post("/addProducerDiscount", MasterController.AddProducerDiscount);
router.get("/getProducerDiscount", MasterController.getProducerDiscount);
router.get("/getProducerDiscountById", MasterController.getProducerDiscountbyId);
router.put("/updateProducerDiscount", MasterController.updateProducerDiscount);

// Claim Procedure
router.post("/addClaimProcedure", helperControllers.AddClaimProcedure);
router.get("/getClaimProcedure", helperControllers.getClaimProcedure);
router.get("/getClaimProcedureById", helperControllers.getClaimProcedureById);
router.post("/updateClaimProcedure", helperControllers.updateClaimProcedure);
router.get("/getActiveClaimProcedure", helperControllers.getActiveClaimProcedure);


// Usefull Links
router.post("/addUsefullLink", UsefulLinks.single('file'), helperControllers.addUsefulLink);
router.get("/getUsefullLinks", helperControllers.getUsefulLink);
router.get("/getUsefullLinkById", helperControllers.getUsefulLinkbyId);
router.put("/updateUsefullLink", UsefulLinks.single('file'), helperControllers.UpdateUsefulLink);
router.get("/getClaimFromHr", verify_token, helperControllers.getClaimFromHr);
router.get("/getClaimStatusFromHr", verify_token, helperControllers.getClaimStatusFromHr);

// Orther Service
router.get("/getOrtherServiceFromHr", verify_token, helperControllers.getOrtherServiceFromHr);
router.get("/getActiveUseFullLink", helperControllers.getActiveUseFullLink);

router.get("/getmostCommonOversights", helperControllers.getmostCommonOversights);

// router.post("/getProducerTopLeagentCount", verify_token,LeadController.getProducerTopLeagentCount);
router.put("/updateGroupMedicalClaim", helperControllers.UpdateGroupMedicalClaim)
router.get("/getGroupMedicalClaimById", helperControllers.getGroupMedicalClaimById)
router.put("/updateGroupMedicalClaimByHr", helperControllers.updateGroupMedicalClaimByHr)
router.post("/createGroupMedicalHR", verify_token, helperControllers.createGroupMedicalHR)
router.get('/GetPlanAndCompanyName', MasterController.GetPlanAndCompanyName)
router.get("/getGroupMedicalDocuments", MasterController.GetGroupMedicalDocuments)


router.get("/getGroupMedicalPlanName", verify_token, helperControllers.getGroupMedicalPlanName)
router.get("/getInsuranceCompany", verify_token, helperControllers.getInsuranceCompany)
router.get("/getTpalist", verify_token, helperControllers.getTpalist)
router.get("/getNetworklist", verify_token, helperControllers.getNetworklist)
router.post("/uploadGroupMedicalPlanDocs", groupMedicalplanDocuments.array('file'), MasterController.Update_All_GroupMedical_documents)
router.get("/getNetworklist", verify_token, helperControllers.getNetworklist)
router.post("/createtatdays", helperControllers.createtatdays)
router.get("/getTatDays", helperControllers.getTatDays)
router.get("/getTatDaysById", helperControllers.getTatDaysById)
router.put("/updateTatDays", helperControllers.updateTatDays)

//Marital Status
router.post("/addMaritalStatus", MasterController.AddMaritalStatus)
router.get("/getMaritalStatus", MasterController.GetMaritalStatus)
router.get("/getMaritalStatusbyid", MasterController.getMaritalStatusbyId)
router.put("/updateMaritalStatus", MasterController.updateMaritalStatus)

//Gender
router.post("/addGender", MasterController.AddGender)
router.get("/getGender", MasterController.GetGender)
router.get("/getGenderbyid", MasterController.getGenderbyId)
router.put("/updateGender", MasterController.updateGender)

// Relation
router.post("/addRelation", MasterController.AddRelation)
router.get("/getRelation", MasterController.GetRelation)
router.get("/getRelationbyid", MasterController.getRelationbyId)
router.put("/updateRelation", MasterController.updateRelation)

// // ResidentialLocation
// router.post("/addResidentialLocation", MasterController.addResidentialLocation)
// router.get("/getResidentialLocation", MasterController.GetResidentialLocation)
// router.get("/getResidentialLocationbyid", MasterController.getResidentialLocationbyId)
// router.put("/updateResidentialLocation", MasterController.updateResidentialLocation)
router.put("/updateTatDays", helperControllers.updateTatDays)
router.put("/updatetatdaysstatus", helperControllers.updatetatdaysstatus)
router.delete("/deleteTatDays", helperControllers.deleteTatDays)

router.post("/addSponsorType", MasterController.addSponsorType);
router.get("/getsponsortype", MasterController.getsponsortype);
router.get("/getSponsortypeId", MasterController.getSponsortypeId);
router.put("/updatesponsortype", MasterController.updatesponsortype);
router.put("/updatesponsortypestatus", MasterController.updatesponsortypestatus);
router.delete("/deletesponsortype", MasterController.deletesponsortype);

router.post("/addWorkLocation", MasterController.addWorkLocation);
router.get("/getWorkLocation", MasterController.getWorkLocation);
router.get("/getWorkLocationId", MasterController.getWorkLocationId);
router.put("/updateWorkLocation", MasterController.updateWorkLocation);
router.put("/updateWorkLocationstatus", MasterController.updateWorkLocationstatus);
router.delete("/deleteWorkLocation", MasterController.deleteWorkLocation);

//Business Entity Topup
router.post("/addBusinessEntityTopup", MasterController.addBusinessEntityTopup);
router.get("/getAllBusinessEntityTopups", MasterController.getBusinessEntityTopup);
router.get("/getSingleBusinessEntityTopup", MasterController.getBusinessEntityTopupById);
router.put("/UpdateBusinessEntityTopup", MasterController.updateBusinessEntityTopup);
router.post("/UpdateBusinessEntityTopupStatus", MasterController.update_business_entity_Topup_status);

//Actual Salary Band
router.post("/add_actualSalaryBand", helperControllers.add_group_medical_salary_band);
router.get("/get_actualSalaryBand", verify_token, helperControllers.get_actual_salary_band);
router.post("/get_actualSalaryBand_detailsbyid", helperControllers.get_actual_salary_band_detailsbyid);
router.post("/update_actualSalaryBand_status", helperControllers.update_actual_salary_band_status);
router.post("/update_actualSalaryBand_details", helperControllers.update_actual_salary_band_details);
router.get("/getMedicalSalaryRange", helperControllers.getMedicalSalaryRange);

// insurance company dashboard insurancePrimiumByBodyType insurancePrimiumByHomePlaneType getMotorBestEate
router.post("/getInsurancePrimiumEarnedByLob", verify_token, helperControllers.getInsurancePrimiumEarnedByLob);
router.post("/insurancePrimiumByBodyType", verify_token, helperControllers.insurancePrimiumByBodyType);
router.post("/insurancePrimiumByHomePlaneType", verify_token, helperControllers.insurancePrimiumByHomePlaneType);
router.post("/getInsurancePrimiumEarnedByYachtBodyType", verify_token, helperControllers.getInsurancePrimiumEarnedByYachtBodyType);
router.post("/getInsurancePrimiumEarnedByTravelCoverType", verify_token, helperControllers.getInsurancePrimiumEarnedByTravelCoverType);
router.post("/getInsurancePrimiumEarnedByIndiviualLob", verify_token, helperControllers.getInsurancePrimiumEarnedByIndiviualLob);

router.post("/getMotorBestRate", verify_token, helperControllers.getMotorBestEate);
router.post("/getHomeBestRate", verify_token, helperControllers.getHomeBestEate);
router.post("/getTravelBestrate", verify_token, helperControllers.getTravelBestEate);
router.post("/getYachtBestrate", verify_token, helperControllers.getYachtBestEate);
router.post("/getIndivialMedicalBestRate", verify_token, helperControllers.getIndivialMedicalBestRate);

router.post("/getMotorProjectBusiness", verify_token, helperControllers.getMotorProjectBusiness);
router.post("/getTravelProjectBusiness", verify_token, helperControllers.getTravelProjectBusiness);
router.post("/getHomeProjectBusiness", verify_token, helperControllers.getHomeProjectBusiness);
router.post("/getYachtProjectBusiness", verify_token, helperControllers.getYachtProjectBusiness)
router.post("/getMedicalProjectBusiness", verify_token, helperControllers.getMedicalProjectBusiness)

//
router.post("/getTravelHypothitcalBusiness", verify_token, helperControllers.getTravelHypothitcalBusiness);
router.post("/getMotorHypothitcalBusiness", verify_token, helperControllers.getMotorHypothitcalBusiness);
router.post("/getHomeHypothitcalBusiness", verify_token, helperControllers.getHomeHypothitcalBusiness);
router.post("/getYachtHypothitcalBusiness", verify_token, helperControllers.getYachtHypothitcalBusiness);
router.post("/getMedicalHypothitcalBusiness", verify_token, helperControllers.getMedicalHypothitcalBusiness);


// request for user creation
router.post('/requestForUserCreate', AdminController.request_for_user_creation);
router.get('/getRequestForUserCreate', AdminController.get_request_for_user_creation);
router.put('/editRequestForUserCreate/:id', AdminController.edit_request_for_user_creation);
router.delete('/deleteRequestForUserCreate/:id', AdminController.delete_request_for_user_creation);
router.get('/getRequestForUserCreatebyid/:id', AdminController.getRequestForUserCreatebyid);


// dashboard business & operation
router.post('/businessDashboard', verify_token, LeadController.businessDashboard)
//claim status update 
router.put('/UpdateClaimStatus', emailAttatchment.fields([{ name: 'files', maxCount: 10 }]),
  verify_token, customerController.UpdateClaimStatus)
router.put('/UpdateComplaintStatus', emailAttatchment.fields([{ name: 'files', maxCount: 10 }]),
  verify_token, customerController.UpdateComplaintStatus)
router.put('/UpdateQueryStatus', emailAttatchment.fields([{ name: 'files', maxCount: 10 }]),
  verify_token, customerController.UpdateQueryStatus)


// email template crud
router.post('/addEmailTemplate', verify_token, EmailController.add_email_template)
router.get('/getEmailTemplates', EmailController.view_all_email_templates)
router.get('/getSpecificEmailTemplates', EmailController.view_type_specific_email_template)
router.get('/getEmailTemplate/:id', verify_token, EmailController.view_email_template)
router.put('/updateEmailTemplate/:id', verify_token, EmailController.edit_email_template)
router.delete('/deleteEmailTemplate/:id', verify_token, EmailController.delete_email_template)

// email crud
router.get('/getEmails', EmailController.view_all_emails)
router.get('/getEmail/:id', EmailController.view_email)
router.get('/getUserEmail', EmailController.view_user_specific_email)

// email type crud
router.post('/addEmailType', verify_token, EmailController.add_email_type)
router.get('/getEmailTypes', EmailController.view_all_email_types)
router.get('/getEmailType/:id', EmailController.view_email_type)
router.put('/editEmailType/:id', verify_token, EmailController.edit_email_type)
router.delete('/deleteEmailType/:id', verify_token, EmailController.delete_email_type)

// motor tooltip
router.post("/addMotorTooltip", verify_token, TooltipController.add_motor_tooltip)
router.get("/getMotorToooltip", TooltipController.view_motor_tooltip)
router.put("/updateMotorTooltip", verify_token, TooltipController.edit_motor_tooltip)
router.delete("/delMotorTooltip", TooltipController.delete_motor_tooltip)

// yacht tooltip
router.post("/addYachtTooltip", verify_token, TooltipController.add_yacht_tooltip)
router.get("/getYachtToooltip", TooltipController.view_yacht_tooltip)
router.put("/updateYachtTooltip", verify_token, TooltipController.edit_yacht_tooltip)
router.delete("/delYachtTooltip", TooltipController.delete_yacht_tooltip)

// home tooltip
router.post("/addHomeTooltip", verify_token, TooltipController.add_home_tooltip)
router.get("/getHomeToooltip", TooltipController.view_home_tooltip)
router.put("/updateHomeTooltip", verify_token, TooltipController.edit_home_tooltip)
router.delete("/delHomeTooltip", TooltipController.delete_home_tooltip)

// travel tooltip
router.post("/addTravelTooltip", verify_token, TooltipController.add_travel_tooltip)
router.get("/getTravelToooltip", TooltipController.view_travel_tooltip)
router.put("/updateTravelTooltip", verify_token, TooltipController.edit_travel_tooltip)
router.delete("/delTravelTooltip", TooltipController.delete_travel_tooltip)

// individual tooltip
router.post("/addIndividualTooltip", verify_token, TooltipController.add_individual_tooltip)
router.get("/getIndividualToooltip", TooltipController.view_individual_tooltip)
router.put("/updateIndividualTooltip", verify_token, TooltipController.edit_individual_tooltip)
router.delete("/delIndividualTooltip", TooltipController.delete_individual_tooltip)

// other insurances tooltip
router.post("/addOtherInsurancesTooltip", verify_token, TooltipController.add_OtherInsurance_tooltip)
router.get("/getOtherInsurancesToooltip", TooltipController.view_OtherInsurances_tooltip)
router.put("/updateOtherInsurancesTooltip", verify_token, TooltipController.edit_OhterInsurances_tooltip)
router.post("/send_otp_email_admin", AdminController.send_otp_email_admin);

//cms
router.post("/add_mainpage", verify_token, mainpagecmsuploads, Cmscontroller.add_mainpage)
router.put("/edit_mainpage", verify_token, mainpagecmsuploads, Cmscontroller.edit_mainpage)
router.get("/get_mainpage", Cmscontroller.get_mainpage)

router.post("/addMotorContent", verify_token, Cmscontroller.addMotorContent)
router.put("/editMotorContent", verify_token, Cmscontroller.editMotorContent)
router.get("/getMotorContent", Cmscontroller.getMotorContent)

router.post("/addTravelContent", verify_token, Cmscontroller.addTravelContent)
router.put("/editTravelContent", verify_token, Cmscontroller.editTravelContent)
router.get("/getTravelContent", Cmscontroller.getTravelContent)

router.post("/addHomePageContent", verify_token, Cmscontroller.addHomePageContent)
router.put("/editHomePageContent", verify_token, Cmscontroller.editHomePageContent)
router.get("/getHomePageContent", Cmscontroller.getHomePageContent)

router.post("/addYachtContent", verify_token, Cmscontroller.addYachtContent)
router.put("/editYachtContent", verify_token, Cmscontroller.editYachtContent)
router.get("/getYachtContent", Cmscontroller.getYachtContent)

router.post("/addIndividualMedicalContent", verify_token, Cmscontroller.addIndividualMedicalContent)
router.put("/editIndividualMedicalContent", verify_token, Cmscontroller.editIndividualMedicalContent)
router.get("/getIndividualMedicalContent", Cmscontroller.getIndividualMedicalContent)

router.post("/addOtherInsuranceContent", verify_token, Cmscontroller.addOtherInsuranceContent)
router.put("/editOtherInsuranceContent", verify_token, Cmscontroller.editOtherInsuranceContent)
router.get("/getOtherInsuranceContent", Cmscontroller.getOtherInsuranceContent)

router.post("/addhelptipsContent", verify_token, Cmscontroller.addhelptipsContent)
router.put("/edithelptipsContent", verify_token, Cmscontroller.edithelptipsContent)
router.get("/gethelptipsContent", Cmscontroller.gethelptipsContent)
router.get("/gethelptipsContentById", Cmscontroller.gethelptipsContentById)
router.delete("/deletehelptipsContent", verify_token, Cmscontroller.deletehelptipsContent)

router.post("/addfaqContent", verify_token, Cmscontroller.addfaqContent)
router.put("/editfaqContent", verify_token, Cmscontroller.editfaqContent)
router.get("/getfaqContent", Cmscontroller.getfaqContent)
router.get("/getfaqContentById", Cmscontroller.getfaqContentById)
router.delete("/deletefaqContent", verify_token, Cmscontroller.deletefaqContent)

//LOBs best quotes
router.get('/getMotorBestQuotes', helperControllers.getMotorBestQuotes)
router.get('/getTravelBestQuotes', helperControllers.getTravelBestQuotes)
router.get('/getHomeBestQuotes', helperControllers.getHomeBestQuotes)
router.get('/getYachtBestQuotes', helperControllers.getYachtBestQuotes)
router.get('/getMedicalBestQuotes', helperControllers.getMedicalBestQuotes)

// mis report
router.get("/performanceBasedGraph", verify_token, MISController.performance_based_graph)
router.get("/closingRatio", verify_token, MISController.closing_ratio)
router.get("/siToAgent", verify_token, MISController.special_incentive_to_agent_based_on_deal_closing)
router.get("/siToCustomerWithSA", verify_token, MISController.special_incentive_to_customers_with_sa)
router.get("/siToCustomerWithoutSA", verify_token, MISController.special_incentive_to_customers_without_sa)
router.get("/mostActiveTimePeriod", verify_token, MISController.most_active_time_period)
router.get("/productiveDayOfTheWeek", verify_token, MISController.productive_day_of_the_week)
router.get("/marketVSdiscount", verify_token, MISController.marketResponseVSdiscountOffered)
router.get("/tatForPolicies", verify_token, MISController.tatForPolicies)
// router.get("/tatForIssuedPolicies", verify_token, MISController.tatForIssuedPolicies)
// router.get("/tatForTaskCompletion", verify_token, MISController.tatForTaskCompletion)
router.get("/autoVSmanual", verify_token, MISController.autoVSmanual)
router.get("/highestLowestRates", verify_token, MISController.highest_lowest_rates)
router.get("/averageRateDealt", verify_token, MISController.average_rate_dealt)

// special incentive 
router.post("/addSpecialIncentive", IncentiveController.add_special_incentive)
router.get("/getSpecialIncentives", IncentiveController.get_special_incentives)
router.get("/getSpecialIncentive/:id", IncentiveController.get_special_incentive)
router.put("/updateSpecialIncentive/:id", IncentiveController.update_special_incentive)
router.delete("/deleteSpecialIncentive/:id", IncentiveController.del_special_incentive)

// subusertype
router.get('/getSubUserTypes', AdminController.getSubUserTypes)
router.get('/getUserMultiRole', AdminController.getUserMultiRole)
router.put('/updateSubUserTypes', AdminController.updateSubUserTypes)

//motor - make ,model,variant
router.post("/get_Make_Model_and_Variant", verify_token, MasterController.get_Make_Model_and_Variant)
router.get("/getCompaniesPlans", verify_token, MasterController.getCompaniesPlans) //motor
router.get("/getyachtCompaniesplans", MasterController.getYachtCompaniesPlans)//Yacht
router.get("/getplansAccordingToCompanies", MasterController.getTravelHomeMedicalCompaniesPlans)//travel ,home,medical 

// yacht model details import/export
router.post(
  "/read_yacht_model_excel",
  Multer.single("file"),
  MasterController.read_yacht_model_details_excel
);
//show limited data for travel and home plan
router.get('/getPlanPriceAndTravelPlan', PlanController.getPlanPriceAndTravelPlan)
router.get('/getlimitedDataOfHomePlan', PlanController.getlimitedDataOfHomePlan)
router.get('/getlimitedDataOfMedicalPlan', PlanController.getlimitedDataOfMedicalPlan)
router.post("/read_yacht_model_excel", Multer.single("file"), MasterController.read_yacht_model_details_excel);

// get usertype list
router.get("/getUserAccordingUserTypeList", verify_token, LeadController.getUserAccordingUserTypeAll);

//show limited data for travel and home plan
router.get('/getPlanPriceAndTravelPlan', PlanController.getPlanPriceAndTravelPlan)
router.get('/getlimitedDataOfHomePlan', PlanController.getlimitedDataOfHomePlan)
router.get('/getlimitedDataOfMedicalPlan', PlanController.getlimitedDataOfMedicalPlan)
// pdf genearate 
router.post("/generatePdf", PdfController.generatePdf)
router.post("/PrintPdf", PdfController.PrintPdf)
router.get("/getpdf", PdfController.getpdf)

module.exports = router;
