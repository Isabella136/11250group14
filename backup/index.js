const stream = require('stream');
const couchbackup = require('@cloudant/couchbackup');
const AWS = require('ibm-cos-sdk');
const moment = require('moment');

function backupToS3(params) {
    const s3Bucket = params.bucket;
    const i = params.key.lastIndexOf('.');
    const s3Key = (i < 0) ? params.key + '-' + moment().format('YYYYMMDD-hhmmss') : params.key.substring(0, i) + '-' + moment().format('YYYYMMDD-hhmmss') + params.key.substring(i);
    const srcUrl = params.cloudant_url;
    const config = params.config;
    const s3Client = new AWS.S3(config);
    return new Promise((resolve, reject) => {
        const streamToUpload = new stream.PassThrough();
        const params = {
            Bucket: s3Bucket,
            Key: s3Key,
            Body: streamToUpload
        };

        s3Client.upload(params, function (err, data) {
            console.log('Object store upload done');
            if (err) {
                console.log(err);
                reject(new Error(err, 'Object storage upload failed'));
                return;
            }
            console.log('Object store upload succeeded');
            console.log(data);
            resolve();
        }).httpUploadProgress = (progress) => {
            console.log('S3 upload progress: ' + progress);
        };
        couchbackup.backup(
            srcUrl,
            streamToUpload,
            (err, obj) => {
                if (err) {
                    console.log(err);
                    reject(new Error(err, 'CouchBackup failed with an error'));
                    return;
                }
                console.log(`Download from Cloudant complete.`);
                streamToUpload.end();
            }
        );
    });
}
global.main = backupToS3;