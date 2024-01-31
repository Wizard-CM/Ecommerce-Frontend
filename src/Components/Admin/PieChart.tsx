import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface pieChartProps {
  dataArr: number[];
  backgroundColor: string[];
  offset?:number[]
  labels:string[]
  cutout?:string
}

export function PieChart({ dataArr, backgroundColor,offset,labels,cutout}: pieChartProps) {
  const data: ChartData<"pie", number[]> = {
    labels: labels,
    datasets: [
      {
        data: dataArr,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        offset:offset
      },
    ],
  };
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    cutout:cutout
  };
  return <Pie data={data} options={options} />;
}

export default PieChart;
