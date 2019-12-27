var express = require('express');
var app = express();
app.get('/',(req,res)=>{
    res.send("hope it works");
});
app.listen(99999,()=>{console.log("listening")});
