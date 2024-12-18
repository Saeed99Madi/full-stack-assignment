import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Product extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare cover: string;
  declare price: number;
}

Product.init(
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
    image: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
  },
);
export default Product;
