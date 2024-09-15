import type { Application } from "express";
import { injectable } from "inversify";
import { Bootstrap } from "./bootstrap";
import { container } from "../container";
import { Route } from "./router";
import { config } from "dotenv";
import { OverdueChecker } from "./overdue-checker";
config();
export interface IServer {
  start(): Application;
}
@injectable()
export class Server implements IServer {
  start(): Application {
    const app = new Bootstrap(
      container.resolve<Route>(Route),
      container.resolve<OverdueChecker>(OverdueChecker)
    );
    app.httpServer.listen(
      <number>(<unknown>process.env.APP_PORT) || 3000,
      () => {
        console.log(
          `HTTP Server started at http://localhost:${
            process.env.APP_PORT || 3000
          }`
        );
      }
    );
    return app.app;
  }
}
