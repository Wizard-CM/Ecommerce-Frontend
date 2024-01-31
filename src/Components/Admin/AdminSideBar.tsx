import React, { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const [screenSize, setScreenSize] = useState(window.screen.availWidth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      // setScreenSize(prev => window.screen.availWidth);
      setScreenSize(window.screen.availWidth);
    });
  }, []);
  return (
    <div
      className="adminSideBar"
      style={
        isOpen && screenSize < 1000
          ? {
              left: 0,
              zIndex: 7,
            }
          : {}
      }
    >
      {screenSize < 1000 && isOpen === false && (
        <button
          id="hamburger"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <HiMenuAlt4 />
        </button>
      )}
      <h2>LOGO</h2>
      <div>
        <h3>Dashboard</h3>
        <ul>
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/dashboard"
            text="Dashboard"
          />
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/product"
            text="Products"
          />
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/customer"
            text="Customers"
          />
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/transaction"
            text="Transactions"
          />
        </ul>
      </div>
      <div>
        <h3>Charts</h3>
        <ul>
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/pie"
            text="PieChart"
          />
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/bar"
            text="BarChart"
          />
          <LiComponent
            onClickHandler={setIsOpen}
            url="/admin/line"
            text="LineChart"
          />
        </ul>
      </div>

      { screenSize < 1000  && (
        <div className="close">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSideBar;

type liProps = {
  onClickHandler: (value: React.SetStateAction<boolean>) => void;
  url: string;
  text: string;
};

const LiComponent = ({ onClickHandler, url, text }: liProps) => {
  return (
    <li>
      <NavLink
        to={url}
        onClick={() => {
          onClickHandler(false);
        }}
        style={({ isActive }) =>
          isActive
            ? { backgroundColor: "#AEAEFF", color: "#fff", fontSize: "1.3rem" }
            : {}
        }
      >
        {text}
      </NavLink>
    </li>
  );
};
