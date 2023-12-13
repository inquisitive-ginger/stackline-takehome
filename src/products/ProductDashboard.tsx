import ProductDetailsAside from "./ProductDetailsAside";
import ProductSalesChart from "./ProductSalesChart";
import ProductSalesTable from "./ProductSalesTable";
import { useFetchProductByIdQuery } from "./product-api.slice";
import ProductDashboardLoading from "./ProductDashboardLoading";
import { Product } from "./types";

type Props = {
  id: string;
};

const ProductDashboard = ({ id }: Props) => {
  const { data, isFetching } = useFetchProductByIdQuery(id);

  if (isFetching) {
    return <ProductDashboardLoading />;
  }

  const { sales, ...productDetails } = data as Product;

  return (
    <main className="flex flex-col md:flex-row p-6 gap-6 relative bg-gray-50 overflow-auto">
      <ProductDetailsAside product={productDetails} />
      <div className="flex flex-col flex-1 gap-6">
        <ProductSalesChart data={sales} />
        <ProductSalesTable data={sales} />
      </div>
    </main>
  );
};

export default ProductDashboard;
