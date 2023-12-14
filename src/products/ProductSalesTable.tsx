import { useState } from "react";
import { ProductSales } from "./types";
import SortableTableHeader from "./SortableTableHeader";

type Props = {
  data: ProductSales[];
};

export type ProductSalesSort = {
  sortBy:
    | "WEEK ENDING"
    | "RETAIL SALES"
    | "WHOLESALE SALES"
    | "UNITS SOLD"
    | "RETAILER MARGIN";
  direction: "ASC" | "DESC";
};

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const headingsToKeyMap: Record<ProductSalesSort["sortBy"], keyof ProductSales> =
  {
    "WEEK ENDING": "weekEnding",
    "RETAIL SALES": "retailSales",
    "WHOLESALE SALES": "wholesaleSales",
    "UNITS SOLD": "unitsSold",
    "RETAILER MARGIN": "retailerMargin",
  };

const headings = Object.keys(headingsToKeyMap);

function getSortedData(data: ProductSales[], tableSort: ProductSalesSort) {
  let sortedData = [...data];

  if (tableSort.sortBy === "WEEK ENDING") {
    sortedData.sort((a, b) =>
      tableSort.direction === "ASC"
        ? a.weekEnding.localeCompare(b.weekEnding)
        : b.weekEnding.localeCompare(a.weekEnding)
    );
  } else {
    const property = headingsToKeyMap[tableSort.sortBy];

    sortedData.sort((a, b) => {
      const first: number = a[property] as number;
      const second: number = b[property] as number;

      return tableSort.direction === "ASC" ? first - second : second - first;
    });
  }

  return sortedData;
}

function getFormattedDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year}`;
}

const ProductSalesTable = ({ data }: Props) => {
  const [tableSort, setTableSort] = useState<ProductSalesSort>({
    sortBy: "WEEK ENDING",
    direction: "ASC",
  });

  const handleSort = (heading: ProductSalesSort["sortBy"]) => {
    let newDirection: ProductSalesSort["direction"];

    if (tableSort.sortBy === heading) {
      newDirection = tableSort.direction === "ASC" ? "DESC" : "ASC";
    } else {
      newDirection = "ASC";
    }

    setTableSort({ sortBy: heading, direction: newDirection });
  };

  const sortedData = getSortedData(data, tableSort);

  return (
    <section className="relative overflow-auto shadow-md max-h-[800px] bg-white w-full">
      <table className="relative w-full text-sm text-center text-gray-500">
        <thead className="text-xs">
          <tr className="border-b">
            {headings.map((heading) => (
              <SortableTableHeader
                key={heading}
                heading={heading as ProductSalesSort["sortBy"]}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((salesRecord: ProductSales) => (
            <tr key={salesRecord.weekEnding} className="border-b p-2">
              <td className="text-left px-6 py-4">
                {getFormattedDate(salesRecord.weekEnding)}
              </td>
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

export default ProductSalesTable;
