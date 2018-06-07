const express = require('express');
const formidable = require('formidable');
const model = require('../collections/register');
const cartModel = require('../collections/cart');
// const session = require('express-session');
const router = express.Router();
// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}))
router.post('/login',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     new Promise((resolve,reject)=>{
        model.findOne(fields).then(user=>{
            if(user){
                req.session.username = user['username'];
                req.session.auth = user['auth'];
                req.session._id = user['_id'];
                req.session.isLogin = true;
                // res.status(200).header('Content-Type','application/json').json({
                //     username: req.session.username,
                //     auth: req.session.auth,
                //     isLogin: req.session.isLogin
                // }).end();
                resolve({
                    username: req.session.username,
                    auth: req.session.auth,
                    isLogin: req.session.isLogin
                });
            }
         }).catch(err=>{
             throw err
         })
        }).then(userInfo=>{
            return new Promise((resolve,reject)=>{
                cartModel.findOne({userId: req.session._id}).select('prodInfo').exec((err,cart)=>{
                        if(cart){
                            userInfo.num_in_cart = cart.prodInfo.length;
                            req.session.num_in_cart = cart.prodInfo.length;
                        }else{
                            userInfo.num_in_cart = 0;
                            req.session.num_in_cart = 0;
                        }
                        
                        
                    
                    resolve(userInfo);
                })
            })
        }).then(userInfo=>{
            res.json(userInfo).end()
        })
     })
    
 
});
router.get('/sessionInfo',(req,res)=>{
    if(req.session.username){
        res.json({
            id: req.session.username,
            auth: req.session.auth,
            isLogin: req.session.isLogin,
            num_in_cart: req.session.num_in_cart
        }).end();
    }else{
        res.status(500).end()
    }
})
router.get('/exit',(req,res)=>{
    req.session.destroy(function(err) {
        res.end();
      })
})
module.exports = router;