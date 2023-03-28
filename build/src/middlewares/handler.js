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
exports.handleJoiError = exports.handleCustomError = exports.handleSuccess = exports.handleCatch = void 0;
const DAO = __importStar(require("../DAO/index"));
const Models = __importStar(require("../models"));
const handleSuccess = (reply, response) => {
    reply.send({
        data: response
    });
};
exports.handleSuccess = handleSuccess;
const handleCatch = (reply, error) => {
    console.log("-------------------error-->", error);
    let { type, status_code, error_message } = error;
    if (type == undefined) {
        type = 'Bad Request';
    }
    if (status_code == undefined) {
        status_code = 400;
    }
    if (error_message == undefined) {
        error_message = error;
    }
    reply.status(status_code).send({
        error: type,
        error_description: error_message
    });
};
exports.handleCatch = handleCatch;
const handleCustomError = (type, language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = { message_type: type };
        let projection = { __v: 0 };
        let options = { lean: true };
        let fetch_data = yield DAO.getData(Models.ResMessages, query, projection, options);
        if (fetch_data.length) {
            let { message_type, status_code, msg_in_english, msg_in_arabic } = fetch_data[0];
            let error_message = 'Something went wrong';
            if (language == 'ENGLISH') {
                error_message = msg_in_english;
            }
            else if (language == 'ARABIC') {
                error_message = msg_in_arabic;
            }
            else {
                message_type = "INVALID_LANGUAGE";
                error_message = "Sorry this is not a valid language";
            }
            return {
                type: message_type,
                status_code: status_code,
                error_message: error_message
            };
        }
        else {
            throw new Error("Invalid error type");
        }
    }
    catch (err) {
        throw err;
    }
});
exports.handleCustomError = handleCustomError;
const handleJoiError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    let error_message = error.details[0].message;
    let custom_message = error_message.replace(/"/g, '');
    throw {
        status_code: 400,
        type: "Joi Error",
        error_message: custom_message
    };
});
exports.handleJoiError = handleJoiError;
