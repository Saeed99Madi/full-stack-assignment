import { sequelize } from '.';
import { BUILD_DB } from '../../config';
import insertData from './insertData';

const build = async () => {
  try {
    await sequelize.sync({ force: true });
    await insertData();
    console.log('Database build complete');
  } catch (error) {
    console.error('Error building database:', error);
  }
};

if (BUILD_DB) {
  build();
}

export default build;
