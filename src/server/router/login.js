const express = require('express');
const formidable = require('formidable');
const model = require('../collections/register')
const router = express.Router();
router.post('/login',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     model.findOne(fields).then(user=>{
        if(user){
            res.status(200).header('Content-Type','application/json').json({
                username: user['username'],
                auth: user["auth"]
            }).end();
        }
     }).catch(err=>{
         throw err
     })
    });
 
})
module.exports = router;