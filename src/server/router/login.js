const express = require('express');
const formidable = require('formidable');
const model = require('../collections/register')
// const session = require('express-session');
const router = express.Router();
// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}))
router.post('/login',(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
     model.findOne(fields).then(user=>{
        if(user){
            req.session.username = user['username'];
            req.session.auth = user['auth'];
            req.session._id = user['_id'];
            res.status(200).header('Content-Type','application/json').json({
                username: req.session.username,
                auth: req.session.auth
            }).end();
        }
     }).catch(err=>{
         throw err
     })
    });
 
});
router.get('/sessionInfo',(req,res)=>{
    res.json({
        id: req.session.username,
        auth: req.session.auth
    }).end();
  })
module.exports = router;