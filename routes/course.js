const express = require('express');
const router = express.Router();
const {
    getCourseListByStudentId
} = require('../controller/course')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const loginCheck = require('../middleware/loginCheck');


router.get('/getCourseListByStudentId', (req, res, next) => {
    let {student_id, limit, offset} = req.query;
    limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit;
    offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset;

    const result = getCourseListByStudentId(student_id, limit, offset);
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



module.exports = router;
