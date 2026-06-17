import "reflect-metadata";
import serverless from "serverless-http";
import app from "../server";

module.exports = serverless(app);
