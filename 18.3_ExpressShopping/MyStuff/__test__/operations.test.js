

const lists = require('../ShopListAPI');
const { shopFor, expectError } = require('../ExternalAccess');

test('get items', async() => {
    const match=(o1,o2)=>{
        expect(JSON.stringify(o1)).toBe(JSON.stringify(o2));
    }
    const doesMatch=async()=>{
        const items = await shopFor('GET', 'items');
        match(items, lists.items);
    }

    await doesMatch();

    const newItem = {name:'jar of pickles', cost: 10.50};
    const createdItem = await shopFor('POST', 'items', newItem);
    match(createdItem, newItem);

    await doesMatch();

    const newPrice = 10;
    let current = await shopFor('GET', 'items', 'boxes');
    expect(current.price).not.toBe(newPrice);
    current = await shopFor('PATCH', 'items', 'boxes', {price: newPrice});
    expect(current.price).toBe(newPrice);

    const itemsStart = (await shopFor('GET', 'items')).length;

        expect(await shopFor('GET', 'items', 'boxes')).toBeTruthy();
        expect(await shopFor('GET', 'items', 'jar of pickles')).toBeTruthy();

    await shopFor('DELETE', 'items', 'jar of pickles');
    const itemsEnd = (await shopFor('GET', 'items')).length;
    
        expect(await shopFor('GET', 'items', 'boxes')).toBeTruthy();
        expect(await expectError('GET', 'items', 'jar of pickles')).toBeFalsy();

    expect(itemsStart).toBeGreaterThan(itemsEnd);
});

