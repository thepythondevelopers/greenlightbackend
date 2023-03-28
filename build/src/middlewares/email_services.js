"use strict";
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
exports.forgotPasswordMail = exports.sendWelcomeMail = void 0;
const path_1 = __importDefault(require("path"));
const send_email_1 = __importDefault(require("./send_email"));
const fs_1 = __importDefault(require("fs"));
const client = require('twilio')("AC7deea48ea38c3e95dd6747ac100a3938", "3e8ee521c1c4adf432bd289d7e813a7d");
// import resend from '../../email_templates/email_verification.html'
const sendWelcomeMail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, otp, display_name } = data;
        let subject = 'Welcome to greenlight!';
        let file_path = path_1.default.join(__dirname, '../email_templates/email_verification.html');
        let html = yield fs_1.default.readFileSync(file_path, { encoding: 'utf-8' });
        html = html.replace('%USER_NAME%', display_name);
        html = html.replace('%OTP%', otp);
        yield send_email_1.default(email, subject, html);
    }
    catch (err) {
        throw err;
    }
});
exports.sendWelcomeMail = sendWelcomeMail;
const forgotPasswordMail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password_reset_token, display_name } = data;
        let subject = 'Resend OTP';
        let file_path = path_1.default.join(__dirname, '../email_templates/reset_password.html');
        let html = yield fs_1.default.readFileSync(file_path, { encoding: 'utf-8' });
        html = html.replace('%USER_NAME%', display_name);
        html = html.replace('%SECURITY_CODE%', password_reset_token);
        yield send_email_1.default(email, subject, html);
    }
    catch (err) {
        throw err;
    }
});
exports.forgotPasswordMail = forgotPasswordMail;
