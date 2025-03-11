import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Avatar,
  Stack,
  Chip,
  Fab,
} from '@mui/material';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import { ChatSidebar } from '../../components/chat';
import { useResponsive } from '../../hooks/use-responsive';
import { getAIResponse, ChatMessage } from '../../services/openai';

// Update the Product interface to include more fields
interface Product {
  id: string;
  sku: string;
  brand: string;
  model: string;
  gender: string;
  category: string;
  subCategory: string;
  type: string;
  style: string;
  available: number;
  price: number;
  priceSale: number;
  discountPercentage: number;
  taxes: number;
  quantity: number;
  inventoryType: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  materials: string[];
  colors: string[];
  sizes: string[];
  fit: string;
  features: string[];
  warranty: string;
  certifications: string[];
  description: string;
  tags: string[];
  season: string;
  useCase: string[];
  createdAt: string;
  updatedAt: string;
  ratings: {
    totalRatings: number;
    totalSold: number;
    totalReviews: number;
    reviewSummary: {
      '5_star': number;
      '4_star': number;
      '3_star': number;
      '2_star': number;
      '1_star': number;
    };
  };
  images: string[];
  videos: string[];
  relatedProducts?: {
    id: string;
    name: string;
    price: number;
    coverUrl: string;
  }[];
  subDescription?: string;
}

// Update the mock data with more complete product information
const mockProducts: Product[] = [
  {
    id: '1234567890',
    sku: 'NK-AF1-97-BLK',
    brand: 'Nike',
    model: 'Air Force 1 NDESTRUKT',
    gender: 'Kids',
    category: 'Accessories',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 0,
    price: 83.74,
    priceSale: 83.74,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'out of stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner for soft comfort',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '<h3><b>Specifications</b></h3>\n<br/>\n<ul>\n<li><b>Category:</b> Shoes</li>\n<li><b>Manufacturer:</b> Nike</li>\n<li><b>Serial Number:</b> 358607726380311</li>\n<li><b>Ships From:</b> United States</li>\n</ul>\n<br/>\n<h3><b>Product Details</b></h3>\n<br/>\n<ul>\n<li>The foam sockliner feels soft and comfortable</li>\n<li>Pull tab for easy wear</li>\n<li>Not intended for use as Personal Protective Equipment</li>\n<li>Colour Shown: White/Black/Oxygen Purple/Action Grape</li>\n<li>Style: 921826-109</li>\n<li>Country/Region of Origin: China</li>\n</ul>\n<br/>\n<h3><b>Benefits</b></h3>\n<br/>\n<ul>\n<li>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</li>\n<li>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot</li>\n<li>The foam midsole feels springy and soft</li>\n<li>The rubber outsole adds traction and durability</li>\n</ul>\n<br/>\n<h3><b>Delivery and Returns</b></h3>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n<li>Standard delivered 4-5 Business Days</li>\n<li>Express delivered 2-4 Business Days</li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Air Force 1', 'Limited Edition', 'Kids Shoes'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-19T20:00:16.605Z',
    updatedAt: '2025-03-11T15:30:00.000Z',
    ratings: {
      totalRatings: 4.2,
      totalSold: 763,
      totalReviews: 1947,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
    ],
    videos: ['https://www.youtube.com/watch?v=product-demo-video'],
    relatedProducts: [
      {
        id: '6789012345',
        name: 'Nike Air Max 97',
        price: 99.99,
        coverUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      },
      {
        id: '5432109876',
        name: 'Nike Air Jordan 1',
        price: 120.5,
        coverUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      },
    ],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id1',
    sku: 'NK-AF1-NDESTRUKT',
    brand: 'Nike',
    model: 'Air Force 1 NDESTRUKT',
    gender: 'Kids',
    category: 'Accessories',
    subCategory: 'Accessories',
    type: 'Sneakers',
    style: 'Casual',
    available: 0,
    price: 83.74,
    priceSale: 83.74,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'out of stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Air Force 1', 'Limited Edition', 'Kids Shoes'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-19T20:00:16.605Z',
    updatedAt: '2024-12-19T20:00:16.605Z',
    ratings: {
      totalRatings: 4.2,
      totalSold: 763,
      totalReviews: 1947,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id2',
    sku: 'FOUND-MATTE-FLIP-FLOP',
    brand: 'Nike',
    model: 'Foundations Matte Flip Flop',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Flip Flops',
    style: 'Casual',
    available: 72,
    price: 97.14,
    priceSale: 97.14,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Flip Flop', 'Casual', 'Men Shoes'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Everyday Use'],
    createdAt: '2024-12-18T19:00:16.605Z',
    updatedAt: '2024-12-18T19:00:16.605Z',
    ratings: {
      totalRatings: 3.7,
      totalSold: 684,
      totalReviews: 9124,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id3',
    sku: 'NAIRZOOM-PEGASUS37',
    brand: 'Nike',
    model: 'Air Zoom Pegasus 37 A.I.R. Chaz Bear',
    gender: 'Women',
    category: 'Apparel',
    subCategory: 'Apparel',
    type: 'Sneakers',
    style: 'Casual',
    available: 10,
    price: 68.71,
    priceSale: 68.71,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'low stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Air Zoom Pegasus'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-17T18:00:16.606Z',
    updatedAt: '2024-12-17T18:00:16.606Z',
    ratings: {
      totalRatings: 4.5,
      totalSold: 451,
      totalReviews: 6984,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id4',
    sku: 'ARIZONA-SOFT-FOOTBED',
    brand: 'Nike',
    model: 'Arizona Soft Footbed Sandal',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sandals',
    style: 'Casual',
    available: 72,
    price: 85.21,
    priceSale: 85.21,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sandals', 'Soft Footbed'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Everyday Use'],
    createdAt: '2024-12-16T17:00:16.606Z',
    updatedAt: '2024-12-16T17:00:16.606Z',
    ratings: {
      totalRatings: 3.5,
      totalSold: 433,
      totalReviews: 8488,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id5',
    sku: 'BOSTON-SOFT-FOOTBED',
    brand: 'Nike',
    model: 'Boston Soft Footbed Sandal',
    gender: 'Women',
    category: 'Apparel',
    subCategory: 'Apparel',
    type: 'Sandals',
    style: 'Casual',
    available: 10,
    price: 52.17,
    priceSale: 52.17,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'low stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sandals', 'Soft Footbed'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Everyday Use'],
    createdAt: '2024-12-15T16:00:16.606Z',
    updatedAt: '2024-12-15T16:00:16.606Z',
    ratings: {
      totalRatings: 0.5,
      totalSold: 463,
      totalReviews: 2034,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id6',
    sku: 'ZOOM-FREAK2',
    brand: 'Nike',
    model: 'Zoom Freak 2',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 72,
    price: 25.18,
    priceSale: 25.18,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Zoom Freak'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-14T15:00:16.606Z',
    updatedAt: '2024-12-14T15:00:16.606Z',
    ratings: {
      totalRatings: 3,
      totalSold: 951,
      totalReviews: 3364,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id7',
    sku: 'NIKE-BLAZER-LOW77',
    brand: 'Nike',
    model: 'Nike Blazer Low 77 Vintage',
    gender: 'Kids',
    category: 'Accessories',
    subCategory: 'Accessories',
    type: 'Sneakers',
    style: 'Casual',
    available: 0,
    price: 64.55,
    priceSale: 64.55,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'out of stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Blazer', 'Vintage'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Everyday Use'],
    createdAt: '2024-12-07T08:00:16.606Z',
    updatedAt: '2024-12-07T08:00:16.606Z',
    ratings: {
      totalRatings: 3.9,
      totalSold: 839,
      totalReviews: 3035,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id8',
    sku: 'JORDAN-DELTA',
    brand: 'Nike',
    model: 'Jordan Delta',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 72,
    price: 60.98,
    priceSale: 60.98,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Jordan'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-12T13:00:16.606Z',
    updatedAt: '2024-12-12T13:00:16.606Z',
    ratings: {
      totalRatings: 2.8,
      totalSold: 425,
      totalReviews: 8996,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id9',
    sku: 'KYRIE7-EP-SISTERHOOD',
    brand: 'Nike',
    model: 'Kyrie 7 EP Sisterhood',
    gender: 'Women',
    category: 'Apparel',
    subCategory: 'Apparel',
    type: 'Sneakers',
    style: 'Casual',
    available: 10,
    price: 98.42,
    priceSale: 98.42,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'low stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Kyrie 7'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-11T12:00:16.606Z',
    updatedAt: '2024-12-11T12:00:16.606Z',
    ratings: {
      totalRatings: 4.9,
      totalSold: 435,
      totalReviews: 5271,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_9.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id10',
    sku: 'ROD-LAVER-LOWTOP',
    brand: 'Nike',
    model: 'Rod Laver low-top sneakers',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 72,
    price: 53.37,
    priceSale: 53.37,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Rod Laver'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-10T11:00:16.606Z',
    updatedAt: '2024-12-10T11:00:16.606Z',
    ratings: {
      totalRatings: 3.6,
      totalSold: 807,
      totalReviews: 8478,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_10.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id11',
    sku: 'PHARRELL-HUMAN-RACE-NMD',
    brand: 'Nike',
    model: 'Pharrell Williams Human Race NMD sneakers',
    gender: 'Women',
    category: 'Apparel',
    subCategory: 'Apparel',
    type: 'Sneakers',
    style: 'Casual',
    available: 10,
    price: 56.61,
    priceSale: 56.61,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Human Race', 'Pharrell'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-08T09:00:16.606Z',
    updatedAt: '2024-12-08T09:00:16.606Z',
    ratings: {
      totalRatings: 1.7,
      totalSold: 538,
      totalReviews: 8061,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_12.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id12',
    sku: 'ZX8000-LEGO',
    brand: 'Nike',
    model: 'ZX 8000 Lego sneakers',
    gender: 'Women',
    category: 'Apparel',
    subCategory: 'Apparel',
    type: 'Sneakers',
    style: 'Casual',
    available: 10,
    price: 60.62,
    priceSale: 60.62,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'low stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Lego', 'ZX 8000'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-09T10:00:16.606Z',
    updatedAt: '2024-12-09T10:00:16.606Z',
    ratings: {
      totalRatings: 4.1,
      totalSold: 269,
      totalReviews: 3952,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_15.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id13',
    sku: 'ZX9000-A-ZX',
    brand: 'Nike',
    model: 'ZX 9000 A-ZX Series sneakers',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 72,
    price: 47.44,
    priceSale: 47.44,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'ZX 9000'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-12-08T09:00:16.606Z',
    updatedAt: '2024-12-08T09:00:16.606Z',
    ratings: {
      totalRatings: 3.2,
      totalSold: 364,
      totalReviews: 6843,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_18.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id14',
    sku: 'MADRID-BIG-BUCKLE',
    brand: 'Nike',
    model: 'Madrid Big Buckle Sandal',
    gender: 'Kids',
    category: 'Accessories',
    subCategory: 'Accessories',
    type: 'Sandals',
    style: 'Casual',
    available: 0,
    price: 76.24,
    priceSale: 76.24,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'out of stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sandals', 'Big Buckle'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Everyday Use'],
    createdAt: '2024-12-01T02:00:16.606Z',
    updatedAt: '2024-12-01T02:00:16.606Z',
    ratings: {
      totalRatings: 0.6,
      totalSold: 849,
      totalReviews: 4672,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_19.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },
  {
    id: 'id15',
    sku: 'CHUCK70-HI-SNEAKER',
    brand: 'Nike',
    model: 'Chuck 70 Hi Sneaker',
    gender: 'Men',
    category: 'Shose',
    subCategory: 'Shoes',
    type: 'Sneakers',
    style: 'Casual',
    available: 72,
    price: 92.87,
    priceSale: 92.87,
    discountPercentage: 0,
    taxes: 10,
    quantity: 80,
    inventoryType: 'in stock',
    weight: '1.2 kg',
    dimensions: {
      length: '30 cm',
      width: '20 cm',
      height: '12 cm',
    },
    materials: ['Leather', 'Rubber', 'Mesh'],
    colors: ['White', 'Black', 'Oxygen Purple', 'Action Grape'],
    sizes: ['US 4', 'US 5', 'US 6', 'US 7'],
    fit: 'True to size',
    features: [
      'Foam sockliner feels soft and comfortable',
      'Pull tab for easy wear',
      'Not intended for use as Personal Protective Equipment',
      'Mesh and synthetic materials for durability',
      'Full-length Max Air unit for cushioning',
      'Springy foam midsole',
      'Rubber outsole for traction',
    ],
    warranty: '6 months manufacturer warranty',
    certifications: ['ISO 9001', 'CE Certified'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li><p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort and durability.</p></li>\n  <li><p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushioning underfoot.</p></li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n',
    tags: ['Nike', 'Sneakers', 'Chuck 70'],
    season: 'Fall/Winter 2024',
    useCase: ['Casual Wear', 'Sportswear', 'Everyday Use'],
    createdAt: '2024-11-30T01:00:16.606Z',
    updatedAt: '2024-11-30T01:00:16.606Z',
    ratings: {
      totalRatings: 1.3,
      totalSold: 804,
      totalReviews: 6995,
      reviewSummary: {
        '5_star': 1200,
        '4_star': 500,
        '3_star': 150,
        '2_star': 60,
        '1_star': 37,
      },
    },
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_20.jpg',
    ],
    videos: [],
    relatedProducts: [],
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
  },

  // Add more mock products with similar structure
  // You can copy the first one and modify some values
];

// Define column IDs for each table head item
const TABLE_HEAD = [
  { id: 'product', label: 'Product', minWidth: 200 },
  { id: 'sku', label: 'SKU', minWidth: 120 },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 80 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'quantity', label: 'Quantity', minWidth: 80, align: 'right' },
  { id: 'inventory', label: 'Status', minWidth: 100 },
  { id: 'colors', label: 'Colors', minWidth: 150 },
  { id: 'sizes', label: 'Sizes', minWidth: 120 },
  { id: 'rating', label: 'Rating', minWidth: 100, align: 'right' },
  { id: 'sold', label: 'Sold', minWidth: 80, align: 'right' },
  { id: 'date', label: 'Created At', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 80, align: 'right' },
];

// Add these mock data for chat after your mockProducts
const currentUser = {
  id: 'user1',
  name: 'Admin',
  avatar:
    'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
  status: 'online' as const,
};

const supportAgent = {
  id: 'agent1',
  name: 'Support Agent',
  avatar:
    'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
  status: 'online' as const,
};

const initialMessages = [
  {
    id: '1',
    content: 'Hello! How can I help you with your product inquiries today?',
    senderId: 'agent1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: true,
  },
];

// Add this function after your initialMessages declaration
const generateAIResponse = (
  message: string,
  product: Product | null,
): string => {
  // Convert message to lowercase for easier matching
  const query = message.toLowerCase();

  // Product-specific responses
  if (product) {
    // Price inquiries
    if (
      query.includes('price') ||
      query.includes('cost') ||
      query.includes('how much')
    ) {
      return `The ${product.brand} ${
        product.model
      } is priced at $${product.priceSale.toFixed(2)}${
        product.discountPercentage > 0
          ? ` (${
              product.discountPercentage
            }% off the regular price of $${product.price.toFixed(2)})`
          : ''
      }.`;
    }

    // Availability inquiries
    if (
      query.includes('available') ||
      query.includes('in stock') ||
      query.includes('buy')
    ) {
      if (product.inventoryType === 'in stock') {
        return `Yes, the ${product.brand} ${product.model} is currently in stock with ${product.quantity} units available for immediate shipping.`;
      }
      if (product.inventoryType === 'low stock') {
        return `The ${product.brand} ${product.model} is in low stock with only ${product.quantity} units remaining. I recommend placing your order soon if you're interested.`;
      }
      return `I'm sorry, the ${product.brand} ${product.model} is currently out of stock. Would you like me to notify you when it becomes available again?`;
    }

    // Size inquiries
    if (query.includes('size') || query.includes('fit')) {
      return `The ${product.brand} ${
        product.model
      } is available in the following sizes: ${product.sizes.join(
        ', ',
      )}. It's described as "${product.fit}".`;
    }

    // Color inquiries
    if (query.includes('color') || query.includes('colours')) {
      return `The ${product.brand} ${
        product.model
      } is available in these colors: ${product.colors.join(', ')}.`;
    }

    // Material inquiries
    if (
      query.includes('material') ||
      query.includes('made of') ||
      query.includes('made from')
    ) {
      return `The ${product.brand} ${
        product.model
      } is made from the following materials: ${product.materials.join(', ')}.`;
    }

    // Features inquiries
    if (
      query.includes('feature') ||
      query.includes('specification') ||
      query.includes('specs')
    ) {
      return `The ${product.brand} ${
        product.model
      } features include:\n- ${product.features.join('\n- ')}`;
    }

    // Shipping inquiries
    if (
      query.includes('shipping') ||
      query.includes('delivery') ||
      query.includes('ship')
    ) {
      return `Standard delivery for the ${product.brand} ${product.model} takes 4-5 business days. Express delivery (2-4 business days) is also available. Orders of $200 or more qualify for free standard shipping.`;
    }

    // Return policy inquiries
    if (query.includes('return') || query.includes('refund')) {
      return `We offer a 30-day return policy for the ${product.brand} ${product.model}. The item must be in its original condition with all tags and packaging intact.`;
    }

    // Warranty inquiries
    if (query.includes('warranty') || query.includes('guarantee')) {
      return `The ${product.brand} ${product.model} comes with ${product.warranty}.`;
    }

    // Generic product inquiry
    return `The ${product.brand} ${product.model} is a ${product.gender}'s ${
      product.type
    } in the ${
      product.category
    } category. It's designed for ${product.useCase.join(
      ', ',
    )}. What specific information would you like to know about this product?`;
  }

  // General inquiries (when no product is selected)
  if (
    query.includes('hello') ||
    query.includes('hi ') ||
    query.includes('hey')
  ) {
    return "Hello! I'm your product assistant. How can I help you today?";
  }

  if (query.includes('help') || query.includes('assist')) {
    return "I can help you with product information, availability, pricing, shipping details, and more. Is there a specific product you're interested in?";
  }

  if (
    query.includes('contact') ||
    query.includes('human') ||
    query.includes('agent')
  ) {
    return "If you'd like to speak with a human agent, please call our customer service at 1-800-123-4567 or email support@example.com. Our hours are Monday-Friday, 9am-5pm EST.";
  }

  if (query.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with today?";
  }

  // Default response
  return "I'm not sure I understand your question. Could you please provide more details or ask about a specific product feature like price, availability, sizes, or materials?";
};

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add these new state variables for chat
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [chatTyping, setChatTyping] = useState(false);

  // Add this to your state variables
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content:
        'You are a helpful product assistant for an e-commerce store. Provide concise, accurate information about products.',
    },
  ]);

  // Add this to your state variables
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'product',
    'sku',
    'category',
    'type',
    'gender',
    'price',
    'quantity',
    'inventory',
    'colors',
    'sizes',
    'rating',
    'sold',
    'date',
    'actions',
  ]);

  // Add this to your state variables
  const [isTableLoading, setIsTableLoading] = useState(false);

  const isDesktop = useResponsive('up', 'md');

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/products');
        // const data = await response.json();
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const tableData = products;

  const notFound = !tableData.length && !loading;

  // Now update your handleSendMessage function to use the AI response generator
  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const newMessage = {
      id: `msg_${Date.now()}`,
      content,
      senderId: currentUser.id,
      timestamp: new Date(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);

    // Check if this is a column visibility request
    const columnResponse = handleAIColumnRequest(content);

    // If it's a column request, respond immediately
    if (columnResponse) {
      const aiResponse = {
        id: `msg_${Date.now() + 1}`,
        content: columnResponse,
        senderId: 'agent1',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, aiResponse]);
      return;
    }

    // Otherwise, continue with the regular AI response flow
    setChatTyping(true);

    try {
      // Add user message to chat history
      const userMessage: ChatMessage = {
        role: 'user',
        content,
      };

      // Create updated history with product context if needed
      let updatedHistory = [...chatHistory];

      // If this is the first message after selecting a product, add product context
      if (selectedProduct && chatHistory.length === 1) {
        const productDetails = {
          name: `${selectedProduct.brand} ${selectedProduct.model}`,
          brand: selectedProduct.brand,
          model: selectedProduct.model,
          category: selectedProduct.category,
          subCategory: selectedProduct.subCategory,
          type: selectedProduct.type,
          gender: selectedProduct.gender,
          price: selectedProduct.priceSale,
          originalPrice: selectedProduct.price,
          discount: selectedProduct.discountPercentage,
          inventoryStatus: selectedProduct.inventoryType,
          quantity: selectedProduct.quantity,
          colors: selectedProduct.colors,
          sizes: selectedProduct.sizes,
          materials: selectedProduct.materials,
          features: selectedProduct.features,
          warranty: selectedProduct.warranty,
        };

        // Update system message with product context
        updatedHistory = [
          {
            role: 'system',
            content: `You are a helpful product assistant for an e-commerce store. The user is currently viewing the ${
              selectedProduct.brand
            } ${
              selectedProduct.model
            }. Here are the product details: ${JSON.stringify(
              productDetails,
            )}. When the user asks about "the product" or "this product", they are referring to the ${
              selectedProduct.brand
            } ${selectedProduct.model}.`,
          },
        ];
      }

      // Add user message to history
      updatedHistory.push(userMessage);

      // Get response from OpenAI with full conversation history
      const aiResponseText = await getAIResponse(updatedHistory);

      // Add AI response to chat UI
      const aiResponse = {
        id: `msg_${Date.now() + 1}`,
        content: aiResponseText,
        senderId: 'agent1',
        timestamp: new Date(),
        read: false,
      };

      // Add AI response to chat history
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: aiResponseText,
      };

      // Update state
      setMessages(prev => [...prev, aiResponse]);
      setChatHistory([...updatedHistory, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage = {
        id: `msg_${Date.now() + 1}`,
        content:
          "I'm sorry, I couldn't process your request. Please try again later.",
        senderId: 'agent1',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatTyping(false);
    }
  };

  // Modify the handleViewRow function
  const handleViewRow = (id: string) => {
    console.log('View row with ID:', id);
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);

      // Create a more personalized initial conversation
      const newMessages = [
        {
          id: '1',
          content: `Welcome! How can I help you with the ${product.brand} ${product.model}?`,
          senderId: 'agent1',
          timestamp: new Date(Date.now() - 1000 * 60),
          read: true,
        },
      ];

      // Reset chat history with product context and instructions for brevity
      const productDetails = {
        name: `${product.brand} ${product.model}`,
        brand: product.brand,
        model: product.model,
        category: product.category,
        type: product.type,
        gender: product.gender,
        price: product.priceSale,
        colors: product.colors,
        sizes: product.sizes,
        inventoryStatus: product.inventoryType,
      };

      const newChatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: `You are a helpful product assistant for an e-commerce store. The user is viewing the ${
            product.brand
          } ${product.model}. 
          Here are the key product details: ${JSON.stringify(productDetails)}. 
          Keep your responses brief and focused - no more than 2-3 sentences per response unless the user asks for more details.
          When the user asks about "the product" or "this product", they are referring to the ${
            product.brand
          } ${product.model}.`,
        },
        {
          role: 'assistant',
          content: newMessages[0].content,
        },
      ];

      setChatHistory(newChatHistory);
      setMessages(newMessages);
      setChatOpen(true);

      // Immediately trigger a brief AI response with product details
      setChatTyping(true);
      setTimeout(async () => {
        try {
          // Add a user message to the history
          const userMessage: ChatMessage = {
            role: 'user',
            content: `Give me a brief overview of the ${product.brand} ${product.model}.`,
          };

          const updatedHistory = [...newChatHistory, userMessage];

          // Get AI response with the full conversation history
          const aiResponseText = await getAIResponse(updatedHistory);

          const productInfoMessage = {
            id: `msg_${Date.now() + 1}`,
            content: aiResponseText,
            senderId: 'agent1',
            timestamp: new Date(),
            read: false,
          };

          // Add AI response to chat history
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: aiResponseText,
          };

          setMessages(prev => [...prev, productInfoMessage]);
          setChatHistory([...updatedHistory, assistantMessage]);
        } catch (error) {
          console.error('Error getting AI response:', error);
          const errorMessage = {
            id: `msg_${Date.now() + 1}`,
            content:
              "I'm sorry, I couldn't retrieve the product details at the moment.",
            senderId: 'agent1',
            timestamp: new Date(),
            read: false,
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setChatTyping(false);
        }
      }, 1000);
    }
  };

  // Add this function to handle column visibility changes from AI
  const handleAIColumnRequest = (content: string) => {
    const lowercaseContent = content.toLowerCase();
    console.log('Processing column request:', lowercaseContent);

    const allColumns = [
      'product',
      'sku',
      'category',
      'type',
      'gender',
      'price',
      'quantity',
      'inventory',
      'colors',
      'sizes',
      'rating',
      'sold',
      'date',
      'actions',
    ];

    // Map common terms to actual column names
    const columnMap: Record<string, string> = {
      name: 'product',
      product: 'product',
      sku: 'sku',
      category: 'category',
      type: 'type',
      gender: 'gender',
      price: 'price',
      cost: 'price',
      quantity: 'quantity',
      stock: 'quantity',
      inventory: 'inventory',
      status: 'inventory',
      colors: 'colors',
      sizes: 'sizes',
      rating: 'rating',
      ratings: 'rating',
      sold: 'sold',
      sales: 'sold',
      date: 'date',
      created: 'date',
      actions: 'actions',
    };

    const updateColumns = (newColumns: string[], message: string) => {
      setIsTableLoading(true);
      console.log('Updating columns to:', newColumns);

      // Force a reset of columns first
      setVisibleColumns([]);

      setTimeout(() => {
        setVisibleColumns(newColumns);
        setIsTableLoading(false);
      }, 800);

      return message;
    };

    // Check for show command
    if (
      lowercaseContent.includes('show') ||
      lowercaseContent.includes('display')
    ) {
      // Extract what to show
      const columnsToShow: string[] = [];

      // Handle "show all" separately
      if (
        lowercaseContent.includes('all') ||
        lowercaseContent.includes('everything')
      ) {
        return updateColumns(
          allColumns,
          "I've restored all columns in the table.",
        );
      }

      // Extract column names from the request
      Object.keys(columnMap).forEach(term => {
        if (lowercaseContent.includes(term)) {
          const column = columnMap[term];
          if (!columnsToShow.includes(column)) {
            columnsToShow.push(column);
          }
        }
      });

      // Always include product and actions columns
      if (!columnsToShow.includes('product')) columnsToShow.push('product');
      if (!columnsToShow.includes('actions')) columnsToShow.push('actions');

      if (columnsToShow.length > 0) {
        return updateColumns(
          columnsToShow,
          `I've updated the table to show: ${columnsToShow
            .map(col => col.replace(/([A-Z])/g, ' $1').toLowerCase())
            .join(', ')}`,
        );
      }
    }

    // Check for hide command
    if (
      lowercaseContent.includes('hide') ||
      lowercaseContent.includes('remove')
    ) {
      let columnsToHide: string[] = [];

      // Extract column names from the request
      Object.keys(columnMap).forEach(term => {
        if (lowercaseContent.includes(term)) {
          const column = columnMap[term];
          if (!columnsToHide.includes(column)) {
            columnsToHide.push(column);
          }
        }
      });

      if (columnsToHide.length > 0) {
        // Don't allow hiding product and actions
        columnsToHide = columnsToHide.filter(
          col => col !== 'product' && col !== 'actions',
        );

        // Use current visible columns instead of all columns
        const newColumns = visibleColumns.filter(
          col => !columnsToHide.includes(col),
        );

        // Make sure product and actions are always included
        if (!newColumns.includes('product')) newColumns.push('product');
        if (!newColumns.includes('actions')) newColumns.push('actions');

        return updateColumns(
          newColumns,
          `I've hidden the following columns: ${columnsToHide
            .map(col => col.replace(/([A-Z])/g, ' $1').toLowerCase())
            .join(', ')}`,
        );
      }
    }

    // Handle predefined views
    if (
      lowercaseContent.includes('product name and status') ||
      lowercaseContent.includes('name and status')
    ) {
      return updateColumns(
        ['product', 'inventory', 'actions'],
        "I've updated the table to show only product name and status.",
      );
    }

    // Rest of your existing conditions...

    return null;
  };

  // Move this inside the component
  const visibleTableHead = TABLE_HEAD.filter(column =>
    visibleColumns.includes(column.id),
  );

  // Add this before the return statement
  useEffect(() => {
    console.log('Current visible columns:', visibleColumns);
  }, [visibleColumns]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        transition: 'padding-right 0.3s',
        ...(chatOpen &&
          isDesktop && {
            paddingRight: '420px', // Increase from 340px to 420px to match the new chat width
          }),
      }}
    >
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Products
        </Typography>

        <Card
          sx={{
            transition: 'all 0.3s ease',
            ...(chatOpen &&
              isDesktop && {
                width: 'calc(100% - 40px)',
                marginRight: '20px',
              }),
          }}
        >
          <CardContent>
            {isTableLoading ? (
              <Box sx={{ p: 3 }}>
                <TableSkeleton />
              </Box>
            ) : (
              <>
                <TableContainer
                  sx={{
                    overflow: 'auto',
                    maxWidth: '100%',
                    transition: 'all 0.3s ease',
                    ...(chatOpen &&
                      isDesktop && {
                        maxWidth: 'calc(100% - 200px)',
                        marginRight: '20px',
                      }),
                  }}
                >
                  <Table
                    size="medium"
                    sx={{
                      minWidth: chatOpen && isDesktop ? 1000 : 1300,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={visibleTableHead}
                      rowCount={tableData.length}
                      numSelected={selected.length}
                      onSort={onSort}
                      onSelectAllRows={checked =>
                        onSelectAllRows(
                          checked,
                          tableData.map(row => row.id),
                        )
                      }
                    />

                    <TableBody>
                      {tableData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map(row => (
                          <ProductTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => onSelectRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                            visibleColumns={visibleColumns}
                          />
                        ))}

                      <TableEmptyRows
                        height={72}
                        emptyRows={emptyRows(
                          page,
                          rowsPerPage,
                          tableData.length,
                        )}
                      />

                      {notFound && <TableNoData notFound={notFound} />}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePaginationCustom
                  count={tableData.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                />
              </>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Floating chat button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: chatOpen ? 424 : 24, // Increase from 344 to 424
          zIndex: 1000,
          transition: 'right 0.3s',
        }}
        onClick={() => {
          setSelectedProduct(null);
          setMessages(initialMessages);
          setChatOpen(true);
        }}
      >
        <Iconify icon="eva:message-circle-fill" width={24} />
      </Fab>

      <ChatSidebar
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        currentUser={currentUser}
        recipient={supportAgent}
        messages={messages}
        onSendMessage={handleSendMessage}
        typing={chatTyping}
      />
    </Container>
  );
}

// Helper function to calculate empty rows
function emptyRows(
  page: number,
  rowsPerPage: number,
  totalRows: number,
): number {
  return page > 0
    ? Math.max(0, rowsPerPage - (totalRows - page * rowsPerPage))
    : 0;
}

// Get inventory status color
function getInventoryStatusColor(
  inventoryType: string,
): 'success' | 'warning' | 'error' | 'default' {
  if (inventoryType === 'in stock') return 'success';
  if (inventoryType === 'low stock') return 'warning';
  if (inventoryType === 'out of stock') return 'error';
  return 'default';
}

// Product Table Row component
interface ProductTableRowProps {
  row: Product;
  selected: boolean;
  onSelectRow: () => void;
  onViewRow: () => void;
  visibleColumns: string[];
}

function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  visibleColumns,
}: ProductTableRowProps) {
  const {
    id,
    sku,
    brand,
    model,
    gender,
    category,
    subCategory,
    type,
    style,
    price,
    priceSale,
    available,
    inventoryType,
    quantity,
    discountPercentage,
    images,
    ratings,
    colors,
    sizes,
    createdAt,
  } = row;

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      {visibleColumns.includes('product') && (
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={model}
              src={images[0]}
              variant="rounded"
              sx={{ width: 48, height: 48, borderRadius: 1.5 }}
            />
            <Box>
              <Typography variant="subtitle2" noWrap>
                {brand} {model}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {brand}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
      )}

      {visibleColumns.includes('sku') && <TableCell>{sku}</TableCell>}

      {visibleColumns.includes('category') && (
        <TableCell>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="body2">{category}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {subCategory}
            </Typography>
          </Stack>
        </TableCell>
      )}

      {visibleColumns.includes('type') && <TableCell>{type}</TableCell>}

      {visibleColumns.includes('gender') && <TableCell>{gender}</TableCell>}

      {visibleColumns.includes('price') && (
        <TableCell align="right">
          <Stack direction="column" alignItems="flex-end">
            {discountPercentage > 0 && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
              >
                ${price.toFixed(2)}
              </Typography>
            )}
            <Typography variant="body2">${priceSale.toFixed(2)}</Typography>
          </Stack>
        </TableCell>
      )}

      {visibleColumns.includes('quantity') && (
        <TableCell align="right">{quantity}</TableCell>
      )}

      {visibleColumns.includes('inventory') && (
        <TableCell>
          <Label variant="soft" color={getInventoryStatusColor(inventoryType)}>
            {inventoryType}
          </Label>
        </TableCell>
      )}

      {visibleColumns.includes('colors') && (
        <TableCell>
          <Stack direction="row" spacing={1}>
            {colors.slice(0, 3).map((color, index) => (
              <Chip
                key={index}
                label={color}
                size="small"
                variant="outlined"
                sx={{ maxWidth: 80 }}
              />
            ))}
            {colors.length > 3 && (
              <Chip
                label={`+${colors.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>
        </TableCell>
      )}

      {visibleColumns.includes('sizes') && (
        <TableCell>
          <Typography variant="body2">{sizes.join(', ')}</Typography>
        </TableCell>
      )}

      {visibleColumns.includes('rating') && (
        <TableCell align="right">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Iconify
              icon="eva:star-fill"
              sx={{ width: 16, height: 16, color: 'warning.main' }}
            />
            <Typography variant="body2">{ratings.totalRatings}</Typography>
          </Stack>
        </TableCell>
      )}

      {visibleColumns.includes('sold') && (
        <TableCell align="right">{ratings.totalSold}</TableCell>
      )}

      {visibleColumns.includes('date') && (
        <TableCell>{formattedDate}</TableCell>
      )}

      {visibleColumns.includes('actions') && (
        <TableCell align="right">
          <IconButton color="primary" onClick={onViewRow}>
            <Iconify icon="eva:eye-fill" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}
