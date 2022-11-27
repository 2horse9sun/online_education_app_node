const Pool = require('pg').Pool
const { DB_CONFIG } = require('../config/db')

// 创建链接对象
const pool = new Pool(DB_CONFIG)

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