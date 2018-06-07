const express = require('express');
const formidable = require('formidable');
const path = require('path');
const userModel = require('../collections/register')
const router = express.Router();
router.post('/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname, '../../../upload/descPics');
    form.keepExtensions = true;
    // form.on('file', function(name, file) {
    //     console.log(name)
    //     console.log(file)
    // });
    form.parse(req, function (err, fields, files) {
        let imgSrc = [];
        Object.keys(files).forEach(function (name, i) {
            imgSrc.push(files[name].path.match(/\\upload[\w\S]*/)[0].replace(/\\/g, "/"))
        })
        // console.log(files)
        // console.log(imgSrc)
        res.json({
            "errno": 0,
            "data": imgSrc
        }).end();
    });
});
router.put('/updateInfo', (req, res) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname, '../../../upload/personalInfo');
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        let avatarPath = files['avatar'].path.match(/\\upload[\w\S]*/)[0].replace(/\\/g, "/");
        console.log(req.session._id ,avatarPath)
        userModel.findByIdAndUpdate(req.session._id , { $set: { avatarPath: avatarPath } }).exec((err, response) => {
            if (err) throw err;
            console.log(response,avatarPath);
            res.send(avatarPath).end();
        })

    });
})
router.get('/getInfo', (req, res) => {
    if (req.session._id) {
        userModel.findById(req.session._id).select('avatarPath').exec((err,user)=>{
            res.send(user.avatarPath).end()
        });
    }else{
        res.status(500).end()
    }
})
module.exports = router;