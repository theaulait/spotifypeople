DROP TABLE IF EXISTS person;
CREATE TABLE person(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    favoriteCity VARCHAR(150)
                    );

INSERT INTO person(name, favoriteCity)
      VALUES ('Sean', 'New York');
