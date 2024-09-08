import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleLogout = () => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((res) => {
        if (res.data.success === true) {
          navigate("/login");
          localStorage.removeItem("isLoggedIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-64 bg-white text-white border-r border-r-black">
      <img
        src="./images/logo.svg"
        alt="logo"
        height="100px"
        width="100px"
        className="mt-6 ml-2"
      />
      <p className="text-black pl-4 pt-4">
        Welcome: <span className="font-semibold">{user.username}</span>
      </p>
      <nav className="mt-6">
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive
              ? "block p-4 bg-[#F72717] font-semibold"
              : "block p-4 hover:bg-[#F72717] hover:text-white text-black font-semibold"
          }
        >
          Employees
        </NavLink>
        <NavLink
          to="/salaries"
          className={({ isActive }) =>
            isActive
              ? "block p-4 bg-[#F72717] font-semibold"
              : "block p-4 hover:bg-[#F72717] hover:text-white text-black font-semibold"
          }
        >
          Salaries
        </NavLink>
        <NavLink
          to="/history-logs"
          className={({ isActive }) =>
            isActive
              ? "block p-4 bg-[#F72717] font-semibold"
              : "block p-4 hover:bg-[#F72717] hover:text-white text-black font-semibold"
          }
        >
          History Logs
        </NavLink>
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="px-4 py-2 bg-[#F72717] text-white rounded transition-transform hover:scale-110 duration-300 font-semibold w-[80%] mx-auto block mt-5"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
