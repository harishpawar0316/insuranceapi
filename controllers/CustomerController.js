const mongoose = require("mongoose");
const { Customer } = require("../models/Customer");
const bcrypt = require("bcryptjs");
const { generate_token } = require("../helper/genrate_token");
const { sendEmail } = require("../helper/sendEmail");
const { sendServerEmail } = require("../helper/sendEmail")
const { Claims } = require("../models/claims")
const XLSX = require("xlsx");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const md5 = require("md5");
// const { default: mongoose } = require("mongoose");
const CustomerComplaint = require("../models/customerComplaints");
const QueryModel = require("../models/complaint");
const axios = require('axios');

const JWT_KEY = process.env.secretOrKey;
module.exports = {
  add_customer: async (req, res) => {
    try {
      let emailtemplatefile;
      let payload = req.body;
      let customer_data;
      customer_data = await Admin.findOne({ email: payload.email });
      if (customer_data) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "This Email ID Already Exist",
            data: {},
          });
      }
      customer_data = new Admin(
        {
          ...payload,
          password: await md5(payload.password),
        }
      );
      customer_data = await customer_data.save();
      customer_data = customer_data.toObject();
      customer_data.password = undefined;
      let token = generate_token({ id: customer_data._id });
      customer_data["token"] = token;
      if (customer_data) {

        emailtemplatefile = path.join(process.cwd(), "./views/emailverificationtemplate.ejs")
        console.log({ emailtemplatefile })
        const link = `${req.headers.origin}/emailverify/${token}`
        const emailtemplate = await ejs
          .renderFile(
            emailtemplatefile,
            {
              link,
              email: customer_data.email,
              name: customer_data.first_name
            }
          )
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err)
          });
        // let options = {
        //   email: customer_data.email,
        //   subject: "Email  Verification",
        //   text: emailtemplate,
        // };
        let emaildata = {}
        await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'VERIFICATION'}`)
          .then(data => {
            if (data.message == 'Email template fetched') {
              emaildata = data.data
            } else {
              emaildata.subject = 'Email Verification'
              emaildata.template_id = '6662a9c532b26165203cce1b'
              emaildata.body = `<p>Dear Valued customer,
                       This is to verify your Email.</p>`
            }
          })
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: [customer_data.email],
          cc: [],
          bcc: [],
          text: emailtemplate,
          subject: emaildata.subject,
          attachments: [],
          template_id: emaildata.template_id
        };
        sendServerEmail(emailPayload);
        return res
          .status(200)
          .json({
            status: 200,
            message: "Email sent successfully please verify your email",
            data: customer_data,
          });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Customer Not Added", data: {} });
      }
    } catch (err) {
      console.log(err);
    }
  },
  email_verification: async (req, res) => {
    try {
      let emailtemplatefile = path.join(__dirname, "../views/emailverificationtemplate.ejs")
      var existUser = null;
      let email = req.query.email;
      let admin = req.query.admin;

      // return false;
      if (!email) {
        return res
          .status(400)
          .json({ status: 400, message: "Please Provide Email ID", data: {} });
      }
      if (email && admin) {
        emailtemplatefile = path.join(__dirname, "../views/adminemailverificationtemplate.ejs")
        existUser = await Admin.findOne({ email })
        console.log("existUser", existUser)
      }
      else if (email && admin == undefined) {
        existUser = await Admin.findOne({ email })
      }
      if (!existUser) {
        return res
          .status(400)
          .json({ status: 404, message: "User Not Found", data: {} });
      }
      const token = jwt.sign({ id: existUser._id }, JWT_KEY, {
        // expiresIn: "30m",
      });
      if (!req.headers.origin) {
        return res.status(406).json({
          status: 406,
          message: "please enter email id from valid User Agent",
          data: {},
        });
      }
      const link = `${req.headers.origin}/ResetPassword/${token}`;
      const emailtemplate = await ejs
        .renderFile(
          emailtemplatefile,
          {
            link,
            name: existUser.name ? existUser.name : existUser.full_name ? existUser.full_name : ""
          }
        )
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log("email reder error", err)
          return res.status(400).json({
            message: "Error ",
            error: err,
          });
        });

      // let options = {
      //   email: email,
      //   subject: "Email  Verification",
      //   text:emailtemplate,
      // };
      // sendEmail(options);
      let emaildata = {}
      await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${'VERIFICATION'}`, requestOptions)
        .then(data => {
          if (data.message == 'Email template fetched') {
            emaildata = data.data
          } else {
            emaildata.subject = 'Email Verification'
            emaildata.template_id = '6662a9c532b26165203cce1b'
            emaildata.body = `<p>Dear valued Customer,
                        This is to verify your email</p>`
          }
        })
      let emailPayload = {
        sender: 'dev@handsintechnology.com',
        receivers: [customer_data.email],
        cc: [],
        bcc: [],
        text: emailtemplate,
        subject: emaildata.subject,
        attachments: [],
        template_id: emaildata.template_id
      };
      sendServerEmail(emailPayload);
      return res.status(200).json({
        status: 200,
        message: "Email sent to verify your Email ID",
        data: {},
      });
    } catch (err) {
      console.log(err);
    }
  },
  verify_email: async (req, res) => {
    try {
      console.log(req.user);
      if (req.user) {
        await Admin.findByIdAndUpdate(req.user._id, { status: 1 })
        return res.status(200).json({
          status: 200,
          message: "Email Verified Successfully",
          data: {},
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Email is not verify",
          data: {},
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 500,
        message: "Something is wrong",
        data: {},
      });
    }
  },
  login_customer: async (req, res) => {
    try {
      let email = req.body.email;
      let password = md5(req.body.password);
      console.log(email, password);
      if (!email || !password) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email and Passord is Required for Login",
            data: {},
          });
      }
      let customer_data = await Admin.findOne({ email: email, status: 1 });
      console.log(customer_data, "customer_data")
      if (!customer_data || password != customer_data.password) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Incorrect email And Password",
            data: {},
          });
      }
      let token = generate_token({ id: customer_data._id });
      customer_data.password = undefined;
      return res
        .status(200)
        .json({
          status: 200,
          message: "User Login Successfully ",
          token: token,
          data: customer_data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  send_otp_email: async (req, res) => {
    try {
      let email = req.body.email;
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Please Provide Email ID",
            data: {},
          });
      }
      let customer_data = await Admin.findOne({ email: email });
      console.log(customer_data, "customer_data")
      if (!customer_data) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Please Provide Coreect Email ID",
            data: {},
          });
      }
      let otp = Math.floor(1000 + Math.random() * 9000);

      let emaildata
      let template_id
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let searchquery = 'customer login otp'
      await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${searchquery}`, requestOptions)
        .then(data => {
          if (data.status == 200) {
            emaildata = data.data
            console.log(emaildata, "emaildata2")
          } else {
            return res.status(404).json({ status: 404, message: "Email Template Not Found", data: {} });
          }
        })

      console.log(emaildata, "emaildata3")
      let repw = 'otp_here'
      let neww = otp
      let newtext = emaildata?.data?.body?.replace(new RegExp(repw, 'g'), neww)

      console.log({ "newtext": newtext, "otp": otp, "email": email, "emaildata": emaildata })

      // let options = {
      //   text: `Your OTP is ${otp}`,
      //   email: email,
      //   subject: "JDV OTP for Login",
      // };


      let emailPayload = {
        sender: 'dev@handsintechnology.com',
        receivers: [email],
        cc: [],
        bcc: [],
        text: newtext,
        subject: emaildata?.data?.subject,
        attachments: [],
        template_id: emaildata?.data?._id
      };
      console.log(emailPayload, "emailPayload")

      // sendEmail(options);
      sendServerEmail(emailPayload);

      await Admin.findByIdAndUpdate(customer_data._id, { loginOtp: otp });

      return res
        .status(200)
        .json({
          status: 200,
          message: "OTP Send in Your Email",
        });
    } catch (err) {
      console.log(err);
    }
  },

  verify_otp: async (req, res) => {
    try {
      let email = req.body.email;
      let otp = req.body.otp;
      console.log(email, otp);
      if (!email || !otp) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Please Provide Email ID and OTP",
            data: {},
          });
      }
      let customer_data = await Admin.findOne({ email: email });
      let userOtp = customer_data.loginOtp;
      let token = generate_token({ id: customer_data._id });
      if (userOtp == otp) {
        await Admin.findByIdAndUpdate(customer_data._id, { loginOtp: "" });
        return res
          .status(200)
          .json({
            status: 200,
            message: "OTP Verified Successfully",
            token: token,
            data: customer_data,
          });
      } else {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Please Provide Correct OTP",
            data: {},
          });
      }
    } catch (err) {
      console.log(err);
    }
  },


  send_email_forgot_password: async (req, res) => {
    try {
      let { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ status: 400, message: "Please Provide Email ID", data: {} });
      }
      let costomer_data = await Admin.findOne({ email: email });
      if (!costomer_data) {
        return res.status(404).json({
          status: 404,
          message: "Please Provide Coreect Email ID",
          data: {},
        });
      }
      let link =
        "https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/";
      // let options = {
      //   text: `please update your password and click Here  ${link}`,
      //   email: email,
      //   subject: "Update Password",
      // };
      // sendEmail(options);
      //new email
      let emaildata = {}
      let emailType = 'Update Password'
      await axios.get(`https://lmpapi.handsintechnology.in/api/getSpecificEmailTemplates?type=${emailType}`, requestOptions)
        .then(data => {
          if (data.message == 'Email template fetched') {
            emaildata = data.data
          } else {
            emaildata.subject = 'Update Password'
            emaildata.template_id = '6662a9c532b26165203cce1b'
            emaildata.body = `<p>Dear valued customer,
                        To update your password click here  ${link}.</p>`
          }
        })
      let emailPayload = {
        sender: 'dev@handsintechnology.com',
        receivers: [email],
        cc: [],
        bcc: [],
        text: `<p>Dear valued customer,
           please update your password and click Here  ${link}</p>`,
        subject: emaildata.subject,
        attachments: [],
        template_id: emaildata.template_id
      };
      sendServerEmail(emailPayload);
      return res.status(200).json({
        status: 200,
        message: "Link Send in Your Email Please Forgot Password",
        data: {},
      });
    } catch (err) {
      console.log(err);
    }
  },
  forgot_password: async (req, res) => {
    try {
      let user = req.user.toObject();
      let admin = req.query.admin;
      console.log(admin, ">>>>>>>admin key")
      console.log(user)
      user["token"] = generate_token({ id: user._id });
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: "Plaese Provide Currect Token" });
      }
      let { password } = req.body;

      if (!password) {
        return res
          .status(400)
          .json({ status: 400, message: "Please Provide New Password" });
      }
      if (admin == 1) {
        password = md5(password);
        await Admin.findByIdAndUpdate(
          user._id,
          { password: password },
          { new: true }
        );
      } else {
        password = await md5(password, 12);
        await Admin.findByIdAndUpdate(
          user._id,
          { password: password },
          { new: true }
        );
      }
      // console.log({ data: costomer_data });
      return res
        .status(200)
        .json({
          status: 200,
          message: "Password Updated Successefully",
          data: user,
        });
    } catch (err) {
      console.log(err);
    }
  },
  update_cutomer_profile: async (req, res) => {
    try {

      console.log(req.files)
      console.log(req.body)


      let id = req.query.id;
      let userData
      if (!id) {
        return res.status(400).json({ status: 400, message: "ID is required", data: {} });
      }
      userData = await Admin.findById(id)
      if (!userData) {
        return res.status(404).json({ status: 404, message: "Please Provide Correct Id", data: {} });
      }
      userData = await Admin.findByIdAndUpdate(id,
        {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          date_of_brith: req.body.date_of_brith,
          description: req.body.description,
          profile_image: req.files.profile_image
        }
        , { new: true })
      return res.status(200).json({ status: 200, message: "Profile Update Successfully !", data: userData });
    } catch (err) {
      console.log(err);
    }
  },
  addClaim: async (req, res) => {
    try {
      const file = req.files;
      let claimData;
      let payload = req.body;
      let userid = req.user?._id
      payload["user_id"] = userid;
      if (file) {
        payload["documents"] = file;
      }
      claimData = await Claims.create(payload);

      if (!claimData) {
        return res.status(400).json({ status: 400, message: "Bad request", data: claimData });
      }
      return res.status(201).json({ status: 201, message: "Claim Saved Successfully !", data: claimData });
    } catch (er) {
      console.log(er);
    }
  },
  getClaims: async (req, res) => {
    try {
      let userid = req.user?._id

      if (!userid) {
        return res.status(400).json({ status: 400, message: "User ID is Required ", data: [], totalCount: 0 })
      }
      let claimsDtails
      claimsDtails = await Claims.aggregate([
        {
          $match: {
            user_id: userid,
          }
        },
        {
          $lookup: {
            from: "new_leads",
            localField: "new_lead_id",
            foreignField: "_id",
            as: "leadsDetails"
          }
        },
        {
          '$lookup': {
            'from': 'motor_plans',
            'localField': 'leadsDetails.plan_id',
            'foreignField': '_id',
            'as': 'planDetails'
          }
        }, {
          '$unwind': {
            'path': '$planDetails'
          }
        }, {
          '$lookup': {
            'from': 'companies',
            'localField': 'leadsDetails.plan_company_id',
            'foreignField': '_id',
            'as': 'companyDetails'
          }
        }, {
          '$unwind': {
            'path': '$companyDetails'
          }
        }
      ])
      if (!claimsDtails.length) {
        return res.status(404).json({ status: 404, message: "Claim Not found", data: [], totalCount: 0 })
      }
      return res.status(200).json({ status: 200, message: "Claims Find Successfully !!", data: claimsDtails, totalCount: claimsDtails.length })
    } catch (err) {
      console.log(err)
    }
  },
  getAllClaims: async (req, res) => {

    try {
      const page = +req.params.page;
      const limit = +req.params.limit;
      let claimsDtails
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
                from: "new_leads",
                localField: "new_lead_id",
                foreignField: "_id",
                as: "leadsDetails"
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
      };
      claimsDtails = await Claims.aggregate([aggregate])
      if (!claimsDtails.length) {
        return res.status(404).json({ status: 404, message: "Claim Not found", data: [], totalCount: 0 })
      }
      return res.status(200).json({ status: 200, message: "Claims Find Successfully !!", data: claimsDtails, totalCount: claimsDtails.length })
    } catch (err) {
      console.log(err)
    }
  },
  getCustomerProfile: async (req, res) => {
    try {
      let customerData = req.user
      let customerdeatils = await Admin.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(customerData?._id)
          }
        },
        {
          '$lookup': {
            'from': 'usertypes',
            'localField': 'usertype',
            'foreignField': '_id',
            'as': 'userType'
          }
        },
        {
          '$unwind': {
            'path': '$userType'
          }
        }
      ])
      if (customerdeatils) {
        customerData["password"] = undefined
      }

      if (!customerdeatils.length) {
        return res.status(404).json({ status: 404, message: "Data not found", data: {} })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !", data: customerdeatils[0] })
    } catch (err) {
      console.log(err)
    }
  },
  getCustomerlist: async (req, res) => {
    try {
      let customerData = await Admin.find({ email: { $exists: true } }, { email: 1 })
      if (!customerData.length) {
        return res.status(404).json({ status: 404, message: "Data not found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !", data: customerData })
    } catch (err) {
      console.log(err)
    }
  },
  document_submit_login_customer: async (req, res) => {
    try {
      let email = req.query.email;
      if (!email) {
        return res
          .status(400)
          .json({
            status: 400,
            message: "Email is Required for Login",
            data: {},
          });
      }
      let customer_data = await Admin.findOne({ email: email });
      if (!customer_data) {
        return res
          .status(404)
          .json({
            status: 404,
            message: "Incorrect email And Password",
            data: {},
          });
      }
      let token = generate_token({ id: customer_data._id });
      customer_data.password = undefined;
      return res
        .status(200)
        .json({
          status: 200,
          message: "User Login Successfully ",
          token: token,
          data: customer_data,
        });
    } catch (err) {
      console.log(err);
    }
  },
  getSingleCustomer: async (req, res) => {
    try {
      let customerID = req.query.id
      let customerdeatils = await Admin.findById(customerID)
      if (!customerdeatils) {
        return res.status(404).json({ status: 404, message: "Data not found", data: {} })
      }
      return res.status(200).json({ status: 200, message: "Data Find Successfully !", data: customerdeatils })
    } catch (err) {
      console.log(err)
    }
  },
  UpdateClaimStatus: async (req, res) => {
    try {
      const payload = req.body
      let user = req.user
      console.log(payload, ".....<<<>>><>><<<>>>>.....")
      // return false;
      // console.log(user._id)
      // console.log(req.files,"........files")
      const result = await Claims.findByIdAndUpdate(payload.id, {
        remark: payload?.remark,
        policy_claim_status: payload?.status,
        updated_by: user?._id
      })
      if (result) {
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: [payload.email],
          cc: JSON.parse(payload.cc) || [],
          bcc: [],
          text: payload.text,
          subject: payload.subject,
          attachments: req.files ? req.files : [],
          template_id: payload?.templetId
        };

        sendServerEmail(emailPayload);
        return res.status(200).json({
          status: 200,
          message: "Status updated and email sent successfully",
          data: {},
          type: 'success'
        });
      } else {
        return res.status(500).json({
          status: 500, message: 'Something Went Wrong', data: {}, type: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateQueryStatus: async (req, res) => {
    try {
      const payload = req.body
      let user = req.user

      const result = await QueryModel.ComplaintModels.findByIdAndUpdate(payload.id, {
        complaint_status: payload?.status,
        updated_by: user?._id
      })

      console.log(payload)

      if (result) {
        let emailarr = []
        emailarr.push(payload.email)
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: emailarr,
          cc: payload.cc || [],
          bcc: [],
          text: payload.text,
          subject: payload.subject,
          attachments: req.files ? req.files : [],
          template_id: payload?.templetId
        };

        sendServerEmail(emailPayload);
        return res.status(200).json({
          status: 200,
          message: "Status updated and email sent successfully",
          data: {},
          type: 'success'
        });
      } else {
        // return res.status(500).json({
        //   status: 500, message: 'Something Went Wrong', data: {}, type: 'error'
        // })
      }
    } catch (error) {
      console.log(error)
    }
  },
  UpdateComplaintStatus: async (req, res) => {
    try {
      const payload = req.body
      let user = req.user

      console.log(payload, ".... payload")
      // const result = await CustomerComplaint.findByIdAndUpdate(payload.id, {
      //   complaint_status: payload?.status,
      //   updated_by: user?._id
      // })
      const result = await CustomerComplaint.customerComplaintModels.findByIdAndUpdate(payload.id, {
        complaint_status: payload?.status,
        updated_by: user?._id
      })

      if (result) {
        let emailarr = []
        emailarr.push(payload.email)
        let emailPayload = {
          sender: 'dev@handsintechnology.com',
          receivers: emailarr,
          cc: payload.cc || [],
          bcc: [],
          text: payload.text,
          subject: payload.subject,
          attachments: req.files ? req.files : [],
          template_id: payload?.templetId
        };

        sendServerEmail(emailPayload);
        return res.status(200).json({
          status: 200,
          message: "Status updated and email sent successfully",
          data: {},
          type: 'success'
        });
      } else {
        // return res.status(500).json({
        //   status: 500, message: 'Something Went Wrong', data: {}, type: 'error'
        // })
      }
    } catch (error) {
      console.log(error)
    }
  }
};