// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// sudo firebase serve --only functions,hosting
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({
  origin: true
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, email, subject, message } = req.body;
  return cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Subject - ${subject || ""}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;
     var sesAccessKey = 'visdevelopllc@gmail.com';
     var sesSecretKey = 'angularreact2019';

     var transporter = nodemailer.createTransport(smtpTransport({
      service: 'Gmail',
      auth: {
          user: sesAccessKey,
          pass: sesSecretKey
      }
    }));
    const mailOptions = {
      to: email,
      from: "visdevelopllc@gmail.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log("ERROR MESSAGE: "+ error.message);
      } else {
        res.status(200).send({
          message: "message success"
        })
      }
    });
  })
});