const bookData = require('../data/bookData.js');

async function getAllBooks(){
    return await bookData.getAllBooks()
};

async function getBookDetails(bookId){
    return await bookData.getBookDetails(bookId)
};

async function getBookReviews(bookId){
    return await bookData.getBookReviews(bookId)
};

module.exports={getAllBooks, getBookDetails, getBookReviews}