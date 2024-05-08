const { getConnection } = require("../database/mysql-connection");
const { generateUUID } = require("./crypto-services");

const db = getConnection();

module.exports = {
    async insertUserFromLS(data) {
        try {
            const statement = `
                INSERT INTO users(id, name)
                VALUES(?, ?)`;
            await db.execute(statement, [data.id, data.name]);
            return "ok";
        } catch (err) {
            console.log(err);
        }
    },

    async getIDCountryByName(country) {
        const statement = `SELECT id FROM countries WHERE country = ?`;
        await db.execute(statement, [country]);
    },

    async insertVote(data) {
        const statement = ``;
    },
};
