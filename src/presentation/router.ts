import type { Router } from "express";
import { injectable } from "inversify";
import { container } from "../container";
import { Controller } from "./controller";
import asyncWrap from "../libs/asyncWrapper";

@injectable()
export class Route {
  controller = container.get<Controller>(Controller);
  public setRoute(router: Router) {
    router.post(
      "/members/borrowBook",
      asyncWrap(this.controller.borrowBook.bind(this.controller))
    );
    router.post(
      "/members/returnBook",
      asyncWrap(this.controller.returnBook.bind(this.controller))
    );
    router.get(
      "/books",
      asyncWrap(this.controller.getAvailableBook.bind(this.controller))
    );
    router.get(
      "/members",
      asyncWrap(this.controller.getAllMemberWithBook.bind(this.controller))
    );
  }
}
