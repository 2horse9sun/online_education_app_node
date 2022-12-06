require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const blogRouter = require('./routes/blog');

const userAccountRouter = require('./routes/user_account');
const courseRouter = require('./routes/course');
const assignmentRouter = require('./routes/assignment');
const s3Router = require('./routes/s3');
const categoryRouter = require('./routes/category');
const lessonRouter = require('./routes/lesson');

const app = express();


// // logger
// app.use(logger('dev'));
// const logFileName = path.join(__dirname, 'logs', 'access.log')
// const writeStream = fs.createWriteStream(logFileName, {
//   flags: 'a'
// })
// app.use(logger('combined', {
//   stream: writeStream
// }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// const redisClient = require('./db/redis')
// const sessionStore = new RedisStore({
//   client: redisClient
// })
// app.use(session({
//   secret: 'WJiol#23123_',
//   cookie: {
//     // path: '/',   // 默认配置
//     // httpOnly: true,  // 默认配置
//     maxAge: 24 * 60 * 60 * 1000
//   },
//   store: sessionStore
// }))

// Routers
app.use('/api/user_account', userAccountRouter);
app.use('/api/course', courseRouter);
app.use('/api/assignment', assignmentRouter);
app.use('/api/s3', s3Router);
app.use('/api/category', categoryRouter);
app.use('/api/lesson', lessonRouter);

// public resources
// app.use('/public',express.static(__dirname + '/public'))


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = err;

//   res.json({ error: err });
// });

module.exports = app;
