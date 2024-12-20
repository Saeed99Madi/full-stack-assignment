/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Product } from '../models';
import { CustomError } from '../utils';
import { productSchema } from '../validations';
import { IProductResponse, IProductsInterface } from '../interfaces/products';
import { Request } from 'express';
import { sequelize } from '../database';

export const CreateProductService = async (
  req: Request,
): Promise<IProductResponse> => {
  const { body } = req;
  const { title, description, price, CategoryId, image } = body;
  await productSchema({ title, description, CategoryId });
  const product = await Product.findOne({ where: { title } });
  if (product) {
    throw new CustomError(401, 'The Product was added previously !');
  }
  const newProduct = await Product.create({
    title,
    description,
    CategoryId,
    price,
    image,
  });
  return {
    status: 201,
    data: newProduct,
  };
};

export const getAllProducts = async (
  req: Request,
): Promise<IProductsInterface> => {
  const { limit, page, search } = req.query;
  const pageNumber = page ? parseInt(page as string, 10) : 1;
  const limitNumber = limit ? parseInt(limit as string, 10) : 10;
  const offset = (pageNumber - 1) * limitNumber;

  let searchCondition: any = {};
  if (search) {
    searchCondition = {
      '$Product.name$': sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Product.name')),
        'LIKE',
        '%' + search + '%',
      ),
    };
  }

  const products = await Product.findAndCountAll({
    where: { ...searchCondition },
    offset,
    limit: limitNumber,
  });

  if (products.rows.length > 0) {
    return {
      status: 200,
      data: products.rows,
    };
  } else {
    return {
      status: 404,
      data: 'There is no Products :(',
    };
  }
};

export const GetProductData = async (
  req: Request,
): Promise<IProductsInterface> => {
  const { id } = req.params;

  const product = await Product.findAll({
    where: { id: +id, active: true },
  });

  if (!product) {
    return {
      status: 404,
      data: 'this Product not found',
    };
  }
  return {
    status: 200,
    data: product,
  };
};
