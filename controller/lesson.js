const xss = require('xss')
const { exec } = require('../db/psql')

const getAllLessonListByCourseId = (course_id) => {
    let sql = `
    SELECT * FROM lesson
    WHERE course_id=${course_id};
    `;

    return exec(sql);
}




module.exports = {
    getAllLessonListByCourseId
}