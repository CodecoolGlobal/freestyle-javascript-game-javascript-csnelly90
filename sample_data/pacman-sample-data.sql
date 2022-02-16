DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.scores;


CREATE TABLE users (
    id serial CONSTRAINT users_pk PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL
);


CREATE TABLE scores (
    id serial CONSTRAINT scores_pk PRIMARY KEY,
    score integer,
    user_id integer REFERENCES users ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

