"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltRounds = exports.defaultLimit = exports.scope = exports.seckretKeys = void 0;
const seckretKeys = {
    admin_seckret_key: "admin_seckret_key",
    user_seckret_key: "user_seckret_key"
};
exports.seckretKeys = seckretKeys;
const scope = {
    admin: "admin",
    user: "user"
};
exports.scope = scope;
const defaultLimit = 10;
exports.defaultLimit = defaultLimit;
const saltRounds = 10;
exports.saltRounds = saltRounds;
