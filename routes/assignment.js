const express = require('express');
const router = express.Router();
const {
    getRecentAssignmentListByStudentId,
    getAllAssignmentListByStudentId
} = require('../controller/assignment')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const loginCheck = require('../middleware/loginCheck');
const {S3_CONFIG} = require('../config/s3');
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: S3_CONFIG.S3_ACCESS_KEY_ID, secretAccessKey: S3_CONFIG.S3_SECRET_ACCESS_KEY});
const s3 = new AWS.S3();

const BUCKET_NAME = S3_CONFIG.S3_BUCKET;
const UPLOAD_BASE_URL = 'assignment/upload/';
const EXPIRE_TIME = 60 * 5;

router.get('/getRecentAssignmentListByStudentId', (req, res, next) => {
    let {student_id, limit, offset} = req.query;
    limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit;
    offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset;

    const result = getRecentAssignmentListByStudentId(student_id, limit, offset);
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows)
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.get('/getAllAssignmentListByStudentId', (req, res, next) => {
    let {student_id, limit, offset} = req.query;
    limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit;
    offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset;

    const result = getAllAssignmentListByStudentId(student_id, limit, offset)
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows)
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.get('/getAssignmentFileSignedUrl', (req, res, next) => {
    let {file_name} = req.query;
    try {
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: BUCKET_NAME,
            Key: `${UPLOAD_BASE_URL}${file_name}`,
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




module.exports = router;
