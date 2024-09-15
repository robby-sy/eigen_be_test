import { Book } from "./book-sequelize";
import { Member } from "./member-sequelize";
import { MemberBook } from "./member-book-sequelize";

(async () => {
  await Book.sync({ alter: false });
  await Member.sync({ alter: false });
  await MemberBook.sync({ alter: false });
})();

Book.belongsToMany(Member, { through: MemberBook });
Member.belongsToMany(Book, { through: MemberBook });

export { Book, Member };
