const mongoose = require('mongoose');
const moment = require('moment');
const NewLead = require('../models/New_Lead');
const Line_of_business = require('../models/Line_of_business');
const Location = require('../models/Locations');
const motor_plan_model = require('../models/Motor_plan');
const travel_plan_model = require('../models/Travel_plan');
const home_plan_model = require('../models/HomePlan');
const medical_plan_model = require('../models/MedicalPlan');
const yacht_plan_model = require('../models/YachtPlan');
const api_integrated_model = require('../models/Api_integrated');
const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const XLSX = require("xlsx");
const md5 = require("md5");
const { sendEmail } = require("../helper/sendEmail");
const { sendServerEmail } = require("../helper/sendEmail")
const groupMedicalModels = require("../models/groupMedicalLeads")
const { groupSerialNumber } = require("../helper/groupSerialNumber")
const memberRequestModels = require("../models/MemberRequests")
const groupmedicalleads = require("../models/groupMedicalLeads")
const GroupMedicalPlan = require("../models/GroupMedicalPlan")
// console.log("groupSerialNumber....................",groupSerialNumber)

const { aggregate } = require('../models/Home_condition');
const { messaging } = require('firebase-admin');
const SpecialIncentive = require('../models/SpecialIncentive');
const { ObjectId } = require('../helper/monogooseObjId');

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'application/pdf';
    case '.doc':
    case '.docx':
      return 'application/msword';
    case '.xls':
    case '.xlsx':
      return 'application/vnd.ms-excel';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}


module.exports = {
  add_new_lead: async (req, res) => {
    try {
      const new_lead = new NewLead({
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        lead_status: req.body.lead_status,
        type_of_policy: req.body.type_of_policy,
        direct_payment: req.body.direct_payment,
        forward_to: req.body.forward_to
      });
      let result = await new_lead.save();
      if (result != null) {
        res.json({ status: 200, message: "Added Successfully!", data: result });
      }
      else {
        res.json({ status: 400, message: "Added Successfully!" });
      }
    }
    catch (err) {
      res.json({ status: 400, message: "Error Occured!", data: err });
    }
  },

  get_new_leads: async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const mysort = { policy_type: 1 };
    const new_leads = await NewLead.aggregate([
      {
        $match: {
          lead_status: 'New',
        },
      },
      {
        $lookup:
        {
          from: "line_of_businesses",
          localField: "type_of_policy",
          foreignField: "_id",
          as: "policy_type"
        }
      },

    ]).sort(mysort).limit(limit * 1).skip((page - 1) * limit).exec();
    const count = await NewLead.countDocuments();
    res.json({ status: 200, message: "Data Found", data: new_leads, total: count });
  },

  get_daily_new_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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


      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "New",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "New",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }

          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  get_new_leads_count: async (req, res) => {
    try {
      let LOB = req.body.lob;
      let data = LOB.map(id => {
        return mongoose.Types.ObjectId(id);
      });

      let names = await Line_of_business.find({ _id: { $in: data } })
        .select('line_of_business_name')
        .lean();

      let result = [];
      for (let i = 0; i < data.length; i++) {
        let id = data[i];
        let monthlydata = await NewLead.aggregate([
          {
            $match: {
              type_of_policy: id,
            },
          },
          {
            $group: {
              _id: {
                year: { $year: "$new_lead_timestamp" },
                month: { $month: "$new_lead_timestamp" },
              },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              year: "$_id.year",
              month: {
                $let: {
                  vars: {
                    monthsInString: [
                      "", "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ],
                  },
                  in: { $arrayElemAt: ["$$monthsInString", "$_id.month"] },
                },
              },
              count: 1,
            },
          },
          {
            $sort: { "year": 1, "month": 1 },
          },
        ]);
        let monthlyCounts = [
          { month: "January", count: 0 },
          { month: "February", count: 0 },
          { month: "March", count: 0 },
          { month: "April", count: 0 },
          { month: "May", count: 0 },
          { month: "June", count: 0 },
          { month: "July", count: 0 },
          { month: "August", count: 0 },
          { month: "September", count: 0 },
          { month: "October", count: 0 },
          { month: "November", count: 0 },
          { month: "December", count: 0 }
        ];

        monthlydata.forEach(item => {
          const monthIndex = item.month - 1; // Adjust month index (0-based)
          const countObject = monthlyCounts.find(obj => obj.month === item.month);
          if (countObject) {
            countObject.count = item.count; // Update count value if the corresponding month is found
          }
        });

        let line_of_business_leads = monthlydata.reduce((total, item) => total + item.count, 0);

        result.push({
          line_of_business_name: names[i].line_of_business_name,
          monthlydata: monthlyCounts,
          total: line_of_business_leads
        });
      }

      res.json({ status: 200, message: "data found", data: result });
    }
    catch (err) {
      console.log(err);
    }
  },

  get_new_lead_detailsbyid: async (req, res) => {
    try {
      const result = await NewLead.aggregate([
        {
          $lookup:
          {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "policy_type"
          }
        },
        {
          $lookup:
          {
            from: "locations",
            localField: "lead_location",
            foreignField: "_id",
            as: "lead_location"
          },

        },
        {
          $lookup:
          {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "plan_company_id"
          },
        },
        {
          $lookup:
          {
            from: "motor_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "plan_id"
          },
        },
        {
          $addFields: {
            repaire_type_object_id: {
              $toObjectId: "$repaire_type_name"
            }
          }
        },
        {
          $lookup: {
            from: "repair_types",
            localField: "repaire_type_object_id",
            foreignField: "_id",
            as: "repair_type_name"
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "current_insurance_company_id",
            foreignField: "_id",
            as: "plan_company_id"
          }
        },
        {
          $lookup: {
            from: "yachtmakes",
            localField: "YachtMaker",
            foreignField: "_id",
            as: "YachtMaker"
          }
        }

      ]).match({ _id: mongoose.Types.ObjectId(req.body.ParamValue) }).exec();
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      }
      else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    }
    catch (err) {
      console.log(err);
    }
  },

  update_new_lead_details: async (req, res) => {
    try {
      const updateFields = {};
      let currentDate = new Date()

      let checkNewlead = await NewLead.findById(req.body.id)
      if (!checkNewlead) {
        return res.status(400).json({
          error: "Failed to find any lead for provided id",
          status: 400
        })
      }

      if (req.body.lead_status != undefined) {
        updateFields.lead_status = req.body.lead_status;
      }

      if (req.body.direct_payment != undefined) {
        updateFields.direct_payment = req.body.direct_payment;
      }

      if (req.body.forward_to != undefined) {
        updateFields.forward_to = mongoose.Types.ObjectId(req.body.forward_to);
        updateFields.recived_from = mongoose.Types.ObjectId(req.body.assigningagent);
        updateFields.assign_documentchaser_timestamp = currentDate

        // add the users to incentive if it has any
        const checkSpecialIncetive = await SpecialIncentive.aggregate([
          { $sort: { createdAt: -1 } },
          {
            $match: {
              $and: [
                { start_time: { $lte: currentDate } },
                { end_time: { $gte: currentDate } }
              ],
              roles: { $in: [mongoose.Types.ObjectId("6462250eb201a6f07b2dff3a")] },
              users: { $in: [mongoose.Types.ObjectId(req.body.forward_to)] },
              lobs: { $in: [mongoose.Types.ObjectId(checkNewlead.type_of_policy)] },
              locations: { $in: [mongoose.Types.ObjectId(checkNewlead.lead_location)] }
            }
          },
          {
            $project: {
              _id: 1
            }
          }
        ])
        if (checkSpecialIncetive && checkSpecialIncetive.length > 0) {

          const currentSpecialIncentives = checkNewlead.specialIncentive || [];
          const allIncentives = [...currentSpecialIncentives.map(item => item.toString()), ...checkSpecialIncetive.map(item => item._id.toString())]
          const updatedSpecialIncentives = Array.from(new Set(allIncentives)).map(id => mongoose.Types.ObjectId(id));
          updateFields.specialIncentive = [...updatedSpecialIncentives];

          for (let i = 0; i < checkSpecialIncetive.length; i++) {

            const checkIncentive = await SpecialIncentive.findById(checkSpecialIncetive[i])
            if (!checkIncentive) {
              return res.status(400).json({
                error: "Failed to find any incentive scheme for provided id",
                status: 400
              })
            }

            const { participants } = checkIncentive;
            let participantFound = false;

            for (let i = 0; i < participants.length; i++) {
              if (participants.length > 0 && (participants[i].user.toString() === req.body.forward_to) && participants[i].role === "DC") {
                participants[i].count = (participants[i].count || 0) + 1;
                participants[i].lead.push(mongoose.Types.ObjectId(req.body.id));
                participantFound = true;
                break;
              }
            }

            // if no participants found
            if (!participantFound) {
              const newParticipant = {
                user: mongoose.Types.ObjectId(req.body.forward_to),
                lead: [mongoose.Types.ObjectId(req.body.id)],
                count: 1,
                role: "DC"
              };
              participants.push(newParticipant);
            }

            console.log("participants", participants)

            await SpecialIncentive.findByIdAndUpdate(checkSpecialIncetive[i], {
              $set: {
                participants
              }
            })
          }
        }

        // check if the incentive for SA is fulfilled
        let incentives = updateFields.specialIncentive
        if (incentives && incentives.length > 0) {
          for (let i = 0; i < incentives.length; i++) {
            const checkIncentive = await SpecialIncentive.findById(incentives[i])
            if (!checkIncentive) {
              return res.status(400).json({
                error: "Failed to find any incentive scheme for provided id",
                status: 400
              })
            }

            const { start_time, end_time, participants, completed_by } = checkIncentive;

            if (currentDate > new Date(start_time) && new Date(end_time) >= currentDate) {
              const filteredList = participants.find(item => item.role === "SA" && item.user.toString() === req.body.assigningagent)
              if (filteredList === undefined) {
                continue;
              }

              const checkIfAgentExistsInCompleted = completed_by.find(item => item.user.toString() === filteredList.user.toString())
              if (checkIfAgentExistsInCompleted) {
                for (let i = 0; i < completed_by.length; i++) {
                  if (completed_by[i].user.toString() === filteredList.user.toString()) {
                    completed_by[i].count = (completed_by[i].count || 0) + 1;
                    completed_by[i].lead.push(mongoose.Types.ObjectId(req.body.id))
                    break;
                  }
                }
              } else {
                completed_by.push(filteredList)
              }

              console.log("completed_by", completed_by)

              await SpecialIncentive.findByIdAndUpdate(incentives[i], {
                $set: {
                  completed_by
                }
              })
            }
          }
        }
      }

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ status: 400, message: "No data to update" });
      }

      let newdetails = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: updateFields },
        { new: true }
      );

      if (newdetails != null) {
        return res.status(200).json({ status: 200, message: "Updated Successfully", data: newdetails });
      }
      else {
        return res.status(400).json({ status: 400, message: "Failed" });
      }
    }
    catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },

  get_hot_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Hot",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Hot",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }

          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();
      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  update_hot_lead_details: async (req, res) => {
    try {
      let newdetails = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { lead_status: req.body.lead_status } },
        { new: true }
      )
      if (newdetails != null) {
        res.json({ status: 200, message: "Updated Succesfully", data: newdetails });
      }
      else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_cold_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Cold",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Cold",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  update_cold_lead_details: async (req, res) => {
    try {
      let newdetails = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { lead_status: req.body.lead_status } },
        { new: true }
      )
      if (newdetails != null) {
        res.json({ status: 200, message: "Updated Succesfully", data: newdetails });
      }
      else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_warm_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Warm",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Warm",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  update_warm_lead_details: async (req, res) => {
    try {
      let newdetails = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { lead_status: req.body.lead_status } },
        { new: true }
      )
      if (newdetails != null) {
        res.json({ status: 200, message: "Updated Succesfully", data: newdetails });
      }
      else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_lostdrop_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Lost & Dropped",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Lost & Dropped",
            forward_to: { $exists: false },
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();
      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (error) {
      console.log(error)
    }
  },

  update_lostdrop_lead_details: async (req, res) => {
    try {
      let newdetails = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { lead_status: req.body.lead_status } },
        { new: true }
      )
      if (newdetails != null) {
        res.json({ status: 200, message: "Updated Succesfully", data: newdetails });
      }
      else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_close_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Closed",
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;
      let leads = await NewLead.aggregate([
        {
          $match: {
            lead_status: "Closed",
            type_of_policy: { $in: Line_of_business },
            lead_location: { $in: location },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();
      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  get_sales_pending_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 0,
            forward_to: { $exists: true },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            assigned_agent: { $in: assigned_agent },
            lead_status: { $ne: "Lost & Dropped" },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 0,
            forward_to: { $exists: true },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            assigned_agent: { $in: assigned_agent },
            lead_status: { $ne: "Lost & Dropped" },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
      ]).skip((page - 1) * limit).limit(limit * 1).exec();


      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  assigndcagent: async (req, res) => {
    try {
      let assigneddc = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { forward_to: req.body.forward_to, recived_from: req.body.assigningagent } },
        { new: true }
      )
      if (newdetails != null) {
        res.json({ status: 200, message: "Updated Succesfully", data: assigneddc });
      }
      else {
        res.json({ status: 400, message: "Failed" });
      }
    } catch (err) {
      res.send(err)
    }
  },

  get_dcassigned_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;

      const page = payload.page;
      const limit = payload.limit;

      let startDate, endDate;

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

      let matchCondition = {
        type_of_policy: { $in: Line_of_business },
        business_type: { $in: business_type },
        lead_location: { $in: location },
        forward_to: { $in: assigned_agent },
        lead_status: { $ne: "Lost & Dropped" },
        dcleadstatus: { $ne: "Pending" },
        dcleadforwardto: { $exists: false },
        new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      };

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: matchCondition,
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: matchCondition,
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'recived_from',
            foreignField: '_id',
            as: 'recived_from'
          }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  upload_documents: async (req, res) => {

    const leaddetails = await NewLead.findById(req.body.id);

    const idback_copy_status = req.body.emirates_idback_copy_status != "" ? req.body.emirates_idback_copy_status : leaddetails.emirates_idback_copy_status;
    const idback_copy_reason = req.body.emirates_idback_copy_reason != "" ? req.body.emirates_idback_copy_reason : leaddetails.emirates_idback_copy_reason;

    const emirates_idback_copy = req.files.emirates_idback_copy
    const emirates_idback_copy_status = idback_copy_status;
    const emirates_idback_copy_reason = idback_copy_reason;

    const idfront_copy_status = req.body.emirates_idfront_copy_status != "" ? req.body.emirates_idfront_copy_status : leaddetails.emirates_idfront_copy_status;
    const idfront_copy_reason = req.body.emirates_idfront_copy_reason != "" ? req.body.emirates_idfront_copy_reason : leaddetails.emirates_idfront_copy_reason;

    const emirates_idfront_copy = req.files.emirates_idfront_copy;
    const emirates_idfront_copy_status = idfront_copy_status;
    const emirates_idfront_copy_reason = idfront_copy_reason;

    const passport_status = req.body.passport_copy_status != "" ? req.body.passport_copy_status : leaddetails.passport_copy_status;
    const passport_reason = req.body.passport_copy_reason != "" ? req.body.passport_copy_reason : leaddetails.passport_copy_reason;

    const passport_copy = req.files.passport_copy;
    const passport_copy_status = passport_status;
    const passport_copy_reason = passport_reason;

    const visa_status = req.body.visa_copy_status != "" ? req.body.visa_copy_status : leaddetails.visa_copy_status;
    const visa_reason = req.body.visa_copy_reason != "" ? req.body.visa_copy_reason : leaddetails.visa_copy_reason;

    const visa_copy = req.files.visa_copy;
    const visa_copy_status = visa_status;
    const visa_copy_reason = visa_reason;

    const documents = await NewLead.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          emirates_idback_copy: emirates_idback_copy,
          emirates_idback_copy_status: emirates_idback_copy_status,
          emirates_idback_copy_reason: emirates_idback_copy_reason,
          emirates_idfront_copy: emirates_idfront_copy,
          emirates_idfront_copy_status: emirates_idfront_copy_status,
          emirates_idfront_copy_reason: emirates_idfront_copy_reason,
          passport_copy: passport_copy,
          passport_copy_status: passport_copy_status,
          passport_copy_reason: passport_copy_reason,
          visa_copy: visa_copy,
          visa_copy_status: visa_copy_status,
          visa_copy_reason: visa_copy_reason
        }
      },
      { new: true }
    )
    let result = await documents.save();
    if (result) {
      res.json({ status: 200, message: 'document uploaded Successfully', data: result });
    } else {
      res.json({ status: 400, message: 'Staff Not Added' });
    }
  },

  upload_sponsored_documents: async (req, res) => {

    const leaddetails = await NewLead.findById(req.body.id);

    const trade_license_status = req.body.trade_license_copy_status != "" ? req.body.trade_license_copy_status : leaddetails.trade_license_copy_status;
    const trade_license_reason = req.body.trade_license_copy_reason != "" ? req.body.trade_license_copy_reason : leaddetails.trade_license_copy_reason;

    const trade_license_copy = req.files.trade_license_copy;
    const trade_license_copy_status = trade_license_status;
    const trade_license_copy_reason = trade_license_reason;

    const vatcertificate_status = req.body.vat_certificate_copy_status != "" ? req.body.vat_certificate_copy_status : leaddetails.vat_certificate_copy_status;
    const vatcertificate_reason = req.body.vat_certificate_copy_reason != "" ? req.body.vat_certificate_copy_reason : leaddetails.vat_certificate_copy_reason;

    const vat_certificate_copy = req.files.vat_certificate_copy;
    const vat_certificate_status = vatcertificate_status;
    const vat_certificate_reason = vatcertificate_reason;

    const documents = await NewLead.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          trade_license_copy: trade_license_copy,
          trade_license_copy_status: trade_license_copy_status,
          trade_license_copy_reason: trade_license_copy_reason,
          vat_certificate_copy: vat_certificate_copy,
          vat_certificate_copy_status: vat_certificate_status,
          vat_certificate_copy_reason: vat_certificate_reason,
        }
      },
      { new: true }
    )
    let result = await documents.save();
    if (result) {
      res.json({ status: 200, message: 'document uploaded Successfully', data: result });
    } else {
      res.json({ status: 400, message: 'Staff Not Added' });
    }
  },

  upload_motor_documents: async (req, res) => {
    const leaddetails = await NewLead.findById(req.body.id);
    const drivinglicensefrontsidestatus = req.body.driving_license_front_side_status != "" ? req.body.driving_license_front_side_status : leaddetails.driving_license_front_side_status;
    const tradelicensereason = req.body.driving_license_front_side_reason != "" ? req.body.driving_license_front_side_reason : leaddetails.driving_license_front_side_reason;

    const driving_license_front_side = req.files.driving_license_front_side;
    const driving_license_front_side_status = drivinglicensefrontsidestatus;
    const driving_license_front_side_reason = tradelicensereason;

    const drivinglicensebacksidestatus = req.body.driving_license_back_side_status != "" ? req.body.driving_license_back_side_status : leaddetails.driving_license_back_side_status;
    const drivinglicensebacksidereason = req.body.driving_license_back_side_reason != "" ? req.body.driving_license_back_side_reason : leaddetails.driving_license_back_side_reason;

    const driving_license_back_side = req.files.driving_license_back_side;
    const driving_license_back_side_status = drivinglicensebacksidestatus;
    const driving_license_back_side_reason = drivinglicensebacksidereason;

    const mulkiyafrontsidestatus = req.body.mulkiya_front_side_status != "" ? req.body.mulkiya_front_side_status : leaddetails.mulkiya_front_side_status;
    const mulkiyafrontsidereason = req.body.mulkiya_front_side_reason != "" ? req.body.mulkiya_front_side_reason : leaddetails.mulkiya_front_side_reason;

    const mulkiya_front_side = req.files.mulkiya_front_side;
    const mulkiya_front_side_status = mulkiyafrontsidestatus;
    const mulkiya_front_side_reason = mulkiyafrontsidereason;

    const mulkiyabacksidestatus = req.body.mulkiya_back_side_status != "" ? req.body.mulkiya_back_side_status : leaddetails.mulkiya_back_side_status;
    const mulkiyabacksidereason = req.body.mulkiya_back_side_reason != "" ? req.body.mulkiya_back_side_reason : leaddetails.mulkiya_back_side_reason;

    const mulkiya_back_side = req.files.mulkiya_back_side;
    const mulkiya_back_side_status = mulkiyabacksidestatus;
    const mulkiya_back_side_reason = mulkiyabacksidereason;

    const noclaimcertificatestatus = req.body.no_claim_certificate_status != "" ? req.body.no_claim_certificate_status : leaddetails.no_claim_certificate_status;
    const noclaimcertificatereason = req.body.no_claim_certificate_reason != "" ? req.body.no_claim_certificate_reason : leaddetails.no_claim_certificate_reason;

    const no_claim_certificate = req.files.no_claim_certificate;
    const no_claim_certificate_status = noclaimcertificatestatus;
    const no_claim_certificate_reason = noclaimcertificatereason;

    const idback_copy_status = req.body.emirates_idback_copy_status != "" ? req.body.emirates_idback_copy_status : leaddetails.emirates_idback_copy_status;
    const idback_copy_reason = req.body.emirates_idback_copy_reason != "" ? req.body.emirates_idback_copy_reason : leaddetails.emirates_idback_copy_reason;

    const emirates_idback_copy = req.files.emirates_idback_copy
    const emirates_idback_copy_status = idback_copy_status;
    const emirates_idback_copy_reason = idback_copy_reason;

    const idfront_copy_status = req.body.emirates_idfront_copy_status != "" ? req.body.emirates_idfront_copy_status : leaddetails.emirates_idfront_copy_status;
    const idfront_copy_reason = req.body.emirates_idfront_copy_reason != "" ? req.body.emirates_idfront_copy_reason : leaddetails.emirates_idfront_copy_reason;

    const emirates_idfront_copy = req.files.emirates_idfront_copy;
    const emirates_idfront_copy_status = idfront_copy_status;
    const emirates_idfront_copy_reason = idfront_copy_reason;

    const documents = await NewLead.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          driving_license_front_side: driving_license_front_side,
          driving_license_front_side_status: driving_license_front_side_status,
          driving_license_front_side_reason: driving_license_front_side_reason,

          driving_license_back_side: driving_license_back_side,
          driving_license_back_side_status: driving_license_back_side_status,
          driving_license_back_side_reason: driving_license_back_side_reason,

          mulkiya_front_side: mulkiya_front_side,
          mulkiya_front_side_status: mulkiya_front_side_status,
          mulkiya_front_side_reason: mulkiya_front_side_reason,

          mulkiya_back_side: mulkiya_back_side,
          mulkiya_back_side_status: mulkiya_back_side_status,
          mulkiya_back_side_reason: mulkiya_back_side_reason,

          no_claim_certificate: no_claim_certificate,
          no_claim_certificate_status: no_claim_certificate_status,
          no_claim_certificate_reason: no_claim_certificate_reason,

          emirates_idfront_copy: emirates_idfront_copy,
          emirates_idfront_copy_status: emirates_idfront_copy_status,
          emirates_idfront_copy_reason: emirates_idfront_copy_reason,

          emirates_idback_copy: emirates_idback_copy,
          emirates_idback_copy_status: emirates_idback_copy_status,
          emirates_idback_copy_reason: emirates_idback_copy_reason,

        }
      },
      { new: true }

    )
    let result = await documents.save();
    if (result) {
      res.json({ status: 200, message: 'document uploaded Successfully', data: result });
    } else {
      res.json({ status: 400, message: 'Staff Not Added' });
    }
  },

  upload_travel_documents: async (req, res) => {
    const leaddetails = await NewLead.findById(req.body.id);

    const uaeresidencevisacopystatus = req.body.uae_residence_visa_copy_status != "" ? req.body.uae_residence_visa_copy_status : leaddetails.uae_residence_visa_copy_status;
    const uaeresidencevisacopyreason = req.body.uae_residence_visa_copy_reason != "" ? req.body.uae_residence_visa_copy_reason : leaddetails.uae_residence_visa_copy_reason;

    const uae_residence_visa_copy = req.files.uae_residence_visa_copy;
    const uae_residence_visa_copy_status = uaeresidencevisacopystatus;
    const uae_residence_visa_copy_reason = uaeresidencevisacopyreason;

    const documents = await NewLead.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          uae_residence_visa_copy: uae_residence_visa_copy,
          uae_residence_visa_copy_status: uae_residence_visa_copy_status,
          uae_residence_visa_copy_reason: uae_residence_visa_copy_reason,

        }
      },
      { new: true }

    )
    let result = await documents.save();
    if (result) {
      res.json({ status: 200, message: 'document uploaded Successfully', data: result });
    } else {
      res.json({ status: 400, message: 'Staff Not Added' });
    }

  },

  updatedcverification: async (req, res) => {
    try {
      const leaddetails = await NewLead.findById(req.body.id);
      const dc_lead_status = req.body.dcleadstatus != "" ? req.body.dcleadstatus : leaddetails.dcleadstatus;
      const dc_lead_forwardto = req.body.dcleadforwardto != "" ? req.body.dcleadforwardto : leaddetails.dcleadforwardto;
      const dc_lead_reason = req.body.dcleadreason != "" ? req.body.dcleadreason : leaddetails.dcleadreason;
      const assigningagent = req.body.assigningagent != "" ? req.body.assigningagent : leaddetails.assigningagent;
      const updateFields = {};
      let currentDate = new Date()

      let checkNewlead = await NewLead.findById(req.body.id)
      if (!checkNewlead) {
        return res.status(400).json({
          error: "Failed to find any lead for provided id",
          status: 400
        })
      }

      if (req.body.dcleadstatus != "") {
        updateFields.dcleadstatus = dc_lead_status;
      }

      if (req.body.dcleadreason != "") {
        updateFields.dcleadreason = dc_lead_reason;
      }

      if (req.body.dcleadforwardto != "") {
        updateFields.dcleadforwardto = dc_lead_forwardto;
        updateFields.dcrecived_from = assigningagent;
        updateFields.assign_policyissuer_timestamp = currentDate;

        // add the users to incentive if it has any
        const checkSpecialIncetive = await SpecialIncentive.aggregate([
          { $sort: { createdAt: -1 } },
          {
            $match: {
              $and: [
                { start_time: { $lte: currentDate } },
                { end_time: { $gte: currentDate } }
              ],
              roles: { $in: [mongoose.Types.ObjectId("64622526b201a6f07b2dff3e")] },
              users: { $in: [mongoose.Types.ObjectId(req.body.dcleadforwardto)] },
              lobs: { $in: [mongoose.Types.ObjectId(checkNewlead.type_of_policy)] },
              locations: { $in: [mongoose.Types.ObjectId(checkNewlead.lead_location)] }
            }
          },
          {
            $project: {
              _id: 1
            }
          }
        ])
        if (checkSpecialIncetive && checkSpecialIncetive.length > 0) {
          const currentSpecialIncentives = checkNewlead.specialIncentive || [];
          const allIncentives = [...currentSpecialIncentives.map(item => item.toString()), ...checkSpecialIncetive.map(item => item._id.toString())]
          const updatedSpecialIncentives = Array.from(new Set(allIncentives)).map(id => mongoose.Types.ObjectId(id));
          updateFields.specialIncentive = [...updatedSpecialIncentives];



          for (let i = 0; i < checkSpecialIncetive.length; i++) {

            const checkIncentive = await SpecialIncentive.findById(checkSpecialIncetive[i])
            if (!checkIncentive) {
              return res.status(400).json({
                error: "Failed to find any incentive scheme for provided id",
                status: 400
              })
            }

            const { participants } = checkIncentive
            let participantFound = false;

            for (let i = 0; i < participants.length; i++) {
              if (participants.length > 0 && (participants[i].user.toString() === req.body.dcleadforwardto) && (participants[i].role === "PI")) {
                participants[i].count = (participants[i].count || 0) + 1;
                participants[i].lead.push(mongoose.Types.ObjectId(req.body.id));
                participantFound = true;
                break;
              }
            }

            // if no participants found
            if (!participantFound) {
              const newParticipant = {
                user: mongoose.Types.ObjectId(req.body.dcleadforwardto),
                lead: [mongoose.Types.ObjectId(req.body.id)],
                count: 1,
                role: "PI"
              }
              participants.push(newParticipant);
            }

            console.log("participants", participants)


            await SpecialIncentive.findByIdAndUpdate(checkSpecialIncetive[i], {
              $set: {
                participants
              }
            })
          }
        }

        // check if the incentive for DC is fulfilled
        let incentives = updateFields.specialIncentive
        if (incentives && incentives.length > 0) {
          for (let i = 0; i < incentives.length; i++) {
            const checkIncentive = await SpecialIncentive.findById(incentives[i])
            if (!checkIncentive) {
              return res.status(400).json({
                error: "Failed to find any incentive scheme for provided id",
                status: 400
              })
            }

            const { start_time, end_time, participants, completed_by } = checkIncentive;
            if (currentDate > new Date(start_time) && new Date(end_time) >= currentDate) {
              const filteredList = participants.find(item => item.role === "DC" && item.user.toString() === assigningagent)

              if (filteredList === undefined) {
                continue;
              }

              const checkIfAgentExistsInCompleted = completed_by.find(item => item.user.toString() === filteredList.user.toString())
              if (checkIfAgentExistsInCompleted) {
                for (let i = 0; i < completed_by.length; i++) {
                  if (completed_by[i].user.toString() === filteredList.user.toString()) {
                    completed_by[i].count = (completed_by[i].count || 0) + 1;
                    completed_by[i].lead.push(mongoose.Types.ObjectId(req.body.id))
                    break;
                  }
                }
              } else {
                completed_by.push(filteredList)
              }

              console.log("completed_by", completed_by)

              await SpecialIncentive.findByIdAndUpdate(incentives[i], {
                $set: {
                  completed_by
                }
              })
            }
          }
        }
      }

      if (Object.keys(updateFields).length === 0) {
        res.json({ status: 400, message: "No data to update" });
        return;
      }
      const status = await NewLead.findOneAndUpdate(
        { _id: req.body.id },
        { $set: updateFields },
        { new: true }
      );
      let result = await status.save();
      if (result) {
        res.json({ status: 200, message: 'Document uploaded Successfully', data: status });
      } else {
        res.json({ status: 400, message: 'Staff Not Added' });
      }
    }
    catch (err) {
      console.log(err);
    }
  },

  get_dcassigned_pending_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;
      const page = payload.page;
      const limit = payload.limit;
      let agentid = await payload.agentid;

      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            forward_to: { $in: assigned_agent },
            dcleadstatus: { $eq: "Pending" },
            dcleadforwardto: { $exists: false },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            forward_to: { $in: assigned_agent },
            dcleadstatus: { $eq: "Pending" },
            dcleadforwardto: { $exists: false },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'recived_from',
            foreignField: '_id',
            as: 'recived_from'
          }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  get_piassigned_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;

      const page = payload.page;
      const limit = payload.limit;
      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 0,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            dcleadforwardto: { $in: assigned_agent },
            lead_status: { $ne: 'Lost & Dropped' },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 0,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            dcleadforwardto: { $in: assigned_agent },
            lead_status: { $ne: 'Lost & Dropped' },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          $lookup: {
            from: 'api_integrateds',
            localField: 'plan_company_id',
            foreignField: 'company_id',
            as: 'api_integrated',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'dcrecived_from',
            foreignField: '_id',
            as: 'dc_recived_from'
          },
        },
        {
          $sort: { new_lead_timestamp: -1 }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phoneno: 1,
            email: 1,
            "dc_recived_from.name": 1,
            "policy_type._id": 1,
            "policy_type.line_of_business_name": 1,
            new_lead_timestamp: 1,
            final_price: 1,
            "api_integrated.company_id": 1,
            "api_integrated.line_of_business_id": 1,
            "api_integrated.api_integrate": 1,
            "api_integrated.api_status": 1,
          }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  get_pi_issued_policy_leads: async (req, res) => {
    try {
      let payload = req.body;
      let location = await payload.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await payload.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await payload.business_type;
      let assigned_agent = await payload?.newagent;
      if (assigned_agent) {
        assigned_agent = assigned_agent?.map(data => mongoose.Types.ObjectId(data));
      }
      let dateRange = await payload.dateRange;
      let customstartdate = await payload.startdate;
      let customenddate = await payload.enddate;

      const page = payload.page;
      const limit = payload.limit;
      let startDate, endDate;

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

      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 1,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            dcleadforwardto: { $in: assigned_agent },
            lead_status: { $ne: 'Lost & Dropped' },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 1,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            lead_location: { $in: location },
            dcleadforwardto: { $in: assigned_agent },
            lead_status: { $ne: 'Lost & Dropped' },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          },
        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          $lookup: {
            from: 'api_integrateds',
            localField: 'plan_company_id',
            foreignField: 'company_id',
            as: 'api_integrated',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'dcrecived_from',
            foreignField: '_id',
            as: 'dc_recived_from'
          }
        },
        {
          $sort: { new_lead_timestamp: -1 }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phoneno: 1,
            email: 1,
            "dc_recived_from.name": 1,
            "policy_type._id": 1,
            "policy_type.line_of_business_name": 1,
            new_lead_timestamp: 1,
            final_price: 1,
            "api_integrated.company_id": 1,
            "api_integrated.line_of_business_id": 1,
            "api_integrated.api_integrate": 1,
            "api_integrated.api_status": 1,
            policy_issued_date: 1,
          }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    }
    catch (err) {
      console.log(err);
    }
  },

  update_final_price: async (req, res) => {
    try {
      const { id, final_price } = req.body;
      const lead = await NewLead.findByIdAndUpdate(id, { final_price: final_price });
      res.json({ status: 200, message: "Price Updated Successfully", data: lead });
    } catch (error) {
      res.json({ status: 400, message: "Something went wrong" });
    }
  },

  update_all_documents: async (req, res) => {
    try {
      let payload = req.body;
      let name = payload?.name;
      let reason = payload?.reason;
      let status = payload?.status;
      let fileindex = payload?.fileindex;
      let id = payload?.id;
      let files = req.files;
      payload = JSON.parse(payload?.payload)
      console.log("payload>>>>>", payload);
      console.log("files>>>>>", files);
      let newFilesArray = [];
      let newLeads;
      let documents = [];
      let newPayload = [];
      let newLeadDetails = await NewLead.findById(id)
      newLeadDetails = newLeadDetails?.toObject();
      newLeadDetails = newLeadDetails?.documents
      for (let i = 0; i < payload.length; i++) {
        let objPayload = {
          name: payload[i]?.name
        }
        let allReadyExist = false;
        for (let j = 0; j < newLeadDetails.length; j++) {
          if (payload[i]?.name == newLeadDetails[j]?.name) {
            allReadyExist = true
            objPayload["status"] = payload[i]?.status ? payload[i]?.status : newLeadDetails[j]?.status
            objPayload["reason"] = payload[i]?.reason ? payload[i]?.reason : newLeadDetails[j]?.reason
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

            newLeadDetails.splice(j, 1)

          }
        }
        if (!allReadyExist) {
          objPayload["status"] = payload[i]?.status
          objPayload["reason"] = payload[i]?.reason
          console.log("ggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", payload[i]?.file)

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
      documents = [...newPayload, ...newLeadDetails]

      console.log("documentskkkkkkkkkkkkkkk", documents);

      newLeads = await NewLead.findByIdAndUpdate(id, {
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

  Send_Email: async (req, res) => {
    try {
      const id = req.body.id;
      const purchasedpolicynumber = req.body.purchasedPolicy;
      const to = req.body.to;
      const cc = req.body.cc;
      const message = req.body.message;
      const files = req.files ? req.files : null;
      let currentDate = new Date()

      let checkNewlead = await NewLead.findById(req.body.id)
      if (!checkNewlead) {
        return res.status(400).json({
          error: "Failed to find any lead for provided id",
          status: 400
        })
      }

      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        // service: 'smtp.gmail.com', 
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dev@handsintechnology.com',
          pass: 'Hitdev@2022'
        }
      });

      // Prepare email message
      const mailOptions = {
        from: 'dev@handsintechnology.com',
        to: to,
        cc: cc,
        subject: 'Policy Number: ' + purchasedpolicynumber,
        text: message,
        attachments: files.map(file => ({
          filename: file.originalname,
          path: file.path
        }))
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
          console.log('Email sent:', info.response);
          res.json({ status: 200, success: true, message: 'Email sent successfully' });
        }
      });

      // check if the incentive for SA is fulfilled
      let incentives = checkNewlead.specialIncentive
      if (incentives && incentives.length > 0) {
        for (let i = 0; i < incentives.length; i++) {
          const checkIncentive = await SpecialIncentive.findById(incentives[i])
          if (!checkIncentive) {
            return res.status(400).json({
              error: "Failed to find any incentive scheme for provided id",
              status: 400
            })
          }

          const { start_time, end_time, participants, completed_by } = checkIncentive;
          if (currentDate > new Date(start_time) && new Date(end_time) >= currentDate) {
            const filteredList = participants.find(item => item.role === "PI" && item.user.toString() === req.body.policy_issued_by)
            if (filteredList === undefined) {
              continue;
            }

            const checkIfAgentExistsInCompleted = completed_by.find(item => item.user.toString() === filteredList.user.toString())
            if (checkIfAgentExistsInCompleted) {
              for (let i = 0; i < completed_by.length; i++) {
                if (completed_by[i].user.toString() === filteredList.user.toString()) {
                  completed_by[i].count = (completed_by[i].count || 0) + 1;
                  completed_by[i].lead.push(mongoose.Types.ObjectId(req.body.id))
                  break;
                }
              }
            } else {
              completed_by.push(filteredList)
            }
            await SpecialIncentive.findByIdAndUpdate(incentives[i], {
              $set: {
                completed_by
              }
            })
          }
        }
      }

      await NewLead.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            policy_issued_status: req.body.policy_issued_status,
            policy_issued_date: req.body.policy_issued_date,
            policy_expiry_date: req.body.policy_expiry_date,
            assign_policyissued_timestamp: Date.now(),
            policy_issued_by: mongoose.Types.ObjectId(req.body.policy_issued_by),
            lead_status: req.body.lead_status,
            specialIncentive: incentives
          }
        },
        { new: true }
      );

    } catch (error) {
      console.log(error)
    }
  },

  get_supervisor_leads: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {}
      let sort = {}
      let payload = req.body;

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const page = payload.page;
      const limit = payload.limit;

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

      let usertype = user?.usertype?.toString();
      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }

      //super visor
      if ((usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" ||
        usertype == '6462250eb201a6f07b2dff3a' || usertype == '646224deb201a6f07b2dff32' ||
        usertype == '64622526b201a6f07b2dff3e' || usertype === "64622470b201a6f07b2dff22")
        && query?.dashboardType == "supervisorDashboard") {

        if (usertype === '64622470b201a6f07b2dff22') {
          if (query?.dashboardType === "supervisorDashboard" && payload.newagent?.length && payload?.userType == 'salesAdvisor') {
            match["assigned_agent"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (query?.dashboardType === "supervisorDashboard" && payload.newagent?.length && payload?.userType == 'documentChaser') {
            match["forward_to"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (query?.dashboardType === "supervisorDashboard" && payload.newagent?.length && payload?.userType == 'policyIssuer') {
            match["dcleadforwardto"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (query?.dashboardType === "supervisorDashboard" && payload.selectedSupervisor?.length) {
            match["supervisor_id"] = { $in: payload?.selectedSupervisor?.map(data => mongoose.Types.ObjectId(data)) };
          }
        } else if (usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" ||
          usertype == '6462250eb201a6f07b2dff3a' || usertype == '646224deb201a6f07b2dff32' ||
          usertype == '64622526b201a6f07b2dff3e') {
          if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
            match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
            match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
            match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
        }

        match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

        if (query?.assignType === "RenewalLeads") {
          match["lead_status"] = "Renewal"
        } else if (query?.assignType === "PaymentPending") {
          match["paymentStatus"] = { $in: ["Pending", "Cancelled"] }
        } else if (query?.assignType === "newLeads") {
          match["lead_status"] = "New";
          match["directPaymentByUser"] = false;
          match["assigned_agent"] = { $exists: false };
        } else if (query?.assignType === "closedBusiness") {
          match["policy_issued_status"] = 1
        } else if (query?.assignType === "lostAndDropped") {
          match["lead_status"] = "Lost & Dropped"
        }

        sort = { new_lead_timestamp: -1 }
      }

      // sales advbisor
      else if ((usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" ||
        usertype == '6462250eb201a6f07b2dff3a' || usertype == '646224deb201a6f07b2dff32' || usertype == '64622526b201a6f07b2dff3e' ||
        usertype === "64622470b201a6f07b2dff22") && query?.dashboardType === "salesAdvisorDashboard") {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "salesAdvisorDashboard" && payload.newagent?.length) {
            match["assigned_agent"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
            match["assign_salesadvisor_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

          }
        }
        else if (usertype == "646224eab201a6f07b2dff36" || usertype == '6462250eb201a6f07b2dff3a' ||
          usertype == '646224deb201a6f07b2dff32' || usertype == '64622526b201a6f07b2dff3e') {
          match["assigned_agent"] = user?._id
          match["assign_salesadvisor_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

        }
        else if (usertype == "650029b2df69a40334089041") {
          match["businessEntityId"] = user?._id
        }
        if (query?.leadType == "New") {
          match["lead_status"] = "New";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.leadType == "Hot") {
          match["lead_status"] = "Hot";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.leadType == "Warm") {
          match["lead_status"] = "Warm";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.leadType == "Cold") {
          match["lead_status"] = "Cold";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.leadType == "Closed") {
          match["policy_issued_status"] = 1
        }
        else if (query?.leadType == "LostDropped") {
          match["lead_status"] = "Lost & Dropped";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.leadType == "pendingPolicues") {
          match["policy_issued_status"] = 0
          match["forward_to"] = {
            $exists: true
          }
        }

        sort = { assign_salesadvisor_timestamp: -1 }

      }

      // document chaser
      else if ((usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" ||
        usertype == '6462250eb201a6f07b2dff3a' || usertype == '646224deb201a6f07b2dff32' || usertype == '64622526b201a6f07b2dff3e' ||
        usertype === "64622470b201a6f07b2dff22") && query?.dashboardType === "documentsChaserDashbord") {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "documentsChaserDashbord" && payload.newagent?.length) {
            console.log("sgdgfghydfhdj............>>>>>>>")
            match["forward_to"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "6462250eb201a6f07b2dff3a" || usertype == '646224deb201a6f07b2dff32'
          || usertype == '64622526b201a6f07b2dff3e' || usertype == "646224eab201a6f07b2dff36") {
          match["forward_to"] = mongoose.Types.ObjectId(user?._id)
        }
        match["assign_documentchaser_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

        if (query?.documentType == "open") {
          match['dcleadstatus'] = "Open";
          match["dcleadforwardto"] = {
            $exists: false
          }
        }
        if (query?.documentType == "pending") {
          match['dcleadstatus'] = "Pending";
        }

        sort = { assign_documentchaser_timestamp: -1 }
      }

      // policy essuer
      else if ((usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" ||
        usertype == '6462250eb201a6f07b2dff3a' || usertype == '646224deb201a6f07b2dff32' || usertype == '64622526b201a6f07b2dff3e' ||
        usertype === "64622470b201a6f07b2dff22") && query?.dashboardType == "policyIssuerDashbord") {
        console.log("policy essuer>>>>>>>>>>>>>>>>>>>>>>>>>>>", usertype)
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "policyIssuerDashbord" && payload.newagent?.length) {
            console.log("sgdgfghydfhdj............>>>>>>>")
            match["dcleadforwardto"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "64622526b201a6f07b2dff3e" || usertype == "646224eab201a6f07b2dff36"
          || usertype == "650029b2df69a40334089041" || usertype == '6462250eb201a6f07b2dff3a' ||
          usertype == '646224deb201a6f07b2dff32') {
          match["dcleadforwardto"] = user?._id
        }
        match["dcleadforwardto"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };

        if (query?.policyIssuer == "pendingPolicyes") {

          match["lead_status"] = { $ne: 'Lost & Dropped' }
          match["policy_issued_status"] = 0
        }
        if (query?.policyIssuer == "issuedPolicy") {
          match["policy_issued_status"] = 1
          match["lead_status"] = { $ne: 'Lost & Dropped' }

        }
        match["assign_policyissuer_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

        sort = { assign_policyissuer_timestamp: -1 }
      }

      // producer
      else if (usertype == "66068569e8f96a29286c956e" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "producerDashbord")) {
        console.log("policy essuer>>>>>>>>>>>>>>>>>>>>>>>>>>>", usertype)
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "producerDashbord" && payload.newagent?.length) {
            console.log("sgdgfghydfhdj............>>>>>>>")
            match["producerId"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "66068569e8f96a29286c956e") {
          match["producerId"] = user?._id
        }
        if (query?.producer == "new") {
          match["lead_status"] = "New"
          match["policy_issued_status"] = 0
          console.log("kkkkkkkkkkkkkkkkkkkkkkkk...............", match, query?.producer)

        }
        else if (query?.producer == "issuedPolicy") {
          match["policy_issued_status"] = 1
          match["lead_status"] = { $ne: 'Lost & Dropped' }
          console.log("kkkkkkkkkkkkkkkkkkkkkkkk...............", match, query?.producer)

        }
        else if (query?.producer == "pending") {
          match["policy_issued_status"] = 0
          // match["lead_status"] = { $ne: 'Lost & Dropped' }

        }
        else if (query?.producer == "LostDropped") {
          match["lead_status"] = "Lost & Dropped";
          match["forward_to"] = {
            $exists: false
          }
        }
        else if (query?.producer == "Renewal") {
          match["lead_status"] = "Lost & Dropped";
          match["forward_to"] = {
            $exists: false
          }
        }
        match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

        sort = { new_lead_timestamp: -1 }
      }



      let aggregate = {
        $facet: {
          count: [
            {
              $match: {
                ...match,
              },
            },
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {
                ...match,
                //   new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
              },
            },
            {
              $sort: sort,
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: "line_of_businesses",
                localField: "type_of_policy",
                foreignField: "_id",
                as: "policy_type",
              },
            },

            {
              $lookup: {
                from: "admins",
                localField: "assigned_agent",
                foreignField: "_id",
                as: "assigned_agent_info",
              },
            },
            {
              $lookup: {
                from: "usertypes",
                localField: "assigned_agent_info.usertype",
                foreignField: "_id",
                as: "assigned_type_info",
              },
            },
            {
              $lookup: {
                from: "admins",
                localField: "forward_to",
                foreignField: "_id",
                as: "forward_to_info",
              },
            },
            {
              $lookup: {
                from: "usertypes",
                localField: "forward_to_info.usertype",
                foreignField: "_id",
                as: "forward_to_type_info",
              },
            },
            {
              $lookup: {
                from: "admins",
                localField: "dcleadforwardto",
                foreignField: "_id",
                as: "dc_forward_to_info",
              },
            },
            {
              $lookup: {
                from: "usertypes",
                localField: "dc_forward_to_info.usertype",
                foreignField: "_id",
                as: "dcforward_to_type_info",
              },
            },
            {
              $lookup: {
                from: 'api_integrateds',
                localField: 'plan_company_id',
                foreignField: 'company_id',
                as: 'api_integrated',
              },
            },
            {
              $lookup: {
                from: 'admins',
                localField: 'recived_from',
                foreignField: '_id',
                as: 'recived_from_data'
              }
            },
            {
              $lookup: {
                from: 'admins',
                localField: 'dcrecived_from',
                foreignField: '_id',
                as: 'dc_recived_from'
              },
            },
            {
              $lookup: {
                from: 'admins',
                localField: 'producerId',
                foreignField: '_id',
                as: 'producerdetail'
              },
            },
            {
              $sort: sort
            }
          ],

        },
      };
      leads = await NewLead.aggregate([aggregate])

      if (leads.length > 0) {
        return res.json({ status: 200, message: "Data Found", data: leads[0]?.data, ...leads[0].count[0] });
      }
      return res.json({ status: 400, message: "Data not found Found", data: leads, total: 0 });
    }
    catch (error) {
      console.log(error)
    }
  },

  adminlist: async (req, res) => {
    try {

      const { usertype, lob } = req.body;
      console.log("usertype", usertype)
      console.log("lob", lob)
      if (!usertype || !lob) {
        return res.status(400).json({ status: 400, message: "Invalid input data" });
      }
      const adminlist = await Admin.aggregate(
        [{
          $match: {
            usertype: mongoose.Types.ObjectId(usertype),
            'line_of_business.lob_id': lob,
            status: 1
          }
        },
        {
          $project: {
            name: 1
          }
        }
        ]
      );
      if (adminlist.length === 0) {
        return res.status(404).json({ status: 404, message: "No data found" });
      }
      res.status(200).json({ status: 200, message: "Data Found", data: adminlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  get_assigned_staff: async (req, res) => {
    try {
      const { usertype, lob } = req.body;
      console.log("usertype", usertype)
      let user = req.user

      console.log("lob", lob)
      if (!usertype || !lob) {
        return res.status(400).json({ status: 400, message: "Invalid input data" });
      }
      const adminlist = await Admin.aggregate(
        [{
          $match: {
            _id: mongoose.Types.ObjectId(user?._id)
          }
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'assignSalesAdvisor',
            foreignField: '_id',
            as: 'filteredSA'
          }
        },
        {
          $unwind: {
            path: '$filteredSA'
          }
        },
        {
          $match: {
            'filteredSA.line_of_business.lob_id': lob,
            status: 1
          }
        },
        {
          $project: {
            'filteredSA.name': 1,
            'filteredSA._id': 1
          }
        }
        ]
      );
      if (adminlist.length === 0) {
        return res.status(404).json({ status: 404, message: "No data found" });
      }
      res.status(200).json({ status: 200, message: "Data Found", data: adminlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  reassigned_agent: async (req, res) => {
    try {
      let updateData = {};
      let currentDate = new Date()
      let checkNewlead = await NewLead.findById(req.body.id)
      if (!checkNewlead) {
        return res.status(400).json({
          error: "Failed to find any lead for provided id",
          status: 400
        })
      }

      if (req.query.dashboardType == 'MultiSupervisorDashboard') {
        if (req.query.status == 'new') {
          updateData.lead_status = "New"
        }
        updateData.assigned_agent = mongoose.Types.ObjectId(req.body.agentid);
        updateData.supervisor_recieved_from = mongoose.Types.ObjectId(req.body.login_user_id);
        updateData.assign_salesadvisor_timestamp = currentDate;
        console.log("MultiSupervisorDashboard")
      } else {
        if (req.body.usertype === '646224eab201a6f07b2dff36') {
          if (req.query.status == 'new') {
            updateData.lead_status = "New"
          }
          updateData.assigned_agent = mongoose.Types.ObjectId(req.body.agentid);
          updateData.supervisor_recieved_from = mongoose.Types.ObjectId(req.body.login_user_id);
          updateData.assign_salesadvisor_timestamp = currentDate

          console.log('SA')

        } else if (req.body.usertype === '6462250eb201a6f07b2dff3a') {
          updateData.forward_to = mongoose.Types.ObjectId(req.body.agentid);
          updateData.recived_from = mongoose.Types.ObjectId(req.body.login_user_id);
          updateData.assign_documentchaser_timestamp = currentDate;

          console.log('DC')

        } else if (req.body.usertype === '64622526b201a6f07b2dff3e') {
          updateData.dcleadforwardto = mongoose.Types.ObjectId(req.body.agentid);
          updateData.dcrecived_from = mongoose.Types.ObjectId(req.body.login_user_id);
          updateData.assign_policyissuer_timestamp = currentDate;

          console.log('PI')

        }
      }

      // add the users to incentive if it has any
      const checkSpecialIncetive = await SpecialIncentive.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $match: {
            $and: [
              { start_time: { $lte: currentDate } },
              { end_time: { $gte: currentDate } }
            ],
            roles: { $in: [mongoose.Types.ObjectId("646224eab201a6f07b2dff36")] },
            users: { $in: [mongoose.Types.ObjectId(req.body.agentid)] },
            lobs: { $in: [mongoose.Types.ObjectId(checkNewlead.type_of_policy)] },
            locations: { $in: [mongoose.Types.ObjectId(checkNewlead.lead_location)] }
          }
        },
        {
          $project: {
            _id: 1
          }
        }
      ])
      if (checkSpecialIncetive && checkSpecialIncetive.length > 0) {
        updateData.specialIncentive = checkSpecialIncetive.map(item => mongoose.Types.ObjectId(item._id))

        for (let i = 0; i < checkSpecialIncetive.length; i++) {
          const checkIncentive = await SpecialIncentive.findById(checkSpecialIncetive[i])
          if (!checkIncentive) {
            return res.status(400).json({
              error: "Failed to find any incentive scheme for provided id",
              status: 400
            })
          }

          const { participants } = checkIncentive

          const participant = {
            user: mongoose.Types.ObjectId(req.body.agentid),
            lead: [mongoose.Types.ObjectId(req.body.id)],
            count: 1,
            role: "SA"
          }

          if (participants.length > 0 && (participants[i].user.toString() === req.body.agentid) && (participants[i].role === "SA")) {
            participants[i].count = (participants[i].count || 0) + 1;
            participants[i].lead.push(req.body.id)
          } else {
            participants.push(participant)
          }

          await SpecialIncentive.findByIdAndUpdate(checkSpecialIncetive[i], {
            $set: {
              participants
            }
          })
        }
      }

      const lead = await NewLead.findByIdAndUpdate(
        req.body.id,
        { $set: updateData },
        { new: true }
      );
      res.json({ status: 200, message: "Updated successfully", data: lead });
    }
    catch (error) {
      console.log(error);
    }
  },

  get_supervisor_api_pending_leads: async (req, res) => {
    let location = await req.body.location.map(data => mongoose.Types.ObjectId(data));
    let Line_of_business = await req.body.lob.map(data => mongoose.Types.ObjectId(data));
    let business_type = await req.body.business_type;
    let assigned_agent = await req.body.newagent.map(data => mongoose.Types.ObjectId(data));
    let dateRange = await req.body.dateRange;
    let customstartdate = await req.body.startdate;
    let customenddate = await req.body.enddate;
    const page = req.body.page;
    const limit = req.body.limit;

    let startDate, endDate;

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


    const totalLeadsCount = await NewLead.aggregate([
      {
        $match: {
          type_of_policy: { $in: Line_of_business },
          business_type: { $in: business_type },
          assigned_agent: { $in: assigned_agent },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }
        }
      },
      {
        $count: "count"
      }
    ]);

    const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

    let leads = await NewLead.aggregate([
      {
        $match: {
          type_of_policy: { $in: Line_of_business },
          business_type: { $in: business_type },
          assigned_agent: { $in: assigned_agent },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }

        },

      },
      {
        $lookup: {
          from: 'line_of_businesses',
          localField: 'type_of_policy',
          foreignField: '_id',
          as: 'policy_type',
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'assigned_agent',
          foreignField: '_id',
          as: 'assigned_agent_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'assigned_agent_info.usertype',
          foreignField: '_id',
          as: 'assigned_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'forward_to',
          foreignField: '_id',
          as: 'forward_to_info'
        }
      },

      {
        $lookup: {
          from: 'usertypes',
          localField: 'forward_to_info.usertype',
          foreignField: '_id',
          as: 'forward_to_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'dcleadforwardto',
          foreignField: '_id',
          as: 'dc_forward_to_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'dc_forward_to_info.usertype',
          foreignField: '_id',
          as: 'dcforward_to_type_info'
        }
      },
      {
        $sort: { new_lead_timestamp: -1 }
      }
    ]).skip((page - 1) * limit).limit(limit * 1).exec();

    res.json({ status: 200, message: "Data Found", data: leads, total: count });
  },

  get_supervisor_payment_pending_leads: async (req, res) => {

    try {
      let location = await req.body.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await req.body.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await req.body.business_type;
      let assigned_agent = await req.body.newagent.map(data => mongoose.Types.ObjectId(data));
      let dateRange = await req.body.dateRange;
      let customstartdate = await req.body.startdate;
      let customenddate = await req.body.enddate;
      const page = req.body.page;
      const limit = req.body.limit;

      let startDate, endDate;
      console.log("location", location);
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


      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {

            direct_payment: { $eq: 'false' },
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            lead_location: { $in: location },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            direct_payment: "false",
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            lead_location: { $in: location }

          },

        },


        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          '$lookup': {
            'from': 'admins',
            'localField': 'assigned_agent',
            'foreignField': '_id',
            'as': 'assigned_agent_info'
          }
        },

        {
          $lookup: {
            from: 'usertypes',
            localField: 'assigned_agent_info.usertype',
            foreignField: '_id',
            as: 'assigned_type_info'
          }
        },
        {
          '$lookup': {
            'from': 'admins',
            'localField': 'forward_to',
            'foreignField': '_id',
            'as': 'forward_to_info'
          }
        },

        {
          $lookup: {
            from: 'usertypes',
            localField: 'forward_to_info.usertype',
            foreignField: '_id',
            as: 'forward_to_type_info'
          }
        },
        {
          '$lookup': {
            'from': 'admins',
            'localField': 'dcleadforwardto',
            'foreignField': '_id',
            'as': 'dc_forward_to_info'
          }
        },
        {
          $lookup: {
            from: 'usertypes',
            localField: 'dc_forward_to_info.usertype',
            foreignField: '_id',
            as: 'dcforward_to_type_info'
          }
        },
        {
          $sort: { new_lead_timestamp: -1 }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();
      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    } catch (error) {
      console.log(error);
    }
  },

  get_supervisor_Renewal_leads: async (req, res) => {
    let location = await req.body.location.map(data => mongoose.Types.ObjectId(data));
    let Line_of_business = await req.body.lob.map(data => mongoose.Types.ObjectId(data));
    let business_type = await req.body.business_type;
    let assigned_agent = await req.body.newagent.map(data => mongoose.Types.ObjectId(data));
    let dateRange = await req.body.dateRange;
    let customstartdate = await req.body.startdate;
    let customenddate = await req.body.enddate;
    const page = req.body.page;
    const limit = req.body.limit;

    let startDate, endDate;

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


    let today = new Date(); //Today's Date
    let requiredDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 45)

    const totalLeadsCount = await NewLead.aggregate([
      {
        $match: {
          business_type: { $eq: 'Renewal' },
          type_of_policy: { $in: Line_of_business },
          assigned_agent: { $in: assigned_agent },
          policy_issued_status: { $eq: 1 },
          policy_expiry_date: { $lte: requiredDate },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }

        }
      },
      {
        $count: "count"
      }
    ]);

    const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

    let leads = await NewLead.aggregate([
      {
        $match: {
          business_type: { $in: business_type },
          type_of_policy: { $in: Line_of_business },
          assigned_agent: { $in: assigned_agent },
          policy_issued_status: { $eq: 1 },
          policy_expiry_date: { $lte: requiredDate },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }

        },

      },
      {
        $lookup: {
          from: 'line_of_businesses',
          localField: 'type_of_policy',
          foreignField: '_id',
          as: 'policy_type',
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'assigned_agent',
          foreignField: '_id',
          as: 'assigned_agent_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'assigned_agent_info.usertype',
          foreignField: '_id',
          as: 'assigned_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'forward_to_info',
          foreignField: '_id',
          as: 'forward_to_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'forward_to_info.usertype',
          foreignField: '_id',
          as: 'forward_to_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'dcleadforwardto',
          foreignField: '_id',
          as: 'dc_forward_to_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'dc_forward_to_info.usertype',
          foreignField: '_id',
          as: 'dcforward_to_type_info'
        }
      },
      {
        $sort: { new_lead_timestamp: -1 }
      }
    ]).skip((page - 1) * limit).limit(limit * 1).exec();
    res.json({ status: 200, message: "Data Found", data: leads, total: count });
  },

  get_supervisor_lostdropped_leads: async (req, res) => {
    let location = await req.body.location.map(data => mongoose.Types.ObjectId(data));
    let Line_of_business = await req.body.lob.map(data => mongoose.Types.ObjectId(data));
    let business_type = await req.body.business_type;
    let assigned_agent = await req.body.newagent.map(data => mongoose.Types.ObjectId(data));
    let dateRange = await req.body.dateRange;
    let customstartdate = await req.body.startdate;
    let customenddate = await req.body.enddate;
    const page = req.body.page;
    const limit = req.body.limit;

    let startDate, endDate;

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


    const totalLeadsCount = await NewLead.aggregate([
      {
        $match: {

          lead_status: { $eq: 'Lost & Dropped' },
          type_of_policy: { $in: Line_of_business },
          business_type: { $in: business_type },
          assigned_agent: { $in: assigned_agent },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }
        }
      },
      {
        $count: "count"
      }
    ]);

    const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

    let leads = await NewLead.aggregate([
      {
        $match: {
          lead_status: { $eq: 'Lost & Dropped' },
          type_of_policy: { $in: Line_of_business },
          business_type: { $in: business_type },
          assigned_agent: { $in: assigned_agent },
          new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          lead_location: { $in: location }

        },

      },
      {
        $lookup: {
          from: 'line_of_businesses',
          localField: 'type_of_policy',
          foreignField: '_id',
          as: 'policy_type',
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'assigned_agent',
          foreignField: '_id',
          as: 'assigned_agent_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'assigned_agent_info.usertype',
          foreignField: '_id',
          as: 'assigned_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'forward_to',
          foreignField: '_id',
          as: 'forward_to_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'forward_to_info.usertype',
          foreignField: '_id',
          as: 'forward_to_type_info'
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'dcleadforwardto',
          foreignField: '_id',
          as: 'dc_forward_to_info'
        }
      },
      {
        $lookup: {
          from: 'usertypes',
          localField: 'dc_forward_to_info.usertype',
          foreignField: '_id',
          as: 'dcforward_to_type_info'
        }
      },
      {
        $sort: { new_lead_timestamp: -1 }
      }
    ]).skip((page - 1) * limit).limit(limit * 1).exec();

    res.json({ status: 200, message: "Data Found", data: leads, total: count });
  },

  supervisor_renewal_assigned_agent: async (req, res) => {


    try {
      const originalLead = await NewLead.findById(req.body.id);
      let newLeads = await NewLead.aggregate(
        [
          {
            '$sort': {
              'new_lead_timestamp': -1
            }
          }, {
            '$limit': 1
          }
        ]
      )
      newLeads = (+newLeads[0]?.lead_id) + 1
      // Create a new lead using the data from the original lead
      const newLead = new NewLead({
        assigned_agent: req.body.agent_id,
        business_type: 'Renewal',
        // Copy other fields from the original lead
        name: originalLead.name,
        email: originalLead.email,
        phoneno: originalLead.phoneno,
        lead_status: 'New',
        type_of_policy: originalLead.type_of_policy,
        lead_id: newLeads,
        // Add or modify any other fields as needed
      });

      // Save the new lead
      const Lead = await newLead.save();

      res.json({ status: 200, message: "Updated successfully", data: Lead });
    } catch (error) {
      console.log(error);
    }
  },

  supervisor_closed_business: async (req, res) => {
    try {
      let location = await req.body.location.map(data => mongoose.Types.ObjectId(data));
      let Line_of_business = await req.body.lob.map(data => mongoose.Types.ObjectId(data));
      let business_type = await req.body.business_type;
      let assigned_agent = await req.body.newagent.map(data => mongoose.Types.ObjectId(data));
      let dateRange = await req.body.dateRange;
      let customstartdate = await req.body.startdate;
      let customenddate = await req.body.enddate;
      const page = req.body.page;
      const limit = req.body.limit;

      let startDate, endDate;

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


      const totalLeadsCount = await NewLead.aggregate([
        {
          $match: {

            policy_issued_status: 1,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            lead_location: { $in: location }

          }
        },
        {
          $count: "count"
        }
      ]);

      const count = totalLeadsCount.length > 0 ? totalLeadsCount[0].count : 0;

      let leads = await NewLead.aggregate([
        {
          $match: {
            policy_issued_status: 1,
            type_of_policy: { $in: Line_of_business },
            business_type: { $in: business_type },
            assigned_agent: { $in: assigned_agent },
            new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            lead_location: { $in: location }

          },

        },
        {
          $lookup: {
            from: 'line_of_businesses',
            localField: 'type_of_policy',
            foreignField: '_id',
            as: 'policy_type',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'assigned_agent',
            foreignField: '_id',
            as: 'assigned_agent_info'
          }
        },
        {
          $lookup: {
            from: 'usertypes',
            localField: 'assigned_agent_info.usertype',
            foreignField: '_id',
            as: 'assigned_type_info'
          }
        },

        {
          $lookup: {
            from: 'admins',
            localField: 'forward_to',
            foreignField: '_id',
            as: 'forward_to_info'
          }
        },
        {
          $lookup: {
            from: 'usertypes',
            localField: 'forward_to_info.usertype',
            foreignField: '_id',
            as: 'forward_to_type_info'
          }
        },

        {
          $lookup: {
            from: 'admins',
            localField: 'dcleadforwardto',
            foreignField: '_id',
            as: 'dc_forward_to_info'
          }
        },
        {
          $lookup: {
            from: 'usertypes',
            localField: 'dc_forward_to_info.usertype',
            foreignField: '_id',
            as: 'dcforward_to_type_info'
          }
        },
        {
          $sort: { new_lead_timestamp: -1 }
        }
      ]).skip((page - 1) * limit).limit(limit * 1).exec();

      res.json({ status: 200, message: "Data Found", data: leads, total: count });
    } catch (error) {
      console.log(error);
    }
  },

  get_dashboard_count: async (req, res) => {
    let usertype = req.body.usertype;
    let user_id = mongoose.Types.ObjectId(req.body.userid);

    let assign_lead;
    if (usertype == "64622470b201a6f07b2dff22") {
      assign_lead = await NewLead.find().countDocuments();
    }
    else {
      assign_lead = await NewLead.find({ assigned_agent: user_id }).countDocuments();
    }

    let pending_lead;
    if (usertype == "64622470b201a6f07b2dff22") {
      pending_lead = await NewLead.find({ forward_to: { $exists: false } });
    }
    else {
      pending_lead = await NewLead.find({ forward_to: { $exists: false }, assigned_agent: user_id }).countDocuments();
    }

    let close_lead;
    if (usertype == "64622470b201a6f07b2dff22") {
      close_lead = await NewLead.find({ lead_status: "Closed" }).countDocuments();
    }
    else {
      close_lead = await NewLead.find({ lead_status: "Closed", assigned_agent: user_id }).countDocuments();
    }

    let lost_and_dropped_lead;
    if (usertype == "64622470b201a6f07b2dff22") {
      lost_and_dropped_lead = await NewLead.find({ lead_status: "Lost & Dropped" }).countDocuments();
    }
    else {
      lost_and_dropped_lead = await NewLead.find({ lead_status: "Lost & Dropped", assigned_agent: user_id }).countDocuments();
    }

    let premium_earned = 0;
    if (usertype === "64622470b201a6f07b2dff22") {
      const premiumData = await NewLead.find({ policy_issued_status: 1 });
      premium_earned = premiumData.reduce((total, lead) => {
        const finalPrice = parseFloat(lead.final_price);
        return !isNaN(finalPrice) ? total + finalPrice : total;
      }, 0);
    }
    else {
      const premiumData = await NewLead.find({ policy_issued_status: 1, assigned_agent: user_id });
      premium_earned = premiumData.reduce((total, lead) => {
        const finalPrice = parseFloat(lead.final_price);
        return !isNaN(finalPrice) ? total + finalPrice : total;
      }, 0);
    }
    premium_earned = premium_earned.toString().replace(/^0+/, '');

    let motor_lead;
    const policyTypeId = mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef");

    if (usertype === "64622470b201a6f07b2dff22") {
      motor_lead = await NewLead.find({
        $and: [
          { type_of_policy: policyTypeId },
          { forward_to: { $exists: true } }
        ]
      }).countDocuments();
    }
    else if (usertype === "6462250eb201a6f07b2dff3a") {
      motor_lead = await NewLead.find({
        $and: [
          { type_of_policy: policyTypeId },
          { forward_to: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }
    else if (usertype === "64622526b201a6f07b2dff3e") {
      motor_lead = await NewLead.find({
        $and: [
          { type_of_policy: policyTypeId },
          { dcleadforwardto: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }

    let travel_lead;
    const travelTypeId = mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6");

    if (usertype === "64622470b201a6f07b2dff22") {
      travel_lead = await NewLead.find({
        $and: [
          { type_of_policy: travelTypeId },
          { forward_to: { $exists: true } }
        ]
      }).countDocuments();
    }
    else if (usertype === "6462250eb201a6f07b2dff3a") {
      travel_lead = await NewLead.find({
        $and: [
          { type_of_policy: travelTypeId },
          { forward_to: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }
    else if (usertype === "64622526b201a6f07b2dff3e") {
      travel_lead = await NewLead.find({
        $and: [
          { type_of_policy: travelTypeId },
          { dcleadforwardto: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }

    let home_lead;
    const homeTypeId = mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724");

    if (usertype === "64622470b201a6f07b2dff22") {
      home_lead = await NewLead.find({
        $and: [
          { type_of_policy: homeTypeId },
          { forward_to: { $exists: true } }
        ]
      }).countDocuments();
    }
    else if (usertype === "6462250eb201a6f07b2dff3a") {
      home_lead = await NewLead.find({
        $and: [
          { type_of_policy: homeTypeId },
          { forward_to: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }
    else if (usertype === "64622526b201a6f07b2dff3e") {
      home_lead = await NewLead.find({
        $and: [
          { type_of_policy: homeTypeId },
          { dcleadforwardto: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }

    let yacht_lead;
    const yachtTypeId = mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739");

    if (usertype === "64622470b201a6f07b2dff22") {
      yacht_lead = await NewLead.find({
        $and: [
          { type_of_policy: yachtTypeId },
          { forward_to: { $exists: true } },
        ]
      }).countDocuments();
    }
    else if (usertype === "6462250eb201a6f07b2dff3a") {
      yacht_lead = await NewLead.find({
        $and: [
          { type_of_policy: yachtTypeId },
          { forward_to: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }
    else if (usertype === "64622526b201a6f07b2dff3e") {
      yacht_lead = await NewLead.find({
        $and: [
          { type_of_policy: yachtTypeId },
          { dcleadforwardto: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }

    let medical_lead;
    const medicalTypeId = mongoose.Types.ObjectId("641bf214cbfce023c8c76762");

    if (usertype === "64622470b201a6f07b2dff22") {
      medical_lead = await NewLead.find({
        $and: [
          { type_of_policy: medicalTypeId },
          { forward_to: { $exists: true } }
        ]
      }).countDocuments();
    }
    else if (usertype === "6462250eb201a6f07b2dff3a") {
      medical_lead = await NewLead.find({
        $and: [
          { type_of_policy: medicalTypeId },
          { forward_to: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }
    else if (usertype === "64622526b201a6f07b2dff3e") {
      medical_lead = await NewLead.find({
        $and: [
          { type_of_policy: medicalTypeId },
          { dcleadforwardto: user_id },
          { lead_status: { $ne: "Lost & Dropped" } }
        ]
      }).countDocuments();
    }

    res.json({
      status: 200,
      message: "Data Found",
      assign_lead: assign_lead,
      pending_lead: pending_lead,
      close_lead: close_lead,
      lost_and_dropped_lead: lost_and_dropped_lead,
      premium_earned: premium_earned,
      motor_lead: motor_lead,
      travel_lead: travel_lead,
      home_lead: home_lead,
      yacht_lead: yacht_lead,
      medical_lead: medical_lead
    });
  },
  update_single_documents: async (req, res) => {
    try {
      const payload = req.body;
      const documentfile = req.file;
      let fileName = documentfile?.filename;
      const id = mongoose.Types.ObjectId(payload.id);
      const leaddetails = await NewLead.findById(id);

      console.log("leaddetails", leaddetails);
      console.log("payload", payload);
      console.log("documentfile", documentfile);

      let documents = leaddetails?.documents ? leaddetails?.documents : [];
      if (!documents.length) {
        documents.push({
          name: payload.name,
          status: payload.status,
          reason: payload.reason,
          file: documentfile?.filename,
        });
      } else {
        let count = 0;
        for (let i = 0; i < documents.length; i++) {
          if (
            documents[i]?.name?.toLowerCase() ===
            payload.name?.toLowerCase()
          ) {
            documents[i] = {
              name: payload.name,
              status: payload.status,
              reason: payload.reason,
              file: documentfile?.filename,
            };
            count++;
            break;
          }
        }
        if (!count) {
          documents.push({
            name: payload.name,
            status: payload.status,
            reason: payload.reason,
            file: documentfile?.filename,
          });
        }
      }

      const document = await NewLead.findByIdAndUpdate(id, {
        documents: documents,
      });
      if (leaddetails != null) {
        res.json({
          status: 200,
          message: "Documents Updated Successfully",
          data: leaddetails,
        });
      } else {
        res.json({
          status: 401,
          message: "something went wrong",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  update_single_group_documents: async (req, res) => {
    try {
      const payload = req.body;
      const documentfile = req.file;
      let fileName = documentfile?.filename;
      const id = mongoose.Types.ObjectId(payload.id);
      const leaddetails = await groupmedicalleads.findById(id);

      console.log("leaddetails", leaddetails);
      console.log("payload", payload);
      console.log("documentfile", documentfile);

      let documents = leaddetails?.documents ? leaddetails?.documents : [];
      if (!documents.length) {
        documents.push({
          name: payload.name,
          status: payload.status,
          reason: payload.reason,
          file: documentfile?.filename,
        });
      } else {
        let count = 0;
        for (let i = 0; i < documents.length; i++) {
          if (
            documents[i]?.name?.toLowerCase() ===
            payload.name?.toLowerCase()
          ) {
            documents[i] = {
              name: payload.name,
              status: payload.status,
              reason: payload.reason,
              file: documentfile?.filename,
            };
            count++;
            break;
          }
        }
        if (!count) {
          documents.push({
            name: payload.name,
            status: payload.status,
            reason: payload.reason,
            file: documentfile?.filename,
          });
        }
      }

      const document = await groupmedicalleads.findByIdAndUpdate(id, {
        documents: documents,
      });
      if (leaddetails != null) {
        res.json({
          status: 200,
          message: "Documents Updated Successfully",
          data: leaddetails,
        });
      } else {
        res.json({
          status: 401,
          message: "something went wrong",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getUserAccordingUserType: async (req, res) => {
    try {
      let query = req.query
      let match = { status: 1 }
      let userDetails
      let user = req.user
      let locationArr = []

      for (let i = 0; i < user.location.length; i++) {
        locationArr.push((user.location[i].loc_id
        ))
      }
      console.log("user...............", user)
      match['location.loc_id'] =
        { $in: locationArr }

      if (query.userType == "supervisor") {
        match["$or"] = [
          { "usertype": mongoose.Types.ObjectId("646224deb201a6f07b2dff32") },
          { "subusertype": { $in: [mongoose.Types.ObjectId('646224deb201a6f07b2dff32')] } }
        ];
      } else if (query.userType == "salesAdvisor") {
        match["$or"] = [
          { "usertype": mongoose.Types.ObjectId("646224eab201a6f07b2dff36") },
          { "subusertype": { $in: [mongoose.Types.ObjectId('646224eab201a6f07b2dff36')] } }
        ];
      }
      else if (query.userType == "dacumentsChaser") {
        match["$or"] = [
          { "usertype": mongoose.Types.ObjectId("6462250eb201a6f07b2dff3a") },
          { "subusertype": { $in: [mongoose.Types.ObjectId('6462250eb201a6f07b2dff3a')] } }
        ];
      }
      else if (query.userType == "policyIssuer") {
        match["$or"] = [
          { "usertype": mongoose.Types.ObjectId("64622526b201a6f07b2dff3e") },
          { "subusertype": { $in: [mongoose.Types.ObjectId('64622526b201a6f07b2dff3e')] } }
        ];
      }
      else if (query.userType == "producer") {
        match["usertype"] = mongoose.Types.ObjectId("66068569e8f96a29286c956e")
      }
      userDetails = await Admin.aggregate(
        [
          { $match: match },
          {
            $project: {
              name: 1
            }
          }
        ]
      )
      if (!userDetails.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: [], data: userDetails })

    } catch (err) {
      console.log(err);
    }
  },
  topLeagentCount: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
      }
      let facet
      let payload = req.body;
      let usertype = user?.usertype?.toString();
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
      // match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
      console.log("usertype.................1st", usertype)
      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      facet = {
        motorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        travelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        homeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        yatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        medicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        ortherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        totalCount: [
          {
            $match: {},
          },
          {
            $count: "total",
          },
        ],
      }
      //super visor

      if (usertype === '646224deb201a6f07b2dff32' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "supervisorDashboard")) {
        if (usertype === '64622470b201a6f07b2dff22') {
          if (query?.dashboardType === "supervisorDashboard" && payload.newagent?.length) {
            match["supervisor_id"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype === '646224deb201a6f07b2dff32') {
          match["supervisor_id"] = user?._id
          if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
            match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
            match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
            match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
          facet["closeLeadCount"] = [
            {
              $match: {
                policy_issued_status: 1,
              },
            },
            {
              $count: "total",
            },
          ];
        facet["totalPremiumEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$final_price",
              },
            },
          },
        ];
        facet["totalIncomeEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalIncomeEarned: {
                $sum: "$adminFee",
              },
            },
          },
        ];
        facet["lostCount"] = [
          {
            $match: {
              lead_status: "Lost & Dropped",
            },
          },
          {
            $count: "total",
          },
        ];
        facet["supevisorPendingCount"] = [
          {
            $match: {
              assigned_agent: {
                $exists: false
              },
              supervisor_id: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["saleAdvisorPendingCount"] = [
          {
            $match: {
              forward_to: {
                $exists: false
              },
              assigned_agent: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["policyIssuerPendingCount"] = [
          {
            $match: {
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              dcrecived_from: {
                $exists: true
              },

            },
          },
          {
            $count: "total",
          },
        ];
        facet["dacumentsChaserPendingCount"] = [
          {
            $match: {
              dcrecived_from: {
                $exists: false
              },
              forward_to: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["topAgent"] = [
          {
            '$group': {
              '_id': '$assigned_agent',
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
            '$lookup': {
              'from': 'admins',
              'localField': '_id',
              'foreignField': '_id',
              'as': 'result'
            }
          }, {
            '$unwind': {
              'path': '$result'
            }
          }, {
            '$project': {
              'result.name': 1
            }
          }
        ]
      }
      //oprations users
      if (usertype === '650029a2df69a4033408903d' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "oprationDashboard")) {
        if (query?.dashboardType === "supervisor" && payload.newagent?.length) {
          match["supervisor_id"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
          match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
          match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
          match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        // if(usertype === '64622470b201a6f07b2dff22'){
        //     if(query?.dashboardType ==="supervisor" && payload.newagent?.length){
        //         match["supervisor_id"] = {$in:payload?.newagent?.map(data => mongoose.Types.ObjectId(data))};
        //     }
        // }
        // else if(usertype === '650029a2df69a4033408903d'){
        //     match["supervisor_id"] = user?._id
        //     if(payload?.userType == 'documentChaser' && payload?.newagent?.length){
        //        match["forward_to"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
        //     }
        //     else if(payload?.userType == 'salesAdvisor' && payload?.newagent?.length ){
        //        match["assigned_agent"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
        //     }
        //     else if(payload?.userType == 'policyIssuer' && payload?.newagent?.length){
        //        match["dcleadforwardto"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
        //     }
        // }
        match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
          facet["closeLeadCount"] = [
            {
              $match: {
                policy_issued_status: 1,
              },
            },
            {
              $count: "total",
            },
          ];
        facet["totalPremiumEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$final_price",
              },
            },
          },
        ];
        facet["totalIncomeEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalIncomeEarned: {
                $sum: "$adminFee",
              },
            },
          },
        ];
        facet["lostCount"] = [
          {
            $match: {
              lead_status: "Lost & Dropped",
            },
          },
          {
            $count: "total",
          },
        ];
        facet["supevisorPendingCount"] = [
          {
            $match: {
              assigned_agent: {
                $exists: false
              },
              supervisor_id: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["saleAdvisorPendingCount"] = [
          {
            $match: {
              forward_to: {
                $exists: false
              },
              assigned_agent: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["policyIssuerPendingCount"] = [
          {
            $match: {
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              dcrecived_from: {
                $exists: true
              },

            },
          },
          {
            $count: "total",
          },
        ];
        facet["dacumentsChaserPendingCount"] = [
          {
            $match: {
              dcrecived_from: {
                $exists: false
              },
              forward_to: {
                $exists: true
              }
            },
          },
          {
            $count: "total",
          },
        ];
        facet["topAgent"] = [
          {
            '$group': {
              '_id': '$assigned_agent',
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
            '$lookup': {
              'from': 'admins',
              'localField': '_id',
              'foreignField': '_id',
              'as': 'result'
            }
          }, {
            '$unwind': {
              'path': '$result'
            }
          }, {
            '$project': {
              'result.name': 1
            }
          }
        ]
      }
      // sales advbisor
      else if (usertype == "646224eab201a6f07b2dff36" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "salesAdvisorDashboard")) {
        console.log("scscscsssssssssssssssssssssssssssssssssss...............", payload.selectedValue)
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "salesAdvisorDashboard" && payload.newagent?.length) {
            match["assigned_agent"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
            if (payload?.selectedValue?.length) {
              match["lead_status"] = { $in: payload.selectedValue }
            }
          }
        }
        else if (usertype == "646224eab201a6f07b2dff36") {
          match["assigned_agent"] = user?._id
          // match["lead_status"] = {$in:payload?.selectedValue }
          if (payload?.selectedValue?.length) {
            match["lead_status"] = { $in: payload.selectedValue }
          }
        }
        match["assign_salesadvisor_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
        facet["closeLeadCount"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $count: "total",
          },
        ];
        facet["totalPremiumEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$businessEntityComission",
              },
            },
          },
        ];
        facet["totalBEComission"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$BECommission",
              },
            },
          },
        ];
        facet["totalBEDiscount"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$businessEntityDiscount",
              },
            },
          },
        ];
        facet["lostCount"] = [
          {
            $match: {
              lead_status: "Lost & Dropped",
            },
          },
          {
            $count: "total",
          },
        ];
        facet["saleAdvisorPendingCount"] = [
          {
            $match: {
              forward_to: {
                $exists: false
              }
            },
          },
          {
            $count: "total",
          },
        ];
      }
      // document chaser
      else if (usertype == "6462250eb201a6f07b2dff3a" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "documentsChaserDashbord")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "documentsChaserDashbord" && payload.newagent?.length) {
            match["forward_to"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "6462250eb201a6f07b2dff3a") {
          match["forward_to"] = user?._id
        }
        match["assign_documentchaser_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      }
      // policy essuer
      else if (usertype == "64622526b201a6f07b2dff3e" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "policyIssuerDashbord")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "policyIssuerDashbord" && payload.newagent?.length) {
            match["dcleadforwardto"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "64622526b201a6f07b2dff3e") {
          match["dcleadforwardto"] = user?._id
        }
        match["assign_policyissuer_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      }
      console.log({ match });
      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      if (allCount && allCount.topAgent && allCount.topAgent[0])
        console.log(".................", allCount.topAgent[0].result.name)
      //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>.",allCount && allCount.topAgent && allCount.topAgent[0] && allCount.topAgent[0] && allCount.topAgent[0])
      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      let BETopup = 0
      let BEComission = 0
      let BEDiscount = 0
      BEComission = allCount && allCount.totalPremiumEarned && allCount.totalPremiumEarned[0] ? allCount.totalPremiumEarned[0].totalFinalPrice : 0
      BETopup = allCount && allCount.totalBEComission && allCount.totalBEComission[0] ? allCount.totalBEComission[0].totalFinalPrice : 0
      BEDiscount = allCount && allCount.totalBEDiscount && allCount.totalBEDiscount[0] ? allCount.totalBEDiscount[0].totalFinalPrice : 0

      let totalPremiumEarned = (BEComission ? BEComission : 0) + (BETopup ? BETopup : 0) - (BEDiscount ? BEDiscount : 0)

      let data = {
        motorCount: allCount && allCount.motorCount && allCount.motorCount[0] ? allCount.motorCount[0].total : 0,
        travelCount: allCount && allCount.travelCount && allCount.travelCount[0] ? allCount.travelCount[0].total : 0,
        homeCount: allCount && allCount.homeCount && allCount.homeCount[0] ? allCount.homeCount[0].total : 0,
        yatchCount: allCount && allCount.yatchCount && allCount.yatchCount[0] ? allCount.yatchCount[0].total : 0,
        medicalCount: allCount && allCount.medicalCount && allCount.medicalCount[0] ? allCount.medicalCount[0].total : 0,
        ortherInsuranceCount: allCount && allCount.ortherInsuranceCount && allCount.ortherInsuranceCount[0] ? allCount.ortherInsuranceCount[0].total : 0,
        totalCount: allCount && allCount.totalCount && allCount.totalCount[0] ? allCount.totalCount[0].total : 0,
        closeLeadCount: allCount && allCount.closeLeadCount && allCount.closeLeadCount[0] ? allCount.closeLeadCount[0].total : 0,
        totalPremiumEarned: totalPremiumEarned,
        lostCount: allCount && allCount.lostCount && allCount.lostCount[0] ? allCount.lostCount[0].total : 0,
        supevisorPendingCount: allCount && allCount.supevisorPendingCount && allCount.supevisorPendingCount[0] ? allCount.supevisorPendingCount[0].total : 0,
        saleAdvisorPendingCount: allCount && allCount.saleAdvisorPendingCount && allCount.saleAdvisorPendingCount[0] ? allCount.saleAdvisorPendingCount[0].total : 0,
        policyIssuerPendingCount: allCount && allCount.policyIssuerPendingCount && allCount.policyIssuerPendingCount[0] ? allCount.policyIssuerPendingCount[0].total : 0,
        dacumentsChaserPendingCount: allCount && allCount.dacumentsChaserPendingCount && allCount.dacumentsChaserPendingCount[0] ? allCount.dacumentsChaserPendingCount[0].total : 0,
        totalIncomeEarned: allCount && allCount.totalIncomeEarned && allCount.totalIncomeEarned[0] ? allCount.totalIncomeEarned[0].totalIncomeEarned : 0,
        topAgent: allCount && allCount.topAgent && allCount.topAgent[0] && allCount.topAgent[0] && allCount.topAgent[0].result.name ? allCount.topAgent[0].result.name : undefined,
        // closingRatio:+(((+allCount["closeLeadCount"][0]?.total)/(+allCount["totalCount"][0]?.total))).toFixed(4)
      }
      if (allCount && allCount.closeLeadCount && allCount.closeLeadCount[0] ? allCount.closeLeadCount[0].total : undefined) {
        data["closingRatio"] = +(((+allCount["closeLeadCount"][0]?.total) / (+allCount["totalCount"][0]?.total))).toFixed(4)
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  SuperAdmintopLeagentCount: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
      }
      let facet
      let payload = req.body;
      let usertype = user?.usertype?.toString();
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
      match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
        console.log("usertype.................2nd", usertype)


      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      // if (usertype === '650029a2df69a4033408903d' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "oprationDashboard")) {
      //   if (payload?.userType == 'documentChaser' && payload?.assign_staff?.length) {
      //     match["forward_to"] = { $in: payload.assign_staff.map(data => mongoose.Types.ObjectId(data)) };
      //   }
      //   else if (payload?.userType == 'salesAdvisor' && payload?.assign_staff?.length) {
      //     match["assigned_agent"] = { $in: payload.assign_staff.map(data => mongoose.Types.ObjectId(data)) };
      //   }
      //   else if (payload?.userType == 'policyIssuer' && payload?.assign_staff?.length) {
      //     match["dcleadforwardto"] = { $in: payload.assign_staff.map(data => mongoose.Types.ObjectId(data)) };
      //   }
      //   else if (payload?.userType === "supervisor" && payload.selectedSupervisor?.length) {
      //     match["supervisor_id"] = { $in: payload?.selectedSupervisor?.map(data => mongoose.Types.ObjectId(data)) };
      //   }
      // }
      facet = {
        motorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        travelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        homeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        yatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        medicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        ortherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
            },
          },
          {
            $count: "total",
          },
        ],
        closeMotorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
              policy_issued_status: 1,
            },
          },
          {
            $count: "total",
          },
        ],
        closeTravelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
              policy_issued_status: 1,
            },

          },
          {
            $count: "total",
          },
        ],
        closeHomeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724"
              ),
              policy_issued_status: 1
            }
          },
          {
            $count: "total",
          },
        ],
        closeYatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
              policy_issued_status: 1
            },
          },
          {
            $count: "total",
          },
        ],
        closeMedicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
              policy_issued_status: 1
            },
          },
          {
            $count: "total",
          },
        ],
        closeOrtherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
              policy_issued_status: 1
            },
          },
          {
            $count: "total",
          },
        ],
        pendingMotorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
              policy_issued_status: 0
            }
          },
          {
            $count: "total",
          },
        ],
        pendingTravelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
              policy_issued_status: 0
            },
          },
          {
            $count: "total",
          },
        ],
        pendingHomeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724"
              ),
              policy_issued_status: 0
            },
          },
          {
            $count: "total",
          },
        ],
        pendingYatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
              policy_issued_status: 0
            },
          },
          {
            $count: "total",
          },
        ],
        pendingMYedicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
              policy_issued_status: 0
            },
          },
          {
            $count: "total",
          },
        ],
        pendingOrtherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
              policy_issued_status: 0
            },
          },
          {
            $count: "total",
          },
        ],
        totalCount: [
          {
            $match: {},
          },
          {
            $count: "total",
          },
        ],
      };
      facet["topAgent"] = [
        {
          '$group': {
            '_id': '$assigned_agent',
            'total': {
              '$sum': 1
            }
          }
        },
        {
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
          '$lookup': {
            'from': 'admins',
            'localField': '_id',
            'foreignField': '_id',
            'as': 'result'
          }
        },
        {
          '$unwind': {
            'path': '$result'
          }
        },
        {
          '$project': {
            'result.name': 1
          }
        }
      ]

      facet["closeLeadCount"] = [
        {
          $match: {
            policy_issued_status: 1,
          },
        },
        {
          $count: "total",
        },
      ];
      facet["totalPremiumEarned"] = [
        {
          $match: {
            policy_issued_status: 1,
          },
        },
        {
          $group: {
            _id: null,
            totalFinalPrice: {
              $sum: "$final_price",
            },
          },
        },
      ];
      facet["totalIncomeEarned"] = [
        {
          $match: {
            policy_issued_status: 1,
          },
        },
        {
          $group: {
            _id: null,
            totalIncomeEarned: {
              $sum: "$adminFee",
            },
          },
        },
      ]
      facet["lostCount"] = [
        {
          $match: {
            lead_status: "Lost & Dropped",
          },
        },
        {
          $count: "total",
        },
      ];
      facet["supevisorPendingCount"] = [
        {
          $match: {
            assigned_agent: {
              $exists: false
            },
            supervisor_id: {
              $exists: true
            }
          },
        },
        {
          $count: "total",
        },
      ];
      facet["saleAdvisorPendingCount"] = [
        {
          $match: {
            forward_to: {
              $exists: false
            },
            assigned_agent: {
              $exists: true
            }
          },
        },
        {
          $count: "total",
        },
      ];
      facet["policyIssuerPendingCount"] = [
        {
          $match: {
            policy_issued_status: 0,
            dcleadforwardto: {
              $exists: true
            },
            dcrecived_from: {
              $exists: true
            },

          },
        },
        {
          $count: "total",
        },
      ];
      facet["dacumentsChaserPendingCount"] = [
        {
          $match: {
            dcrecived_from: {
              $exists: false
            },
            forward_to: {
              $exists: true
            }
          },
        },
        {
          $count: "total",
        },
      ];

      console.log({ match });
      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      console.log("...................", allCount)
      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      let data = {
        motorCount: allCount && allCount.motorCount && allCount.motorCount[0] ? allCount.motorCount[0].total : 0,
        travelCount: allCount && allCount.travelCount && allCount.travelCount[0] ? allCount.travelCount[0].total : 0,
        homeCount: allCount && allCount.homeCount && allCount.homeCount[0] ? allCount.homeCount[0].total : 0,
        yatchCount: allCount && allCount.yatchCount && allCount.yatchCount[0] ? allCount.yatchCount[0].total : 0,
        medicalCount: allCount && allCount.medicalCount && allCount.medicalCount[0] ? allCount.medicalCount[0].total : 0,
        ortherInsuranceCount: allCount && allCount.ortherInsuranceCount && allCount.ortherInsuranceCount[0] ? allCount.ortherInsuranceCount[0].total : 0,
        totalCount: allCount && allCount.totalCount && allCount.totalCount[0] ? allCount.totalCount[0].total : 0,
        closeLeadCount: allCount && allCount.closeLeadCount && allCount.closeLeadCount[0] ? allCount.closeLeadCount[0].total : 0,
        totalPremiumEarned: allCount && allCount.totalPremiumEarned && allCount.totalPremiumEarned[0] ? allCount.totalPremiumEarned[0].totalFinalPrice : 0,
        lostCount: allCount && allCount.lostCount && allCount.lostCount[0] ? allCount.lostCount[0].total : 0,
        supevisorPendingCount: allCount && allCount.supevisorPendingCount && allCount.supevisorPendingCount[0] ? allCount.supevisorPendingCount[0].total : 0,
        saleAdvisorPendingCount: allCount && allCount.saleAdvisorPendingCount && allCount.saleAdvisorPendingCount[0] ? allCount.saleAdvisorPendingCount[0].total : 0,
        policyIssuerPendingCount: allCount && allCount.policyIssuerPendingCount && allCount.policyIssuerPendingCount[0] ? allCount.policyIssuerPendingCount[0].total : 0,
        closeMotorCount: allCount && allCount.closeMotorCount && allCount.closeMotorCount[0] ? allCount.closeMotorCount[0].total : 0,
        closeTravelCount: allCount && allCount.closeTravelCount && allCount.closeTravelCount[0] ? allCount.closeTravelCount[0].total : 0,
        closeHomeCount: allCount && allCount.closeHomeCount && allCount.closeHomeCount[0] ? allCount.closeHomeCount[0].total : 0,
        closeYatchCount: allCount && allCount.closeYatchCount && allCount.closeYatchCount[0] ? allCount.closeYatchCount[0].total : 0,
        closeOrtherInsuranceCount: allCount && allCount.closeOrtherInsuranceCount && allCount.closeOrtherInsuranceCount[0] ? allCount.closeOrtherInsuranceCount[0].total : 0,
        closeMedicalCount: allCount && allCount.closeMedicalCount && allCount.closeMedicalCount[0] ? allCount.closeMedicalCount[0].total : 0,
        pendingMotorCount: allCount && allCount.pendingMotorCount && allCount.pendingMotorCount[0] ? allCount.pendingMotorCount[0].total : 0,
        pendingTravelCount: allCount && allCount.pendingTravelCount && allCount.pendingTravelCount[0] ? allCount.pendingTravelCount[0].total : 0,
        pendingHomeCount: allCount && allCount.pendingHomeCount && allCount.pendingHomeCount[0] ? allCount.pendingHomeCount[0].total : 0,
        pendingYatchCount: allCount && allCount.pendingYatchCount && allCount.pendingYatchCount[0] ? allCount.pendingYatchCount[0].total : 0,
        pendingMYedicalCount: allCount && allCount.pendingMYedicalCount && allCount.pendingMYedicalCount[0] ? allCount.pendingMYedicalCount[0].total : 0,
        pendingOrtherInsuranceCount: allCount && allCount.pendingOrtherInsuranceCount && allCount.pendingOrtherInsuranceCount[0] ? allCount.pendingOrtherInsuranceCount[0].total : 0,
        totalIncomeEarned: allCount && allCount.totalIncomeEarned && allCount.totalIncomeEarned[0] ? allCount.totalIncomeEarned[0].totalIncomeEarned : 0,
        topAgent: allCount?.topAgent[0]?.result?.name,
        // closingRatio:+(((+allCount["closeLeadCount"][0]?.total)/(+allCount["totalCount"][0]?.total))).toFixed(4)
      }
      if (allCount && allCount.closeLeadCount && allCount.closeLeadCount[0] ? allCount.closeLeadCount[0].total : undefined) {
        data["closingRatio"] = +(((+allCount["closeLeadCount"][0]?.total) / (+allCount["totalCount"][0]?.total))).toFixed(4)
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  getAllGraphCount: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
      }
      let facet
      let payload = req.body;
      let usertype = user?.usertype?.toString();
      // console.log("userTyep>>>>>>>>>>>>>>>>", usertype);
      // let dateRange = payload.dateRange;
      // let customstartdate =  payload.startdate;
      // let customenddate =payload.enddate;
      // const currentDate = moment();
      // switch (dateRange) {
      //     case 'daily':
      //         startDate = moment(currentDate).startOf('day');
      //         endDate = moment(currentDate).endOf('day');
      //         break;
      //     case 'weekly':
      //         startDate = moment(currentDate).subtract(1, 'week');
      //         endDate = moment(currentDate);

      //         break;
      //     case 'monthly':
      //         startDate = moment(currentDate).startOf('month');
      //         endDate = moment(currentDate).endOf('month');

      //         break;
      //     case 'yearly':
      //         startDate = moment(currentDate).startOf('year');
      //         endDate = moment(currentDate).endOf('year');
      //         break;
      //     case 'customized':
      //         startDate = moment(customstartdate);
      //         endDate = moment(customenddate);
      //         break;
      //     default:
      //         startDate = moment(currentDate).startOf('day');
      //         endDate = moment(currentDate).endOf('day');
      // }
      // match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
      // console.log("usertype.................3rd", usertype)
      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      let date = new Date();
      let currentYear = date.getFullYear();
      console.log({ currentYear }, new Date(currentYear, 0, 2));

      //super visor

      if (usertype === '646224deb201a6f07b2dff32' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "supervisorDashboard")) {
        if (usertype === '64622470b201a6f07b2dff22') {
          if (query?.dashboardType === "supervisorDashboard" && payload.newagent?.length) {
            match["supervisor_id"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }

        }
        else if (usertype === '646224deb201a6f07b2dff32') {
          match["supervisor_id"] = user?._id
          if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
            match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
            match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
          else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
            match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        // match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
        facet = {
          janmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          beftravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e2f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2a2cbfce223c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2bbcbfce223c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce223c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],

        }

      }
      //oprations users
      // if(usertype === '650029a2df69a4033408903d' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType ==="oprationDashboard" )){
      //     if(query?.dashboardType ==="supervisor" && payload.newagent?.length){
      //         match["supervisor_id"] = {$in:payload?.newagent?.map(data => mongoose.Types.ObjectId(data))};
      //     }
      //     else if(payload?.userType == 'documentChaser' && payload?.newagent?.length){
      //         match["forward_to"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //      }
      //      else if(payload?.userType == 'salesAdvisor' && payload?.newagent?.length ){
      //         match["assigned_agent"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //      }
      //      else if(payload?.userType == 'policyIssuer' && payload?.newagent?.length){
      //         match["dcleadforwardto"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //      }
      //     // if(usertype === '64622470b201a6f07b2dff22'){
      //     //     if(query?.dashboardType ==="supervisor" && payload.newagent?.length){
      //     //         match["supervisor_id"] = {$in:payload?.newagent?.map(data => mongoose.Types.ObjectId(data))};
      //     //     }
      //     // }
      //     // else if(usertype === '650029a2df69a4033408903d'){
      //     //     match["supervisor_id"] = user?._id
      //     //     if(payload?.userType == 'documentChaser' && payload?.newagent?.length){
      //     //        match["forward_to"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //     //     }
      //     //     else if(payload?.userType == 'salesAdvisor' && payload?.newagent?.length ){
      //     //        match["assigned_agent"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //     //     }
      //     //     else if(payload?.userType == 'policyIssuer' && payload?.newagent?.length){
      //     //        match["dcleadforwardto"] = {$in:payload.newagent.map(data => mongoose.Types.ObjectId(data))};
      //     //     }
      //     // }
      //     // match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },

      // }
      // sales advbisor
      else if (usertype == "646224eab201a6f07b2dff36" || usertype == "650029b2df69a40334089041" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "salesAdvisorDashboard")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "salesAdvisorDashboard" && payload.newagent?.length) {
            match["assigned_agent"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "646224eab201a6f07b2dff36") {
          match["assigned_agent"] = user?._id
        }
        else if (usertype == "650029b2df69a40334089041") {
          match["businessEntityId"] = user?._id
        }
        facet = {
          janmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          beftravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e2f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2a2cbfce223c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2bbcbfce223c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce223c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_salesadvisor_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],

        }
        // match["assign_salesadvisor_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      }
      // document chaser
      else if (usertype == "6462250eb201a6f07b2dff3a" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "documentsChaserDashbord")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "documentsChaserDashbord" && payload.newagent?.length) {
            match["forward_to"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "6462250eb201a6f07b2dff3a") {
          match["forward_to"] = user?._id
        }
        facet = {
          janmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          beftravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e2f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2a2cbfce223c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2bbcbfce223c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce223c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_documentchaser_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],

        }
        // match["assign_documentchaser_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
      }
      // policy essuer
      else if (usertype == "64622526b201a6f07b2dff3e" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "policyIssuerDashbord")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "policyIssuerDashbord" && payload.newagent?.length) {
            match["dcleadforwardto"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
          }
        }
        else if (usertype == "64622526b201a6f07b2dff3e") {
          match["dcleadforwardto"] = user?._id
        }
        facet = {
          janmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          beftravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e2f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2a2cbfce223c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf2bbcbfce223c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce223c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "assign_policyissuer_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],

        }
        // match["assign_policyissuer_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      }
      //producer
      else if (usertype == "66068569e8f96a29286c956e" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "producerDashboard")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "producerDashboard" && payload.newagent?.length) {
            console.log("payload.newagent", payload.newagent)
            match["producerId"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };

          }
        }
        else if (usertype == "66068569e8f96a29286c956e") {
          match["producerId"] = user?._id
        }
        facet = {
          janmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          beftravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418643bf42eaf5ba1c9e0ef"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "6418645df42eaf5ba1c9e0f6"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0a2cbfce023c8c76724"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf0bbcbfce023c8c76739"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "641bf214cbfce023c8c76762"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId(
                  "64defed43635b4f7b55fcd4b"
                ),
                "lead_status": "New",
                "policy_issued_status": 0,
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) }
              },
            },
            {
              $count: "total",
            },
          ],
          janmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
              },
            },
            {
              $count: "total",
            },
          ],
          jantravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          janhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          janyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          janmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          janortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 0, 2), $lte: new Date(currentYear, 0, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febtravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          febortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 1, 2), $lte: new Date(currentYear, 1, 28) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          marmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          martravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          marhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          maryatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          marmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          marortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 2, 2), $lte: new Date(currentYear, 2, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          apritravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aprihomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          apriyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aprimedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          apriortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 3, 2), $lte: new Date(currentYear, 3, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          maymotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          maytravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          mayhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          mayyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          maymedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          mayortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 4, 2), $lte: new Date(currentYear, 4, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          junmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          juntravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          junhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          junyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          junmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          junortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 5, 2), $lte: new Date(currentYear, 5, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          julmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          jultravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          julhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          julyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          julmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          julortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 6, 2), $lte: new Date(currentYear, 6, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          agumotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          agutravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aguhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aguyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          agumedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          aguortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 7, 2), $lte: new Date(currentYear, 7, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          septravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          sephomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          sepyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          sepmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          seportherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 8, 2), $lte: new Date(currentYear, 8, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octtravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          octortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 9, 2), $lte: new Date(currentYear, 9, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              }
            },
            {
              $count: "total",
            },
          ],
          novmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          novtravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          novhomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          novyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          novmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          novortherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 10, 2), $lte: new Date(currentYear, 10, 30) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          despmotorclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          desptravelclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          desphomeclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          despyatchclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          despmedicalclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ],
          desportherInsuranceclosedCount: [
            {
              $match: {
                type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"),
                "new_lead_timestamp": { $gte: new Date(currentYear, 11, 2), $lte: new Date(currentYear, 11, 31) },
                "policy_issued_status": 1,
                "lead_status": { $ne: 'Lost & Dropped' }
              },
            },
            {
              $count: "total",
            },
          ]
        }
        // match["assign_policyissuer_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      }

      console.log({ match });
      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      //    if(allCount && allCount.topAgent && allCount.topAgent[0] )
      //    console.log(".................",allCount.topAgent[0].result.name)
      //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>.",allCount && allCount.topAgent && allCount.topAgent[0] && allCount.topAgent[0] && allCount.topAgent[0])
      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      let data = {
        janmotorCount: allCount && allCount.janmotorCount && allCount.janmotorCount[0] ? allCount.janmotorCount[0].total : 0,
        febmotorCount: allCount && allCount.febmotorCount && allCount.febmotorCount[0] ? allCount.febmotorCount[0].total : 0,
        marmotorCount: allCount && allCount.marmotorCount && allCount.marmotorCount[0] ? allCount.marmotorCount[0].total : 0,
        aprimotorCount: allCount && allCount.aprimotorCount && allCount.aprimotorCount[0] ? allCount.aprimotorCount[0].total : 0,
        maymotorCount: allCount && allCount.maymotorCount && allCount.maymotorCount[0] ? allCount.maymotorCount[0].total : 0,
        junmotorCount: allCount && allCount.junmotorCount && allCount.junmotorCount[0] ? allCount.junmotorCount[0].total : 0,
        julmotorCount: allCount && allCount.julmotorCount && allCount.julmotorCount[0] ? allCount.julmotorCount[0].total : 0,
        agumotorCount: allCount && allCount.agumotorCount && allCount.agumotorCount[0] ? allCount.agumotorCount[0].total : 0,
        sepmotorCount: allCount && allCount.sepmotorCount && allCount.sepmotorCount[0] ? allCount.sepmotorCount[0].total : 0,
        octmotorCount: allCount && allCount.octmotorCount && allCount.octmotorCount[0] ? allCount.octmotorCount[0].total : 0,
        novmotorCount: allCount && allCount.novmotorCount && allCount.novmotorCount[0] ? allCount.novmotorCount[0].total : 0,
        despmotorCount: allCount && allCount.despmotorCount && allCount.despmotorCount[0] ? allCount.despmotorCount[0].total : 0,

        jantravelCount: allCount && allCount.jantravelCount && allCount.jantravelCount[0] ? allCount.jantravelCount[0].total : 0,
        beftravelCount: allCount && allCount.beftravelCount && allCount.beftravelCount[0] ? allCount.beftravelCount[0].total : 0,
        martravelCount: allCount && allCount.martravelCount && allCount.martravelCount[0] ? allCount.martravelCount[0].total : 0,
        apritravelCount: allCount && allCount.apritravelCount && allCount.apritravelCount[0] ? allCount.apritravelCount[0].total : 0,
        maytravelCount: allCount && allCount.maytravelCount && allCount.maytravelCount[0] ? allCount.maytravelCount[0].total : 0,
        juntravelCount: allCount && allCount.juntravelCount && allCount.juntravelCount[0] ? allCount.juntravelCount[0].total : 0,
        jultravelCount: allCount && allCount.jultravelCount && allCount.jultravelCount[0] ? allCount.jultravelCount[0].total : 0,
        agutravelCount: allCount && allCount.agutravelCount && allCount.agutravelCount[0] ? allCount.agutravelCount[0].total : 0,
        septravelCount: allCount && allCount.septravelCount && allCount.septravelCount[0] ? allCount.septravelCount[0].total : 0,
        octtravelCount: allCount && allCount.octtravelCount && allCount.octtravelCount[0] ? allCount.octtravelCount[0].total : 0,
        novtravelCount: allCount && allCount.novtravelCount && allCount.novtravelCount[0] ? allCount.novtravelCount[0].total : 0,
        desptravelCount: allCount && allCount.desptravelCount && allCount.desptravelCount[0] ? allCount.desptravelCount[0].total : 0,

        janhomeCount: allCount && allCount.janhomeCount && allCount.janhomeCount[0] ? allCount.janhomeCount[0].total : 0,
        febhomeCount: allCount && allCount.febhomeCount && allCount.febhomeCount[0] ? allCount.febhomeCount[0].total : 0,
        marhomeCount: allCount && allCount.marhomeCount && allCount.marhomeCount[0] ? allCount.marhomeCount[0].total : 0,
        aprihomeCount: allCount && allCount.aprihomeCount && allCount.aprihomeCount[0] ? allCount.aprihomeCount[0].total : 0,
        mayhomeCount: allCount && allCount.mayhomeCount && allCount.mayhomeCount[0] ? allCount.mayhomeCount[0].total : 0,
        junhomeCount: allCount && allCount.junhomeCount && allCount.junhomeCount[0] ? allCount.junhomeCount[0].total : 0,
        julhomeCount: allCount && allCount.julhomeCount && allCount.julhomeCount[0] ? allCount.julhomeCount[0].total : 0,
        aguhomeCount: allCount && allCount.aguhomeCount && allCount.aguhomeCount[0] ? allCount.aguhomeCount[0].total : 0,
        sephomeCount: allCount && allCount.sephomeCount && allCount.sephomeCount[0] ? allCount.sephomeCount[0].total : 0,
        octhomeCount: allCount && allCount.octhomeCount && allCount.octhomeCount[0] ? allCount.octhomeCount[0].total : 0,
        novhomeCount: allCount && allCount.novhomeCount && allCount.novhomeCount[0] ? allCount.novhomeCount[0].total : 0,
        desphomeCount: allCount && allCount.desphomeCount && allCount.desphomeCount[0] ? allCount.desphomeCount[0].total : 0,

        janmedicalCount: allCount && allCount.janmedicalCount && allCount.janmedicalCount[0] ? allCount.janmedicalCount[0].total : 0,
        febmedicalCount: allCount && allCount.febmedicalCount && allCount.febmedicalCount[0] ? allCount.febmedicalCount[0].total : 0,
        marmedicalCount: allCount && allCount.marmedicalCount && allCount.marmedicalCount[0] ? allCount.marmedicalCount[0].total : 0,
        aprimedicalCount: allCount && allCount.aprimedicalCount && allCount.aprimedicalCount[0] ? allCount.aprimedicalCount[0].total : 0,
        maymedicalCount: allCount && allCount.maymedicalCount && allCount.maymedicalCount[0] ? allCount.maymedicalCount[0].total : 0,
        junmedicalCount: allCount && allCount.junmedicalCount && allCount.junmedicalCount[0] ? allCount.junmedicalCount[0].total : 0,
        julmedicalCount: allCount && allCount.julmedicalCount && allCount.julmedicalCount[0] ? allCount.julmedicalCount[0].total : 0,
        agumedicalCount: allCount && allCount.agumedicalCount && allCount.agumedicalCount[0] ? allCount.agumedicalCount[0].total : 0,
        sepmedicalCount: allCount && allCount.sepmedicalCount && allCount.sepmedicalCount[0] ? allCount.sepmedicalCount[0].total : 0,
        octmedicalCount: allCount && allCount.octmedicalCount && allCount.octmedicalCount[0] ? allCount.octmedicalCount[0].total : 0,
        novmedicalCount: allCount && allCount.novmedicalCount && allCount.novmedicalCount[0] ? allCount.novmedicalCount[0].total : 0,
        despmedicalCount: allCount && allCount.despmedicalCount && allCount.despmedicalCount[0] ? allCount.despmedicalCount[0].total : 0,

        janyatchCount: allCount && allCount.janyatchCount && allCount.janyatchCount[0] ? allCount.janyatchCount[0].total : 0,
        febyatchCount: allCount && allCount.febyatchCount && allCount.febyatchCount[0] ? allCount.febyatchCount[0].total : 0,
        maryatchCount: allCount && allCount.maryatchCount && allCount.maryatchCount[0] ? allCount.maryatchCount[0].total : 0,
        apriyatchCount: allCount && allCount.apriyatchCount && allCount.apriyatchCount[0] ? allCount.apriyatchCount[0].total : 0,
        mayyatchCount: allCount && allCount.mayyatchCount && allCount.mayyatchCount[0] ? allCount.mayyatchCount[0].total : 0,
        junyatchCount: allCount && allCount.junyatchCount && allCount.junyatchCount[0] ? allCount.junyatchCount[0].total : 0,
        julyatchCount: allCount && allCount.julyatchCount && allCount.julyatchCount[0] ? allCount.julyatchCount[0].total : 0,
        aguyatchCount: allCount && allCount.aguyatchCount && allCount.aguyatchCount[0] ? allCount.aguyatchCount[0].total : 0,
        sepyatchCount: allCount && allCount.sepyatchCount && allCount.sepyatchCount[0] ? allCount.sepyatchCount[0].total : 0,
        octyatchCount: allCount && allCount.octyatchCount && allCount.octyatchCount[0] ? allCount.octyatchCount[0].total : 0,
        novyatchCount: allCount && allCount.novyatchCount && allCount.novyatchCount[0] ? allCount.novyatchCount[0].total : 0,
        despyatchCount: allCount && allCount.despyatchCount && allCount.despyatchCount[0] ? allCount.despyatchCount[0].total : 0,

        janortherInsuranceCount: allCount && allCount.janortherInsuranceCount && allCount.janortherInsuranceCount[0] ? allCount.janortherInsuranceCount[0].total : 0,
        febortherInsuranceCount: allCount && allCount.febortherInsuranceCount && allCount.febortherInsuranceCount[0] ? allCount.febortherInsuranceCount[0].total : 0,
        marortherInsuranceCount: allCount && allCount.marortherInsuranceCount && allCount.marortherInsuranceCount[0] ? allCount.marortherInsuranceCount[0].total : 0,
        apriortherInsuranceCount: allCount && allCount.apriortherInsuranceCount && allCount.apriortherInsuranceCount[0] ? allCount.apriortherInsuranceCount[0].total : 0,
        mayortherInsuranceCount: allCount && allCount.mayortherInsuranceCount && allCount.mayortherInsuranceCount[0] ? allCount.mayortherInsuranceCount[0].total : 0,
        junortherInsuranceCount: allCount && allCount.junortherInsuranceCount && allCount.junortherInsuranceCount[0] ? allCount.junortherInsuranceCount[0].total : 0,
        julortherInsuranceCount: allCount && allCount.julortherInsuranceCount && allCount.julortherInsuranceCount[0] ? allCount.julortherInsuranceCount[0].total : 0,
        aguortherInsuranceCount: allCount && allCount.aguortherInsuranceCount && allCount.aguortherInsuranceCount[0] ? allCount.aguortherInsuranceCount[0].total : 0,
        seportherInsuranceCount: allCount && allCount.seportherInsuranceCount && allCount.seportherInsuranceCount[0] ? allCount.seportherInsuranceCount[0].total : 0,
        octortherInsuranceCount: allCount && allCount.octortherInsuranceCount && allCount.octortherInsuranceCount[0] ? allCount.octortherInsuranceCount[0].total : 0,
        novortherInsuranceCount: allCount && allCount.novortherInsuranceCount && allCount.novortherInsuranceCount[0] ? allCount.novortherInsuranceCount[0].total : 0,
        desportherInsuranceCount: allCount && allCount.desportherInsuranceCount && allCount.desportherInsuranceCount[0] ? allCount.desportherInsuranceCount[0].total : 0,

        janmotorclosedCount: allCount && allCount.janmotorclosedCount && allCount.janmotorclosedCount[0] ? allCount.janmotorclosedCount[0].total : 0,
        febmotorclosedCount: allCount && allCount.febmotorclosedCount && allCount.febmotorclosedCount[0] ? allCount.febmotorclosedCount[0].total : 0,
        marmotorclosedCount: allCount && allCount.marmotorclosedCount && allCount.marmotorclosedCount[0] ? allCount.marmotorclosedCount[0].total : 0,
        aprimotorclosedCount: allCount && allCount.aprimotorclosedCount && allCount.aprimotorclosedCount[0] ? allCount.aprimotorclosedCount[0].total : 0,
        maymotorclosedCount: allCount && allCount.maymotorclosedCount && allCount.maymotorclosedCount[0] ? allCount.maymotorclosedCount[0].total : 0,
        junmotorclosedCount: allCount && allCount.junmotorclosedCount && allCount.junmotorclosedCount[0] ? allCount.junmotorclosedCount[0].total : 0,
        julmotorclosedCount: allCount && allCount.julmotorclosedCount && allCount.julmotorclosedCount[0] ? allCount.julmotorclosedCount[0].total : 0,
        agumotorclosedCount: allCount && allCount.agumotorclosedCount && allCount.agumotorclosedCount[0] ? allCount.agumotorclosedCount[0].total : 0,
        sepmotorclosedCount: allCount && allCount.sepmotorclosedCount && allCount.sepmotorclosedCount[0] ? allCount.sepmotorclosedCount[0].total : 0,
        octmotorclosedCount: allCount && allCount.octmotorclosedCount && allCount.octmotorclosedCount[0] ? allCount.octmotorclosedCount[0].total : 0,
        novmotorclosedCount: allCount && allCount.novmotorclosedCount && allCount.novmotorclosedCount[0] ? allCount.novmotorclosedCount[0].total : 0,
        despmotorclosedCount: allCount && allCount.despmotorclosedCount && allCount.despmotorclosedCount[0] ? allCount.despmotorclosedCount[0].total : 0,

        jantravelclosedCount: allCount && allCount.jantravelclosedCount && allCount.jantravelclosedCount[0] ? allCount.jantravelclosedCount[0].total : 0,
        beftravelclosedCount: allCount && allCount.beftravelclosedCount && allCount.beftravelclosedCount[0] ? allCount.beftravelclosedCount[0].total : 0,
        martravelclosedCount: allCount && allCount.martravelclosedCount && allCount.martravelclosedCount[0] ? allCount.martravelclosedCount[0].total : 0,
        apritravelclosedCount: allCount && allCount.apritravelclosedCount && allCount.apritravelclosedCount[0] ? allCount.apritravelclosedCount[0].total : 0,
        maytravelclosedCount: allCount && allCount.maytravelclosedCount && allCount.maytravelclosedCount[0] ? allCount.maytravelclosedCount[0].total : 0,
        juntravelclosedCount: allCount && allCount.juntravelclosedCount && allCount.juntravelclosedCount[0] ? allCount.juntravelclosedCount[0].total : 0,
        jultravelclosedCount: allCount && allCount.jultravelclosedCount && allCount.jultravelclosedCount[0] ? allCount.jultravelclosedCount[0].total : 0,
        agutravelclosedCount: allCount && allCount.agutravelclosedCount && allCount.agutravelclosedCount[0] ? allCount.agutravelclosedCount[0].total : 0,
        septravelclosedCount: allCount && allCount.septravelclosedCount && allCount.septravelclosedCount[0] ? allCount.septravelclosedCount[0].total : 0,
        octtravelclosedCount: allCount && allCount.octtravelclosedCount && allCount.octtravelclosedCount[0] ? allCount.octtravelclosedCount[0].total : 0,
        novtravelclosedCount: allCount && allCount.novtravelclosedCount && allCount.novtravelclosedCount[0] ? allCount.novtravelclosedCount[0].total : 0,
        desptravelclosedCount: allCount && allCount.desptravelclosedCount && allCount.desptravelclosedCount[0] ? allCount.desptravelclosedCount[0].total : 0,

        janhomeclosedCount: allCount && allCount.janhomeclosedCount && allCount.janhomeclosedCount[0] ? allCount.janhomeclosedCount[0].total : 0,
        febhomeclosedCount: allCount && allCount.febhomeclosedCount && allCount.febhomeclosedCount[0] ? allCount.febhomeclosedCount[0].total : 0,
        marhomeclosedCount: allCount && allCount.marhomeclosedCount && allCount.marhomeclosedCount[0] ? allCount.marhomeclosedCount[0].total : 0,
        aprihomeclosedCount: allCount && allCount.aprihomeclosedCount && allCount.aprihomeclosedCount[0] ? allCount.aprihomeclosedCount[0].total : 0,
        mayhomeclosedCount: allCount && allCount.mayhomeclosedCount && allCount.mayhomeclosedCount[0] ? allCount.mayhomeclosedCount[0].total : 0,
        junhomeclosedCount: allCount && allCount.junhomeclosedCount && allCount.junhomeclosedCount[0] ? allCount.junhomeclosedCount[0].total : 0,
        julhomeclosedCount: allCount && allCount.julhomeclosedCount && allCount.julhomeclosedCount[0] ? allCount.julhomeclosedCount[0].total : 0,
        aguhomeclosedCount: allCount && allCount.aguhomeclosedCount && allCount.aguhomeclosedCount[0] ? allCount.aguhomeclosedCount[0].total : 0,
        sephomeclosedCount: allCount && allCount.sephomeclosedCount && allCount.sephomeclosedCount[0] ? allCount.sephomeclosedCount[0].total : 0,
        octhomeclosedCount: allCount && allCount.octhomeclosedCount && allCount.octhomeclosedCount[0] ? allCount.octhomeclosedCount[0].total : 0,
        novhomeclosedCount: allCount && allCount.novhomeclosedCount && allCount.novhomeclosedCount[0] ? allCount.novhomeclosedCount[0].total : 0,
        desphomeclosedCount: allCount && allCount.desphomeclosedCount && allCount.desphomeclosedCount[0] ? allCount.desphomeclosedCount[0].total : 0,

        janmedicalclosedCount: allCount && allCount.janmedicalclosedCount && allCount.janmedicalclosedCount[0] ? allCount.janmedicalclosedCount[0].total : 0,
        febmedicalclosedCount: allCount && allCount.febmedicalclosedCount && allCount.febmedicalclosedCount[0] ? allCount.febmedicalclosedCount[0].total : 0,
        marmedicalclosedCount: allCount && allCount.marmedicalclosedCount && allCount.marmedicalclosedCount[0] ? allCount.marmedicalclosedCount[0].total : 0,
        aprimedicalclosedCount: allCount && allCount.aprimedicalclosedCount && allCount.aprimedicalclosedCount[0] ? allCount.aprimedicalclosedCount[0].total : 0,
        maymedicalclosedCount: allCount && allCount.maymedicalclosedCount && allCount.maymedicalclosedCount[0] ? allCount.maymedicalclosedCount[0].total : 0,
        junmedicalclosedCount: allCount && allCount.junmedicalclosedCount && allCount.junmedicalclosedCount[0] ? allCount.junmedicalclosedCount[0].total : 0,
        julmedicalclosedCount: allCount && allCount.julmedicalclosedCount && allCount.julmedicalclosedCount[0] ? allCount.julmedicalclosedCount[0].total : 0,
        agumedicalclosedCount: allCount && allCount.agumedicalclosedCount && allCount.agumedicalclosedCount[0] ? allCount.agumedicalclosedCount[0].total : 0,
        sepmedicalclosedCount: allCount && allCount.sepmedicalclosedCount && allCount.sepmedicalclosedCount[0] ? allCount.sepmedicalclosedCount[0].total : 0,
        octmedicalclosedCount: allCount && allCount.octmedicalclosedCount && allCount.octmedicalclosedCount[0] ? allCount.octmedicalclosedCount[0].total : 0,
        novmedicalclosedCount: allCount && allCount.novmedicalclosedCount && allCount.novmedicalclosedCount[0] ? allCount.novmedicalclosedCount[0].total : 0,
        despmedicalclosedCount: allCount && allCount.despmedicalclosedCount && allCount.despmedicalclosedCount[0] ? allCount.despmedicalclosedCount[0].total : 0,

        janyatchclosedCount: allCount && allCount.janyatchclosedCount && allCount.janyatchclosedCount[0] ? allCount.janyatchclosedCount[0].total : 0,
        febyatchclosedCount: allCount && allCount.febyatchclosedCount && allCount.febyatchclosedCount[0] ? allCount.febyatchclosedCount[0].total : 0,
        maryatchclosedCount: allCount && allCount.maryatchclosedCount && allCount.maryatchclosedCount[0] ? allCount.maryatchclosedCount[0].total : 0,
        apriyatchclosedCount: allCount && allCount.apriyatchclosedCount && allCount.apriyatchclosedCount[0] ? allCount.apriyatchclosedCount[0].total : 0,
        mayyatchclosedCount: allCount && allCount.mayyatchclosedCount && allCount.mayyatchclosedCount[0] ? allCount.mayyatchclosedCount[0].total : 0,
        junyatchclosedCount: allCount && allCount.junyatchclosedCount && allCount.junyatchclosedCount[0] ? allCount.junyatchclosedCount[0].total : 0,
        julyatchclosedCount: allCount && allCount.julyatchclosedCount && allCount.julyatchclosedCount[0] ? allCount.julyatchclosedCount[0].total : 0,
        aguyatchclosedCount: allCount && allCount.aguyatchclosedCount && allCount.aguyatchclosedCount[0] ? allCount.aguyatchclosedCount[0].total : 0,
        sepyatchclosedCount: allCount && allCount.sepyatchclosedCount && allCount.sepyatchclosedCount[0] ? allCount.sepyatchclosedCount[0].total : 0,
        octyatchclosedCount: allCount && allCount.octyatchclosedCount && allCount.octyatchclosedCount[0] ? allCount.octyatchclosedCount[0].total : 0,
        novyatchclosedCount: allCount && allCount.novyatchclosedCount && allCount.novyatchclosedCount[0] ? allCount.novyatchclosedCount[0].total : 0,
        despyatchclosedCount: allCount && allCount.despyatchclosedCount && allCount.despyatchclosedCount[0] ? allCount.despyatchclosedCount[0].total : 0,

        janortherInsuranceclosedCount: allCount && allCount.janortherInsuranceclosedCount && allCount.janortherInsuranceclosedCount[0] ? allCount.janortherInsuranceclosedCount[0].total : 0,
        febortherInsuranceclosedCount: allCount && allCount.febortherInsuranceclosedCount && allCount.febortherInsuranceclosedCount[0] ? allCount.febortherInsuranceclosedCount[0].total : 0,
        marortherInsuranceclosedCount: allCount && allCount.marortherInsuranceclosedCount && allCount.marortherInsuranceclosedCount[0] ? allCount.marortherInsuranceclosedCount[0].total : 0,
        apriortherInsuranceclosedCount: allCount && allCount.apriortherInsuranceclosedCount && allCount.apriortherInsuranceclosedCount[0] ? allCount.apriortherInsuranceclosedCount[0].total : 0,
        mayortherInsuranceclosedCount: allCount && allCount.mayortherInsuranceclosedCount && allCount.mayortherInsuranceclosedCount[0] ? allCount.mayortherInsuranceclosedCount[0].total : 0,
        junortherInsuranceclosedCount: allCount && allCount.junortherInsuranceclosedCount && allCount.junortherInsuranceclosedCount[0] ? allCount.junortherInsuranceclosedCount[0].total : 0,
        julortherInsuranceclosedCount: allCount && allCount.julortherInsuranceclosedCount && allCount.julortherInsuranceclosedCount[0] ? allCount.julortherInsuranceclosedCount[0].total : 0,
        aguortherInsuranceclosedCount: allCount && allCount.aguortherInsuranceclosedCount && allCount.aguortherInsuranceclosedCount[0] ? allCount.aguortherInsuranceclosedCount[0].total : 0,
        seportherInsuranceclosedCount: allCount && allCount.seportherInsuranceclosedCount && allCount.seportherInsuranceclosedCount[0] ? allCount.seportherInsuranceclosedCount[0].total : 0,
        octortherInsuranceclosedCount: allCount && allCount.octortherInsuranceclosedCount && allCount.octortherInsuranceclosedCount[0] ? allCount.octortherInsuranceclosedCount[0].total : 0,
        novortherInsuranceclosedCount: allCount && allCount.novortherInsuranceclosedCount && allCount.novortherInsuranceclosedCount[0] ? allCount.novortherInsuranceclosedCount[0].total : 0,
        desportherInsuranceclosedCount: allCount && allCount.desportherInsuranceclosedCount && allCount.desportherInsuranceclosedCount[0] ? allCount.desportherInsuranceclosedCount[0].total : 0,

        // closingRatio:+(((+allCount["closeLeadCount"][0]?.total)/(+allCount["totalCount"][0]?.total))).toFixed(4)
      }

      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  getOprationsCount: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
      }
      let facet
      let payload = req.body;
      let usertype = user?.usertype?.toString();
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
      match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
        console.log("usertype.................4th", usertype)
      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if (usertype === '650029a2df69a4033408903d' || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "oprationDashboard")) {
        if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
          match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
          match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
          match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType === "supervisor" && payload.selectedSupervisor?.length) {
          match["supervisor_id"] = { $in: payload?.selectedSupervisor?.map(data => mongoose.Types.ObjectId(data)) };
        }
      }

      facet = {
        PIpendingMotorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            }
          },
          {
            $count: "total",
          },
        ],
        PIpendingTravelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },

          },
          {
            $count: "total",
          },
        ],
        PIpendingHomeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724",
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        PIpendingYatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        PIpendingMYedicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        PIpendingOrtherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
              policy_issued_status: 0,
              dcleadforwardto: {
                $exists: true
              },
              assign_policyissuer_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        DCpendingMotorCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418643bf42eaf5ba1c9e0ef"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            }
          },
          {
            $count: "total",
          },
        ],
        DCpendingTravelCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "6418645df42eaf5ba1c9e0f6"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        DCpendingHomeCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0a2cbfce023c8c76724"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        DCpendingYatchCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf0bbcbfce023c8c76739"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        DCpendingMYedicalCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "641bf214cbfce023c8c76762"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
        DCpendingOrtherInsuranceCount: [
          {
            $match: {
              type_of_policy: mongoose.Types.ObjectId(
                "64defed43635b4f7b55fcd4b"
              ),
              dcleadforwardto: {
                $exists: false
              },
              forward_to: {
                $exists: true
              },
              assign_documentchaser_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            },
          },
          {
            $count: "total",
          },
        ],
      }

      facet["dcrecievedsevencount"] = [
        {
          $match: {
            assign_documentchaser_timestamp: { $exists: true }
          }
        },
        {
          $addFields:
          {
            hours: {
              $hour: { $toDate: "$assign_documentchaser_timestamp" }
            }
          }
        },
        {
          $match: {
            hours: 7,
            forward_to: {
              $exists: true
            },
          }
        },
        {
          $count: "total",
        },
      ],
        facet["dcrecievedeightcount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 8,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedninecount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 9,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedtencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 10,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedelevencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 11,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedtwelvecount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 12,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedthirteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 13,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedfourteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 14,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedfifteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 8,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedsixteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 16,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedseventeencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 17,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievedeighteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 18,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["dcrecievednineteencount"] = [
          {
            $match: {
              assign_documentchaser_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_documentchaser_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 19,
              forward_to: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],

        facet["pirecievedsevencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 7,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedeightcount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 8,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedninecount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 9,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedtencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 10,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedelevencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 11,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedtwelvecount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 12,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedthirteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 13,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedfourteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 14,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedfifteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 15,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedsixteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 16,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedseventeencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 17,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievedeighteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 18,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ],
        facet["pirecievednineteencount"] = [
          {
            $match: {
              assign_policyissuer_timestamp: { $exists: true }
            }
          },
          {
            $addFields:
            {
              hours: {
                $hour: { $toDate: "$assign_policyissuer_timestamp" }
              }
            }
          },
          {
            $match: {
              hours: 19,
              dcleadforwardto: {
                $exists: true
              },
            }
          },
          {
            $count: "total",
          },
        ]

      facet["timeTakenByDCTen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 0, $lt: 10 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByDCTwenty"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 10, $lt: 20 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByDCThirty"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 20, $lt: 30 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByDCForty"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 30, $lt: 40 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByDCFifty"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 40, $lt: 50 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByDCTSixty"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            dc_hours: {
              $minute: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dc_hours: 1,
            value: { $subtract: ["$pc_hours", "$dc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 50 }
          }
        },
        {
          $count: "total"
        }
      ]

      facet["timeTakenByPITen"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 0, $lt: 10 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByPITwenty"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 10, $lt: 20 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByPIThirty"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 20, $lt: 30 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByPIForty"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 30, $lt: 40 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByPIFifty"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 40, $lt: 50 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["timeTakenByPITSixty"] = [
        {
          $match: {
            $and: [
              {
                policy_issued_date: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $minute: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            },
            pi_hours: {
              $minute: {
                $toDate:
                  "$policy_issued_date"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            pi_hours: 1,
            value: { $subtract: ["$pi_hours", "$pc_hours"] }
          }
        },
        {
          $match: {
            value: { $gte: 50 }
          }
        },
        {
          $count: "total"
        }
      ]

      facet["pendingDCSeven"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: { $gte: 0, $lt: 8 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCEight"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 8
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCNine"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 9
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCTen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 10
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCEleven"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 11
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCTwelve"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 12
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCThirteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 13
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCFourteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 14
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCFifteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 15
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCSixteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 16
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCSeventeen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 17
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCEighteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: 18
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingDCNineteen"] = [
        {
          $match: {
            $and: [
              {
                assign_documentchaser_timestamp: {
                  $exists: true
                }
              },
              {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            dc_hours: {
              $hour: {
                $toDate:
                  "$assign_documentchaser_timestamp"
              }
            }
          }
        },
        {
          $project: {
            dc_hours: 1,
            forward_to: 1
          }
        },
        {
          $match: {
            forward_to: {
              $exists: true
            },
            dc_hours: { $gte: 19 }
          }
        },
        {
          $count: "total"
        }
      ]

      facet["pendingPISeven"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: { $gte: 0, $lt: 8 }
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIEight"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 8
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPINine"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 9
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPITen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 10
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIEleven"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 11
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPITwelve"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 12
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIThirteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 13
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIFourteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 14
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIFifteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 15
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPISixteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 16
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPISeventeen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 17
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPIEighteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: 18
          }
        },
        {
          $count: "total"
        }
      ]
      facet["pendingPINineteen"] = [
        {
          $match: {
            $and: [
              {
                assign_policyissuer_timestamp: {
                  $exists: true
                }
              },
              {
                policy_issued_date: {
                  $exists: false
                }
              }
            ]
          }
        },
        {
          $addFields: {
            pc_hours: {
              $hour: {
                $toDate:
                  "$assign_policyissuer_timestamp"
              }
            }
          }
        },
        {
          $project: {
            pc_hours: 1,
            dcleadforwardto: 1
          }
        },
        {
          $match: {
            dcleadforwardto: {
              $exists: true
            },
            pc_hours: { $gte: 19 }
          }
        },
        {
          $count: "total"
        }
      ]

      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }

      let data = {
        PIpendingMotorCount: allCount?.PIpendingMotorCount?.[0]?.total || 0,
        PIpendingTravelCount: allCount?.PIpendingTravelCount?.[0]?.total || 0,
        PIpendingHomeCount: allCount?.PIpendingHomeCount?.[0]?.total || 0,
        PIpendingYatchCount: allCount?.PIpendingYatchCount?.[0]?.total || 0,
        PIpendingMYedicalCount: allCount?.PIpendingMYedicalCount?.[0]?.total || 0,
        PIpendingOrtherInsuranceCount: allCount?.PIpendingOrtherInsuranceCount?.[0]?.total || 0,

        DCpendingMotorCount: allCount?.DCpendingMotorCount?.[0]?.total || 0,
        DCpendingTravelCount: allCount?.DCpendingTravelCount?.[0]?.total || 0,
        DCpendingHomeCount: allCount?.DCpendingHomeCount?.[0]?.total || 0,
        DCpendingYatchCount: allCount?.DCpendingYatchCount?.[0]?.total || 0,
        DCpendingMYedicalCount: allCount?.DCpendingMYedicalCount?.[0]?.total || 0,
        DCpendingOrtherInsuranceCount: allCount?.DCpendingOrtherInsuranceCount?.[0]?.total || 0,

        dcrecievedsevencount: allCount?.dcrecievedsevencount?.[0]?.total || 0,
        dcrecievedeightcount: allCount?.dcrecievedeightcount?.[0]?.total || 0,
        dcrecievedninecount: allCount?.dcrecievedninecount?.[0]?.total || 0,
        dcrecievedtencount: allCount?.dcrecievedtencount?.[0]?.total || 0,
        dcrecievedelevencount: allCount?.dcrecievedelevencount?.[0]?.total || 0,
        dcrecievedtwelvecount: allCount?.dcrecievedtwelvecount?.[0]?.total || 0,
        dcrecievedthirteencount: allCount?.dcrecievedthirteencount?.[0]?.total || 0,
        dcrecievedfourteencount: allCount?.dcrecievedfourteencount?.[0]?.total || 0,
        dcrecievedfifteencount: allCount?.dcrecievedfifteencount?.[0]?.total || 0,
        dcrecievedsixteencount: allCount?.dcrecievedsixteencount?.[0]?.total || 0,
        dcrecievedsevencount: allCount?.dcrecievedsevencount?.[0]?.total || 0,
        dcrecievedeighteencount: allCount?.dcrecievedeighteencount?.[0]?.total || 0,
        dcrecievednineteencount: allCount?.dcrecievednineteencount?.[0]?.total || 0,

        pirecievedsevencount: allCount?.pirecievedsevencount?.[0]?.total || 0,
        pirecievedeightcount: allCount?.pirecievedeightcount?.[0]?.total || 0,
        pirecievedninecount: allCount?.pirecievedninecount?.[0]?.total || 0,
        pirecievedtencount: allCount?.pirecievedtencount?.[0]?.total || 0,
        pirecievedelevencount: allCount?.pirecievedelevencount?.[0]?.total || 0,
        pirecievedtwelvecount: allCount?.pirecievedtwelvecount?.[0]?.total || 0,
        pirecievedthirteencount: allCount?.pirecievedthirteencount?.[0]?.total || 0,
        pirecievedfourteencount: allCount?.pirecievedfourteencount?.[0]?.total || 0,
        pirecievedfifteencount: allCount?.pirecievedfifteencount?.[0]?.total || 0,
        pirecievedsixteencount: allCount?.pirecievedsixteencount?.[0]?.total || 0,
        pirecievedseventeencount: allCount?.pirecievedseventeencount?.[0]?.total || 0,
        pirecievedeighteencount: allCount?.pirecievedeighteencount?.[0]?.total || 0,
        pirecievednineteencount: allCount?.pirecievednineteencount?.[0]?.total || 0,

        timeTakenByDCTen: allCount?.timeTakenByDCTen?.[0]?.total || 0,
        timeTakenByDCTwenty: allCount?.timeTakenByDCTwenty?.[0]?.total || 0,
        timeTakenByDCThirty: allCount?.timeTakenByDCThirty?.[0]?.total || 0,
        timeTakenByDCForty: allCount?.timeTakenByDCForty?.[0]?.total || 0,
        timeTakenByDCFifty: allCount?.timeTakenByDCFifty?.[0]?.total || 0,
        timeTakenByDCTSixty: allCount?.timeTakenByDCTSixty?.[0]?.total || 0,

        timeTakenByPITen: allCount?.timeTakenByPITen?.[0]?.total || 0,
        timeTakenByPITwenty: allCount?.timeTakenByPITwenty?.[0]?.total || 0,
        timeTakenByPIThirty: allCount?.timeTakenByPIThirty?.[0]?.total || 0,
        timeTakenByPIForty: allCount?.timeTakenByPIForty?.[0]?.total || 0,
        timeTakenByPIFifty: allCount?.timeTakenByPIFifty?.[0]?.total || 0,
        timeTakenByPITSixty: allCount?.timeTakenByPITSixty?.[0]?.total || 0,

        pendingDCSeven: allCount?.pendingDCSeven?.[0]?.total || 0,
        pendingDCEight: allCount?.pendingDCEight?.[0]?.total || 0,
        pendingDCNine: allCount?.pendingDCNine?.[0]?.total || 0,
        pendingDCTen: allCount?.pendingDCTen?.[0]?.total || 0,
        pendingDCEleven: allCount?.pendingDCEleven?.[0]?.total || 0,
        pendingDCTwelve: allCount?.pendingDCTwelve?.[0]?.total || 0,
        pendingDCThirteen: allCount?.pendingDCThirteen?.[0]?.total || 0,
        pendingDCFourteen: allCount?.pendingDCFourteen?.[0]?.total || 0,
        pendingDCFifteen: allCount?.pendingDCFifteen?.[0]?.total || 0,
        pendingDCSixteen: allCount?.pendingDCSixteen?.[0]?.total || 0,
        pendingDCSeventeen: allCount?.pendingDCSeventeen?.[0]?.total || 0,
        pendingDCEighteen: allCount?.pendingDCEighteen?.[0]?.total || 0,
        pendingDCNineteen: allCount?.pendingDCNineteen?.[0]?.total || 0,

        pendingPISeven: allCount?.pendingPISeven?.[0]?.total || 0,
        pendingPIEight: allCount?.pendingPIEight?.[0]?.total || 0,
        pendingPINine: allCount?.pendingPINine?.[0]?.total || 0,
        pendingPITen: allCount?.pendingPITen?.[0]?.total || 0,
        pendingPIEleven: allCount?.pendingPIEleven?.[0]?.total || 0,
        pendingPITwelve: allCount?.pendingPITwelve?.[0]?.total || 0,
        pendingPIThirteen: allCount?.pendingPIThirteen?.[0]?.total || 0,
        pendingPIFourteen: allCount?.pendingPIFourteen?.[0]?.total || 0,
        pendingPIFifteen: allCount?.pendingPIFifteen?.[0]?.total || 0,
        pendingPISixteen: allCount?.pendingPISixteen?.[0]?.total || 0,
        pendingPISeventeen: allCount?.pendingPISeventeen?.[0]?.total || 0,
        pendingPIEighteen: allCount?.pendingPIEighteen?.[0]?.total || 0,
        pendingPINineteen: allCount?.pendingPINineteen?.[0]?.total || 0,
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  get_all_leads: async (req, res) => {
    try {
      let query = req.query
      let match = {}
      let sort = {}
      let payload = req.body;

      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }

      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      const page = payload.page;
      const limit = payload.limit;
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

      let aggregate = {
        $facet: {
          count: [
            {
              $match: {
                ...match,
                new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },

              },
            },
            {
              $count: "total",
            },
          ],
          data: [
            {
              $match: {
                ...match,
                new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
              },
            },
            {
              $sort: {
                new_lead_timestamp: -1
              },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: "line_of_businesses",
                localField: "type_of_policy",
                foreignField: "_id",
                as: "policy_type",
              },
            },

            //   {
            //     $lookup: {
            //       from: "admins",
            //       localField: "assigned_agent",
            //       foreignField: "_id",
            //       as: "assigned_agent_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "usertypes",
            //       localField: "assigned_agent_info.usertype",
            //       foreignField: "_id",
            //       as: "assigned_type_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "admins",
            //       localField: "forward_to",
            //       foreignField: "_id",
            //       as: "forward_to_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "usertypes",
            //       localField: "forward_to_info.usertype",
            //       foreignField: "_id",
            //       as: "forward_to_type_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "admins",
            //       localField: "dcleadforwardto",
            //       foreignField: "_id",
            //       as: "dc_forward_to_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "usertypes",
            //       localField: "dc_forward_to_info.usertype",
            //       foreignField: "_id",
            //       as: "dcforward_to_type_info",
            //     },
            //   },
            //   {
            //     $lookup: {
            //         from: 'api_integrateds',
            //         localField: 'plan_company_id',
            //         foreignField: 'company_id',
            //         as: 'api_integrated',
            //     },
            // },
            // {
            //     $lookup: {
            //         from: 'admins',
            //         localField: 'recived_from',
            //         foreignField: '_id',
            //         as: 'recived_from_data'
            //     }
            // },
            // {
            //     $lookup: {
            //         from: 'admins',
            //         localField: 'dcrecived_from',
            //         foreignField: '_id',
            //         as: 'dc_recived_from'
            //     },
            // },
          ],

        },
      };
      leads = await NewLead.aggregate([aggregate])
      // console.log("leads>>>>>>>>>>>>>>>>>>>>>",leads[0])

      if (leads.length > 0) {
        return res.json({ status: 200, message: "Data Found", data: leads[0]?.data, ...leads[0].count[0] });
      }
      return res.json({ status: 400, message: "Data not found Found", data: leads, total: 0 });
    }
    catch (error) {
      console.log(error)
    }
  },

  getsuperadmingraphcount: async (req, res) => {
    try {
      let query = req.query
      let match = {}
      let facet = {};
      let sort = {}
      let payload = req.body;
      console.log("payload", payload)
      let usertype = req.user?.usertype?.toString();
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
      match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if (payload.newagent?.length) {
        match["supervisor_id"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
      }

      facet["sevencount"] = [
        {
          $match: { hours: 7 }
        },
        {
          $count: "total",
        },

      ]
      facet["eightcount"] = [
        {
          $match: { hours: 8 }
        },
        {
          $count: "total",
        },
      ]
      facet["ninecount"] = [

        {
          $match: { hours: 9 }
        },
        {
          $count: "total",
        },
      ]
      facet["tencount"] = [
        {
          $match: { hours: 10 }
        },
        {
          $count: "total",
        },
      ]
      facet["elevencount"] = [
        {
          $match: { hours: 11 }
        },
        {
          $count: "total",
        },
      ]
      facet["twelvecount"] = [
        {
          $match: { hours: 12 }
        },
        {
          $count: "total",
        },
      ]
      facet["thirteencount"] = [
        {
          $match: { hours: 13 }
        },
        {
          $count: "total",
        },
      ]
      facet["fourteencount"] = [
        {
          $match: { hours: 14 }
        },
        {
          $count: "total",
        },
      ]
      facet["fifteencount"] = [
        {
          $match: { hours: 15 }
        },
        {
          $count: "total",
        },
      ]
      facet["sixteencount"] = [
        {
          $match: { hours: 16 }
        },
        {
          $count: "total",
        },
      ]
      facet["seventeencount"] = [
        {
          $match: { hours: 17 }
        },
        {
          $count: "total",
        },
      ]
      facet["eighteencount"] = [
        {
          $match: { hours: 18 }
        },
        {
          $count: "total",
        },
      ]
      facet["ninteenCount"] = [
        {
          $match: { hours: 19 }
        },
        {
          $count: "total",
        },
      ]
      facet["closedsevenCount"] = [
        {
          $match: {
            hours: 7,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedeightCount"] = [
        {
          $match: {
            hours: 8,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closednineCount"] = [
        {
          $match: {
            hours: 9,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedtenCount"] = [
        {
          $match: {
            hours: 10,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedelevenCount"] = [
        {
          $match: {
            hours: 11,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedtwelveCount"] = [
        {
          $match: {
            hours: 12,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedthirteenCount"] = [
        {
          $match: {
            hours: 13,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedfourteenCount"] = [
        {
          $match: {
            hours: 14,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedfifteenCount"] = [
        {
          $match: {
            hours: 15,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedsixteenCount"] = [
        {
          $match: {
            hours: 16,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedseventeenCount"] = [
        {
          $match: {
            hours: 17,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedeighteenCount"] = [
        {
          $match: {
            hours: 18,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["closedninteenCount"] = [
        {
          $match: {
            hours: 19,
            policy_issued_status: 1
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingsevenCount"] = [
        {
          $match: {
            hours: 7,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingeightCount"] = [
        {
          $match: {
            hours: 8,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingnineCount"] = [
        {
          $match: {
            hours: 9,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingtenCount"] = [
        {
          $match: {
            hours: 10,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingelevenCount"] = [
        {
          $match: {
            hours: 11,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingtwelveCount"] = [
        {
          $match: {
            hours: 12,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingthirteenCount"] = [
        {
          $match: {
            hours: 13,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingfourteenCount"] = [
        {
          $match: {
            hours: 14,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingfifteenCount"] = [
        {
          $match: {
            hours: 15,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingsixteenCount"] = [
        {
          $match: {
            hours: 16,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingseventeenCount"] = [
        {
          $match: {
            hours: 17,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingeighteenCount"] = [
        {
          $match: {
            hours: 18,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["pendingninteenCount"] = [
        {
          $match: {
            hours: 19,
            policy_issued_status: 0
          }
        },
        {
          $count: "total",
        },
      ]
      facet["hotleadsCount"] = [
        {
          $match: {
            lead_status: 'Hot'
          }
        },
        {
          $count: "total",
        },
      ]
      facet["warmleadsCount"] = [
        {
          $match: {
            lead_status: 'Warm'
          }
        },
        {
          $count: "total",
        },
      ]
      facet["coldleadsCount"] = [
        {
          $match: {
            lead_status: 'Cold'
          }
        },
        {
          $count: "total",
        },
      ]
      facet["totalsevenPremium"] = [
        {
          $match: {
            hours: 7,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totaleightPremium"] = [
        {
          $match: {
            hours: 8,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalninePremium"] = [
        {
          $match: {
            hours: 9,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totaltenPremium"] = [
        {
          $match: {
            hours: 10,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalelevenPremium"] = [
        {
          $match: {
            hours: 11,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totaltwelvePremium"] = [
        {
          $match: {
            hours: 12,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalthirteenPremium"] = [
        {
          $match: {
            hours: 13,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalfourteenPremium"] = [
        {
          $match: {
            hours: 14,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalfifteenPremium"] = [
        {
          $match: {
            hours: 15,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalsixteenPremium"] = [
        {
          $match: {
            hours: 16,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalseventeenPremium"] = [
        {
          $match: {
            hours: 17,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totaleighteenPremium"] = [
        {
          $match: {
            hours: 18,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]
      facet["totalninteenPremium"] = [
        {
          $match: {
            hours: 19,
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$final_price" },
          },
        },
      ]

      // facet["ninteenCount"] = [
      //   {
      //     $match: {
      //       $expr: {
      //         $and: [
      //           { $gte: [{ $hour: "$new_lead_timestamp" }, 18] },
      //           { $lt: [{ $hour: "$new_lead_timestamp" }, 19] },
      //         ],
      //       },
      //     },  
      //   },
      //   {
      //     $count: "total",
      //   },
      // ]

      console.log("facet>>>>>>>>>>", match);

      console.log({ match });
      let aggregate = []
      aggregate.push(
        {
          $match: match,
        },
        {
          $addFields:
          {
            hours: {
              $hour: { $toDate: "$new_lead_timestamp" }

            }
          }
        },
      )

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      console.log("...................", allCount)

      if (!Object.keys(allCount)?.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      let data = {
        sevencount: allCount && allCount.sevencount && allCount.sevencount[0] ? allCount.sevencount[0].total : 0,
        eightcount: allCount && allCount.eightcount && allCount.eightcount[0] ? allCount.eightcount[0].total : 0,
        ninecount: allCount && allCount.ninecount && allCount.ninecount[0] ? allCount.ninecount[0].total : 0,
        tencount: allCount && allCount.tencount && allCount.tencount[0] ? allCount.tencount[0].total : 0,
        elevencount: allCount && allCount.elevencount && allCount.elevencount[0] ? allCount.elevencount[0].total : 0,
        twelvecount: allCount && allCount.twelvecount && allCount.twelvecount[0] ? allCount.twelvecount[0].total : 0,
        thirteencount: allCount && allCount.thirteencount && allCount.thirteencount[0] ? allCount.thirteencount[0].total : 0,
        fourteencount: allCount && allCount.fourteencount && allCount.fourteencount[0] ? allCount.fourteencount[0].total : 0,
        fifteencount: allCount && allCount.fifteencount && allCount.fifteencount[0] ? allCount.fifteencount[0].total : 0,
        sixteencount: allCount && allCount.sixteencount && allCount.sixteencount[0] ? allCount.sixteencount[0].total : 0,
        seventeencount: allCount && allCount.seventeencount && allCount.seventeencount[0] ? allCount.seventeencount[0].total : 0,
        eighteencount: allCount && allCount.eighteencount && allCount.eighteencount[0] ? allCount.eighteencount[0].total : 0,
        ninteenCount: allCount && allCount.ninteenCount && allCount.ninteenCount[0] ? allCount.ninteenCount[0].total : 0,
        closedsevenCount: allCount && allCount.closedsevenCount && allCount.closedsevenCount[0] ? allCount.closedsevenCount[0].total : 0,
        closedeightCount: allCount && allCount.closedeightCount && allCount.closedeightCount[0] ? allCount.closedeightCount[0].total : 0,
        closednineCount: allCount && allCount.closednineCount && allCount.closednineCount[0] ? allCount.closednineCount[0].total : 0,
        closedtenCount: allCount && allCount.closedtenCount && allCount.closedtenCount[0] ? allCount.closedtenCount[0].total : 0,
        closedelevenCount: allCount && allCount.closedelevenCount && allCount.closedelevenCount[0] ? allCount.closedelevenCount[0].total : 0,
        closedtwelveCount: allCount && allCount.closedtwelveCount && allCount.closedtwelveCount[0] ? allCount.closedtwelveCount[0].total : 0,
        closedthirteenCount: allCount && allCount.closedthirteenCount && allCount.closedthirteenCount[0] ? allCount.closedthirteenCount[0].total : 0,
        closedfourteenCount: allCount && allCount.closedfourteenCount && allCount.closedfourteenCount[0] ? allCount.closedfourteenCount[0].total : 0,
        closedfifteenCount: allCount && allCount.closedfifteenCount && allCount.closedfifteenCount[0] ? allCount.closedfifteenCount[0].total : 0,
        closedsixteenCount: allCount && allCount.closedsixteenCount && allCount.closedsixteenCount[0] ? allCount.closedsixteenCount[0].total : 0,
        closedseventeenCount: allCount && allCount.closedseventeenCount && allCount.closedseventeenCount[0] ? allCount.closedseventeenCount[0].total : 0,
        closedeighteenCount: allCount && allCount.closedeighteenCount && allCount.closedeighteenCount[0] ? allCount.closedeighteenCount[0].total : 0,
        closedninteenCount: allCount && allCount.closedninteenCount && allCount.closedninteenCount[0] ? allCount.closedninteenCount[0].total : 0,
        pendingsevenCount: allCount && allCount.pendingsevenCount && allCount.pendingsevenCount[0] ? allCount.pendingsevenCount[0].total : 0,
        pendingeightCount: allCount && allCount.pendingeightCount && allCount.pendingeightCount[0] ? allCount.pendingeightCount[0].total : 0,
        pendingnineCount: allCount && allCount.pendingnineCount && allCount.pendingnineCount[0] ? allCount.pendingnineCount[0].total : 0,
        pendingtenCount: allCount && allCount.pendingtenCount && allCount.pendingtenCount[0] ? allCount.pendingtenCount[0].total : 0,
        pendingelevenCount: allCount && allCount.pendingelevenCount && allCount.pendingelevenCount[0] ? allCount.pendingelevenCount[0].total : 0,
        pendingtwelveCount: allCount && allCount.pendingtwelveCount && allCount.pendingtwelveCount[0] ? allCount.pendingtwelveCount[0].total : 0,
        pendingthirteenCount: allCount && allCount.pendingthirteenCount && allCount.pendingthirteenCount[0] ? allCount.pendingthirteenCount[0].total : 0,
        pendingfourteenCount: allCount && allCount.pendingfourteenCount && allCount.pendingfourteenCount[0] ? allCount.pendingfourteenCount[0].total : 0,
        pendingfifteenCount: allCount && allCount.pendingfifteenCount && allCount.pendingfifteenCount[0] ? allCount.pendingfifteenCount[0].total : 0,
        pendingsixteenCount: allCount && allCount.pendingsixteenCount && allCount.pendingsixteenCount[0] ? allCount.pendingsixteenCount[0].total : 0,
        pendingseventeenCount: allCount && allCount.pendingseventeenCount && allCount.pendingseventeenCount[0] ? allCount.pendingseventeenCount[0].total : 0,
        pendingeighteenCount: allCount && allCount.pendingeighteenCount && allCount.pendingeighteenCount[0] ? allCount.pendingeighteenCount[0].total : 0,
        pendingninteenCount: allCount && allCount.pendingninteenCount && allCount.pendingninteenCount[0] ? allCount.pendingninteenCount[0].total : 0,
        hotleadsCount: allCount && allCount.hotleadsCount && allCount.hotleadsCount[0] ? allCount.hotleadsCount[0].total : 0,
        warmleadsCount: allCount && allCount.warmleadsCount && allCount.warmleadsCount[0] ? allCount.warmleadsCount[0].total : 0,
        coldleadsCount: allCount && allCount.coldleadsCount && allCount.coldleadsCount[0] ? allCount.coldleadsCount[0].total : 0,
        totalsevenPremium: allCount && allCount.totalsevenPremium && allCount.totalsevenPremium[0] ? allCount.totalsevenPremium[0].total : 0,
        totaleightPremium: allCount && allCount.totaleightPremium && allCount.totaleightPremium[0] ? allCount.totaleightPremium[0].total : 0,
        totalninePremium: allCount && allCount.totalninePremium && allCount.totalninePremium[0] ? allCount.totalninePremium[0].total : 0,
        totaltenPremium: allCount && allCount.totaltenPremium && allCount.totaltenPremium[0] ? allCount.totaltenPremium[0].total : 0,
        totalelevenPremium: allCount && allCount.totalelevenPremium && allCount.totalelevenPremium[0] ? allCount.totalelevenPremium[0].total : 0,
        totaltwelvePremium: allCount && allCount.totaltwelvePremium && allCount.totaltwelvePremium[0] ? allCount.totaltwelvePremium[0].total : 0,
        totalthirteenPremium: allCount && allCount.totalthirteenPremium && allCount.totalthirteenPremium[0] ? allCount.totalthirteenPremium[0].total : 0,
        totalfourteenPremium: allCount && allCount.totalfourteenPremium && allCount.totalfourteenPremium[0] ? allCount.totalfourteenPremium[0].total : 0,
        totalfifteenPremium: allCount && allCount.totalfifteenPremium && allCount.totalfifteenPremium[0] ? allCount.totalfifteenPremium[0].total : 0,
        totalsixteenPremium: allCount && allCount.totalsixteenPremium && allCount.totalsixteenPremium[0] ? allCount.totalsixteenPremium[0].total : 0,
        totalseventeenPremium: allCount && allCount.totalseventeenPremium && allCount.totalseventeenPremium[0] ? allCount.totalseventeenPremium[0].total : 0,
        totaleighteenPremium: allCount && allCount.totaleighteenPremium && allCount.totaleighteenPremium[0] ? allCount.totaleighteenPremium[0].total : 0,
        totalninteenPremium: allCount && allCount.totalninteenPremium && allCount.totalninteenPremium[0] ? allCount.totalninteenPremium[0].total : 0,
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });
    }

    catch (error) {
      console.log(error)
    }
  },

  // operationdcgraphcount : async (req, res) =>
  // {
  //     try
  //     {
  //       let query = req.query
  //       let match = {}
  //       let facet = {}; 
  //       let sort = {}
  //       let payload = req.body;
  //       console.log("payload",payload)
  //       let usertype =  req.user?.usertype?.toString();
  //       let dateRange = payload.dateRange;
  //       let customstartdate =  payload.startdate;
  //       let customenddate =payload.enddate;
  //       const currentDate = moment();
  //       switch (dateRange) {
  //         case 'daily':
  //             startDate = moment(currentDate).startOf('day');
  //             endDate = moment(currentDate).endOf('day');
  //             break;
  //         case 'weekly':
  //             startDate = moment(currentDate).subtract(1, 'week');
  //             endDate = moment(currentDate);

  //             break;
  //         case 'monthly':
  //             startDate = moment(currentDate).startOf('month');
  //             endDate = moment(currentDate).endOf('month');

  //             break;
  //         case 'yearly':
  //             startDate = moment(currentDate).startOf('year');
  //             endDate = moment(currentDate).endOf('year');
  //             break;
  //         case 'customized':
  //             startDate = moment(customstartdate);
  //             endDate = moment(customenddate);
  //             break;
  //         default:
  //             startDate = moment(currentDate).startOf('day');
  //             endDate = moment(currentDate).endOf('day');
  //     }
  //     match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

  //     if(payload?.location?.length){
  //       match["lead_location"] = {$in:payload.location.map(data => mongoose.Types.ObjectId(data))}
  //     }
  //     if(payload?.business_type?.length){
  //         match["business_type"] = {$in: payload.business_type}
  //     }
  //     if(payload?.lob?.length){
  //         match["type_of_policy"] = {$in:payload.lob.map(data => mongoose.Types.ObjectId(data))};
  //     }
  //     if(payload.newagent?.length){
  //       match["forward_to"] = {$in:payload?.newagent?.map(data => mongoose.Types.ObjectId(data))};
  //     }

  //     facet["sevencount"] = [ 
  //       {
  //         $match: { hours: 7 }
  //       },
  //       {
  //         $count: "total",
  //       },
  //     ]


  //     }
  //     catch (error)
  //     {
  //         console.log(error)
  //     }
  //   },
  getTravelNewLeadDetails: async (req, res) => {
    try {
      let leadId = req.query.leadId
      // let leadId = payload?.leadId
      if (!leadId) {
        return res.status(404).json({ satatus: 404, "message": "Id is required", data: [] })
      }
      const result = await NewLead.aggregate([
        {
          '$match': {
            '_id': mongoose.Types.ObjectId(leadId)
          }
        }, {
          '$lookup': {
            'from': 'companies',
            'localField': 'plan_company_id',
            'foreignField': '_id',
            'as': 'insuranceompanyData'
          }
        }, {
          '$lookup': {
            'from': 'travel_plan_types',
            'localField': 'travel_trip_type',
            'foreignField': '_id',
            'as': 'travel_trip_type_data'
          }
        }, {
          '$lookup': {
            'from': 'travel_insurance_fors',
            'localField': 'travel_insurance_for',
            'foreignField': '_id',
            'as': 'travel_insurance_for_data'
          }
        },
        {
          '$lookup': {
            'from': 'travel_types',
            'localField': 'travel_plan_type',
            'foreignField': '_id',
            'as': 'travel_plan_type_data'
          }
        },
        {
          '$lookup': {
            'from': 'line_of_businesses',
            'localField': 'type_of_policy',
            'foreignField': '_id',
            'as': 'policy_type'
          }
        },
        {
          '$lookup': {
            'from': 'travel_plans',
            'localField': 'plan_id',
            'foreignField': '_id',
            'as': 'travelPlanData'
          }
        },
      ])
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      }
      else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    }
    catch (err) {
      console.log(err);
    }
  },
  updateTravelFamilydocuments: async (req, res) => {
    try {
      const payload = req.body;
      const documentfile = req.file;
      const id = mongoose.Types.ObjectId(payload.newLeadId);
      let leaddetails = await NewLead.findById(id);
      let travel_family_details = leaddetails?.travel_family_details;
      let familyUser = travel_family_details[+payload?.index];
      let documentInDb = familyUser?.document ? familyUser?.document : [];
      if (!documentInDb.length) {
        documentInDb.push({
          id: payload?.id,
          name: payload?.name,
          file: documentfile?.filename,
        });
      } else {
        let count = 0;
        for (let i = 0; i < documentInDb.length; i++) {
          if (documentInDb[i]?.id == payload?.id) {
            documentInDb[i] = {
              id: payload?.id,
              name: payload?.name,
              file: documentfile?.filename,
            };
            count++;
            break;
          }
        }
        if (!count) {
          documentInDb.push({
            id: payload?.id,
            name: payload?.name,
            file: documentfile?.filename,
          });
        }
      }
      familyUser["document"] = documentInDb;

      travel_family_details[+payload?.index] = familyUser;

      leaddetails = await NewLead.findByIdAndUpdate(
        id,
        { travel_family_details: travel_family_details },
        { new: true }
      );
      if (leaddetails != null) {
        res.json({
          status: 200,
          message: "Documents Updated Successfully",
          data: leaddetails,
        });
      } else {
        res.json({
          status: 401,
          message: "something went wrong",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getHomeNewLeadDetails: async (req, res) => {
    try {
      let leadId = req.query.leadId;
      // let leadId = payload?.leadId
      if (!leadId) {
        return res
          .status(404)
          .json({ satatus: 404, message: "Id is required", data: [] });
      }
      const result = await NewLead.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(leadId),
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "insuranceompanyData",
          },
        },

        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "policy_type",
          },
        },
        {
          $lookup: {
            from: "home_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "homePlanData",
          },
        },
        {
          $lookup:
          {
            from: "locations",
            localField: "lead_location",
            foreignField: "_id",
            as: "lead_location"
          },

        },
        {
          $lookup:
          {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "plan_company_id"
          },
        },
        {
          '$lookup': {
            'from': 'home_plan_type_lists',
            'localField': 'home_plan_type',
            'foreignField': '_id',
            'as': 'PlanTypeDetails'
          }
        }, {
          '$lookup': {
            'from': 'home_property_type_lists',
            'localField': 'home_property_type',
            'foreignField': '_id',
            'as': 'homePropertyDetails'
          }
        }, {
          '$lookup': {
            'from': 'home_ownership_status_lists',
            'localField': 'home_ownership_status',
            'foreignField': '_id',
            'as': 'home_ownershipDetails'
          }
        }
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getYatchNewLeadDetails: async (req, res) => {
    try {
      let leadId = req.query.leadId;
      // let leadId = payload?.leadId
      if (!leadId) {
        return res
          .status(404)
          .json({ satatus: 404, message: "Id is required", data: [] });
      }
      const result = await NewLead.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(leadId),
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "insuranceompanyData",
          },
        },

        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "policy_type",
          },
        },
        {
          $lookup: {
            from: "yacht_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "yachtPlanData",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "lead_location",
            foreignField: "_id",
            as: "lead_location",
          },
        },

        {
          '$lookup': {
            'from': 'yachtmakes',
            'localField': 'YachtMaker',
            'foreignField': '_id',
            'as': 'YachtMakerData'
          }
        }, {
          '$lookup': {
            'from': 'yachtmodels',
            'localField': 'YachtVarient',
            'foreignField': '_id',
            'as': 'YachtVarientData'
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "bot_current_insurance_company_id",
            foreignField: "_id",
            as: "bot_current_insurance_company_id_data",
          },
        },
      ]);
      if (result != null) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getMedicalNewLeadDetails: async (req, res) => {
    try {
      let leadId = req.query.leadId;
      // let leadId = payload?.leadId
      if (!leadId) {
        return res
          .status(404)
          .json({ satatus: 404, message: "Id is required", data: [] });
      }
      const result = await NewLead.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(leadId),
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "plan_company_id",
            foreignField: "_id",
            as: "insuranceompanyData",
          },
        },

        {
          $lookup: {
            from: "line_of_businesses",
            localField: "type_of_policy",
            foreignField: "_id",
            as: "policy_type",
          },
        },
        {
          $lookup: {
            from: "medical_plans",
            localField: "plan_id",
            foreignField: "_id",
            as: "medicalPlanData",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "lead_location",
            foreignField: "_id",
            as: "lead_location",
          },
        },
        {
          $lookup: {
            from: "medical_salary_range_lists",
            localField: "salary",
            foreignField: "_id",
            as: "salaryData"
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "medical_current_insurer",
            foreignField: "_id",
            as: "medical_current_insurer_data",
          },
        },
        {
          $lookup: {
            from: "area_of_registrations",
            localField: "emirate_issuing_visa",
            foreignField: "_id",
            as: "emirateData",
          },
        },
        {
          $lookup: {
            from: "medical_plan_condition_lists",
            localField: "visa_type",
            foreignField: "_id",
            as: "visaTypeData",
          },
        },


      ]);
      if (result.length) {
        res.json({ status: 200, message: "Data Found", data: result });
      } else {
        res.json({ status: 400, message: "Data Not Found" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  addBulkGroupMedicalLeadsByHr: async (req, res) => {
    try {
      let payload = req.body;
      let user = req.user;
      let requestPaload = {}
      let count = 0
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
      // if (payload?.policy_number) {
      //   requestPaload['policy_number'] = payload?.policy_number
      // }
      // if (payload?.networkListId) {
      //   requestPaload['network'] = mongoose.Types.ObjectId(payload?.networkListId)
      // }
      // if (req.file) {
      //   requestPaload['file'] = req.file.filename
      // }

      // let file = fs.readFileSync("Member_files/" + req.file.filename);
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
      let requestedData = await memberRequestModels.findOneAndUpdate(requestPaload, requestPaload, { upsert: true, returnOriginal: false })
      let memberRequestId = requestedData?._id
      for (let i = 0; i < xlData.length; i++) {
        console.log("......................................")
        let payloadObj = { memberRequestId: memberRequestId };
        payloadObj["planCompanyId"] = payload?.planCompanyId;
        payloadObj["planId"] = payload?.planId;
        payloadObj["TPAId"] = payload?.TPAId;
        payloadObj["networkListId"] = payload?.networkListId;
        payloadObj["type_of_policy"] = "658bf04ed4c9b13ffb6ddb8a";
        payloadObj["policyName"] = payload?.policyName;



        // console.log("new object...............",Object.keys( xlData[i]));
        // let newObj = {}
        // for(let key in xlData[i]){
        //   newObj[key?.trim()?.toLowerCase()] = xlData[i][key];
        // }
        // console.log("newObj...........................",newObj)
        console.log("new object...............", xlData[i])
        payloadObj["SINumber"] = xlData[i]["Sl No."]
        payloadObj["firstName"] = xlData[i]?.["First Name "];
        payloadObj["middleName"] = xlData[i]?.["Middle Name"];
        payloadObj["lastnName"] = xlData[i]?.["Last Name"];
        payloadObj["employeeNumber"] = xlData[i]?.["Employee Number"];
        payloadObj["dateOfBirth"] = xlData[i]?.["Date Of Birth "];
        payloadObj["gender"] = xlData[i]?.["Gender"];
        payloadObj["maritalStatus"] = xlData[i]?.["Marital Status"];
        payloadObj["relation"] = xlData[i]?.["Relation"];
        payloadObj["category"] = xlData[i]?.["Category"];
        payloadObj["regino"] = xlData[i]?.["Region"];
        payloadObj["LSB"] = xlData[i]?.["LSB"];
        payloadObj["nationality"] = xlData[i]?.["Nationality"];
        payloadObj["passportNumber"] = xlData[i]?.["Passport Number"];
        payloadObj["EidNumber"] = xlData[i]?.["Eid Number"];
        payloadObj["UidNumber"] = xlData[i]?.["Uid Number"];
        payloadObj["visaIssuedLocation"] = xlData[i]?.["Visa Issued Location"];
        payloadObj["actualSalryBand"] = xlData[i]?.["Actual Salary Band"];
        payloadObj["personCommission"] = xlData[i]?.["Person Commission"];
        payloadObj["residentialLocation"] = xlData[i]?.["Residential Location"];
        payloadObj["workLocation"] = xlData[i]?.["Work Location"];
        payloadObj["email"] = xlData[i]?.["Email"];
        payloadObj["phoneno"] = xlData[i]?.["Mobile Number"];
        payloadObj["photoFileName"] = xlData[i]?.["Photo File Name"];
        payloadObj["sponsorType"] = xlData[i]?.["Sponsor Type "];
        payloadObj["sponsorId"] = xlData[i]?.["Sponsor Id"];
        payloadObj["sponsorContactNumber"] = xlData[i]?.["Sponsor Contact Number"];
        payloadObj["sponsorContactEmail"] = xlData[i]?.["Sponsor Contact Email "];
        payloadObj["occupation"] = xlData[i]?.["Occupation"];
        payloadObj["AdditionEffectiveDate"] = xlData[i]?.["Addition Effective Date"];
        payloadObj["visaFileNumber"] = xlData[i]?.["Visa File Number"];
        payloadObj["birthCertificateNumber"] = xlData[i]?.["Birth Certificate Number"];
        payloadObj["serialNumber"] = await groupSerialNumber()
        payloadObj["HRUserId"] = user?._id
        let data = await groupMedicalModels.findOneAndUpdate(
          { UidNumber: payloadObj?.UidNumber, leadStatus: "In Progress" },
          payloadObj,
          { upsert: true, returnOriginal: false }
        );
        // let data = await groupMedicalModels.create(payloadObj)
        count++
      }
      if (count) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !" })
      }
      return res.status(404).json({ status: 404, message: "Data Not Saved " })
    } catch (error) {
      console.log(error);
    }
  },
  getHrUserLeads: async (req, res) => {
    try {
      let user = req.user;
      let query = req.query;
      let limit = +query?.limit;
      let page = +query?.page;
      let leadType = query?.leadType;
      let companyId = query?.companyId
      let planId = query?.planId
      let tpaId = query?.tpaId
      let networkId = query?.networkId
      let policyNumber = query?.policyNumber
      let filterEmail = query?.email
      let matchObj = {}
      let userMatch = {}
      let userPlanId = user?.groupMedicalPlanId ? user?.groupMedicalPlanId : []
      let userTypeId = user?.usertype?.toString()
      if (userTypeId == "65eeb6c21d866055f9331460") {
        userMatch["employeeNumber"] = user?.employeeNumber
        userMatch["HRUserId"] = mongoose.Types.ObjectId(user?.hrId)
      }
      else {
        // userMatch["HRUserId"] = mongoose.Types.ObjectId(user?._id)
        userMatch["$or"] = [{ HRUserId: mongoose.Types.ObjectId(user?._id) }, {
          planId: { $in: userPlanId }
        }]

      }
      if (leadType == "newlyAdded") {
        matchObj["leadIsActive"] = true
        matchObj["leadStatus"] = "In Progress",
          matchObj["userleadStatus"] = "newlyAdded"

      }
      else if (leadType == "memberApproval") {
        matchObj["leadIsActive"] = true
        // matchObj["leadStatus"] = "In Progress",
        matchObj["$or"] = [{ leadStatus: "In Progress" }, { leadStatus: "Approved", userleadStatus: "deleteMemverApproval" }, { leadStatus: "Approved", userleadStatus: "deleteJdv" }]

        matchObj["userleadStatus"] = {
          $ne: "newlyAdded"
        }

      }
      else if (leadType == "deleted") {
        matchObj["leadStatus"] = "Delete"

      }
      else if (leadType == "Active") {
        matchObj["leadStatus"] = "Approved",
          matchObj["leadIsActive"] = true;
      }
      else if (leadType == "newlyAddedMember") {
        matchObj["leadStatus"] = "Approved",
          matchObj["leadIsActive"] = true;
      }
      else if (leadType == "missingDocuments") {

        matchObj["leadStatus"] = "Approved"
        matchObj["leadIsActive"] = true;
        matchObj["documentsSize"] = {
          $lt: 5
        }

      }
      if (companyId) {
        matchObj["planCompanyId"] = mongoose.Types.ObjectId(companyId)
      }
      if (planId) {
        matchObj["planId"] = mongoose.Types.ObjectId(planId)
      }
      if (tpaId) {
        matchObj["TPAId"] = mongoose.Types.ObjectId(tpaId)
      }
      if (networkId) {
        matchObj["networkListId"] = mongoose.Types.ObjectId(networkId)
      }
      if (policyNumber) {
        matchObj["policy_number"] = policyNumber
      }
      if (filterEmail) {
        matchObj["email"] = {
          $regex: filterEmail,
          $options: "i",
        }
      }
      console.log("matchObj.............................", { matchObj, leadType, userMatch }, { ...matchObj, ...userMatch })
      let leadDetails;
      let aggregate = [
        {
          $facet: {
            count: [
              {
                $match: userMatch,
              },
              {
                '$addFields': {
                  'documentsSize': {
                    '$size': '$documents'
                  }
                }
              },
              {
                $match: matchObj,
              },

              {
                $count: "total",
              },
            ],
            data: [
              {
                $match: userMatch,
              },
              {
                '$addFields': {
                  'documentsSize': {
                    '$size': '$documents'
                  }
                }
              },
              {
                $match: matchObj,
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

  deleteGroupMedicalLeads: async (req, res) => {
    try {
      let payload = req.body;
      let leadId = payload.leadId
      let count = 0
      let currentDate = new Date()
      for (let i = 0; i < leadId.length; i++) {
        let lead = await groupMedicalModels.findByIdAndUpdate(leadId[i], { leadStatus: "Delete", deleteDate: currentDate });
        count++;
      }
      if (count) {
        return res.status(200).json({ status: 200, message: "Member Deleted  Successfully !" })
      }
      return res.status(404).json({ status: 404, message: "Member Not Deleted " })
    } catch (error) {
      console.log(error);
    }
  },
  createUsersBYHr: async (req, res) => {
    try {
      let payload = req.body;
      let userDetails = payload.userDetails;
      let hrId = req?.user?._id;
      let count = 0;
      for (let i = 0; i < userDetails.length; i++) {
        let payloadObj = {
          hrId: hrId,
          name: userDetails[i].name,
          email: userDetails[i].email,
          mobile: userDetails[i].mobile,
          employeeNumber: userDetails[i].employeeNumber,
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
                  Please remember to keep your password confidential. We recommend changing it upon login for better security</p>`
              } else {
                emaildata.subject = 'Update Password'
                emaildata.template_id = '6662a9c532b26165203cce1b'
                emaildata.body = `<p>Dear ${payloadObj.name},
                                Your password for LMP has been created as per your request.Here are your login details:
                                Email: ${payloadObj.email}
                                Password: ${password}
                  Please remember to keep your password confidential. We recommend changing it upon login for better security</p>`
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
      console.log(error);
    }
  },
  getGroupMedicalLeadsById: async (req, res) => {
    try {
      let query = req.query;
      let leadId = query?.leadId
      leadDetails = await groupMedicalModels.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(leadId)
          }
        },
        {
          '$lookup': {
            'from': 'companies',
            'localField': 'planCompanyId',
            'foreignField': '_id',
            'as': 'companyData'
          }
        }, {
          '$lookup': {
            'from': 'group_medical_plans',
            'localField': 'planId',
            'foreignField': '_id',
            'as': 'planData'
          }
        }, {
          '$lookup': {
            'from': 'medical_tpas',
            'localField': 'TPAId',
            'foreignField': '_id',
            'as': 'TPAData'
          }
        }, {
          '$lookup': {
            'from': 'medical_networks',
            'localField': 'networkListId',
            'foreignField': '_id',
            'as': 'networData'
          }
        }
      ]);

      if (leadDetails.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Found Successfully !",
            data: leadDetails,
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
  updateGroupMedicalLead: async (req, res) => {
    try {
      let query = req.query;
      let payload = req.body;
      let leadId = query?.leadId
      leadDetails = await groupMedicalModels.findByIdAndUpdate(leadId, payload, { new: true });

      if (leadDetails) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Data Update Successfully !",
            data: leadDetails,
          });
      }
      return res
        .status(404)
        .json({
          status: 404,
          message: "Data Not Update ",
          data: {},
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAdminHrUserLeads: async (req, res) => {
    try {
      let user = req.user;
      let query = req.query;
      let limit = +query?.limit;
      let page = +query?.page;
      let leadType = query?.leadType;
      let companyId = query?.company
      let filterEmail = query?.email
      let filterTPA = query?.tpa
      let planId = query?.planId
      let filterNetwork = query?.network
      let policyNumberFilter = query?.policyNumber
      // console.log("....>>>", filterNetwork)
      let matchObj = {}
      if (leadType == "newlyAdded") {
        matchObj["leadIsActive"] = true
        // matchObj["leadStatus"] = "In Progress"
        matchObj["$and"] = [{ leadStatus: "In Progress" }, { userleadStatus: "newJdv" }]
        // matchObj["$or"] = [{userleadStatus:"newJdv"},{userleadStatus:"deleteJdv"}]

        // matchObj["userleadStatus"] = "sentToJdv"


      }
      // else if (leadType == "deletedRequest") {
      //   matchObj["leadIsActive"] = true
      //   // matchObj["leadStatus"] = "In Progress"
      //   matchObj["$or"] = [{leadStatus:"Approved",userleadStatus:"deleteJdv"},]
      //   // matchObj["$or"] = [{userleadStatus:"newJdv"},{userleadStatus:"deleteJdv"}]

      //   // matchObj["userleadStatus"] = "sentToJdv"


      // }
      else if (leadType == "deleted") {
        matchObj["leadStatus"] = "Delete"

      }
      else if (leadType == "deletedRequest") {
        matchObj["leadIsActive"] = true
        // matchObj["leadStatus"] = "In Progress"
        matchObj["$and"] = [{ leadStatus: "Approved" }, { userleadStatus: "deleteJdv" }]

        // matchObj["$or"] = [{ leadStatus: "In Progress", userleadStatus: "newJdv" }, { leadStatus: "Approved", userleadStatus: "deleteJdv" }]
        // matchObj["$or"] = [{userleadStatus:"newJdv"},{userleadStatus:"deleteJdv"}]
        // matchObj["userleadStatus"] = "sentToJdv"
      }
      else if (leadType == "Active") {
        matchObj["leadStatus"] = "Approved",
          matchObj["leadIsActive"] = true;
      }
      if (companyId) {
        matchObj["planCompanyId"] = mongoose.Types.ObjectId(companyId)
      }
      if (query?.planId) {
        matchObj["planId"] = mongoose.Types.ObjectId(query?.planId)
      }
      // if (query?.memberRequestId) {
      //   matchObj["memberRequestId"] = mongoose.Types.ObjectId(query?.memberRequestId)
      // }
      if (filterEmail) {
        matchObj["email"] = {
          $regex: filterEmail,
          $options: "i",
        }
      }
      if (filterTPA) {
        matchObj["TPAId"] = mongoose.Types.ObjectId(filterTPA)
      }
      if (filterNetwork) {
        matchObj["networkListId"] = mongoose.Types.ObjectId(filterNetwork)
      }
      // console.log(query.planId," paln id")
      if (query?.planId) {
        matchObj["planId"] = mongoose.Types.ObjectId(query?.planId)
      }
      if (policyNumberFilter) {
        matchObj["serialNumber"] = {
          $regex: policyNumberFilter,
          $options: "i",
        }
      }
      console.log("matchObj.........................", matchObj)
      let leadDetails;
      if (limit && page) {
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
      } else {
        console.log("inside else select all")
        leadDetails = await groupMedicalModels.aggregate([
          {
            $match: matchObj
          },
          // {
          //   $unwind: {
          //     path:'$result'
          //   }
          // },
          // {
          //   $project: {
          //     'result._id':1
          //   }
          // },
          {
            $sort: {
              createdAt: -1
            }
          }
        ]);
        if (leadDetails) {
          return res
            .status(200)
            .json({
              status: 200,
              message: "Data Found Successfully !",
              data: leadDetails,
            });
        }
        return res
          .status(404)
          .json({
            status: 404,
            message: "Data Not Found ",
            data: [],
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateGroupMedicalDoccument: async (req, res) => {
    try {
      const payload = req.body;
      let id = req.query.id;
      const documentfile = req.file;
      let fileName = documentfile?.filename;
      let leaddetails = await groupMedicalModels.findById(id);
      let documents = leaddetails?.documents ? leaddetails?.documents : [];
      if (!documents.length) {
        documents.push({
          name: payload.name,
          file: documentfile?.filename,
        });
      } else {
        let count = 0;
        for (let i = 0; i < documents.length; i++) {
          if (
            documents[i]?.name?.toLowerCase() ===
            payload.name?.toLowerCase()
          ) {
            documents[i] = {
              name: payload.name,
              file: documentfile?.filename,
            };
            count++;
            break;
          }
        }
        if (!count) {
          documents.push({
            name: payload.name,
            file: documentfile?.filename,
          });
        }
      }

      leaddetails = await groupMedicalModels.findByIdAndUpdate(id, {
        documents: documents,
      }, {
        new: true,
      }
      );
      if (leaddetails) {
        return res.json({
          status: 200,
          message: "Documents Updated Successfully",
          data: leaddetails,
        });
      }
      return res.json({
        status: 401,
        message: "something went wrong",
        data: null,
      });

    } catch (error) {
      console.log(error);
    }
  },
  getProducerTopLeagentCount: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {
      }
      let facet = {}
      let payload = req.body;
      let usertype = user?.usertype?.toString();
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
      match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() },
        console.log("usertype.................1st", usertype)
      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }

      if (usertype == "66068569e8f96a29286c956e" || (usertype === "64622470b201a6f07b2dff22" && query?.dashboardType === "producerDashbord")) {
        if (usertype === "64622470b201a6f07b2dff22") {
          if (query?.dashboardType === "producerDashboard" && payload.newagent?.length) {
            match["producerId"] = { $in: payload?.newagent?.map(data => mongoose.Types.ObjectId(data)) };
            if (payload?.selectedValue?.length) {
              match["lead_status"] = { $in: payload.selectedValue }
            }
          }
        }
        else if (usertype == "66068569e8f96a29286c956e") {
          match["producerId"] = user?._id
          // match["lead_status"] = {$in:payload?.selectedValue }
          if (payload?.selectedValue?.length) {
            match["lead_status"] = { $in: payload.selectedValue }
          }
        }
        match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }
        facet["totalCount"] = [

          {
            $count: "total",
          },
        ];
        facet["closeLeadCount"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $count: "total",
          },
        ];
        facet["totalPremiumEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$final_price",
              },
            },
          },
        ];
        facet["topAgent"] = [
          {
            '$match': {
              'producerId': {
                '$exists': true
              },
              'policy_issued_status': 1
            }
          }, {
            '$group': {
              '_id': '$assigned_agent',
              'total': {
                '$sum': 1
              },
              'rest': {
                '$first': '$$ROOT'
              }
            }
          }, {
            '$sort': {
              'total': -1
            }
          }, {
            '$limit': 1
          }, {
            '$replaceRoot': {
              'newRoot': '$rest'
            }
          }, {
            '$lookup': {
              'from': 'admins',
              'localField': 'assigned_agent',
              'foreignField': '_id',
              'as': 'data'
            }
          }, {
            '$project': {
              'data.name': 1
            }
          }
        ]
        facet["totalIncomeEarned"] = [
          {
            $match: {
              policy_issued_status: 1,
            },
          },
          {
            $group: {
              _id: null,
              totalFinalPrice: {
                $sum: "$producerComission",
              },
            },
          },
        ];
        facet["lostCount"] = [
          {
            $match: {
              lead_status: "Lost & Dropped",
            },
          },
          {
            $count: "total",
          },
        ];
        facet["pendingCount"] = [
          {
            $match: {
              forward_to: {
                $exists: false
              }
            },
          },
          {
            $count: "total",
          },
        ];
      }

      console.log({ match });
      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      allCount = allCount[0]
      console.log("allCount......................................", allCount)
      if (allCount && allCount.topAgent && allCount.topAgent[0])
        if (!Object.keys(allCount)?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
        }
      let closeLeadCount = allCount && allCount.closeLeadCount && allCount.closeLeadCount[0] ? allCount.closeLeadCount[0].total : 0
      let newLead = allCount && allCount.totalCount && allCount.totalCount[0] ? allCount.totalCount[0].total : 0
      let closingRation = 0
      if (newLead) {
        closingRation = closeLeadCount / newLead?.toFixed(2)
      }
      let data = {
        closeLeadCount: closeLeadCount,
        newLead: newLead,
        closingRation: closingRation,
        premiumEarened: allCount && allCount.totalPremiumEarned && allCount.totalPremiumEarned[0] ? allCount.totalPremiumEarned[0].totalFinalPrice : 0,
        incomeEarened: allCount && allCount.totalIncomeEarned && allCount.totalIncomeEarned[0] ? allCount.totalIncomeEarned[0].totalFinalPrice : 0,
        lostCount: allCount && allCount.lostCount && allCount.lostCount[0] ? allCount.lostCount[0].total : 0,
        pendingCount: allCount && allCount.pendingCount && allCount.pendingCount[0] ? allCount.pendingCount[0].total : 0,
        topAgent: allCount && allCount.topAgent && allCount.topAgent[0] ? allCount.topAgent[0].data[0].name : 0,



      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },
  addBulkGroupMedicalLeadsByAdmin: async (req, res) => {
    try {
      let payload = req.body;
      let user = req.user;
      let requestPaload = {}
      let count = 0
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
      //   if (payload?.policy_number) {
      //   requestPaload['policy_number'] = payload?.policy_number
      // }
      // if (req.file) {
      //   requestPaload['file'] = req.file.filename
      // }

      // let file = fs.readFileSync("Member_files/" + req.file.filename);
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
      let requestedData = await memberRequestModels.findOneAndUpdate(requestPaload, requestPaload, { upsert: true, returnOriginal: false })
      let memberRequestId = requestedData?._id
      for (let i = 0; i < xlData.length; i++) {

        let payloadObj = { memberRequestId: memberRequestId };
        payloadObj["planCompanyId"] = payload?.planCompanyId;
        payloadObj["planId"] = payload?.planId;
        payloadObj["TPAId"] = payload?.TPAId;
        payloadObj["networkListId"] = payload?.networkListId;
        payloadObj["type_of_policy"] = "658bf04ed4c9b13ffb6ddb8a";
        payloadObj["policyName"] = payload?.policyName;
        payloadObj["policy_number"] = payload?.policy_number;




        // console.log("new object...............",Object.keys( xlData[i]));
        // let newObj = {}
        // for(let key in xlData[i]){
        //   newObj[key?.trim()?.toLowerCase()] = xlData[i][key];
        // }
        // console.log("newObj...........................",newObj)
        console.log("new object...............", xlData[i])
        payloadObj["SINumber"] = xlData[i]["Sl No."]
        payloadObj["firstName"] = xlData[i]?.["First Name "];
        payloadObj["middleName"] = xlData[i]?.["Middle Name"];
        payloadObj["lastnName"] = xlData[i]?.["Last Name"];
        payloadObj["employeeNumber"] = xlData[i]?.["Employee Number"];
        payloadObj["dateOfBirth"] = xlData[i]?.["Date Of Birth "];
        payloadObj["gender"] = xlData[i]?.["Gender"];
        payloadObj["maritalStatus"] = xlData[i]?.["Marital Status"];
        payloadObj["relation"] = xlData[i]?.["Relation"];
        payloadObj["category"] = xlData[i]?.["Category"];
        payloadObj["regino"] = xlData[i]?.["Region"];
        payloadObj["LSB"] = xlData[i]?.["LSB"];
        payloadObj["nationality"] = xlData[i]?.["Nationality"];
        payloadObj["passportNumber"] = xlData[i]?.["Passport Number"];
        payloadObj["EidNumber"] = xlData[i]?.["Eid Number"];
        payloadObj["UidNumber"] = xlData[i]?.["Uid Number"];
        payloadObj["visaIssuedLocation"] = xlData[i]?.["Visa Issued Location"];
        payloadObj["actualSalryBand"] = xlData[i]?.["Actual Salary Band"];
        payloadObj["personCommission"] = xlData[i]?.["Person Commission"];
        payloadObj["residentialLocation"] = xlData[i]?.["Residential Location"];
        payloadObj["workLocation"] = xlData[i]?.["Work Location"];
        payloadObj["email"] = xlData[i]?.["Email"];
        payloadObj["phoneno"] = xlData[i]?.["Mobile Number"];
        payloadObj["photoFileName"] = xlData[i]?.["Photo File Name"];
        payloadObj["sponsorType"] = xlData[i]?.["Sponsor Type "];
        payloadObj["sponsorId"] = xlData[i]?.["Sponsor Id"];
        payloadObj["sponsorContactNumber"] = xlData[i]?.["Sponsor Contact Number"];
        payloadObj["sponsorContactEmail"] = xlData[i]?.["Sponsor Contact Email "];
        payloadObj["occupation"] = xlData[i]?.["Occupation"];
        payloadObj["AdditionEffectiveDate"] = xlData[i]?.["Addition Effective Date"];
        payloadObj["visaFileNumber"] = xlData[i]?.["Visa File Number"];
        payloadObj["birthCertificateNumber"] = xlData[i]?.["Birth Certificate Number"];
        payloadObj["serialNumber"] = await groupSerialNumber()
        payloadObj["leadStatus"] = "In Progress"
        payloadObj["userleadStatus"] = "newJdv"
        payloadObj["HRUserId"] = user?._id
        payloadObj["sentToJdvDate"] = new Date()
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkpayloadObj", payloadObj)
        let data = await groupMedicalModels.findOneAndUpdate(
          { UidNumber: payloadObj?.UidNumber, leadStatus: "In Progress" },
          payloadObj,
          { upsert: true, returnOriginal: false }
        );
        // let data = await groupMedicalModels.create(payloadObj)
        count++
      }
      if (count) {
        return res.status(201).json({ status: 201, message: "Data Saved Successfully !" })
      }
      return res.status(404).json({ status: 404, message: "Data Not Saved " })
    } catch (error) {
      console.log(error);
    }
  },
  getClaimGroupMedicalPlan: async (req, res) => {
    try {
      let query = req.query;
      const page = +query?.page;
      const limit = +query?.limit;
      let matchObj = {};
      let data = [];
      let company_id = query?.company_id;
      let plan_name = query?.plan_name;
      let status = +query?.status;
      let startDate = query.startDate
      let endDate = query.endDate
      // console.log(page,limit)
      if (page && limit) {
        // console.log("hiii")
        if (company_id) {
          matchObj["company_id"] = mongoose.Types.ObjectId(company_id);
        }
        if (plan_name) {
          matchObj["plan_name"] = {
            $regex: plan_name,
            $options: "i",
          };
        }
        // if (startDate) {
        //   startDate =new Date(startDate)
        //   matchObj['from_date'] = {
        //     $gte:startDate
        //   }
        // }
        // if (endDate) {
        //   endDate =new Date(endDate)
        //   matchObj['to_date'] = {
        //     $lte:endDate
        //   }
        // }
        if (status == 0 || status == 1) {
          matchObj["status"] = status;
        }
        let aggregate = [
          {
            $match: matchObj,
          },
          {
            $sort: {
              updatedAt: -1
            }
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
            $project: {
              plan_name: 1,
              'companyData.company_name': 1,
              'companyData._id': 1,
              locationData: 1,
              from_date: 1,
              to_date: 1,
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
          return res.json({
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
      }
    } catch (error) {
      console.log(error);
    }
  },
  getInsurancetopLeagentCount: async (req, res) => {
    try {
      let user = req.user
      let match = {
        plan_company_id: { '$exists': true }
      }
      let facet
      let payload = req.body;
      let usertype = user?.usertype?.toString();
      let dateRange = payload.dateRange;
      let customstartdate = payload.startdate;
      let customenddate = payload.enddate;
      let insuranceompanyId = payload.insuranceompanyId ? payload.insuranceompanyId : []
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
      // match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if (usertype === '64622470b201a6f07b2dff22') {
        if (insuranceompanyId?.length) {
          match["plan_company_id"] = { $in: insuranceompanyId.map(data => mongoose.Types.ObjectId(data)) };
        }
      } else {
        if (user?.insurance_company) { match["plan_company_id"] = mongoose.Types.ObjectId(user?.insurance_company) }
      }
      facet = {
        totalPrimium: [
          {
            $match: {
              policy_issued_status: 1
            }
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$final_price"
              }
            }
          }
        ],
        closePolicy: [
          {
            '$match': {
              'plan_company_id': {
                '$exists': true
              },
              'policy_issued_status': 1
            }
          }, {
            '$count': 'total'
          }
        ],
        quotesSelcted: [
          {
            '$match': {
              'plan_company_id': {
                '$exists': true
              },
              'policy_issued_status': 0
            }
          }, {
            '$count': 'total'
          }
        ],
        bestSellingLob: [
          {
            '$match': {
              'type_of_policy': {
                '$exists': true
              },
              policy_issued_status: 1
            }
          }, {
            '$group': {
              '_id': '$type_of_policy',
              'total': {
                '$sum': "$final_price"
              }
            }
          }, {
            '$sort': {
              'total': -1
            }
          }, {
            '$limit': 1
          }, {
            '$lookup': {
              'from': 'line_of_businesses',
              'localField': '_id',
              'foreignField': '_id',
              'as': 'lobData'
            }
          }, {
            '$project': {
              'lobData.line_of_business_name': 1
            }
          }
        ],
        noOfSellingLobs: [
          {
            '$match': {
              'type_of_policy': {
                '$exists': true
              },
              'policy_issued_status': 1
            }
          }, {
            '$group': {
              '_id': '$type_of_policy',
              'total': {
                '$sum': '$final_price'
              }
            }
          }, {
            '$count': 'total'
          }
        ]
      }

      console.log("match obj", match);
      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $facet: facet
      });
      let allCount = await NewLead.aggregate(aggregate)
      console.log("allCount.......................", allCount)
      allCount = allCount[0]
      if (allCount && allCount.topAgent && allCount.topAgent[0])
        //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>.",allCount && allCount.topAgent && allCount.topAgent[0] && allCount.topAgent[0] && allCount.topAgent[0])
        if (!Object.keys(allCount)?.length) {
          return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
        }
      let closePolicy = allCount && allCount.closePolicy && allCount.closePolicy[0] ? allCount.closePolicy[0].total : 0
      let quotesSelcted = allCount && allCount.quotesSelcted && allCount.quotesSelcted[0] ? allCount.quotesSelcted[0].total : 0
      let closingRatio = quotesSelcted ? ((quotesSelcted / (quotesSelcted + closePolicy)) * 100)?.toFixed(2) : 0
      console.log({ quotesSelcted, closePolicy })
      let besSellingPolicy = allCount && allCount.bestSellingLob && allCount.bestSellingLob[0] ? allCount.bestSellingLob[0].lobData : []
      besSellingPolicy = besSellingPolicy && besSellingPolicy[0] && besSellingPolicy[0] ? besSellingPolicy[0].line_of_business_name : ""
      let data = {
        totalPrimium: allCount && allCount.totalPrimium && allCount.totalPrimium[0] ? allCount.totalPrimium[0].total : 0,
        noOfSellingLobs: allCount && allCount.noOfSellingLobs && allCount.noOfSellingLobs[0] ? allCount.noOfSellingLobs[0].total : 0,
        closingRatio,
        closePolicy,
        besSellingPolicy
      }

      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: data });

    } catch (err) {
      console.log(err);
    }
  },

  businessDashboard: async (req, res) => {
    try {
      let query = req.query
      let user = req.user
      let match = {}
      let facet = {}
      let payload = req.body;
      let usertype = user?.usertype?.toString();
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

      match["new_lead_timestamp"] = { $gte: startDate.toDate(), $lte: endDate.toDate() }

      if (payload?.location?.length) {
        match["lead_location"] = { $in: payload.location.map(data => mongoose.Types.ObjectId(data)) }
      }
      if (payload?.business_type?.length) {
        match["business_type"] = { $in: payload.business_type }
      }
      if (payload?.lob?.length) {
        match["type_of_policy"] = { $in: payload.lob.map(data => mongoose.Types.ObjectId(data)) };
      }
      if (usertype === '650029a2df69a4033408903d' || (usertype === "64622470b201a6f07b2dff22")) {
        if (payload?.userType == 'documentChaser' && payload?.newagent?.length) {
          match["forward_to"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'salesAdvisor' && payload?.newagent?.length) {
          match["assigned_agent"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
        else if (payload?.userType == 'policyIssuer' && payload?.newagent?.length) {
          match["dcleadforwardto"] = { $in: payload.newagent.map(data => mongoose.Types.ObjectId(data)) };
        }
      }

      if (payload?.selectedSupervisor?.length) {
        match["supervisor_id"] = { $in: payload.selectedSupervisor.map(data => mongoose.Types.ObjectId(data)) };
      }

      let aggregate = []
      aggregate.push({
        $match: match,
      })

      aggregate.push({
        $addFields: { hours: { $hour: { $toDate: "$new_lead_timestamp" } } }
      })

      aggregate.push({
        $addFields: { policy_issued: { $hour: { $toDate: "$policy_issued_date" } } }
      })

      aggregate.push({
        $facet: {
          motorCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef") } },
            { $count: "total" }
          ],
          travelCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6") } },
            { $count: "total" }
          ],
          homeCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724") } },
            { $count: "total" }
          ],
          yatchCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739") } },
            { $count: "total" }
          ],
          medicalCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762") } },
            { $count: "total" }
          ],
          ortherInsuranceCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b") } },
            { $count: "total" }
          ],

          closeMotorCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"), policy_issued_status: 1 } },
            { $count: "total" }
          ],
          closeTravelCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"), policy_issued_status: 1 } },
            { $count: "total" }
          ],
          closeHomeCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"), policy_issued_status: 1 } },
            { $count: "total" }
          ],
          closeYatchCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"), policy_issued_status: 1 } },
            { $count: "total" }
          ],
          closeMedicalCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"), policy_issued_status: 1 } },
            { $count: "total" }
          ],
          closeOrtherInsuranceCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"), policy_issued_status: 1 } },
            { $count: "total" }
          ],

          pendingMotorCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418643bf42eaf5ba1c9e0ef"), policy_issued_status: 0 } },
            { $count: "total" }
          ],
          pendingTravelCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("6418645df42eaf5ba1c9e0f6"), policy_issued_status: 0 } },
            { $count: "total" }
          ],
          pendingHomeCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0a2cbfce023c8c76724"), policy_issued_status: 0 } },
            { $count: "total" }
          ],
          pendingYatchCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf0bbcbfce023c8c76739"), policy_issued_status: 0 } },
            { $count: "total" }
          ],
          pendingMedicalCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("641bf214cbfce023c8c76762"), policy_issued_status: 0 } },
            { $count: "total" }
          ],
          pendingOrtherInsuranceCount: [
            { $match: { type_of_policy: mongoose.Types.ObjectId("64defed43635b4f7b55fcd4b"), policy_issued_status: 0 } },
            { $count: "total" }
          ],

          totalCount: [
            { $count: "total" }
          ],
          topAgent: [
            {
              $group: {
                _id: "$assigned_agent",
                total: { $sum: 1 }
              }
            },
            { $sort: { total: -1 } },
            { $match: { _id: { $ne: null } } },
            {
              $lookup: {
                from: "admins",
                localField: "_id",
                foreignField: "_id",
                as: "result"
              }
            },
            { $unwind: { path: "$result" } },
            { $project: { "result.name": 1 } }
          ],
          closeLeadCount: [
            { $match: { policy_issued_status: 1 } },
            { $count: "total" }
          ],
          totalPremiumEarned: [
            { $match: { policy_issued_status: 1 } },
            {
              $group: {
                _id: null,
                totalFinalPrice: { $sum: "$final_price" }
              }
            }
          ],
          totalIncomeEarned: [
            { $match: { policy_issued_status: 1 } },
            {
              $group: {
                _id: null,
                totalIncomeEarned: { $sum: "$adminFee" }
              }
            }
          ],
          lostCount: [
            { $match: { lead_status: "Lost & Dropped" } },
            { $count: "total" }
          ],
          supevisorPendingCount: [
            { $match: { assigned_agent: { $exists: false }, supervisor_id: { $exists: true } } },
            { $count: "total" }
          ],
          saleAdvisorPendingCount: [
            { $match: { forward_to: { $exists: false }, assigned_agent: { $exists: true } } },
            { $count: "total" }
          ],
          policyIssuerPendingCount: [
            {
              $match: {
                policy_issued_status: 0,
                dcleadforwardto: { $exists: true },
                dcrecived_from: { $exists: true }
              }
            },
            { $count: "total" }
          ],
          dacumentsChaserPendingCount: [
            {
              $match: {
                dcrecived_from: { $exists: false },
                forward_to: { $exists: true }
              }
            },
            { $count: "total" }
          ],

          // ...facet,
          sevencount: [
            {
              $match: { hours: 7 }
            },
            {
              $count: "total",
            },

          ],
          eightcount: [
            {
              $match: { hours: 8 }
            },
            {
              $count: "total",
            },
          ],
          ninecount: [

            {
              $match: { hours: 9 }
            },
            {
              $count: "total",
            },
          ],
          tencount: [
            {
              $match: { hours: 10 }
            },
            {
              $count: "total",
            },
          ],
          elevencount: [
            {
              $match: { hours: 11 }
            },
            {
              $count: "total",
            },
          ],
          twelvecount: [
            {
              $match: { hours: 12 }
            },
            {
              $count: "total",
            },
          ],
          thirteencount: [
            {
              $match: { hours: 13 }
            },
            {
              $count: "total",
            },
          ],
          fourteencount: [
            {
              $match: { hours: 14 }
            },
            {
              $count: "total",
            },
          ],
          fifteencount: [
            {
              $match: { hours: 15 }
            },
            {
              $count: "total",
            },
          ],
          sixteencount: [
            {
              $match: { hours: 16 }
            },
            {
              $count: "total",
            },
          ],
          seventeencount: [
            {
              $match: { hours: 17 }
            },
            {
              $count: "total",
            },
          ],
          eighteencount: [
            {
              $match: { hours: 18 }
            },
            {
              $count: "total",
            },
          ],
          ninteenCount: [
            {
              $match: { hours: 19 }
            },
            {
              $count: "total",
            },
          ],

          closedsevenCount: [
            {
              $match: {
                hours: 7,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedeightCount: [
            {
              $match: {
                hours: 8,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closednineCount: [
            {
              $match: {
                hours: 9,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedtenCount: [
            {
              $match: {
                hours: 10,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedelevenCount: [
            {
              $match: {
                hours: 11,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedtwelveCount: [
            {
              $match: {
                hours: 12,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedthirteenCount: [
            {
              $match: {
                hours: 13,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedfourteenCount: [
            {
              $match: {
                hours: 14,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedfifteenCount: [
            {
              $match: {
                hours: 15,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedsixteenCount: [
            {
              $match: {
                hours: 16,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedseventeenCount: [
            {
              $match: {
                hours: 17,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedeighteenCount: [
            {
              $match: {
                hours: 18,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],
          closedninteenCount: [
            {
              $match: {
                hours: 19,
                policy_issued_status: 1
              }
            },
            {
              $count: "total",
            },
          ],

          pendingsevenCount: [
            {
              $match: {
                hours: 7,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingeightCount: [
            {
              $match: {
                hours: 8,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingnineCount: [
            {
              $match: {
                hours: 9,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingtenCount: [
            {
              $match: {
                hours: 10,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingelevenCount: [
            {
              $match: {
                hours: 11,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingtwelveCount: [
            {
              $match: {
                hours: 12,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingthirteenCount: [
            {
              $match: {
                hours: 13,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingfourteenCount: [
            {
              $match: {
                hours: 14,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingfifteenCount: [
            {
              $match: {
                hours: 15,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingsixteenCount: [
            {
              $match: {
                hours: 16,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingseventeenCount: [
            {
              $match: {
                hours: 17,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingeighteenCount: [
            {
              $match: {
                hours: 18,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],
          pendingninteenCount: [
            {
              $match: {
                hours: 19,
                policy_issued_status: 0
              }
            },
            {
              $count: "total",
            },
          ],

          hotleadsCount: [
            {
              $match: {
                lead_status: 'Hot'
              }
            },
            {
              $count: "total",
            },
          ],
          warmleadsCount: [
            {
              $match: {
                lead_status: 'Warm'
              }
            },
            {
              $count: "total",
            },
          ],
          coldleadsCount: [
            {
              $match: {
                lead_status: 'Cold'
              }
            },
            {
              $count: "total",
            },
          ],

          totalsevenPremium: [
            {
              $match: {
                hours: 7,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totaleightPremium: [
            {
              $match: {
                hours: 8,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalninePremium: [
            {
              $match: {
                hours: 9,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totaltenPremium: [
            {
              $match: {
                hours: 10,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalelevenPremium: [
            {
              $match: {
                hours: 11,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totaltwelvePremium: [
            {
              $match: {
                hours: 12,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalthirteenPremium: [
            {
              $match: {
                hours: 13,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalfourteenPremium: [
            {
              $match: {
                hours: 14,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalfifteenPremium: [
            {
              $match: {
                hours: 15,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalsixteenPremium: [
            {
              $match: {
                hours: 16,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalseventeenPremium: [
            {
              $match: {
                hours: 17,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totaleighteenPremium: [
            {
              $match: {
                hours: 18,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],
          totalninteenPremium: [
            {
              $match: {
                hours: 19,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$final_price" },
              },
            },
          ],

          totalTenMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 0, $lt: 10 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalTwentyMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 10, $lt: 20 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalThirtyMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 20, $lt: 30 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalFortyMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 30, $lt: 40 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalFiftyMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 40, $lt: 50 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalSixtyMinutesDCLead: [
            {
              $project: {
                "assign_documentchaser_timestamp": 1,
                "assign_policyissuer_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissuer_timestamp", "$assign_documentchaser_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 50, $lte: 60 }
              }
            },
            {
              $count: "total"
            }
          ],

          totalTenMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 0, $lt: 10 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalTwentyMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 10, $lt: 20 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalThirtyMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 20, $lt: 30 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalFortyMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 30, $lt: 40 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalFiftyMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 40, $lt: 50 }
              }
            },
            {
              $count: "total"
            }
          ],
          totalSixtyMinutesPCLead: [
            {
              $project: {
                "assign_policyissuer_timestamp": 1,
                "assign_policyissued_timestamp": 1,
                "timeDifferenceInMinutes": {
                  $divide: [
                    { $subtract: ["$assign_policyissued_timestamp", "$assign_policyissuer_timestamp"] },
                    1000 * 60
                  ]
                }
              }
            },
            {
              $match: {
                "timeDifferenceInMinutes": { $gte: 50, $lte: 60 }
              }
            },
            {
              $count: "total"
            }
          ],

          pendingSevenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: { $lte: 7 },
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingEightCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 8,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingNineCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 9,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingTenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 10,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingElevenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 11,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingTwelveCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 12,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingThirteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 13,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingFourteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 14,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingFifteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 15,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingSixteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 16,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingSeventeenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 17,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingEighteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 18,
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingNineteenCountDC: [
            {
              $match: {
                assign_policyissuer_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_documentchaser_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: { $gte: 19 },
                forward_to: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],

          pendingSevenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: { $lte: 7 },
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingEightCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 8,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingNineCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 9,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingTenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 10,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingElevenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 11,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingTwelveCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 12,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingThirteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 13,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingFourteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 14,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingFifteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 15,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingSixteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 16,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingSeventeenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 17,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingEighteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: 18,
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],
          pendingNineteenCountPC: [
            {
              $match: {
                assign_policyissued_timestamp: {
                  $exists: false
                }
              }
            },
            {
              $addFields: {
                hours: {
                  $hour: {
                    $toDate:
                      "$assign_policyissuer_timestamp"
                  }
                }
              }
            },
            {
              $match: {
                hours: { $gte: 19 },
                dcleadforwardto: {
                  $exists: true
                }
              }
            },
            {
              $count: "total"
            }
          ],

          totalsevenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: { $gte: 7 },
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totaleightEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 8,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalnineEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 9,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totaltenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 10,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalelevenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 11,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totaltwelveEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 12,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalthirteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 13,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalfourteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 14,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalfifteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 15,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalsixteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 16,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalseventeenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 17,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totaleighteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: 18,
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],
          totalninteenEarnedCommission: [
            {
              $match: {
                policy_issued_status: 1,
                policy_issued: { $gte: 19 },
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$jdvComission" },
              },
            },
          ],

        }
      })

      let allCount = await NewLead.aggregate(aggregate);
      allCount = allCount[0];

      if (!allCount) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] });
      }

      let data = {
        motorCount: allCount?.motorCount?.[0]?.total || 0,
        travelCount: allCount?.travelCount?.[0]?.total || 0,
        homeCount: allCount?.homeCount?.[0]?.total || 0,
        yatchCount: allCount?.yatchCount?.[0]?.total || 0,
        medicalCount: allCount?.medicalCount?.[0]?.total || 0,
        ortherInsuranceCount: allCount?.ortherInsuranceCount?.[0]?.total || 0,

        closeMotorCount: allCount?.closeMotorCount?.[0]?.total || 0,
        closeTravelCount: allCount?.closeTravelCount?.[0]?.total || 0,
        closeHomeCount: allCount?.closeHomeCount?.[0]?.total || 0,
        closeMedicalCount: allCount?.closeMedicalCount?.[0]?.total || 0,
        closeYatchCount: allCount?.closeYatchCount?.[0]?.total || 0,
        closeOrtherInsuranceCount: allCount?.closeOrtherInsuranceCount?.[0]?.total || 0,

        pendingMotorCount: allCount?.pendingMotorCount?.[0]?.total || 0,
        pendingTravelCount: allCount?.pendingTravelCount?.[0]?.total || 0,
        pendingHomeCount: allCount?.pendingHomeCount?.[0]?.total || 0,
        pendingYatchCount: allCount?.pendingYatchCount?.[0]?.total || 0,
        pendingMYedicalCount: allCount?.pendingMYedicalCount?.[0]?.total || 0,
        pendingOrtherInsuranceCount: allCount?.pendingOrtherInsuranceCount?.[0]?.total || 0,

        totalCount: allCount?.totalCount?.[0]?.total || 0,
        topAgent: allCount?.topAgent?.[0]?.result?.name,
        closeLeadCount: allCount?.closeLeadCount?.[0]?.total || 0,
        totalPremiumEarned: allCount?.totalPremiumEarned?.[0]?.totalFinalPrice || 0,
        totalIncomeEarned: allCount?.totalIncomeEarned?.[0]?.totalIncomeEarned || 0,
        lostCount: allCount?.lostCount?.[0]?.total || 0,
        supevisorPendingCount: allCount?.supevisorPendingCount?.[0]?.total || 0,
        saleAdvisorPendingCount: allCount?.saleAdvisorPendingCount?.[0]?.total || 0,
        policyIssuerPendingCount: allCount?.policyIssuerPendingCount?.[0]?.total || 0,

        sevencount: allCount?.sevencount?.[0]?.total || 0,
        eightcount: allCount?.eightcount?.[0]?.total || 0,
        ninecount: allCount?.ninecount?.[0]?.total || 0,
        tencount: allCount?.tencount?.[0]?.total || 0,
        elevencount: allCount?.elevencount?.[0]?.total || 0,
        twelvecount: allCount?.twelvecount?.[0]?.total || 0,
        thirteencount: allCount?.thirteencount?.[0]?.total || 0,
        fourteencount: allCount?.fourteencount?.[0]?.total || 0,
        fifteencount: allCount?.fifteencount?.[0]?.total || 0,
        sixteencount: allCount?.sixteencount?.[0]?.total || 0,
        seventeencount: allCount?.seventeencount?.[0]?.total || 0,
        eighteencount: allCount?.eighteencount?.[0]?.total || 0,
        ninteenCount: allCount?.ninteenCount?.[0]?.total || 0,

        closedsevenCount: allCount?.closedsevenCount?.[0]?.total || 0,
        closedeightCount: allCount?.closedeightCount?.[0]?.total || 0,
        closednineCount: allCount?.closednineCount?.[0]?.total || 0,
        closedtenCount: allCount?.closedtenCount?.[0]?.total || 0,
        closedelevenCount: allCount?.closedelevenCount?.[0]?.total || 0,
        closedtwelveCount: allCount?.closedtwelveCount?.[0]?.total || 0,
        closedthirteenCount: allCount?.closedthirteenCount?.[0]?.total || 0,
        closedfourteenCount: allCount?.closedfourteenCount?.[0]?.total || 0,
        closedfifteenCount: allCount?.closedfifteenCount?.[0]?.total || 0,
        closedsixteenCount: allCount?.closedsixteenCount?.[0]?.total || 0,
        closedseventeenCount: allCount?.closedseventeenCount?.[0]?.total || 0,
        closedeighteenCount: allCount?.closedeighteenCount?.[0]?.total || 0,
        closedninteenCount: allCount?.closedninteenCount?.[0]?.total || 0,

        pendingsevenCount: allCount?.pendingsevenCount?.[0]?.total || 0,
        pendingeightCount: allCount?.pendingeightCount?.[0]?.total || 0,
        pendingnineCount: allCount?.pendingnineCount?.[0]?.total || 0,
        pendingtenCount: allCount?.pendingtenCount?.[0]?.total || 0,
        pendingelevenCount: allCount?.pendingelevenCount?.[0]?.total || 0,
        pendingtwelveCount: allCount?.pendingtwelveCount?.[0]?.total || 0,
        pendingthirteenCount: allCount?.pendingthirteenCount?.[0]?.total || 0,
        pendingfourteenCount: allCount?.pendingfourteenCount?.[0]?.total || 0,
        pendingfifteenCount: allCount?.pendingfifteenCount?.[0]?.total || 0,
        pendingsixteenCount: allCount?.pendingsixteenCount?.[0]?.total || 0,
        pendingseventeenCount: allCount?.pendingseventeenCount?.[0]?.total || 0,
        pendingeighteenCount: allCount?.pendingeighteenCount?.[0]?.total || 0,
        pendingninteenCount: allCount?.pendingninteenCount?.[0]?.total || 0,

        hotleadsCount: allCount?.hotleadsCount?.[0]?.total || 0,
        warmleadsCount: allCount?.warmleadsCount?.[0]?.total || 0,
        coldleadsCount: allCount?.coldleadsCount?.[0]?.total || 0,

        totalsevenPremium: allCount?.totalsevenPremium?.[0]?.total || 0,
        totaleightPremium: allCount?.totaleightPremium?.[0]?.total || 0,
        totalninePremium: allCount?.totalninePremium?.[0]?.total || 0,
        totaltenPremium: allCount?.totaltenPremium?.[0]?.total || 0,
        totalelevenPremium: allCount?.totalelevenPremium?.[0]?.total || 0,
        totaltwelvePremium: allCount?.totaltwelvePremium?.[0]?.total || 0,
        totalthirteenPremium: allCount?.totalthirteenPremium?.[0]?.total || 0,
        totalfourteenPremium: allCount?.totalfourteenPremium?.[0]?.total || 0,
        totalfifteenPremium: allCount?.totalfifteenPremium?.[0]?.total || 0,
        totalsixteenPremium: allCount?.totalsixteenPremium?.[0]?.total || 0,
        totalseventeenPremium: allCount?.totalseventeenPremium?.[0]?.total || 0,
        totaleighteenPremium: allCount?.totaleighteenPremium?.[0]?.total || 0,
        totalninteenPremium: allCount?.totalninteenPremium?.[0]?.total || 0,

        totalTenMinutesDCLead: allCount?.totalTenMinutesDCLead?.[0]?.total || 0,
        totalTwentyMinutesDCLead: allCount?.totalTwentyMinutesDCLead?.[0]?.total || 0,
        totalThirtyMinutesDCLead: allCount?.totalThirtyMinutesDCLead?.[0]?.total || 0,
        totalFortyMinutesDCLead: allCount?.totalFortyMinutesDCLead?.[0]?.total || 0,
        totalFiftyMinutesDCLead: allCount?.totalFiftyMinutesDCLead?.[0]?.total || 0,
        totalSixtyMinutesDCLead: allCount?.totalSixtyMinutesDCLead?.[0]?.total || 0,

        totalTenMinutesPCLead: allCount?.totalTenMinutesPCLead?.[0]?.total || 0,
        totalTwentyMinutesPCLead: allCount?.totalTwentyMinutesPCLead?.[0]?.total || 0,
        totalThirtyMinutesPCLead: allCount?.totalThirtyMinutesPCLead?.[0]?.total || 0,
        totalFortyMinutesPCLead: allCount?.totalFortyMinutesPCLead?.[0]?.total || 0,
        totalFiftyMinutesPCLead: allCount?.totalFiftyMinutesPCLead?.[0]?.total || 0,
        totalSixtyMinutesPCLead: allCount?.totalSixtyMinutesPCLead?.[0]?.total || 0,

        pendingSevenCountDC: allCount?.pendingSevenCountDC?.[0]?.total || 0,
        pendingEightCountDC: allCount?.pendingEightCountDC?.[0]?.total || 0,
        pendingNineCountDC: allCount?.pendingNineCountDC?.[0]?.total || 0,
        pendingTenCountDC: allCount?.pendingTenCountDC?.[0]?.total || 0,
        pendingElevenCountDC: allCount?.pendingElevenCountDC?.[0]?.total || 0,
        pendingTwelveCountDC: allCount?.pendingTwelveCountDC?.[0]?.total || 0,
        pendingThirteenCountDC: allCount?.pendingThirteenCountDC?.[0]?.total || 0,
        pendingFourteenCountDC: allCount?.pendingFourteenCountDC?.[0]?.total || 0,
        pendingFifteenCountDC: allCount?.pendingFifteenCountDC?.[0]?.total || 0,
        pendingSixteenCountDC: allCount?.pendingSixteenCountDC?.[0]?.total || 0,
        pendingSeventeenCountDC: allCount?.pendingSeventeenCountDC?.[0]?.total || 0,
        pendingEighteenCountDC: allCount?.pendingEighteenCountDC?.[0]?.total || 0,
        pendingNineteenCountDC: allCount?.pendingNineteenCountDC?.[0]?.total || 0,

        pendingSevenCountPC: allCount?.pendingSevenCountPC?.[0]?.total || 0,
        pendingEightCountPC: allCount?.pendingEightCountPC?.[0]?.total || 0,
        pendingNineCountPC: allCount?.pendingNineCountPC?.[0]?.total || 0,
        pendingTenCountPC: allCount?.pendingTenCountPC?.[0]?.total || 0,
        pendingElevenCountPC: allCount?.pendingElevenCountPC?.[0]?.total || 0,
        pendingTwelveCountPC: allCount?.pendingTwelveCountPC?.[0]?.total || 0,
        pendingThirteenCountPC: allCount?.pendingThirteenCountPC?.[0]?.total || 0,
        pendingFourteenCountPC: allCount?.pendingFourteenCountPC?.[0]?.total || 0,
        pendingFifteenCountPC: allCount?.pendingFifteenCountPC?.[0]?.total || 0,
        pendingSixteenCountPC: allCount?.pendingSixteenCountPC?.[0]?.total || 0,
        pendingSeventeenCountPC: allCount?.pendingSeventeenCountPC?.[0]?.total || 0,
        pendingEighteenCountPC: allCount?.pendingEighteenCountPC?.[0]?.total || 0,
        pendingNineteenCountPC: allCount?.pendingNineteenCountPC?.[0]?.total || 0,

        totalsevenEarnedCommission: allCount?.totalsevenEarnedCommission?.[0]?.total || 0,
        totaleightEarnedCommission: allCount?.totaleightEarnedCommission?.[0]?.total || 0,
        totalnineEarnedCommission: allCount?.totalnineEarnedCommission?.[0]?.total || 0,
        totaltenEarnedCommission: allCount?.totaltenEarnedCommission?.[0]?.total || 0,
        totalelevenEarnedCommission: allCount?.totalelevenEarnedCommission?.[0]?.total || 0,
        totaltwelveEarnedCommission: allCount?.totaltwelveEarnedCommission?.[0]?.total || 0,
        totalthirteenEarnedCommission: allCount?.totalthirteenEarnedCommission?.[0]?.total || 0,
        totalfourteenEarnedCommission: allCount?.totalfourteenEarnedCommission?.[0]?.total || 0,
        totalfifteenEarnedCommission: allCount?.totalfifteenEarnedCommission?.[0]?.total || 0,
        totalsixteenEarnedCommission: allCount?.totalsixteenEarnedCommission?.[0]?.total || 0,
        totalseventeenEarnedCommission: allCount?.totalseventeenEarnedCommission?.[0]?.total || 0,
        totaleighteenEarnedCommission: allCount?.totaleighteenEarnedCommission?.[0]?.total || 0,
        totalninteenEarnedCommission: allCount?.totalninteenEarnedCommission?.[0]?.total || 0,
      };

      if (allCount?.closeLeadCount?.[0]?.total) {
        data.closingRatio = +((allCount.closeLeadCount[0].total / allCount.totalCount[0].total).toFixed(4));
      }

      return res.status(200).json({ status: 200, message: "Data Found Successfully!", data });
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  getUserAccordingUserTypeAll: async (req, res) => {
    try {
      let query = req.query
      let match = { status: 1 }
      let userDetails
      let user = req.user
      let locationArr = []
      for (let i = 0; i < user.location.length; i++) {
        locationArr.push((user.location[i].loc_id
        ))
      }
      match['location.loc_id'] = { $in: locationArr }
      if (query.userType) {
        query.userType = query.userType.split(',')
        if (query.userType.length > 0) {
          query.userType = query.userType.map(data => mongoose.Types.ObjectId(data))
          match["usertype"] = {
            $in: query.userType
          }
        } else {
          return res.status(200).json({ status: 200, message: "Data Not Found", data: [] })
        }
      }
      userDetails = await Admin.aggregate(
        [
          { $match: match },
          {
            $project: {
              name: 1
            }
          }
        ]
      )
      if (!userDetails.length) {
        return res.status(404).json({ status: 404, message: "Data Not Found", data: [] })
      }
      return res.status(200).json({ status: 200, message: "Data Found Successfully !", data: [], data: userDetails })
    } catch (err) {
      console.log(err);
    }
  },
}