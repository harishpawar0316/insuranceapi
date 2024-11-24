require("dotenv").config()
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
const Admin = require("../models/Admin");

module.exports = {
  sendEmail : async (optins) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Replace with your SMTP server address
        port: 587, // Replace with the appropriate port number
        secure: false, // Set to true if your SMTP server requires SSL/TLS
        service: "gmail",
        auth: {
          user: 'dev@handsintechnology.com',
          pass: 'Hitdev@2022'
      }
      });
      const mailOptions = {
        from: "dev@handsintechnology.com", // Replace with your email address
        to: optins?.email || "singh.anand9451@gmail.com", // Replace with recipient email address
        subject: optins?.subject || "Test Email",
        text: "Hello, this is a test email!",
        html: optins?.text || "<p>Hello, this is a test email!</p>",
      };
      await transporter
        .sendMail(mailOptions)
        .then((data) => {
          console.log("Email Send Successfully", data);
        })
        .catch((err) => {
          console.log("Error >>>>>>", err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  sendUserCreatedByStaffEmail : async (options) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, 
        secure: false, 
        service: "gmail",
        auth: {
          user: 'dev@handsintechnology.com',
          pass: 'Hitdev@2022'
        }
      });

      const mailOptions = {
        from: "dev@handsintechnology.com",
        to: options?.to,
        subject: options?.subject,
        html: options?.text,
      };

      await transporter
        .sendMail(mailOptions)
        .then((data) => {
          console.log("Email Send Successfully", data);
        })
        .catch((err) => {
          console.log("Error >>>>>>", err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  sendServerEmail : async (options) => {
    try {
      console.log(options,">>>>>>>>>>>>>>options>>>>>>>>>>>>>")
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, 
        secure: false, 
        service: "gmail",
        auth: {
          user: process.env?.EMAIL,
          pass: process.env?.PASS,
        }
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: options?.receivers,
        cc : options?.cc,
        bcc : options?.bcc,
        subject: options?.subject,
        html: options?.text,
        attachments: options?.attachments?.files?.map((item) => {
          return {
            filename: item?.filename,  
            path: item?.pathname
          }
        })
      };

      await transporter
        .sendMail(mailOptions)
        .then((data) => {
          console.log("Email Send Successfully");
        })
        .catch((err) => {
          console.log("Error >>>>>>", err);
        });

        // get receivers
      if (options?.receivers && options?.receivers?.length ) {
        const receivers =await Promise.all( options?.receivers.map(async (item) => {
            const receiver = await Admin.findOne({email:item})
            if(!receiver) {
              throw new Error("Receiver not found in user model")
            }
            return receiver._id
          }))
          
          options.receivers = receivers
        }

        // get cc
        if(options?.cc && options?.cc?.length ) {
          const ccs =await Promise.all( options?.cc.map(async (item) => {
            const cc = await Admin.findOne({email:item})
            if(!cc) {
              throw new Error("CC not found in user model")
            }
            return cc._id
          }))
          
          options.cc = ccs
        }

        // get bcc
        if(options?.bcc && options?.bcc?.length ) {
          const bccs = await Promise.all( options?.bcc.map(async (item) => {
            const bcc = await Admin.findOne({email:item})
            if(!bcc) {
              throw new Error("bcc not found in user model")
            }
            return bcc._id
          }))
          
          options.bcc = bccs
        }

        const data = {
          subject : options?.subject,
          body: options?.text,
          sent_by : options?.sender,
          received_by: options?.receivers,
          attachments : options?.attachments,
          cc: options?.cc || [null] ,
          bcc: options?.bcc || [null],
          createdAt : new Date(),
          LOB : options?.LOB || null,
          business_type : options?.business_type || null,
          plan_type : options?.plan_type || null,
          template_id : options?.template_id,
          network : options?.network || "SMTP"
        }
      console.log(data, "payload data to create emaio")
      // return false;
      const storeEmailInDatabase = await Email.create(data)
      console.log(storeEmailInDatabase)
      if(!storeEmailInDatabase) {
        throw new Error("Failed to store the email")
      }
    } catch (error) {
      console.log(error);
    }
  }
}
