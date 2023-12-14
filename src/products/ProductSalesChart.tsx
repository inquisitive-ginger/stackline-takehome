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
import { useWindowSize } from "@uidotdev/usehooks";

import { ProductSales } from "./types";
import prepareChartData, {
  salesChartOptions,
} from "./utils/prepare-chart-data";

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

const M = 0.01844273;
const B = 41.5013;

const ProductSalesChart = ({ data }: Props) => {
  const chartData = prepareChartData(data);
  const size = useWindowSize();

  // 🙈 attempt to make the chart somewhat responsive
  const vw = Math.floor(M * size.width! + B);

  return (
    <div className="shadow-md p-4 min-h-[600px] bg-white flex flex-col w-full">
      <h1 className="text-lg text-gray-500">Retail Sales</h1>
      <div className={`relative w-[${vw}vw] h-full`}>
        <Line options={salesChartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default ProductSalesChart;
