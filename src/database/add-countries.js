require("dotenv").config();
const { generateUUID } = require("../services/crypto-services");

async function addCountries(pool) {
    const countries = [
        "España",
        "Alemania",
        "Italia",
        "Francia",
        "Reino Unido",
        "Suecia",
        "Chipre",
        "Serbia",
        "Lituania",
        "Irlanda",
        "Ucrania",
        "Croacia",
        "Eslovenia",
        "Finlandia",
        "Portugal",
        "Luxemburgo",
    ];

    console.log("Adding countries");

    try {
        for (const country of countries) {
            const id = generateUUID();

            await pool.query(
                `INSERT INTO countries (id, country) VALUES (?, ?)`,
                [id, country]
            );
        }

        console.log("Countries added successfully");
    } catch (error) {
        console.error("Error adding countries:", error);
    }
}

module.exports = addCountries;
