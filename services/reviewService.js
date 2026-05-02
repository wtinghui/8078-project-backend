const reviewData = require('../data/reviewData.js');

async function getBookReviews(bookId){
    return await reviewData.getBookReviews(bookId)
};

async function createReview (bookId, userId, rating, review){
    return await reviewData.createReview(bookId, userId, rating, review)
}

async function getReviewById (reviewId){
    return await reviewData.getReviewById(reviewId)
}

async function editReview (userId, reviewId, {rating, review}){
    //check if user account is the same as user who wrote review
    const reviewDetails = await reviewData.getReviewById(reviewId);
    if (userId !== reviewDetails.user_id){
        throw new Error("Not authorized to modify this review")
    }

    //rating and review cannot be empty
    //to implement check if rating is a float
    if (!rating || !review){
        throw new Error ("Required fields were left empty")
    }

    return await reviewData.editReview(reviewId,{rating, review})
};

async function deleteReview (userId, reviewId){
    const reviewDetails = await reviewData.getReviewById(reviewId);
    if (userId !== reviewDetails.user_id){
        throw new Error("Not authorized to modify this review")
    }

    await reviewData.deleteReview(reviewId);
}

module.exports = {
    getBookReviews,
    createReview,
    getReviewById,
    editReview,
    deleteReview
};