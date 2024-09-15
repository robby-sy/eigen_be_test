import { inject, injectable } from "inversify";
import type { BookRepository } from "../domains/services/book-repository";
import type { MemberRepository } from "../domains/services/member-repository";
import { ResponseMessage } from "../libs/utils";
import moment from "moment";
import type { IBook } from "../domains/models/book";
import type { IMember } from "../domains/models/member";
import TYPES from "../types";

@injectable()
export class Service {
  constructor(
    @inject(TYPES.MemberRepository) private _memberRepository: MemberRepository,
    @inject(TYPES.BookRepository) private _bookRepository: BookRepository
  ) {}

  public async borrowBook(
    memberId: string,
    bookId: string
  ): Promise<ResponseMessage> {
    // cheking if user still can borrow a book
    const member = await this._memberRepository.read({ id: memberId });
    const book = await this._bookRepository.read({ id: bookId });
    if (member.books && member.books.length >= 2) {
      return ResponseMessage.member_limit;
    }

    // cheking if user in penalty period
    const penalty = member.penalty_start_date;
    if (penalty) {
      const today = new Date();
      if (today < penalty) return ResponseMessage.member_in_pinalty;
    }

    // cheking if book stock is available
    if (book.members && book.members.length >= book.stock) {
      return ResponseMessage.book_empty;
    }

    const isSuccess = await this._memberRepository.borrowBook(memberId, bookId);
    if (!isSuccess) {
      return ResponseMessage.unkown_member_book;
    }
    return ResponseMessage.success;
  }

  public async returnBook(
    memberId: string,
    bookid: string
  ): Promise<ResponseMessage> {
    const response = await this._memberRepository.returnBook(memberId, bookid);
    if (!response) {
      return ResponseMessage.unkown_member_book;
    }
    return ResponseMessage.success_return;
  }

  public async updateMemberPenalty() {
    const members = await this._memberRepository.findAllMember();
    const memberWithBook = members.filter((member) => {
      return member.books && member.books.length > 0;
    });
    console.log("Member with book : " + memberWithBook.length);

    const memberwithOverdue = memberWithBook.filter((member) => {
      return member.books?.find((book) => {
        return book.MemberBook ? book.MemberBook.dueDate < new Date() : false;
      });
    });
    console.log("Member with overdue : " + memberwithOverdue.length);
    for (const member of memberwithOverdue) {
      await this._memberRepository.update({
        id: member.id,
        penalty_start_date: moment().add(3, "day").toDate(),
      });
    }

    console.log("Success update overdue");
  }

  public async getAllAvailableBook(): Promise<IBook[]> {
    const books = await this._bookRepository.findAll();
    const availableBooks = books.filter((book) => {
      const borrowedStock = book.members ? book.members.length : 0;
      return book.stock > borrowedStock;
    });
    return availableBooks.map((book) => {
      return book.unmarshal();
    });
  }

  public async getAllMemberWithBorrowedBooks(): Promise<IMember[]> {
    const members = await this._memberRepository.findAllMember();
    return members.map((member) => {
      return member.unmarshal();
    });
  }
}
