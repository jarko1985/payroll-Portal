import { useState, useEffect, useContext } from "react";
import { EmployeeContext } from "@/context/EmployeeContext";
import Pagination from "../../utils/pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Employees = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   axios.get("http://localhost:3001/auth/verify").then((res) => {
  //     if (res.data.success === true) {
  //       console.log("Authorized!!");
  //       console.log(res.data);
  //     } else {
  //       navigate("/login");
  //       console.log("UnAuthorized!!");
  //     }
  //   });
  // });
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [newEmployee, setNewEmployee] = useState({
    staffId: "",
    name: "",
    joiningDate: "",
    basicSalary: "",
    salaryAllowances: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([...employees, newEmployee]);
    setNewEmployee({
      staffId: "",
      name: "",
      joiningDate: "",
      basicSalary: "",
      salaryAllowances: "",
    });
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4 ">Manage Employees</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Staff ID:</label>
          <input
            type="text"
            name="staffId"
            value={newEmployee.staffId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Joining Date:
          </label>
          <input
            type="date"
            name="joiningDate"
            value={newEmployee.joiningDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Basic Salary:
          </label>
          <input
            type="number"
            name="basicSalary"
            value={newEmployee.basicSalary}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Salary Allowances:
          </label>
          <input
            type="number"
            name="salaryAllowances"
            value={newEmployee.salaryAllowances}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#F72717] text-white rounded transition-transform hover:scale-110 duration-300 font-semibold"
        >
          Add Employee
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      <table className="min-w-full bg-white">
        <thead className="bg-[#F72717] text-white">
          <tr>
            <th className="px-4 py-2 border">Staff ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Joining Date</th>
            <th className="px-4 py-2 border">Basic Salary</th>
            <th className="px-4 py-2 border">Salary Allowances</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr className="font-semibold" key={index}>
              <td className="px-4 py-2 border">{employee.staffId}</td>
              <td className="px-4 py-2 border">{employee.name}</td>
              <td className="px-4 py-2 border">{employee.joiningDate}</td>
              <td className="px-4 py-2 border">{employee.basicSalary}</td>
              <td className="px-4 py-2 border">{employee.salaryAllowances}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        employeesPerPage={employeesPerPage}
        totalEmployees={employees.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Employees;
