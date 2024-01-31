import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import TableHOC from "../../Components/Admin/TableHOC";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../Redux/API/UserApi";
import { useSelector } from "react-redux";
import rootState from "../../Redux/RootState";
import Loader from "../../Components/Loader";
import { fetchResponseError } from "../../Types/General";
import toast from "react-hot-toast";
import ToasterFunction from "../../Components/Toaster";

type customerDataType = {
  avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
};

const columns: Column<customerDataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery(user?._id!);
  const [allUsers, setAllUsers] = useState<customerDataType[]>([]);
  const [deleteUser] = useDeleteUserMutation();

  if (isError) {
    const err = error as fetchResponseError;
    toast.error(err.message);
  }
  const deleteHanlder = async (id: string) => {
    const res = await deleteUser({ deleteUserId: id, id: user?._id! });
    ToasterFunction(res,"User Successfully Deleted")
  };

  useEffect(() => {
    if (userData?.userData) {
      const mondifiedData = userData.userData.map((i) => {
        return {
          avatar: <img src={i.photo} />,
          name: i.username,
          gender: i.gender,
          email: i.email,
          role: i.role,
          action: (
            <button
              onClick={() => {
                deleteHanlder(i._id);
              }}
            >
              <FaTrash />
            </button>
          ),
        };
      });
      setAllUsers(mondifiedData);
    }
  }, [userData]);

  const JSX = TableHOC(columns, allUsers, true)();
  return (
    <div className="outlet">
      <div className="customer-section">
        <h2>CUSTOMERS</h2>
        {isLoading ? <Loader /> : JSX}
      </div>
    </div>
  );
};

export default Customers;
