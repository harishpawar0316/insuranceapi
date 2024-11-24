const mongoose = require('mongoose');
const Mainpage = require('../models/Cms/Mainpage');
const MotorPage = require('../models/Cms/MotorPage');
const TravelPage = require('../models/Cms/TravelPage');
const HomePage = require('../models/Cms/HomePage');
const YachtPage = require('../models/Cms/YachtPage');
const Individualmedicalpagecms = require('../models/Cms/IndividualMedicalPage');
const Otherinsurancepagecms = require('../models/Cms/OtherPage');
const Helptips = require('../models/Cms/Helptips');
const Faq = require('../models/Cms/Faq');



module.exports = {

    add_mainpage: async (req, res) => {
        try {
            const payload = req.body;
            const banner = req.files.banner;
            const insurance_detail_banner = req.files.insurance_detail_banner;
            const know_more_banner = req.files.know_more_banner;

            const addData = new Mainpage({
                banner: banner,
                insurance_detail_banner: insurance_detail_banner,
                know_more_header: payload.know_more_header,
                know_more_banner: know_more_banner,
                howToReachUs: payload.howToReachUs
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Mainpage added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Mainpage not added" });
            }


        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    edit_mainpage: async (req, res) => {
        try {

            const payload = req.body;

            // Find the mainpage by id
            const mainpage = await Mainpage.findOne({ status: 1 });

            // Extract existing and new files from the request
            const existingbanner = req.body.banner;
            const existinginsurance_detail_banner = req.body.insurance_detail_banner;
            const existingknow_more_banner = req.body.know_more_banner;

            const files = req.files;

            // Initialize photos with existing photos from database
            let bannerphoto = mainpage?.banner || [];
            let insurance_detail_bannerphoto = mainpage?.insurance_detail_banner || [];
            let know_more_bannerphoto = mainpage?.know_more_banner || [];

            // Filter out photos that are in existingfiles array
            bannerphoto = bannerphoto?.filter(photo => existingbanner?.includes(photo.filename));
            insurance_detail_bannerphoto = insurance_detail_bannerphoto?.filter(photo => existinginsurance_detail_banner?.includes(photo.filename));
            know_more_bannerphoto = know_more_bannerphoto?.filter(photo => existingknow_more_banner?.includes(photo.filename));

            // Add new photos from req.files.file if available
            if (files && files.banner) {
                const newBanner = Array.isArray(files?.banner) ? files?.banner?.map(file => file) : [files?.banner];
                bannerphoto = [...bannerphoto, ...newBanner];
            }

            if (files && files.insurance_detail_banner) {
                const newInsurance_detail_banner = Array.isArray(files?.insurance_detail_banner) ? files?.insurance_detail_banner?.map(file => file) : [files?.insurance_detail_banner];
                insurance_detail_bannerphoto = [...insurance_detail_bannerphoto, ...newInsurance_detail_banner];
            }

            if (files && files.know_more_banner) {
                const newKnow_more_banner = Array.isArray(files?.know_more_banner) ? files?.know_more_banner?.map(file => file) : [files?.know_more_banner];
                know_more_bannerphoto = [...know_more_bannerphoto, ...newKnow_more_banner];
            }



            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>mainpage", mainpage);


            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", payload);

            // return false;

            const updatedMainpage = await Mainpage.findOneAndUpdate(
                { status: 1 },
                {
                    banner: bannerphoto,
                    insurance_detail_banner: insurance_detail_bannerphoto,
                    know_more_header: payload.know_more_header,
                    know_more_content: payload.know_more_content,
                    know_more_banner: know_more_bannerphoto,
                    howToReachUs: payload.howToReachUs
                },
                { new: true }
            );

            if (!updatedMainpage) {
                return res.status(400).json({ status: 400, message: "Mainpage not found" });
            } else {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>updatedMainpage", updatedMainpage);
                res.status(200).json({ status: 200, data: updatedMainpage, message: "Mainpage updated successfully" });
            }


        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    get_mainpage: async (req, res) => {
        try {
            const mainpage = await Mainpage.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: mainpage, message: "Mainpage fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addMotorContent: async (req, res) => {
        try {
            const { motorContent } = req.body;

            const addData = new MotorPage({
                motorContent: motorContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Motor Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Motor Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editMotorContent: async (req, res) => {
        try {
            const { motorContent } = req.body;

            const updatedMotorContent = await MotorPage.findOneAndUpdate(
                { status: 1 },
                {
                    motorContent: motorContent
                },
                { new: true }
            );

            if (!updatedMotorContent) {
                return res.status(400).json({ status: 400, message: "Motor Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedMotorContent, message: "Motor Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getMotorContent: async (req, res) => {
        try {
            const motorContent = await MotorPage.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: motorContent, message: "Motor Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addTravelContent: async (req, res) => {
        try {
            const { travelContent } = req.body;

            const addData = new TravelPage({
                travelContent: travelContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Travel Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Travel Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editTravelContent: async (req, res) => {
        try {
            const { travelContent } = req.body;

            const updatedTravelContent = await TravelPage.findOneAndUpdate(
                { status: 1 },
                {
                    travelContent: travelContent
                },
                { new: true }
            );

            if (!updatedTravelContent) {
                return res.status(400).json({ status: 400, message: "Travel Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedTravelContent, message: "Travel Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getTravelContent: async (req, res) => {
        try {
            const travelContent = await TravelPage.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: travelContent, message: "Travel Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addHomePageContent: async (req, res) => {
        try {
            const { homeContent } = req.body;

            const addData = new HomePage({
                homeContent: homeContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Home Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Home Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editHomePageContent: async (req, res) => {
        try {
            const { homeContent } = req.body;

            const updatedHomeContent = await HomePage.findOneAndUpdate(
                { status: 1 },
                {
                    homeContent: homeContent
                },
                { new: true }
            );

            if (!updatedHomeContent) {
                return res.status(400).json({ status: 400, message: "Home Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedHomeContent, message: "Home Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getHomePageContent: async (req, res) => {
        try {
            const homeContent = await HomePage.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: homeContent, message: "Home Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addYachtContent: async (req, res) => {
        try {
            const { yachtContent } = req.body;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", yachtContent);

            const addData = new YachtPage({
                yachtContent: yachtContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Yacht Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Yacht Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editYachtContent: async (req, res) => {
        try {
            const { yachtContent } = req.body;

            const updatedYachtContent = await YachtPage.findOneAndUpdate(
                { status: 1 },
                {
                    yachtContent: yachtContent
                },
                { new: true }
            );

            if (!updatedYachtContent) {
                return res.status(400).json({ status: 400, message: "Yacht Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedYachtContent, message: "Yacht Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getYachtContent: async (req, res) => {
        try {
            const yachtContent = await YachtPage.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: yachtContent, message: "Yacht Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addIndividualMedicalContent: async (req, res) => {
        try {
            const { individual_medical_Content } = req.body;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", individual_medical_Content);

            const addData = new Individualmedicalpagecms({
                individual_medical_Content: individual_medical_Content
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Individual Medical Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Individual Medical Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editIndividualMedicalContent: async (req, res) => {
        try {
            const { individual_medical_Content } = req.body;

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", individual_medical_Content);

            const updatedIndividualMedicalContent = await Individualmedicalpagecms.findOneAndUpdate(
                { status: 1 },
                {
                    individual_medical_Content: individual_medical_Content
                },
                { new: true }
            );

            if (!updatedIndividualMedicalContent) {
                return res.status(400).json({ status: 400, message: "Individual Medical Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedIndividualMedicalContent, message: "Individual Medical Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getIndividualMedicalContent: async (req, res) => {
        try {
            const individual_medical_Content = await Individualmedicalpagecms.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: individual_medical_Content, message: "Individual Medical Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addOtherInsuranceContent: async (req, res) => {
        try {
            const { OtherContent } = req.body;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", OtherContent);

            const addData = new Otherinsurancepagecms({
                OtherContent: OtherContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Other Insurance Content added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Other Insurance Content not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editOtherInsuranceContent: async (req, res) => {
        try {
            const { OtherContent } = req.body;

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", OtherContent);

            const updatedOtherInsuranceContent = await Otherinsurancepagecms.findOneAndUpdate(
                { status: 1 },
                {
                    OtherContent: OtherContent
                },
                { new: true }
            );

            if (!updatedOtherInsuranceContent) {
                return res.status(400).json({ status: 400, message: "Other Insurance Content not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedOtherInsuranceContent, message: "Other Insurance Content updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getOtherInsuranceContent: async (req, res) => {
        try {
            const Other_Insurance_Content = await Otherinsurancepagecms.findOne({ status: 1 });
            res.status(200).json({ status: 200, data: Other_Insurance_Content, message: "Other Insurance Content fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    addhelptipsContent: async (req, res) => {
        try {
            const { helptipQuestion, helptipContent } = req.body;

            const addData = new Helptips({
                helptipQuestion: helptipQuestion,
                helptipContent: helptipContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Helptips added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Helptips not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    edithelptipsContent: async (req, res) => {
        try {
            const { helptipQuestion, helptipContent } = req.body;
            const { id } = req.query;

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>payload", helptipQuestion, helptipContent);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>id", id);
            const data = {
                helptipQuestion: helptipQuestion,
                helptipContent: helptipContent
            }

            const updatedHelptips = await Helptips.findOneAndUpdate(
                { _id: id },
                {
                   $set: data
                },
                { new: true }
            );

            if (!updatedHelptips) {
                return res.status(400).json({ status: 400, message: "Helptips not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedHelptips, message: "Helptips updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    gethelptipsContent: async (req, res) => {
        try {
            const helptipsContent = await Helptips.find({ status: 1 });
            res.status(200).json({ status: 200, data: helptipsContent, message: "Helptips fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    gethelptipsContentById: async (req, res) => {
        try {
            const { id } = req.query;
            const helptipsContent = await Helptips.findOne({ _id: id });
            res.status(200).json({ status: 200, data: helptipsContent, message: "Helptips fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    deletehelptipsContent: async (req, res) => {
        try {
            const { id } = req.query;

            const deletedHelptips = await Helptips.findOneAndDelete({ _id: id });

            if (!deletedHelptips) {
                return res.status(400).json({ status: 400, message: "Helptips not found" });
            } else {
                res.status(200).json({ status: 200, data: deletedHelptips, message: "Helptips deleted successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }

    },

    addfaqContent: async (req, res) => {
        try {
            const { faqQuestion, faqContent } = req.body;

            const addData = new Faq({
                faqQuestion: faqQuestion,
                faqContent: faqContent
            });

            const savedData = await addData.save();

            if (savedData) {
                res.status(200).json({ status: 200, data: savedData, message: "Faq added successfully" });
            } else {
                res.status(400).json({ status: 400, message: "Faq not added" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    editfaqContent: async (req, res) => {
        try {
            const { faqQuestion, faqContent } = req.body;
            const { id } = req.query;

            const updatedFaq = await Faq.findOneAndUpdate(
                { _id: id },
                {
                    faqQuestion: faqQuestion,
                    faqContent: faqContent
                },
                { new: true }
            );

            if (!updatedFaq) {
                return res.status(400).json({ status: 400, message: "Faq not found" });
            } else {
                res.status(200).json({ status: 200, data: updatedFaq, message: "Faq updated successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getfaqContent: async (req, res) => {
        try {
            const faqContent = await Faq.find({ status: 1 });
            res.status(200).json({ status: 200, data: faqContent, message: "Faq fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getfaqContentById: async (req, res) => {
        try {
            const { id } = req.query;
            const faqContent = await Faq.findOne({ _id: id });
            res.status(200).json({ status: 200, data: faqContent, message: "Faq fetched successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    deletefaqContent: async (req, res) => {
        try {
            const { id } = req.query;

            const deletedFaq = await Faq.findOneAndDelete({ _id: id });

            if (!deletedFaq) {
                return res.status(400).json({ status: 400, message: "Faq not found" });
            } else {
                res.status(200).json({ status: 200, data: deletedFaq, message: "Faq deleted successfully" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        }

    },


}