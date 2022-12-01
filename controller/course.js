const xss = require('xss');
const { exec } = require('../db/psql');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');

const getCourseListByStudentId = async (student_id, limit, offset) => {
    try {
        let sql = `
        SELECT course.* FROM course 
        JOIN student_course 
        ON course.id = student_course.course_id 
        WHERE student_course.student_id=${student_id}
        LIMIT ${limit}
        OFFSET ${offset};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getAllCourseListByStudentId = async (student_id) => {
    try {
        let sql = `
        SELECT course.* FROM course 
        JOIN student_course 
        ON course.id = student_course.course_id 
        WHERE student_course.student_id=${student_id}
        ORDER BY course.name; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getCourseDetailByCourseId = async (course_id) => {
    try {
        let sql = `
        SELECT * FROM course
        WHERE id=${course_id}; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getCourseThumbnailByCourseId = async (course_id) => {
    try {
        let sql = `
        SELECT * FROM course_file
        WHERE course_id=${course_id} AND file_name LIKE 'thumbnail.%'; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const addCourse = async (name, content, start_date, end_date) => {
    try {
        let sql = `
        INSERT INTO course(name, content, start_date, end_date)
        VALUES('${name}','${content}','${start_date}','${end_date}')
        returning id; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const uploadCourseFile = async (course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id) => {
    try {
        let sql = `
        INSERT INTO course_file (course_id, file_name, hashed_file_name, file_type, file_size, owner_user_id)
        values ('${course_id}', '${file_name}', '${hashed_file_name}', '${file_type}', '${file_size}', '${owner_user_id}');
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}


module.exports = {
    getCourseListByStudentId,
    getAllCourseListByStudentId,
    getCourseDetailByCourseId,
    getCourseThumbnailByCourseId,
    addCourse,
    uploadCourseFile
}