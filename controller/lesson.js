const xss = require('xss')
const { exec } = require('../db/psql')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');;

const getAllLessonListByCourseId = async (course_id) => {
    try {
        let sql = `
        SELECT * FROM lesson
        WHERE course_id=${course_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getLessonDetailByLessonId = async (lesson_id) => {
    try {
        let sql = `
        SELECT * FROM lesson
        WHERE id=${lesson_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getLessonFileByLessonId = async (lesson_id) => {
    try {
        let sql = `
        SELECT *
        FROM lesson_file
        WHERE lesson_file.lesson_id = ${lesson_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const addLesson = async (name, content, course_id, teacher_id, release_time) => {
    try {
        let sql = `
        INSERT INTO lesson(name, content, course_id, teacher_id, release_time)
        VALUES('${name}','${content}','${course_id}','${teacher_id}','${release_time}')
        returning id; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const uploadLessonFile = async (lesson_id, file_name, hashed_file_name, file_type, file_size, owner_user_id) => {
    try {
        let sql = `
        INSERT INTO lesson_file (lesson_id, file_name, hashed_file_name, file_type, file_size, owner_user_id)
        values ('${lesson_id}', '${file_name}', '${hashed_file_name}', '${file_type}', '${file_size}', '${owner_user_id}');
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

module.exports = {
    getAllLessonListByCourseId,
    getLessonDetailByLessonId,
    getLessonFileByLessonId,
    addLesson,
    uploadLessonFile
}