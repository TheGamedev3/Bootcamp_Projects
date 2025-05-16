

const Book = require("../models/book");

const CorrectBookValues = require('./Validator');
function createOperations(operation, err){

    const validateValues=(jsonBook)=>{
        let invalidValueMsg = CorrectBookValues(jsonBook);
        err(422, invalidValueMsg, typeof invalidValueMsg === 'string');
    }

    const isbnErr=(id)=>err(400, 'An isbn is required!', id === undefined);

    operation('get','/',async(submit)=>{
        const books = await Book.findAll();
        return submit({ books });
    });

    operation('get','/:isbn',async(submit, [{isbn}])=>{
        isbnErr(isbn);
        const book = await Book.findOne(isbn);
        return submit({ book });
    });

    operation('post','/',async(submit,[_, jsonBook])=>{
        err(400, 'A book object is required!', !jsonBook);
        err(422, 'An isbn is required for the book!', !jsonBook.isbn);
        err(422, 'A title is required for the book!', !jsonBook.title);
        validateValues(jsonBook);

        const book = await Book.create(jsonBook);
        return submit(201, { book });
    });

    operation('put',"/:isbn",async(submit,[{isbn}, jsonBook])=>{
        isbnErr(isbn);
        err(400, 'A book object is required!', !jsonBook);
        validateValues(jsonBook);

        const book = await Book.update(isbn, jsonBook);
        return submit({ book });
    });

    operation('delete',"/:isbn",async(submit,[{isbn}])=>{
        isbnErr(isbn);

        await Book.remove(isbn);
        return submit({ message: `Book '${isbn}' deleted` });
    });

}

module.exports = createOperations;