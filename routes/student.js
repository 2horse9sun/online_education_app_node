const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getStudentInfoByStudentId
} = require('../controller/student')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getStudentInfoByStudentId', async (req, res, next) => {
    let {student_id} = req.query;
    const result = await getStudentInfoByStudentId(student_id);
    return res.json(result);
});




module.exports = router;
