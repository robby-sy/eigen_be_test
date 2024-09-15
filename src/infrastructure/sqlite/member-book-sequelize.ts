import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "./sequelize";
export class MemberBook extends Model<
  InferAttributes<MemberBook>,
  InferCreationAttributes<MemberBook>
> {
  declare dueDate: Date;
}

MemberBook.init(
  {
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize }
);
