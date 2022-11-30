const xss = require('xss');
const { exec } = require('../db/psql');

const getAllCategory = (student_id, limit, offset) => {
    let sql = `SELECT * FROM category`;

    return exec(sql);
}

const addCategory = (name) => {
    let sql = `INSERT INTO category(name) VALUES('${name}')`;

    return exec(sql);
}


module.exports = {
    getAllCategory,
    addCategory
}