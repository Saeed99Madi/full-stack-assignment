import { Router } from 'express';
import { errorWrapper } from '../utils';
import { authRouter } from './auth';

const router: Router = Router();
router.use('/user', errorWrapper(authRouter));

export { router };
