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
exports.generateGroupLink = exports.genrate_coupon_code = exports.decryptPassword = exports.bcryptPassword = exports.genUniqueCode = exports.GenerateOtp = exports.setOptions = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const DAO = __importStar(require("../DAO"));
const randomstring_1 = __importDefault(require("randomstring"));
const index_1 = require("../config/index");
const defaultLimit = index_1.app_constant.defaultLimit;
const saltRounds = index_1.app_constant.saltRounds;
const setOptions = (pagination, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let options = {
            lean: true,
            sort: { _id: -1 }
        };
        if (pagination == undefined && typeof limit != undefined) {
            options = {
                lean: true,
                limit: parseInt(limit),
                sort: { _id: -1 }
            };
        }
        else if (typeof pagination != undefined && limit == undefined) {
            options = {
                lean: true,
                skip: parseInt(pagination) * defaultLimit,
                limit: defaultLimit,
                sort: { _id: -1 }
            };
        }
        else if (typeof pagination != undefined && typeof limit != undefined) {
            options = {
                lean: true,
                skip: parseInt(pagination) * parseInt(limit),
                limit: parseInt(limit),
                sort: { _id: -1 }
            };
        }
        return options;
    }
    catch (err) {
        throw err;
    }
});
exports.setOptions = setOptions;
const GenerateOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let static_otp = 1234;
        let options = {
            length: 4,
            charset: '123456789'
        };
        let code = randomstring_1.default.generate(options);
        let otp = `${static_otp}`;
        return otp;
    }
    catch (err) {
        throw err;
    }
});
exports.GenerateOtp = GenerateOtp;
const generateGroupLink = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let static_link = "https://shadowz.com/chatroom/";
        let options = {
            length: 7,
            charset: 'alphanumeric'
        };
        let code = name;
        let link = `${static_link}${code}`;
        return link;
    }
    catch (err) {
        throw err;
    }
});
exports.generateGroupLink = generateGroupLink;
const genUniqueCode = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let options = {
            length: 7,
            charset: 'alphanumeric'
        };
        let random_value = randomstring_1.default.generate(options);
        // fetch users count
        let total_users = yield DAO.countData(collection, {});
        let inc_value = Number(total_users) + 1;
        // unique code
        let unique_code = `${random_value}${inc_value}`;
        return unique_code;
    }
    catch (err) {
        throw err;
    }
});
exports.genUniqueCode = genUniqueCode;
const bcryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hashSync(password, saltRounds);
        return hash;
    }
    catch (err) {
        throw err;
    }
});
exports.bcryptPassword = bcryptPassword;
const decryptPassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decryt = yield bcrypt_1.default.compareSync(password, hash);
        return decryt;
    }
    catch (err) {
        throw err;
    }
});
exports.decryptPassword = decryptPassword;
// const genrate_order_id = async () => {
//     try {
//         let static_value = 'ORDER';
//         let options = {
//             length: 4,
//             charset: 'alphanumeric',
//             capitalization: 'uppercase'
//         }
//         let random_value = random_string.generate(options)
//         // fetch ORDERS count
//         let count_orders = await DAO.countData(Models.Orders, {})
//         let unique_id = Number(count_orders) + 1
//         let order_id = `${static_value}${random_value}${unique_id}`
//         return order_id
//     }
//     catch (err) {
//         throw err;
//     }
// }
const genrate_coupon_code = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let static_value = 'COUP';
        let options = {
            length: 6,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        };
        let random_value = randomstring_1.default.generate(options);
        let coupon_code = `${static_value}${random_value}`;
        return coupon_code;
    }
    catch (err) {
        throw err;
    }
});
exports.genrate_coupon_code = genrate_coupon_code;
