const xss = require('xss')
const { exec } = require('../db/psql')

const getCourseListByStudentId = (student_id, limit, offset) => {
    let sql = `
    SELECT course.* FROM course 
    JOIN student_course 
    ON course.id = student_course.course_id 
    WHERE student_course.student_id=${student_id}
    LIMIT ${limit}
    OFFSET ${offset};
    `;

    return exec(sql);
}

const getAllCourseListByStudentId = (student_id) => {
    let sql = `
    SELECT course.* FROM course 
    JOIN student_course 
    ON course.id = student_course.course_id 
    WHERE student_course.student_id=${student_id}
    ORDER BY course.name; 
    `;

    return exec(sql);
}

const getCourseDetailByCourseId = (course_id) => {
    let sql = `
    SELECT * FROM course
    WHERE id=${course_id}; 
    `;

    return exec(sql);
}

const getCourseThumbnailByCourseId = (course_id) => {
    let sql = `
    SELECT * FROM course_file
    WHERE course_id=${course_id} AND file_name LIKE 'thumbnail.%'; 
    `;

    return exec(sql);
}

const addCourse = (name, content, start_date, end_date) => {
    
    let sql = `
    INSERT INTO course(name, content, start_date, end_date)
    VALUES('${name}','${content}','${start_date}','${end_date}')
    returning id; 
    `;
    
    return exec(sql);
}

const uploadCourseFile = async (course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id) => {
    let sql = `
    INSERT INTO course_file (course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id)
    values ('${course_id}', '${file_name}', '${hashed_file_name}', '${file_type}', '${file_size}', '${owner_user_id}');
    `;

    return exec(sql);
}


module.exports = {
    getCourseListByStudentId,
    getAllCourseListByStudentId,
    getCourseDetailByCourseId,
    getCourseThumbnailByCourseId,
    addCourse,
    uploadCourseFile
}