import React from 'react';
import { Helmet } from 'react-helmet-async'; // If you're using react-helmet
import { ProductsView } from '../../sections/products';

function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Products | Your App Name</title>
      </Helmet>

      <ProductsView />
    </>
  );
}

export default ProductsPage;
