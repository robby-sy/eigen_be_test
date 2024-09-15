import {
  DataTypes,
  Model,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManyRemoveAssociationMixin,
  type BelongsToManyRemoveAssociationMixinOptions,
  type CreationOptional,
  type HasManyRemoveAssociationMixin,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "sequelize";
import type { Book } from "./book-sequelize";
import sequelize from "./sequelize";
export class Member extends Model<
  InferAttributes<Member>,
  InferCreationAttributes<Member>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare penalty_start_date?: Date | undefined;
  declare books: NonAttribute<Book[]>;
  declare removeBook: BelongsToManyRemoveAssociationMixin<Book, "id">;
  declare addBook: BelongsToManyAddAssociationMixin<Book, "id">;
}

Member.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    penalty_start_date: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "member",
    tableName: "members",
  }
);
