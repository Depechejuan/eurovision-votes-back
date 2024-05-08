"use strict";

const { generateUUID, generateJWT } = require("../services/crypto-services");
const { insertUserFromLS } = require("../services/db-service");

async function register(userData) {
    const user = {
        id: generateUUID(),
        name: userData,
    };
    const create = await insertUserFromLS(user);
    const token = generateJWT({
        ...user,
    });
    return {
        token,
    };
}

module.exports = { register };
