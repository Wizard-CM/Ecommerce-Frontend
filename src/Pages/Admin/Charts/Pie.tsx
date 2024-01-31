import PieChart from "../../../Components/Admin/PieChart";
import { useChartDashboardDataQuery } from "../../../Redux/API/ChartApi";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import { Navigate } from "react-router-dom";

const Pie = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { data,isError} = useChartDashboardDataQuery(user?._id);

  const pieData = data?.chartData[6];
  if(isError){
    return <Navigate to="/admin/line" />
  }

  return (
    <div className="outlet">
      <h2>Pie Charts</h2>
      <h5>
        {"("} Current Month Data {")"}
      </h5>
      <div className="pie-chart-container">
        <div className="pie-chart-item">
          <PieChart
            labels={["Processing", "Delivered", "Shipped"]}
            dataArr={[
              pieData?.orderStatusObject.Processing,
              pieData?.orderStatusObject.Delivered,
              pieData?.orderStatusObject.Shipped,
            ]}
            backgroundColor={["#fdb232", "#41ffff", "#673dff"]}
            offset={[40, 0, 0]}
          />
          <h3>Order Fullfillment Ratio</h3>
        </div>
        <div className="pie-chart-item">
          <PieChart
            labels={["Out Of Stock", "In Stock"]}
            dataArr={[
              pieData?.productStockObject.OutOfStock,
              pieData?.productStockObject.InStock,
            ]}
            backgroundColor={["#ff4197", "#4ffd34"]}
            offset={[0, 70]}
            cutout="70%"
          />
          <h3>Current Month Stock Ratio</h3>
        </div>
        {/* <div className="pie-chart-item">
          <PieChart
            labels={[
              "Marketing Cost",
              "Discount",
              "Burnt",
              "Production Cost",
              "Net Margin",
            ]}
            dataArr={[32, 18, 5, 20, 25]}
            backgroundColor={[
              "hsl(110,80%,40%)",
              "hsl(19,80%,40%)",
              "hsl(69,80%,40%)",
              "hsl(300,80%,40%)",
              "rgb(53, 162, 255)",
            ]}
            offset={[20, 30, 20, 30, 80]}
          />
          <h3>Revenue Distribution</h3>
        </div> */}
        <div className="pie-chart-item">
          <PieChart
            labels={["Teenager", "Older", "Adult"]}
            dataArr={[
              pieData?.ageGroupObject.teenager,
              pieData?.ageGroupObject.older,
              pieData?.ageGroupObject.adult,
            ]}
            backgroundColor={["#08E8DE", "#FFAA1D", "#FF007F"]}
            offset={[20, 20, 20]}
          />
          <h3>User Age Group</h3>
        </div>
        <div className="pie-chart-item">
          <PieChart
            labels={["Admin", "Customer"]}
            dataArr={[
              pieData?.userRoleObject.admin,
              pieData?.userRoleObject.users,
            ]}
            backgroundColor={["#FCBA03", "#ff6200"]}
            offset={[50]}
            cutout="70%"
          />
          <h3>User Role</h3>
        </div>
      </div>
    </div>
  );
};

export default Pie;
