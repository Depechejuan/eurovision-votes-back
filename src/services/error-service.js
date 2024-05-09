"use strict";
const success = false;

module.exports = {
    invalidCredentials() {
        return {
            success,
            status: 400,
            code: "INVALID_CREDENTIALS",
            message: "You must enter a valid email and password",
        };
    },

    AlreadyVote() {
        return {
            success,
            status: 400,
            code: "ALREADY VOTE",
            message: "Ya has votao!",
        };
    },

    emailAlreadyRegistered() {
        return {
            success,
            status: 400,
            code: "EMAIL_ALREADY_REGISTERED",
            message: "This email has already been registered",
        };
    },

    didNotAcceptedTOS() {
        return {
            success,
            status: 403,
            code: "DID_NOT_ACCEPT_TOS",
            message: "User must accept terms and services to register",
        };
    },

    notAuth() {
        return {
            success,
            status: 401,
            code: "NOT_AUTHENTICATED",
            message: "User not authenticated. Token missing",
        };
    },

    unauthorized() {
        return {
            success,
            status: 403,
            code: "UNAUTHORIZED",
            message: "User not authorized to do this action",
        };
    },

    notFound() {
        return {
            success,
            status: 404,
            code: "NOT_FOUND",
            message: "Not Found",
        };
    },

    incomplete() {
        return {
            success,
            status: 403,
            code: "INCOMPLETE",
            message: "You must complete all required data",
        };
    },

    genericError() {
        return {
            success,
            status: 403,
            code: "GENERIC_ERROR",
            message: "Something Went Wrong Along The Way...",
        };
    },

    alreadyAdded(type) {
        return {
            success,
            status: 400,
            code: `ALREADY_ON_${type}`,
            message: "You are already on the list",
        };
    },

    uploadError() {
        return {
            success,
            status: 400,
            code: "UPLOAD_ERROR",
            message: "Something Went Wrong Uploading...",
        };
    },

    emailNotSended() {
        return {
            success,
            status: 400,
            code: "EMAIL_NOT_SENDED",
            message: "Something Went Wrong with the newsletter...",
        };
    },
};
