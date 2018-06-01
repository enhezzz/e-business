const express = require('express');
const formidable = require('formidable');
// const uuid = require('uuid');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../collections/product');
const brandModel = require('../collections/p_brand');
const styleModel = require('../collections/p_style');
router.post('/product', (req, res) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname, '../../../upload/mainPics');
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        //查看是否新建品牌
        let p_brand = { p_brand: fields.p_brand };
        brandModel.findOne(p_brand, function (err, brand) {
            if (err) throw err;
            if (brand) return;
            new brandModel(p_brand).save(function (err) {
                if (err) throw err;
                console.log('新建品牌成功')
            })
        })
        //查看是否添加商品style属性
        let p_style = { p_style: fields.p_style };
        styleModel.findOne(p_style, (err, style) => {
            if (err) throw err;
            if (style) return;
            new styleModel(p_style).save(err => {
                if (err) throw err;
                console.log('新建商品style成功')
            })
        })
        //发布商品
        let picPaths = resolvePicPaths(files);
        fields.p_pics = picPaths;
        fields.p_date = new Date();
        let product = new productModel(fields);
        product.save(function (err) {
            if (err) throw err;
            console.log('product saved...');
            res.status(200).end();
        })
    });
});
function resolvePicPaths(files) {
    let picPaths = [];
    for (let name in files) {
        let file = files[name];
        let filePath = file.path;
        let isPic = /(\.jpg|\.png|\.jpeg|\.gif)/.test(filePath);
        if (!isPic) continue;
        let publicPath = filePath.match(/\\upload[\w\S]*/)[0].replace(/\\/g, "/");
        picPaths.push(publicPath);
    }
    return picPaths;
}
router.get('/admin/brand', (req, res) => {
    brandModel.find({}, (err, brands) => {
        if (err) throw err;
        brands = brands.map(brand => {
            return brand.p_brand;
        })
        // console.log(JSON.stringify(brands));
        res.send(JSON.stringify(brands)).end();
    })
}),
    router.get('/product/:id', (req, res) => {
        let p_id = req.params.id;
        productModel.findOne({ _id: p_id }, function (err, prod) {
            if (err) throw err;
            res.status(200).header('Content-Type', 'application/json').send(prod).end()
        })
    });
router.get('/newProds', (req, res) => {
    productModel.find().sort({ p_date: -1 }).select('_id p_name').limit(10).exec((err, prods) => {
        res.json(prods).status(200).end()
    })
});
router.get('/productList', (req, res) => {
    if (req.query.p_keyword) {
        let p_keyword = req.query.p_keyword;
        let reg = eval('/[\s\S]*'+p_keyword+'[\s\S]*/');
        let pageIndex = parseInt(req.query.page || 1)-1; 
        let pageInfo = {};
        new Promise((resolve, reject) => {  //验证正则表达式时，在每个字符后面加？
            productModel.find({ p_name:  reg}).skip(pageIndex*12).limit(12).sort('-p_date')
                .select('_id p_price p_name p_pics')
                .exec((err, infos) => {
                    if (err) throw err;
                    pageInfo.infos = infos;
                    resolve();
                })
        }).then(()=>{
            return new Promise((resolve,reject)=>{
                productModel.where({ p_name: new RegExp(p_keyword) }).count().count((err,count)=>{
                    pageInfo.pageSum = Math.ceil(count/12);
                    resolve()
                })
            })
        }).then(()=>{
            res.json(pageInfo).end()
        })

    }
    //根据页码查询商品
    else if (req.query.page) {
        let multiple = req.query.page - 1;
        new Promise((resolve, reject) => {
            //查询商品的简单信息
            productModel.find().select('_id p_price p_name p_pics').skip(12 * multiple).limit(12).sort('-p_date')
                .exec(function (err, prodInfos) {
                    //数据库中的document对象是unconfigurable?
                    // prodInfos = prodInfos.map(function(prodInfo){
                    //     prodInfo.mainPic = prodInfo.p_pics[0];
                    //     delete prodInfo.p_pics;
                    //     // console.log(prodInfo)
                    //     return prodInfo;
                    // })
                    // console.log(prodInfos);
                    let obj = { list: prodInfos }
                    resolve(obj)
                })
        }).then(obj => {
            return new Promise((resolve, reject) => {
                //查询商品条数,按每页12得出页数
                productModel.where().count().count((err, mount) => {
                    if (err) throw err;
                    obj.pageMount = Math.floor(mount / 12) + 1;
                    resolve(obj)
                })
            })
        }).then(obj => {
            // console.log(obj)
            res.status(200).json(obj).end();
        }).catch(err => {
            if (err) throw err;
        })

    }
    else res.status(500).end();
});
router.get('/order/:id',(req,res)=>{
    let prodId = req.params.id;
    productModel.findOne({_id: prodId}).select('p_name p_price').exec((err,prod)=>{
        if(err) throw err;
        if(prod){
            
            res.json(prod).end();
        }
    })
})
module.exports = router;