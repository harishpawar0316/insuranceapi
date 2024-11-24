const companyModel = require("../models/Company");
const bankModel = require("../models/Bankdetail");
const apiModel = require("../models/Api_integrated");

const XLSX = require("xlsx");
const fs = require('fs-extra');
const excelToJson = require("convert-excel-to-json");

module.exports = {
    addCompany: async (req, res) => {
        let companies = new companyModel({
            company_name: req.body.company_name,
            company_body: req.body.company_body,
            company_email_id: req.body.company_email_id,
            company_phone_no: req.body.company_phone_no,
            company_address: req.body.company_address,
            company_location: req.body.company_location,
            company_logo: req.files.company_logo,
            company_dha_format: req.files.company_dha_format,
            company_medical_application: req.files.company_medical_application,
            company_salary_declaration: req.files.company_salary_declaration,
            company_kyc_form: req.files.company_kyc_form,
            company_line_of_business_id: req.body.line_of_business_id,
            company_terms_conditions: req.files?.company_terms_condition,
            default_time: req.body.default_time
        });
        let result = await companies.save();
        if (result != null) {
            res.json({ status: 200, message: "Company Added Successfully!", data: result });
        }
        else {
            res.json({ status: 400, message: "Company Not Added Successfully!" });
        }
    },

    getCompany: async (req, res) => {
        try {
        const page = req.query.page;
        const limit = req.query.limit;
            if(page != undefined || limit != undefined){
            const result = await companyModel.find().skip((page - 1) * limit).limit(limit * 1).exec();
            const count = await companyModel.countDocuments();
            res.json({ status: 200, message: "Data Found", data: result, total: count });
        }
        else{
            const result = await companyModel.find({company_status:1}).exec();
            // const count = await companyModel.countDocuments();
            res.json({ status: 200, message: "Data Found", data: result });
        }
        } catch (err) {
            res.send(err)
        }
    },

    update_company_status: async (req, res) => {
        const id = req.params.id;
        const company_status = req.body.company_status;
        const company_data = await companyModel.findByIdAndUpdate(id, {
            company_status: company_status,
        });
        if (company_data != null) {
            if (company_status == 0) {
                res.json({ status: 200, message: "Insurance Company Deactivated Successfully" });
            }
            else {
                res.json({ status: 200, message: "Insurance Company Activated Successfully" });
            }
        }
        else {
            res.json({ status: 400, message: "Nature Of Plan Not Deactivated Successfully" });
        }
    },

    getCompanyDetailsbyid: async (req, res) => {
        const id = req.params.id;
        const company_data = await companyModel.findById(id);
        res.json({ status: 200, message: "Data Found", data: company_data });
    },

    updateCompany: async (req, res) => {
        const id = req.body.company_id;
        const company_data = await companyModel.findByIdAndUpdate(id, {
            company_name: req.body.company_name,
            company_body: req.body.company_body,
            company_email_id: req.body.company_email_id,
            company_phone_no: req.body.company_phone_no,
            company_address: req.body.company_address,
            company_location: req.body.company_location,
            company_logo: req.files.company_logo,
            company_dha_format: req.files.company_dha_format,
            company_medical_application: req.files.company_medical_application,
            company_salary_declaration: req.files.company_salary_declaration,
            company_kyc_form: req.files.company_kyc_form,
            company_line_of_business_id: req.body.line_of_business_id,
            company_terms_conditions: req.files?.company_terms_condition,
            default_time: req.body.default_time
        });
        if (company_data != null) {
            res.json({ status: 200, message: "Company Updated Successfully" });
        }
        else {
            res.json({ status: 400, message: "Company Not Updated Successfully" });
        }
    },

    addBank : async (req, res) => {
        let banks = new bankModel({
            companyid: req.body.company_id,
            bankname: req.body.bank_name,
            accountnumber: req.body.bank_account_number,
            swiftcode: req.body.swift_code,
            ibannumber: req.body.iban_number,
            line_of_business_id: req.body.line_of_business,
        });
        let result = await banks.save();
        if (result != null) {
            res.json({ status: 200, message: "Bank Added Successfully!", data: result });
        }
        else {
            res.json({ status: 400, message: "Bank Not Added Successfully!" });
        }
    },

    getBank: async (req, res) => {
        const id = req.body.company_id;
        const page = req.params.page;
        const limit = req.params.limit;
        try {
            const result = await bankModel.aggregate([
                {
                    $match: {
                        companyid: id
                    }
                },
                {
                    $lookup: {
                        from: "line_of_businesses",
                        localField: "line_of_business_id",
                        foreignField: "_id",
                        as: "line_of_business"
                    }
                },
            ]).limit(limit * 1).skip((page - 1) * limit).exec();
            const count = await bankModel.countDocuments();
            res.json({ status: 200, message: "Data Found", data: result, total: count });
        }
        catch (err) {
            res.send(err)
        }
    },

    getBankDetailsbyid : async (req, res) => {
        const id = req.body.id;
        const bank_data = await bankModel.findById(id);
        if(bank_data != null)
        {
            res.json({ status: 200, message: "Data Found", data: bank_data });
        }
        else
        {
            res.json({ status: 400, message: "Data Not Found" });
        }
    },

    updateBank : async (req, res) => {
        const id = req.body.bank_id;
        const bank_data = await bankModel.findByIdAndUpdate(id, {
            bankname: req.body.bank_name,
            accountnumber: req.body.bank_account_number,
            ibannumber: req.body.iban_number,
            swiftcode: req.body.swift_code,
            line_of_business_id: req.body.line_of_business
        });
        if (bank_data != null) {
            res.json({ status: 200, message: "Bank Updated Successfully" });
        }
        else {
            res.json({ status: 400, message: "Bank Not Updated Successfully" });
        }
    },

    update_bank_status : async (req, res) => {
        const id = req.params.id;
        const bank_status = req.body.status;
        const bank_data = await bankModel.findByIdAndUpdate(id, {
            bankstatus: bank_status,
        });
        if (bank_data != null) 
        {
            if (bank_status == 0) 
            {
                res.json({ status: 200, message: "Bank Deactivated Successfully" });
            }
            else 
            {
                res.json({ status: 200, message: "Bank Activated Successfully" });
            }
        }
        else 
        {
            res.json({ status: 400, message: "Bank Not Deactivated Successfully" });
        }
    },

    apiintegrate : async (req, res) => {
        const id = req.body.company_id;
        const line_of_business_id = req.body.line_of_business_id;
        const status = req.body.isChecked;
        const api_int_id = req.body.api_int_id;

        if(api_int_id == 0)
        {
            const api_integrate_data = {
                company_id: id,
                line_of_business_id: line_of_business_id,
                api_integrate: status
            }
            const result = await apiModel.create(api_integrate_data);
            if (result != null) {
                res.json({ status: 200, message: "Data Added Successfully" });
            }
            else {
                res.json({ status: 400, message: "Data Not Added Successfully" });
            }
        }
        else
        {
            const api_integrate_data = await apiModel.findByIdAndUpdate (api_int_id, {
                api_integrate: status
            });
            if (api_integrate_data != null) {
                res.json({ status: 200, message: "Data Updated Successfully" });
            }
            else {
                res.json({ status: 400, message: "Data Not Updated Successfully" });
            }
        }
    },

    getapiintegrate: async (req, res) => {
        const id = req.body.company_id;
        const line_of_business_id = req.body.line_of_business_id;
        const api_integrate_data = await apiModel.find({ company_id: id, line_of_business_id: line_of_business_id }).sort({timestamp:1});
        if (api_integrate_data != "") 
        {
            res.json({ status: 200, message: "Data Found", data: api_integrate_data });
        }
        else 
        {
            res.json({ status: 400, message: "Data Not Found" });
        }
    },

    updateapistatus : async (req, res) => {
        const id = req.body.id;
        const status = req.body.status;
        const api_data = await apiModel.findByIdAndUpdate(id, {
            api_status: status,
        });
        if (api_data != null) 
        {
            if (status == 0) 
            {
                res.json({ status: 200, message: "Deactivated Successfully" });
            }
            else 
            {
                res.json({ status: 200, message: "Activated Successfully" });
            }
        }
        else 
        {
            res.json({ status: 400, message: "Something Went Wrong." });
        }
    },

    company_list : async (req, res) => {
        const company_data = await companyModel.find({company_status:1});
        if (company_data != "") 
        {
            res.json({ status: 200, message: "Data Found", data: company_data });
        }
        else 
        {
            res.json({ status: 400, message: "Data Not Found" });
        }
    },

    updatecreditlimit : async (req, res) => {
        const id = req.body.id;
        const credit_limit = req.body.credit_limit;
        const api_data = await apiModel.findByIdAndUpdate(id, {
            credit_limit: credit_limit,
        });
        if (api_data != null) 
        {
            res.json({ status: 200, message: "Credit Limit Updated Successfully" });
        }
        else 
        {
            res.json({ status: 400, message: "Something Went Wrong." });
        }
    },
}