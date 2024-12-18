import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Category extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare cover: string;
}

Category.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { type: DataTypes.TEXT },
    cover: { type: DataTypes.TEXT },
  },
  {
    sequelize,
  },
);
export default Category;
