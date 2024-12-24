import bcrypt from 'bcrypt';
import { User } from '../models';
import { CustomError } from '../utils';
import { generateToken } from '../utils/jwt/generateToken';
import { UserData } from '../interfaces/auth';
import { signupSchema, loginSchema } from '../validations';
import { userLoginAttrs } from '../interfaces/auth';
import { Op } from 'sequelize';

const signupService = async (
  userData: UserData,
): Promise<{
  status: number;
  data: object | string;
  token?: string | null;
}> => {
  const { username, email, cover, password } = userData;

  await signupSchema.validateAsync(userData);

  const userExists = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (userExists?.email === email || userExists?.username === username) {
    throw new CustomError(409, 'this is User Is Used Please Login');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    cover,
  });

  const token = await generateToken({
    username,
    email,
    cover,
    id: newUser.id,
  });

  return {
    status: 201,
    data: newUser,
    token,
  };
};

const loginService = async (
  userData: userLoginAttrs,
): Promise<{ loggedUser: object; token: string }> => {
  const { password, email } = userData;

  await loginSchema.validateAsync(userData);

  const user = await User.findOne({
    where: { email },
  });
  const users = await User.findAll();
  console.log(users);

  if (!user) {
    throw new CustomError(404, 'Password is not correct');
  }

  const result = await bcrypt.compare(password, user.dataValues.password);

  if (!result) {
    throw new CustomError(401, 'Passwrod or Email is not correct');
  }

  const userName = user.username;
  const { id, createdAt, updatedAt } = user.dataValues;

  const loggedUser = {
    id,
    username: userName,
    email,
    createdAt,
    updatedAt,
  };

  const token = await generateToken(loggedUser);
  return { loggedUser, token };
};

export { signupService, loginService };
