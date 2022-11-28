const express = require('express');
const router = express.Router();
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {S3_CONFIG} = require('../config/s3');
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: S3_CONFIG.S3_ACCESS_KEY_ID, secretAccessKey: S3_CONFIG.S3_SECRET_ACCESS_KEY});
const s3 = new AWS.S3();

const BUCKET_NAME = S3_CONFIG.S3_BUCKET;
const EXPIRE_TIME = 60 * 5;

router.get('/getGetObjectSignedUrl', (req, res, next) => {
    let {dir, hashedFileName} = req.query;
    try {
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: BUCKET_NAME,
            Key: `${dir}${hashedFileName}`,
            Expires: EXPIRE_TIME
        });
        
        return res.json(
                new SuccessResponse({
                    signedUrl,
                    expireTime: EXPIRE_TIME
                })
            );
    } catch (e) {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    }
});

router.get('/getPutObjectSignedUrl', (req, res, next) => {
    let {dir, hashedFileName, fileType} = req.query;
    try {
        const signedUrl = s3.getSignedUrl('putObject', {
            Bucket: BUCKET_NAME,
            Key: `${dir}${hashedFileName}`,
            Expires: EXPIRE_TIME,
            ContentType: fileType
        });
        return res.json(
                new SuccessResponse({
                    signedUrl,
                    expireTime: EXPIRE_TIME
                })
            );
    } catch (e) {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    }
});




module.exports = router;
