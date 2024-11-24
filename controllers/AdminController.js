require('dotenv').config();
const adminmodel = require('../models/Admin');
const location_model = require('../models/Locations');
const line_of_business_model = require('../models/Line_of_business');
const userTypeModels = require("../models/User_type")
const { Motor_permission } = require("../models/managements/moter");
const { Travel_permission } = require("../models/managements/travel");
const { Home_permission } = require("../models/managements/home");
const { Medical_permission } = require("../models/managements/medical");
const { Yacht_permission } = require("../models/managements/yacht");
const { Common_master_permission } = require("../models/managements/common_master");
const { Dashboard_permission } = require("../models/managements/dashboard");
const { Group_Medical_permission } = require("../models/managements/groupmedical");
const UserType = require("../models/User_type");
const md5 = require('md5');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const { sendUserCreatedByStaffEmail } = require('../helper/sendEmail');
const keys = process.env.secretOrKey;
const { sendServerEmail } = require("../helper/sendEmail")
const axios = require('axios');

module.exports = {
    addStaff: async (req, res) => {
        const lob_arr = [];
        let payload = req.body
        let userData = await adminmodel.find({ email: payload.staff_email })
        if (userData.length > 0) {
            return res.status(404).json({ status: 404, message: "Email Id Already Exists", data: {} })
        }
        const lob = payload?.staff_lob.toString();
        const lob1 = lob.split(',');

        for (let j = 0; j < lob1.length; j++) {
            const lob_dt = await line_of_business_model.findOne({ _id: lob1[j] });
            lob_arr.push({ lob_id: lob1[j], lob_name: lob_dt.line_of_business_name });
        }

        const loc_arr = [];
        const loc = payload?.staff_location.toString();
        const loc1 = loc.split(',');

        for (let j = 0; j < loc1.length; j++) {
            const loc_dt = await location_model.findOne({ _id: loc1[j] });
            loc_arr.push({ loc_id: loc1[j], loc_name: loc_dt.location_name });
        }

        const business_type_arr = [];
        const business_type = payload?.staff_business.toString();
        const business_type1 = business_type.split(',');
        for (let j = 0; j < business_type1.length; j++) {
            business_type_arr.push({ type: business_type1[j] });
        }
        let payloadObj = {}
        if (payload.company != "") {
            payloadObj = {
                name: payload?.staff_name,
                email: payload?.staff_email,
                mobile: payload?.staff_mobile,
                usertype: payload?.staff_usertype,
                insurance_company: payload?.company,
                line_of_business: lob_arr,
                location: loc_arr,
                admin_business_type: business_type_arr,
                password: md5(payload?.staff_password)
            }
        } else {
            payloadObj = {
                name: payload?.staff_name,
                email: payload?.staff_email,
                mobile: payload?.staff_mobile,
                usertype: payload?.staff_usertype,
                insurance_company: '',
                line_of_business: lob_arr,
                location: loc_arr,
                admin_business_type: business_type_arr,
                password: md5(payload?.staff_password)
            }
        }

        let admin = new adminmodel(payloadObj);
        let result = await admin.save();
        if (result) {
            res.json({ status: 200, message: 'Staff Added Successfully', data: result });
        } else {
            res.json({ status: 400, message: 'Staff Not Added' });
        }
    },
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = md5(req.body.password);
            const user = await adminmodel.findOne({ email });

            if (!user) {
                return res.json({ status: 404, message: 'Email Not Found' });
            }

            // delete user.password;
            if (password === user.password) {
                if (user.status === 0) {
                    return res.json({ status: 400, message: 'Your Account is Deactivated' });
                }
                else {
                    jwt.sign({ id: user._id }, keys, (err, token) => {
                        if (err) {
                            return res.json({ status: 500, message: 'Error signing the token' });
                        }

                        res.json({
                            status: 200,
                            message: 'Login Successful',
                            token: token,
                            // data: {
                            //     _id : user._id,
                            //     usertype : user.usertype,
                            //     name : user.name,
                            //     email : user.email,
                            //     mobile : user.mobile,
                            //     line_of_business : user.line_of_business,
                            //     location : user.location,
                            //     status : user.status,
                            //     admin_business_type : user.admin_business_type,
                            //     profile_image : user.profile_image,
                            //     assign_staff : user.assign_staff,
                            //     motor_permission : user.motor_permission,
                            //     travel_permission : user.travel_permission,
                            //     home_permission : user.home_permission,
                            //     yacht_permission : user.yacht_permission,
                            //     medical_permission : user.medical_permission,
                            //     master_permission : user.master_permission,
                            //     dashboard_permission : user.dashboard_permission,
                            // }
                            data: user
                        });
                    });
                }
            }
            else {
                res.json({ status: 400, message: 'Invalid Credentials' });
            }
        }
        catch (error) {
            console.error('Login error:', error);
            res.json({ status: 500, message: 'Internal Server Error' });
        }
    },
    updateprofile: async (req, res) => {
        const id = req.body.profile_id;
        const update_profile = await adminmodel.findByIdAndUpdate(id,
            {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                profile_image: req.files.profile_image
            });

        const profile_dt = await adminmodel.findOne({ _id: id });

        if (update_profile) {
            res.json({ status: 200, message: 'Profile Updated Successfully', data: profile_dt });
        }
        else {
            res.json({ status: 400, message: 'Profile Not Updated' });
        }
    },

    changepassword: async (req, res) => {
        const id = req.body.profileid;
        const change_password = await adminmodel.findByIdAndUpdate(id,
            {
                password: md5(req.body.password)
            });

        if (change_password) {
            res.json({ status: 200, message: 'Password Changed Successfully' });
        }
        else {
            res.json({ status: 400, message: 'Password Not Changed' });
        }
    },
    update_user_permission: async (req, res) => {
        try {
            let id = req.params.id;
            let user_type_id
            let payload = {}
            if (!id) {
                return res.status(400).json({ status: 400, message: "Id is Required for Update Permission", data: {} });
            }
            let userData = await adminmodel.findById(id);
            if (!userData) {
                return res.status(404).json({ status: 404, message: "User not found", data: {} });
            }

            if (userData.motor_permission.length || userData.medical_permission.length || userData.home_permission.length || userData.yacht_permission.length || userData.travel_permission.length || userData.master_permission.length || userData.dashboard_permission.length || userData.group_medical_permission.length) {
                userData = await adminmodel.aggregate([
                    {
                        $match: { _id: userData._id }
                    },
                    {
                        $project: {
                            motor_permission: 1,
                            medical_permission: 1,
                            home_permission: 1,
                            yacht_permission: 1,
                            travel_permission: 1,
                            master_permission: 1,
                            dashboard_permission: 1,
                            group_medical_permission: 1,

                            _id: 0
                        }
                    },
                ]);
                return res.status(200).json({ status: 200, message: "Permission Already Updated", data: userData });
            }
            user_type_id = userData.usertype
            let allPermission = await Promise.all([
                await Motor_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        },

                    },
                    {
                        $project:
                        {
                            _id: 0,
                            __v: 0,
                            user_type_id: 0
                        }
                    }
                ]),
                await Travel_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        },

                    },
                    {
                        $project:
                        {
                            _id: 0,
                            __v: 0,
                            user_type_id: 0
                        }
                    }
                ]),
                await Home_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        },

                    },
                    {
                        $project:
                        {
                            _id: 0,
                            __v: 0,
                            user_type_id: 0
                        }
                    }
                ]),
                await Medical_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        },

                    },
                    {
                        $project:
                        {
                            _id: 0,
                            __v: 0,
                            user_type_id: 0
                        }
                    }
                ]),
                await Yacht_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        },

                    },
                    {
                        $project:
                        {
                            _id: 0,
                            __v: 0,
                            user_type_id: 0
                        }
                    }
                ]),
                await Common_master_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            __v: 0
                        }
                    }
                ]),
                await Dashboard_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            __v: 0
                        }
                    }
                ]),
                await Group_Medical_permission.aggregate([
                    {
                        $match: {
                            user_type_id: user_type_id
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            __v: 0
                        }
                    }
                ]),
            ]);
            userData.line_of_business.map((obj) => {
                if (obj.lob_name == "Motor") {
                    payload["motor_permission"] = allPermission[0];
                }
                if (obj.lob_name == "Travel") {
                    payload["travel_permission"] = allPermission[1];
                }
                if (obj.lob_name == "Home") {
                    payload["home_permission"] = allPermission[2];
                }
                if (obj.lob_name == "Medical") {
                    payload["medical_permission"] = allPermission[3];
                }
                if (obj.lob_name == "Yacht") {
                    payload["yacht_permission"] = allPermission[4];
                }
                if (obj.lob_name == "Group Medical") {
                    payload["group_medical_permission"] = allPermission[7];
                }
            });
            payload["master_permission"] = allPermission[5];
            payload["dashboard_permission"] = allPermission[6];
            userData = await adminmodel.findByIdAndUpdate(id, payload, { new: true });
            userData = await adminmodel.aggregate([
                {
                    $match: { _id: userData._id }
                },
                {
                    $project: {
                        motor_permission: 1,
                        medical_permission: 1,
                        home_permission: 1,
                        yacht_permission: 1,
                        travel_permission: 1,
                        master_permission: 1,
                        dashboard_permission: 1,
                        group_medical_permission: 1,
                    }
                },
            ]);
            return res.status(200).json({ status: 200, message: "Permission Updated Successfully", data: userData });
        }
        catch (err) {
            console.log(err);
        }
    },
    update_user_permission_manually: async (req, res) => {
        try {
            let id = req.params.id;
            let bakendPayload = {};
            let payload = req.body;

            if (!id) {
                return res.status(400).json({ status: 400, message: "Id is Required for Update Permission", data: {} });
            }

            let userData = await adminmodel.findById(id);
            if (!userData) {
                return res.status(404).json({ status: 404, message: "User not found", data: {} });
            }

            let lob = userData.line_of_business;

            for (let i = 0; i < lob.length; i++) {
                if (lob[i].lob_name == "Motor") {
                    if (payload?.Motor?.length > 0);
                    {
                        let motor_permission = userData.motor_permission;
                        if (!motor_permission.length || !motor_permission) {
                            motor_permission = [{}];
                        }
                        let motorPayload = payload.Motor;
                        for (let obj of motorPayload) {
                            if (obj["Make Motor"]?.length > 0) {
                                let make_motor = userData?.motor_permission[0]?.make_motor;
                                if (!make_motor) {
                                    make_motor = [];
                                }
                                for (let obj1 of obj["Make Motor"]) {
                                    if (obj1.value) {
                                        if (make_motor.indexOf(obj1.key) == -1) {
                                            make_motor.push(obj1.key);
                                        }
                                    }
                                    else {
                                        make_motor.splice(make_motor.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["make_motor"] = make_motor;

                            }
                            if (obj["Model Motor"]?.length > 0) {
                                let model_motor = userData?.motor_permission[0]?.model_motor;
                                if (!model_motor) {
                                    model_motor = [];
                                }
                                for (let obj1 of obj["Model Motor"]) {
                                    if (obj1.value) {
                                        if (model_motor.indexOf(obj1.key) == -1) {
                                            model_motor.push(obj1.key);
                                        }
                                    }
                                    else {
                                        model_motor.splice(model_motor.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["model_motor"] = model_motor;
                            }
                            if (obj["Motor Model details"]?.length > 0) {
                                let motor_model_details = userData?.motor_permission[0]?.motor_model_details;
                                if (!motor_model_details) {
                                    motor_model_details = [];
                                }
                                for (let obj1 of obj["Motor Model details"]) {
                                    if (obj1.value) {
                                        if (motor_model_details.indexOf(obj1.key) == -1) {
                                            motor_model_details.push(obj1.key);
                                        }
                                    }
                                    else {
                                        motor_model_details.splice(motor_model_details.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["motor_model_details"] = motor_model_details;
                            }
                            if (obj["Body Type"]?.length > 0) {
                                let body_type = userData?.motor_permission[0]?.body_type;
                                if (!body_type) {
                                    body_type = [];
                                }
                                for (let obj1 of obj["Body Type"]) {
                                    if (obj1.value) {
                                        if (body_type.indexOf(obj1.key) == -1) {
                                            body_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        body_type.splice(body_type.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["body_type"] = body_type;
                            }
                            if (obj["Area Of Registration"]?.length > 0) {
                                let area_of_registration = userData?.motor_permission[0]?.area_of_registration;
                                if (!area_of_registration) {
                                    area_of_registration = [];
                                }
                                for (let obj1 of obj["Area Of Registration"]) {
                                    if (obj1.value) {
                                        if (area_of_registration.indexOf(obj1.key) == -1) {
                                            area_of_registration.push(obj1.key);
                                        }
                                    }
                                    else {
                                        area_of_registration.splice(area_of_registration.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["area_of_registration"] = area_of_registration;
                            }
                            if (obj["Repair Type"]?.length > 0) {
                                let repair_type = userData?.motor_permission[0]?.repair_type;
                                if (!repair_type) {
                                    repair_type = [];
                                }
                                for (let obj1 of obj["Repair Type"]) {
                                    if (obj1.value) {
                                        if (repair_type.indexOf(obj1.key) == -1) {
                                            repair_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        repair_type.splice(repair_type.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["repair_type"] = repair_type;
                            }
                            if (obj["Business Type"]?.length > 0) {
                                let business_type = userData?.motor_permission[0]?.business_type;
                                if (!business_type) {
                                    business_type = [];
                                }
                                for (let obj1 of obj["Business Type"]) {
                                    if (obj1.value) {
                                        if (business_type.indexOf(obj1.key) == -1) {
                                            business_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        business_type.splice(business_type.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["business_type"] = business_type;
                            }
                            if (obj["Motor Plan"]?.length > 0) {
                                let motor_plan = userData?.motor_permission[0]?.motor_plan;
                                if (!motor_plan) {
                                    motor_plan = [];
                                }
                                for (let obj1 of obj["Motor Plan"]) {
                                    if (obj1.value) {
                                        if (motor_plan.indexOf(obj1.key) == -1) {
                                            motor_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        motor_plan.splice(motor_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["motor_plan"] = motor_plan;
                            }
                            if (obj["Motor claim years"]?.length > 0) {
                                let motor_claim_years = userData?.motor_permission[0]?.motor_claim_years;
                                if (!motor_claim_years) {
                                    motor_claim_years = [];
                                }
                                for (let obj1 of obj["Motor claim years"]) {
                                    if (obj1.value) {
                                        if (motor_claim_years.indexOf(obj1.key) == -1) {
                                            motor_claim_years.push(obj1.key);
                                        }
                                    }
                                    else {
                                        motor_claim_years.splice(motor_claim_years.indexOf(obj1.key), 1);
                                    }
                                }
                                motor_permission[0]["motor_claim_years"] = motor_claim_years;
                            }
                        }
                        bakendPayload["motor_permission"] = motor_permission;
                    }
                }

                if (lob[i].lob_name == "Travel") {
                    if (payload?.Travel?.length > 0) {
                        let travel_permission = userData?.travel_permission;
                        if (!travel_permission.length || !travel_permission) {
                            travel_permission = [{}];
                        }
                        let travelPayload = payload.Travel;
                        for (let obj of travelPayload) {
                            if (obj["Travel Insurance For"]?.length > 0) {
                                let travel_insurance_for = userData?.travel_permission[0]?.travel_insurance_for;
                                if (!travel_insurance_for) {
                                    travel_insurance_for = [];
                                }
                                for (let obj1 of obj["Travel Insurance For"]) {
                                    if (obj1.value) {
                                        if (travel_insurance_for.indexOf(obj1.key) == -1) {
                                            travel_insurance_for.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_insurance_for.splice(travel_insurance_for.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_insurance_for"] = travel_insurance_for;

                            }
                            if (obj["Travel Type"]?.length > 0) {
                                let travel_type = userData?.travel_permission[0]?.travel_type;
                                if (!travel_type) {
                                    travel_type = [];
                                }
                                for (let obj1 of obj["Travel Type"]) {
                                    if (obj1.value) {
                                        if (travel_type.indexOf(obj1.key) == -1) {
                                            travel_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_type.splice(travel_type.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_type"] = travel_type;
                            }
                            if (obj["Travel Plan Type"]?.length > 0) {
                                let travel_plan_type = userData?.travel_permission[0]?.travel_plan_type;
                                if (!travel_plan_type) {
                                    travel_plan_type = [];
                                }
                                for (let obj1 of obj["Travel Plan Type"]) {
                                    if (obj1.value) {
                                        if (travel_plan_type.indexOf(obj1.key) == -1) {
                                            travel_plan_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_plan_type.splice(travel_plan_type.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_plan_type"] = travel_plan_type;
                            }
                            if (obj["Travel Region List"]?.length > 0) {
                                let travel_region_list = userData?.travel_permission[0]?.travel_region_list;
                                if (!travel_region_list) {
                                    travel_region_list = [];
                                }
                                for (let obj1 of obj["Travel Region List"]) {
                                    if (obj1.value) {
                                        if (travel_region_list.indexOf(obj1.key) == -1) {
                                            travel_region_list.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_region_list.splice(travel_region_list.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_region_list"] = travel_region_list;
                            }
                            if (obj["Travel Cover Type"]?.length > 0) {
                                let travel_cover_type = userData?.travel_permission[0]?.travel_cover_type;
                                if (!travel_cover_type) {
                                    travel_cover_type = [];
                                }
                                for (let obj1 of obj["Travel Cover Type"]) {
                                    if (obj1.value) {
                                        if (travel_cover_type.indexOf(obj1.key) == -1) {
                                            travel_cover_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_cover_type.splice(travel_cover_type.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_cover_type"] = travel_cover_type;
                            }
                            if (obj["Travel Plan"]?.length > 0) {
                                let travel_plan = userData?.travel_permission[0]?.travel_plan;
                                if (!travel_plan) {
                                    travel_plan = [];
                                }
                                for (let obj1 of obj["Travel Plan"]) {
                                    if (obj1.value) {
                                        if (travel_plan.indexOf(obj1.key) == -1) {
                                            travel_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        travel_plan.splice(travel_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                travel_permission[0]["travel_plan"] = travel_plan;
                            }
                        }
                        bakendPayload["travel_permission"] = travel_permission;
                    }
                }

                if (lob[i].lob_name == "Home") {
                    if (payload?.Home?.length > 0) {
                        let home_permission = userData.home_permission;
                        if (!home_permission.length || !home_permission) {
                            home_permission = [{}];
                        }
                        let homePayload = payload.Home;
                        for (let obj of homePayload) {
                            if (obj["Property Type"]?.length > 0) {
                                let property_type = userData?.home_permission[0]?.property_type;
                                if (!property_type) {
                                    property_type = [];
                                }
                                for (let obj1 of obj["Property Type"]) {
                                    if (obj1.value) {
                                        if (property_type.indexOf(obj1.key) == -1) {
                                            property_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        property_type.splice(property_type.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["property_type"] = property_type;
                            }
                            if (obj["Home Plan Type"]?.length > 0) {
                                let home_plan_type = userData?.home_permission[0]?.home_plan_type;
                                if (!home_plan_type) {
                                    home_plan_type = [];
                                }
                                for (let obj1 of obj["Home Plan Type"]) {
                                    if (obj1.value) {
                                        if (home_plan_type.indexOf(obj1.key) == -1) {
                                            home_plan_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        home_plan_type.splice(home_plan_type.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["home_plan_type"] = home_plan_type;
                            }
                            if (obj["Home Ownership Type"]?.length > 0) {
                                let home_ownership_type = userData?.home_permission[0]?.home_ownership_type;
                                if (!home_ownership_type) {
                                    home_ownership_type = [];
                                }
                                for (let obj1 of obj["Home Ownership Type"]) {
                                    if (obj1.value) {
                                        if (home_ownership_type.indexOf(obj1.key) == -1) {
                                            home_ownership_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        home_ownership_type.splice(home_ownership_type.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["home_ownership_type"] = home_ownership_type;
                            }
                            if (obj["Home Condition"]?.length > 0) {
                                let home_condition = userData?.home_permission[0]?.home_condition;
                                if (!home_condition) {
                                    home_condition = [];
                                }
                                for (let obj1 of obj["Home Condition"]) {
                                    if (obj1.value) {
                                        if (home_condition.indexOf(obj1.key) == -1) {
                                            home_condition.push(obj1.key);
                                        }
                                    }
                                    else {
                                        home_condition.splice(home_condition.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["home_condition"] = home_condition;
                            }
                            if (obj["Additional Home Condition"]?.length > 0) {
                                let additional_home_condition = userData?.home_permission[0]?.additional_home_condition;
                                if (!additional_home_condition) {
                                    additional_home_condition = [];
                                }
                                for (let obj1 of obj["Additional Home Condition"]) {
                                    if (obj1.value) {
                                        if (additional_home_condition.indexOf(obj1.key) == -1) {
                                            additional_home_condition.push(obj1.key);
                                        }
                                    }
                                    else {
                                        additional_home_condition.splice(additional_home_condition.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["additional_home_condition"] = additional_home_condition;
                            }
                            if (obj["Home Plan"]?.length > 0) {
                                let home_plan = userData?.home_permission[0]?.home_plan;
                                if (!home_plan) {
                                    home_plan = [];
                                }
                                for (let obj1 of obj["Home Plan"]) {
                                    if (obj1.value) {
                                        if (home_plan.indexOf(obj1.key) == -1) {
                                            home_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        home_plan.splice(home_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                home_permission[0]["home_plan"] = home_plan;
                            }
                        }
                        bakendPayload["home_permission"] = home_permission;
                    }
                }

                if (lob[i].lob_name == "Yacht") {
                    if (payload?.Yacht?.length > 0) {
                        let yacht_permission = userData.yacht_permission;
                        let yachtPayload = payload.Yacht;
                        if (!yacht_permission.length || !yacht_permission) {
                            yacht_permission = [{}];
                        }
                        for (let obj of yachtPayload) {
                            if (obj["Year Code"]?.length > 0) {
                                let year_code = userData?.yacht_permission[0]?.year_code;
                                if (!year_code) {
                                    year_code = [];
                                }
                                for (let obj1 of obj["Year Code"]) {
                                    if (obj1.value) {
                                        if (year_code.indexOf(obj1.key) == -1) {
                                            year_code.push(obj1.key);
                                        }
                                    }
                                    else {
                                        year_code.splice(year_code.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["year_code"] = year_code;
                            }
                            if (obj["Yacht Make"]?.length > 0) {
                                let yacht_make = userData?.yacht_permission[0]?.yacht_make;
                                if (!yacht_make) {
                                    yacht_make = [];
                                }
                                for (let obj1 of obj["Yacht Make"]) {
                                    if (obj1.value) {
                                        if (yacht_make.indexOf(obj1.key) == -1) {
                                            yacht_make.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_make.splice(yacht_make.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_make"] = yacht_make;
                            }
                            if (obj["Yacht Model"]?.length > 0) {
                                let yacht_model = userData?.yacht_permission[0]?.yacht_model;
                                if (!yacht_model) {
                                    yacht_model = [];
                                }
                                for (let obj1 of obj["Yacht Model"]) {
                                    if (obj1.value) {
                                        if (yacht_model.indexOf(obj1.key) == -1) {
                                            yacht_model.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_model.splice(yacht_model.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_model"] = yacht_model;
                            }
                            if (obj["Yacht Engine"]?.length > 0) {
                                let yacht_engine = userData?.yacht_permission[0]?.yacht_engine;
                                if (!yacht_engine) {
                                    yacht_engine = [];
                                }
                                for (let obj1 of obj["Yacht Engine"]) {
                                    if (obj1.value) {
                                        if (yacht_engine.indexOf(obj1.key) == -1) {
                                            yacht_engine.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_engine.splice(yacht_engine.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_engine"] = yacht_engine;
                            }
                            if (obj["Yacht Body Type"]?.length > 0) {
                                let yacht_body_type = userData?.yacht_permission[0]?.yacht_body_type;
                                if (!yacht_body_type) {
                                    yacht_body_type = [];
                                }
                                for (let obj1 of obj["Yacht Body Type"]) {
                                    if (obj1.value) {
                                        if (yacht_body_type.indexOf(obj1.key) == -1) {
                                            yacht_body_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_body_type.splice(yacht_body_type.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_body_type"] = yacht_body_type;
                            }
                            if (obj["Hull Material"]?.length > 0) {
                                let hull_material = userData?.yacht_permission[0]?.hull_material;
                                if (!hull_material) {
                                    hull_material = [];
                                }
                                for (let obj1 of obj["Hull Material"]) {
                                    if (obj1.value) {
                                        if (hull_material.indexOf(obj1.key) == -1) {
                                            hull_material.push(obj1.key);
                                        }
                                    }
                                    else {
                                        hull_material.splice(hull_material.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["hull_material"] = hull_material;
                            }
                            if (obj["Horse Power List"]?.length > 0) {
                                let horse_power_list = userData?.yacht_permission[0]?.horse_power_list;
                                if (!horse_power_list) {
                                    horse_power_list = [];
                                }
                                for (let obj1 of obj["Horse Power List"]) {
                                    if (obj1.value) {
                                        if (horse_power_list.indexOf(obj1.key) == -1) {
                                            horse_power_list.push(obj1.key);
                                        }
                                    }
                                    else {
                                        horse_power_list.splice(horse_power_list.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["horse_power_list"] = horse_power_list;
                            }
                            if (obj["Engine List"]?.length > 0) {
                                let engine_list = userData?.yacht_permission[0]?.engine_list;
                                if (!engine_list) {
                                    engine_list = [];
                                }
                                for (let obj1 of obj["Engine List"]) {
                                    if (obj1.value) {
                                        if (engine_list.indexOf(obj1.key) == -1) {
                                            engine_list.push(obj1.key);
                                        }
                                    }
                                    else {
                                        engine_list.splice(engine_list.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["engine_list"] = engine_list;
                            }
                            if (obj["Speed knots List"]?.length > 0) {
                                let speed_knots_list = userData?.yacht_permission[0]?.speed_knots_list;
                                if (!speed_knots_list) {
                                    speed_knots_list = [];
                                }
                                for (let obj1 of obj["Speed knots List"]) {
                                    if (obj1.value) {
                                        if (speed_knots_list.indexOf(obj1.key) == -1) {
                                            speed_knots_list.push(obj1.key);
                                        }
                                    }
                                    else {
                                        speed_knots_list.splice(speed_knots_list.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["speed_knots_list"] = speed_knots_list;
                            }
                            if (obj["Yacht Condition"]?.length > 0) {
                                let yacht_condition = userData?.yacht_permission[0]?.yacht_condition;
                                if (!yacht_condition) {
                                    yacht_condition = [];
                                }
                                for (let obj1 of obj["Yacht Condition"]) {
                                    if (obj1.value) {
                                        if (yacht_condition.indexOf(obj1.key) == -1) {
                                            yacht_condition.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_condition.splice(yacht_condition.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_condition"] = yacht_condition;
                            }
                            if (obj["Yacht Experience"]?.length > 0) {
                                let yacht_experience = userData?.yacht_permission[0]?.yacht_experience;
                                if (!yacht_experience) {
                                    yacht_experience = [];
                                }
                                for (let obj1 of obj["Yacht Experience"]) {
                                    if (obj1.value) {
                                        if (yacht_experience.indexOf(obj1.key) == -1) {
                                            yacht_experience.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_experience.splice(yacht_experience.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_experience"] = yacht_experience;
                            }
                            if (obj["Yacht Questionnaire"]?.length > 0) {
                                let yacht_questionnaire = userData?.yacht_permission[0]?.yacht_questionnaire;
                                if (!yacht_questionnaire) {
                                    yacht_questionnaire = [];
                                }
                                for (let obj1 of obj["Yacht Questionnaire"]) {
                                    if (obj1.value) {
                                        if (yacht_questionnaire.indexOf(obj1.key) == -1) {
                                            yacht_questionnaire.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_questionnaire.splice(yacht_questionnaire.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_questionnaire"] = yacht_questionnaire;
                            }
                            if (obj["Yacht Plan"]?.length > 0) {
                                let yacht_plan = userData?.yacht_permission[0]?.yacht_plan;
                                if (!yacht_plan) {
                                    yacht_plan = [];
                                }
                                for (let obj1 of obj["Yacht Plan"]) {
                                    if (obj1.value) {
                                        if (yacht_plan.indexOf(obj1.key) == -1) {
                                            yacht_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        yacht_plan.splice(yacht_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["yacht_plan"] = yacht_plan;
                            }
                            if (obj["Boat Breadth"]?.length > 0) {
                                let boat_breadth = userData?.yacht_permission[0]?.boat_breadth;
                                if (!boat_breadth) {
                                    boat_breadth = [];
                                }
                                for (let obj1 of obj["Boat Breadth"]) {
                                    if (obj1.value) {
                                        if (boat_breadth.indexOf(obj1.key) == -1) {
                                            boat_breadth.push(obj1.key);
                                        }
                                    }
                                    else {
                                        boat_breadth.splice(boat_breadth.indexOf(obj1.key), 1);
                                    }
                                }
                                yacht_permission[0]["boat_breadth"] = boat_breadth;
                            }
                        }
                        bakendPayload["yacht_permission"] = yacht_permission;
                    }
                }

                if (lob[i].lob_name == "Medical") {
                    if (payload?.Medical?.length > 0) {
                        let medical_permission = userData.medical_permission;
                        if (!medical_permission.length || !medical_permission) {
                            medical_permission = [{}];
                        }
                        let medicalPayload = payload.Medical;
                        for (let obj of medicalPayload) {
                            if (obj["Plan Type"]?.length > 0) {
                                let plan_type = userData?.medical_permission[0]?.plan_type;
                                if (!plan_type) {
                                    plan_type = [];
                                }
                                for (let obj1 of obj["Plan Type"]) {
                                    if (obj1.value) {
                                        if (plan_type.indexOf(obj1.key) == -1) {
                                            plan_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        plan_type.splice(plan_type.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["plan_type"] = plan_type;
                            }
                            if (obj["Visa Countries"]?.length > 0) {
                                let visa_countries = userData?.medical_permission[0]?.visa_countries;
                                if (!visa_countries) {
                                    visa_countries = [];
                                }
                                for (let obj1 of obj["Visa Countries"]) {
                                    if (obj1.value) {
                                        if (visa_countries.indexOf(obj1.key) == -1) {
                                            visa_countries.push(obj1.key);
                                        }
                                    }
                                    else {
                                        visa_countries.splice(visa_countries.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["visa_countries"] = visa_countries;
                            }
                            if (obj["Visa Type"]?.length > 0) {
                                let visa_type = userData?.medical_permission[0]?.visa_type;
                                if (!visa_type) {
                                    visa_type = [];
                                }
                                for (let obj1 of obj["Visa Type"]) {
                                    if (obj1.value) {
                                        if (visa_type.indexOf(obj1.key) == -1) {
                                            visa_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        visa_type.splice(visa_type.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["visa_type"] = visa_type;
                            }
                            if (obj["Salary Range"]?.length > 0) {
                                let salary_range = userData?.medical_permission[0]?.salary_range;
                                if (!salary_range) {
                                    salary_range = [];
                                }
                                for (let obj1 of obj["Salary Range"]) {
                                    if (obj1.value) {
                                        if (salary_range.indexOf(obj1.key) == -1) {
                                            salary_range.push(obj1.key);
                                        }
                                    }
                                    else {
                                        salary_range.splice(salary_range.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["salary_range"] = salary_range;
                            }
                            if (obj["Weight Type"]?.length > 0) {
                                let weight_type = userData?.medical_permission[0]?.weight_type;
                                if (!weight_type) {
                                    weight_type = [];
                                }
                                for (let obj1 of obj["Weight Type"]) {
                                    if (obj1.value) {
                                        if (weight_type.indexOf(obj1.key) == -1) {
                                            weight_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        weight_type.splice(weight_type.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["weight_type"] = weight_type;
                            }
                            if (obj["Medical Plan"]?.length > 0) {
                                let medical_plan = userData?.medical_permission[0]?.medical_plan;
                                if (!medical_plan) {
                                    medical_plan = [];
                                }
                                for (let obj1 of obj["Medical Plan"]) {
                                    if (obj1.value) {
                                        if (medical_plan.indexOf(obj1.key) == -1) {
                                            medical_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        medical_plan.splice(medical_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["medical_plan"] = medical_plan;
                            }
                            if (obj["Health Questionnaire"]?.length > 0) {
                                let health_questionnaire = userData?.medical_permission[0]?.health_questionnaire;
                                if (!health_questionnaire) {
                                    health_questionnaire = [];
                                }
                                for (let obj1 of obj["Health Questionnaire"]) {
                                    if (obj1.value) {
                                        if (health_questionnaire.indexOf(obj1.key) == -1) {
                                            health_questionnaire.push(obj1.key);
                                        }
                                    }
                                    else {
                                        health_questionnaire.splice(health_questionnaire.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["health_questionnaire"] = health_questionnaire;
                            }
                            if (obj["Additional Conditions"]?.length > 0) {
                                let additional_conditions = userData?.medical_permission[0]?.additional_conditions;
                                if (!additional_conditions) {
                                    additional_conditions = [];
                                }
                                for (let obj1 of obj["Additional Conditions"]) {
                                    if (obj1.value) {
                                        if (additional_conditions.indexOf(obj1.key) == -1) {
                                            additional_conditions.push(obj1.key);
                                        }
                                    }
                                    else {
                                        additional_conditions.splice(additional_conditions.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["additional_conditions"] = additional_conditions;
                            }
                            if (obj["Co Payments"]?.length > 0) {
                                let co_payments = userData?.medical_permission[0]?.co_payments;
                                if (!co_payments) {
                                    co_payments = [];
                                }
                                for (let obj1 of obj["Co Payments"]) {
                                    if (obj1.value) {
                                        if (co_payments.indexOf(obj1.key) == -1) {
                                            co_payments.push(obj1.key);
                                        }
                                    }
                                    else {
                                        co_payments.splice(co_payments.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["co_payments"] = co_payments;
                            }
                            if (obj["Underwriting Conditions"]?.length > 0) {
                                let underwriting_conditions = userData?.medical_permission[0]?.underwriting_conditions;
                                if (!underwriting_conditions) {
                                    underwriting_conditions = [];
                                }
                                for (let obj1 of obj["Underwriting Conditions"]) {
                                    if (obj1.value) {
                                        if (underwriting_conditions.indexOf(obj1.key) == -1) {
                                            underwriting_conditions.push(obj1.key);
                                        }
                                    }
                                    else {
                                        underwriting_conditions.splice(underwriting_conditions.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["underwriting_conditions"] = underwriting_conditions;
                            }
                            if (obj["Maternity Conditions"]?.length > 0) {
                                let maternity_conditions = userData?.medical_permission[0]?.maternity_conditions;
                                if (!maternity_conditions) {
                                    maternity_conditions = [];
                                }
                                for (let obj1 of obj["Maternity Conditions"]) {
                                    if (obj1.value) {
                                        if (maternity_conditions.indexOf(obj1.key) == -1) {
                                            maternity_conditions.push(obj1.key);
                                        }
                                    }
                                    else {
                                        maternity_conditions.splice(maternity_conditions.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["maternity_conditions"] = maternity_conditions;
                            }
                            if (obj["Declaration"]?.length > 0) {
                                let declaration = userData?.medical_permission[0]?.declaration;
                                if (!declaration) {
                                    declaration = [];
                                }
                                for (let obj1 of obj["Declaration"]) {
                                    if (obj1.value) {
                                        if (declaration.indexOf(obj1.key) == -1) {
                                            declaration.push(obj1.key);
                                        }
                                    }
                                    else {
                                        declaration.splice(declaration.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["declaration"] = declaration;
                            }
                            if (obj["TPA"]?.length > 0) {
                                let tpa = userData?.medical_permission[0]?.tpa;
                                if (!tpa) {
                                    tpa = [];
                                }
                                for (let obj1 of obj["TPA"]) {
                                    if (obj1.value) {
                                        if (tpa.indexOf(obj1.key) == -1) {
                                            tpa.push(obj1.key);
                                        }
                                    }
                                    else {
                                        tpa.splice(tpa.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["tpa"] = tpa;
                            }
                            if (obj["Network"]?.length > 0) {
                                let network = userData?.medical_permission[0]?.network;
                                if (!network) {
                                    network = [];
                                }
                                for (let obj1 of obj["Network"]) {
                                    if (obj1.value) {
                                        if (network.indexOf(obj1.key) == -1) {
                                            network.push(obj1.key);
                                        }
                                    }
                                    else {
                                        network.splice(network.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["network"] = network;
                            }
                            if (obj["Networklist"]?.length > 0) {
                                let networklist = userData?.medical_permission[0]?.networklist;
                                if (!networklist) {
                                    networklist = [];
                                }
                                for (let obj1 of obj["Networklist"]) {
                                    if (obj1.value) {
                                        if (networklist.indexOf(obj1.key) == -1) {
                                            networklist.push(obj1.key);
                                        }
                                    }
                                    else {
                                        networklist.splice(networklist.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["networklist"] = networklist;
                            }
                            if (obj["Medical Labels"]?.length > 0) {
                                let medical_labels = userData?.medical_permission[0]?.medical_labels;
                                if (!medical_labels) {
                                    medical_labels = [];
                                }
                                for (let obj1 of obj["Medical Labels"]) {
                                    if (obj1.value) {
                                        if (medical_labels.indexOf(obj1.key) == -1) {
                                            medical_labels.push(obj1.key);
                                        }
                                    }
                                    else {
                                        medical_labels.splice(medical_labels.indexOf(obj1.key), 1);
                                    }
                                }
                                medical_permission[0]["medical_labels"] = medical_labels;
                            }
                        }
                        bakendPayload["medical_permission"] = medical_permission
                    }
                }

                if (lob[i].lob_name == "Group Medical") {
                    console.log("Group Medical Plan was hitted very strongly>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    console.log("Group Medical payload>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", payload['Group']);
                    console.log("userData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userData);
                    if (payload['Group']?.length > 0) {
                        let group_medical_permission = userData.group_medical_permission;
                        if (!group_medical_permission.length || !group_medical_permission) {
                            group_medical_permission = [{}];
                        }
                        let groupmedicalPayload = payload['Group'];
                        for (let obj of groupmedicalPayload) {
                            if (obj["Group Medical Plan"]?.length > 0) {
                                let group_medical_plan = userData?.group_medical_permission[0]?.group_medical_plan;
                                if (!group_medical_plan) {
                                    group_medical_plan = [];
                                }
                                for (let obj1 of obj["Group Medical Plan"]) {
                                    if (obj1.value) {
                                        if (group_medical_plan.indexOf(obj1.key) == -1) {
                                            group_medical_plan.push(obj1.key);
                                        }
                                    }
                                    else {
                                        group_medical_plan.splice(group_medical_plan.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["group_medical_plan"] = group_medical_plan;
                            }
                            // if(obj["Member Requests"]?.length>0)
                            // {
                            //     let member_requests = userData?.group_medical_permission[0]?.member_requests;
                            //     if(!member_requests)
                            //     {
                            //         member_requests = [];
                            //     }
                            //     for(let obj1 of obj["Member Requests"])
                            //     {
                            //         if(obj1.value)
                            //         {
                            //             if(member_requests.indexOf(obj1.key) == -1)
                            //             {
                            //                 member_requests.push(obj1.key);
                            //             }
                            //         }
                            //         else
                            //         {
                            //             member_requests.splice(member_requests.indexOf(obj1.key),1);
                            //         }
                            //     }
                            //     group_medical_permission[0]["member_requests"] = member_requests;
                            // }
                            // if(obj["Active Member"]?.length>0)
                            // {
                            //     let active_member = userData?.group_medical_permission[0]?.active_member;
                            //     if(!active_member)
                            //     {
                            //         active_member = [];
                            //     }
                            //     for(let obj1 of obj["Active Member"])
                            //     {
                            //         if(obj1.value)
                            //         {
                            //             if(active_member.indexOf(obj1.key) == -1)
                            //             {
                            //                 active_member.push(obj1.key);
                            //             }
                            //         }
                            //         else
                            //         {
                            //             active_member.splice(active_member.indexOf(obj1.key),1);
                            //         }
                            //     }
                            //     group_medical_permission[0]["active_member"] = active_member;
                            // }
                            // if(obj["Deleted Member"]?.length>0)
                            // {
                            //     let deleted_member = userData?.group_medical_permission[0]?.deleted_member;
                            //     if(!deleted_member)
                            //     {
                            //         deleted_member = [];
                            //     }
                            //     for(let obj1 of obj["Deleted Member"])
                            //     {
                            //         if(obj1.value)
                            //         {
                            //             if(deleted_member.indexOf(obj1.key) == -1)
                            //             {
                            //                 deleted_member.push(obj1.key);
                            //             }
                            //         }
                            //         else
                            //         {
                            //             deleted_member.splice(deleted_member.indexOf(obj1.key),1);
                            //         }
                            //     }
                            //     group_medical_permission[0]["deleted_member"] = deleted_member;
                            // }
                            if (obj["Category"]?.length > 0) {
                                let category = userData?.group_medical_permission[0]?.category;
                                if (!category) {
                                    category = [];
                                }
                                for (let obj1 of obj["Category"]) {
                                    if (obj1.value) {
                                        if (category.indexOf(obj1.key) == -1) {
                                            category.push(obj1.key);
                                        }
                                    }
                                    else {
                                        category.splice(category.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["category"] = category;
                            }
                            if (obj["Claim Type"]?.length > 0) {
                                let claim_type = userData?.group_medical_permission[0]?.claim_type;
                                if (!claim_type) {
                                    claim_type = [];
                                }
                                for (let obj1 of obj["Claim Type"]) {
                                    if (obj1.value) {
                                        if (claim_type.indexOf(obj1.key) == -1) {
                                            claim_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        claim_type.splice(claim_type.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["claim_type"] = claim_type;
                            }
                            if (obj["Claim Status"]?.length > 0) {
                                let claim_status = userData?.group_medical_permission[0]?.claim_status;
                                if (!claim_status) {
                                    claim_status = [];
                                }
                                for (let obj1 of obj["Claim Status"]) {
                                    if (obj1.value) {
                                        if (claim_status.indexOf(obj1.key) == -1) {
                                            claim_status.push(obj1.key);
                                        }
                                    }
                                    else {
                                        claim_status.splice(claim_status.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["claim_status"] = claim_status;
                            }
                            if (obj["Claim Descriptions"]?.length > 0) {
                                let claim_descriptions = userData?.group_medical_permission[0]?.claim_descriptions;
                                if (!claim_descriptions) {
                                    claim_descriptions = [];
                                }
                                for (let obj1 of obj["Additional Conditions"]) {
                                    if (obj1.value) {
                                        if (claim_descriptions.indexOf(obj1.key) == -1) {
                                            claim_descriptions.push(obj1.key);
                                        }
                                    }
                                    else {
                                        claim_descriptions.splice(claim_descriptions.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["claim_descriptions"] = claim_descriptions;
                            }
                            if (obj["Claim Request"]?.length > 0) {
                                let claim_request = userData?.group_medical_permission[0]?.claim_request;
                                if (!claim_request) {
                                    claim_request = [];
                                }
                                for (let obj1 of obj["Claim Request"]) {
                                    if (obj1.value) {
                                        if (claim_request.indexOf(obj1.key) == -1) {
                                            claim_request.push(obj1.key);
                                        }
                                    }
                                    else {
                                        claim_request.splice(claim_request.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["claim_request"] = claim_request;
                            }
                            if (obj["Claim Procedure"]?.length > 0) {
                                let claim_procedure = userData?.group_medical_permission[0]?.claim_procedure;
                                if (!claim_procedure) {
                                    claim_procedure = [];
                                }
                                for (let obj1 of obj["Claim Procedure"]) {
                                    if (obj1.value) {
                                        if (claim_procedure.indexOf(obj1.key) == -1) {
                                            claim_procedure.push(obj1.key);
                                        }
                                    }
                                    else {
                                        claim_procedure.splice(claim_procedure.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["claim_procedure"] = claim_procedure;
                            }
                            if (obj["Useful Links"]?.length > 0) {
                                let useful_links = userData?.group_medical_permission[0]?.useful_links;
                                if (!useful_links) {
                                    useful_links = [];
                                }
                                for (let obj1 of obj["Useful Links"]) {
                                    if (obj1.value) {
                                        if (useful_links.indexOf(obj1.key) == -1) {
                                            useful_links.push(obj1.key);
                                        }
                                    }
                                    else {
                                        useful_links.splice(useful_links.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["useful_links"] = useful_links;
                            }
                            if (obj["Tat Days"]?.length > 0) {
                                let tat_days = userData?.group_medical_permission[0]?.tat_days;
                                if (!tat_days) {
                                    tat_days = [];
                                }
                                for (let obj1 of obj["Tat Days"]) {
                                    if (obj1.value) {
                                        if (tat_days.indexOf(obj1.key) == -1) {
                                            tat_days.push(obj1.key);
                                        }
                                    }
                                    else {
                                        tat_days.splice(tat_days.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["tat_days"] = tat_days;
                            }
                            if (obj["Marital Status"]?.length > 0) {
                                let marital_status = userData?.group_medical_permission[0]?.marital_status;
                                if (!marital_status) {
                                    marital_status = [];
                                }
                                for (let obj1 of obj["Marital Status"]) {
                                    if (obj1.value) {
                                        if (marital_status.indexOf(obj1.key) == -1) {
                                            marital_status.push(obj1.key);
                                        }
                                    }
                                    else {
                                        marital_status.splice(marital_status.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["marital_status"] = marital_status;
                            }
                            if (obj["Gender"]?.length > 0) {
                                let gender = userData?.group_medical_permission[0]?.gender;
                                if (!gender) {
                                    gender = [];
                                }
                                for (let obj1 of obj["Gender"]) {
                                    if (obj1.value) {
                                        if (gender.indexOf(obj1.key) == -1) {
                                            gender.push(obj1.key);
                                        }
                                    }
                                    else {
                                        gender.splice(gender.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["gender"] = gender;
                            }
                            if (obj["Relation"]?.length > 0) {
                                let relation = userData?.group_medical_permission[0]?.relation;
                                if (!relation) {
                                    relation = [];
                                }
                                for (let obj1 of obj["Relation"]) {
                                    if (obj1.value) {
                                        if (relation.indexOf(obj1.key) == -1) {
                                            relation.push(obj1.key);
                                        }
                                    }
                                    else {
                                        relation.splice(relation.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["relation"] = relation;
                            }
                            if (obj["Sponsor Type"]?.length > 0) {
                                let sponsor_type = userData?.group_medical_permission[0]?.sponsor_type;
                                if (!sponsor_type) {
                                    sponsor_type = [];
                                }
                                for (let obj1 of obj["Sponsor Type"]) {
                                    if (obj1.value) {
                                        if (sponsor_type.indexOf(obj1.key) == -1) {
                                            sponsor_type.push(obj1.key);
                                        }
                                    }
                                    else {
                                        sponsor_type.splice(sponsor_type.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["sponsor_type"] = sponsor_type;
                            }
                            if (obj["Work Location"]?.length > 0) {
                                let work_location = userData?.group_medical_permission[0]?.work_location;
                                if (!work_location) {
                                    work_location = [];
                                }
                                for (let obj1 of obj["Work Location"]) {
                                    if (obj1.value) {
                                        if (work_location.indexOf(obj1.key) == -1) {
                                            work_location.push(obj1.key);
                                        }
                                    }
                                    else {
                                        work_location.splice(work_location.indexOf(obj1.key), 1);
                                    }
                                }
                                group_medical_permission[0]["work_location"] = work_location;
                            }
                        }
                        bakendPayload["group_medical_permission"] = group_medical_permission
                    }
                }
            }

            if (payload?.Master?.length > 0) {
                let master_permission = userData.master_permission;
                if (!master_permission.length || !master_permission) {
                    master_permission = [{}];
                }
                let masterPayload = payload.Master;
                for (let obj of masterPayload) {
                    if (obj["Line Of Business"]?.length > 0) {
                        let line_of_business = userData?.master_permission[0]?.line_of_business;
                        if (!line_of_business) {
                            line_of_business = [];
                        }
                        for (let obj1 of obj["Line Of Business"]) {
                            if (obj1.value) {
                                if (line_of_business.indexOf(obj1.key) == -1) {
                                    line_of_business.push(obj1.key);
                                }
                            }
                            else {
                                line_of_business.splice(line_of_business.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["line_of_business"] = line_of_business;
                    }
                    if (obj["Location"]?.length > 0) {
                        let location = userData?.master_permission[0]?.location;
                        if (!location) {
                            location = [];
                        }
                        for (let obj1 of obj["Location"]) {
                            if (obj1.value) {
                                if (location.indexOf(obj1.key) == -1) {
                                    location.push(obj1.key);
                                }
                            }
                            else {
                                location.splice(location.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["location"] = location;
                    }
                    if (obj["Plan Category"]?.length > 0) {
                        let plan_category = userData?.master_permission[0]?.plan_category;
                        if (!plan_category) {
                            plan_category = [];
                        }
                        for (let obj1 of obj["Plan Category"]) {
                            if (obj1.value) {
                                if (plan_category.indexOf(obj1.key) == -1) {
                                    plan_category.push(obj1.key);
                                }
                            }
                            else {
                                plan_category.splice(plan_category.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["plan_category"] = plan_category;
                    }
                    if (obj["Nature Of Plan"]?.length > 0) {
                        let nature_of_plan = userData?.master_permission[0]?.nature_of_plan;
                        if (!nature_of_plan) {
                            nature_of_plan = [];
                        }
                        for (let obj1 of obj["Nature Of Plan"]) {
                            if (obj1.value) {
                                if (nature_of_plan.indexOf(obj1.key) == -1) {
                                    nature_of_plan.push(obj1.key);
                                }
                            }
                            else {
                                nature_of_plan.splice(nature_of_plan.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["nature_of_plan"] = nature_of_plan;
                    }
                    if (obj["Nationality"]?.length > 0) {
                        let nationality = userData?.master_permission[0]?.nationality;
                        if (!nationality) {
                            nationality = [];
                        }
                        for (let obj1 of obj["Nationality"]) {
                            if (obj1.value) {
                                if (nationality.indexOf(obj1.key) == -1) {
                                    nationality.push(obj1.key);
                                }
                            }
                            else {
                                nationality.splice(nationality.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["nationality"] = nationality;
                    }
                    if (obj["Standard Cover"]?.length > 0) {
                        let standard_cover = userData?.master_permission[0]?.standard_cover;
                        if (!standard_cover) {
                            standard_cover = [];
                        }
                        for (let obj1 of obj["Standard Cover"]) {
                            if (obj1.value) {
                                if (standard_cover.indexOf(obj1.key) == -1) {
                                    standard_cover.push(obj1.key);
                                }
                            }
                            else {
                                standard_cover.splice(standard_cover.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["standard_cover"] = standard_cover;
                    }
                    if (obj["Additional Cover"]?.length > 0) {
                        let additional_cover = userData?.master_permission[0]?.additional_cover;
                        if (!additional_cover) {
                            additional_cover = [];
                        }
                        for (let obj1 of obj["Additional Cover"]) {
                            if (obj1.value) {
                                if (additional_cover.indexOf(obj1.key) == -1) {
                                    additional_cover.push(obj1.key);
                                }
                            }
                            else {
                                additional_cover.splice(additional_cover.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["additional_cover"] = additional_cover;
                    }
                    if (obj["Usertype"]?.length > 0) {
                        let usertype = userData?.master_permission[0]?.usertype;
                        if (!usertype) {
                            usertype = [];
                        }
                        for (let obj1 of obj["Usertype"]) {
                            if (obj1.value) {
                                if (usertype.indexOf(obj1.key) == -1) {
                                    usertype.push(obj1.key);
                                }
                            }
                            else {
                                usertype.splice(usertype.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["usertype"] = usertype;
                    }
                    if (obj["Policy Type"]?.length > 0) {
                        let policy_type = userData?.master_permission[0]?.policy_type;
                        if (!policy_type) {
                            policy_type = [];
                        }
                        for (let obj1 of obj["Policy Type"]) {
                            if (obj1.value) {
                                if (policy_type.indexOf(obj1.key) == -1) {
                                    policy_type.push(obj1.key);
                                }
                            }
                            else {
                                policy_type.splice(policy_type.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["policy_type"] = policy_type;
                    }
                    if (obj["Lead Status"]?.length > 0) {
                        let lead_status = userData?.master_permission[0]?.lead_status;
                        if (!lead_status) {
                            lead_status = [];
                        }
                        for (let obj1 of obj["Lead Status"]) {
                            if (obj1.value) {
                                if (lead_status.indexOf(obj1.key) == -1) {
                                    lead_status.push(obj1.key);
                                }
                            }
                            else {
                                lead_status.splice(lead_status.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["lead_status"] = lead_status;
                    }
                    if (obj["Staff"]?.length > 0) {
                        let staff = userData?.master_permission[0]?.staff;
                        if (!staff) {
                            staff = [];
                        }
                        for (let obj1 of obj["Staff"]) {
                            if (obj1.value) {
                                if (staff.indexOf(obj1.key) == -1) {
                                    staff.push(obj1.key);
                                }
                            }
                            else {
                                staff.splice(staff.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["staff"] = staff;
                    }
                    if (obj["Business Entity"]?.length > 0) {
                        let business_entity = userData?.master_permission[0]?.business_entity;
                        if (!business_entity) {
                            business_entity = [];
                        }
                        for (let obj1 of obj["Business Entity"]) {
                            if (obj1.value) {
                                if (business_entity.indexOf(obj1.key) == -1) {
                                    business_entity.push(obj1.key);
                                }
                            }
                            else {
                                business_entity.splice(staff.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["business_entity"] = business_entity;
                    }
                    if (obj["Documents"]?.length > 0) {
                        let documents = userData?.master_permission[0]?.documents;
                        if (!documents) {
                            documents = [];
                        }
                        for (let obj1 of obj["Documents"]) {
                            if (obj1.value) {
                                if (documents.indexOf(obj1.key) == -1) {
                                    documents.push(obj1.key);
                                }
                            }
                            else {
                                documents.splice(documents.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["documents"] = documents;
                    }
                    if (obj["Testimonials"]?.length > 0) {
                        let testimonials = userData?.master_permission[0]?.testimonials;
                        if (!testimonials) {
                            testimonials = [];
                        }
                        for (let obj1 of obj["Testimonials"]) {
                            if (obj1.value) {
                                if (testimonials.indexOf(obj1.key) == -1) {
                                    testimonials.push(obj1.key);
                                }
                            }
                            else {
                                testimonials.splice(testimonials.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["testimonials"] = testimonials;
                    }
                    if (obj["Compliance"]?.length > 0) {
                        let compliance = userData?.master_permission[0]?.compliance;
                        if (!compliance) {
                            compliance = [];
                        }
                        for (let obj1 of obj["Compliance"]) {
                            if (obj1.value) {
                                if (compliance.indexOf(obj1.key) == -1) {
                                    compliance.push(obj1.key);
                                }
                            }
                            else {
                                compliance.splice(compliance.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["compliance"] = compliance;
                    }
                    if (obj["Special Offers"]?.length > 0) {
                        let special_offers = userData?.master_permission[0]?.special_offers;
                        if (!special_offers) {
                            special_offers = [];
                        }
                        for (let obj1 of obj["Special Offers"]) {
                            if (obj1.value) {
                                if (special_offers.indexOf(obj1.key) == -1) {
                                    special_offers.push(obj1.key);
                                }
                            }
                            else {
                                special_offers.splice(special_offers.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["special_offers"] = special_offers;
                    }
                    if (obj["Claims"]?.length > 0) {
                        let claims = userData?.master_permission[0]?.claims;
                        if (!claims) {
                            claims = [];
                        }
                        for (let obj1 of obj["Claims"]) {
                            if (obj1.value) {
                                if (claims.indexOf(obj1.key) == -1) {
                                    claims.push(obj1.key);
                                }
                            }
                            else {
                                claims.splice(claims.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["claims"] = claims;
                    }
                    if (obj["Terms Conditions"]?.length > 0) {
                        let terms_conditions = userData?.master_permission[0]?.terms_conditions;
                        if (!terms_conditions) {
                            terms_conditions = [];
                        }
                        for (let obj1 of obj["Terms Conditions"]) {
                            if (obj1.value) {
                                if (terms_conditions.indexOf(obj1.key) == -1) {
                                    terms_conditions.push(obj1.key);
                                }
                            }
                            else {
                                terms_conditions.splice(terms_conditions.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["terms_conditions"] = terms_conditions;
                    }
                    if (obj["Social Media Link"]?.length > 0) {
                        let social_media_link = userData?.master_permission[0]?.social_media_link;
                        if (!social_media_link) {
                            social_media_link = [];
                        }
                        for (let obj1 of obj["Social Media Link"]) {
                            if (obj1.value) {
                                if (social_media_link.indexOf(obj1.key) == -1) {
                                    social_media_link.push(obj1.key);
                                }
                            }
                            else {
                                social_media_link.splice(social_media_link.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["social_media_link"] = social_media_link;
                    }
                    if (obj["Motor Claim Question"]?.length > 0) {
                        let motor_claim_question = userData?.master_permission[0]?.motor_claim_question;
                        if (!motor_claim_question) {
                            motor_claim_question = [];
                        }
                        for (let obj1 of obj["Motor Claim Question"]) {
                            if (obj1.value) {
                                if (motor_claim_question.indexOf(obj1.key) == -1) {
                                    motor_claim_question.push(obj1.key);
                                }
                            }
                            else {
                                motor_claim_question.splice(motor_claim_question.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["motor_claim_question"] = motor_claim_question;
                    }
                    if (obj["Bank Details"]?.length > 0) {
                        let bank_details = userData?.master_permission[0]?.bank_details;
                        if (!bank_details) {
                            bank_details = [];
                        }
                        for (let obj1 of obj["Bank Details"]) {
                            if (obj1.value) {
                                if (bank_details.indexOf(obj1.key) == -1) {
                                    bank_details.push(obj1.key);
                                }
                            }
                            else {
                                bank_details.splice(bank_details.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["bank_details"] = bank_details;
                    }
                    if (obj["Emergency Departments"]?.length > 0) {
                        let emergency_departments = userData?.master_permission[0]?.emergency_departments;
                        if (!emergency_departments) {
                            emergency_departments = [];
                        }
                        for (let obj1 of obj["Emergency Departments"]) {
                            if (obj1.value) {
                                if (emergency_departments.indexOf(obj1.key) == -1) {
                                    emergency_departments.push(obj1.key);
                                }
                            }
                            else {
                                emergency_departments.splice(emergency_departments.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["emergency_departments"] = emergency_departments;
                    }
                    if (obj["Guidelines"]?.length > 0) {
                        let guidelines = userData?.master_permission[0]?.guidelines;
                        if (!guidelines) {
                            guidelines = [];
                        }
                        for (let obj1 of obj["Guidelines"]) {
                            if (obj1.value) {
                                if (guidelines.indexOf(obj1.key) == -1) {
                                    guidelines.push(obj1.key);
                                }
                            }
                            else {
                                guidelines.splice(guidelines.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["guidelines"] = guidelines;
                    }
                    if (obj["Banner Image"]?.length > 0) {
                        let banner_image = userData?.master_permission[0]?.banner_image;
                        if (!banner_image) {
                            banner_image = [];
                        }
                        for (let obj1 of obj["Banner Image"]) {
                            if (obj1.value) {
                                if (banner_image.indexOf(obj1.key) == -1) {
                                    banner_image.push(obj1.key);
                                }
                            }
                            else {
                                banner_image.splice(banner_image.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["banner_image"] = banner_image;
                    }
                    if (obj["BE Commission"]?.length > 0) {
                        let be_commission = userData?.master_permission[0]?.be_commission;
                        if (!be_commission) {
                            be_commission = [];
                        }
                        for (let obj1 of obj["BE Commission"]) {
                            if (obj1.value) {
                                if (be_commission.indexOf(obj1.key) == -1) {
                                    be_commission.push(obj1.key);
                                }
                            }
                            else {
                                be_commission.splice(be_commission.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["be_commission"] = be_commission;
                    }
                    if (obj["AM Rating"]?.length > 0) {
                        let am_rating = userData?.master_permission[0]?.am_rating;
                        if (!am_rating) {
                            am_rating = [];
                        }
                        for (let obj1 of obj["AM Rating"]) {
                            if (obj1.value) {
                                if (am_rating.indexOf(obj1.key) == -1) {
                                    am_rating.push(obj1.key);
                                }
                            }
                            else {
                                am_rating.splice(am_rating.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["am_rating"] = am_rating;
                    }
                    if (obj["SP Rating"]?.length > 0) {
                        let sp_rating = userData?.master_permission[0]?.sp_rating;
                        if (!sp_rating) {
                            sp_rating = [];
                        }
                        for (let obj1 of obj["SP Rating"]) {
                            if (obj1.value) {
                                if (sp_rating.indexOf(obj1.key) == -1) {
                                    sp_rating.push(obj1.key);
                                }
                            }
                            else {
                                sp_rating.splice(sp_rating.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["sp_rating"] = sp_rating;
                    }
                    if (obj["Vat"]?.length > 0) {
                        let vat = userData?.master_permission[0]?.vat;
                        if (!vat) {
                            vat = [];
                        }
                        for (let obj1 of obj["Vat"]) {
                            if (obj1.value) {
                                if (vat.indexOf(obj1.key) == -1) {
                                    vat.push(obj1.key);
                                }
                            }
                            else {
                                vat.splice(vat.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["vat"] = vat;
                    }
                    if (obj["BE Discount"]?.length > 0) {
                        let be_discount = userData?.master_permission[0]?.be_discount;
                        if (!be_discount) {
                            be_discount = [];
                        }
                        for (let obj1 of obj["BE Discount"]) {
                            if (obj1.value) {
                                if (be_discount.indexOf(obj1.key) == -1) {
                                    be_discount.push(obj1.key);
                                }
                            }
                            else {
                                be_discount.splice(be_discount.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["be_discount"] = be_discount;
                    }
                    if (obj["Discount Coupon"]?.length > 0) {
                        let discount_coupon = userData?.master_permission[0]?.discount_coupon;
                        if (!discount_coupon) {
                            discount_coupon = [];
                        }
                        for (let obj1 of obj["Discount Coupon"]) {
                            if (obj1.value) {
                                if (discount_coupon.indexOf(obj1.key) == -1) {
                                    discount_coupon.push(obj1.key);
                                }
                            }
                            else {
                                discount_coupon.splice(discount_coupon.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["discount_coupon"] = discount_coupon;
                    }
                    if (obj["Best Plan"]?.length > 0) {
                        let best_plan = userData?.master_permission[0]?.best_plan;
                        if (!best_plan) {
                            best_plan = [];
                        }
                        for (let obj1 of obj["Best Plan"]) {
                            if (obj1.value) {
                                if (best_plan.indexOf(obj1.key) == -1) {
                                    best_plan.push(obj1.key);
                                }
                            }
                            else {
                                best_plan.splice(best_plan.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["best_plan"] = best_plan;
                    }
                    if (obj["Reason Type"]?.length > 0) {
                        let reason_type = userData?.master_permission[0]?.reason_type;
                        if (!reason_type) {
                            reason_type = [];
                        }
                        for (let obj1 of obj["Reason Type"]) {
                            if (obj1.value) {
                                if (reason_type.indexOf(obj1.key) == -1) {
                                    reason_type.push(obj1.key);
                                }
                            }
                            else {
                                reason_type.splice(reason_type.indexOf(obj1.key), 1);
                            }
                        }
                        master_permission[0]["reason_type"] = reason_type;
                    }
                }
                bakendPayload["master_permission"] = master_permission
            }

            if (payload?.Dashboard?.length > 0) {
                let dashboard_permission = userData.dashboard_permission;
                if (!dashboard_permission.length || !dashboard_permission) {
                    dashboard_permission = [{}];
                }
                let dashboardPayload = payload.Dashboard;
                for (let obj of dashboardPayload) {
                    if (obj["CEO Dashboard"]?.length > 0) {
                        let ceo_dashboard = userData?.dashboard_permission[0]?.ceo_dashboard;
                        if (!ceo_dashboard) {
                            ceo_dashboard = [];
                        }
                        for (let obj1 of obj["CEO Dashboard"]) {
                            if (obj1.value) {
                                if (ceo_dashboard.indexOf(obj1.key) == -1) {
                                    ceo_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                ceo_dashboard.splice(ceo_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["ceo_dashboard"] = ceo_dashboard;
                    }
                    if (obj["Admin Dashboard"]?.length > 0) {
                        let admin_dashboard = userData?.dashboard_permission[0]?.admin_dashboard;
                        if (!admin_dashboard) {
                            admin_dashboard = [];
                        }
                        for (let obj1 of obj["Admin Dashboard"]) {
                            if (obj1.value) {
                                if (admin_dashboard.indexOf(obj1.key) == -1) {
                                    admin_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                admin_dashboard.splice(admin_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["admin_dashboard"] = admin_dashboard;
                    }
                    if (obj["Supervisor Dashboard"]?.length > 0) {
                        let supervisor_dashboard = userData?.dashboard_permission[0]?.supervisor_dashboard;
                        if (!supervisor_dashboard) {
                            supervisor_dashboard = [];
                        }
                        for (let obj1 of obj["Supervisor Dashboard"]) {
                            if (obj1.value) {
                                if (supervisor_dashboard.indexOf(obj1.key) == -1) {
                                    supervisor_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                supervisor_dashboard.splice(supervisor_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["supervisor_dashboard"] = supervisor_dashboard;
                    }
                    if (obj["Operations Dashboard"]?.length > 0) {
                        let operations_dashboard = userData?.dashboard_permission[0]?.operations_dashboard;
                        if (!operations_dashboard) {
                            operations_dashboard = [];
                        }
                        for (let obj1 of obj["Operations Dashboard"]) {
                            if (obj1.value) {
                                if (operations_dashboard.indexOf(obj1.key) == -1) {
                                    operations_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                operations_dashboard.splice(operations_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["operations_dashboard"] = operations_dashboard;
                    }
                    if (obj["SA Dashboard"]?.length > 0) {
                        let sa_dashboard = userData?.dashboard_permission[0]?.sa_dashboard;
                        if (!sa_dashboard) {
                            sa_dashboard = [];
                        }
                        for (let obj1 of obj["SA Dashboard"]) {
                            if (obj1.value) {
                                if (sa_dashboard.indexOf(obj1.key) == -1) {
                                    sa_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                sa_dashboard.splice(sa_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["sa_dashboard"] = sa_dashboard;
                    }
                    if (obj["DC Dashboard"]?.length > 0) {
                        let dc_dashboard = userData?.dashboard_permission[0]?.dc_dashboard;
                        if (!dc_dashboard) {
                            dc_dashboard = [];
                        }
                        for (let obj1 of obj["DC Dashboard"]) {
                            if (obj1.value) {
                                if (dc_dashboard.indexOf(obj1.key) == -1) {
                                    dc_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                dc_dashboard.splice(dc_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["dc_dashboard"] = dc_dashboard;
                    }
                    if (obj["Policy Issuer Dashboard"]?.length > 0) {
                        let policy_issuer_dashboard = userData?.dashboard_permission[0]?.policy_issuer_dashboard;
                        if (!policy_issuer_dashboard) {
                            policy_issuer_dashboard = [];
                        }
                        for (let obj1 of obj["Policy Issuer Dashboard"]) {
                            if (obj1.value) {
                                if (policy_issuer_dashboard.indexOf(obj1.key) == -1) {
                                    policy_issuer_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                policy_issuer_dashboard.splice(policy_issuer_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["policy_issuer_dashboard"] = policy_issuer_dashboard;
                    }
                    if (obj["Insurance Company"]?.length > 0) {
                        let insurance_company = userData?.dashboard_permission[0]?.insurance_company;
                        if (!insurance_company) {
                            insurance_company = [];
                        }
                        for (let obj1 of obj["Insurance Company"]) {
                            if (obj1.value) {
                                if (insurance_company.indexOf(obj1.key) == -1) {
                                    insurance_company.push(obj1.key);
                                }
                            }
                            else {
                                insurance_company.splice(insurance_company.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["insurance_company"] = insurance_company;
                    }
                    if (obj["Advertise With Us"]?.length > 0) {
                        let advertise_with_us = userData?.dashboard_permission[0]?.advertise_with_us;
                        if (!advertise_with_us) {
                            advertise_with_us = [];
                        }
                        for (let obj1 of obj["Advertise With Us"]) {
                            if (obj1.value) {
                                if (advertise_with_us.indexOf(obj1.key) == -1) {
                                    advertise_with_us.push(obj1.key);
                                }
                            }
                            else {
                                advertise_with_us.splice(advertise_with_us.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["advertise_with_us"] = advertise_with_us;
                    }
                    if (obj["Newsletter"]?.length > 0) {
                        let newsletter = userData?.dashboard_permission[0]?.newsletter;
                        if (!newsletter) {
                            newsletter = [];
                        }
                        for (let obj1 of obj["Newsletter"]) {
                            if (obj1.value) {
                                if (newsletter.indexOf(obj1.key) == -1) {
                                    newsletter.push(obj1.key);
                                }
                            }
                            else {
                                newsletter.splice(newsletter.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["newsletter"] = newsletter;
                    }
                    if (obj["Complaint"]?.length > 0) {
                        let complaint = userData?.dashboard_permission[0]?.complaint;
                        if (!complaint) {
                            complaint = [];
                        }
                        for (let obj1 of obj["Complaint"]) {
                            if (obj1.value) {
                                if (complaint.indexOf(obj1.key) == -1) {
                                    complaint.push(obj1.key);
                                }
                            }
                            else {
                                complaint.splice(complaint.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["complaint"] = complaint;
                    }

                    if (obj["BE Dashboard"]?.length > 0) {
                        let be_dashboard = userData?.dashboard_permission[0]?.be_dashboard;
                        if (!be_dashboard) {
                            be_dashboard = [];
                        }
                        for (let obj1 of obj["BE Dashboard"]) {
                            if (obj1.value) {
                                if (be_dashboard.indexOf(obj1.key) == -1) {
                                    be_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                be_dashboard.splice(be_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["be_dashboard"] = be_dashboard;
                    }

                    if (obj["Leads"]?.length > 0) {
                        let leads = userData?.dashboard_permission[0]?.leads;
                        if (!leads) {
                            leads = [];
                        }
                        for (let obj1 of obj["Leads"]) {
                            if (obj1.value) {
                                if (leads.indexOf(obj1.key) == -1) {
                                    leads.push(obj1.key);
                                }
                            }
                            else {
                                leads.splice(leads.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["leads"] = leads;
                    }

                    if (obj["Chats"]?.length > 0) {
                        let chats = userData?.dashboard_permission[0]?.chats;
                        if (!chats) {
                            chats = [];
                        }
                        for (let obj1 of obj["Chats"]) {
                            if (obj1.value) {
                                if (chats.indexOf(obj1.key) == -1) {
                                    chats.push(obj1.key);
                                }
                            }
                            else {
                                chats.splice(chats.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["chats"] = chats;
                    }

                    if (obj["Insurance Company Dashboard"]?.length > 0) {
                        let insurance_company_dashboard = userData?.dashboard_permission[0]?.insurance_company_dashboard;
                        if (!insurance_company_dashboard) {
                            insurance_company_dashboard = [];
                        }
                        for (let obj1 of obj["Insurance Company Dashboard"]) {
                            if (obj1.value) {
                                if (insurance_company_dashboard.indexOf(obj1.key) == -1) {
                                    insurance_company_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                insurance_company_dashboard.splice(insurance_company_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["insurance_company_dashboard"] = insurance_company_dashboard;
                    }

                    if (obj["Producer Dashboard"]?.length > 0) {
                        let producer_dashboard = userData?.dashboard_permission[0]?.producer_dashboard;
                        if (!producer_dashboard) {
                            producer_dashboard = [];
                        }
                        for (let obj1 of obj["Producer Dashboard"]) {
                            if (obj1.value) {
                                if (producer_dashboard.indexOf(obj1.key) == -1) {
                                    producer_dashboard.push(obj1.key);
                                }
                            }
                            else {
                                producer_dashboard.splice(producer_dashboard.indexOf(obj1.key), 1);
                            }
                        }
                        dashboard_permission[0]["producer_dashboard"] = producer_dashboard;
                    }




                }
                bakendPayload["dashboard_permission"] = dashboard_permission;
            }

            userData = await adminmodel.findByIdAndUpdate(id, bakendPayload, { new: true });
            return res.status(200).json({ status: 200, "message": "Permission Update Successefully", data: userData });
        }
        catch (err) {
            console.log(err);
        }
    },

    get_staff_details: async (req, res) => {
        try {
            let id = req.params.id;
            let user = await adminmodel.findById(id);
            return res.status(200).json({
                status: 200,
                "message": "Data Found",
                data: {
                    _id: user._id,
                    usertype: user.usertype,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    line_of_business: user.line_of_business,
                    location: user.location,
                    status: user.status,
                    admin_business_type: user.admin_business_type,
                    profile_image: user.profile_image,
                    assign_staff: user.assign_staff,
                    motor_permission: user.motor_permission,
                    travel_permission: user.travel_permission,
                    home_permission: user.home_permission,
                    yacht_permission: user.yacht_permission,
                    medical_permission: user.medical_permission,
                    master_permission: user.master_permission,
                    dashboard_permission: user.dashboard_permission,
                    group_medical_permission: user.group_medical_permission,
                    insurance_company: user.insurance_company ? user.insurance_company : ''
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    getAssignAgentByUserType: async (req, res) => {
        try {
            let payload = req.body
            let userDetails
            let match = {}
            if (!payload.userType) {
                userDetails = await userTypeModels([
                    {
                        $match: {
                            usertype_status: 1
                        }
                    },
                    {
                        $project: {
                            usertype: 1
                        }
                    }
                ])
            } else {
                userDetails = await userTypeModels([
                    {
                        $match: {
                            usertype_status: 1
                        }
                    },
                    {
                        $lookup: {
                            from: "admins",
                            localField: "_id",
                            foreignField: "usertype",
                            as: "userDetails"
                        }
                    }
                ])
            }
            if (!userDetails.length) {
                return res.status(404).json({ status: 4004, message: "data not found", data: [] })
            }
            return res.status(200).json({ status: 4004, message: "data found Successfully !", data: userDetails })
        } catch (err) {
            console.log(err);
        }
    },
    getAllPolicyIssuer: async (req, res) => {
        try {
            let userDetails
            let match = {}
            let query = req.query
            if (query.userType === "policyIsuser") {
                match["usertype"] = mongoose.Types.ObjectId("64622526b201a6f07b2dff3e")
            }
            else if (query.userType === "saleAdvisor") {
                match["usertype"] = mongoose.Types.ObjectId("646224eab201a6f07b2dff36")
            }
            else if (query.userType === "dacumentsChaser") {
                match["usertype"] = mongoose.Types.ObjectId("6462250eb201a6f07b2dff3a")
            }
            console.log({ match })
            userDetails = await adminmodel.aggregate([
                {
                    $match: match
                },
                {
                    $project: {
                        name: 1
                    }
                }
            ])
            if (!userDetails?.length) {
                return res.status(404).json({ status: 4004, message: "data not found", data: [] })
            }
            return res.status(200).json({ status: 4004, message: "data found Successfully !", data: userDetails })
        } catch (err) {
            console.log(err);
        }
    },
    getUsertypeDetailsByid: async (req, res) => {
        const { usertype } = req.query
        if (usertype) {
            let data = await userTypeModels.findById(usertype)
            if (data) {

                return res.status(400).json({
                    message: "",
                    data,
                });
            } else {
                return res.status(404).json({
                    message: "Usertype not found",
                });
            }
        } else {
            return res.status(400).json({
                message: "",
            })
        }
    },
    request_for_user_creation: async (req, res) => {
        try {
            let data = req.body;
            if (!data) {
                return res.status(400).json({
                    status: 400,
                    message: "Please fill credentials",
                });
            }

            // check staff
            let staffId = jwt.verify(req?.headers?.authorization?.split(" ")[1], keys)?.id

            let checkIfStaffExists = await adminmodel.findById(staffId)
            if (!checkIfStaffExists) {
                return res.status(400).json({
                    status: 400,
                    message: "Staff doesn't exsits!",
                });
            }

            // check user
            let checkIfUserExists = await adminmodel.findOne({
                email: data.email
            })
            if (checkIfUserExists) {
                return res.status(400).json({
                    status: 400,
                    message: "User already exists!",
                });
            }

            // add agent approval status & status to be false
            data.agentApprovalStatus = false
            data.status = 0;

            // Copy properties from staff except name, email, date_of_birth, mobile, agentApprovalStatus, status
            const {
                usertype, location, admin_business_type, profile_image,
                assignSalesAdvisor, assignPolicyIssuer, assignDacumentChaser,
                motor_permission, travel_permission, home_permission, yacht_permission,
                medical_permission, master_permission, dashboard_permission,
                group_medical_permission, description, hrId, groupMedicalPlanId,
                insurance_company, employeeNumber
            } = checkIfStaffExists;

            // Assign the copied properties to the new user object
            const newUser = {
                ...data,
                usertype, location, admin_business_type, profile_image,
                assignSalesAdvisor, assignPolicyIssuer, assignDacumentChaser,
                motor_permission, travel_permission, home_permission, yacht_permission,
                medical_permission, master_permission, dashboard_permission,
                group_medical_permission, description, hrId, groupMedicalPlanId,
                insurance_company, employeeNumber, password: md5("lmp@123"),
                tempStaffId: staffId, line_of_business: data.line_of_business,
            };

            // Create new user in the database
            const createdUser = await adminmodel.create(newUser);
            if (!createdUser) {
                return res.status(400).json({
                    status: 400,
                    message: "User not created!",
                });
            }

            res.status(201).json({
                status: 201,
                message: "User created successfully",
                data: createdUser
            });

        } catch (error) {
            res.json({ status: 400, message: 'Staff Not Added' });
        }
    },
    get_request_for_user_creation: async (req, res) => {
        try {
            let { page, limit } = req.query;

            const pageOptions = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };

            // get all pending users
            const results = await adminmodel.aggregate([
                {
                    $match: {
                        $and: [
                            { agentApprovalStatus: false },
                            { status: 0 }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "insurance_company",
                        foreignField: "_id",
                        as: "insurance_companys"
                    }
                },
                {
                    $facet: {
                        data: [
                            { $skip: (pageOptions.page - 1) * pageOptions.limit },
                            { $limit: pageOptions.limit }
                        ],
                        totalCount: [{ $count: "count" }]
                    }
                }
            ])

            console.log(page, limit)

            // send status
            return res.status(200).json({
                status: 200,
                message: "Data Found",
                data: results[0]?.data || [],
                total: results[0]?.totalCount[0]?.count || 0,
            });

        } catch (error) {
            res.json({ status: 400, message: 'Failed to get user creation!' });
        }
    },
    edit_request_for_user_creation: async (req, res) => {
        try {
            let data = req.body;
            if (!data) {
                return res.status(400).json({
                    status: 400,
                    message: "Please fill credentials",
                });
            }

            // check user
            let checkIfUserExists = await adminmodel.findById(req.params.id)
            if (!checkIfUserExists) {
                return res.status(400).json({
                    status: 400,
                    message: "User doesn't exists!",
                });
            }

            // check staff
            let checkIfStaffExists = await adminmodel.findById(checkIfUserExists.tempStaffId)
            if (!checkIfStaffExists) {
                return res.status(400).json({
                    status: 400,
                    message: "Staff doesn't exsits!",
                });
            }

            // update agent approval status & status to be false
            data.agentApprovalStatus = true
            data.status = 1;
            delete data.tempStaffId

            // update the user
            const updatedUser = await adminmodel.findByIdAndUpdate(req.params.id, data,
                { new: true, runValidators: true }
            )
            if (!updatedUser) {
                return res.status(400).json({
                    status: 400,
                    message: "User not updated!",
                });
            }

            // send mail to the users
            let options = {
                to: updatedUser?.email,
                subject: "User email & password",
                text: `Hello ${updatedUser?.name}, this is your email : ${updatedUser?.email} & password : lmp@123.`,
            };
            sendUserCreatedByStaffEmail(options);

            res.status(200).json({
                status: 200,
                message: "User updated successfully",
                data: updatedUser
            });

        } catch (error) {
            res.json({ status: 400, message: 'Failed to updated user creation!' });
        }
    },
    delete_request_for_user_creation: async (req, res) => {
        try {
            // check user
            let checkIfUserExists = await adminmodel.findById(req.params.id)
            if (!checkIfUserExists) {
                return res.status(400).json({
                    status: 400,
                    message: "User doesn't exists!",
                });
            }

            // check staff
            let checkIfStaffExists = await adminmodel.findById(checkIfUserExists.tempStaffId)
            if (!checkIfStaffExists) {
                return res.status(400).json({
                    status: 400,
                    message: "Staff doesn't exsits!",
                });
            }

            // delete the user
            let result = await adminmodel.findByIdAndDelete(req.params.id);
            if (!result) {
                return res.status(400).json({
                    status: 400,
                    message: "Failed to delete user!",
                });
            }

            res.status(200).json({
                status: 200,
                message: "User deleted successfully",
                data: {}
            });

        } catch (error) {
            res.json({ status: 400, message: 'Failed to delete user creation!' });
        }
    },
    getRequestForUserCreatebyid: async (req, res) => {
        try {
            let result = await adminmodel.findById(req.params.id);
            if (!result) {
                return res.status(400).json({
                    status: 400,
                    message: "User doesn't exists!",
                });
            }

            res.status(200).json({
                status: 200,
                message: "User found successfully",
                data: result
            });

        } catch (error) {
            res.json({ status: 400, message: 'Failed to get user creation!' });
        }
    },
    getSubUserTypes: async (req, res) => {
        try {
            const Query = req.query
            let match = {}
            if (Query.usertype == 'Supervisor') {
                match = {
                    $or: [
                        { usertype: 'Sales Advisor' },
                        { usertype: 'Document Chaser' },
                        { usertype: 'Policy Issuer' }
                    ]
                }
            }
            if (Query.usertype == 'Sales Advisor') {
                match = {
                    $or: [
                        { usertype: 'Supervisor' },
                        { usertype: 'Document Chaser' },
                        { usertype: 'Policy Issuer' }
                    ]
                }
            }
            if (Query.usertype == 'Document Chaser') {
                match = {
                    $or: [
                        { usertype: 'Supervisor' },
                        { usertype: 'Sales Advisor' },
                        { usertype: 'Policy Issuer' }
                    ]
                }
            }
            if (Query.usertype == 'Policy Issuer') {
                match = {
                    $or: [
                        { usertype: 'Supervisor' },
                        { usertype: 'Sales Advisor' },
                        { usertype: 'Document Chaser' }
                    ]
                }
            }
            let result = await UserType.aggregate([
                {
                    $match: match
                },
            ]);
            if (!result) {
                return res.status(400).json({
                    status: 400,
                    message: "Data not found!",
                });
            }
            // console.log(result)
            res.status(200).json({
                status: 200,
                message: "Data found successfully",
                data: result
            });
        } catch (error) {
            console.log(error)
        }
    },
    getUserMultiRole: async (req, res) => {
        try {
            const id = req.query.id
            const result = await adminmodel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                    from: "usertypes",
                        localField: "subusertype",
                    foreignField: "_id",
                    as: "subusertypes",
                },
                },
                // {
                //     $unwind: {
                //         path: '$subusertypes'
                //     }
                // },
                {
                    $project: {
                        'subusertypes._id': 1,
                        'subusertypes.usertype':1
                    }
                }
            ])
            console.log(result,">>>>>>>>>>>>>>>>>>>>>>>>>>")
            if (result) {
                
                return res.status(200).json({
                    status: 200,
                    message: 'Data found',
                    data: result
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Data not found!",
                    data: []
                });
            }
            
            
        } catch (error) {
        console.log(error)}
    },
    updateSubUserTypes: async (req, res) => {
        try { 
            const reqBody = req.body
            const maindata = reqBody.userTypeData
            const userTypeData = reqBody.userTypeData?.map((item)=>mongoose.Types.ObjectId(item._id))
            
            const userData = await adminmodel.findByIdAndUpdate(reqBody.id, {
                subusertype: userTypeData
            })
            if (userData) {
                const usrtypeStr = maindata?.map((itm) => itm.usertype).join(",")
                let SAData = userData?.assignSalesAdvisor ? userData?.assignSalesAdvisor :[]
                let DCData = userData?.assignDacumentChaser ? userData?.assignDacumentChaser : []
                let PIData = userData?.assignPolicyIssuer ? userData?.assignPolicyIssuer : []
                
                
                //Sales Advisor
                // console.log(SAData.includes(reqBody.id),'asfsf find')
                if (usrtypeStr?.includes('Sales Advisor') && (SAData?.includes(reqBody.id)==false)) {
                    SAData.push(reqBody.id)
                    // console.log(SAData,"sa dataaaaaaaaaaaaaaa")
                }
                if ((SAData?.length && SAData?.includes(reqBody.id) == true) && !usrtypeStr?.includes('Sales Advisor')) {
                    let indx = SAData?.indexOf(reqBody.id)
                        SAData = SAData?.splice(indx,1)
                }
                //Document Chaser
                if (usrtypeStr?.includes('Document Chaser') && !DCData?.includes(reqBody.id)) {
                    DCData.push(reqBody.id)
                }
                if ((DCData?.length && DCData?.includes(reqBody.id))&& !usrtypeStr?.includes('Document Chaser')) {
                    let indx = DCData?.indexOf(reqBody.id)
                    DCData = DCData?.splice(indx, 1)
                }
                //Policy Issuer
                if (usrtypeStr?.includes('Policy Issuer') && !PIData?.includes(reqBody.id)) {
                    PIData.push(reqBody.id)
                }
                if ((PIData?.length && PIData?.includes(reqBody.id)) && !usrtypeStr?.includes('Policy Issuer')) {
                    let indx = PIData?.indexOf(reqBody.id)
                    PIData = PIData?.splice(indx, 1)
                }
                
                let payload = {
                    assignSalesAdvisor: SAData?.length ? SAData?.map((itm) => mongoose.Types.ObjectId(itm)):[],
                    assignDacumentChaser: DCData?.length ? DCData?.map((itm) => mongoose.Types.ObjectId(itm)):[],
                    assignPolicyIssuer: PIData?.length ? PIData?.map((itm) => mongoose.Types.ObjectId(itm)):[]
                }
                const assignedupdated = await adminmodel.findByIdAndUpdate(reqBody.id, payload)
                if (!assignedupdated) {
                    return res.status(400).json({
                        status: 400,
                        message: "User was not  updated!",
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: "User updated successfully",
                    data: assignedupdated
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    },

    send_otp_email_admin: async (req, res) => {
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
            let customer_data = await adminmodel.findOne({ email: email });
            console.log(customer_data, "customer_data>>>>>>>>>>>>>>>>>>>>>")
            console.log(customer_data.usertype, "customer_data>>>>>>>>>>>>>>>>>>>>>")

            let customer_usertype = await userTypeModels.findById(customer_data.usertype)
            console.log(customer_usertype.usertype, "customer_usertype>>>>>>>>>>>>>>>>>>>>>")

            if (!customer_data) {
                return res
                    .status(404)
                    .json({
                        status: 404,
                        message: "Please Provide Coreect Email ID",
                        data: {},
                    });
            }

            if (customer_usertype?.usertype == 'User') {
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
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let searchquery = 'ADMIN LOGIN OTP'
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

            // return false;

            sendServerEmail(emailPayload);

            await adminmodel.findByIdAndUpdate(customer_data._id, { loginOtp: otp });

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


    verify_otp_admin: async (req, res) => {
        try {
            let email = req.body.email;
            let otp = req.body.otp;
            const user = await adminmodel.findOne({ email });

            if (!user) {
                return res.json({ status: 404, message: 'Email Not Found' });
            }

            if (otp === user.loginOtp) {
                if (user.status === 0) {
                    return res.json({ status: 400, message: 'Your Account is Deactivated' });
                }

                jwt.sign({ id: user._id }, keys, async (err, token) => {
                    if (err) {
                        return res.json({ status: 500, message: 'Error signing the token' });
                    }
                    try {
                        await adminmodel.findByIdAndUpdate(user._id, { loginOtp: '' });
                        res.json({
                            status: 200,
                            message: 'Login Successful',
                            token: token,
                            data: user
                        });
                    } catch (updateError) {
                        res.json({ status: 500, message: 'Error updating OTP' });
                    }
                });
            }
            else {
                res.json({ status: 400, message: 'Invalid Credentials' });
            }

        } catch (err) {
            console.log(err);
        }
    },

}
   