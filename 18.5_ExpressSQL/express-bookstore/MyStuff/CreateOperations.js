


const express = require("express");
const router = new express.Router();

function operation(action, route, apiFunc){
    router[action](route, async function (req, res, next) {
        try {
            
            const submit = (code, data)=>{
                if(data === undefined){data = code; code = undefined}
                if(code){res.status(code).json(data)}
                else{res.json(data)}
            }
            const args = [req.params, req.body];
            await apiFunc(submit, args);
            
        } catch (err) {
            return next(err);
        }
    });
}

const ExpressError = require("../expressError");
function err(status, message, upon){
    if(upon){
        const fail = new ExpressError(message, status);
        throw fail;
    }
}

const createOperations = require('./Operations');
createOperations(operation, err);

module.exports = router;