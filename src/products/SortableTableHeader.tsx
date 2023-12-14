import { ProductSalesSort } from "./ProductSalesTable";

type Props = {
  heading: ProductSalesSort["sortBy"];
  onSort: (heading: ProductSalesSort["sortBy"]) => void;
};

import SortIcon from "./sort-solid.svg?react";

const SortableTableHeader = ({ heading, onSort }: Props) => {
  const handleClickHeader = () => {
    onSort(heading);
  };

  return (
    <th
      scope="col"
      className="bg-white sticky top-0 p-6 border-b cursor-pointer first:text-left text-right"
      onClick={handleClickHeader}
    >
      <span className="mr-1">{heading}</span>
      <SortIcon className="inline mb-0.5" />
    </th>
  );
};

export default SortableTableHeader;
