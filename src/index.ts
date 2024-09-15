import { container } from "./container";
import type { IServer } from "./presentation/server";
import TYPES from "./types";

const server = container.get<IServer>(TYPES.Server);
server.start();
