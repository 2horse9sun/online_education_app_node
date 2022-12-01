const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getAllAssignmentListByStudentIdAndCourseId,
    getAssignmentDetailByStudentIdAndAssignmentId,
    getAssignmentFileByAssignmentId,
    getAllRecentAssignmentListByStudentId,
    getAllAssignmentListByStudentId,
    addAssignment,
    uploadAssignmentFile
} = require('../controller/assignment')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {S3_CONFIG} = require('../config/s3');
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: S3_CONFIG.S3_ACCESS_KEY_ID, secretAccessKey: S3_CONFIG.S3_SECRET_ACCESS_KEY});
const s3 = new AWS.S3();

const BUCKET_NAME = S3_CONFIG.S3_BUCKET;
const UPLOAD_BASE_URL = 'assignment/upload/';
const EXPIRE_TIME = 60 * 5;

router.get('/getAllAssignmentListByStudentIdAndCourseId', async (req, res, next) => {
    let {student_id, course_id} = req.query;
    const result = await getAllAssignmentListByStudentIdAndCourseId(student_id, course_id);
    return res.json(result);
});

router.get('/getAssignmentDetailByStudentIdAndAssignmentId', async (req, res, next) => {
    let {student_id, assignment_id} = req.query;
    const result = await getAssignmentDetailByStudentIdAndAssignmentId(student_id, assignment_id);
    return res.json(result);
});

router.get('/getAssignmentFileByAssignmentId', async (req, res, next) => {
    let {assignment_id} = req.query;
    const result = await getAssignmentFileByAssignmentId(assignment_id);
    return res.json(result);
});

router.get('/getAllRecentAssignmentListByStudentId', async (req, res, next) => {
    let {student_id} = req.query;
    const result = await getAllRecentAssignmentListByStudentId(student_id);
    return res.json(result);
});

router.get('/getAllAssignmentListByStudentId', async (req, res, next) => {
    let {student_id} = req.query;
    const result = await getAllAssignmentListByStudentId(student_id)
    return res.json(result);
});

router.post('/addAssignment', async (req, res, next) => {
    const title = xss(req.body.title);
    const {content, course_id, owner_user_id, due_time, release_time} = req.body;
    const result = await addAssignment(title, JSON.stringify(content), course_id, owner_user_id, due_time, release_time);
    return res.json(result);
});

router.post('/uploadAssignmentFile', async (req, res, next) => {
    const {assignment_id, hashed_file_name, file_type, file_size, owner_user_id} = req.body;
    const file_name = xss(req.body.file_name);
    const result = await uploadAssignmentFile(assignment_id, file_name, hashed_file_name, file_type, file_size, owner_user_id);
    return res.json(result);
});






module.exports = router;
