const xss = require('xss');
const { exec, escape } = require('../db/psql');
const { genPassword } = require('../utils/cryp');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');

const getUserInfoByUserId = async (user_id) => {
    try {
        let sql = `
        SELECT * FROM user_account
        WHERE id=${user_id};
        `;
        let res = await exec(sql);
        return new SuccessResponse(res.rows[0]);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}



const login = (username, password) => {
    username = escape(username)
    
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    getUserInfoByUserId,
    login
}