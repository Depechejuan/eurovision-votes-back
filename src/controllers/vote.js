"use strict";

const {
    getIDCountryByName,
    insertVote,
    changeVoteStatus,
    getUserByID,
} = require("../services/db-service");
const { AlreadyVote } = require("../services/error-service");
const { sendError } = require("../utils/send-error");

async function vote(data, idUser) {
    try {
        const checkUser = await getUserByID(idUser);

        if (checkUser[0].alreadyVote == false) {
            for (const vote of data) {
                const idCountry = await getIDCountryByName(vote.pais);
                await insertVote(idCountry, idUser, vote.puntos);
            }
            const status = true;
            await changeVoteStatus(status, idUser);
        } else {
            throw AlreadyVote();
        }
    } catch (err) {
        console.log(err);
        sendError(err);
    }
}

module.exports = vote;
