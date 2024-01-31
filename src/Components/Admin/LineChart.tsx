import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const months = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
interface lineChartProps {
  label1: string;
  data1: number[];
  labels?: string[];
  borderColor1: string;
  backgroundColor:string
}

export function LineChart({
  label1,
  data1,
  borderColor1,
  backgroundColor
}: lineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"line", number[], string> = {
    labels: months,
    datasets: [
      {
        label: label1,
        data: data1,
        borderColor: borderColor1,
        fill: true,
        backgroundColor:backgroundColor

      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default LineChart;
