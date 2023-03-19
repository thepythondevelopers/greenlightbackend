import cors from "cors";
import express from "express";
import { config } from "dotenv";
config();
import http from "http";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
// import fileUpload from "express-fileupload";
import { connect_to_db } from "./index";
import user_routes from "../modules/user/user.routes";
import swagger_ui from "swagger-ui-express";
import openapi_docs from "../../output.swagger.json";


const app = express();
const env = process.env.ENVIRONMENT;
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;
console.log("----------env-------", env);
let port = process.env.LOCAL_PORT;
// let url ="https://56de-2409-4051-216-e9b7-457-3dae-b1a-5261.in.ngrok.io/"
if (env == "PROD") {
  port = process.env.PROD_PORT;
}
app.use(cors({ origin: "*" }));
// app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});
app.use("/api", user_routes);


// make swagger documentation
let swagger_options = { customSiteTitle: "Green Light  Api Documentation" };
app.use(
  "/docs",
  swagger_ui.serve,
  swagger_ui.setup(openapi_docs, swagger_options)
);

let server: any;

if (process.env.SSL == "true") {
  server = https.createServer(
    {
      cert: fs.readFileSync(cert),
      key: fs.readFileSync(priv_key),
    },
    app
  );
  server.listen(port, () => {
    console.log(`Server running at port at ${port}...`);

  });
} else {
  server = http.createServer(app);
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

function onError(error:any) {
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
  console.log('bind ', bind)
  
} 

server.on("error", onError);
server.on("listening", onListening);
console.log(`port running ${port}`);
// server.listen(port);

connect_to_db();


// connect socket
// connectSocket(server);