import bcrypt from 'bcrypt';

import { Category, Product, User } from '../../models';
import data from './seeds.json';

const insertData = async (): Promise<void> => {
  // Seed the Data

  await User.create({
    name: data.User[0].name,
    email: data.User[0].email,
    password: await bcrypt.hash(data.User[0].password, 15),
  });

  await Category.bulkCreate(data.Categorys);

  await Product.bulkCreate(data.Products);
};

export default insertData;
