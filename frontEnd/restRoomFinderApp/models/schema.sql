-- schema for ceating the database

DROP DATABASE IF EXISTS restRoomFinder;

CREATE DATABASE restRoomFinder;

USE restRoomFinder;

DROP TABLE IF EXISTS bathrooms;

CREATE TABLE bathrooms (
ID INT AUTO_INCREMENT NOT NULL,
gender VARCHAR(100) NOT NULL,
latitude DECIMAL(9,5),
longitude DECIMAL(9,5),
location VARCHAR(100),
rating INT NOT NULL,
PRIMARY KEY (id)
);