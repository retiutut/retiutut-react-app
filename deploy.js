var ENV = require('dotenv').config();

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var config = {
    user: process.env.DEPLOY_USER,                   // NOTE that this was username in 1.x 
    password: process.env.DEPLOY_PASSWORD,           // optional, prompted if none given
    host: process.env.DEPLOY_HOST,
    port: 21,
    localRoot: __dirname + '/build',
    remoteRoot: process.env.DEPLOY_REMOTE_ROOT,
    include: ['*', '**/*'],      // this would upload everything except dot files
    //include: ['build/*'],
    //exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: true,              // delete existing files at destination before uploading
    forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}
 
// use with promises
ftpDeploy.deploy(config)
    .then(res => {
        console.log('finished:', res)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(function() {
        return "Done!";
    })

ftpDeploy.on('uploading', function(data) {
    data.totalFilesCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.filename;             // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});
ftpDeploy.on('log', function(data) {
    console.log(data);         // same data as uploading event
});

ftpDeploy.on('upload-error', function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});