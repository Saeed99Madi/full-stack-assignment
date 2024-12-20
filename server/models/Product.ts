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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: { type: DataTypes.STRING },
    publish: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    inventoryType: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    subDescription: { type: DataTypes.TEXT },
    coverUrl: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    priceSale: { type: DataTypes.INTEGER },
    totalRatings: { type: DataTypes.INTEGER },
    totalSold: { type: DataTypes.INTEGER },
    totalReviews: { type: DataTypes.INTEGER },
    taxes: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
    available: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
  },
);
export default Product;
