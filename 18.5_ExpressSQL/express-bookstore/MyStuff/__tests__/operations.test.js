

require('../../server');
const API = require('../API');


test('run operations',async()=>{
    const match=(o1,o2)=>{
        expect(JSON.stringify(o1)).toBe(JSON.stringify(o2));
    }

    const book1 = {
        "isbn": "123sbn",
        "amazon_url": "http://amazon_forest",
        "author": "Stanely",
        "language": "english-US",
        "pages": 304,
        "publisher": "Franklin",
        "title": "Stan and Frank",
        "year": 2007
    };
    let data = await API('GET');
    expect(data.books.length).toBe(0);

    await API('POST', '', book1);
    data = await API('GET');
    match(book1, data.books[0]);

    const book1Changes = {
        "pages": 60,
        "publisher": "Franklin N",
        "year": 2006
    };
    await API('PUT', `${book1.isbn}`, book1Changes);
    data = await API('GET');
    match(Object.assign({},book1, book1Changes), data.books[0]);

    // update with bad values/validation
    const book1Changes2 = {
        "pages": 2.3,
        "publisher": 77,
        "year": -4
    };
    const err = await API('PUT', `${book1.isbn}`, book1Changes2, {});
    const expectGlitch = 'pages must be a positive integar!, publisher must be a string, year must be a positive integar!';
    const status = err.response?.status;
    const message = err.response?.data?.message;
    expect(message.includes(expectGlitch)).toBeTruthy();
    expect(status).toBe(422);

    const book2 = {
        "isbn": "123sbn444",
        "amazon_url": "http://googleSite",
        "author": "Mike",
        "language": "english-US",
        "pages": 132,
        "publisher": "Tom",
        "title": "Windmills",
        "year": 2018
    };
    await API('POST', '', book2);
    data = await API('GET');
    match(data.books[1], book2);

    expect(data.books.length).toBe(2);
    await API('DELETE',`${book1.isbn}`);
    await API('DELETE',`${book2.isbn}`);
    data = await API('GET');
    expect(data.books.length).toBe(0);
});

// to reset the databases, ' psql -U postgres -f "./data.sql" '