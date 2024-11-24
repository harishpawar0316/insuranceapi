const { mongoose } = require('mongoose');
const moment = require('moment');

const NewLead = require('../models/New_Lead');
const SpecialIncentive = require('../models/SpecialIncentive');
const CouponCode = require('../models/DiscountCoupon');
const performance_based_graphdata = async (req, res) => {
    try {
        let payload = req.query;
        // let user = req.user
        let match = {}
        // let usertype = user?.usertype?.toString();
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "lob._id": mongoose.Types.ObjectId(item)
                }
            })
        }

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

        let aggregate = [
            {
                $match: {
                    new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    lead_status: "Closed"
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id",
                    foreignField: "_id",
                    as: "supervisor_id"
                }
            },
            {
                $unwind: {
                    path: "$supervisor_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id.assignSalesAdvisor",
                    foreignField: "_id",
                    as: "sales_Advisors"
                }
            },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "type_of_policy",
                    foreignField: "_id",
                    as: "type_of_policy"
                }
            },
            {
                $unwind: {
                    path: "$type_of_policy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "assigned_agent",
                    foreignField: "_id",
                    as: "assigned_agent"
                }
            },
            {
                $unwind: {
                    path: "$assigned_agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    new_lead_timestamp: -1
                }
            },
            {
                $addFields: {
                    supervisor: {
                        _id: "$supervisor_id._id",
                        name: "$supervisor_id.name",
                        email: "$supervisor_id.email",
                        line_of_business: "$supervisor_id.line_of_business"
                    },
                    salesAdvisors: "$sales_Advisors",
                    lob: "$type_of_policy",
                    policyType: "$last_year_policy_type",
                    premium: "$final_price",
                    jdvCommission: "$jdvComission",
                    producerComission: "$producerComission",
                    agent_name: "$assigned_agent"
                }
            },
            {
                $match: {
                    ...match
                }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $project: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_details", 0]
                                    }
                                }
                            ]
                        }
                    },
                    lob_name: "$type_of_policy.line_of_business_name",
                    premium: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: 1
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $addFields: {
                    plan_name: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$lob_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_type", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $project: {
                    lob_name: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: {
                        _id: "$agent_name._id",
                        name: "$agent_name.name",
                        email: "$agent_name.email",
                        line_of_business: "$agent_name.line_of_business"
                    }
                }
            },
            {
                $group: {
                    _id: "$supervisor._id",
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $addToSet: "$salesAdvisors" },
                    lobs: {
                        $push: {
                            lob_name: "$lob_name",
                            plan: {
                                plan_details: "$plan_name._id",
                                planDetails: "$plan_name",
                                agent_name: "$agent_name",
                                premium: "$premium",
                                jdvCommission: "$jdvCommission"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: {
                        $map: {
                            input: {
                                $reduce: {
                                    input: "$salesAdvisors",
                                    initialValue: [],
                                    in: { $setUnion: ["$$value", "$$this"] }
                                }
                            },
                            as: "advisor",
                            in: {
                                _id: "$$advisor._id",
                                name: "$$advisor.name",
                                email: "$$advisor.email"
                            }
                        }
                    },
                    lobs: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: [],
                            in: {
                                $cond: [
                                    { $in: ["$$this.lob_name", "$$value.lob_name"] },
                                    {
                                        $map: {
                                            input: "$$value",
                                            as: "v",
                                            in: {
                                                $cond: [
                                                    { $eq: ["$$v.lob_name", "$$this.lob_name"] },
                                                    {
                                                        lob_name: "$$v.lob_name",
                                                        plans: {
                                                            $reduce: {
                                                                input: { $concatArrays: ["$$v.plans", ["$$this.plan"]] },
                                                                initialValue: [],
                                                                in: {
                                                                    $cond: [
                                                                        { $in: ["$$this.plan_details", "$$value.plan_details"] },
                                                                        {
                                                                            $map: {
                                                                                input: "$$value",
                                                                                as: "plan",
                                                                                in: {
                                                                                    $cond: [
                                                                                        { $eq: ["$$plan.plan_details", "$$this.plan_details"] },
                                                                                        {
                                                                                            plan_details: "$$plan.plan_details",
                                                                                            planDetails: "$$plan.planDetails",
                                                                                            agent_name: "$$plan.agent_name",
                                                                                            premium: { $add: ["$$plan.premium", "$$this.premium"] },
                                                                                            jdvCommission: { $add: ["$$plan.jdvCommission", "$$this.jdvCommission"] }
                                                                                        },
                                                                                        "$$plan"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        },
                                                                        { $concatArrays: ["$$value", ["$$this"]] }
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "$$v"
                                                ]
                                            }
                                        }
                                    },
                                    { $concatArrays: ["$$value", [{ lob_name: "$$this.lob_name", plans: ["$$this.plan"] }]] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    lobs: {
                        $map: {
                            input: "$lobs",
                            as: "lob",
                            in: {
                                lob_name: "$$lob.lob_name",
                                plans: "$$lob.plans",
                                totalPremium: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.premium"]
                                        }
                                    }
                                },
                                totalJdvCommission: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.jdvCommission"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalPremium: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalPremium"]
                            }
                        }
                    },
                    totalJDVCommission: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalJdvCommission"]
                            }
                        }
                    },
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $sort: {
                                new_lead_timestamp: -1
                            }
                        },
                        {
                            $skip: (pageOptions.page - 1) * pageOptions.limit,
                        },
                        {
                            $limit: pageOptions.limit,
                        },
                    ],
                    count: [
                        {
                            $count: "total",
                        },
                    ],
                },
            }
        ];

        let leads = await NewLead.aggregate(aggregate)
        return leads


    } catch (error) {
        throw error

    }
}
const closing_ratiodata = async (req, res) => {
    try {
        let payload = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "type_of_policy._id": mongoose.Types.ObjectId(item)
                }
            })
        }

        let aggregate = [
            {
                $match: {
                    new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id",
                    foreignField: "_id",
                    as: "supervisor_id"
                }
            },
            {
                $unwind: {
                    path: "$supervisor_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "assigned_agent",
                    foreignField: "_id",
                    as: "assigned_agent"
                }
            },
            {
                $unwind: {
                    path: "$assigned_agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id.assignSalesAdvisor",
                    foreignField: "_id",
                    as: "sales_Advisors"
                }
            },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "type_of_policy",
                    foreignField: "_id",
                    as: "type_of_policy"
                }
            },
            {
                $unwind: {
                    path: "$type_of_policy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    supervisor: {
                        _id: "$supervisor_id._id",
                        name: "$supervisor_id.name",
                        email: "$supervisor_id.email",
                        line_of_business: "$supervisor_id.line_of_business"
                    },
                    salesAdvisors: "$sales_Advisors",
                    lob_name: "$type_of_policy.line_of_business_name",
                    policyType: "$last_year_policy_type"
                }
            },
            {
                $match: {
                    lob_name: {
                        $ne: "Other Insurance"
                    },
                    ...match,
                }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $addFields: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_details", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $addFields: {
                    plan_name: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$lob_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_type", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $project: {
                    lead_status: 1,
                    plan_name: 1,
                    business_type: 1,
                    lob_name: 1,
                    final_price: 1,
                    supervisor: 1,
                    jdvComission: 1,
                    salesAdvisors: 1,
                    last_year_policy_type: 1,
                    assigned_agent: {
                        _id: 1,
                        name: 1,
                        email: 1
                    }
                }
            },
            {
                $group: {
                    _id: {
                        lob_name: "$lob_name",
                        plan_name: "$plan_name"
                    },
                    lead_count: { $sum: 1 },
                    premium: { $sum: "$final_price" },
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $addToSet: "$salesAdvisors" },
                    jdvCommission: { $sum: "$jdvComission" },
                    lead_status: {
                        $push: {
                            $cond: [
                                { $ne: ["$lead_status", "Forward"] },
                                "$lead_status",
                                "New"
                            ]
                        }
                    },
                    business_type: { $push: "$business_type" },
                    last_year_policy_type: { $addToSet: "$last_year_policy_type" },
                    assigned_agent: { $push: "$assigned_agent" }
                }
            },
            {
                $group: {
                    _id: "$_id.lob_name",
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $first: "$salesAdvisors" },
                    plans: {
                        $push: {
                            plan_details: "$_id.plan_name._id",
                            planDetails: "$_id.plan_name",
                            lead_count: "$lead_count",
                            premium: "$premium",
                            jdvCommission: "$jdvCommission",
                            lead_status: "$lead_status",
                            business_type: "$business_type",
                            last_year_policy_type: "$last_year_policy_type",
                            lead_status_count: {
                                $reduce: {
                                    input: "$lead_status",
                                    initialValue: { new: 0, closed: 0 },
                                    in: {
                                        $cond: [
                                            { $eq: ["$$this", "New"] },
                                            {
                                                $mergeObjects: [
                                                    "$$value",
                                                    {
                                                        new: { $add: ["$$value.new", 1] }
                                                    }
                                                ]
                                            },
                                            {
                                                $mergeObjects: [
                                                    "$$value",
                                                    {
                                                        closed: { $add: ["$$value.closed", 1] }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            business_type_count: {
                                $reduce: {
                                    input: "$business_type",
                                    initialValue: { renewal: 0, closed: 0 },
                                    in: {
                                        $cond: [
                                            { $eq: ["$$this", "New"] },
                                            {
                                                $mergeObjects: [
                                                    "$$value",
                                                    {
                                                        renewal: { $add: ["$$value.renewal", 1] }
                                                    }
                                                ]
                                            },
                                            {
                                                $mergeObjects: [
                                                    "$$value",
                                                    {
                                                        closed: { $add: ["$$value.closed", 1] }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            assigned_agent: "$assigned_agent"
                        }
                    }
                }
            },
            {
                $project: {
                    id: 1,
                    supervisor: 1,
                    salesAdvisors: {
                        $map: {
                            input: {
                                $reduce: {
                                    input: "$salesAdvisors",
                                    initialValue: [],
                                    in: { $setUnion: ["$$value", "$$this"] }
                                }
                            },
                            as: "advisor",
                            in: {
                                _id: "$$advisor._id",
                                name: "$$advisor.name",
                                email: "$$advisor.email"
                            }
                        }
                    },
                    plans: 1
                }
            },
            {
                $group: {
                    _id: "$supervisor._id",
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $first: "$salesAdvisors" },
                    lobs: {
                        $push: {
                            lob_name: "$_id",
                            plans: "$plans"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    lobs: {
                        $map: {
                            input: "$lobs",
                            as: "lob",
                            in: {
                                lob_name: "$$lob.lob_name",
                                plans: {
                                    $map: {
                                        input: "$$lob.plans",
                                        as: "plan",
                                        in: {
                                            $mergeObjects: [
                                                "$$plan",
                                                {
                                                    newVsClosedPercentage: {
                                                        $multiply: [
                                                            {
                                                                $divide: [
                                                                    { $ifNull: ["$$plan.lead_status_count.closed", 0] },
                                                                    {
                                                                        $cond: [
                                                                            { $eq: [{ $ifNull: ["$$plan.lead_status_count.new", 0] }, 0] },
                                                                            1,
                                                                            { $ifNull: ["$$plan.lead_status_count.new", 1] }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            100
                                                        ]
                                                    },
                                                    renewalVsClosedPercentage: {
                                                        $multiply: [
                                                            {
                                                                $divide: [
                                                                    { $ifNull: ["$$plan.business_type_count.closed", 0] },
                                                                    {
                                                                        $cond: [
                                                                            { $eq: [{ $ifNull: ["$$plan.business_type_count.renewal", 0] }, 0] },
                                                                            1,
                                                                            { $ifNull: ["$$plan.business_type_count.renewal", 1] }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            100
                                                        ]
                                                    },
                                                    totalPremium: {
                                                        $reduce: {
                                                            input: "$$lob.plans",
                                                            initialValue: 0,
                                                            in: {
                                                                $add: ["$$value", "$$this.premium"]
                                                            }
                                                        }
                                                    },
                                                    totalJdvCommission: {
                                                        $reduce: {
                                                            input: "$$lob.plans",
                                                            initialValue: 0,
                                                            in: {
                                                                $add: ["$$value", "$$this.jdvCommission"]
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    lobs: {
                        $map: {
                            input: "$lobs",
                            as: "lob",
                            in: {
                                lob_name: "$$lob.lob_name",
                                plans: "$$lob.plans",
                                totalPremium: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.premium"]
                                        }
                                    }
                                },
                                totalJdvCommission: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.jdvCommission"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalPremium: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalPremium"]
                            }
                        }
                    },
                    totalJDVCommission: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalJdvCommission"]
                            }
                        }
                    },
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $sort: {
                                new_lead_timestamp: -1
                            }
                        },
                        {
                            $skip: (pageOptions.page - 1) * pageOptions.limit,
                        },
                        {
                            $limit: pageOptions.limit,
                        },
                    ],
                    count: [
                        {
                            $count: "total",
                        },
                    ],
                },
            }
        ]

        let leads = await NewLead.aggregate(aggregate)
        return leads
    } catch (error) {
        throw error
    }
}
const special_incentive_to_agent_based_on_deal_closingdata = async (req, res) => {
    try {
        let payload = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "completed_by.lead.type_of_policy._id": mongoose.Types.ObjectId(item)
                }
            })
        }

        // let aggregate = [
        //     {
        //         $unwind: "$completed_by"
        //     },
        //     {
        //         $lookup: {
        //             from: "admins",
        //             localField: "completed_by.user",
        //             foreignField: "_id",
        //             as: "completed_by.user"
        //         }
        //     },
        //     {
        //         $unwind: "$completed_by.user"
        //     },
        //     {
        //         $lookup: {
        //             from: "new_leads",
        //             localField: "completed_by.lead",
        //             foreignField: "_id",
        //             as: "completed_by.lead"
        //         }
        //     },
        //     {
        //         $match: {
        //             "completed_by.role": "SA"
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path : "$completed_by.lead",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $match: {
        //             "completed_by.lead.lead_status": "Closed",
        //             "completed_by.lead.paymentStatus": "Completed"
        //             }
        //     },
        //     {
        //         $lookup: {
        //             from: "admins",
        //             localField: "completed_by.lead.supervisor_id",
        //             foreignField: "_id",
        //             as: "completed_by.lead.supervisor_id"
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$completed_by.lead.supervisor_id",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "admins",
        //             localField: "completed_by.lead.assigned_agent",
        //             foreignField: "_id",
        //             as: "completed_by.lead.assigned_agent"
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$completed_by.lead.assigned_agent",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "admins",
        //             localField: "completed_by.lead.supervisor_id.assignSalesAdvisor",
        //             foreignField: "_id",
        //             as: "completed_by.lead.sales_Advisors"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "line_of_businesses",
        //             localField: "completed_by.lead.type_of_policy",
        //             foreignField: "_id",
        //             as: "completed_by.lead.type_of_policy"
        //         }
        //     },
        //     {
        //         $unwind: {
        //             path: "$completed_by.lead.type_of_policy",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $match: {
        //             "completed_by.lead.type_of_policy.line_of_business_name": { $ne: "Other Insurance" }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "motor_plans",
        //             localField: "completed_by.lead.plan_id",
        //             foreignField: "_id",
        //             as: "motor_plan_details"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "yacht_plans",
        //             localField: "completed_by.lead.plan_id",
        //             foreignField: "_id",
        //             as: "yacht_plan_details"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "medical_plans",
        //             localField: "completed_by.lead.plan_id",
        //             foreignField: "_id",
        //             as: "medical_plan_details"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "home_plans",
        //             localField: "completed_by.lead.plan_id",
        //             foreignField: "_id",
        //             as: "home_plan_details"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "travel_plans",
        //             localField: "completed_by.lead.plan_id",
        //             foreignField: "_id",
        //             as: "travel_plan_details"
        //         }
        //     },
        //     {
        //         $addFields: {
        //             plan_detail: {
        //                 $switch: {
        //                     branches: [
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Motor" ] },
        //                             then: { $arrayElemAt: [ "$motor_plan_details", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Yacht" ] },
        //                             then: { $arrayElemAt: [ "$yacht_plan_details", 0 ] } 
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Travel" ] },
        //                             then: { $arrayElemAt: [ "$travel_plan_details", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Medical" ] },
        //                             then: { $arrayElemAt: [ "$medical_plan_details", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Home" ] },
        //                             then: { $arrayElemAt: [ "$home_plan_details", 0 ] }
        //                         }
        //                     ],
        //                     default: null
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "policy_types",
        //             localField: "plan_detail.policy_type_id",
        //             foreignField: "_id",
        //             as: "motor_plan_type"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "policy_types",
        //             localField: "plan_detail.policy_type_id",
        //             foreignField: "_id",
        //             as: "yacht_plan_type"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "medical_plan_type_lists",
        //             localField: "plan_detail.medical_plan_type_id",
        //             foreignField: "_id",
        //             as: "medical_plan_type"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "home_plan_type_lists",
        //             localField: "plan_detail.plan_type_id",
        //             foreignField: "_id",
        //             as: "home_plan_type"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "travel_insurance_fors",
        //             localField: "plan_detail.travel_insurance_for_id",
        //             foreignField: "_id",
        //             as: "travel_plan_type"
        //         }
        //     },
        //     {
        //         $addFields: {
        //             "completed_by.lead.plan_name": {
        //                 $switch: {
        //                     branches: [
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Motor" ] },
        //                             then: { $arrayElemAt: [ "$motor_plan_type", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Yacht" ] },
        //                             then: { $arrayElemAt: [ "$yacht_plan_type", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Medical" ] },
        //                             then: { $arrayElemAt: [ "$medical_plan_type", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Home" ] },
        //                             then: { $arrayElemAt: [ "$home_plan_type", 0 ] }
        //                         },
        //                         {
        //                             case: { $eq: [ "$completed_by.lead.type_of_policy.line_of_business_name", "Travel" ] },
        //                             then: { $arrayElemAt: [ "$travel_plan_type", 0 ] }
        //                         }
        //                     ],
        //                     default: null
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$_id",
        //             locations: { $first: "$locations" },
        //             lobs: { $first: "$lobs" },
        //             roles: { $first: "$roles" },
        //             users: { $first: "$users" },
        //             start_time: { $first: "$start_time" },
        //             end_time: { $first: "$end_time" },
        //             policy_type: { $first: "$policy_type" },
        //             policies_amount: { $first: "$policies_amount" },
        //             incentive_type: { $first: "$incentive_type" },
        //             incentive_amount: { $first: "$incentive_amount" },
        //             createdAt: { $first: "$createdAt" },
        //             updatedAt: { $first: "$updatedAt" },
        //             description: { $first: "$description" },
        //             completed_by: {
        //                 $push: {
        //                     user: "$completed_by.user",
        //                     lead: "$completed_by.lead",
        //                     count: "$completed_by.count",
        //                     role: "$completed_by.role"
        //                 }
        //             },
        //             participants: { $first: "$participants" }
        //         }
        //     },
        //     {
        //         $project: {
        //             description: 1,
        //             policy_type: 1,
        //             policies_amount: 1,
        //             incentive_type: 1,
        //             incentive_amount: 1,
        //             completed_by: {
        //                 $reduce: {
        //                     input: "$completed_by",
        //                     initialValue: {
        //                         user: {},
        //                         lead: [],
        //                         count: 0,
        //                         actualCount: 0,
        //                         totalCommission: 0,
        //                         role: ""
        //                     },
        //                     in: {
        //                         user: {
        //                             _id: "$$this.user._id",
        //                             name: "$$this.user.name",
        //                             email: "$$this.user.email"
        //                         },
        //                         lead: {
        //                             $concatArrays: [
        //                                 "$$value.lead",
        //                                 [
        //                                     {
        //                                         _id: "$$this.lead._id",
        //                                         lead_id: "$$this.lead.lead_id",
        //                                         name: "$$this.lead.name",
        //                                         email: "$$this.lead.email",
        //                                         paymentStatus: "$$this.lead.paymentStatus",
        //                                         jdvComission: "$$this.lead.jdvComission",
        //                                         final_price: "$$this.lead.final_price",
        //                                         lead_status: "$$this.lead.lead_status",
        //                                         type_of_policy: "$$this.lead.type_of_policy",
        //                                         plan_id: "$$this.lead.plan_name",
        //                                         assigned_agent: "$$this.lead.assigned_agent",
        //                                         supervisor_id: "$$this.lead.supervisor_id",
        //                                         salesAdvisors: "$$this.lead.sales_Advisors",
        //                                         deal_closing_time: {
        //                                             $dateDiff: {
        //                                                 startDate: "$$this.lead.new_lead_timestamp",
        //                                                 endDate: "$$this.lead.assign_policyissued_timestamp",
        //                                                 unit: "minute"
        //                                             }
        //                                         }
        //                                     }
        //                                 ]
        //                             ]
        //                         },
        //                         count: "$$this.count",
        //                         actualCount: { $add: [ 1, "$$value.actualCount" ] },
        //                         role: "$$this.role",
        //                         totalCommission: { $add: [ "$$this.lead.jdvComission", "$$value.totalCommission" ] }
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             description: 1,
        //             policy_type: 1,
        //             policies_amount: 1,
        //             incentive_type: 1,
        //             incentive_amount: 1,
        //             completed_by: {
        //                 user: 1,
        //                 lead: {
        //                     _id: 1,
        //                     lead_id: 1,
        //                     name: 1,
        //                     email: 1,
        //                     paymentStatus: 1,
        //                     jdvComission: 1,
        //                     final_price: 1,
        //                     lead_statu: 1,
        //                     type_of_policy: 1,
        //                     plan_id: 1,
        //                     assigned_agent: {
        //                         _id : 1,
        //                         name : 1,
        //                         email : 1,
        //                     },
        //                     supervisor_id: {
        //                         _id : 1,
        //                         name : 1,
        //                         email : 1,
        //                     },
        //                     salesAdvisors: {
        //                         $map: {
        //                             input: {
        //                                 $reduce: {
        //                                     input: "$completed_by.lead.salesAdvisors",
        //                                     initialValue: [],
        //                                     in: {
        //                                         $setUnion: [ "$$value", "$$this" ]
        //                                     }
        //                                 }
        //                             },
        //                             as: "advisor",
        //                             in: {
        //                                 _id: "$$advisor._id",
        //                                 name: "$$advisor.name",
        //                                 email: "$$advisor.email"
        //                             }
        //                         }
        //                     },
        //                     deal_closing_time: 1
        //                 },
        //                 count: 1,
        //                 actualCount: 1,
        //                 role: 1,
        //                 totalCommission: 1
        //             }
        //         }
        //     },
        //     {
        //         $facet : {
        //             data : [
        //                 { $skip: (pageOptions.page - 1) * pageOptions.limit },
        //                 { $limit: pageOptions.limit },
        //             ],
        //             count : [
        //                 { $count : "total" }
        //             ]
        //         }
        //     }
        // ]
        let aggregate = [
            {
                $unwind: {
                    path: "$completed_by"
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "completed_by.user",
                    foreignField: "_id",
                    as: "completed_by.user"
                }
            },
            {
                $unwind: {
                    path: "$completed_by.user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$completed_by.lead"
                }
            },
            {
                $lookup: {
                    from: "new_leads",
                    localField: "completed_by.lead",
                    foreignField: "_id",
                    as: "completed_by.lead"
                }
            },
            {
                $unwind: {
                    path: "$completed_by.lead",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "completed_by.role": "SA",
                    "completed_by.lead.lead_status": "Closed",
                    "completed_by.lead.paymentStatus": "Completed"
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "completed_by.lead.supervisor_id",
                    foreignField: "_id",
                    as: "completed_by.lead.supervisor_id"
                }
            },
            {
                $unwind: {
                    path: "$completed_by.lead.supervisor_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "completed_by.lead.assigned_agent",
                    foreignField: "_id",
                    as: "completed_by.lead.assigned_agent"
                }
            },
            {
                $unwind: {
                    path: "$completed_by.lead.assigned_agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            // {
            //     $lookup: {
            //         from: "admins",
            //         localField: "completed_by.lead.supervisor_id.assignSalesAdvisor",
            //         foreignField: "_id",
            //         as: "completed_by.lead.sales_Advisors"
            //     }
            // },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "completed_by.lead.type_of_policy",
                    foreignField: "_id",
                    as: "completed_by.lead.type_of_policy"
                }
            },
            {
                $unwind: {
                    path: "$completed_by.lead.type_of_policy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "completed_by.lead.type_of_policy.line_of_business_name": { $ne: "Other Insurance" }
                }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "completed_by.lead.plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "completed_by.lead.plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "completed_by.lead.plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "completed_by.lead.plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "completed_by.lead.plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $addFields: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Motor"] },
                                    then: { $arrayElemAt: ["$motor_plan_details", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Yacht"] },
                                    then: { $arrayElemAt: ["$yacht_plan_details", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Travel"] },
                                    then: { $arrayElemAt: ["$travel_plan_details", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Medical"] },
                                    then: { $arrayElemAt: ["$medical_plan_details", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Home"] },
                                    then: { $arrayElemAt: ["$home_plan_details", 0] }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $addFields: {
                    "completed_by.lead.plan_name": {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Motor"] },
                                    then: { $arrayElemAt: ["$motor_plan_type", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Yacht"] },
                                    then: { $arrayElemAt: ["$yacht_plan_type", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Medical"] },
                                    then: { $arrayElemAt: ["$medical_plan_type", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Home"] },
                                    then: { $arrayElemAt: ["$home_plan_type", 0] }
                                },
                                {
                                    case: { $eq: ["$completed_by.lead.type_of_policy.line_of_business_name", "Travel"] },
                                    then: { $arrayElemAt: ["$travel_plan_type", 0] }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$completed_by._id",
                    id: { $first: "$_id" },
                    user: { $first: "$completed_by.user" },
                    leads: { $push: "$completed_by.lead" },
                    count: { $first: "$completed_by.count" },
                    role: { $first: "$completed_by.role" },
                    locations: { $first: "$locations" },
                    roles: { $first: "$roles" },
                    users: { $first: "$users" },
                    start_time: { $first: "$start_time" },
                    end_time: { $first: "$end_time" },
                    policy_type: { $first: "$policy_type" },
                    incentive_type: { $first: "$incentive_type" },
                    incentive_amount: { $first: "$incentive_amount" },
                    description: { $first: "$description" },
                    participants: { $first: "$participants" },
                    policies_amount: {
                        $first: "$policies_amount"
                    }
                }
            },
            {
                $project: {
                    _id: "$id",
                    locations: 1,
                    description: 1,
                    start_time: 1,
                    policy_type: 1,
                    policies_amount: 1,
                    incentive_type: 1,
                    incentive_amount: 1,
                    completed_by: {
                        _id: "$_id",
                        user: "$user",
                        lead: "$leads",
                        count: "$count",
                        role: "$role"
                    },
                    participants: 1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    locations: { $first: "$locations" },
                    start_time: { $first: "$start_time" },
                    policy_type: { $first: "$policy_type" },
                    incentive_type: { $first: "$incentive_type" },
                    incentive_amount: { $first: "$incentive_amount" },
                    description: { $first: "$description" },
                    participants: { $first: "$participants" },
                    policies_amount: { $first: "$policies_amount" },
                    completed_by: {
                        $push: "$completed_by"
                    }
                }
            },
            {
                $addFields: {
                    completed_by: {
                        $map: {
                            input: "$completed_by",
                            as: "completedItem",
                            in: {
                                user: {
                                    _id: "$$completedItem.user._id",
                                    name: "$$completedItem.user.name",
                                    email: "$$completedItem.user.email"
                                },
                                lead: {
                                    $map: {
                                        input: "$$completedItem.lead",
                                        as: "lead",
                                        in: {
                                            _id: "$$lead._id",
                                            lead_id: "$$lead.lead_id",
                                            name: "$$lead.name",
                                            email: "$$lead.email",
                                            paymentStatus: "$$lead.paymentStatus",
                                            jdvComission: "$$lead.jdvComission",
                                            final_price: "$$lead.final_price",
                                            lead_status: "$$lead.lead_status",
                                            type_of_policy: "$$lead.type_of_policy",
                                            plan_id: "$$lead.plan_name",
                                            assigned_agent: {
                                                _id: "$$lead.assigned_agent._id",
                                                name: "$$lead.assigned_agent.name",
                                                email: "$$lead.assigned_agent.email",
                                            },
                                            supervisor_id: {
                                                _id: "$$lead.supervisor_id._id",
                                                name: "$$lead.supervisor_id.name",
                                                email: "$$lead.supervisor_id.email",
                                            },
                                            salesAdvisors: "$$lead.sales_Advisors",
                                            deal_closing_time: {
                                                $dateDiff: {
                                                    startDate: "$$lead.new_lead_timestamp",
                                                    endDate: "$$lead.assign_policyissued_timestamp",
                                                    unit: "minute"
                                                }
                                            }
                                        }
                                    }
                                },
                                count: "$$completedItem.count",
                                role: "$$completedItem.role",
                                actualCount: { $size: "$$completedItem.lead" },
                                totalCommission: {
                                    $reduce: {
                                        input: "$$completedItem.lead",
                                        initialValue: 0,
                                        in: {
                                            $cond: [
                                                { $ifNull: ["$$this.jdvComission", false] },
                                                { $add: ["$$this.jdvComission", "$$value"] },
                                                { $add: [0, "$$value"] }
                                            ]
                                        }
                                    },
                                },
                            }
                        }
                    },
                    supervisor: { $arrayElemAt: ["$completed_by.lead.supervisor_id", 0] }
                }
            },
            {
                $addFields: {
                    supervisor: { $arrayElemAt: ["$supervisor", 0] }
                }
            },
            {
                $project: {
                    locations: 1,
                    description: 1,
                    start_time: 1,
                    policy_type: 1,
                    policies_amount: 1,
                    incentive_type: 1,
                    incentive_amount: 1,
                    completed_by: {
                        user: 1,
                        lead: 1,
                        count: 1,
                        actualCount: 1,
                        role: 1,
                        totalCommission: 1,
                    },
                    participants: 1,
                    supervisor: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        assignSalesAdvisor: 1,
                        line_of_business: 1
                    }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: (pageOptions.page - 1) * pageOptions.limit },
                        { $limit: pageOptions.limit },
                    ],
                    count: [
                        { $count: "total" }
                    ]
                }
            }
        ]

        let leads = await SpecialIncentive.aggregate(aggregate)
        let data = leads?.[0]?.data;

        // check the policy type
        // check the policies closed depending on the type with either the total commission or lead closed
        // then check the incentive type to check if the incentive amount is calculated as value or percentage
        let newData = data.map((item) => {
            let totalPremiumEarnedFromLeads = item.completed_by.totalCommission;
            item.completed_by.incentiveEarnedBySA = 0;
            if (item.policy_type === "Close") {
                if (item.completed_by.actualCount >= item.policies_amount) {
                    if (item.incentive_type === "Value") {
                        item.completed_by.incentiveEarnedBySA = item.incentive_amount
                    } else {
                        item.completed_by.incentiveEarnedBySA = totalPremiumEarnedFromLeads * (item.incentive_amount / 100)
                    }
                }
            } else if (item.policy_type === "Amount") {
                if (item.policies_amount >= totalPremiumEarnedFromLeads) {
                    if (item.incentive_type === "Value") {
                        item.completed_by.incentiveEarnedBySA = item.incentive_amount
                    } else {
                        item.completed_by.incentiveEarnedBySA = totalPremiumEarnedFromLeads * (item.incentive_amount / 100)
                    }
                }
            }
            delete item.policy_type;
            delete item.policies_amount;
            delete item.incentive_type;
            delete item.incentive_amount;
            return item
        })

        return { newData, leads }

    } catch (error) {
        throw error
    }
}
const special_incentive_to_customers_with_sa_data = async (req, res) => {
    try {
        let payload = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "type_of_policy._id": mongoose.Types.ObjectId(item)
                }
            })
        }

        let aggregate = [
            {
                $match: {
                    new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    directPaymentByUser: false
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id",
                    foreignField: "_id",
                    as: "supervisor_id"
                }
            },
            {
                $unwind: {
                    path: "$supervisor_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id.assignSalesAdvisor",
                    foreignField: "_id",
                    as: "sales_Advisors"
                }
            },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "type_of_policy",
                    foreignField: "_id",
                    as: "type_of_policy"
                }
            },
            {
                $unwind: {
                    path: "$type_of_policy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "assigned_agent",
                    foreignField: "_id",
                    as: "assigned_agent"
                }
            },
            {
                $unwind: {
                    path: "$assigned_agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "type_of_policy.line_of_business_name": {
                        $ne: "Other Insurance"
                    },
                    ...match,
                }
            },
            {
                $sort: {
                    new_lead_timestamp: -1
                }
            },
            {
                $lookup: {
                    from: "couponcodes",
                    localField: "discountId",
                    foreignField: "_id",
                    as: "discountId"
                }
            },
            {
                $unwind: {
                    path: "$discountId",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    supervisor: {
                        _id: "$supervisor_id._id",
                        name: "$supervisor_id.name",
                        email: "$supervisor_id.email",
                        line_of_business: "$supervisor_id.line_of_business"
                    },
                    salesAdvisors: "$sales_Advisors",
                    lob: "$type_of_policy",
                    policyType: "$last_year_policy_type",
                    premium: "$final_price",
                    jdvCommission: "$jdvComission",
                    producerComission: "$producerComission",
                    agent_name: "$assigned_agent"
                }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $project: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_details", 0]
                                    }
                                }
                            ]
                        }
                    },
                    lob_name: "$type_of_policy.line_of_business_name",
                    premium: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: 1,
                    discountId: 1,
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $addFields: {
                    plan_name: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$lob_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_type", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $project: {
                    lob_name: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: {
                        _id: "$agent_name._id",
                        name: "$agent_name.name",
                        email: "$agent_name.email",
                        line_of_business: "$agent_name.line_of_business"
                    },
                    discountId: 1,
                }
            },
            {
                $group: {
                    _id: "$supervisor._id",
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $addToSet: "$salesAdvisors" },
                    lobs: {
                        $push: {
                            lob_name: "$lob_name",
                            plan: {
                                plan_details: "$plan_name._id",
                                planDetails: "$plan_name",
                                agent_name: "$agent_name",
                                premium: "$premium",
                                jdvCommission: "$jdvCommission",
                                discountId: "$discountId"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: {
                        $map: {
                            input: {
                                $reduce: {
                                    input: "$salesAdvisors",
                                    initialValue: [],
                                    in: { $setUnion: ["$$value", "$$this"] }
                                }
                            },
                            as: "advisor",
                            in: {
                                _id: "$$advisor._id",
                                name: "$$advisor.name",
                                email: "$$advisor.email"
                            }
                        }
                    },
                    lobs: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: [],
                            in: {
                                $cond: [
                                    { $in: ["$$this.lob_name", "$$value.lob_name"] },
                                    {
                                        $map: {
                                            input: "$$value",
                                            as: "v",
                                            in: {
                                                $cond: [
                                                    { $eq: ["$$v.lob_name", "$$this.lob_name"] },
                                                    {
                                                        lob_name: "$$v.lob_name",
                                                        plans: {
                                                            $reduce: {
                                                                input: { $concatArrays: ["$$v.plans", ["$$this.plan"]] },
                                                                initialValue: [],
                                                                in: {
                                                                    $cond: [
                                                                        { $in: ["$$this.plan_details", "$$value.plan_details"] },
                                                                        {
                                                                            $map: {
                                                                                input: "$$value",
                                                                                as: "plan",
                                                                                in: {
                                                                                    $cond: [
                                                                                        { $eq: ["$$plan.plan_details", "$$this.plan_details"] },
                                                                                        {
                                                                                            plan_details: "$$plan.plan_details",
                                                                                            planDetails: "$$plan.planDetails",
                                                                                            agent_name: "$$plan.agent_name",
                                                                                            premium: { $add: ["$$plan.premium", "$$this.premium"] },
                                                                                            jdvCommission: { $add: ["$$plan.jdvCommission", "$$this.jdvCommission"] },
                                                                                            discountId: "$$plan.discountId",
                                                                                        },
                                                                                        "$$plan"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        },
                                                                        { $concatArrays: ["$$value", ["$$this"]] }
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "$$v"
                                                ]
                                            }
                                        }
                                    },
                                    { $concatArrays: ["$$value", [{ lob_name: "$$this.lob_name", plans: ["$$this.plan"] }]] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    lobs: {
                        $map: {
                            input: "$lobs",
                            as: "lob",
                            in: {
                                lob_name: "$$lob.lob_name",
                                plans: "$$lob.plans",
                                totalPremium: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.premium"]
                                        }
                                    }
                                },
                                totalJdvCommission: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.jdvCommission"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalPremium: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalPremium"]
                            }
                        }
                    },
                    totalJDVCommission: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalJdvCommission"]
                            }
                        }
                    },
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $sort: {
                                new_lead_timestamp: -1
                            }
                        },
                        {
                            $skip: (pageOptions.page - 1) * pageOptions.limit,
                        },
                        {
                            $limit: pageOptions.limit,
                        },
                    ],
                    count: [
                        {
                            $count: "total",
                        },
                    ],
                },
            }
        ];

        let leads = await NewLead.aggregate(aggregate)

        return leads

    } catch (error) {
        console.log(error)
        return error
    }
}
const special_incentive_to_customers_without_sa_data = async (req, res) => {
    try {
        let payload = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "type_of_policy._id": mongoose.Types.ObjectId(item)
                }
            })
        }

        let aggregate = [
            {
                $match: {
                    new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    directPaymentByUser: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id",
                    foreignField: "_id",
                    as: "supervisor_id"
                }
            },
            {
                $unwind: {
                    path: "$supervisor_id",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "supervisor_id.assignSalesAdvisor",
                    foreignField: "_id",
                    as: "sales_Advisors"
                }
            },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "type_of_policy",
                    foreignField: "_id",
                    as: "type_of_policy"
                }
            },
            {
                $unwind: {
                    path: "$type_of_policy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "assigned_agent",
                    foreignField: "_id",
                    as: "assigned_agent"
                }
            },
            {
                $unwind: {
                    path: "$assigned_agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "type_of_policy.line_of_business_name": {
                        $ne: "Other Insurance"
                    },
                    ...match,
                }
            },
            {
                $sort: {
                    new_lead_timestamp: -1
                }
            },
            {
                $lookup: {
                    from: "couponcodes",
                    localField: "discountId",
                    foreignField: "_id",
                    as: "discountId"
                }
            },
            {
                $unwind: {
                    path: "$discountId",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    supervisor: {
                        _id: "$supervisor_id._id",
                        name: "$supervisor_id.name",
                        email: "$supervisor_id.email",
                        line_of_business: "$supervisor_id.line_of_business"
                    },
                    salesAdvisors: "$sales_Advisors",
                    lob: "$type_of_policy",
                    policyType: "$last_year_policy_type",
                    premium: "$final_price",
                    jdvCommission: "$jdvComission",
                    producerComission: "$producerComission",
                    agent_name: "$assigned_agent"
                }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $project: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_details", 0]
                                    }
                                }
                            ]
                        }
                    },
                    lob_name: "$type_of_policy.line_of_business_name",
                    premium: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: 1,
                    discountId: 1,
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $addFields: {
                    plan_name: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$lob_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_type", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    }
                }
            },
            {
                $project: {
                    lob_name: 1,
                    plan_name: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    jdvCommission: 1,
                    totalProducerCommission: 1,
                    premium: 1,
                    agent_name: {
                        _id: "$agent_name._id",
                        name: "$agent_name.name",
                        email: "$agent_name.email",
                        line_of_business: "$agent_name.line_of_business"
                    },
                    discountId: 1,
                }
            },
            {
                $group: {
                    _id: "$supervisor._id",
                    supervisor: { $first: "$supervisor" },
                    salesAdvisors: { $addToSet: "$salesAdvisors" },
                    lobs: {
                        $push: {
                            lob_name: "$lob_name",
                            plan: {
                                plan_details: "$plan_name._id",
                                planDetails: "$plan_name",
                                agent_name: "$agent_name",
                                premium: "$premium",
                                jdvCommission: "$jdvCommission",
                                discountId: "$discountId"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: {
                        $map: {
                            input: {
                                $reduce: {
                                    input: "$salesAdvisors",
                                    initialValue: [],
                                    in: { $setUnion: ["$$value", "$$this"] }
                                }
                            },
                            as: "advisor",
                            in: {
                                _id: "$$advisor._id",
                                name: "$$advisor.name",
                                email: "$$advisor.email"
                            }
                        }
                    },
                    lobs: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: [],
                            in: {
                                $cond: [
                                    { $in: ["$$this.lob_name", "$$value.lob_name"] },
                                    {
                                        $map: {
                                            input: "$$value",
                                            as: "v",
                                            in: {
                                                $cond: [
                                                    { $eq: ["$$v.lob_name", "$$this.lob_name"] },
                                                    {
                                                        lob_name: "$$v.lob_name",
                                                        plans: {
                                                            $reduce: {
                                                                input: { $concatArrays: ["$$v.plans", ["$$this.plan"]] },
                                                                initialValue: [],
                                                                in: {
                                                                    $cond: [
                                                                        { $in: ["$$this.plan_details", "$$value.plan_details"] },
                                                                        {
                                                                            $map: {
                                                                                input: "$$value",
                                                                                as: "plan",
                                                                                in: {
                                                                                    $cond: [
                                                                                        { $eq: ["$$plan.plan_details", "$$this.plan_details"] },
                                                                                        {
                                                                                            plan_details: "$$plan.plan_details",
                                                                                            planDetails: "$$plan.planDetails",
                                                                                            agent_name: "$$plan.agent_name",
                                                                                            premium: { $add: ["$$plan.premium", "$$this.premium"] },
                                                                                            jdvCommission: { $add: ["$$plan.jdvCommission", "$$this.jdvCommission"] },
                                                                                            discountId: "$$plan.discountId",
                                                                                        },
                                                                                        "$$plan"
                                                                                    ]
                                                                                }
                                                                            }
                                                                        },
                                                                        { $concatArrays: ["$$value", ["$$this"]] }
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "$$v"
                                                ]
                                            }
                                        }
                                    },
                                    { $concatArrays: ["$$value", [{ lob_name: "$$this.lob_name", plans: ["$$this.plan"] }]] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    supervisor: 1,
                    salesAdvisors: 1,
                    lobs: {
                        $map: {
                            input: "$lobs",
                            as: "lob",
                            in: {
                                lob_name: "$$lob.lob_name",
                                plans: "$$lob.plans",
                                totalPremium: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.premium"]
                                        }
                                    }
                                },
                                totalJdvCommission: {
                                    $reduce: {
                                        input: "$$lob.plans",
                                        initialValue: 0,
                                        in: {
                                            $add: ["$$value", "$$this.jdvCommission"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalPremium: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalPremium"]
                            }
                        }
                    },
                    totalJDVCommission: {
                        $reduce: {
                            input: "$lobs",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", "$$this.totalJdvCommission"]
                            }
                        }
                    },
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $sort: {
                                new_lead_timestamp: -1
                            }
                        },
                        {
                            $skip: (pageOptions.page - 1) * pageOptions.limit,
                        },
                        {
                            $limit: pageOptions.limit,
                        },
                    ],
                    count: [
                        {
                            $count: "total",
                        },
                    ],
                },
            }
        ];

        let leads = await NewLead.aggregate(aggregate);
        return leads
    } catch (error) {
        throw error
    }
}
const most_active_time_period_data = async (req, res) => {
    try {
        let { start = 5, end = 6, ...payload } = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
            match["$or"] = payload.lob.split(",").map(item => {
                return {
                    "type_of_policy._id": mongoose.Types.ObjectId(item)
                }
            })
        }

        let aggregate = [
            {
                $match: {
                    new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                }
            },
            {
                $lookup: {
                    from: "line_of_businesses",
                    localField: "type_of_policy",
                    foreignField: "_id",
                    as: "type_of_policy"
                }
            },
            {
                $unwind: { path: "$type_of_policy", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "motor_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "motor_plan_details"
                }
            },
            {
                $lookup: {
                    from: "yacht_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "yacht_plan_details"
                }
            },
            {
                $lookup: {
                    from: "medical_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "medical_plan_details"
                }
            },
            {
                $lookup: {
                    from: "home_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "home_plan_details"
                }
            },
            {
                $lookup: {
                    from: "travel_plans",
                    localField: "plan_id",
                    foreignField: "_id",
                    as: "travel_plan_details"
                }
            },
            {
                $addFields: {
                    hours: {
                        $hour: { $toDate: "$new_lead_timestamp" }
                    },
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_details", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_details", 0]
                                    }
                                },
                            ],
                            default: null
                        }
                    },
                    lob_name: "$type_of_policy.line_of_business_name"
                }
            },
            {
                $match: {
                    lob_name: {
                        $ne: "Other Insurance"
                    },
                    ...match,
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "motor_plan_type"
                }
            },
            {
                $lookup: {
                    from: "policy_types",
                    localField: "plan_detail.policy_type_id",
                    foreignField: "_id",
                    as: "yacht_plan_type"
                }
            },
            {
                $lookup: {
                    from: "medical_plan_type_lists",
                    localField: "plan_detail.medical_plan_type_id",
                    foreignField: "_id",
                    as: "medical_plan_type"
                }
            },
            {
                $lookup: {
                    from: "home_plan_type_lists",
                    localField: "plan_detail.plan_type_id",
                    foreignField: "_id",
                    as: "home_plan_type"
                }
            },
            {
                $lookup: {
                    from: "travel_insurance_fors",
                    localField: "plan_detail.travel_insurance_for_id",
                    foreignField: "_id",
                    as: "travel_plan_type"
                }
            },
            {
                $project: {
                    plan_detail: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ["$lob_name", "Motor"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$motor_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Yacht"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$yacht_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Medical"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$medical_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Home"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$home_plan_type", 0]
                                    }
                                },
                                {
                                    case: {
                                        $eq: ["$lob_name", "Travel"]
                                    },
                                    then: {
                                        $arrayElemAt: ["$travel_plan_type", 0]
                                    }
                                }
                            ],
                            default: null
                        }
                    },
                    new_lead_timestamp: 1,
                    hours: 1,
                    name: 1,
                    email: 1,
                    phoneno: 1,
                    lob_name: 1
                }
            },
            {
                $match: {
                    hours: { $gte: +start, $lt: +end }
                }
            },
            {
                $sort: { hours: 1 }
            },
            {
                $facet: {
                    data: [
                        { $skip: (pageOptions.page - 1) * pageOptions.limit },
                        { $limit: pageOptions.limit },
                    ],
                    count: [
                        { $count: "total" }
                    ]
                }
            }
        ]

        let leads = await NewLead.aggregate(aggregate)
        return leads

    } catch (error) {
        throw error
    }
}
const market_response_vs_discount_data = async (req, res) => {
    try {
        let payload = req.query;
        let match = {}
        let dateRange = payload.dateRange;
        let customstartdate = payload.startdate;
        let customenddate = payload.enddate;
        const currentDate = moment();
        const pageOptions = {
            page: parseInt(payload.page, 10) || 1,
            limit: parseInt(payload.limit, 10) || 10,
        };

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

        let aggregate = [
            {
                $match: {
                    $or: [
                        {
                            $and: [
                                { startdate: { $gte: startDate.toDate() } },
                                { startdate: { $lte: endDate.toDate() } },
                            ]
                        },
                        {
                            $and: [
                                { enddate: { $gte: startDate.toDate() } },
                                { enddate: { $lte: endDate.toDate() } },
                            ]
                        },
                        {
                            $and: [
                                { startdate: { $lt: startDate.toDate() } },
                                { enddate: { $gt: endDate.toDate() } },
                            ]
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "new_leads",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ["$lead_status", "Closed"] }]
                                }
                            }
                        }
                    ],
                    localField: "_id",
                    foreignField: "discountId",
                    as: "discountLeads"
                }
            },
            {
                $lookup: {
                    from: "new_leads",
                    let: {
                        startDate: "$startdate",
                        endDate: "$enddate"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $gte: ["$new_lead_timestamp", "$$startDate"]
                                        },
                                        {
                                            $lte: ["$new_lead_timestamp", "$$endDate"]
                                        },
                                        {
                                            $eq: [{ $type: "$discountId" }, "missing"]
                                        },
                                        {
                                            $eq: ["$lead_status", "Closed"]
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "timeRangeLeads"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $addFields: {
                    firstPolicyClosed: { $arrayElemAt: ["$discountLead-s", 0] },
                    leadWithoutDiscount: {
                        $cond: [
                            { $isArray: "$timeRangeLeads" },
                            { $size: "$timeRangeLeads" },
                            0
                        ]
                    },
                    premiumWithoutDiscount: {
                        $reduce: {
                            input: "$timeRangeLeads",
                            initialValue: 0,
                            in: {
                                $add: ["$$this.final_price", "$$value"]
                            }
                        }
                    },
                    leadWithDiscount: {
                        $cond: [
                            { $isArray: "$discountLeads" },
                            { $size: "$discountLeads" },
                            0
                        ]
                    },
                    premiumWithDiscount: {
                        $reduce: {
                            input: "$discountLeads",
                            initialValue: 0,
                            in: {
                                $add: ["$$this.final_price", "$$value"]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    code: 1,
                    discount: 1,
                    description: 1,
                    startdate: 1,
                    lob: 1,
                    discountLeads: {
                        $map: {
                            input: "$discountLeads",
                            as: "lead",
                            in: {
                                _id: "$$lead._id",
                                name: "$$lead.name",
                                plan_id: "$$lead.plan_id",
                                premium: "$$lead.final_price",
                                new_lead_timestamp: "$$lead.new_lead_timestamp",
                                discountId: "$$lead.discountId"
                            }
                        }
                    },
                    timeRangeLeads: {
                        $map: {
                            input: "$timeRangeLeads",
                            as: "lead",
                            in: {
                                _id: "$$lead._id",
                                name: "$$lead.name",
                                plan_id: "$$lead.plan_id",
                                premium: "$$lead.final_price",
                                new_lead_timestamp: "$$lead.new_lead_timestamp",
                                discountId: "$$lead.discountId"
                            }
                        }
                    },
                    firstPolicyClosed: "$firstPolicyClosed.assign_policyissued_timestamp",
                    leadWithoutDiscount: 1,
                    premiumWithoutDiscount: 1,
                    leadWithDiscount: 1,
                    premiumWithDiscount: 1,
                    marketResponseTime: "$firstPolicyClosed.new_lead_timestamp"
                }
            },
            {
                $addFields: {
                    incrementalPolicies: {
                        $max: [0, { $subtract: ["$leadWithDiscount", "$leadWithoutDiscount"] }]
                    },
                    incrementalPremium: {
                        $max: [0, { $subtract: ["$premiumWithDiscount", "$premiumWithoutDiscount"] }]
                    }
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: (pageOptions.page - 1) * pageOptions.limit,
                        },
                        {
                            $limit: pageOptions.limit,
                        },
                    ],
                    count: [
                        {
                            $count: "total",
                        },
                    ],
                },
            }
        ]

        let leads = await CouponCode.aggregate(aggregate)
        return leads

    } catch (error) {
        throw error
    }
}

module.exports = {
    //  all function to retrieve data from database
    performance_based_graphdata,
    closing_ratiodata,
    special_incentive_to_agent_based_on_deal_closingdata,
    special_incentive_to_customers_with_sa_data,
    special_incentive_to_customers_without_sa_data,
    most_active_time_period_data,
    market_response_vs_discount_data,
    // all controller functions to handle request and response
    performance_based_graph: async (req, res) => {
        try {

            let leads = await performance_based_graphdata(req, res)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    },
    closing_ratio: async (req, res) => {
        try {
            let leads = await closing_ratiodata(req, res)
            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            })
        }
    },
    special_incentive_to_agent_based_on_deal_closing: async (req, res) => {
        try {
            let { newData, leads } = await special_incentive_to_agent_based_on_deal_closingdata(req, res)
            return res.status(200).json({ status: 200, message: "Data Found", data: newData || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                error
            })
        }
    },
    special_incentive_to_customers_with_sa: async (req, res) => {
        let leads = await special_incentive_to_customers_with_sa_data(req, res)
        return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });
    },
    special_incentive_to_customers_without_sa: async (req, res) => {
        try {
            let leads = await special_incentive_to_customers_without_sa_data(req, res)
            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    },
    most_active_time_period: async (req, res) => {
        try {
            let leads = await most_active_time_period_data(req, res)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            })
        }
    },
    productive_day_of_the_week: async (req, res) => {
        try {
            let payload = req.query;
            let match = {}
            let dateRange = payload.dateRange;
            let customstartdate = payload.startdate;
            let customenddate = payload.enddate;
            const currentDate = moment();
            const pageOptions = {
                page: parseInt(payload.page, 10) || 1,
                limit: parseInt(payload.limit, 10) || 10,
            };

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

            if (payload?.lob && payload?.lob?.split(",")?.length > 0) {
                match["$or"] = payload.lob.split(",").map(item => {
                    return {
                        "type_of_policy._id": mongoose.Types.ObjectId(item)
                    }
                })
            }

            let aggregate = [
                {
                    $match: {
                        new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                        lead_status: "Closed"
                    }
                },
                {
                    $lookup: {
                        from: "line_of_businesses",
                        localField: "type_of_policy",
                        foreignField: "_id",
                        as: "type_of_policy"
                    }
                },
                {
                    $unwind: {
                        path: "$type_of_policy",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        lob_name:
                            "$type_of_policy.line_of_business_name"
                    }
                },
                {
                    $match: {
                        lob_name: {
                            $ne: "Other Insurance"
                        },
                        ...match
                    }
                },
                {
                    $lookup: {
                        from: "motor_plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "motor_plan_details"
                    }
                },
                {
                    $lookup: {
                        from: "yacht_plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "yacht_plan_details"
                    }
                },
                {
                    $lookup: {
                        from: "medical_plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "medical_plan_details"
                    }
                },
                {
                    $lookup: {
                        from: "home_plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "home_plan_details"
                    }
                },
                {
                    $lookup: {
                        from: "travel_plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "travel_plan_details"
                    }
                },
                {
                    $addFields: {
                        plan_detail: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $eq: ["$type_of_policy.line_of_business_name", "Motor"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$motor_plan_details", 0]
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$type_of_policy.line_of_business_name", "Yacht"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$yacht_plan_details", 0]
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$type_of_policy.line_of_business_name", "Travel"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$travel_plan_details", 0]
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$type_of_policy.line_of_business_name", "Medical"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$medical_plan_details", 0]
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$type_of_policy.line_of_business_name", "Home"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$home_plan_details", 0]
                                        }
                                    }
                                ],
                                default: null
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "policy_types",
                        localField: "plan_detail.policy_type_id",
                        foreignField: "_id",
                        as: "motor_plan_type"
                    }
                },
                {
                    $lookup: {
                        from: "policy_types",
                        localField: "plan_detail.policy_type_id",
                        foreignField: "_id",
                        as: "yacht_plan_type"
                    }
                },
                {
                    $lookup: {
                        from: "medical_plan_type_lists",
                        localField: "plan_detail.medical_plan_type_id",
                        foreignField: "_id",
                        as: "medical_plan_type"
                    }
                },
                {
                    $lookup: {
                        from: "home_plan_type_lists",
                        localField: "plan_detail.plan_type_id",
                        foreignField: "_id",
                        as: "home_plan_type"
                    }
                },
                {
                    $lookup: {
                        from: "travel_insurance_fors",
                        localField: "plan_detail.travel_insurance_for_id",
                        foreignField: "_id",
                        as: "travel_plan_type"
                    }
                },
                {
                    $addFields: {
                        plan_name: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $eq: ["$lob_name", "Motor"]
                                        },
                                        then: {
                                            plan: {
                                                $arrayElemAt: ["$motor_plan_type", 0]
                                            },
                                            lob: "Motor",
                                            policy_issued_date: "$policy_issued_date"
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$lob_name", "Yacht"]
                                        },
                                        then: {
                                            plan: {
                                                $arrayElemAt: ["$yacht_plan_type", 0]
                                            },
                                            lob: "Yacht",
                                            policy_issued_date: "$policy_issued_date"
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$lob_name", "Medical"]
                                        },
                                        then: {
                                            plan: {
                                                $arrayElemAt: ["$medical_plan_type", 0]
                                            },
                                            lob: "Medical",
                                            policy_issued_date: "$policy_issued_date"
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$lob_name", "Home"]
                                        },
                                        then: {
                                            plan: {
                                                $arrayElemAt: ["$home_plan_type", 0]
                                            },
                                            lob: "Home",
                                            policy_issued_date: "$policy_issued_date"
                                        }
                                    },
                                    {
                                        case: {
                                            $eq: ["$lob_name", "Travel"]
                                        },
                                        then: {
                                            plan: {
                                                $arrayElemAt: ["$travel_plan_type", 0]
                                            },
                                            lob: "Travel",
                                            policy_issued_date: "$policy_issued_date"
                                        }
                                    }
                                ],
                                default: null
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        days: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$new_lead_timestamp"
                            }
                        }
                    }
                },
                {
                    $project: {
                        new_lead_timestamp: 1,
                        days: 1,
                        plan_name: 1,
                        plan_id: 1,
                        policy_issued_date: 1
                    }
                },
                {
                    $group: {
                        _id: "$days",
                        new_lead_timestamp: {
                            $first: "$new_lead_timestamp"
                        },
                        count: {
                            $count: {}
                        },
                        plan_name: {
                            $push: "$plan_name"
                        }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: (pageOptions.page - 1) * pageOptions.limit,
                            },
                            {
                                $limit: pageOptions.limit,
                            },
                        ],
                        count: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                }
            ]

            let leads = await NewLead.aggregate(aggregate)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            })
        }
    },
    marketResponseVSdiscountOffered: async (req, res) => {
        try {

            let leads = await market_response_vs_discount_data(req, res)
            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });

        } catch (error) {
            return res.staus(500).json({
                status: 500,
                error,
            })
        }
    },
    tatForPendingPolicies: async (req, res) => {
        try {
            let payload = req.query;
            let match = {}
            let dateRange = payload.dateRange;
            let customstartdate = payload.startdate;
            let customenddate = payload.enddate;
            let status = payload.status;

            const currentDate = moment();
            const pageOptions = {
                page: parseInt(payload.page, 10) || 1,
                limit: parseInt(payload.limit, 10) || 10,
            };

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

            if (status) {
                if (status === "New") {
                    match["$or"] = [
                        { lead_status: "New" },
                        { lead_status: "Forward" },
                    ]
                }

                if (status === "Closed") {
                    match["lead_status"] = "Closed"
                }
            }

            console.log(match, status)

            let aggregate = [
                {
                    $match: {
                        new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                        ...match
                    }
                },
                {
                    $sort: { new_lead_timestamp: -1 }
                },
                {
                    $project: {
                        leadStart: "$new_lead_timestamp",
                        saTime: "$assign_salesadvisor_timestamp",
                        dcTime: "$assign_documentchaser_timestamp",
                        piTime: "$assign_policyissuer_timestamp",
                        leadClosed: "$assign_policyissued_timestamp"
                    }
                },
                {
                    $project: {
                        agingPeriodInDay: {
                            $dateDiff: {
                                startDate: "$leadStart",
                                endDate: {
                                    $cond: [
                                        { $ifNull: ["$leadClosed", false] },
                                        "$leadClosed",
                                        new Date()
                                    ]
                                },
                                unit: "day"
                            }
                        },
                        agingPeriodInMinute: {
                            $dateDiff: {
                                startDate: "$leadStart",
                                endDate: {
                                    $cond: [
                                        { $ifNull: ["$leadClosed", false] },
                                        "$leadClosed",
                                        new Date()
                                    ]
                                },
                                unit: "minute"
                            }
                        },
                        agingPeriodForSupervisorToSA: {
                            $dateDiff: {
                                startDate: "$leadStart",
                                endDate: {
                                    $cond: [
                                        { $ifNull: ["$saTime", false] },
                                        "$saTime",
                                        new Date()
                                    ]
                                },
                                unit: "minute"
                            }
                        },
                        agingPeriodForSAtoDC: {
                            $dateDiff: {
                                startDate: "$saTime",
                                endDate: {
                                    $cond: [
                                        { $ifNull: ["$dcTime", false] },
                                        "$dcTime",
                                        new Date()
                                    ]
                                },
                                unit: "minute"
                            }
                        },
                        agingPeriodForDCtoPI: {
                            $dateDiff: {
                                startDate: "$dcTime",
                                endDate: {
                                    $cond: [
                                        { $ifNull: ["$piTime", false] },
                                        "$piTime",
                                        new Date()
                                    ]
                                },
                                unit: "minute"
                            }
                        },
                    }
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: (pageOptions.page - 1) * pageOptions.limit,
                            },
                            {
                                $limit: pageOptions.limit,
                            },
                        ],
                        count: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                }
            ]

            let leads = await NewLead.aggregate(aggregate)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    },
    tatForIssuedPolicies: async (req, res) => {
        try {
            let payload = req.query;
            // let user = req.user
            let match = {}
            // let usertype = user?.usertype?.toString();
            let dateRange = payload.dateRange;
            let customstartdate = payload.startdate;
            let customenddate = payload.enddate;
            const currentDate = moment();
            const pageOptions = {
                page: parseInt(payload.page, 10) || 1,
                limit: parseInt(payload.limit, 10) || 10,
            };

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

            let aggregate = [
                {
                    $facet: {
                        data: [
                            {
                                $skip: (pageOptions.page - 1) * pageOptions.limit,
                            },
                            {
                                $limit: pageOptions.limit,
                            },
                        ],
                        count: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                }
            ]

            let leads = await NewLead.aggregate(aggregate)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });


        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    },
    tatForTaskCompletion: async (req, res) => {
        try {
            let payload = req.query;
            // let user = req.user
            let match = {}
            // let usertype = user?.usertype?.toString();
            let dateRange = payload.dateRange;
            let customstartdate = payload.startdate;
            let customenddate = payload.enddate;
            const currentDate = moment();
            const pageOptions = {
                page: parseInt(payload.page, 10) || 1,
                limit: parseInt(payload.limit, 10) || 10,
            };

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

            let aggregate = [
                {
                    $facet: {
                        data: [
                            {
                                $skip: (pageOptions.page - 1) * pageOptions.limit,
                            },
                            {
                                $limit: pageOptions.limit,
                            },
                        ],
                        count: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                }
            ]

            let leads = await NewLead.aggregate(aggregate)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data || [], total: leads?.[0]?.count[0]?.total || 0 });


        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    },
    autoVSmanual: async (req, res) => {
        try {
            let payload = req.query;
            // let user = req.user
            let match = {}
            // let usertype = user?.usertype?.toString();
            let dateRange = payload.dateRange;
            let customstartdate = payload.startdate;
            let customenddate = payload.enddate;
            const currentDate = moment();
            const pageOptions = {
                page: parseInt(payload.page, 10) || 1,
                limit: parseInt(payload.limit, 10) || 10,
            };

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

            let aggregate = [
                {
                    $match: {
                        new_lead_timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                        lead_status: "Closed"
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalLeadClosed: { $sum: 1 },
                        autoLeadClosed: {
                            $sum: { $cond: [{ $eq: ["$directPaymentByUser", true] }, 1, 0] }
                        },
                        manualLeadClosed: {
                            $sum: { $cond: [{ $eq: ["$directPaymentByUser", false] }, 1, 0] }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalLeadClosed: 1,
                        autoLeadClosed: 1,
                        manualLeadClosed: 1,
                        autoVsManualRatio: {
                            $cond: [
                                { $eq: ["$manualLeadClosed", 0] },
                                null,
                                {
                                    $divide: [
                                        { $multiply: ["$autoLeadClosed", 100] },
                                        "$manualLeadClosed"
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: (pageOptions.page - 1) * pageOptions.limit,
                            },
                            {
                                $limit: pageOptions.limit,
                            },
                        ],
                        count: [
                            {
                                $count: "total",
                            },
                        ],
                    },
                }
            ]

            let leads = await NewLead.aggregate(aggregate)

            return res.status(200).json({ status: 200, message: "Data Found", data: leads?.[0]?.data?.[0] || [], total: leads?.[0]?.count[0]?.total || 0 });


        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            })
        }
    }
}