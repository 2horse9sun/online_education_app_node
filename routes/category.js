const xss = require('xss');
const express = require('express');
const router = express.Router();
const {
    getAllCategory,
    addCategory
} = require('../controller/category')
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getAllCategory', (req, res, next) => {
    const result = getAllCategory();
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows)
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});

router.post('/addCategory', (req, res, next) => {
    const name = xss(req.body.name);
    const result = addCategory(name);
    return result.then(data => {
        res.json(
            new SuccessResponse(data.rows)
        );
    })
    .catch(e => {
        console.log(e);
        res.json(
            new ErrorResponse(e)
        );
    })
});



module.exports = router;
