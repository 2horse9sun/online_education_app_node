var express = require('express');
var router = express.Router();
const {
    getCourseListByStudentId
} = require('../controller/course')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/getCourseListByStudentId', (req, res, next) => {
    const student_id = req.query.student_id
    const limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit
    const offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset

    const result = getCourseListByStudentId(student_id, limit, offset)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData.rows)
        )
    })
    .catch(e => {
        console.log(e)
        res.json(
            new ErrorModel("getCourseListByStudentId fail")
        )
    })
});



module.exports = router;
