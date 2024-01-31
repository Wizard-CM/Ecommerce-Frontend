import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const months = ["January", "February", "March", "April", "May", "June", "July"];
const Allmonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Setting up Monnth
const dynamicMonthData:string[] = [];
const previousSixMonthIncludingCurrent = new Date();
previousSixMonthIncludingCurrent.setMonth(
  previousSixMonthIncludingCurrent.getMonth() - 5
);

for (let i = 0; i < 6; i++) {
  let month = previousSixMonthIncludingCurrent.getMonth();

  dynamicMonthData.push(Allmonths[month]);
  month = month + 1;
  previousSixMonthIncludingCurrent.setMonth(
    previousSixMonthIncludingCurrent.getMonth() + 1
  );
}

interface chartProps {
  label1: string;
  label2: string;
  data1: number[];
  data2: number[];
  labels?: string[];
  backgroundColor1: string;
  backgroundColor2: string;
}

export function BarChart({
  label1,
  label2,
  data1,
  data2,
  labels = dynamicMonthData,
  backgroundColor1,
  backgroundColor2,
}: chartProps) {
  const options: ChartOptions<"bar"> = {
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
  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        backgroundColor: backgroundColor1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: label2,
        data: data2,
        backgroundColor: backgroundColor2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default chartProps;
