import { BarChart } from "../../../Components/Admin/BarChart";
import { useBarDataQuery } from "../../../Redux/API/ChartApi";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import Loader from "../../../Components/Loader";
import { DynamicMonthNew } from "../../../Components/Admin/DynamicMonth";


const dynamicMonthDataSixMonth: string[] = DynamicMonthNew({
  totalPreviousMonthsIncCurrent: 6,
});
const dynamicMonthDataTwelveMonth: string[] = DynamicMonthNew({
  totalPreviousMonthsIncCurrent: 12,
});
console.log(dynamicMonthDataSixMonth);
console.log(dynamicMonthDataTwelveMonth);

const Bar = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { data, isLoading } = useBarDataQuery(user?._id);
  // console.log(data)

  const chartDataSixMonth = data?.sixMonthBarChartData;
  const chartDataTwelveMonth = data?.twelveMonthBarChartData;

  console.log(chartDataTwelveMonth);
  return (
    <div className="outlet">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Barcharts</h2>
          <div className="bar-chart-container">
            <div className="chartItem">
              <BarChart
                data1={chartDataSixMonth?.sixMonthProductsArray || []}
                data2={data?.sixMonthBarChartData?.sixMonthUsersArray || []}
                label1="Products"
                label2="Users"
                backgroundColor1="#7e3dff"
                backgroundColor2="#ff5050"
                labels={dynamicMonthDataSixMonth}
              />
              <h3>Top Products and Top Users</h3>
            </div>
            <div className="chartItem">
              <BarChart
                data1={chartDataTwelveMonth?.twelveMonthOrderArray || []}
                data2={[]}
                label1="Orders"
                label2=""
                backgroundColor1="#2ff86e"
                backgroundColor2=""
                labels={dynamicMonthDataTwelveMonth}
              />
              <h3>Orders Throughout The Year</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bar;
