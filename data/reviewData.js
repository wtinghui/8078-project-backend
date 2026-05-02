const pool = require('../database');

async function getBookReviews(bookId){
    const bookReviewsQuery = `SELECT review_id, username, ratings, reviews, TIMESTAMPDIFF(HOUR, last_modified, NOW()) AS duration FROM reviews 
                            LEFT JOIN users ON reviews.user_id = users.user_id
                            WHERE book_id =? `;

    const [rows] = await pool.execute(bookReviewsQuery,[bookId]);
    const bookReviews = rows[0];

    return [bookReviews];
}

async function createReview(bookId, userId, rating, review){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        const sql = `INSERT INTO reviews (book_id, user_id, ratings, reviews, date_created, last_modified) 
                    VALUE (?,?,?,?,NOW(),NOW()) `;
        const bindings = [bookId, userId, rating, review];
        await connection.execute (sql, bindings);
        await connection.commit();
    } catch(e){
        await connection.rollback();
        console.log(e);
    } finally {
        connection.release();
    }
};

async function getReviewById (reviewId){
    const query = `SELECT * FROM reviews WHERE review_id=?`

    const [rows]= await pool.execute(query,[reviewId])
    return rows[0]
}

async function editReview (reviewId, {rating, review}){
    try{
        const query = `UPDATE reviews 
                    SET ratings = ?,
                    reviews = ?
                    WHERE review_id =?`

        const bindings = [rating, review, reviewId];
        await pool.execute(query, bindings)
    } catch (e){
        console.log(e);
    }
};

async function deleteReview (reviewId){
    try{
        const query = `DELETE reviews WHERE review_id =?`;
        await pool.execute(query,[reviewId])
    } catch (e){
        console.log(e)
    }
};

module.exports={
    getBookReviews,
    createReview,
    getReviewById,
    editReview,
    deleteReview
}