CREATE DATABASE playerstatsdb;

CREATE TABLE Players (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    age INT CHECK (age >= 0),
    profile_picture TEXT -- Stores URL or base64-encoded image
);

CREATE TABLE Games (
    game_id SERIAL PRIMARY KEY,
    game_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Player_Stats (
    stat_id SERIAL PRIMARY KEY,
    player_id INT NOT NULL REFERENCES Players(player_id) ON DELETE CASCADE,
    game_id INT NOT NULL REFERENCES Games(game_id) ON DELETE CASCADE,
    hours_played INT DEFAULT 0 CHECK (hours_played >= 0),
    matches_played INT DEFAULT 0 CHECK (matches_played >= 0),
    UNIQUE (player_id, game_id) -- Ensures one entry per player per game
);