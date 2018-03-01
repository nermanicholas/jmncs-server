

CREATE TABLE attraction
(
   id serial PRIMARY KEY NOT NULL,
   attraction_id int UNIQUE NOT NULL,
   name text NOT NULL,
   latittude real NOT NULL,
   longitutde real NOT NULL,
   type text NOT NULL,
   availability text NOT NULL,
   address text NOT NULL,
   phone_number int,
   rating int NOT NULL,
   reviews text ARRAY,
   phone_number int
)