import { Sequelize } from 'sequelize';
import { dbUrl, sequelizeOption } from '../../config';

export const sequelize = new Sequelize(dbUrl, {
  ...sequelizeOption,
});
