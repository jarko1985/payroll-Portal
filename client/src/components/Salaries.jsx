import { EmployeeContext } from "@/context/EmployeeContext";
import { SalaryHistoryContext } from "@/context/SalaryHistoryContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  "Staff ID",
  "Name",
  "Basic Salary",
  "Salary Allowances",
  "Additions",
  "Deductions",
  "End-of-Service (Gratuity)",
  "Total Salary",
];

const Salaries = () => {
  const navigate = useNavigate();

  const { employees } = useContext(EmployeeContext);
  const { addSalaryHistory } = useContext(SalaryHistoryContext);
  const [salaryMonth, setSalaryMonth] = useState("");
  const [salaryYear, setSalaryYear] = useState("");
  const [salaryData, setSalaryData] = useState({});
  const handleSalaryChange = (staffId, field, value) => {
    setSalaryData({
      ...salaryData,
      [staffId]: {
        ...salaryData[staffId],
        [field]: parseFloat(value) || 0,
      },
    });
  };

  const handleGratuityChange = (staffId, isGratuity) => {
    setSalaryData({
      ...salaryData,
      [staffId]: {
        ...salaryData[staffId],
        isGratuity,
      },
    });
  };

  const calculateTotalSalary = (employee) => {
    const basicSalary = parseFloat(employee.basicSalary);
    const salaryAllowances = parseFloat(employee.salaryAllowances);
    const additions = salaryData[employee.staffId]?.additions || "";
    const deductions = salaryData[employee.staffId]?.deductions || "";
    return basicSalary + salaryAllowances + additions - deductions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedSalaries = employees.map((employee) => {
      const totalSalary = calculateTotalSalary(employee);
      const isGratuity = salaryData[employee.staffId]?.isGratuity || false;
      return {
        staffId: employee.staffId,
        name: employee.name,
        basicSalary: employee.basicSalary,
        salaryAllowances: employee.salaryAllowances,
        totalSalary,
        isGratuity,
      };
    });

    addSalaryHistory(processedSalaries, salaryMonth, salaryYear);

    navigate("/history-logs");
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4">Process Salaries</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Salary Month:</label>
          <input
            type="month"
            value={`${salaryYear}-${salaryMonth}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split("-");
              setSalaryYear(year);
              setSalaryMonth(month);
            }}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-[#F72717] text-white rounded transition-transform hover:translate-y-[-.2rem] duration-300"
        >
          Process Salaries
        </button>
      </form>

      {salaryMonth && salaryYear ? (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Salary for {salaryMonth}/{salaryYear}
          </h2>

          <table className="min-w-full bg-white">
            <thead className="bg-[#F72717] text-white">
              <tr>
                {columns.map((col) => (
                  <th className="px-4 py-2 border">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{employee.staffId}</td>
                  <td className="px-4 py-2 border">{employee.name}</td>
                  <td className="px-4 py-2 border">{employee.basicSalary}</td>
                  <td className="px-4 py-2 border">
                    {employee.salaryAllowances}
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="number"
                      value={salaryData[employee.staffId]?.additions || ""}
                      onChange={(e) =>
                        handleSalaryChange(
                          employee.staffId,
                          "additions",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="number"
                      value={salaryData[employee.staffId]?.deductions || ""}
                      onChange={(e) =>
                        handleSalaryChange(
                          employee.staffId,
                          "deductions",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={
                        salaryData[employee.staffId]?.isGratuity || false
                      }
                      onChange={(e) =>
                        handleGratuityChange(employee.staffId, e.target.checked)
                      }
                    />
                    <span className="ml-2">
                      {salaryData[employee.staffId]?.isGratuity ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {calculateTotalSalary(employee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">
          Please select a salary month and year to process salaries.
        </p>
      )}
    </div>
  );
};

export default Salaries;
