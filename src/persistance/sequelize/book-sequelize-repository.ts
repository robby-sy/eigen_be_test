import type { IBook } from "../../domains/models/book";
import type { BookRepository } from "../../domains/services/book-repository";
import { Book as BookEntity } from "../../domains/models/book";
import { Member as MemberEntity } from "../../domains/models/member";
import { Book } from "../../infrastructure/sqlite";
import { Member } from "../../infrastructure/sqlite";
import { injectable } from "inversify";
@injectable()
export class BookSequelizeRepository implements BookRepository {
  async create(props: BookEntity): Promise<BookEntity> {
    const book = await Book.create(props);
    return BookEntity.create({ ...book.toJSON() });
  }

  async read(props: Partial<IBook>): Promise<BookEntity> {
    const book = await Book.findOne({ where: props, include: Member });
    if (!book) {
      throw new Error("There is no book with target properties");
    }
    return BookEntity.create({
      ...book.toJSON(),
      members: book.members?.map((el) => {
        return MemberEntity.create({ ...el.toJSON() });
      }),
    });
  }

  async update(props: Partial<IBook>): Promise<BookEntity> {
    const book = await Book.findOne({ where: props, include: Member });
    if (!book) {
      throw new Error("There is no book with target properties");
    }
    if (props.author) book.author = props.author;
    if (props.stock) book.stock = props.stock;

    await book.save();

    return BookEntity.create({ ...book.toJSON() });
  }

  async delete(id: string): Promise<boolean> {
    const isSuccess = await Book.destroy({ where: { id } });
    if (isSuccess > 0) {
      return true;
    }
    return false;
  }

  async findAll(): Promise<BookEntity[]> {
    const books = await Book.findAll({ include: Member });
    return books.map((el) => {
      return BookEntity.create({ ...el.toJSON() });
    });
  }
}
