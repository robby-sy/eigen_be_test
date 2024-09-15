import type { Book, IBook } from "../models/book";
import type { BaseRepository } from "./base-repository";

export interface BookRepository extends BaseRepository<IBook, Book> {
  findAll(): Promise<Book[]>;
}
