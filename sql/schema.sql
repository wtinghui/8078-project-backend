CREATE DATABASE book_tracker;

USE book_tracker;

CREATE TABLE authors (
    author_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE genres (
    genre_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(25) NOT NULL
);

CREATE TABLE books (
    book_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    book_title VARCHAR(255) NOT NULL,
    book_description TEXT
);

CREATE TABLE author_book (
    author_book_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    author_id INT UNSIGNED NOT NULL,
    book_id INT UNSIGNED NOT NULL,

    FOREIGN KEY (author_id) REFERENCES authors(author_id)
    ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
    ON DELETE CASCADE
);

CREATE TABLE book_genre (
     book_genre_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     book_id INT UNSIGNED NOT NULL,
     genre_id INT UNSIGNED NOT NULL,

     FOREIGN KEY (book_id) REFERENCES books(book_id)
     ON DELETE CASCADE,
     FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE users (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_of_birth DATE,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE(),
    user_type VARCHAR(50) NOT NULL DEFAULT "user"
);

CREATE TABLE reviews (
    review_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    book_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED,
    ratings FLOAT(2,1) NOT NULL,
    reviews TEXT NOT NULL,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE(),
    last_modified DATETIME NOT NULL,

    FOREIGN KEY (book_id) REFERENCES books(book_id)
    ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);