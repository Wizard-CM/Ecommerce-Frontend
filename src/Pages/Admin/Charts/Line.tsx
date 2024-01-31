import LineChart from "../../../Components/Admin/LineChart";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import { useLineDataQuery } from "../../../Redux/API/ChartApi";
import Loader from "../../../Components/Loader";

const Line = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { data, isLoading } = useLineDataQuery(user?._id);
  console.log(data?.lineChartPageData);

  const lineDataObject = data?.lineChartPageData;
  const ActiveUserArray = lineDataObject?.users  || []
  const revenueArray = lineDataObject?.revenue || []
  const discountArray = lineDataObject?.discount || []
  return (
    <div className="outlet">
      <h2>Line Chart</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="line-chart-container">
          <div className="line-chart-item">
            <LineChart
              data1={ActiveUserArray}
              label1="Users "
              borderColor1="#7e3dff"
              backgroundColor="#7e3dff3b"
            />
            <h3>Active Users</h3>
          </div>
          <div className="line-chart-item">
            <LineChart
              data1={revenueArray}
              label1="Products"
              borderColor1="#3aff5e"
              backgroundColor="#3aff5e40"
            />
            <h3>Total Revenue</h3>
          </div>
          <div className="line-chart-item">
            <LineChart
              data1={discountArray}
              label1="Products"
              borderColor1="#ff226f"
              backgroundColor="#ff226f3c"
            />
            <h3>Discount Alloted</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Line;
