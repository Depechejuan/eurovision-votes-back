require("dotenv").config();
const { generateUUID } = require("../services/crypto-services");

async function addCountries(pool) {
    const countries = [
        "Suecia",
        "Ucrania",
        "Alemania",
        "Luxemburgo",
        "Países Bajos",
        "Israel",
        "Lituania",
        "España",
        "Estonia",
        "Irlanda",
        "Letonia",
        "Grecia",
        "Reino Unido",
        "Noruega",
        "Italia",
        "Serbia",
        "Finlandia",
        "Portugal",
        "Chipre",
        "Suiza",
        "Eslovenia",
        "Croacia",
        "Georgia",
        "Francia",
        "Austria",
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
