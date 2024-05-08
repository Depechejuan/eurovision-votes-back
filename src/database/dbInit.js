"use strict";

require("dotenv").config();
const addCountries = require("./add-countries");
const { createPool } = require("./mysql-connection");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const dbInit = async () => {
    const pool = createPool();
    console.log("Deleting previous data...");
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    console.log("Database successfuly deleted");
    console.log("Creating new DataBase");
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    console.log("Database successfully created");
    await pool.query(`USE ${DATABASE_NAME}`);
    console.log("Generating tables...");
    await createTables(pool);
    console.log("Adding Details to DataBase");
    await addCountries(pool);
    console.log("All done");
    console.log("Database Creation complete.");
    await pool.end();
};

async function createTables(pool) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS countries(
            id CHAR(36) PRIMARY KEY,
            country VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS votes(
            id CHAR(36) PRIMARY KEY,
            idCountry CHAR(36) NOT NULL,
            idUser CHAR(36) NOT NULL,
            points CHAR(12) NOT NULL,
            FOREIGN KEY (idCountry) REFERENCES countries (id) ON DELETE CASCADE,
            FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE
    )`);
}

dbInit();
