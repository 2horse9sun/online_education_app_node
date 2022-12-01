const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getAllLessonListByCourseId,
    getLessonDetailByLessonId,
    getLessonFileByLessonId,
    addLesson,
    uploadLessonFile
} = require('../controller/lesson')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getAllLessonListByCourseId', async (req, res, next) => {
    let {course_id} = req.query;
    const result = await getAllLessonListByCourseId(course_id);
    return res.json(result);
});

router.get('/getLessonDetailByLessonId', async (req, res, next) => {
    let {lesson_id} = req.query;
    const result = await getLessonDetailByLessonId(lesson_id);
    return res.json(result);
});

router.get('/getLessonFileByLessonId', async (req, res, next) => {
    let {lesson_id} = req.query;
    const result = await getLessonFileByLessonId(lesson_id);
    return res.json(result);
});

router.post('/addLesson', async (req, res, next) => {
    const name = xss(req.body.name);
    const {content, course_id, teacher_id, release_time} = req.body;
    const result = await addLesson(name, JSON.stringify(content), course_id, teacher_id, release_time);
    return res.json(result);
});

router.post('/uploadLessonFile', async (req, res, next) => {
    const {lesson_id, hashed_file_name, file_type, file_size, owner_user_id} = req.body;
    const file_name = xss(req.body.file_name);
    const result = await uploadLessonFile(lesson_id, file_name, hashed_file_name, file_type, file_size, owner_user_id);
    return res.json(result);
});



module.exports = router;
