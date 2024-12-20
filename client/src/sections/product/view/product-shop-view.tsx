import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
// routes
import { paths } from 'src/routes/paths';
// _mock
import {
  PRODUCT_SORT_OPTIONS,
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_RATING_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
} from 'src/_mock';
// api
// import { useGetProducts, useSearchProducts } from 'src/api/product';
import { useSearchProducts } from 'src/api/product';
// components
// import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
// types
import {
  IProductItem,
  IProductFilters,
  IProductFilterValue,
} from 'src/types/product';
//
// import { useCheckoutContext } from '../../checkout/context';
import ProductList from '../product-list';
import ProductSort from '../product-sort';
import ProductSearch from '../product-search';
import ProductFilters from '../product-filters';
import ProductFiltersResult from '../product-filters-result';

// ----------------------------------------------------------------------

const defaultFilters: IProductFilters = {
  gender: [],
  colors: [],
  rating: '',
  category: 'all',
  priceRange: [0, 200],
};
const products: IProductItem[] = [
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    gender: 'Kids',
    publish: 'draft',
    category: 'Accessories',
    available: 0,
    priceSale: 83.74,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'out of stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE270',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5210YW/SV',
    createdAt: '2024-12-19T20:00:16.605Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Nike Air Force 1 NDESTRUKT',
    price: 83.74,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
    totalRatings: 4.2,
    totalSold: 763,
    totalReviews: 1947,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#00AB55', '#000000'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE271',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: true,
      content: 'NEW',
    },
    sku: 'WW75K5211YW/SV',
    createdAt: '2024-12-18T19:00:16.605Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Foundations Matte Flip Flop',
    price: 97.14,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
    totalRatings: 3.7,
    totalSold: 684,
    totalReviews: 9124,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#000000', '#FFFFFF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE272',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: true,
      content: 'NEW',
    },
    sku: 'WW75K5212YW/SV',
    createdAt: '2024-12-17T18:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
    price: 68.71,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
    totalRatings: 4.5,
    totalSold: 451,
    totalReviews: 6984,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFFFFF', '#FFC0CB'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
    gender: 'Men',
    publish: 'draft',
    category: 'Shose',
    available: 72,
    priceSale: 85.21,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE273',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: true,
      content: 'NEW',
    },
    sku: 'WW75K5213YW/SV',
    createdAt: '2024-12-16T17:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Arizona Soft Footbed Sandal',
    price: 85.21,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
    totalRatings: 3.5,
    totalSold: 433,
    totalReviews: 8488,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFC0CB', '#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE274',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5214YW/SV',
    createdAt: '2024-12-15T16:00:16.606Z',
    saleLabel: {
      enabled: true,
      content: 'SALE',
    },
    name: 'Boston Soft Footbed Sandal',
    price: 52.17,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
    totalRatings: 0.5,
    totalSold: 463,
    totalReviews: 2034,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE275',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5215YW/SV',
    createdAt: '2024-12-14T15:00:16.606Z',
    saleLabel: {
      enabled: true,
      content: 'SALE',
    },
    name: 'Zoom Freak 2',
    price: 25.18,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
    totalRatings: 3,
    totalSold: 951,
    totalReviews: 3364,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
    gender: 'Kids',
    publish: 'draft',
    category: 'Accessories',
    available: 0,
    priceSale: 43.84,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'out of stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE276',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5216YW/SV',
    createdAt: '2024-12-13T14:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Gazelle Vintage low-top sneakers',
    price: 43.84,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
    totalRatings: 2.5,
    totalSold: 194,
    totalReviews: 8401,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#00AB55', '#000000'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE277',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5217YW/SV',
    createdAt: '2024-12-12T13:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Jordan Delta',
    price: 60.98,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    totalRatings: 2.8,
    totalSold: 425,
    totalReviews: 8996,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE278',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5218YW/SV',
    createdAt: '2024-12-11T12:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Air Jordan XXXV PF',
    price: 98.42,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_9.jpg',
    totalRatings: 4.9,
    totalSold: 435,
    totalReviews: 5271,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFFFFF', '#FFC0CB'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
    gender: 'Men',
    publish: 'draft',
    category: 'Shose',
    available: 72,
    priceSale: 53.37,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE279',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K5219YW/SV',
    createdAt: '2024-12-10T11:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Rod Laver low-top sneakers',
    price: 53.37,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_10.jpg',
    totalRatings: 3.6,
    totalSold: 807,
    totalReviews: 8478,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2710',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52110YW/SV',
    createdAt: '2024-12-09T10:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Kyrie 7 EP Sisterhood',
    price: 72.75,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_11.jpg',
    totalRatings: 2.5,
    totalSold: 521,
    totalReviews: 1139,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFC0CB', '#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2711',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52111YW/SV',
    createdAt: '2024-12-08T09:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Pharrell Williams Human Race NMD sneakers',
    price: 56.61,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_12.jpg',
    totalRatings: 1.7,
    totalSold: 538,
    totalReviews: 8061,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13',
    gender: 'Kids',
    publish: 'draft',
    category: 'Accessories',
    available: 0,
    priceSale: 64.55,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'out of stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2712',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52112YW/SV',
    createdAt: '2024-12-07T08:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Nike Blazer Low 77 Vintage',
    price: 64.55,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_13.jpg',
    totalRatings: 3.9,
    totalSold: 839,
    totalReviews: 3035,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2713',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52113YW/SV',
    createdAt: '2024-12-06T07:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'ASMC Winter Boot Cold.Rdy',
    price: 77.32,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_14.jpg',
    totalRatings: 2.8,
    totalSold: 394,
    totalReviews: 6733,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FF4842', '#1890FF', '#94D82D'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2714',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52114YW/SV',
    createdAt: '2024-12-05T06:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'ZX 8000 Lego sneakers',
    price: 60.62,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_15.jpg',
    totalRatings: 4.1,
    totalSold: 269,
    totalReviews: 3952,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#00AB55', '#000000'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16',
    gender: 'Men',
    publish: 'draft',
    category: 'Shose',
    available: 72,
    priceSale: 79.81,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2715',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52115YW/SV',
    createdAt: '2024-12-04T05:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Ultraboost 21 sneakers',
    price: 79.81,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_16.jpg',
    totalRatings: 4.5,
    totalSold: 453,
    totalReviews: 2405,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#1890FF', '#94D82D', '#FFC107'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
    gender: 'Women',
    publish: 'published',
    category: 'Apparel',
    available: 10,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'low stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2716',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52116YW/SV',
    createdAt: '2024-12-03T04:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: '2750 Cotu Classic Sneaker',
    price: 93.68,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_17.jpg',
    totalRatings: 2.2,
    totalSold: 821,
    totalReviews: 3127,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FF4842', '#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2717',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52117YW/SV',
    createdAt: '2024-12-02T03:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'ZX 9000 A-ZX Series sneakers',
    price: 47.44,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_18.jpg',
    totalRatings: 3.2,
    totalSold: 364,
    totalReviews: 6843,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#1890FF'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19',
    gender: 'Kids',
    publish: 'draft',
    category: 'Accessories',
    available: 0,
    priceSale: 76.24,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'out of stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2718',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52118YW/SV',
    createdAt: '2024-12-01T02:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Madrid Big Buckle Sandal',
    price: 76.24,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_19.jpg',
    totalRatings: 0.6,
    totalSold: 849,
    totalReviews: 4672,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#00AB55', '#000000'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20',
    gender: 'Men',
    publish: 'published',
    category: 'Shose',
    available: 72,
    priceSale: null,
    taxes: 10,
    quantity: 80,
    sizes: [
      '6',
      '7',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '13',
    ],
    inventoryType: 'in stock',
    images: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
    ratings: [
      {
        name: '1 Star',
        starCount: 9911,
        reviewCount: 1947,
      },
      {
        name: '2 Star',
        starCount: 1947,
        reviewCount: 9124,
      },
      {
        name: '3 Star',
        starCount: 9124,
        reviewCount: 6984,
      },
      {
        name: '4 Star',
        starCount: 6984,
        reviewCount: 8488,
      },
      {
        name: '5 Star',
        starCount: 8488,
        reviewCount: 2034,
      },
    ],
    reviews: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'Jayvion Simon',
        postedAt: '2024-12-19T20:00:16.604Z',
        comment:
          'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        isPurchased: true,
        rating: 4.2,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        helpful: 9911,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'Lucian Obrien',
        postedAt: '2024-12-18T19:00:16.605Z',
        comment:
          'She eagerly opened the gift, her eyes sparkling with excitement.',
        isPurchased: true,
        rating: 3.7,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        helpful: 1947,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Deja Brady',
        postedAt: '2024-12-17T18:00:16.605Z',
        comment:
          'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
        isPurchased: true,
        rating: 4.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        helpful: 9124,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Harrison Stein',
        postedAt: '2024-12-16T17:00:16.605Z',
        comment:
          'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        isPurchased: false,
        rating: 3.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        helpful: 6984,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        postedAt: '2024-12-15T16:00:16.605Z',
        comment:
          'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        isPurchased: false,
        rating: 0.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        helpful: 8488,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        name: 'Lainey Davidson',
        postedAt: '2024-12-14T15:00:16.605Z',
        comment:
          'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
        isPurchased: true,
        rating: 3,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
        helpful: 2034,
        attachments: [
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
          'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        name: 'Cristopher Cardenas',
        postedAt: '2024-12-13T14:00:16.605Z',
        comment:
          'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
        isPurchased: false,
        rating: 2.5,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
        helpful: 3364,
        attachments: [],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        name: 'Melanie Noble',
        postedAt: '2024-12-12T13:00:16.605Z',
        comment:
          'The waves crashed against the shore, creating a soothing symphony of sound.',
        isPurchased: false,
        rating: 2.8,
        avatarUrl:
          'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
        helpful: 8401,
        attachments: [],
      },
    ],
    tags: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
    code: '38BEE2719',
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    newLabel: {
      enabled: false,
      content: 'NEW',
    },
    sku: 'WW75K52119YW/SV',
    createdAt: '2024-11-30T01:00:16.606Z',
    saleLabel: {
      enabled: false,
      content: 'SALE',
    },
    name: 'Chuck 70 Hi Sneaker',
    price: 92.87,
    coverUrl:
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_20.jpg',
    totalRatings: 1.3,
    totalSold: 804,
    totalReviews: 6995,
    subDescription:
      'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
    colors: ['#FF4842', '#1890FF'],
  },
];
// ----------------------------------------------------------------------

export default function ProductShopView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('featured');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const [filters, setFilters] = useState(defaultFilters);

  const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);

  const handleFilters = useCallback(
    (name: string, value: IProductFilterValue) => {
      setFilters((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  const dataFiltered = applyFilter({
    inputData: products,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  //   const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <ProductSearch
        query={debouncedQuery}
        results={searchResults}
        onSearch={handleSearch}
        loading={searchLoading}
        hrefItem={(id: string) => paths.dashboard.one}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <ProductFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          colorOptions={PRODUCT_COLOR_OPTIONS}
          ratingOptions={PRODUCT_RATING_OPTIONS}
          genderOptions={PRODUCT_GENDER_OPTIONS}
          categoryOptions={['all', ...PRODUCT_CATEGORY_OPTIONS]}
        />

        <ProductSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={PRODUCT_SORT_OPTIONS}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <ProductFiltersResult
      filters={filters}
      onFilters={handleFilters}
      //
      canReset={canReset}
      onResetFilters={handleResetFilters}
      //
      results={dataFiltered.length}
    />
  );

  //   const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      {/* <CartIcon totalItems={checkout.totalItems} /> */}

      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Shop
      </Typography>

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {/* {(notFound || productsEmpty) && renderNotFosund} */}

      <ProductList products={dataFiltered} loading={false} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IProductItem[];
  filters: IProductFilters;
  sortBy: string;
}) {
  const { gender, category, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }

  // FILTERS
  if (gender.length) {
    inputData = inputData.filter(product => gender.includes(product.gender));
  }

  if (category !== 'all') {
    inputData = inputData.filter(product => product.category === category);
  }

  // if (colors.length) {
  //   inputData = inputData.filter((product) =>
  //     product.colors.some((color) => colors.includes(color))
  //   );
  // }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter(
      product => product.price >= min && product.price <= max,
    );
  }

  if (rating) {
    inputData = inputData.filter(product => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  }

  return inputData;
}
