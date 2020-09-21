'use strict';
const port = 3000;
var networkInterfaces = require('os').networkInterfaces();
var dns = require('dns');
var QRCode = require('qrcode')
var express = require('express');
var opn = require('opn')
var uploader = require('./include/Uploader');
var serveIndex = require('serve-index');
var app = express();
var uri= null;
var add="demo";
const fs = require('fs');
function listfile(callback){
    fs.readdir("./uploads/", (err, files) => {
        callback(files); 
    });
}
var qrCoder= function(){
    console.log(networkInterfaces['Wi-Fi']);
    for(var i=0;i<networkInterfaces['Wi-Fi'].length;i+=1){
        if(networkInterfaces['Wi-Fi'][i].family=="IPv4"){
            add=networkInterfaces['Wi-Fi'][i].address;
        }
        console.log(networkInterfaces['Wi-Fi'][i].address);
    }
    QRCode.toDataURL('http://'+add+':'+port+'/files', function (err, url) {
    uri = url;
    console.log(url);
    opn('http://'+add+':'+port+'/barcode');
    });
}; 
qrCoder();
app.use('/root',express.static(__dirname+'/uploads/'))
app.use('/',express.static(__dirname+'/views/'))
//app.use('/root',serveIndex(__dirname+'/uploads'))
//setting up Templating Engine
app.set('view engine','pug');
app.set ('views','./views');
app.get('/',(req,res)=>{
    res.render('test');
});
app.get('/barcode',(req,res)=>{
    res.render('barcode',{uri:uri})
})
// app.get('/tmp',(req,res)=>{
//     res.render('upload');
// })
//Uploading Handler
app.get("/files",(req,res)=>{
    listfile((files)=>{
        res.render('test',{list:files});
    })
})
app.post('/upload',(req,res)=>{
    uploader(req,res,(code)=>{
        console.log(code);
        res.redirect("/files");
    })
});
app.listen(3000,()=>{
    console.log("listening");
});