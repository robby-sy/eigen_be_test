import express from "express";
import type { Route } from "./router";
import bodyParser from "body-parser";
import { createServer } from "http";
import type { Cron } from "../domains/services/cron";
export class Bootstrap {
  public app = express();
  public httpServer = createServer();

  constructor(private appRoute: Route, private cron:Cron) {
    this.app = express();
    this.middleware();
    this.setRoutes();
    this.createServer();
    this.startCron()
  }

  public middleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public setRoutes(): void {
    const router = express.Router();
    this.appRoute.setRoute(router);
    this.app.use("/", router);
  }

  public createServer() {
    this.httpServer = createServer(this.app);
  }

  public startCron(){
    this.cron.startCron()
  }
}
