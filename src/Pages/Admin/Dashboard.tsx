import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BarChart } from "../../Components/Admin/BarChart";
import DoughnutChart from "../../Components/Admin/DoughnutChart";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable, {
} from "../../Components/Admin/DashboardTable";
import { useChartDashboardDataQuery } from "../../Redux/API/ChartApi";
import { useSelector } from "react-redux";
import rootState from "../../Redux/RootState";
import Loader from "../../Components/Loader";
import { Navigate } from "react-router-dom";

const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { data, isLoading, isError} = useChartDashboardDataQuery(user?._id);

  // Chart Data
  const topWidgetData = data?.chartData[1];
  const topWidgetPercentage = data?.chartData[0];
  const categoryData = data?.chartData[2];
  const categoryArray = categoryData ? Object.keys(categoryData) : null;
  const sixMonthRevenueArray = data?.chartData[4].sixMonthRevenueArray;
  const sixMonthTransactionArray = data?.chartData[4].sixMonthTransactionArray;
  const genderRatio = data?.chartData[3];
  const latestTransactionData = data?.chartData[5];


  if (isError) return <Navigate to="/" />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="outlet">
          {/* Top Bar */}
          <div className="dashboard-top-bar">
            <div className="left-top-bar">
              <BsSearch />
              <input type="text" placeholder="Search For Data ,Docs or User" />
            </div>
            <div className="right-top-bar">
              <FaRegBell />
              <img src={user?.photo || userImg} alt="User" />
            </div>
          </div>

          {/* Statisticcal Data */}
          <section className="dashboard-top-widget">
            <div className="widget-item-container">
              <WidgetComponent
                title={"Revenue"}
                value={topWidgetData?.revenue}
                amount={true}
                percentage={topWidgetPercentage?.revenuePercentage}
                color={"#FF9933"}
              />
              <WidgetComponent
                title={"Users"}
                value={topWidgetData?.users}
                percentage={topWidgetPercentage?.userPercentage}
                color={"#CCFF00"}
              />
              <WidgetComponent
                title={"Transactions"}
                value={topWidgetData?.transactions}
                percentage={topWidgetPercentage?.transactionPercentage}
                color="#FF00CC"
              />
              <WidgetComponent
                title={"Products"}
                value={topWidgetData?.products}
                percentage={topWidgetPercentage?.productPercentage}
                color="#25ffe6"
              />
            </div>
          </section>
          <section className="dashboard-mid-chart">
            <div className="dashboard-mid-chart-left">
              <h2>Revenue and Transaction</h2>
              <BarChart
                data1={sixMonthRevenueArray}
                data2={sixMonthTransactionArray}
                label1="Revenue"
                label2="Transactions"
                backgroundColor1="rgb(244, 90, 175)"
                backgroundColor2="rgb(92, 126, 236)"
              />
            </div>

            <div className="dashboard-mid-chart-right">
              <h3>INVENTORY</h3>
              <div className="categories-container">
                {categoryArray &&
                  categoryArray.map((category) => {
                    return (
                      <CategoryComponent
                        key={category}
                        title={category}
                        color={`hsl(${categoryData[category] * 5}, ${categoryData[category] * 7}%, 50%)`}
                        percentage={categoryData[category]}
                      />
                    );
                  })}
              </div>
            </div>
          </section>
          <section className="dashboard-bottom-table">
            <div className="dashboard-bottom-table-left">
              <h3>Gender Ratio</h3>
              <div className="doughnut-chart">
                <DoughnutChart
                  labels={["Male", "Female"]}
                  label="Gender"
                  dataArr={[genderRatio.male, genderRatio.female]}
                  backgroundColor={[
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ]}
                />
                <BiMaleFemale />
              </div>
            </div>
            <div className="dashboard-bottom-table-right">
              <DashboardTable data={latestTransactionData} />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;

//--------------------------------------------------------Local Components------------------------------------------------------//
type widgetComponentProps = {
  title: string;
  value: number;
  percentage: string;
  amount?: boolean;
  color: string;
};

const WidgetComponent = ({
  title,
  value,
  percentage,
  amount,
  color,
}: widgetComponentProps) => {
  let subString = "k";
  if (!Number.isInteger(Number(percentage))) {
    const number = Math.round(Number(percentage));
    percentage = `${number}`;
  }
  if (+percentage > 10000) {
    percentage = `${9999}`;
  }
  if (+percentage < 0 && -10000 > +percentage) {
    percentage = `${-9999}`;
  }

  return (
    <div className="widget-item">
      <div className="widget-item-left">
        <p>{title}</p>
        <h3>{amount ? `₹${value}` : value}</h3>
        {Math.round(+percentage) > 0 ? (
          <span className="green">
            <HiTrendingUp />
            <p>+{`${percentage}`}%</p>
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown />
            <p>{`${percentage}`}%</p>
          </span>
        )}
      </div>
      <div className="widget-item-right">
        <div
          className="widget-circle"
          style={{
            background: `conic-gradient(${color} ${
              typeof percentage == "string" && percentage.includes(subString)
                ? Number(+percentage.split("k")[0] / 100) * 360
                : (Math.abs(Number(percentage)) / 100) * 360
            }deg, rgb(255, 255, 255) 0deg)`,
          }}
        >
          <span style={{ color: `${color}` }}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

type categoryComponentProps = {
  title: string;
  color: string;
  percentage: number;
};
const CategoryComponent = ({
  title,
  color,
  percentage,
}: categoryComponentProps) => {
  return (
    <div className="category">
      <span>{title}</span>
      <div className="category-bar">
        <div
          style={{
            backgroundColor: `${color}`,
            position: "absolute",
            width: `${percentage}%`,
            height: "0.5rem",
            borderRadius: "2rem",
          }}
        ></div>
      </div>
      <span>{percentage}%</span>
    </div>
  );
};
