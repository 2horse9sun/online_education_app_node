const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getAllLessonListByCourseId
} = require('../controller/lesson')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getAllLessonListByCourseId', (req, res, next) => {
    let {course_id} = req.query;
    const result = getAllLessonListByCourseId(course_id);
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
