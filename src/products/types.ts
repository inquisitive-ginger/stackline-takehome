type Review = {
  customer: string;
  review: string;
  score: number;
};

export type ProductSales = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};

export type Product = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  tags: string[];
  sales: ProductSales[];
};
