const xss = require('xss')
const { exec } = require('../db/psql')

const getRecentAssignmentListByStudentId = (student_id, limit, offset) => {
    let sql = `SELECT 
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
    ORDER BY assignment.release_time
    LIMIT ${limit}
    OFFSET ${offset}; `;

    return exec(sql);
}

const getAllAssignmentListByStudentId = (student_id, limit, offset) => {
    let sql = `SELECT 
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
    ORDER BY assignment.release_time
    LIMIT ${limit}
    OFFSET ${offset}; `;

    return exec(sql);
}

const uploadAssignmentFile = (body) => {
    const {assignment_id, hashed_file_name, file_type, file_size, owner_user_id} = body;
    const file_name = xss(body.file_name);
    let sql = `INSERT INTO assignment_file (assignment_id, file_name, hashed_file_name, file_type, file_size, owner_user_id)
    values ('${assignment_id}', '${file_name}', '${hashed_file_name}', '${file_type}', '${file_size}', '${owner_user_id}');`;

    return exec(sql);
}


module.exports = {
    getRecentAssignmentListByStudentId,
    getAllAssignmentListByStudentId,
    uploadAssignmentFile
}