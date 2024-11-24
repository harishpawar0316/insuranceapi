const { default: mongoose } = require("mongoose");
const { customerComplaintModels } = require("../models/customerComplaints");
const lmpBankDetailsModels = require("../models/lpm_bank_details");
const socialMediaLinksModels = require("../models/socialMediaLink");
const newsLetterModels = require("../models/newsLetter");
const banerImageModels = require("../models/banerImage");
const moment = require('moment');

const emergencyDepartmentModels = require("../models/emergencyDepartments");
const ourPartnerModels = require("../models/lmp_partner");
const cancelPolicyModels = require("../models/CancelPolicy");
const New_Lead = require("../models/New_Lead");
const FormStepsMaster = require("../models/FormStepsMaster");
const AMratingmodels = require("../models/AM_rating");
const SPratingmodels = require("../models/S&P_rating");
const businessEntityModels = require("../models/businessEntityUser");
const businessEntityComissionModels = require("../models/businessEntityComission");
const businessEntityDiscountModels = require("../models/BusinessEntityDiscount");
const discountCouponModels = require("../models/DiscountCoupon");
const yachtYearModels = require("../models/yachtYear");
const yachtMakeModels = require("../models/yachtMake");
const yachtEngineModels = require("../models/yachtEngine");
const yachtModelModels = require("../models/yachtModels");
const medicalTPAModels = require("../models/medicalTPA");
const medicalNetworkModels = require("../models/medicalNetwork");
const medicalNetworkListModels = require("../models/medicalNetworkList");
const BestPlanModels = require("../models/Best_Plan");
const companyModels = require("../models/Company")
const yachtPlanModels = require("../models/YachtPlan")
const boatBreadthModels = require("../models/boatBreadth")
const medicalLevelModels = require("../models/medical_level")
const Locations = require("../models/Locations");
const plan_category_model = require("../models/Plan_category");
const GroupMedicalPlan = require("../models/GroupMedicalPlan");
const memberRequestModels = require("../models/MemberRequests")
const groupMedicalModels = require("../models/groupMedicalLeads")
const medicalPlanRatesModel = require("../models/Group_Medical_Plan_Rates")
const groupmedicalCategory = require("../models/GroupMedicalCategory")
const medicalQoutesPageModels = require("../models/medicalQuotesPage")
const groupMedicalClaimType = require("../models/GroupMedicalClaimType")
const groupMedicalClaimStatus = require("../models/GroupMedicalClaimStatus")
const groupMedicalClaimModels = require('../models/groupMedicalClaim')
const NewLeadsModels = require("../models/New_Lead")
const groupMedicalClaimDescription = require("../models/GroupMedicalClaimDescription")
const groupMedicalClaimProcedure = require("../models/ClaimProcedure")
const groupMedicalUsefulLink = require("../models/UsefulLinks")
const groupMedicalCliamModels = require("../models/groupMedicalClaim")
const groupMedicalTatdaysModels = require("../models/GroupMedicalTat")
const genrateClaimNumber = require("../helper/claimNumber")
const { sendEmail } = require("../helper/sendEmail");
const Admin = require("../models/Admin")
const md5 = require("md5");
const XLSX = require("xlsx");
const multer = require("multer");
const fs = require("fs");
const MaritalStatus = require("../models/MaritalStatus");
const Gender = require("../models/Gender");
const Relation = require("../models/Relation");
const actual_salary_band = require("../models/ActualSalaryBand")
const utils = require("../utils");
const { sendServerEmail } = require("../helper/sendEmail");
const { default: axios } = require("axios");
module.exports = {
  addcustomerComplaint: async (req, res) => {
    try {
      let payload = req.body;
      
      let userexist = await Admin.findOne({ email: payload.email })
      if (userexist) {
        if (payload.lob) {
          payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
        }
        let customerComplaintDetaills;
        customerComplaintDetaills = new customerComplaintModels(payload);
        customerComplaintDetaills = await customerComplaintDetaills.save();
        if (!customerComplaintDetaills) {
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
        await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'recieve complaint exists'}`, requestOptions)
          .then(data => {
            if (data.message == 'Email template fetched') {
              emaildata = data.data
              console.log(emaildata, "...............exist.......,,,,,,,,,,,,,,,,")

            } else {
              emaildata.subject = 'Complaint Recieved'
              emaildata.template_id = '6662a9c532b26165203cce1b'
              emaildata.body = `<p>'Dear Client_Name,\n\nYour complaint has been received.\n\nWe will Update you soon.\n\nThank you for reaching out to us'</p>`
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
            message: "Complaint filed Successfully !!",
            data: customerComplaintDetaills,
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
        console.log(customer_data,num,">>>>>>>>>>>>>>>>>>>>>>>")
        customer_data = await customer_data.save();
        if (customer_data) {
        let customerComplaintDetaills = new customerComplaintModels(payload);
          customerComplaintDetaills = await customerComplaintDetaills.save();

          let emaildata = {}
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'recieve complaint new'}`, requestOptions)
            .then(data => {
              if (data.message == 'Email template fetched') { 
                emaildata = data.data
                console.log(emaildata,"...............new.......,,,,,,,,,,,,,,,,")
              } else {
                emaildata.subject = 'Complaint Recieved'
                emaildata.template_id = '6662a9c532b26165203cce1b'
                emaildata.body = `<p>Dear ${payload.name},
                        \n\nYour complaint has been received.
                        \n\n An account has been created for you with the following credentials:
                        \nEmail: ${payload.email}\nPassword: ${num} 
                        \n\nThank you for reaching out to us.</p>`
              }
            })
          let repw = 'Client_Name'
          let client_pass = "client_password"
          let client_email ="client_email"
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
              message: "Complaint filed successfully",
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
      console.log("Error", err);
    }
  },
  updateCustomerComplaint: async (req, res) => {
    try {
      let payload = req.body;
      if (payload.lob) {
        payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
      }
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await customerComplaintModels.findByIdAndUpdate(
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
  getCustomerComplaint: async (req, res) => {
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
                  from:"line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await customerComplaintModels.aggregate([aggregate]);
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
    } catch (error) {
      console.log("Error", error);
    }
  },
  getCustomerComplaintById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await customerComplaintModels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addLmpBankDetails: async (req, res) => {
    try {
      let lmpBankDetails;
      lmpBankDetails = new lmpBankDetailsModels(req.body);
      lmpBankDetails = await lmpBankDetails.save();
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: lmpBankDetails,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateLmpBankDetails: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let lmpBankDetails = await lmpBankDetailsModels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: lmpBankDetails,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getLmpBankDetails: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await lmpBankDetailsModels.aggregate([aggregate]);
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
      if ("Motor" == req.query?.lob) {
        lob = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      }
      result = await lmpBankDetailsModels.aggregate([
        { 
          $match: {
            bankstatus: true,
            lob: lob,
          },
        },
      ]);
      if (!result.length) {
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
  getLmpBankDetailsById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await lmpBankDetailsModels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addSocialMediaLink: async (req, res) => {
    try {
      let lmpBankDetails;
      lmpBankDetails = new socialMediaLinksModels(req.body);
      lmpBankDetails = await lmpBankDetails.save();
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: lmpBankDetails,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateSocialMediaLink: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let lmpBankDetails = await socialMediaLinksModels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: lmpBankDetails,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getSocialMediaLink: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await socialMediaLinksModels.aggregate([aggregate]);
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
      if ("Motor" == req.query?.lob) {
        lob = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");
      }
      console.log({ lob });
      result = await socialMediaLinksModels.aggregate([
        {
          $match: {
            bankstatus: true,
            lob: lob,
          },
        },
      ]);
      if (!result.length) {
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
  getSocialMediaLinkById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await socialMediaLinksModels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addNewsLetter: async (req, res) => {
    try {
      let payload = req.body;
      let result;

      console.log("payload", payload);  

      result = await newsLetterModels.find({ email: payload.email });
      console.log("result", result);
      if (result.length) {
        return res
          .status(409)
          .json({ status: 409, message: "Email is already subscribed to our newsletter !!", data: {} });
      }
      else if (!result.length) {
        result = new newsLetterModels(payload);
        result = await result.save();
        return res
          .status(201)
          .json({
            status: 201,
            message: "Email successfully subscribed to our newsletter !!",
            data: result,
          });
      }
      if (!result) {
        return res
          .status(500)
          .json({ status: 500, message: "Data Not Saved", data: {} });
      }

    } catch (err) {
      console.log("Error", err);
    }
  },
  updateNewsLetter: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await newsLetterModels.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
  getNewsLetter: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
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
        };
        result = await newsLetterModels.aggregate([aggregate]);
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
      if (!result.length) {
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
  getNewsLetterById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await newsLetterModels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addBanerImage: async (req, res) => {
    try {
      console.log(req.file, "checkkk"); // Check the file object
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "No image uploaded",
        });
      }
      console.log(req.body);
      const { alt, name, lob, company_name, rating } = req.body;
      const image = req.file.filename; // Get the uploaded file name
      const result = new banerImageModels({
        image,
        company_name,
        alt,
        name,
        lob,
        rating,
      }); // Create a new instance with all the fields
      const savedResult = await result.save();
      if (!savedResult) {
        return res.status(500).json({
          status: 500,
          message: "Data Not Saved",
          data: {},
        });
      }
      return res.status(201).json({
        status: 201,
        message: "Data Saved Successfully !!",
        data: savedResult,
      });
    } catch (err) {
      console.error("Error", err);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  },
  updateBanerImage: async (req, res) => {
    try {
      let id = req.query?.id;
      const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it
      if (req.file) {
        updateData.image = req.file.filename;
      }
      console.log(updateData, "check");
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await banerImageModels.findByIdAndUpdate(id, updateData, {
        new: true,
      });
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
  getBanerImage: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
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
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: (page - 1) * +limit,
              },
              {
                $limit: +limit,
              },
            ],
          },
        };
        result = await banerImageModels.aggregate([aggregate]);
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
        result = await banerImageModels.aggregate([
          { $match: { status: ture } },
        ]);
      }

      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res.status(200).json({
        status: 200,
        message: "Data Found Successfully !!",
        data: result[0],
      });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getBanerImageById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await banerImageModels.findById(id);
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
  addEmergencyDepartment: async (req, res) => {
    try {
      let result;
      let paylod = req.body;
      if (paylod?.lob?.length) {
        paylod.lob = paylod.lob.map((lob) => mongoose.Types.ObjectId(lob));
      }
      result = new emergencyDepartmentModels(paylod);
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
  updateEmergencyDepartment: async (req, res) => {
    try {
      let id = req.query?.id;
      let paylod = req.body;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      if (paylod?.lob?.length) {
        paylod.lob = paylod.lob.map((lob) => mongoose.Types.ObjectId(lob));
      }
      let result = await emergencyDepartmentModels.findByIdAndUpdate(
        id,
        paylod,
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
  getEmergencyDepartment: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result = [];
      let lob;
      let insuranceType = req.query.id;
      lob = mongoose.Types.ObjectId(insuranceType);
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await emergencyDepartmentModels.aggregate([aggregate]);
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
        // console.log(result[0]?.data);
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !!",
            data: result[0]?.data,
            count: result[0]?.count[0]?.total,
          });
      }
      result = await emergencyDepartmentModels.aggregate([
        {
          $match: {
            status: true,
            lob: lob,
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
          $project: {
            number: 1,
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
  getEmergencyDepartmentById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await emergencyDepartmentModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addLpmPartner: async (req, res) => {
    try {
      let result;
      let paylod = req.body;
      if (paylod?.lob?.length) {
        paylod.lob = paylod.lob.map((lob) => {
          console.log("lob/////////////////", lob);
          mongoose.Types.ObjectId(lob);
        });
      }
      if (req.file) {
        paylod["logo"] = req.file;
      }
      console.log({ kdmnkc: paylod.companyId });
      result = new ourPartnerModels(paylod);
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
  updateLpmPartner: async (req, res) => {
    try {
      let id = req.query?.id;
      let paylod = req.body;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      if (paylod?.lob?.length) {
        paylod.lob = paylod.lob.map((lob) => mongoose.Types.ObjectId(lob));
      }
      let result = await ourPartnerModels.findByIdAndUpdate(id, paylod, {
        new: true,
      });
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
  getLpmPartner: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result = [];
      let lob;
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await ourPartnerModels.aggregate([aggregate]);
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
      result = await ourPartnerModels.aggregate([
        {
          $match: {
            status: true,
          },
        },
        // {
        //     '$lookup': {
        //         'from': 'line_of_businesses',
        //         'localField': 'lob',
        //         'foreignField': '_id',
        //         'as': 'lobDetails'
        //     }
        // },
        {
          $project: {
            number: 1,
          },
        },
      ]);
      if (!result.length) {
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
  getLpmPartnerById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await ourPartnerModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },

  addCancelPolicy: async (req, res) => {
    try {
      let result;
      let payload = req.body;
      let leadID = payload?.new_lead_id;
      let userid = req.user?._id;
      payload["user_id"] = userid;
      if (req.file) {
        payload["documents"] = req.file;
      }

      result = await cancelPolicyModels.create(payload);
      if (result) {
        let cancelled = await New_Lead.findByIdAndUpdate(leadID, {
          camcelPolicyStatus: true,
        });
        if (cancelled) {
          return res
            .status(201)
            .json({ status: 201, message: "Policy Cancelled successfully" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Something went wrong" });
      }
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateCancelPolicy: async (req, res) => {
    try {
      let id = req.query?.id;
      let paylod = req.body;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      if (paylod?.lob?.length) {
        paylod.lob = paylod.lob.map((lob) => mongoose.Types.ObjectId(lob));
      }
      let result = await cancelPolicyModels.findByIdAndUpdate(id, paylod, {
        new: true,
      });
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
  getCancelPolicy: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result = [];
      let lob;
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await cancelPolicyModels.aggregate([aggregate]);
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
      result = await cancelPolicyModels.aggregate([
        {
          $match: {
            status: true,
          },
        },
        // {
        //     '$lookup': {
        //         'from': 'line_of_businesses',
        //         'localField': 'lob',
        //         'foreignField': '_id',
        //         'as': 'lobDetails'
        //     }
        // },
        {
          $project: {
            number: 1,
          },
        },
      ]);
      if (!result.length) {
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
  getCancelPolicyById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await cancelPolicyModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addFormSteps: async (req, res) => {
    try {
      let result;
      let payload = req.body;

      console.log(payload);

      let LOB;

      if (payload?.lob.includes(",")) {
        const lobs = payload.lob.split(",");
        LOB = lobs.map((lob) => mongoose.Types.ObjectId(lob));
      } else {
        LOB = mongoose.Types.ObjectId(payload?.lob);
      }
      result = await FormStepsMaster.create({
        lob: LOB,
        form_type: payload?.form_type,
        step_no: payload?.step_no,
        message: payload?.message,
        description: payload?.description,
        logo: req.file,
      });
      if (result) {
        return res
          .status(201)
          .json({ status: 201, message: "Step Added successfully" });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Something went wrong" });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  },
  getFormSteps: async (req, res) => {
    try {
      let payload = +req.query;
      let page = +req.query.page;
      let limit = +req.query.perPage;
      let lob = req.query.lob;
      let form_type = req.query.form_type;
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
                $lookup: {
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lobDetails",
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
        };
        result = await FormStepsMaster.aggregate([aggregate]);
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
      result = await FormStepsMaster.aggregate([
        {
          $match: {
            status: true,
            lob: mongoose.Types.ObjectId(lob),
            form_type: form_type,
          },
        },

        {
          $project: {
            step_no: 1,
            message: 1,
            description: 1,
            logo: 1,
          },
        },
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Found Successfully !!",
          data: result,
        });
    } catch (error) {
      console.log("Error", error.message);
    }
  },
  updateFormSteps: async (req, res) => {
    try {
      let id = req.params.id;
      let payload = req.body;
      console.log(payload);
      console.log(req.file);
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      if (req.file) {
        payload["logo"] = req.file;
        if (payload?.lob.includes(",")) {
          const lobs = payload.lob.split(",");
          payload.lob = lobs.map((lob) => mongoose.Types.ObjectId(lob));
        } else if (payload?.lob?.length) {
          payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
        } else {
          payload.lob = mongoose.Types.ObjectId(payload?.lob);
        }
        let result = await FormStepsMaster.findByIdAndUpdate(id, payload, {
          new: true,
        });
        if (!result) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Updated", data: {} });
        }
        return res
          .status(200)
          .json({
            status: 200,
            message: "Step Updated Successfully !!",
            data: {},
          });
      } else {
        if (payload?.lob.includes(",")) {
          const lobs = payload.lob.split(",");
          payload.lob = lobs.map((lob) => mongoose.Types.ObjectId(lob));
        } else if (payload?.lob?.length) {
          payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
        } else {
          payload.lob = mongoose.Types.ObjectId(payload?.lob);
        }
        let result = await FormStepsMaster.findByIdAndUpdate(id, payload, {
          new: true,
        });
        if (!result) {
          return res
            .status(404)
            .json({ status: 404, message: "Data Not Updated", data: {} });
        }
        return res
          .status(200)
          .json({
            status: 200,
            message: "Step Updated Successfully !!",
            data: {},
          });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  },

  getSingleStep: async (req, res) => {
    try {
      let id = req.params?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }

      let result = await FormStepsMaster.findById(id);
      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Step found Successfully !!",
          data: result,
        });
    } catch (error) {
      console.log("Error", error.message);
    }
  },
  updateStepStatus: async (req, res) => {
    try {
      const id = req.body.id;
      const status = req.body.status;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let statusUpdate = await FormStepsMaster.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
          },
        }
      );
      if (!statusUpdate) {
        return res
          .status(404)
          .json({ status: 404, message: "something went wrong", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated successfully !!",
          data: {},
        });
    } catch (err) {
      console.log(err);
    }
  },
  addAmRating: async (req, res) => {
    try {
      let lmpBankDetails;
      lmpBankDetails = new AMratingmodels(req.body);
      lmpBankDetails = await lmpBankDetails.save();
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: lmpBankDetails,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateAmRating: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let lmpBankDetails = await AMratingmodels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: lmpBankDetails,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getAmRatings: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.perPage;
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
        };
        result = await AMratingmodels.aggregate([aggregate]);
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
      result = await AMratingmodels.aggregate([
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
  getAmRatingBYId: async (req, res) => {
    try {
      let id = req.params.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await AMratingmodels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateRatingsStatus: async (req, res) => {
    try {
      const id = req.body.id;
      const status = req.body.status;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let statusUpdate = await AMratingmodels.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
          },
        }
      );
      if (!statusUpdate) {
        return res
          .status(404)
          .json({ status: 404, message: "something went wrong", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Status Updated successfully !!",
          data: {},
        });
    } catch (err) {
      console.log(err);
    }
  },
  addSPrating: async (req, res) => {
    try {
      let lmpBankDetails;
      lmpBankDetails = new SPratingmodels(req.body);
      lmpBankDetails = await lmpBankDetails.save();
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: lmpBankDetails,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateSPrating: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let lmpBankDetails = await SPratingmodels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!lmpBankDetails) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: lmpBankDetails,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getSPratings: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.perPage;
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
        };
        result = await SPratingmodels.aggregate([aggregate]);
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

      result = await SPratingmodels.aggregate([
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
  getSPratingById: async (req, res) => {
    try {
      let id = req.params.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await SPratingmodels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateSPRatingsStatus: async (req, res) => {
    try {
      const id = req.body.id;
      const status = req.body.status;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let statusUpdate = await SPratingmodels.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
          },
        }
      );
      if (!statusUpdate) {
        return res
          .status(404)
          .json({ status: 404, message: "something went wrong", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Status Updated successfully !!",
          data: {},
        });
    } catch (err) {
      console.log(err);
    }
  },
  addBusinessEntityLink: async (req, res) => {
    try {
      let payload = req.body;
      let businessEntitylink;
      let user = req.user;
      payload["businessEntityId"] = user._id?.toString();
      businessEntitylink = new businessEntityModels(payload);
      businessEntitylink = await businessEntitylink.save();
      if (!businessEntitylink) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Saved", data: {} });
      }
      return res
        .status(201)
        .json({
          status: 201,
          message: "Data Saved Successfully !!",
          data: businessEntitylink,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  updateBusinessEntityLink: async (req, res) => {
    try {
      let id = req.query?.id;

      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let businessEntitylink = await businessEntityModels.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!businessEntitylink) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Updated", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Updated Successfully !!",
          data: businessEntitylink,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getBusinessEntityLinks: async (req, res) => {
    try {
      let userId = req.user?._id;
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
      if (page && limit) {
        let aggregate = {
          $facet: {
            count: [
              {
                $match: {
                  businessEntityId: userId,
                },
              },
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: {
                  businessEntityId: userId,
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
        result = await businessEntityModels.aggregate([aggregate]);
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

      result = await businessEntityModels.aggregate([
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
  getBusinessEntityLinkById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await businessEntityModels.findById(id);
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
          data: result,
        });
    } catch (error) {
      console.log("Error", error);
    }
  },
  addBusinessEntityComission: async (req, res) => {
    try {
      let payload = req.body;
      if (payload.lob) {
        payload.lob = mongoose.Types.ObjectId(payload.lob);
      }
      if (payload.location_rate) {
        const locArr = payload.location_rate;
        const rates = payload.rate;
        const PayloadArr = [];
        const rateArr = rates.includes(",") ? rates.split(",") : [rates];
        for (let i = 0; i < locArr.length; i++) {
          const obj = {
            location_id: mongoose.Types.ObjectId(locArr[i].id),
            location_name: locArr[i].location_name,
            rate: rateArr[i],
          };
          PayloadArr.push(obj);
        }
        payload.location_rate = PayloadArr;
      }
      if (payload?.rate) {
        payload.rate = payload.rate;
      }
      let result;
      result = new businessEntityComissionModels(payload);
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
  updateBusinessEntityComission: async (req, res) => {
    try {
      let payload = req.body;
      if (payload.lob) {
        payload.lob = mongoose.Types.ObjectId(payload.lob);
      }
      if (payload.location_rate) {
        const locArr = payload.location_rate;
        const rates = payload.rate;
        const PayloadArr = [];
        const rateArr = rates.includes(",") ? rates.split(",") : [rates];
        for (let i = 0; i < locArr.length; i++) {
          const obj = {
            location_id: mongoose.Types.ObjectId(locArr[i].id),
            location_name: locArr[i].location_name,
            rate: rateArr[i],
          };
          PayloadArr.push(obj);
        }
        payload.location_rate = PayloadArr;
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
      let result = await businessEntityComissionModels.findByIdAndUpdate(
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
  getBusinessEntityComissions: async (req, res) => {
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
              // {
              //     $lookup:{
              //         from: "locations",
              //         localField: "location_rate.location_id",
              //         foreignField: "_id",
              //         as: "locatins"
              //       }
              // },
              {
                $project: {
                  desciption: 1,
                  "lobDetails.line_of_business_name": 1,
                  "CompanyDetails.company_name": 1,
                  location_rate: 1,
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
        result = await businessEntityComissionModels.aggregate([aggregate]);
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
      result = await businessEntityComissionModels.aggregate([
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
  getBusinessEntityComissionById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await businessEntityComissionModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        // {
        //     '$lookup': {
        //         'from': 'line_of_businesses',
        //         'localField': 'lob',
        //         'foreignField': '_id',
        //         'as': 'lobDetails'
        //     }
        // },
        // {
        //     $lookup:{
        //         from: "locations",
        //         localField: "location_rate.location_id",
        //         foreignField: "_id",
        //         as: "locatins"
        //       }
        // },
        {
          $project: {
            desciption: 1,
            "lobDetails.line_of_business_name": 1,
            "locatins.location_name": 1,
            location_rate: 1,
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
  update_business_entity_commission_status: async (req, res) => {
    try {
      const status = req.body?.be_status;
      let id = req.body?.id;
      console.log(status);
      let newdetails = await businessEntityComissionModels.findOneAndUpdate(
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
  addBusinessEntityDiscount: async (req, res) => {
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
      result = new businessEntityDiscountModels(payload);
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
  updateBusinessEntityDiscount: async (req, res) => {
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
      let result = await businessEntityDiscountModels.findByIdAndUpdate(
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
  getBusinessEntityDiscount: async (req, res) => {
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
        result = await businessEntityDiscountModels.aggregate([aggregate]);
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
      result = await businessEntityDiscountModels.aggregate([
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
  getBusinessEntityDiscountById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await businessEntityDiscountModels.aggregate([
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
  update_business_entity_Discount_status: async (req, res) => {
    try {
      const status = req.body?.be_status;
      let id = req.body?.id;
      console.log(status);
      let newdetails = await businessEntityDiscountModels.findOneAndUpdate(
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
  addDiscountcoupon: async (req, res) => {
    try {
      let payload = req.body;
      console.log(payload);

      payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
      payload.location = payload.location.map((location) =>
        mongoose.Types.ObjectId(location)
      );
      payload.agent = payload.agent.map((agent) =>
        mongoose.Types.ObjectId(agent)
      );

      const str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        code += str.charAt(randomIndex);
      }
      payload.code = code;
      console.table(payload);

      const result = await discountCouponModels.create(payload);
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

  getdiscountcoupons: async (req, res) => {
    try {
      let page = req.query.page;
      let limit = req.query.limit;

      console.log(page, limit);

      const result = await discountCouponModels
        .aggregate([
          {
            $lookup: {
              from: "line_of_businesses",
              localField: "lob",
              foreignField: "_id",
              as: "lob",
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
            $lookup: {
              from: "admins",
              localField: "agent",
              foreignField: "_id",
              as: "agent",
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
      const count = discountCouponModels.length;
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
          data: result,
          total: count,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },

  getdiscountcouponById: async (req, res) => {
    try {
      let id = req.query.id;
      console.log(id);

      const result = await discountCouponModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
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
          $lookup: {
            from: "admins",
            localField: "agent",
            foreignField: "_id",
            as: "agent",
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
          data: result,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },

  updateDiscountcouponstatus: async (req, res) => {
    try {
      let id = req.body.id;
      let status = req.body.status;
      console.log(id);
      console.log(status);

      const result = await discountCouponModels.findByIdAndUpdate(
        id,
        { status: status },
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
    } catch (err) {
      console.log("Error", err);
    }
  },

  updateDiscountcoupon: async (req, res) => {
    try {
      let id = req.query.id;
      let payload = req.body;
      payload.lob = payload.lob.map((lob) => mongoose.Types.ObjectId(lob));
      payload.location = payload.location.map((location) =>
        mongoose.Types.ObjectId(location)
      );
      payload.agent = payload.agent.map((agent) =>
        mongoose.Types.ObjectId(agent)
      );
      console.log(id);
      console.log(payload);

      const result = await discountCouponModels.findByIdAndUpdate(id, payload, {
        new: true,
      });

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
    } catch (err) {
      console.log("Error", err);
    }
  },

  deleteDiscountcoupon: async (req, res) => {
    try {
      let id = req.query.id;
      console.log(id);

      const result = await discountCouponModels.findByIdAndDelete(id);

      if (!result) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Deleted", data: {} });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: "Data Deleted Successfully !!",
          data: result,
        });
    } catch (err) {
      console.log("Error", err);
    }
  },
  addYatchYear: async (req, res) => {
    try {
      let payload = req.body;
      let count = 0;
      console.log(payload, "<<<<<<<<<<<<<payload");
      // return false;
      for (let i = 0; i < payload?.length; i++) {
        let newPayloadObj = {};
        newPayloadObj["yearDesc"] = +payload[i]?.yearDesc;
        newPayloadObj["location"] = payload[i]?.location?.map((id) =>
          mongoose.Types.ObjectId(id.value)
        );
        let result;
        console.log(newPayloadObj, "new payload");
        result = await yachtYearModels.findOneAndUpdate(
          {
            yearDesc: newPayloadObj.yearDesc,
          },

          newPayloadObj,
          { upsert: true, returnOriginal: false }
        );
        if (result) {
          count++;
        }
      }
      if (count > 0) {
        return res
          .status(201)
          .json({ status: 201, message: "Data Saved Successfully !!" });
      }
      return res
        .status(404)
        .json({ status: 404, message: "Data Not Saved", data: {} });
    } catch (err) {
      console.log(err);
      console.log("Error", err);
    }
  },
  updateYatchYear: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body;
      let defPayload = {};
      if (payload?.id === id) {
        defPayload["status"] = payload.status;
      }
      if (payload?.yearCode) {
        defPayload["yearDesc"] = +payload?.yearCode;
      }
      if (payload?.location) {
        defPayload["location"] = payload?.location?.map((id) =>
          mongoose.Types.ObjectId(id.value)
        );
      }

      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await yachtYearModels.findByIdAndUpdate(id, defPayload, {
        new: true,
      });
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
      console.log(error);
      console.log("Error", error);
    }
  },
  getYatchYear: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let result;
      let lob;
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
                $sort: {
                  yearDesc: -1,
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
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        };
        result = await yachtYearModels.aggregate([aggregate]);
      } else {
        result = await yachtYearModels.aggregate([{ $match: {} }]);
      }
      if (!result.length) {
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
      console.log(error);
      console.log("Error", error);
    }
  },
  getYatchYearById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await yachtYearModels.aggregate([
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
            as: "location",
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
          data: result,
        });
    } catch (error) {
      console.log(error);
      console.log("Error", error);
    }
  },
  addMedicalTPA: async (req, res) => {
    try {
      let result
      const payload = req.body;
      let reqfile = req.file
      console.log("reqfile>>> ", reqfile)
      // const payload = [];
      // payload.push(payloadobj);
      console.log("payload>>> ", payload)
      // let payloadarr = []
      // for (let i = 0; i < payload.length; i++) {
      const locs = payload?.location.includes(",") ? payload?.location.split(",") : [payload?.location]
      let payloadarr = {
        name: payload?.name,
        file: reqfile?.filename,
        location: locs.map((id) => mongoose.Types.ObjectId(id)),
      }
      // }


      console.log(payloadarr, "new payload")
      // return false;

      result = await medicalTPAModels.create(payloadarr);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },

  updateMedicalTPA: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let reqfile = req.file
      console.log(reqfile, "reqfile")
      let result
      let payloadobj = {}
      if (payload?.name) {
        payloadobj['name'] = payload?.name
      }
      if (payload?.location) {
        let locarr = payload?.location.includes(",") ? payload?.location.split(",") : [payload?.location]
        payloadobj['location'] = locarr.map((id) => mongoose.Types.ObjectId(id))
      }
      if (req.file) {
        payloadobj['file'] = reqfile?.filename
      }
      console.log(payloadobj, "payloadobj")
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await medicalTPAModels.findByIdAndUpdate(
        id,
        payloadobj,
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
  getMedicalTPAById: async (req, res) => {
    try {
      let id = req.query?.id;
      console.log("kkkkkkkkkkkkkkkk", id)
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalTPAModels.aggregate([
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
  getMedicalTPAs: async (req, res) => {
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
                  'file': 1,
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
        result = await medicalTPAModels.aggregate([aggregate]);
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
        result = await medicalTPAModels.aggregate([
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
  getActiveMedicalTPAs: async (req, res) => {
    try {
      let result;
      result = await medicalTPAModels.aggregate([{
        $match: {
          status: 1
        }
      },
      {
        $project: {
          name: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  addMedicalNetwork: async (req, res) => {
    try {
      //   let existArray = [];
      //   let resultArray = [];
      //   let count = 0;
      //   for (let i = 0; i < payload.length; i++) {
      //     let name = await payload[i]?.name?.toUpperCase();
      //     const data_in_db = await medicalNetworkModels.find({
      //       name: name,
      //     });
      //     if (data_in_db.length > 0) {
      //       existArray.push(data_in_db);
      //       count++;
      //     } else {
      //       let location_id = payload[i]?.location;
      //       let locationArray = [];
      //       for (let j = 0; j < location_id.length; j++) {
      //         locationArray.push(mongoose.Types.ObjectId(location_id[j]._id));
      //       }
      //       let medicalDeclaration_dt = new medicalNetworkModels({
      //         name: name,
      //         location: locationArray,
      //         TPAID:payload[i]?.TPAID
      //       });
      //       console.log(medicalDeclaration_dt)
      //       const result = await medicalDeclaration_dt.save();
      //       if(result != null){
      //         resultArray.push(result);
      //       }
      //     }
      //     if (resultArray.length > 0) {
      //       return res.json({
      //         status: 200,
      //         message: `Medical Network  Added Successfully`,
      //         count:count
      //       });
      //     }else if(resultArray.length == 0){
      //       return res.json({
      //         status: 400,
      //         message: `Medical Network  already exist`,
      //       });
      //     }else{
      //       return res.json({
      //         status: 400,
      //         message: "Medical Network Not Added Successfully!",
      //       });
      //     }
      //  }
      let result
      const payload = req.body;
      console.log(payload, "payload")
      let payloadarr = []
      for (let i = 0; i < payload.length; i++) {
        payloadarr.push({
          name: payload[i]?.name,
          TPAID: payload[i]?.TPAID,
          location: payload[i]?.location?.map((id) => mongoose.Types.ObjectId(id._id)),
        })
      }


      console.log(payloadarr, "new payload")
      // return false;

      result = await medicalNetworkModels.create(payloadarr);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMedicalNetwork: async (req, res) => {
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
      result = await medicalNetworkModels.findByIdAndUpdate(
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
  getMedicalNetworkById: async (req, res) => {
    try {
      let id = req.query?.id;
      console.log("kkkkkkkkkkkkkkkk", id)
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalNetworkModels.aggregate([
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
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'TPAID',
            'foreignField': '_id',
            'as': 'TPAData'
          }
        },
        {
          '$project': {
            'name': 1,
            'status': 1,
            'locations.location_name': 1,
            'locations._id': 1,
            "TPAData._id": 1,
            "TPAData.name": 1,

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
  getMedicalNetworks: async (req, res) => {
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
        result = await medicalNetworkModels.aggregate([aggregate]);
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
        result = await medicalNetworkModels.aggregate([
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
            $lookup: {
              from: "medical_tpas",
              localField: "TPAID",
              foreignField: "_id",
              as: "TPAData",
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
  getActiveMedicalNetworks: async (req, res) => {
    try {
      let result;
      result = await medicalNetworkModels.aggregate([{
        $match: {
          status: 1
        }
      },
      {
        $project: {
          name: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  getTpaLinkNetwork: async (req, res) => {
    try {
      let TpaId = mongoose.Types.ObjectId(req.query.tpaId);
      let result;
      result = await medicalNetworkModels.aggregate([{
        $match: {
          status: 1,
          TPAID: TpaId
        }
      },
      {
        $project: {
          name: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  addMedicalNetworkList: async (req, res) => {
    try {
      let result
      const payload = req.body;
      console.log(payload, "payload")
      let payloadarr = []
      for (let i = 0; i < payload.length; i++) {
        payloadarr.push({
          name: payload[i]?.name,
          TPAID: payload[i]?.TPAID,
          planCategory: payload[i]?.planCategory,
          location: payload[i]?.location?.map((id) => mongoose.Types.ObjectId(id)),
          networkId: payload[i]?.networkId?.map((id) => mongoose.Types.ObjectId(id)),

        })
      }
      result = await medicalNetworkListModels.create(payloadarr);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });
    } catch (error) {
      console.log("Error", error);
    }
  },
  updateMedicalNetworkList: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let result
      console.log(payload, ">>>>>>>>>>>>>>> payload")
      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id))
      }
      if (payload?.networkId?.length) {
        payload['networkId'] = payload.networkId?.map((id) => mongoose.Types.ObjectId(id))
      }

      if (!id) {
        return res
          .status(404)

          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await medicalNetworkListModels.findByIdAndUpdate(
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
  getMedicalNetworkListById: async (req, res) => {
    try {
      let id = req.query?.id;
      console.log("kkkkkkkkkkkkkkkk", id)
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalNetworkListModels.aggregate([
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
          '$lookup': {
            'from': 'plan_categories',
            'localField': 'planCategory',
            'foreignField': '_id',
            'as': 'planCategory'
          }
        }, {
          '$lookup': {
            'from': 'medical_networks',
            'localField': 'networkId',
            'foreignField': '_id',
            'as': 'networkData'
          }
        }, {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'TPAID',
            'foreignField': '_id',
            'as': 'TPAData'
          }
        },
        {
          '$project': {
            'name': 1,
            'status': 1,
            'locations.location_name': 1,
            'locations._id': 1,
            'planCategory.plan_category_name': 1,
            'planCategory._id': 1,
            'networkData.name': 1,
            'networkData._id': 1,
            'TPAData.name': 1,
            'TPAData._id': 1,
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
  getMedicalNetworkLists: async (req, res) => {
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
        result = await medicalNetworkListModels.aggregate([aggregate]);
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
        result = await medicalNetworkListModels.aggregate([
          {
            $match: {},
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
              from: 'medical_tpas',
              localField: 'TPAID',
              foreignField: '_id',
              as: 'tpa'
            }
          },
          {
            $lookup: {
              from: 'medical_networks',
              localField: 'networkId',
              foreignField: '_id',
              as: 'medical_networks'
            }
          },
          {
            $lookup: {
              from: 'plan_categories',
              localField: 'planCategory',
              foreignField: '_id',
              as: 'plan_categories'
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
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  getActiveMedicalNetworkLists: async (req, res) => {
    try {
      let result;
      result = await medicalNetworkListModels.aggregate([{
        $match: {
          status: 1
        }
      },
      {
        $project: {
          name: 1,
          _id: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  add_Best_Plan: async (req, res) => {
    try {
      const payload = req.body;
      let objPayload = {};
      let lobtitle
      if (payload?.lob) {
        const lob = payload.lob?.split(",")
        objPayload['lob'] = lob[0]
        lobtitle = lob[1]
      }
      if (payload?.location) {
        objPayload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id.value))
      }
      if (payload?.company_id) {
        objPayload['company_id'] = mongoose.Types.ObjectId(payload.company_id)
      }
      if (payload?.best_plan_price) {
        objPayload['best_plan_price'] = +payload?.best_plan_price
      }
      if (payload?.best_plan_topup) {
        objPayload['best_plan_topup'] = +payload?.best_plan_topup
      }
      if (payload?.travel_insurance_for) {
        objPayload['travel_insurance_for'] = payload.travel_insurance_for?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.travel_cover_type) {
        objPayload['travel_cover_type'] = payload.travel_cover_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.plan_category) {
        objPayload['plan_category'] = payload.plan_category?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.policy_type) {
        objPayload['policy_type'] = payload.policy_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.home_plan_type) {
        objPayload['home_plan_type'] = payload.home_plan_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.medical_plan_type) {
        objPayload['medical_plan_type'] = payload.medical_plan_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      // console.log(lobtitle, "-objPayload<><><><>-", objPayload)
      // return false;
      const result = new BestPlanModels(objPayload);
      const saveResult = await result.save();
      if (saveResult) {
        return res.status(201).json({ status: 201, message: "Best Plan Added Successfully !", data: saveResult });
      } else {
        return res.status(404).json({ status: 404, message: "Best Plan Not Added Successfully !" });
      }

    } catch (error) {
      console.log("Error", error);
    }
  },
  getAll_best_plans: async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.perPage;
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
                  from: "line_of_businesses",
                  localField: "lob",
                  foreignField: "_id",
                  as: "lob",
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
              {
                $lookup: {
                  from: "companies",
                  localField: "company_id",
                  foreignField: "_id",
                  as: "company_id",
                },
              },
              {
                $lookup: {
                  from: "repair_types",
                  localField: "repair_type",
                  foreignField: "_id",
                  as: "repair_type",
                },
              },
              {
                $lookup: {
                  from: "nature_of_plans",
                  localField: "nature_of_plan",
                  foreignField: "_id",
                  as: "nature_of_plan",
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
        };
        result = await BestPlanModels.aggregate([aggregate]);
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
      result = await BestPlanModels.aggregate([
          {
          $match: {
            status: 1,
          },
        },
          {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $lookup: {
            from: "repair_types",
            localField: "repair_type",
            foreignField: "_id",
            as: "repair_type",
          },
        },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $lookup: {
            from: "home_plan_type_lists",
            localField: "home_plan_type",
            foreignField: "_id",
            as: "home_plan_type",
          },
        },
        {
          $lookup: {
            from: "medical_plan_type_lists",
            localField: "medical_plan_type",
            foreignField: "_id",
            as: "medical_plan_type",
          },
        },
        {
          $lookup: {
            from: 'plan_categories',
            localField: 'plan_category',
            foreignField: "_id",
            as:'plan_category'}
        },
        {
          $lookup: {
            from: "travel_cover_type_lists",
            localField: 'travel_cover_type',
            foreignField: '_id',
            as: 'travel_cover_type'
          }
        },
        {
          $lookup: {
            from: "travel_insurance_fors",
            localField: 'travel_insurance_for',
            foreignField: '_id',
            as: 'travel_insurance_for'
          }
        },
        {
          $lookup: {
            from: 'policy_types',
            localField: 'policy_type',
            foreignField: '_id',
            as:'policy_type'}
        },
        // {
        //   $unwind: {
        //     path: '$lob'
        //   },
        // }, 
        // {
        //   $unwind: {
        //     path: '$company_id',

        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$repair_type',

        //   }
        // }, 
        // {
        //   $unwind: {
        //     path:'nature_of_plan'
        //   }
        // }, {
        //   $unwind: {
        //     path: '$repair_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$travel_cover_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$travel_insurance_for'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$policy_type'
        //   }
        // },
        // {
        //   $project: {
        //     best_plan_price: 1,
        //     best_plan_topup:1,
        //     'lob.line_of_business_name': 1,
        //     'company_id.company_name': 1,
        //     'company_id.company_logo': 1,
        //     'home_plan_type.home_plan_type':1,
        //     'medical_plan_type.medical_plan_type':1,
        //     'nature_of_plan.nature_of_plan_name': 1,
        //     'plan_category.plan_category_name':1,
        //     'repair_type.repair_type_name': 1,
        //     'travel_cover_type.travel_cover_type': 1,
        //     'travel_insurance_for.travel_insurance_for': 1,
        //     'policy_type.policy_type_name':1
            
        //   }
        // }
      ]);
      if (!result.length) {
        return res
          .status(404)
          .json({ status: 404, message: "Data Not Found", data: {} });
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
  getBest_plan_by_id: async (req, res) => {
    try {
      const id = req.query.id;
      console.log("id", id);
      const result = await BestPlanModels.aggregate([
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
            as: "location"
          }
        },
        {
          $lookup:
          {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob_result"
          }
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
            localField: "travel_cover_type",
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
            localField: "policy_type",
            foreignField: "_id",
            as: "policy_types",
          },
        },
        {
          $lookup:
          {
            from: "plan_categories",
            localField: "plan_category",
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
      ]);

      if (result) {
        return res.status(201).json({ status: 201, message: "Best Plan Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Best Plan Not Found Successfully !" });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  Update_Best_plan: async (req, res) => {
    try {
      const id = req.query.id;
      const payload = req.body;
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      let objPayload = {};
      if (payload?.lob) {
        const lob = payload.lob?.split(",")
        objPayload['lob'] = lob[0]
        lobtitle = lob[1]
      }
      if (payload?.location) {
        objPayload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id.value))
      }
      if (payload?.company_id) {
        objPayload['company_id'] = mongoose.Types.ObjectId(payload.company_id)
      }
      if (payload?.best_plan_price) {
        objPayload['best_plan_price'] = +payload?.best_plan_price
      }
      if (payload?.nature_of_plan) {
        objPayload['nature_of_plan'] = mongoose.Types.ObjectId(payload?.nature_of_plan)
      }
      if (payload?.best_plan_topup) {
        objPayload['best_plan_topup'] = +payload?.best_plan_topup
      }
      if (payload?.travel_insurance_for) {
        objPayload['travel_insurance_for'] = payload.travel_insurance_for?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.travel_cover_type) {
        objPayload['travel_cover_type'] = payload.travel_cover_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.plan_category) {
        objPayload['plan_category'] = payload.plan_category?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.policy_type) {
        objPayload['policy_type'] = payload.policy_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.home_plan_type) {
        objPayload['home_plan_type'] = payload.home_plan_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      if (payload?.medical_plan_type) {
        objPayload['medical_plan_type'] = payload.medical_plan_type?.map((val) => mongoose.Types.ObjectId(val.value))
      }
      const result = await BestPlanModels.findByIdAndUpdate(id, objPayload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Best Plan Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Best Plan Not Updated Successfully !" });
      }
    } catch (error) {
      console.log("Error", error);

    }
  },
  Update_Best_Plan_status: async (req, res) => {
    try {
      const id = req.query.id;
      const payload = req.query.status;
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await BestPlanModels.findByIdAndUpdate(id, { status: payload }, { new: true });
      if (result) {
        if (payload == 1) {
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
        return res.status(404).json({ status: 404, message: "Something went wrong !" });
      }
    }
    catch (error) {
      console.log("Error", error);
    }
  },
  addBlacklistYatch: async (req, res) => {
    try {
      let payload = req.body
      let allreadyBlackList = []
      let companyId = req.query?.companyId
      // let companyData = await companyModels.findById(companyId)
      // allreadyBlackList = companyData?.toObject()?.blackListYatch ? companyData?.toObject()?.blackListYatch : []
      // allreadyBlackList = allreadyBlackList.map((id) => id?.toString())
      // for (let i = 0; i < payload.length; i++) {
      //   if (allreadyBlackList.includes(payload[i]?.modelId)) {
      //     allreadyBlackList.splice(allreadyBlackList.indexOf(payload[i]?.modelId), 1)
      //   } else {
      //     allreadyBlackList.push(payload[i]?.modelId)
      //   }
      // }
      allreadyBlackList = payload.map((id) => mongoose.Types.ObjectId(id))
      let companydata
      companydata = await companyModels.findByIdAndUpdate(companyId, { blackListYatch: allreadyBlackList }, { new: true })
      if (companydata) {
        res.json({ status: 200, message: "Data Updated Successfully !", data: companydata });
      } else {
        res.json({ status: 400, message: "Data not Updated" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getBlacklistYatch: async (req, res) => {
    try {
      let id = req.query?.id
      let companyData = await companyModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },
        {
          '$lookup': {
            'from': 'yachtmodels',
            'localField': 'blackListYatch',
            'foreignField': '_id',
            'as': 'blackListYatch'
          }
        }, {
          '$unwind': {
            'path': '$blackListYatch'
          }
        }, {
          '$lookup': {
            'from': 'yachtmakes',
            'localField': 'blackListYatch.MakeId',
            'foreignField': '_id',
            'as': 'yachtmakes'
          }
        }, {
          '$lookup': {
            'from': 'yatch_body_type_lists',
            'localField': 'blackListYatch.bodyTypeId',
            'foreignField': '_id',
            'as': 'yatch_body_type_lists'
          }
        },
        {
          $project: {
            blackListYatch: 1,
            "yachtmakes.name": 1,
            "yatch_body_type_lists.yacht_body_type": 1,
            "_id": 0
          }
        }
      ])

      if (companyData.length) {
        res.json({ status: 200, message: "Data Updated Successfully !", data: companyData });
      } else {
        res.json({ status: 400, message: "Data not Updated", data: [] });
      }
    } catch (err) {
      console.log(err);
    }
  },
  add_black_listed_Yacht: async (req, res) => {
    try {
      let payload = req.body
      let planId = payload?.id
      let blackListArr = payload?.blackListArr
      let payloadData = []

      for (let i = 0; i < blackListArr.length; i++) {
        payloadData.push({ modelId: mongoose.Types.ObjectId(blackListArr[i]?.modelId), topup: blackListArr[i]?.topup ? blackListArr[i]?.topup : 0 })
      }

      const result = await yachtPlanModels.findByIdAndUpdate(
        planId,
        { $set: { black_listed_Yacht: payloadData } },
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
  getOrtherLobLeaddetails: async (req, res) => {
    try {
      let leadId = req.query?.leadId
      let result
      result = await New_Lead.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(leadId)
          }
        },
        {
          $lookup: {
            from: "preferred_days",
            localField: "call_date",
            foreignField: "_id",
            as: "call_day"
          }
        },
        {
          $lookup: {
            from: "other_insurances",
            localField: "other_insurance_name",
            foreignField: "_id",
            as: "other_insurance_name"
          }
        },

      ])
      if (result != null) {
        res.json({ status: 200, message: "Data Found Successfully!", data: result });
      } else {
        res.json({ status: 200, message: "Data Not Found", data: {} });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addBoaBreadth: async (req, res) => {
    try {
      let result
      const payload = req.body;
      console.log(payload, "payload")
      payload["location"] = payload?.location?.map((id) => mongoose.Types.ObjectId(id))
      result = await boatBreadthModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },

  updateBoaBreadth: async (req, res) => {
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
      result = await boatBreadthModels.findByIdAndUpdate(
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
  getBoaBreadthById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await boatBreadthModels.aggregate([
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
  getBoaBreadths: async (req, res) => {
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
        result = await boatBreadthModels.aggregate([aggregate]);
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
        result = await boatBreadthModels.aggregate([
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
  getActiveboaBreadths: async (req, res) => {
    try {
      let result;
      result = await boatBreadthModels.aggregate([{
        $match: {
          status: 1
        }
      },
      {
        $project: {
          name: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  addMedicalLevel: async (req, res) => {
    try {
      let result
      const payload = req.body;
      console.log(payload, "payload")
      payload["location"] = payload?.location?.map((id) => mongoose.Types.ObjectId(id))
      result = await medicalLevelModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data not saved  ", data: req.file });

    } catch (error) {
      console.log("Error", error);
    }
  },

  updatemedicalLevel: async (req, res) => {
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
      result = await medicalLevelModels.findByIdAndUpdate(
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
  getMedicalLevelById: async (req, res) => {
    try {
      let id = req.query?.id;
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      let result = await medicalLevelModels.aggregate([
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
  getMedicalLevels: async (req, res) => {
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
        result = await medicalLevelModels.aggregate([aggregate]);
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
        result = await medicalLevelModels.aggregate([
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
  getActiveMedicalLevels: async (req, res) => {
    try {
      let result;
      result = await medicalLevelModels.aggregate([{
        $match: {
          status: 1
        }
      },
      {
        $limit: 1
      },
      {
        $project: {
          name: 1
        }
      }
      ]);
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
        data: result
      });

    } catch (error) {
      console.log("Error", error);
    }
  },
  read_medical_network_list_excel: async (req, res) => {
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
        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : [locationInexcel];
        for (let j = 0; j < locationInexcel.length; j++) {
          let allLocations = await Locations.findOne({
            location_name: locationInexcel[j]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }
        let netwroks = xlData[i]?.Network
        let networkArray = netwroks.includes(",") ? netwroks.split(",") : [netwroks];
        let networkArrytoSave = []
        for (let k = 0; k < networkArray.length; k++) {
          let networkData = await medicalNetworkModels.findOne({
            name: networkArray[k]?.trim(),
            status: 1,
          });
          networkArrytoSave.push(
            mongoose.Types.ObjectId(networkData?._id?.toString())
          );
        }
        let planCatId = await plan_category_model.findOne({
          plan_category_name: xlData[i]?.PlanCategory,
          status: 1,
        });
        let tpaid = await medicalTPAModels.findOne({
          name: xlData[i]?.TPA,
          status: 1,
        });

        let data;
        console.log("data from excel", {
          name: await typeConversion(xlData[i]?.Name),
          TPAID: mongoose.Types.ObjectId(tpaid?._id?.toString()),
          location: locationArray,
          plan_category: mongoose.Types.ObjectId(planCatId?._id?.toString()),
          Network: networkArrytoSave,
        },)
        data = await medicalNetworkListModels.findOneAndUpdate(
          {
            name: await typeConversion(xlData[i]?.Name),
          },
          {
            name: await typeConversion(xlData[i]?.Name),
            TPAID: mongoose.Types.ObjectId(tpaid?._id?.toString()),
            location: locationArray,
            Network: networkArrytoSave,
            planCategory: mongoose.Types.ObjectId(planCatId?._id?.toString()),
            status: 1,
          },
          { upsert: true, returnOriginal: false }
        );

        count++
        console.log(data, "data")
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
  read_medical_TPA_excel: async (req, res) => {
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
        locationInexcel = locationInexcel.includes(",") ? locationInexcel.split(",") : [locationInexcel];
        for (let j = 0; j < locationInexcel.length; j++) {
          let allLocations = await Locations.findOne({
            location_name: locationInexcel[j]?.trim(),
            location_status: 1,
          });
          locationArray.push(
            mongoose.Types.ObjectId(allLocations?._id?.toString())
          );
        }

        let data;
        console.log("data from excel", {
          name: await typeConversion(xlData[i]?.Name),
          location: locationArray,
        },)
        data = await medicalTPAModels.findOneAndUpdate(
          {
            name: await typeConversion(xlData[i]?.Name),
          },
          {
            name: await typeConversion(xlData[i]?.Name),
            location: locationArray,
            status: 1,
          },
          { upsert: true, returnOriginal: false }
        );

        count++
        console.log(data, "data")
      }
      if (count > 0) {
        console.log(count, "execution ended successfully")

        return res.json({ status: 200, message: "Data Saved Successfully !" });
      } else {
        return res.json({ status: 400, message: "Data Not  Saved Successfully " });
      }
    } catch {
      console.log("Error", error)
    }
  },
  update_group_medical_plan: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body
      let result
      if (payload?.location?.length) {
        payload['location'] = payload.location?.map((id) => mongoose.Types.ObjectId(id.value))
      }
      if (payload?.network_list?.length) {
        payload['network_list'] = payload.network_list?.map((id) => mongoose.Types.ObjectId(id._id))
      }
      if (!id) {
        return res
          .status(404)
          .json({ status: 404, message: "ID is Required", data: {} });
      }
      result = await GroupMedicalPlan.findByIdAndUpdate(
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
  getGroupMedicalActivePlans: async (req, res) => {
    try {
      const result = await GroupMedicalPlan.aggregate([
        {
          $match: {
            status: 1,
          },
        },
        {
          $project: {
            _id: 1,
            plan_name: 1

          }
        }
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" });
      }
    } catch (error) {
      console.log("Error", error);
    }
  },
  addMemberRequest: async (req, res) => {
    try {
      
      let payload = req.body;
      let leadId = payload.leadId
      let userData = req.user
      if (userData) {
        payload['user_id'] = mongoose.Types.ObjectId(userData?._id)
      }
      if (payload?.company_id) {
        payload['company_id'] = mongoose.Types.ObjectId(payload?.company_id)
      }
      if (payload?.plan_id) {
        payload['plan_id'] = mongoose.Types.ObjectId(payload?.plan_id)
      }
      if (payload?.tpa) {
        payload['tpa'] = mongoose.Types.ObjectId(payload?.tpa)
      }
      if (payload?.network) {
        payload['network'] = mongoose.Types.ObjectId(payload?.network)
      }
      if (req.file) {
        payload['file'] = req.file.filename
      }
      const result = await memberRequestModels.create(payload);
      if (result) {
    await groupMedicalModels.findByIdAndUpdate(leadId,{memberRequestId:result?._id})
        return res.status(200).json({ status: 200, message: "created sucessfully", data: payload })
      } else {
        return res.status(400).json({ status: 400, message: "Something went wrong" })
      }

    } catch (error) {
      console.log(error)
    }
  },
  UpdateMemberRequestatus: async (req, res) => {
    try {
      const id = req.query.id;
      const payload = +req.query.status;
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await memberRequestModels.findByIdAndUpdate(id, { status: payload }, { new: true });
      if (result) {

          res.json({
            status: 200,
            message: "Status Updated Successfully",
          }); 
      } else {
        return res.status(404).json({ status: 404, message: "Something went wrong !"})
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  GetMemberRequests: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;

      const matchobj = {}
      if (req.query?.company) {
        matchobj['company_id'] = mongoose.Types.ObjectId(req.query?.company)
      }
      let aggregate = [
        {
          $match: matchobj,
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
            from: "admins",
            localField: "user_id",
            foreignField: "_id",
            as: "HRUser"
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id"
          }
        },
        {
          $lookup: {
            from: "group_medical_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "plan_id"
          }
        },
        {
          $lookup: {
            from: "medical_tpas",
            localField: "tpa",
            foreignField: "_id",
            as: "tpa"
          }
        },
        {
          $lookup: {
            from: "medical_networks",
            localField: "network",
            foreignField: "_id",
            as: "network"
          }
        },
        {
          $project: {
            _id: 1,
            'company_id.company_name': 1,
            'plan_id.plan_name': 1,
            'HRUser.name': 1,
            'tpa.name': 1,
            'network.name': 1,
            'file': 1,
            'status': 1,
          }
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });

      let result = await memberRequestModels.aggregate(aggregate);

      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result[0], count: result[0].count });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getMemberById: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalModels.aggregate([
        { 
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "planCompanyId",
            foreignField: "_id",
            as: "planCompanyId"
          }
        },
        {
          $lookup: {
            from: "group_medical_plans",
            localField: "planId",
            foreignField: "_id",
            as: "planId"
          }
        },
        {
          $lookup: {
            from: "medical_tpas",
            localField: "TPAId",
            foreignField: "_id",
            as: "TPAId"
          }
        },
        {
          $lookup: {
            from: "medical_networks",
            localField: "networkListId",
            foreignField: "_id",
            as: "networkListId"
          }
        },
      ]);
      if (!result.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found" });
      } else {
        console.log("this is result", result)
        return res.status(200).json({ status: 200, message: "Data Found Successfully !!", data: result });
      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateGroupMedicalMember: async (req, res) => {
    try {
      const id = req.query?.id;
      const payload = req.body;
      
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await groupMedicalModels.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !" });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated " });
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  deleteMedicalPlanMasters: async (req, res) => {
    try {
      const id = req.query?.id;
      let master = req.query?.type;
      let result;
      if (master == 'groupMedicalPlan') {
        result = await GroupMedicalPlan.findByIdAndDelete(id);
      }
      else if (master == 'groupmedicalPlanRates') {
        result = await medicalPlanRatesModel.findByIdAndDelete(id);
      }
      else if (master == 'groupmedicalCategory') {
        result = await groupmedicalCategory.findByIdAndDelete(id);
      }
      else if (master == 'groupmedicalClaimType') {
        result = await groupMedicalClaimType.findByIdAndDelete(id);
      }
      else if (master == 'groupmedicalClaimStatus') {
        result = await groupMedicalClaimStatus.findByIdAndDelete(id);
      }
      else if (master == 'groupmedicalClaimDescription') {
        result = await groupMedicalClaimDescription.findByIdAndDelete(id);
      }
      else if (master == 'usefulLinks') {
        result = await groupMedicalUsefulLink.findByIdAndDelete(id)
      }
      else if (master == 'ClaimProcedure') {
        result = await groupMedicalClaimProcedure.findByIdAndDelete(id)
      }
      else if (master == 'MaritalStatus') {
        result = await MaritalStatus.findByIdAndDelete(id)
      }
      else if (master == 'Gender') {
        result = await Gender.findByIdAndDelete(id)
      }
      else if (master == 'Relation') {
        result  = await Relation.findByIdAndDelete(id)
      }
      if (!result) {
        return res.status(404).json({ status: 400, message: "Data Not Deleted, Something went wrong" });
      } else {
        return res.status(200).json({ status: 200, message: "Data Deleted Successfully !"})
      }
    } catch (error) {
      console.log(error)
    }
  },
  add_Group_Medical_Plan_rates: async (req, res) => {
    try {
      let payload = req.body
      let conut = 0
      for (let i = 0; i < payload?.length; i++) {
        let payloadObj = {}
        let locationArray = payload[i].locationArray
        locationArray = locationArray?.map((obj) => mongoose.Types.ObjectId(obj?.value))
        payloadObj["locationArray"] = locationArray
        payloadObj["policy_name"] = payload[i]?.policy_name
        payloadObj["planCatagoryId"] = payload[i]?.planCatagoryId
        payloadObj["group_medical_plan_id"] = payload[i]?.medical_plan_id
        payloadObj["network"] = payload[i]?.network
        payloadObj["TPA"] = payload[i]?.TPA

        let data = await medicalPlanRatesModel.create(payloadObj)
        if (data) {
          conut = conut + 1
        }

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
  get_group_medical_rates: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      
      const id = req.query.id;

      let aggregate = {
        $facet: {
          count: [
            {
              $match: {
                group_medical_plan_id: mongoose.Types.ObjectId(id),
              },
            },
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {
                group_medical_plan_id: mongoose.Types.ObjectId(id),
              },
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
      const result = await medicalPlanRatesModel.aggregate([aggregate])
   
      res.json({
        status: 200,
        message: "Data Found",
        data: result,
        total: result[0]?.count[0]?.total,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  get_group_med_single_rate: async (req, res) => {
    try {
      const id = req.query.id;
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkif", id)
      const MedicalPlanRates_data = await medicalPlanRatesModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        // {
        //   $lookup: {
        //     from: "plan_categories",
        //     localField: "planCatagoryId",
        //     foreignField: "_id",
        //     as: "planCatagoryData"
        //   }
        // },
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
  update_group_medicalplan_rates: async (req, res) => {
    try {
      const id = req.query.id;
      let payload = req.body;
      console.log("payload,,,,,,,,,,,,,,,", payload)
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk", id)
      let payloadObj = {}
      let locationArray = payload.locationArray
      locationArray = locationArray?.map((obj) => mongoose.Types.ObjectId(obj?.value))
      payloadObj["locationArray"] = locationArray
      payloadObj["policy_name"] = payload?.policy_name
      payloadObj["planCatagoryId"] = payload?.planCatagoryId
      payloadObj["network"] = payload?.network
      payloadObj["TPA"] = payload?.TPA

      let result = await medicalPlanRatesModel.findByIdAndUpdate(id, payloadObj, { new: true })
      console.log(result,">>>>>>>>>>>>>>>>>>>>>>>result")
      if (!result) {
        return res.json({ status: 400, message: "Failed" });
      } else {
        return res.json({
          status: 200,
          message: "Updated Successfully!",
          data: result,
        });
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

      let result = await medicalPlanRatesModel.findByIdAndUpdate(id, { status: payload.status }, { new: true })
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
  addManuallyGroupMedicalMember: async (req, res) => {
    try {
      let payload = req.body
      let user = req.user;
      let requestPaload = {}
      if (user) {
        requestPaload['user_id'] = mongoose.Types.ObjectId(user?._id)
      }
      if (payload?.planCompanyId) {
        requestPaload['company_id'] = mongoose.Types.ObjectId(payload?.planCompanyId)
      }
      if (payload?.planId) {
        requestPaload['plan_id'] = mongoose.Types.ObjectId(payload?.planId)
      }
      // if (payload?.TPAId) {
      //   requestPaload['tpa'] = mongoose.Types.ObjectId(payload?.TPAId)
      // }
      // if (payload?.networkListId) {
      //   requestPaload['network'] = mongoose.Types.ObjectId(payload?.networkListId)
      // }
      let requestedData =    await memberRequestModels.findOneAndUpdate(requestPaload,requestPaload, { upsert: true, returnOriginal: false })
    let memberRequestId = requestedData?._id
    payload["HRUserId"] = user._id
    payload["memberRequestId"] = memberRequestId;
    let SINumber = await groupMedicalModels.aggregate([
      {
        $match: {
          planId: mongoose.Types.ObjectId(payload?.planId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    SINumber = SINumber[0]?.SINumber ? +SINumber[0]?.SINumber + 1 : 0;
    payload["SINumber"] = SINumber;

      const result = await groupMedicalModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Added Successfully !" ,data:result});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Added ",data:{} });
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  approvedGroupMedicalMember: async (req, res) => {
    try {
      let payload = req.body
      let leadId = payload?.leadId
      let count = 0
      let result
      let currentTime = new Date()
      for(let i = 0; i < leadId?.length; i++) {
        let oldLeadData = await groupMedicalModels.findById(leadId[i])
        if(oldLeadData?.leadStatus == "In Progress"){
         result = await groupMedicalModels.findByIdAndUpdate(leadId[i],{leadStatus:"Approved",approvedDate:currentTime});

        }
        else if (oldLeadData?.leadStatus == "Approved"){
          result = await groupMedicalModels.findByIdAndUpdate(leadId[i],{leadStatus:"Delete",deleteDate:currentTime});

        }
        count++

      }
      if (count) {
        return res.status(200).json({ status: 201, message: "Data Update Successfully !" ,});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Update ",data:{} });
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  getActiveMedicalGroupPlan: async (req, res) => {
    try {
    
      let result 
         result = await GroupMedicalPlan.aggregate([
          {
            $match:{
              status:1
            }
          },
          {
            $project:{
              plan_name:1
            }
          }
         ]);
      
      if (result.length) {
        return res.status(200).json({ status: 201, message: "Data Found Successfully !" ,data:result});
      } 
        return res.status(404).json({ status: 404, message: "Data Not Found ",data:[] });
      
    } catch (error) {
      console.log("Error", error)
    }
  },
  getRatesOfPlan: async (req, res) => {
    try {
      const planid = req.query.planId;
      const planData = await GroupMedicalPlan.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(planid),
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id"
          }
        },
        {
          $project: {
            _id: 1,
            plan_name: 1,
            'company_id.company_name': 1,
            'company_id._id': 1
          }
        }
]);
      
      const result = await medicalPlanRatesModel.aggregate([
        {
          $match: {
            group_medical_plan_id: mongoose.Types.ObjectId(planid),
          },
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
          $project: {
            TPAs: 1,
          }
        }
      ]);
      if (result.length) {
        return res.json({
          status: 200,
          message: "Data Found",
          data: result,
          company: planData
        });
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  },
  getNetworksOfPlanratebyTPA: async (req, res) => {
    try {
      const tpaid = req.query.tpaid;
      const planid = req.query.planid;
      console.log("tpaid : ", tpaid, "planid : ", planid)
      const result = await medicalPlanRatesModel.aggregate([
        {
          $match: {
            group_medical_plan_id: mongoose.Types.ObjectId(planid),
            TPA: mongoose.Types.ObjectId(tpaid)
          },
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
          $project: {
            networks: 1,
            policy_name: 1
          }
        }
      ]);
      if (result.length) {
        return res.json({
          status: 200,
          message: "Data Found",
          data: result,
        });
      }
    } catch (error) {

      console.log("Error: ", error)
    }
  },
  deleteSingleLeadBYId: async (req, res) => {
    try {
      let id = req.query?.id;
      const result = await groupMedicalModels.findByIdAndDelete(id);
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,",result)
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Delete Successfully !"});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Delete ",});
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  tranceferGroupMedicalLaed: async (req, res) => {
    try {
      console.log("api calling >>>>>>>>>>>>>>>>>>>>>>>>>.")
      let leadId = req.body?.leadId;
      let tranceferTo = req.query?.tranceferTo
      let data
      let count = 0;
      if(tranceferTo == "memberApproval"){
        for(let i = 0; i <leadId.length; i++) {
        data = await groupMedicalModels.findByIdAndUpdate(leadId[i],{userleadStatus:"newMemverApproval",sentToMembarDate:new Date()});
        count++

      }}
      else if(tranceferTo == "JDV"){
        for(let i = 0; i <leadId.length; i++) {
          let memberData = await groupMedicalModels.findById(leadId[i])
          if(memberData?.userleadStatus == "newMemverApproval"){
        data = await groupMedicalModels.findByIdAndUpdate(leadId[i],{userleadStatus:"newJdv",sentToJdvDate:new Date()});
          }
          else if(memberData?.userleadStatus == "deleteMemverApproval"){
        data = await groupMedicalModels.findByIdAndUpdate(leadId[i],{userleadStatus:"deleteJdv",sentToJdvDate:new Date()});

          }
        count++

      }}
      else if(tranceferTo == "Delete"){
        for(let i = 0; i <leadId.length; i++) {
        data = await groupMedicalModels.findByIdAndUpdate(leadId[i],{userleadStatus:"deleteMemverApproval",sentToMembarDate:new Date(),requestType:"DeLete Request"});
        count++

      }}
      
      if (count) {
        return res.status(200).json({ status: 200, message: "Data update Successfully !"});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not update ",});
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  groupMedicalHrLeadToExcel: async (req, res) => {
    try {
      const data = await groupMedicalModels.aggregate([
        {
          $match: {
            memberRequestId:mongoose.Types.ObjectId(req.query?.id),
            userleadStatus: "sentToJdv",
            leadIsActive:true,
            leadStatus:"In Progress"

          }
        },
      ]);
      if (data) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });
        
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  updateMedicalQoutesPageStatus: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body;
      let data  = await medicalQoutesPageModels.findByIdAndUpdate(id,{status:payload?.status})
     
      if (data) {
        return res.status(200).json({ status: 200, message: "Data update Successfully !"});
      } 
        return res.status(404).json({ status: 404, message: "Data Not update ",});
    } catch (error) {
      console.log("Error", error)
    }
  },
  addGroupmedicalCategory: async (req, res) => {
    try {
      let payload = req.body
      
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      const result = await groupmedicalCategory.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data saved Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Saved ", });
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  getMedicalQoutesPageStatus: async (req, res) => {
    try {
      let id = req.query?.id;
      let payload = req.body;
      let data  = await medicalQoutesPageModels.find()
     
      if (data.length) {
        return res.status(200).json({ status: 200, message: "Data update Successfully !",data:data});
      } 
        return res.status(404).json({ status: 404, message: "Data Not update ",data:[]});
    } catch (error) {
      console.log("Error", error)
    }
  },
  getGroupMedicalCategories: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupmedicalCategory.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $project: {
                  category_name: 1,
                  status: 1,
                  locationData:1
                  // 'locationData.location_name': 1,
                  // 'locationData._id': 1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalCategoryById: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupmedicalCategory.aggregate([
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
            as: "locationData"
          }
        },
        {
          $project: {
            category_name: 1,
            locationData:1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  updategroupmedicalCategory: async (req, res) => {
    try {
      const id = req.query?.id;
      let payload = req.body;
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.category_name) {
        payload['category_name'] = payload.category_name
      }
      if (payload.status == 1 || payload.status == 0) {
        payload['status'] = payload.status
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      
      const result = await groupmedicalCategory.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated "});
      }
    } catch (error) {
    }
  },
  getGroupMedicalcategory: async (req, res) => {
    try {
      const result = await groupmedicalCategory.aggregate([
        {
          $match: {
            status:1
          }
        }
      ])
      if (result) {
        return res.status(200).json({status:200,message:'Data Found',data:result})
      } else {
        return res.status(400).json({status:400,message:'Something Went wrong', data:{}})
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateGroupMedcategoryStatus: async (req, res) => {
    try {
      const id = req.query?.id;
      const status = req.query?.status;
      let data = await groupmedicalCategory.findByIdAndUpdate(id, { status: status })
      if (data) {
        return res.status(200).json({ status: 200, message: "Data update Successfully !" });
      }
      return res.status(404).json({ status: 404, message: "Data Not update ", });
    } catch (error) {
      console.log("Error", error)
    }
  },
  AddGroupMedicalClaimType: async (req, res) => {
    try {
      let payload = req.body
      console.log("Claim Type payload>>>>>>>>>>>>>>", payload)
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.claim_type_name) {
        payload['Claim_type_name'] = payload.claim_type_name
      }
      const result = await groupMedicalClaimType.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Saved ", });
      }
    } catch (error) {
    console.log(error)
    }
  },
  getGroupMedicalClaimType: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupMedicalClaimType.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $project: {
                  claim_type_name: 1,
                  status: 1,
                  locationData:1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalClaimTypeById: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalClaimType.aggregate([
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
            as: "locationData"
          }
        },
        {
          $project: {
            claim_type_name: 1,
            locationData:1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  UpdateGroupMedicalCalimType: async (req, res) => {
    try {
      const id = req.query?.id;
      let payload = req.body;
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.claim_type_name) {
        payload['claim_type_name'] = payload.claim_type_name
      }
      if (payload.status == 1 || payload.status == 0) {
        payload['status'] = payload.status
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await groupMedicalClaimType.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated "});
      }
    } catch (error) {
    }
  },
  AddGroupMedicalClaimStatus: async (req, res) => {
    try {
      let payload = req.body;
      if(payload.location){
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if(payload.status_name){
        payload['status_name'] = payload.status_name
      }
      const result = await groupMedicalClaimStatus.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data Not Saved "});
    } catch (error) {
    }
  },
  GetGroupMedicalClaimStatus: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupMedicalClaimStatus.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $project: {
                  status_name: 1,
                  status: 1,
                  locationData:1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
    console.log(error)
    }
  },
  getActiveClaimStatus: async (req, res) => {
    try {
      const result = await groupMedicalClaimStatus.aggregate([
        {
          $match: {
            status:1
          }
        }
      ])
      if (result) {
        return res.status(200).json({status:200,message:"Data Found Successfully",data:result})
      } else {  
        return res.status(400).json({status:400,message:"Data Not Found"})
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimStatusbyId: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalClaimStatus.aggregate([
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
            as: "locationData"
          }
        },
        {
          $project: {
            status_name: 1,
            locationData:1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateClaimSatus: async (req, res) => {
    try {
      const id = req.query?.id;
      let payload = req.body;
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.status_name) {
        payload['status_name'] = payload.status_name
      }
      if (payload.status == 1 || payload.status == 0) {
        payload['status'] = payload.status
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await groupMedicalClaimStatus.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Status Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated "});
      }
    } catch (error) {
      console.log(error)
    }
  },
  addGroupMedicalClaim: async (req, res) => {
    try {
      let payload = req.body;
      let user = req.user
      let result
     let groupMedicalLeadId = payload.memberId
     let groupMedicalLeaddata = await groupMedicalModels.findById(groupMedicalLeadId)
     let planId = groupMedicalLeaddata?.planId
     payload["planId"] = planId
    //  let memberRequestId = groupMedicalLeaddata?.memberRequestId
    //  let memberRequestData = await memberRequestModels.findByIdAndUpdate(memberRequestId,{claimRequest:true})
    //  payload["memberRequestId"] = memberRequestId
     payload["HRID"] = user?._id
      let prevClaimNumber = await groupMedicalClaimModels.aggregate([
        {
          '$sort': {
              'createdAt': -1
          }
      }, {
          '$limit': 1
      }
      ])
      prevClaimNumber = prevClaimNumber[0]?.claimNymber
      let newClaimnumber = await genrateClaimNumber(prevClaimNumber)
      payload["claimNymber"] = newClaimnumber
     result = await groupMedicalClaimModels.create( payload);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {  
        return res.status(404).json({ status: 404, message: "Data Not Updated "});
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimgroupmedicalMemberRequets: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
        console.log(req.query.company,"><><><")

      const matchobj = {claimRequest:true}
      if (req.query?.company) {
        matchobj['company_id'] = mongoose.Types.ObjectId(req.query?.company)
      }
      let aggregate = [
        {
          $match: matchobj,
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
            from: "admins",
            localField: "user_id",
            foreignField: "_id",
            as: "HRUser"
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id"
          }
        },
        {
          $lookup: {
            from: "group_medical_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "plan_id"
          }
        },
        {
          $lookup: {
            from: "medical_tpas",
            localField: "tpa",
            foreignField: "_id",
            as: "tpa"
          }
        },
        {
          $lookup: {
            from: "medical_networks",
            localField: "network",
            foreignField: "_id",
            as: "network"
          }
        },
        {
          $project: {
            _id: 1,
            'company_id.company_name': 1,
            'plan_id.plan_name': 1,
            'HRUser.name': 1,
            'tpa.name': 1,
            'network.name': 1,
            'file': 1,
            'status': 1,
          }
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });

      let result = await memberRequestModels.aggregate(aggregate);

      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result[0]?.data, total: result[0] ?.totalCount[0]?.total});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:[],total:0});
      }
    } catch (error) {
      console.log(error)
    }
  },
  getAdminHrUserCliams: async (req, res) => {
    try {
      let user = req.user;
      let query = req.query;
      let limit = +query?.limit;
      let page = +query?.page;
      let leadType = query?.leadType;
      // console.log("leadtype>>>>>>>", query)
      let companyId = query?.company
      let filterEmail = query?.email
      let filterTPA = query?.tpa
      let filterNetwork = query?.network
      let policyNumberFilter = +query?.policyNumber
  
      let matchObj = {claimStatus:"Pending"}
      let memberId = req.query.memberId
      if(memberId){
        matchObj["memberRequestId"] = mongoose.Types.ObjectId(memberId)
      }
      // if(!companyId && !query.email && !filterTPA && !policyNumberFilter && !filterNetwork){
      //   return res
      //   .status(404)
      //   .json({
      //     status: 404,
      //     message: "Data Not Found ",
      //     data: [],
      //     total: 0,
      //   });
      // }
      
      console.log("matchObj.........................",matchObj)
      let leadDetails;
      let aggregate = [
        {
          $facet: {
            count: [
              {
                $match: matchObj,
              },
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: matchObj,
              },
              {
                $lookup: {
                  from: "admins",
                  localField: "HRUserId",
                  foreignField: "_id",
                  as: "HRUser"
                }
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
        },
      ];
      leadDetails = await groupMedicalModels.aggregate(aggregate);
      let total = leadDetails[0]?.count[0]?.total;
      let data = leadDetails[0]?.data;
      if (data.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: data,
            total: total,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          data: [],
          total: total,
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAllPrincepleOfHr: async (req, res) => {
    try {
     let user = req.user;
     let userPlanId = user?.groupMedicalPlanId?user?.groupMedicalPlanId:[]
      let matchObj = {leadStatus:{
        $ne:"Delete"
      },
      relation:"Employee"
    }
      if(user){
        // matchObj["HRUserId"] = mongoose.Types.ObjectId(user?._id)
        matchObj["$or"] = [{HRUserId:mongoose.Types.ObjectId(user?._id)},{
          planId:{$in:userPlanId}
        }]
      }
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk",matchObj)
    let userData
    userData = await groupMedicalModels.aggregate([
      {
        $match:matchObj
      },
      {
        $project:{
          firstName:1,
          employeeNumber:1
        }
      }
    ]);
     
      if (userData.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: userData,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          data: [],
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAllmemberOfHr: async (req, res) => {
    try {
   let user = req.user
     let userPlanId = user?.groupMedicalPlanId?user?.groupMedicalPlanId:[]
      let matchObj = {leadStatus:{
        $ne:"Delete"
      },
      // relation:{
      //   $ne:"Employee"
      // }

    }
      let employeeId = req.query?.employeeId
      if(employeeId){
        matchObj["employeeNumber"] = employeeId
      }else{
        return res
        .status(400)
        .json({
          status: 400,
          message: "Provide a valid Employee ID",
          data: [],
        });
      }
      if(user){
        // matchObj["HRUserId"] = mongoose.Types.ObjectId(user?._id)
        matchObj["$or"] = [{HRUserId:mongoose.Types.ObjectId(user?._id)},{
          planId:{$in:userPlanId}
        }]
      
      }
      if(employeeId){
        matchObj["employeeNumber"] = employeeId
      }
    let userData
    userData = await groupMedicalModels.aggregate([
      {
        $match:matchObj
      },
      {
        $project:{
          firstName:1,
          relation:1,
        }
      }
    ]);
     
      if (userData.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: userData,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          data: [],
        });
    } catch (error) {
      console.log(error);
    }
  },
  getRelationOfUser: async (req, res) => {
    try {
      let id = req.query?.id
      let matchObj = {
    }
      if(id){
        matchObj["_id"] = mongoose.Types.ObjectId(id)
      }
      
    let userData
    userData = await groupMedicalModels.aggregate([
      {
        $match:matchObj
      },
      {
        $project:{
          relation:1
        }
      }
    ]);
     
      if (userData.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: userData,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          data: [],
        });
    } catch (error) {
      console.log(error);
    }
  },
  getClaimuserInAdmin: async (req, res) => {
    try {
      let query = req.query
      const page = +query.page;
      const limit = +query.limit;
      let email = query.email
      let claim_status = query.claimstatus
      let planId = query.plan
      const matchobj = {}
      let planObj = {}
      if (claim_status) {
        planObj['claimStatus'] = claim_status
      }
      if (planId) {
        planObj['planId'] = mongoose.Types.ObjectId(planId)
      }
      if (email) {
        matchobj['memberData.email'] = {
          $regex: email,
          $options: "i"
        }
      }
      let aggregate = [
        {
          $match: planObj
        },

      ]
      let facet = {};
      facet["totalCount"] = [
        {
          $match: matchobj
        },
        {
          $count: "total",
        },
      ];
      facet["data"] = [
        {
          '$lookup': {
            'from': 'group_medical_leads',
            'localField': 'memberId',
            'foreignField': '_id',
            'as': 'memberData'
          }
        },
        {
          $match: matchobj
        },
        {
          $lookup: {
            from: "admins",
            localField: "HRID",
            foreignField: "_id",
            as: "HRUser"
          }
        },

        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });

      let result = await groupMedicalClaimModels.aggregate(aggregate);
      console.log(result);
      if (result.length) {
        return res.status(200).json(
          {
            status: 200,
            data: result[0] ? result[0]?.data : [],
            total: result[0]?.totalCount[0]?.total,
            message: "Data Found Successfully"
          }
        )
      }
      return res.status(404).json(
        {
          status: 404,
          data: [],
          total: 0,
          message: "Data Not Found "
        }
      )

    } catch (error) {
      console.log(error)
    }
  },
  createProducerLeads: async (req, res) => {
    try {
      let payload = req.body;
      let lob = payload.lob
      let producerId = payload.producerId
      let user = req.user
      let result
      let newLeadArray = []
      let linkArray = []
      let payloadObj = { name: payload?.name }
      for (let i = 0; i < lob.length; i++) {
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
        if(!producerId){
          payloadObj["producerId"] = user?._id
        }else{
          payloadObj["producerId"] = producerId

        }

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
      console.log("kkkkkkkkkkkkkkkkkk",newLeadArray)
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
  getActiveGroupMedicalClaimType: async (req, res) => {
    try {
      const result = await groupMedicalClaimType.aggregate([
        {
          $match: {
            status: 1
          }
        },
        {
          $project: {
            claim_type_name: 1,
            _id: 1
          }
        }
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalClaimDescriptioins: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupMedicalClaimDescription.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $lookup: {
                  from: "group_medical_claim_types",
                  localField: "claim_type_id",
                  foreignField: "_id",
                  as: "claim_type_id"
                }
              },
              {
                $project: {
                  claim_description: 1,
                  claim_implication: 1,
                  status: 1,
                  locationData:1,
                  'claim_type_id.claim_type_name': 1,
                  'claim_type_id._id': 1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log(error)
    }
  },
  AddGroupMedicalClaimDescription: async (req, res) => {
    try {
      let payload = req.body;
      if(payload.location){
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.claim_description){
        payload['claim_description'] = payload.claim_description
      }
      if (payload.claim_implication){
        payload['claim_implication'] = payload.claim_implication
      }
      if (payload.claim_type_id) {
        payload['claim_type_id'] = payload.claim_type_id
      }
      const result = await groupMedicalClaimDescription.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !", data: result });
      }
      return res.status(404).json({ status: 404, message: "Data Not Saved "});
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalClaimDescriptioins: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupMedicalClaimDescription.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $lookup: {
                  from: "group_medical_claim_types",
                  localField: "claim_type_id",
                  foreignField: "_id",
                  as: "claim_type_id"
                }
              },
              {
                $project: {
                  claim_description: 1,
                  claim_implication: 1,
                  status: 1,
                  locationData:1,
                  'claim_type_id.claim_type_name': 1,
                  'claim_type_id._id': 1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ",});
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimDescriptionById: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalClaimDescription.aggregate([
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
            as: "locationData"
          }
        },
        {
          $lookup: {
            from: "group_medical_claim_types",
            localField: "claim_type_id",
            foreignField: "_id",
            as: "claim_type_id"
          }
        },
        {
          $project: {
            claim_description: 1,
            claim_implication: 1,
            status: 1,
            locationData: 1,
            'claim_type_id.status_name': 1,
            'claim_type_id._id': 1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateGroupMedicalClaimDescription: async (req, res) => {
    try {
      const id = req.query?.id;
      const payload = req.body;
      if (payload.location) {
        payload['location'] = payload.location?.map((item) => mongoose.Types.ObjectId(item))
      }
      if (payload.claim_description) {
        payload['claim_description'] = payload.claim_description
      }
      if (payload.claim_implication) {
        payload['claim_implication'] = payload.claim_implication
      }
      if (payload.claim_type_id) {
        payload['claim_type_id'] = payload.claim_type_id
      }
      if (payload.status == 1 || payload.status == 0) {
        payload['status'] = payload.status
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await groupMedicalClaimDescription.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  AddClaimProcedure: async (req, res)=>{
    try {
      let payload = req.body;
      console.log(payload, "payload")
      let result
      if (payload.length) {
        for (let i = 0; i < payload.length; i++){
      let payloadobj = {}
        if (payload[i].description) {
          payloadobj['procedure_description'] = payload[i].description
        }
        if (payload[i].heading) {
            payloadobj['heading'] = payload[i].heading
          }
        if (payload[i].company_name) {
            payloadobj['insurance_company'] = payload[i].company_name
        }
          if (payload[i].link) {
            payloadobj['link'] = payload[i].link
          }
          result = await groupMedicalClaimProcedure.create(payloadobj);
          
        }
        // return false;
        if (result) {
          return res.status(201).json({ status: 201, message: "Data Saved Successfully !", data: result });
        }
      }
        return res.status(400).json({ status:400, message: "Something went wrong !", data: {} });
  } catch (error) {
    console.log(error)
  }
  },
  getClaimProcedure: async (req, res) => {
    try {
      const result = await groupMedicalClaimProcedure.aggregate([
        {
          $group: {
            _id: '$insurance_company',
            documents: {
              $push: '$$ROOT'
            }
          }
        },
        {
          $lookup: {
            from: 'companies',
            localField: '_id',
            foreignField: '_id',
            as:'companydata'
          }
        },
        {
          $unwind: {
            path:'$companydata'
          }
        },
        {
          $project: {
            'companydata.company_name': 1,
            'documents':1
          }
        }
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimProcedureById: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalClaimProcedure.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $project: {
            _id: 1,
            procedure_description: 1,
            file: 1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateClaimProcedure: async (req, res) => {
    try {
      const reqbody = req.body
      const id = req.query?.id;
      let payload = {}
    
      if (reqbody.claim_procedure){
        payload['procedure_description'] = reqbody.claim_procedure
      }
      if (reqbody.link) {
        payload['link'] = reqbody.link
      }
      if (reqbody.heading) {
        payload['heading'] = reqbody.heading
      }
      const result = await groupMedicalClaimProcedure.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  addUsefulLink: async (req, res) => {
    try {
      const reqbody = req.body
      console.log(reqbody, "reqbody")
      console.log(req.file," ?>>>>file")
      let payload = {}
      if (req.file) {
        payload['file'] = req.file.filename
      }
      if (reqbody.hospital_name) {
        payload['hospital_name'] = reqbody.hospital_name
      }
      if (reqbody.website) {
        payload['website'] = reqbody.website
      }
      if (reqbody.direction) {
        payload['direction'] = reqbody.direction
      }
      if (reqbody.address) {
        payload['address'] = reqbody.address
      }
      if (reqbody.contact) {
        payload['call'] = reqbody.contact
      }
      if (reqbody.location) {
        const locs = reqbody.location?.split(",")
        payload['location'] = locs.map((val) => mongoose.Types.ObjectId(val))
      }
      console.log("payload>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", payload)
      const result = await groupMedicalUsefulLink.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !", data: result });
      }
      return res.status(400).json({ status: 400, message: "Something went wrong !", data: {} });
    } catch (error) {
      console.log(error)
    }
  },
  getUsefulLink: async (req, res) => {
    try {
      const page = +req.query.page;
      const limit = +req.query.limit;
      const result = await groupMedicalUsefulLink.aggregate([
        {
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              {
                $lookup: {
                  from: "locations",
                  localField: "location",
                  foreignField: "_id",
                  as: "locationData"
                }
              },
              {
                $project: {
                  hospital_name: 1,
                  website: 1,
                  direction: 1,
                  contact: 1,
                  address: 1,
                  call:1,
                  status: 1,
                  locationData: 1,
                  file: 1
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
        },
      ]);
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result[0]?.data, count: result[0]?.count[0]?.total });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getUsefulLinkbyId: async (req, res) => {
    try {
      const id = req.query?.id;
      const result = await groupMedicalUsefulLink.aggregate([
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
            as: "locationData"
          }
        },
        {
          $project: {
            hospital_name: 1,
            website: 1,
            direction: 1,
            contact: 1,
            address: 1,
            call:1,
            status: 1,
            locationData: 1,
            file: 1
          }
        }
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateUsefulLink: async (req, res) => {
    try {
      const reqbody = req.body
      // console.log("reqbody><><>>>>",reqbody)
      const id = req.query?.id;
      let payload = {}
      if (req.file) {
        payload['file'] = req.file.filename
      }
      if (reqbody.hospital_name) {
        payload['hospital_name'] = reqbody.hospital_name
      }
      if (reqbody.website) {
        payload['website'] = reqbody.website
      }
      if (reqbody.direction) {
        payload['direction'] = reqbody.direction
      }
      if (reqbody.address) {
        payload['address'] = reqbody.address
      }
      if (reqbody.contact) {
        payload['call'] = reqbody.contact
      }
      if (reqbody.location) {
        const locs = reqbody.location?.split(",")
        payload['location'] = locs?.map((val) => mongoose.Types.ObjectId(val))
      }
      if (reqbody.status == 1 || reqbody.status == 0) {
        payload['status'] = reqbody.status
      }
      if (!id) {
        return res.status(404).json({ status: 404, message: "ID is Required" });
      }
      const result = await groupMedicalUsefulLink.findByIdAndUpdate(id, payload, { new: true });
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Updated Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Updated " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimFromHr: async (req, res) => {
    try {
      let query = req.query
      console.log("query..................",query)
      const page = +query.page;
      const limit = +query.limit;
      let user = req.user
      let claimMemberId = query?.claimMemberId
      const matchobj = {}
      if(user){
        matchobj["HRID"] = mongoose.Types.ObjectId(user?._id)
      }
      console.log("..............................",matchobj)
     if(query?.claimType == "experience"){

     }
     else if(query?.claimType == "ratio"){

     }
      let aggregate = [
        {
          $match: matchobj,
        },
        {
          '$lookup': {
              'from': 'group_medical_leads', 
              'localField': 'memberId', 
              'foreignField': '_id', 
              'as': 'memberData'
          }
      },
       {
          '$unwind': {
              'path': '$memberData'
          }
      }
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
            from: "admins",
            localField: "HRID",
            foreignField: "_id",
            as: "HRUser"
          }
        },
       
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });

      let result = await groupMedicalClaimModels.aggregate(aggregate);

      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result[0]?.data, total: result[0] ?.totalCount[0]?.total});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:[],total:0});

      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateGroupMedicalClaim: async (req, res) => {
    try {
      const id = req.query.id 
      const payloadData = req.body
      console.log(payloadData,"payload data")
      let payload = {}
      if (payloadData.claim_status) {
        payload['claimStatus'] = payloadData?.claim_status
      }
      if (payloadData.remark) {
        payload['remark'] = payloadData?.remark
      }
      if (payloadData?.paid_amount) {
        payload['paidAmount'] = payloadData?.paid_amount
      }
      payload['settledDate'] = Date.now()
      const result = await groupMedicalClaimModels.findByIdAndUpdate(id, payload, { new: true })
      if (result) {
        return res.status(200).json({status:200,message:"Updated Successfully"})
      } else {
        return res.status(400).json({status:400,message:"Something went wrong"})
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimStatusFromHr: async (req, res) => {
    try {
      let query = req.query
      console.log("query..................",query)
      const page = +query.page;
      const limit = +query.limit;
      let user = req.user
      let claimMemberId = query?.claimMemberId
      const matchobj = {}
      let statusMatchObj = {}

      if(user){
        matchobj["HRID"] = user?._id
      }
      if(query.fromDate && query.toDate){
        matchobj["$and"] = [{createdAt:{$gte:query.fromDate}},{createdAt:{$lte:query.toDate}}]

      }
      
      console.log("................................",matchobj)
    
      if(query?.employeeId ){
        statusMatchObj["memberData.employeeNumber"] = query?.employeeId 
      }
      if(query?.memberId ){
        statusMatchObj["memberData._id"] = mongoose.Types.ObjectId(query?.memberId) 
      }
      if(query?.claimStatus ){
        statusMatchObj["claimStatus"] = query?.claimStatus 
      }

      let aggregate = [
        {
          $match: matchobj,
        },
        {
          '$lookup': {
              'from': 'group_medical_leads', 
              'localField': 'memberId', 
              'foreignField': '_id', 
              'as': 'memberData'
          }
      }, {
          '$unwind': {
              'path': '$memberData'
          }
      },
      {
        $match:statusMatchObj
      }
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
            from: "admins",
            localField: "HRID",
            foreignField: "_id",
            as: "HRUser"
          }
        },
       
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      facet["totalClaimAmount"] = [
      
        {
          $group: {
            _id: null,
            totalFinalPrice: {
              $sum: "$claimAmountFromHr",
            },
          },
        },
      ];
    
      facet["totalPaidAmount"] = [
       
        {
          $group: {
            _id: null,
            totalFinalPrice: {
              $sum: "$paidAmount",
            },
          },
        },
      ];
      aggregate.push({
        $facet: facet,
      });

      let result = await groupMedicalClaimModels.aggregate(aggregate);
      let allCount = result[0]
    let   paidAmount =allCount && allCount.totalPaidAmount && allCount.totalPaidAmount[0] ? allCount.totalPaidAmount[0].totalFinalPrice : 0
     let  cliamAmount = allCount && allCount.totalClaimAmount && allCount.totalClaimAmount[0] ? allCount.totalClaimAmount[0].totalFinalPrice : 0
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result[0]?.data, total: result[0] ?.totalCount[0]?.total,paidAmount:paidAmount,cliamAmount:cliamAmount});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:[],total:0});

      }
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalClaimById: async (req, res) => {
    try {
      const id = req.query.id
      console.log(id)
      const result = await groupMedicalClaimModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        },{
          $lookup: {
            from: 'group_medical_leads',
            localField: 'memberId',
            foreignField: '_id',
            as:'member_data'
          }
        }, {
          $unwind: {
            path:'$member_data'
          }
        }, {
          $project: {
            'member_data.firstName': 1,
            'member_data.middleName': 1,
            'member_data.lastnName': 1,
            relation: 1,
            employeeId: 1,
            claimAmountFromHr:1,
            claimDscription: 1,
            dateOfTreatment: 1,
            
          }
        }
      ])
      if (result) {
        return res.status(200).json({status:200,message:"success",data:result})
      }else{
        return res.status(400).json({status:400,message:"Something Went wrong ",data:{}})
      }
    } catch (error) {
      console.log(error)
    }
  },
  updateGroupMedicalClaimByHr: async(req, res) =>{
    try {
      const qry = req.query 
      const id = qry.id
      const reqbody = req.body

      let payload = {}
      if (reqbody.principleName) {
        payload['princepleId'] = reqbody.principleName
      }
      if (reqbody.member_name) {
        payload['memberId'] = reqbody.member_name
      }
      if (reqbody.relation) {
        payload['relation'] = reqbody.relation
      }
      if (reqbody.employeeId) {
        payload['employeeId'] = reqbody.employeeId
      }
      if (reqbody.claim_description) {
        payload['claimDscription'] =reqbody.claim_description
      }
      if (reqbody.claim_amount) {
        payload['claimAmountFromHr'] = reqbody.claim_amount
      }
      if (reqbody.dateOfTreatment) {
        payload['dateOfTreatment'] = reqbody.dateOfTreatment
      }
      const result = await groupMedicalClaimModels.findByIdAndUpdate(id, payload, { new: true })
      if (result) {
        return res.status(200).json({status:200,message:"Updated Successfully"})
      } else {
        return res.status(400).json({status:400,message:'Something Went wrong'})
      }
    } catch (error) {
      console.log(error)
    }
  },
  getClaimStatusSummary: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
        HRID : mongoose.Types.ObjectId(user?._id)
      }
      let facet = {}
    if(query.type == "Pending"){
      match["claimStatus"] = "Pending"
    }
    else if(query.type == "Partially"){
      match["claimStatus"] = "Partially Setteled"
    }
    else if(query.type == "fullySettled"){
      match["claimStatus"] = "Fully Setteled"
    }
    else if(query.type == "Declined"){
      match["claimStatus"] = "Declined"
    }
      
   
        facet["totalCount"] = [
          {
            $match: match,
          },
         
          {
            $count: "total",
          },
        ];
        facet["total"] = [
          {
            $match: { HRID : mongoose.Types.ObjectId(user?._id)}
          }
         ,
          {
            $count: "total",
          },
        ];
       
        facet["totalClaimAmount"] = [
          {
            $match: match,
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$claimAmountFromHr",
              },
            },
          },
        ];
      
        facet["totalPaidAmount"] = [
          {
            $match: match,
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$paidAmount",
              },
            },
          },
        ];
       
      
      console.log({ match });
      let aggregate = []
      // aggregate.push()

      aggregate.push({
        $facet: facet
      });
      let allCount = await groupMedicalCliamModels.aggregate(aggregate)
      allCount = allCount[0]
      console.log("allCount......................................",allCount)
      if (allCount && allCount.topAgent && allCount.topAgent[0])
      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
       let totalCount = allCount && allCount.totalCount && allCount.totalCount[0] ? allCount.totalCount[0].total : 0
       let total = allCount && allCount.total && allCount.total[0] ? allCount.total[0].total : 0
        
      
      let data = {
        totalCount,
        percentage:totalCount/total*100,
        paidAmount: allCount && allCount.totalPaidAmount && allCount.totalPaidAmount[0] ? allCount.totalPaidAmount[0].totalFinalPrice : 0,
        cliamAmount: allCount && allCount.totalClaimAmount && allCount.totalClaimAmount[0] ? allCount.totalClaimAmount[0].totalFinalPrice : 0,

      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  getActiveUseFullLink: async (req, res) => {
    try {
      
      const result = await groupMedicalUsefulLink.aggregate([
        {
          $match: {
            status: true,
          },
        },

        {
          $project: {
            hospital_name: 1,
            website: 1,
            direction: 1,
            contact: 1,
            address: 1,
            call: 1,
            status: 1,
            locationData: 1,
            file: 1,
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } 
        return res.status(404).json({ status: 404, message: "Data Not Found ", data: result });
    } catch (error) {
      console.log(error)
    }
  },
  getOrtherServiceFromHr: async (req, res) => {
    try {
      let query = req.query
      console.log("query..................",query)
      const page = +query.page;
      const limit = +query.limit;
      let user = req.user
      let claimMemberId = query?.claimMemberId
      let userTypeId = user?.usertype
      const matchobj = {}
      let userPlanId = user?.groupMedicalPlanId?user?.groupMedicalPlanId:[]

      if(userTypeId == "65eeb6c21d866055f9331460"){
        matchobj["employeeNumber"] = user?.employeeNumber
        matchobj["HRUserId"] = mongoose.Types.ObjectId(user?.hrId)
      }
      else  {
        // matchobj["HRUserId"] = mongoose.Types.ObjectId(user?._id)
        matchobj["$or"] = [{HRUserId:mongoose.Types.ObjectId(user?._id)},{
          planId:{$in:userPlanId}
        }]

      }
     if(query?.ortherServiceType == "report"){

     }
     else if(query?.ortherServiceType == "listReport"){

     }
      let aggregate = [
        {
          $match: matchobj,
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
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]
      aggregate.push({
        $facet: facet,
      });

      let result = await groupMedicalModels.aggregate(aggregate);

      if (result[0]?.data?.length) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: result[0]?.data, total: result[0] ?.totalCount[0]?.total});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:[],total:0});

      }
    } catch (error) {
      console.log(error)
    }
  },
  getmostCommonOversights: async (req, res) => {
    try {
      
        let data
        data = await groupMedicalClaimType.aggregate([
          {
            $match:{
              status:1
            }
          },
          {
            '$lookup': {
                'from': 'group_medical_claim_descriptions', 
                'localField': '_id', 
                'foreignField': 'claim_type_id', 
                'as': 'descriptions'
            }
        }, {
            '$unwind': {
                'path': '$descriptions'
            }
        },
        {
          $project:{
            claim_type_name:1,
            "descriptions.claim_description":1,
            "descriptions.claim_implication":1,
            _id:0

          }
        }
        ])
      if (data.length) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: data});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:data});

      }
    } catch (error) {
      console.log(error)
    }
  },
  getGroupMedicalPolicy: async (req, res) => {
    try {
      
        let data
        let user = req.user
      let userPlanId = user?.groupMedicalPlanId?user?.groupMedicalPlanId:[]
        let matchObj = {}
        if(user?._id){
          // matchObj["HRUserId"] = mongoose.Types.ObjectId(user._id)
          // matchObj["$or"] = [{HRUserId:mongoose.Types.ObjectId(user?._id)},{
          //   planId:{$in:userPlanId}
          // }]
          matchObj["_id"] = {
            $in:userPlanId
          }
        }
        data = await GroupMedicalPlan.aggregate([
          {
            $match:matchObj
          },
          {
            '$lookup': {
                'from': 'companies', 
                'localField': 'company_id', 
                'foreignField': '_id', 
                'as': 'companyData'
            }
        }, {
            '$lookup': {
                'from': 'group_medicla_plan_rates', 
                'localField': '_id', 
                'foreignField': 'group_medical_plan_id', 
                'as': 'policyData'
            }
        }, {
            '$unwind': {
                'path': '$policyData'
            }
        }, {
            '$lookup': {
                'from': 'medical_networks', 
                'localField': 'policyData.network', 
                'foreignField': '_id', 
                'as': 'networkData'
            }
        }, {
            '$lookup': {
                'from': 'medical_tpas', 
                'localField': 'policyData.TPA', 
                'foreignField': '_id', 
                'as': 'tpaData'
            }
        },
        {
          $project:{
            plan_name:1,
            companyData:1,
            "policyData.policy_name":1,
            "policyData.planCatagoryId":1,
            "networkData.name":1,
            "tpaData.name":1,
            documents:1
          }
        }
        ])
      if (data.length) {
        return res.status(200).json({ status: 200, message: "Data Found  !", data: data});
      } 
        return res.status(404).json({ status: 404, message: "Data Not Found  !" ,data:data});
    } catch (error) {
      console.log(error)
    }
  },
  getActiveClaimProcedure: async (req, res) => {
    try {
      let companyId = mongoose.Types.ObjectId("64f1d66f9a434f5bc41778e2")
      const result = await groupMedicalClaimProcedure.aggregate(
        [
          {
            $match:{
              insurance_company:companyId
            }
          },
          {
            $project:{
              procedure_description:1,
              heading:1,
              link:1
            }
          }
        ]
      );
      if (result) {
        return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: result });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found ", });
      }
    } catch (error) {
      console.log(error)
    }
  },
  addManuallyGroupMedicalMemberBYAdmin: async (req, res) => {
    try {
      let payload = req.body
      let user = req.user;
      let requestPaload = {}
      if (user) {
        requestPaload['user_id'] = mongoose.Types.ObjectId(user?._id)
      }
      if (payload?.planCompanyId) {
        requestPaload['company_id'] = mongoose.Types.ObjectId(payload?.planCompanyId)
      }
      if (payload?.planId) {
        requestPaload['plan_id'] = mongoose.Types.ObjectId(payload?.planId)
      }
      // if (payload?.TPAId) {
      //   requestPaload['tpa'] = mongoose.Types.ObjectId(payload?.TPAId)
      // }
      // if (payload?.networkListId) {
      //   requestPaload['network'] = mongoose.Types.ObjectId(payload?.networkListId)
      // }
      let requestedData =    await memberRequestModels.findOneAndUpdate(requestPaload,requestPaload, { upsert: true, returnOriginal: false })
    let memberRequestId = requestedData?._id
    payload["HRUserId"] = user._id
    payload["memberRequestId"] = memberRequestId
    payload["leadStatus"] = "In Progress"
     payload["userleadStatus"] = "newJdv"
     payload["sentToJdvDate"] = new Date()
     let SINumber = await groupMedicalModels.aggregate([
      {
        $match: {
          planId: mongoose.Types.ObjectId(payload?.planId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    SINumber = SINumber[0]?.SINumber ? +SINumber[0]?.SINumber + 1 : 0;
    payload["SINumber"] = SINumber;
      const result = await groupMedicalModels.create(payload);
      if (result) {
        return res.status(201).json({ status: 201, message: "Data Added Successfully !" ,data:result});
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Added ",data:{} });
      }
    } catch (error) {
      console.log("Error", error)
    }
  },
  createGroupMedicalHR:async (req,res)=>{
    try {
      let payload = req.body;
      let planId = payload?.planId;
      let userDetails = payload.userDetails;
      let hrId = req?.user?._id;
      let planDetails = await GroupMedicalPlan.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(planId),
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
      ]);
      let location = [];
      let locationArray = planDetails[0]?.locations;
      for (let i = 0; i < locationArray.length; i++) {
        location.push({
          loc_id: locationArray[i]._id,
          loc_name: locationArray[i]?.location_name,
        });
      }
      let count = 0;
      for (let i = 0; i < userDetails.length; i++) {
        let payloadObj = {
          hrId: hrId,
          name: userDetails[i].name,
          email: userDetails[i].email,
          mobile: userDetails[i].mobile,
          employeeNumber: userDetails[i].employeeNumber,
          groupMedicalPlanId: [mongoose.Types.ObjectId(planId)],
          usertype: "65f29f6aaa6b0eb46f478907",
          location: location,
          line_of_business: [
            {
              lob_id: "658bf04ed4c9b13ffb6ddb8a",
              lob_name: "Group Medical",
            },
          ],
        };
        let customerData;
        customerData = await Admin.find({ email: payloadObj.email });
        console.log("..................................", {
          payloadObj,
          customerData,
        });
        if (!customerData.length) {
          let password = Math.round(Math.random() * 1000000);
          password = password?.toString();
          payloadObj["password"] = md5(password);
          customerData = await Admin.create(payloadObj);
          // let emailPayload = {
          //   email: payloadObj.email,
          //   text: `Dear ${payloadObj.name},
          //         Your password for LMP has been created as per your request. Here are your login details:
          //         Email: ${payloadObj.email}
          //         Password: ${password}
          //         Please remember to keep your password confidential. We recommend changing it upon login for better security`,
          //   subject: "Your Password for LMP",
          // };
          // sendEmail(emailPayload);
          let emaildata = {}
          let emailType = 'Update Password'
          await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${emailType}`, requestOptions)
            .then(data => {
              if (data.message == 'Email template fetched') {
                emaildata = data.data
                emaildata.body = `<p>Dear ${payloadObj.name},
                                Your password for LMP has been created as per your request.Here are your login details:
                                Email: ${payloadObj.email}
                                Password: ${password}
                  Please remember to keep your password confidential.We recommend changing it upon login for better security</p>`
              } else {
                emaildata.subject = 'Update Password'
                emaildata.template_id = '6662a9c532b26165203cce1b'
                emaildata.body = `<p>Dear ${payloadObj.name},
                                Your password for LMP has been created as per your request.Here are your login details:
                                Email: ${payloadObj.email}
                                Password: ${password }
                  Please remember to keep your password confidential.We recommend changing it upon login for better security</p>`
              }
            })
          let emailPayload = {
            sender: 'dev@handsintechnology.com',
            receivers: [payloadObj.email],
            cc: [],
            bcc: [],
            text: emaildata.body,
            subject: 'Your Password for LMP',
            attachments: [],
            template_id: emaildata.template_id
          };
          sendServerEmail(emailPayload);
        } else {
          let groupMedicalPlanId = customerData[0]?.groupMedicalPlanId;
          if (groupMedicalPlanId.length > 0) {
            groupMedicalPlanId.push(mongoose.Types.ObjectId(planId));
          } else {
            groupMedicalPlanId = [mongoose.Types.ObjectId(planId)];
          }
          groupMedicalPlanId = groupMedicalPlanId.map((id)=> id?.toString())
          groupMedicalPlanId = new Set(groupMedicalPlanId)
          groupMedicalPlanId = [...groupMedicalPlanId]
          groupMedicalPlanId = groupMedicalPlanId.map((id)=> mongoose.Types.ObjectId(id))
          customerData = await Admin.findByIdAndUpdate(
            customerData[0]?._id,
            {groupMedicalPlanId:groupMedicalPlanId}
          );
        }
        count++;
      }
      if (count) {
        return res
          .status(200)
          .json({ status: 200, message: "Member created  Successfully !" });
      }
      return res
        .status(404)
        .json({ status: 404, message: "Member Not created " });
    } catch (error) {
      console.log("Error", error);
    }
  },
  getGroupMedicalPlanName: async (req, res) => {
    try {
      const user = req.user;
      const result = await GroupMedicalPlan.aggregate([
        {
          $match: {
            _id: { $in: user.groupMedicalPlanId },
          },
        },
        {
          $project: {
            plan_name: 1,
            company_id: 1,
            _id: 1,
            from_date:1,
            to_date:1
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getInsuranceCompany: async (req, res) => {
    try {
      const company_id = req.query?.company_id;
      const result = await companyModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(company_id),
          },
        },
        {
          $project: {
            company_name: 1,
            _id: 1,
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getTpalist: async (req, res) => {
    try {
      const plan_id = req.query?.plan_id;
      const result = await medicalPlanRatesModel.aggregate([
        {
          $match: {
            group_medical_plan_id: mongoose.Types.ObjectId(plan_id),
          },
        },
        {
          $lookup: {
            from: "medical_tpas",
            localField: "TPA",
            foreignField: "_id",
            as: "TPA",
          },
        },
        {
          $project: {
            TPA : {
              _id : 1,
              name : 1
            },
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getNetworklist: async (req, res) => {
    try {
      const tpa_id = req.query?.tpa_id;
      const planid = req.query.planid;
      const result = await medicalPlanRatesModel.aggregate([
        {
          $match: {
            group_medical_plan_id: mongoose.Types.ObjectId(planid),
            TPA: mongoose.Types.ObjectId(tpa_id),
          },
        },
        {
          $lookup: {
            from: "medical_networks",
            localField: "network",
            foreignField: "_id",
            as: "network",
          },
        },
        {
          $project: {
            network: {
              _id: 1,
              name: 1,
            },
            policy_name: 1
          },
        },
      ]);
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getPrincipleByEmpolyeeNymber: async (req, res) => {
    try {
      let employeeNumber = req.query.employeeNumber
      let result = await groupMedicalModels.aggregate([
        {
          $match:{
            employeeNumber:employeeNumber,
            relation:"Employee"
          }
        },
        {
          $limit:1
        },
        {
          $project:{
            firstName:1,
            lastnName:1,
            middleName:1,
          }
        }
      ])
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getMemberDetailsById: async (req, res) => {
    try {
      let policyId = req.query.policyId
      let result = await groupMedicalModels.aggregate([
        {
          $match:{
           _id:mongoose.Types.ObjectId(policyId)
          }
        },
        {
          $project:{
            firstName:1,
            lastnName:1,
            middleName:1,
            relation:1,
            employeeNumber:1
          }
        }
      ])
      if (result.length) {
        return res.status(200).json({
          status: 200,
          message: "Data Found Successfully !",
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Data Not Found " });
      }
    } catch (error) {
      console.log(error)
    }
  },
  getHrNewlyAddedMember: async (req, res) => {
    try {
      let user = req.user;
      let userTypeId = user?.usertype
      let query = req.query;
      let limit = +query?.limit;
      let page = +query?.page;
      let leadType = query?.leadType;
      let companyId = query?.companyId
      let planId = query?.planId
      let tpaId = query?.tpaId
      let networkId = query?.networkId
      let policyNumber = query?.policyNumber
      let matchObj = {}
      let userMatch = {}
      let userPlanId = user?.groupMedicalPlanId?user?.groupMedicalPlanId:[]
      // if(userPlanId.length){
      //   matchObj["_id"] = {
      //     $in:userPlanId
      //   }
      // }
      if(userTypeId == "65eeb6c21d866055f9331460"){
        userMatch["employeeNumber"] = user?.employeeNumber
        userMatch["HRUserId"] = mongoose.Types.ObjectId(user?.hrId)
      }
      else  {
        // userMatch["HRUserId"] = mongoose.Types.ObjectId(user?._id)
        userMatch["$or"] = [{HRUserId:mongoose.Types.ObjectId(user?._id)},{
          planId:{$in:userPlanId}
        }]

      }
      if (companyId) {
        userMatch["leadsData.planCompanyId"] = mongoose.Types.ObjectId(companyId)
      }
      if (planId) {
        userMatch["leadsData.planId"] = mongoose.Types.ObjectId(planId)
      }
      if (tpaId) {
        userMatch["leadsData.TPAId"] = mongoose.Types.ObjectId(tpaId)
      }
      if (networkId) {
        userMatch["leadsData.networkListId"] = mongoose.Types.ObjectId(networkId)
      }
      if (policyNumber) {
        userMatch["leadsData.policy_number"] = policyNumber
      }
      
      console.log("matchObj.............................",{matchObj,leadType,userMatch},{...matchObj,...userMatch})
      let leadDetails;
      
      let aggregate = [
        {
          $facet: {
            count: [
              {
                $match: matchObj,
              },
              {
                $match: userMatch,
              },
              
              {
                '$lookup': {
                  'from': 'group_medical_leads',
                  'let': {
                    planId: '$_id',
                    fromDate:"$from_date"
                  },
                  'pipeline': [
                    {
                      '$match': {
                        'leadStatus': 'Approved',

                        // 'userleadStatus': 'deleteJdv',
                        '$expr': {
                          '$and': [
                            { "$eq": ["$planId", "$$planId"] }, // Check if planId matches between collections
                            { "$gt": ["$AdditionEffectiveDate", "$$fromDate"] } // Check if fromDate is greater than AdditionEffectiveDate
                          ]

                        }
                      }
                    },
                    
                  ],
                  'as': 'leadsData'
                }
              },
              {
                $match: userMatch,
              },
              {
                $unwind:"$leadsData"
              },
              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: matchObj,
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                '$lookup': {
                  'from': 'group_medical_leads',
                  'let': {
                    planId: '$_id',
                    fromDate:"$from_date"
                  },
                  'pipeline': [
                    {
                      '$match': {
                        'leadStatus': 'Approved',

                        // 'userleadStatus': 'deleteJdv',
                        '$expr': {
                          '$and': [
                            { "$eq": ["$planId", "$$planId"] }, // Check if planId matches between collections
                            { "$gt": ["$AdditionEffectiveDate", "$$fromDate"] } // Check if fromDate is greater than AdditionEffectiveDate
                          ]

                        }
                      }
                    },
                    
                  ],
                  'as': 'leadsData'
                }
              },
              {
                $match: userMatch,
              },
              {
                $unwind:"$leadsData"
              },

              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
      ];
      leadDetails = await GroupMedicalPlan.aggregate(aggregate);
      let total = leadDetails[0]?.count[0]?.total;
      let data = leadDetails[0]?.data;
      if (data.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: data,
            total: total,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          data: [],
          total: total,
        });
    } catch (error) {
      console.log(error);
    }
  },
  tatOnSettlement: async (req, res) => {
    try {
      let user = req.user;
      let hrId = user?._id
      let matchObj = {}
      let tatDaysDetials = await groupMedicalTatdaysModels.find()
      let tatDays = +tatDaysDetials[0]?.tatdays

      let leadDetails;
      if(hrId){
        matchObj["HRID"] = mongoose.Types.ObjectId(hrId)
      }
      let aggregate = [
        {
          $facet: {
            count: [
              {
                $match: matchObj,
              },
              {
                $count: "total",
              },
            ],
            TATdata: [
              {
                $match: matchObj,
              },
              {
                '$project': {
                    'createdAt': 1, 
                    'settledDate': 1, 
                    'dateDifferenceInDays': {
                        '$divide': [
                            {
                                '$subtract': [
                                    '$settledDate', '$createdAt'
                                ]
                            }, 24 * 60 * 60 * 1000
                        ]
                    }
                }
            }, 
            {
                '$match': {
                    'dateDifferenceInDays': {
                        '$lte': tatDays
                    }
                }
            },
              {
                $count: "total",
              },
            ],
          },
        },
      ];
      leadDetails = await groupMedicalClaimModels.aggregate(aggregate);
      leadDetails = leadDetails[0]
      let total = leadDetails?.count[0]?leadDetails?.count[0]?.total:0
      let tatCount = leadDetails?.TATdata[0]?leadDetails?.TATdata[0]?.total:0
      console.log("leadDetails............................",{total,tatCount})
      let beyounTatCount = total - tatCount
      // let total = leadDetails[0]?.count[0]?.total;
      // let data = leadDetails[0]?.data;
      if (leadDetails) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            tatPercentage: tatCount/total*100,
            beyounTatPercentage:beyounTatCount/total*100
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Found ",
          tatPercentage: 0,
          beyounTatPercentage:0
        });
    } catch (error) {
      console.log(error);
    }
  },
createtatdays:async(req,res)=>{
  try {
    let payload = req.body;
    console.log(payload)
    
    let existArray  = [];
    let resultArray = [];
    let count = 0;
    for (let i = 0; i < payload.length; i++) {
      let location = payload[i].location?.map((id)=>mongoose.Types.ObjectId(id.value))
      let tatdays = payload[i].tatdays
      let claimtype = payload[i].claimtype
      let payloadObj = {
        location: location,
        tatdays: tatdays,
        claimtype: claimtype,
        status: 1,
      };
      let existData = await groupMedicalTatdaysModels.findOne({ location: location, tatdays: tatdays
      });
      console.log(payloadObj)
      if (!existData) {
        let result = await groupMedicalTatdaysModels.create(payloadObj);
        resultArray.push(result);
        count++;
      } else {
        existArray.push(existData);
      }
    }
    if (count) {
      return res.status(201).json({ status: 201, message: "Data Added Successfully !", data: resultArray });
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
getTatDays:async(req,res)=>{
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    let result = await groupMedicalTatdaysModels.aggregate([
      // {
      //   $match: { status: 1 },
      // },
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
    const count = await groupMedicalTatdaysModels.countDocuments();

    if (result) {
      return res.status(200).json({ status: 200, message: "Data Found Successfully !" ,data:result, total:count });
    } else {
      return res.status(404).json({ status: 404, message: "Data Not Found ",data:{} });
    }
  } catch (error) {
    console.log(error)
  }
},
getTatDaysById:async(req,res)=>{
  try {
    let id = req.query.id
    let result = await groupMedicalTatdaysModels.aggregate([
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
      return res.status(200).json({ status: 200, message: "Data Found Successfully !" ,data:result});
    } else {
      return res.status(404).json({ status: 404, message: "Data Not Found ",data:{} });
    }
  } catch (error) {
    console.log(error)
  }
},
updateTatDays:async(req,res)=>{
  try {
    let id = req.query.id
    let location = req.body.location?.map((id)=>mongoose.Types.ObjectId(id))

    let payload = {}
    if (req.body?.tatdays) {
      payload['tatdays'] = req.body?.tatdays
    }
    if (req.body?.location) {
      payload['location'] = location
    }
    if (req.body?.claimtype) {
      payload['claimtype'] = req.body?.claimtype
    }
    

    let result = await groupMedicalTatdaysModels.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true, updatedAt: new Date() }
    );
    if (result) {
      return res.status(200).json({ status: 200, message: "Data Updated Successfully !" ,data:result});
    } else {
      return res.status(404).json({ status: 404, message: "Data Not Updated ",data:{} });
    }
  } catch (error) {
    console.log(error)
  }
},
updatetatdaysstatus:async(req,res)=>{
  try {
    let id = req.query.id
    let status = req.body.status
    let result = await groupMedicalTatdaysModels.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true, updatedAt: new Date() }
    );
    if (result) {
      return res.status(200).json({ status: 200, message: "Data Updated Successfully !" ,data:result});
    } else {
      return res.status(404).json({ status: 404, message: "Data Not Updated ",data:{} });
    }
  } catch (error) {
    console.log(error)
  }
},
deleteTatDays:async(req,res)=>{
  try {
    let id = req.query.id
    let result = await groupMedicalTatdaysModels.findByIdAndDelete(id)
    if (result) {
      return res.status(200).json({ status: 200, message: "Data Deleted Successfully !" ,data:result});
    } else {
      return res.status(404).json({ status: 404, message: "Data Not Deleted ",data:{} });
    }
  } catch (error) {
    console.log(error)
  }
},
  add_group_medical_salary_band: async (req, res) => {
    try {
      const salaryRange = req.body;
      let existArray = [];
      let resultArray = [];
      let count = 0;
      for (let i = 0; i < salaryRange.length; i++) {
        let salary_range = await utils.toUpperCase(salaryRange[i].salary_band);
        const salary_in_db = await actual_salary_band.find({
          actual_salary_band: salary_range,
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
          const medical_salary = new actual_salary_band({
            actual_salary_band: salary_range,
            visa_country: visaArray,
            actual_salary_band_location: locationArray,
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
      console.log(err)
    }
  },

  get_actual_salary_band: async (req, res) => {

    try {
      let query = req.query;
      let page = query.page;
      let limit = query.limit
      let userData = req.user
      let userLocation = userData?.location
      userLocation = userLocation.map((obj) => mongoose.Types.ObjectId((obj?.loc_id)))
      let match = {}
      match["actual_salary_band_location"] = {
        $in: userLocation
      }

      if (page && limit) {
        const result = await actual_salary_band.aggregate([
          {
            $match: match
          },
          {
            $lookup: {
              from: "locations",
              localField: "actual_salary_band_location",
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
        const count = await actual_salary_band.countDocuments();
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
        const result = await actual_salary_band.aggregate([
          {
            $match: {
              actual_salary_band_status:1
            }
          },
          {
            $lookup: {
              from: "locations",
              localField: "actual_salary_band_location",
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

  get_actual_salary_band_detailsbyid: async (req, res) => {
    try {
      const id = req.body.ParamValue
      const result = await actual_salary_band.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "locations",
            localField: "actual_salary_band_location",
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

  update_actual_salary_band_status: async (req, res) => {
    try {
      let newdetails = await actual_salary_band.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            actual_salary_band_status: req.body.actualSalaryBand_status,
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

  update_actual_salary_band_details: async (req, res) => {
    try {
      let typeConversion = async (data) => {
        if (typeof data === "string") {
          return data.trim()?.toUpperCase();
        } else {
          return data;
        }
      }
      const typeData = await typeConversion(req.body?.actualSalaryBand)
      const locations = req.body?.actualSalaryBand_location
      const locArr = locations.map((val) => mongoose.Types.ObjectId(val))
      const visa_country_arr = req.body?.medical_visa_country
      const visaArray = visa_country_arr?.map((val) => mongoose.Types.ObjectId(val._id))
      let newdetails = await actual_salary_band.findOneAndUpdate(
        { _id: req.body?.ParamValue },
        {
          $set: {
            actual_salary_band: typeData,
            visa_country: visaArray,
            actual_salary_band_location: locArr,
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
      const result = await actual_salary_band.find({
        actual_salary_band_status: 1,
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
  getInsurancePrimiumEarnedByLob: async (req,res)=>{
    try {
      let user = req.user
      let userType = user?.usertype
      let company = user.insurance_company
      let lobArray = user?.line_of_business
      let payload = req.body
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      };
      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }else{
        let lobArrayObjId = []
      for(let i=0; i<lobArray?.length; i++){
        lobArrayObjId.push(mongoose.Types.ObjectId(lobArray[i]?.lob_id))
      }
      matchObj["type_of_policy"] = {
        $in:lobArrayObjId
      }
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }

      let aggregate = [
        {
          $match:matchObj
        },
        
      ]
      
      console.log("aggregate..................",aggregate)
      let data = await NewLeadsModels.aggregate([
        {
          $match:matchObj
        },
        {
          '$group': {
              '_id': '$type_of_policy', 
              'total': {
                  '$sum': '$final_price'
              }
          }
      }, {
          '$lookup': {
              'from': 'line_of_businesses', 
              'localField': '_id', 
              'foreignField': '_id', 
              'as': 'Lob'
          }
      }, 
      // {
      //     '$unwind': {
      //         'path': '$Lob'
      //     }
      // }, 
      {
          '$project': {
              'Lob.line_of_business_name': 1, 
              'total': 1
          }
      },
      {
        $sort:{
          "Lob.line_of_business_name": 1,
        }
      }
      ])
     
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" });
    } catch (error) {
      console.log(error);
    }
  },
  insurancePrimiumByBodyType:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef')
      matchObj["car_variant"] = {
        '$exists': true
      }

      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
     let aggregate = [{
      $match: matchObj,
     },

        
         {
          '$addFields': {
            'variantId': {
              '$toObjectId': '$car_variant'
            }
          }
        }, 
        {
          '$lookup': {
            'from': 'motor_plans', 
            'localField': 'plan_id', 
            'foreignField': '_id', 
            'as': 'PlanData'
          }
        },
         {
          '$unwind': {
            'path': '$PlanData'
          }
        },
         {
          '$lookup': {
            'from': 'motor_model_details', 
            'localField': 'variantId', 
            'foreignField': '_id', 
            'as': 'variantData'
          }
        },
         {
          '$lookup': {
            'from': 'policy_types', 
            'localField': 'PlanData.policy_type_id', 
            'foreignField': '_id', 
            'as': 'policyData'
          }
        },
         {
          '$unwind': {
            'path': '$variantData'
          }
        }, 
        {
          '$lookup': {
            'from': 'body_types', 
            'localField': 'variantData.motor_model_detail_body_type', 
            'foreignField': '_id', 
            'as': 'BodyType'
          }
        }, 
        {
          '$unwind': {
            'path': '$BodyType'
          }
        },
         {
          '$group': {
            '_id': {
              'bodyType': '$BodyType.body_type_name', 
              // 'tpl': '$policyData.policy_type_name'  
              'tpl': '$last_year_policy_type'
            }, 
            'total': {
              '$sum': '$final_price'
            }
          }
        },
         
         {
          '$group': {
            '_id': '$_id.bodyType', 
            'primium': {
              '$push': {
                'policyType': '$_id.tpl', 
                'total': '$total'
              }
            }
          }
        },
        {
          '$sort': {
            '_id': -1
          }
        },
      ]
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  insurancePrimiumByHomePlaneType:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724')
      matchObj["plan_id"] = {
        '$exists': true
      }



     let aggregate = [{
      $match: matchObj,
     },
        
          {
            '$match': {
              'type_of_policy': mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724'), 
              'plan_id': {
                '$exists': true
              }
            }
          }, {
            '$lookup': {
              'from': 'home_plan_type_lists', 
              'localField': 'home_plan_type', 
              'foreignField': '_id', 
              'as': 'planType'
            }
          }, {
            '$lookup': {
              'from': 'home_plans', 
              'localField': 'plan_id', 
              'foreignField': '_id', 
              'as': 'homePlan'
            }
          }, {
            '$lookup': {
              'from': 'plan_categories', 
              'localField': 'homePlan.plan_category_id', 
              'foreignField': '_id', 
              'as': 'homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$planType'
            }
          }, {
            '$group': {
              '_id': {
                'planType': '$planType.home_plan_type', 
                'plancat': '$homeCategories.plan_category_name'
              }, 
              'total': {
                '$sum': '$final_price'
              }
            }
          }, {
            '$group': {
              '_id': '$_id.planType', 
              'primium': {
                '$push': {
                  'categori': '$_id.plancat', 
                  'total': '$total'
                }
              }
            }
          },
          {
            $sort:{
              _id:1
            }
          }
      ]
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getInsurancePrimiumEarnedByYachtBodyType:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739')


     let aggregate = [{
      $match: matchObj,
     },
         
        
      {
          '$sort': {
              'new_lead_timestamp': -1
          }
      }, 
      {
          '$lookup': {
              'from': 'yachtmodels', 
              'localField': 'YachtVarient', 
              'foreignField': '_id', 
              'as': 'yachtModels'
          }
      }, {
          '$lookup': {
              'from': 'yatch_body_type_lists', 
              'localField': 'yachtModels.bodyTypeId', 
              'foreignField': '_id', 
              'as': 'bodyType'
          }
      }, {
          '$lookup': {
              'from': 'yacht_plans', 
              'localField': 'plan_id', 
              'foreignField': '_id', 
              'as': 'planData'
          }
      }, {
          '$lookup': {
              'from': 'policy_types', 
              'localField': 'planData.policy_type_id', 
              'foreignField': '_id', 
              'as': 'PolicyType'
          }
      },
      {
        '$unwind': {
            'path': '$PolicyType'
        }
    }, {
        '$unwind': {
            'path': '$bodyType'
        }
    },  
      {
          '$group': {
              '_id': {
                  'bodyType': '$bodyType.yacht_body_type', 
                  'policyType': '$PolicyType.policy_type_name'
              }, 
              'total': {
                  '$sum': '$final_price'
              }
          }
      }, {
          '$group': {
              '_id': '$_id.bodyType', 
              'primium': {
                  '$push': {
                      'total': '$total', 
                      'policyType': '$_id.policyType'
                  }
              }
          }
      },
        {
          '$sort': {
            '_id': -1
          }
        },
      ]
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getInsurancePrimiumEarnedByTravelCoverType:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418645df42eaf5ba1c9e0f6')
      matchObj["plan_id"] = {
        '$exists': true
    }
    matchObj["travel_price_id"] = {
      '$exists': true
  }

     let aggregate = [{
      $match: matchObj,
     },
         
       
      {
        '$lookup': {
            'from': 'travel_insurance_fors', 
            'localField': 'travel_insurance_for', 
            'foreignField': '_id', 
            'as': 'travelInsuranceForData'
        }
    },
      
    {
        '$group': {
            '_id': {
                'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
                'noOdDays': '$travelDaysRange'
            }, 
            'total': {
                '$sum': '$final_price'
            }
        }
    }, 
    {
        '$group': {
            '_id': '$_id.trvelFor', 
            'primium': {
                '$push': {
                    'noOfDays': '$_id.noOdDays', 
                    'total': '$total'
                }
            }
        }
    }
      ]
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getInsurancePrimiumEarnedByIndiviualLob:async (req,res)=>{
    try {
      let user = req.user?.toObject()
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     
      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf214cbfce023c8c76762')
      matchObj["plan_id"] = {
      '$exists': true
  }
  matchObj["medical_price_id"] = {
    '$exists': true
}

     let aggregate = [{
      $match: matchObj,
     },
         
       
      {
        '$lookup': {
            'from': 'rates_based_on_ages', 
            'localField': 'medical_price_id', 
            'foreignField': '_id', 
            'as': 'medicalRates'
        }
    }, {
        '$lookup': {
            'from': 'medical_tpas', 
            'localField': 'medicalRates.TPA', 
            'foreignField': '_id', 
            'as': 'TPAData'
        }
    }, {
        '$lookup': {
            'from': 'medical_networks', 
            'localField': 'medicalRates.network', 
            'foreignField': '_id', 
            'as': 'medical_networks_data'
        }
    }, 
    {
        '$group': {
            '_id': {
                'tpa': '$TPAData.name', 
                'network': '$medical_networks_data.name'
            }, 
            'total': {
                '$sum': '$final_price'
            }
        }
    }, 
    {
        '$group': {
            '_id': '$_id.tpa', 
            'primium': {
                '$push': {
                    'network': '$_id.network', 
                    'total': '$total'
                }
            }
        }
    }
      ]
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getMotorBestEate:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     let insuranceMatch = {}

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef')
      matchObj["car_variant"] = {
        '$exists': true
      }

      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
     let aggregate = [{
      $match: matchObj,
     },

        
         {
          '$addFields': {
            'variantId': {
              '$toObjectId': '$car_variant'
            }
          }
        }, 
        {
          '$lookup': {
            'from': 'motor_plans', 
            'localField': 'plan_id', 
            'foreignField': '_id', 
            'as': 'PlanData'
          }
        },
         {
          '$unwind': {
            'path': '$PlanData'
          }
        },
         {
          '$lookup': {
            'from': 'motor_model_details', 
            'localField': 'variantId', 
            'foreignField': '_id', 
            'as': 'variantData'
          }
        },
         {
          '$lookup': {
            'from': 'policy_types', 
            'localField': 'PlanData.policy_type_id', 
            'foreignField': '_id', 
            'as': 'policyData'
          }
        },
         {
          '$unwind': {
            'path': '$variantData'
          }
        }, 
        {
          '$lookup': {
            'from': 'body_types', 
            'localField': 'variantData.motor_model_detail_body_type', 
            'foreignField': '_id', 
            'as': 'BodyType'
          }
        }, 
        {
          '$unwind': {
            'path': '$BodyType'
          }
        },
        
      ]
      let afcet = {}
      afcet["Comprehenisve"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("641161a4591c2f02bcddf51c"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$planRate'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$planRate'
              }
          }
      }, 
      {
          '$addFields': {
              'avgc': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      }
       
      ]
      afcet["tpl"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("64365a4f12211cef85f5b102"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$final_price'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$final_price'
              }
          }
      }, 
      {
          '$addFields': {
              'avgt': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
      
      ]
      afcet["ComprehenisveAll"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("641161a4591c2f02bcddf51c")
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$planRate'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$planRate'
              }
          }
      }, 
      {
          '$addFields': {
              'avgcAll': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      }
       
      ]
      afcet["tplAll"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("64365a4f12211cef85f5b102")
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$final_price'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$final_price'
              }
          }
      }, 
      {
          '$addFields': {
              'avgtAll': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
      
      ]
      aggregate.push({
        $facet:afcet
      })
      aggregate.push(
      {
        $project: {
          mergedArray: { $concatArrays: ["$Comprehenisve","$tpl","$tplAll","$ComprehenisveAll"] }
        }
      },
      {
        $unwind: "$mergedArray"
      },
       {
          '$group': {
            '_id': "$mergedArray._id", 
            rate: {
              '$push': {
                'comprehenshivRate': '$mergedArray.avgc', 
                'tplRate': '$mergedArray.avgt',
                'comprehenshivRateAll': '$mergedArray.avgcAll', 
                'tplRateAll': '$mergedArray.avgtAll'
              }
            }
          }
        },
        {
          $sort:{
            _id:-1
          }
        }
    )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getHomeBestEate:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let insuranceMatch = {}
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724')
      matchObj["plan_id"] = {
        '$exists': true
      }

console.log("matchObj.....................",matchObj)

     let aggregate = [{
      $match: matchObj,
     },
        
           {
            '$lookup': {
              'from': 'home_plan_type_lists', 
              'localField': 'home_plan_type', 
              'foreignField': '_id', 
              'as': 'planType'
            }
          }, {
            '$lookup': {
              'from': 'home_plans', 
              'localField': 'plan_id', 
              'foreignField': '_id', 
              'as': 'homePlan'
            }
          }, {
            '$lookup': {
              'from': 'plan_categories', 
              'localField': 'homePlan.plan_category_id', 
              'foreignField': '_id', 
              'as': 'homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$planType'
            }
          }, 
          
      ]
      let afcet = {
        
      }
      afcet["homeRate"] = [
        {
          $match:    insuranceMatch 

        },
        {
          '$group': {
            '_id': {
              'planType': '$planType.home_plan_type', 
              'plancat': '$homeCategories.plan_category_name'
            }, 
            'total': {
              '$sum': '$homeRate'
            },
            'count': {
              '$sum': 1
            },
            
          }
        },
        {
          '$addFields': {
              'rate': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
         {
          '$group': {
            '_id': '$_id.planType', 
            'primium': {
              '$push': {
                'categori': '$_id.plancat', 
                'total': '$total'
              }
            }
          }
        },
        
      ]
      afcet["homeAllArate"] = [
        {
          '$group': {
            '_id': {
              'planType': '$planType.home_plan_type', 
              'plancat': '$homeCategories.plan_category_name'
            }, 
            'total': {
              '$sum': '$homeRate'
            },
            'count': {
              '$sum': 1
            },
            
          }
        },
        {
          '$addFields': {
              'rateAll': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
         {
          '$group': {
            '_id': '$_id.planType', 
            'primiumAll': {
              '$push': {
                'categori': '$_id.plancat', 
                'totalAll': '$total'
              }
            }
          }
        },
        {
          $sort:{
            _id:1
          }
        }
      ]
      aggregate.push({
        $facet:afcet
      })

      aggregate.push({
        $project: {
          mergedArray: { $concatArrays: ["$homeRate", "$homeAllArate"] }
        }
      },
      {
        $unwind:"$mergedArray"
      },
      {
        '$group': {
          '_id': '$mergedArray._id', 
          'primiumAll': {
            '$push': {
              'rate': '$mergedArray.primium', 
              'rateAll': '$mergedArray.primiumAll'  
            }
          }
        }
      },
    )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getTravelBestEate:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        // policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      let insuranceMatch = {}
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418645df42eaf5ba1c9e0f6')
      matchObj["plan_id"] = {
        '$exists': true
    }
    matchObj["travel_price_id"] = {
      '$exists': true
  }

     let aggregate = [{
      $match: matchObj,
     },
         
       
      {
        '$lookup': {
            'from': 'travel_insurance_fors', 
            'localField': 'travel_insurance_for', 
            'foreignField': '_id', 
            'as': 'travelInsuranceForData'
        }
    },
      
      ]
      let afect = {}
      afect["travelRate"] = [
        {
          $match:insuranceMatch
        },
        {
          '$group': {
              '_id': {
                  'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
                  'noOdDays': '$travelDaysRange'
              }, 
              'total': {
                  '$sum': '$selectedPrimium'
              },
              'count': {
                '$sum': 1
            }
          }
      }, 
      {
        '$addFields': {
            'rate': {
                '$divide': [
                    '$total', '$count'
                ]
            }
        }
    },
       {
        '$group': {
          '_id': '$_id.trvelFor', 
          'primium': {
            '$push': {
              'noOdDays': '$_id.noOdDays', 
              'total': '$total'
            }
          }
        }
      },
      
      ]
      afect["travelAllRate"] = [
        {
          '$group': {
              '_id': {
                  'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
                  'noOdDays': '$travelDaysRange'
              }, 
              'total': {
                  '$sum': '$selectedPrimium'
              },
              'count': {
                '$sum': 1
            }
          }
      }, 
      {
        '$addFields': {
            'rateAll': {
                '$divide': [
                    '$total', '$count'
                ]
            }
        }
    },
       {
        '$group': {
          '_id': '$_id.trvelFor', 
          'primiumAll': {
            '$push': {
              'noOdDays': '$_id.noOdDays', 
              'totalAll': '$total'
            }
          }
        }
      },
      
      ]
      aggregate.push({
        $facet:afect
      })
      aggregate.push({
        $project: {
          mergedArray: { $concatArrays: ["$travelRate", "$travelAllRate"] }
        }
      },
      {
        $unwind:"$mergedArray"
      },
      {
        '$group': {
          '_id': '$mergedArray._id', 
          'primiumAll': {
            '$push': {
              'rate': '$mergedArray.primium', 
              'rateAll': '$mergedArray.primiumAll'  
            }
          }
        }
      },
    )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getYachtBestEate:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        // policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      let insuranceMatchObj = {}
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739')


     let aggregate = [{
      $match: matchObj,
     },
         
        
      {
          '$sort': {
              'new_lead_timestamp': -1
          }
      }, 
      {
          '$lookup': {
              'from': 'yachtmodels', 
              'localField': 'YachtVarient', 
              'foreignField': '_id', 
              'as': 'yachtModels'
          }
      }, {
          '$lookup': {
              'from': 'yatch_body_type_lists', 
              'localField': 'yachtModels.bodyTypeId', 
              'foreignField': '_id', 
              'as': 'bodyType'
          }
      }, {
          '$lookup': {
              'from': 'yacht_plans', 
              'localField': 'plan_id', 
              'foreignField': '_id', 
              'as': 'planData'
          }
      }, {
          '$lookup': {
              'from': 'policy_types', 
              'localField': 'planData.policy_type_id', 
              'foreignField': '_id', 
              'as': 'PolicyType'
          }
      },
      {
        '$unwind': {
            'path': '$PolicyType'
        }
    }, {
        '$unwind': {
            'path': '$bodyType'
        }
    },  
      // {
      //     '$group': {
      //         '_id': {
      //             'bodyType': '$bodyType.yacht_body_type', 
      //             'policyType': '$PolicyType.policy_type_name'
      //         }, 
      //         'total': {
      //             '$sum': '$final_price'
      //         }
      //     }
      // }, 
      // {
      //     '$group': {
      //         '_id': '$_id.bodyType', 
      //         'primium': {
      //             '$push': {
      //                 'total': '$total', 
      //                 'policyType': '$_id.policyType'
      //             }
      //         }
      //     }
      // },

      //   {
      //     '$sort': {
      //       '_id': -1
      //     }
      //   },
      ]
      let afcet = {}
      afcet["Comprehenisve"] = [
        {
          $match:{
            "planData.policy_type_id" :mongoose.Types.ObjectId("641161a4591c2f02bcddf51c"),
            ...insuranceMatchObj
          }
        },
        {
          '$group': {
              '_id': '$bodyType.yacht_body_type', 
              'total': {
                  '$sum': '$yatchRate'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$yatchRate'
              }
          }
      }, 
      {
          '$addFields': {
              'avgc': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      }
       
      ]
      afcet["tpl"] = [
        {
          $match:{
            "planData.policy_type_id" :mongoose.Types.ObjectId("64365a4f12211cef85f5b102"),
            ...insuranceMatchObj
          }
        },
        {
          '$group': {
              '_id': '$bodyType.yacht_body_type', 
              'total': {
                  '$sum': '$selectedPrimium'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$selectedPrimium'
              }
          }
      }, 
      {
          '$addFields': {
              'avgt': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
      
      ]
      afcet["ComprehenisveAll"] = [
        {
          $match:{
            "planData.policy_type_id" :mongoose.Types.ObjectId("641161a4591c2f02bcddf51c")
          }
        },
        {
          '$group': {
              '_id': '$bodyType.yacht_body_type', 
              'total': {
                  '$sum': '$yatchRate'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$yatchRate'
              }
          }
      }, 
      {
          '$addFields': {
              'avgcAll': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      }
       
      ]
      afcet["tplAll"] = [
        {
          $match:{
            "planData.policy_type_id" :mongoose.Types.ObjectId("64365a4f12211cef85f5b102")
          }
        },
        {
          '$group': {
              '_id': '$bodyType.yacht_body_type', 
              'total': {
                  '$sum': '$selectedPrimium'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$selectedPrimium'
              }
          }
      }, 
      {
          '$addFields': {
              'avgtAll': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
      
      ]
      aggregate.push({
        $facet:afcet
      })
      aggregate.push(
        {
          $project: {
            mergedArray: { $concatArrays: ["$Comprehenisve","$tpl","$tplAll","$ComprehenisveAll"] }
          }
        },
        {
          $unwind: "$mergedArray"
        },
        {
          '$group': {
            '_id': "$mergedArray._id", 
            rate: {
              '$push': {
                'comprehenshivRate': '$mergedArray.avgc', 
                'tplRate': '$mergedArray.avgt',
                'comprehenshivRateAll': '$mergedArray.avgcAll', 
                'tplRateAll': '$mergedArray.avgtAll'
              }
            }
          }
        },
        {
          $sort:{
            _id:-1
          }
        }
      )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getIndivialMedicalBestRate:async (req,res)=>{
    try {
      let user = req.user?.toObject()
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        // policy_issued_status:1
      }
     let insuranceMatch = {}
      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf214cbfce023c8c76762')
      matchObj["plan_id"] = {
      '$exists': true
  }
  matchObj["medical_price_id"] = {
    '$exists': true
}

     let aggregate = [{
      $match: matchObj,
     },
         
       
      {
        '$lookup': {
            'from': 'rates_based_on_ages', 
            'localField': 'medical_price_id', 
            'foreignField': '_id', 
            'as': 'medicalRates'
        }
    }, {
        '$lookup': {
            'from': 'medical_tpas', 
            'localField': 'medicalRates.TPA', 
            'foreignField': '_id', 
            'as': 'TPAData'
        }
    }, {
        '$lookup': {
            'from': 'medical_networks', 
            'localField': 'medicalRates.network', 
            'foreignField': '_id', 
            'as': 'medical_networks_data'
        }
    }, 
    
      ]
      let afect = {}
      afect["medicalRate"] = [
        {
          $match:insuranceMatch
        },
        {
          '$group': {
              '_id': {
                'tpa': '$TPAData.name', 
                'network': '$medical_networks_data.name'
              }, 
              'total': {
                  '$sum': '$selectedPrimium'
              },
              'count': {
                '$sum': 1
            }
          }
      }, 
      {
        '$addFields': {
            'rate': {
                '$divide': [
                    '$total', '$count'
                ]
            }
        }
    },
       {
        '$group': {
          '_id': '$_id.tpa', 
          'primium': {
            '$push': {
              'network': '$_id.network', 
              'total': '$total'
            }
          }
        }
      },
      
      ]
      afect["medicalAllRate"] = [
        {
          '$group': {
              '_id': {
                'tpa': '$TPAData.name', 
                'network': '$medical_networks_data.name'
              }, 
              'total': {
                  '$sum': '$selectedPrimium'
              },
              'count': {
                '$sum': 1
            }
          }
      }, 
      {
        '$addFields': {
            'rateAll': {
                '$divide': [
                    '$total', '$count'
                ]
            }
        }
    },
       {
        '$group': {
          '_id': '$_id.tpa', 
          'primiumAll': {
            '$push': {
              'network': '$_id.network', 
              'totalAll': '$total'
            }
          }
        }
      },
      
      ]
      aggregate.push({
        $facet:afect
      })
      aggregate.push({
        $project: {
          mergedArray: { $concatArrays: ["$medicalRate", "$medicalAllRate"] }
        }
      },
      {
        $unwind:"$mergedArray"
      },
      {
        '$group': {
          '_id': '$mergedArray._id', 
          'primiumAll': {
            '$push': {
              'rate': '$mergedArray.primium', 
              'rateAll': '$mergedArray.primiumAll'  
            }
          }
        }
      },
    )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      for(let i = 0; i < data.length; i++){
        console.log("data,,,,,,,,,,,,,,,,,",data[i])
      }
      console.log("data.....................",data)
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },

  getMotorProjectBusiness:async (req,res,next)=>{
    try {
      let user = req.user
      // process.exit(1)
      console.log("user......................",)
      console.log("user.................",user)
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     let insuranceMatch = {}

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef')
      matchObj["car_variant"] = {
        '$exists': true
      }
console.log("...........................",insuranceMatch)
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
     let aggregate = [{
      $match: matchObj,
     },

        
         {
          '$addFields': {
            'variantId': {
              '$toObjectId': '$car_variant'
            }
          }
        }, 
        {
          '$lookup': {
            'from': 'motor_plans', 
            'localField': 'plan_id', 
            'foreignField': '_id', 
            'as': 'PlanData'
          }
        },
         {
          '$unwind': {
            'path': '$PlanData'
          }
        },
         {
          '$lookup': {
            'from': 'motor_model_details', 
            'localField': 'variantId', 
            'foreignField': '_id', 
            'as': 'variantData'
          }
        },
         {
          '$lookup': {
            'from': 'policy_types', 
            'localField': 'PlanData.policy_type_id', 
            'foreignField': '_id', 
            'as': 'policyData'
          }
        },
         {
          '$unwind': {
            'path': '$variantData'
          }
        }, 
        {
          '$lookup': {
            'from': 'body_types', 
            'localField': 'variantData.motor_model_detail_body_type', 
            'foreignField': '_id', 
            'as': 'BodyType'
          }
        }, 
        {
          '$unwind': {
            'path': '$BodyType'
          }
        },
      
      ]
      let afcet = {}
      afcet["Comprehenisve"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("641161a4591c2f02bcddf51c"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$planRate'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$planRate'
              },
              primiumCom:{
                $sum:"$final_price"
              }
          }
      }, 
      {
          '$addFields': {
              'avgc': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      }
       
      ]
      afcet["tpl"] = [
        {
          $match:{
            "PlanData.policy_type_id" :mongoose.Types.ObjectId("64365a4f12211cef85f5b102"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
              '_id': '$BodyType.body_type_name', 
              'total': {
                  '$sum': '$final_price'
              }, 
              'count': {
                  '$sum': 1
              }, 
              'av': {
                  '$avg': '$final_price'
              },
              primiumTpl:{
                $sum:"$final_price"
              }
          }
      }, 
      {
          '$addFields': {
              'avgt': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
      
      ]
      aggregate.push({
        $facet:afcet
      })
      aggregate.push(
      {
        $project: {
          mergedArray: { $concatArrays: ["$Comprehenisve","$tpl"] }
        }
      },
      {
        $unwind: "$mergedArray"
      },
       {
          '$group': {
            '_id': "$mergedArray._id", 
            rate: {
              '$push': {
                'comprehenshivRate': '$mergedArray.avgc', 
                'tplRate': '$mergedArray.avgt',
                'primiumCom': '$mergedArray.primiumCom',
                'primiumTpl': '$mergedArray.primiumTpl'

              }
            }
          }
        },
        {
          $sort:{
            _id:-1
          }
        }
    )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getYachtProjectBusiness: async (req, res, next) => {
    try {
      let user = req.user
      // process.exit(1)
      console.log("user......................",)
      console.log("user.................", user)
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id: {
          $exists: true
        },
        final_price: {
          $exists: true
        },
        policy_issued_status: 1
      }
      let insuranceMatch = {}

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }

      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if ((userType?.toString() == "653604248028cba2487f7d2a") && company) {
        
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739')
      matchObj["YachtVarient"] = {
        '$exists': true
      }
      console.log("...........................", insuranceMatch)
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      let aggregate = [{
        $match: matchObj,
      },


      {
        '$addFields': {
          'variantId': {
            '$toObjectId': '$YachtVarient'
          }
        }
      },
      {
        '$lookup': {
          'from': 'yacht_plans',
          'localField': 'plan_id',
          'foreignField': '_id',
          'as': 'PlanData'
        }
      },
      {
        '$unwind': {
          'path': '$PlanData'
        }
      },
      {
        '$lookup': {
          'from': 'yachtmodels',
          'localField': 'YachtVarient',
          'foreignField': '_id',
          'as': 'variantData'
        }
      },
      {
        '$lookup': {
          'from': 'policy_types',
          'localField': 'PlanData.policy_type_id',
          'foreignField': '_id',
          'as': 'policyData'
        }
      },
      {
        '$unwind': {
          'path': '$variantData'
        }
      },
      {
        '$lookup': {
          'from': 'yatch_body_type_lists',
          'localField': 'variantData.bodyTypeId',
          'foreignField': '_id',
          'as': 'BodyType'
        }
      },
      {
        '$unwind': {
          'path': '$BodyType'
        }
      },

      ]
      let afcet = {}
      afcet["Comprehenisve"] = [
        {
          $match: {
            "PlanData.policy_type_id": mongoose.Types.ObjectId("641161a4591c2f02bcddf51c"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
            '_id': '$BodyType.yacht_body_type',
            'total': {
              '$sum': '$yatchRate'
            },
            'count': {
              '$sum': 1
            },
            'av': {
              '$avg': '$yatchRate'
            },
            primiumCom: {
              $sum: "$final_price"
            }
          }
        },
        {
          '$addFields': {
            'avgc': {
              '$divide': [
                '$total', '$count'
              ]
            }
          }
        }

      ]
      afcet["tpl"] = [
        {
          $match: {
            "PlanData.policy_type_id": mongoose.Types.ObjectId("64365a4f12211cef85f5b102"),
            ...insuranceMatch
          }
        },
        {
          '$group': {
            '_id': '$BodyType.yacht_body_type',
            'total': {
              '$sum': '$final_price'
            },
            'count': {
              '$sum': 1
            },
            'av': {
              '$avg': '$final_price'
            },
            primiumTpl: {
              $sum: "$final_price"
            }
          }
        },
        {
          '$addFields': {
            'avgt': {
              '$divide': [
                '$total', '$count'
              ]
            }
          }
        },

      ]
      aggregate.push({
        $facet: afcet
      })
      aggregate.push(
        {
          $project: {
            mergedArray: { $concatArrays: ["$Comprehenisve", "$tpl"] }
          }
        },
        {
          $unwind: "$mergedArray"
        },
        {
          '$group': {
            '_id': "$mergedArray._id",
            rate: {
              '$push': {
                'comprehenshivRate': '$mergedArray.avgc',
                'tplRate': '$mergedArray.avgt',
                'primiumCom': '$mergedArray.primiumCom',
                'primiumTpl': '$mergedArray.primiumTpl'

              }
            }
          }
        },
        {
          $sort: {
            _id: -1
          }
        }
      )
      let data = await NewLeadsModels.aggregate(
        aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getTravelProjectBusiness:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        // policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      let insuranceMatch = {}
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418645df42eaf5ba1c9e0f6')
      matchObj["plan_id"] = {
        '$exists': true
    }
    matchObj["travel_price_id"] = {
      '$exists': true
  }

     let aggregate = [{
      $match: matchObj,
     },
         
       
      {
        '$lookup': {
            'from': 'travel_insurance_fors', 
            'localField': 'travel_insurance_for', 
            'foreignField': '_id', 
            'as': 'travelInsuranceForData'
        }
    },
    {
      $match:insuranceMatch
    },
    {
      '$group': {
          '_id': {
              'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
              'noOdDays': '$travelDaysRange'
          }, 
          'total': {
              '$sum': '$selectedPrimium'
          },
          'count': {
            '$sum': 1
        },
        'primium': {
          '$sum': "$final_price"
      }
      }
  }, 
  {
    '$addFields': {
        'rate': {
            '$divide': [
                '$total', '$count'
            ]
        }
    }
},
   {
    '$group': {
      '_id': '$_id.trvelFor', 
      'primium': {
        '$push': {
          'noOdDays': '$_id.noOdDays', 
          'total': '$total',
          primium:"$primium"
        }
      }
    }
  },
      
      ]
    //   let afect = {}
    //   afect["travelRate"] = [
    //     {
    //       $match:insuranceMatch
    //     },
    //     {
    //       '$group': {
    //           '_id': {
    //               'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
    //               'noOdDays': '$travelDaysRange'
    //           }, 
    //           'total': {
    //               '$sum': '$selectedPrimium'
    //           },
    //           'count': {
    //             '$sum': 1
    //         }
    //       }
    //   }, 
    //   {
    //     '$addFields': {
    //         'rate': {
    //             '$divide': [
    //                 '$total', '$count'
    //             ]
    //         }
    //     }
    // },
    //    {
    //     '$group': {
    //       '_id': '$_id.trvelFor', 
    //       'primium': {
    //         '$push': {
    //           'noOdDays': '$_id.noOdDays', 
    //           'total': '$total'
    //         }
    //       }
    //     }
    //   },
      
    //   ]
    //   afect["travelAllRate"] = [
    //     {
    //       '$group': {
    //           '_id': {
    //               'trvelFor': '$travelInsuranceForData.travel_insurance_for', 
    //               'noOdDays': '$travelDaysRange'
    //           }, 
    //           'total': {
    //               '$sum': '$selectedPrimium'
    //           },
    //           'count': {
    //             '$sum': 1
    //         }
    //       }
    //   }, 
    //   {
    //     '$addFields': {
    //         'rateAll': {
    //             '$divide': [
    //                 '$total', '$count'
    //             ]
    //         }
    //     }
    // },
    //    {
    //     '$group': {
    //       '_id': '$_id.trvelFor', 
    //       'primiumAll': {
    //         '$push': {
    //           'noOdDays': '$_id.noOdDays', 
    //           'totalAll': '$total'
    //         }
    //       }
    //     }
    //   },
      
    //   ]
    //   aggregate.push({
    //     $facet:afect
    //   })
    //   aggregate.push({
    //     $project: {
    //       mergedArray: { $concatArrays: ["$travelRate", "$travelAllRate"] }
    //     }
    //   },
    //   {
    //     $unwind:"$mergedArray"
    //   },
    //   {
    //     '$group': {
    //       '_id': '$mergedArray._id', 
    //       'primiumAll': {
    //         '$push': {
    //           'rate': '$mergedArray.primium', 
    //           'rateAll': '$mergedArray.primiumAll'  
    //         }
    //       }
    //     }
    //   },
    // )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getMedicalProjectBusiness: async (req, res) => {
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let matchObj = {
        plan_company_id: {
          $exists: true
        },
        final_price: {
          $exists: true
        },
        // policy_issued_status:1
      }


      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      let insuranceMatch = {}
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }

      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if ((userType?.toString() == "653604248028cba2487f7d2a") && company) {
        insuranceMatch["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf214cbfce023c8c76762')
      matchObj["plan_id"] = {
        '$exists': true
      }
      matchObj["medical_price_id"] = {
        '$exists': true
      }

      let aggregate = [{
        $match: matchObj,
      },


        {
          '$lookup': {
            'from': 'rates_based_on_ages',
            'localField': 'medical_price_id',
            'foreignField': '_id',
            'as': 'medicalRates'
          }
        }, {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'medicalRates.TPA',
            'foreignField': '_id',
            'as': 'TPAData'
          }
        }, {
          '$lookup': {
            'from': 'medical_networks',
            'localField': 'medicalRates.network',
            'foreignField': '_id',
            'as': 'medical_networks_data'
          }
        },
      {
        $match: insuranceMatch
        },
        {
          '$group': {
            '_id': {
              'tpa': '$TPAData.name',
              'network': '$medical_networks_data.name'
            },
            'total': {
              '$sum': '$selectedPrimium'
            },
            'count': {
              '$sum': 1
            },
            'primium': {
              '$sum': "$final_price"
            }
          }
        },
        {
          '$addFields': {
            'rate': {
              '$divide': [
                '$total', '$count'
              ]
            }
          }
        },
        {
          '$group': {
            '_id': '$_id.tpa',
            'primium': {
              '$push': {
                'network': '$_id.network',
                'total': '$total',
                primium:"$primium"
              }
            }
          }
        },
      ]
       
      let data = await NewLeadsModels.aggregate(
        aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error)
    }
  },
  getHomeProjectBusiness:async (req,res)=>{
    try {
      let user = req.user
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let insuranceMatch = {}
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const currentDate = moment();
      switch (dateRange) {
        case 'daily':
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
          break;
        case 'weekly':
          startDate = moment(currentDate).subtract(1, 'week');
          endDate = moment(currentDate);

          break;
        case 'monthly':
          startDate = moment(currentDate).startOf('month');
          endDate = moment(currentDate).endOf('month');

          break;
        case 'yearly':
          startDate = moment(currentDate).startOf('year');
          endDate = moment(currentDate).endOf('year');
          break;
        case 'customized':
          startDate = moment(customstartdate);
          endDate = moment(customenddate);
          break;
        default:
          startDate = moment(currentDate).startOf('day');
          endDate = moment(currentDate).endOf('day');
      }
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = mongoose.Types.ObjectId(company)
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724')
      matchObj["plan_id"] = {
        '$exists': true
      }

console.log("matchObj.....................",matchObj)

     let aggregate = [{
      $match: matchObj,
     },
        
           {
            '$lookup': {
              'from': 'home_plan_type_lists', 
              'localField': 'home_plan_type', 
              'foreignField': '_id', 
              'as': 'planType'
            }
          }, {
            '$lookup': {
              'from': 'home_plans', 
              'localField': 'plan_id', 
              'foreignField': '_id', 
              'as': 'homePlan'
            }
          }, {
            '$lookup': {
              'from': 'plan_categories', 
              'localField': 'homePlan.plan_category_id', 
              'foreignField': '_id', 
              'as': 'homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$homeCategories'
            }
          }, {
            '$unwind': {
              'path': '$planType'
            }
          }, 
          {
            '$group': {
              '_id': {
                'planType': '$planType.home_plan_type', 
                'plancat': '$homeCategories.plan_category_name'
              }, 
              'total': {
                '$sum': '$homeRate'
              },
              'count': {
                '$sum': 1
              },
              'primium': {
                '$sum': "$final_price"
              },
              
            }
          },
          {
            '$addFields': {
                'rate': {
                    '$divide': [
                        '$total', '$count'
                    ]
                }
            }
        },
        {
          '$group': {
            '_id': '$_id.planType', 
            'primium': {
              '$push': {
                'categori': '$_id.plancat', 
                'rate': '$total',
                'primium': '$primium'

              }
            }
          }
        },
          
      ]
      let afcet = {
        
      }
      afcet["homeRate"] = [
        {
          $match:    insuranceMatch 

        },
        {
          '$group': {
            '_id': {
              'planType': '$planType.home_plan_type', 
              'plancat': '$homeCategories.plan_category_name'
            }, 
            'total': {
              '$sum': '$homeRate'
            },
            'count': {
              '$sum': 1
            },
            'primium': {
              '$sum': "$final_price"
            },
            
          }
        },
        {
          '$addFields': {
              'rate': {
                  '$divide': [
                      '$total', '$count'
                  ]
              }
          }
      },
         {
          '$group': {
            '_id': '$_id.planType', 
            'primium': {
              '$push': {
                'categori': '$_id.plancat', 
                'total': '$total'
              }
            }
          }
        },
        
      ]
     
    //   aggregate.push({
    //     $facet:afcet
    //   })

    //   aggregate.push({
    //     $project: {
    //       mergedArray: { $concatArrays: ["$homeRate"] }
    //     }
    //   },
    //   {
    //     $unwind:"$mergedArray"
    //   },
    //   {
    //     '$group': {
    //       '_id': '$mergedArray._id', 
    //       'primiumAll': {
    //         '$push': {
    //           'rate': '$mergedArray.primium', 
    //           'primium': '$mergedArray.primium'  
    //         }
    //       }
    //     }
    //   },
    // )
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        return res.json({ status: 200, message: "Data Found", data: data });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
    }
  },
  getTravelHypothitcalBusiness:async (req,res)=>{
    try {
      let user = req.user;
      let payload = req.body;
      let userType = user.usertype;
      let company = user?.insurance_company;
      console.log("payload.......................", payload);
      let matchObj = {
        plan_company_id: {
          $exists: true,
        },
        final_price: {
          $exists: true,
        },
        // policy_issued_status:1 travelDaysRange
      };
      let hypothitCalMatch = {};
      if (payload?.rate) {
        matchObj["final_price"] = {
          $gte: +payload?.rate,
        };
      }
      if (payload?.noOfDays) {
        matchObj["travelDaysRange"] = payload?.noOfDays?.trim();
      }
      if (payload?.travelFor) {
        hypothitCalMatch["travelInsuranceForData.travel_insurance_for"] =
          payload?.travelFor?.trim();
      }

      if (payload?.location?.length) {
        matchObj["lead_location"] = {
          $in: payload.location.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type };
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = {
          $in: payload.lob.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if (userType?.toString() == "653604248028cba2487f7d2a" && company) {
        matchObj["plan_company_id"] = {
          $ne: mongoose.Types.ObjectId(company),
        };
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId(
        "6418645df42eaf5ba1c9e0f6"
      );
      matchObj["plan_id"] = {
        $exists: true,
      };
      matchObj["travel_price_id"] = {
        $exists: true,
      };

      let aggregate = [
        {
          $match: matchObj,
        },

        {
          $lookup: {
            from: "travel_insurance_fors",
            localField: "travel_insurance_for",
            foreignField: "_id",
            as: "travelInsuranceForData",
          },
        },
        {
          $match: hypothitCalMatch,
        },
      ];
      let afcet = {};
      let currentDate = new Date();
      let back90Days = new Date(
        currentDate.setDate(currentDate.getDate() - 90)
      );
      let back180Days = new Date(
        currentDate.setDate(currentDate.getDate() - 180)
      );
      let back270Days = new Date(
        currentDate.setDate(currentDate.getDate() - 270)
      );
      let back360Days = new Date(
        currentDate.setDate(currentDate.getDate() - 360)
      );
      back90Days = back90Days.toISOString();
      back180Days = back180Days.toISOString();
      back270Days = back270Days.toISOString();
      back360Days = back360Days.toISOString();
      currentDate = new Date().toISOString();

      afcet["1-90"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(currentDate) } },
              { new_lead_timestamp: { $gte: new Date(back90Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["91-180"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back90Days) } },
              { new_lead_timestamp: { $gte: new Date(back180Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["181-270"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back180Days) } },
              { new_lead_timestamp: { $gte: new Date(back270Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["271-360"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back270Days) } },
              { new_lead_timestamp: { $gte: new Date(back360Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["360+"] = [
        {
          $match: {
            $and: [{ new_lead_timestamp: { $lte: new Date(back90Days) } }],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      aggregate.push({
        $facet: afcet,
      });
     
      let data = await NewLeadsModels.aggregate(aggregate);
     
      if (data.length) {
        data = data[0]
        let dataBoj = {
          "1-90":data["1-90"] && data["1-90"][0]  && data["1-90"][0]?data["1-90"][0].primium :0,
          "91-180":data["91-180"] && data["91-180"][0] && data["91-180"][0]?data["91-180"][0].primium:0,
          "181-270":data["181-270"] && data["181-270"][0] && data["181-270"][0]?data["181-270"][0].primium:0,
          "271-360":data["271-360"] && data["271-360"][0] && data["271-360"][0]?data["271-360"][0].primium:0,
          "360+":data["360+"] && data["360+"][0] && data["360+"][0]?data["360+"][0].primium:0
        }
        return res.json({ status: 200, message: "Data Found", data: dataBoj });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error);
    }
  },
  getMedicalHypothitcalBusiness: async (req, res) => {
    try {
      let user = req.user;
      let payload = req.body;
      let userType = user.usertype;
      let company = user?.insurance_company;
      // console.log("payload.......................", payload);
      let matchObj = {
        plan_company_id: {
          $exists: true,
        },
        final_price: {
          $exists: true,
        },
        // policy_issued_status:1 travelDaysRange
      };
      let hypothitCalMatch = {};
      if (payload?.rate) {
        matchObj["final_price"] = {
          $gte: +payload?.rate,
        };
      }
      if (payload?.TPA) {
        hypothitCalMatch["TPAData.name"] = payload?.TPA?.trim();
      }
      if (payload?.network) {
        hypothitCalMatch["medical_networks_data.name"] = payload?.network?.trim();
      }
      if (payload?.location?.length) {
        matchObj["lead_location"] = {
          $in: payload.location.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type };
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = {
          $in: payload.lob.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if (userType?.toString() == "653604248028cba2487f7d2a" && company) {
        matchObj["plan_company_id"] = {
          $ne: mongoose.Types.ObjectId(company),
        };
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId(
        "641bf214cbfce023c8c76762"
      );
      matchObj["plan_id"] = {
        $exists: true,
      };
      matchObj["medical_price_id"] = {
        $exists: true,
      };

      let aggregate = [
        {
          $match: matchObj,
        },

        {
          '$lookup': {
            'from': 'rates_based_on_ages',
            'localField': 'medical_price_id',
            'foreignField': '_id',
            'as': 'medicalRates'
          }
        },
        {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'medicalRates.TPA',
            'foreignField': '_id',
            'as': 'TPAData'
          }
        }, {
          '$lookup': {
            'from': 'medical_networks',
            'localField': 'medicalRates.network',
            'foreignField': '_id',
            'as': 'medical_networks_data'
          }
        },
        {
          $unwind: {
            path: "$TPAData",
          },
        },
        {
          $unwind: {
            path: "$medical_networks_data",
          },
        },
        {
          $match: hypothitCalMatch,
        },
      ];
      let afcet = {};
      let currentDate = new Date();
      let back90Days = new Date(
        currentDate.setDate(currentDate.getDate() - 90)
      );
      let back180Days = new Date(
        currentDate.setDate(currentDate.getDate() - 180)
      );
      let back270Days = new Date(
        currentDate.setDate(currentDate.getDate() - 270)
      );
      let back360Days = new Date(
        currentDate.setDate(currentDate.getDate() - 360)
      );
      back90Days = back90Days.toISOString();
      back180Days = back180Days.toISOString();
      back270Days = back270Days.toISOString();
      back360Days = back360Days.toISOString();
      currentDate = new Date().toISOString();

      afcet["1-90"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(currentDate) } },
              { new_lead_timestamp: { $gte: new Date(back90Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["91-180"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back90Days) } },
              { new_lead_timestamp: { $gte: new Date(back180Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["181-270"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back180Days) } },
              { new_lead_timestamp: { $gte: new Date(back270Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["271-360"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back270Days) } },
              { new_lead_timestamp: { $gte: new Date(back360Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["360+"] = [
        {
          $match: {
            $and: [{ new_lead_timestamp: { $lte: new Date(back90Days) } }],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      aggregate.push({
        $facet: afcet,
      });

      let data = await NewLeadsModels.aggregate(aggregate);

      if (data.length) {
        data = data[0]
        let dataBoj = {
          "1-90": data["1-90"] && data["1-90"][0] && data["1-90"][0] ? data["1-90"][0].primium : 0,
          "91-180": data["91-180"] && data["91-180"][0] && data["91-180"][0] ? data["91-180"][0].primium : 0,
          "181-270": data["181-270"] && data["181-270"][0] && data["181-270"][0] ? data["181-270"][0].primium : 0,
          "271-360": data["271-360"] && data["271-360"][0] && data["271-360"][0] ? data["271-360"][0].primium : 0,
          "360+": data["360+"] && data["360+"][0] && data["360+"][0] ? data["360+"][0].primium : 0
        }
        return res.json({ status: 200, message: "Data Found", data: dataBoj });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error);
    }
  },
  getMotorHypothitcalBusiness:async (req,res,next)=>{
    try {
      let user = req.user
      console.log("user......................",)
      console.log("user.................",user)
      let payload = req.body
      let userType = user.usertype
      let company = user?.insurance_company
      let rate = payload?.rate?.toString()
      if(rate?.includes("%")){
        rate = rate.split("%")[0]
        rate = + rate
      }else{
        rate = +rate
      }
      let matchObj = {
        plan_company_id:{
          $exists:true
        },
        final_price:{
          $exists:true
        },
        policy_issued_status:1
      }
     let insuranceMatch = {}
      
      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.policyType && payload?.policyType?.toLowerCase() == "comprehensive") {
        matchObj["last_year_policy_type"] = payload?.policyType?.trim()
        matchObj["planRate"] = {
          $gte:rate
        }
      }
      if (payload?.policyType && payload?.policyType?.toLowerCase() == "Third Party Liability (TPL)"?.toLowerCase()) {
        matchObj["last_year_policy_type"] = payload?.policyType?.trim()
        matchObj["final_price"] = {
          $gte:rate
        }
      }
      if (payload?.bodyName) {
        insuranceMatch["BodyType.body_type_name"] = payload?.bodyName?.trim()
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = {
          $ne:mongoose.Types.ObjectId(company)
        }
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef')
      matchObj["car_variant"] = {
        '$exists': true
      }
console.log("...........................",insuranceMatch)
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
     let aggregate = [{
      $match: matchObj,
     },

        
         {
          '$addFields': {
            'variantId': {
              '$toObjectId': '$car_variant'
            }
          }
        }, 
        {
          '$lookup': {
            'from': 'motor_plans', 
            'localField': 'plan_id', 
            'foreignField': '_id', 
            'as': 'PlanData'
          }
        },
         {
          '$unwind': {
            'path': '$PlanData'
          }
        },
         {
          '$lookup': {
            'from': 'motor_model_details', 
            'localField': 'variantId', 
            'foreignField': '_id', 
            'as': 'variantData'
          }
        },
         {
          '$lookup': {
            'from': 'policy_types', 
            'localField': 'PlanData.policy_type_id', 
            'foreignField': '_id', 
            'as': 'policyData'
          }
        },
         {
          '$unwind': {
            'path': '$variantData'
          }
        }, 
        {
          '$lookup': {
            'from': 'body_types', 
            'localField': 'variantData.motor_model_detail_body_type', 
            'foreignField': '_id', 
            'as': 'BodyType'
          }
        }, 
        {
          '$unwind': {
            'path': '$BodyType'
          }
        },
        {
          $match:insuranceMatch
        },
       
      
      ]
      let afcet = {};
      let currentDate = new Date();
      let back90Days = new Date(
        currentDate.setDate(currentDate.getDate() - 90)
      );
      let back180Days = new Date(
        currentDate.setDate(currentDate.getDate() - 180)
      );
      let back270Days = new Date(
        currentDate.setDate(currentDate.getDate() - 270)
      );
      let back360Days = new Date(
        currentDate.setDate(currentDate.getDate() - 360)
      );
      back90Days = back90Days.toISOString();
      back180Days = back180Days.toISOString();
      back270Days = back270Days.toISOString();
      back360Days = back360Days.toISOString();
      currentDate = new Date().toISOString();

      afcet["1-90"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(currentDate) } },
              { new_lead_timestamp: { $gte: new Date(back90Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["91-180"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back90Days) } },
              { new_lead_timestamp: { $gte: new Date(back180Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["181-270"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back180Days) } },
              { new_lead_timestamp: { $gte: new Date(back270Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["271-360"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back270Days) } },
              { new_lead_timestamp: { $gte: new Date(back360Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["360+"] = [
        {
          $match: {
            $and: [{ new_lead_timestamp: { $lte: new Date(back90Days) } }],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      aggregate.push({
        $facet: afcet,
      });
      let data = await NewLeadsModels.aggregate(
       aggregate
      )
      if (data.length) {
        data = data[0]
        let dataBoj = {
          "1-90":data["1-90"] && data["1-90"][0]  && data["1-90"][0]?data["1-90"][0].primium :0,
          "91-180":data["91-180"] && data["91-180"][0] && data["91-180"][0]?data["91-180"][0].primium:0,
          "181-270":data["181-270"] && data["181-270"][0] && data["181-270"][0]?data["181-270"][0].primium:0,
          "271-360":data["271-360"] && data["271-360"][0] && data["271-360"][0]?data["271-360"][0].primium:0,
          "360+":data["360+"] && data["360+"][0] && data["360+"][0]?data["360+"][0].primium:0
        }
        return res.json({ status: 200, message: "Data Found", data: dataBoj });
      } 
      return  res.json({ status: 400, message: "Data Not Found" ,data:[]});
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getHomeHypothitcalBusiness:async (req,res)=>{
    try {
      let user = req.user;
      let payload = req.body;
      let userType = user.usertype;
      let company = user?.insurance_company;
      let insuranceMatch = {};
      let matchObj = {
        plan_company_id: {
          $exists: true,
        },
        final_price: {
          $exists: true,
        },
        policy_issued_status: 1,
      };
      let hypothitCalMatch = {};
      let rate = payload?.rate?.toString();
      if (rate?.includes("%")) {
        rate = rate.split("%")[0];
        rate = +rate;
      } else {
        rate = +rate;
      }
      if (rate) {
        matchObj["homeRate"] = { $gte: rate };
      }
      if (payload?.buldingType) {
        hypothitCalMatch["planType.home_plan_type"] =
          payload?.buldingType?.trim();
      }
      if (payload?.planCategory) {
        hypothitCalMatch["homeCategories.plan_category_name"] =
          payload?.planCategory?.trim();
      }

      if (payload?.location?.length) {
        matchObj["lead_location"] = {
          $in: payload.location.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type };
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = {
          $in: payload.lob.map((data) => mongoose.Types.ObjectId(data)),
        };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = {
          $ne:mongoose.Types.ObjectId(company)
        }
      }
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId(
        "641bf0a2cbfce023c8c76724"
      );
      matchObj["plan_id"] = {
        $exists: true,
      };

      console.log("matchObj.....................", matchObj);

      let aggregate = [
        {
          $match: matchObj,
        },

        {
          $lookup: {
            from: "home_plan_type_lists",
            localField: "home_plan_type",
            foreignField: "_id",
            as: "planType",
          },
        },
        {
          $lookup: {
            from: "home_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "homePlan",
          },
        },
        {
          $lookup: {
            from: "plan_categories",
            localField: "homePlan.plan_category_id",
            foreignField: "_id",
            as: "homeCategories",
          },
        },
        {
          $unwind: {
            path: "$homeCategories",
          },
        },
        {
          $unwind: {
            path: "$planType",
          },
        },
        {
          $match: hypothitCalMatch,
        },
      ];
      let afcet = {};
      let currentDate = new Date();
      let back90Days = new Date(
        currentDate.setDate(currentDate.getDate() - 90)
      );
      let back180Days = new Date(
        currentDate.setDate(currentDate.getDate() - 180)
      );
      let back270Days = new Date(
        currentDate.setDate(currentDate.getDate() - 270)
      );
      let back360Days = new Date(
        currentDate.setDate(currentDate.getDate() - 360)
      );
      back90Days = back90Days.toISOString();
      back180Days = back180Days.toISOString();
      back270Days = back270Days.toISOString();
      back360Days = back360Days.toISOString();
      currentDate = new Date().toISOString();

      afcet["1-90"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(currentDate) } },
              { new_lead_timestamp: { $gte: new Date(back90Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["91-180"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back90Days) } },
              { new_lead_timestamp: { $gte: new Date(back180Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["181-270"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back180Days) } },
              { new_lead_timestamp: { $gte: new Date(back270Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["271-360"] = [  
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back270Days) } },
              { new_lead_timestamp: { $gte: new Date(back360Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["360+"] = [
        {
          $match: {
            $and: [{ new_lead_timestamp: { $lte: new Date(back90Days) } }],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      aggregate.push({
        $facet: afcet,
      });

      let data = await NewLeadsModels.aggregate(aggregate);
      if (data.length) {
        data = data[0];
        let dataBoj = {
          "1-90":
            data["1-90"] && data["1-90"][0] && data["1-90"][0]
              ? data["1-90"][0].primium
              : 0,
          "91-180":
            data["91-180"] && data["91-180"][0] && data["91-180"][0]
              ? data["91-180"][0].primium
              : 0,
          "181-270":
            data["181-270"] && data["181-270"][0] && data["181-270"][0]
              ? data["181-270"][0].primium
              : 0,
          "271-360":
            data["271-360"] && data["271-360"][0] && data["271-360"][0]
              ? data["271-360"][0].primium
              : 0,
          "360+":
            data["360+"] && data["360+"][0] && data["360+"][0]
              ? data["360+"][0].primium
              : 0,
        };
        return res.json({ status: 200, message: "Data Found", data: dataBoj });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error);
    }
  },
  getYachtHypothitcalBusiness: async (req, res, next) => {
    try {
      let user = req.user
      console.log("user......................",)
      console.log("user.................", user)
      let payload = req.body
      console.log(payload,"........ ")
      let userType = user.usertype
      let company = user?.insurance_company
      let rate = payload?.rate?.toString()
      if (rate?.includes("%")) {
        rate = rate.split("%")[0]
        rate = + rate
      } else {
        rate = +rate
      }
      let matchObj = {
        plan_company_id: {
          $exists: true
        },
        final_price: {
          $exists: true
        },
        policy_issued_status: 1
      }
      let insuranceMatch = {}

      if (payload?.location?.length) {
        matchObj["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.policyType && payload?.policyType?.toLowerCase() == "comprehensive") {
        // matchObj["last_year_policy_type"] = 'Comprehensive'
        matchObj["yatchRate"] = {
          $gte: rate
        }
      }
      if (payload?.policyType && payload?.policyType?.toLowerCase() == "Third Party Liability (TPL)"?.toLowerCase()) {
        // matchObj["last_year_policy_type"] = payload?.policyType?.trim()
        matchObj["final_price"] = {
          $gte: rate
        }
      }
      if (payload?.bodyName) {
        insuranceMatch["BodyType.yacht_body_type"] = payload?.bodyName?.trim()
      }
      if (payload?.business_type?.length) {
        matchObj["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        matchObj["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if((userType?.toString() == "653604248028cba2487f7d2a") &&company ){
        matchObj["plan_company_id"] = {
          $ne:mongoose.Types.ObjectId(company)
        }
      }
      matchObj["type_of_policy"] = mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739')
      matchObj["YachtVarient"] = {
        '$exists': true
      }
      console.log("...........................", insuranceMatch)
      // matchObj["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      let aggregate = [{
        $match: matchObj,
      },
      {
        '$addFields': {
          'variantId': {
            '$toObjectId': '$YachtVarient'
          }
        }
      },
      {
        '$lookup': {
          'from': 'yacht_plans',
          'localField': 'plan_id',
          'foreignField': '_id',
          'as': 'PlanData'
        }
      },
      {
        '$unwind': {
          'path': '$PlanData'
        }
        },
      {
        '$lookup': {
          'from': 'yachtmodels',
          'localField': 'YachtVarient',
          'foreignField': '_id',
          'as': 'variantData'
        }
      },
      {
        '$lookup': {
          'from': 'policy_types',
          'localField': 'PlanData.policy_type_id',
          'foreignField': '_id',
          'as': 'policyData'
        }
      },
      {
        '$unwind': {
          'path': '$variantData'
        }
      },
      {
        '$lookup': {
          'from': 'yatch_body_type_lists',
          'localField': 'variantData.bodyTypeId',
          'foreignField': '_id',
          'as': 'BodyType'
        }
      },
      {
        '$unwind': {
          'path': '$BodyType'
        }
      },
      {
        $match: insuranceMatch
      },


      ]
      let afcet = {};
      let currentDate = new Date();
      let back90Days = new Date(
        currentDate.setDate(currentDate.getDate() - 90)
      );
      let back180Days = new Date(
        currentDate.setDate(currentDate.getDate() - 180)
      );
      let back270Days = new Date(
        currentDate.setDate(currentDate.getDate() - 270)
      );
      let back360Days = new Date(
        currentDate.setDate(currentDate.getDate() - 360)
      );
      back90Days = back90Days.toISOString();
      back180Days = back180Days.toISOString();
      back270Days = back270Days.toISOString();
      back360Days = back360Days.toISOString();
      currentDate = new Date().toISOString();

      afcet["1-90"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(currentDate) } },
              { new_lead_timestamp: { $gte: new Date(back90Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["91-180"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back90Days) } },
              { new_lead_timestamp: { $gte: new Date(back180Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["181-270"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back180Days) } },
              { new_lead_timestamp: { $gte: new Date(back270Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["271-360"] = [
        {
          $match: {
            $and: [
              { new_lead_timestamp: { $lte: new Date(back270Days) } },
              { new_lead_timestamp: { $gte: new Date(back360Days) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      afcet["360+"] = [
        {
          $match: {
            $and: [{ new_lead_timestamp: { $lte: new Date(back90Days) } }],
          },
        },
        {
          $group: {
            _id: null,
            primium: {
              $sum: "$final_price",
            },
          },
        },
      ];
      aggregate.push({
        $facet: afcet,
      });
      let data = await NewLeadsModels.aggregate(
        aggregate
      )
      
      if (data.length) {
        data = data[0]
        let dataBoj = {
          "1-90": data["1-90"] && data["1-90"][0] && data["1-90"][0] ? data["1-90"][0].primium : 0,
          "91-180": data["91-180"] && data["91-180"][0] && data["91-180"][0] ? data["91-180"][0].primium : 0,
          "181-270": data["181-270"] && data["181-270"][0] && data["181-270"][0] ? data["181-270"][0].primium : 0,
          "271-360": data["271-360"] && data["271-360"][0] && data["271-360"][0] ? data["271-360"][0].primium : 0,
          "360+": data["360+"] && data["360+"][0] && data["360+"][0] ? data["360+"][0].primium : 0
        }
        return res.json({ status: 200, message: "Data Found", data: dataBoj });
      }
      return res.json({ status: 400, message: "Data Not Found", data: [] });
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  //best quotes
  getMotorBestQuotes: async (req, res) => {
    try {
      const limit = +req.query.limit
      result = await BestPlanModels.aggregate([
        {
          $match: {
            status: 1,
            lob: mongoose.Types.ObjectId('6418643bf42eaf5ba1c9e0ef')
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $unwind: {
            path: '$lob'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $unwind: {
            path:'$company_id'
          }
        },
        // {
        //   $lookup: {
        //     from: "repair_types",
        //     localField: "repair_type",
        //     foreignField: "_id",
        //     as: "repair_type",
        //   },
        // },
        // {
        //   $lookup: {
        //     path:'$repair_type'
        //   }
        // },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $unwind: {
            path:'$nature_of_plan'
          }
        },
        {
          $lookup: {
            from: 'plan_categories',
            localField: 'plan_category',
            foreignField: "_id",
            as: 'plan_category'
          }
        },
        {
          $unwind: {
            path:'$plan_category'
          }
        },
        {
          $lookup: {
            from: 'policy_types',
            localField: 'policy_type',
            foreignField: '_id',
            as: 'policy_type'
          }
        },
        {
          $unwind: {
            path:'$policy_type'
          }
        },
        {
          $project: {
            'lob.line_of_business_name': 1,
            'company_id.company_name': 1,
            'company_id.company_logo': 1,
            // 'repair_type.repair_type_name': 1,
            'nature_of_plan.nature_of_plan_name': 1,
            // 'plan_category.plan_category_name': 1,
            'policy_type.policy_type_name': 1,
            best_plan_price: 1,
            best_plan_topup:1
          }
        },
        {
          $limit: limit,
        },
      ])
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
      console.log(error)
    }
  },
  getTravelBestQuotes: async (req, res) => {
    try {
      const limit = +req.query.limit
      result = await BestPlanModels.aggregate([
        {
          $match: {
            status: 1,
            lob: mongoose.Types.ObjectId('6418645df42eaf5ba1c9e0f6')
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $unwind: {
            path: '$lob'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $unwind: {
            path: '$company_id'
          }
        },
        // {
        //   $lookup: {
        //     from: "repair_types",
        //     localField: "repair_type",
        //     foreignField: "_id",
        //     as: "repair_type",
        //   },
        // },
        // {
        //   $lookup: {
        //     path:'$repair_type'
        //   }
        // },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $unwind: {
            path:'$nature_of_plan'
          }
        },
        // {
        //   $lookup: {
        //     from: 'plan_categories',
        //     localField: 'plan_category',
        //     foreignField: "_id",
        //     as: 'plan_category'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$plan_category'
        //   }
        // },
        // {
        //   $lookup: {
        //     from: 'policy_types',
        //     localField: 'policy_type',
        //     foreignField: '_id',
        //     as: 'policy_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$policy_type'
        //   }
        // },
        {
          $project: {
            'lob.line_of_business_name': 1,
            'company_id.company_name': 1,
            'company_id.company_logo': 1,
            // 'repair_type.repair_type_name': 1,
            'nature_of_plan.nature_of_plan_name': 1,
            // 'plan_category.plan_category_name': 1,
            'policy_type.policy_type_name': 1,
            best_plan_price: 1,
            best_plan_topup: 1
          }
        },
        {
          $limit: limit,
        },
      ])
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
      console.log(error)
    }
  },
  getHomeBestQuotes: async (req, res) => {
    try {
      const limit = +req.query.limit

      result = await BestPlanModels.aggregate([
        {
          $match: {
            status: 1,
            lob: mongoose.Types.ObjectId('641bf0a2cbfce023c8c76724')
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $unwind: {
            path: '$lob'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $unwind: {
            path: '$company_id'
          }
        },
        // {
        //   $lookup: {
        //     from: "repair_types",
        //     localField: "repair_type",
        //     foreignField: "_id",
        //     as: "repair_type",
        //   },
        // },
        // {
        //   $lookup: {
        //     path:'$repair_type'
        //   }
        // },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $unwind: {
            path: '$nature_of_plan'
          }
        },
        // {
        //   $lookup: {
        //     from: 'plan_categories',
        //     localField: 'plan_category',
        //     foreignField: "_id",
        //     as: 'plan_category'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$plan_category'
        //   }
        // },
        // {
        //   $lookup: {
        //     from: 'policy_types',
        //     localField: 'policy_type',
        //     foreignField: '_id',
        //     as: 'policy_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$policy_type'
        //   }
        // },
        {
          $project: {
            'lob.line_of_business_name': 1,
            'company_id.company_name': 1,
            'company_id.company_logo': 1,
            // 'repair_type.repair_type_name': 1,
            'nature_of_plan.nature_of_plan_name': 1,
            // 'plan_category.plan_category_name': 1,
            'policy_type.policy_type_name': 1,
            best_plan_price: 1,
            best_plan_topup: 1
          }
        },
        {
          $limit: limit,
        },
      ])
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
      console.log(error)
    }
  },
  getYachtBestQuotes: async (req, res) => {
    try {
      const limit = +req.query.limit

      result = await BestPlanModels.aggregate([
        {
          $match: {
            status: 1,
            lob: mongoose.Types.ObjectId('641bf0bbcbfce023c8c76739')
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $unwind: {
            path: '$lob'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $unwind: {
            path: '$company_id'
          }
        },
        // {
        //   $lookup: {
        //     from: "repair_types",
        //     localField: "repair_type",
        //     foreignField: "_id",
        //     as: "repair_type",
        //   },
        // },
        // {
        //   $lookup: {
        //     path:'$repair_type'
        //   }
        // },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $unwind: {
            path: '$nature_of_plan'
          }
        },
        // {
        //   $lookup: {
        //     from: 'plan_categories',
        //     localField: 'plan_category',
        //     foreignField: "_id",
        //     as: 'plan_category'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$plan_category'
        //   }
        // },
        // {
        //   $lookup: {
        //     from: 'policy_types',
        //     localField: 'policy_type',
        //     foreignField: '_id',
        //     as: 'policy_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$policy_type'
        //   }
        // },
        {
          $project: {
            'lob.line_of_business_name': 1,
            'company_id.company_name': 1,
            'company_id.company_logo': 1,
            // 'repair_type.repair_type_name': 1,
            'nature_of_plan.nature_of_plan_name': 1,
            // 'plan_category.plan_category_name': 1,
            'policy_type.policy_type_name': 1,
            best_plan_price: 1,
            best_plan_topup: 1
          }
        },
        {
          $limit: limit,
        },
      ])
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
      console.log(error)
    }
  },
  getMedicalBestQuotes: async (req, res) => {
    try {
      const limit = +req.query.limit
      
      result = await BestPlanModels.aggregate([
        {
          $match: {
            status: 1,
            lob: mongoose.Types.ObjectId('641bf214cbfce023c8c76762')
          },
        },
        {
          $lookup: {
            from: "line_of_businesses",
            localField: "lob",
            foreignField: "_id",
            as: "lob",
          }
        },
        {
          $unwind: {
            path: '$lob'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_id",
          },
        },
        {
          $unwind: {
            path: '$company_id'
          }
        },
        // {
        //   $lookup: {
        //     from: "repair_types",
        //     localField: "repair_type",
        //     foreignField: "_id",
        //     as: "repair_type",
        //   },
        // },
        // {
        //   $lookup: {
        //     path:'$repair_type'
        //   }
        // },
        {
          $lookup: {
            from: "nature_of_plans",
            localField: "nature_of_plan",
            foreignField: "_id",
            as: "nature_of_plan",
          },
        },
        {
          $unwind: {
            path: '$nature_of_plan'
          }
        },
        // {
        //   $lookup: {
        //     from: 'plan_categories',
        //     localField: 'plan_category',
        //     foreignField: "_id",
        //     as: 'plan_category'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$plan_category'
        //   }
        // },
        // {
        //   $lookup: {
        //     from: 'policy_types',
        //     localField: 'policy_type',
        //     foreignField: '_id',
        //     as: 'policy_type'
        //   }
        // },
        // {
        //   $unwind: {
        //     path: '$policy_type'
        //   }
        // },
        {
          $project: {
            'lob.line_of_business_name': 1,
            'company_id.company_name': 1,
            'company_id.company_logo': 1,
            // 'repair_type.repair_type_name': 1,
            'nature_of_plan.nature_of_plan_name': 1,
            // 'plan_category.plan_category_name': 1,
            'policy_type.policy_type_name': 1,
            best_plan_price: 1,
            best_plan_topup: 1
          }
        },
        {
          $limit: limit,
        },
      ])
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
      console.log(error)
    }
  }
}
