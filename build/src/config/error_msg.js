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
const DAO = __importStar(require("../DAO/index"));
const Models = __importStar(require("../models/index"));
const lodash = __importStar(require("lodash"));
// const create_admin = async () => {
//       try {
//             // check admin exist or not
//             let query = { email: "admin@gmail.com" }
//             let projection = { __v: 0 }
//             let options = { lean: true }
//             let fetch_data: any = await DAO.getData(Models.Admin, query, projection, options);
//             if (fetch_data.length == 0) {
//                   let default_password = 'qwerty';
//                   let password = await helpers.bcryptPassword(default_password)
//                   let saveData = {
//                         name: "super admin",
//                         image: null,
//                         email: "admin@gmail.com",
//                         password: password,
//                         roles: [],
//                         super_admin: true,
//                         created_at: +new Date()
//                   }
//                   await DAO.saveData(Models.Admin, saveData);
//             }
//       }
//       catch (err) {
//             throw err;
//       }
// }
const response_messages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data_to_push = [
            {
                type: 'ERROR',
                message_type: 'UNAUTHORIZED',
                status_code: 401,
                msg_in_english: 'you are not authorized to perform this action.',
                msg_in_arabic: 'لست مخولاً بتنفيذ هذا الإجراء.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'EMAIL_ALREADY_EXISTS',
                status_code: 400,
                msg_in_english: 'This email address already exists. Please try again.',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. حاول مرة اخرى.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'USERNAME_ALREADY_EXISTS',
                status_code: 400,
                msg_in_english: 'This username  alreday exists. Please try again.',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. حاول مرة اخرى.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'ACCOUNT_BLOCKED',
                status_code: 400,
                msg_in_english: 'Sorry this account is temporary blocked.',
                msg_in_arabic: 'عذرا هذا الحساب محظور مؤقتا.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'ACCOUNT_DEACTIVATED',
                status_code: 400,
                msg_in_english: 'Sorry this account is temporary deactivated.',
                msg_in_arabic: 'عذرا هذا الحساب معطل مؤقتا.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'ACCOUNT_DELETED',
                status_code: 400,
                msg_in_english: 'Sorry this account is temporary deleted.',
                msg_in_arabic: 'عذرا هذا الحساب معطل مؤقتا.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'INCORRECT_PASSWORD',
                status_code: 400,
                msg_in_english: 'The password you entered is incorrect. Please try again.',
                msg_in_arabic: 'كلمة المرور التي أدخلتها غير صحيحة. حاول مرة اخرى.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'NO_DATA_FOUND',
                status_code: 400,
                msg_in_english: 'No data found.',
                msg_in_arabic: 'لاتوجد بيانات.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'INVALID_OBJECT_ID',
                status_code: 400,
                msg_in_english: 'Sorry this is not a valid object _id.',
                msg_in_arabic: 'عذرا ، هذا ليس كائن صالح _id.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'PHONE_NO_ALREADY_EXISTS',
                status_code: 400,
                msg_in_english: 'This phone number already exists Please try again.',
                msg_in_arabic: 'رقم الهاتف هذا موجود بالفعل يرجى المحاولة مرة أخرى.',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'LOGIN_VIA_GOOGLE',
                status_code: 400,
                msg_in_english: 'This email address already exists. Please try again with gmail login',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. يرجى المحاولة مرة أخرى مع تسجيل الدخول إلى gmail',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'LOGIN_VIA_FACEBOOK',
                status_code: 400,
                msg_in_english: 'This email address already exists. Please try again with facebook login',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. يرجى المحاولة مرة أخرى مع تسجيل الدخول إلى الفيسبوك',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'WRONG_OTP',
                status_code: 400,
                msg_in_english: 'Please enter the correct OTP',
                msg_in_arabic: 'كلمة المرور التي تم إدخالها غير صحيحة. الرجاء إدخال OTP الصحيح أو محاولة إعادة إنشاء OTP',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'LOGIN_VIA_APPLE',
                status_code: 400,
                msg_in_english: 'This email address already exists. Please try again with apple login',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. يرجى المحاولة مرة أخرى مع تسجيل الدخول مع أبل',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'LOGIN_VIA_EMAIL_PASSWORD',
                status_code: 400,
                msg_in_english: 'This email address already exists. Please try again with email and password',
                msg_in_arabic: 'عنوان البريد الإلكتروني هذا موجود بالفعل. يرجى المحاولة مرة أخرى باستخدام البريد الإلكتروني وكلمة المرور',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'EMAIL_NOT_REGISTERED',
                status_code: 400,
                msg_in_english: 'The email address provided is not registered with us',
                msg_in_arabic: 'عنوان البريد الإلكتروني المقدم غير مسجل لدينا',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'THIS_IS_PRIVATE_ACCOUNT',
                status_code: 400,
                msg_in_english: 'This account is private account',
                msg_in_arabic: 'عنوان البريد الإلكتروني المقدم غير مسجل لدينا',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'PHONE_NUMBER_NOT_REGISTERED',
                status_code: 400,
                msg_in_english: 'The phone number provided is not registered with us',
                msg_in_arabic: 'عنوان البريد الإلكتروني المقدم غير مسجل لدينا',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'OLD_PASSWORD_MISMATCH',
                status_code: 400,
                msg_in_english: 'Sorry old password is incorrect please try again',
                msg_in_arabic: 'آسف كلمة المرور القديمة غير صحيحة يرجى المحاولة مرة أخرى',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'BACKUP_UPLOAD_FAILED',
                status_code: 400,
                msg_in_english: 'Sorry db backup upload failed',
                msg_in_arabic: 'عذرا فشل تحميل نسخة احتياطية ديسيبل',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'INSUFFICIENT_PERMISSIONS',
                status_code: 400,
                msg_in_english: 'Sorry you are not having sufficient permission to perform this action',
                msg_in_arabic: 'آسف ليس لديك الإذن الكافي لتنفيذ هذا الإجراء',
                created_at: +new Date()
            },
            {
                type: 'ERROR',
                message_type: 'ENTER_EMAIL',
                status_code: 400,
                msg_in_english: 'Please enter your email',
                msg_in_arabic: 'آسف ليس لديك الإذن الكافي لتنفيذ هذا الإجراء',
                created_at: +new Date()
            }
        ];
        return data_to_push;
    }
    catch (err) {
        throw err;
    }
});
const bootstrap_res_msgs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("<--bootstrap_res_msgs-->")
        let query = {};
        let projection = { __v: 0 };
        let options = { lean: true };
        let fetch_data = yield DAO.getData(Models.ResMessages, query, projection, options);
        if (fetch_data.length) {
            let data_to_push = yield response_messages();
            let filter_data = lodash.xorBy(fetch_data, data_to_push, 'message_type');
            if (filter_data.length > 0) {
                let options = { multi: true };
                yield DAO.insertMany(Models.ResMessages, filter_data, options);
            }
        }
        else {
            let data_to_push = yield response_messages();
            let options = { multi: true };
            yield DAO.insertMany(Models.ResMessages, data_to_push, options);
        }
    }
    catch (err) {
        throw err;
    }
});
const bootstrap_data = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await create_admin()
        yield bootstrap_res_msgs();
    }
    catch (err) {
        throw err;
    }
});
exports.default = bootstrap_data;
