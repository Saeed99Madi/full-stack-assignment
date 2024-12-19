import { Response, Request, RequestHandler } from 'express';

import {
  CreateProductService,
  getAllProducts,
  GetProductData,
} from '../services';

import { IProductResponse } from '../interfaces/products';

export const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = (await CreateProductService(req)) as IProductResponse;
  res.status(data?.status).json(data);
};

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = await getAllProducts(req);
  res.status(data.status).json(data);
};

export const getProductData: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = await GetProductData(req);
  res.status(data.status).json(data);
};
