const mongodb = {
    database:'mongodb://localhost:27017/nodetestdb',
    secret:''
}

const server_port = process.env.PORT || 3002;

 const secret = "@5^$%LCVLh5454544mjbijfikvd66^>/";

module.exports.mongodb = mongodb;
module.exports.server_port = server_port;
module.exports.secret =secret;