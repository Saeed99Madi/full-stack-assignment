// @mui
import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { IProductItem } from 'src/types/product';
//
import { Dispatch, SetStateAction } from 'react';
import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  products: IProductItem[];
  loading?: boolean;
};

export default function ProductList({
  currentPage,
  setCurrentPage,
  products,
  loading,
  ...other
}: Props) {
  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setCurrentPage(value);
  };
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {currentItems.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {products.length > 8 && (
        <Pagination
          count={Math.ceil(products.length / 8)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
