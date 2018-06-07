const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const mongoose = require('mongoose');
const model = require('../collections/register')
// const db = mongoose.createConnection('mongodb://localhost/busineess');
router.post('/register',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      fields.auth = 0;
      let user = new model(fields);
      model.findOne({username: fields.username}).exec((err,user)=>{
        if(!user){
          user.save(function(){
            console.log('register succeed');
            res.status(200);
            res.end()
          })
        }else{
          res.status(500).end()
        }
      });
    
    });
    
})
module.exports = router;