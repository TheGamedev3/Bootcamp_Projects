




const express = require('express');
const app = express();

let port = 3023;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const operations = {};
function defineCmd(operation, ...execute){
    if(execute.length === 1){
        operations[operation] = execute[0];
    }
    app.get(`/${operation}`, (req, res) => {
        let numbers = null;
        try{
            if(operation !== 'unitTests'){
                const nums = req.query.nums;
                if(nums === undefined){throw new Error("(input fail) MISSING THE 'nums=' ARRAY!")}
                numbers = nums.split(',').map(char=>{
                    const numb = Number(char);
                    if(Number.isNaN(numb)){throw new Error(`(input fail) "${char}" ISNT A NUMBER!`)}
                    return numb;
                });
            }
            const response = {operation};
            const values = execute.map(func=>func(numbers));
            if(values.length === 1){response.value = values[0][1]}
            else if(values.length > 1){Object.assign(response, Object.fromEntries(values))}
            res.send(`OUTPUT:\n${JSON.stringify(response,null,2)}`);
        }catch(e){
            res.status(400).send(`400 Bad Request:\n${e.message}`);
        }
    });
}

defineCmd('', ()=>console.log('Hello World!'));

defineCmd('mean', (numbers)=>{
    const size = numbers.length;
    if(size === 0){return null}
    let sum = 0;
    numbers.forEach(n=>sum+=n);
    return ['mean', sum/size];
});
defineCmd('median', (numbers)=>{
    const size = numbers.length;
    if(size === 0){return null}
    const regular = size/2;
    const above = Math.ceil(size/2);

    // REMEMBER TO REORDER THE NUMBERS FIRST!
    numbers.sort((a, b) => a - b);
    
    let result = null;
    if(above !== regular){result = numbers[above-1]}
    else{result = (numbers[above-1]+numbers[above])/2}
    return ['median', result];
});
defineCmd('mode', (numbers)=>{
    const size = numbers.length;
    if(size === 0){return null}
    const occurances = {};
    numbers.forEach(numb => {
        occurances[numb] ??= 0;
        occurances[numb] += 1;
    });
    let greatest = null;
    Object.entries(occurances).forEach(pair=>{
        const[number, times]=pair;
        if(greatest === null || times > greatest[0][1]){greatest=[pair]}
        else if(times === greatest[0][1]){greatest.push(pair)}
    });
    greatest = greatest.map(([numb])=>Number(numb));

    let result = null;
    if(greatest === null || greatest.length === 0){result = 'No Mode!'}
    else if(greatest.length === 1){result = greatest[0]}
    else{result = greatest}
    return ['mode', result];
});

defineCmd('all',
    operations.mean,
    operations.median,
    operations.mode
);

const defaultValues = [30,5,90,3,3];
defineCmd('unitTests',
    ()=>{
        return[`default values: ?nums=${defaultValues.join(',')}\nexpecting...`,'{mean of 26.2, mode of 3, median of 5}'];
    },
    ()=>operations.mean(defaultValues),
    ()=>operations.median(defaultValues),
    ()=>operations.mode(defaultValues)
);