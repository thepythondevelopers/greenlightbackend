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
exports.sendNotification = void 0;
const fcm_push_1 = __importDefault(require("fcm-push"));
const dotenv_1 = require("dotenv");
const handler_1 = require("./handler");
const handler_2 = require("./handler");
dotenv_1.config();
const server_key = process.env.NOTIFICATION_KEY;
const sendNotification = (data, fcm_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fcm = new fcm_push_1.default(server_key);
        let message = {
            to: fcm_token,
            data: data,
            notification: {
                type: data.type,
                title: data.title,
                body: data.message,
                notif_type: data.notif_type,
                sound: 'default',
                badge: 0,
                priority: "high",
                content_available: true,
                foreground: true,
                show_in_foreground: true
            }
        };
        fcm.send(message, function (err, result) {
            if (err) {
                console.log(handler_1.handleCatch);
            }
            else {
                console.log(handler_2.handleSuccess);
            }
        });
    }
    catch (err) {
        throw err;
    }
});
exports.sendNotification = sendNotification;
