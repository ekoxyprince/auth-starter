import app from "./app";
import http from "http";
import config from "./config";
import connectToDb from "./infrastructure/database";

const WebServer = http.createServer(app);

connectToDb().then((connected) => {
  WebServer.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
});
