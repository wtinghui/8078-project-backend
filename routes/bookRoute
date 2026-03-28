const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService')

router.get("/",async (req, res)=>{
    try{
        const books = await bookService.getAllBooks();
        res.json({books});
    } catch (e){
        console.log(e);
        res.status(500).json({
            "message":"Internal server error"
        });
    }
})

router.get("/:bookId", async (req,res)=>{
    try{
        const bookDetails= await bookService.getBookDetails(req.params.bookId);
        const bookReviews= await bookService.getBookReviews(req.params.bookId);
        console.log(bookDetails);
        console.log(bookReviews);

        res.json({
            "bookDetails":bookDetails,
            "bookReviews":bookReviews
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            "message":"Internal server error"
        })
    }

})

module.exports=router;