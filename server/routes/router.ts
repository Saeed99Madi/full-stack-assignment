import { Router } from 'express';
import { errorWrapper } from '../utils';
import { authRouter } from './auth';
import { productRouter } from './products';

const router: Router = Router();
router.use('/user', errorWrapper(authRouter));
router.use('/products', errorWrapper(productRouter));

export { router };
