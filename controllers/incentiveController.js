const mongoose = require("mongoose")
const SpecialIncentive = require("../models/SpecialIncentive")
const LineOfBusiness = require("../models/Line_of_business")
const Location = require("../models/Locations")
const Admin = require("../models/Admin")
const NewLead = require("../models/New_Lead")

module.exports = {
    add_special_incentive : async (req, res) => {
        try {
            const payload = req.body;

            if(payload.locations.length > 0) {
                for(let i = 0; i > payload.locations.length; i++) {
                    const location = await Location.findById(payload.locations[i])
                    if(!location) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct location!"
                        })
                    }
                }
                
            }

            if(payload.lobs.length > 0) {
                for(let i = 0; i > payload.lobs.length; i++) {
                    const lob = await LineOfBusiness.findById(payload.lobs[i])
                    if(!lob) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct lob!"
                        })
                    }
                }
                
            }

            if(payload.users.length > 0) {
                for(let i = 0; i > payload.users.length; i++) {
                    const user = await Admin.findById(payload.users[i])
                    if(!user) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct user!"
                        })
                    }
                }
                
            }

            const incentive = await SpecialIncentive.create(payload)
            if(!incentive) {
                return res.status(400).json({
                    status : 400,
                    message : "Failed to create an entry for incentive!"
                })
            }

            res.status(201).json({
                status : 201,
                message : "Special incentive created!"
            })

        } catch (error) {
            return res.status(500).json({
                status : 500,
                error
            })
        }
    },
    get_special_incentives : async (req, res) => {
        try {
            const { page, limit, ...queries } = req.query;

            const pageOptions = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };

            let matchStage = {}
            for (key in queries) {
                if (id[key]) {
                    matchStage[key] = new RegExp(`.*${id[key]}.*`, "i");
                }
            }

            let incentives = await SpecialIncentive.aggregate([
                {
                    $match: matchStage,
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "locations",
                        foreignField: "_id",
                        as: "locations"
                    }
                },
                {
                    $lookup: {
                        from: "line_of_businesses",
                        localField: "lobs",
                        foreignField: "_id",
                        as: "lobs"
                    }
                },
                {
                    $lookup: {
                        from: 'usertypes',
                        localField: 'roles',
                        foreignField: '_id',
                        as: 'roles'
                    }
                },
                {
                    $lookup: {
                        from: "admins",
                        localField: "users",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                {
                    $unwind: "$locations"
                },
                {
                    $unwind: "$lobs"
                },
                {
                    $unwind: "$roles"
                },
                {
                    $unwind: "$users"
                },
                {
                    $group: {
                        _id: '$_id', 
                        locations: {
                            $addToSet: {
                                _id: "$locations._id",
                                location_name: "$locations.location_name"
                            }
                        },
                        lobs: {
                            $addToSet: {
                                _id: "$lobs._id",
                                lob_name: "$lobs.line_of_business_name"
                            }
                        },
                        users: {
                            $addToSet: {
                                _id: "$users._id",
                                name: "$users.name"
                            }
                        },
                        roles: {
                            $addToSet: {
                                _id: "$roles._id",
                                role_name: "$roles.usertype"
                            }
                        },
                        start_time: { $first: "$start_time" },
                        end_time: { $first: "$end_time" },
                        policy_type: { $first: "$policy_type" },
                        policies_closed: { $first: "$policies_closed" },
                        incentive_type: { $first: "$incentive_type" },
                        incentive_amount: { $first: "$incentive_amount" },
                        description: { $first: "$description" },
                    }
                },
                {
                    $facet: {
                        incentive: [
                            { $sort : { createdAt : -1 } },
                            { $skip: (pageOptions.page - 1) * pageOptions.limit },
                            { $limit: pageOptions.limit },
                        ],
                        totalCount: [{ $count: "count" }],
                    },
                },
            ]);

            return res.status(200).json({
                status : 200,
                message: "All the incentive fetched successfully",
                data: incentives[0]?.incentive || [],
                count: incentives[0]?.totalCount[0]?.count || 0,
            });

        } catch (error) {
            return res.status(500).json({
                status : 500,
                error
            })
        }
    },
    get_special_incentive : async (req, res) => {
        try {
            const id = req.params.id

            const [checkIncentive] = await SpecialIncentive.aggregate([
                {
                    $match: { _id: mongoose.Types.ObjectId(id) },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "locations",
                        foreignField: "_id",
                        as: "locations"
                    }
                },
                {
                    $lookup: {
                        from: "line_of_businesses",
                        localField: "lobs",
                        foreignField: "_id",
                        as: "lobs"
                    }
                },
                {
                    $lookup: {
                        from: 'usertypes',
                        localField: 'roles',
                        foreignField: '_id',
                        as: 'roles'
                    }
                },
                {
                    $lookup: {
                        from: "admins",
                        localField: "users",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                {
                    $unwind: "$locations"
                },
                {
                    $unwind: "$lobs"
                },
                {
                    $unwind: "$roles"
                },
                {
                    $unwind: "$users"
                },
                {
                    $group: {
                        _id: '$_id',
                        locations: {
                            $push: {
                                _id: "$locations._id",
                                location_name: "$locations.location_name"
                            }
                        },
                        lobs: {
                            $push: {
                                _id: "$lobs._id",
                                lob_name: "$lobs.line_of_business_name"
                            }
                        },
                        users: {
                            $push: {
                                _id: "$users._id",
                                name: "$users.name"
                            }
                        },
                        roles: {
                            $push: {
                                _id: "$roles._id",
                                role_name: "$roles.usertype"
                            }
                        },
                        start_time: { $first: "$start_time" },
                        end_time: { $first: "$end_time" },
                        policy_type: { $first: "$policy_type" },
                        policies_closed: { $first: "$policies_closed" },
                        incentive_type: { $first: "$incentive_type" },
                        incentive_amount: { $first: "$incentive_amount" },
                        description: { $first: "$description" },
                    }
                },
            ]);
            if(!checkIncentive) {
                return res.status(400).json({
                    status : 400,
                    message : "Failed to find any incentive with provided id!"
                })
            }

            return res.status(200).json({
                status : 200,
                message : "Incentive for specific id fetched",
                data : checkIncentive
            })
        } catch (error) {
            return res.status(500).json({
                status : 500,
                error
            })
        }
    },
    update_special_incentive : async (req, res) => {
        try {
            const payload = req.body;
            const id = req.params.id;

            const checkIncentive = await SpecialIncentive.findById(id)
            if(!checkIncentive) {
                return res.status(400).json({
                    status : 400,
                    message : "Failed to find any incentive with provided id!"
                })
            }

            if(payload.locations.length > 0) {
                for(let i = 0; i > payload.locations.length; i++) {
                    const location = await Location.findById(payload.locations[i])
                    if(!location) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct location!"
                        })
                    }
                }
                
            }

            if(payload.lobs.length > 0) {
                for(let i = 0; i > payload.lobs.length; i++) {
                    const lob = await LineOfBusiness.findById(payload.lobs[i])
                    if(!lob) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct lob!"
                        })
                    }
                }
                
            }

            if(payload.users.length > 0) {
                for(let i = 0; i > payload.users.length; i++) {
                    const user = await Admin.findById(payload.users[i])
                    if(!user) {
                        return res.status(400).json({
                            status : 400,
                            message : "Please provide correct user!"
                        })
                    }
                }
                
            }

            const incentive = await SpecialIncentive.findByIdAndUpdate(id, payload, { new : true, runValidators : true })
            if(!incentive) {
                return res.status(400).json({
                    status : 400,
                    message : "Failed to update incentive!"
                })
            }

            res.status(200).json({
                status : 200,
                message : "Special incentive updated!"
            })
        } catch (error) {
            return res.status(500).json({
                status : 500,
                error
            })
        }
    },
    del_special_incentive : async (req, res) => {
        try {
            const id = req.params.id;

            // check if incentive exists then delete
            const checkIncentive = await SpecialIncentive.findByIdAndDelete(id)
            if(!checkIncentive) {
                return res.status(400).json({
                    status : 400,
                    message : "Failed to find incentive for provided id " + id
                })
            }

            return res.status(200).json({
                status : 200,
                message :"Incentive scheme deleted!"
            })

        } catch (error) {
            return res.status(500).json({
                status : 500,
                error
            })
        }
    }
}