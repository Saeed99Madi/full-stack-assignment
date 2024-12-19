import { Product } from '../models';

export interface IProductResponse {
  status: number;
  data: string | object;
}

export interface IProductsInterface {
  status: number;
  data: Product[] | string | Product;
}
