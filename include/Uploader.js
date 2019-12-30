var fs = require('fs');
var formidable = require('formidable');
module.exports=function(req,res,callback){
    var form  = new formidable.IncomingForm({uploadDir:__dirname+'/../tmp',keepExtensions:true});
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err);
            callback('01');
        }
        else{
            console.log(files);
            var oldPath=files.uploadedFile.path;
            newPath = './uploads/'+files.uploadedFile.name;
            if(fs.existsSync('./uploads/'+files.uploadedFile.name)){
                newPath = './uploads/copy_of_'+files.uploadedFile.name;
            }
            fs.rename(oldPath,newPath,(err)=>{
                console.log(err);
            })
            callback('02');
        };

    });
}