import express, { Router } from 'express';
export const authRouter: Router = express.Router();

import { signup, login, logout } from '../controllers/auth';

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
