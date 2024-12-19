import { User } from '../models';

export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  cover: string;
}

export interface userLoginAttrs {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  cover: string;
}

export interface newUser extends User {
  id: number;
}
