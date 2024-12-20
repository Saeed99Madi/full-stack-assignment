import express, { Router } from 'express';
export const productRouter: Router = express.Router();

import {
  createProduct,
  getProducts,
  getProductData,
} from '../controllers/Product';
import { errorWrapper } from '../utils';

productRouter.post('/', errorWrapper(createProduct));
productRouter.get('/', errorWrapper(getProducts));
productRouter.get('/:id', errorWrapper(getProductData));
