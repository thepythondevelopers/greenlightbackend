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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const DAO = __importStar(require("../DAO"));
const Models = __importStar(require("../models"));
const index_2 = require("../config/index");
const { scope } = index_2.app_constant;
const admin_scope = scope.admin;
const user_scope = scope.user;
const authenticator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token } = req.headers, api_path = req.originalUrl;
        let set_language = 'ENGLISH';
        let { language: body_language } = req.body, { language: query_language } = req.query;
        if (body_language != undefined) {
            set_language = body_language;
        }
        if (query_language != undefined) {
            set_language = query_language;
        }
        let user_path = api_path.includes("api");
        if (user_path) {
            let fetch_token_data = yield index_1.verifyToken(token, user_scope, res);
            if (fetch_token_data) {
                let { user_id, token, device_type, fcm_token, token_gen_at } = fetch_token_data;
                let query = { _id: user_id };
                let projection = { __v: 0, password: 0 };
                let options = { lean: true };
                let fetch_data = yield DAO.getData(Models.Users, query, projection, options);
                if (fetch_data.length > 0) {
                    fetch_data[0].token = token;
                    fetch_data[0].device_type = device_type;
                    fetch_data[0].fcm_token = fcm_token;
                    fetch_data[0].token_gen_at = token_gen_at;
                    req.user_data = fetch_data[0];
                    req.session_data = fetch_token_data;
                    next();
                }
                else {
                    return res.status(403).send({ error: "A token is required for authentication" });
                }
            }
            else {
                return res.status(403).send({ error: "A token is required for authentication" });
            }
        }
        else {
            return res.status(403).send({ error: "A token is required for authentication" });
        }
    }
    catch (err) {
        index_1.handleCatch(res, err);
    }
});
exports.default = authenticator;
