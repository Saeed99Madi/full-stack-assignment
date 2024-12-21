/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../models';
import { CustomError } from '../utils';
import { productSchema } from '../validations';
import { IProductResponse, IProductsInterface } from '../interfaces/products';
import { Request } from 'express';
import { sequelize } from '../database';

export const CreateProductService = async (
  req: Request,
): Promise<IProductResponse> => {
  const { body } = req;
  const {
    name,
    gender,
    publish,
    category,
    inventoryType,
    description,
    subDescription,
    coverUrl,
    price,
    priceSale,
    totalRatings,
    totalSold,
    totalReviews,
    taxes,
    quantity,
    available,
  } = body;
  await productSchema({
    name,
    gender,
    publish,
    category,
    inventoryType,
    description,
    subDescription,
    coverUrl,
    price,
    priceSale,
    totalRatings,
    totalSold,
    totalReviews,
    taxes,
    quantity,
    available,
  });
  const product = await Product.findOne({ where: { name } });
  if (product) {
    throw new CustomError(401, 'The Product was added previously !');
  }
  const newProduct = await Product.create({
    name,
    gender,
    publish,
    category,
    inventoryType,
    description,
    subDescription,
    coverUrl,
    price,
    priceSale,
    totalRatings,
    totalSold,
    totalReviews,
    taxes,
    quantity,
    available,
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
  const limitNumber = limit ? parseInt(limit as string, 20) : 20;
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
