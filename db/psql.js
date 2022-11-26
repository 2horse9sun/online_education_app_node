const Pool = require('pg').Pool
const { PSQL_CONF } = require('../conf/db')

// 创建链接对象
const pool = new Pool(PSQL_CONF)

// 开始链接
pool.connect()

// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: pool.escape
}