const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getCourseListByStudentId,
    getAllCourseListByStudentId,
    getCourseDetailByCourseId,
    getCourseThumbnailByCourseId,
    addCourse,
    uploadCourseFile
} = require('../controller/course')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getCourseListByStudentId', (req, res, next) => {
    let {student_id, page_size, page_number} = req.query;
    const result = getCourseListByStudentId(student_id, page_size, page_number * page_size);
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

router.get('/getAllCourseListByStudentId', (req, res, next) => {
    let {student_id} = req.query;
    const result = getAllCourseListByStudentId(student_id);
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

router.get('/getCourseDetailByCourseId', (req, res, next) => {
    let {course_id} = req.query;
    const result = getCourseDetailByCourseId(course_id);
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows[0])
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.get('/getCourseThumbnailByCourseId', (req, res, next) => {
    let {course_id} = req.query;
    const result = getCourseThumbnailByCourseId(course_id);
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows[0])
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.post('/addCourse', (req, res, next) => {
    const name = xss(req.body.name);
    const {content, start_date, end_date} = req.body;
    const result = addCourse(name, JSON.stringify(content), start_date, end_date);
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows[0])
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.post('/uploadCourseFile', (req, res, next) => {
    const {course_id, hashed_file_name, file_type, file_size, owner_user_id} = req.body;
    const file_name = xss(req.body.file_name);
    const result = uploadCourseFile(course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id);
    return result.then(data => {
        res.json(
            new SuccessResponse(data)
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
