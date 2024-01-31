import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <h2>Page Not Found </h2>
      <MdError />
      <h3> Error : 404</h3>
    </div>
  );
};

export default NotFound;
