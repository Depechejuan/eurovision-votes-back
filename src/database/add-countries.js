require("dotenv").config();
const { generateUUID } = require("../services/crypto-services");
const { getIDCountryByName } = require("../services/db-service");

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
        const idUser = generateUUID();
        const puntos = 0;
        await pool.query(
            `
            INSERT INTO users(id, name)
            VALUES(?,?)`,
            [idUser, "control_user"]
        );

        for (const country of countries) {
            console.log(country);
            const id = generateUUID();

            await pool.query(
                `INSERT INTO countries (id, country) VALUES (?, ?)`,
                [id, country]
            );

            const idCountry = await getIDCountryByName(country);

            await pool.query(
                `
            INSERT INTO votes (id, idCountry, idUser, points)
            VALUES (?, ?, ?, ?)`,
                [generateUUID(), idCountry, idUser, puntos]
            );
        }

        console.log("Countries added successfully");
    } catch (error) {
        console.error("Error adding countries:", error);
    }
}

module.exports = addCountries;
