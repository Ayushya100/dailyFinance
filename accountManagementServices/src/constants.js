"use strict";

const DB_NAME = 'userCollection';
const SALT_ROUNDS = 10;
const usersAPI = '/api/users';
const EMAIL_FROM = 'dailyFinance';
const FRONTEND_URL = 'http://localhost:3200/api/users';

export {
    DB_NAME,
    SALT_ROUNDS,
    usersAPI,
    EMAIL_FROM,
    FRONTEND_URL
};