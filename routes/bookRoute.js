const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const reviewService = require('../services/reviewService')
const authenticateWithJWT = require('../middlewares/authenticateWithJWT')

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
        const bookReviews= await reviewService.getBookReviews(req.params.bookId);
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

//to fill in book information on review form
router.get("/:bookId/reviews",async (req,res)=>{
    try{
        const bookDetails = await bookService.getBookDetails(req.params.bookId);
        res.json({
            bookDetails
        })  
    }catch(e){
        console.log(e);
    }
});

router.post("/:bookId/reviews", authenticateWithJWT, async(req,res)=>{
    try{
        const newReview = await reviewService.createReview(req.params.bookId, 
                                                            req.userId,
                                                            req.body.rating,
                                                            req.body.review);
        res.status(200).json({
            "message":"New review added"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            "message":e
        })
    }
});

module.exports=router;