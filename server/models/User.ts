import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class User extends Model {
  declare id?: number;
  declare email: string;
  declare username: string;
  declare password: string;
  declare cover: string;
}
User.init(
  {
    email: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING(25), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;
