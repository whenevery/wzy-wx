var fs = require('fs');
var multer = require('multer');
var Path = require('path');
var fileRender = require('../file-reader');
var common = require('../use-common');
var config = require('../use-config');
var uuid = require('uuid');
var rootPath;
module.exports = {
    file:function(options){
        options = options || {};
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, rootPath);

                },
                filename: function (req, file, cb) {
                    var filename = options.filename || file.originalname;
                    console.log('filename --- >' + filename);
                    filename = uuid.v1() + (Path.extname(filename) || req.body.extname || Path.extname(file.originalname));
                    cb(null, filename);
                }
            })
        }).single(options.name || 'filename');
    },
    array:function(options){
        options = options || {};
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, rootPath);

                },
                filename: function (req, file, cb) {
                    var filename = options.filename || file.originalname;
                    filename = uuid.v1() + (Path.extname(filename) || req.body.extname || Path.extname(file.originalname));
                    cb(null, filename);
                }
            })
        }).array(options.name || 'filename' , 10);
    },
    init:function(){
        rootPath = Path.join(__ROOT__ , publicDir , 'upload');
        fileRender.makeDir(Path.join(rootPath , 'xx.xx'));
    }
};