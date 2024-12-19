import express, { Router } from 'express';
export const authRouter: Router = express.Router();

import { signup, login, logout } from '../controllers/auth';
import { errorWrapper } from '../utils';

authRouter.post('/signup', errorWrapper(signup));
authRouter.post('/login', errorWrapper(login));
authRouter.post('/logout', errorWrapper(logout));
