import { Helmet } from 'react-helmet-async';
// sections
import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      <ProductShopView />
    </>
  );
}
