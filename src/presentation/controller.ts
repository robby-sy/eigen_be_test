import { inject, injectable } from "inversify";
import type { Service } from "./service";
import type { Request, Response } from "express";
import { borrowBookScheme } from "./validation-scheme";
import TYPES from "../types";
@injectable()
export class Controller {
  public constructor(@inject(TYPES.Service) private _service: Service) {}
  async borrowBook(req: Request, res: Response): Promise<Response> {
    const validatedReq = borrowBookScheme.safeParse(req.body);
    if (!validatedReq.success) {
      return res.status(422).json({
        message: "Validation Error",
        data: validatedReq.error.flatten(),
      });
    }
    try {
      const response = await this._service.borrowBook(
        validatedReq.data.memberId,
        validatedReq.data.bookId
      );
      return res.status(200).json({
        message: response,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  async returnBook(req: Request, res: Response): Promise<Response> {
    const validatedReq = borrowBookScheme.safeParse(req.body);
    if (!validatedReq.success) {
      return res.status(422).json({
        message: "Validation Error",
        data: validatedReq.error.flatten(),
      });
    }
    try {
      const response = await this._service.returnBook(
        validatedReq.data.memberId,
        validatedReq.data.bookId
      );
      return res.status(200).json({
        message: response,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async getAvailableBook(_: Request, res: Response): Promise<Response> {
    const books = await this._service.getAllAvailableBook();
    return res.status(200).json({ message: "Success get books", data: books });
  }

  async getAllMemberWithBook(_: Request, res: Response): Promise<Response> {
    const members = await this._service.getAllMemberWithBorrowedBooks();
    return res
      .status(200)
      .json({ message: "Success get members", data: members });
  }
}
