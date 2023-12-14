import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { ProductSales } from "../types";
import { currencyFormatter } from "../ProductSalesTable";

function weekEndingToAbbreviatedMonth(weekEnding: string) {
  const date = new Date(weekEnding);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date.toLocaleString("en-US", { month: "short" }).toUpperCase();
}

function getXLabel() {
  let prevLabel = "";

  return function (this: any, tickValue: string | number) {
    const currentLabel = this.getLabelForValue(tickValue);
    const asMonth = weekEndingToAbbreviatedMonth(currentLabel);

    if (asMonth !== prevLabel) {
      prevLabel = asMonth;
      return asMonth;
    } else {
      return "";
    }
  };
}

export const salesChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context: TooltipItem<"line">[]) {
          const { label } = context[0];

          const weekEnding = new Date(label);

          weekEnding.setMinutes(
            weekEnding.getMinutes() + weekEnding.getTimezoneOffset()
          );

          const formattedWeekEnding = weekEnding.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          });

          return `Week Ending: ${formattedWeekEnding}`;
        },
        label: function (context: TooltipItem<"line">) {
          const { label } = context.dataset;
          const formattedValue = currencyFormatter.format(context.parsed.y);

          return `${label}: ${formattedValue}`;
        },
      },
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
        autoSkip: false,
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
    labels: data.map((d) => d.weekEnding),
    datasets: [
      {
        label: "Retail Sales",
        data: data.map((d) => d.retailSales),
        cubicInterpolationMode: "monotone",
        pointRadius: 1,
        borderColor: "#189ad3",
      },
      {
        label: "Wholesale Sales",
        data: data.map((d) => d.wholesaleSales),
        cubicInterpolationMode: "monotone",
        pointRadius: 0,
        borderColor: "#708090",
      },
    ],
  };
}
