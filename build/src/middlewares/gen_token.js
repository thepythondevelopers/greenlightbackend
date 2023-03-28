"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.decodeToken = exports.generateToken = void 0;
const DAO = __importStar(require("../DAO"));
const Models = __importStar(require("../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const { seckretKeys } = index_1.app_constant;
const options = { algorithm: "HS256" };
const admin_seckret_key = seckretKeys.admin_seckret_key;
const user_seckret_key = seckretKeys.user_seckret_key;
// STEP 1 : GENERATE TOKEN
const generateToken = (token_data) => {
    return new Promise((resolve, reject) => {
        try {
            let seckret_key = null;
            if (token_data.scope == "admin") {
                seckret_key = admin_seckret_key;
            }
            if (token_data.scope == "user") {
                seckret_key = user_seckret_key;
            }
            const token = jsonwebtoken_1.default.sign(token_data, seckret_key);
            return resolve(token);
        }
        catch (err) {
            throw reject(err);
        }
    });
};
exports.generateToken = generateToken;
const decodeToken = (token, type, res) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let set_seckret_key = null;
            if (type == "admin") {
                set_seckret_key = admin_seckret_key;
            }
            else if (type == "user") {
                set_seckret_key = user_seckret_key;
            }
            console.log("SET SECRET KEY", set_seckret_key);
            // let fetch_error = await handleCustomError('UNAUTHORIZED', language)
            jsonwebtoken_1.default.verify(token, set_seckret_key, (err, decoded) => {
                if (decoded == undefined) {
                    // return reject(fetch_error);
                    res.status(403).send({ error: "A token is required for authentication" });
                }
                else {
                    return resolve(decoded);
                    console.log("decoded", decoded);
                }
            });
        }
        catch (err) {
            console.log("6");
            res.status(403).send({ error: "A token is required for authentication" });
        }
    }));
};
exports.decodeToken = decodeToken;
// STEP 2 : VERIFY TOKEN
const verifyToken = (token, type, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("INSIDE verify---");
        let decoded = yield decodeToken(token, type, res);
        let fetch_data;
        console.log("verify---2---");
        if (decoded.scope == "user") {
            let query = {
                user_id: decoded._id,
                token: { $ne: null },
                token_gen_at: decoded.token_gen_at
            };
            let projection = { __v: 0 };
            let options = { lean: true };
            fetch_data = yield DAO.getData(Models.Sessions, query, projection, options);
        }
        if (fetch_data.length) {
            return fetch_data[0];
        }
        else {
            console.log("4");
            return res.status(403).send({ error: "A token is required for authentication" });
        }
    }
    catch (err) {
        console.log("5");
        return res.status(403).send({ error: "A token is required for authentication" });
    }
});
exports.verifyToken = verifyToken;
