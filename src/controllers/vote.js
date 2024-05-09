"use strict";

const { getIDCountryByName, insertVote } = require("../services/db-service");

async function vote(data, idUser) {
    try {
        console.log(data);
        console.log(idUser);

        for (const vote of data) {
            console.log(vote);
            console.log(vote.pais);
            const idCountry = await getIDCountryByName(vote.pais);
            console.log(idCountry);
            await insertVote(idCountry, idUser, vote.puntos);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = vote;
