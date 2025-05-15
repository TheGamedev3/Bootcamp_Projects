

const express = require('express');
const APIroutes = express();

let port = 3023;
APIroutes.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

APIroutes.use(express.json());

APIroutes.get((req, res, next) => {
    return next();
});

const ops={};
APIroutes.get('/:route/*tail', async(req, res, next) => {
    const route = req.params.route.toLowerCase();
    if (ops[route]) {
        try {
            let giveResult = null;
            await ops[route]({
                route,
                args:[req.params.tail, req.body],

                result:(object)=>giveResult=()=>res.json(object),
                page:(html)=>giveResult=()=>res.send(html),
                err:(status, msg)=>{next({status, msg}); throw Error(msg)}
            });
            if(giveResult!==null){return giveResult()}
        } catch (err) {
            return next({ status: 500, msg: err.message });
        }
    }
});

APIroutes.use((req, res, next) => {
    return next({status:404, msg:'no returned result!'});
});

APIroutes.use((err, req, res, next) => {
    return res.status(err.status).json(err);
});

function defineOperation(command, func){
    ops[command.toLowerCase()] = func;
}
module.exports = {port, defineOperation};
