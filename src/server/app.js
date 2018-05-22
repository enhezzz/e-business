// var mongoose = require('mongoose');    //引用mongoose模块
// var db = mongoose.createConnection('mongodb://localhost/my_database'); //创建一个数据库连接
// db.on('error',console.error.bind(console,'连接错误:'));
// db.once('open',function(){
//   //一次打开记录
//   var PersonSchema = new mongoose.Schema({
//     name:String   //定义一个属性name，类型为String
//   },{
//     collection: 'account'
//   });
//   PersonSchema.methods.speak = function(){
//     console.log('我的名字叫'+this.name);
//   }
//   var PersonModel = db.model('Person',PersonSchema);
//   var personEntity = new PersonModel({name:'Krouky'});
//   //打印这个实体的名字看看
//   console.log(personEntity.name); //Krouky
//   personEntity.speak();
//   personEntity.save();
//   PersonModel.find(function(err,persons){
//     console.log(persons)
//   });
// });

const express = require('express');
const app = express();
const formidable = require('formidable');
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
// const history = require('connect-history-api-fallback');
mongoose.connect('mongodb://localhost/busineess').then(res=>{
  console.log('connect database succeed')
}).catch(err=>{
  throw err;
});

const registerRouter = require('./router/register');
const loginRouter = require('./router/login');
const uploadRouter = require('./router/upload');
const productRouter = require('./router/product');
app.use('/',registerRouter);
app.use('/',loginRouter);
app.use('/',uploadRouter);
app.use('/',productRouter);
app.use(express.static(path.resolve(__dirname,'../../')));
// app.use((req,res)=>{
//   fs.readFile(path.resolve(__dirname,'../../index.html'), 'utf-8', (err, content) => {
//     if (err) {
//       console.log('We cannot open "index.htm" file.')
//     }
//     res.status(200).header('Content-Type','text/html;charset=utf-8').send(content).end()
// })
// }
// )
// app.use((req,res)=>{
//   res.status(404).end();
// })
app.listen(80,'localhost',function(){
  console.log('listening...')
})