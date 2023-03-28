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
exports.random_code = exports.createNewUser = exports.setUserData = exports.verifyUserInfo = exports.make_user_response = exports.save_session_data = exports.Generate_User_Token = void 0;
const DAO = __importStar(require("../../DAO"));
const Models = __importStar(require("../../models"));
const index_1 = require("../../config/index");
const index_2 = require("../../middlewares/index");
const user_scope = index_1.app_constant.scope.user;
const Generate_User_Token = (_id, req_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token_data = {
            _id: _id,
            scope: user_scope,
            collection: Models.Users,
            token_gen_at: +new Date(),
        };
        let access_token = yield index_2.generateToken(token_data);
        let response = yield save_session_data(access_token, token_data, req_data);
        // console.log(response)
        return response;
    }
    catch (err) {
        // console.log(err)
        throw err;
    }
});
exports.Generate_User_Token = Generate_User_Token;
const save_session_data = (token, token_data, req_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { _id: user_id, token_gen_at } = token_data;
        let set_data = {
            type: "USER",
            user_id: user_id,
            token: token,
            token_gen_at: token_gen_at,
            created_at: +new Date(),
        };
        let response = yield DAO.saveData(Models.Sessions, set_data);
        return response;
    }
    catch (err) {
        throw err;
    }
});
exports.save_session_data = save_session_data;
const make_user_response = (token_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user_id, token, device_type, fcm_token, token_gen_at } = token_data;
        let query = { _id: user_id };
        let projection = { __v: 0, password: 0, otp: 0 };
        let options = { lean: true };
        let response = yield DAO.getData(Models.Users, query, projection, options);
        if (response.length) {
            response[0].token = token;
            response[0].device_type = device_type;
            response[0].fcm_token = fcm_token;
            response[0].token_gen_at = token_gen_at;
            return response[0];
        }
        else {
            throw yield ("INVALID_OBJECT_ID");
        }
    }
    catch (err) {
        throw err;
    }
});
exports.make_user_response = make_user_response;
const verifyUserInfo = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projection = { __v: 0 };
        let options = { lean: true };
        let fetch_data = yield DAO.getData(Models.Users, query, projection, options);
        console.log(fetch_data);
        return fetch_data;
    }
    catch (err) {
        throw err;
    }
});
exports.verifyUserInfo = verifyUserInfo;
const setUserData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { dob, display_name, interested_in, country, email, password, gender, state, city, zipcode, latLng } = data;
        // bycryt password
        let hassed_password = yield index_2.helpers.bcryptPassword(password);
        let otp = yield index_2.helpers.GenerateOtp();
        let data_to_save = {
            password: hassed_password,
            dob: dob,
            display_name: display_name,
            email: email,
            gender: gender,
            interested_in: interested_in,
            country: country,
            state: state,
            city: city,
            zipcode: zipcode,
            latLng: latLng,
            otp: otp
        };
        let response = yield DAO.saveData(Models.Users, data_to_save);
        return response;
    }
    catch (err) {
        throw err;
    }
});
exports.setUserData = setUserData;
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { social_type, social_token, country_code, phone_no, name, email } = data;
        let data_to_save = {
            social_type: social_type,
            social_token: social_token,
            email_verified: true,
            created_at: +new Date(),
        };
        if (email != null || email != undefined) {
            data_to_save.email = email;
        }
        if (country_code != null || country_code != undefined) {
            data_to_save.country_code = country_code;
        }
        if (phone_no != null || phone_no != undefined) {
            data_to_save.phone_no = phone_no;
        }
        if (name != null || email != undefined) {
            data_to_save.name = name;
        }
        let response = yield DAO.saveData(Models.Users, data_to_save);
        return response;
    }
    catch (err) {
        throw err;
    }
});
exports.createNewUser = createNewUser;
const random_code = (length) => __awaiter(void 0, void 0, void 0, function* () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
});
exports.random_code = random_code;
