import { Request, Response } from 'express';
import { loginService, signupService } from '../services';

const signup = async (req: Request, res: Response) => {
  const { token, data, status } = await signupService(req.body);

  res.cookie('token', token).json({
    status: 201,
    message: 'User created successfully',
    user: data,
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { loggedUser, token } = await loginService(req.body);

  res.cookie('token', token).json({
    status: 200,
    data: {
      message: 'Successfully Login',
      user: loggedUser,
    },
  });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({
    status: 200,
    data: {
      message: 'تم تسجيل الخروج بنجاح',
    },
  });
};

export { signup, login, logout };
