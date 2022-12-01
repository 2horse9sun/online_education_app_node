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


router.get('/getCourseListByStudentId', async (req, res, next) => {
    let {student_id, page_size, page_number} = req.query;
    const result = await getCourseListByStudentId(student_id, page_size, page_number * page_size);
    return res.json(result);
});

router.get('/getAllCourseListByStudentId', async (req, res, next) => {
    let {student_id} = req.query;
    const result = await getAllCourseListByStudentId(student_id);
    return res.json(result);
});

router.get('/getCourseDetailByCourseId', async (req, res, next) => {
    let {course_id} = req.query;
    const result = await getCourseDetailByCourseId(course_id);
    return res.json(result);

});

router.get('/getCourseThumbnailByCourseId', async (req, res, next) => {
    let {course_id} = req.query;
    const result = await getCourseThumbnailByCourseId(course_id);
    return res.json(result);

});

router.post('/addCourse', async (req, res, next) => {
    const name = xss(req.body.name);
    const {content, start_date, end_date} = req.body;
    const result = await addCourse(name, JSON.stringify(content), start_date, end_date);
    return res.json(result);
});

router.post('/uploadCourseFile', async (req, res, next) => {
    const {course_id, hashed_file_name, file_type, file_size, owner_user_id} = req.body;
    const file_name = xss(req.body.file_name);
    const result = await uploadCourseFile(course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id);
    return res.json(result);
});


module.exports = router;
