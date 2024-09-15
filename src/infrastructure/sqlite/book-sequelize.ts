import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "sequelize";
import type { Member } from "./member-sequelize";
import sequelize from "./sequelize";
import type { MemberBook } from "./member-book-sequelize";
export class Book extends Model<
  InferAttributes<Book>,
  InferCreationAttributes<Book>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare author: string;
  declare stock: number;
  declare members?: NonAttribute<Member[]>;
  declare MemberBook : NonAttribute<MemberBook>
}

Book.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, unique: true },
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "books",
    modelName: "book",
  }
);
