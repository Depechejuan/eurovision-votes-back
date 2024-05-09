"use strict";
const { Router, json } = require("express");
const { sendResponse } = require("../utils/send-response");
const { sendError } = require("../utils/send-error");
const { register } = require("../controllers/register");
const vote = require("../controllers/vote");
const authGuard = require("../middlewares/auth-guard");
const {
    getVoteByIdUser,
    getAllVotes,
    getScores,
} = require("../services/db-service");

const router = Router();

router.post("/user", json(), async (req, res) => {
    try {
        console.log(req.body.name);
        const token = await register(req.body.name);
        sendResponse(res, token);
    } catch (err) {
        sendError(res, err);
    }
});

router.post("/vote", authGuard, json(), async (req, res) => {
    try {
        const data = req.body;
        const idUser = req.currentUser.id;
        await vote(data, idUser);
        sendResponse(res);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/dashboard/user", authGuard, json(), async (req, res) => {
    try {
        const user = req.currentUser.id;
        console.log(user);
        const votes = await getVoteByIdUser(user);
        sendResponse(res, votes);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/dashboard/all", authGuard, json(), async (req, res) => {
    try {
        const data = await getAllVotes();
        sendResponse(res, data);
    } catch (err) {
        sendError(res, err);
    }
});

router.get("/dashboard/total", authGuard, json(), async (req, res) => {
    try {
        const data = await getScores();
        sendResponse(res, data);
    } catch (err) {
        sendError(res, err);
    }
});

module.exports = router;
