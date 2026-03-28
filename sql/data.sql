USE book_tracker;

INSERT INTO genres (genre_name) VALUE
    ("Young Adult"),
    ("Fantasy"),
    ("Horror"),
    ("Mystery/Thriller"),
    ("Romance");

INSERT INTO authors(author_name) VALUE
    ("J.K.Rowling"),
    ("Jane Austen"),
    ("Stephen King"),
    ("Diana Wynne Jones");

INSERT INTO books(book_title, book_description) VALUES
    ("Harry Potter and the Philosopher's Stone",
    "A young boy discovers that he is a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry, where he uncovers secrets about his past and his connection to a dark force."),
    ("Pride and Prejudice",
    "A witty and heartfelt story about love, misunderstandings, and social class, centered on the strong-willed Elizabeth Bennet and the reserved Mr. Darcy."),
    ("It",
    "A group of children face a terrifying, shape-shifting clown that haunts their town and feeds on fear."),
    ("Howl's Moving Castle",
    "A young woman cursed with an old body seeks refuge in a wandering castle owned by a dramatic wizard, leading to a whimsical adventure filled with magic and humor.");

INSERT INTO author_book (author_id, book_id) VALUE
    ((SELECT author_id FROM authors WHERE author_name="J.K.Rowling"),
    (SELECT book_id FROM books WHERE book_title="Harry Potter and the Philosopher's Stone")),
    ((SELECT author_id FROM authors WHERE author_name="Jane Austen"),
    (SELECT book_id FROM books WHERE book_title="Pride and Prejudice")),
    ((SELECT author_id FROM authors WHERE author_name="Stephen King"),
    (SELECT book_id FROM books WHERE book_title="It")),
    ((SELECT author_id FROM authors WHERE author_name="Diana Wynne Jones"),
    (SELECT book_id FROM books WHERE book_title="Howl's Moving Castle"));


INSERT INTO book_genre (book_id, genre_id) VALUE
    ((SELECT book_id FROM books WHERE book_title="Harry Potter and the Philosopher's Stone"),
    (SELECT genre_id FROM genres WHERE genre_name="Young Adult")),
    ((SELECT book_id FROM books WHERE book_title="Harry Potter and the Philosopher's Stone"),
    (SELECT genre_id FROM genres WHERE genre_name="Fantasy")),
    ((SELECT book_id FROM books WHERE book_title="Pride and Prejudice"),
    (SELECT genre_id FROM genres WHERE genre_name="Romance")),
    ((SELECT book_id FROM books WHERE book_title="It"),
    (SELECT genre_id FROM genres WHERE genre_name="Horror")),
    ((SELECT book_id FROM books WHERE book_title="Howl's Moving Castle"),
    (SELECT genre_id FROM genres WHERE genre_name="Fantasy")),
    ((SELECT book_id FROM books WHERE book_title="Howl's Moving Castle"),
    (SELECT genre_id FROM genres WHERE genre_name="Romance"));


INSERT INTO users(username, email, date_of_birth) VALUE 
    ("hannah.haze","hannah@example.com","1985-04-18"),
    ("ryanverse","ryan@example.com","1992-09-27"),
    ("sophiecloud","sophie@example.com","1998-12-05");

INSERT INTO reviews(book_id, user_id, ratings, reviews, date_created, last_modified) VALUE
    ((SELECT book_id FROM books WHERE book_title="Harry Potter and the Philosopher's Stone"),
    (SELECT user_id FROM users WHERE username="hannah.haze"),
    5.0, "Magical and immersive.","2026-02-28 13:00:00","2026-02-28 13:00:00"
    ),
    ((SELECT book_id FROM books WHERE book_title="Harry Potter and the Philosopher's Stone"),
    (SELECT user_id FROM users WHERE username="ryanverse"),
    4.0, "An enjoyable read that sparks the imagination from start to finish.","2026-02-28 13:00:00","2026-02-28 13:00:00"
    ),
    ((SELECT book_id FROM books WHERE book_title="It"),
    (SELECT user_id FROM users WHERE username="sophiecloud"),
    3.0, "Terrifying.","2026-02-28 13:00:00","2026-02-28 13:00:00"
    );