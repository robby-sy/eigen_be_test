import "reflect-metadata";
import { Container } from "inversify";
import type { BookRepository } from "./domains/services/book-repository";
import type { MemberRepository } from "./domains/services/member-repository";
import { Controller } from "./presentation/controller";
import { Route } from "./presentation/router";
import { Service } from "./presentation/service";
import { Server, type IServer } from "./presentation/server";
import { OverdueChecker } from "./presentation/overdue-checker";
import type { Cron } from "./domains/services/cron";
import TYPES from "./types";
import { MemberSequelizeRepository } from "./persistance/sequelize/member-sequelize-repository";
import { BookSequelizeRepository } from "./persistance/sequelize/book-sequelize-repository";

const container = new Container();

container.bind<IServer>(TYPES.Server).to(Server);
container.bind(Controller).toSelf();
container.bind<Route>(Route).toSelf().inSingletonScope();
container.bind<Service>(TYPES.Service).to(Service);

container.bind<Cron>(TYPES.OverdueCron).to(OverdueChecker);

container
  .bind<MemberRepository>(TYPES.MemberRepository)
  .to(MemberSequelizeRepository);
container
  .bind<BookRepository>(TYPES.BookRepository)
  .to(BookSequelizeRepository);

export { container };
