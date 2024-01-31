import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface doughnutChartProps {
  labels: string[];
  label: string;
  dataArr: number[];
  backgroundColor: string[];
}

export function DoughnutChart({
  labels,
  label,
  dataArr,
  backgroundColor,
}: doughnutChartProps) {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    cutout: `70%`,
  };
  const data: ChartData<"doughnut", number[]> = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: dataArr,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        offset: 20,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;


