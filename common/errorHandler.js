var nodemailer = require("nodemailer");
var fs = require("fs");
module.exports.logErrors = function (err, req, res, next) {
  fs.appendFile(__dirname + '/../logs/access_log.log', err.stack, encoding='utf8', function (err) {
    if (err) throw err;
	});
  next(err);
}
module.exports.sendMail =  function (err, req, res, next) {
	/*Sending the error stack as an email*/
	var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'namithhl777@gmail.com',
        pass: 'namithhl7'
    }
    });
    var mailOptions = {
    	from: 'From mail address', // sender address
   	 to: 'To mail address', // list of receivers
    	subject: 'Error - CMS', // Subject line
    	text: 'Hello Team, Please find the below error stack that occured recently while executing a request. Hope You will fix it soon...' +err.stack, // plaintext body
   	 html: "Hello Team,<br> Please find the below error stack that occured recently while executing a request. Hope You will fix it soon..."+"<br>  <br> "+err.stack+"<br><br><br> Thanks,"+"<br>Commercio Team" // html body
	};
	transporter.sendMail(mailOptions, function(error, info){
    	if(error){
         console.log(error);
    	}
    	console.log('Message sent: ' + info.response);
	});
  next(err);
}
module.exports.handleError = function (err, req, res, next) {
	res.end();
	// redirect to home page if any error occured...
  //res.status(500);
 // res.render('error', { error: err });
}
