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

    async getUserByID(idUser) {
        const statement = `
            SELECT * FROM users WHERE id = ?
        `;
        const [rows] = await db.execute(statement, [idUser]);
        return rows;
    },

    async getIDCountryByName(country) {
        const statement = `SELECT id FROM countries WHERE country = ?`;
        const [rows] = await db.execute(statement, [country]);
        return rows[0].id;
    },

    async insertVote(idCountry, idUser, puntos) {
        const statement = `
        INSERT INTO votes (id, idCountry, idUser, points)
        VALUES (?, ?, ?, ?)
        `;
        await db.execute(statement, [
            generateUUID(),
            idCountry,
            idUser,
            puntos,
        ]);
    },

    async getVoteByIdUser(idUser) {
        const statement = `
        SELECT v.points, c.country
        FROM votes v
        JOIN countries c ON v.idCountry = c.id
        WHERE v.idUser = ?
        ORDER BY v.points DESC;
        `;
        const [rows] = await db.execute(statement, [idUser]);
        return rows;
    },

    async getAllVotes() {
        const statement = `
        SELECT 
            u.name AS userName,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'country', c.country,
                    'puntos', v.points
                )
            ) AS votes
            
        FROM 
            votes v
        JOIN 
            users u ON v.idUser = u.id
        JOIN 
            countries c ON v.idCountry = c.id
        GROUP BY 
            u.name
        `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async getScores() {
        const statement = ` 
        SELECT c.country AS country,
            SUM(v.points) AS puntos
        FROM votes v
        JOIN countries c ON v.idCountry = c.id
        GROUP BY v.idCountry
        ORDER BY puntos DESC;
        `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async changeVoteStatus(status, idUser) {
        const statement = `
            UPDATE users SET alreadyVote = ?
            WHERE id = ?
        `;
        await db.execute(statement, [status, idUser]);
    },
};
