const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF;
let REDIS_CONF;
let PSQL_CONF;

if (env === 'dev') {
    // // mysql
    // MYSQL_CONF = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Mysql_2018',
    //     port: '3306',
    //     database: 'myblog'
    // }

    // // redis
    // REDIS_CONF = {
    //     port: 6379,
    //     host: '127.0.0.1'
    // }

    // postgre
    PSQL_CONF = {
        host: 'aalto.c2r0darjhexf.eu-west-1.rds.amazonaws.com',
        user: 'postgres',
        password: 'postgres',
        port: '5432',
        database: 'online_education_app'
    }
}

if (env === 'production') {
    // // mysql
    // MYSQL_CONF = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Mysql_2018',
    //     port: '3306',
    //     database: 'myblog'
    // }

    // // redis
    // REDIS_CONF = {
    //     port: 6379,
    //     host: '127.0.0.1'
    // }

    // postgre
    PSQL_CONF = {
        host: 'aalto.c2r0darjhexf.eu-west-1.rds.amazonaws.com',
        user: 'postgres',
        password: 'postgres',
        port: '5432',
        database: 'online_education_app'
    }
}

module.exports = {
    // MYSQL_CONF,
    // REDIS_CONF,
    PSQL_CONF
}