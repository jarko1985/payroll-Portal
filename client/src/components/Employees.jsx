import { useState, useContext } from "react";
import { EmployeeContext } from "@/context/EmployeeContext";
import Pagination from "../utils/pagination";
import toast, { Toaster } from "react-hot-toast";

const columns = [
  "Staff ID",
  "Name",
  "Joining Date",
  "Basic Salary",
  "Salary Allowances",
  "Actions",
];

const Employees = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [newEmployee, setNewEmployee] = useState({
    staffId: "",
    name: "",
    joiningDate: "",
    basicSalary: "",
    salaryAllowances: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
    if (isEditing) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = newEmployee;
      setEmployees(updatedEmployees);
      setIsEditing(false);
      toast.success("Employee updated successfully!");
    } else {
      setEmployees([...employees, newEmployee]);
      toast.success("Employee added successfully!");
    }

    setNewEmployee({
      staffId: "",
      name: "",
      joiningDate: "",
      basicSalary: "",
      salaryAllowances: "",
    });
  };

  const handleEdit = (index) => {
    const employeeToEdit = employees[index];

    const formattedDate = new Date(employeeToEdit.joiningDate)
      .toISOString()
      .split("T")[0];

    setNewEmployee({
      ...employeeToEdit,
      joiningDate: formattedDate,
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    toast.success("Employee deleted successfully!");
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
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      <table className="min-w-full bg-white">
        <thead className="bg-[#F72717] text-white">
          <tr>
            {columns.map((col) => (
              <th className="px-4 py-2 border">{col}</th>
            ))}
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
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
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
      <Toaster />
    </div>
  );
};

export default Employees;
