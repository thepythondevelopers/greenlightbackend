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
const mongoose_1 = __importDefault(require("mongoose"));
const connect_to_db = () => __awaiter(void 0, void 0, void 0, function* () {
    // let { URI } = db_config
    let URI = 'mongodb+srv://pamsar:1Q9Fsgr22wC6UsI7@cluster0.ll72b.mongodb.net/green_light?retryWrites=true&w=majority';
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    mongoose_1.default.connect(URI, options);
    mongoose_1.default.connection.on("connected", (data) => {
        console.log("SERVER LOAD");
        console.log("connected to MongoDb");
    });
    mongoose_1.default.connection.on("error", (error) => {
        console.log(error);
    });
});
exports.default = connect_to_db;
