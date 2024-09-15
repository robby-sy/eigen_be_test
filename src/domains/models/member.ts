import type { Book } from "./book";

export interface IMember {
  id?: string;
  name: string;
  penalty_start_date?: Date;
  books?: Book[];
  total_borrowed_book?: number;
}

export class Member implements IMember {
  private props: IMember;
  constructor(props: IMember) {
    this.props = props;
  }
  public static create(props: IMember) {
    return new Member(props);
  }

  public unmarshal(): IMember {
    return {
      id: this.id,
      name: this.name,
      total_borrowed_book: this.books ? this.books.length : 0,
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get penalty_start_date(): Date | undefined {
    return this.props.penalty_start_date;
  }

  get books(): Book[] | undefined {
    return this.props.books;
  }
}
