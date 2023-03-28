"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const index_1 = require("./index");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const output_swagger_json_1 = __importDefault(require("../../output.swagger.json"));
const app = express_1.default();
const env = process.env.ENVIRONMENT;
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;
console.log("----------env-------", env);
let port = process.env.LOCAL_PORT;
// let url ="https://56de-2409-4051-216-e9b7-457-3dae-b1a-5261.in.ngrok.io/"
if (env == "PROD") {
    port = process.env.PROD_PORT;
}
app.use(cors_1.default({ origin: "*" }));
app.use(express_fileupload_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", user_routes_1.default);
// make swagger documentation
let swagger_options = { customSiteTitle: "Green Light  Api Documentation" };
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(output_swagger_json_1.default, swagger_options));
let server;
if (process.env.SSL == "true") {
    server = https_1.default.createServer({
        cert: fs_1.default.readFileSync(cert),
        key: fs_1.default.readFileSync(priv_key),
    }, app);
    server.listen(port, () => {
        console.log(`Server running at port at ${port}...`);
    });
}
else {
    server = http_1.default.createServer(app);
    server.listen(port, () => {
        console.log(`Server running at port at11 ${port}...`);
    });
}
// if (env == 'PROD') {
//   server = http.createServer(
//     app);
//   server.listen(port, () => {
//     console.log(`Server running at port at ${port}...`);
//   })
//   // backup_db_cron.start();
//   // remove_img_cron.start();
// }
// else {
//   server = http.createServer(app);
//   server.listen(port, () => {
//     console.log(`Server running at port at3 ${port}...`);
//   })
// }
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log('bind ', bind);
}
server.on("error", onError);
server.on("listening", onListening);
console.log(`port running ${port}`);
// server.listen(port);
index_1.connect_to_db();
// connect socket
// connectSocket(server);
