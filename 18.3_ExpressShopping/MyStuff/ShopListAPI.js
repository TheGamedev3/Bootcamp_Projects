

const {defineOperation} = require('./Router');

const shopListDB = require('./fakeDb');
const lists={items:shopListDB};

// starter data
shopListDB.push({name: 'boxes', price:1.40});

function getList(list, err){
    const found = lists[list];
    if(!list){err(503, `no list provided! try '/items'`)}
    if(!found){err(404, `no list named '${list}'`)}
    return found;
}
function findEntry(array, itemName){
    return array.find(({name})=>itemName===name);
}

defineOperation('GET',({
    args: [[list, itemName]],
    result, err
})=>{
    const array = getList(list, err);
    if(itemName){
        const obj = findEntry(array, itemName)
        if(!obj){err(404, `no item named '${itemName}' was found`)}
        return result(obj);
    }else{
        return result(array);
    }
});

defineOperation('POST',({
    args: [[list, itemName], jsonObject],
    result, err
})=>{
    if(!jsonObject){err(503, `requires a json item!`)}
    const array = getList(list, err);

    const itemNameFound = itemName || jsonObject.name;
    if(!jsonObject.name){jsonObject.name = itemName}
    if(!itemNameFound){err(503, `json item requires a name!`)}

    const obj = findEntry(array, itemNameFound);
    if(obj){err(503, `there's already an item named '${itemNameFound}'`)}

    array.push(jsonObject);
    return result(jsonObject);
});

defineOperation('PATCH',({
    args: [[list, itemName],jsonObject],
    result, err
})=>{
    if(!itemName){err(503, 'an itemName param is needed!')}
    const array = getList(list, err);
    const obj = findEntry(array, itemName);
    if(!obj){err(404, `no item named '${itemName}' was found`)}
    Object.assign(obj, jsonObject);
    return result(obj);
});

defineOperation('DELETE',({
    args: [[list, itemName]],
    result, err
})=>{
    if(!itemName){err(503, 'an itemName param is needed!')}
    const array = getList(list, err);
    const obj = findEntry(array, itemName);
    if(!obj){err(404, `no item named '${itemName} was found`)}
    const i = array.indexOf(obj);
    array.splice(i,1);
    return result(array);
});

module.exports = lists;
