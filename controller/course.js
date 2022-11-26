const xss = require('xss')
const { exec } = require('../db/psql')

const getCourseListByStudentId = (student_id, limit, offset) => {
    let sql = `SELECT * FROM course JOIN student_course 
    ON course.id = student_course.course_id 
    WHERE student_course.student_id=${student_id}
    ORDER BY course.name
    LIMIT ${limit}
    OFFSET ${offset}; `;

    return exec(sql);
}


module.exports = {
    getCourseListByStudentId
}