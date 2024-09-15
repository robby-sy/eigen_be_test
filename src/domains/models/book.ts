import type { Member } from "./member";

export interface IBook {
  id?: string;
  title: string;
  author: string;
  stock: number;
  members?: Member[];
  MemberBook?: { dueDate: Date };
}

export class Book implements IBook {
  private props: IBook;
  constructor(props: IBook) {
    this.props = props;
  }

  public static create(props: IBook) {
    return new Book(props);
  }

  public unmarshal(): IBook {
    const borrowedStock = this.members ? this.members.length : 0;
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      stock: this.stock - borrowedStock,
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get author(): string {
    return this.props.author;
  }
  get stock(): number {
    return this.props.stock;
  }
  get members(): Member[] | undefined {
    return this.props.members;
  }
  get MemberBook(): { dueDate: Date } | undefined {
    return this.props.MemberBook;
  }
}
