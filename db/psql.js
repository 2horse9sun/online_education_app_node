const Pool = require('pg').Pool;
const { DB_CONFIG } = require('../config/db');

const pool = new Pool(DB_CONFIG);

pool.connect();

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result);
        })
    })
    return promise;
}

module.exports = {
    exec,
    escape: pool.escape
}