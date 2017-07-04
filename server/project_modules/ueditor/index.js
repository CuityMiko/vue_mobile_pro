var Busboy = require('busboy');
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');
var snowflake = require('node-snowflake').Snowflake;
var uploadService;
var _appurl;
var ueditor = function (static_url,serviceobj, handel) {
  uploadService=serviceobj;
  _appurl=static_url;
  return function (req, res, next) {
    var _respond = respond(static_url, handel);
    _respond(req, res, next);
  };
};
var respond = function (static_url, callback) {
  return function (req, res, next) {
    if (req.query.action === 'config') {
      callback(req, res, next);
      return;
    } else if (req.query.action === 'listimage') {
      res.ue_list = function (list_dir) {
        var str = '';
        var i = 0;
        var list = [];
        fs.readdir(static_url + list_dir, function (err, files) {
          if (err) throw err;

          var total = files.length;
          files.forEach(function (file) {

            var filetype = 'jpg,png,gif,ico,bmp';
            var tmplist = file.split('.');
            var _filetype = tmplist[tmplist.length - 1];
            if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
              var temp = {};
              if (list_dir === '/') {
                temp.url = list_dir + file;
              } else {
                temp.url = list_dir + "/" + file;
              }
              list[i] = (temp);
            } else { }
            i++;
            // send file name string when all files was processed
            if (i === total) {
              res.json({
                "state": "SUCCESS",
                "list": list,
                "start": 1,
                "total": total
              });
            }
          });
        });
      };
      callback(req, res, next);

    } else if (req.query.action === 'uploadimage') {

      var busboy = new Busboy({
        headers: req.headers
      });

      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        req.ueditor = {};
        req.ueditor.fieldname = fieldname;
        req.ueditor.file = file;
        req.ueditor.filename = filename;
        req.ueditor.encoding = encoding;
        req.ueditor.mimetype = mimetype;
        res.ue_up = function (img_url) {
          var tmpdir = path.join(os.tmpDir(), path.basename(filename));
          var name = snowflake.nextId() + path.extname(tmpdir);
          var dest = path.join(static_url, img_url, name);
          var writeStream = fs.createWriteStream(tmpdir);
          file.pipe(writeStream);
          writeStream.on("close", function () {
            fse.move(tmpdir, dest, function (err) {
              if (err) throw err;
              remoteUpload(path.join(img_url, name),filename,(err,result)=>{
                  if(err){
                      res.json({
                        'url': path.join(img_url, name).replace(/\\/g,'/'),
                        'title': req.body.pictitle,
                        'original': filename,
                        'state': 'SUCCESS'
                      });
                  }else{
                    res.json({
                        'url': result.PictureUrl,
                        'title': req.body.pictitle,
                        'original': filename,
                        'state': 'SUCCESS'
                      });
                  }
              })
            });
          })
        };
        callback(req, res, next);
      });
      req.pipe(busboy);
    } else {
      callback(req, res, next);
    }
    return;
  };
};

//获取文件类型
var _getContentType=function(extname){
    switch (extname) {
        case '.jpg':
        case '.jpeg':
            return 'application/jpg'
        case '.png':
            return 'application/png'
        default:
            return '';
    }
}

//将缓存流转成字节数组
Buffer.prototype.toByteArray = function () {
   return Array.prototype.slice.call(this, 0)
}

//远程上传图片
var remoteUpload=function(imgurl,filename,callback){
  var newpath=path.join(_appurl,imgurl);
    fs.readFile(newpath,function(err,data){  
        if(err){
            callback(new Error('error'),null);
        }
        else{  
            var _imgbtarr=data.toByteArray();
            uploadService.uploadImage({
                FileName:filename,
                ContentType:_getContentType(path.extname(newpath)),
                ContentLength:_imgbtarr.length,
                ImgArr:_imgbtarr
            },(err,result)=>{
                fs.unlinkSync(newpath);
                if(err){
                    callback(new Error('error'),null);
                }else{
                    if(result!=null && result.Code==1 && result.Results!=null){
                        var _imgobj={};
                        _imgobj.PictureId=result.Results[0].PictureId;
                        _imgobj.PictureUrl=result.Results[0].PictureUrl;
                        callback(null,_imgobj);
                    }else{
                        callback(new Error('上传失败'),null);
                    }
                }     
            }) 
        }  
    }); 
}
module.exports = ueditor;