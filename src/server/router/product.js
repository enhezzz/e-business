const express = require('express');
const formidable = require('formidable');
// const uuid = require('uuid');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../collections/product');
const brandModel = require('../collections/p_brand');
const styleModel = require('../collections/p_style');
router.post('/product',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname,'../../../upload/mainPics');
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        //查看是否新建品牌
        let p_brand = {p_brand: fields.p_brand};
        brandModel.findOne(p_brand,function(err,brand){
            if(err) throw err;
            if(brand) return;
            new brandModel(p_brand).save(function(err){
                if(err) throw err;
                console.log('新建品牌成功')
            })
        })
        //查看是否添加商品style属性
        let p_style = {p_style: fields.p_style};
        styleModel.findOne(p_style,(err,style)=>{
            if(err) throw err;
            if(style) return;
            new styleModel(p_style).save(err=>{
                if(err) throw err;
                console.log('新建商品style成功')
            })
        })
        //发布商品
        let picPaths = resolvePicPaths(files);
        fields.p_pics = picPaths;
        let product = new productModel(fields);
        product.save(function(err){
            if(err) throw err;
            console.log('product saved...');
            res.status(200).end();
        })
    });
});
function resolvePicPaths(files){
    let picPaths = [];
    for(let name in files){
        let file = files[name];
        let filePath = file.path;
        let isPic = /(\.jpg|\.png|\.jpeg|\.gif)/.test(filePath);
        if(!isPic) continue;
        let publicPath = filePath.match(/\\upload[\w\S]*/)[0].replace(/\\/g,"/");
        picPaths.push(publicPath);
    }
    return picPaths;
}
router.get('/admin/brand',(req,res)=>{
    brandModel.find({},(err,brands)=>{
        if(err) throw err;
        brands = brands.map(brand=>{
            return brand.p_brand;
        })
        // console.log(JSON.stringify(brands));
        res.send(JSON.stringify(brands)).end();
    })
}),
router.get('/product/:id',(req,res)=>{
    let p_id = req.params.id;
    productModel.findOne({_id: p_id},function(err,prod){
        if(err) throw err;
        console.log(prod)
        res.status(200).header('Content-Type','application/json').send(prod).end()
    })
});
router.get('/newProds',(req,res)=>{
    productModel.find().sort({p_date: -1}).select('_id p_name').limit(10).exec((err,prods)=>{
        console.log(prods);
        res.json(prods).status(200).end()
    })
})
module.exports = router;