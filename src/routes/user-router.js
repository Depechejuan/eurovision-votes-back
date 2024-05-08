"use strict";
const { Router, json } = require("express");
const { sendResponse } = require("../utils/send-response");
const { sendError } = require("../utils/send-error");
const { register } = require("../controllers/register");
const vote = require("../controllers/vote");

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

router.post("/vote", json(), async (req, res) => {
    try {
        const data = req.body;
        const user = req.currentUser;
        await vote(data, user);
    } catch (err) {
        sendError(res, err);
    }
});

module.exports = router;
