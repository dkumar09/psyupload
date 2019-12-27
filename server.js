'use strict';
const port = 3000;
var dns = require('dns');
var QRCode = require('qrcode')
var express = require('express');
var opn = require('opn')
var uploader = require('./include/Uploader');
var serveIndex = require('serve-index');
var app = express();
var uri= null;
dns.lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
    QRCode.toDataURL('http://'+add+':'+port+'/root', function (err, url) {
    uri = url;
    console.log(url);
    //opn('http://'+add+':'+port+'/barcode');
  })
  })
app.use('/root',express.static(__dirname+'/uploads/'))
app.use('/root',serveIndex(__dirname+'/uploads'))
//setting up Templating Engine
app.set('view engine','pug');
app.set ('views','./views');
app.get('/',(req,res)=>{
    res.render('test');
});
app.get('/barcode',(req,res)=>{
    res.render('barcode',{uri:uri})
})
//Uploading Handler
app.post('/upload',(req,res)=>{
    uploader(req,res,(code)=>{
        console.log(code);
        res.send(code);
    })
});
app.listen(3000,()=>{
    console.log("listening");
});