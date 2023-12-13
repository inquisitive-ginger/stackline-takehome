import ProductTags from "./ProductTags";
import { Product } from "./types";

type Props = {
  product: Omit<Product, "sales">;
};

const ProductDetailsAside = ({ product }: Props) => {
  return (
    <section className="w-full md:min-w-[325px] md:max-w-[325px] shadow-md p-4 md:p-0 md:py-4 flex flex-row align-middle md:flex-col md:items-center bg-white">
      <img src={product.image} alt={product.title} className="w-40 h-40" />
      <div className="mt-4 flex flex-col md:items-center px-4">
        <h1 className="text-xl text-left font-medium text-gray-900">
          {product.title}
        </h1>
        <p className="md:text-center text-gray-400 mt-2">{product.subtitle}</p>
      </div>
      <ProductTags tags={product.tags} />
    </section>
  );
};

export default ProductDetailsAside;