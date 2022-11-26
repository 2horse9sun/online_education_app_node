var express = require('express');
var router = express.Router();
const {
    getRecentAssignmentListByStudentId,
    getAllAssignmentListByStudentId
} = require('../controller/assignment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


router.get('/getRecentAssignmentListByStudentId', (req, res, next) => {
    const student_id = req.query.student_id
    const limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit
    const offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset

    const result = getRecentAssignmentListByStudentId(student_id, limit, offset)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData.rows)
        )
    })
    .catch(e => {
        console.log(e)
        res.json(
            new ErrorModel("getRecentAssignmentListByStudentId fail")
        )
    })
});

router.get('/getAllAssignmentListByStudentId', (req, res, next) => {
    const student_id = req.query.student_id
    const limit = (req.query.limit === undefined || req.query.limit === "undefined") ? 1000 : req.query.limit
    const offset = (req.query.offset === undefined || req.query.offset === "undefined") ? 0 : req.query.offset

    const result = getAllAssignmentListByStudentId(student_id, limit, offset)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData.rows)
        )
    })
    .catch(e => {
        console.log(e)
        res.json(
            new ErrorModel("getAllAssignmentListByStudentId fail")
        )
    })
});



module.exports = router;
