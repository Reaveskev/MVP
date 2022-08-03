DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workouts ;


CREATE TABLE users (
    user_id SERIAL,
    username TEXT PRIMARY KEY,
    name TEXT,
    weight TEXT,
    sex TEXT,
    age INTEGER
);

CREATE TABLE workouts (
    workout_id SERIAL,
    name TEXT,
    weight TEXT,
    sets INTEGER,
    reps INTEGER,
    username TEXT REFERENCES users(username)
    ON DELETE CASCADE
);



INSERT INTO users(username, name, weight, sex, age) VALUES ('Kev', 'Kevin', '210 lbs', 'Male', 25);
INSERT INTO users(username, name, weight, sex, age) VALUES ('Kat', 'Katrina', '136 lbs', 'Female', 25);


INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Bench', '275 lbs', 5, 3, 'Kev');
INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Squat', '300 lbs', 5, 3, 'Kev');
INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Bench', '135 lbs', 5, 3, 'Kat');
INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Squat', '225 lbs', 5, 3, 'Kat');
INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Deadlift', '380 lbs', 5, 3, 'Kev');
INSERT INTO workouts(name, weight, sets, reps, username) VALUES ('Deadlift', '300 lbs', 5, 3, 'Kat');

-- psql -f migration.sql MVP