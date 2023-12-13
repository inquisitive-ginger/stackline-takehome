import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { ProductSales } from "./types";
import prepareChartData, { salesChartOptions } from "./utils/prepareChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: ProductSales[];
};

const ProductSalesChart = ({ data }: Props) => {
  const chartData = prepareChartData(data);

  return (
    <div className="shadow-md p-4 min-h-[600px] bg-white flex flex-col w-full">
      <h1 className="text-lg text-gray-500">Retail Sales</h1>
      <div className="relative m-auto w-[75vw] h-full">
        <Line options={salesChartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default ProductSalesChart;
