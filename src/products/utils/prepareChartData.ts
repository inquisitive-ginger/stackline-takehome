import { ChartData, ChartOptions } from "chart.js";
import { ProductSales } from "../types";

function datesToMonths(dates: string[]) {
  return dates.map((date) => {
    return new Date(date)
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
  });
}

function getXLabel() {
  let prevLabel = "";

  return function (this: any, tickValue: string | number) {
    const currentLabel = this.getLabelForValue(tickValue);

    if (currentLabel !== prevLabel) {
      prevLabel = currentLabel;
      return currentLabel;
    } else {
      return "";
    }
  };
}

export const salesChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        callback: getXLabel(),
      },
    },
    y: {
      // 🙈 note: i'm explicitly manipulating the scale to align the mock data a bit with the UI mock-up
      // but this is definitely not a good practice as it misrepresents actual data.
      min: -1000000,
      max: 2000000,
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

export default function prepareChartData(
  data: ProductSales[]
): ChartData<"line"> {
  return {
    labels: datesToMonths(data.map((d) => d.weekEnding)),
    datasets: [
      {
        data: data.map((d) => d.retailSales),
        cubicInterpolationMode: "monotone",
        pointRadius: 1,
        borderColor: "#1F75FE",
      },
      {
        data: data.map((d) => d.wholesaleSales),
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        borderColor: "#708090",
      },
    ],
  };
}
