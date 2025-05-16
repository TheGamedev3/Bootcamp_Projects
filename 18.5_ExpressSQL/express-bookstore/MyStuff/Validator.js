
const fs = require('fs');
const { validators } = JSON.parse(fs.readFileSync('./MyStuff/Criteria.json', 'utf-8'));

function CorrectBookValues(book){
    const errors = [];

    for (const [key, value] of Object.entries(book)) {
        const rule = validators[key];

        if(!rule){
            errors.push(`${key} isn't a property of a jsonBook!`);
        }else if(rule === 'text'){
            if (typeof value !== 'string') {
                errors.push(`${key} must be a string`);
            }
        }else if(rule === 'positiveInt'){
            if(!Number.isInteger(value) || value <= 0){
                errors.push(`${key} must be a positive integar!`);
            }
        }
    }

    return errors.length > 0 ? errors.join(', ') : true;
}

module.exports = CorrectBookValues;

