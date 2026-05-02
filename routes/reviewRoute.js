const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewService');
const authenticateWithJWT = require('../middlewares/authenticateWithJWT')

router.get("/:reviewId", async (req, res)=>{
    try{
        const review = await reviewService.getReviewById(req.params.reviewId);
        res.status(200).json({
            review
        });
    } catch(e){
        console.log(e);
        res.status(500).json({
            "error":e.message
        })
    }
})

router.put("/:reviewId", authenticateWithJWT, async (req,res)=>{
    try{
        await reviewService.editReview(
                        req.userId,
                        req.params.reviewId,
                        req.body);
        res.status(200).json({
            "message":"Review edited successfully"
        });
    }catch (e){
        console.log(e);
        res.status(500).json({
            "error":e.message
        })
    }
});

router.delete("/:reviewId", authenticateWithJWT, async (req,res)=>{
    try{
        await reviewService.deleteReview(req.userId, req.params.reviewId)
        res.status(200).json({
            "message":"Review has been deleted"
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            "error":e.message
        })
    } 
} )


module.exports=router;