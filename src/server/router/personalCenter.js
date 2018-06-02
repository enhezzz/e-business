const express = require('express');
const userModel = require('../collections/register');
const formidable = require('formidable');
const router = express.Router();
router.post('/address',(req,res)=>{
    if(req.session){
        let _id = req.session._id;
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            let newAddr = fields.newAddr;
            console.log(_id,newAddr);
            userModel.findByIdAndUpdate(_id,{$push: {addrs: newAddr}}).exec((err,doc)=>{
                if(err) throw err;
                res.send(newAddr).end();
            })
        });
        
    }
    else res.redirect('/login');
});
router.get('/address',(req,res)=>{
    if(req.session._id){
        console.log(req.session._id)
        let _id = req.session._id;
        userModel.findById(_id).exec((err,doc)=>{
            
            res.send(doc['addrs']).end();
        })
    }
    else res.status(404).end();
});
router.put('/address',(req,res)=>{
    if(req.session._id){
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            let _id = req.session._id;
            let index = fields.index;
            let editedVal = fields.editedVal;
            let indexField = 'addrs.' + index;
            console.log(indexField)
            console.log(_id)
            userModel.updateOne( {_id: _id},{$set: {"addrs.0": editedVal}}).exec((err,mount)=>{
                if(err) throw err;
                console.log(mount);
                res.send(editedVal).end();
            })
        });
    }
    else res.status(500).end();
})
module.exports = router;