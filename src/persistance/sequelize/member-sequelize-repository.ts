import { Book as BookEntity } from "../../domains/models/book";
import {
  Member as MemberEntity,
  type IMember,
} from "../../domains/models/member";
import { Book } from "../../infrastructure/sqlite";
import { Member } from "../../infrastructure/sqlite";
import { injectable } from "inversify";
import moment from "moment";
import type { MemberRepository } from "../../domains/services/member-repository";
@injectable()
export class MemberSequelizeRepository implements MemberRepository {
  async borrowBook(memberId: string, bookId: string): Promise<boolean> {
    const member = await Member.findOne({ where: { id: memberId } });
    const book = await Book.findOne({ where: { id: bookId } });
    if (!(book && member)) {
      return false;
    }
    await member.addBook(book, {
      through: { dueDate: moment().add(7, "day").toDate() },
    });
    return true;
  }
  async create(props: MemberEntity): Promise<MemberEntity> {
    const book = await Member.create(props);
    return MemberEntity.create({ ...book.toJSON() });
  }

  async read(props: Partial<IMember>): Promise<MemberEntity> {
    const member = await Member.findOne({ where: props, include: Book });
    if (!member) {
      throw new Error("There is no member with target properties");
    }
    return MemberEntity.create({
      ...member.toJSON(),
      books: member.books?.map((el) => {
        return BookEntity.create({ ...el.toJSON() });
      }),
    });
  }

  async update(props: Partial<IMember>): Promise<MemberEntity> {
    const member = await Member.findOne({
      where: { id: props.id },
      include: Book,
    });
    if (!member) {
      throw new Error("There is no member with target properties");
    }
    if (props.name) member.name = props.name;
    if (props.penalty_start_date)
      member.penalty_start_date = props.penalty_start_date;

    await member.save();

    return MemberEntity.create({ ...member.toJSON() });
  }

  async delete(id: string): Promise<boolean> {
    const isSuccess = await Member.destroy({ where: { id } });
    if (isSuccess > 0) {
      return true;
    }
    return false;
  }

  async returnBook(memberId: string, bookId: string): Promise<boolean> {
    const member = await Member.findOne({
      where: { id: memberId },
    });
    const book = await Book.findOne({ where: { id: bookId } });
    if (!(book && member)) {
      return false;
    }
    await member.removeBook(book);
    return true;
  }

  async findAllMember(): Promise<MemberEntity[]> {
    const members = await Member.findAll({ include: Book });
    return members.map((el) => {
      return MemberEntity.create({
        ...el.toJSON(),
        books: el.books.map((ele) => {
          return BookEntity.create({
            ...ele.toJSON(),
            MemberBook: ele.MemberBook,
          });
        }),
      });
    });
  }
}
