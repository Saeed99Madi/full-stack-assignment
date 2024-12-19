import express, { Router } from 'express';
export const productRouter: Router = express.Router();

import {
  createProduct,
  getProducts,
  getProductData,
} from '../controllers/Product';

productRouter.post('/products', createProduct);
productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProductData);
