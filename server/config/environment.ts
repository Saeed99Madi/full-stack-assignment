import 'dotenv/config';
import { Dialect } from 'sequelize';

const { DEV_DB_URL, DATABASE_URL, TEST_URL, NODE_ENV, SECRET_KEY } =
  process.env;

export const nodeEnv = NODE_ENV;
export const { PORT } = process.env || 8080;
export const { BUILD_DB } = process.env;

interface connectionOption {
  dialect: Dialect;
  dialectOptions: {
    charset: string;
    ssl: boolean | object;
  };
}

if (!NODE_ENV || !SECRET_KEY) {
  throw new Error('Invalid Environment Variables');
}

export { SECRET_KEY };

export const sequelizeOption: connectionOption = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
    charset: 'utf8mb4',
  },
};

export let dbUrl = '';

if (NODE_ENV === 'production' && DATABASE_URL) {
  dbUrl = DATABASE_URL;
  sequelizeOption.dialectOptions.ssl = { rejectUnauthorized: false };
} else if (NODE_ENV === 'development' && DEV_DB_URL) {
  sequelizeOption.dialectOptions.ssl = false;
  dbUrl = DEV_DB_URL;
  sequelizeOption.dialectOptions = { ssl: false, charset: 'utf8mb4' };
} else if (NODE_ENV === 'test' && TEST_URL) {
  sequelizeOption.dialectOptions.ssl = false;
  dbUrl = TEST_URL;
  sequelizeOption.dialectOptions = { ssl: false, charset: 'utf8mb4' };
} else {
  throw new Error('Invalid NODE_ENV');
}
export default { SECRET_KEY };
