const xss = require('xss')
const { exec } = require('../db/psql')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');;

const getStudentInfoByStudentId = async (student_id) => {
    try {
        let sql = `
        SELECT student.*, class.name AS class_name, class.start_date AS class_start_date, class.end_date AS class_end_date FROM student
        LEFT OUTER JOIN student_class
        ON student_class.student_id = ${student_id}
        JOIN class
        ON class.id = student_class.class_id
        WHERE student.id=${student_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}


module.exports = {
    getStudentInfoByStudentId
}