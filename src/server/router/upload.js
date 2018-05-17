const express = require('express');
const formidable = require('formidable');
const path = require('path');
const router = express.Router();
router.post('/upload',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname,'../../../upload');
    form.keepExtensions = true;
    // form.on('file', function(name, file) {
    //     console.log(name)
    //     console.log(file)
    // });
    form.parse(req, function(err, fields, files) {
        let imgSrc = [];
        Object.keys(files).forEach(function(name,i){
        imgSrc.push(files[name].path.match(/\\upload[\w\S]*/)[0].replace(/\\/g,"/"))
        })
        console.log(files)
        console.log(imgSrc)
        res.json({
            "errno": 0,
            "data": imgSrc
        }).end();
    });
})
module.exports = router;