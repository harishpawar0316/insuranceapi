const Motor = require("../models/ToolTip/Motor")
const Home = require("../models/ToolTip/Home")
const IndividualMedical = require("../models/ToolTip/IndividualMedical")
const Travel = require("../models/ToolTip/Travel")
const Yacht = require("../models/ToolTip/Yacht")
const otherInsurance = require("../models/ToolTip/OtherInsurances")

module.exports = {
    // motor
    add_motor_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to create motor tooltip",
                })
            }

            data.createdBy = user._id
            result = new Motor(data);
             const   motor = await result.save();

            if(!motor) {
                return res.json({
                    status : 400,
                    error : "Failed to create motor tooltip",
                })
            }

            return res.json({
                status : 201,
                message : "Motor tooltip created",
                data : motor
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    view_motor_tooltip : async (req, res) => {
        try {
            const motor = await Motor.find({})

            if(!motor) {
                return res.json({
                    status : 400,
                    error : "Failed to find motor tooltip",
                })
            }
                console.log(motor,"?????>>>>>>>>>>>>>>>>>>>>>>>>>")
            return res.json({
                status : 200,
                message : "Motor tooltip fetched",
                data : motor[0]
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    edit_motor_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to update motor tooltip",
                })
            }

            const checkIfMotorExists = await Motor.findById(req.query.id)
            if(!checkIfMotorExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find motor tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const motor = await Motor.findByIdAndUpdate(req.query.id, data, {
                runValidators : true,
                new : true
            })

            if(!motor) {
                return res.json({
                    status : 400,
                    error : "Failed to update motor tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Motor tooltip updated",
                data : motor
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    delete_motor_tooltip : async (req, res) => {
        try {
            const checkIfMotorExists = await Motor.findById(req.params.id)
            if(!checkIfMotorExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find motor tooltip for provided id " + req.params.id,
                })
            }

            const motor = await Motor.findByIdAndDelete(req.params.id)
            if(!motor) {
                return res.json({
                    status : 400,
                    error : "Failed to delete motor tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Motor tooltip deleted",
                data : {}
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    // yacht
    add_yacht_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to create yacht tooltip",
                })
            }

            data.createdBy = user._id
            result = new Yacht(data);
            const yacht = await result.save();
            if(!yacht) {
                return res.json({
                    status : 400,
                    error : "Failed to create yacht tooltip",
                })
            }

            return res.json({
                status : 201,
                message : "Yacht tooltip created",
                data : yacht
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    view_yacht_tooltip : async (req, res) => {
        try {
            const yacht = await Yacht.find({})

            if(!yacht) {
                return res.json({
                    status : 400,
                    error : "Failed to find yacht tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Yacht tooltip fetched",
                data : yacht[0]
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    edit_yacht_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to update yacht tooltip",
                })
            }

            const checkIfYachtExists = await Yacht.findById(req.query.id)
            if(!checkIfYachtExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find yacht tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const yacht = await Yacht.findByIdAndUpdate(req.query.id, data, {
                runValidators : true,
                new : true
            })

            if(!yacht) {
                return res.json({
                    status : 400,
                    error : "Failed to update yacht tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Yacht tooltip updated",
                data : yacht
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    delete_yacht_tooltip : async (req, res) => {
        try {
            const checkIfYachtExists = await Yacht.findById(req.params.id)
            if(!checkIfYachtExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find yacht tooltip for provided id " + req.params.id,
                })
            }

            const yacht = await Yacht.findByIdAndDelete(req.params.id)
            if(!yacht) {
                return res.json({
                    status : 400,
                    error : "Failed to delete yacht tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Yacht tooltip deleted",
                data : {}
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    // home
    add_home_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to create home tooltip",
                })
            }

            data.createdBy = user._id
            result = new Home(data);
            const home = await result.save();


            if(!home) {
                return res.json({
                    status : 400,
                    error : "Failed to create home tooltip",
                })
            }

            return res.json({
                status : 201,
                message : "Home tooltip created",
                data : home
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    view_home_tooltip : async (req, res) => {
        try {
            const home = await Home.find({})

            if(!home) {
                return res.json({
                    status : 400,
                    error : "Failed to find home tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Home tooltip fetched",
                data : home[0]
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    edit_home_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to update home tooltip",
                })
            }

            const checkIfHomeExists = await Home.findById(req.query.id)
            if(!checkIfHomeExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find home tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const home = await Home.findByIdAndUpdate(req.query.id, data, {
                runValidators : true,
                new : true
            })

            if(!home) {
                return res.json({
                    status : 400,
                    error : "Failed to update home tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Home tooltip updated",
                data : home
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    delete_home_tooltip : async (req, res) => {
        try {
            const checkIfHomeExists = await Home.findById(req.params.id)
            if(!checkIfHomeExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find home tooltip for provided id " + req.params.id,
                })
            }

            const home = await Home.findByIdAndDelete(req.params.id)
            if(!home) {
                return res.json({
                    status : 400,
                    error : "Failed to delete home tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Home tooltip deleted",
                data : {}
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    // travel
    add_travel_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to create travel tooltip",
                })
            }

            data.createdBy = user._id
            result = new Travel(data);
            const travel = await result.save();

            if(!travel) {
                return res.json({
                    status : 400,
                    error : "Failed to create travel tooltip",
                })
            }

            return res.json({
                status : 201,
                message : "Travel tooltip created",
                data : travel
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    view_travel_tooltip : async (req, res) => {
        try {
            const travel = await Travel.find({})

            if(!travel) {
                return res.json({
                    status : 400,
                    error : "Failed to find travel tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "travel tooltip fetched",
                data : travel[0]
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    edit_travel_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to update travel tooltip",
                })
            }

            const checkIfTravelExists = await Travel.findById(req.query.id)
            if(!checkIfTravelExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find travel tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const travel = await Travel.findByIdAndUpdate(req.query.id, data, {
                runValidators : true,
                new : true
            })

            if(!travel) {
                return res.json({
                    status : 400,
                    error : "Failed to update travel tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "travel tooltip updated",
                data : travel
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    delete_travel_tooltip : async (req, res) => {
        try {
            const checkIfTravelExists = await Travel.findById(req.params.id)
            if(!checkIfTravelExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find travel tooltip for provided id " + req.params.id,
                })
            }

            const travel = await Travel.findByIdAndDelete(req.params.id)
            if(!travel) {
                return res.json({
                    status : 400,
                    error : "Failed to delete travel tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "travel tooltip deleted",
                data : {}
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    // individual
    add_individual_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to create individual tooltip",
                })
            }

            data.createdBy = user._id

            result = new IndividualMedical(data);
            const individual = await result.save();

            if(!individual) {
                return res.json({
                    status : 400,
                    error : "Failed to create individual tooltip",
                })
            }

            return res.json({
                status : 201,
                message : "individual tooltip created",
                data : individual
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    view_individual_tooltip : async (req, res) => {
        try {
            const individual = await IndividualMedical.find({})

            if(!individual) {
                return res.json({
                    status : 400,
                    error : "Failed to find individual tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "individual tooltip fetched",
                data : individual[0]
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    edit_individual_tooltip : async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if(!data) {
                return res.json({
                    status : 400,
                    error : "No data found to update individual tooltip",
                })
            }

            const checkIfIndividualExists = await IndividualMedical.findById(req.query.id)
            if(!checkIfIndividualExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find individual tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const individual = await IndividualMedical.findByIdAndUpdate(req.query.id, data, {
                runValidators : true,
                new : true
            })

            if(!individual) {
                return res.json({
                    status : 400,
                    error : "Failed to update individual tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "individual tooltip updated",
                data : individual
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    delete_individual_tooltip : async (req, res) => {
        try {
            const checkIfindividualExists = await IndividualMedical.findById(req.params.id)
            if(!checkIfindividualExists) {
                return res.json({
                    status : 400,
                    error : "Failed to find individual tooltip for provided id " + req.params.id,
                })
            }

            const individual = await IndividualMedical.findByIdAndDelete(req.params.id)
            if(!individual) {
                return res.json({
                    status : 400,
                    error : "Failed to delete individual tooltip",
                })
            }

            return res.json({
                status : 200,
                message : "Individual tooltip deleted",
                data : {}
            })
        } catch (error) {
            return res.json({
                status : 500,
                error,
            })
        }
    },
    // Other Insurances
    add_OtherInsurance_tooltip: async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if (!data) {
                return res.json({
                    status: 400,
                    error: "No data found to create Other Insurance tooltip",
                })
            }

            data.createdBy = user._id
            result = new otherInsurance(data);
            const OtherInsurances = await result.save();


            if (!OtherInsurances) {
                return res.json({
                    status: 400,
                    error: "Failed to create Other Insurance tooltip",
                })
            }

            return res.json({
                status: 201,
                message: "Other Insurance tooltip created",
                data: OtherInsurances
            })
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                error,
            })
        }
    },
    view_OtherInsurances_tooltip: async (req, res) => {
        try {
            const Other_Insurance = await otherInsurance.find({})

            if (!Other_Insurance) {
                return res.json({
                    status: 400,
                    error: "Failed to find Other Insurance tooltip",
                })
            }

            return res.json({
                status: 200,
                message: "Other Insurance tooltip fetched",
                data: Other_Insurance[0]
            })
        } catch (error) {
            return res.json({
                status: 500,
                error,
            })
        }
    },
    edit_OhterInsurances_tooltip: async (req, res) => {
        try {
            let data = req.body;
            let user = req.user

            if (!data) {
                return res.json({
                    status: 400,
                    error: "No data found to update Other Insurance tooltip",
                })
            }

            const checkIfHomeExists = await otherInsurance.findById(req.query.id)
            if (!checkIfHomeExists) {
                return res.json({
                    status: 400,
                    error: "Failed to find Other Insurance tooltip for provided id " + req.query.id,
                })
            }
            data.updatedBy = user._id

            const OtherInsurances = await otherInsurance.findByIdAndUpdate(req.query.id, data, {
                runValidators: true,
                new: true
            })

            if (!OtherInsurances) {
                return res.json({
                    status: 400,
                    error: "Failed to update Other Insurance tooltip",
                })
            }

            return res.json({
                status: 200,
                message: "Other Insurance tooltip updated",
                data: OtherInsurances
            })
        } catch (error) {
            return res.json({
                status: 500,
                error,
            })
        }
    },
}