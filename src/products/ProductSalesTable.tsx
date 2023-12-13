import { ProductSales } from "./types";

type Props = {
  data: ProductSales[];
};

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const headings = [
  "WEEK ENDING",
  "RETAIL SALES",
  "WHOLESALE SALES",
  "UNITS SOLD",
  "RETAILER MARGIN",
];

const ProductSalesTables = ({ data }: Props) => {
  return (
    <section className="relative overflow-auto shadow-md max-h-[800px] bg-white w-full">
      <table className="relative w-full text-sm text-center text-gray-500">
        <thead className="text-xs">
          <tr className="border-b">
            {headings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="bg-white sticky top-0 p-6 text-right first:text-left border-b"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((salesRecord: ProductSales) => (
            <tr key={salesRecord.weekEnding} className="border-b p-2">
              <td className="text-left px-6 py-4">{salesRecord.weekEnding}</td>
              <td className="text-right px-6 py-4">
                {currencyFormatter.format(salesRecord.retailSales)}
              </td>
              <td className="text-right px-6 py-4">
                {currencyFormatter.format(salesRecord.wholesaleSales)}
              </td>
              <td className="text-right px-6 py-4">{salesRecord.unitsSold}</td>
              <td className="text-right px-6 py-4">
                {currencyFormatter.format(salesRecord.retailerMargin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductSalesTables;
