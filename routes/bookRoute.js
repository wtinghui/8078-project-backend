const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService')

router.get("/", async function(req,res){
    try{
        const books = await bookService.getAllBooks();
        console.log(books);
        res.status(200).json(books);
    }catch(e){
        console.log(e);
        res.status(500).json({
            "message":"Internal server error"
        })
    }
});

router.get("/:bookId",async function (req,res){
    try{
        const bookId = req.params.bookId
        const bookDetails = await bookService.getBookDetails(bookId);
        const bookReviews = await bookService.getBookReviews(bookId);

        res.status(200).json({
            "bookDetails":bookDetails,
            "bookReviews": bookReviews
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            "message":"Internal server error"
        })
    }
});

module.exports = router;