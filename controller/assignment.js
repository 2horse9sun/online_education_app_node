const xss = require('xss');
const { exec } = require('../db/psql');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');;

const getAllAssignmentListByStudentIdAndCourseId = async (student_id, course_id) => {
    try {
        let sql = `
        SELECT 
        assignment.*, 
        assignment_submission.assignment_id AS assignment_submission_id,
        assignment_submission.create_time AS assignment_submission_time,
        assignment_grade.id AS assignment_grade_id,
        assignment_grade.create_time AS assignment_grade_time
        FROM assignment 
        LEFT OUTER JOIN assignment_submission
        ON assignment_submission.assignment_id = assignment.id AND assignment_submission.student_id = ${student_id} 
        LEFT OUTER JOIN assignment_grade
        ON assignment_grade.assignment_submission_id = assignment_submission.id AND assignment_grade.release_time < NOW()
        WHERE assignment.course_id = ${course_id}
        AND assignment.release_time IS NOT NULL
        AND assignment.release_time < NOW()
        ORDER BY assignment.release_time; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getAssignmentDetailByStudentIdAndAssignmentId = async (student_id, assignment_id) => {
    try {
        let sql = `
        SELECT 
        assignment.*, 
        assignment_submission.assignment_id AS assignment_submission_id,
        assignment_submission.create_time AS assignment_submission_time,
        assignment_grade.id AS assignment_grade_id,
        assignment_grade.create_time AS assignment_grade_time
        FROM assignment 
        LEFT OUTER JOIN assignment_submission
        ON assignment_submission.assignment_id = assignment.id AND assignment_submission.student_id = ${student_id} 
        LEFT OUTER JOIN assignment_grade
        ON assignment_grade.assignment_submission_id = assignment_submission.id AND assignment_grade.release_time < NOW()
        LEFT OUTER JOIN assignment_file
        ON assignment_file.assignment_id = assignment.id 
        WHERE assignment.id = ${assignment_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getAssignmentFileByAssignmentId = async (assignment_id) => {
    try {
        let sql = `
        SELECT *
        FROM assignment_file
        WHERE assignment_file.assignment_id = ${assignment_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}


const getAllRecentAssignmentListByStudentId = async (student_id) => {
    try {
        let sql = `
        SELECT 
        assignment.*, 
        course.name AS course_name, 
        assignment_submission.assignment_id AS assignment_submission_id,
        assignment_submission.create_time AS assignment_submission_time,
        assignment_grade.id AS assignment_grade_id,
        assignment_grade.create_time AS assignment_grade_time
        FROM assignment 
        JOIN course
        ON assignment.course_id = course.id 
        JOIN student_course
        ON course.id = student_course.course_id
        LEFT OUTER JOIN assignment_submission
        ON assignment_submission.assignment_id = assignment.id AND assignment_submission.student_id = ${student_id} 
        LEFT OUTER JOIN assignment_grade
        ON assignment_grade.assignment_submission_id = assignment_submission.id AND assignment_grade.release_time < NOW()
        WHERE student_course.student_id=${student_id}
        AND assignment.release_time IS NOT NULL
        AND assignment.release_time < NOW()
        AND (assignment.due_time IS NULL OR NOW() < assignment.due_time + interval '7 day') 
        ORDER BY assignment.release_time; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const getAllAssignmentListByStudentId = async (student_id) => {
    try {
        let sql = `
        SELECT 
        assignment.*, 
        course.name AS course_name, 
        assignment_submission.assignment_id AS assignment_submission_id,
        assignment_submission.create_time AS assignment_submission_time,
        assignment_grade.id AS assignment_grade_id,
        assignment_grade.create_time AS assignment_grade_time
        FROM assignment 
        JOIN course
        ON assignment.course_id = course.id 
        JOIN student_course
        ON course.id = student_course.course_id
        LEFT OUTER JOIN assignment_submission
        ON assignment_submission.assignment_id = assignment.id AND assignment_submission.student_id = ${student_id} 
        LEFT OUTER JOIN assignment_grade
        ON assignment_grade.assignment_submission_id = assignment_submission.id AND assignment_grade.release_time < NOW()
        WHERE student_course.student_id=${student_id}
        AND assignment.release_time IS NOT NULL
        AND assignment.release_time < NOW()
        ORDER BY assignment.release_time; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const addAssignment = async (title, content, course_id, owner_user_id, due_time, release_time) => {
    try {
        let sql = `
        INSERT INTO assignment(title, content, course_id, owner_user_id, due_time, release_time)
        VALUES('${title}','${content}','${course_id}','${owner_user_id}','${due_time}','${release_time}')
        returning id; 
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}

const uploadAssignmentFile = async (assignment_id, file_name, hashed_file_name, file_type, file_size, owner_user_id) => {
    try {
        let sql = `
        INSERT INTO assignment_file (assignment_id, file_name, hashed_file_name, file_type, file_size, owner_user_id)
        values ('${assignment_id}', '${file_name}', '${hashed_file_name}', '${file_type}', '${file_size}', '${owner_user_id}');
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}


module.exports = {
    getAllAssignmentListByStudentIdAndCourseId,
    getAssignmentDetailByStudentIdAndAssignmentId,
    getAssignmentFileByAssignmentId,
    getAllRecentAssignmentListByStudentId,
    getAllAssignmentListByStudentId,
    addAssignment,
    uploadAssignmentFile
}