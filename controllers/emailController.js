const Email = require("../models/Email")
const EmailTemplate = require("../models/EmailTemplate")
const Admin = require("../models/Admin")
const PolicyType = require("../models/Policy_type")
const LineOfBusiness = require("../models/Line_of_business")
const EmailType = require("../models/EmailType")


module.exports = {
    // email template crud
    add_email_template: async (req, res) => {
        try {
            let payload = req.body;
            let user = req.user;
            payload.created_by = user._id

            let checkIfLOBExists;
            if (payload.LOB) {
                checkIfLOBExists = await LineOfBusiness.findById(payload.LOB)
                if (!checkIfLOBExists) {
                    return res.status(400).json({
                        message: "Can't find any LOB for selected LOB!"
                    })
                }
            } else {
                payload.LOB = null
                payload.plan_type = null
            }


            if (payload.email_type && checkIfLOBExists && (checkIfLOBExists.line_of_business_name !== "Motor" || checkIfLOBExists.line_of_business_name !== "Yacht")) {
                let checkIfEmailTypeAlreadyExists = await EmailTemplate.findOne({ email_type: payload.email_type })
                if (checkIfEmailTypeAlreadyExists) {
                    return res.status(400).json({
                        message: "Plan type already exists!"
                    })
                }
            } else {

                let checkIfEmailTypeAlreadyExists = await EmailTemplate.findOne({ email_type: payload.email_type })
                if (checkIfEmailTypeAlreadyExists) {
                    return res.status(409).json({
                        status:409,
                        message: "Plan type already exists!"
                    })
                }
            }



            if (checkIfLOBExists && (checkIfLOBExists.line_of_business_name === "Motor" || checkIfLOBExists.line_of_business_name === "Yacht")) {
                let checkIfPlantTypeExists = await PolicyType.findById(payload.plan_type)
                if (!checkIfPlantTypeExists) {
                    return res.status(400).json({
                        message: "Can't find any plan for selected plan type!"
                    })
                }
            } else {
                payload.plan_type = null
            }

            console.log(payload)


            payload.email_type = payload.email_type.toUpperCase()

            let storeTheEmailTemplate = await EmailTemplate.create(payload)
            if (!storeTheEmailTemplate) {
                return res.status(400).json({
                    message: "Can't create email template!"
                })
            }

           return res.status(201).json({
                status: 201,
                message: "Email template created",
                data: storeTheEmailTemplate,
            })

        } catch (error) {
           return res.status(500).json(error)
        }
    },
    view_all_email_templates: async (req, res) => {
        try {
            let { page, limit } = req.query;

            const pageOptions = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };

            let findAllEmailTemplate = await EmailTemplate.aggregate([
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

            let populateEmailTemplate = await EmailTemplate.populate(findAllEmailTemplate[0]?.data, [
                { path: "created_by", select: "_id name email" },
                { path: "updated_by", select: "_id name email" },
                { path: "LOB" },
                { path: "plan_type" }
            ])

            res.status(200).json({
                message: "Email template fetched",
                data: populateEmailTemplate || [],
                total: findAllEmailTemplate[0]?.totalCount[0]?.count || 0,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    view_email_template: async (req, res) => {
        try {
            let getEmailTemplate = await EmailTemplate.findById(req.params.id)
            if (!getEmailTemplate) {
                return res.status(400).json({
                    message: "Can't find any email template with the provided id " + req.params.id
                })
            }

            // Populate the necessary fields
            let populateEmailTemplate = await EmailTemplate.findById(req.params.id).populate([
                { path: "created_by", select: "_id name email" },
                { path: "updated_by", select: "_id name email" },
                { path: "LOB" },
                { path: "plan_type" }
            ]);


            res.status(200).json({
                message: "Email template fetched",
                data: populateEmailTemplate || [],
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    view_type_specific_email_template: async (req, res) => {
        try {
            let type = req.query.type.toUpperCase()
            console.log(type)
            
            let getEmailType = await EmailType.findOne({name:type})
            if (getEmailType) {
                let getEmailTemplate = await EmailTemplate.findOne({
                    email_type: getEmailType._id
                })
                console.log("console from api",getEmailTemplate)
                if (!getEmailTemplate) {
                    return res.status(400).json("Can't find any template for the provided type")
                }

                res.status(200).json({
                    status: 200,
                    message: "Email template fetched",
                    data: getEmailTemplate
                })
            } else {
                return res.status(400).json("Can't find any email type")
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    edit_email_template: async (req, res) => {
        try {
            let payload = req.body;
            let user = req.user;
            payload.updated_by = user._id

            console.log(payload)

            let checkIfLOBExists;
            if (payload.LOB) {
                checkIfLOBExists = await LineOfBusiness.findById(payload.LOB)
                if (!checkIfLOBExists) {
                    return res.status(400).json({
                        message: "Can't find any LOB for selected LOB!"
                    })
                }
            } else {
                payload.LOB = null
                payload.plan_type = null
            }

            // if(payload.email_type && (checkIfLOBExists.line_of_business_name !== "Motor" || checkIfLOBExists.line_of_business_name !== "Yacht")) {
            //     let checkIfEmailTypeAlreadyExists = await EmailTemplate.findOne({email_type : payload.email_type})
            //     if (checkIfEmailTypeAlreadyExists) {
            //         return res.status(400).json({
            //             message: "Plan type already exists!"
            //         })
            //     }
            // }

            if (checkIfLOBExists?.line_of_business_name === "Motor" || checkIfLOBExists?.line_of_business_name === "Yacht") {
                let checkIfPlantTypeExists = await PolicyType.findById(payload.plan_type)
                if (!checkIfPlantTypeExists) {
                    return res.status(400).json({
                        message: "Can't find any plan for selected plan type!"
                    })
                }
            } else {
                payload.plan_type = null
            }

            let updateTheEmailTemplate = await EmailTemplate.findByIdAndUpdate(req.params.id, payload, {
                runValidators: true,
                new: true
            })
            if (!updateTheEmailTemplate) {
                return res.status(400).json({
                    message: "Can't find email template!"
                })
            }

            res.status(200).json({
                message: "Email template updated",
                data: updateTheEmailTemplate,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    delete_email_template: async (req, res) => {
        try {
            let getEmailTemplate = await EmailTemplate.findByIdAndDelete(req.params.id)
            if (!getEmailTemplate) {
                return res.status(400).json({
                    message: "Can't find any email template with the provided id " + req.params.id
                })
            }

            res.status(200).json({
                message: "Email template deleted",
                data: {},
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    // email crud
    add_email: async (req, res) => {
        try {
            let payload = req.body;
        } catch (error) {
            res.status(500).json(error)
        }
    },
    view_all_emails: async (req, res) => {
        try {
            let { page, limit } = req.query;

            const pageOptions = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };

            let findAllEmail = await Email.aggregate([
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

            let populateEmails = await Email.populate(findAllEmail[0]?.data, [
                { path: "template_id" },
                { path: "received_by", select: "_id name email" },
                { path: "LOB" },
                { path: "received_by", select: "_id name email" },
                { path: "cc", select: "_id name email" },
                { path: "bcc", select: "_id name email" },
                { path: "plan_type" },
            ])

            let findEmailTypeFromEmails = await Promise.all(populateEmails.map(async (item) => {
                let findEmailType = await EmailType.findById(item?.template_id?.email_type);
                if (findEmailType) {
                    item.template_id.email_type = findEmailType;
                }
                return item;
            }));


            res.status(200).json({
                message: "Email template fetched",
                data: findEmailTypeFromEmails || [],
                total: findAllEmail[0]?.totalCount[0]?.count || 0,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    view_user_specific_email: async (req, res) => {
        try {
            let { page, limit } = req.query;

            const pageOptions = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };

            let findAllUsersEmail = await Admin.aggregate([
                {
                    $lookup: {
                        from: "emails",
                        localField: "_id",
                        foreignField: "received_by",
                        as: "emails"
                    }
                },
                {
                    $facet: {
                        data: [
                            { $skip: (pageOptions.page - 1) * pageOptions.limit },
                            { $limit: pageOptions.limit },
                            { $project: { _id: 1, name: 1, email: 1, emails: 1, emailCount: { $size: "$emails" } } }
                        ],
                        totalCount: [{ $count: "count" }]
                    }
                }
            ])

            res.status(200).json({
                status: 200,
                message: "User specific email fetched",
                data: findAllUsersEmail[0]?.data || [],
                total: findAllUsersEmail[0]?.totalCount[0]?.count || 0,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    view_email: async (req, res) => {
        try {
            let getEmail = await Email.findById(req.params.id).populate([
                { path: "template_id" },
                { path: "received_by", select: "_id name email" },
                { path: "LOB" },
                { path: "received_by", select: "_id name email" },
                { path: "cc", select: "_id name email" },
                { path: "bcc", select: "_id name email" },
                { path: "plan_type" },
            ]);

            if (!getEmail) {
                return res.status(400).json({
                    message: "Can't find any email with the provided id " + req.params.id
                })
            }

            let getEmailwithEmailType = await EmailType.findById(getEmail.template_id.email_type);
            getEmail.template_id.email_type = getEmailwithEmailType


            res.status(200).json({
                message: "Email fetched",
                data: getEmail,
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    edit_email: async (req, res) => {
        try {
            let payload = req.body;
            let user = req.user;

            let checkIfPlantTypeExists = await PolicyType.findById(payload.plan_type)
            if (checkIfPlantTypeExists) {
                return res.status(400).json({
                    message: "Can't find any plan for selected plan type!"
                })
            }

            let checkIfLOBExists = await LineOfBusiness.findById(payload.LOB)
            if (!checkIfLOBExists) {
                return res.status(400).json({
                    message: "Can't find any LOB for selected LOB!"
                })
            }

            payload.updated_by = user._id

            let updateTheEmailTemplate = await EmailTemplate.findByIdAndUpdate(req.params.id, payload, {
                runValidators: true,
                new: true
            })
            if (!updateTheEmailTemplate) {
                return res.status(400).json({
                    message: "Can't find email template!"
                })
            }

            res.status(200).json({
                message: "Email template updated",
                data: updateTheEmailTemplate,
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    delete_email: async (req, res) => {
        try {
            let getEmail = await Email.findByIdAndDelete(req.params.id)
            if (!getEmail) {
                return res.status(400).json({
                    message: "Can't find any email with the provided id " + req.params.id
                })
            }

            res.status(200).json({
                message: "Email deleted",
                data: {},
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    // email_type master crud
    add_email_type: async (req, res) => {
        try {
            let payload = req.body;
            let user = req.user;

            payload.name = payload.name.toUpperCase()
            payload.createdBy = user._id

            console.log(payload)

            const checkIfTypeExists = await EmailType.findOne({ name: payload.name })
            if (checkIfTypeExists) {
                return res.status(400).json({ message: "Failed to create email type already exists." })
            }

            const addEmailType = await EmailType.create(payload)
            if (!addEmailType) {
                return res.status(400).json({ message: "Failed to create email type." })
            }

            res.status(201).json({
                status: 201,
                message: "Email type created",
                data: addEmailType
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    view_all_email_types: async (req, res) => {
        try {
            let { page, limit } = req.query;
            if (page && limit) {
                const pageOptions = {
                    page: parseInt(page, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                };
 
                let findAllEmailType = await EmailType.aggregate([
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

              return  res.status(200).json({
                    status: 200,
                    message: "Email type fetched",
                    data: findAllEmailType[0]?.data || [],
                    total: findAllEmailType[0]?.totalCount[0]?.count || 0,
                })
            } else {
                const allemailTypes = await EmailType.find({})
                if (allemailTypes) {
                 return   res.status(200).json({
                        status: 200,
                        message: "Email type fetched",
                     data: allemailTypes || [],

                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Email type not found",
                        data:[]
                    })
                }
            }

        } catch (error) {
            res.status(500).json(error)
        }
    },
    view_email_type: async (req, res) => {
        try {
            let getEmailType = await EmailType.findById(req.params.id)
            if (!getEmailType) {
                return res.status(400).json({
                    message: "Can't find any email type with the provided id " + req.params.id
                })
            }

            res.status(200).json({
                status: 200,
                message: "Email type fetched",
                data: getEmailType,
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    edit_email_type: async (req, res) => {
        try {
            let payload = req.body;
            let user = req.user;

            payload.name = payload.name.toUpperCase()
            payload.updatedBy = user._id

            console.log(payload)

            const checkIfTypeExists = await EmailType.findOne({ name: payload.oldname })

            console.log(checkIfTypeExists, "checkIfTypeExists")
            console.log(checkIfTypeExists._id, "checkIfTypeExists._id")
            console.log(payload._id, "payload._id")

            delete payload.oldname
            delete payload._id


            if (!checkIfTypeExists && checkIfTypeExists?._id !== payload?._id) {
                return res.status(400).json("Failed to create email type already exists.")
            }

            let updateEmailType = await EmailType.findByIdAndUpdate(req.params.id, payload, {
                runValidators: true,
                new: true
            })
            if (!updateEmailType) {
                return res.status(400).json({
                    message: "Can't find email type!"
                })
            }

            res.status(200).json({
                status: 200,
                message: "Email type updated",
                data: updateEmailType,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    delete_email_type: async (req, res) => {
        try {
            let getEmailType = await EmailType.findByIdAndDelete(req.params.id)
            if (!getEmailType) {
                return res.status(400).json({
                    message: "Can't find any email type with the provided id " + req.params.id
                })
            }

            res.status(200).json({
                status: 200,
                message: "Email type deleted",
                data: {},
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
}