const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const line_of_businesses = require("./Line_of_business")
const autopopulate  = require("mongoose-autopopulate")
const NewLeadSchema = new Schema({
  lead_id: { type: Number, unique: true },
  name: { type: String },
  email: { type: String },
  phoneno: { type: String },
  lead_status: { type: String, default: "New" },
  type_of_policy: { type: Schema.Types.ObjectId, ref: line_of_businesses},
  direct_payment: { type: String, default: "false" },
  forward_to: { type: Schema.Types.ObjectId, ref: "admins" },
  lead_location: {
    type: Schema.Types.ObjectId,
    ref: "locations",
    default: mongoose.Types.ObjectId("64116415591c2f02bcddf51e"),
  },
  assigned_agent: { type: Schema.Types.ObjectId, ref: "admins" },
  business_type: { type: String, default: "New" },
  recived_from: { type: Schema.Types.ObjectId, ref: "admins" },
  instant_policy: { type: Boolean, default: false },
  documents: { type: Array, default: [] },
  dcleadstatus: { type: String, default: "Open" },
  dcleadforwardto: { type: Schema.Types.ObjectId, ref: "admins" },
  dcrecived_from: { type: Schema.Types.ObjectId, ref: "admins" },
  dcleadreason: { type: String },
  final_price: { type: Number },
  finalPriceRefferd: { type: String },
  plan_company_id: { type: Schema.Types.ObjectId, ref: "companies" },
  plan_id: { type: Schema.Types.ObjectId },
  policy_issued_status: { type: Number, default: 0 },
  policy_issued_date: { type: Date },
  policy_expiry_date: { type: Date },
  policy_issued_by: { type: Schema.Types.ObjectId, ref: "admins" },
  new_lead_timestamp: { type: Date, default: Date.now },
  supervisor_id: { type: Schema.Types.ObjectId, ref: "admins" },
  supervisor_recieved_from: { type: Schema.Types.ObjectId, ref: "admins" },
  producerId: { type: Schema.Types.ObjectId, ref: "admins" },
  paymentStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed", "Cancelled"],
  },
  directPaymentByUser : { type : Boolean, default : false },
  cutomerId: {
    type: Schema.Types.ObjectId,
    ref: "customers",
  },
  finall_submit: {
    type: Boolean,
  },
  electric_car: {
    type: Boolean,
  },
  your_electric_car: {
    type: Boolean,
  },
  buying_used_car: {
    type: Boolean,
  },
  car_brand_new: {
    type: Boolean,
  },
  polcy_type: {
    type: String,
  },
  form_location: {
    type: String,
  },
  last_year_policy_type: {
    type: String,
  },
  model_year: {
    type: String,
  },
  car_maker: {
    type: String,
  },
  car_model: {
    type: String,
  },
  car_variant: {
    type: String,
  },
  register_area: {
    type: String,
  },
  registration_year: {
    type: Number,
  },
  vehicle_specification: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  drivingexp: {
    type: Object,
  },
  drivingexpinuae: {
    type: Object,
  },
  repaire_type_name: {
    type: String,
  },
  your_existing_policy_expired: {
    type: Boolean,
  },
  last_year_claim: {
    type: Number,
  },
  claims_certificate_from_issurer: {
    type: Number,
  },
  lead_id: {
    type: Number,
  },
  yacht_type_of_use: { type: String },
  travel_plan_type: {
    type: Schema.Types.ObjectId,
    ref: "travel_types",
  },
  no_of_travel: {
    type: Number,
  },
  travel_start_date: {
    type: Date,
  },
  travel_end_date: {
    type: Date,
  },
  travel_trip_type: {
    type: Schema.Types.ObjectId,
    ref: "travel_plan_types",
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "countries",
  },
  passport_no: {
    type: String,
  },
  travel_family_details: {
    type: Array,
  },
  travel_beneficiary_details: {
    type: Array,
  },
  travel_insurance_for: {
    type: Schema.Types.ObjectId,
    ref: "travel_insurance_fors",
  },
  customerid: {
    type: Schema.Types.ObjectId,
    ref: "customers",
  },
  new_lead_complete: {
    type: Boolean,
    default: false,
  },
  home_property_type: {
    type: Schema.Types.ObjectId,
    ref: "home_property_type_lists",
  },
  home_ownership_status: {
    type: Schema.Types.ObjectId,
    ref: "home_ownership_status_lists",
  },
  home_plan_type: {
    type: Schema.Types.ObjectId,
    ref: "home_plan_type_lists",
  },
  home_claim_years: {
    type: Number,
  },
  homeAddress: {
    type: Object,
  },
  home_condition: {
    type: Array,
  },
  content_value: {
    type: Number,
  },
  personal_belongings_value: {
    type: Number,
  },
  building_value: {
    type: Number,
  },
  domestic_value: {
    type: Number,
  },
  gender: {
    type: String,
  },
  salary: {
    type: Schema.Types.ObjectId,
    ref: "medical_salary_range_lists",
  },
  weight: {
    type: Number,
  },
  hight: {
    type: Number,
  },
  bank_name: {
    type: String,
  },
  boat_details: {
    type: Object,
  },
  boat_engine_details: {
    type: Object,
  },
  territoryCoverage: {
    type: Object,
  },
  sumInsured: {
    type: Object,
  },
  yatchClaimsExperience: {
    type: Number,
  },
  yatchInsurancePremium: {
    type: Boolean,
  },
  yatchSailingQualification: {
    type: Boolean,
  },
  yatchProfessinalEmplaoyed: {
    type: Boolean,
  },
  yatchClaimsExperience1: {
    type: Object,
  },
  age: {
    type: Number,
  },
  call_time: {
    type: String,
  },
  current_insurance_company_id: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  current_renewal: {
    type: Boolean,
  },
  call_date: {
    type: Schema.Types.ObjectId,
    ref: "preferred_days",
  },
  brief_information: {
    type: String,
  },
  other_insurance_name: {
    type: Schema.Types.ObjectId,
    ref: "other_insurances",
  },
  emirate_issuing_visa: {
    type: Schema.Types.ObjectId,
    ref: "medical_visa_countries_lists",
  },
  visa_type: {
    type: Schema.Types.ObjectId,
    ref: "medical_plan_condition_lists",
  },
  medical_symptopm: {
    type: Array,
  },
  medical_under_condition: {
    type: Array,
  },
  medical_maternity: {
    type: Array,
  },
  claimStatus: {
    type: Boolean,
    default: false,
  },
  camcelPolicyStatus: {
    type: Boolean,
    default: false,
  },
  adminFee: {
    type: Number,
  },
  producerComission:{type: Number, default:0},
  assign_salesadvisor_timestamp: { type: Date },
  assign_documentchaser_timestamp: { type: Date },
  assign_policyissuer_timestamp: { type: Date },
  assign_policyissued_timestamp: { type: Date },
  businessTypeId: { type: Schema.Types.ObjectId, ref: "business_types" },
  businessEntityId: { type: Schema.Types.ObjectId, ref: "admins" },
  filByBusinessEntityUser: { type: Boolean, default: false },
  filByBusinessEntityCustomer: { type: Boolean, default: false },
  buisnessEntityCostomerLink: { type: String },
  location: { type: Number },
  minCarValue: { type: Number },
  maxCarValue: { type: Number },
  jdvComission: { type: Number ,default:0},
  businessEntityComission: { type: Number ,default:0},
  businessEntityDiscount: { type: Number,default:0 },
  vatComission: { type: Number ,default:0},
  drivingDetails: { type: Object },
  essuingEmirate: { type: String },
  chassisNumber: { type: String },
  EnginNumber: { type: String },
  registrationNumberCode: { type: String },
  registrationNumber: { type: String },
  plateCategory: { type: String },
  firstRegistrationDaate: { type: Date },
  countryOfManufacturing: { type: String },
  vehicleColour: { type: String },
  emiratesIdNumber: { type: String },
  tradeLicenseNumber: { type: String },
  TRNNumber: { type: String },
  additionalCoverArr: { type: Array },
  yachtMakeId: { type: Schema.Types.ObjectId },
  yachtModelId: { type: Schema.Types.ObjectId },
  medical_general_condition: { type: Array },
  medical_additional_condition: { type: Array },
  date_of_first_registration: { type: String },
  current_uninsured: { type: String },
  TCFno: { type: String },
  third_party_last_year_claim: { type: String },
  selectedPrimium: { type: Number },
  additionalPrimium: { type: Number },
  excessAmount: { type: Number },
  discountAmount: { type: Number },
  discountId: { type: Schema.Types.ObjectId, ref: "couponcodes" },
  termsConditionStatus: { type: Boolean, default: false },
  additionalCover: { type: Array },
  covereddata: { type: Array },
  notCovereddata: { type: Array },
  add_desc_data: { type: Array },
  vat_pricecount: { type: Number },
  CarvarientName: { type: String },
  transactionType: { type: String },
  motorProfession: { type: String },
  YachtMaker: { type: Schema.Types.ObjectId },
  YachtVarient: { type: Schema.Types.ObjectId },
  medical_policy_active: { type: Boolean },
  medical_current_insurer: { type: Schema.Types.ObjectId },
  medical_current_insurer_expiry_date: { type: Date },
  yatchClaimsExperienceQuestions: {
    type: Array,
  },
  YachtOperaterExperienceQuestions: {
    type: Array,
  },
  buying_used_boat: {
    type: Boolean,
  },
  bot_current_renewal: {
    type: Boolean,
  },
  current_policy_status: {
    type: String,
  },
  bot_brand_new: {
    type: Boolean,
  },
  bot_current_insurance_company_id: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  medicalVisa: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalPassport: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalVatCertificate:{
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalTradeLicense: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalSponsorVisa: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalSponsorEid: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalSponsorPassport: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalEmiratesId: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  medicalEstablishmentCard: {
    number: { type: String },
    issueDate: { type: Date },
    expiryDate: { type: Date },
  },
  lastMenstrualPeriodDate: { type: Date },
  medicalQuestionrrPage:{type:Number},
  BECommission:{type:Number,defaultValue:0},
  travel_price_id:{type:Schema.Types.ObjectId},
  medical_price_id:{type:Schema.Types.ObjectId},
  planRate:{type:Number,},
  travelDaysRange:{type:String},
  homeRate:{type:Number},
  yatchRate:{type:Number},
  specialIncentive : [{ type : mongoose.Types.ObjectId, ref : "specialincentives" }],
});
NewLeadSchema.plugin(autopopulate )
module.exports = mongoose.model("New_Lead", NewLeadSchema);
