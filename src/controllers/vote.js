"use strict";

const { getIDCountryByName } = require("../services/db-service");

async function vote(data, user) {
    try {
        console.log(data);
        // crear busqueda segun nombre o id??
        // const idUser = await getUserByName(user);

        for (const vote of data) {
            console.log(vote);
            console.log(vote.pais);
            const idCountry = await getIDCountryByName(vote.pais);

            console.log(idCountry);
            await connection.query(
                "INSERT INTO votes (id, idCountry, idUser, points) VALUES (?, ?, ?, ?)",
                [uuidv4(), countryId, userId, vote.puntos]
            );
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = vote;
