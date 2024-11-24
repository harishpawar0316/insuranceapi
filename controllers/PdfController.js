const { generatePDF } = require("../helper/generatePDF");
const fs = require('fs');
const path = require('path');
const { PolicyTypeName, AgentrowsPanHook, SupervisorrowsPanHook, HighestLowestRateTable } = require("../utils/MISData");
const { AvarageRateTable } = require("../utils/AverageRates");
const { getData } = require("../helper/axiosinterceptors");
const ejs = require('ejs');
module.exports = {
    generatePdf: async (req, res) => {
        try {
            const { Filename, title = "Pdf Report" } = req.body;
            if (!Filename) {
                return res.status(404).json({ status: 404, message: "Please Enter Filename", data: {} });
            }
            const data = await getData(req.body.url, req).then(response => response.data ? response.data : []).then(data => data).catch(error => []);

            const filepath = path.join(process.cwd(), 'views', "pdftemplates", Filename + '.ejs');

            if (!data) {
                return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
            }
            if (!fs.existsSync(filepath)) {
                return res.status(404).json({ status: 404, message: "File Not Found", data: {} });
            }
            const template = fs.readFileSync(filepath, 'utf-8');
            let params = { data, PolicyTypeName, title, Filename, status: "", AgentrowsPanHook, SupervisorrowsPanHook, };
            let templatedata = ''
            if (Filename == "AveragerateRate") {
                templatedata = await AvarageRateTable(data)
                params = {
                    templatedata, title
                }
            }
            if (Filename == "HighestLowestRate") {
                templatedata = await HighestLowestRateTable(data)

                params = {
                    templatedata, title
                }
            }
            const base64 = await generatePDF(template, params);
            res.json({ status: 200, message: "Pdf Generated Successfully", data: base64 });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ status: 500, message: error.message, data: {} });
        }
    },
    PrintPdf: async (req, res) => {
        try {
            const { Filename, title = "Pdf Report" } = req.body;
            if (!Filename) {
                return res.status(404).json({ status: 404, message: "Please Enter Filename", data: {} });
            }
            const data = await getData(req.body.url, req).then(response => response.data ? response.data : []).then(data => data).catch(error => []);

            const filepath = path.join(process.cwd(), 'views', "pdftemplates", Filename + '.ejs');

            if (!data) {
                return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
            }
            if (!fs.existsSync(filepath)) {
                return res.status(404).json({ status: 404, message: "File Not Found", data: {} });
            }
            const template = fs.readFileSync(filepath, 'utf-8');
            let params = { data, PolicyTypeName, title, Filename, status: "", AgentrowsPanHook, SupervisorrowsPanHook, };
            let templatedata = ''
            if (Filename == "AveragerateRate") {
                templatedata = await AvarageRateTable(data)
                params = {
                    templatedata, title
                }
            }
            if (Filename == "HighestLowestRate") {
                templatedata = await HighestLowestRateTable(data)

                params = {
                    templatedata, title
                }
            }
            const base64 = ejs.render(template, params);
            res.json({ status: 200, message: "Pdf Generated Successfully", data: base64 });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ status: 500, message: error.message, data: {} });
        }
    },
    getpdf: async (req, res) => {
        try {
            req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTMwMjdiYWZjNWM0MDFkZmM5MmYxOCIsImlhdCI6MTcyMzc4NzkyN30.DSf9pFMY8rQl-x0cP-LbHOD6ZR9tIOgYeH86Jw1LXxk"
            const Filename = "HighestLowestRate", title = "Pdf Report", url = "http://localhost:8000/api/highestLowestRates?page=1&lobname=motor&limit=5&location=&lob=&business_type=&newagent=&dateRange=daily&startdate=Fri%20Aug%2023%202024%2018:49:35%20GMT+0530%20(India%20Standard%20Time)&enddate=Fri%20Aug%2023%202024%2018:49:35%20GMT+0530%20(India%20Standard%20Time)&assign_staff=&userType=&selectedSupervisor="
            if (!Filename) {
                return res.status(404).json({ status: 404, message: "Please Enter Filename", data: {} });
            }
            const data = await getData(url, req).then(response => response.data ? response.data : []).then(data => data).catch(error => []);

            if (!data) {
                return res.status(404).json({ status: 404, message: "Data Not Found", data: {} });
            }
            let templatedata = await HighestLowestRateTable(data)

            const params = { templatedata, title };
            res.render(`pdftemplates/${Filename}`, params);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ status: 500, message: error.message, data: {} });
        }
    }

};
