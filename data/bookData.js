const pool = require('../database');

async function getAllBooks(){
    const query = `SELECT q.book_id, book_title, GROUP_CONCAT(DISTINCT(author_name)) AS authors, GROUP_CONCAT(DISTINCT(genre_name)) AS genres, avg_ratings, no_of_ratings
                FROM (
                    SELECT books.book_id, book_title, ROUND(AVG(ratings),1) AS avg_ratings, COUNT(review_id) AS no_of_ratings FROM books
                    LEFT JOIN reviews ON books.book_id=reviews.book_id
                    GROUP BY books.book_id, book_title
                ) AS q
                JOIN author_book ON q.book_id = author_book.book_id
                JOIN authors ON author_book.author_id = authors.author_id
                JOIN book_genre ON q.book_id = book_genre.book_id
                JOIN genres ON book_genre.genre_id = genres.genre_id
                GROUP BY q.book_id, book_title, avg_ratings, no_of_ratings`;

    const [books] = await pool.execute(query);
    return books;
}

async function getBookDetails(bookId){
    const bookDetailsQuery = `SELECT books.book_id, book_title, book_description, GROUP_CONCAT(DISTINCT(author_name)) AS authors, GROUP_CONCAT(DISTINCT(genre_name)) AS genres FROM books 
                    JOIN author_book ON books.book_id = author_book.book_id
                    JOIN authors ON author_book.author_id = authors.author_id
                    JOIN book_genre ON books.book_id = book_genre.book_id
                    JOIN genres ON book_genre.genre_id = genres.genre_id
                    WHERE books.book_id = ?`;

    const [rows] = await pool.execute(bookDetailsQuery,[bookId]);
    const bookDetails = rows[0];

    return bookDetails;
}

async function getBookReviews(bookId){
    const bookReviewsQuery = `SELECT review_id, username, ratings, reviews, TIMESTAMPDIFF(HOUR, last_modified, NOW()) AS duration FROM reviews 
                            LEFT JOIN users ON reviews.user_id = users.user_id
                            WHERE book_id =? `;

    const [rows] = await pool.execute(bookReviewsQuery,[bookId]);
    const bookReviews = rows[0];

    return bookReviews;
}

module.exports={getAllBooks, getBookDetails, getBookReviews };