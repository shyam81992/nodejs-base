var mysql = require('../config/mysql.js');
var mysqlconnection = mysql.mysqlconnection;
var Model = require('../models/cms.js');
var Cms  = Model.cms;

module.exports.cms = function(req,res,next){

  Cms.find({},function(err,data){
      if(err)
        return next(err);
      res.send(data);
  });

};

